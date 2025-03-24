// @ts-check
import { defineConfig, passthroughImageService } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import node from '@astrojs/node';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://StevenSsj1.github.io',
  base: 'CumpleGolRonaldoMessi',
  image: {
    service: passthroughImageService(),
  },
  vite: {
    plugins: [tailwindcss()],
    envPrefix: 'PUBLIC_'
  },
  output: 'server',
  adapter: vercel(),
});