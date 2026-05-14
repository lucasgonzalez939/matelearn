/**
 * app.js – Application bootstrap.
 * Wires together routing, sidebar, and content rendering.
 */
import router from './router.js';
import curriculum from './content/index.js';
import { renderSidebar, setActiveNavLink, updateProgressPanel } from './components/sidebar.js';
import { renderTheory } from './components/theory.js';
import { renderExercises, renderGuidedExercises } from './components/exercise.js';
import { hasSolver, renderSolver, SOLVERS } from './components/solver.js';
import { renderGame } from './components/game.js';
import { markComplete, resetProgress } from './progress.js';
import { renderMathInString } from './render.js';

// ─── Utilities ────────────────────────────────────────────────────────────

/** Escape user-controlled strings before inserting into innerHTML. */
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

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
      <button class="game-entry-btn" id="go-game">🎮 Modo Juego</button>
    </div>`;

  contentEl.innerHTML = html;

  contentEl.querySelectorAll('.chapter-card').forEach(card => {
    const open = () => router.navigate(`/${card.dataset.chapter}/${card.dataset.first}`);
    card.addEventListener('click', open);
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') open(); });
  });

  contentEl.querySelector('#go-game')?.addEventListener('click', () => router.navigate('/game'));
}

/** Section view */
function showSection(chapterId, sectionId) {
  const chapter = curriculum.findChapter(chapterId);
  const section = curriculum.findSection(chapterId, sectionId);

  if (!chapter || !section) {
    contentEl.innerHTML = `<div class="section-not-found">Sección no encontrada: ${escapeHtml(chapterId)}/${escapeHtml(sectionId)}</div>`;
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
    exercisesPanel.innerHTML = '<p class="no-exercises-msg">No hay ejercicios de práctica registrados aún para esta sección.</p>';
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
        <button id="mark-complete-btn" class="btn-mark-complete">
          Marcar completa ✓
        </button>
      </div>`;
    exercisesPanel.appendChild(completeBanner);

    completeBanner.querySelector('#mark-complete-btn')?.addEventListener('click', () => {
      markComplete(`section:${section.id}`);
      const btn = completeBanner.querySelector('#mark-complete-btn');
      btn.textContent = '✓ Marcada como completa';
      btn.disabled = true;
      btn.classList.add('btn-mark-complete--done');
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

/** Game screen */
function showGame() {
  contentEl.innerHTML = '';
  renderGame(contentEl);
}

/** 404 – route not found */
function show404(path) {
  contentEl.innerHTML = `
    <div class="not-found-view">
      <h2>Página no encontrada</h2>
      <p>La ruta <code>${escapeHtml(path)}</code> no existe.</p>
      <a href="#/">Volver al inicio</a>
    </div>`;
}

router
  .on('/', () => showWelcome())
  .on('/game', () => showGame())
  .on('/:chapter/:section', ({ chapter, section }) => showSection(chapter, section));

// Catch-all: unmatched routes show a 404 view
window.addEventListener('routeNotFound', ({ detail }) => show404(detail.path));

// ─── Solver key validation ────────────────────────────────────────────────

Object.keys(SOLVERS).forEach(id => {
  if (!curriculum.chapters.some(ch => ch.sections.some(s => s.id === id))) {
    console.warn(`[Solver] No section found for solver key "${id}"`);
  }
});

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
const themeToggleBtn = document.getElementById('theme-toggle-btn');

const THEME_STORAGE_KEY = 'matelearn-theme';

function applyTheme(theme) {
  if (theme === 'dark' || theme === 'light') {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } else {
    document.documentElement.removeAttribute('data-theme');
    localStorage.removeItem(THEME_STORAGE_KEY);
  }

  const effectiveTheme = theme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  if (themeToggleBtn) {
    const isDark = effectiveTheme === 'dark';
    themeToggleBtn.textContent = isDark ? '☀️ Modo claro' : '🌙 Modo oscuro';
    themeToggleBtn.setAttribute('aria-pressed', String(isDark));
  }
}

applyTheme(localStorage.getItem(THEME_STORAGE_KEY));

themeToggleBtn?.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme')
    || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

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

// ─── Reset progress – custom dialog (FIX-10) ─────────────────────────────

const resetDialog = document.getElementById('reset-dialog');

document.getElementById('reset-btn')?.addEventListener('click', () => {
  resetDialog?.showModal();
});

document.getElementById('reset-confirm')?.addEventListener('click', () => {
  resetDialog?.close();
  resetProgress();
  renderSidebar();
  updateProgressPanel();
});

document.getElementById('reset-cancel')?.addEventListener('click', () => {
  resetDialog?.close();
});

// Close on backdrop click
resetDialog?.addEventListener('click', e => {
  if (e.target === resetDialog) resetDialog.close();
});

// ─── Start router (gated on KaTeX) ───────────────────────────────────────

function startWhenReady() {
  if (typeof katex !== 'undefined') {
    router.start();
    return;
  }
  // Wait for all deferred scripts to finish loading
  window.addEventListener('load', () => router.start(), { once: true });
}

startWhenReady();
