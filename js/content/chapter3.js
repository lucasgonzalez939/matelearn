/** Chapter 3 – Rectas, Cónicas y Sistemas de Ecuaciones */

export default {
  id: 'ch3',
  number: 3,
  title: 'Rectas, Cónicas y Sistemas',
  shortTitle: 'Geometría Analítica',
  description: 'Plano cartesiano, ecuaciones de rectas, sistemas de ecuaciones lineales y secciones cónicas.',
  sections: [

    // ──────────────────────────────────────────────────────────────────────
    // 3.1 PLANO COORDENADO Y RECTAS
    // ──────────────────────────────────────────────────────────────────────
    {
      id: 'lines',
      title: 'Rectas en el Plano',
      intro: 'El plano cartesiano $\\mathbb{R}^2$ permite representar puntos como pares $(x,y)$ y relaciones geométricas como ecuaciones.',
      theory: [
        { type: 'heading', text: 'Plano cartesiano' },
        {
          type: 'text',
          html: 'Dos rectas numéricas perpendiculares (ejes $x$ e $y$) se cortan en el <strong>origen</strong> $(0,0)$ y dividen el plano en 4 cuadrantes.',
        },
        {
          type: 'definition',
          term: 'Distancia entre dos puntos',
          text: '$d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$',
        },
        {
          type: 'definition',
          term: 'Punto medio',
          text: '$M = \\left(\\dfrac{x_1+x_2}{2},\\; \\dfrac{y_1+y_2}{2}\\right)$',
        },
        { type: 'heading', text: 'Ecuaciones de la recta' },
        {
          type: 'table',
          headers: ['Forma', 'Ecuación', 'Descripción'],
          rows: [
            ['Pendiente-Intercepto', '$y = mx + b$', '$m$ = pendiente, $b$ = intercepto en $y$'],
            ['Punto-Pendiente', '$y - y_1 = m(x - x_1)$', 'Pasa por $(x_1, y_1)$ con pendiente $m$'],
            ['General', '$Ax + By + C = 0$', 'Forma estándar'],
            ['Dos puntos', '$m = \\dfrac{y_2 - y_1}{x_2 - x_1}$', 'Pendiente entre dos puntos'],
          ],
        },
        {
          type: 'definition',
          term: 'Rectas paralelas y perpendiculares',
          text: 'Dos rectas con pendientes $m_1$ y $m_2$ son: **Paralelas** si $m_1 = m_2$; **Perpendiculares** si $m_1 \\cdot m_2 = -1$.',
        },
        {
          type: 'example',
          title: 'Ejemplo: Ecuación de la recta por $(2,3)$ y $(5,9)$',
          problem: 'Halla la ecuación de la recta que pasa por $(2,3)$ y $(5,9)$.',
          steps: [
            '$m = \\dfrac{9-3}{5-2} = \\dfrac{6}{3} = 2$',
            '$y - 3 = 2(x - 2) \\Rightarrow y = 2x - 1$',
          ],
          result: '$y = 2x - 1$',
        },
        {
          type: 'visualization',
          id: 'coordinate-plane',
          params: {
            title: 'Recta y = 2x − 1',
            description: 'Recta con pendiente m = 2 e intercepto b = −1',
            items: [
              { type: 'line', m: 2, b: -1, color: '#2563eb' },
              { type: 'point', x: 2, y: 3, label: '(2,3)', color: '#dc2626' },
              { type: 'point', x: 5, y: 9, label: '(5,9)', color: '#dc2626' },
            ],
          },
        },
      ],
      guidedExercises: [
        {
          id: 'line-g1', type: 'guided', difficulty: 2,
          statement: 'Halla la pendiente de la recta que pasa por $A(-1, 4)$ y $B(3, -2)$.',
          steps: [
            { instruction: 'Aplica la fórmula $m = \\frac{y_2-y_1}{x_2-x_1}$.', formula: 'm = \\frac{-2-4}{3-(-1)} = \\frac{-6}{4}' },
            { instruction: '¿Cuánto es la pendiente $m$ como fracción decimal?', answer: '-1.5', placeholder: 'm = ?', tolerance: 0.05 },
          ],
          explanation: '$m = \\dfrac{-6}{4} = -\\dfrac{3}{2} = -1.5$.',
        },
        {
          id: 'line-g2', type: 'guided', difficulty: 2,
          statement: 'Una recta tiene pendiente $m = 3$ y pasa por el punto $(1, 2)$. Halla su intercepto $b$ en la ecuación $y = mx + b$.',
          steps: [
            { instruction: 'Sustituye en $y = 3x + b$ el punto $(1,2)$: $2 = 3(1) + b$.', answer: '-1', placeholder: 'b = ?' },
          ],
          explanation: '$b = 2 - 3 = -1$. Ecuación: $y = 3x - 1$.',
        },
      ],
      exercises: [
        { id: 'line-p1', type: 'numeric', difficulty: 1, statement: '¿Cuál es la pendiente de la recta $y = -4x + 7$?', answer: -4, explanation: 'En $y=mx+b$, $m = -4$.' },
        { id: 'line-p2', type: 'numeric', difficulty: 2, statement: 'Halla la distancia entre $(0,0)$ y $(3,4)$.', answer: 5, hint: '$d=\\sqrt{3^2+4^2}$', explanation: '$d=\\sqrt{9+16}=\\sqrt{25}=5$.' },
        {
          id: 'line-p3', type: 'multiple-choice', difficulty: 2,
          statement: 'Dos rectas tienen pendientes $m_1 = 2$ y $m_2 = -\\tfrac{1}{2}$. ¿Qué relación tienen?',
          options: ['Son paralelas', 'Son perpendiculares', 'Se cortan pero no son perpendiculares', 'Son la misma recta'],
          answer: 1,
          explanation: '$m_1 \\times m_2 = 2 \\times (-\\frac{1}{2}) = -1$. Son perpendiculares.',
        },
        {
          id: 'line-p4', type: 'numeric', difficulty: 3,
          statement: 'Halla el intercepto en $y$ de la recta que pasa por $(-2, 5)$ con pendiente $m = 3$.',
          answer: 11,
          hint: 'Usa $y - 5 = 3(x-(-2))$.',
          explanation: '$y = 3x + 6 + 5 = 3x + 11$. Intercepto $b = 11$.',
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────────
    // 3.2 SISTEMAS DE ECUACIONES
    // ──────────────────────────────────────────────────────────────────────
    {
      id: 'equation-systems',
      title: 'Sistemas de Ecuaciones',
      intro: 'Un sistema de ecuaciones lineales es un conjunto de ecuaciones que deben satisfacerse simultáneamente. Pueden tener una solución, infinitas o ninguna.',
      theory: [
        { type: 'heading', text: 'Métodos de resolución (2×2)' },
        {
          type: 'table',
          headers: ['Método', 'Descripción'],
          rows: [
            ['Sustitución', 'Despejar una variable en una ecuación y sustituir en la otra'],
            ['Igualación', 'Despejar la misma variable en ambas ecuaciones e igualarlas'],
            ['Eliminación (Gauss)', 'Combinar linealmente las ecuaciones para eliminar una variable'],
          ],
        },
        {
          type: 'example',
          title: 'Ejemplo: Sistema $2x + y = 7$, $x - y = 2$',
          problem: 'Resuelve: $\\begin{cases}2x + y = 7 \\\\ x - y = 2\\end{cases}$',
          steps: [
            'Suma las ecuaciones: $3x = 9 \\Rightarrow x = 3$',
            'Sustituye: $3 - y = 2 \\Rightarrow y = 1$',
          ],
          result: 'Solución: $(x, y) = (3, 1)$',
        },
        { type: 'heading', text: 'Clasificación de sistemas' },
        {
          type: 'table',
          headers: ['Tipo', 'Soluciones', 'Gráficamente'],
          rows: [
            ['Compatible determinado', '1 solución', 'Las rectas se cortan en un punto'],
            ['Compatible indeterminado', 'Infinitas', 'Las rectas son coincidentes'],
            ['Incompatible', 'Ninguna', 'Las rectas son paralelas'],
          ],
        },
        { type: 'heading', text: 'Sistemas 3×3' },
        {
          type: 'text',
          html: 'Para resolver sistemas de 3 ecuaciones con 3 incógnitas, se usa <strong>eliminación gaussiana</strong>: reducir el sistema a forma triangular y resolver por sustitución hacia atrás.',
        },
      ],
      guidedExercises: [
        {
          id: 'sys-g1', type: 'guided', difficulty: 2,
          statement: 'Resuelve el sistema: $\\begin{cases}3x + 2y = 12 \\\\ x - y = 1\\end{cases}$',
          steps: [
            { instruction: 'De la segunda ecuación, despeja $x = 1 + y$.', formula: 'x = 1 + y' },
            { instruction: 'Sustituye en la primera: $3(1+y) + 2y = 12 \\Rightarrow 5y = 9$.', answer: '1.8', placeholder: 'y = ?', tolerance: 0.05 },
            { instruction: 'Ahora $x = 1 + y = 1 + 1.8 = ?$', answer: '2.8', placeholder: 'x = ?', tolerance: 0.05 },
          ],
          explanation: '$y = 9/5 = 1.8$, $x = 2.8$.',
        },
      ],
      exercises: [
        { id: 'sys-p1', type: 'numeric', difficulty: 2, statement: 'Resuelve $\\begin{cases}x + y = 10 \\\\ x - y = 4\\end{cases}$. ¿Cuánto vale $x$?', answer: 7, explanation: 'Suma: $2x=14 \\Rightarrow x=7$.' },
        { id: 'sys-p2', type: 'numeric', difficulty: 2, statement: 'En el sistema $\\begin{cases}2x + y = 7 \\\\ x - y = 2\\end{cases}$, ¿cuánto vale $y$?', answer: 1, explanation: '$x=3$, luego $y = 7-6 = 1$.' },
        {
          id: 'sys-p3', type: 'multiple-choice', difficulty: 3,
          statement: '¿Qué tipo de sistema es $\\begin{cases}2x + 4y = 6 \\\\ x + 2y = 3\\end{cases}$?',
          options: ['Compatible determinado', 'Compatible indeterminado', 'Incompatible', 'No lineal'],
          answer: 1,
          explanation: 'La segunda ecuación multiplicada por 2 da la primera. Son la misma recta: infinitas soluciones.',
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────────
    // 3.3 CIRCUNFERENCIA
    // ──────────────────────────────────────────────────────────────────────
    {
      id: 'circle',
      title: 'Circunferencia',
      intro: 'La circunferencia es el lugar geométrico de todos los puntos del plano equidistantes de un punto fijo llamado <strong>centro</strong>.',
      theory: [
        { type: 'heading', text: 'Ecuaciones de la circunferencia' },
        {
          type: 'definition',
          term: 'Forma canónica (estándar)',
          text: '$(x-h)^2 + (y-k)^2 = r^2$ donde $(h,k)$ es el centro y $r$ el radio.',
        },
        {
          type: 'definition',
          term: 'Forma general',
          text: '$x^2 + y^2 + Dx + Ey + F = 0$. Para encontrar centro y radio se completa el cuadrado.',
        },
        {
          type: 'example',
          title: 'Ejemplo: Completar el cuadrado',
          problem: 'Encuentra el centro y radio de $x^2+y^2-4x+6y-3=0$.',
          steps: [
            '$(x^2-4x) + (y^2+6y) = 3$',
            '$(x^2-4x+4-4) + (y^2+6y+9-9) = 3$',
            '$(x-2)^2 - 4 + (y+3)^2 - 9 = 3$',
            '$(x-2)^2 + (y+3)^2 = 16$',
          ],
          result: 'Centro $(2,-3)$, radio $r=4$',
        },
        { type: 'visualization', id: 'conic-section', params: { conicType: 'circle', r: 3 } },
      ],
      guidedExercises: [
        {
          id: 'circ-g1', type: 'guided', difficulty: 2,
          statement: 'Determina el radio de la circunferencia $(x+1)^2 + (y-2)^2 = 25$.',
          steps: [
            { instruction: 'La ecuación ya está en forma canónica $(x-h)^2+(y-k)^2=r^2$. Identifica $r^2 = 25$.', answer: '5', placeholder: 'r = ?' },
          ],
          explanation: '$r^2 = 25 \\Rightarrow r = 5$. Centro: $(-1, 2)$.',
        },
      ],
      exercises: [
        {
          id: 'circ-p1', type: 'numeric', difficulty: 1,
          statement: 'Una circunferencia tiene centro $(0,0)$ y radio $r=7$. ¿Cuánto es $r^2$ en su ecuación?',
          answer: 49,
          explanation: '$r^2 = 49$. Ecuación: $x^2+y^2=49$.',
        },
        {
          id: 'circ-p2', type: 'multiple-choice', difficulty: 2,
          statement: '¿Cuál es el centro de la circunferencia $(x+3)^2 + (y-5)^2 = 16$?',
          options: ['$(3, -5)$', '$(-3, 5)$', '$(3, 5)$', '$(-3, -5)$'],
          answer: 1,
          explanation: 'En $(x-h)^2+(y-k)^2=r^2$: $h=-3$, $k=5$. Centro $(-3,5)$.',
        },
        {
          id: 'circ-p3', type: 'numeric', difficulty: 3,
          statement: 'Halla el radio de $x^2+y^2-6x-8y = 0$.',
          answer: 5,
          hint: 'Completa el cuadrado: $(x-3)^2+(y-4)^2 = ?$.',
          explanation: '$(x-3)^2 - 9 + (y-4)^2 - 16 = 0 \\Rightarrow r^2 = 25 \\Rightarrow r = 5$.',
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────────
    // 3.4 ELIPSE
    // ──────────────────────────────────────────────────────────────────────
    {
      id: 'ellipse',
      title: 'Elipse',
      intro: 'La elipse es el conjunto de puntos cuya suma de distancias a dos puntos fijos (focos) es constante.',
      theory: [
        { type: 'heading', text: 'Ecuación estándar' },
        {
          type: 'definition',
          term: 'Elipse centrada en el origen',
          text: '$$\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$$ Si $a > b$: eje mayor horizontal. Si $b > a$: eje mayor vertical.',
        },
        {
          type: 'table',
          headers: ['Elemento', 'Eje mayor horizontal ($a>b$)', 'Eje mayor vertical ($b>a$)'],
          rows: [
            ['Vértices principales', '$(\\pm a, 0)$', '$(0, \\pm b)$'],
            ['Vértices secundarios', '$(0, \\pm b)$', '$(\\pm a, 0)$'],
            ['Focos', '$(\\pm c, 0)$', '$(0, \\pm c)$'],
            ['Relación focal', '$c^2 = a^2 - b^2$', '$c^2 = b^2 - a^2$'],
            ['Excentricidad', '$e = c/a < 1$', '$e = c/b < 1$'],
          ],
        },
        { type: 'visualization', id: 'conic-section', params: { conicType: 'ellipse', a: 4, b: 2 } },
        {
          type: 'example',
          title: 'Ejemplo: Analizar $\\frac{x^2}{25} + \\frac{y^2}{9} = 1$',
          problem: '$\\dfrac{x^2}{25} + \\dfrac{y^2}{9} = 1$',
          steps: [
            '$a^2 = 25 \\Rightarrow a = 5$ (eje mayor en $x$, pues $25 > 9$)',
            '$b^2 = 9 \\Rightarrow b = 3$',
            '$c^2 = 25 - 9 = 16 \\Rightarrow c = 4$',
            'Vértices: $(\\pm 5, 0)$; focos: $(\\pm 4, 0)$; excentricidad: $e = 4/5 = 0.8$',
          ],
        },
      ],
      guidedExercises: [
        {
          id: 'ellipse-g1', type: 'guided', difficulty: 3,
          statement: 'Para la elipse $\\dfrac{x^2}{16} + \\dfrac{y^2}{7} = 1$, calcula la distancia focal $c$.',
          steps: [
            { instruction: 'Identifica $a^2=16$, $b^2=7$. Calcula $c^2 = a^2-b^2$.', answer: '9', placeholder: 'c² = ?' },
            { instruction: '¿Cuánto es $c = \\sqrt{9}$?', answer: '3', placeholder: 'c = ?' },
          ],
          explanation: '$c = \\sqrt{16-7} = \\sqrt{9} = 3$.',
        },
      ],
      exercises: [
        { id: 'ellipse-p1', type: 'numeric', difficulty: 2, statement: 'Para $\\frac{x^2}{36}+\\frac{y^2}{20}=1$, ¿cuánto vale $a$ (semiejemayor)?', answer: 6, explanation: '$a^2=36 \\Rightarrow a=6$.' },
        {
          id: 'ellipse-p2', type: 'multiple-choice', difficulty: 2,
          statement: 'En una elipse, si $a = 5$ y $c = 3$, ¿cuánto vale $b$?',
          options: ['$b=4$', '$b=2$', '$b=\\sqrt{34}$', '$b=8$'],
          answer: 0,
          explanation: '$b^2 = a^2-c^2 = 25-9 = 16 \\Rightarrow b=4$.',
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────────
    // 3.5 HIPÉRBOLA
    // ──────────────────────────────────────────────────────────────────────
    {
      id: 'hyperbola',
      title: 'Hipérbola',
      intro: 'La hipérbola es el conjunto de puntos cuya diferencia de distancias a dos focos es constante (en valor absoluto).',
      theory: [
        {
          type: 'definition',
          term: 'Hipérbola horizontal',
          text: '$$\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$$ Focos en $( \\pm c, 0)$ con $c^2 = a^2 + b^2$.',
        },
        {
          type: 'definition',
          term: 'Hipérbola vertical',
          text: '$$\\frac{y^2}{a^2} - \\frac{x^2}{b^2} = 1$$ Focos en $(0, \\pm c)$.',
        },
        { type: 'definition', term: 'Asíntotas', text: 'Las asíntotas de la hipérbola $\\dfrac{x^2}{a^2}-\\dfrac{y^2}{b^2}=1$ son $y = \\pm\\dfrac{b}{a}x$.' },
        { type: 'visualization', id: 'conic-section', params: { conicType: 'hyperbola', a: 3, b: 2 } },
      ],
      guidedExercises: [
        {
          id: 'hyp-g1', type: 'guided', difficulty: 3,
          statement: 'Para $\\dfrac{x^2}{9} - \\dfrac{y^2}{16} = 1$, halla $c$.',
          steps: [
            { instruction: '$c^2 = a^2 + b^2 = 9 + 16 = ?$', answer: '25', placeholder: 'c² = ?' },
            { instruction: '$c = ?$', answer: '5', placeholder: 'c = ?' },
          ],
          explanation: '$c = \\sqrt{25} = 5$. Focos en $(\\pm 5, 0)$.',
        },
      ],
      exercises: [
        {
          id: 'hyp-p1', type: 'multiple-choice', difficulty: 2,
          statement: '¿Cuáles son las asíntotas de $\\dfrac{x^2}{4} - \\dfrac{y^2}{9} = 1$?',
          options: ['$y = \\pm\\frac{2}{3}x$', '$y = \\pm\\frac{3}{2}x$', '$y = \\pm 2x$', '$y = \\pm 6x$'],
          answer: 1,
          explanation: '$a=2$, $b=3$. Asíntotas: $y = \\pm \\frac{b}{a}x = \\pm \\frac{3}{2}x$.',
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────────
    // 3.6 PARÁBOLA
    // ──────────────────────────────────────────────────────────────────────
    {
      id: 'parabola',
      title: 'Parábola',
      intro: 'La parábola es el conjunto de puntos equidistantes de un punto (foco) y una recta (directriz).',
      theory: [
        {
          type: 'table',
          headers: ['Tipo', 'Ecuación', 'Foco', 'Directriz'],
          rows: [
            ['Vertical ↑', '$x^2 = 4py$', '$(0, p)$', '$y = -p$'],
            ['Vertical ↓', '$x^2 = -4py$', '$(0, -p)$', '$y = p$'],
            ['Horizontal →', '$y^2 = 4px$', '$(p, 0)$', '$x = -p$'],
            ['Horizontal ←', '$y^2 = -4px$', '$(-p, 0)$', '$x = p$'],
          ],
        },
        {
          type: 'example',
          title: 'Ejemplo: $x^2 = 8y$',
          problem: '$x^2 = 8y$',
          steps: [
            '$4p = 8 \\Rightarrow p = 2$',
            'Foco: $(0, 2)$', 'Directriz: $y = -2$', 'Vértice: $(0,0)$',
          ],
        },
        { type: 'visualization', id: 'conic-section', params: { conicType: 'parabola', p: 2 } },
      ],
      guidedExercises: [
        {
          id: 'par-g1', type: 'guided', difficulty: 2,
          statement: 'Para la parábola $y^2 = 12x$, halla el foco.',
          steps: [
            { instruction: '$4p = 12 \\Rightarrow p = ?$', answer: '3', placeholder: 'p = ?' },
            { instruction: 'Foco en $(p, 0) = (?, 0)$.', answer: '3', placeholder: 'foco x = ?' },
          ],
          explanation: '$p = 3$. Foco: $(3, 0)$. Directriz: $x = -3$.',
        },
      ],
      exercises: [
        {
          id: 'par-p1', type: 'multiple-choice', difficulty: 2,
          statement: 'Para $x^2 = -20y$, ¿dónde está el foco?',
          options: ['$(0, 5)$', '$(0, -5)$', '$(5, 0)$', '$(-5, 0)$'],
          answer: 1,
          explanation: '$4p = 20 \\Rightarrow p=5$. Como es $-20y$, la parábola abre hacia abajo: foco $(0, -5)$.',
        },
        {
          id: 'par-p2', type: 'numeric', difficulty: 2,
          statement: 'La parábola $x^2 = 4py$ tiene foco en $(0, 3)$. ¿Cuánto vale $p$?',
          answer: 3,
          explanation: 'Foco en $(0, p) = (0, 3)$, entonces $p = 3$.',
        },
      ],
    },
  ],
};
