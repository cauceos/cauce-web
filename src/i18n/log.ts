// log.ts — interface strings for the build log (archive page + home board).
//
// Kept apart from ui.ts on purpose: this dictionary is scanned by
// scripts/check-log-vocabulary.mjs, and ui.ts carries words elsewhere on the
// site (the problem section) that are fine there but must never appear here.
import { defaultLang, type Lang } from './ui';

export const logUi = {
  en: {
    'log.meta.title': 'Build log — Cauce',
    'log.meta.description':
      'Every unit of work that landed on Cauce, newest first, each one naming the commit that closed it and the limitation it left behind.',
    'log.back': 'Cauce',
    'log.title.pre': 'Build',
    'log.title.emphasis': 'log',
    'log.lede':
      'Every unit of work that landed, newest first, each one naming the commit that closed it and the limitation it left behind. You can check any of it against the repository instead of taking my word for it.',

    'log.stat.units': 'Units',
    'log.stat.units.sub': '{commits} commits',
    'log.stat.modules': 'Modules',
    'log.stat.modules.sub': 'of {total} · {empty} still empty',
    'log.stat.tests': 'Tests',
    'log.stat.tests.sub': 'green, 0 failures',
    'log.stat.since': 'Since',
    'log.stat.since.sub': '{year} · one person',

    'log.filter.label': 'Show',
    'log.filter.all': 'Everything',
    'log.filter.shipped': 'Shipped',
    'log.filter.decision': 'Decisions',
    'log.filter.next': 'Not built yet',

    'log.unit': 'unit',
    'log.units': 'units',
    'log.notStarted': 'not started',
    'log.tag.shipped': 'Shipped',
    'log.tag.decision': 'Decision',
    'log.tag.breaking': 'Breaking',
    'log.tag.breakingLong': 'Breaking change',
    'log.tag.next': 'Next',
    'log.end': 'First commit: {date}.',

    'board.title.pre': "What I've",
    'board.title.emphasis': 'built',
    'board.meta.chain': 'chain',
    'board.meta.last': 'last',
    'board.cta': 'Read all {n} units',
    'board.note': 'Every unit links to the commit that closed it.',
  },
  es: {
    'log.meta.title': 'Build log — Cauce',
    'log.meta.description':
      'Cada unidad de trabajo que ha aterrizado en Cauce, de la más reciente a la primera, cada una con el commit que la cerró y la limitación que dejó atrás.',
    'log.back': 'Cauce',
    'log.title.pre': 'Build',
    'log.title.emphasis': 'log',
    'log.lede':
      'Cada unidad de trabajo que ha aterrizado, de la más reciente a la primera, cada una con el commit que la cerró y la limitación que dejó atrás. Puedes contrastar cualquiera contra el repositorio en lugar de fiarte de mi palabra.',

    'log.stat.units': 'Unidades',
    'log.stat.units.sub': '{commits} commits',
    'log.stat.modules': 'Módulos',
    'log.stat.modules.sub': 'de {total} · {empty} aún vacíos',
    'log.stat.tests': 'Tests',
    'log.stat.tests.sub': 'en verde, 0 fallos',
    'log.stat.since': 'Desde',
    'log.stat.since.sub': '{year} · una persona',

    'log.filter.label': 'Mostrar',
    'log.filter.all': 'Todo',
    'log.filter.shipped': 'Entregado',
    'log.filter.decision': 'Decisiones',
    'log.filter.next': 'Sin construir',

    'log.unit': 'unidad',
    'log.units': 'unidades',
    'log.notStarted': 'sin empezar',
    'log.tag.shipped': 'Entregado',
    'log.tag.decision': 'Decisión',
    'log.tag.breaking': 'Breaking',
    'log.tag.breakingLong': 'Breaking change',
    'log.tag.next': 'Siguiente',
    'log.end': 'Primer commit: {date}.',

    'board.title.pre': 'Lo que he',
    'board.title.emphasis': 'construido',
    'board.meta.chain': 'cadena',
    'board.meta.last': 'última',
    'board.cta': 'Lee las {n} unidades',
    'board.note': 'Cada unidad enlaza al commit que la cerró.',
  },
} as const;

type LogKey = keyof (typeof logUi)[typeof defaultLang];

/** t(key, vars) — same contract as useTranslations, plus {placeholder} substitution. */
export function useLogTranslations(lang: Lang) {
  return function t(key: LogKey, vars: Record<string, string | number> = {}): string {
    const raw: string = logUi[lang][key] || logUi[defaultLang][key];
    return raw.replace(/\{(\w+)\}/g, (_, name: string) => String(vars[name] ?? `{${name}}`));
  };
}

/** "18 May" / "18 may" for the masthead, "18 May 2026" / "18 de mayo de 2026" for the footer line. */
export function formatDate(iso: string, lang: Lang, style: 'short' | 'long'): string {
  const [y, m, d] = iso.split('-').map(Number);
  const date = new Date(Date.UTC(y ?? 1970, (m ?? 1) - 1, d ?? 1));
  const locale = lang === 'es' ? 'es-ES' : 'en-GB';
  const opts: Intl.DateTimeFormatOptions =
    style === 'short'
      ? { day: 'numeric', month: 'short', timeZone: 'UTC' }
      : { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' };
  return new Intl.DateTimeFormat(locale, opts).format(date);
}
