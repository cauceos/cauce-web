# Cauce — Brand Guidelines
> Documento de identidad visual · v1.0 · 2025

---

## El proyecto

**Cauce** es la plataforma open source europea para construir, desplegar y escalar agentes de IA robustos. Sin vendor lock-in. Sin vende-humos. Construido sobre Spring Boot. Pensado para durar.

- **Dominio:** cauce.dev
- **Tagline:** La infraestructura por donde fluye tu IA.
- **Tono:** Técnico y directo. Sin florituras. Honesto sobre lo que está construido y lo que no.
- **Posicionamiento:** Developer-first, open source, europeo, multi-tenant, multicanal.

---

## Logo — Estrato V4

**Concepto:** Cuatro arcos concéntricos que representan la sección topográfica de un cauce de río. Es simultáneamente una C y un valle fluvial. Los arcos tienen peso variable (más fino hacia fuera, más grueso hacia dentro) y un punto teal en el nadir marca el agua.

### Especificación SVG del símbolo

```svg
<svg width="80" height="60" viewBox="0 0 80 60" fill="none">
  <!-- Arco exterior — Stone -->
  <path d="M 4 22 Q 40 72 76 22" stroke="#4A4B42" stroke-width="1.8" stroke-linecap="round"/>
  <!-- Arco 2 — Slate -->
  <path d="M 12 22 Q 40 62 68 22" stroke="#5A8CAB" stroke-width="2.4" stroke-linecap="round"/>
  <!-- Arco 3 — Moss -->
  <path d="M 20 22 Q 40 52 60 22" stroke="#6FAF82" stroke-width="3.0" stroke-linecap="round"/>
  <!-- Arco interior — Teal -->
  <path d="M 28 22 Q 40 42 52 22" stroke="#2DD4C0" stroke-width="4.0" stroke-linecap="round"/>
  <!-- Punto nadir -->
  <circle cx="40" cy="40" r="3" fill="#2DD4C0"/>
</svg>
```

### Variantes
| Variante | Uso |
|---|---|
| Dark (colores marca) | Nav, hero, footer — fondo oscuro |
| Light (colores oscuros) | Documentos, fondo claro |
| Mono teal | Fondos complejos, un solo color |
| Blanco | Merch, fondos de color, impresión |
| App icon dark 512px | GitHub, npm, Docker Hub, PWA |
| App icon teal 512px | Redes sociales |

### Reglas de uso
- Espacio de protección mínimo = altura del símbolo en todos los lados
- Tamaño mínimo = 16px de alto
- No cambiar los colores por colores arbitrarios
- No deformar ni rotar el símbolo
- El wordmark usa siempre Fraunces con "ce" en italic teal

### Wordmark
```
Cau + ce (italic, color teal)
Font: Fraunces serif
Letter-spacing: -1.5px a tamaño grande
```

---

## Paleta de colores

### Primario — Teal
| Token | HEX | Uso |
|---|---|---|
| teal-600 | #1BB8A6 | Hover de CTAs, variante light |
| teal-500 | #2DD4C0 | **Principal** — CTAs, links, highlights, indicators |
| teal-400 | #5EDDD0 | Estados hover, variantes suaves |
| teal-300 | #90E8E1 | Fondos de énfasis muy suave |

### Secundario — Moss
| Token | HEX | Uso |
|---|---|---|
| moss-600 | #3A6B4A | Variante oscura |
| moss-500 | #4E8B62 | **Principal** — Success, OSS badges, estados saludables |
| moss-400 | #6FAF82 | Hover, variantes suaves |
| moss-300 | #96C9A6 | Fondos muy suaves |

### Terciario — Slate
| Token | HEX | Uso |
|---|---|---|
| slate-600 | #3D6B8A | Variante oscura |
| slate-500 | #5A8CAB | **Principal** — Info states, diagramas, estados neutros |
| slate-400 | #8AB4CC | Hover, variantes suaves |

