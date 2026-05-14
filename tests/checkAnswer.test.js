/**
 * tests/checkAnswer.test.js
 * Unit tests for the checkAnswer helper exported from js/components/exercise.js
 */
import { describe, it, expect, vi } from 'vitest';

// exercise.js imports render.js (needs katex) and progress.js — mock heavy deps
vi.mock('../js/render.js', () => ({
  renderMathInString: (s) => s,
  math: (s) => s,
  mathInline: (s) => s,
  mathBlock: (s) => s,
}));
vi.mock('../js/progress.js', () => ({
  markComplete: vi.fn(),
  isComplete: vi.fn(() => false),
}));

import { checkAnswer } from '../js/components/exercise.js';

describe('checkAnswer()', () => {
  it('accepts correct integer', () => {
    expect(checkAnswer('42', 42, 0.01)).toBe(true);
  });

  it('rejects wrong integer', () => {
    expect(checkAnswer('43', 42, 0.01)).toBe(false);
  });

  it('accepts value within numeric tolerance', () => {
    // answer=0.1429, tolerance=0.005
    // tol = 0.005 * 0.1429 + 1e-9 ≈ 0.000714
    // exact 1/7 ≈ 0.142857 — |0.142857 - 0.1429| ≈ 0.000043 < 0.000714 ✓
    expect(checkAnswer('0.142857', 0.1429, 0.005)).toBe(true);
    expect(checkAnswer('0.1429', 0.1429, 0.005)).toBe(true);
  });

  it('rejects old wrong answer 0.4 for obli-p2', () => {
    // This ensures the content bug fix is covered
    expect(checkAnswer('0.4', 0.1429, 0.005)).toBe(false);
  });

  it('accepts comma as decimal separator', () => {
    expect(checkAnswer('3,14', 3.14, 0.01)).toBe(true);
  });

  it('falls back to string comparison for non-numeric', () => {
    expect(checkAnswer('pi', 'pi', 0.01)).toBe(true);
    expect(checkAnswer('Pi', 'pi', 0.01)).toBe(true);  // case insensitive
    expect(checkAnswer('pie', 'pi', 0.01)).toBe(false);
  });

  it('handles zero answer with absolute tolerance', () => {
    // When exp=0, (Math.abs(exp) || 1) = 1, so tol = tolerance * 1
    expect(checkAnswer('0.005', 0, 0.01)).toBe(true);
    expect(checkAnswer('0.02', 0, 0.01)).toBe(false);
  });
});
