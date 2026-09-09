// ONE-TIME setup endpoint: binds the Telegram webhook using the token already in env.
// Protected by ?key=<TELEGRAM_CHAT_ID>. Delete this file after successful setup.

const TG = 'https://api.telegram.org/bot';

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
    return Response.json({ ok: false, error: 'not configured' }, { status: 500 });
  }
  if (url.searchParams.get('key') !== String(env.TELEGRAM_CHAT_ID)) {
    return Response.json({ ok: false }, { status: 403 });
  }

  const webhookUrl = `${url.origin}/api/telegram/webhook`;
  const params = new URLSearchParams({
    url: webhookUrl,
    drop_pending_updates: 'true',
  });
  if (env.TELEGRAM_WEBHOOK_SECRET) {
    params.set('secret_token', env.TELEGRAM_WEBHOOK_SECRET);
  }

  const setRes = await fetch(`${TG}${env.TELEGRAM_BOT_TOKEN}/setWebhook?${params}`).then((r) => r.json());
  const info = await fetch(`${TG}${env.TELEGRAM_BOT_TOKEN}/getWebhookInfo`).then((r) => r.json());

  return Response.json({ set: setRes, info });
}
