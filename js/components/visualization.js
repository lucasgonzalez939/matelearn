/**
 * visualization.js – Canvas-based interactive visualizations.
 *
 * Each visualization is a function: init(container, params)
 * that builds its own canvas + controls and attaches to `container`.
 */

const vizRegistry = {
  'geometry-shapes':  initGeometryShapes,
  'geometry-gallery': initGeometryGallery,
  'venn-diagram':     initVennDiagram,
  'number-line':      initNumberLine,
  'coordinate-plane': initCoordinatePlane,
  'unit-circle':      initUnitCircle,
  'right-triangle':   initRightTriangle,
  'conic-section':    initConicSection,
  'fraction-pie':     initFractionPie,
  'division-ladder':  initDivisionLadder,
  'function-graph':   initFunctionGraph,
  'angle-types':      initAngleTypes,
};

export function renderVisualization(container, id, params) {
  const fn = vizRegistry[id];
  if (!fn) { container.innerHTML = `<p style="color:#94a3b8">Visualización "${id}" no disponible.</p>`; return; }
  try { fn(container, params); } catch (e) { console.error('[Viz]', id, e); }
}

// ─── Shared helpers ───────────────────────────────────────────────────────

function makeCanvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  c.style.maxWidth = '100%';
  return c;
}

function dpr() { return Math.min(window.devicePixelRatio || 1, 2); }

function hiDPI(canvas, w, h) {
  const r = dpr();
  canvas.width  = w * r;
  canvas.height = h * r;
  canvas.style.width  = w + 'px';
  // No style.height — CSS height:auto scales proportionally via max-width:100%
  canvas.getContext('2d').scale(r, r);
  return canvas;
}

function sliderRow(label, min, max, value, step) {
  return `
    <div class="viz-control-group">
      <label>${label}</label>
      <input type="range" min="${min}" max="${max}" value="${value}" step="${step}">
      <span class="viz-value">${value}</span>
    </div>`;
}

// ─── 1. Geometry Shapes ───────────────────────────────────────────────────
function initGeometryShapes(container, params) {
  const shape = params.shape ?? 'rectangle';
  const W = 460, H = 260;

  container.innerHTML = `
    <div class="viz-title">Visualización: Geometría — ${capitalize(shape)}</div>
    <div class="viz-canvas-wrap"><canvas id="geoCanvas" width="${W}" height="${H}"></canvas></div>
    <div class="viz-controls" id="geoControls"></div>
    <div class="viz-output" id="geoOutput"></div>`;

  const canvas = container.querySelector('#geoCanvas');
  hiDPI(canvas, W, H);
  const ctx = canvas.getContext('2d');
  const controls = container.querySelector('#geoControls');
  const output = container.querySelector('#geoOutput');

  let vals = {};

  if (shape === 'rectangle') {
    vals = { base: 8, height: 5 };
    controls.innerHTML = sliderRow('Base (cm)', 1, 20, vals.base, 0.5) + sliderRow('Altura (cm)', 1, 20, vals.height, 0.5);
  } else if (shape === 'triangle') {
    vals = { base: 8, height: 5 };
    controls.innerHTML = sliderRow('Base (cm)', 1, 20, vals.base, 0.5) + sliderRow('Altura (cm)', 1, 20, vals.height, 0.5);
  } else if (shape === 'circle') {
    vals = { radius: 5 };
    controls.innerHTML = sliderRow('Radio (cm)', 1, 10, vals.radius, 0.5);
  }

  function readSliders() {
    const sliders = controls.querySelectorAll('input[type="range"]');
    const labels  = controls.querySelectorAll('.viz-control-group label');
    sliders.forEach((s, i) => {
      const key = getLabelKey(labels[i].textContent, shape);
      vals[key] = parseFloat(s.value);
      s.nextElementSibling.textContent = s.value;
    });
  }

  function getLabelKey(label, shape) {
    if (label.includes('Base')) return 'base';
    if (label.includes('Altura')) return 'height';
    if (label.includes('Radio')) return 'radius';
    return 'val';
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.save();

    const cx = W / 2, cy = H / 2;

    if (shape === 'rectangle') {
      const scale = Math.min((W - 80) / vals.base, (H - 80) / vals.height, 20);
      const rw = vals.base * scale, rh = vals.height * scale;
      const rx = cx - rw / 2, ry = cy - rh / 2;

      ctx.fillStyle = '#dbeafe';
      ctx.strokeStyle = '#2563eb';
      ctx.lineWidth = 2;
      ctx.fillRect(rx, ry, rw, rh);
      ctx.strokeRect(rx, ry, rw, rh);

      // Dimension labels
      ctx.fillStyle = '#1e40af';
      ctx.font = 'bold 13px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText(`${vals.base} cm`, cx, ry + rh + 20);
      ctx.save();
      ctx.translate(rx - 18, cy);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText(`${vals.height} cm`, 0, 0);
      ctx.restore();

      const A = (vals.base * vals.height).toFixed(2);
      const P = (2 * (vals.base + vals.height)).toFixed(2);
      output.innerHTML = `
        <div class="viz-output-item"><span class="viz-output-label">Área:</span><span class="viz-output-val">${A} cm²</span></div>
        <div class="viz-output-item"><span class="viz-output-label">Perímetro:</span><span class="viz-output-val">${P} cm</span></div>`;

    } else if (shape === 'triangle') {
      const scale = Math.min((W - 100) / vals.base, (H - 100) / vals.height, 18);
      const bw = vals.base * scale;
      const bh = vals.height * scale;
      const baseY = cy + bh / 2;
      const x1 = cx - bw / 2, x2 = cx + bw / 2, x3 = cx;

      ctx.beginPath();
      ctx.moveTo(x1, baseY);
      ctx.lineTo(x2, baseY);
      ctx.lineTo(x3, baseY - bh);
      ctx.closePath();
      ctx.fillStyle = '#d1fae5';
      ctx.strokeStyle = '#16a34a';
      ctx.lineWidth = 2;
      ctx.fill();
      ctx.stroke();

      // Height line (dashed)
      ctx.setLineDash([5, 4]);
      ctx.strokeStyle = '#6b7280';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x3, baseY - bh);
      ctx.lineTo(x3, baseY);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#166534';
      ctx.font = 'bold 13px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText(`${vals.base} cm`, cx, baseY + 20);
      ctx.textAlign = 'left';
      ctx.fillText(`${vals.height} cm`, x3 + 6, cy);

      const A = (0.5 * vals.base * vals.height).toFixed(2);
      output.innerHTML = `
        <div class="viz-output-item"><span class="viz-output-label">Área:</span><span class="viz-output-val">${A} cm²</span></div>
        <div class="viz-output-item"><span class="viz-output-label">Fórmula:</span><span class="viz-output-val">A = b·h/2</span></div>`;

    } else if (shape === 'circle') {
      const scale = Math.min((W - 80) / (2 * vals.radius), (H - 80) / (2 * vals.radius), 22);
      const r = vals.radius * scale;

      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = '#fce7f3';
      ctx.strokeStyle = '#db2777';
      ctx.lineWidth = 2;
      ctx.fill();
      ctx.stroke();

      // Radius line
      ctx.strokeStyle = '#9d174d';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + r, cy);
      ctx.stroke();

      ctx.fillStyle = '#9d174d';
      ctx.font = 'bold 13px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText(`r = ${vals.radius} cm`, cx + r / 2, cy - 8);

      const A  = (Math.PI * vals.radius ** 2).toFixed(3);
      const C  = (2 * Math.PI * vals.radius).toFixed(3);
      output.innerHTML = `
        <div class="viz-output-item"><span class="viz-output-label">Área:</span><span class="viz-output-val">${A} cm²</span></div>
        <div class="viz-output-item"><span class="viz-output-label">Circunferencia:</span><span class="viz-output-val">${C} cm</span></div>`;
    }

    ctx.restore();
  }

  controls.querySelectorAll('input[type="range"]').forEach(s => {
    s.addEventListener('input', () => { readSliders(); draw(); });
  });

  draw();
}

