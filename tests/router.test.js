/**
 * tests/router.test.js
 * Unit tests for js/router.js
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';

// jsdom provides window and window.location, but hash navigation needs careful setup.
// We manipulate window.location.hash directly and call _dispatch via router.start().

// Re-import a fresh router for each test to avoid stale route registrations.
let Router;

beforeEach(async () => {
  vi.resetModules();
  // jsdom sets location.hash to '' by default
  window.location.hash = '';
  const mod = await import('../js/router.js');
  Router = mod.default;
});

describe('router.js', () => {
  it('dispatches "/" route for empty hash', () => {
    const handler = vi.fn();
    Router.on('/', handler);
    Router.start();
    expect(handler).toHaveBeenCalledOnce();
  });

  it('dispatches named route with params', () => {
    const handler = vi.fn();
    Router.on('/:chapter/:section', handler);
    window.location.hash = '/algebra/linear-equations';
    Router.start();
    expect(handler).toHaveBeenCalledWith({ chapter: 'algebra', section: 'linear-equations' });
  });

  it('decodes URI-encoded parameters', () => {
    const handler = vi.fn();
    Router.on('/:chapter/:section', handler);
    window.location.hash = '/algebra/ecuaci%C3%B3n';
    Router.start();
    expect(handler).toHaveBeenCalledWith({ chapter: 'algebra', section: 'ecuación' });
  });

  it('dispatches routeNotFound for unmatched paths', () => {
    const notFoundHandler = vi.fn();
    window.addEventListener('routeNotFound', notFoundHandler);
    window.location.hash = '/this/does/not/exist/at/all';
    Router.start();
    expect(notFoundHandler).toHaveBeenCalled();
    window.removeEventListener('routeNotFound', notFoundHandler);
  });

  it('does not call routeNotFound when a route matches', () => {
    const notFoundHandler = vi.fn();
    Router.on('/', () => {});
    window.addEventListener('routeNotFound', notFoundHandler);
    window.location.hash = '';
    Router.start();
    expect(notFoundHandler).not.toHaveBeenCalled();
    window.removeEventListener('routeNotFound', notFoundHandler);
  });
});
