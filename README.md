# Vivek Poddar — Portfolio

Live: https://poddar-vivek-github-io.vercel.app/

A portfolio told as a story in chapters: an electronics engineer who taught himself data, ML, product
thinking and UI/UX — and shipped live products in edtech, fintech and healthtech.

Plain HTML, CSS and vanilla JS. No build step, no npm.

## The story

| Chapter | What happens | Technique |
| --- | --- | --- |
| Prologue — *The hook* | "In 2022, I was wiring ~~circuits~~. Now I design *products* people use." | Before/after contrast, reading-time promise, "skip to the work" for busy readers |
| 01 — *The detour* | Why he left pure electronics | Paragraph that lights up word by word as you scroll |
| 02 — *The learning curve* | One new skill per year, each with its proof | Pinned sideways scroll; cards climb and a lime curve draws itself |
| Score | 3 live products, 3 industries, 15+ projects… | Count-up numbers |
| 03 — *The proof* | Maitry Finance, ClinicAI, a coaching institute website | Live previews: hover to scroll through the real page, click to open it |
| 04 — *The workbench* | Data, ML, product docs, hardware | Filters + clickable toolkit |
| 05 — *The person* | About, how he learns, experience, education, certificates | Proof thumbnails open in a viewer |
| 06 — *Face an over* | Interview questions as six deliveries per over | A ball runs down the pitch, the answer arrives as commentary, the scoreboard ticks up; visitors can bowl their own question |
| 07 — *Yours* | Contact | Brief builder that drafts an email |

A fixed header shows the current chapter, a reading-progress bar and the theme switch.

**Two themes:** *Floodlights* (default dark: ink, lime, lilac) and *Test whites* (cream flannel, cricket-ball red,
pitch green). The switch wipes the new theme in as a circle from the button (View Transitions API), remembers the
choice, and follows the OS light/dark setting on a first visit.

## Files

```
index.html            page markup
assets/data.js        ← EDIT ZONE: all content
assets/site.js        rendering + interactions
assets/site.css       design system (dark · Instrument Serif · Geist · lime)
assets/motion.css     motion layer: hero art, aurora, word reveals, 3D screen tilt
assets/motion.js      smooth scroll (Lenis via CDN), glass product card, theme switch
assets/over.css       Chapter 06 pitch + scoreboard, theme toggle, Test whites tuning
assets/img/           photos, certificates and live-site screenshots (live-*.jpg)
assets/Vivek_Poddar_Resume.pdf
og-image.png          social share card (source: src/og.html)
```

## Editing content

Everything renders from `assets/data.js`:

- `CURVE` — the learning-curve steps (oldest → newest)
- `LIVE` — live products; `img` is a screenshot in `assets/img/`, `tall: true` makes it scroll on hover
- `BUILDS`, `TOOLKIT` — workbench projects and the clickable toolkit
- `EXPERIENCE`, `EDUCATION`, `CERTS`, `BEYOND` — `proofs` point at images in `assets/img/`
- `QNA` — interview answers; every six make one over; `k` is the list of keywords used to match typed questions

To refresh a live-site screenshot, capture the site at 1280px wide (tall captures for scrolling previews) and
overwrite the matching `assets/img/live-*.jpg`.

## Running locally

```bash
python -m http.server 8000
```

## Deploying

The repo is connected to Vercel — pushing to `main` redeploys automatically.
