import { ArrowUpRight } from 'lucide-react'

import { site, whatIWorkOn } from '../../data/site'
import { Lines, Parallax, Reveal } from '../components/motion'

export function About() {
  return (
    <article className="mx-auto max-w-[1400px] px-5 pt-28 sm:px-8 sm:pt-36">
      <Lines as="h1" className="font-display text-balance text-[clamp(44px,7.5vw,112px)]" lines={['I build things,', 'open source']} />
      <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
        <Reveal>
          <Parallax
            src="https://avatars.githubusercontent.com/u/311342044?v=4"
            alt={site.name}
            className="aspect-[3/4] rounded-image"
            strength={6}
          />
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[14px]">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} className="link-draw inline-flex items-center gap-1 text-muted hover:text-fg" target="_blank" rel="noopener">
                  {s.label}
                  <ArrowUpRight className="size-3.5" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
        <div>
          <Reveal className="text-pretty text-[19px] leading-relaxed sm:text-[22px]">
            <p>
              I am Kebin Tong. I build things on the web and around it, mostly as side projects, and I tend to keep them public on GitHub.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-8 flex flex-col gap-5 text-[17px] leading-relaxed text-muted">
            <p>
              Most of what I ship is small: a web app, a tool, a script that solves a problem I ran into myself. I like finishing things enough to put them online, then moving on to the next idea.
            </p>
            <p>
              When I am not at the keyboard, I am usually looking for the next project to start. My current work lives on GitHub.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="mt-16">
            <h2 className="text-[14px] text-muted">What I work on</h2>
            <ul className="mt-4 space-y-5">
              {whatIWorkOn.map((item) => (
                <li key={item.title} className="space-y-2">
                  <span className="font-display text-[22px] sm:text-[26px]">{item.title}</span>
                  <p className="text-[16px] text-muted text-pretty">{item.body}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2} className="mt-16 grid grid-cols-3 gap-6">
            {[
              ['5', 'months on GitHub'],
              ['6', 'public repos'],
              ['1', 'of them has a demo'],
            ].map(([value, label]) => (
              <div key={label}>
                <p className="font-display text-[52px] leading-none sm:text-[72px]">{value}</p>
                <p className="mt-2 text-[14px] text-muted">{label}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </article>
  )
}
