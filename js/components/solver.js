/**
 * solver.js – Step-by-step expression solver component.
 * Supports: linear equations, quadratic (Bhaskara), Ruffini, polynomial evaluation, inequalities.
 */
import { math } from '../render.js';

// ─── Registry ─────────────────────────────────────────────────────────────

/** sectionId → array of { label, init } solver descriptors */
const SOLVERS = {
  'linear-equations': [
    { label: 'Ecuación lineal  ax + b = c', init: initLinear },
  ],
  'quadratic-equations': [
    { label: 'Bhaskara  ax² + bx + c = 0', init: initBhaskara },
  ],
  'inequalities': [
    { label: 'Inecuación lineal  ax + b  ≤/≥  c', init: initInequality },
  ],
  'polynomials': [
    { label: 'Regla de Ruffini', init: initRuffini },
    { label: 'Evaluar P(k) — Horner', init: initPolyEval },
  ],
};

// ─── Public API ───────────────────────────────────────────────────────────

export function hasSolver(sectionId) {
  return Array.isArray(SOLVERS[sectionId]) && SOLVERS[sectionId].length > 0;
}

export function renderSolver(sectionId) {
  const solvers = SOLVERS[sectionId];
  const wrap = document.createElement('div');
  wrap.className = 'solver-section';
  if (!solvers || !solvers.length) return wrap;

  wrap.innerHTML = `
    <h2 class="solver-section-title">🔧 Resolvedor guiado</h2>
    <p class="solver-intro">Ingresa los datos y el resolvedor muestra cada paso del procedimiento.</p>`;

  if (solvers.length === 1) {
    const panel = mkPanel();
    solvers[0].init(panel);
    wrap.appendChild(panel);
  } else {
    const tabBar = document.createElement('div');
    tabBar.className = 'solver-tab-bar';
    const container = document.createElement('div');
    container.className = 'solver-panels-container';

    solvers.forEach((s, i) => {
      const btn = document.createElement('button');
      btn.className = 'solver-tab-btn' + (i === 0 ? ' active' : '');
      btn.textContent = s.label;
      btn.dataset.idx = i;
      tabBar.appendChild(btn);

      const panel = mkPanel();
      if (i !== 0) panel.classList.add('hidden');
      s.init(panel);
      container.appendChild(panel);
    });

    tabBar.addEventListener('click', e => {
      const btn = e.target.closest('.solver-tab-btn');
      if (!btn) return;
      tabBar.querySelectorAll('.solver-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const idx = parseInt(btn.dataset.idx, 10);
      container.querySelectorAll('.solver-panel').forEach((p, i) =>
        p.classList.toggle('hidden', i !== idx));
    });

    wrap.appendChild(tabBar);
    wrap.appendChild(container);
  }

  return wrap;
}

// ─── DOM helpers ──────────────────────────────────────────────────────────

function mkPanel() {
  const p = document.createElement('div');
  p.className = 'solver-panel';
  return p;
}

function field(id, label, defaultVal, type = 'number') {
  return `
    <div class="solver-field">
      <label for="${id}" class="solver-field-label">${label}</label>
      <input class="solver-input" type="${type}" id="${id}" value="${defaultVal}"
             autocomplete="off"${type === 'number' ? ' step="any"' : ''}>
    </div>`;
}

function stepHTML(num, label, texContent, note = '', noteClass = '') {
  return `
    <div class="solver-step">
      <div class="solver-step-num">${num === '✓' ? '✓' : 'Paso ' + num}</div>
      <div class="solver-step-body">
        <div class="solver-step-label">${label}</div>
        <div class="solver-step-formula">${math(texContent, true)}</div>
        ${note ? `<div class="solver-step-note ${noteClass}">${note}</div>` : ''}
      </div>
    </div>`;
}

function solverError(msg) {
  return `<div class="solver-error">⚠️ ${msg}</div>`;
}

function resultBadge(texContent, label = 'Resultado') {
  return `
    <div class="solver-result-badge">
      <span class="result-badge-label">${label}</span>
      <div class="result-badge-value">${math(texContent, true)}</div>
    </div>`;
}

function showSteps(el, html) {
  el.innerHTML = html;
  el.classList.remove('hidden');
  // Re-render KaTeX on newly injected content (auto-render extension)
  if (typeof renderMathInElement !== 'undefined') {
    renderMathInElement(el, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false },
      ],
      throwOnError: false,
    });
  }
}

