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