// ─── 2. Venn Diagram ──────────────────────────────────────────────────────
function initVennDiagram(container, params) {
  const W = 460, H = 260;
  const setA = params.setA ?? [1, 2, 3, 4, 5];
  const setB = params.setB ?? [3, 4, 5, 6, 7];

  container.innerHTML = `
    <div class="viz-title">Diagrama de Venn</div>
    <div class="viz-canvas-wrap"><canvas id="vennCanvas"></canvas></div>
    <div class="viz-controls" style="flex-wrap:wrap;gap:.5rem">
      <button class="btn-op active" data-op="union">A ∪ B</button>
      <button class="btn-op" data-op="intersection">A ∩ B</button>
      <button class="btn-op" data-op="diff-ab">A \\ B</button>
      <button class="btn-op" data-op="diff-ba">B \\ A</button>
      <button class="btn-op" data-op="complement-a">A&#700;</button>
    </div>
    <div class="viz-output" id="vennOutput"></div>`;

  const canvas = container.querySelector('#vennCanvas');
  hiDPI(canvas, W, H);
  const ctx = canvas.getContext('2d');

  const allU = [...new Set([...setA, ...setB, 8, 9, 10])];
  let op = 'union';

  function inOp(x) {
    const a = setA.includes(x), b = setB.includes(x);
    if (op === 'union') return a || b;
    if (op === 'intersection') return a && b;
    if (op === 'diff-ab') return a && !b;
    if (op === 'diff-ba') return b && !a;
    if (op === 'complement-a') return !a;
    return false;
  }

  function resultSet() { return allU.filter(inOp); }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    const cx = W / 2, cy = H / 2;
    const r = 85, offset = 55;
    const axA = cx - offset, axB = cx + offset;

    // Universe box
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.5;
    ctx.strokeRect(20, 20, W - 40, H - 40);
    ctx.fillStyle = '#94a3b8'; ctx.font = '12px system-ui';
    ctx.fillText('U', 28, 38);

    // Fill highlighted region
    ctx.save();
    ctx.beginPath();
    ctx.arc(axA, cy, r, 0, Math.PI * 2);
    const regionA = ctx.isPointInPath.bind(ctx);
    ctx.restore();

    // Draw circles
    [['A', axA, '#dbeafe', '#2563eb'], ['B', axB, '#fce7f3', '#db2777']].forEach(([lbl, ax, fill, stroke]) => {
      ctx.beginPath();
      ctx.arc(ax, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = fill + '80';
      ctx.fill();
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = stroke;
      ctx.font = 'bold 16px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText(lbl, lbl === 'A' ? axA - 40 : axB + 40, cy);
    });

    // Place numbers
    ctx.font = 'bold 13px system-ui';
    ctx.textAlign = 'center';
    const positions = [
      [axA - 45, cy - 25], [axA - 45, cy + 20], [axA - 60, cy],   // only A
      [cx, cy - 25], [cx, cy], [cx, cy + 25],                       // intersection
      [axB + 45, cy - 25], [axB + 60, cy], [axB + 45, cy + 20],    // only B
      [W - 55, H - 55], [W - 55, H - 35],                           // outside
    ];

    const onlyA = setA.filter(x => !setB.includes(x));
    const both  = setA.filter(x => setB.includes(x));
    const onlyB = setB.filter(x => !setA.includes(x));
    const outside = allU.filter(x => !setA.includes(x) && !setB.includes(x));

    const groups = [onlyA, both, onlyB, outside];
    const coords = [[axA - 52, cy], [cx, cy], [axB + 52, cy], [W - 52, H - 44]];

    groups.forEach((group, gi) => {
      group.forEach((val, vi) => {
        const x = coords[gi][0] + (vi % 2 === 0 ? 0 : 16);
        const y = coords[gi][1] + Math.floor(vi / 2) * 20 - (group.length - 1) * 5;
        const highlighted = inOp(val);
        ctx.fillStyle = highlighted ? '#1e3a5f' : '#94a3b8';
        ctx.fillText(String(val), x, y);
      });
    });

    const res = resultSet();
    const opLabels = { union: 'A ∪ B', intersection: 'A ∩ B', 'diff-ab': 'A \\ B', 'diff-ba': 'B \\ A', 'complement-a': "A'" };
    const vennOut = container.querySelector('#vennOutput');
    if (vennOut) {
      vennOut.innerHTML = `
        <div class="viz-output-item"><span class="viz-output-label">${opLabels[op]} =</span>
        <span class="viz-output-val">{ ${res.sort((a,b) => a-b).join(', ')} }</span></div>
        <div class="viz-output-item"><span class="viz-output-label">Cardinalidad:</span><span class="viz-output-val">${res.length}</span></div>`;
    }
  }

  container.querySelectorAll('.btn-op').forEach(btn => {
    btn.style.cssText = 'padding:.35rem .8rem;border:1.5px solid #e2e8f0;border-radius:6px;cursor:pointer;font-size:.85rem;background:white';
    btn.addEventListener('click', () => {
      container.querySelectorAll('.btn-op').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      op = btn.dataset.op;
      draw();
    });
  });

  draw();
}

// ─── 3. Number Line ───────────────────────────────────────────────────────
function initNumberLine(container, params) {
  const W = 460, H = 120;
  container.innerHTML = `
    <div class="viz-title">Recta Numérica</div>
    <div class="viz-canvas-wrap"><canvas id="nlCanvas"></canvas></div>
    <div class="viz-controls">
      ${sliderRow('Valor a', -10, 10, params.a ?? -3, 1)}
      ${sliderRow('Valor b', -10, 10, params.b ?? 5, 1)}
    </div>
    <div class="viz-output" id="nlOutput"></div>`;

  const canvas = container.querySelector('#nlCanvas');
  hiDPI(canvas, W, H);
  const ctx = canvas.getContext('2d');

  let a = params.a ?? -3, b = params.b ?? 5;

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const pad = 40, cy = H / 2;
    const scale = (W - 2*pad) / 20; // -10 to +10

    const toX = v => pad + (v + 10) * scale;

    // Axis
    ctx.strokeStyle = '#334155'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(pad, cy); ctx.lineTo(W - pad, cy); ctx.stroke();
    
    // Arrows
    ctx.beginPath(); ctx.moveTo(W-pad, cy); ctx.lineTo(W-pad-8, cy-5); ctx.lineTo(W-pad-8, cy+5); ctx.closePath();
    ctx.fillStyle = '#334155'; ctx.fill();

    // Ticks and labels
    for (let i = -10; i <= 10; i++) {
      const x = toX(i);
      ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = i === 0 ? 2 : 1;
      ctx.beginPath(); ctx.moveTo(x, cy - (i === 0 ? 8 : 5)); ctx.lineTo(x, cy + (i === 0 ? 8 : 5)); ctx.stroke();
      if (i % 2 === 0) {
        ctx.fillStyle = '#64748b'; ctx.font = '11px system-ui'; ctx.textAlign = 'center';
        ctx.fillText(i, x, cy + 22);
      }
    }

    // Highlight segment between a and b
    const xa = toX(a), xb = toX(b);
    ctx.strokeStyle = '#2563eb'; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(Math.min(xa,xb), cy); ctx.lineTo(Math.max(xa,xb), cy); ctx.stroke();

    // Points
    [[a, '#2563eb', 'A'], [b, '#dc2626', 'B']].forEach(([v, color, lbl]) => {
      const x = toX(v);
      ctx.beginPath(); ctx.arc(x, cy, 7, 0, Math.PI*2);
      ctx.fillStyle = color; ctx.fill();
      ctx.strokeStyle = 'white'; ctx.lineWidth = 2; ctx.stroke();
      ctx.fillStyle = color; ctx.font = 'bold 12px system-ui'; ctx.textAlign = 'center';
      ctx.fillText(`${lbl}=${v}`, x, cy - 18);
    });

    container.querySelector('#nlOutput').innerHTML = `
      <div class="viz-output-item"><span class="viz-output-label">|A| =</span><span class="viz-output-val">${Math.abs(a)}</span></div>
      <div class="viz-output-item"><span class="viz-output-label">|B| =</span><span class="viz-output-val">${Math.abs(b)}</span></div>
      <div class="viz-output-item"><span class="viz-output-label">Distancia A→B:</span><span class="viz-output-val">${Math.abs(b-a)}</span></div>`;
  }

  container.querySelectorAll('input[type="range"]').forEach((s, i) => {
    s.addEventListener('input', () => {
      s.nextElementSibling.textContent = s.value;
      if (i === 0) a = parseInt(s.value);
      else         b = parseInt(s.value);
      draw();
    });
  });
  draw();
}

// ─── 4. Coordinate Plane ─────────────────────────────────────────────────
function initCoordinatePlane(container, params) {
  const W = 460, H = 380;
  const range = params.range ?? 6;

  container.innerHTML = `
    <div class="viz-title">${params.title ?? 'Plano Cartesiano'}</div>
    <div class="viz-canvas-wrap"><canvas id="cpCanvas"></canvas></div>
    <div class="viz-output" id="cpInfo" style="font-size:.85rem;color:#475569">${params.description ?? ''}</div>`;

  const canvas = container.querySelector('#cpCanvas');
  hiDPI(canvas, W, H);
  const ctx = canvas.getContext('2d');

  const pad = 40;
  const scale = (W - 2*pad) / (2*range);
  const cx = W/2, cy = H/2;

  function toScreen(x, y) { return [cx + x*scale, cy - y*scale]; }

  function drawGrid() {
    ctx.clearRect(0, 0, W, H);

    // Grid lines
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1;
    for (let i = -range; i <= range; i++) {
      const [x1] = toScreen(i, -range); const [,y1] = toScreen(-range, i);
      ctx.beginPath(); ctx.moveTo(x1, cy-range*scale); ctx.lineTo(x1, cy+range*scale); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx-range*scale, y1); ctx.lineTo(cx+range*scale, y1); ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = '#334155'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(pad, cy); ctx.lineTo(W-pad, cy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, pad); ctx.lineTo(cx, H-pad); ctx.stroke();

    // Tick labels
    ctx.fillStyle = '#64748b'; ctx.font = '11px system-ui'; ctx.textAlign = 'center';
    for (let i = -range; i <= range; i++) {
      if (i === 0) continue;
      const [sx] = toScreen(i, 0); const [,sy] = toScreen(0, i);
      if (i % 2 === 0 || Math.abs(i) <= 5) {
        ctx.fillText(i, sx, cy + 16);
        ctx.textAlign = 'right'; ctx.fillText(i, cx - 6, sy + 4); ctx.textAlign = 'center';
      }
    }
    // Axis labels
    ctx.fillStyle = '#1e293b'; ctx.font = 'bold 14px system-ui';
    ctx.fillText('x', W-pad+12, cy+5); ctx.fillText('y', cx, pad-8);
  }

  ctx.gridDraw = drawGrid;
  ctx.toScreen = toScreen;
  ctx.W = W; ctx.H = H; ctx.cx = cx; ctx.cy = cy; ctx.scale2 = scale;

  drawGrid();

  // Plot items if provided
  if (params.items) {
    plotItems(ctx, params.items, toScreen);
  }
}