// ─── Math utilities ───────────────────────────────────────────────────────

function gcd(a, b) {
  a = Math.abs(a); b = Math.abs(b);
  while (b) { [a, b] = [b, a % b]; }
  return a || 1;
}

/** Format a number cleanly (no trailing zeros, max 6 decimals). */
function fn(n) {
  if (!isFinite(n)) return '\\infty';
  const r = Math.round(n * 1e9) / 1e9; // snap floating-point noise
  if (Number.isInteger(r)) return String(r);
  return parseFloat(r.toFixed(6)).toString();
}

/**
 * Format integer numerator/denominator as reduced TeX fraction.
 * Falls back to decimal for non-integers.
 */
function frac(p, q) {
  if (q === 0) return '\\text{indefinido}';
  if (!Number.isInteger(p) || !Number.isInteger(q)) return fn(p / q);
  const sign = (p < 0) !== (q < 0) ? '-' : '';
  p = Math.abs(p); q = Math.abs(q);
  const g = gcd(p, q);
  const n = p / g, d = q / g;
  if (d === 1) return `${sign}${n}`;
  return `${sign}\\dfrac{${n}}{${d}}`;
}

/** Build TeX string for a polynomial from a coefficient array [a_n, …, a_0]. */
function polyTeX(coeffs) {
  const deg = coeffs.length - 1;
  const terms = [];
  for (let i = 0; i <= deg; i++) {
    const c = coeffs[i];
    const exp = deg - i;
    if (c === 0) continue;
    const absC = Math.abs(c);
    const sgn = c < 0 ? '-' : '+';
    let varPart = exp === 0 ? '' : exp === 1 ? 'x' : `x^{${exp}}`;
    let coefStr = varPart === '' ? `${fn(absC)}` : (absC === 1 ? varPart : `${fn(absC)}${varPart}`);
    terms.push(terms.length === 0 ? (c < 0 ? `-${coefStr}` : coefStr) : `${sgn} ${coefStr}`);
  }
  return terms.length ? terms.join(' ') : '0';
}

/** Parse comma-separated numbers. Returns null on any invalid token. */
function parseCoeffList(str) {
  const parts = str.split(',').map(s => parseFloat(s.trim()));
  return parts.some(isNaN) ? null : parts;
}

/** Sign helper: returns "+7" or "-3" (never "+0" unless zero). */
function signedTerm(n) {
  if (n === 0) return '';
  return n > 0 ? `+ ${fn(n)}` : `- ${fn(Math.abs(n))}`;
}

// ─── Linear equation  ax + b = c ─────────────────────────────────────────

