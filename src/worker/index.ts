import { Hono } from 'hono'

type Env = { ASSETS: Fetcher }

const app = new Hono<{ Bindings: Env }>()

app.get('/api/health', (c) => c.json({ ok: true }))

// Contact form endpoint. Not wired to the frontend yet; it only validates
// and acknowledges. Forward to an email API (key via `wrangler secret put`)
// or store in D1 when it's needed.
app.post('/api/contact', async (c) => {
  const body = await c.req.json<{ name?: string; email?: string; message?: string }>().catch(() => ({}) as Record<string, string>)
  if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) return c.json({ error: 'Enter a valid email address.' }, 400)
  if (!body.message?.trim()) return c.json({ error: 'Write a few words about the project.' }, 400)
  return c.json({ ok: true })
})

app.all('*', (c) => c.env.ASSETS.fetch(c.req.raw))

export default app
