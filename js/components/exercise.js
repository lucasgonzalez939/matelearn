/**
 * exercise.js – Exercise engine.
 * Supports: 'guided', 'numeric', 'multiple-choice'
 */
import { renderMathInString, math } from '../render.js';
import { markComplete, isComplete } from '../progress.js';

export function renderExercises(exercises, sectionId) {
  const wrap = document.createElement('div');
  wrap.className = 'exercises-section';
  wrap.innerHTML = '<h2>Ejercicios de Práctica</h2>';

  exercises.forEach((ex, i) => {
    wrap.appendChild(buildCard(ex, i + 1, sectionId));
  });

  return wrap;
}

export function renderGuidedExercises(exercises) {
  const wrap = document.createElement('div');
  wrap.innerHTML = '<h2 class="guided-section-title">✦ Ejercicios Guiados</h2>';
  exercises.forEach((ex, i) => wrap.appendChild(buildCard(ex, i + 1, null)));
  return wrap;
}

// ─── Card factory ─────────────────────────────────────────────────────────

function buildCard(ex, num, sectionId) {
  const card = document.createElement('div');
  card.className = `exercise-card ${ex.type}`;
  card.dataset.exerciseId = ex.id;

  if (ex.type === 'guided') {
    card.innerHTML = guidedHTML(ex, num);
    attachGuided(card, ex, sectionId);
  } else if (ex.type === 'multiple-choice') {
    card.innerHTML = mcHTML(ex, num);
    attachMC(card, ex, sectionId);
  } else {
    card.innerHTML = numericHTML(ex, num);
    attachNumeric(card, ex, sectionId);
  }

  // Gray-out already-completed exercises
  if (sectionId && isComplete(`ex:${sectionId}:${ex.id}`)) {
    card.classList.add('already-done');
    card.querySelectorAll('button').forEach(b => (b.disabled = true));
    card.querySelectorAll('input').forEach(i => (i.disabled = true));
  }

  return card;
}

// ─── Templates ────────────────────────────────────────────────────────────

function difficulty(level = 1) {
  return `<span class="exercise-difficulty">
    ${[1, 2, 3].map(d => `<span class="difficulty-dot${d <= level ? ' filled' : ''}"></span>`).join('')}
  </span>`;
}

function guidedHTML(ex, num) {
  return `
    <div class="exercise-header">
      <span class="exercise-badge guided">Ejercicio Guiado</span>
      ${difficulty(ex.difficulty)}
      <span class="exercise-num">#${num}</span>
    </div>
    <div class="exercise-statement">${renderMathInString(ex.statement)}</div>
    <div class="guided-steps">
      ${(ex.steps ?? []).map((step, i) => `
        <div class="guided-step" data-step="${i}">
          <div class="step-header">
            <span class="step-num">Paso ${i + 1}</span>
            <span class="step-instruction">${renderMathInString(step.instruction)}</span>
          </div>
          ${step.formula ? `<div class="step-formula">${math(step.formula, true)}</div>` : ''}
          ${step.answer !== undefined
            ? `<div class="step-input-area">
                <input type="text" class="step-input"
                  placeholder="${step.placeholder ?? 'Tu respuesta'}"
                  data-answer="${step.answer}"
                  data-tolerance="${step.tolerance ?? 0.01}"
                  autocomplete="off">
                <button class="btn-check-step">Verificar</button>
                <span class="step-feedback"></span>
               </div>`
            : `<div class="step-info" style="font-size:.9rem;color:#475569;margin-top:.4rem">${renderMathInString(step.info ?? '')}</div>`}
        </div>`).join('')}
    </div>
    <div class="exercise-explanation hidden">
      ${renderMathInString(ex.explanation ?? '')}
    </div>
    <div class="exercise-actions">
      <button class="btn-show-solution">Ver solución completa</button>
    </div>`;
}

function mcHTML(ex, num) {
  return `
    <div class="exercise-header">
      <span class="exercise-badge mc">Selección múltiple</span>
      ${difficulty(ex.difficulty)}
      <span class="exercise-num">#${num}</span>
    </div>
    <div class="exercise-statement">${renderMathInString(ex.statement)}</div>
    <div class="options-list">
      ${(ex.options ?? []).map((opt, i) => `
        <label class="option-label" data-index="${i}">
          <input type="radio" name="mc-${ex.id}" value="${i}">
          <span class="option-text">${renderMathInString(opt)}</span>
        </label>`).join('')}
    </div>
    <div class="exercise-feedback hidden"></div>
    <div class="exercise-actions">
      <button class="btn-check">Verificar respuesta</button>
    </div>`;
}

