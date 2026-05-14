/**
 * tests/progress.test.js
 * Unit tests for js/progress.js
 */
import { describe, it, expect, beforeEach } from 'vitest';

// progress.js uses localStorage and window.dispatchEvent — jsdom provides both.
// We re-import after clearing localStorage each time.

let markComplete, isComplete, resetProgress,
    totalCompleted, totalSectionsCompleted, totalExercisesCompleted;

beforeEach(async () => {
  localStorage.clear();
  // Re-import the module fresh each test (reset in-memory state)
  vi.resetModules();
  const mod = await import('../js/progress.js');
  markComplete            = mod.markComplete;
  isComplete              = mod.isComplete;
  resetProgress           = mod.resetProgress;
  totalCompleted          = mod.totalCompleted;
  totalSectionsCompleted  = mod.totalSectionsCompleted;
  totalExercisesCompleted = mod.totalExercisesCompleted;
});

describe('progress.js', () => {
  it('isComplete returns false for an unknown id', () => {
    expect(isComplete('section:foo')).toBe(false);
  });

  it('markComplete / isComplete roundtrip', () => {
    markComplete('section:fractions');
    expect(isComplete('section:fractions')).toBe(true);
  });

  it('totalSectionsCompleted counts only section: keys', () => {
    markComplete('section:algebra');
    markComplete('section:geometry');
    markComplete('ex:algebra:ex1');    // exercise key — must NOT count
    expect(totalSectionsCompleted()).toBe(2);
  });

  it('totalExercisesCompleted counts only ex: keys', () => {
    markComplete('ex:algebra:ex1');
    markComplete('ex:algebra:ex2');
    markComplete('section:algebra');   // section key — must NOT count
    expect(totalExercisesCompleted()).toBe(2);
  });

  it('totalCompleted counts all keys', () => {
    markComplete('section:foo');
    markComplete('ex:foo:bar');
    expect(totalCompleted()).toBe(2);
  });

  it('progress bar cannot exceed 100% — section count never inflated by exercise keys', () => {
    // Mark 30 exercises complete; only section: keys should count for the progress bar
    for (let i = 0; i < 30; i++) markComplete(`ex:sec${i}:exA`);
    expect(totalSectionsCompleted()).toBe(0);
  });

  it('resetProgress clears all state', () => {
    markComplete('section:foo');
    markComplete('ex:foo:bar');
    resetProgress();
    expect(totalCompleted()).toBe(0);
    expect(isComplete('section:foo')).toBe(false);
  });

  it('persists to localStorage', () => {
    markComplete('section:limits');
    const stored = JSON.parse(localStorage.getItem('matelearn_v1'));
    expect(stored.completed['section:limits']).toBe(true);
  });
});
