/**
 * game.js – Mobile-first card game mode.
 * Questions are randomly generated. Player types an answer, clicks "Comprobar",
 * sees the correct answer, then marks ✓/✗. Swipe also works on mobile.
 * Exports: renderGame(container)
 */

import { math } from '../render.js';

// ─── Math helpers ─────────────────────────────────────────────────────────

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function nonZero(min, max) {
  let n; do { n = randInt(min, max); } while (n === 0); return n;
}
function gcd(a, b) { return b === 0 ? Math.abs(a) : gcd(b, a % b); }
function reducedFrac(num, den) {
  if (den < 0) { num = -num; den = -den; }
  const g = gcd(Math.abs(num), den);
  return [num / g, den / g];
}
function fracTeX(num, den) {
  const [n, d] = reducedFrac(num, den);
  if (d === 1) return `${n}`;
  return `\\dfrac{${n < 0 ? '(' + n + ')' : n}}{${d}}`;
}

// ─── Answer normalization & checking ─────────────────────────────────────
// rawAnswer: string to compare against (after normalization), or null = self-assess

function normalizeInput(s) {
  return String(s).trim().toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')  // strip accents (sí→si)
    .replace(/\s+/g, '');
}
function checkAnswer(userInput, rawAnswer) {
  if (rawAnswer == null) return null;                    // can't auto-check
  return normalizeInput(userInput) === normalizeInput(String(rawAnswer));
}

// ─── Question generators ──────────────────────────────────────────────────
// Each returns { questionTeX, answerTeX, hint, category, difficulty, rawAnswer }

function genArithmetic() {
  const ops = ['+', '-', '×', '÷'];
  const op = ops[randInt(0, 3)];
  let a, b, ans, tex;
  if (op === '+') {
    a = randInt(2, 50); b = randInt(2, 50); ans = a + b; tex = `${a} + ${b}`;
  } else if (op === '-') {
    a = randInt(10, 60); b = randInt(1, a); ans = a - b; tex = `${a} - ${b}`;
  } else if (op === '×') {
    a = randInt(2, 15); b = randInt(2, 15); ans = a * b; tex = `${a} \\times ${b}`;
  } else {
    b = randInt(2, 12); ans = randInt(1, 12); a = b * ans; tex = `${a} \\div ${b}`;
  }
  return { questionTeX: `${tex} = ?`, answerTeX: `${ans}`, hint: `Operación: ${op}`, category: 'Aritmética', difficulty: 1, rawAnswer: String(ans) };
}

function genIntegers() {
  const x = nonZero(-10, 10), y = nonZero(-10, 10);
  const opIdx = randInt(0, 2);
  let tex, ans;
  if (opIdx === 0) {
    ans = x + y;
    tex = `${x} ${y >= 0 ? '+ ' + y : '- ' + Math.abs(y)}`;
  } else if (opIdx === 1) {
    ans = x - y; tex = `${x} - (${y})`;
  } else {
    ans = x * y; tex = `(${x})(${y})`;
  }
  return { questionTeX: `${tex} = ?`, answerTeX: `${ans}`, hint: 'igual signo→(+), distinto→(−)', category: 'Enteros', difficulty: 1, rawAnswer: String(ans) };
}

function genPower() {
  const base = randInt(2, 8), exp = randInt(2, 4);
  const ans = Math.pow(base, exp);
  return { questionTeX: `${base}^{${exp}} = ?`, answerTeX: `${ans}`, hint: `${base} por sí mismo ${exp} veces`, category: 'Potencias', difficulty: 1, rawAnswer: String(ans) };
}

function genSqrt() {
  const ans = randInt(2, 12);
  return { questionTeX: `\\sqrt{${ans * ans}} = ?`, answerTeX: `${ans}`, hint: '¿Qué número al cuadrado da eso?', category: 'Raíces', difficulty: 1, rawAnswer: String(ans) };
}

