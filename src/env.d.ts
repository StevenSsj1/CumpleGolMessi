/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />
/// <reference path="../.astro/types/astro-env.d.ts" />

interface ImportMetaEnv {
    readonly PUBLIC_MAGIC_LOOPS: string;
    readonly PUBLIC_URL_MESSI_DATA: string;
    readonly PUBLIC_URL_CRISTIANO_DATA: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }