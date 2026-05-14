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
            : `<div class="step-info">${renderMathInString(step.info ?? '')}</div>`}
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
  const initialHint = Array.isArray(ex.hints) && ex.hints.length ? ex.hints[0] : ex.hint;
  return `
    <div class="exercise-header">
      <span class="exercise-badge numeric">Cálculo</span>
      ${difficulty(ex.difficulty)}
      <span class="exercise-num">#${num}</span>
    </div>
    <div class="exercise-statement">${renderMathInString(ex.statement)}</div>
    ${initialHint ? `<details class="exercise-hint"><summary>💡 Pista</summary><div>${renderMathInString(initialHint)}</div></details>` : ''}
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
      if (!row) return;
      const input = row.querySelector('.step-input');
      const fb = row.querySelector('.step-feedback');
      const ok = checkAnswer(input.value, input.dataset.answer, parseFloat(input.dataset.tolerance));
      if (ok) {
        fb.textContent = '✓ ¡Correcto! Ese resultado habilita el siguiente paso.';
      } else {
        const attempts = Number(row.dataset.attempts ?? '0') + 1;
        row.dataset.attempts = String(attempts);
        const stepIndex = row.dataset.step !== undefined ? Number(row.dataset.step) : NaN;
        const step = Number.isInteger(stepIndex) ? (ex.steps ?? [])[stepIndex] : null;
        const hint = step?.hint ?? 'Revisa la fórmula y sustituye con cuidado.';
        fb.textContent = attempts >= 2
          ? `✗ Revisa: la respuesta esperada es ${input.dataset.answer}.`
          : `✗ Aún no. Pista: ${hint}`;
      }
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
    const chosenReason = ex.optionRationales?.[chosen];

    card.querySelectorAll('.option-label').forEach((lbl, i) => {
      if (i === ex.answer)   lbl.classList.add('correct-option');
      if (i === chosen && !ok) lbl.classList.add('wrong-option');
    });

    showFeedback(fb, ok ? 'correct' : 'incorrect',
      ok
        ? `✓ ¡Correcto! Elegiste la opción que satisface el concepto evaluado. ${renderMathInString(ex.explanation ?? '')}`
        : `✗ Incorrecto.${chosenReason ? ' ' + renderMathInString(chosenReason) : ''} La respuesta correcta es la opción ${ex.answer + 1}. ${renderMathInString(ex.explanation ?? '')}`);

    btn.disabled = true;
    if (sectionId && ok) markComplete(`ex:${sectionId}:${ex.id}`);
  });
}

function attachNumeric(card, ex, sectionId) {
  const btn  = card.querySelector('.btn-check');
  const inp  = card.querySelector('.exercise-input');
  const fb   = card.querySelector('.exercise-feedback');
  const expl = card.querySelector('.exercise-explanation');
  const hintBody = card.querySelector('.exercise-hint div');
  let attempts = 0;

  const verify = () => {
    const val = inp.value.trim();
    if (!val) {
      showFeedback(fb, 'warning', 'Ingresa una respuesta para verificar.');
      return;
    }
    const ok = checkAnswer(val, ex.answer, ex.tolerance ?? 0.01);
    if (!ok) attempts += 1;
    const progressiveHint = ok ? '' : getProgressiveHint(ex, attempts);
    if (hintBody && progressiveHint) {
      hintBody.innerHTML = renderMathInString(progressiveHint);
    }

    showFeedback(
      fb,
      ok ? 'correct' : 'incorrect',
      ok
        ? `✓ ¡Correcto! Aplicaste correctamente el procedimiento. ${renderMathInString(ex.explanation ?? '')}`
        : `✗ ${describeNumericError(val, ex.answer, ex.tolerance ?? 0.01)}${progressiveHint ? ' 💡 ' + renderMathInString(progressiveHint) : ''}`
    );

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

function getProgressiveHint(ex, attempts) {
  const hints = Array.isArray(ex.hints) ? ex.hints.filter(Boolean) : [];
  if (!hints.length && ex.hint) return ex.hint;
  if (!hints.length) return '';
  return hints[Math.min(attempts - 1, hints.length - 1)] ?? '';
}

function describeNumericError(raw, expected, tolerance) {
  const val = parseFloat(String(raw).replace(',', '.').trim());
  const exp = parseFloat(String(expected).replace(',', '.').trim());

  if (isNaN(val) && !isNaN(exp)) {
    return 'Tu respuesta debe ser numérica.';
  }
  if (!isNaN(val) && !isNaN(exp)) {
    const tol = tolerance * (Math.abs(exp) || 1) + 1e-9;
    const diff = val - exp;
    if (Math.abs(Math.abs(val) - Math.abs(exp)) <= tol && Math.abs(diff) > tol) {
      return 'Parece un error de signo.';
    }
    if (Math.abs(diff) <= Math.abs(exp) * 0.15 + tol) {
      return 'Estás cerca; revisa el redondeo o una operación intermedia.';
    }
  }
  return 'Respuesta incorrecta.';
}

/**
 * Compare user input against expected answer.
 * Handles numeric values with tolerance, and string comparison.
 * Exported for testing.
 */
export function checkAnswer(raw, expected, tolerance = 0.01) {
  const val  = parseFloat(String(raw).replace(',', '.').trim());
  const exp  = parseFloat(String(expected).replace(',', '.').trim());
  if (!isNaN(val) && !isNaN(exp)) {
    const tol = tolerance * (Math.abs(exp) || 1) + 1e-9;
    return Math.abs(val - exp) <= tol;
  }
  return String(raw).trim().toLowerCase() === String(expected).trim().toLowerCase();
}