function genSimplifyRadical() {
  const a = randInt(2, 6);
  const b = [2, 3, 5, 6, 7][randInt(0, 4)];
  const n = a * a * b;
  const ansTeX = b === 1 ? `${a}` : `${a}\\sqrt{${b}}`;
  const rawAnswer = b === 1 ? String(a) : null;  // only checkable when answer is integer
  return { questionTeX: `\\sqrt{${n}} = ?`, answerTeX: ansTeX, hint: `Mayor cuadrado perfecto que divide ${n}`, category: 'Raíces', difficulty: 2, rawAnswer };
}

function genFracAdd() {
  const d1 = randInt(2, 8), d2 = randInt(2, 9);
  const n1 = randInt(1, d1 - 1), n2 = randInt(1, d2 - 1);
  const rn = n1 * d2 + n2 * d1, rd = d1 * d2;
  const [nr, dr] = reducedFrac(rn, rd);
  const ansTeX = dr === 1 ? `${nr}` : `\\dfrac{${nr}}{${dr}}`;
  const rawAnswer = dr === 1 ? String(nr) : `${nr}/${dr}`;
  return { questionTeX: `\\dfrac{${n1}}{${d1}} + \\dfrac{${n2}}{${d2}} = ?`, answerTeX: ansTeX, hint: `Denominador común: ${d1 * d2 / gcd(d1, d2)}`, category: 'Fracciones', difficulty: 2, rawAnswer };
}

function genFracMul() {
  const n1 = randInt(1, 7), d1 = randInt(2, 9), n2 = randInt(1, 7), d2 = randInt(2, 9);
  const [nr, dr] = reducedFrac(n1 * n2, d1 * d2);
  const ansTeX = dr === 1 ? `${nr}` : `\\dfrac{${nr}}{${dr}}`;
  const rawAnswer = dr === 1 ? String(nr) : `${nr}/${dr}`;
  return { questionTeX: `\\dfrac{${n1}}{${d1}} \\times \\dfrac{${n2}}{${d2}} = ?`, answerTeX: ansTeX, hint: 'Numeradores × numeradores, denominadores × denominadores', category: 'Fracciones', difficulty: 2, rawAnswer };
}

function genPercent() {
  const pcts = [10, 15, 20, 25, 30, 40, 50, 75];
  const p = pcts[randInt(0, pcts.length - 1)];
  const whole = randInt(2, 20) * 10;
  const ans = (p / 100) * whole;
  return { questionTeX: `\\text{¿Cuánto es el } ${p}\\%\\text{ de } ${whole}\\,?`, answerTeX: `${ans}`, hint: `${whole} \\times \\tfrac{${p}}{100}`, category: 'Porcentajes', difficulty: 1, rawAnswer: String(ans) };
}

function genLinear() {
  const a = nonZero(-5, 5), x = randInt(-8, 8), b = randInt(-5, 5);
  const c = a * x + b;
  const aStr = a === 1 ? '' : a === -1 ? '-' : `${a}`;
  const bPart = b === 0 ? '' : b > 0 ? ` + ${b}` : ` - ${Math.abs(b)}`;
  return { questionTeX: `${aStr}x${bPart} = ${c}`, answerTeX: `x = ${x}`, hint: `Despeja x: resta ${b}, divide entre ${a}`, category: 'Ecuaciones', difficulty: 2, rawAnswer: String(x) };
}

function genTwoStep() {
  const a = nonZero(-4, 4), b = randInt(-5, 5), x = randInt(-6, 6);
  const c = a * (x + b);
  const aStr = a === 1 ? '' : a === -1 ? '-' : `${a}`;
  const bPart = b === 0 ? '' : b > 0 ? ` + ${b}` : ` - ${Math.abs(b)}`;
  return { questionTeX: `${aStr}(x${bPart}) = ${c}`, answerTeX: `x = ${x}`, hint: `Divide entre ${a}, luego resta ${b}`, category: 'Ecuaciones', difficulty: 2, rawAnswer: String(x) };
}

