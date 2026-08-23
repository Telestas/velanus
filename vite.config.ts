import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

/**
 * GitHub Pages es hosting estático: solo conoce index.html, así que entrar
 * directo a /servicios o recargar esa URL daría 404. Pages sirve 404.html
 * cuando no encuentra el fichero y conserva la URL, de modo que una copia de
 * index.html hace que la SPA arranque y el router resuelva la ruta.
 */
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
    plugins: [react(), tailwindcss(), spaFallback()],
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
