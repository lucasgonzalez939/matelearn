/**
 * render.js – KaTeX math rendering utilities.
 * KaTeX is loaded globally via CDN before this module executes.
 */

/**
 * Render a TeX string to HTML.
 * @param {string} tex
 * @param {boolean} display  true → display (block) mode
 * @returns {string} HTML string
 */
export function math(tex, display = false) {
  if (typeof katex === 'undefined') {
    return `<code class="raw-math">${tex}</code>`;
  }
  try {
    return katex.renderToString(tex, {
      displayMode: display,
      throwOnError: false,
      errorColor: '#cc0000',
    });
  } catch {
    return `<code class="raw-math">${tex}</code>`;
  }
}

/** Render an inline TeX expression. */
export const mathInline = (tex) => math(tex, false);

/** Render a display-mode TeX expression wrapped in a div. */
export function mathBlock(tex) {
  return `<div class="math-block">${math(tex, true)}</div>`;
}

/**
 * Replace $$ ... $$ and $ ... $ delimiters in a string with KaTeX HTML.
 * Safe to call on plain strings (no-ops when there are no delimiters).
 */
export function renderMathInString(str) {
  if (!str || typeof str !== 'string') return str ?? '';
  // Display math first ($$...$$)
  str = str.replace(/\$\$([^$]+)\$\$/gs, (_, t) => mathBlock(t.trim()));
  // Inline math ($...$)
  str = str.replace(/\$([^$\n]+)\$/g, (_, t) => mathInline(t.trim()));
  return str;
}
