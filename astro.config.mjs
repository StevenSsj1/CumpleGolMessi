// @ts-check
import { defineConfig, passthroughImageService } from "astro/config";
import tailwindcss from "@tailwindcss/vite";


import vercel from '@astrojs/vercel';

import alpinejs from '@astrojs/alpinejs';

// https://astro.build/config
export default defineConfig({
  image: {
    service: passthroughImageService(),
  },

  vite: {
    plugins: [tailwindcss()],
    envPrefix: 'PUBLIC_'
  },
  experimental: {
    svg:{
      mode: 'sprite'
    }
  },
  output: 'server',
  adapter: vercel(),
  integrations: [alpinejs()],
});