function initLinear(panel) {
  panel.innerHTML = `
    <p class="solver-description">
      Resuelve <strong>ax + b = c</strong> mostrando el procedimiento completo.
    </p>
    <div class="solver-form">
      ${field('lin-a', 'a — coeficiente de x', 3)}
      ${field('lin-b', 'b — término independiente izquierdo', 7)}
      ${field('lin-c', 'c — lado derecho', 22)}
      <div class="solver-preview" id="lin-preview"></div>
      <button class="solver-btn" id="lin-solve">Resolver →</button>
    </div>
    <div class="solver-steps hidden" id="lin-steps"></div>`;

  const getA = () => parseFloat(panel.querySelector('#lin-a').value);
  const getB = () => parseFloat(panel.querySelector('#lin-b').value);
  const getC = () => parseFloat(panel.querySelector('#lin-c').value);
  const preview  = panel.querySelector('#lin-preview');
  const stepsEl  = panel.querySelector('#lin-steps');

  function updatePreview() {
    const [a, b, c] = [getA(), getB(), getC()];
    if ([a, b, c].some(isNaN)) { preview.innerHTML = ''; return; }
    preview.innerHTML = math(`${fn(a)}x ${signedTerm(b)} = ${fn(c)}`, true);
  }

  panel.querySelectorAll('.solver-input').forEach(el => el.addEventListener('input', updatePreview));
  updatePreview();

  panel.querySelector('#lin-solve').addEventListener('click', () => {
    const a = getA(), b = getB(), c = getC();
    if ([a, b, c].some(isNaN)) {
      showSteps(stepsEl, solverError('Todos los campos deben ser números válidos.'));
      return;
    }

    let html = `<h3 class="solver-steps-title">Procedimiento paso a paso</h3>`;
    html += stepHTML(1, 'Ecuación original', `${fn(a)}x ${signedTerm(b)} = ${fn(c)}`);

    if (a === 0) {
      const isIdentity = (b === c);
      html += `<div class="solver-step">
        <div class="solver-step-num">—</div>
        <div class="solver-step-body">
          <div class="solver-step-label">Con a = 0 la ecuación no depende de x</div>
          <div class="solver-step-formula">${math(`${fn(b)} = ${fn(c)}`, true)}</div>
          <div class="solver-step-note ${isIdentity ? '' : 'solver-step-error'}">
            ${isIdentity
              ? 'La igualdad es siempre verdadera → la ecuación tiene <strong>infinitas soluciones</strong>.'
              : `${fn(b)} ≠ ${fn(c)} → la ecuación es una contradicción y <strong>no tiene solución</strong>.`}
          </div>
        </div>
      </div>`;
      showSteps(stepsEl, html);
      return;
    }

    const rhs = c - b;
    html += stepHTML(2,
      `Trasladar el término independiente (${fn(b)}) al lado derecho cambiando su signo`,
      `${fn(a)}x = ${fn(c)} ${signedTerm(-b)} = ${fn(rhs)}`);

    html += stepHTML(3,
      `Dividir ambos miembros por el coeficiente de x (${fn(a)})`,
      `x = \\dfrac{${fn(rhs)}}{${fn(a)}}`);

    const xTeX = frac(rhs, a);
    const x    = rhs / a;
    html += stepHTML(4, 'Simplificar', `x = ${xTeX}`);

    const check = a * x + b;
    html += stepHTML(5,
      'Verificación: sustituir en la ecuación original',
      `${fn(a)} \\cdot ${xTeX} ${signedTerm(b)} = ${fn(a * x)} ${signedTerm(b)} = ${fn(Math.round(check * 1e9) / 1e9)}`,
      Math.abs(check - c) < 1e-9 ? `= ${fn(c)} ✓` : '');

    html += resultBadge(`x = ${xTeX}`);
    showSteps(stepsEl, html);
  });
}

// ─── Quadratic equation  ax² + bx + c = 0  (Bhaskara) ───────────────────

