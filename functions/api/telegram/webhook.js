// @njxui_bot — support inbox (plan: TELEGRAM-BOT-PLAN.md, «Архитектура v1»).
// Webhook: POST /api/telegram/webhook (set via setWebhook, see README section in the plan).
// Env: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID (admin), TELEGRAM_WEBHOOK_SECRET (optional but recommended).

const TG = 'https://api.telegram.org/bot';

const LINKS = {
  docs: 'https://njxui.dev',
  themes: 'https://njxui.dev/themes',
  github: 'https://github.com/njbSaab/njx-css-ui',
  issues: 'https://github.com/njbSaab/njx-css-ui/issues',
};

const REPLIES = {
  start: [
    'Hi! This is the njX UI support bot.',
    '',
    'Send a question, bug report or feedback here — a human reads every message and replies in this chat.',
    '',
    'Useful links:',
    `Docs: ${LINKS.docs}`,
    `Astro themes: ${LINKS.themes}`,
    `GitHub: ${LINKS.github}`,
    'npm: npm i njx-ui',
    '',
    'Commands: /help /docs /themes /github /npm /bug /contact',
    '',
    'Please do not send tokens, passwords or private credentials.',
  ].join('\n'),
  help: [
    'What I can do:',
    '/docs — documentation',
    '/themes — free Astro themes & Pro',
    '/github — source code',
    '/npm — install command',
    '/bug — how to report a bug well',
    '/contact — other contact channels',
    '',
    'Or just type your question — it goes straight to the author, the reply arrives here.',
  ].join('\n'),
  docs: `Documentation and quick start:\n${LINKS.docs}`,
  themes: `Free Astro themes (ecommerce + landing) and upcoming Pro versions:\n${LINKS.themes}`,
  github: `Source, issues and discussions:\n${LINKS.github}`,
  npm: 'Install from npm:\n\nnpm i njx-ui\n\nOr use the CDN — see /docs for the one-line link.',
  bug: [
    'A great bug report includes:',
    '- njX UI version',
    '- Browser / device',
    '- CDN or npm usage',
    '- What you expected vs what happened',
    '- CodePen / repo link if possible',
    '',
    `Public tracker: ${LINKS.issues}`,
    'Or describe it right here — I forward it to the author.',
  ].join('\n'),
  contact: [
    'Other channels:',
    `Email: sdr.expert@gmail.com`,
    `GitHub Issues: ${LINKS.issues}`,
    `Contact form: ${LINKS.docs}/contact`,
  ].join('\n'),
  ack: 'Thanks, message received ✓ A human will reply here — for bugs, a CodePen or repo link helps a lot.',
};

const MENU_KB = {
  inline_keyboard: [
    [
      { text: '🛟 Support', callback_data: 'menu:support' },
      { text: '🎨 Themes', callback_data: 'menu:themes' },
    ],
    [{ text: '✍️ Ask a question', callback_data: 'menu:ask' }],
  ],
};

const THEMES_KB = {
  inline_keyboard: [
    [
      { text: '🖤 dark-lux', url: 'https://astro-njx-dark-lux.pages.dev' },
      { text: '🌿 verdant', url: 'https://astro-njx-verdant.pages.dev' },
    ],
    [
      { text: '👗 boutique', url: 'https://astro-njx-boutique.pages.dev' },
      { text: '📦 store', url: 'https://astro-njx-store.pages.dev' },
    ],
    [{ text: 'All themes & Pro →', url: LINKS.themes }],
    [{ text: '← Back', callback_data: 'menu:main' }],
  ],
};

const SUPPORT_KB = {
  inline_keyboard: [
    [{ text: 'GitHub Issues', url: LINKS.issues }],
    [{ text: 'Docs', url: LINKS.docs }],
    [{ text: '← Back', callback_data: 'menu:main' }],
  ],
};

const MENU_TEXT = {
  main: 'Pick a section — or just type your question, it goes straight to the author:',
  support: [
    'Support 🛟',
    '',
    'Type your question, bug or feedback right here — a human reads every message and replies in this chat.',
    '',
    'For bugs: njX UI version, browser, CDN/npm, and a CodePen or repo link help a lot.',
    'Please do not send tokens, passwords or private credentials.',
  ].join('\n'),
  themes: [
    'Astro themes 🎨',
    '',
    'Free ecommerce storefronts (Shopify-ready) and landing themes.',
    'Open a live demo below, or see the full catalog with upcoming Pro versions:',
  ].join('\n'),
  ask: [
    '✍️ Describe your question in one message — anything about njX UI, the Astro themes, Pro versions or custom work.',
    '',
    'It goes straight to the author; the reply arrives right here in this chat, usually within a day.',
    '',
    'Attach links (CodePen, repo, your store) if relevant. Please do not send tokens or passwords.',
  ].join('\n'),
};

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });

