/**
 * theory.js – Renders theory blocks for a section.
 * Block types: heading | subheading | text | formula | definition | note | example | table | visualization
 */
import { mathBlock, renderMathInString } from '../render.js';
import { renderVisualization } from './visualization.js';

export function renderTheory(blocks) {
  const wrapper = document.createElement('div');
  wrapper.className = 'theory-content';
  wrapper.innerHTML = blocks.map(renderBlock).join('');

  // Attach visualization interactivity after DOM insert
  requestAnimationFrame(() => {
    wrapper.querySelectorAll('[data-viz]').forEach(el => {
      const id = el.dataset.viz;
      const params = JSON.parse(el.dataset.vizParams || '{}');
      renderVisualization(el, id, params);
    });
  });

  return wrapper;
}

function renderBlock(block) {
  switch (block.type) {
    case 'heading':
      return `<h3 class="theory-heading">${block.text}</h3>`;

    case 'subheading':
      return `<h4 class="theory-subheading">${block.text}</h4>`;

    case 'text':
      return `<div class="theory-block theory-text">${renderMathInString(block.html)}</div>`;

    case 'formula':
      return mathBlock(block.tex);

    case 'definition':
      return `
        <div class="theory-definition">
          <strong>${block.term}</strong>
          <div>${renderMathInString(block.text)}</div>
        </div>`;

    case 'note':
      return `
        <div class="theory-note">
          <strong>Nota:</strong> ${renderMathInString(block.html)}
        </div>`;

    case 'example':
      return `
        <div class="theory-example">
          <div class="theory-example-title">${block.title ?? 'Ejemplo'}</div>
          ${block.problem ? `<div class="example-problem">${renderMathInString(block.problem)}</div>` : ''}
          <div class="example-steps">
            ${(block.steps ?? []).map((s, i) => `
              <div class="example-step">
                <span class="example-step-num">${i + 1}</span>
                <span>${renderMathInString(s)}</span>
              </div>`).join('')}
          </div>
          ${block.result ? `<div class="example-result" style="margin-top:.5rem;font-weight:700;">${renderMathInString(block.result)}</div>` : ''}
        </div>`;

    case 'table':
      return `
        <div class="theory-table-wrap">
          <table class="theory-table">
            <thead><tr>${block.headers.map(h => `<th>${renderMathInString(h)}</th>`).join('')}</tr></thead>
            <tbody>${block.rows.map(row =>
              `<tr>${row.map(cell => `<td>${renderMathInString(cell)}</td>`).join('')}</tr>`
            ).join('')}</tbody>
          </table>
        </div>`;

    case 'visualization':
      return `<div class="viz-container" data-viz="${block.id}" data-viz-params='${JSON.stringify(block.params ?? {})}'>
        <div class="viz-placeholder" style="text-align:center;padding:2rem;color:#94a3b8">
          ⏳ Cargando visualización…
        </div>
      </div>`;

    default:
      return '';
  }
}
