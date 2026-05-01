const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const TELEGRAM_ENDPOINT = 'https://api.telegram.org/bot';

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });

const escapeHtml = (value) =>
  String(value || '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[char]);

const trimText = (value, max) => String(value || '').trim().slice(0, max);

export async function onRequestOptions() {
  return new Response(null, { status: 204 });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  if (!env.RESEND_API_KEY) {
    return json({ ok: false, error: 'Email service is not configured.' }, 500);
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: 'Invalid JSON payload.' }, 400);
  }

  const topic = trimText(payload.topic, 80) || 'Other';
  const replyEmail = trimText(payload.replyEmail, 160);
  const message = trimText(payload.message, 4000);
  const company = trimText(payload.company, 160);

  // Honeypot: bots fill hidden fields, humans do not.
  if (company) {
    return json({ ok: true });
  }

  if (!message) {
    return json({ ok: false, error: 'Message is required.' }, 400);
  }

  const to = env.CONTACT_TO_EMAIL || 'sdr.expert@gmail.com';
  const from = env.CONTACT_FROM_EMAIL || 'njX UI Contact <contact@njxui.dev>';
  const subject = `njX UI — ${topic}`;
  const text = [
    `Topic: ${topic}`,
    replyEmail ? `Reply email: ${replyEmail}` : 'Reply email: not provided',
    '',
    message,
    '',
    `Source: ${new URL(request.url).origin}/contact`,
  ].join('\n');

  const resendBody = {
    from,
    to: [to],
    subject,
    text,
    html: `
      <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;line-height:1.6;color:#111">
        <h2 style="margin:0 0 12px">njX UI contact form</h2>
        <p><strong>Topic:</strong> ${escapeHtml(topic)}</p>
        <p><strong>Reply email:</strong> ${escapeHtml(replyEmail || 'not provided')}</p>
        <hr style="border:none;border-top:1px solid #ddd;margin:18px 0" />
        <pre style="white-space:pre-wrap;font:14px/1.6 ui-monospace,SFMono-Regular,Menlo,monospace">${escapeHtml(message)}</pre>
      </div>
    `,
  };

  if (replyEmail) {
    resendBody.reply_to = replyEmail;
  }

  const emailResponse = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(resendBody),
  });

  if (!emailResponse.ok) {
    const errorText = await emailResponse.text();
    return json({ ok: false, error: errorText || 'Resend request failed.' }, 502);
  }

  if (env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID) {
    const telegramText = [
      `njX UI contact: ${topic}`,
      replyEmail ? `Reply: ${replyEmail}` : 'Reply: not provided',
      '',
      message,
    ].join('\n').slice(0, 3800);

    await fetch(`${TELEGRAM_ENDPOINT}${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: env.TELEGRAM_CHAT_ID,
        text: telegramText,
        disable_web_page_preview: true,
      }),
    }).catch(() => {});
  }

  return json({ ok: true });
}
