// @ts-check
import { defineConfig, passthroughImageService } from "astro/config";
import tailwindcss from "@tailwindcss/vite";


import vercel from '@astrojs/vercel';

import alpinejs from '@astrojs/alpinejs';

import react from '@astrojs/react';

import preact from '@astrojs/preact';

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
  integrations: [alpinejs(), react({
    include: ['**/react/*'],
  }), preact()],
});