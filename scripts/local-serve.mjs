// Serves the static build in dist/client with SPA fallback (no Worker routes).
// Usage: npm start [port]   (or set PORT / SITE_DIR)
import { createServer } from 'node:http'
import { createReadStream, statSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIR = resolve(process.env.SITE_DIR || resolve(__dirname, '../dist/client'))
const htmlName = 'index.html'

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.json': 'application/json',
  '.txt': 'text/plain',
}

function contentType(file) {
  const dot = file.lastIndexOf('.')
  return dot === -1 ? null : MIME[file.slice(dot).toLowerCase()] ?? null
}

function isFile(path) {
  try {
    return statSync(path).isFile()
  } catch {
    return false
  }
}

const server = createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`)
  const pathname = decodeURIComponent(url.pathname).replace(/[\\/]+$/, '')
  let full = resolve(DIR, '.' + (pathname || '/' + htmlName))

  if (!full.startsWith(DIR)) {
    res.statusCode = 403
    res.end('forbidden')
    return
  }

  if (!isFile(full)) {
    // SPA fallback: unknown routes get the app shell, missing assets get a 404
    if (pathname.startsWith('/assets/') || !isFile(resolve(DIR, htmlName))) {
      res.statusCode = 404
      res.setHeader('Content-Type', 'text/plain')
      res.end('not found')
      return
    }
    full = resolve(DIR, htmlName)
  }

  const ct = contentType(full)
  if (ct) res.setHeader('Content-Type', ct)
  createReadStream(full).pipe(res)
})

server.on('error', (e) => {
  console.error('server error', e.message || e)
  process.exit(1)
})

const port = Number(process.argv[2]) || Number(process.env.PORT) || 3000
server.listen(port, '127.0.0.1', () => {
  console.log(`serving ${DIR} at http://localhost:${port}`)
})
