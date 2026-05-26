// Generate favicon PNGs and .ico from public/favicon.svg.
// Run with: pnpm node scripts/generate-favicons.mjs
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, '..', 'public');
const svgPath = path.join(publicDir, 'favicon.svg');

// The Estrato symbol uses viewBox 0 0 80 60 (4:3). To produce square
// icons we centre that art on a transparent square canvas of the target
// size; the symbol fills the width and sits vertically centred.
async function renderSquare(size, outFile) {
  const svg = await readFile(svgPath);
  const symbol = await sharp(svg, { density: 384 })
    .resize({ width: size, height: Math.round(size * 0.75), fit: 'contain' })
    .png()
    .toBuffer();

  const top = Math.round((size - Math.round(size * 0.75)) / 2);
  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: symbol, top, left: 0 }])
    .png()
    .toFile(path.join(publicDir, outFile));

  console.log(`  ✓ ${outFile}`);
}

async function main() {
  console.log('Generating favicons from public/favicon.svg…');

  await renderSquare(16, 'favicon-16x16.png');
  await renderSquare(32, 'favicon-32x32.png');
  await renderSquare(48, 'favicon-48x48.png');
  await renderSquare(180, 'apple-touch-icon.png');
  await renderSquare(192, 'android-chrome-192x192.png');
  await renderSquare(512, 'android-chrome-512x512.png');

  // Multi-resolution .ico for legacy support (Google search results, IE).
  const icoBuffer = await pngToIco([
    path.join(publicDir, 'favicon-16x16.png'),
    path.join(publicDir, 'favicon-32x32.png'),
    path.join(publicDir, 'favicon-48x48.png'),
  ]);
  await writeFile(path.join(publicDir, 'favicon.ico'), icoBuffer);
  console.log('  ✓ favicon.ico (16/32/48)');

  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