function initBhaskara(panel) {
  panel.innerHTML = `
    <p class="solver-description">
      Resuelve <strong>ax² + bx + c = 0</strong> con la fórmula cuadrática de Bhaskara,
      mostrando el discriminante, las raíces y la verificación con las relaciones de Vieta.
    </p>
    <div class="solver-form">
      ${field('bh-a', 'a — coeficiente de x²', 1)}
      ${field('bh-b', 'b — coeficiente de x', -5)}
      ${field('bh-c', 'c — término independiente', 6)}
      <div class="solver-preview" id="bh-preview"></div>
      <button class="solver-btn" id="bh-solve">Resolver →</button>
    </div>
    <div class="solver-steps hidden" id="bh-steps"></div>`;

  const getA = () => parseFloat(panel.querySelector('#bh-a').value);
  const getB = () => parseFloat(panel.querySelector('#bh-b').value);
  const getC = () => parseFloat(panel.querySelector('#bh-c').value);
  const preview = panel.querySelector('#bh-preview');
  const stepsEl = panel.querySelector('#bh-steps');

  function updatePreview() {
    const [a, b, c] = [getA(), getB(), getC()];
    if ([a, b, c].some(isNaN)) { preview.innerHTML = ''; return; }
    preview.innerHTML = math(polyTeX([a, b, c]) + ' = 0', true);
  }

  panel.querySelectorAll('.solver-input').forEach(el => el.addEventListener('input', updatePreview));
  updatePreview();

  panel.querySelector('#bh-solve').addEventListener('click', () => {
    const a = getA(), b = getB(), c = getC();
    if ([a, b, c].some(isNaN)) {
      showSteps(stepsEl, solverError('Todos los campos deben ser números válidos.'));
      return;
    }
    if (a === 0) {
      showSteps(stepsEl, solverError('El coeficiente "a" no puede ser 0 (no sería una ecuación cuadrática). Usa el resolvedor de ecuación lineal.'));
      return;
    }

    let html = `<h3 class="solver-steps-title">Procedimiento paso a paso</h3>`;
    html += stepHTML(1, 'Ecuación original', polyTeX([a, b, c]) + ' = 0',
      `Identificar: a = ${fn(a)}, b = ${fn(b)}, c = ${fn(c)}`);

    html += stepHTML(2, 'Calcular el discriminante Δ = b² − 4ac',
      `\\Delta = (${fn(b)})^2 - 4 \\cdot (${fn(a)}) \\cdot (${fn(c)}) = ${fn(b * b)} - ${fn(4 * a * c)}`);

    const delta = b * b - 4 * a * c;
    html += stepHTML(3, 'Valor del discriminante',
      `\\Delta = ${fn(delta)}`,
      delta > 0 ? '\\Delta > 0 → dos raíces reales distintas'
      : delta === 0 ? '\\Delta = 0 → una raíz doble'
      : '\\Delta < 0 → sin raíces reales');

    if (delta < 0) {
      html += `<div class="solver-step">
        <div class="solver-step-num">—</div>
        <div class="solver-step-body">
          <div class="solver-step-label">Interpretación</div>
          <div class="solver-step-formula">${math(`\\Delta = ${fn(delta)} < 0`, true)}</div>
          <div class="solver-step-note solver-step-error">
            La parábola no corta al eje x: la ecuación <strong>no tiene soluciones reales</strong>.
          </div>
        </div>
      </div>`;
      html += resultBadge('\\nexists\\; x \\in \\mathbb{R}', 'Sin solución real');

    } else if (delta === 0) {
      const xTeX = frac(-b, 2 * a);
      html += stepHTML(4,
        'Δ = 0 → raíz doble',
        `x = \\frac{-b}{2a} = \\frac{${fn(-b)}}{${fn(2 * a)}} = ${xTeX}`);
      html += resultBadge(`x_1 = x_2 = ${xTeX}`);

    } else {
      const sqrtD     = Math.sqrt(delta);
      const sqrtDTeX  = Number.isInteger(sqrtD) ? fn(sqrtD) : `\\sqrt{${fn(delta)}}`;
      const isCleanSqrt = Number.isInteger(sqrtD);

      html += stepHTML(4, 'Raíz cuadrada del discriminante',
        `\\sqrt{\\Delta} = \\sqrt{${fn(delta)}} = ${isCleanSqrt ? fn(sqrtD) : '\\approx ' + fn(sqrtD)}`);

      html += stepHTML(5, 'Aplicar la fórmula de Bhaskara',
        `x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a} = \\frac{${fn(-b)} \\pm ${sqrtDTeX}}{${fn(2 * a)}}`);

      const x1 = (-b + sqrtD) / (2 * a);
      const x2 = (-b - sqrtD) / (2 * a);
      const x1TeX = (isCleanSqrt && Number.isInteger(b) && Number.isInteger(a))
        ? frac(-b + sqrtD, 2 * a) : fn(x1);
      const x2TeX = (isCleanSqrt && Number.isInteger(b) && Number.isInteger(a))
        ? frac(-b - sqrtD, 2 * a) : fn(x2);

      html += stepHTML(6, 'Raíz 1 (signo +)',
        `x_1 = \\frac{${fn(-b)} + ${sqrtDTeX}}{${fn(2 * a)}} = ${x1TeX}`);

      html += stepHTML(7, 'Raíz 2 (signo −)',
        `x_2 = \\frac{${fn(-b)} - ${sqrtDTeX}}{${fn(2 * a)}} = ${x2TeX}`);

      html += stepHTML(8, 'Forma factorizada del polinomio',
        `${fn(a)}(x - ${x1TeX})(x - ${x2TeX}) = 0`);

      // Vieta cross-check
      const vieta_sum  = fn(Math.round((x1 + x2) * 1e9) / 1e9);
      const vieta_prod = fn(Math.round((x1 * x2) * 1e9) / 1e9);
      html += `<div class="solver-step solver-step-vieta">
        <div class="solver-step-num">✓</div>
        <div class="solver-step-body">
          <div class="solver-step-label">Verificación con Relaciones de Vieta</div>
          <div class="solver-step-formula">${math(
            `x_1 + x_2 = ${vieta_sum} = -\\dfrac{b}{a} = ${fn(-b / a)} \\;\\checkmark`, true)}</div>
          <div class="solver-step-formula">${math(
            `x_1 \\cdot x_2 = ${vieta_prod} = \\dfrac{c}{a} = ${fn(c / a)} \\;\\checkmark`, true)}</div>
        </div>
      </div>`;

      html += resultBadge(`x_1 = ${x1TeX}, \\quad x_2 = ${x2TeX}`);
    }

    showSteps(stepsEl, html);
  });
}