function genQuadratic() {
  const r1 = randInt(-6, 6), r2 = randInt(-6, 6);
  const b = -(r1 + r2), c = r1 * r2;
  const bStr = b === 0 ? '' : b > 0 ? ` + ${b}x` : ` - ${Math.abs(b)}x`;
  const cStr = c === 0 ? '' : c > 0 ? ` + ${c}` : ` - ${Math.abs(c)}`;
  const sorted = [r1, r2].sort((a, b) => a - b);
  const ansTeX = r1 === r2 ? `x = ${r1}` : `x_1 = ${sorted[0]},\\; x_2 = ${sorted[1]}`;
  return { questionTeX: `x^2${bStr}${cStr} = 0`, answerTeX: ansTeX, hint: `\\Delta = ${b * b - 4 * c}`, category: 'Cuadráticas', difficulty: 3, rawAnswer: null };
}

function genPolyEval() {
  const a = nonZero(-3, 3), b = randInt(-5, 5), c = randInt(-5, 5), k = randInt(-4, 4);
  const ans = a * k * k + b * k + c;
  const aStr = a === 1 ? '' : a === -1 ? '-' : `${a}`;
  const bStr = b === 0 ? '' : b > 0 ? ` + ${b}x` : ` - ${Math.abs(b)}x`;
  const cStr = c === 0 ? '' : c > 0 ? ` + ${c}` : ` - ${Math.abs(c)}`;
  return { questionTeX: `P(x)=${aStr}x^2${bStr}${cStr}\\\\[4pt]P(${k})=?`, answerTeX: `${ans}`, hint: `Sustituye x = ${k}`, category: 'Polinomios', difficulty: 2, rawAnswer: String(ans) };
}

function genIsRoot() {
  const a = nonZero(-2, 3), r1 = randInt(-5, 5), r2 = randInt(-5, 5);
  const pb = -(a * (r1 + r2)), pc = a * r1 * r2;
  const aStr = a === 1 ? '' : a === -1 ? '-' : `${a}`;
  const bStr = pb === 0 ? '' : pb > 0 ? ` + ${pb}x` : ` - ${Math.abs(pb)}x`;
  const cStr = pc === 0 ? '' : pc > 0 ? ` + ${pc}` : ` - ${Math.abs(pc)}`;
  const k = Math.random() < 0.5 ? r1 : randInt(-6, 6);
  const val = a * k * k + pb * k + pc;
  const isRoot = val === 0;
  return {
    questionTeX: `P(x)=${aStr}x^2${bStr}${cStr}\\\\[4pt]\\text{¿Es }x=${k}\\text{ raíz? (si/no)}`,
    answerTeX: isRoot ? `\\text{Sí} \\;—\\; P(${k})=0` : `\\text{No} \\;—\\; P(${k})=${val}`,
    hint: `Evalúa P(${k}) y verifica si es 0`,
    category: 'Polinomios', difficulty: 2, rawAnswer: isRoot ? 'si' : 'no',
  };
}

function genGeoArea() {
  const shape = ['rect', 'triangle', 'circle'][randInt(0, 2)];
  if (shape === 'rect') {
    const w = randInt(2, 20), h = randInt(2, 20);
    return { questionTeX: `\\text{Rectángulo: base }${w},\\text{ h }${h}\\\\[4pt]\\text{Área}=?`, answerTeX: `${w * h}`, hint: 'A = base × altura', category: 'Geometría', difficulty: 1, rawAnswer: String(w * h) };
  } else if (shape === 'triangle') {
    const b = randInt(2, 20), h = randInt(2, 20);
    const num = b * h;
    const [nr, dr] = reducedFrac(num, 2);
    const ansTeX = dr === 1 ? `${nr}` : `\\dfrac{${num}}{2}`;
    const rawAnswer = dr === 1 ? String(nr) : `${nr}/${dr}`;
    return { questionTeX: `\\text{Triángulo: base }${b},\\text{ h }${h}\\\\[4pt]\\text{Área}=?`, answerTeX: ansTeX, hint: 'A = (base × altura) / 2', category: 'Geometría', difficulty: 1, rawAnswer };
  } else {
    const r = randInt(1, 10);
    return { questionTeX: `\\text{Círculo: radio }${r}\\\\[4pt]\\text{Área}=?`, answerTeX: `${r * r}\\pi`, hint: 'A = π·r²', category: 'Geometría', difficulty: 1, rawAnswer: null };
  }
}