function plotItems(ctx, items, toScreen) {
  items.forEach(item => {
    if (item.type === 'point') {
      const [sx, sy] = toScreen(item.x, item.y);
      ctx.beginPath(); ctx.arc(sx, sy, 5, 0, Math.PI*2);
      ctx.fillStyle = item.color ?? '#2563eb'; ctx.fill();
      if (item.label) {
        ctx.fillStyle = item.color ?? '#2563eb'; ctx.font = '12px system-ui';
        ctx.fillText(item.label, sx+9, sy-6);
      }
    } else if (item.type === 'line') {
      // y = mx + b
      const m = item.m ?? 1, b = item.b ?? 0;
      ctx.strokeStyle = item.color ?? '#2563eb'; ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = -10; x <= 10; x += 0.1) {
        const y = m*x + b;
        const [sx, sy] = toScreen(x, y);
        x === -10 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy);
      }
      ctx.stroke();
    } else if (item.type === 'circle') {
      const [sx, sy] = toScreen(item.h ?? 0, item.k ?? 0);
      const sr = (item.r ?? 1) * (ctx.scale2 ?? 40);
      ctx.beginPath(); ctx.arc(sx, sy, sr, 0, Math.PI*2);
      ctx.strokeStyle = item.color ?? '#dc2626'; ctx.lineWidth = 2; ctx.stroke();
      ctx.fillStyle = item.color + '20' ?? '#dc262620'; ctx.fill();
    }
  });
}

// ─── 5. Unit Circle ───────────────────────────────────────────────────────
function initUnitCircle(container, params) {
  const W = 480, H = 380;
  container.innerHTML = `
    <div class="viz-title">Circunferencia Unitaria</div>
    <div class="viz-canvas-wrap"><canvas id="ucCanvas"></canvas></div>
    <div class="viz-controls">
      ${sliderRow('Ángulo (°)', 0, 360, params.angle ?? 45, 1)}
    </div>
    <div class="viz-output" id="ucOutput"></div>`;

  const canvas = container.querySelector('#ucCanvas');
  hiDPI(canvas, W, H);
  const ctx = canvas.getContext('2d');

  let angleDeg = params.angle ?? 45;

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const cx = W/2, cy = H/2, r = Math.min(W, H)/2 - 50;

    // Grid
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(30, cy); ctx.lineTo(W-30, cy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, 20); ctx.lineTo(cx, H-20); ctx.stroke();

    // Circle
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI*2);
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.5; ctx.stroke();

    const rad = angleDeg * Math.PI / 180;
    const px = cx + r * Math.cos(rad);
    const py = cy - r * Math.sin(rad);
    const cosVal = Math.cos(rad);
    const sinVal = Math.sin(rad);

    // Angle arc
    ctx.beginPath(); ctx.arc(cx, cy, 30, 0, -rad, rad < 0);
    ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 2; ctx.stroke();

    // Radius line
    ctx.strokeStyle = '#2563eb'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(px, py); ctx.stroke();

    // sin line (vertical from point to x-axis)
    ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 2; ctx.setLineDash([5,4]);
    ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px, cy); ctx.stroke();

    // cos line (horizontal from origin to foot)
    ctx.strokeStyle = '#16a34a'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(px, cy); ctx.stroke();
    ctx.setLineDash([]);

    // Point on circle
    ctx.beginPath(); ctx.arc(px, py, 6, 0, Math.PI*2);
    ctx.fillStyle = '#2563eb'; ctx.fill();

    // Labels
    ctx.fillStyle = '#1e40af'; ctx.font = 'bold 13px system-ui'; ctx.textAlign = 'left';
    ctx.fillText(`P = (cos θ, sin θ)`, px + 8, py - 8);

    ctx.fillStyle = '#16a34a'; ctx.textAlign = 'center';
    ctx.fillText(`cos θ = ${cosVal.toFixed(3)}`, cx + (px-cx)/2, cy + 18);

    ctx.fillStyle = '#dc2626'; ctx.textAlign = 'left';
    ctx.fillText(`sin θ = ${sinVal.toFixed(3)}`, px + 8, cy + (py-cy)/2);

    ctx.fillStyle = '#7c3aed'; ctx.textAlign = 'center';
    ctx.fillText(`θ = ${angleDeg}°`, cx + 45, cy - 12);

    // Axis labels
    ctx.fillStyle = '#475569'; ctx.font = '12px system-ui';
    for (const [lbl, x, y] of [['1', cx+r+6, cy+5], ['-1', cx-r-16, cy+5], ['1', cx+4, cy-r-4], ['-1', cx+4, cy+r+14]]) {
      ctx.textAlign = 'left'; ctx.fillText(lbl, x, y);
    }

    const tanVal = Math.abs(cosVal) > 0.001 ? (sinVal/cosVal).toFixed(3) : '∞';
    container.querySelector('#ucOutput').innerHTML = `
      <div class="viz-output-item"><span class="viz-output-label">θ =</span><span class="viz-output-val">${angleDeg}° = ${(rad).toFixed(4)} rad</span></div>
      <div class="viz-output-item"><span class="viz-output-label" style="color:#16a34a">cos θ =</span><span class="viz-output-val">${cosVal.toFixed(4)}</span></div>
      <div class="viz-output-item"><span class="viz-output-label" style="color:#dc2626">sin θ =</span><span class="viz-output-val">${sinVal.toFixed(4)}</span></div>
      <div class="viz-output-item"><span class="viz-output-label">tan θ =</span><span class="viz-output-val">${tanVal}</span></div>`;
  }

  const slider = container.querySelector('input[type="range"]');
  slider.addEventListener('input', () => {
    angleDeg = parseInt(slider.value);
    slider.nextElementSibling.textContent = angleDeg + '°';
    draw();
  });

  draw();
}

// ─── 6. Right Triangle ───────────────────────────────────────────────────
function initRightTriangle(container, params) {
  const W = 460, H = 300;
  container.innerHTML = `
    <div class="viz-title">Triángulo Rectángulo</div>
    <div class="viz-canvas-wrap"><canvas id="rtCanvas"></canvas></div>
    <div class="viz-controls">
      ${sliderRow('Ángulo θ (°)', 5, 85, params.angle ?? 30, 1)}
      ${sliderRow('Hipotenusa', 2, 12, params.hyp ?? 5, 0.5)}
    </div>
    <div class="viz-output" id="rtOutput"></div>`;

  const canvas = container.querySelector('#rtCanvas');
  hiDPI(canvas, W, H);
  const ctx = canvas.getContext('2d');
  let theta = params.angle ?? 30, hyp = params.hyp ?? 5;

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const rad = theta * Math.PI / 180;
    const maxSide = Math.min(W - 100, H - 80);
    const scale = maxSide / hyp;

    const adj = hyp * Math.cos(rad) * scale;
    const opp = hyp * Math.sin(rad) * scale;

    const bx = 60, by = H - 60;
    const cx2 = bx + adj, cy2 = by;
    const ax = bx, ay = by - opp;

    ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(cx2, cy2); ctx.lineTo(ax, ay); ctx.closePath();
    ctx.fillStyle = '#fef9c3'; ctx.fill();
    ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 2; ctx.stroke();

    // Right angle mark
    const s = 12;
    ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.5;
    ctx.strokeRect(cx2 - s, cy2 - s, s, s);

    // Labels
    ctx.font = 'bold 13px system-ui';
    ctx.fillStyle = '#1e293b'; ctx.textAlign = 'center';
    ctx.fillText(`${(hyp * Math.cos(rad)).toFixed(2)}`, bx + adj/2, by + 20); // adjacent
    ctx.textAlign = 'right';
    ctx.fillText(`${(hyp * Math.sin(rad)).toFixed(2)}`, bx - 8, by - opp/2); // opposite
    
    // Hypotenuse label
    ctx.save();
    ctx.translate((bx+cx2)/2 + (ay-by)*0.05, (by+ay)/2 + (adj)*0.05);
    ctx.rotate(-Math.atan2(opp, adj));
    ctx.textAlign = 'center';
    ctx.fillText(`${hyp}`, 0, -12);
    ctx.restore();

    // Angle arc
    ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(bx, by, 30, -Math.atan2(opp, adj), 0);
    ctx.stroke();
    ctx.fillStyle = '#7c3aed'; ctx.font = '12px system-ui'; ctx.textAlign = 'left';
    ctx.fillText(`θ=${theta}°`, bx+34, by-8);

    // Labels A, B, C
    ctx.fillStyle = '#374151'; ctx.font = 'bold 14px system-ui';
    ctx.textAlign = 'center'; ctx.fillText('B', bx - 14, by + 6);
    ctx.fillText('C', cx2 + 14, by + 6);
    ctx.fillText('A', ax - 14, ay);

    container.querySelector('#rtOutput').innerHTML = `
      <div class="viz-output-item"><span class="viz-output-label">Cateto adyacente (BC):</span><span class="viz-output-val">${(hyp*Math.cos(rad)).toFixed(3)}</span></div>
      <div class="viz-output-item"><span class="viz-output-label">Cateto opuesto (AB):</span><span class="viz-output-val">${(hyp*Math.sin(rad)).toFixed(3)}</span></div>
      <div class="viz-output-item"><span class="viz-output-label">sin θ:</span><span class="viz-output-val">${Math.sin(rad).toFixed(4)}</span></div>
      <div class="viz-output-item"><span class="viz-output-label">cos θ:</span><span class="viz-output-val">${Math.cos(rad).toFixed(4)}</span></div>
      <div class="viz-output-item"><span class="viz-output-label">tan θ:</span><span class="viz-output-val">${Math.tan(rad).toFixed(4)}</span></div>`;
  }

  container.querySelectorAll('input[type="range"]').forEach((s, i) => {
    s.addEventListener('input', () => {
      s.nextElementSibling.textContent = s.value + (i === 0 ? '°' : '');
      if (i === 0) theta = parseInt(s.value);
      else hyp = parseFloat(s.value);
      draw();
    });
  });
  draw();
}