// ─── Ruffini's rule ───────────────────────────────────────────────────────

function initRuffini(panel) {
  panel.innerHTML = `
    <p class="solver-description">
      Divide <strong>P(x)</strong> por el factor lineal <strong>(x − k)</strong> usando la
      regla de Ruffini (división sintética). Si k es raíz, el resto es 0 y se obtiene la factorización.
    </p>
    <div class="solver-form">
      ${field('ruf-coeffs', 'Coeficientes de P(x), uno por grado, separados por coma<br><small>Ejemplo: 1, −6, 11, −6 para x³ − 6x² + 11x − 6. Escribe 0 para coeficientes ausentes.</small>', '1, -6, 11, -6', 'text')}
      ${field('ruf-k', 'Raíz candidata k (divide por x − k)', 1)}
      <div class="solver-preview" id="ruf-preview"></div>
      <button class="solver-btn" id="ruf-solve">Resolver →</button>
    </div>
    <div class="solver-steps hidden" id="ruf-steps"></div>`;

  const coeffsEl = panel.querySelector('#ruf-coeffs');
  const kEl      = panel.querySelector('#ruf-k');
  const preview  = panel.querySelector('#ruf-preview');
  const stepsEl  = panel.querySelector('#ruf-steps');

  function updatePreview() {
    const coeffs = parseCoeffList(coeffsEl.value);
    const k = parseFloat(kEl.value);
    if (!coeffs || isNaN(k)) { preview.innerHTML = ''; return; }
    preview.innerHTML = math(`P(x) = ${polyTeX(coeffs)}, \\quad k = ${fn(k)}`, true);
  }

  [coeffsEl, kEl].forEach(el => el.addEventListener('input', updatePreview));
  updatePreview();

  panel.querySelector('#ruf-solve').addEventListener('click', () => {
    const coeffs = parseCoeffList(coeffsEl.value);
    const k = parseFloat(kEl.value);

    if (!coeffs) {
      showSteps(stepsEl, solverError('Los coeficientes deben ser números separados por coma. Ejemplo: 1, -6, 11, -6'));
      return;
    }
    if (coeffs.length < 2) {
      showSteps(stepsEl, solverError('Se necesita un polinomio de grado ≥ 1 (mínimo 2 coeficientes).'));
      return;
    }
    if (isNaN(k)) {
      showSteps(stepsEl, solverError('k debe ser un número válido.'));
      return;
    }

    // Synthetic division
    const result = [coeffs[0]];
    for (let i = 1; i < coeffs.length; i++) {
      result.push(Math.round((result[i - 1] * k + coeffs[i]) * 1e10) / 1e10);
    }
    const remainder = result[result.length - 1];
    const quotient  = result.slice(0, -1);
    const pk        = Math.round(remainder * 1e9) / 1e9;
    const isRoot    = Math.abs(pk) < 1e-9;

    let html = `<h3 class="solver-steps-title">Procedimiento paso a paso</h3>`;

    html += stepHTML(1, 'Polinomio original', `P(x) = ${polyTeX(coeffs)}`);
    html += stepHTML(2, 'División a realizar',
      `P(x) \\div (x - ${fn(k)})`,
      'Por el Teorema del Resto: el resto de la división es P(k).');

    html += stepHTML(3, `Verificación previa: calcular P(k) = P(${fn(k)})`,
      `P(${fn(k)}) = ${fn(pk)}`,
      isRoot
        ? `P(${fn(k)}) = 0 → k = ${fn(k)} es raíz ✓`
        : `P(${fn(k)}) = ${fn(pk)} ≠ 0 → k no es raíz. Habrá resto R = ${fn(pk)}.`);

    html += `<div class="solver-step">
      <div class="solver-step-num">Paso 4</div>
      <div class="solver-step-body">
        <div class="solver-step-label">Tabla de Ruffini — bajar, multiplicar por k, sumar; repetir columna a columna</div>
        <div class="ruffini-table-wrap">${buildRuffiniTable(coeffs, k, result)}</div>
        <div class="solver-step-note">
          Procedimiento: bajar el coeficiente líder →
          multiplicar el valor acumulado por k →
          sumar al siguiente coeficiente →
          repetir hasta el último. El último valor es el <strong>resto</strong>.
        </div>
      </div>
    </div>`;

    html += stepHTML(5, 'Cociente y resto',
      `P(x) = (x - ${fn(k)}) \\cdot Q(x) + R`,
      `Cociente: ${math('Q(x) = ' + polyTeX(quotient), false)}&ensp;|&ensp;Resto: ${math('R = ' + fn(pk), false)}`);

    if (isRoot) {
      html += stepHTML(6,
        `Como R = 0, k = ${fn(k)} es raíz → factorización directa`,
        `P(x) = (x - ${fn(k)}) \\cdot (${polyTeX(quotient)})`);

      // If the quotient is degree 2, try to factor it too
      if (quotient.length === 3) {
        const [qa, qb, qc] = quotient;
        const qd = qb * qb - 4 * qa * qc;
        if (qd >= 0) {
          const sqrtQd  = Math.sqrt(qd);
          const r1TeX   = (Number.isInteger(sqrtQd) && Number.isInteger(qb) && Number.isInteger(qa))
            ? frac(-qb + sqrtQd, 2 * qa) : fn((-qb + sqrtQd) / (2 * qa));
          const r2TeX   = (Number.isInteger(sqrtQd) && Number.isInteger(qb) && Number.isInteger(qa))
            ? frac(-qb - sqrtQd, 2 * qa) : fn((-qb - sqrtQd) / (2 * qa));
          html += stepHTML(7,
            'El cociente es cuadrático → factorizar sus raíces con Bhaskara',
            `P(x) = ${fn(qa)} \\cdot (x - ${fn(k)})(x - ${r1TeX})(x - ${r2TeX})`);
        }
      }

      html += resultBadge(
        `P(x) = (x - ${fn(k)}) \\cdot (${polyTeX(quotient)})`, 'Factorización');
    } else {
      html += resultBadge(
        `Q(x) = ${polyTeX(quotient)}, \\quad R = ${fn(pk)}`, 'Resultado');
    }

    showSteps(stepsEl, html);
  });
}