function genPythagoras() {
  const triples = [[3,4,5],[5,12,13],[8,15,17],[7,24,25],[6,8,10],[9,12,15],[9,40,41]];
  const [a, b, c] = triples[randInt(0, triples.length - 1)];
  const s = randInt(1, 3);
  const [sa, sb, sc] = [a * s, b * s, c * s];
  const missing = randInt(0, 2);
  let qTeX, rawAns;
  if (missing === 2) { qTeX = `\\text{Catetos: }${sa},\\;${sb}\\\\[4pt]\\text{Hipotenusa}=?`; rawAns = sc; }
  else if (missing === 0) { qTeX = `\\text{Cateto: }${sb},\\;\\text{Hip.: }${sc}\\\\[4pt]\\text{Cateto faltante}=?`; rawAns = sa; }
  else { qTeX = `\\text{Cateto: }${sa},\\;\\text{Hip.: }${sc}\\\\[4pt]\\text{Cateto faltante}=?`; rawAns = sb; }
  return { questionTeX: qTeX, answerTeX: `${rawAns}`, hint: 'a² + b² = c²  (c = hipotenusa)', category: 'Geometría', difficulty: 2, rawAnswer: String(rawAns) };
}

function genMcdMcm() {
  const pairs = [[4,6],[6,9],[8,12],[10,15],[12,18],[6,10],[4,8],[9,12],[15,20],[6,15],[8,20],[12,16]];
  const [a, b] = pairs[randInt(0, pairs.length - 1)];
  const g = gcd(a, b), l = (a * b) / g;
  const askMCD = Math.random() < 0.5;
  const ans = askMCD ? g : l;
  return { questionTeX: askMCD ? `\\text{MCD}(${a},\\;${b})=?` : `\\text{mcm}(${a},\\;${b})=?`, answerTeX: `${ans}`, hint: askMCD ? 'Mayor divisor común' : 'Menor múltiplo común', category: 'MCD / mcm', difficulty: 1, rawAnswer: String(ans) };
}

// ─── Generator registry ───────────────────────────────────────────────────

const GENERATORS = [
  genArithmetic, genIntegers, genPower, genSqrt, genSimplifyRadical,
  genFracAdd, genFracMul, genPercent, genLinear, genTwoStep,
  genQuadratic, genPolyEval, genIsRoot, genGeoArea, genPythagoras, genMcdMcm,
];

function generateBatch(n = 10) {
  const questions = [];
  const pool = [...GENERATORS];
  for (let i = 0; i < n; i++) {
    if (pool.length === 0) pool.push(...GENERATORS);
    const idx = randInt(0, pool.length - 1);
    const gen = pool.splice(idx, 1)[0];
    try { questions.push(gen()); } catch { questions.push(genArithmetic()); }
  }
  return questions;
}

// ─── Game state ───────────────────────────────────────────────────────────

let state = null;
let _swipeAC = null;   // AbortController for current card's swipe listeners

function resetState(n) {
  state = { questions: generateBatch(n), current: 0, correct: 0, streak: 0, maxStreak: 0, answered: [], startTime: Date.now() };
}

// ─── Public entry point ───────────────────────────────────────────────────

export function renderGame(container) {
  container.innerHTML = '';
  const root = document.createElement('div');
  root.className = 'game-root';
  container.appendChild(root);
  _buildLobby(root);
}

// ─── Screen: Lobby ────────────────────────────────────────────────────────

