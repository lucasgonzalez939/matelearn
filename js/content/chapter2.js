/** Chapter 2 – Ecuaciones y Polinomios */

export default {
  id: 'ch2',
  number: 2,
  title: 'Ecuaciones y Polinomios',
  shortTitle: 'Ecuaciones',
  description: 'Ecuaciones lineales y cuadráticas, inecuaciones, polinomios, factorización y fracciones algebraicas.',
  sections: [

    // ──────────────────────────────────────────────────────────────────────
    // 2.1 ECUACIONES LINEALES
    // ──────────────────────────────────────────────────────────────────────
    {
      id: 'linear-equations',
      title: 'Ecuaciones Lineales',
      intro: 'Una ecuación lineal en una incógnita $x$ tiene la forma $ax + b = c$. Resolverla significa encontrar el valor de $x$ que hace verdadera la igualdad.',
      theory: [
        { type: 'heading', text: 'Principios de equivalencia' },
        {
          type: 'text',
          html: 'Dos ecuaciones son <strong>equivalentes</strong> si tienen las mismas soluciones. Se obtienen ecuaciones equivalentes aplicando las mismas operaciones a ambos miembros:',
        },
        {
          type: 'table',
          headers: ['Principio', 'Descripción'],
          rows: [
            ['Adición/Sustracción', 'Sumar o restar el mismo número a ambos lados'],
            ['Multiplicación/División', 'Multiplicar o dividir ambos lados por el mismo número ≠ 0'],
            ['Transposición', 'Pasar un término al otro lado cambiando su signo'],
          ],
        },
        {
          type: 'example',
          title: 'Ejemplo: Resolver $3x + 7 = 22$',
          problem: '$3x + 7 = 22$',
          steps: [
            'Restar 7 a ambos lados: $3x = 22 - 7 = 15$',
            'Dividir ambos lados por 3: $x = \\dfrac{15}{3} = 5$',
            'Verificación: $3(5) + 7 = 15 + 7 = 22$ ✓',
          ],
          result: '$x = 5$',
        },
        {
          type: 'example',
          title: 'Ejemplo: Ecuación con fracciones',
          problem: '$\\dfrac{x}{3} + 2 = \\dfrac{2x}{5} - 1$',
          steps: [
            'Multiplicar todo por el mcm(3,5) = 15: $5x + 30 = 6x - 15$',
            'Agrupar: $30 + 15 = 6x - 5x$',
            '$x = 45$',
          ],
          result: '$x = 45$',
        },
        { type: 'heading', text: 'Problemas de aplicación' },
        {
          type: 'note',
          html: 'Pasos para resolver problemas: (1) identificar la incógnita, (2) escribir la ecuación, (3) resolverla, (4) interpretar la solución.',
        },
        {
          type: 'text',
          html: 'La solución de $ax + b = 0$ es el punto donde la función $y = ax + b$ corta al eje $x$. Usa el explorador para visualizar cómo cambia la recta cuando modificas la pendiente $m$ y el intercepto $b$.',
        },
        {
          type: 'visualization',
          id: 'function-graph',
          params: { type: 'linear', m: 2, b: -4 },
        },
      ],
      guidedExercises: [
        {
          id: 'lin-g1',
          type: 'guided',
          difficulty: 1,
          statement: 'Resuelve: $5x - 3 = 17$.',
          steps: [
            { instruction: 'Suma 3 a ambos lados de la ecuación.', formula: '5x - 3 + 3 = 17 + 3 \\Rightarrow 5x = 20' },
            { instruction: 'Divide ambos lados por 5.', formula: 'x = \\frac{20}{5}', answer: '4', placeholder: 'x = ?' },
          ],
          explanation: '$5x = 20 \\Rightarrow x = 4$. Verifica: $5(4) - 3 = 17$ ✓',
        },
        {
          id: 'lin-g2',
          type: 'guided',
          difficulty: 2,
          statement: 'Resuelve: $2(x - 3) = 4x + 6$.',
          steps: [
            { instruction: 'Distribuye el 2.', formula: '2x - 6 = 4x + 6' },
            { instruction: 'Agrupa términos con $x$ a la izquierda.', formula: '2x - 4x = 6 + 6 \\Rightarrow -2x = 12' },
            { instruction: 'Divide por $-2$.', answer: '-6', placeholder: 'x = ?' },
          ],
          explanation: '$-2x = 12 \\Rightarrow x = -6$.',
        },
      ],
      exercises: [
        { id: 'lin-p1', type: 'numeric', difficulty: 1, statement: 'Resuelve: $x + 9 = 15$.', answer: 6, explanation: '$x = 15 - 9 = 6$.' },
        { id: 'lin-p2', type: 'numeric', difficulty: 1, statement: 'Resuelve: $4x = 28$.', answer: 7, explanation: '$x = 28 / 4 = 7$.' },
        { id: 'lin-p3', type: 'numeric', difficulty: 2, statement: 'Resuelve: $3x - 8 = 2x + 5$.', answer: 13, explanation: '$3x - 2x = 5 + 8 \\Rightarrow x = 13$.' },
        {
          id: 'lin-p4', type: 'numeric', difficulty: 2,
          statement: 'La suma de tres números consecutivos es 51. ¿Cuál es el menor?',
          answer: 16,
          hint: 'Si el menor es $n$, los tres son $n$, $n+1$, $n+2$.',
          explanation: '$n + (n+1) + (n+2) = 51 \\Rightarrow 3n+3=51 \\Rightarrow n=16$.',
        },
        {
          id: 'lin-p5', type: 'multiple-choice', difficulty: 2,
          statement: 'Resuelve: $\\dfrac{2x+1}{3} = 3$.',
          options: ['$x=4$', '$x=\\frac{8}{3}$', '$x=8$', '$x=\\frac{1}{3}$'],
          answer: 0,
          explanation: '$2x+1 = 9 \\Rightarrow 2x=8 \\Rightarrow x=4$.',
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────────
    // 2.2 ECUACIONES CUADRÁTICAS
    // ──────────────────────────────────────────────────────────────────────
    {
      id: 'quadratic-equations',
      title: 'Ecuaciones Cuadráticas',
      intro: 'Una ecuación cuadrática tiene la forma $ax^2 + bx + c = 0$ con $a \\neq 0$. Puede tener 0, 1 o 2 soluciones reales.',
      theory: [
        { type: 'heading', text: 'Fórmula general — Bhaskara (o fórmula cuadrática)' },
        {
          type: 'text',
          html: `La <strong>fórmula de Bhaskara</strong> (llamada también fórmula cuadrática o resolvente) es la herramienta universal para resolver cualquier ecuación cuadrática
          $ax^2 + bx + c = 0$ con $a \\neq 0$. Se obtiene a partir de la técnica de
          <em>completar el cuadrado</em> aplicada a la forma general:`,
        },
        {
          type: 'example',
          title: 'Derivación: ¿de dónde viene la fórmula?',
          problem: 'Partimos de $ax^2 + bx + c = 0$ y despejamos $x$.',
          steps: [
            'Dividimos todo por $a$: $x^2 + \\dfrac{b}{a}x + \\dfrac{c}{a} = 0$',
            'Pasamos $c/a$ a la derecha: $x^2 + \\dfrac{b}{a}x = -\\dfrac{c}{a}$',
            'Sumamos $\\left(\\dfrac{b}{2a}\\right)^2$ a ambos lados para completar el cuadrado: $\\left(x + \\dfrac{b}{2a}\\right)^2 = \\dfrac{b^2 - 4ac}{4a^2}$',
            'Tomamos raíz cuadrada: $x + \\dfrac{b}{2a} = \\pm\\dfrac{\\sqrt{b^2-4ac}}{2a}$',
            'Despejamos $x$: $x = \\dfrac{-b \\pm \\sqrt{b^2-4ac}}{2a}$',
          ],
          result: 'Obtenemos la fórmula de Bhaskara.',
        },
        { type: 'formula', tex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}' },
        {
          type: 'note',
          html: '<strong>Cómo leer la fórmula:</strong> $-b$ cambia el signo de $b$. El $\\pm$ indica que hay <em>dos</em> soluciones (una con $+$ y otra con $-$). El $2a$ divide <em>todo</em> el numerador, incluyendo la raíz. El término dentro de la raíz, $b^2-4ac$, se llama <strong>discriminante $\\Delta$</strong>.',
        },
        {
          type: 'definition',
          term: 'Discriminante $\\Delta = b^2 - 4ac$',
          text: `El discriminante determina la **naturaleza** de las raíces sin necesidad de resolver la ecuación completa:
$$\\Delta > 0 \\Rightarrow \\text{dos raíces reales y distintas}\\quad (x_1 \\neq x_2)$$
$$\\Delta = 0 \\Rightarrow \\text{una raíz real doble}\\quad (x_1 = x_2 = -b/2a)$$
$$\\Delta < 0 \\Rightarrow \\text{sin raíces reales (raíces complejas)}$$`,
        },
        {
          type: 'text',
          html: '<strong>Protocolo de 4 pasos para aplicar Bhaskara:</strong><ol style="margin:.4rem 0 .4rem 1.5rem;line-height:2"><li>Reescribir en forma estándar $ax^2+bx+c=0$ e identificar $a$, $b$, $c$ (¡con sus signos!).</li><li>Calcular $\\Delta = b^2-4ac$. Si $\\Delta&lt;0$, no hay soluciones reales y se detiene aquí.</li><li>Calcular $\\sqrt{\\Delta}$.</li><li>Calcular $x_1 = \\dfrac{-b+\\sqrt{\\Delta}}{2a}$ y $x_2=\\dfrac{-b-\\sqrt{\\Delta}}{2a}$.</li></ol>',
        },
        { type: 'heading', text: 'Método de factorización directa' },
        {
          type: 'text',
          html: 'Para $x^2 + bx + c = 0$ con $a=1$, si se pueden encontrar dos números $p$ y $q$ tales que $p + q = b$ y $p \\cdot q = c$, entonces el polinomio factoriza como $(x-p)(x-q)=0$, dando $x=p$ o $x=q$ directamente. Este método es más rápido que Bhaskara <em>cuando los números son enteros sencillos</em>.',
        },
        {
          type: 'example',
          title: 'Ejemplo: $x^2 - 5x + 6 = 0$ por factorización directa',
          problem: '$x^2 - 5x + 6 = 0$',
          steps: [
            'Buscamos $p$, $q$ tal que $p + q = -5$ y $p \\cdot q = 6$.',
            'Prueba: $p=-2$, $q=-3$ ✓ porque $(-2)+(-3)=-5$ y $(-2)\\times(-3)=6$.',
            'Factorizamos: $(x-2)(x-3) = 0$.',
            'Si $(x-2)=0 \\Rightarrow x=2$; si $(x-3)=0 \\Rightarrow x=3$.',
          ],
          result: '$x = 2$ o $x = 3$',
        },
        {
          type: 'example',
          title: 'Ejemplo: $2x^2 + 3x - 2 = 0$ por Bhaskara (paso a paso)',
          problem: '$2x^2 + 3x - 2 = 0$',
          steps: [
            '<strong>Paso 1 — Identificar:</strong> $a = 2$, $b = 3$, $c = -2$.',
            '<strong>Paso 2 — Discriminante:</strong> $\\Delta = b^2 - 4ac = 3^2 - 4(2)(-2) = 9 + 16 = 25$. Como $\\Delta > 0$, hay 2 raíces reales distintas.',
            '<strong>Paso 3 — Raíz del discriminante:</strong> $\\sqrt{25} = 5$.',
            '<strong>Paso 4 — Raíces:</strong> $x_1 = \\dfrac{-3 + 5}{2 \\cdot 2} = \\dfrac{2}{4} = \\dfrac{1}{2}$ y $x_2 = \\dfrac{-3 - 5}{4} = \\dfrac{-8}{4} = -2$.',
            '<strong>Verificación de $x_1=\\frac{1}{2}$:</strong> $2(\\frac{1}{4}) + 3(\\frac{1}{2}) - 2 = \\frac{1}{2}+\\frac{3}{2}-2 = 2-2 = 0$ ✓',
          ],
          result: '$x_1 = \\dfrac{1}{2}$, $\\quad x_2 = -2$',
        },
        { type: 'heading', text: 'Relaciones de Vieta — verificación sin resolver' },
        {
          type: 'text',
          html: 'Las <strong>fórmulas de Vieta</strong> permiten verificar las raíces sin sustituir: si $x_1$ y $x_2$ son raíces de $ax^2+bx+c=0$, entonces:',
        },
        { type: 'formula', tex: 'x_1 + x_2 = -\\frac{b}{a} \\qquad x_1 \\cdot x_2 = \\frac{c}{a}' },
        {
          type: 'example',
          title: 'Verificación de Vieta para $2x^2+3x-2=0$ con $x_1=\\frac{1}{2}$, $x_2=-2$',
          problem: '$a=2$, $b=3$, $c=-2$, raíces $x_1=\\frac{1}{2}$, $x_2=-2$.',
          steps: [
            'Suma: $x_1+x_2 = \\frac{1}{2} + (-2) = -\\frac{3}{2}$. Fórmula: $-\\frac{b}{a} = -\\frac{3}{2}$ ✓',
            'Producto: $x_1 \\cdot x_2 = \\frac{1}{2}\\times(-2) = -1$. Fórmula: $\\frac{c}{a} = \\frac{-2}{2} = -1$ ✓',
          ],
          result: 'Verificación exitosa.',
        },
        {
          type: 'text',
          html: 'La parábola $y = ax^2 + bx + c$ es la representación gráfica de la ecuación cuadrática. Sus cortes con el eje $x$ son las raíces. El vértice es el punto más alto o más bajo. Explora cómo cambia la forma al variar $a$, $b$ y $c$:',
        },
        { type: 'heading', text: 'Bloque visual estándar' },
        { type: 'formula', tex: 'x=\\frac{-b\\pm\\sqrt{\\Delta}}{2a},\\;\\Delta=b^2-4ac,\\;x_v=-\\frac{b}{2a}' },
        {
          type: 'text',
          html: '<strong>Qué significa cada término:</strong> $\\Delta$ controla cuántos cruces tiene la parábola con el eje $x$; $x_v$ ubica el vértice; los valores de Bhaskara son las abscisas de intersección.',
        },
        {
          type: 'visualization',
          id: 'function-graph',
          params: { type: 'quadratic', a: 1, b: -3, c: 2 },
        },
        {
          type: 'note',
          html: 'Cuando $a > 0$ la parábola abre hacia arriba (tiene mínimo). Cuando $a < 0$ abre hacia abajo (tiene máximo). El vértice está en $x_v = -b/(2a)$.',
        },
        {
          type: 'note',
          html: 'Error visual frecuente: asumir dos raíces reales cuando la curva no corta al eje $x$ ($\\Delta<0$).',
        },
      ],
      guidedExercises: [
        {
          id: 'quad-g1',
          type: 'guided',
          difficulty: 2,
          statement: 'Resuelve $x^2 - 7x + 12 = 0$ por factorización.',
          steps: [
            { instruction: 'Busca dos números con suma $-7$ y producto $12$.', info: 'Los números son $-3$ y $-4$ porque $(-3)+(-4)=-7$ y $(-3)(-4)=12$.' },
            { instruction: 'Factoriza: $(x - 3)(x - 4) = 0$.', info: 'La ecuación se cumple si $x-3=0$ o $x-4=0$.' },
            { instruction: '¿Cuál es la raíz mayor?', answer: '4', placeholder: 'x mayor = ?' },
          ],
          explanation: '$x^2-7x+12=(x-3)(x-4)=0$, luego $x=3$ o $x=4$.',
        },
        {
          id: 'quad-g2', type: 'guided', difficulty: 3,
          statement: 'Resuelve $3x^2 - 5x - 2 = 0$ usando la fórmula general y confirma en la gráfica dónde están las raíces.',
          steps: [
            { instruction: 'Identifica $a=3$, $b=-5$, $c=-2$. Calcula el discriminante $\\Delta = b^2-4ac$.', answer: '49', placeholder: 'Δ = ?' },
            { instruction: '$\\sqrt{\\Delta} = 7$. Ahora: $x_1 = \\frac{5+7}{6} = ?$', answer: '2', placeholder: 'x₁ = ?' },
            { instruction: '$x_2 = \\frac{5-7}{6} = ?$ (escribe como fracción decimal)', answer: '-0.333', placeholder: 'x₂ = ?', tolerance: 0.01 },
          ],
          explanation: '$\\Delta = 25 + 24 = 49$. $x_1 = \\frac{12}{6} = 2$, $x_2 = \\frac{-2}{6} = -\\frac{1}{3}$.',
        },
      ],
      exercises: [
        { id: 'quad-p1', type: 'numeric', difficulty: 2, statement: 'Resuelve $x^2 - 9 = 0$. ¿Cuál es la raíz positiva?', answer: 3, explanation: '$x^2=9 \\Rightarrow x=\\pm 3$. La positiva es 3.' },
        { id: 'quad-p2', type: 'numeric', difficulty: 2, statement: 'Calcula el discriminante de $x^2 - 4x + 4 = 0$.', answer: 0, explanation: '$\\Delta = 16 - 16 = 0$ (raíz doble).' },
        {
          id: 'quad-p3', type: 'multiple-choice', difficulty: 2,
          statement: '¿Cuántas raíces reales tiene $2x^2 + x + 3 = 0$?',
          options: ['Ninguna', 'Una (doble)', 'Dos distintas', 'No se puede determinar'],
          answer: 0,
          explanation: '$\\Delta = 1 - 24 = -23 < 0$. No tiene raíces reales.',
        },
        {
          id: 'quad-p4', type: 'numeric', difficulty: 3,
          statement: 'Resuelve $x^2 + 6x + 5 = 0$. ¿Cuál es la raíz mayor?',
          answer: -1,
          hint: 'Factoriza: $(x+1)(x+5) = 0$.',
          explanation: '$(x+1)(x+5)=0 \\Rightarrow x=-1$ o $x=-5$. La mayor es $-1$.',
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────────
    // 2.3 INECUACIONES
    // ──────────────────────────────────────────────────────────────────────
    {
      id: 'inequalities',
      title: 'Inecuaciones',
      intro: 'Una inecuación es una desigualdad que contiene una incógnita. Su solución es un conjunto de valores (un intervalo en $\\mathbb{R}$) que satisfacen la desigualdad.',
      theory: [
        { type: 'heading', text: 'Propiedades de las desigualdades' },
        {
          type: 'table',
          headers: ['Propiedad', 'Descripción', 'Cuidado'],
          rows: [
            ['Suma/Resta', 'Se puede sumar/restar el mismo número a ambos lados', 'El sentido no cambia'],
            ['Multiplicación/División por positivo', 'Ambos lados se multiplican/dividen por $k > 0$', 'El sentido no cambia'],
            ['Multiplicación/División por negativo', 'Ambos lados se multiplican/dividen por $k < 0$', '⚠️ El sentido se invierte'],
          ],
        },
        { type: 'formula', tex: 'a < b \\text{ y } k < 0 \\Rightarrow ka > kb' },
        {
          type: 'example',
          title: 'Ejemplo: Resolver $3x - 7 < 5$',
          problem: '$3x - 7 < 5$',
          steps: ['$3x < 12$', '$x < 4$', 'Solución: $(-\\infty, 4)$'],
          result: '$x < 4$',
        },
        {
          type: 'example',
          title: 'Ejemplo: Resolver $-2x + 3 \\geq 9$',
          problem: '$-2x + 3 \\geq 9$',
          steps: ['$-2x \\geq 6$', 'Dividir por $-2$ (se invierte el signo): $x \\leq -3$', 'Solución: $(-\\infty, -3]$'],
          result: '$x \\leq -3$',
        },
        { type: 'heading', text: 'Bloque visual estándar' },
        { type: 'formula', tex: 'x \\lessgtr a \\quad\\Rightarrow\\quad \\text{intervalos en }\\mathbb{R}' },
        {
          type: 'text',
          html: '<strong>Qué significa cada término:</strong> el valor $a$ es frontera; el símbolo determina el lado sombreado; el punto es abierto/cerrado según estricta/no estricta.',
        },
        {
          type: 'visualization',
          id: 'inequality-interval',
          params: { relation: '<', boundary: 2 },
        },
        {
          type: 'note',
          html: 'Error típico: no invertir el símbolo al dividir o multiplicar por un número negativo.',
        },
      ],
      guidedExercises: [
        {
          id: 'ineq-g1', type: 'guided', difficulty: 2,
          statement: 'Resuelve $5 - 2x > 1$ y verifica en la visualización de intervalos que el lado sombreado coincida.',
          steps: [
            { instruction: 'Resta 5 a ambos lados.', formula: '-2x > 1 - 5 = -4' },
            {
              instruction: 'Divide por $-2$ (invierte el signo). ¿Cuál es el valor límite de $x$?',
              answer: '2',
              placeholder: 'x < ? (escribe solo el número)',
            },
          ],
          explanation: '$-2x > -4 \\Rightarrow x < 2$. Solución: $(-\\infty, 2)$.',
        },
      ],
      exercises: [
        {
          id: 'ineq-p1', type: 'multiple-choice', difficulty: 1,
          statement: 'Resuelve $2x + 5 \\leq 13$.',
          options: ['$x \\leq 4$', '$x \\geq 4$', '$x \\leq 9$', '$x < 4$'],
          answer: 0,
          explanation: '$2x \\leq 8 \\Rightarrow x \\leq 4$.',
        },
        {
          id: 'ineq-p2', type: 'multiple-choice', difficulty: 2,
          statement: 'Resuelve $-3x > 12$.',
          options: ['$x > -4$', '$x < -4$', '$x > 4$', '$x < 4$'],
          answer: 1,
          explanation: 'Dividir por $-3$ e invertir: $x < -4$.',
        },
        {
          id: 'ineq-p3', type: 'numeric', difficulty: 2,
          statement: 'Sean $x+2 > 0$ y $x-3 < 0$. ¿Cuántos enteros satisfacen ambas condiciones simultáneamente?',
          answer: 4,
          hint: 'La primera da $x > -2$ y la segunda $x < 3$. El intervalo es $(-2, 3)$.',
          explanation: 'Enteros en $(-2, 3)$: $-1, 0, 1, 2$ → 4 enteros.',
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────────
    // 2.4 POLINOMIOS
    // ──────────────────────────────────────────────────────────────────────
    {
      id: 'polynomials',
      title: 'Polinomios',
      intro: 'Un polinomio es una expresión algebraica de la forma $P(x) = a_n x^n + \\cdots + a_1 x + a_0$. Son los bloques fundamentales del álgebra.',
      theory: [
        { type: 'heading', text: 'Definición y terminología' },
        {
          type: 'definition',
          term: 'Polinomio de grado n',
          text: '$P(x) = a_n x^n + a_{n-1}x^{n-1} + \\cdots + a_1 x + a_0$ donde $a_n \\neq 0$. El <strong>grado</strong> es el mayor exponente, $n$. Los $a_i$ son los <strong>coeficientes</strong> y $a_0$ es el <strong>término independiente</strong>.',
        },
        {
          type: 'table',
          headers: ['Nombre', 'Grado', 'Ejemplo'],
          rows: [
            ['Constante (no nula)', '0', '$P(x) = 7$'],
            ['Lineal (monomio/binomio)', '1', '$P(x) = 3x - 2$'],
            ['Cuadrático', '2', '$P(x) = x^2 - x + 1$'],
            ['Cúbico', '3', '$P(x) = 2x^3 - x$'],
            ['Cuártico', '4', '$P(x) = x^4 + 5x^2 - 3$'],
          ],
        },
        {
          type: 'note',
          html: 'Un polinomio en una variable $x$ solo puede tener potencias enteras <em>no negativas</em> de $x$. Expresiones como $\\dfrac{1}{x}$ o $\\sqrt{x}$ <strong>no</strong> son polinomios.',
        },
        { type: 'heading', text: 'Valor numérico de un polinomio' },
        {
          type: 'text',
          html: 'Evaluar $P(a)$ significa sustituir $x = a$ en el polinomio. Esto es importante para verificar raíces: si $P(a) = 0$, entonces $x = a$ es una raíz.',
        },
        {
          type: 'example',
          title: 'Ejemplo: Evaluar $P(x) = x^3 - 3x + 1$ en $x = 2$',
          problem: '$P(2) = ?$',
          steps: [
            '$P(2) = 2^3 - 3(2) + 1 = 8 - 6 + 1 = 3$',
          ],
          result: '$P(2) = 3$; como $P(2) \\neq 0$, $x=2$ no es raíz.',
        },
        { type: 'heading', text: 'Operaciones entre polinomios' },
        {
          type: 'text',
          html: '<strong>Suma/Resta:</strong> se agrupan y operan los <em>términos semejantes</em> (mismo grado).',
        },
        {
          type: 'example',
          title: 'Suma: $(3x^2 - 2x + 1) + (x^2 + 5x - 4)$',
          problem: '$(3x^2 - 2x + 1) + (x^2 + 5x - 4)$',
          steps: [
            'Grado 2: $3x^2 + x^2 = 4x^2$',
            'Grado 1: $-2x + 5x = 3x$',
            'Grado 0: $1 + (-4) = -3$',
          ],
          result: '$4x^2 + 3x - 3$',
        },
        {
          type: 'text',
          html: '<strong>Multiplicación:</strong> cada término del primer polinomio multiplica a cada término del segundo (propiedad distributiva). El grado del producto es la <em>suma</em> de los grados.',
        },
        {
          type: 'example',
          title: 'Multiplicación: $(2x+3)(x-4)$',
          problem: '$(2x+3)(x-4)$',
          steps: [
            '$= 2x \\cdot x + 2x \\cdot (-4) + 3 \\cdot x + 3 \\cdot (-4)$',
            '$= 2x^2 - 8x + 3x - 12$',
            '$= 2x^2 - 5x - 12$',
          ],
          result: '$2x^2 - 5x - 12$',
        },
        { type: 'heading', text: 'Productos notables — atajos fundamentales' },
        {
          type: 'text',
          html: 'Los <strong>productos notables</strong> son multiplicaciones de polinomios tan frecuentes que se memorizan como fórmulas directas. Reconocerlos ahorra tiempo y errores.',
        },
        {
          type: 'table',
          headers: ['Nombre', 'Fórmula', 'Clave para reconocerlo'],
          rows: [
            ['Cuadrado de binomio (suma)', '$(a+b)^2 = a^2 + 2ab + b^2$', 'Dos términos elevados al cuadrado: el término del medio es $\\mathbf{2ab}$'],
            ['Cuadrado de binomio (resta)', '$(a-b)^2 = a^2 - 2ab + b^2$', 'Igual que anterior pero el medio es negativo'],
            ['Diferencia de cuadrados', '$(a+b)(a-b) = a^2 - b^2$', 'Mismo binomio con distinto signo: el resultado no tiene término central'],
            ['Cubo de binomio (suma)', '$(a+b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$', 'Coeficientes $1,3,3,1$ (fila 3 del triángulo de Pascal)'],
            ['Cubo de binomio (resta)', '$(a-b)^3 = a^3 - 3a^2b + 3ab^2 - b^3$', 'Signos alternados: $+,-,+,-$'],
          ],
        },
        {
          type: 'text',
          html: 'Interpretación geométrica clave: $(a+b)^2$ representa el área de un cuadrado de lado $(a+b)$. Al dividirlo en regiones, aparece un cuadrado $a^2$, otro $b^2$ y dos rectángulos $ab$, por eso la expansión es $a^2 + 2ab + b^2$.',
        },
        {
          type: 'visualization',
          id: 'binomial-square',
          params: { a: 4, b: 2 },
        },
        {
          type: 'example',
          title: 'Ejemplo: Reconocer y aplicar $(3x-2)^2$',
          problem: '$(3x-2)^2$',
          steps: [
            'Reconocemos el patrón $(a-b)^2$ con $a = 3x$ y $b = 2$.',
            '$a^2 = (3x)^2 = 9x^2$',
            '$2ab = 2 \\cdot 3x \\cdot 2 = 12x$',
            '$b^2 = 4$',
            'Por la fórmula: $(3x-2)^2 = 9x^2 - 12x + 4$',
          ],
          result: '$9x^2 - 12x + 4$',
        },
        {
          type: 'note',
          html: '⚠️ Error frecuente: $(a+b)^2 \\neq a^2 + b^2$. Siempre aparece el término $2ab$ del medio. Ejemplo: $(x+3)^2 = x^2 + 6x + 9$, <strong>nunca</strong> $x^2 + 9$.',
        },
        { type: 'heading', text: 'División: Regla de Ruffini' },
        {
          type: 'text',
          html: 'La <strong>Regla de Ruffini</strong> (también llamada división sintética) es un algoritmo que permite dividir eficientemente cualquier polinomio $P(x)$ entre un binomio de la forma $(x-k)$. Requiere solo sumas y multiplicaciones, sin necesidad de hacer la división larga.',
        },
        {
          type: 'definition',
          term: 'Teorema del resto',
          text: 'El resto de dividir $P(x)$ entre $(x-k)$ es igual a $P(k)$. En particular, si $P(k) = 0$, entonces $k$ es <strong>raíz</strong> de $P$ y $(x-k)$ es un <strong>factor</strong> de $P(x)$.',
        },
        {
          type: 'text',
          html: '<strong>Procedimiento de Ruffini</strong> para dividir $P(x) = a_n x^n + \\cdots + a_0$ entre $(x-k)$:<ol style="margin:.4rem 0 .4rem 1.5rem;line-height:2.1"><li>Escribe los coeficientes de $P$ en orden decreciente de grado (usa $0$ para los términos faltantes). Escribe $k$ a la izquierda.</li><li>Baja el primer coeficiente.</li><li>Multiplica ese valor por $k$ y escríbelo debajo del siguiente coeficiente.</li><li>Suma esa columna y obtienes el siguiente valor.</li><li>Repite hasta el último coeficiente. El último valor es el <strong>resto</strong>; los anteriores son los coeficientes del <strong>cociente</strong>.</li></ol>',
        },
        {
          type: 'example',
          title: 'Ejemplo detallado: Dividir $x^3 - 6x^2 + 11x - 6$ entre $(x-1)$',
          problem: '$P(x) = x^3 - 6x^2 + 11x - 6$, $\\;k = 1$.',
          steps: [
            '<strong>Coeficientes:</strong> $[\\,1,\\; -6,\\; 11,\\; -6\\,]$',
            '<strong>Tabla Ruffini:</strong>',
            '$k=1\\;\\big|\\; 1 \\quad -6 \\quad 11 \\quad -6$',
            '$\\phantom{k=1\\;\\big|}\\; \\downarrow \\quad\\;+1 \\quad -5 \\quad\\;+6$',
            '$\\phantom{k=1\\;\\big|\\;}\\overline{\\quad 1 \\quad -5 \\quad\\; 6 \\quad \\boxed{0}}$',
            '<strong>Cálculo columna a columna:</strong> Baja el $1$. Luego $1 \\times 1 = 1$, suma $-6+1=-5$. Luego $-5 \\times 1=-5$, suma $11+(-5)=6$. Luego $6 \\times 1 = 6$, suma $-6+6 = \\boxed{0}$ (resto).',
            '<strong>Cociente:</strong> $x^2 - 5x + 6$ (grado $n-1 = 2$), <strong>Resto:</strong> $0$.',
            'Como el resto es $0$, se verifica que $P(1) = 0$, o sea $x=1$ es raíz.',
          ],
          result: '$P(x) = (x-1)(x^2-5x+6) = (x-1)(x-2)(x-3)$',
        },
        {
          type: 'note',
          html: '⚠️ Si el divisor es $(x+k)$, recuerda que equivale a $(x-(-k))$, así que usas $-k$ en Ruffini. Ejemplo: dividir por $(x+3)$ significa poner $k = -3$.',
        },
        {
          type: 'example',
          title: 'Ejemplo: Detectar una raíz y factorizar completamente $P(x) = x^3 + x^2 - 4x - 4$',
          problem: '¿Es $x = 2$ raíz? Si sí, factoriza completamente.',
          steps: [
            'Aplicamos Ruffini con $k=2$ a los coeficientes $[1,\\; 1,\\; -4,\\; -4]$:',
            '$k=2\\;\\big|\\; 1 \\quad 1 \\quad -4 \\quad -4$',
            '$\\phantom{k=2\\;\\big|\\;}\\overline{\\quad 1 \\quad 3 \\quad\\;\\; 2 \\quad \\boxed{0}}$',
            'Restos $0$ ✓ → $x=2$ es raíz. Cociente: $x^2+3x+2$.',
            'Factorizamos el cociente: $x^2+3x+2 = (x+1)(x+2)$.',
          ],
          result: '$P(x) = (x-2)(x+1)(x+2)$',
        },
        {
          type: 'text',
          html: 'Conecta álgebra y gráfica: cuando $x=k$ es raíz, la curva de $P(x)$ cruza el eje $x$ en ese valor. En exámenes, este enlace ayuda a verificar si un candidato a raíz es razonable antes de aplicar Ruffini.',
        },
        { type: 'heading', text: 'Bloque visual estándar' },
        { type: 'formula', tex: 'P(k)=\\text{resto al dividir por }(x-k),\\quad P(k)=0\\Rightarrow k\\text{ es raíz}' },
        {
          type: 'text',
          html: '<strong>Qué significa cada término:</strong> los coeficientes determinan la forma de la curva; el valor $k$ es un punto en el eje $x$ que se valida con Ruffini y con el cruce gráfico.',
        },
        {
          type: 'visualization',
          id: 'function-graph',
          params: { type: 'quadratic', a: 1, b: -5, c: 6 },
        },
        {
          type: 'note',
          html: 'Error visual frecuente: confundir mínimo/máximo de la curva con raíces; solo los cortes con el eje $x$ son ceros del polinomio.',
        },
      ],
      guidedExercises: [
        {
          id: 'poly-g1', type: 'guided', difficulty: 2,
          statement: 'Expande $(x+3)^2$.',
          steps: [
            { instruction: 'Usa la fórmula $(a+b)^2 = a^2 + 2ab + b^2$ con $a=x$, $b=3$.', formula: 'x^2 + 2 \\cdot x \\cdot 3 + 3^2' },
            { instruction: '¿Cuál es el coeficiente del término central $bx$?', answer: '6', placeholder: 'coeficiente de x = ?' },
          ],
          explanation: '$(x+3)^2 = x^2 + 6x + 9$.',
        },
        {
          id: 'poly-g2', type: 'guided', difficulty: 3,
          statement: 'Usa Ruffini para verificar que $x=2$ es raíz de $P(x) = x^3 - 4x^2 + x + 6$ y relaciónalo con el cruce en el eje $x$ del visualizador.',
          steps: [
            { instruction: 'Aplica Ruffini con $k=2$ a los coeficientes $[1, -4, 1, 6]$. El primer coeficiente baja.', info: 'Multiplica cada resultado por 2 y súmalo al siguiente coeficiente.' },
            { instruction: '¿Cuál es el resto $P(2)$?', answer: '0', placeholder: 'Resto = ?' },
          ],
          explanation: '$P(2) = 8 - 16 + 2 + 6 = 0$ ✓. Ruffini da cociente $x^2 - 2x - 3$ y resto 0.',
        },
        {
          id: 'poly-g3', type: 'guided', difficulty: 3,
          statement: 'Halla $k$ para que el resto de dividir $P(x)=x^3+kx^2-4x-8$ por $(x-2)$ sea 0. Luego indica el exponente de mayor grado del cociente.',
          steps: [
            { instruction: 'Por Teorema del Resto, exige $P(2)=0$: $8 + 4k - 8 - 8 = 0$.', formula: '4k - 8 = 0' },
            { instruction: '¿Cuánto vale $k$?', answer: '2', placeholder: 'k = ?', hint: 'Despeja linealmente en $4k-8=0$.' },
            { instruction: 'Si divides un polinomio de grado 3 por $(x-2)$, ¿qué grado tiene el cociente?', answer: '2', placeholder: 'grado = ?', hint: 'El grado disminuye en 1 al dividir por un binomio lineal.' },
          ],
          explanation: 'Se impone $P(2)=0$: $8+4k-8-8=0\\Rightarrow 4k-8=0\\Rightarrow k=2$. El cociente de un grado 3 entre un lineal es de grado 2.',
        },
      ],
      exercises: [
        { id: 'poly-p1', type: 'numeric', difficulty: 1, statement: '¿Cuál es el grado de $P(x) = 5x^4 - 2x^2 + x - 7$?', answer: 4, explanation: 'El mayor exponente es 4.' },
        { id: 'poly-p2', type: 'numeric', difficulty: 2, statement: 'Calcula $P(2)$ si $P(x) = x^3 - 3x + 1$.', answer: 3, hint: '$P(2) = 8 - 6 + 1$.', explanation: '$8 - 6 + 1 = 3$.' },
        {
          id: 'poly-p3', type: 'multiple-choice', difficulty: 2,
          statement: '¿Cuál es el resultado de $(x+5)(x-5)$?',
          options: ['$x^2 + 25$', '$x^2 - 25$', '$x^2 - 10x + 25$', '$x^2 + 10x - 25$'],
          answer: 1,
          explanation: 'Diferencia de cuadrados: $(a+b)(a-b) = a^2 - b^2 = x^2 - 25$.',
        },
        {
          id: 'poly-p4', type: 'numeric', difficulty: 3,
          statement: 'Divide $P(x) = x^3 + x^2 - 4x - 4$ por $(x-2)$ usando Ruffini. ¿Cuál es el término independiente del cociente?',
          answer: 2,
          hint: 'Coeficientes: $[1, 1, -4, -4]$, $k=2$.',
          explanation: 'Ruffini: $1 \\to 3 \\to 2 \\to \\boxed{0}$. Cociente: $x^2+3x+2$, término independiente: $2$.',
        },
        {
          id: 'poly-p5', type: 'multiple-choice', difficulty: 3,
          statement: 'Si al dividir $P(x)=x^3-5x^2+kx+6$ por $(x-2)$ el resto es cero, ¿cuánto vale $k$?',
          options: ['$k=1$', '$k=2$', '$k=3$', '$k=4$'],
          answer: 2,
          optionRationales: [
            'Sustituir $x=2$ no da cero con $k=1$.',
            'Con $k=2$, $P(2)=8-20+4+6=-2$; aún no se anula.',
            'Correcto: $P(2)=8-20+2k+6=-6+2k=0\\Rightarrow k=3$.',
            'Con $k=4$, $P(2)=2$, no cumple Teorema del Resto.',
          ],
          explanation: 'Aplicando Teorema del Resto: $P(2)=0\\Rightarrow 8-20+2k+6=0\\Rightarrow -6+2k=0\\Rightarrow k=3$.',
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────────
    // 2.5 FACTORIZACIÓN
    // ──────────────────────────────────────────────────────────────────────
    {
      id: 'factorization',
      title: 'Factorización de Polinomios',
      intro: 'Factorizar un polinomio es escribirlo como producto de factores de grado menor. Es la operación inversa de expandir.',
      theory: [
        { type: 'heading', text: 'Métodos de factorización' },
        {
          type: 'table',
          headers: ['Método', 'Condición', 'Ejemplo'],
          rows: [
            ['Factor común', 'Todos los términos tienen un factor común', '$6x^2 + 9x = 3x(2x+3)$'],
            ['Diferencia de cuadrados', '$a^2 - b^2$', '$x^2-16 = (x+4)(x-4)$'],
            ['Trinomio cuadrado perfecto', '$(a \\pm b)^2$', '$x^2+6x+9=(x+3)^2$'],
            ['Trinomio $x^2+bx+c$', 'Buscar $p,q: p+q=b, pq=c$', '$x^2-5x+6=(x-2)(x-3)$'],
            ['Suma/Dif. de cubos', '$a^3\\pm b^3$', '$x^3-8=(x-2)(x^2+2x+4)$'],
          ],
        },
        {
          type: 'definition',
          term: 'Suma y diferencia de cubos',
          text: '$$a^3 + b^3 = (a+b)(a^2 - ab + b^2)$$ $$a^3 - b^3 = (a-b)(a^2 + ab + b^2)$$',
        },
        {
          type: 'example',
          title: 'Ejemplo: Factorizar $2x^3 - 8x$',
          problem: '$2x^3 - 8x$',
          steps: [
            'Factor común: $2x(x^2 - 4)$',
            'Diferencia de cuadrados: $2x(x+2)(x-2)$',
          ],
          result: '$2x(x+2)(x-2)$',
        },
        { type: 'heading', text: 'Bloque visual estándar' },
        { type: 'formula', tex: 'a^2-b^2=(a+b)(a-b),\\quad (a+b)^2=a^2+2ab+b^2,\\quad a^3+b^3=(a+b)(a^2-ab+b^2)' },
        {
          type: 'text',
          html: '<strong>Qué representa cada término:</strong> los productos notables pueden leerse como particiones de área (2D) o descomposición estructural (3D).',
        },
        {
          type: 'visualization',
          id: 'factorization-model',
          params: { mode: 'difference', a: 4, b: 2 },
        },
        {
          type: 'note',
          html: 'Error típico: confundir $a^2-b^2$ con $(a-b)^2$.',
        },
      ],
      guidedExercises: [
        {
          id: 'fact-g1', type: 'guided', difficulty: 2,
          statement: 'Factoriza $x^2 - 9$ apoyándote en el modelo visual de diferencia de cuadrados.',
          steps: [
            { instruction: 'Reconoce el patrón $a^2 - b^2 = (a+b)(a-b)$. Aquí $a = x$ y $b = ?$', answer: '3', placeholder: 'b = ?' },
            { instruction: 'Escribe la factorización: $(x+3)(x-?)$', answer: '3', placeholder: 'segundo factor = ?' },
          ],
          explanation: '$x^2 - 9 = (x+3)(x-3)$.',
        },
        {
          id: 'fact-g2', type: 'guided', difficulty: 3,
          statement: 'Factoriza $x^3 + 8$.',
          steps: [
            { instruction: 'Reconoce: $x^3 + 8 = x^3 + 2^3$. Usa la fórmula de suma de cubos con $a=x$, $b=2$.', formula: 'a^3+b^3=(a+b)(a^2-ab+b^2)' },
            { instruction: '¿Cuánto es $-ab = -x \\cdot 2$?', answer: '-2x', placeholder: '-ab = ?' },
          ],
          explanation: '$x^3+8 = (x+2)(x^2-2x+4)$.',
        },
      ],
      exercises: [
        { id: 'fact-p1', type: 'multiple-choice', difficulty: 1, statement: 'Factoriza $x^2 - 25$.', options: ['$(x-5)^2$', '$(x+5)(x-5)$', '$(x+25)(x-1)$', '$(x-5)(x+25)$'], answer: 1, explanation: 'Diferencia de cuadrados: $(x+5)(x-5)$.' },
        {
          id: 'fact-p2', type: 'multiple-choice', difficulty: 2,
          statement: 'Factoriza $x^2 + 4x + 4$.',
          options: ['$(x+2)(x-2)$', '$(x+4)(x+1)$', '$(x+2)^2$', '$(x-2)^2$'],
          answer: 2,
          explanation: 'Trinomio cuadrado perfecto: $(x+2)^2 = x^2+4x+4$.',
        },
        {
          id: 'fact-p3', type: 'multiple-choice', difficulty: 3,
          statement: 'Factoriza completamente $3x^3 - 12x$.',
          options: ['$3x(x^2-4)$', '$3x(x+2)(x-2)$', '$3(x^2-4x)$', '$x(3x^2-12)$'],
          answer: 1,
          explanation: 'Factor común $3x$: $3x(x^2-4) = 3x(x+2)(x-2)$.',
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────────
    // 2.6 FRACCIONES ALGEBRAICAS
    // ──────────────────────────────────────────────────────────────────────
    {
      id: 'algebraic-fractions',
      title: 'Fracciones Algebraicas',
      intro: 'Una fracción algebraica es un cociente de dos polinomios $\\dfrac{P(x)}{Q(x)}$ con $Q(x) \\neq 0$. Las operaciones son análogas a las de fracciones numéricas.',
      theory: [
        { type: 'heading', text: 'Conjunto de validez (C.V.)' },
        {
          type: 'definition',
          term: 'Regla obligatoria en ecuaciones racionales',
          text: 'Antes de resolver, se debe imponer $Q(x) \\neq 0$ para cada denominador. Ese conjunto de restricciones es el <strong>Conjunto de Validez</strong>.',
        },
        {
          type: 'example',
          title: 'Ejemplo: C.V. de $\\dfrac{2}{x-1} - \\dfrac{1}{x+1}$',
          problem: 'Determina el C.V. antes de operar.',
          steps: [
            'Denominador 1: $x-1 \\neq 0 \\Rightarrow x \\neq 1$.',
            'Denominador 2: $x+1 \\neq 0 \\Rightarrow x \\neq -1$.',
          ],
          result: '$C.V. = \\mathbb{R}\\setminus\\{-1,1\\}$.',
        },
        { type: 'heading', text: 'Simplificación' },
        {
          type: 'example',
          title: 'Ejemplo: Simplificar $\\frac{x^2 - 4}{x - 2}$',
          problem: '$\\dfrac{x^2 - 4}{x - 2}$',
          steps: [
            'Factoriza el numerador: $x^2-4 = (x+2)(x-2)$',
            '$\\dfrac{(x+2)(x-2)}{x-2} = x+2$ para $x \\neq 2$',
          ],
          result: '$x+2$',
        },
        { type: 'heading', text: 'Suma y resta' },
        {
          type: 'example',
          title: 'Ejemplo: $\\frac{1}{x} + \\frac{1}{x+1}$',
          problem: '$\\dfrac{1}{x} + \\dfrac{1}{x+1}$',
          steps: [
            'MCD de denominadores: $x(x+1)$',
            '$= \\dfrac{(x+1) + x}{x(x+1)} = \\dfrac{2x+1}{x(x+1)}$',
          ],
          result: '$\\dfrac{2x+1}{x(x+1)}$',
        },
        { type: 'heading', text: 'Bloque visual estándar' },
        { type: 'formula', tex: '\\frac{P(x)}{Q(x)}\\,,\\; Q(x)\\neq 0' },
        {
          type: 'text',
          html: '<strong>Qué significa cada término:</strong> los ceros del denominador son valores excluidos del C.V.; toda cancelación válida debe hacerse por factores completos.',
        },
        {
          type: 'visualization',
          id: 'rational-function',
          params: { d: 3, numShift: 4 },
        },
        {
          type: 'note',
          html: 'Error típico: cancelar términos en suma/resta en vez de factores multiplicativos.',
        },
      ],
      guidedExercises: [
        {
          id: 'alfrac-g1', type: 'guided', difficulty: 2,
          statement: 'Simplifica $\\dfrac{x^2 - x - 6}{x - 3}$ y contrasta el C.V. con la visualización de valores excluidos.',
          steps: [
            { instruction: 'Factoriza el numerador $x^2 - x - 6$. Busca dos números con suma $-1$ y producto $-6$.', info: 'Los números son $-3$ y $2$, así que $x^2-x-6 = (x-3)(x+2)$.' },
            { instruction: 'Cancela el factor $(x-3)$. El resultado es $x + ?$', answer: '2', placeholder: 'x + ?' },
          ],
          explanation: '$\\dfrac{(x-3)(x+2)}{x-3} = x+2$ para $x \\neq 3$.',
        },
        {
          id: 'alfrac-g2', type: 'guided', difficulty: 3,
          statement: 'Resuelve $\\dfrac{2}{x-1} - \\dfrac{1}{x+1} = \\dfrac{1}{3}$ indicando C.V. y la raíz mayor.',
          steps: [
            { instruction: 'Primero establece restricciones de denominador. ¿Cuántos valores quedan excluidos del C.V.?', answer: '2', placeholder: 'cantidad excluida = ?', hint: 'Anula cada denominador por separado.' },
            { instruction: 'Multiplica por $3(x-1)(x+1)$ para eliminar denominadores: $6(x+1)-3(x-1)=x^2-1$.', formula: 'x^2 - 3x - 10 = 0' },
            { instruction: 'Factoriza $x^2-3x-10=(x-5)(x+2)$. ¿Cuál es la raíz mayor válida?', answer: '5', placeholder: 'raíz mayor = ?', hint: 'Ambas raíces cumplen el C.V. porque son distintas de $\\pm1$.' },
          ],
          explanation: 'C.V.: $x\\neq\\pm1$. Al despejar: $6(x+1)-3(x-1)=x^2-1\\Rightarrow x^2-3x-10=0\\Rightarrow x=5$ o $x=-2$. Ambas son válidas; la mayor es 5.',
        },
      ],
      exercises: [
        {
          id: 'alfrac-p1', type: 'multiple-choice', difficulty: 2,
          statement: 'Simplifica $\\dfrac{2x^2 - 8}{x + 2}$.',
          options: ['$2(x-2)$', '$2x + 4$', '$x - 2$', '$2(x^2-4)/(x+2)$'],
          answer: 0,
          explanation: '$2x^2-8 = 2(x^2-4) = 2(x+2)(x-2)$. Cancela $(x+2)$: $2(x-2)$.',
        },
        {
          id: 'alfrac-p2', type: 'multiple-choice', difficulty: 3,
          statement: '¿Cuál es el resultado de $\\dfrac{1}{x-1} - \\dfrac{1}{x+1}$?',
          options: ['$\\dfrac{2}{x^2-1}$', '$\\dfrac{-2}{x^2-1}$', '$\\dfrac{2x}{x^2-1}$', '$\\dfrac{2}{x^2+1}$'],
          answer: 0,
          explanation: '$\\dfrac{(x+1)-(x-1)}{(x-1)(x+1)} = \\dfrac{2}{x^2-1}$.',
        },
        {
          id: 'alfrac-p3', type: 'multiple-choice', difficulty: 3,
          statement: 'Para $\\dfrac{x+4}{x^2-9}$, ¿cuál es el C.V. correcto?',
          options: [
            '$\\mathbb{R}\\setminus\\{-3,3\\}$',
            '$\\mathbb{R}\\setminus\\{0,3\\}$',
            '$\\mathbb{R}\\setminus\\{-9,9\\}$',
            '$\\mathbb{R}\\setminus\\{3\\}$',
          ],
          answer: 0,
          explanation: '$x^2-9=(x-3)(x+3)\\neq0\\Rightarrow x\\neq3$ y $x\\neq-3$.',
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────────
    // 2.7 PRÁCTICA DE EXAMEN
    // ──────────────────────────────────────────────────────────────────────
    {
      id: 'exam-practice',
      title: 'Práctica de Examen',
      intro: 'Simula condiciones de parcial: sin calculadora, resultados exactos y justificación de cada propiedad usada en el procedimiento.',
      theory: [
        { type: 'heading', text: 'Estructura sugerida de parcial (10 puntos)' },
        {
          type: 'table',
          headers: ['Bloque', 'Tema núcleo', 'Puntaje'],
          rows: [
            ['Ejercicio 1', 'Aritmética y potenciación con exponente $n$', '2.5'],
            ['Ejercicio 2', 'Polinomios: Teorema del Resto/Factor', '2.5'],
            ['Ejercicio 3', 'Ecuación racional + C.V.', '2.5'],
            ['Ejercicio 4', 'Modelización geométrica o porcentual multietapa', '2.5'],
          ],
        },
        {
          type: 'note',
          html: 'Checklist de examen: (1) definir C.V. cuando haya denominadores, (2) escribir propiedades usadas, (3) mantener resultados exactos, (4) verificar coherencia final.',
        },
        {
          type: 'example',
          title: 'Mini-modelo resuelto: Teorema del Resto',
          problem: 'Halla $k$ para que el resto de dividir $P(x)=x^3-3x^2+kx+6$ por $(x-2)$ sea 0.',
          steps: [
            'Por Teorema del Resto: $P(2)=0$.',
            '$P(2)=8-12+2k+6=2+2k=0$.',
            '$k=-1$.',
            'Verificación: $P(2)=8-12-2+6=0$ ✓.',
          ],
          result: '$k=-1$',
        },
        { type: 'heading', text: 'Visualización rápida para modelización de áreas' },
        {
          type: 'text',
          html: 'Usa el explorador para estimar y luego justificar algebraicamente áreas compuestas (trapecio, rombo, círculo). Primero interpreta la figura, después formula.',
        },
        {
          type: 'visualization',
          id: 'geometry-gallery',
          params: { defaultShape: 'trapezoid' },
        },
      ],
      guidedExercises: [
        {
          id: 'exam-g1', type: 'guided', difficulty: 3,
          statement: 'Simplifica $\\dfrac{x^n\\cdot x^{n+2}}{x^{2n-1}}$ usando leyes de exponentes y luego evalúa para $x=2$.',
          steps: [
            { instruction: 'Suma exponentes en el numerador y resta el del denominador.', formula: 'x^{n+n+2-(2n-1)} = x^3' },
            { instruction: '¿Cuál es el exponente final?', answer: '3', placeholder: 'exponente = ?', hint: 'Simplifica $n+n+2-(2n-1)$.' },
            { instruction: 'Evalúa para $x=2$: $2^3 = ?$', answer: '8', placeholder: 'valor = ?' },
          ],
          explanation: 'Se simplifica a $x^3$ para todo $x\\neq0$. Al evaluar en $x=2$, el valor es $8$.',
        },
        {
          id: 'exam-g2', type: 'guided', difficulty: 3,
          statement: 'Halla $k$ para que $P(x)=x^3-4x^2+kx+8$ sea divisible por $(x-2)$. Luego indica el grado del cociente.',
          steps: [
            { instruction: 'Usa Teorema del Resto: $P(2)=0$.', formula: '8-16+2k+8=0 \\Rightarrow 2k=0' },
            { instruction: '¿Cuánto vale $k$?', answer: '0', placeholder: 'k = ?' },
            { instruction: 'Si $\\deg P = 3$ y divides por un binomio lineal, ¿qué grado tiene el cociente?', answer: '2', placeholder: 'grado = ?' },
          ],
          explanation: 'Divisible por $(x-2)$ implica $P(2)=0$. De ahí $k=0$. El cociente resultante tiene grado 2.',
        },
        {
          id: 'exam-g3', type: 'guided', difficulty: 3,
          statement: 'Resuelve $\\dfrac{2}{x-1} - \\dfrac{1}{x+1} = \\dfrac{1}{3}$ indicando C.V. y cuántas soluciones válidas hay.',
          steps: [
            { instruction: 'Establece C.V. con denominadores no nulos: $x\\neq1$, $x\\neq-1$. ¿Cuántas restricciones hay?', answer: '2', placeholder: 'restricciones = ?' },
            { instruction: 'Elimina denominadores: $6(x+1)-3(x-1)=x^2-1$.', formula: 'x^2-3x-10=0' },
            { instruction: 'Factoriza y cuenta soluciones válidas.', answer: '2', placeholder: 'soluciones válidas = ?', hint: 'Raíces: $x=5$ y $x=-2$, ambas pertenecen al C.V.' },
          ],
          explanation: 'Con C.V.: $x\\neq\\pm1$. La ecuación reduce a $(x-5)(x+2)=0$, con dos soluciones válidas: $x=5$ y $x=-2$.',
        },
      ],
      exercises: [
        {
          id: 'exam-p1', type: 'numeric', difficulty: 1,
          statement: 'Simplifica $\\dfrac{a^5\\cdot a^2}{a^3}$. ¿Cuál es el exponente final de $a$?',
          answer: 4,
          explanation: '$a^{5+2-3}=a^4$.',
        },
        {
          id: 'exam-p2', type: 'multiple-choice', difficulty: 2,
          statement: 'Si $P(x)=x^2-5x+6$, ¿qué valor de $x$ hace $P(x)=0$?',
          options: ['$x=1$', '$x=2$', '$x=5$', '$x=6$'],
          answer: 1,
          explanation: '$x^2-5x+6=(x-2)(x-3)$, por lo que $x=2$ y $x=3$ son raíces. Entre opciones, solo aparece $x=2$.',
        },
        {
          id: 'exam-p3', type: 'multiple-choice', difficulty: 2,
          statement: 'En $\\dfrac{x+1}{x^2-4}$, ¿qué valores deben excluirse del C.V.?',
          options: ['$x\\neq\\pm2$', '$x\\neq\\pm4$', '$x\\neq2$', '$x\\neq0$'],
          answer: 0,
          explanation: '$x^2-4=(x-2)(x+2)\\neq0\\Rightarrow x\\neq2,-2$.',
        },
        {
          id: 'exam-p4', type: 'numeric', difficulty: 3,
          statement: 'El área de un trapecio es $A=54\\,cm^2$, con $B=12\\,cm$ y $b=6\\,cm$. Halla la altura $h$.',
          answer: 6,
          hint: 'Usa $A=\\dfrac{(B+b)h}{2}$.',
          explanation: '$54=\\dfrac{(12+6)h}{2}=9h\\Rightarrow h=6$.',
        },
        {
          id: 'exam-p5', type: 'multiple-choice', difficulty: 3,
          statement: '¿Qué afirmación es verdadera para todo entero impar $n$?',
          options: ['$n^2$ es par', '$n^2$ es impar', '$n+1$ es impar', '$2n+1$ es par'],
          answer: 1,
          optionRationales: [
            'Si $n$ es impar, $n^2$ también conserva paridad impar.',
            'Correcto: $(2k+1)^2=4k^2+4k+1=2(2k^2+2k)+1$, que es impar.',
            'Si $n$ es impar, $n+1$ es par.',
            '$2n+1$ siempre es impar, no par.',
          ],
          explanation: 'Para $n=2k+1$, se obtiene $n^2=2(2k^2+2k)+1$, forma impar.',
        },
        {
          id: 'exam-p6', type: 'numeric', difficulty: 3,
          statement: 'En un descuento sucesivo del $20\\%$ y luego $10\\%$, ¿qué porcentaje total de reducción representa sobre el precio original?',
          answer: 28,
          hint: 'Multiplica factores: precio final $=0.8\\times0.9=0.72$.',
          explanation: 'El precio final es $72\\%$ del original, por tanto la reducción total es $28\\%$.',
        },
      ],
    },
  ],
};
