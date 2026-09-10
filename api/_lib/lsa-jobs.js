import { maybeAutoReply } from "./lsa-autoreply.js";
import { sendLsaReply, mailErrorCode } from "./lsa-mail.js";
import { sendTelegram, formatLeadMessage } from "./telegram.js";
import { upsertContact } from "./highlevel.js";

export async function processImportJobs(db, { deadline = Date.now() + 60_000,
  effects = { maybeAutoReply, sendLsaReply, sendTelegram, upsertContact } } = {}) {
  // A crash after beginning an external send is ambiguous. Do not send it again
  // automatically: SMTP/Telegram do not provide an exactly-once transaction.
  await db`UPDATE lsa_import_jobs SET status='review', last_error='SEND_OUTCOME_UNKNOWN', updated_at=now()
    WHERE status='sending' AND updated_at < now() - interval '5 minutes'`;
  await db`UPDATE lsa_import_jobs SET status='pending', updated_at=now()
    WHERE status='running' AND updated_at < now() - interval '5 minutes'`;
  let processed = 0;
  for (let i = 0; i < 15 && Date.now() < deadline; i++) {
    const jobs = await db`UPDATE lsa_import_jobs SET status='running', attempts=attempts+1, updated_at=now()
      WHERE id=(SELECT id FROM lsa_import_jobs WHERE status='pending' AND available_at<=now()
        ORDER BY id LIMIT 1) RETURNING *`;
    if (!jobs.length) break;
    const job = jobs[0];
    const beforeSend = async () => {
      if (job.kind === 'reply' || job.kind === 'nudge') {
        const [latest] = await db`SELECT m.id,m.ext_id,l.archived_at FROM lead_messages m
          JOIN leads l ON l.id=m.lead_id WHERE m.lead_id=${job.lead_id}
          ORDER BY m.created_at DESC,m.id DESC LIMIT 1`;
        if (!latest || latest.archived_at || (job.kind === 'reply'
          ? latest.ext_id !== job.payload.emailKey : latest.id !== job.payload.lastMessageId)) {
          throw Object.assign(new Error('Conversation changed before sending'), { code: 'REPLY_SUPERSEDED' });
        }
      }
      await db`UPDATE lsa_import_jobs SET status='sending', updated_at=now() WHERE id=${job.id}`;
    };
    try {
      const [lead] = await db`SELECT * FROM leads WHERE id=${job.lead_id}`;
      if (!lead) throw Object.assign(new Error("Missing lead"), { code: "LEAD_MISSING" });
      if (job.kind === "owner") {
        await beforeSend();
        const r = await effects.sendTelegram(formatLeadMessage(`Google LSA lead update (Lead #${lead.id})`, lead));
        if (!r.ok) throw Object.assign(new Error("Owner alert failed"), { code: "OWNER_ALERT_FAILED" });
      } else if (job.kind === "highlevel") {
        // An unconfigured optional integration is not an importer failure.
        if (lead.phone && !lead.hl_contact_id && process.env.HIGHLEVEL_API_KEY) {
          await beforeSend();
          const r = await effects.upsertContact({ ...lead, name: lead.name || "LSA Lead" }, ["lsa-lead"]);
          if (!r.ok) throw Object.assign(new Error("CRM sync failed"), { code: "HIGHLEVEL_FAILED" });
          await db`UPDATE leads SET hl_contact_id=${r.contactId} WHERE id=${lead.id}`;
        }
      } else if (job.kind === "reply") {
        const [last] = await db`SELECT ext_id FROM lead_messages WHERE lead_id=${lead.id} ORDER BY created_at DESC, id DESC LIMIT 1`;
        // A newer email or human reply supersedes older queued reply work.
        if (last?.ext_id === job.payload.emailKey && !lead.archived_at) {
          await effects.maybeAutoReply(db, lead, { beforeSend });
        }
      } else if (job.kind === "nudge") {
        const [last] = await db`SELECT id, direction FROM lead_messages WHERE lead_id=${lead.id} ORDER BY created_at DESC, id DESC LIMIT 1`;
        if (last?.id === job.payload.lastMessageId && last.direction === "out"
          && !lead.archived_at && !lead.ai_summary?.customer_closed) {
          await beforeSend();
          await effects.sendLsaReply({ to: lead.reply_email, subject: lead.subject, text: job.payload.text });
          await db.transaction([
            db`INSERT INTO lead_messages (lead_id, direction, body_text, ext_id)
              VALUES (${lead.id}, 'out', ${job.payload.text}, ${job.job_key}) ON CONFLICT DO NOTHING`,
            db`UPDATE leads SET nudge_count=GREATEST(nudge_count, ${job.payload.nudgeIndex + 1}), last_nudge_at=now() WHERE id=${lead.id}`,
          ]);
        }
      }
      await db`UPDATE lsa_import_jobs SET status='done', updated_at=now(), last_error=NULL WHERE id=${job.id}`;
    } catch (error) {
      await db`UPDATE lsa_import_jobs SET
        status=CASE WHEN status='sending' OR attempts>=5 THEN 'review' ELSE 'pending' END,
        last_error=${mailErrorCode(error)}, updated_at=now(),
        available_at=now() + (LEAST(3600, 60 * power(2, attempts)) * interval '1 second')
        WHERE id=${job.id}`;
    }
    processed++;
  }
  return processed;
}