function _buildLobby(root) {
  if (_swipeAC) { _swipeAC.abort(); _swipeAC = null; }
  root.innerHTML = `
    <div class="game-lobby">
      <div class="game-lobby-icon">🎮</div>
      <h2 class="game-lobby-title">Modo Juego</h2>
      <p class="game-lobby-sub">Preguntas generadas al instante. Escribe tu respuesta, comprueba, y marca si acertaste.</p>
      <div class="game-options">
        <label class="game-option-label">¿Cuántas preguntas?</label>
        <div class="game-count-btns">
          <button class="game-count-btn active" data-n="5">5</button>
          <button class="game-count-btn" data-n="10">10</button>
          <button class="game-count-btn" data-n="15">15</button>
          <button class="game-count-btn" data-n="20">20</button>
        </div>
      </div>
      <div class="game-categories">
        <span class="game-cat-chip">Aritmética</span><span class="game-cat-chip">Enteros</span>
        <span class="game-cat-chip">Potencias</span><span class="game-cat-chip">Raíces</span>
        <span class="game-cat-chip">Fracciones</span><span class="game-cat-chip">Porcentajes</span>
        <span class="game-cat-chip">Ecuaciones</span><span class="game-cat-chip">Cuadráticas</span>
        <span class="game-cat-chip">Polinomios</span><span class="game-cat-chip">Geometría</span>
        <span class="game-cat-chip">MCD / mcm</span>
      </div>
      <button class="game-start-btn" id="game-start-btn">Comenzar ▶</button>
      <p class="game-swipe-hint">📱 Desliza la tarjeta · 🖥 Usa los botones · ⌨ Enter para comprobar</p>
    </div>`;

  let selectedN = 5;
  root.querySelectorAll('.game-count-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      root.querySelectorAll('.game-count-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedN = Number(btn.dataset.n);
    });
  });
  root.querySelector('#game-start-btn').addEventListener('click', () => {
    resetState(selectedN);
    _buildGame(root);
  });
}

// ─── Screen: Game ─────────────────────────────────────────────────────────

function _buildGame(root) {
  // Clean up previous card's swipe listeners
  if (_swipeAC) { _swipeAC.abort(); _swipeAC = null; }

  const q = state.questions[state.current];
  const total = state.questions.length;
  const progress = Math.round((state.current / total) * 100);

  root.innerHTML = `
    <div class="game-screen">
      <div class="game-header">
        <button class="game-back-btn" id="btn-back">← Salir</button>
        <span class="game-counter">${state.current + 1} / ${total}</span>
        <span class="game-score">✓ ${state.correct}</span>
      </div>
      <div class="game-progress-bar">
        <div class="game-progress-fill" style="width:${progress}%"></div>
      </div>

      <div class="game-card-area">
        <div class="game-card" id="game-card">
          <div class="game-card-meta">
            <span class="game-card-cat">${q.category}</span>
            <span class="game-difficulty">${'●'.repeat(q.difficulty)}${'○'.repeat(3 - q.difficulty)}</span>
          </div>
          <div class="game-card-question" id="card-question"></div>
          <div class="game-card-divider gm-hidden" id="card-divider"></div>
          <div class="game-card-answer gm-hidden" id="card-answer"></div>
          <div class="game-card-hint gm-hidden" id="card-hint"></div>
        </div>
        <div class="game-swipe-labels">
          <span class="game-label-wrong">✗ Incorrecto</span>
          <span class="game-label-correct">✓ Correcto</span>
        </div>
      </div>

      <div class="game-input-row" id="input-row">
        <input id="game-input" class="game-input" type="text"
               inputmode="decimal" autocomplete="off" autocorrect="off"
               autocapitalize="off" spellcheck="false"
               placeholder="Tu respuesta…">
        <button class="game-check-btn" id="btn-check">Comprobar ✓</button>
      </div>

      <div class="game-feedback gm-hidden" id="game-feedback"></div>

      <div class="game-actions gm-hidden" id="game-actions">
        <button class="game-action-btn game-wrong-btn" id="btn-wrong">✗ Incorrecto</button>
        <button class="game-action-btn game-correct-btn" id="btn-correct">✓ Correcto</button>
      </div>
    </div>`;

  // ── Render math ──
  const qEl = root.querySelector('#card-question');
  const aEl = root.querySelector('#card-answer');
  const hintEl = root.querySelector('#card-hint');
  const isDisplayQ = q.questionTeX.includes('\\\\') || q.questionTeX.includes('\\dfrac') || q.questionTeX.length > 36;
  const isDisplayA = q.answerTeX.includes('\\dfrac') || q.answerTeX.includes('\\frac');
  try { qEl.innerHTML = math(q.questionTeX, isDisplayQ); } catch { qEl.textContent = q.questionTeX; }
  try { aEl.innerHTML = math(q.answerTeX, isDisplayA); } catch { aEl.textContent = q.answerTeX; }
  hintEl.textContent = '💡 ' + q.hint;

  // ── References ──
  const card      = root.querySelector('#game-card');
  const inputEl   = root.querySelector('#game-input');
  const inputRow  = root.querySelector('#input-row');
  const feedbackEl = root.querySelector('#game-feedback');
  const actionsEl = root.querySelector('#game-actions');
  const wrongBtn  = root.querySelector('#btn-wrong');
  const correctBtn = root.querySelector('#btn-correct');

  root.querySelector('#btn-back').addEventListener('click', () => _buildLobby(root));

  // Focus input so mobile keyboard appears immediately
  requestAnimationFrame(() => inputEl.focus());

  // ── Reveal / check ──
  let checked = false;

  function doCheck() {
    if (checked) return;
    checked = true;

    // Show answer in card
    root.querySelector('#card-divider').classList.remove('gm-hidden');
    aEl.classList.remove('gm-hidden');
    hintEl.classList.remove('gm-hidden');

    // Hide input area
    inputRow.style.display = 'none';

    // Auto-check
    const autoResult = checkAnswer(inputEl.value, q.rawAnswer);
    if (autoResult !== null) {
      feedbackEl.classList.remove('gm-hidden');
      feedbackEl.innerHTML = autoResult
        ? '<span class="game-feedback-ok">✓ ¡Correcto!</span>'
        : '<span class="game-feedback-fail">✗ Incorrecto — mira la respuesta correcta arriba</span>';
      if (autoResult) correctBtn.classList.add('highlighted');
      else            wrongBtn.classList.add('highlighted');
    }

    // Show ✓/✗ action buttons
    actionsEl.classList.remove('gm-hidden');

    // Enable swipe now that answer is visible
    _enableSwipe(card, root);

    // Focus the highlighted button for keyboard navigation
    setTimeout(() => {
      if (autoResult === true) correctBtn.focus();
      else if (autoResult === false) wrongBtn.focus();
    }, 50);
  }

  root.querySelector('#btn-check').addEventListener('click', doCheck);
  inputEl.addEventListener('keydown', e => { if (e.key === 'Enter') doCheck(); });
  wrongBtn.addEventListener('click',  () => _advance(root, false));
  correctBtn.addEventListener('click', () => _advance(root, true));
}

