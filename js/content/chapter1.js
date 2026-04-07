/** Chapter 1 – Conjuntos Numéricos y Elementos de Geometría */

export default {
  id: 'ch1',
  number: 1,
  title: 'Conjuntos Numéricos y Geometría',
  shortTitle: 'Números y Geometría',
  description: 'Geometría elemental, conjuntos, y los sistemas numéricos: naturales, enteros, racionales y reales.',
  sections: [

    // ──────────────────────────────────────────────────────────────────────
    // 1.1 ELEMENTOS DE GEOMETRÍA
    // ──────────────────────────────────────────────────────────────────────
    {
      id: 'geometry',
      title: 'Elementos de Geometría',
      intro: 'La geometría estudia las propiedades de las figuras en el espacio. Aquí repasamos las fórmulas esenciales de áreas, perímetros y volúmenes que se usan en ingeniería.',
      theory: [
        { type: 'heading', text: 'Figuras planas' },
        {
          type: 'text',
          html: 'Las <strong>figuras planas</strong> son aquellas que se pueden trazar en un plano. Sus propiedades fundamentales son el <em>área</em> (superficie interior) y el <em>perímetro</em> (longitud del contorno).',
        },
        {
          type: 'table',
          headers: ['Figura', 'Área', 'Perímetro'],
          rows: [
            ['Cuadrado (lado $a$)', '$a^2$', '$4a$'],
            ['Rectángulo ($b \\times h$)', '$b \\cdot h$', '$2(b+h)$'],
            ['Triángulo (base $b$, altura $h$)', '$\\dfrac{b \\cdot h}{2}$', '$a+b+c$'],
            ['Trapecio (bases $B$, $b$; altura $h$)', '$\\dfrac{(B+b) \\cdot h}{2}$', '$B+b+c_1+c_2$'],
            ['Círculo (radio $r$)', '$\\pi r^2$', '$2\\pi r$'],
          ],
        },
        {
          type: 'visualization',
          id: 'geometry-shapes',
          params: { shape: 'rectangle' },
        },
        { type: 'heading', text: 'Descripción detallada de las figuras' },
        {
          type: 'text',
          html: `Identifica cada figura por su forma antes de memorizar sus fórmulas:
<ul style="margin:.5rem 0 .5rem 1.5rem;line-height:2.1">
  <li><strong>Triángulo (△)</strong> — 3 lados, 3 ángulos. Suma de ángulos interiores = <strong>180°</strong>. Tipos: <em>equilátero</em> (3 lados iguales), <em>isósceles</em> (2 iguales), <em>escaleno</em> (todos distintos). El rectángulo tiene un ángulo de 90° y aplica Pitágoras.</li>
  <li><strong>Cuadrado (□)</strong> — 4 lados <em>iguales</em> y 4 ángulos de 90°. Es el rectángulo con todos los lados iguales. Su diagonal mide $a\\sqrt{2}$.</li>
  <li><strong>Rectángulo (▭)</strong> — 4 ángulos de 90°, lados <em>opuestos</em> iguales. Si ambos lados son iguales es un cuadrado.</li>
  <li><strong>Rombo (◇)</strong> — 4 lados iguales, ángulos no necesariamente rectos. Sus diagonales $d_1$ y $d_2$ son perpendiculares entre sí y se bisecan. Área $= d_1{\\cdot}d_2/2$.</li>
  <li><strong>Trapecio</strong> — Cuadrilátero con exactamente un par de lados paralelos, llamados bases mayor $B$ y menor $b$. La altura $h$ es la distancia entre las bases.</li>
  <li><strong>Círculo (○)</strong> — Todos sus puntos equidistan del centro. Definido por el radio $r$. No tiene lados rectos.</li>
</ul>`,
        },
        {
          type: 'note',
          html: 'Suma de ángulos interiores de un polígono de $n$ lados: $(n-2) \\times 180°$.&emsp;Triángulo: $180°$,&emsp;Cuadrilátero: $360°$,&emsp;Pentágono: $540°$,&emsp;Hexágono: $720°$.',
        },
        {
          type: 'visualization',
          id: 'geometry-gallery',
          params: { defaultShape: 'triangle' },
        },
        {
          type: 'heading',
          text: 'Teorema de Pitágoras',
        },
        {
          type: 'definition',
          term: 'Teorema de Pitágoras',
          text: 'En todo triángulo rectángulo, el cuadrado de la hipotenusa es igual a la suma de los cuadrados de los catetos: $$a^2 + b^2 = c^2$$',
        },
        {
          type: 'example',
          title: 'Ejemplo: Hipotenusa de un triángulo 3-4-?',
          problem: 'Un triángulo rectángulo tiene catetos $a=3$ cm y $b=4$ cm. ¿Cuánto mide la hipotenusa?',
          steps: [
            'Aplicamos el Teorema de Pitágoras: $c^2 = a^2 + b^2$',
            'Sustituimos: $c^2 = 3^2 + 4^2 = 9 + 16 = 25$',
            'Tomamos raíz cuadrada: $c = \\sqrt{25} = 5$ cm',
          ],
          result: '**Resultado:** $c = 5$ cm',
        },
        {
          type: 'visualization',
          id: 'right-triangle',
          params: { angle: 53, hyp: 5 },
        },
        {
          type: 'note',
          html: 'Las <strong>ternas pitagóricas</strong> más usadas son: $(3, 4, 5)$, $(5, 12, 13)$, $(8, 15, 17)$, $(7, 24, 25)$. Multiplicar cualquier terna por una constante da otra terna: $(6, 8, 10) = 2 \\times (3,4,5)$.',
        },
        {
          type: 'heading',
          text: 'Volúmenes de sólidos',
        },
        {
          type: 'table',
          headers: ['Sólido', 'Volumen', 'Superficie total'],
          rows: [
            ['Cubo (arista $a$)', '$a^3$', '$6a^2$'],
            ['Paralelepípedo ($l \\times w \\times h$)', '$l \\cdot w \\cdot h$', '$2(lw+lh+wh)$'],
            ['Cilindro ($r$, $h$)', '$\\pi r^2 h$', '$2\\pi r(r+h)$'],
            ['Esfera (radio $r$)', '$\\dfrac{4}{3}\\pi r^3$', '$4\\pi r^2$'],
            ['Cono ($r$, $h$)', '$\\dfrac{1}{3}\\pi r^2 h$', '$\\pi r(r+g)$ donde $g=\\sqrt{r^2+h^2}$'],
          ],
        },
        {
          type: 'note',
          html: 'El número $\\pi \\approx 3.14159$. Para cálculos de ingeniería se usa $\\pi \\approx 3.1416$.',
        },
      ],
      guidedExercises: [
        {
          id: 'geo-g1',
          type: 'guided',
          difficulty: 1,
          statement: 'Calcula el área y el perímetro de un triángulo con base $b = 8$ cm y altura $h = 5$ cm. Los lados miden 7, 7 y 8 cm.',
          steps: [
            {
              instruction: 'Escribe la fórmula del área del triángulo.',
              formula: 'A = \\frac{b \\cdot h}{2}',
            },
            {
              instruction: 'Sustituye $b=8$ cm y $h=5$ cm en la fórmula.',
              formula: 'A = \\frac{8 \\cdot 5}{2} = \\frac{40}{2}',
              answer: '20',
              placeholder: 'A = ? (cm²)',
              tolerance: 0.1,
            },
            {
              instruction: 'Calcula el perímetro sumando los tres lados.',
              formula: 'P = 7 + 7 + 8',
              answer: '22',
              placeholder: 'P = ? (cm)',
              tolerance: 0.1,
            },
          ],
          explanation: 'Área $= \\frac{8 \\times 5}{2} = 20$ cm². Perímetro $= 7+7+8 = 22$ cm.',
        },
        {
          id: 'geo-g2',
          type: 'guided',
          difficulty: 2,
          statement: 'Un tanque cilíndrico tiene radio $r = 3$ m y altura $h = 10$ m. Calcula su volumen (usa $\\pi \\approx 3.1416$).',
          steps: [
            {
              instruction: 'Escribe la fórmula del volumen del cilindro.',
              formula: 'V = \\pi r^2 h',
            },
            {
              instruction: 'Sustituye los valores: $r=3$ m y $h=10$ m.',
              formula: 'V = 3.1416 \\times 3^2 \\times 10 = 3.1416 \\times 9 \\times 10',
              answer: '282.74',
              placeholder: 'V ≈ ? (m³)',
              tolerance: 0.5,
            },
          ],
          explanation: '$V = \\pi \\times 9 \\times 10 = 90\\pi \\approx 282.74$ m³.',
        },
      ],
      exercises: [
        {
          id: 'geo-p1',
          type: 'numeric',
          difficulty: 1,
          statement: 'Calcula el área de un rectángulo con base $b = 7$ m y altura $h = 4$ m.',
          answer: 28,
          unit: 'm²',
          explanation: '$A = 7 \\times 4 = 28$ m².',
        },
        {
          id: 'geo-p2',
          type: 'numeric',
          difficulty: 1,
          statement: 'Calcula el perímetro de un cuadrado con lado $a = 6$ cm.',
          answer: 24,
          unit: 'cm',
          hint: 'Recuerda: $P = 4a$.',
          explanation: '$P = 4 \\times 6 = 24$ cm.',
        },
        {
          id: 'geo-p3',
          type: 'numeric',
          difficulty: 2,
          statement: 'Un triángulo rectángulo tiene catetos $a = 9$ cm y $b = 12$ cm. ¿Cuánto mide la hipotenusa $c$?',
          answer: 15,
          unit: 'cm',
          hint: '$c = \\sqrt{a^2 + b^2}$',
          explanation: '$c = \\sqrt{81 + 144} = \\sqrt{225} = 15$ cm.',
        },
        {
          id: 'geo-p4',
          type: 'numeric',
          difficulty: 2,
          statement: 'Calcula el área de un círculo con radio $r = 4$ cm. Usa $\\pi \\approx 3.1416$. Redondea a 2 decimales.',
          answer: 50.27,
          unit: 'cm²',
          hint: '$A = \\pi r^2$',
          explanation: '$A = \\pi \\times 16 \\approx 50.27$ cm².',
          tolerance: 0.05,
        },
        {
          id: 'geo-p5',
          type: 'multiple-choice',
          difficulty: 1,
          statement: '¿Cuánto mide la suma de los ángulos interiores de cualquier triángulo?',
          options: ['90°', '180°', '270°', '360°'],
          answer: 1,
          explanation: 'La suma de los ángulos interiores de un triángulo siempre es 180°.',
        },
        {
          id: 'geo-p6',
          type: 'numeric',
          difficulty: 3,
          statement: 'Una esfera tiene radio $r = 3$ cm. Calcula su volumen. Usa $\\pi \\approx 3.1416$. Redondea a 2 decimales.',
          answer: 113.1,
          unit: 'cm³',
          hint: '$V = \\frac{4}{3}\\pi r^3$',
          explanation: '$V = \\frac{4}{3} \\times \\pi \\times 27 = 36\\pi \\approx 113.10$ cm³.',
          tolerance: 0.05,
        },
        {
          id: 'geo-p7',
          type: 'numeric',
          difficulty: 2,
          statement: 'Calcula el área de un <strong>trapecio</strong> con bases $B = 14$ cm, $b = 8$ cm y altura $h = 6$ cm.',
          answer: 66,
          unit: 'cm²',
          hint: '$A = \\dfrac{(B+b) \\cdot h}{2}$',
          explanation: '$A = \\dfrac{(14+8) \\times 6}{2} = \\dfrac{132}{2} = 66$ cm².',
        },
        {
          id: 'geo-p8',
          type: 'numeric',
          difficulty: 2,
          statement: 'Un <strong>rombo</strong> tiene diagonales $d_1 = 12$ cm y $d_2 = 8$ cm. ¿Cuánto mide su área?',
          answer: 48,
          unit: 'cm²',
          hint: '$A = \\dfrac{d_1 \\cdot d_2}{2}$',
          explanation: '$A = \\dfrac{12 \\times 8}{2} = 48$ cm². Las diagonales del rombo se cortan perpendicularmente, formando 4 triángulos iguales.',
        },
        {
          id: 'geo-p9',
          type: 'multiple-choice',
          difficulty: 2,
          statement: '¿Cuántos grados suman los ángulos interiores de un <strong>hexágono</strong> ($n = 6$ lados)?',
          options: ['$540°$', '$720°$', '$900°$', '$360°$'],
          answer: 1,
          explanation: 'Fórmula: $(n-2) \\times 180° = (6-2) \\times 180° = 4 \\times 180° = 720°$.',
        },
        {
          id: 'geo-p10',
          type: 'numeric',
          difficulty: 2,
          statement: 'Un triángulo rectángulo tiene hipotenusa $c = 13$ cm y cateto $a = 5$ cm. ¿Cuánto mide el otro cateto $b$?',
          answer: 12,
          unit: 'cm',
          hint: '$b = \\sqrt{c^2 - a^2}$',
          explanation: '$b = \\sqrt{13^2 - 5^2} = \\sqrt{169 - 25} = \\sqrt{144} = 12$ cm. ¡Es la terna pitagórica $(5, 12, 13)$!',
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────────
    // 1.2 CONJUNTOS
    // ──────────────────────────────────────────────────────────────────────
    {
      id: 'sets',
      title: 'Conjuntos',
      intro: 'Un conjunto es una colección bien definida de objetos (elementos). La teoría de conjuntos es la base de toda la matemática moderna.',
      theory: [
        { type: 'heading', text: 'Notación y definiciones' },
        {
          type: 'definition',
          term: 'Conjunto',
          text: 'Colección bien definida de elementos. Se denota con letras mayúsculas: $A$, $B$, $C$, $U$…',
        },
        {
          type: 'text',
          html: `Existen dos formas de definir un conjunto:
          <ul style="margin:.5rem 0 .5rem 1.5rem">
            <li><strong>Extensión (lista):</strong> $A = \\{1, 3, 5, 7, 9\\}$</li>
            <li><strong>Comprensión (regla):</strong> $A = \\{x \\in \\mathbb{N} : x \\text{ es impar y } x < 10\\}$</li>
          </ul>`,
        },
        {
          type: 'table',
          headers: ['Concepto', 'Símbolo', 'Significado'],
          rows: [
            ['Pertenencia', '$a \\in A$', '$a$ es elemento de $A$'],
            ['No pertenencia', '$a \\notin A$', '$a$ no es elemento de $A$'],
            ['Conjunto vacío', '$\\emptyset$ o $\\{\\}$', 'Sin elementos'],
            ['Subconjunto', '$A \\subseteq B$', 'Todo elemento de $A$ está en $B$'],
            ['Cardinalidad', '$|A|$ o $\\#A$', 'Número de elementos de $A$'],
          ],
        },
        { type: 'heading', text: 'Operaciones entre conjuntos' },
        {
          type: 'definition',
          term: 'Unión: $A \\cup B$',
          text: 'Conjunto de todos los elementos que están en $A$ **o** en $B$ (o en ambos): $$A \\cup B = \\{x : x \\in A \\text{ o } x \\in B\\}$$',
        },
        {
          type: 'definition',
          term: 'Intersección: $A \\cap B$',
          text: 'Conjunto de los elementos que están **simultáneamente** en $A$ y en $B$: $$A \\cap B = \\{x : x \\in A \\text{ y } x \\in B\\}$$',
        },
        {
          type: 'definition',
          term: 'Diferencia: $A \\setminus B$',
          text: 'Elementos de $A$ que **no** están en $B$: $$A \\setminus B = \\{x : x \\in A \\text{ y } x \\notin B\\}$$',
        },
        {
          type: 'definition',
          term: "Complemento: $A^c$ o $A'$",
          text: 'Elementos del universo $U$ que **no** pertenecen a $A$: $$A^c = \\{x \\in U : x \\notin A\\}$$',
        },
        {
          type: 'visualization',
          id: 'venn-diagram',
          params: { setA: [1,2,3,4,5], setB: [3,4,5,6,7] },
        },
        {
          type: 'example',
          title: 'Ejemplo: Operaciones entre A y B',
          problem: 'Sean $A = \\{1, 2, 3, 4, 5\\}$ y $B = \\{3, 4, 5, 6, 7\\}$. Calcula $A \\cup B$, $A \\cap B$ y $A \\setminus B$.',
          steps: [
            '$A \\cup B = \\{1, 2, 3, 4, 5, 6, 7\\}$ (todos los elementos de ambos, sin repetición)',
            '$A \\cap B = \\{3, 4, 5\\}$ (solo los que están en los dos)',
            '$A \\setminus B = \\{1, 2\\}$ (están en A pero no en B)',
          ],
        },
        {
          type: 'heading',
          text: 'Leyes de De Morgan',
        },
        { type: 'formula', tex: '(A \\cup B)^c = A^c \\cap B^c \\qquad (A \\cap B)^c = A^c \\cup B^c' },
      ],
      guidedExercises: [
        {
          id: 'sets-g1',
          type: 'guided',
          difficulty: 1,
          statement: 'Sea $U = \\{1, 2, 3, 4, 5, 6, 7, 8, 9, 10\\}$, $A = \\{2, 4, 6, 8, 10\\}$, $B = \\{1, 2, 3, 4, 5\\}$. Calcula la cardinalidad de $A \\cap B$.',
          steps: [
            {
              instruction: 'Identifica los elementos que pertenecen tanto a $A$ como a $B$.',
              info: '$A = \\{2, 4, 6, 8, 10\\}$, $B = \\{1, 2, 3, 4, 5\\}$. Los comunes son: $\\{2, 4\\}$.',
            },
            {
              instruction: '¿Cuántos elementos tiene $A \\cap B$?',
              answer: '2',
              placeholder: '|A ∩ B| = ?',
            },
          ],
          explanation: '$A \\cap B = \\{2, 4\\}$, ya que son los únicos elementos en ambos conjuntos. $|A \\cap B| = 2$.',
        },
        {
          id: 'sets-g2',
          type: 'guided',
          difficulty: 2,
          statement: 'Dados $A = \\{a, b, c, d\\}$ y $B = \\{c, d, e, f\\}$ con universo $U = \\{a,b,c,d,e,f,g\\}$. ¿Cuántos elementos tiene $(A \\cup B)^c$?',
          steps: [
            { instruction: 'Calcula $A \\cup B$.', info: '$A \\cup B = \\{a, b, c, d, e, f\\}$' },
            {
              instruction: '¿Cuántos elementos tiene $(A \\cup B)^c$ en el universo $U$?',
              answer: '1',
              placeholder: '|(A∪B)ᶜ| = ?',
            },
          ],
          explanation: '$A \\cup B = \\{a,b,c,d,e,f\\}$. El universo tiene 7 elementos, así que $(A \\cup B)^c = \\{g\\}$, con cardinalidad 1.',
        },
      ],
      exercises: [
        {
          id: 'sets-p1',
          type: 'multiple-choice',
          difficulty: 1,
          statement: 'Sea $A = \\{1, 3, 5, 7\\}$ y $B = \\{5, 7, 9, 11\\}$. ¿Cuál es $A \\cap B$?',
          options: ['$\\{1, 3, 5, 7, 9, 11\\}$', '$\\{5, 7\\}$', '$\\{1, 3\\}$', '$\\{9, 11\\}$'],
          answer: 1,
          explanation: '$A \\cap B$ contiene solo los elementos comunes: $5$ y $7$.',
        },
        {
          id: 'sets-p2',
          type: 'numeric',
          difficulty: 1,
          statement: 'Sea $A = \\{a, e, i, o, u\\}$. ¿Cuál es $|A|$?',
          answer: 5,
          explanation: 'La cardinalidad es el número de elementos: 5 vocales.',
        },
        {
          id: 'sets-p3',
          type: 'multiple-choice',
          difficulty: 2,
          statement: 'Si $|A| = 8$, $|B| = 6$ y $|A \\cap B| = 3$, ¿cuánto es $|A \\cup B|$?',
          options: ['11', '14', '17', '5'],
          answer: 0,
          explanation: 'Por la fórmula de inclusión-exclusión: $|A \\cup B| = |A| + |B| - |A \\cap B| = 8 + 6 - 3 = 11$.',
        },
        {
          id: 'sets-p4',
          type: 'multiple-choice',
          difficulty: 2,
          statement: '¿Cuál de las siguientes afirmaciones sobre el conjunto vacío $\\emptyset$ es correcta?',
          options: [
            '$\\emptyset$ no es subconjunto de ningún conjunto',
            '$\\emptyset \\subseteq A$ para todo conjunto $A$',
            '$|\\emptyset| = 1$',
            '$\\emptyset = \\{0\\}$',
          ],
          answer: 1,
          explanation: 'El conjunto vacío es subconjunto de cualquier conjunto (vacuously true). Además $|\\emptyset| = 0$ y $\\emptyset \\neq \\{0\\}$.',
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────────
    // 1.3 NÚMEROS NATURALES
    // ──────────────────────────────────────────────────────────────────────
    {
      id: 'naturals',
      title: 'Números Naturales',
      intro: 'El conjunto de los números naturales $\\mathbb{N} = \\{0, 1, 2, 3, \\ldots\\}$ es la base de toda aritmética. Aquí estudiamos sus operaciones y la descomposición en factores primos.',
      theory: [
        { type: 'heading', text: 'Operaciones básicas' },
        {
          type: 'text',
          html: 'Las cuatro operaciones en $\\mathbb{N}$ son suma, resta (cuando el resultado no es negativo), multiplicación y división. Respetan <strong>jerarquía de operaciones</strong>: primero potencias, luego multiplicación/división, finalmente suma/resta.',
        },
        {
          type: 'definition',
          term: 'Potencia',
          text: '$a^n = \\underbrace{a \\cdot a \\cdots a}_{n \\text{ veces}}$. Propiedades: $a^m \\cdot a^n = a^{m+n}$, $(a^m)^n = a^{mn}$, $\\dfrac{a^m}{a^n} = a^{m-n}$.',
        },
        { type: 'heading', text: 'Factorización en primos' },
        {
          type: 'text',
          html: 'Todo número natural mayor que 1 puede escribirse como producto de números primos (Teorema Fundamental de la Aritmética). El proceso es la <strong>descomposición canónica</strong>.',
        },
        {
          type: 'example',
          title: 'Ejemplo: descomponer 360',
          problem: 'Factoriza $360$ en números primos.',
          steps: [
            '$360 \\div 2 = 180 \\Rightarrow 360 = 2 \\times 180$',
            '$180 \\div 2 = 90 \\Rightarrow 360 = 2^2 \\times 90$',
            '$90 \\div 2 = 45 \\Rightarrow 360 = 2^3 \\times 45$',
            '$45 \\div 3 = 15 \\Rightarrow 360 = 2^3 \\times 3 \\times 15$',
            '$15 \\div 3 = 5 \\Rightarrow 360 = 2^3 \\times 3^2 \\times 5$',
          ],
          result: '$360 = 2^3 \\times 3^2 \\times 5$',
        },
        { type: 'heading', text: 'MCD y mcm' },
        {
          type: 'definition',
          term: 'Máximo Común Divisor (MCD)',
          text: 'El mayor número que divide simultáneamente a todos los dados. Para calcularlo: Se factorizan los números y se toman los factores comunes con el menor exponente.',
        },
        {
          type: 'definition',
          term: 'Mínimo Común Múltiplo (mcm)',
          text: 'El menor número que es múltiplo de todos los dados. Se factorizan y se toman todos los factores con el mayor exponente.',
        },
        {
          type: 'example',
          title: 'Ejemplo: MCD y mcm de 24 y 36',
          problem: 'Calcula $\\text{MCD}(24, 36)$ y $\\text{mcm}(24, 36)$.',
          steps: [
            '$24 = 2^3 \\times 3^1$',
            '$36 = 2^2 \\times 3^2$',
            '$\\text{MCD}(24,36) = 2^{\\min(3,2)} \\times 3^{\\min(1,2)} = 2^2 \\times 3 = 12$',
            '$\\text{mcm}(24,36) = 2^{\\max(3,2)} \\times 3^{\\max(1,2)} = 2^3 \\times 3^2 = 72$',
          ],
          result: '$\\text{MCD} = 12$, $\\text{mcm} = 72$',
        },
        {
          type: 'note',
          html: 'Para cualquier par de naturales: $a \\times b = \\text{MCD}(a,b) \\times \\text{mcm}(a,b)$. Comprueba: $24 \\times 36 = 864$ y $12 \\times 72 = 864$. ✓',
        },
        { type: 'heading', text: 'Calculador interactivo de MCD y mcm' },
        {
          type: 'text',
          html: 'Recuerda siempre las siglas: <strong>MCD</strong> = <em>Máximo Común Divisor</em> (el mayor número que divide a ambos) y <strong>mcm</strong> = <em>mínimo común múltiplo</em> (el menor número múltiplo de ambos). El siguiente explorador muestra el proceso completo por factorización prima.',
        },
        {
          type: 'visualization',
          id: 'division-ladder',
          params: { a: 24, b: 36 },
        },
        {
          type: 'example',
          title: 'Aplicación del mcm: problema de sincronización',
          problem: 'Dos luces parpadean juntas. La luz A parpadea cada 12 segundos y la B cada 8 segundos. ¿Cuándo volverán a parpadear juntas?',
          steps: [
            'Necesitamos el <strong>mcm</strong>(12, 8) — buscamos el <em>menor tiempo común</em>.',
            '$12 = 2^2 \\times 3$ y $8 = 2^3$.',
            '$\\text{mcm}(12, 8) = 2^{\\max(2,3)} \\times 3^{\\max(1,0)} = 2^3 \\times 3 = 24$.',
          ],
          result: 'Las luces parpadearán juntas cada **24 segundos**.',
        },
        {
          type: 'example',
          title: 'Aplicación del MCD: distribución equitativa',
          problem: 'Un albañil tiene 48 azulejos rojos y 72 blancos. Quiere hacer filas iguales usando todos. ¿Cuántos caben como máximo en cada fila (mismo número de cada color)?',
          steps: [
            'Necesitamos el <strong>MCD</strong>(48, 72) — buscamos el <em>mayor divisor común</em>.',
            '$48 = 2^4 \\times 3$ y $72 = 2^3 \\times 3^2$.',
            '$\\text{MCD}(48, 72) = 2^{\\min(4,3)} \\times 3^{\\min(1,2)} = 2^3 \\times 3 = 24$.',
          ],
          result: 'Caben **24 azulejos** por fila (2 filas de rojos, 3 filas de blancos).',
        },
      ],
      guidedExercises: [
        {
          id: 'nat-g1',
          type: 'guided',
          difficulty: 2,
          statement: 'Calcula el $\\text{MCD}(48, 72)$ usando factorización en primos.',
          steps: [
            { instruction: 'Factoriza 48.', info: '$48 = 2^4 \\times 3$' },
            { instruction: 'Factoriza 72.', info: '$72 = 2^3 \\times 3^2$' },
            {
              instruction: 'Aplica la fórmula del MCD (factores comunes con menor exponente). ¿Cuánto es $\\text{MCD}(48, 72)$?',
              formula: '\\text{MCD} = 2^{\\min(4,3)} \\times 3^{\\min(1,2)} = 2^3 \\times 3',
              answer: '24',
              placeholder: 'MCD = ?',
            },
          ],
          explanation: '$\\text{MCD}(48, 72) = 2^3 \\times 3 = 8 \\times 3 = 24$.',
        },
        {
          id: 'nat-g2',
          type: 'guided',
          difficulty: 2,
          statement: 'Calcula el $\\text{mcm}(6, 8, 12)$.',
          steps: [
            { instruction: 'Factoriza cada número.', info: '$6 = 2 \\times 3$, $\\;8 = 2^3$, $\\;12 = 2^2 \\times 3$' },
            {
              instruction: 'Toma cada factor con su mayor exponente: $2^3 \\times 3$. ¿Cuánto es el mcm?',
              answer: '24',
              placeholder: 'mcm = ?',
            },
          ],
          explanation: '$\\text{mcm}(6, 8, 12) = 2^3 \\times 3 = 24$.',
        },
      ],
      exercises: [
        {
          id: 'nat-p1',
          type: 'numeric',
          difficulty: 1,
          statement: 'Calcula $2^3 \\times 3^2$.',
          answer: 72,
          explanation: '$8 \\times 9 = 72$.',
        },
        {
          id: 'nat-p2',
          type: 'numeric',
          difficulty: 2,
          statement: 'Calcula $\\text{MCD}(60, 90)$.',
          answer: 30,
          hint: 'Factoriza: $60 = 2^2 \\times 3 \\times 5$ y $90 = 2 \\times 3^2 \\times 5$.',
          explanation: '$\\text{MCD} = 2^1 \\times 3^1 \\times 5^1 = 30$.',
        },
        {
          id: 'nat-p3',
          type: 'numeric',
          difficulty: 2,
          statement: 'Calcula $\\text{mcm}(4, 6, 10)$.',
          answer: 60,
          hint: '$4=2^2$, $6=2 \\times 3$, $10=2 \\times 5$.',
          explanation: '$\\text{mcm} = 2^2 \\times 3 \\times 5 = 60$.',
        },
        {
          id: 'nat-p4',
          type: 'multiple-choice',
          difficulty: 1,
          statement: '¿Cuál es la factorización en primos de $180$?',
          options: ['$2^2 \\times 3^2 \\times 5$', '$2^3 \\times 3 \\times 5$', '$2^2 \\times 45$', '$3^2 \\times 20$'],
          answer: 0,
          explanation: '$180 = 4 \\times 45 = 4 \\times 9 \\times 5 = 2^2 \\times 3^2 \\times 5$.',
        },
        {
          id: 'nat-p5',
          type: 'multiple-choice',
          difficulty: 2,
          statement: 'Si $\\text{MCD}(a,b) = 12$ y $\\text{mcm}(a,b) = 360$, ¿cuánto es $a \\times b$?',
          options: ['372', '348', '4320', '30'],
          answer: 2,
          explanation: 'Por la propiedad $a \\times b = \\text{MCD} \\times \\text{mcm} = 12 \\times 360 = 4320$.',
        },
        {
          id: 'nat-p6',
          type: 'multiple-choice',
          difficulty: 2,
          statement: 'Una alarma A suena cada 8 minutos y una alarma B cada 12 minutos. Si suenan juntas ahora, ¿en cuántos minutos volverán a sonar juntas?',
          options: ['4 minutos', '20 minutos', '24 minutos', '96 minutos'],
          answer: 2,
          explanation: 'Se necesita el $\\text{mcm}(8, 12)$. $8 = 2^3$, $12 = 2^2 \\times 3$. $\\text{mcm} = 2^3 \\times 3 = 24$ minutos. El mcm da el <em>menor</em> tiempo en que coinciden.',
        },
        {
          id: 'nat-p7',
          type: 'numeric',
          difficulty: 2,
          statement: 'Calcula el $\\text{MCD}(84, 120)$.',
          answer: 12,
          hint: '$84 = 2^2 \\times 3 \\times 7$, $\\;120 = 2^3 \\times 3 \\times 5$',
          explanation: '$\\text{MCD} = 2^{\\min(2,3)} \\times 3^{\\min(1,1)} = 2^2 \\times 3 = 12$. Los factores 7 y 5 no son comunes, no se incluyen.',
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────────
    // 1.4 NÚMEROS ENTEROS
    // ──────────────────────────────────────────────────────────────────────
    {
      id: 'integers',
      title: 'Números Enteros',
      intro: 'El conjunto $\\mathbb{Z} = \\{\\ldots, -3, -2, -1, 0, 1, 2, 3, \\ldots\\}$ extiende los naturales añadiendo los negativos. Son indispensables para modelar deudas, temperaturas bajo cero, etc.',
      theory: [
        { type: 'heading', text: 'Valor absoluto' },
        {
          type: 'definition',
          term: 'Valor absoluto',
          text: 'El valor absoluto $|a|$ es la distancia de $a$ al cero en la recta numérica: $$|a| = \\begin{cases} a & \\text{si } a \\geq 0 \\\\ -a & \\text{si } a < 0 \\end{cases}$$',
        },
        {
          type: 'visualization',
          id: 'number-line',
          params: { a: -4, b: 6 },
        },
        { type: 'heading', text: 'Reglas de signos' },
        {
          type: 'table',
          headers: ['Operación', 'Regla', 'Ejemplo'],
          rows: [
            ['Suma de iguales', 'Se suman los valores absolutos y se conserva el signo', '$(-3) + (-5) = -8$'],
            ['Suma de distintos', 'Se resta el menor del mayor y se pone el signo del mayor', '$(-7) + 4 = -3$'],
            ['Multiplicación', '$( + ) \\times ( + ) = +$;  $( - ) \\times ( - ) = +$;  $( + ) \\times ( - ) = -$', '$(-3) \\times (-4) = 12$'],
            ['División', 'Mismas reglas que la multiplicación', '$(-18) \\div 3 = -6$'],
          ],
        },
        {
          type: 'example',
          title: 'Ejemplo: Expresión con enteros',
          problem: 'Calcula: $-5 + 3 \\times (-2) - (-4)$',
          steps: [
            'Primero la multiplicación (jerarquía): $3 \\times (-2) = -6$',
            'Resto la expresión: $-5 + (-6) - (-4)$',
            'Cambiar $-(-4)$ por $+4$: $-5 - 6 + 4$',
            'De izquierda a derecha: $-11 + 4 = -7$',
          ],
          result: 'Resultado: $-7$',
        },
      ],
      guidedExercises: [
        {
          id: 'int-g1',
          type: 'guided',
          difficulty: 1,
          statement: 'Calcula: $(-3) + 7 - (-2)$.',
          steps: [
            { instruction: 'Convierte $-(-2)$ en su equivalente.', info: '$-(-2) = +2$, entonces la expresión es $(-3) + 7 + 2$.' },
            {
              instruction: 'Suma los tres términos: $-3 + 7 + 2 = ?$',
              answer: '6',
              placeholder: 'Resultado = ?',
            },
          ],
          explanation: '$-3 + 7 = 4$; $4 + 2 = 6$.',
        },
        {
          id: 'int-g2',
          type: 'guided',
          difficulty: 2,
          statement: 'Calcula: $(-4) \\times (-3) + 2 \\times (-5)$.',
          steps: [
            {
              instruction: 'Calcula $(-4) \\times (-3)$. (Recuerda: negativo × negativo = positivo)',
              answer: '12',
              placeholder: '(-4)×(-3) = ?',
            },
            {
              instruction: 'Calcula $2 \\times (-5)$.',
              answer: '-10',
              placeholder: '2×(-5) = ?',
            },
            {
              instruction: 'Suma los resultados: $12 + (-10) = ?$',
              answer: '2',
              placeholder: 'Resultado final = ?',
            },
          ],
          explanation: '$(-4)(-3) = 12$ y $2(-5) = -10$. Luego $12 - 10 = 2$.',
        },
      ],
      exercises: [
        {
          id: 'int-p1',
          type: 'numeric',
          difficulty: 1,
          statement: 'Calcula $|-15| + |8|$.',
          answer: 23,
          explanation: '$15 + 8 = 23$.',
        },
        {
          id: 'int-p2',
          type: 'numeric',
          difficulty: 1,
          statement: 'Calcula $(-6) \\times (-3)$.',
          answer: 18,
          explanation: 'Negativo por negativo da positivo: $6 \\times 3 = 18$.',
        },
        {
          id: 'int-p3',
          type: 'numeric',
          difficulty: 2,
          statement: 'Calcula $-8 + (-5) - (-3)$.',
          answer: -10,
          explanation: '$-8 - 5 + 3 = -13 + 3 = -10$.',
        },
        {
          id: 'int-p4',
          type: 'numeric',
          difficulty: 2,
          statement: 'Calcula $|{-7 + 3}|$.',
          answer: 4,
          explanation: '$|-4| = 4$.',
        },
        {
          id: 'int-p5',
          type: 'multiple-choice',
          difficulty: 2,
          statement: 'La temperatura a las 2 a.m. era $-8°C$ y subió $13°C$ durante el día. ¿Cuál es la temperatura final?',
          options: ['$-21°C$', '$5°C$', '$21°C$', '$-5°C$'],
          answer: 1,
          explanation: '$-8 + 13 = 5°C$.',
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────────
    // 1.5 NÚMEROS RACIONALES
    // ──────────────────────────────────────────────────────────────────────
    {
      id: 'rationals',
      title: 'Números Racionales',
      intro: 'Los racionales $\\mathbb{Q}$ son todos los números que pueden escribirse como fracción $\\frac{p}{q}$ con $q \\neq 0$. Incluyen fracciones, decimales finitos y periódicos.',
      theory: [
        { type: 'heading', text: 'Fracciones y equivalencia' },
        {
          type: 'definition',
          term: 'Fracción equivalente',
          text: 'Dos fracciones son equivalentes si $\\dfrac{a}{b} = \\dfrac{c}{d} \\Leftrightarrow a \\times d = b \\times c$.',
        },
        {
          type: 'visualization',
          id: 'fraction-pie',
          params: { num: 3, den: 4 },
        },
        {
          type: 'text',
          html: 'Para <strong>simplificar</strong> una fracción, se divide numerador y denominador por su <strong>MCD</strong> (Máximo Común Divisor). Para obtener un <strong>denominador común</strong>, se usa el <strong>mcm</strong> (mínimo común múltiplo) de los denominadores. <em>Explora el visualizador para ver cómo cambia la fracción al mover los controles.</em>',
        },
        { type: 'heading', text: 'Operaciones' },
        {
          type: 'table',
          headers: ['Operación', 'Método', 'Ejemplo'],
          rows: [
            ['Suma / Resta', 'Igualar denominadores, luego operar numeradores', '$\\dfrac{1}{3} + \\dfrac{1}{4} = \\dfrac{4}{12} + \\dfrac{3}{12} = \\dfrac{7}{12}$'],
            ['Multiplicación', 'Numerador × numerador, denominador × denominador', '$\\dfrac{3}{5} \\times \\dfrac{2}{7} = \\dfrac{6}{35}$'],
            ['División', 'Multiplicar por el recíproco del divisor', '$\\dfrac{3}{4} \\div \\dfrac{2}{5} = \\dfrac{3}{4} \\times \\dfrac{5}{2} = \\dfrac{15}{8}$'],
          ],
        },
        {
          type: 'example',
          title: 'Ejemplo: $\\frac{2}{3} + \\frac{5}{6}$',
          problem: 'Calcula $\\dfrac{2}{3} + \\dfrac{5}{6}$.',
          steps: [
            'El mcm de 3 y 6 es 6.',
            '$\\dfrac{2}{3} = \\dfrac{4}{6}$',
            '$\\dfrac{4}{6} + \\dfrac{5}{6} = \\dfrac{9}{6}$',
            'Simplificamos: $\\dfrac{9}{6} = \\dfrac{3}{2} = 1\\dfrac{1}{2}$',
          ],
          result: '$\\dfrac{3}{2}$',
        },
        { type: 'heading', text: 'Porcentaje' },
        {
          type: 'definition',
          term: 'Porcentaje',
          text: '$n\\%$ de $A$ es $\\dfrac{n}{100} \\times A$. Para hallar qué porcentaje es $P$ de $T$: $\\dfrac{P}{T} \\times 100\\%$.',
        },
        {
          type: 'example',
          title: 'Ejemplo: 15% de 240',
          problem: '¿Cuánto es el 15% de 240?',
          steps: [
            '$\\dfrac{15}{100} \\times 240 = 0.15 \\times 240 = 36$',
          ],
          result: '**36**',
        },
      ],
      guidedExercises: [
        {
          id: 'rat-g1',
          type: 'guided',
          difficulty: 2,
          statement: 'Calcula $\\dfrac{3}{4} + \\dfrac{1}{6}$. Expresa el resultado como fracción simplificada.',
          steps: [
            { instruction: 'Calcula el mcm de 4 y 6.', info: '$4 = 2^2$, $6 = 2 \\times 3$. $\\text{mcm} = 12$.' },
            {
              instruction: 'Convierte: $\\frac{3}{4} = \\frac{?}{12}$',
              answer: '9',
              placeholder: 'Numerador de 3/4 con denominador 12',
            },
            {
              instruction: 'Convierte: $\\frac{1}{6} = \\frac{?}{12}$',
              answer: '2',
              placeholder: 'Numerador de 1/6 con denominador 12',
            },
            {
              instruction: 'Suma los numeradores: $\\frac{9}{12} + \\frac{2}{12} = \\frac{?}{12}$',
              answer: '11',
              placeholder: 'Numerador de la suma',
            },
          ],
          explanation: '$\\dfrac{3}{4} + \\dfrac{1}{6} = \\dfrac{9}{12} + \\dfrac{2}{12} = \\dfrac{11}{12}$. Ya está simplificada (MCD=1).',
        },
        {
          id: 'rat-g2',
          type: 'guided',
          difficulty: 2,
          statement: 'En una empresa de 300 empleados, el 35% trabaja en el área técnica. ¿Cuántos empleados trabajan en el área técnica?',
          steps: [
            {
              instruction: 'Calcula el 35% de 300: $\\frac{35}{100} \\times 300 = ?$',
              answer: '105',
              placeholder: 'Resultado = ?',
            },
          ],
          explanation: '$0.35 \\times 300 = 105$ empleados.',
        },
      ],
      exercises: [
        {
          id: 'rat-p1',
          type: 'numeric',
          difficulty: 1,
          statement: 'Simplifica $\\dfrac{18}{24}$. Escribe el numerador de la forma simplificada.',
          answer: 3,
          hint: 'MCD(18, 24) = 6',
          explanation: '$\\dfrac{18 \\div 6}{24 \\div 6} = \\dfrac{3}{4}$. El numerador es 3.',
        },
        {
          id: 'rat-p2',
          type: 'numeric',
          difficulty: 2,
          statement: 'Calcula $\\dfrac{5}{8} \\times \\dfrac{4}{3}$. Simplifica y escribe el denominador del resultado.',
          answer: 6,
          hint: '$\\dfrac{5 \\times 4}{8 \\times 3} = \\dfrac{20}{24}$, simplifica dividiendo por MCD(20,24).',
          explanation: '$\\dfrac{20}{24} = \\dfrac{5}{6}$. El denominador es 6.',
        },
        {
          id: 'rat-p3',
          type: 'numeric',
          difficulty: 2,
          statement: 'Calcula $3\\tfrac{1}{2} - 1\\tfrac{1}{4}$. Expresa el resultado como decimal.',
          answer: 2.25,
          hint: 'Convierte a fracciones impropias: $\\frac{7}{2} - \\frac{5}{4}$.',
          explanation: '$\\dfrac{7}{2} - \\dfrac{5}{4} = \\dfrac{14}{4} - \\dfrac{5}{4} = \\dfrac{9}{4} = 2.25$.',
        },
        {
          id: 'rat-p4',
          type: 'numeric',
          difficulty: 1,
          statement: '¿Cuánto es el 25% de $160$?',
          answer: 40,
          explanation: '$\\frac{25}{100} \\times 160 = 0.25 \\times 160 = 40$.',
        },
        {
          id: 'rat-p5',
          type: 'multiple-choice',
          difficulty: 2,
          statement: 'La fracción $\\dfrac{3}{5}$ como decimal periódico es:',
          options: ['$0.\\overline{6}$', '$0.6$', '$0.35$', '$0.\\overline{3}$'],
          answer: 1,
          explanation: '$3 \\div 5 = 0.6$ (decimal exacto, no periódico).',
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────────
    // 1.6 NÚMEROS REALES
    // ──────────────────────────────────────────────────────────────────────
    {
      id: 'reals',
      title: 'Números Reales e Irracionales',
      intro: 'Los números reales $\\mathbb{R}$ incluyen todos los racionales e irracionales. Los irracionales (como $\\sqrt{2}$, $\\pi$, $e$) tienen expansión decimal infinita no periódica.',
      theory: [
        { type: 'heading', text: 'Radicales y propiedades' },
        {
          type: 'definition',
          term: 'Radical',
          text: '$\\sqrt[n]{a}$ es el número positivo cuya $n$-ésima potencia es $a$: $(\\sqrt[n]{a})^n = a$. Para $n=2$ se escribe simplemente $\\sqrt{a}$.',
        },
        {
          type: 'table',
          headers: ['Propiedad', 'Fórmula'],
          rows: [
            ['Producto', '$\\sqrt[n]{a} \\cdot \\sqrt[n]{b} = \\sqrt[n]{ab}$'],
            ['Cociente', '$\\dfrac{\\sqrt[n]{a}}{\\sqrt[n]{b}} = \\sqrt[n]{\\dfrac{a}{b}}$'],
            ['Potencia', '$\\sqrt[n]{a^m} = a^{m/n}$'],
            ['Raíz de raíz', '$\\sqrt[m]{\\sqrt[n]{a}} = \\sqrt[mn]{a}$'],
          ],
        },
        { type: 'heading', text: 'Simplificación de radicales' },
        {
          type: 'text',
          html: 'Para simplificar $\\sqrt{a}$, busca el mayor cuadrado perfecto que divide a $a$ y extráelo.',
        },
        {
          type: 'example',
          title: 'Ejemplo: Simplificar $\\sqrt{75}$',
          problem: '$\\sqrt{75}$',
          steps: [
            '$75 = 25 \\times 3$',
            '$\\sqrt{75} = \\sqrt{25 \\times 3} = \\sqrt{25} \\cdot \\sqrt{3}$',
            '$= 5\\sqrt{3}$',
          ],
          result: '$5\\sqrt{3}$',
        },
        { type: 'heading', text: 'Racionalización' },
        {
          type: 'text',
          html: 'Para racionalizar $\\dfrac{a}{\\sqrt{b}}$, multiplica numerador y denominador por $\\sqrt{b}$: $$\\frac{a}{\\sqrt{b}} = \\frac{a \\cdot \\sqrt{b}}{\\sqrt{b} \\cdot \\sqrt{b}} = \\frac{a\\sqrt{b}}{b}$$',
        },
        {
          type: 'example',
          title: 'Ejemplo: Racionalizar $\\frac{3}{\\sqrt{2}}$',
          problem: '$\\dfrac{3}{\\sqrt{2}}$',
          steps: [
            '$\\dfrac{3}{\\sqrt{2}} \\times \\dfrac{\\sqrt{2}}{\\sqrt{2}} = \\dfrac{3\\sqrt{2}}{2}$',
          ],
          result: '$\\dfrac{3\\sqrt{2}}{2}$',
        },
        {
          type: 'note',
          html: 'Los irracionales más comunes en ingeniería: $\\sqrt{2} \\approx 1.4142$, $\\sqrt{3} \\approx 1.7321$, $\\pi \\approx 3.14159$, $e \\approx 2.71828$.',
        },
      ],
      guidedExercises: [
        {
          id: 'real-g1',
          type: 'guided',
          difficulty: 2,
          statement: 'Simplifica $\\sqrt{48}$.',
          steps: [
            { instruction: 'Descompón 48 como cuadrado perfecto por algo.', info: '$48 = 16 \\times 3$' },
            {
              instruction: '$\\sqrt{48} = \\sqrt{16 \\times 3} = \\sqrt{16} \\cdot \\sqrt{3} = ? \\cdot \\sqrt{3}$. ¿Cuánto es $\\sqrt{16}$?',
              answer: '4',
              placeholder: '√16 = ?',
            },
          ],
          explanation: '$\\sqrt{48} = 4\\sqrt{3}$.',
        },
        {
          id: 'real-g2',
          type: 'guided',
          difficulty: 3,
          statement: 'Calcula $(\\sqrt{5} + \\sqrt{2})(\\sqrt{5} - \\sqrt{2})$.',
          steps: [
            { instruction: 'Reconoce el patrón: $(a+b)(a-b) = a^2 - b^2$.', info: 'Aquí $a = \\sqrt{5}$ y $b = \\sqrt{2}$.' },
            {
              instruction: '$(\\sqrt{5})^2 - (\\sqrt{2})^2 = 5 - 2 = ?$',
              answer: '3',
              placeholder: 'Resultado = ?',
            },
          ],
          explanation: '$(\\sqrt{5}+\\sqrt{2})(\\sqrt{5}-\\sqrt{2}) = 5 - 2 = 3$.',
        },
      ],
      exercises: [
        {
          id: 'real-p1',
          type: 'numeric',
          difficulty: 2,
          statement: 'Simplifica $\\sqrt{72}$. ¿Cuál es el coeficiente entero? (Escribe la forma $k\\sqrt{m}$ con $m$ sin cuadrados perfectos y responde $k$.)',
          answer: 6,
          hint: '$72 = 36 \\times 2$',
          explanation: '$\\sqrt{72} = \\sqrt{36 \\times 2} = 6\\sqrt{2}$. El coeficiente es 6.',
        },
        {
          id: 'real-p2',
          type: 'numeric',
          difficulty: 1,
          statement: 'Calcula $\\sqrt[3]{-8}$.',
          answer: -2,
          explanation: '$(-2)^3 = -8$, entonces $\\sqrt[3]{-8} = -2$.',
        },
        {
          id: 'real-p3',
          type: 'numeric',
          difficulty: 2,
          statement: 'Calcula $2\\sqrt{3} + 3\\sqrt{3}$.',
          answer: 5,
          hint: 'Los radicales semejantes se suman como términos semejantes.',
          explanation: '$(2+3)\\sqrt{3} = 5\\sqrt{3}$. El coeficiente es 5.',
        },
        {
          id: 'real-p4',
          type: 'multiple-choice',
          difficulty: 2,
          statement: '¿Cuál de las siguientes es la forma racionalizada de $\\dfrac{6}{\\sqrt{3}}$?',
          options: ['$\\sqrt{3}$', '$2\\sqrt{3}$', '$3\\sqrt{3}$', '$6\\sqrt{3}$'],
          answer: 1,
          explanation: '$\\dfrac{6}{\\sqrt{3}} \\times \\dfrac{\\sqrt{3}}{\\sqrt{3}} = \\dfrac{6\\sqrt{3}}{3} = 2\\sqrt{3}$.',
        },
        {
          id: 'real-p5',
          type: 'multiple-choice',
          difficulty: 1,
          statement: '¿Cuál de los siguientes es irracional?',
          options: ['$\\sqrt{9}$', '$\\sqrt{16}$', '$\\sqrt{7}$', '$1.25$'],
          answer: 2,
          explanation: '$\\sqrt{7}$ es irracional porque 7 no es un cuadrado perfecto. Los demás son $3$, $4$ y $1.25$ (racionales).',
        },
      ],
    },
  ],
};
