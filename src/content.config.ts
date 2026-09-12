import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { logChapters, logChapterSlugs } from './data/log-chapters';

// One file per unit of work and per language: src/content/log/<lang>/NN-slug.md
// The markdown body is the descriptive paragraph. The known limitation goes in
// `limite`, not in the body, because it renders with its own treatment.
const log = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/log' }),
  schema: z
    .object({
      /** Sort key, descending. */
      numero: z.number().int().positive(),
      /** Abbreviated commit on cauceos/cauce. null = not verified yet; no link is rendered. */
      sha: z
        .string()
        .regex(/^[0-9a-f]{7,40}$/, 'sha must be a lowercase hex commit id')
        .nullable(),
      /** YYYY-MM-DD. null only for `next`. */
      fecha: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'fecha must be YYYY-MM-DD')
        .nullable(),
      titulo: z.string().min(1),
      tipo: z.enum(['shipped', 'decision', 'breaking', 'next']),
      modulos: z.array(z.string().min(1)).min(1),
      /** Chapter slug from src/data/log-chapters.ts. null only for `next`. */
      capitulo: z.enum(logChapterSlugs).nullable(),
      lang: z.enum(['en', 'es']),
      limite: z.string().min(1).nullable(),
    })
    .superRefine((e, ctx) => {
      if (e.tipo === 'next') {
        if (e.sha !== null || e.fecha !== null || e.capitulo !== null) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'a `next` unit has no sha, fecha or capitulo (all must be null)',
          });
        }
        return;
      }
      if (e.fecha === null || e.capitulo === null) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'a landed unit needs a fecha and a capitulo',
        });
        return;
      }
      const chapter = logChapters.find((c) => c.slug === e.capitulo);
      if (chapter && (e.numero < chapter.from || e.numero > chapter.to)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `unit ${e.numero} is outside chapter "${chapter.slug}" (${chapter.from}–${chapter.to})`,
        });
      }
    }),
});

export const collections = { log };