### Neutrales — Stone
| Token | HEX | Uso |
|---|---|---|
| stone-950 | #0E0F0D | Background principal (dark) |
| stone-900 | #161713 | Surface (cards, nav) |
| stone-800 | #252620 | Surface elevado |
| stone-700 | #35362E | Bordes pronunciados |
| stone-600 | #4A4B42 | Muted text, iconos inactivos |
| stone-400 | #8C8D82 | Placeholder, caption |
| stone-200 | #D4D5CC | Bordes en light mode |
| stone-100 | #ECEEE8 | Background light mode |

---

## Tipografía

### Display — Fraunces
- **Rol:** Títulos, hero, H1/H2/H3, wordmark del logo
- **Fuente:** Fraunces (Google Fonts, libre)
- **Uso especial:** Italic en teal para palabras de énfasis
- **Import:** `https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600`

```css
/* Escala tipográfica */
Display: 80-96px · letter-spacing: -3px · line-height: 0.98
H1:      52-64px · letter-spacing: -2px · line-height: 1.0
H2:      36-42px · letter-spacing: -1.5px · line-height: 1.05
H3:      24-28px · letter-spacing: -0.8px · line-height: 1.1
```

### Body — Geist
- **Rol:** Párrafos, UI, navegación, botones, labels
- **Fuente:** Geist (Vercel, libre)
- **Import:** `https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600`

```css
Body L:  16-18px · weight: 300 · line-height: 1.75
Body M:  14px    · weight: 400 · line-height: 1.65
UI:      13px    · weight: 500 · line-height: 1.5
Caption: 12px    · weight: 400 · line-height: 1.5
```

### Mono — JetBrains Mono
- **Rol:** Código, badges técnicos, versiones, eyebrows, métricas
- **Fuente:** JetBrains Mono (JetBrains, libre)
- **Import:** `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500`

```css
Code:    13px · line-height: 1.8
Badge:   10px · letter-spacing: 1px
Eyebrow: 10px · letter-spacing: 4px · text-transform: uppercase
```

---

## Estructura de la landing (cauce.dev)

| # | Sección | Fondo | Descripción |
|---|---|---|---|
| 01 | Nav | Dark fijo | Logo + links + CTA waitlist |
| 02 | Hero | Dark | Headline grande + tagline + 2 CTAs + stats |
| 03 | El problema | Dark | 4 pain points + quote |
| 04 | Qué es Cauce | **Light** | 3 pilares en cards blancas |
| 05 | Arquitectura | Dark | Stack en capas visual |
| 06 | Building in public | Dark | Manifesto + feed devlogs |
| 07 | Waitlist | Dark + acento teal | Email CTA |
| 08 | Footer | Dark | Logo + links + créditos |

---

## Tokens de voz

- **Tono:** Directo, técnico, sin florituras
- **Evitar:** Buzzwords vacíos, promesas sin código detrás, referencias personales específicas
- **Usar:** Datos concretos, honestidad sobre el estado del proyecto, humor seco ocasional
- **Idioma:** Español. Términos técnicos en inglés cuando sea estándar del sector.

---

## Assets generados
- `cauce-symbol-dark.svg` — símbolo solo, fondo oscuro
- `cauce-symbol-light.svg` — símbolo solo, fondo claro
- `cauce-symbol-mono.svg` — monocromo teal
- `cauce-symbol-white.svg` — blanco para fondos de color
- `cauce-lockup-dark.svg` — símbolo + wordmark, oscuro
- `cauce-lockup-light.svg` — símbolo + wordmark, claro
- `cauce-appicon-dark.svg` — app icon 512px fondo oscuro
- `cauce-appicon-teal.svg` — app icon 512px fondo teal
- `cauce-x-profile.png` — foto perfil X 400×400px
- `cauce-x-banner.png` — banner X 1500×500px
- `cauce-wallpaper-dual-3840x1080.png` — fondo dual monitor