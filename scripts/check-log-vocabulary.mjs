/**
 * Guards the language of the build log.
 *
 * The log describes what each unit of work technically does and the
 * limitation it left behind. It must never turn that into a conclusion about
 * rules, obligations or assurances the code cannot support. The backend
 * playground enforces the same rule on its audit screen
 * (code/frontend/playground/scripts/check-vocabulary.mjs); this file mirrors
 * it for the web, in both languages.
 *
 * Scope is the log content and the files that render it. The rest of the
 * site is out of scope on purpose: a repo-wide scan would catch ordinary
 * sector language elsewhere and be turned off within a week.
 *
 * The term list lives here and nowhere else, and this file excludes itself.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const TARGETS = [
  'src/content/log',
  'src/i18n/log.ts',
  'src/data/log-chapters.ts',
  'src/data/log-stats.ts',
  'src/lib/log.ts',
  'src/components/log',
  'src/components/LogPage.astro',
  'src/components/sections/BuildLog.astro',
];

// Substring matches (lowercased), like the backend guard, except where a word
// boundary is needed to avoid ordinary words ("security", "inseguro", "ilegal").
const FORBIDDEN = [
  // EN
  /compliant/, // also catches "GDPR-compliant" and "AI Act compliant"
  /gdpr/,
  /certified/,
  /guaranteed/,
  /tamper-proof/,
  /admissible/, // also catches "court-admissible"
  /\blegal\b/,
  /\bprotected\b/,
  /\bsecure\b/,
  // ES
  /rgpd/,
  /\bcertificad[oa]s?\b/,
  /\bgarantizad[oa]s?\b/,
  /a prueba de manipulaci/,
  /\badmisibles?\b/,
  /\bprotegid[oa]s?\b/,
  /\bsegur[oa]s?\b/,
];

function filesUnder(path) {
  const full = join(root, path);
  let stats;
  try {
    stats = statSync(full);
  } catch {
    return []; // not created yet
  }
  if (stats.isFile()) return [full];
  return readdirSync(full, { withFileTypes: true }).flatMap((entry) =>
    filesUnder(join(path, entry.name)),
  );
}

const hits = [];
for (const file of TARGETS.flatMap(filesUnder)) {
  const lines = readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, index) => {
    const lower = line.toLowerCase();
    for (const term of FORBIDDEN) {
      const m = lower.match(term);
      if (m) {
        hits.push({ file: relative(root, file), line: index + 1, term: m[0], text: line.trim() });
      }
    }
  });
}

if (hits.length > 0) {
  console.error('\nVocabulary check failed — the build log states a conclusion it cannot support:\n');
  for (const hit of hits) {
    console.error(`  ${hit.file}:${hit.line}  "${hit.term}"`);
    console.error(`      ${hit.text}`);
  }
  console.error(
    '\nDescribe what the unit technically does and the limitation it left behind.\n' +
      'The backend playground asserts the same rule on its audit screen.\n',
  );
  process.exit(1);
}
console.log('vocabulary ok — the build log claims nothing it cannot verify');