function buildRuffiniTable(coeffs, k, result) {
  const n = coeffs.length;
  const products = [''];
  for (let i = 1; i < n; i++) {
    products.push(fn(Math.round(result[i - 1] * k * 1e10) / 1e10));
  }

  let t = `<table class="ruffini-table">`;
  // Row 1: k | original coefficients
  t += `<tr class="ruffini-head-row">
    <td class="ruffini-k-cell ruffini-k">${fn(k)}</td>
    ${coeffs.map(c => `<td class="ruffini-coef">${fn(c)}</td>`).join('')}
  </tr>`;
  // Row 2: products (empty first, then k × prev result)
  t += `<tr class="ruffini-prod-row">
    <td class="ruffini-k-cell"></td>
    ${products.map(p => `<td class="ruffini-prod">${p}</td>`).join('')}
  </tr>`;
  // Divider
  t += `<tr class="ruffini-divider-row"><td colspan="${n + 1}" class="ruffini-divider"></td></tr>`;
  // Row 3: result / quotient + remainder
  t += `<tr class="ruffini-result-row">
    <td class="ruffini-k-cell"></td>
    ${result.map((r, i) => `<td class="${i === result.length - 1 ? 'ruffini-remainder' : 'ruffini-result'}">${fn(r)}</td>`).join('')}
  </tr>`;
  t += `</table>`;
  return t;
}

// ─── Polynomial evaluation using Horner's method ─────────────────────────

