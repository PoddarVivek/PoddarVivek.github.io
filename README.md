# Vivek Poddar · Portfolio

Live: https://poddar-vivek-github-io.vercel.app/

A portfolio aimed at Founder's Office, product management, product / UI-UX design and data or business
analyst roles. The pitch: he works out what's worth building, then designs and ships it, and uses AI
(Claude, ChatGPT, n8n) to automate the busywork.

Keep employer data off the site: no Butter Search numbers, client names or internal links.

Plain HTML and CSS, with a few lines of JS. No build step, no npm.

## Design

Warm paper (`#f3f0e8`), ink (`#15140f`) and one cobalt accent (`#2a37f0`). The portfolio itself stays
quiet so each project's own colours carry the page. Type is Schibsted Grotesk throughout, with
Newsreader italic for emphasis. Square-ish corners, no shadows, no scroll effects.

The only behaviour on the page: the Spotted demo video plays while it's on screen, and the email
can be copied.

## Page order

| Section | What's in it |
| --- | --- |
| Intro | The pitch, a short bio, the roles he's open to and where, and four proof points (NIT Kurukshetra, Founder's Office, 4 live products, AI-native) |
| Founder's Office | How he runs the outreach funnel at Butter Search and what he changed, described without numbers |
| Selected work | Four projects, each a colour panel with real desktop and phone screenshots, the problem, what he did, and links to the case study and live site |
| Product and data projects | Product teardowns, a PRD and data/BI projects, each with a link |
| How I use AI | Three real examples: the n8n + Claude WhatsApp pipeline, Claude skills for routine work, AI as build partner |
| Experience | Butter Search, freelance design, Grrowup, leadership |
| About | Short story, toolkit, education |
| Contact | Email with a copy button, LinkedIn, GitHub, résumé |

## Files

```
index.html               the whole homepage (content lives here)
assets/site.css          homepage styles
assets/site.js           Spotted video + copy email
assets/case-study.css    gives the case studies the same look, over each page's own styles
assets/work/             project screenshots: <id>-desktop.jpg (1600×1000), <id>-phone.jpg (600 wide)
assets/img/vivek.jpg     portrait
assets/spotted/          Spotted demo video and poster
assets/Vivek_Poddar_Resume.pdf
case-studies/            Spotted, Maitry Finance, ClinicAI, Rinkal Coaching + index
spotted/                 the Spotted interactive prototype
og-image.png             social share card (source: src/og.html)
```

## Editing

Content is plain HTML in `index.html`. Each project is an `<article class="tile">`; `--c` sets its
panel colour and `wide` makes it span the full row.

To refresh a project screenshot, capture the live site at 1440×900 (desktop, scale 1.5) and
390×844 (phone, mobile emulation, scale 2), then save them over the matching files in `assets/work/`.

After changing a CSS or JS file, bump the `?v=` number on its link so returning visitors get the new file.

## Running locally

```bash
python -m http.server 8000
```

## Deploying

The repo is connected to Vercel. Pushing to `main` redeploys automatically.
