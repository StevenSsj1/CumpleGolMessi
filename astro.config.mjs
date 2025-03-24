// @ts-check
import { defineConfig, passthroughImageService } from "astro/config";
import tailwindcss from "@tailwindcss/vite";


import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
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