// Existing owner channel only, after three failed polls; at most once per six
// hours while unhealthy. Never called by audit/recovery maintenance modes.
export async function notifyImportFailure(db) {
  const claimed = await db`UPDATE lsa_import_state SET failure_alerted_at=now()
    WHERE name='mailbox' AND consecutive_failures>=3
      AND (failure_alerted_at IS NULL OR failure_alerted_at < now() - interval '6 hours')
    RETURNING name`;
  if (claimed.length) await sendTelegram('MEX lead importer needs attention: three or more polls failed or have messages awaiting review. Check the original Google LSA inbox and the importer health report. No customer send is being retried when its outcome is uncertain.');
}

// Preserve the existing nudge wording/cadence, but durably claim each send.
// Recovery runs never call this function or processImportJobs. Excluding older
// conversations on later polls also prevents restarting historical follow-ups.
export async function enqueueNudges(db) {
  const delays = [30 * 60_000, 3 * 3_600_000, 24 * 3_600_000];
  const leads = await db`SELECT l.*, m.id AS last_message_id, m.created_at AS last_message_at
    FROM leads l JOIN LATERAL (
      SELECT id, direction, created_at FROM lead_messages WHERE lead_id=l.id
      ORDER BY created_at DESC, id DESC LIMIT 1
    ) m ON m.direction='out'
    JOIN lsa_import_state s ON s.name='mailbox' AND m.created_at>=s.live_since
    WHERE l.source='lsa' AND l.lead_type='MESSAGE' AND l.nudge_count<3
      AND l.archived_at IS NULL AND l.reply_email ~ '^customer-request-[0-9]+@awexpress[.]google[.]com$'
    ORDER BY l.id DESC LIMIT 100`;
  for (const lead of leads) {
    if (lead.ai_summary?.customer_closed || Date.now() - new Date(lead.last_message_at).getTime() <= delays[lead.nudge_count]) continue;
    const first = (lead.name || "").trim().split(/\s+/)[0] || "";
    const real = /^[A-Za-z][A-Za-z'-]{1,29}$/.test(first) && !/^(lsa|unknown|potential|customer|none|null|lead|client|test)$/i.test(first);
    const greet = real ? `Hi ${first}` : "Hi";
    const texts = [
      `${greet}, just making sure my last message came through. Whenever you are ready, we would love to set up your free estimate.`,
      `${greet}, just checking back in from Mex Landscaping. Happy to answer any questions or get your free on-site estimate on the calendar whenever works for you.`,
      `${greet}, it is Mex Landscaping with one last note, we do not want to crowd your inbox. If you would still like that free estimate we are here anytime. Thank you.`,
    ];
    await db`INSERT INTO lsa_import_jobs (job_key, lead_id, kind, payload)
      VALUES (${"nudge:" + lead.id + ":" + lead.nudge_count + ":" + lead.last_message_id}, ${lead.id}, 'nudge',
        ${JSON.stringify({ text: texts[lead.nudge_count], lastMessageId: lead.last_message_id, nudgeIndex: lead.nudge_count })})
      ON CONFLICT DO NOTHING`;
  }
}