// ─── 7. Conic Section ────────────────────────────────────────────────────
function initConicSection(container, params) {
  const W = 460, H = 380;
  const type = params.conicType ?? 'ellipse';

  let sliders = '';
  if (type === 'ellipse' || type === 'hyperbola') {
    sliders = sliderRow('a (semi-eje)', 1, 6, params.a ?? 4, 0.5) + sliderRow('b (semi-eje)', 1, 6, params.b ?? 2, 0.5);
  } else if (type === 'parabola') {
    sliders = sliderRow('p (foco)', 0.5, 5, params.p ?? 2, 0.25);
  } else if (type === 'circle') {
    sliders = sliderRow('r (radio)', 1, 5, params.r ?? 3, 0.5);
  }

  container.innerHTML = `
    <div class="viz-title">${capitalize(type)}</div>
    <div class="viz-canvas-wrap"><canvas id="conicCanvas"></canvas></div>
    <div class="viz-controls">${sliders}</div>
    <div class="viz-output" id="conicOut"></div>`;

  const canvas = container.querySelector('#conicCanvas');
  hiDPI(canvas, W, H);
  const ctx = canvas.getContext('2d');
  const cx = W/2, cy = H/2;
  let a = params.a ?? 4, b = params.b ?? 2, p = params.p ?? 2, r = params.r ?? 3;
  const maxScale = (Math.min(W, H)/2 - 40);

  function getScale() { return maxScale / Math.max(a, b, r, p*2, 3); }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const sc = getScale();

    // Grid & axes
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1;
    for (let i = -8; i <= 8; i++) {
      ctx.beginPath(); ctx.moveTo(cx + i*sc, 20); ctx.lineTo(cx + i*sc, H-20); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(20, cy + i*sc); ctx.lineTo(W-20, cy + i*sc); ctx.stroke();
    }
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(20, cy); ctx.lineTo(W-20, cy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, 20); ctx.lineTo(cx, H-20); ctx.stroke();

    ctx.strokeStyle = '#2563eb'; ctx.lineWidth = 2.5;
    ctx.beginPath();

    if (type === 'circle') {
      ctx.arc(cx, cy, r*sc, 0, Math.PI*2);
      container.querySelector('#conicOut').innerHTML = `
        <div class="viz-output-item"><span class="viz-output-label">Ecuación:</span><span class="viz-output-val">x² + y² = ${r}²</span></div>
        <div class="viz-output-item"><span class="viz-output-label">Área:</span><span class="viz-output-val">${(Math.PI*r*r).toFixed(3)}</span></div>`;
    } else if (type === 'ellipse') {
      ctx.ellipse(cx, cy, a*sc, b*sc, 0, 0, Math.PI*2);
      const c2 = Math.sqrt(Math.max(a*a - b*b, 0));
      container.querySelector('#conicOut').innerHTML = `
        <div class="viz-output-item"><span class="viz-output-label">Ecuación:</span><span class="viz-output-val">x²/${a}² + y²/${b}² = 1</span></div>
        <div class="viz-output-item"><span class="viz-output-label">c =</span><span class="viz-output-val">${c2.toFixed(3)}</span></div>
        <div class="viz-output-item"><span class="viz-output-label">Excentricidad:</span><span class="viz-output-val">${(c2/a).toFixed(4)}</span></div>`;
    } else if (type === 'hyperbola') {
      // Draw two branches
      ctx.save();
      ctx.beginPath();
      for (let t = -Math.PI*0.48; t <= Math.PI*0.48; t += 0.02) {
        const x = a/Math.cos(t); const y = b*Math.tan(t);
        const [sx, sy] = [cx+x*sc, cy-y*sc];
        t === -Math.PI*0.48 ? ctx.moveTo(sx,sy) : ctx.lineTo(sx,sy);
      }
      ctx.moveTo(cx - a*sc - 1, cy);
      for (let t = Math.PI*0.52; t < Math.PI*1.48; t += 0.02) {
        const x = a/Math.cos(t); const y = b*Math.tan(t);
        const [sx, sy] = [cx+x*sc, cy-y*sc];
        t === Math.PI*0.52 ? ctx.moveTo(sx,sy) : ctx.lineTo(sx,sy);
      }
      ctx.stroke(); ctx.restore();
      const c2 = Math.sqrt(a*a + b*b);
      container.querySelector('#conicOut').innerHTML = `
        <div class="viz-output-item"><span class="viz-output-label">Ecuación:</span><span class="viz-output-val">x²/${a}² - y²/${b}² = 1</span></div>
        <div class="viz-output-item"><span class="viz-output-label">c =</span><span class="viz-output-val">${c2.toFixed(3)}</span></div>
        <div class="viz-output-item"><span class="viz-output-label">Asíntotas:</span><span class="viz-output-val">y = ±(${b}/${a})x</span></div>`;
    } else if (type === 'parabola') {
      for (let x = -10; x <= 10; x += 0.05) {
        const y = x*x / (4*p);
        const [sx, sy] = [cx+x*sc, cy-y*sc];
        x === -10 ? ctx.moveTo(sx,sy) : ctx.lineTo(sx,sy);
      }
      container.querySelector('#conicOut').innerHTML = `
        <div class="viz-output-item"><span class="viz-output-label">Ecuación:</span><span class="viz-output-val">x² = 4·${p}·y = ${4*p}y</span></div>
        <div class="viz-output-item"><span class="viz-output-label">Foco:</span><span class="viz-output-val">(0, ${p})</span></div>
        <div class="viz-output-item"><span class="viz-output-label">Directriz:</span><span class="viz-output-val">y = -${p}</span></div>`;
    }

    ctx.stroke();
  }

  container.querySelectorAll('input[type="range"]').forEach((s, i) => {
    s.addEventListener('input', () => {
      s.nextElementSibling.textContent = s.value;
      const v = parseFloat(s.value);
      if (type === 'circle') r = v;
      else if (type === 'parabola') p = v;
      else if (i === 0) a = v;
      else b = v;
      draw();
    });
  });
  draw();
}

