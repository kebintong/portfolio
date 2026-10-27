import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

/** GitHub Pages serves 404.html for unknown paths; make it the app shell so deep links work. */
function spaFallback(): Plugin {
  return {
    name: 'spa-fallback-404',
    apply: 'build',
    enforce: 'post',
    generateBundle(_, bundle) {
      const html = bundle['index.html']
      if (html?.type === 'asset') this.emitFile({ type: 'asset', fileName: '404.html', source: html.source })
    },
  }
}

// The site is published at https://kebintong.github.io/portfolio/, so production
// builds live under /portfolio/. The dev server stays at the root.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/portfolio/' : '/',
  plugins: [react(), tailwindcss(), spaFallback()],
  server: { port: 5173, strictPort: false },
}))
