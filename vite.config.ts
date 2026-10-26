import { cloudflare } from '@cloudflare/vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

// `vite build --mode pages` builds a plain static site for
// https://kebintong.github.io/portfolio/ (served under /portfolio/, no Worker).
// Every other mode builds for Cloudflare Workers.

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

export default defineConfig(({ mode }) => {
  const pages = mode === 'pages'
  return {
    base: pages ? '/portfolio/' : '/',
    plugins: pages ? [react(), tailwindcss(), spaFallback()] : [react(), tailwindcss(), cloudflare()],
    server: { port: 5173, strictPort: false },
  }
})