// ─── 8. Geometry Gallery ─────────────────────────────────────────────────
function initGeometryGallery(container, params) {
  const W = 460, H = 280;
  const shapeList = [
    { id: 'triangle',  label: 'Triángulo',  icon: '△' },
    { id: 'rectangle', label: 'Rectángulo', icon: '▭' },
    { id: 'square',    label: 'Cuadrado',   icon: '□' },
    { id: 'circle',    label: 'Círculo',    icon: '○' },
    { id: 'trapezoid', label: 'Trapecio',   icon: '⬟' },
    { id: 'rhombus',   label: 'Rombo',      icon: '◇' },
  ];
  let currentShape = params.defaultShape ?? 'triangle';
  let vals = {};

  container.innerHTML = `
    <div class="viz-title">Explorador de Figuras Planas</div>
    <div style="display:flex;flex-wrap:wrap;gap:.35rem;margin-bottom:.6rem">
      ${shapeList.map(s => `<button class="gg-btn${s.id===currentShape?' gg-active':''}" data-shape="${s.id}"
        style="padding:.3rem .65rem;border:1.5px solid #e2e8f0;border-radius:6px;cursor:pointer;font-size:.8rem;
        background:${s.id===currentShape?'#2563eb':'white'};color:${s.id===currentShape?'white':'inherit'}"
        >${s.icon} ${s.label}</button>`).join('')}
    </div>
    <div class="viz-canvas-wrap"><canvas class="gg-canvas"></canvas></div>
    <div class="viz-controls" id="ggCtrl-${container.dataset.viz}"></div>
    <div class="viz-output" id="ggOut-${container.dataset.viz}"></div>`;

  const canvas = container.querySelector('.gg-canvas');
  hiDPI(canvas, W, H);
  const ctx = canvas.getContext('2d');
  const ctrlEl = container.querySelector('[id^="ggCtrl"]');
  const outEl  = container.querySelector('[id^="ggOut"]');

  container.querySelectorAll('.gg-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.gg-btn').forEach(b => { b.style.background='white'; b.style.color='inherit'; });
      btn.style.background='#2563eb'; btn.style.color='white';
      currentShape = btn.dataset.shape;
      setupControls(); draw();
    });
  });

  function setupControls() {
    if (currentShape==='rectangle'||currentShape==='triangle') {
      vals={base:8,height:5};
      ctrlEl.innerHTML=sliderRow('Base b (cm)',1,18,8,0.5)+sliderRow('Altura h (cm)',1,14,5,0.5);
    } else if (currentShape==='square') {
      vals={base:7}; ctrlEl.innerHTML=sliderRow('Lado a (cm)',1,14,7,0.5);
    } else if (currentShape==='circle') {
      vals={radius:5}; ctrlEl.innerHTML=sliderRow('Radio r (cm)',1,10,5,0.5);
    } else if (currentShape==='trapezoid') {
      vals={base:10,base2:6,height:5};
      ctrlEl.innerHTML=sliderRow('Base mayor B (cm)',2,18,10,0.5)+sliderRow('Base menor b (cm)',1,14,6,0.5)+sliderRow('Altura h (cm)',1,12,5,0.5);
    } else if (currentShape==='rhombus') {
      vals={d1:10,d2:6}; ctrlEl.innerHTML=sliderRow('Diagonal mayor d₁ (cm)',2,18,10,0.5)+sliderRow('Diagonal menor d₂ (cm)',1,14,6,0.5);
    }
    ctrlEl.querySelectorAll('input[type="range"]').forEach((s,i)=>{
      s.addEventListener('input',()=>{
        s.nextElementSibling.textContent=s.value; const v=parseFloat(s.value);
        if(currentShape==='rectangle'||currentShape==='triangle'){if(i===0)vals.base=v;else vals.height=v;}
        else if(currentShape==='square')vals.base=v;
        else if(currentShape==='circle')vals.radius=v;
        else if(currentShape==='trapezoid'){if(i===0)vals.base=v;else if(i===1)vals.base2=v;else vals.height=v;}
        else if(currentShape==='rhombus'){if(i===0)vals.d1=v;else vals.d2=v;}
        draw();
      });
    });
  }

  function draw() {
    ctx.clearRect(0,0,W,H); const CX=W/2, CY=H/2;
    if (currentShape==='rectangle') {
      const sc=Math.min((W-80)/vals.base,(H-80)/vals.height,20);
      const rw=vals.base*sc,rh=vals.height*sc,rx=CX-rw/2,ry=CY-rh/2;
      ctx.fillStyle='#dbeafe';ctx.strokeStyle='#2563eb';ctx.lineWidth=2.5;
      ctx.fillRect(rx,ry,rw,rh);ctx.strokeRect(rx,ry,rw,rh);
      ctx.fillStyle='#1e40af';ctx.font='bold 13px system-ui';ctx.textAlign='center';
      ctx.fillText(`b = ${vals.base} cm`,CX,ry+rh+22);
      ctx.save();ctx.translate(rx-22,CY);ctx.rotate(-Math.PI/2);ctx.fillText(`h = ${vals.height} cm`,0,0);ctx.restore();
      const A=(vals.base*vals.height).toFixed(2),P=(2*(vals.base+vals.height)).toFixed(2);
      outEl.innerHTML=`<div class="viz-output-item"><span class="viz-output-label">Área = b·h =</span><span class="viz-output-val">${A} cm²</span></div><div class="viz-output-item"><span class="viz-output-label">Perímetro = 2(b+h) =</span><span class="viz-output-val">${P} cm</span></div>`;

    } else if (currentShape==='triangle') {
      const sc=Math.min((W-100)/vals.base,(H-100)/vals.height,18);
      const bw=vals.base*sc,bh=vals.height*sc,baseY=CY+bh/2;
      const x1=CX-bw/2,x2=CX+bw/2;
      ctx.beginPath();ctx.moveTo(x1,baseY);ctx.lineTo(x2,baseY);ctx.lineTo(CX,baseY-bh);ctx.closePath();
      ctx.fillStyle='#d1fae5';ctx.strokeStyle='#16a34a';ctx.lineWidth=2.5;ctx.fill();ctx.stroke();
      ctx.setLineDash([5,4]);ctx.strokeStyle='#6b7280';ctx.lineWidth=1;
      ctx.beginPath();ctx.moveTo(CX,baseY-bh);ctx.lineTo(CX,baseY);ctx.stroke();ctx.setLineDash([]);
      ctx.fillStyle='#166534';ctx.font='bold 13px system-ui';ctx.textAlign='center';
      ctx.fillText(`b = ${vals.base} cm`,CX,baseY+22);
      ctx.textAlign='left';ctx.fillText(`h = ${vals.height} cm`,CX+8,CY);
      const A=(0.5*vals.base*vals.height).toFixed(2);
      outEl.innerHTML=`<div class="viz-output-item"><span class="viz-output-label">Área = b·h/2 =</span><span class="viz-output-val">${A} cm²</span></div><div class="viz-output-item"><span class="viz-output-label">Suma ángulos interiores:</span><span class="viz-output-val">180°</span></div>`;

    } else if (currentShape==='square') {
      const sc=Math.min((W-80)/vals.base,(H-80)/vals.base,22);
      const side=vals.base*sc,x=CX-side/2,y=CY-side/2;
      ctx.fillStyle='#ede9fe';ctx.strokeStyle='#7c3aed';ctx.lineWidth=2.5;
      ctx.fillRect(x,y,side,side);ctx.strokeRect(x,y,side,side);
      // right-angle corner marks
      const sq=12;
      [[x,y,1,1],[x+side,y,-1,1],[x,y+side,1,-1],[x+side,y+side,-1,-1]].forEach(([px,py,dx,dy])=>{
        ctx.strokeStyle='#7c3aed';ctx.lineWidth=1.5;
        ctx.beginPath();ctx.moveTo(px+dx*sq,py);ctx.lineTo(px+dx*sq,py+dy*sq);ctx.lineTo(px,py+dy*sq);ctx.stroke();
      });
      ctx.fillStyle='#5b21b6';ctx.font='bold 13px system-ui';ctx.textAlign='center';
      ctx.fillText(`a = ${vals.base} cm`,CX,y+side+22);
      const A=(vals.base**2).toFixed(2),P=(4*vals.base).toFixed(2),D=(vals.base*Math.SQRT2).toFixed(3);
      outEl.innerHTML=`<div class="viz-output-item"><span class="viz-output-label">Área = a² =</span><span class="viz-output-val">${A} cm²</span></div><div class="viz-output-item"><span class="viz-output-label">Perímetro = 4a =</span><span class="viz-output-val">${P} cm</span></div><div class="viz-output-item"><span class="viz-output-label">Diagonal = a√2 ≈</span><span class="viz-output-val">${D} cm</span></div>`;

    } else if (currentShape==='circle') {
      const sc=Math.min((W-80)/(2*vals.radius),(H-80)/(2*vals.radius),22);
      const r=vals.radius*sc;
      ctx.beginPath();ctx.arc(CX,CY,r,0,Math.PI*2);
      ctx.fillStyle='#fce7f3';ctx.strokeStyle='#db2777';ctx.lineWidth=2.5;ctx.fill();ctx.stroke();
      ctx.setLineDash([4,3]);ctx.strokeStyle='#db277780';ctx.lineWidth=1;
      ctx.beginPath();ctx.moveTo(CX-r,CY);ctx.lineTo(CX+r,CY);ctx.stroke();ctx.setLineDash([]);
      ctx.strokeStyle='#9d174d';ctx.lineWidth=2;
      ctx.beginPath();ctx.moveTo(CX,CY);ctx.lineTo(CX+r,CY);ctx.stroke();
      ctx.fillStyle='#9d174d';ctx.font='bold 13px system-ui';ctx.textAlign='center';
      ctx.fillText(`r = ${vals.radius} cm`,CX+r/2,CY-10);
      const A=(Math.PI*vals.radius**2).toFixed(3),C=(2*Math.PI*vals.radius).toFixed(3);
      outEl.innerHTML=`<div class="viz-output-item"><span class="viz-output-label">Área = πr² =</span><span class="viz-output-val">${A} cm²</span></div><div class="viz-output-item"><span class="viz-output-label">Circunferencia = 2πr =</span><span class="viz-output-val">${C} cm</span></div><div class="viz-output-item"><span class="viz-output-label">Diámetro = 2r =</span><span class="viz-output-val">${(2*vals.radius).toFixed(2)} cm</span></div>`;

    } else if (currentShape==='trapezoid') {
      const sc=Math.min((W-100)/vals.base,(H-100)/vals.height,18);
      const B=vals.base*sc,b=vals.base2*sc,h=vals.height*sc;
      const bx1=CX-B/2,bx2=CX+B/2,tx1=CX-b/2,tx2=CX+b/2,by=CY+h/2,ty=CY-h/2;
      ctx.beginPath();ctx.moveTo(bx1,by);ctx.lineTo(bx2,by);ctx.lineTo(tx2,ty);ctx.lineTo(tx1,ty);ctx.closePath();
      ctx.fillStyle='#fef3c7';ctx.strokeStyle='#d97706';ctx.lineWidth=2.5;ctx.fill();ctx.stroke();
      ctx.setLineDash([5,4]);ctx.strokeStyle='#6b7280';ctx.lineWidth=1;
      ctx.beginPath();ctx.moveTo(CX,by);ctx.lineTo(CX,ty);ctx.stroke();ctx.setLineDash([]);
      ctx.fillStyle='#92400e';ctx.font='bold 12px system-ui';ctx.textAlign='center';
      ctx.fillText(`B = ${vals.base} cm`,CX,by+22);ctx.fillText(`b = ${vals.base2} cm`,CX,ty-8);
      ctx.textAlign='left';ctx.fillText(`h = ${vals.height} cm`,CX+6,CY);
      const A=((vals.base+vals.base2)*vals.height/2).toFixed(2);
      outEl.innerHTML=`<div class="viz-output-item"><span class="viz-output-label">Área = (B+b)·h/2 =</span><span class="viz-output-val">${A} cm²</span></div><div class="viz-output-item"><span class="viz-output-label">Las bases B y b son paralelas entre sí</span></div>`;

    } else if (currentShape==='rhombus') {
      const sc=Math.min((W-80)/vals.d1,(H-80)/vals.d2,18);
      const d1h=vals.d1*sc/2,d2h=vals.d2*sc/2;
      ctx.beginPath();ctx.moveTo(CX,CY-d2h);ctx.lineTo(CX+d1h,CY);ctx.lineTo(CX,CY+d2h);ctx.lineTo(CX-d1h,CY);ctx.closePath();
      ctx.fillStyle='#d1fae5';ctx.strokeStyle='#059669';ctx.lineWidth=2.5;ctx.fill();ctx.stroke();
      ctx.setLineDash([4,3]);ctx.strokeStyle='#374151';ctx.lineWidth=1;
      ctx.beginPath();ctx.moveTo(CX-d1h,CY);ctx.lineTo(CX+d1h,CY);ctx.stroke();
      ctx.beginPath();ctx.moveTo(CX,CY-d2h);ctx.lineTo(CX,CY+d2h);ctx.stroke();ctx.setLineDash([]);
      const sq=8;ctx.strokeStyle='#059669';ctx.lineWidth=1.5;
      ctx.beginPath();ctx.moveTo(CX+sq,CY);ctx.lineTo(CX+sq,CY-sq);ctx.lineTo(CX,CY-sq);ctx.stroke();
      ctx.fillStyle='#065f46';ctx.font='bold 12px system-ui';ctx.textAlign='center';
      ctx.fillText(`d₁ = ${vals.d1} cm`,CX,CY+20);
      ctx.textAlign='left';ctx.fillText(`d₂ = ${vals.d2} cm`,CX+8,CY-d2h/2);
      const side=Math.sqrt((vals.d1/2)**2+(vals.d2/2)**2).toFixed(2),A=(vals.d1*vals.d2/2).toFixed(2);
      outEl.innerHTML=`<div class="viz-output-item"><span class="viz-output-label">Área = d₁·d₂/2 =</span><span class="viz-output-val">${A} cm²</span></div><div class="viz-output-item"><span class="viz-output-label">Lado = √((d₁/2)²+(d₂/2)²) =</span><span class="viz-output-val">${side} cm</span></div><div class="viz-output-item"><span class="viz-output-label">Perímetro = 4·lado =</span><span class="viz-output-val">${(4*side).toFixed(2)} cm</span></div>`;
    }
  }

  setupControls(); draw();
}

