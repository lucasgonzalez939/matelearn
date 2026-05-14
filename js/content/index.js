/**
 * content/index.js – Aggregates all chapter data.
 */
import chapter1 from './chapter1.js';
import chapter2 from './chapter2.js';
import chapter3 from './chapter3.js';
import chapter4 from './chapter4.js';

const PEDAGOGICAL_FLOW = [
  'intro-proposito-practico',
  'teoria-progresiva',
  'ejemplo-resuelto',
  'ejercicio-guiado',
  'practica-autonoma-por-dificultad',
];

const PEDAGOGICAL_STANDARD_BY_SECTION = {
  geometry: {
    objective: 'Aplicar fórmulas geométricas de área, perímetro y volumen en problemas básicos de ingeniería.',
    prerequisites: ['Aritmética básica', 'Manejo de unidades'],
    cognitiveLevel: 'Aplicar',
    masteryCriteria: 'Resuelve ejercicios de áreas y volúmenes con al menos 80% de aciertos y unidades correctas.',
  },
  sets: {
    objective: 'Modelar relaciones entre colecciones usando operaciones y cardinalidad de conjuntos.',
    prerequisites: ['Lectura simbólica básica', 'Lógica elemental'],
    cognitiveLevel: 'Comprender y aplicar',
    masteryCriteria: 'Determina unión, intersección, complemento y cardinalidad en contextos simples.',
  },
  naturals: {
    objective: 'Resolver problemas de factorización, MCD y mcm para tomar decisiones de sincronización y reparto.',
    prerequisites: ['Operaciones con números naturales'],
    cognitiveLevel: 'Aplicar',
    masteryCriteria: 'Calcula factorización prima, MCD y mcm sin errores operativos críticos.',
  },
  integers: {
    objective: 'Interpretar y operar enteros en situaciones con signo como temperatura, deuda y desplazamiento.',
    prerequisites: ['Aritmética con naturales'],
    cognitiveLevel: 'Aplicar',
    masteryCriteria: 'Resuelve operaciones combinadas con enteros y justifica la regla de signos.',
  },
  rationals: {
    objective: 'Usar fracciones, decimales y porcentajes para cálculos proporcionales frecuentes en ingeniería.',
    prerequisites: ['MCD y mcm', 'Operaciones básicas'],
    cognitiveLevel: 'Aplicar',
    masteryCriteria: 'Convierte y opera representaciones racionales manteniendo equivalencia numérica.',
  },
  reals: {
    objective: 'Manipular radicales y expresiones irracionales para simplificar resultados algebraicos.',
    prerequisites: ['Números racionales', 'Potencias'],
    cognitiveLevel: 'Aplicar y analizar',
    masteryCriteria: 'Simplifica radicales y racionaliza denominadores en ejercicios de práctica.',
  },
  'linear-equations': {
    objective: 'Resolver ecuaciones lineales y traducir problemas verbales a modelos algebraicos.',
    prerequisites: ['Operaciones con enteros y racionales'],
    cognitiveLevel: 'Aplicar',
    masteryCriteria: 'Despeja incógnitas y verifica soluciones en ecuaciones lineales de una variable.',
  },
  'quadratic-equations': {
    objective: 'Resolver ecuaciones cuadráticas con factorización y fórmula general según el caso.',
    prerequisites: ['Ecuaciones lineales', 'Productos notables'],
    cognitiveLevel: 'Aplicar y analizar',
    masteryCriteria: 'Elige método adecuado y clasifica raíces con el discriminante.',
  },
  inequalities: {
    objective: 'Resolver inecuaciones e interpretar sus soluciones en la recta real.',
    prerequisites: ['Ecuaciones lineales', 'Reglas de signo'],
    cognitiveLevel: 'Aplicar',
    masteryCriteria: 'Obtiene intervalos correctos y respeta el cambio de desigualdad al multiplicar por negativos.',
  },
  polynomials: {
    objective: 'Operar polinomios y reconocer estructura algebraica para simplificar expresiones.',
    prerequisites: ['Monomios y potencias', 'Propiedad distributiva'],
    cognitiveLevel: 'Aplicar',
    masteryCriteria: 'Realiza suma, resta, producto y división básica de polinomios correctamente.',
  },
  factorization: {
    objective: 'Descomponer expresiones algebraicas para facilitar resolución de ecuaciones y simplificación.',
    prerequisites: ['Productos notables', 'Polinomios'],
    cognitiveLevel: 'Aplicar',
    masteryCriteria: 'Identifica y aplica al menos dos técnicas de factorización sin errores estructurales.',
  },
  'algebraic-fractions': {
    objective: 'Simplificar y operar fracciones algebraicas respetando restricciones de dominio.',
    prerequisites: ['Factorización', 'Fracciones numéricas'],
    cognitiveLevel: 'Aplicar y analizar',
    masteryCriteria: 'Opera fracciones algebraicas indicando condiciones de existencia.',
  },
  'exam-practice': {
    objective: 'Integrar potenciación, polinomios, ecuaciones racionales y modelización en formato de parcial.',
    prerequisites: ['Polinomios', 'Fracciones algebraicas', 'Geometría plana'],
    cognitiveLevel: 'Analizar y resolver',
    masteryCriteria: 'Resuelve simulacros de 10 puntos justificando propiedades y validando resultados.',
  },
  lines: {
    objective: 'Modelar rectas en el plano usando pendiente, intercepto y formas equivalentes de la ecuación.',
    prerequisites: ['Coordenadas cartesianas', 'Ecuaciones lineales'],
    cognitiveLevel: 'Aplicar',
    masteryCriteria: 'Calcula pendientes, ecuaciones y relaciones de paralelismo/perpendicularidad.',
  },
  'equation-systems': {
    objective: 'Resolver sistemas lineales y clasificar su tipo según número de soluciones.',
    prerequisites: ['Ecuaciones lineales', 'Operaciones algebraicas'],
    cognitiveLevel: 'Aplicar y analizar',
    masteryCriteria: 'Resuelve sistemas 2x2 por al menos un método y valida la solución.',
  },
  circle: {
    objective: 'Relacionar formas canónica y general de la circunferencia para obtener centro y radio.',
    prerequisites: ['Plano cartesiano', 'Completar cuadrado'],
    cognitiveLevel: 'Aplicar',
    masteryCriteria: 'Convierte ecuaciones de circunferencia y extrae parámetros geométricos.',
  },
  ellipse: {
    objective: 'Interpretar la ecuación de la elipse y sus elementos principales en el plano.',
    prerequisites: ['Cónicas básicas', 'Álgebra elemental'],
    cognitiveLevel: 'Comprender y aplicar',
    masteryCriteria: 'Identifica centro, semiejes y orientación de la elipse.',
  },
  hyperbola: {
    objective: 'Reconocer estructura y parámetros de la hipérbola en forma estándar.',
    prerequisites: ['Cónicas', 'Álgebra elemental'],
    cognitiveLevel: 'Comprender y aplicar',
    masteryCriteria: 'Determina centro, ejes y asíntotas en ejercicios básicos.',
  },
  parabola: {
    objective: 'Analizar parábolas para identificar vértice, foco y dirección de apertura.',
    prerequisites: ['Función cuadrática', 'Plano cartesiano'],
    cognitiveLevel: 'Aplicar',
    masteryCriteria: 'Encuentra parámetros geométricos de una parábola en distintas formas.',
  },
  angles: {
    objective: 'Convertir y operar medidas angulares en grados y radianes para modelar arcos y giros.',
    prerequisites: ['Proporcionalidad', 'Uso de pi'],
    cognitiveLevel: 'Aplicar',
    masteryCriteria: 'Convierte unidades angulares y calcula longitud de arco correctamente.',
  },
  'trig-ratios': {
    objective: 'Aplicar razones trigonométricas para relacionar lados y ángulos en triángulos rectángulos.',
    prerequisites: ['Ángulos en grados y radianes', 'Teorema de Pitágoras'],
    cognitiveLevel: 'Aplicar',
    masteryCriteria: 'Calcula seno, coseno y tangente en problemas directos.',
  },
  'trig-identities': {
    objective: 'Usar identidades trigonométricas para simplificar expresiones y verificar igualdades.',
    prerequisites: ['Razones trigonométricas', 'Álgebra básica'],
    cognitiveLevel: 'Aplicar y analizar',
    masteryCriteria: 'Simplifica expresiones usando identidades fundamentales sin contradicciones algebraicas.',
  },
  'right-triangles': {
    objective: 'Resolver triángulos rectángulos para hallar longitudes y ángulos faltantes.',
    prerequisites: ['Razones trigonométricas', 'Pitágoras'],
    cognitiveLevel: 'Aplicar',
    masteryCriteria: 'Obtiene datos faltantes del triángulo rectángulo y comprueba coherencia geométrica.',
  },
  'oblique-triangles': {
    objective: 'Resolver triángulos oblicuángulos con leyes de seno y coseno en contextos aplicados.',
    prerequisites: ['Trigonometría básica', 'Álgebra con ecuaciones'],
    cognitiveLevel: 'Aplicar y analizar',
    masteryCriteria: 'Selecciona la ley adecuada y resuelve casos SAS/ASA/SSS con interpretación correcta.',
  },
};

function withPedagogicalStandard(section) {
  const standard = PEDAGOGICAL_STANDARD_BY_SECTION[section.id];
  if (!standard) {
    throw new Error(`[content] Missing pedagogical standard for section "${section.id}"`);
  }

  return {
    ...section,
    pedagogy: {
      ...standard,
      didacticFlow: PEDAGOGICAL_FLOW,
    },
  };
}

const chapters = [chapter1, chapter2, chapter3, chapter4].map(chapter => ({
  ...chapter,
  sections: chapter.sections.map(withPedagogicalStandard),
}));

const curriculum = {
  title: 'Matemáticas para Ingeniería',
  chapters,

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