// ─── Advance to next card ─────────────────────────────────────────────────

function _advance(root, correct) {
  if (_swipeAC) { _swipeAC.abort(); _swipeAC = null; }
  state.answered.push({ ...state.questions[state.current], correct });
  if (correct) { state.correct++; state.streak++; if (state.streak > state.maxStreak) state.maxStreak = state.streak; }
  else { state.streak = 0; }
  state.current++;
  if (state.current >= state.questions.length) _buildResult(root);
  else _buildGame(root);
}

// ─── Swipe mechanics ──────────────────────────────────────────────────────

function _enableSwipe(card, root) {
  _swipeAC = new AbortController();
  const { signal } = _swipeAC;
  let startX = 0, startY = 0, dx = 0, dragging = false;
  const THRESHOLD = 88;

  function onStart(x, y) { startX = x; startY = y; dx = 0; dragging = true; card.style.transition = 'none'; }

  function onMove(x, y) {
    if (!dragging) return;
    dx = x - startX;
    const dy = Math.abs(y - startY);
    // Cancel if mostly vertical scroll
    if (dy > Math.abs(dx) + 8 && dy > 12) { dragging = false; card.style.transform = ''; return; }
    card.style.transform = `translateX(${dx}px) rotate(${dx / 22}deg)`;
    card.classList.toggle('swiping-right', dx > 22);
    card.classList.toggle('swiping-left',  dx < -22);
    if (Math.abs(dx) <= 22) card.classList.remove('swiping-left', 'swiping-right');
  }

  function onEnd() {
    if (!dragging) return;
    dragging = false;
    card.classList.remove('swiping-left', 'swiping-right');
    if (dx > THRESHOLD) {
      _swipeAC.abort(); _swipeAC = null;
      _flingCard(card, 1, root, true);
    } else if (dx < -THRESHOLD) {
      _swipeAC.abort(); _swipeAC = null;
      _flingCard(card, -1, root, false);
    } else {
      card.style.transition = 'transform .3s ease';
      card.style.transform = '';
    }
  }

  // Touch (mobile)
  card.addEventListener('touchstart', e => onStart(e.touches[0].clientX, e.touches[0].clientY), { passive: true, signal });
  card.addEventListener('touchmove',  e => { if (dragging) onMove(e.touches[0].clientX, e.touches[0].clientY); }, { passive: true, signal });
  card.addEventListener('touchend',   onEnd, { signal });

  // Mouse (desktop) — no preventDefault so button clicks are never blocked
  card.addEventListener('mousedown',   e => { if (e.button === 0) onStart(e.clientX, e.clientY); }, { signal });
  window.addEventListener('mousemove', e => { if (dragging) onMove(e.clientX, e.clientY); }, { signal });
  window.addEventListener('mouseup',   onEnd, { signal });
}

