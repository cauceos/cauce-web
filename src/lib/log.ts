// log.ts — read the build log collection for one language.
//
// Every consumer (the /log archive, the home board) goes through here so the
// ordering and the EN/ES parity check live in one place.
import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';
import { logChapters, type LogChapter } from '../data/log-chapters';

export type LogEntry = CollectionEntry<'log'>;

/** All units for a language, newest first (by `numero`). */
export async function getLogEntries(lang: Lang): Promise<LogEntry[]> {
  const all = await getCollection('log');
  const mine = all.filter((e) => e.data.lang === lang);

  // Both languages must describe the same set of units. A missing or extra
  // translation fails the build instead of silently shipping a shorter log.
  const numbersOf = (l: Lang) =>
    all
      .filter((e) => e.data.lang === l)
      .map((e) => e.data.numero)
      .sort((a, b) => a - b)
      .join(',');
  if (numbersOf('en') !== numbersOf('es')) {
    throw new Error(`build log: en and es do not cover the same units (en: ${numbersOf('en')} / es: ${numbersOf('es')})`);
  }
  const seen = new Set<number>();
  for (const e of mine) {
    if (seen.has(e.data.numero)) throw new Error(`build log: duplicate unit ${e.data.numero} in ${lang}`);
    seen.add(e.data.numero);
  }

  return mine.sort((a, b) => b.data.numero - a.data.numero);
}

/** Units that have landed (everything except `next`), newest first. */
export function landed(entries: LogEntry[]): LogEntry[] {
  return entries.filter((e) => e.data.tipo !== 'next');
}

/** Latest `fecha` among landed units (ISO string). */
export function lastDate(entries: LogEntry[]): string {
  return landed(entries)
    .map((e) => e.data.fecha)
    .filter((f): f is string => f !== null)
    .sort()
    .at(-1) ?? '';
}

/** Chapters (newest first) with their units attached, plus the `next` units on top. */
export function groupByChapter(entries: LogEntry[]): {
  next: LogEntry[];
  chapters: { chapter: LogChapter; entries: LogEntry[] }[];
} {
  const next = entries.filter((e) => e.data.tipo === 'next');
  const chapters = logChapters.map((chapter) => ({
    chapter,
    entries: entries.filter((e) => e.data.capitulo === chapter.slug),
  }));
  return { next, chapters };
}

/** The filter group a unit belongs to. Breaking changes count as shipped, as in the mockup. */
export function filterGroup(tipo: LogEntry['data']['tipo']): 'shipped' | 'decision' | 'next' {
  return tipo === 'breaking' ? 'shipped' : tipo;
}

export const commitUrl = (sha: string) => `https://github.com/cauceos/cauce/commit/${sha}`;
