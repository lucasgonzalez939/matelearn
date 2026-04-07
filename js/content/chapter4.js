/** Chapter 4 – Ángulos y Trigonometría */

export default {
  id: 'ch4',
  number: 4,
  title: 'Ángulos y Trigonometría',
  shortTitle: 'Trigonometría',
  description: 'Medida de ángulos, razones trigonométricas, identidades, resolución de triángulos y leyes del seno y coseno.',
  sections: [

    // ──────────────────────────────────────────────────────────────────────
    // 4.1 ÁNGULOS Y MEDICIÓN
    // ──────────────────────────────────────────────────────────────────────
    {
      id: 'angles',
      title: 'Ángulos y Sistemas de Medición',
      intro: 'Un ángulo se forma por dos semirrectas con un origen común (vértice). Existen dos sistemas para medirlos: grados sexagesimales y radianes.',
      theory: [
        { type: 'heading', text: 'Sistemas de medición' },
        {
          type: 'table',
          headers: ['Sistema', 'Unidad', 'Vuelta completa', 'División'],
          rows: [
            ['Sexagesimal', 'Grado (°)', '360°', '1° = 60\' = 3600\'\''],
            ['Radián', 'rad', '$2\\pi$ rad', '$1\\text{ rad} \\approx 57.296°$'],
          ],
        },
        {
          type: 'definition',
          term: 'Conversión entre grados y radianes',
          text: '$$\\theta_{\\text{rad}} = \\theta_{°} \\times \\frac{\\pi}{180°} \\qquad \\theta_{°} = \\theta_{\\text{rad}} \\times \\frac{180°}{\\pi}$$',
        },
        {
          type: 'table',
          headers: ['Grados', 'Radianes'],
          rows: [
            ['$30°$', '$\\dfrac{\\pi}{6}$'],
            ['$45°$', '$\\dfrac{\\pi}{4}$'],
            ['$60°$', '$\\dfrac{\\pi}{3}$'],
            ['$90°$', '$\\dfrac{\\pi}{2}$'],
            ['$180°$', '$\\pi$'],
            ['$360°$', '$2\\pi$'],
          ],
        },
        { type: 'heading', text: 'Longitud de arco' },
        { type: 'formula', tex: 's = r\\theta \\quad (\\theta \\text{ en radianes})' },
        {
          type: 'example',
          title: 'Ejemplo: Longitud de arco con $r=5$ m y $\\theta = 60°$',
          problem: '$r = 5$ m, $\\theta = 60° = \\frac{\\pi}{3}$',
          steps: ['$s = 5 \\times \\dfrac{\\pi}{3} = \\dfrac{5\\pi}{3} \\approx 5.24$ m'],
          result: '$s \\approx 5.24$ m',
        },
        { type: 'heading', text: 'Clasificación de ángulos' },
        {
          type: 'table',
          headers: ['Tipo', 'Medida'],
          rows: [
            ['Agudo', '$0° < \\theta < 90°$'],
            ['Recto', '$\\theta = 90°$'],
            ['Obtuso', '$90° < \\theta < 180°$'],
            ['Llano', '$\\theta = 180°$'],
            ['Complementarios', '$\\alpha + \\beta = 90°$'],
            ['Suplementarios', '$\\alpha + \\beta = 180°$'],
          ],
        },
        {
          type: 'text',
          html: 'Mueve el control del explorador para ver cómo se clasifica cada ángulo y observa sus relaciones con el complementario y el suplementario:',
        },
        {
          type: 'visualization',
          id: 'angle-types',
          params: { angle: 45 },
        },
      ],
      guidedExercises: [
        {
          id: 'ang-g1', type: 'guided', difficulty: 1,
          statement: 'Convierte $135°$ a radianes.',
          steps: [
            { instruction: 'Multiplica por $\\pi/180$.', formula: '135 \\times \\frac{\\pi}{180} = \\frac{135}{180}\\pi = \\frac{3}{4}\\pi' },
            { instruction: '¿Cuánto es $\\frac{3}{4}\\pi$ en radianes decimales? (usa $\\pi \\approx 3.1416$, redondea a 4 decimales)', answer: '2.3562', placeholder: '≈ ? rad', tolerance: 0.01 },
          ],
          explanation: '$135° = \\dfrac{3\\pi}{4} \\approx 2.3562$ rad.',
        },
        {
          id: 'ang-g2', type: 'guided', difficulty: 2,
          statement: 'Un sector circular tiene radio $r = 10$ cm y ángulo central $\\theta = 72°$. Calcula la longitud del arco.',
          steps: [
            { instruction: 'Convierte $72°$ a radianes: $72 \\times \\frac{\\pi}{180} = ?$ rad', answer: '1.2566', placeholder: 'θ en rad', tolerance: 0.01 },
            { instruction: 'Calcula $s = r\\theta = 10 \\times 1.2566 = ?$ cm', answer: '12.566', placeholder: 's ≈ ? cm', tolerance: 0.1 },
          ],
          explanation: '$\\theta = \\frac{2\\pi}{5}$ rad. $s = 10 \\times \\frac{2\\pi}{5} = 4\\pi \\approx 12.566$ cm.',
        },
      ],
      exercises: [
        { id: 'ang-p1', type: 'numeric', difficulty: 1, statement: 'Convierte $\\dfrac{\\pi}{6}$ radianes a grados.', answer: 30, explanation: '$\\frac{\\pi}{6} \\times \\frac{180}{\\pi} = 30°$.' },
        { id: 'ang-p2', type: 'numeric', difficulty: 1, statement: '¿Cuántos grados tiene el ángulo suplementario de $65°$?', answer: 115, explanation: '$180° - 65° = 115°$.' },
        {
          id: 'ang-p3', type: 'multiple-choice', difficulty: 2,
          statement: 'La longitud del arco de una semicircunferencia de radio $r = 4$ cm es:',
          options: ['$4\\pi$ cm', '$8\\pi$ cm', '$2\\pi$ cm', '$16\\pi$ cm'],
          answer: 0,
          explanation: '$s = r\\pi = 4\\pi$ cm ($\\theta = \\pi$ para media vuelta).',
        },
        {
          id: 'ang-p4', type: 'numeric', difficulty: 2,
          statement: 'Convierte $270°$ a radianes. Escribe el resultado en múltiplos de $\\pi$ (responde el coeficiente, ej. para $\\frac{3}{2}\\pi$ escribe $1.5$).',
          answer: 1.5,
          explanation: '$270° \\times \\frac{\\pi}{180} = \\frac{3\\pi}{2} = 1.5\\pi$.',
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────────
    // 4.2 RAZONES TRIGONOMÉTRICAS
    // ──────────────────────────────────────────────────────────────────────
    {
      id: 'trig-ratios',
      title: 'Razones Trigonométricas',
      intro: 'Las razones trigonométricas relacionan los ángulos de un triángulo rectángulo con las longitudes de sus lados. Se generalizan a cualquier ángulo mediante la circunferencia unitaria.',
      theory: [
        { type: 'heading', text: 'Razones en el triángulo rectángulo' },
        {
          type: 'definition',
          term: 'Definiciones',
          text: 'Para un ángulo $\\theta$ en un triángulo rectángulo: $$\\sin\\theta = \\frac{\\text{opuesto}}{\\text{hipotenusa}} \\quad \\cos\\theta = \\frac{\\text{adyacente}}{\\text{hipotenusa}} \\quad \\tan\\theta = \\frac{\\text{opuesto}}{\\text{adyacente}}$$',
        },
        {
          type: 'table',
          headers: ['Razón', 'Definición', 'Recíproca'],
          rows: [
            ['$\\sin\\theta$', 'opuesto/hipotenusa', '$\\csc\\theta = 1/\\sin\\theta$'],
            ['$\\cos\\theta$', 'adyacente/hipotenusa', '$\\sec\\theta = 1/\\cos\\theta$'],
            ['$\\tan\\theta$', 'opuesto/adyacente', '$\\cot\\theta = 1/\\tan\\theta$'],
          ],
        },
        {
          type: 'text',
          html: 'Mnemónico para recordar las razones: <strong>SOH-CAH-TOA</strong><ul style="margin:.4rem 0 .4rem 1.5rem;line-height:1.9"><li><strong>S</strong>OH: $\\sin = \\dfrac{\\text{<strong>O</strong>puesto}}{\\text{<strong>H</strong>ipotenusa}}$</li><li>C<strong>A</strong>H: $\\cos = \\dfrac{\\text{<strong>A</strong>dyacente}}{\\text{<strong>H</strong>ipotenusa}}$</li><li>TO<strong>A</strong>: $\\tan = \\dfrac{\\text{<strong>O</strong>puesto}}{\\text{<strong>A</strong>dyacente}}$</li></ul>',
        },
        { type: 'heading', text: 'Ángulos especiales' },
        {
          type: 'table',
          headers: ['$\\theta$', '$\\sin\\theta$', '$\\cos\\theta$', '$\\tan\\theta$'],
          rows: [
            ['$0°$', '$0$', '$1$', '$0$'],
            ['$30°$', '$\\dfrac{1}{2}$', '$\\dfrac{\\sqrt{3}}{2}$', '$\\dfrac{\\sqrt{3}}{3}$'],
            ['$45°$', '$\\dfrac{\\sqrt{2}}{2}$', '$\\dfrac{\\sqrt{2}}{2}$', '$1$'],
            ['$60°$', '$\\dfrac{\\sqrt{3}}{2}$', '$\\dfrac{1}{2}$', '$\\sqrt{3}$'],
            ['$90°$', '$1$', '$0$', 'Indefinido'],
          ],
        },
        { type: 'visualization', id: 'unit-circle', params: { angle: 45 } },
        { type: 'heading', text: 'Signos por cuadrante' },
        {
          type: 'text',
          html: 'Mnemónico <strong>ASCT</strong>: <em>All Positive</em> (Q1), <em>Seno positivo</em> (Q2), <em>Tangente positiva</em> (Q3), <em>Coseno positivo</em> (Q4).',
        },
        {
          type: 'table',
          headers: ['Cuadrante', 'sin', 'cos', 'tan'],
          rows: [
            ['I ($0°\\!-\\!90°$)', '+', '+', '+'],
            ['II ($90°\\!-\\!180°$)', '+', '−', '−'],
            ['III ($180°\\!-\\!270°$)', '−', '−', '+'],
            ['IV ($270°\\!-\\!360°$)', '−', '+', '−'],
          ],
        },
      ],
      guidedExercises: [
        {
          id: 'trig-g1', type: 'guided', difficulty: 1,
          statement: 'En un triángulo rectángulo, el cateto opuesto a $\\theta$ mide 6 y la hipotenusa mide 10. Calcula $\\sin\\theta$, $\\cos\\theta$ y $\\tan\\theta$.',
          steps: [
            { instruction: '$\\sin\\theta = \\frac{\\text{opuesto}}{\\text{hipotenusa}} = \\frac{6}{10} = ?$', answer: '0.6', placeholder: 'sin θ =', tolerance: 0.01 },
            { instruction: 'Primero halla el cateto adyacente: $a = \\sqrt{10^2-6^2} = \\sqrt{64} = ?$', answer: '8', placeholder: 'adyacente = ?' },
            { instruction: '$\\cos\\theta = \\frac{8}{10} = ?$', answer: '0.8', placeholder: 'cos θ =', tolerance: 0.01 },
            { instruction: '$\\tan\\theta = \\frac{6}{8} = ?$', answer: '0.75', placeholder: 'tan θ =', tolerance: 0.01 },
          ],
          explanation: '$\\sin\\theta = 0.6$, $\\cos\\theta = 0.8$, $\\tan\\theta = 0.75$.',
        },
        {
          id: 'trig-g2', type: 'guided', difficulty: 2,
          statement: 'Calcula el valor exacto de $\\sin(150°)$ usando la reducción al primer cuadrante.',
          steps: [
            { instruction: '$150°$ está en el cuadrante II. El ángulo de referencia es $180° - 150° = ?°$', answer: '30', placeholder: 'ángulo ref. = ?°' },
            { instruction: 'En el cuadrante II, el seno es positivo. $\\sin(150°) = \\sin(30°) = ?$', answer: '0.5', placeholder: 'sin(150°) = ?', tolerance: 0.01 },
          ],
          explanation: '$\\sin 150° = \\sin(180°-30°) = \\sin 30° = 1/2$.',
        },
      ],
      exercises: [
        {
          id: 'trig-p1', type: 'multiple-choice', difficulty: 1,
          statement: '¿Cuánto es $\\cos(60°)$?',
          options: ['$\\dfrac{\\sqrt{3}}{2}$', '$\\dfrac{1}{2}$', '$\\dfrac{\\sqrt{2}}{2}$', '$1$'],
          answer: 1,
          explanation: '$\\cos 60° = \\frac{1}{2}$.',
        },
        {
          id: 'trig-p2', type: 'numeric', difficulty: 1,
          statement: '¿Cuánto vale $\\tan(45°)$?',
          answer: 1,
          explanation: '$\\tan 45° = \\sin 45°/\\cos 45° = 1$.',
        },
        {
          id: 'trig-p3', type: 'multiple-choice', difficulty: 2,
          statement: '¿En qué cuadrante está un ángulo donde $\\sin\\theta < 0$ y $\\cos\\theta > 0$?',
          options: ['Cuadrante I', 'Cuadrante II', 'Cuadrante III', 'Cuadrante IV'],
          answer: 3,
          explanation: 'Seno negativo y coseno positivo: cuadrante IV.',
        },
        {
          id: 'trig-p4', type: 'numeric', difficulty: 2,
          statement: 'Calcula $\\sin(30°) + \\cos(60°)$.',
          answer: 1,
          explanation: '$\\frac{1}{2} + \\frac{1}{2} = 1$.',
        },
        {
          id: 'trig-p5', type: 'numeric', difficulty: 2,
          statement: 'En un triángulo rectángulo, $\\sin\\theta = \\frac{3}{5}$. ¿Cuánto vale $\\cos\\theta$?',
          answer: 0.8,
          hint: 'Usa la identidad $\\sin^2\\theta + \\cos^2\\theta = 1$.',
          explanation: '$\\cos^2\\theta = 1 - (9/25) = 16/25 \\Rightarrow \\cos\\theta = 4/5 = 0.8$.',
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────────
    // 4.3 IDENTIDADES TRIGONOMÉTRICAS
    // ──────────────────────────────────────────────────────────────────────
    {
      id: 'trig-identities',
      title: 'Identidades Trigonométricas',
      intro: 'Las identidades son igualdades trigonométricas que se cumplen para todo ángulo en su dominio. Son herramientas esenciales para simplificar expresiones.',
      theory: [
        { type: 'heading', text: 'Identidades fundamentales' },
        {
          type: 'table',
          headers: ['Nombre', 'Identidad'],
          rows: [
            ['Pitagórica 1', '$\\sin^2\\theta + \\cos^2\\theta = 1$'],
            ['Pitagórica 2', '$\\tan^2\\theta + 1 = \\sec^2\\theta$'],
            ['Pitagórica 3', '$1 + \\cot^2\\theta = \\csc^2\\theta$'],
            ['Razón', '$\\tan\\theta = \\dfrac{\\sin\\theta}{\\cos\\theta}$'],
          ],
        },
        { type: 'heading', text: 'Identidades de suma de ángulos' },
        {
          type: 'formula',
          tex: '\\sin(\\alpha \\pm \\beta) = \\sin\\alpha\\cos\\beta \\pm \\cos\\alpha\\sin\\beta',
        },
        {
          type: 'formula',
          tex: '\\cos(\\alpha \\pm \\beta) = \\cos\\alpha\\cos\\beta \\mp \\sin\\alpha\\sin\\beta',
        },
        { type: 'heading', text: 'Identidades de ángulo doble' },
        {
          type: 'table',
          headers: ['Identidad', 'Fórmula'],
          rows: [
            ['$\\sin(2\\theta)$', '$2\\sin\\theta\\cos\\theta$'],
            ['$\\cos(2\\theta)$', '$\\cos^2\\theta - \\sin^2\\theta = 2\\cos^2\\theta - 1 = 1 - 2\\sin^2\\theta$'],
          ],
        },
        {
          type: 'example',
          title: 'Ejemplo: Verificar $\\sin(2\\theta) = 2\\sin\\theta\\cos\\theta$ con $\\theta = 30°$',
          problem: '$\\theta = 30°$',
          steps: [
            'Izquierda: $\\sin(60°) = \\dfrac{\\sqrt{3}}{2}$',
            'Derecha: $2 \\times \\dfrac{1}{2} \\times \\dfrac{\\sqrt{3}}{2} = \\dfrac{\\sqrt{3}}{2}$ ✓',
          ],
        },
      ],
      guidedExercises: [
        {
          id: 'id-g1', type: 'guided', difficulty: 2,
          statement: 'Si $\\cos\\theta = \\frac{4}{5}$ y $\\theta$ está en el cuadrante IV, calcula $\\sin\\theta$.',
          steps: [
            { instruction: 'Usa $\\sin^2\\theta + \\cos^2\\theta = 1$: $\\sin^2\\theta = 1 - (4/5)^2 = 1 - 16/25 = ?/25$', answer: '9', placeholder: '? = ?' },
            { instruction: 'En Q4, $\\sin < 0$. $\\sin\\theta = -\\sqrt{9/25} = ?$', answer: '-0.6', placeholder: 'sin θ = ?', tolerance: 0.01 },
          ],
          explanation: '$\\sin\\theta = -3/5 = -0.6$ (negativo en Q4).',
        },
        {
          id: 'id-g2', type: 'guided', difficulty: 3,
          statement: 'Calcula $\\cos(75°) = \\cos(45°+30°)$.',
          steps: [
            { instruction: 'Aplica $\\cos(45°+30°) = \\cos45°\\cos30° - \\sin45°\\sin30°$.', formula: '\\frac{\\sqrt{2}}{2}\\cdot\\frac{\\sqrt{3}}{2} - \\frac{\\sqrt{2}}{2}\\cdot\\frac{1}{2}' },
            { instruction: '$= \\dfrac{\\sqrt{6}}{4} - \\dfrac{\\sqrt{2}}{4} = \\dfrac{\\sqrt{6}-\\sqrt{2}}{4}$. Numéricamente ≈ ?', answer: '0.2588', placeholder: 'cos(75°) ≈ ?', tolerance: 0.01 },
          ],
          explanation: '$\\cos 75° = \\frac{\\sqrt{6}-\\sqrt{2}}{4} \\approx 0.2588$.',
        },
      ],
      exercises: [
        {
          id: 'id-p1', type: 'multiple-choice', difficulty: 1,
          statement: '¿Cuál es la identidad pitagórica fundamental?',
          options: ['$\\sin^2+\\tan^2=1$', '$\\cos^2+\\tan^2=1$', '$\\sin^2+\\cos^2=1$', '$\\sin^2-\\cos^2=1$'],
          answer: 2,
          explanation: '$\\sin^2\\theta + \\cos^2\\theta = 1$ para todo $\\theta$.',
        },
        {
          id: 'id-p2', type: 'numeric', difficulty: 2,
          statement: 'Si $\\sin\\theta = 0.6$, ¿cuánto vale $\\cos^2\\theta$?',
          answer: 0.64,
          hint: '$\\cos^2\\theta = 1 - \\sin^2\\theta$.',
          explanation: '$1 - 0.36 = 0.64$.',
        },
        {
          id: 'id-p3', type: 'numeric', difficulty: 2,
          statement: 'Calcula $\\sin(90°) \\cdot \\cos(0°)$ usando valores exactos.',
          answer: 1,
          explanation: '$1 \\times 1 = 1$.',
        },
        {
          id: 'id-p4', type: 'multiple-choice', difficulty: 3,
          statement: '¿Cuál es la identidad correcta para $\\sin(2\\theta)$?',
          options: ['$\\sin^2\\theta + \\cos^2\\theta$', '$2\\sin^2\\theta$', '$2\\sin\\theta\\cos\\theta$', '$\\sin\\theta + \\cos\\theta$'],
          answer: 2,
          explanation: 'Fórmula del ángulo doble: $\\sin(2\\theta) = 2\\sin\\theta\\cos\\theta$.',
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────────
    // 4.4 TRIÁNGULOS RECTÁNGULOS
    // ──────────────────────────────────────────────────────────────────────
    {
      id: 'right-triangles',
      title: 'Resolución de Triángulos Rectángulos',
      intro: 'Resolver un triángulo rectángulo significa hallar todos sus lados y ángulos conociendo algunos de ellos.',
      theory: [
        { type: 'heading', text: 'Estrategia de resolución' },
        {
          type: 'text',
          html: 'Con el ángulo $\\theta$ y un lado conocido, se pueden encontrar los demás usando las razones trigonométricas. Siempre verifica con el Teorema de Pitágoras.',
        },
        {
          type: 'example',
          title: 'Ejemplo: Ángulo de 35° e hipotenusa 12',
          problem: 'Triángulo con $\\theta = 35°$ e hipotenusa $c = 12$. Halla los catetos.',
          steps: [
            'Cateto adyacente: $a = c\\cos\\theta = 12\\cos(35°) \\approx 12 \\times 0.8192 \\approx 9.83$',
            'Cateto opuesto: $b = c\\sin\\theta = 12\\sin(35°) \\approx 12 \\times 0.5736 \\approx 6.88$',
            'Verificación: $9.83^2 + 6.88^2 \\approx 96.6 + 47.3 = 143.9 \\approx 12^2 = 144$ ✓',
          ],
        },
        { type: 'visualization', id: 'right-triangle', params: { angle: 35, hyp: 5 } },
        { type: 'heading', text: 'Ángulos de elevación y depresión' },
        {
          type: 'definition',
          term: 'Ángulo de elevación',
          text: 'Es el ángulo que forma la línea visual con la horizontal cuando se mira hacia arriba.',
        },
      ],
      guidedExercises: [
        {
          id: 'rt-g1', type: 'guided', difficulty: 2,
          statement: 'Un triángulo rectángulo tiene $\\theta = 30°$ y cateto adyacente $a = 8$. Halla la hipotenusa $c$.',
          steps: [
            { instruction: '$\\cos 30° = \\frac{a}{c} = \\frac{8}{c}$. Despeja $c = \\frac{8}{\\cos 30°} = \\frac{8}{\\sqrt{3}/2}$.', formula: 'c = \\frac{16}{\\sqrt{3}} = \\frac{16\\sqrt{3}}{3}' },
            { instruction: '¿Cuánto es $c$ aproximadamente? (usa $\\sqrt{3} \\approx 1.732$)', answer: '9.238', placeholder: 'c ≈ ?', tolerance: 0.1 },
          ],
          explanation: '$c = \\frac{16}{\\sqrt{3}} \\approx 9.24$.',
        },
        {
          id: 'rt-g2', type: 'guided', difficulty: 3,
          statement: 'Desde un punto a nivel del suelo, el ángulo de elevación a la cima de una torre es $60°$. La distancia horizontal a la base de la torre es $50$ m. ¿Cuánto mide la torre?',
          steps: [
            { instruction: 'Plantea: $\\tan 60° = \\frac{h}{50}$.', formula: 'h = 50 \\tan(60°) = 50\\sqrt{3}' },
            { instruction: '¿Cuánto es $h \\approx ?$ m (usa $\\sqrt{3} \\approx 1.732$)?', answer: '86.6', placeholder: 'h ≈ ? m', tolerance: 0.5 },
          ],
          explanation: '$h = 50\\tan 60° = 50\\sqrt{3} \\approx 86.6$ m.',
        },
      ],
      exercises: [
        {
          id: 'rt-p1', type: 'numeric', difficulty: 2,
          statement: 'En un triángulo rectángulo, el cateto opuesto a $\\theta$ mide 5 y la hipotenusa 13. ¿Cuánto mide el cateto adyacente?',
          answer: 12,
          hint: '$a = \\sqrt{13^2 - 5^2}$',
          explanation: '$a = \\sqrt{169-25} = \\sqrt{144} = 12$.',
        },
        {
          id: 'rt-p2', type: 'multiple-choice', difficulty: 3,
          statement: 'Desde un barco, el ángulo de elevación de un faro de $40$ m de altura es $\\theta$. La distancia horizontal es $30$ m. ¿Cuánto es $\\tan\\theta$?',
          options: ['$\\frac{3}{4}$', '$\\frac{4}{3}$', '$\\frac{3}{5}$', '$\\frac{4}{5}$'],
          answer: 1,
          explanation: '$\\tan\\theta = \\frac{40}{30} = \\frac{4}{3}$.',
        },
        {
          id: 'rt-p3', type: 'numeric', difficulty: 2,
          statement: 'Un triángulo rectángulo tiene $\\sin\\theta = 0.5$ y cateto opuesto $= 4$. ¿Cuánto mide la hipotenusa?',
          answer: 8,
          explanation: '$\\sin\\theta = \\frac{\\text{op}}{\\text{hip}} = \\frac{4}{c} = 0.5 \\Rightarrow c = 8$.',
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────────
    // 4.5 TRIÁNGULOS OBLICUÁNGULOS
    // ──────────────────────────────────────────────────────────────────────
    {
      id: 'oblique-triangles',
      title: 'Triángulos Oblicuángulos',
      intro: 'Los triángulos que no tienen ángulo recto se resuelven mediante el teorema del seno y el del coseno.',
      theory: [
        { type: 'heading', text: 'Teorema del Seno' },
        {
          type: 'definition',
          term: 'Ley del Seno',
          text: '$$\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C} = 2R$$donde $a, b, c$ son lados y $A, B, C$ son los ángulos opuestos. $R$ es el radio de la circunferencia circunscrita.',
        },
        {
          type: 'note',
          html: 'Se aplica cuando se conoce un lado y el ángulo opuesto más otro elemento (AAS o ASA).',
        },
        { type: 'heading', text: 'Teorema del Coseno' },
        {
          type: 'definition',
          term: 'Ley del Coseno',
          text: '$$c^2 = a^2 + b^2 - 2ab\\cos C$$ También: $\\cos C = \\dfrac{a^2+b^2-c^2}{2ab}$',
        },
        {
          type: 'note',
          html: 'Se aplica cuando se conocen dos lados y el ángulo entre ellos (LAL), o los tres lados (LLL). Generaliza el Teorema de Pitágoras (cuando $C=90°$, $\\cos C = 0$).',
        },
        {
          type: 'example',
          title: 'Ejemplo: Ley del coseno',
          problem: 'En un triángulo, $a=7$, $b=5$, $C=60°$. Halla $c$.',
          steps: [
            '$c^2 = 49 + 25 - 2(7)(5)\\cos(60°)$',
            '$= 74 - 70 \\times 0.5 = 74 - 35 = 39$',
            '$c = \\sqrt{39} \\approx 6.24$',
          ],
          result: '$c \\approx 6.24$',
        },
      ],
      guidedExercises: [
        {
          id: 'obli-g1', type: 'guided', difficulty: 3,
          statement: 'En un triángulo, $a=8$, $b=6$ y $C=45°$. Calcula $c^2$ usando la ley del coseno.',
          steps: [
            { instruction: 'Aplica $c^2 = a^2 + b^2 - 2ab\\cos C$.', formula: 'c^2 = 64 + 36 - 2(8)(6)\\cos(45°)' },
            { instruction: '$\\cos(45°) = \\frac{\\sqrt{2}}{2} \\approx 0.7071$. Calcula $2(8)(6)(0.7071)$.', answer: '67.88', placeholder: '2ab·cosC ≈ ?', tolerance: 0.5 },
            { instruction: '$c^2 = 100 - 67.88 \\approx ?$', answer: '32.12', placeholder: 'c² ≈ ?', tolerance: 0.5 },
          ],
          explanation: '$c^2 = 64+36-96\\cdot\\frac{\\sqrt{2}}{2} \\approx 100 - 67.88 \\approx 32.12$. $c \\approx 5.67$.',
        },
      ],
      exercises: [
        {
          id: 'obli-p1', type: 'multiple-choice', difficulty: 2,
          statement: 'En un triángulo con $a=10$, $A=30°$, $B=45°$, ¿cuánto vale $b$ por la ley del seno?',
          options: ['$10\\sqrt{2}$', '$5\\sqrt{2}$', '$\\frac{10\\sqrt{2}}{2}$', '$10\\sqrt{3}$'],
          answer: 0,
          explanation: '$\\frac{b}{\\sin B} = \\frac{a}{\\sin A} \\Rightarrow b = \\frac{10 \\sin 45°}{\\sin 30°} = \\frac{10 \\cdot \\frac{\\sqrt{2}}{2}}{\\frac{1}{2}} = 10\\sqrt{2}$.',
        },
        {
          id: 'obli-p2', type: 'numeric', difficulty: 3,
          statement: 'En un triángulo con $a=5$, $b=7$, $c=8$, calcula $\\cos C$ usando la ley del coseno.',
          answer: 0.4,
          hint: '$\\cos C = \\frac{a^2+b^2-c^2}{2ab}$.',
          explanation: '$\\cos C = \\frac{25+49-64}{70} = \\frac{10}{70} = \\frac{1}{7} \\approx 0.1429$.',
          tolerance: 0.02,
        },
        {
          id: 'obli-p3', type: 'numeric', difficulty: 2,
          statement: 'Usando la ley del coseno con $a=3$, $b=4$ y $C=90°$, ¿cuánto es $c^2$?',
          answer: 25,
          explanation: '$c^2 = 9+16-24\\cos(90°) = 25 - 0 = 25$. (Teorema de Pitágoras como caso especial)',
        },
      ],
    },
  ],
};