function initPolyEval(panel) {
  panel.innerHTML = `
    <p class="solver-description">
      Evalúa <strong>P(k)</strong> paso a paso usando el
      <em>método de Horner</em> (evaluación anidada), que minimiza el número de operaciones.
    </p>
    <div class="solver-form">
      ${field('ev-coeffs', 'Coeficientes de P(x), uno por grado, separados por coma<br><small>Ejemplo: 1, −3, 0, 1 para x³ − 3x + 1. Escribe 0 para coeficientes ausentes.</small>', '1, -3, 0, 1', 'text')}
      ${field('ev-k', 'Valor k a evaluar', 2)}
      <div class="solver-preview" id="ev-preview"></div>
      <button class="solver-btn" id="ev-solve">Resolver →</button>
    </div>
    <div class="solver-steps hidden" id="ev-steps"></div>`;

  const coeffsEl = panel.querySelector('#ev-coeffs');
  const kEl      = panel.querySelector('#ev-k');
  const preview  = panel.querySelector('#ev-preview');
  const stepsEl  = panel.querySelector('#ev-steps');

  function updatePreview() {
    const coeffs = parseCoeffList(coeffsEl.value);
    const k = parseFloat(kEl.value);
    if (!coeffs || isNaN(k)) { preview.innerHTML = ''; return; }
    preview.innerHTML = math(`P(x) = ${polyTeX(coeffs)},\\quad k = ${fn(k)}`, true);
  }

  [coeffsEl, kEl].forEach(el => el.addEventListener('input', updatePreview));
  updatePreview();

  panel.querySelector('#ev-solve').addEventListener('click', () => {
    const coeffs = parseCoeffList(coeffsEl.value);
    const k = parseFloat(kEl.value);

    if (!coeffs || coeffs.length < 1) {
      showSteps(stepsEl, solverError('Los coeficientes deben ser números separados por coma.'));
      return;
    }
    if (isNaN(k)) {
      showSteps(stepsEl, solverError('k debe ser un número válido.'));
      return;
    }

    let html = `<h3 class="solver-steps-title">Procedimiento paso a paso</h3>`;
    html += stepHTML(1, 'Polinomio y punto de evaluación',
      `P(x) = ${polyTeX(coeffs)}, \\quad k = ${fn(k)}`);

    html += `<div class="solver-step">
      <div class="solver-step-num">Paso 2</div>
      <div class="solver-step-body">
        <div class="solver-step-label">
          Método de Horner: comenzar con el coeficiente líder y aplicar
          ${math('acc_{i} = acc_{i-1} \\cdot k + a_i', false)} en cada paso
        </div>
        <div class="horner-table">`;

    let acc = coeffs[0];
    html += `<div class="horner-row horner-row-init">
      <span class="horner-label">acc₀&nbsp;(inicio)</span>
      <span class="horner-formula">${math(`acc = ${fn(acc)}`, false)}</span>
    </div>`;

    for (let i = 1; i < coeffs.length; i++) {
      const prev = acc;
      acc = Math.round((acc * k + coeffs[i]) * 1e10) / 1e10;
      html += `<div class="horner-row">
        <span class="horner-label">acc${i}</span>
        <span class="horner-formula">${math(
          `${fn(prev)} \\cdot ${fn(k)} + (${fn(coeffs[i])}) = ${fn(acc)}`, false)}</span>
      </div>`;
    }

    html += `</div></div></div>`; // close horner-table, step-body, solver-step

    const result = Math.round(acc * 1e9) / 1e9;
    html += stepHTML(3, `Resultado final`,
      `P(${fn(k)}) = ${fn(result)}`,
      Math.abs(result) < 1e-9
        ? `P(${fn(k)}) = 0 → k = ${fn(k)} es raíz del polinomio ✓`
        : `P(${fn(k)}) = ${fn(result)} ≠ 0 → k = ${fn(k)} no es raíz`);

    html += resultBadge(`P(${fn(k)}) = ${fn(result)}`);
    showSteps(stepsEl, html);
  });
}

// ─── Linear inequality  ax + b  ≤/≥  c ──────────────────────────────────

const OPTeX   = { le: '\\leq', ge: '\\geq', lt: '<', gt: '>' };
const OPFlip  = { le: 'ge',    ge: 'le',    lt: 'gt', gt: 'lt' };
const OPLabel = { le: '≤',     ge: '≥',     lt: '<',  gt: '>'  };

function intervalTeX(op, bound) {
  if (op === 'le') return `\\left(-\\infty,\\, ${bound}\\right]`;
  if (op === 'ge') return `\\left[${bound},\\, +\\infty\\right)`;
  if (op === 'lt') return `\\left(-\\infty,\\, ${bound}\\right)`;
  if (op === 'gt') return `\\left(${bound},\\, +\\infty\\right)`;
  return '';
}

