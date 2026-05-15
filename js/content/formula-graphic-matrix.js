/**
 * formula-graphic-matrix.js
 * Matrix that maps each section to its core formula focus and visual plan.
 */

const FORMULA_GRAPHIC_MATRIX = {
  geometry: { formulaFocus: 'Áreas, perímetros y volúmenes', graphicApproach: 'Superposición de medidas y descomposición de figuras', priority: 'secondary', wave: 'C' },
  sets: { formulaFocus: 'Unión, intersección, complemento y cardinalidad', graphicApproach: 'Diagrama de Venn con resaltado de regiones y conteo', priority: 'secondary', wave: 'C' },
  naturals: { formulaFocus: 'Factorización prima, MCD y mcm', graphicApproach: 'Árbol de factores y división simultánea', priority: 'secondary', wave: 'C' },
  integers: { formulaFocus: 'Distancia, valor absoluto y reglas de signo', graphicApproach: 'Recta numérica con saltos dirigidos', priority: 'secondary', wave: 'C' },
  rationals: { formulaFocus: 'Equivalencia fracción-decimal-porcentaje', graphicApproach: 'Torta, barra y escala proporcional', priority: 'secondary', wave: 'C' },
  reals: { formulaFocus: 'Simplificación de radicales y racionalización', graphicApproach: 'Descomposición en áreas cuadradas y panel conjugado', priority: 'immediate', wave: 'C' },
  'linear-equations': { formulaFocus: 'ax+b=c y y=mx+b', graphicApproach: 'Balanza algebraica y corte de recta con ejes', priority: 'secondary', wave: 'A' },
  'quadratic-equations': { formulaFocus: 'Bhaskara, discriminante y Vieta', graphicApproach: 'Parábola con raíces, vértice y estado de Δ', priority: 'secondary', wave: 'A' },
  inequalities: { formulaFocus: 'Desigualdades e inversión por factor negativo', graphicApproach: 'Recta numérica con punto abierto/cerrado e intervalos', priority: 'immediate', wave: 'A' },
  polynomials: { formulaFocus: 'Operaciones, evaluación y resto', graphicApproach: 'Tabla de coeficientes y vínculo curva-raíz', priority: 'secondary', wave: 'A' },
  factorization: { formulaFocus: 'Factor común, cuadrados y cubos notables', graphicApproach: 'Modelos de área/volumen factorizados', priority: 'immediate', wave: 'A' },
  'algebraic-fractions': { formulaFocus: 'C.V., simplificación y suma/resta racional', graphicApproach: 'Flujo de cancelación y marcadores de exclusión', priority: 'immediate', wave: 'A' },
  'exam-practice': { formulaFocus: 'Selección de fórmula según tipo de problema', graphicApproach: 'Mapa de decisión de representación', priority: 'secondary', wave: 'A' },
  lines: { formulaFocus: 'Pendiente, intercepto, paralelismo y perpendicularidad', graphicApproach: 'Plano cartesiano con overlays y comparación de rectas', priority: 'secondary', wave: 'A' },
  'equation-systems': { formulaFocus: 'Clasificación 2x2 y reducción 3x3', graphicApproach: 'Intersección de rectas con estados solución', priority: 'immediate', wave: 'A' },
  circle: { formulaFocus: 'Formas canónica/general y completar cuadrado', graphicApproach: 'Centro-radio y extracción de parámetros', priority: 'secondary', wave: 'A' },
  ellipse: { formulaFocus: 'Ecuación estándar, focos y excentricidad', graphicApproach: 'Sliders de semiejes y focos', priority: 'secondary', wave: 'A' },
  hyperbola: { formulaFocus: 'Forma estándar y asíntotas', graphicApproach: 'Ramas dinámicas con guías asintóticas', priority: 'secondary', wave: 'A' },
  parabola: { formulaFocus: 'Forma canónica, foco y directriz', graphicApproach: 'Equidistancia foco-directriz animada', priority: 'secondary', wave: 'A' },
  angles: { formulaFocus: 'Conversión grados↔radianes y s=rθ', graphicApproach: 'Crecimiento de arco en circunferencia', priority: 'immediate', wave: 'B' },
  'trig-ratios': { formulaFocus: 'sen, cos, tan', graphicApproach: 'Triángulo rectángulo sincronizado con circunferencia unitaria', priority: 'secondary', wave: 'B' },
  'trig-identities': { formulaFocus: 'Identidades pitagóricas y de ángulo doble/suma', graphicApproach: 'Segmentos en circunferencia unitaria con verificación', priority: 'immediate', wave: 'B' },
  'right-triangles': { formulaFocus: 'Pitágoras + trigonometría', graphicApproach: 'Resolución geométrica de lados/ángulos faltantes', priority: 'secondary', wave: 'B' },
  'oblique-triangles': { formulaFocus: 'Leyes del seno y coseno (ASA/AAS/SSA/SAS/SSS)', graphicApproach: 'Triángulo dinámico con cambio de caso', priority: 'immediate', wave: 'B' },
};

export default FORMULA_GRAPHIC_MATRIX;
