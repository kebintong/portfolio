import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vitest'

import { bySlug, projects, site } from './site'

const publicDir = fileURLToPath(new URL('../../public/', import.meta.url))

describe('site', () => {
  it('has a valid contact email', () => {
    expect(site.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  })

  it('uses a real IANA timezone', () => {
    expect(() => new Intl.DateTimeFormat('en-GB', { timeZone: site.timezone })).not.toThrow()
  })
})

describe('projects', () => {
  it('has at least one project', () => {
    expect(projects.length).toBeGreaterThan(0)
  })

  it('has unique, URL-safe slugs', () => {
    const slugs = projects.map((p) => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
  })

  it.each(projects.map((p) => [p.title, p] as const))('%s has its required content', (_, project) => {
    expect(project.title.trim()).not.toBe('')
    expect(project.summary.trim()).not.toBe('')
    expect(project.body.length).toBeGreaterThan(0)
    expect(project.year).toMatch(/^\d{4}$/)
  })

  it.each(projects.map((p) => [p.title, p.cover] as const))('%s cover image exists in public/', (_, cover) => {
    const relative = cover.replace(import.meta.env.BASE_URL, '')
    expect(existsSync(publicDir + relative), `missing public/${relative}`).toBe(true)
  })

  it.each(projects.flatMap((p) => p.links.map((l) => [p.title, l.label, l.href] as const)))('%s link "%s" is https', (_, __, href) => {
    expect(new URL(href).protocol).toBe('https:')
  })

  it('finds a project by slug', () => {
    expect(bySlug(projects[0].slug)).toBe(projects[0])
    expect(bySlug('does-not-exist')).toBeUndefined()
  })
})
