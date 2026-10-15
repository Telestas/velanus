import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

/** GitHub Pages needs a 404.html copy to load the SPA on direct navigation. */
const spaFallback = (): Plugin => ({
  name: 'spa-404-fallback',
  closeBundle() {
    const dist = path.resolve(__dirname, 'dist');
    fs.copyFileSync(path.join(dist, 'index.html'), path.join(dist, '404.html'));
  },
});

export default defineConfig(() => {
  return {
    // Dominio propio velanus.com (public/CNAME): el sitio se sirve en la raíz.
    // Volver a '/velanus/' si se quitara el dominio y se usara telestas.github.io.
    base: '/',
    // Cloudflare Pages serves index.html for unknown paths when 404.html is absent.
    plugins: [react(), tailwindcss(), ...(process.env.DEPLOY_TARGET === 'cloudflare' ? [] : [spaFallback()])],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
