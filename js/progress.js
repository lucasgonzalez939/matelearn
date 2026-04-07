/**
 * progress.js – LocalStorage-backed progress tracking.
 */

const KEY = 'matelearn_v1';

function _load() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : { completed: {}, scores: {} };
  } catch {
    return { completed: {}, scores: {} };
  }
}

function _save(data) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('[MateLearn] Could not save progress:', e);
  }
}

let _state = _load();

/** Mark an exercise or section as completed. */
export function markComplete(id) {
  _state.completed[id] = true;
  _save(_state);
  dispatchUpdate();
}

/** Check if an id is completed. */
export function isComplete(id) {
  return !!_state.completed[id];
}

/** Save a numeric score (0–100) for a section. */
export function setScore(id, score) {
  _state.scores[id] = score;
  _save(_state);
}

export function getScore(id) {
  return _state.scores[id] ?? null;
}

/** Total number of completed items. */
export function totalCompleted() {
  return Object.keys(_state.completed).length;
}

/** Reset all progress (requires explicit call). */
export function resetProgress() {
  _state = { completed: {}, scores: {} };
  _save(_state);
  dispatchUpdate();
}

/** Fire a custom DOM event so UI components can react to progress changes. */
function dispatchUpdate() {
  window.dispatchEvent(new CustomEvent('progressUpdate'));
}
