# Digital Creatives

A website for Digital Creatives — a digital agency building affordable websites for small businesses (barbers, restaurants, plumbers, salons) in South Africa.

## Folder structure

```
digital-creatives/
├── index.html          Main page — nav, hero, marquee, about, portfolio, services, CTA, footer
├── css/
│   └── style.css        All styling (tokens, layout, animations)
└── js/
    ├── app.js            Mobile nav toggle + scroll-reveal animations
    └── gallery3d.js       Interactive 3D panel gallery in the hero (drag to rotate)
```

## How to open it

No build step, no install, no server required. Just double-click `index.html`
and it opens in your browser.

Everything is self-contained — plain HTML, CSS, and vanilla JavaScript. The
only external requests the page makes are to Google Fonts (Bricolage
Grotesque, Work Sans, IBM Plex Mono) for typography. If you're offline, the
page will still work, just with fallback system fonts instead.

## What's on the page

- **Hero** — headline, CTA buttons, and a drag-to-rotate 3D panel gallery
  showing the three featured projects (Urban Cut, Kasi Kitchen, ProFix).
  Built with pure CSS 3D transforms — no external library, so it can't fail
  to load like a CDN-dependent version could.
- **Marquee** — a scrolling strip of the business types served.
- **About** — short agency description.
- **Portfolio** — three concept project cards (Urban Cut, Kasi Kitchen,
  ProFix). These are demo/concept pieces used to show design range — not
  live client sites.
- **Services** — the four services offered (Business Websites, Landing
  Pages, Website Maintenance, Custom Web Solutions).
- **CTA + WhatsApp button** — currently point to placeholder links (`#`).
  Update these once you have a real booking flow or contact number wired up.

## Design system

Colors, fonts, and spacing are defined as CSS custom properties at the top
of `style.css` (the `:root` block) — change a value there and it updates
everywhere it's used.

| Token | Current value | Used for |
|---|---|---|
| `--bg` | `#0D0D0D` | Page background |
| `--paper` | `#F5F5F5` | Card backgrounds |
| `--mustard` | `#FF4B2B` | Primary accent (buttons, highlights) — name is legacy from an earlier palette |
| `--rust` | `#B8291C` | Darker accent / hover states |
| `--teal` | `#C4FF00` | Volt-green secondary accent |

Note: the variable names `--mustard`, `--rust`, and `--teal` don't match
their current colors — they were renamed in value but not in name during a
palette change. Harmless, but worth cleaning up if someone else picks up
this codebase later.

## Known placeholders / things to finish before this goes live

- [ ] Real project links on portfolio cards (currently `#`)
- [ ] Real WhatsApp number on the floating WhatsApp button
- [ ] Contact form or real destination for the "Get Free Quote" buttons
- [ ] Replace `images/barber.jpg`, `images/restaurant.jpg`,
      `images/plumber.jpg` if these were placeholder images