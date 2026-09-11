// log-stats.ts — the numbers on the build log masthead.
//
// They change often, so they live here and nowhere else. The unit count is
// NOT here: it is derived from the collection so the masthead and the home
// board can never disagree.
export const logStats = {
  /** Commits on the cauce repository at the time of the last unit. */
  commits: 102,
  /** Modules with code in them, out of the total declared in the build. */
  modulesActive: 13,
  modulesTotal: 15,
  /** Tests passing on the last unit's commit. */
  tests: 953,
  /** First commit of the repository, ISO date. */
  since: '2026-05-18',
} as const;
