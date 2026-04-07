/**
 * content/index.js – Aggregates all chapter data.
 */
import chapter1 from './chapter1.js';
import chapter2 from './chapter2.js';
import chapter3 from './chapter3.js';
import chapter4 from './chapter4.js';

const curriculum = {
  title: 'Matemáticas para Ingeniería',
  chapters: [chapter1, chapter2, chapter3, chapter4],

  /** Find a section by chapter id and section id. */
  findSection(chapterId, sectionId) {
    const chapter = this.chapters.find(c => c.id === chapterId);
    if (!chapter) return null;
    return chapter.sections.find(s => s.id === sectionId) ?? null;
  },

  /** Find a chapter by id. */
  findChapter(chapterId) {
    return this.chapters.find(c => c.id === chapterId) ?? null;
  },
};

export default curriculum;
