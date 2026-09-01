// Общие утилиты кода-демо: используются Demo.astro / CodeBlock.astro на билде
// и офлайн-проверками (обычный .js, чтобы node запускал без транспиляции).

/** Срезает общий отступ непустых строк (табы считаются как 2 пробела). */
export function dedent(value) {
  const lines = String(value).replace(/\t/g, '  ').split('\n');
  let min = Infinity;
  for (const line of lines) {
    if (!line.trim()) continue;
    const indent = /^ */.exec(line)[0].length;
    if (indent < min) min = indent;
  }
  if (!Number.isFinite(min) || min === 0) return String(value);
  return lines.map((l) => l.slice(min)).join('\n');
}

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/** Подсветка CSS в словаре секций: .cn свойства, .v значения,
    .k селекторы/@-правила, .c комментарии (обе разновидности). */
export function highlightCss(value) {
  let escaped = escapeHtml(value)
    .replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="c">$1</span>')
    .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="c">$1</span>');

  const lined = escaped
    .split('\n')
    .map((line) => {
      if (line.trimStart().startsWith('<span class="c"')) return line;
      const prop = line.replace(
        /^(\s*)(--[\w-]+|[a-zA-Z-]{2}[\w-]*)(\s*:\s*)([^;{<]*)(;?)/,
        (_m, sp, name, colon, val, semi) =>
          `${sp}<span class="cn">${name}</span>${colon}<span class="v">${val}</span>${semi}`,
      );
      if (prop !== line) return prop;
      return line.replace(
        /^(\s*)([^<{}][^{}]*)(\{)/,
        (_m, sp, sel, brace) => `${sp}<span class="k">${sel}</span>${brace}`,
      );
    })
    .join('\n');

  // var(--x) вне уже расставленных span'ов (однострочные правила, списки токенов)
  return lined
    .split(/(<span[^>]*>[\s\S]*?<\/span>)/)
    .map((part, i) =>
      i % 2
        ? part
        : part.replace(/var\((--[\w-]+)\)/g, '<span class="v">var($1)</span>'),
    )
    .join('');
}

/** Подсветка JS в словаре секций: .c комментарии, .cn строки, .k ключевые
    слова, .v вызовы функций, .s числа; HTML-теги в смешанных образцах
    докрашиваются пост-проходом. */
export function highlightJs(value) {
  // 1) HTML-комментарии и теги (смешанные образцы «разметка + JS»)
  const tagged = escapeHtml(value)
    .replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="c">$1</span>')
    .replace(
    /(&lt;\/?)([a-zA-Z][\w:-]*)((?:(?!&gt;)[\s\S])*?)(\/?&gt;)/g,
    (_m, open, tag, attrs, close) => {
      const a = attrs.replace(
        /(\s+)([a-zA-Z_:@][\w:.@-]*)((?:=(?:"[^"]*"|'[^']*'|[^\s&]+))?)/g,
        (_a, sp, name, vp) =>
          vp
            ? `${sp}<span class="s">${name}</span>=<span class="cn">${vp.slice(1)}</span>`
            : `${sp}<span class="s">${name}</span>`,
      );
      return `<span class="k">${open}${tag}</span>${a}<span class="k">${close}</span>`;
    },
  );

  // 2) JS-токены вне уже расставленных span'ов
  const KEYWORDS =
    'const|let|var|function|return|if|else|new|for|while|of|in|typeof|class|import|export|from|async|await|true|false|null|undefined|this|document|window|localStorage';
  const jsRe = new RegExp(
    "('(?:[^'\\\\\\n]|\\\\.)*'|\"(?:[^\"\\\\\\n]|\\\\.)*\")" + // строки
      '|(\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)' + // комментарии
      `|\\b(${KEYWORDS})\\b` +
      '|\\b(\\d+(?:\\.\\d+)?)\\b' + // числа
      '|([A-Za-z_$][\\w$]*)(?=\\()', // вызов функции
    'g',
  );

  return tagged
    .split(/(<span[^>]*>[\s\S]*?<\/span>)/)
    .map((part, i) =>
      i % 2
        ? part
        : part.replace(jsRe, (m, str, com, kw, num, call) => {
            if (str) return `<span class="cn">${str}</span>`;
            if (com) return `<span class="c">${com}</span>`;
            if (kw) return `<span class="k">${kw}</span>`;
            if (num) return `<span class="s">${num}</span>`;
            if (call) return `<span class="v">${call}</span>`;
            return m;
          }),
    )
    .join('');
}

/** Подсветка HTML в словаре секций: .k теги, .s имена атрибутов,
    .cn значения, .c комментарии (палитры в docs-sections.css). */
export function highlightHtml(value) {
  const escaped = escapeHtml(value);

  return escaped
    .replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="c">$1</span>')
    .replace(
      /(&lt;\/?)([a-zA-Z][\w:-]*)((?:(?!&gt;)[\s\S])*?)(\/?&gt;)/g,
      (_match, open, tag, attrs, close) => {
        const highlightedAttrs = attrs.replace(
          /(\s+)([a-zA-Z_:@][\w:.@-]*)((?:=(?:"[^"]*"|'[^']*'|[^\s&]+))?)/g,
          (_attr, space, name, valuePart) =>
            valuePart
              ? `${space}<span class="s">${name}</span>=<span class="cn">${valuePart.slice(1)}</span>`
              : `${space}<span class="s">${name}</span>`,
        );
        return `<span class="k">${open}${tag}</span>${highlightedAttrs}<span class="k">${close}</span>`;
      },
    );
}