// ─── 9. Fraction Pie ─────────────────────────────────────────────────────
function initFractionPie(container, params) {
  const W = 400, H = 220;
  container.innerHTML = `
    <div class="viz-title">Visualizador de Fracciones</div>
    <div class="viz-canvas-wrap"><canvas class="fp-canvas"></canvas></div>
    <div class="viz-controls">
      ${sliderRow('Numerador p', 1, 11, params.num ?? 3, 1)}
      ${sliderRow('Denominador q', 2, 12, params.den ?? 4, 1)}
    </div>
    <div class="viz-output fp-out"></div>`;

  const canvas = container.querySelector('.fp-canvas');
  hiDPI(canvas, W, H);
  const ctx = canvas.getContext('2d');
  let num = params.num ?? 3, den = params.den ?? 4;

  function gcd2(a, b) { while(b) { [a,b]=[b,a%b]; } return a; }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const R = 75, cx = 100, cy = H/2, step = (2*Math.PI)/den;

    for (let i = 0; i < den; i++) {
      ctx.beginPath(); ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, R, i*step - Math.PI/2, (i+1)*step - Math.PI/2);
      ctx.closePath();
      ctx.fillStyle = i < num ? '#3b82f6' : '#dbeafe';
      ctx.fill(); ctx.strokeStyle='white'; ctx.lineWidth=2; ctx.stroke();
    }
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, 2*Math.PI);
    ctx.strokeStyle='#2563eb'; ctx.lineWidth=2; ctx.stroke();

    // fraction label inside
    ctx.fillStyle='#1e3a8a'; ctx.font='bold 20px system-ui'; ctx.textAlign='center';
    ctx.fillText(`${num}`, cx, cy-4);
    ctx.beginPath(); ctx.moveTo(cx-15,cy+8); ctx.lineTo(cx+15,cy+8);
    ctx.strokeStyle='#1e3a8a'; ctx.lineWidth=2; ctx.stroke();
    ctx.fillStyle='#1e3a8a'; ctx.fillText(`${den}`, cx, cy+28);

    // bar
    const bx=220, by=30, bW=130, bH=H-60;
    ctx.fillStyle='#dbeafe'; ctx.strokeStyle='#2563eb'; ctx.lineWidth=1.5;
    ctx.fillRect(bx,by,bW,bH); ctx.strokeRect(bx,by,bW,bH);
    const ratio=Math.min(num/den,1);
    ctx.fillStyle='#3b82f6';
    ctx.fillRect(bx, by+bH*(1-ratio), bW, bH*ratio);
    for (let i=1; i<den; i++) {
      const ly=by+bH*(1-i/den);
      ctx.strokeStyle='white'; ctx.lineWidth=1.5;
      ctx.beginPath(); ctx.moveTo(bx,ly); ctx.lineTo(bx+bW,ly); ctx.stroke();
    }
    ctx.strokeStyle='#2563eb'; ctx.lineWidth=1.5; ctx.strokeRect(bx,by,bW,bH);
    ctx.fillStyle='#1e40af'; ctx.font='11px system-ui'; ctx.textAlign='center';
    ctx.fillText('Diagrama de barras', bx+bW/2, by+bH+14);

    const g=gcd2(num,den), sn=num/g, sd=den/g;
    const dec=(num/den).toFixed(4), pct=(num/den*100).toFixed(1);
    container.querySelector('.fp-out').innerHTML=`
      <div class="viz-output-item"><span class="viz-output-label">Fracción:</span><span class="viz-output-val">${num}/${den}</span></div>
      ${g>1?`<div class="viz-output-item"><span class="viz-output-label">Simplificada (÷MCD=${g}):</span><span class="viz-output-val">${sn}/${sd}</span></div>`:''}
      <div class="viz-output-item"><span class="viz-output-label">Decimal:</span><span class="viz-output-val">${dec}</span></div>
      <div class="viz-output-item"><span class="viz-output-label">Porcentaje:</span><span class="viz-output-val">${pct}%</span></div>
      <div class="viz-output-item"><span class="viz-output-label">Tipo:</span><span class="viz-output-val">${num<den?'Fracción propia (p<q)':num===den?'Fracción = 1 (p=q)':'Fracción impropia (p>q)'}</span></div>`;
  }

  container.querySelectorAll('input[type="range"]').forEach((s,i)=>{
    s.addEventListener('input',()=>{
      s.nextElementSibling.textContent=s.value;
      if(i===0)num=parseInt(s.value); else den=parseInt(s.value);
      draw();
    });
  });
  draw();
}

