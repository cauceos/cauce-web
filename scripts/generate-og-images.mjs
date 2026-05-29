// Generate per-locale Open Graph images (1200x630) for cauce.dev.
// Composes an SVG with the Estrato V4 symbol + brand typography and
// renders it to PNG via sharp. Fonts are embedded as base64 @font-face
// data URIs (librsvg honours these), so the result is reproducible on any
// machine without the fonts installed system-wide.
//
// Run with: pnpm node scripts/generate-og-images.mjs
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');
const fontsDir = path.join(__dirname, 'og-fonts');

const WIDTH = 1200;
const HEIGHT = 630;

// Brand tokens
const BG = '#0E0F0D'; // stone-950
const TEXT = '#ECEEE8'; // stone-100
const MUTED = '#8C8D82'; // stone-400
const TEAL = '#2DD4C0'; // teal-500

const fontFace = (family, style, buf) =>
  `@font-face{font-family:'${family}';font-style:${style};src:url(data:font/ttf;base64,${buf.toString(
    'base64'
  )}) format('truetype');}`;

// Estrato V4 symbol — same paths/colors as public/favicon.svg (dark variant).
// viewBox is 0 0 80 60; scaled 2.5x and placed 80px from the top-left edge.
const SYMBOL = `
  <g transform="translate(80,80) scale(2.5)">
    <path d="M 4 22 Q 40 72 76 22" stroke="#4A4B42" stroke-width="1.8" stroke-linecap="round" fill="none"/>
    <path d="M 12 22 Q 40 62 68 22" stroke="#5A8CAB" stroke-width="2.4" stroke-linecap="round" fill="none"/>
    <path d="M 20 22 Q 40 52 60 22" stroke="#6FAF82" stroke-width="3.0" stroke-linecap="round" fill="none"/>
    <path d="M 28 22 Q 40 42 52 22" stroke="#2DD4C0" stroke-width="4.0" stroke-linecap="round" fill="none"/>
    <circle cx="40" cy="40" r="3" fill="#2DD4C0"/>
  </g>`;

// Per-locale copy. The tagline is split into two manual lines, with the
// emphasis word in italic teal (the brand's italic-teal signature rule).
const LOCALES = {
  en: {
    file: 'og-image-en.png',
    eyebrow: 'OPEN SOURCE · BUILT IN PUBLIC · 2026',
    tagline: [
      [{ t: 'Open infrastructure' }],
      [{ t: 'for AI ' }, { t: 'agents', em: true }, { t: '.' }],
    ],
  },
  es: {
    file: 'og-image-es.png',
    eyebrow: 'OPEN SOURCE · BUILT IN PUBLIC · 2026',
    tagline: [
      [{ t: 'Infraestructura abierta' }],
      [{ t: 'para ' }, { t: 'agentes', em: true }, { t: ' de IA.' }],
    ],
  },
};

// Build the tspans for one tagline line.
const taglineLine = (parts) =>
  parts
    .map((p) =>
      p.em
        ? `<tspan font-style="italic" fill="${TEAL}">${p.t}</tspan>`
        : `<tspan>${p.t}</tspan>`
    )
    .join('');

function buildSvg(locale, css) {
  const [line1, line2] = locale.tagline;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs><style>${css}</style></defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${BG}"/>
  ${SYMBOL}
  <text x="${WIDTH - 80}" y="108" text-anchor="end" font-family="JBMono" font-size="14" letter-spacing="2" fill="${MUTED}">${locale.eyebrow}</text>
  <text x="80" y="362" font-family="Fraunces" font-size="96" fill="${TEXT}">Cau<tspan font-style="italic" fill="${TEAL}">ce</tspan></text>
  <text x="80" y="462" xml:space="preserve" font-family="Fraunces" font-size="56" fill="${TEXT}">${taglineLine(line1)}</text>
  <text x="80" y="526" xml:space="preserve" font-family="Fraunces" font-size="56" fill="${TEXT}">${taglineLine(line2)}</text>
</svg>`;
}

async function main() {
  console.log('Generating OG images…');

  const [frRegular, frItalic, jbMono] = await Promise.all([
    readFile(path.join(fontsDir, 'Fraunces-SemiBold.ttf')),
    readFile(path.join(fontsDir, 'Fraunces-SemiBoldItalic.ttf')),
    readFile(path.join(fontsDir, 'JetBrainsMono-Medium.ttf')),
  ]);

  const css = [
    fontFace('Fraunces', 'normal', frRegular),
    fontFace('Fraunces', 'italic', frItalic),
    fontFace('JBMono', 'normal', jbMono),
  ].join('');

  for (const locale of Object.values(LOCALES)) {
    const svg = buildSvg(locale, css);
    await sharp(Buffer.from(svg)).png().toFile(path.join(publicDir, locale.file));
    console.log(`  ✓ ${locale.file} (${WIDTH}×${HEIGHT})`);
  }

  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
