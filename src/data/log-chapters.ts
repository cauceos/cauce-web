// log-chapters.ts — the chapters of the build log.
//
// A plain data file rather than a second content collection: eleven-ish
// records with no body, whose EN and ES labels live on the same line so the
// unit ranges cannot drift between languages. The collection schema derives
// its `capitulo` enum from these slugs, so an unknown chapter fails the build.
import type { Lang } from '../i18n/ui';

export interface LogChapter {
  slug: string;
  /** Inclusive unit range, ascending. */
  from: number;
  to: number;
  title: Record<Lang, string>;
  /** Free-text period shown next to the range ("September", "18–21 May"). */
  period: Record<Lang, string>;
}

// Newest first, matching the order the archive renders them in.
export const logChapters: readonly LogChapter[] = [
  {
    slug: 'signatures',
    from: 39,
    to: 42,
    title: { en: 'Signatures', es: 'Firmas' },
    period: { en: 'September', es: 'Septiembre' },
  },
  {
    slug: 'playground',
    from: 31,
    to: 38,
    title: { en: 'A window into the machine', es: 'Una ventana a la máquina' },
    period: { en: 'August to September', es: 'De agosto a septiembre' },
  },
  {
    slug: 'chain',
    from: 26,
    to: 30,
    title: { en: 'The chain', es: 'La cadena' },
    period: { en: 'July to August', es: 'De julio a agosto' },
  },
  {
    slug: 'operability',
    from: 22,
    to: 25,
    title: { en: 'Made operable', es: 'Puesto a punto' },
    period: { en: 'July', es: 'Julio' },
  },
  {
    slug: 'channels',
    from: 20,
    to: 21,
    title: { en: 'Out into the world', es: 'Hacia el mundo' },
    period: { en: 'July', es: 'Julio' },
  },
  {
    slug: 'hardening',
    from: 17,
    to: 19,
    title: { en: 'Making it hold', es: 'Que aguante' },
    period: { en: 'July', es: 'Julio' },
  },
  {
    slug: 'agent',
    from: 14,
    to: 16,
    title: { en: 'It stopped being a chatbot', es: 'Dejó de ser un chatbot' },
    period: { en: '13 June', es: '13 de junio' },
  },
  {
    slug: 'public-loop',
    from: 11,
    to: 13,
    title: { en: 'The loop goes public', es: 'El bucle se hace público' },
    period: { en: 'June', es: 'Junio' },
  },
  {
    slug: 'access',
    from: 7,
    to: 10,
    title: { en: 'Who is allowed in', es: 'Quién puede entrar' },
    period: { en: 'May to June', es: 'De mayo a junio' },
  },
  {
    slug: 'engine',
    from: 5,
    to: 6,
    title: { en: 'The engine', es: 'El motor' },
    period: { en: 'May', es: 'Mayo' },
  },
  {
    slug: 'isolation',
    from: 3,
    to: 4,
    title: { en: 'Isolation, in the database', es: 'Aislamiento, en la base de datos' },
    period: { en: 'May', es: 'Mayo' },
  },
  {
    slug: 'foundations',
    from: 1,
    to: 2,
    title: { en: 'Before any code', es: 'Antes de cualquier código' },
    period: { en: '18–21 May', es: '18–21 de mayo' },
  },
] as const;

export const logChapterSlugs = logChapters.map((c) => c.slug) as [string, ...string[]];
