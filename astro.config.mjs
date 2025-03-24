// @ts-check
import { defineConfig, passthroughImageService } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import node from '@astrojs/node';

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
  adapter: node({
    mode: 'standalone',
  }),
});