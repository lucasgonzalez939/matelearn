/**
 * app.js – Application bootstrap.
 * Wires together routing, sidebar, and content rendering.
 */
import router from './router.js';
import curriculum from './content/index.js';
import { renderSidebar, setActiveNavLink, updateProgressPanel } from './components/sidebar.js';
import { renderTheory } from './components/theory.js';
import { renderExercises, renderGuidedExercises } from './components/exercise.js';
import { hasSolver, renderSolver } from './components/solver.js';
import { markComplete, resetProgress } from './progress.js';
import { renderMathInString } from './render.js';

// ─── Main container ───────────────────────────────────────────────────────

const contentEl = document.getElementById('content');

// ─── Route handlers ───────────────────────────────────────────────────────

/** Welcome / home screen */
function showWelcome() {
  const html = `
    <div class="welcome-screen">
      <span class="welcome-symbol">∑</span>
      <h1>Matemáticas para Ingeniería</h1>
      <p class="subtitle">
        Aprende los fundamentos matemáticos con teoría clara, visualizaciones
        interactivas y ejercicios guiados. Selecciona un capítulo para comenzar.
      </p>
      <div class="chapters-grid">
        ${curriculum.chapters.map(ch => `
          <div class="chapter-card" data-first="${ch.sections[0]?.id}" data-chapter="${ch.id}" tabindex="0">
            <div class="chapter-card-num">Capítulo ${ch.number}</div>
            <h3>${ch.title}</h3>
            <p>${ch.description}</p>
          </div>`).join('')}
      </div>
    </div>`;

  contentEl.innerHTML = html;

  contentEl.querySelectorAll('.chapter-card').forEach(card => {
    const open = () => router.navigate(`/${card.dataset.chapter}/${card.dataset.first}`);
    card.addEventListener('click', open);
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') open(); });
  });
}

/** Section view */
function showSection(chapterId, sectionId) {
  const chapter = curriculum.findChapter(chapterId);
  const section = curriculum.findSection(chapterId, sectionId);

  if (!chapter || !section) {
    contentEl.innerHTML = `<div style="padding:2rem;color:#dc2626">Sección no encontrada: ${chapterId}/${sectionId}</div>`;
    return;
  }

  setActiveNavLink(sectionId);

  // Build shell
  contentEl.innerHTML = `
    <div class="section-view">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="#/">Inicio</a>
        <span class="breadcrumb-sep">›</span>
        <span>Capítulo ${chapter.number}: ${chapter.shortTitle ?? chapter.title}</span>
        <span class="breadcrumb-sep">›</span>
        <span>${section.title}</span>
      </nav>
      <h1 class="section-title">${section.title}</h1>
      ${section.intro ? `<p class="section-intro">${renderMathInString(section.intro)}</p>` : ''}

      <div class="tabs" role="tablist">
        <button class="tab-btn active" data-tab="theory" role="tab" aria-selected="true">📖 Teoría</button>
        <button class="tab-btn" data-tab="exercises" role="tab" aria-selected="false">✏️ Ejercicios</button>
        ${hasSolver(section.id) ? '<button class="tab-btn" data-tab="solver" role="tab" aria-selected="false">🔧 Resolver</button>' : ''}
      </div>

      <div id="tab-theory"    class="tab-panel active"></div>
      <div id="tab-exercises" class="tab-panel"></div>
      ${hasSolver(section.id) ? '<div id="tab-solver" class="tab-panel"></div>' : ''}
    </div>`;

  // Theory tab
  const theoryPanel = contentEl.querySelector('#tab-theory');
  if (section.theory?.length) {
    theoryPanel.appendChild(renderTheory(section.theory));
  }
  if (section.guidedExercises?.length) {
    theoryPanel.appendChild(renderGuidedExercises(section.guidedExercises));
  }

  // Solver tab (conditionally rendered)
  if (hasSolver(section.id)) {
    const solverPanel = contentEl.querySelector('#tab-solver');
    solverPanel?.appendChild(renderSolver(section.id));
  }

  // Exercises tab
  const exercisesPanel = contentEl.querySelector('#tab-exercises');
  if (section.exercises?.length) {
    exercisesPanel.appendChild(renderExercises(section.exercises, section.id));
  } else {
    exercisesPanel.innerHTML = '<p style="color:#94a3b8;padding:1rem">No hay ejercicios de práctica registrados aún para esta sección.</p>';
  }

  // Add "Section complete" button at bottom of exercises tab
  if (section.exercises?.length) {
    const completeBanner = document.createElement('div');
    completeBanner.innerHTML = `
      <div class="section-complete-banner">
        <span class="banner-icon">🎯</span>
        <div>
          <h3>¡Sección terminada!</h3>
          <p>¿Completaste los ejercicios? Marca esta sección como completada.</p>
        </div>
        <button id="mark-complete-btn" style="margin-left:auto;padding:.5rem 1rem;background:#16a34a;color:white;border:none;border-radius:8px;cursor:pointer;font-weight:600">
          Marcar completa ✓
        </button>
      </div>`;
    exercisesPanel.appendChild(completeBanner);

    completeBanner.querySelector('#mark-complete-btn')?.addEventListener('click', () => {
      markComplete(`section:${section.id}`);
      const btn = completeBanner.querySelector('#mark-complete-btn');
      btn.textContent = '✓ Marcada como completa';
      btn.disabled = true;
      btn.style.background = '#94a3b8';
      updateProgressPanel();
      renderSidebar(); // refresh nav items
    });
  }

  // Tab switching
  contentEl.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      contentEl.querySelectorAll('.tab-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      contentEl.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      contentEl.querySelector(`#tab-${btn.dataset.tab}`)?.classList.add('active');
    });
  });

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─── Routing ──────────────────────────────────────────────────────────────

router
  .on('/', () => showWelcome())
  .on('/:chapter/:section', ({ chapter, section }) => showSection(chapter, section));

// ─── Sidebar & progress ───────────────────────────────────────────────────

renderSidebar();

// Listen for progress changes to update sidebar badges
window.addEventListener('progressUpdate', () => {
  updateProgressPanel();
});

// ─── Sidebar mobile toggle ────────────────────────────────────────────────

const toggleBtn = document.getElementById('sidebar-toggle');
const sidebar   = document.getElementById('sidebar');
const overlay   = document.getElementById('sidebar-overlay');

toggleBtn?.addEventListener('click', () => {
  const open = sidebar.classList.toggle('open');
  toggleBtn.setAttribute('aria-expanded', String(open));
  overlay?.classList.toggle('visible', open);
});

overlay?.addEventListener('click', () => {
  sidebar.classList.remove('open');
  toggleBtn?.setAttribute('aria-expanded', 'false');
  overlay.classList.remove('visible');
});

// Close sidebar when a link is clicked on mobile
sidebar?.addEventListener('click', e => {
  if (e.target.closest('.nav-link') && window.innerWidth <= 768) {
    sidebar.classList.remove('open');
    toggleBtn?.setAttribute('aria-expanded', 'false');
    overlay?.classList.remove('visible');
  }
});

// ─── Reset progress button ────────────────────────────────────────────────

document.getElementById('reset-btn')?.addEventListener('click', () => {
  if (confirm('¿Seguro que quieres reiniciar todo el progreso?')) {
    resetProgress();
    renderSidebar();
    updateProgressPanel();
  }
});

// ─── Start router ─────────────────────────────────────────────────────────

router.start();
