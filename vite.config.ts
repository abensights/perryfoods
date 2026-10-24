import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';

/**
 * M4 — Build-time Content-Security-Policy injection.
 * Whitelists Google Maps, OpenStreetMap tiles, Google Fonts, Firestore, and Apps Script.
 * To remove or customize, adjust or delete this plugin.
 */
function securityHeadersPlugin(): Plugin {
  return {
    name: 'security-headers-plugin',
    apply: 'build',
    transformIndexHtml(html: string) {
      const csp = [
        "default-src 'self'",
        "script-src 'self' https://maps.googleapis.com",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com data:",
        "img-src 'self' data: blob: https: https://*.tile.openstreetmap.org https://maps.googleapis.com https://maps.gstatic.com",
        "connect-src 'self' https://*.googleapis.com https://*.firebaseio.com https://script.google.com https://script.googleusercontent.com https://nominatim.openstreetmap.org https://*.tile.openstreetmap.org",
        "frame-src 'self' https://www.google.com",
      ].join('; ');

      return html.replace(
        '<head>',
        `<head>\n    <meta http-equiv="Content-Security-Policy" content="${csp}" />`
      );
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), securityHeadersPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname || '.', '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