// ─── 10. Division Ladder (MCD / mcm) ─────────────────────────────────────
function initDivisionLadder(container, params) {
  container.innerHTML = `
    <div class="viz-title">MCD y mcm — Método de Factorización Prima</div>
    <div class="viz-controls">
      ${sliderRow('Número a', 2, 60, params.a ?? 24, 1)}
      ${sliderRow('Número b', 2, 60, params.b ?? 36, 1)}
    </div>
    <div class="dl-out" style="padding:.5rem 0;font-size:.9rem;line-height:1.6"></div>`;

  let a = params.a ?? 24, b = params.b ?? 36;

  function gcd2(x, y) { while(y) { [x,y]=[y,x%y]; } return x; }

  function factMap(n) {
    const f={};
    for(let d=2;d*d<=n;d++){while(n%d===0){f[d]=(f[d]||0)+1;n=n/d;}}
    if(n>1)f[n]=(f[n]||0)+1; return f;
  }

  function fmtMap(m) {
    return Object.entries(m).map(([p,e])=>e>1?`${p}<sup>${e}</sup>`:p).join(' × ')||'1';
  }

  function render() {
    const fA=factMap(a), fB=factMap(b);
    const allP=[...new Set([...Object.keys(fA),...Object.keys(fB)])].map(Number).sort((x,y)=>x-y);
    const gcd=gcd2(a,b), lcm=(a*b)/gcd;

    // build ladder rows
    let ca=a, cb=b; const rows=[];
    const ps=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59];
    for(const p of ps){while(ca%p===0&&cb%p===0){rows.push({a:ca,b:cb,div:p});ca=ca/p;cb=cb/p;}}

    const mcdFmt = allP.filter(p=>fA[p]&&fB[p]).map(p=>{const e=Math.min(fA[p]||0,fB[p]||0);return e>1?`${p}<sup>${e}</sup>`:`${p}`;}).join(' × ') || `${gcd}`;
    const mcmFmt = allP.map(p=>{const e=Math.max(fA[p]||0,fB[p]||0);return e>1?`${p}<sup>${e}</sup>`:`${p}`;}).join(' × ');

    const tableHTML = rows.length ? `
      <div style="margin:.4rem 0 .6rem">
        <div style="font-size:.82rem;font-weight:700;color:#475569;margin-bottom:.3rem">📊 División simultánea por factores comunes:</div>
        <table style="border-collapse:collapse;font-size:.86rem">
          <thead><tr>
            <th style="padding:.2rem .6rem;background:#f1f5f9;border:1px solid #e2e8f0">${a}</th>
            <th style="padding:.2rem .6rem;background:#f1f5f9;border:1px solid #e2e8f0">${b}</th>
            <th style="padding:.2rem .6rem;background:#dbeafe;border:1px solid #bfdbfe;color:#1d4ed8">÷</th>
          </tr></thead>
          <tbody>
            ${rows.map(r=>`<tr>
              <td style="padding:.18rem .6rem;border:1px solid #e2e8f0;text-align:right">${r.a}</td>
              <td style="padding:.18rem .6rem;border:1px solid #e2e8f0;text-align:right">${r.b}</td>
              <td style="padding:.18rem .6rem;border:1px solid #bfdbfe;text-align:center;font-weight:700;color:#1d4ed8">${r.div}</td>
            </tr>`).join('')}
            <tr>
              <td style="padding:.18rem .6rem;border:1px solid #e2e8f0;text-align:right">${ca}</td>
              <td style="padding:.18rem .6rem;border:1px solid #e2e8f0;text-align:right">${cb}</td>
              <td style="padding:.18rem .6rem;border:1px solid #e2e8f0;text-align:center;color:#94a3b8">—</td>
            </tr>
          </tbody>
        </table>
      </div>` : '';

    container.querySelector('.dl-out').innerHTML = `
      <div style="margin-bottom:.3rem"><strong>${a}</strong> = ${fmtMap(fA)}</div>
      <div style="margin-bottom:.5rem"><strong>${b}</strong> = ${fmtMap(fB)}</div>
      ${tableHTML}
      <div style="background:#dcfce7;border-left:4px solid #16a34a;padding:.4rem .65rem;border-radius:4px;margin-bottom:.4rem">
        <strong>MCD</strong> (Máximo Común Divisor) — factores <em>comunes</em> con el exponente <em>menor</em>:<br>
        <code>MCD(${a}, ${b}) = ${mcdFmt} = <strong>${gcd}</strong></code>
      </div>
      <div style="background:#dbeafe;border-left:4px solid #2563eb;padding:.4rem .65rem;border-radius:4px;margin-bottom:.35rem">
        <strong>mcm</strong> (mínimo común múltiplo) — <em>todos</em> los factores con el exponente <em>mayor</em>:<br>
        <code>mcm(${a}, ${b}) = ${mcmFmt} = <strong>${lcm}</strong></code>
      </div>
      <div style="font-size:.78rem;color:#6b7280">✓ Propiedad: ${a} × ${b} = ${a*b} = MCD × mcm = ${gcd} × ${lcm} = ${gcd*lcm}</div>`;
  }

  container.querySelectorAll('input[type="range"]').forEach((s,i)=>{
    s.addEventListener('input',()=>{
      s.nextElementSibling.textContent=s.value;
      if(i===0)a=parseInt(s.value); else b=parseInt(s.value);
      render();
    });
  });
  render();
}

