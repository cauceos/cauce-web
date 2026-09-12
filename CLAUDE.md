# CLAUDE.md — cauce-web

> Contexto completo del proyecto para Claude Code.
> **Lee este archivo entero antes de tocar cualquier cosa.**
> Versión: 2.0 · 2025

---

## 1 · Qué es este proyecto

**cauce-web** es el sitio web público de [Cauce OS](https://cauce.dev) — la plataforma open source europea para construir, desplegar y escalar agentes de IA robustos sobre Spring Boot.

Este repositorio contiene **únicamente el sitio web de marketing y documentación** (`cauce.dev`). No contiene el producto en sí (Cauce OS), que vivirá en un repositorio separado dentro de la organización `cauceos`.

### Naturaleza temporal de esta web

Esta es la **primera versión** del sitio: una landing que comunica el proyecto durante la fase de "building in public". En el futuro, cuando Cauce OS tenga producto funcional, se construirá una segunda web más completa con dashboard, documentación técnica extensa y panel de cliente. Esa web futura usará Angular + Spring Boot.

Esta web actual es **Astro estático**, optimizada para velocidad, SEO y comunicación de la propuesta de valor.

---

## 2 · Stack técnico

```
Framework:    Astro 4 + TypeScript (modo strict)
Estilos:      Tailwind CSS 4 + CSS custom properties (tokens.css)
Fuentes:      Fraunces · Geist · JetBrains Mono (Google Fonts)
Deploy:       Vercel (auto-deploy desde main)
Repo:         github.com/cauceos/cauce-web
Dominio:      cauce.dev
Node:         >=18.x
Package mgr:  pnpm (preferido) o npm
Licencia:     MIT
```

### Por qué este stack

- **Astro:** genera HTML estático por defecto. La web carga instantáneamente. Cero JS innecesario.
- **TypeScript strict:** sin atajos. Cauce es un proyecto serio desde el primer commit.
- **Tailwind CSS 4:** velocidad de desarrollo + bundle mínimo. Tokens mapeados directamente.
- **Vercel:** push y deploy automático. Gratis para open source. CDN global.

---

## 3 · Estructura del proyecto

```
cauce-web/
├── public/
│   ├── fonts/                       # Si se opta por self-hosting (opcional)
│   ├── logos/                       # SVGs del logo Estrato V4
│   │   ├── cauce-symbol-dark.svg
│   │   ├── cauce-symbol-light.svg
│   │   ├── cauce-symbol-mono.svg
│   │   ├── cauce-symbol-white.svg
│   │   ├── cauce-lockup-dark.svg
│   │   ├── cauce-lockup-light.svg
│   │   ├── cauce-appicon-dark.svg
│   │   └── cauce-appicon-teal.svg
│   ├── og-image.png                 # 1200×630 para Open Graph
│   ├── favicon.svg                  # Símbolo Estrato como favicon
│   └── robots.txt
│
├── src/
│   ├── components/
│   │   ├── Logo.astro               # Símbolo SVG inline con props
│   │   ├── Nav.astro                # Navegación fija con blur
│   │   ├── sections/
│   │   │   ├── Hero.astro
│   │   │   ├── Problema.astro
│   │   │   ├── QueEsCauce.astro     # ÚNICA sección en light
│   │   │   ├── Arquitectura.astro
│   │   │   ├── BuildingInPublic.astro
│   │   │   ├── Waitlist.astro
│   │   │   └── Footer.astro
│   │   └── ui/
│   │       ├── Button.astro         # primary / ghost
│   │       ├── Badge.astro          # teal / moss / slate / muted
│   │       ├── Eyebrow.astro        # monospace uppercase
│   │       ├── PulseDot.astro       # indicador animado
│   │       └── Section.astro        # wrapper con padding consistente
│   │
│   ├── layouts/
│   │   └── Base.astro               # HTML base, meta tags, fuentes, tokens
│   │
│   ├── pages/
│   │   └── index.astro              # Landing principal
│   │
│   ├── styles/
│   │   ├── tokens.css               # CSS custom properties
│   │   └── global.css               # Reset, utilidades, clases base
│   │
│   ├── content.config.ts            # Colección `log` (schema Zod)
│   ├── content/
│   │   └── log/
│   │       ├── en/                  # Una unidad por fichero: NN-slug.md
│   │       └── es/                  # Misma unidad, mismo nombre de fichero
│   ├── components/log/              # Piezas de /log (masthead, filtros, raíl, fila)
│   ├── components/LogPage.astro     # Página /log completa (patrón Landing)
│   ├── data/
│   │   ├── log-chapters.ts          # 12 capítulos con rango y títulos EN/ES
│   │   └── log-stats.ts             # Cifras del masthead (commits, módulos, tests, inicio)
│   ├── i18n/log.ts                  # Cadenas de interfaz del log (escaneadas por el guard)
│   └── lib/log.ts                   # Lector único de la colección
│
├── scripts/
│   └── check-log-vocabulary.mjs     # Guard de vocabulario, corre antes de `astro build`
│
├── .env.example                     # Plantilla de variables de entorno
├── .gitignore
├── CLAUDE.md                        # Este archivo
├── brand.md                         # Brand guidelines completas
├── README.md                        # Para visitantes del repo
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json                    # strict: true
└── package.json
```

---

## 4 · Identidad de marca · Logo Estrato V4

### El concepto

Cuatro arcos concéntricos que representan la sección topográfica de un cauce de río. Es simultáneamente una **C** (de Cauce) y un **valle fluvial**. Tres características clave:

1. **Pesos variables:** arco exterior fino (1.8px), arco interior grueso (4px). Crea profundidad.
2. **Punto teal en el nadir:** marca el agua del cauce. Ancla visual del símbolo.
3. **Cuatro colores específicos:** uno por cada arco, en orden semántico (roca → cielo → vegetación → agua).

### Componente Logo.astro

```astro
---
// src/components/Logo.astro
interface Props {
  size?: number
  variant?: 'dark' | 'light' | 'mono' | 'white'
}
const { size = 32, variant = 'dark' } = Astro.props

const colors = {
  dark:  ['#4A4B42', '#5A8CAB', '#6FAF82', '#2DD4C0'],
  light: ['#8C8D82', '#3D6B8A', '#3A6B4A', '#1BB8A6'],
  mono:  ['#2DD4C0', '#2DD4C0', '#2DD4C0', '#2DD4C0'],
  white: ['white',   'white',   'white',   'white'],
}
const c = colors[variant]
const dotColor = variant === 'light' ? '#1BB8A6' : (variant === 'white' ? 'white' : '#2DD4C0')
---
<svg width={size} height={size * 0.75} viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M 4 22 Q 40 72 76 22" stroke={c[0]} stroke-width="1.8" stroke-linecap="round"/>
  <path d="M 12 22 Q 40 62 68 22" stroke={c[1]} stroke-width="2.4" stroke-linecap="round"/>
  <path d="M 20 22 Q 40 52 60 22" stroke={c[2]} stroke-width="3.0" stroke-linecap="round"/>
  <path d="M 28 22 Q 40 42 52 22" stroke={c[3]} stroke-width="4.0" stroke-linecap="round"/>
  <circle cx="40" cy="40" r="3" fill={dotColor}/>
</svg>
```

### Wordmark

Siempre **Cau** + **ce** (italic, en teal). En Fraunces serif:

```astro
<span class="font-display">
  Cau<em class="italic text-teal-500">ce</em>
</span>
```

### Reglas del logo

- **SVG inline siempre.** Nunca `<img>` para el logo.
- **Tamaño mínimo:** 16px de alto. Mejor 24px+ en producción.
- **Zona de protección:** equivalente a la altura del símbolo en todos los lados.
- **No deformar, no rotar, no cambiar colores arbitrariamente.**
- **El punto teal en el nadir es obligatorio.** Sin él, no es Estrato V4.

---

## 5 · Paleta de colores

```css
/* === Teal — Primario === */
/* Color del agua, del flujo, de la acción */
--teal-300: #90E8E1   /* Fondos de énfasis muy suave */
--teal-400: #5EDDD0   /* Estados hover suaves */
--teal-500: #2DD4C0   /* PRINCIPAL — CTAs, links, highlights */
--teal-600: #1BB8A6   /* Hover de CTAs, variante light mode */

/* === Moss — Secundario === */
/* Vegetación del cauce. Salud, OSS, success */
--moss-300: #96C9A6
--moss-400: #6FAF82   /* Hover moss */
--moss-500: #4E8B62   /* PRINCIPAL — Success, OSS badges */
--moss-600: #3A6B4A

/* === Slate — Terciario === */
/* Cielo sobre el valle. Info neutral */
--slate-400: #8AB4CC
--slate-500: #5A8CAB  /* PRINCIPAL — Info, diagramas */
--slate-600: #3D6B8A

/* === Stone — Neutrales (warm-tinted) === */
/* No son grises puros. Tienen temperatura cálida-verdosa */
--stone-100: #ECEEE8  /* BG light mode (Qué es Cauce) */
--stone-200: #D4D5CC  /* Bordes light */
--stone-400: #8C8D82  /* Placeholder, caption */
--stone-600: #4A4B42  /* Muted text */
--stone-700: #35362E  /* Bordes pronunciados */
--stone-800: #252620  /* Surface elevado */
--stone-900: #161713  /* Surface / nav */
--stone-950: #0E0F0D  /* BG principal dark */

/* === Border específico === */
--border: #2E2F28
```

### Semántica de uso

| Color | Cuándo usar |
|---|---|
| **Teal** | Acciones primarias, links, indicadores en vivo, código activo, highlights de énfasis. El "esto está funcionando" del sistema. |
| **Moss** | Estados de salud, badges OSS, success messages, indicators positivos. |
| **Slate** | Información neutral, tooltips, diagramas, estados sin urgencia. El "esto es informativo, no accionable". |
| **Stone** | Todo lo estructural. Backgrounds, surfaces, bordes, textos muted. Nunca como acento. |

### Regla crítica de contraste

En la sección light (`Qué es Cauce`), el teal cambia a `--teal-600` (#1BB8A6) porque sobre fondo claro el teal-500 pierde contraste WCAG AA.

---

## 6 · Tipografía

### Las tres fuentes

| Rol | Fuente | Uso |
|---|---|---|
| **Display / Serif** | Fraunces | Títulos, hero, H1-H3, wordmark |
| **Body / Sans** | Geist | Párrafos, UI, navegación, botones |
| **Mono / Code** | JetBrains Mono | Código, badges, versiones, eyebrows |

### Imports

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Geist:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### Escala tipográfica completa

```css
/* Display (hero, momento de marca) */
font-size: clamp(52px, 7vw, 96px)
letter-spacing: -3px
line-height: 0.98

/* H1 */
font-size: clamp(40px, 5vw, 64px)
letter-spacing: -2px
line-height: 1.0

/* H2 */
font-size: clamp(28px, 3.5vw, 42px)
letter-spacing: -1.5px
line-height: 1.05

/* H3 */
font-size: clamp(20px, 2.5vw, 28px)
letter-spacing: -0.8px
line-height: 1.1

/* Body Large */
font-size: clamp(15px, 1.5vw, 18px)
font-weight: 300
line-height: 1.75

/* Body Medium */
font-size: 14px
font-weight: 400
line-height: 1.65

/* UI / Labels */
font-size: 13px
font-weight: 500

/* Caption */
font-size: 12px
font-weight: 400

/* Mono — Code */
font-size: 13px
line-height: 1.8

/* Mono — Badge */
font-size: 10px
letter-spacing: 1px

/* Mono — Eyebrow */
font-size: 10px
letter-spacing: 4px
text-transform: uppercase
```

### Uso del italic teal

El **italic en Fraunces** es la firma tipográfica de Cauce. Se aplica a **palabras clave de énfasis**, siempre en color teal-500:

```html
<h1>La infraestructura por donde <em class="italic text-teal-500">fluye</em> tu IA.</h1>
```

Reglas:
- Solo en títulos display, H1, H2 ocasionalmente
- Una sola palabra o dos máximo
- Nunca usar italic teal en cuerpo de texto

---

## 7 · Estructura de la landing

8 secciones, en este orden:

| # | Sección | Fondo | ID HTML |
|---|---|---|---|
| 01 | Nav | dark (fijo) | — |
| 02 | Hero | dark | `#inicio` |
| 03 | El problema | dark | `#problema` |
| 04 | Qué es Cauce | **light** ← excepción | `#que-es` |
| 05 | Arquitectura | dark | `#arquitectura` |
| 06 | Building in public | dark | `#bip` |
| 07 | Build log (tablón) | dark | `#log` |
| 08 | Waitlist | dark + acento teal | `#waitlist` |
| 09 | Footer | dark | — |

Además de la landing existe la página **/log** (EN) y **/es/log** (ES) con el archivo completo del build log. Ver §8b.

---

## 8 · Copy definitivo de cada sección

### 01 · Nav

```
[Logo] Cauce     [El problema] [Qué es] [Stack] [Proyecto]     [Únete a la waitlist]
```

- Logo enlaza al `#inicio`
- Links de ancla a las secciones
- CTA primario pequeño a la derecha
- Altura 64px, backdrop-blur 24px, border-bottom 1px

### 02 · Hero

```
Eyebrow:    [● pulse] OPEN SOURCE · BUILDING IN PUBLIC

H1:         La infraestructura
            por donde [fluye] tu IA.   ← "fluye" en italic teal
            "tu IA." en color muted

Body L:     Cauce es la plataforma open source europea para construir,
            desplegar y escalar agentes de IA robustos. Sin vendor
            lock-in. Sin vende-humos. Hecho para durar.

CTAs:       [Únete a la waitlist →]  [Ver el proyecto]

Stats:      Spring Boot         Multi-tenant         Open source
            Backend sólido      Desde el primer      Sin lock-in
                                commit
```

A la derecha, símbolo Estrato grande con animación `breathe` (scale 1 → 1.03 en 4s infinito).

### 03 · El problema

```
Eyebrow:  POR QUÉ EXISTE CAUCE

H2:       Hay demasiado
          [vende-humos]               ← italic teal
          en IA.                       ← muted

Pain points (grid 2 cols con quote sticky a la derecha):

  💸 Demos que no llegan a producción
     El 80% de los proyectos de agentes de IA que ves en LinkedIn
     son prototipos que nadie usa en producción. Código sin tests,
     sin multi-tenant, sin observabilidad.

  🔒 Vendor lock-in disfrazado de facilidad
     Las plataformas SaaS de agentes te cobran por mensaje, te atan
     a su LLM y desaparecen cuando pivotan. Tu negocio no puede
     depender de eso.

  🧩 Integraciones que no escalan
     WhatsApp por un lado, Telegram por otro, la API propia en un
     tercer repo. Cada canal con su lógica de negocio duplicada.
     Un infierno de mantenimiento.

  🕳️ Sin infraestructura europea de referencia
     Todo lo serio viene de EEUU, con precios en dólares, servidores
     en us-east-1 y sin pensar en GDPR. Europa necesita su propia
     infraestructura.

Quote (sticky a la derecha):

  "
  Cauce existe porque el sector lleva demasiado tiempo
  optimizando para la demo y no para la producción.

  Es hora de construir algo que [aguante de verdad].
  "
  — CAUCE OS · CAUCE.DEV
```

**CRÍTICO:** El copy del quote no debe referenciar experiencias personales del autor. Tono universal, sobre el sector.

### 04 · Qué es Cauce `LIGHT`

```
Eyebrow:  QUÉ ES CAUCE                ← teal-600 (más oscuro)

H2:       Infraestructura real.
          [No demos.]                  ← italic teal-600

Body:     Una plataforma modular que conecta tus canales, gestiona
          la memoria de tus agentes y expone todo vía API. Construida
          sobre Spring Boot, pensada para consultoras que entregan
          proyectos reales a clientes reales.

3 feature cards (blanco puro, border-top de color):

  🌊  Multicanal desde el primer día        ← border teal
      WhatsApp, Telegram, voz y web chat en un solo runtime.
      Sin duplicar lógica de negocio. Sin mantener cuatro
      integraciones por separado. El cauce recibe todos los flujos.
      [cauce-channels]

  🧠  Memoria y contexto persistente         ← border moss
      Los agentes recuerdan. Memoria por conversación, por usuario
      y por tenant. Soporte para múltiples LLMs intercambiables
      sin tocar el código del agente.
      [cauce-memory]

  🏗️  Multi-tenant y observable             ← border slate
      Diseñado para que una sola instancia sirva a muchos clientes.
      Métricas, trazas y logs integrados. Cada tenant aislado desde
      la arquitectura, no como añadido posterior.
      [cauce-core]
```

### 05 · Arquitectura

```
Eyebrow:  STACK TÉCNICO

H2:       Decisiones tomadas.
          [Sin compromiso.]            ← italic teal

Diagrama de capas (ventana de "código" con dots de macOS):

  ┌─────────────────────────────────────────────────────┐
  │ ● ● ●   cauce-os · architecture                    │
  ├─────────────────────────────────────────────────────┤
  │                                                     │
  │  CANALES    [WhatsApp] [Telegram] [Voz] [Web/API]  │   ← teal
  │                                                     │
  │  RUNTIME    [cauce-core · motor de agentes]        │   ← teal
  │                                                     │
  │  PLATAFORMA [Memoria] [Evals] [Observab.] [Multi-t]│   ← moss
  │                                                     │
  │  LLM        [Claude] [OpenAI] [Gemini] [+ más]     │   ← slate
  │                                                     │
  │  API        [cauce-api · REST + webhooks + admin]  │   ← stone
  │                                                     │
  │  ─────────────────────────────────────────────────  │
  │  STACK: [Spring Boot 3.x] [Kotlin] [Gradle]        │
  │         [PostgreSQL] [Redis] [Docker]              │
  └─────────────────────────────────────────────────────┘
```

### 06 · Building in public

```
Eyebrow:  BUILDING IN PUBLIC

H2:       Construido
          [en abierto.]                ← italic teal

Manifesto (4 puntos numerados, izquierda):

  01 · Un solo developer, desde España.
       Sin rondas de financiación, sin equipo de 20 personas,
       sin oficina en Madrid. Solo código consistente y trabajo
       honesto.

  02 · Todo el proceso, en público.
       Cada decisión técnica, cada error, cada refactorización.
       Si algo no funciona, lo digo. Si algo funciona bien,
       también.

  03 · El código es la documentación.
       Sin marketing vacío. Si quieres saber si Cauce es serio,
       abre el repo, lee el código, y saca tus propias conclusiones.

  04 · Europa necesita su infraestructura.
       GDPR, servidores en la UE, idioma español de primera clase.
       No somos un fork americano con bandera española.

[Seguir el progreso →]

Feed de devlogs (SUSTITUIDO: hoy la sección 07 · Build log lee de la
colección; este bloque queda como referencia histórica del mockup original):

  ┌──────────────────────────────────────────┐
  │ [C] Cauce OS                              │
  │     @cauce_ai · cauce.dev                 │
  ├──────────────────────────────────────────┤
  │                                           │
  │  HACE 2 DÍAS · DEVLOG #4                 │
  │  Primer canal funcionando en local.       │
  │  WhatsApp → cauce-core → respuesta en    │
  │  340ms. Mañana, memoria por usuario.     │
  │                                           │
  │  HACE 1 SEMANA · DEVLOG #3               │
  │  Decisión: 4 módulos en lugar de 10.     │
  │  Es más fácil dividir cuando duele que   │
  │  unificar cuando ya está separado.       │
  │                                           │
  │  HACE 2 SEMANAS · DEVLOG #1              │
  │  Esto empieza. He visto demasiados       │
  │  proyectos de IA que no llegan a prod.   │
  │  Cauce va a ser diferente.               │
  │                                           │
  └──────────────────────────────────────────┘
```

**CRÍTICO:** Sin referencias a "el de prácticas", a empresas concretas donde el autor haya trabajado, o a cualquier experiencia personal específica. Tono universal sobre el sector.

### 07 · Build log (tablón)

Sustituye al feed de devlogs hardcodeado que había en la columna derecha de
"Building in public". El manifiesto de esa sección pasó a rejilla 2x2.

```
H2:         What I've [built]            ← "built" en italic teal
Head-meta:  chain · 42 units · last 2026-09-11   ← derivado de la colección

Tablón:     Las TRES unidades de mayor `numero` (excluyendo `next`).
            La primera, tarjeta completa con borde encendido (.now).
            La segunda y la tercera receden (.r1, .r2): más margin-left,
            fondo más oscuro, tipo menor. Conectores verticales entre ellas.

CTA:        [Read all 42 units]  → /log      ← el 42 sale de la colección
Nota:       Every unit links to the commit that closed it.
```

Esta sección **no tiene contenido propio**: lee `src/content/log`. Ver §8b.

### 08 · Waitlist

```
Card con gradient teal sutil + border teal + glow radial.

[Logo Estrato grande, centrado]

H2:     Sé el primero en
        probar [Cauce.]              ← italic teal

Body:   Estamos construyendo en abierto. Cuando lancemos la primera
        versión pública, los de la lista serán los primeros en acceder.

Form:   [tu@email.com                    ] [Apúntame →]

Nota:   Sin spam. Solo cuando haya algo que merezca la pena.
```

### 09 · Footer

```
[Logo] Cauce  |  by Payoyo Dev          joseluisrv.dev@gmail.com · GitHub · X · cauce.dev · 2025
```

---

## 8b · Build log: la colección y cómo se publica una entrada

El build log es una **Content Collection** de Astro (`src/content.config.ts`,
colección `log`). Cada unidad de trabajo es un `.md` por idioma. La home
(tablón) y `/log` (archivo) leen de ahí; no hay copy de unidades en ningún
componente ni en `ui.ts`.

### Publicar una entrada nueva

Crear **dos ficheros** con el mismo nombre, y nada más. La home se
actualiza sola: el tablón toma las tres de mayor `numero`, el contador del
CTA y el masthead cuentan la colección.

```
src/content/log/en/44-slug-del-titulo.md
src/content/log/es/44-slug-del-titulo.md
```

```markdown
---
numero: 44
sha: "abc1234"            # commit en cauceos/cauce que CIERRA la unidad. null = sin verificar (no se pinta enlace)
fecha: "2026-09-20"       # YYYY-MM-DD. null solo si tipo es next
titulo: "Título literal"
tipo: shipped             # shipped | decision | breaking | next
modulos: ["cauce-api", "playground"]
capitulo: signatures      # slug de src/data/log-chapters.ts. null solo si tipo es next
lang: en
limite: "El límite conocido que deja la unidad. null si no hay."
---

El párrafo descriptivo. Markdown: `código` inline y *énfasis* funcionan.
```

Reglas que el build impone:

- `numero` debe caer dentro del rango del `capitulo`. Si la unidad abre un
  capítulo nuevo, añádelo primero en `src/data/log-chapters.ts` (slug,
  rango, título y periodo en EN y ES).
- EN y ES deben cubrir el mismo conjunto de `numero`. Falta una traducción
  y el build falla.
- La unidad `next` (la siguiente sin empezar) lleva `sha`, `fecha` y
  `capitulo` a `null`. Solo hay una. Cuando se cierra, se rellenan y se
  crea la siguiente `next`.
- Al cerrar una unidad, actualiza `src/data/log-stats.ts` (commits,
  módulos, tests). El total de unidades NO está ahí: se deriva.

### Vocabulario prohibido

`scripts/check-log-vocabulary.mjs` corre antes de `astro build` y falla si
aparece, en EN o ES, cualquier palabra que convierta un hecho técnico en un
veredicto sobre normas u obligaciones (compliant, GDPR, certified,
guaranteed, tamper-proof, admissible, legal, protected, secure, y sus
equivalentes en español). La lista vive solo en ese fichero, que espeja el
guard del playground del backend. Alcance: `src/content/log`, `src/i18n/log.ts`,
`src/data/log-*.ts`, `src/lib/log.ts` y los componentes del log. El resto
del sitio queda fuera a propósito.

Los **límites conocidos** no se suavizan ni se omiten: son el motivo de la
sección.

### Diseño

- Recesión del tablón por estructura (margin-left, fondo, borde, tamaño de
  tipo), no por color de texto. Todo texto con significado cumple 4.5:1
  (`--muted`); la meta no esencial (fechas, números, etiquetas) usa
  `--text-quiet` (≥3:1).
- Una sola animación de entrada orquestada, disparada una vez cuando el
  tablón entra en el viewport (`.reveal-trigger` en `Base.astro`). Solo
  opacidad y transform. `prefers-reduced-motion` la desactiva.
- El filtro de `/log` es el único JavaScript de esa página (vanilla, sin isla).
- Cada fila de `/log` tiene ancla `#u<numero>` (`/log#u42`). No hay
  permalinks por unidad ni RSS: diferidos hasta que existan permalinks.
- El SHA se pinta como enlace solo si existe.
- El adapter de Vercel falla en Windows al final del build (symlink EPERM)
  después de prerenderizar todas las páginas; en Vercel no ocurre.

---

## 9 · Componentes UI reutilizables

### Button.astro

```astro
---
interface Props {
  variant?: 'primary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  type?: 'button' | 'submit'
}
---
```

- `primary`: fondo teal, texto stone-950, hover teal-400
- `ghost`: transparente, border stone-700, hover border stone-600
- Animación hover: translateY(-1px)

### Badge.astro

```astro
---
interface Props {
  variant?: 'teal' | 'moss' | 'slate' | 'muted'
}
---
```

Font mono 10px, padding 4-12px, border-radius 100px.

### Eyebrow.astro

Monospace 10px, letter-spacing 4px, uppercase, color teal-500. Opción de pulse dot al inicio.

### PulseDot.astro

```astro
---
interface Props {
  color?: 'teal' | 'moss'
  size?: number
}
---
```

Dot circular con animación pulse + glow.

### Section.astro

Wrapper con padding consistente (120px vertical desktop, 80px mobile) y `max-width: 1160px`.

---

## 10 · Animaciones

**Cero librerías externas.** Todo CSS puro o vanilla JS mínimo.

### Lista completa

| Animación | Dónde | Implementación |
|---|---|---|
| **Scroll reveal** | Todas las secciones | `IntersectionObserver` + clases `.reveal` / `.visible` |
| **Hero breathe** | Símbolo del hero | `@keyframes breathe` — scale(1) → scale(1.03) en 4s infinite |
| **Pulse dot** | Eyebrows con dot | `@keyframes pulse` — opacity 1 → 0.3 en 2s infinite |
| **Nav blur** | Navegación fija | `backdrop-filter: blur(24px)` |
| **Hover cards** | Cards de features y pain points | Transition 200ms en background y border |
| **Btn hover** | Botones primary y ghost | translateY(-1px) + cambio de color |
| **Fade-up** | Entrada del hero al cargar | `@keyframes fadeUp` con delay escalonado |

### Reducción para usuarios sensibles

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 11 · Rendimiento

### Reglas obligatorias

- **Cero JS en cliente** salvo lo mínimo (scroll reveal, form de waitlist).
- **Fuentes:** `preconnect` a Google Fonts. Considerar `@fontsource` si Lighthouse lo pide.
- **Imágenes:** WebP/AVIF obligatorio. Usar `<Image>` de Astro.
- **Logo:** SVG inline siempre.
- **Bundle JS:** target < 30KB total comprimido.

### Objetivos Lighthouse

```
Performance:       ≥ 95
Accessibility:    100
Best Practices:   100
SEO:              100
```

### Core Web Vitals

```
LCP:   < 1.5s
CLS:    0
INP:   < 100ms
```

---

## 12 · SEO y meta tags

```astro
---
// src/layouts/Base.astro
interface Props {
  title?: string
  description?: string
  ogImage?: string
}
const {
  title = "Cauce — Infraestructura abierta para agentes de IA",
  description = "Plataforma open source europea para construir, desplegar y escalar agentes de IA robustos. Sin vendor lock-in. Construido sobre Spring Boot.",
  ogImage = "/og-image.png",
} = Astro.props
---
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{title}</title>
  <meta name="description" content={description} />

  <!-- Open Graph -->
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={ogImage} />
  <meta property="og:url" content="https://cauce.dev" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="es_ES" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@cauce_ai" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={ogImage} />

  <link rel="canonical" href={Astro.url} />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

  <!-- Fonts preconnect -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
</head>
```

---

## 13 · Tailwind config

```js
// tailwind.config.mjs
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        teal: {
          300: '#90E8E1', 400: '#5EDDD0', 500: '#2DD4C0', 600: '#1BB8A6',
        },
        moss: {
          300: '#96C9A6', 400: '#6FAF82', 500: '#4E8B62', 600: '#3A6B4A',
        },
        slate: {
          400: '#8AB4CC', 500: '#5A8CAB', 600: '#3D6B8A',
        },
        stone: {
          100: '#ECEEE8', 200: '#D4D5CC', 400: '#8C8D82',
          600: '#4A4B42', 700: '#35362E', 800: '#252620',
          900: '#161713', 950: '#0E0F0D',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body:    ['Geist', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      maxWidth: {
        content: '1160px',
      },
      letterSpacing: {
        eyebrow: '0.25em',
      },
    },
  },
}
```

---

## 14 · Convenciones de código

- **TypeScript strict mode** en todo. Sin `any`.
- **Componentes Astro** para todo lo estático. React/Svelte solo si hay interactividad real.
- **Nombres:** PascalCase para componentes, kebab-case para páginas.
- **CSS:** Tailwind primero. CSS custom properties para tokens. Evitar `@apply`.
- **Comentarios:** inglés en código, español en `CLAUDE.md` y `brand.md`.
- **Sin `console.log`** en producción.
- **Accesibilidad:** `alt` en imágenes, `aria-label` en icon buttons, contraste WCAG AA mínimo.
- **Commits:** [Conventional Commits](https://www.conventionalcommits.org/) — `feat:`, `fix:`, `chore:`, `docs:`, `style:`, `refactor:`, `perf:`.

---

## 15 · Variables de entorno

```bash
# .env.local (NO commitear)
PUBLIC_WAITLIST_ENDPOINT=        # URL del servicio de waitlist
PUBLIC_GITHUB_URL=https://github.com/cauceos
PUBLIC_X_URL=https://x.com/cauce_ai
PUBLIC_CONTACT_EMAIL=joseluisrv.dev@gmail.com
```

`.env.example` sí se commitea con los valores en blanco como plantilla.

---

## 16 · Comandos

```bash
pnpm install         # Instalar dependencias
pnpm dev             # Servidor de desarrollo (localhost:4321)
pnpm build           # Build de producción
pnpm preview         # Preview del build
pnpm astro check     # Type check
pnpm astro add       # Añadir integraciones
```

---

## 17 · Deploy

- **Plataforma:** Vercel
- **Dominio:** cauce.dev (DNS apuntando a Vercel)
- **Branch de producción:** `main`
- **Preview deploys:** automáticos en cada PR
- **Variables de entorno:** configurar en Vercel dashboard
- **Analytics:** Vercel Analytics (gratis para sitios públicos)

---

## 18 · Identidad pública y enlaces

```
Dominio principal:    cauce.dev
Email contacto:       joseluisrv.dev@gmail.com
GitHub org:           github.com/cauceos
X (Twitter):          @cauce_ai
LinkedIn:             (futuro)
```

### Assets relacionados (referencia)

- `cauce-x-profile.png` — 400×400, foto de perfil de X
- `cauce-x-banner.png` — 1500×500, banner de X
- `cauce-wallpaper-dual-3840x1080.png` — fondo de pantalla dual

---

## 19 · Lo que NO hacer

### Diseño

- No usar librerías de animación (Framer Motion, GSAP, AOS, etc.)
- No usar `<img>` para el logo — siempre SVG inline
- No romper la jerarquía tipográfica con Fraunces
- No usar el italic teal en cuerpo de texto, solo en títulos
- No cambiar la sección `Qué es Cauce` a dark — esa es la única excepción light

### Código

- No usar React/Vue salvo interactividad real que lo justifique
- No hardcodear colores HEX fuera de `tokens.css` o `tailwind.config.mjs`
- No añadir dependencias sin justificación
- No usar `any` en TypeScript
- No commitear archivos `.env.local`

### Copy

- **No referenciar experiencias personales específicas del autor.** Nada sobre "el de prácticas", nada de menciones a empresas concretas donde el autor haya trabajado. Tono universal sobre el sector.
- No usar buzzwords vacíos: "revolucionario", "potente", "innovador", "next-gen", "AI-powered"
- No prometer features que aún no están construidas como si lo estuvieran
- No usar voz pasiva cuando hay sujeto claro
- No traducir términos técnicos que en el sector se usan en inglés (LLM, API, runtime, etc.)

---

## 20 · Referencia visual definitiva

El mockup HTML completo de la landing existe como referencia visual. Al construir cada sección, respeta:

1. **La jerarquía tipográfica** con Fraunces en títulos grandes
2. **El uso del italic teal** para palabras clave de énfasis
3. **La sección "Qué es Cauce"** en fondo claro (#ECEEE8) — única excepción al dark
4. **El símbolo Estrato V4** con sus 4 colores y pesos variables + punto teal
5. **Los neutrales Stone** con temperatura cálida-verdosa (NO grises puros)
6. **El grain overlay** muy sutil sobre el dark theme
7. **Los glows ambientales** teal y moss en hero y waitlist
8. **El backdrop blur** del nav fijo

---

## 21 · Orden de construcción recomendado

Un commit por hito:

```
01. chore: project setup (Astro + TS + Tailwind + tokens)
02. feat: base layout with meta tags, fonts and global styles
03. feat: Logo component with all variants
04. feat: UI primitives (Button, Badge, Eyebrow, PulseDot, Section)
05. feat: Nav with blur and links
06. feat: Hero section with breathe animation
07. feat: Problema section with sticky quote
08. feat: QueEsCauce section (light theme)
09. feat: Arquitectura section with stack diagram
10. feat: BuildingInPublic section with devlogs feed
11. feat: Waitlist section with form
12. feat: Footer
13. feat: scroll reveal animations
14. perf: image optimization, font preloading
15. chore: SEO meta tags and OG image
16. chore: Vercel deploy config
17. docs: update README with status and screenshots
```

---

*cauce-web · cauceos · cauce.dev · 2025*
*Plataforma open source europea para agentes de IA*