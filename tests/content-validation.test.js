/**
 * tests/content-validation.test.js
 * Validates content data integrity: every numeric exercise answer must be finite,
 * and the CRITICAL-2 regression (obli-p2 wrong answer) must stay fixed.
 */
import { describe, it, expect, vi } from 'vitest';

// curriculum/index imports all chapters; they're plain data — no browser APIs needed.
import curriculum from '../js/content/index.js';

describe('curriculum content integrity', () => {
  const allExercises = curriculum.chapters.flatMap(ch =>
    ch.sections.flatMap(sec => [
      ...(sec.exercises ?? []),
      ...(sec.guidedExercises?.flatMap(g => g.steps ?? []) ?? []),
    ])
  );

  it('loads chapters and sections', () => {
    expect(curriculum.chapters.length).toBeGreaterThan(0);
    curriculum.chapters.forEach(ch => {
      expect(ch.sections.length).toBeGreaterThan(0);
    });
  });

  it('every numeric exercise has a finite answer', () => {
    const numerics = allExercises.filter(ex => ex.type === 'numeric');
    numerics.forEach(ex => {
      expect(
        isFinite(ex.answer),
        `Exercise "${ex.id}" has non-finite answer: ${ex.answer}`
      ).toBe(true);
    });
  });

  it('obli-p2 answer is the corrected value ≈ 0.1429 (not the old 0.4)', () => {
    let found = false;
    for (const ch of curriculum.chapters) {
      for (const sec of ch.sections) {
        const ex = (sec.exercises ?? []).find(e => e.id === 'obli-p2');
        if (ex) {
          found = true;
          expect(ex.answer).toBeCloseTo(0.1429, 3);
          expect(ex.answer).not.toBeCloseTo(0.4, 2);
        }
      }
    }
    expect(found, 'obli-p2 exercise not found').toBe(true);
  });

  it('every multiple-choice exercise has a valid answer index', () => {
    const mcs = allExercises.filter(ex => ex.type === 'multiple-choice');
    mcs.forEach(ex => {
      expect(typeof ex.answer).toBe('number');
      expect(ex.answer).toBeGreaterThanOrEqual(0);
      if (ex.options) {
        expect(ex.answer).toBeLessThan(ex.options.length);
      }
    });
  });

  it('every exercise has a unique id within its section', () => {
    curriculum.chapters.forEach(ch => {
      ch.sections.forEach(sec => {
        const ids = (sec.exercises ?? []).map(e => e.id);
        const unique = new Set(ids);
        expect(unique.size, `Duplicate exercise IDs in section "${sec.id}"`).toBe(ids.length);
      });
    });
  });
});
