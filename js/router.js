/**
 * router.js – Minimal hash-based SPA router.
 * Usage:
 *   import router from './router.js';
 *   router.on('/', () => showHome());
 *   router.on('/:chapter/:section', ({ chapter, section }) => showSection(chapter, section));
 *   router.start();
 */

class Router {
  constructor() {
    this._routes = [];
    this._current = null;
    window.addEventListener('hashchange', () => this._dispatch());
  }

  /**
   * Register a route pattern.
   * Patterns use :name for dynamic segments, e.g. '/:chapter/:section'.
   */
  on(pattern, handler) {
    const keys = [];
    const regexStr = pattern.replace(/:([^/]+)/g, (_, key) => {
      keys.push(key);
      return '([^/]+)';
    });
    this._routes.push({ regex: new RegExp(`^${regexStr}$`), keys, handler });
    return this;
  }

  /** Navigate programmatically. */
  navigate(path) {
    window.location.hash = path;
  }

  /** Begin listening; dispatches the current hash immediately. */
  start() {
    this._dispatch();
  }

  _dispatch() {
    const path = window.location.hash.slice(1) || '/';
    for (const { regex, keys, handler } of this._routes) {
      const m = path.match(regex);
      if (m) {
        const params = {};
        keys.forEach((k, i) => { params[k] = decodeURIComponent(m[i + 1]); });
        this._current = path;
        handler(params);
        return;
      }
    }
  }
}

export default new Router();