// ─── 11. Function Graph ───────────────────────────────────────────────────
function initFunctionGraph(container, params) {
  const W = 460, H = 340;
  const type = params.type ?? 'linear';
  let aV = params.m ?? params.a ?? 1, bV = params.b ?? 0, cV = params.c ?? 0;

  const slidersHTML = type === 'linear'
    ? sliderRow('Pendiente m', -5, 5, aV, 0.25) + sliderRow('Intercepto b', -8, 8, bV, 0.5)
    : sliderRow('Coeficiente a', -3, 3, aV, 0.25) + sliderRow('Coeficiente b', -6, 6, bV, 0.5) + sliderRow('Coeficiente c', -9, 9, cV, 0.5);

  container.innerHTML = `
    <div class="viz-title">${type==='linear'?'Función Lineal: y = mx + b':'Función Cuadrática: y = ax² + bx + c'}</div>
    <div class="viz-canvas-wrap"><canvas class="fg-canvas"></canvas></div>
    <div class="viz-controls">${slidersHTML}</div>
    <div class="viz-output fg-out"></div>`;

  const canvas = container.querySelector('.fg-canvas');
  hiDPI(canvas, W, H);
  const ctx = canvas.getContext('2d');
  const xR = 8, pad = 40;
  const sx = (W-2*pad)/(2*xR), sy = (H-2*pad)/(2*xR);
  const ox = W/2, oy = H/2;
  const toX = x => ox + x*sx;
  const toY = y => oy - y*sy;

  function grid() {
    ctx.clearRect(0,0,W,H);
    ctx.strokeStyle='#e2e8f0'; ctx.lineWidth=1;
    for(let i=-xR;i<=xR;i++){
      ctx.beginPath();ctx.moveTo(toX(i),pad);ctx.lineTo(toX(i),H-pad);ctx.stroke();
      ctx.beginPath();ctx.moveTo(pad,toY(i));ctx.lineTo(W-pad,toY(i));ctx.stroke();
    }
    ctx.strokeStyle='#94a3b8'; ctx.lineWidth=1.5;
    ctx.beginPath();ctx.moveTo(pad,oy);ctx.lineTo(W-pad,oy);ctx.stroke();
    ctx.beginPath();ctx.moveTo(ox,pad);ctx.lineTo(ox,H-pad);ctx.stroke();
    ctx.fillStyle='#64748b';ctx.font='11px system-ui';ctx.textAlign='center';
    for(let i=-xR;i<=xR;i+=2){
      if(i===0)continue;
      ctx.fillText(i,toX(i),oy+16); ctx.textAlign='right'; ctx.fillText(i,ox-5,toY(i)+4); ctx.textAlign='center';
    }
    ctx.fillStyle='#1e293b';ctx.font='bold 13px system-ui';
    ctx.fillText('x',W-pad+12,oy+4); ctx.fillText('y',ox,pad-8);
  }

  function draw() {
    grid();
    if (type==='linear') {
      ctx.strokeStyle='#2563eb'; ctx.lineWidth=2.5; ctx.beginPath();
      for(let x=-xR;x<=xR;x+=0.05){const y=aV*x+bV;x===-xR?ctx.moveTo(toX(x),toY(y)):ctx.lineTo(toX(x),toY(y));}
      ctx.stroke();
      // y-intercept
      ctx.beginPath();ctx.arc(toX(0),toY(bV),5,0,2*Math.PI);ctx.fillStyle='#dc2626';ctx.fill();
      ctx.fillStyle='#dc2626';ctx.font='12px system-ui';ctx.textAlign='left';
      ctx.fillText(`(0, ${bV.toFixed(1)})`,toX(0)+8,toY(bV)-8);
      // x-intercept
      if(Math.abs(aV)>0.01){
        const xi=-bV/aV;
        if(Math.abs(xi)<=xR){
          ctx.beginPath();ctx.arc(toX(xi),toY(0),5,0,2*Math.PI);ctx.fillStyle='#16a34a';ctx.fill();
          ctx.fillStyle='#16a34a';ctx.textAlign='center';ctx.fillText(`(${xi.toFixed(2)}, 0)`,toX(xi),toY(0)+18);
        }
      }
      const xiStr=Math.abs(aV)>0.01?`(${(-bV/aV).toFixed(3)}, 0)`:'Sin cruce con eje x (línea horizontal)';
      container.querySelector('.fg-out').innerHTML=`
        <div class="viz-output-item"><span class="viz-output-label">Ecuación:</span><span class="viz-output-val">y = ${aV}x ${bV>=0?'+ ':'− '}${Math.abs(bV)}</span></div>
        <div class="viz-output-item"><span class="viz-output-label">Pendiente m = ${aV}:</span><span class="viz-output-val">${aV>0?'↗ Creciente':aV<0?'↘ Decreciente':'→ Constante (m=0)'}</span></div>
        <div class="viz-output-item"><span class="viz-output-label">Corte eje y (x=0):</span><span class="viz-output-val">(0, ${bV})</span></div>
        <div class="viz-output-item"><span class="viz-output-label">Corte eje x (y=0):</span><span class="viz-output-val">${xiStr}</span></div>`;
    } else {
      ctx.strokeStyle='#2563eb'; ctx.lineWidth=2.5; ctx.beginPath();
      for(let x=-xR;x<=xR;x+=0.05){const y=aV*x*x+bV*x+cV;x===-xR?ctx.moveTo(toX(x),toY(y)):ctx.lineTo(toX(x),toY(y));}
      ctx.stroke();
      if(Math.abs(aV)>0.01){
        const vx=-bV/(2*aV), vy=aV*vx*vx+bV*vx+cV;
        if(Math.abs(vx)<=xR&&Math.abs(vy)<=xR){
          ctx.beginPath();ctx.arc(toX(vx),toY(vy),6,0,2*Math.PI);ctx.fillStyle='#7c3aed';ctx.fill();
          ctx.fillStyle='#7c3aed';ctx.font='12px system-ui';ctx.textAlign='left';
          ctx.fillText(`V(${vx.toFixed(2)}, ${vy.toFixed(2)})`,toX(vx)+8,toY(vy)-8);
        }
        const disc=bV*bV-4*aV*cV;
        if(disc>=0){
          [1,-1].forEach(s=>{
            const rx=(-bV+s*Math.sqrt(disc))/(2*aV);
            if(Math.abs(rx)<=xR){ctx.beginPath();ctx.arc(toX(rx),toY(0),5,0,2*Math.PI);ctx.fillStyle='#dc2626';ctx.fill();}
          });
        }
        const discStr=disc>0?`Δ=${disc.toFixed(2)} → 2 raíces reales`:disc===0?'Δ=0 → raíz doble':`Δ=${disc.toFixed(2)} → sin raíces reales`;
        const rootStr=disc>0?`x₁=${((-bV+Math.sqrt(disc))/(2*aV)).toFixed(3)}, x₂=${((-bV-Math.sqrt(disc))/(2*aV)).toFixed(3)}`:disc===0?`x=${(-bV/(2*aV)).toFixed(3)}`:'Sin raíces reales';
        const vxStr=(-bV/(2*aV)).toFixed(3), vyStr=(aV*(-bV/(2*aV))**2+bV*(-bV/(2*aV))+cV).toFixed(3);
        container.querySelector('.fg-out').innerHTML=`
          <div class="viz-output-item"><span class="viz-output-label">Vértice V:</span><span class="viz-output-val">(${vxStr}, ${vyStr})</span></div>
          <div class="viz-output-item"><span class="viz-output-label">Parábola:</span><span class="viz-output-val">${aV>0?'↑ Abre hacia arriba':'↓ Abre hacia abajo'}</span></div>
          <div class="viz-output-item"><span class="viz-output-label">Discriminante Δ = b²-4ac:</span><span class="viz-output-val">${discStr}</span></div>
          <div class="viz-output-item"><span class="viz-output-label">Raíces:</span><span class="viz-output-val">${rootStr}</span></div>`;
      }
    }
  }

  container.querySelectorAll('input[type="range"]').forEach((s,i)=>{
    s.addEventListener('input',()=>{
      s.nextElementSibling.textContent=s.value; const v=parseFloat(s.value);
      if(type==='linear'){if(i===0)aV=v;else bV=v;}
      else{if(i===0)aV=v;else if(i===1)bV=v;else cV=v;}
      draw();
    });
  });
  draw();
}

// ─── 12. Angle Types ─────────────────────────────────────────────────────
function initAngleTypes(container, params) {
  const W = 400, H = 280;
  container.innerHTML = `
    <div class="viz-title">Tipos de Ángulos</div>
    <div class="viz-canvas-wrap"><canvas class="at-canvas"></canvas></div>
    <div class="viz-controls">${sliderRow('Ángulo α (°)', 0, 360, params.angle ?? 45, 1)}</div>
    <div class="viz-output at-out"></div>`;

  const canvas = container.querySelector('.at-canvas');
  hiDPI(canvas, W, H);
  const ctx = canvas.getContext('2d');
  let angle = params.angle ?? 45;

  function typeOf(d) {
    if(d===0)   return {name:'Ángulo nulo',    color:'#94a3b8', range:'= 0°'};
    if(d<90)    return {name:'Ángulo agudo',   color:'#16a34a', range:'0° < α < 90°'};
    if(d===90)  return {name:'Ángulo recto',   color:'#2563eb', range:'= 90°'};
    if(d<180)   return {name:'Ángulo obtuso',  color:'#d97706', range:'90° < α < 180°'};
    if(d===180) return {name:'Ángulo llano',   color:'#dc2626', range:'= 180°'};
    if(d<360)   return {name:'Ángulo reflejo', color:'#7c3aed', range:'180° < α < 360°'};
    return             {name:'Ángulo completo',color:'#0891b2', range:'= 360°'};
  }

  function draw() {
    ctx.clearRect(0,0,W,H);
    const CX=W/2, CY=H/2+10, R=100, info=typeOf(angle), rad=angle*Math.PI/180;
    // sector fill
    ctx.beginPath(); ctx.moveTo(CX,CY);
    ctx.arc(CX,CY,R, 0,-rad,true); ctx.closePath();
    ctx.fillStyle=info.color+'22'; ctx.fill();
    // arc
    ctx.beginPath(); ctx.arc(CX,CY,R,0,-rad,true);
    ctx.strokeStyle=info.color; ctx.lineWidth=2.5; ctx.stroke();
    // initial ray (positive x)
    ctx.strokeStyle='#334155'; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(CX,CY); ctx.lineTo(CX+R+18,CY); ctx.stroke();
    // terminal ray
    const tx=CX+(R+18)*Math.cos(-rad), ty=CY+(R+18)*Math.sin(-rad);
    ctx.strokeStyle=info.color; ctx.lineWidth=2.5;
    ctx.beginPath(); ctx.moveTo(CX,CY); ctx.lineTo(tx,ty); ctx.stroke();
    // right-angle box at 90°
    if(Math.abs(angle-90)<1){const sq=15;ctx.strokeStyle='#2563eb';ctx.lineWidth=2;ctx.strokeRect(CX,CY-sq,sq,sq);}
    // angle label
    const midR=rad/2;
    ctx.fillStyle=info.color; ctx.font='bold 15px system-ui'; ctx.textAlign='center';
    ctx.fillText(`${angle}°`, CX+62*Math.cos(-midR)+5, CY+62*Math.sin(-midR));
    // type banner
    ctx.fillStyle=info.color; ctx.font='bold 14px system-ui'; ctx.textAlign='center';
    ctx.fillText(info.name, W/2, 20);

    const comp=angle<=90?`${90-angle}°`:'—', sup=angle<=180?`${180-angle}°`:'—';
    container.querySelector('.at-out').innerHTML=`
      <div class="viz-output-item"><span class="viz-output-label">Tipo:</span><span class="viz-output-val" style="color:${info.color};font-weight:700">${info.name}</span></div>
      <div class="viz-output-item"><span class="viz-output-label">Rango:</span><span class="viz-output-val">${info.range}</span></div>
      <div class="viz-output-item"><span class="viz-output-label">En radianes:</span><span class="viz-output-val">${(angle*Math.PI/180).toFixed(4)} rad</span></div>
      <div class="viz-output-item"><span class="viz-output-label">Ángulo complementario (90°−α):</span><span class="viz-output-val">${comp}</span></div>
      <div class="viz-output-item"><span class="viz-output-label">Ángulo suplementario (180°−α):</span><span class="viz-output-val">${sup}</span></div>`;
  }

  const s=container.querySelector('input[type="range"]');
  s.addEventListener('input',()=>{ angle=parseInt(s.value); s.nextElementSibling.textContent=angle+'°'; draw(); });
  draw();
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