function numericHTML(ex, num) {
  return `
    <div class="exercise-header">
      <span class="exercise-badge numeric">Cálculo</span>
      ${difficulty(ex.difficulty)}
      <span class="exercise-num">#${num}</span>
    </div>
    <div class="exercise-statement">${renderMathInString(ex.statement)}</div>
    ${ex.hint ? `<details class="exercise-hint"><summary>💡 Pista</summary><div>${renderMathInString(ex.hint)}</div></details>` : ''}
    <div class="exercise-input-area">
      <input type="text" class="exercise-input"
        placeholder="Ingresa tu respuesta${ex.unit ? ' (' + ex.unit + ')' : ''}"
        autocomplete="off">
      ${ex.unit ? `<span class="input-unit">${ex.unit}</span>` : ''}
      <button class="btn-check">Verificar</button>
    </div>
    <div class="exercise-feedback hidden"></div>
    <div class="exercise-explanation hidden">
      ${renderMathInString(ex.explanation ?? '')}
    </div>`;
}

// ─── Event listeners ──────────────────────────────────────────────────────

function attachGuided(card, ex, sectionId) {
  const solutionBtn = card.querySelector('.btn-show-solution');
  const explanation = card.querySelector('.exercise-explanation');

  solutionBtn?.addEventListener('click', () => {
    explanation.classList.toggle('hidden');
    solutionBtn.textContent = explanation.classList.contains('hidden')
      ? 'Ver solución completa' : 'Ocultar solución';
  });

  card.querySelectorAll('.btn-check-step').forEach(btn => {
    btn.addEventListener('click', () => {
      const row = btn.closest('.guided-step');
      const input = row.querySelector('.step-input');
      const fb = row.querySelector('.step-feedback');
      const ok = checkAnswer(input.value, input.dataset.answer, parseFloat(input.dataset.tolerance));
      fb.textContent = ok ? '✓ ¡Correcto!' : `✗ La respuesta es: ${input.dataset.answer}`;
      fb.className = `step-feedback ${ok ? 'correct' : 'incorrect'}`;
      if (ok) { input.disabled = true; btn.disabled = true; }
    });
    // Enter key
    const input = btn.closest('.step-input-area')?.querySelector('.step-input');
    input?.addEventListener('keydown', e => { if (e.key === 'Enter') btn.click(); });
  });
}

function attachMC(card, ex, sectionId) {
  const btn = card.querySelector('.btn-check');
  const fb  = card.querySelector('.exercise-feedback');

  btn?.addEventListener('click', () => {
    const sel = card.querySelector('input[type="radio"]:checked');
    if (!sel) {
      showFeedback(fb, 'warning', 'Selecciona una opción primero.');
      return;
    }
    const chosen = parseInt(sel.value, 10);
    const ok = chosen === ex.answer;

    card.querySelectorAll('.option-label').forEach((lbl, i) => {
      if (i === ex.answer)   lbl.classList.add('correct-option');
      if (i === chosen && !ok) lbl.classList.add('wrong-option');
    });

    showFeedback(fb, ok ? 'correct' : 'incorrect',
      ok ? `✓ ¡Correcto! ${renderMathInString(ex.explanation ?? '')}`
         : `✗ Incorrecto. La respuesta correcta es la opción ${ex.answer + 1}. ${renderMathInString(ex.explanation ?? '')}`);

    btn.disabled = true;
    if (sectionId && ok) markComplete(`ex:${sectionId}:${ex.id}`);
  });
}

function attachNumeric(card, ex, sectionId) {
  const btn  = card.querySelector('.btn-check');
  const inp  = card.querySelector('.exercise-input');
  const fb   = card.querySelector('.exercise-feedback');
  const expl = card.querySelector('.exercise-explanation');

  const verify = () => {
    const val = inp.value.trim();
    if (!val) return;
    const ok = checkAnswer(val, ex.answer, ex.tolerance ?? 0.01);
    showFeedback(fb, ok ? 'correct' : 'incorrect',
      ok ? `✓ ¡Correcto! ${renderMathInString(ex.explanation ?? '')}`
         : `✗ Respuesta incorrecta.${ex.hint ? ' ' + renderMathInString(ex.hint) : ''}`);
    if (ok) {
      inp.disabled = true;
      if (btn) btn.disabled = true;
      expl?.classList.remove('hidden');
      if (sectionId) markComplete(`ex:${sectionId}:${ex.id}`);
    }
  };

  btn?.addEventListener('click', verify);
  inp?.addEventListener('keydown', e => { if (e.key === 'Enter') verify(); });
}

// ─── Helpers ──────────────────────────────────────────────────────────────

function showFeedback(el, type, html) {
  el.className = `exercise-feedback ${type}`;
  el.innerHTML = html;
  el.classList.remove('hidden');
}

/**
 * Compare user input against expected answer.
 * Handles numeric values with tolerance, and string comparison.
 */
function checkAnswer(raw, expected, tolerance = 0.01) {
  const val  = parseFloat(String(raw).replace(',', '.').trim());
  const exp  = parseFloat(String(expected).replace(',', '.').trim());
  if (!isNaN(val) && !isNaN(exp)) {
    const tol = tolerance * (Math.abs(exp) || 1) + 1e-9;
    return Math.abs(val - exp) <= tol;
  }
  return String(raw).trim().toLowerCase() === String(expected).trim().toLowerCase();
}