function initInequality(panel) {
  panel.innerHTML = `
    <p class="solver-description">
      Resuelve <strong>ax + b ≤ c</strong> (o ≥, &lt;, &gt;). El procedimiento es idéntico
      al de ecuaciones lineales, salvo que al <em>dividir o multiplicar por un negativo</em>
      el sentido de la desigualdad se invierte.
    </p>
    <div class="solver-form">
      ${field('ineq-a', 'a — coeficiente de x', -2)}
      ${field('ineq-b', 'b — término independiente izquierdo', 4)}
      <div class="solver-field">
        <label for="ineq-op" class="solver-field-label">Operador</label>
        <select id="ineq-op" class="solver-input solver-select">
          <option value="le">≤</option>
          <option value="ge">≥</option>
          <option value="lt">&lt;</option>
          <option value="gt">&gt;</option>
        </select>
      </div>
      ${field('ineq-c', 'c — lado derecho', 10)}
      <div class="solver-preview" id="ineq-preview"></div>
      <button class="solver-btn" id="ineq-solve">Resolver →</button>
    </div>
    <div class="solver-steps hidden" id="ineq-steps"></div>`;

  const getA  = () => parseFloat(panel.querySelector('#ineq-a').value);
  const getB  = () => parseFloat(panel.querySelector('#ineq-b').value);
  const getC  = () => parseFloat(panel.querySelector('#ineq-c').value);
  const getOp = () => panel.querySelector('#ineq-op').value;
  const preview = panel.querySelector('#ineq-preview');
  const stepsEl = panel.querySelector('#ineq-steps');

  function updatePreview() {
    const [a, b, c, op] = [getA(), getB(), getC(), getOp()];
    if ([a, b, c].some(isNaN)) { preview.innerHTML = ''; return; }
    preview.innerHTML = math(`${fn(a)}x ${signedTerm(b)} ${OPTeX[op]} ${fn(c)}`, true);
  }

  panel.querySelectorAll('.solver-input, .solver-select').forEach(el => {
    el.addEventListener('input', updatePreview);
    el.addEventListener('change', updatePreview);
  });
  updatePreview();

  panel.querySelector('#ineq-solve').addEventListener('click', () => {
    const a = getA(), b = getB(), c = getC(), op = getOp();
    if ([a, b, c].some(isNaN)) {
      showSteps(stepsEl, solverError('Todos los campos deben ser números válidos.'));
      return;
    }

    let html = `<h3 class="solver-steps-title">Procedimiento paso a paso</h3>`;
    html += stepHTML(1, 'Inecuación original',
      `${fn(a)}x ${signedTerm(b)} ${OPTeX[op]} ${fn(c)}`);

    if (a === 0) {
      const holds = (op === 'le' && b <= c) || (op === 'lt' && b < c)
                 || (op === 'ge' && b >= c) || (op === 'gt' && b > c);
      html += `<div class="solver-step">
        <div class="solver-step-num">—</div>
        <div class="solver-step-body">
          <div class="solver-step-label">Con a = 0 la inecuación no depende de x</div>
          <div class="solver-step-formula">${math(`${fn(b)} ${OPTeX[op]} ${fn(c)}`, true)}</div>
          <div class="solver-step-note ${holds ? '' : 'solver-step-error'}">
            ${holds
              ? 'Siempre verdadero → solución: todo ℝ'
              : 'Siempre falso → sin solución'}
          </div>
        </div>
      </div>`;
      showSteps(stepsEl, html);
      return;
    }

    const rhs = c - b;
    html += stepHTML(2,
      `Trasladar ${fn(b)} al lado derecho (cambiar signo)`,
      `${fn(a)}x ${OPTeX[op]} ${fn(c)} ${signedTerm(-b)} = ${fn(rhs)}`);

    const flipped  = a < 0;
    const finalOp  = flipped ? OPFlip[op] : op;

    html += stepHTML(3,
      flipped
        ? `Dividir por ${fn(a)} — ⚠️ negativo: el sentido de la desigualdad se invierte`
        : `Dividir ambos miembros por ${fn(a)}`,
      `x ${OPTeX[finalOp]} \\dfrac{${fn(rhs)}}{${fn(a)}}`,
      flipped
        ? '⚠️ <strong>Al dividir por un número negativo, el signo de la desigualdad se invierte.</strong>'
        : '');

    const xTeX = frac(rhs, a);
    html += stepHTML(4, 'Simplificar', `x ${OPTeX[finalOp]} ${xTeX}`);

    html += resultBadge(
      `x ${OPTeX[finalOp]} ${xTeX} \\quad\\Longrightarrow\\quad x \\in ${intervalTeX(finalOp, xTeX)}`,
      'Solución');

    showSteps(stepsEl, html);
  });
}
