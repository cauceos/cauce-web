// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://cauce.dev',
  // Astro 5 merged the old `hybrid` mode into `static`: pages stay
  // prerendered by default and individual routes opt into on-demand
  // (serverless) rendering with `export const prerender = false`.
  // Only src/pages/api/waitlist.ts runs serverless; the rest is static.
  output: 'static',
  adapter: vercel(),
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-US',
          es: 'es-ES',
        },
      },
    }),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      prefixDefaultLocale: false, // /en/ NO se prefija, queda en /
      redirectToDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
