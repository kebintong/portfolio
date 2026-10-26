export const site = {
  name: 'Kebin Tong',
  role: 'Developer',
  location: 'Philippines',
  timezone: 'Asia/Manila',
  email: 'kxvxn124@gmail.com',
  available: true,
  intro:
    'Developer building side projects and small tools, usually in JavaScript and sometimes in Python. I keep the source public and move on when something is good enough to be real.',
  socials: [
    { label: 'GitHub', href: 'https://github.com/kebintong' },
  ],
  marquee: [
    'JavaScript',
    'React',
    'Node.js',
    'Python',
    'HTML',
    'CSS',
    'Git',
    'GitHub',
    'Side projects',
    'Open source',
  ],
}

export type Project = {
  slug: string
  title: string
  subtitle: string
  summary: string
  cover: string
  /** Which part of the cover to keep when a card crops it (CSS object-position). */
  coverPosition?: string
  tint: string
  year: string
  category: string
  links: { label: string; href: string }[]
  body: string[]
}

export const projects: Project[] = [
  {
    slug: 'out-of-context',
    title: 'Out of Context',
    subtitle: 'Rage platformer dressed up as a game show',
    summary:
      'A single-player 3D rage platformer built for Windows. Fake floors, fake save points, two bosses and a host who roasts every fall. Twelve troll stages, five graphics presets and full controller support.',
    cover: '/screenshots/Out-of-context.png',
    coverPosition: '12% center',
    tint: '#22104a',
    year: '2026',
    category: 'Game',
    links: [
      { label: 'Play the trailer', href: 'https://kebintong.github.io/Out-of-context/' },
      { label: 'Source', href: 'https://github.com/kebintong/Out-of-context' },
    ],
    body: [
      'Out of Context is a 3D rage platformer built in Unity and packaged as a single Windows executable. It leans on the same playbook as classic masocore platformers — everything that looks helpful is probably a trap — and wraps it in a game-show frame with a host that talks to you the whole way through.',
      'The stage list runs from a warm-up through trap-heavy set pieces like the Checkerboard of Lies and the Comment Section, then closes on two bosses: The Algorithm and MOD.EXE. Beating the show unlocks Stage Select, Boss Rematch and a remix mode with the traps rearranged.',
      'It ships with keyboard and mouse, an Xbox or PlayStation controller, and five graphics presets from Performance to Ultra so it runs on school laptops as well as nicer machines. The release page publishes a SHA-256 checksum so the file can be verified before it is run.',
    ],
  },
  {
    slug: 'presentia',
    title: 'Presentia',
    subtitle: 'Face-check attendance for online classes',
    summary:
      'A desktop attendance app that checks who is actually in class. Students register once with a join code and a quick face check; the teacher’s app then marks them present during Google Meet, Zoom or Teams sessions.',
    cover: '/screenshots/Presentia.png',
    coverPosition: '8% center',
    tint: '#f5f7fb',
    year: '2026',
    category: 'Desktop app',
    links: [
      { label: 'Student sign-up', href: 'https://presentia.venki050524.workers.dev/' },
      { label: 'Source', href: 'https://github.com/kebintong/Presentia' },
    ],
    body: [
      'Presentia is an attendance system for online classes. Students join from the web with their class code, their student ID and a 20-second face check, and the teacher’s desktop app takes it from there.',
      'During a class the app watches the video tiles on Google Meet, Zoom or Microsoft Teams, matches faces against the class roster and moves each student between Waiting, Present and Missing. A liveness check (blinks and head turns) stops someone from holding up a photo, and unknown faces are flagged instead of guessed.',
      'Records stay on the teacher’s machine in SQLite, with time-in and time-out per session, manual Present, Late and Absent overrides, and CSV export. The desktop shell is Go with Wails and a React frontend, backed by a local Python service running InsightFace, MediaPipe and OpenCV.',
    ],
  },
  {
    slug: 'culink',
    title: 'CUlink',
    subtitle: 'Platform for Cebu university students',
    summary:
      'A free student platform for Cebu universities. Real-time private chats, a shared Knowledge Wall, random connections and instant file conversion — all in one place, with the files staying on the device.',
    cover: '/screenshots/CUlink.png',
    coverPosition: 'left center',
    tint: '#efeff3',
    year: '2026',
    category: 'Web app',
    links: [
      { label: 'Try it live', href: 'https://www.culink.me/' },
      { label: 'Source', href: 'https://github.com/Kebinnnnn1/CUlink' },
    ],
    body: [
      'CUlink is built for Cebu university students who want a single place to chat, share notes and convert files. The core pieces are real-time private messaging via Pusher, a shared Knowledge Wall for notes and study tips, random connections between students, and image conversion between JPG, PNG, WEBP and BMP in the browser.',
      'The platform tracks things like chats sent, knowledge posts and linked universities, and leans on a dark-mode-first design with a student-focused tone. There is a free account flow, a converter that never uploads files, and a Knowledge Wall where posts can be liked and commented on.',
    ],
  },
  {
    slug: 'the-gas-station',
    title: 'The Gas Station',
    subtitle: 'Unity WebGL game published to GitHub Pages',
    summary:
      'A Unity WebGL game I published to GitHub Pages. The built player runs in the browser from the repo page; this card links the source and the published build.',
    cover: '/screenshots/The-Gas-Station.png',
    coverPosition: '55% center',
    tint: '#2a2a2a',
    year: '2025',
    category: 'Game',
    links: [
      { label: 'Play in browser', href: 'https://kebinnnnn1.github.io/The-Gas-Station/' },
      { label: 'Source', href: 'https://github.com/Kebinnnnn1/The-Gas-Station' },
    ],
    body: [
      'The Gas Station is a Unity project I published as a WebGL build on GitHub Pages. The public build opens in the browser from the repo page and launches through the standard Unity WebGL player.',
      'The repo itself is the source of truth here. I have the build live so the project can be opened without cloning it, and the card links both the running player and the source.',
    ],
  },
]

export const whatIWorkOn = [
  {
    title: 'Web apps',
    body: 'Small, focused apps that do one thing well. CUlink is the clearest example so far: chat, a shared knowledge wall, random connections and file conversion in one place.',
  },
  {
    title: 'Games',
    body: 'Playable things built with Unity and shipped as Windows executables or WebGL builds. Out of Context and The Gas Station are the two I have published.',
  },
  {
    title: 'Scripts and tools',
    body: 'Tiny utilities and automation for problems I ran into myself. I keep them public on GitHub even when they are small, because the next person who needs them should not have to start from zero.',
  },
]

export function bySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function featuredSlugs(): string[] {
  return projects.map((p) => p.slug)
}