async function tg(env, method, body) {
  return fetch(`${TG}${env.TELEGRAM_BOT_TOKEN}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).catch(() => null);
}

const send = (env, chatId, text, extra = {}) =>
  tg(env, 'sendMessage', {
    chat_id: chatId,
    text,
    disable_web_page_preview: true,
    ...extra,
  });

export async function onRequestPost(context) {
  const { request, env } = context;

  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
    return json({ ok: false, error: 'Bot is not configured.' }, 500);
  }

  // Telegram signs webhook calls with the secret passed to setWebhook.
  if (env.TELEGRAM_WEBHOOK_SECRET) {
    const secret = request.headers.get('X-Telegram-Bot-Api-Secret-Token');
    if (secret !== env.TELEGRAM_WEBHOOK_SECRET) {
      return json({ ok: false }, 403);
    }
  }

  let update;
  try {
    update = await request.json();
  } catch {
    return json({ ok: true });
  }

  // ── Inline menu buttons ──
  const cb = update.callback_query;
  if (cb) {
    const cbChat = cb.message?.chat?.id;
    const action = (cb.data || '').replace('menu:', '');
    await tg(env, 'answerCallbackQuery', { callback_query_id: cb.id });
    if (cbChat) {
      if (action === 'themes') await send(env, cbChat, MENU_TEXT.themes, { reply_markup: THEMES_KB });
      else if (action === 'support') await send(env, cbChat, MENU_TEXT.support, { reply_markup: SUPPORT_KB });
      else if (action === 'ask') await send(env, cbChat, MENU_TEXT.ask, { reply_markup: { force_reply: true, input_field_placeholder: 'Type your question…' } });
      else await send(env, cbChat, MENU_TEXT.main, { reply_markup: MENU_KB });
    }
    return json({ ok: true });
  }

  const msg = update.message;
  // Always 200 to Telegram — otherwise it retries the same update forever.
  if (!msg || !msg.chat || msg.from?.is_bot) return json({ ok: true });

  const adminChat = String(env.TELEGRAM_CHAT_ID);
  const chatId = String(msg.chat.id);
  const text = (msg.text || '').trim();

  // ── Admin side: a reply to a forwarded "#uid…" message goes back to that user ──
  if (chatId === adminChat) {
    const repliedText = msg.reply_to_message?.text || '';
    const uidMatch = repliedText.match(/#uid(\d+)/);
    if (uidMatch && text) {
      const delivered = await send(env, uidMatch[1], text);
      const ok = delivered && delivered.ok;
      await send(env, adminChat, ok ? 'Delivered ✓' : 'Failed to deliver ✗', {
        reply_to_message_id: msg.message_id,
      });
      return json({ ok: true });
    }
    // The owner's private chat doubles as the admin chat — commands still work here.
    if (!text.startsWith('/')) return json({ ok: true });
  }

  // ── User side ──
  // Only private 1-on-1 chats; ignore group noise entirely.
  if (msg.chat.type !== 'private') return json({ ok: true });

  const command = text.startsWith('/') ? text.split(/[\s@]/)[0].slice(1).toLowerCase() : null;

  if (command) {
    if (command === 'start') {
      await send(env, chatId, REPLIES.start, { reply_markup: MENU_KB });
      return json({ ok: true });
    }
    if (command === 'themes') {
      await send(env, chatId, MENU_TEXT.themes, { reply_markup: THEMES_KB });
      return json({ ok: true });
    }
    const known = { help: 1, docs: 1, github: 1, npm: 1, bug: 1, contact: 1 };
    const reply = known[command] ? REPLIES[command] : REPLIES.help;
    await send(env, chatId, reply);
    return json({ ok: true });
  }

  if (!text && !msg.photo && !msg.document) return json({ ok: true });

  // Forward to admin with a #uid tag — replying to this message answers the user.
  const from = msg.from || {};
  const who = [from.first_name, from.last_name].filter(Boolean).join(' ') || 'Unknown';
  const username = from.username ? `@${from.username}` : 'no username';
  const body = text || '(non-text message — open the bot chat to view)';
  const forward = [
    `✉️ njX bot — new message`,
    `From: ${who} (${username}) #uid${from.id}`,
    '',
    body.slice(0, 3500),
  ].join('\n');

  await send(env, adminChat, forward);
  await send(env, chatId, REPLIES.ack);
  return json({ ok: true });
}