function _flingCard(card, dir, root, correct) {
  card.style.transition = 'transform .35s ease, opacity .35s ease';
  card.style.transform = `translateX(${dir * 120}vw) rotate(${dir * 30}deg)`;
  card.style.opacity = '0';
  setTimeout(() => _advance(root, correct), 360);
}

// ─── Screen: Result ───────────────────────────────────────────────────────

function _buildResult(root) {
  const total = state.questions.length;
  const pct = Math.round((state.correct / total) * 100);
  const elapsed = Math.round((Date.now() - state.startTime) / 1000);
  const mm = String(Math.floor(elapsed / 60)).padStart(2, '0');
  const ss = String(elapsed % 60).padStart(2, '0');

  let medal, medalLabel;
  if (pct === 100)    { medal = '🏆'; medalLabel = '¡Perfecto!'; }
  else if (pct >= 80) { medal = '🥇'; medalLabel = '¡Excelente!'; }
  else if (pct >= 60) { medal = '🥈'; medalLabel = '¡Bien hecho!'; }
  else if (pct >= 40) { medal = '🥉'; medalLabel = 'Sigue practicando'; }
  else                { medal = '📚'; medalLabel = 'Repasa los temas'; }

  const rows = state.answered.map(a => {
    let qHtml;
    try { qHtml = math(a.questionTeX.split('\\\\')[0], false); } catch { qHtml = a.questionTeX.split('\\\\')[0]; }
    return `<div class="game-result-row ${a.correct ? 'ok' : 'fail'}">
      <span class="game-result-icon">${a.correct ? '✓' : '✗'}</span>
      <span class="game-result-q">${qHtml}</span>
      <span class="game-result-cat">${a.category}</span>
    </div>`;
  }).join('');

  root.innerHTML = `
    <div class="game-result">
      <div class="game-result-hero">
        <div class="game-result-medal">${medal}</div>
        <div class="game-result-label">${medalLabel}</div>
        <div class="game-result-score">${state.correct} / ${total}</div>
        <div class="game-result-pct">${pct}% correcto</div>
      </div>
      <div class="game-result-stats">
        <div class="game-stat"><span class="stat-val">${mm}:${ss}</span><span class="stat-label">Tiempo</span></div>
        <div class="game-stat"><span class="stat-val">${state.maxStreak}</span><span class="stat-label">Racha máx.</span></div>
        <div class="game-stat"><span class="stat-val">${total - state.correct}</span><span class="stat-label">Incorrectas</span></div>
      </div>
      <div class="game-result-breakdown"><h3>Desglose</h3>${rows}</div>
      <div class="game-result-actions">
        <button class="game-start-btn" id="btn-replay">Jugar de nuevo 🔄</button>
        <button class="game-home-btn"  id="btn-home">Inicio 🏠</button>
      </div>
    </div>`;

  root.querySelector('#btn-replay').addEventListener('click', () => _buildLobby(root));
  root.querySelector('#btn-home').addEventListener('click',   () => { window.location.hash = '/'; });
}
