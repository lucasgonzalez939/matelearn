/**
 * sidebar.js – Renders and manages the left navigation tree.
 */
import { isComplete, totalCompleted } from '../progress.js';
import curriculum from '../content/index.js';

/** Total number of sections across all chapters. */
function totalSections() {
  return curriculum.chapters.reduce((n, ch) => n + ch.sections.length, 0);
}

export function renderSidebar() {
  const nav = document.getElementById('nav-tree');
  if (!nav) return;

  nav.innerHTML = curriculum.chapters.map(ch => `
    <div class="nav-chapter" data-chapter="${ch.id}">
      <div class="nav-chapter-header" data-toggle="${ch.id}">
        <span class="chapter-number">${ch.number}</span>
        <span class="chapter-title">${ch.shortTitle ?? ch.title}</span>
        <span class="chapter-toggle">▾</span>
      </div>
      <ul class="nav-sections" id="sections-${ch.id}">
        ${ch.sections.map(sec => `
          <li class="nav-item${isComplete('section:' + sec.id) ? ' completed' : ''}">
            <a href="#/${ch.id}/${sec.id}" class="nav-link" data-section="${sec.id}">
              ${isComplete('section:' + sec.id) ? '<span class="nav-check">✓</span>' : ''}
              ${sec.title}
            </a>
          </li>`).join('')}
      </ul>
    </div>`).join('');

  // Chapter toggles
  nav.querySelectorAll('.nav-chapter-header').forEach(header => {
    header.addEventListener('click', () => {
      header.closest('.nav-chapter').classList.toggle('open');
    });
  });

  // Open first chapter by default
  nav.querySelector('.nav-chapter')?.classList.add('open');

  updateProgressPanel();
}

export function updateProgressPanel() {
  const done = totalCompleted();
  const total = totalSections();
  const pct = total ? Math.round((done / total) * 100) : 0;

  const bar = document.getElementById('global-progress-bar');
  const txt = document.getElementById('global-progress-text');
  if (bar) bar.style.width = `${pct}%`;
  if (txt) txt.textContent = `${done} de ${total} secciones completadas`;

  // Refresh completed class on nav items
  document.querySelectorAll('.nav-item').forEach(li => {
    const link = li.querySelector('.nav-link');
    if (!link) return;
    const sid = link.dataset.section;
    const done = isComplete('section:' + sid);
    li.classList.toggle('completed', done);
    const check = li.querySelector('.nav-check');
    if (done && !check) {
      link.insertAdjacentHTML('afterbegin', '<span class="nav-check">✓</span>');
    } else if (!done && check) {
      check.remove();
    }
  });
}

export function setActiveNavLink(sectionId) {
  document.querySelectorAll('.nav-link').forEach(a => {
    a.classList.toggle('active', a.dataset.section === sectionId);
  });

  // Auto-open the chapter containing this section
  const active = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
  active?.closest('.nav-chapter')?.classList.add('open');
}
