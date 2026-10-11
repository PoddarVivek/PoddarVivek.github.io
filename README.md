# Vivek Poddar · Portfolio

Live: https://poddar-vivek-github-io.vercel.app/

A job-focused portfolio for product and UI/UX design roles. It is laid out the way a recruiter scans a page:
who he is and what he's looking for first, then the work, then the experience behind it.

Plain HTML, CSS and vanilla JS. No build step, no npm.

## Page order

| Section | What's in it |
| --- | --- |
| Hero | Role, one-line pitch, résumé download, and quick facts: roles wanted, location, education |
| Selected work | Spotted, Maitry Finance, ClinicAI, Rinkal Coaching. Each has a live preview (hover to scroll the real page), the problem, his role, what he did, and links to the case study and live site |
| Experience | Butter Search, freelance design, Grrowup, plus a one-line leadership summary |
| More work | Product teardowns, PRDs and data projects, each with a repo or live link |
| Skills | Design, research & product, build, data (kept in step with the résumé) |
| About | Short story, how he works, education, certifications, outside work |
| Contact | Email with a copy button, LinkedIn, GitHub, résumé |

The sticky header links to each section, highlights the one you're reading and shows a reading-progress bar.

**Two themes:** *Floodlights* (default dark: ink and lime) and *Test whites* (cream and cricket-ball red).
The switch wipes the new theme in as a circle from the button (View Transitions API), remembers the choice,
follows the OS light/dark setting on a first visit, and carries over to the case studies.

## Files

```
index.html               page markup
assets/data.js           ← EDIT ZONE: all content
assets/site.js           rendering + interactions
assets/site.css          styles for the main page
assets/case-study.css    case studies: portfolio header, fonts and both themes over each page's own styles
assets/case-study.js     case-study theme switch (shares the saved theme with the main page)
assets/img/              photos and live-site screenshots (live-*.jpg)
assets/Vivek_Poddar_Resume.pdf
case-studies/            Spotted, Maitry Finance, ClinicAI, Rinkal Coaching + index
spotted/                 the Spotted interactive prototype
og-image.png             social share card (source: src/og.html)
```

## Editing content

Everything on the main page renders from `assets/data.js`:

- `WORK`: selected projects. `img` is a screenshot in `assets/img/`, `tall: true` scrolls it on hover,
  `label` replaces the domain shown on the card, `cs` links the case study
- `EXPERIENCE`, `LEADERSHIP`: experience rows and the leadership line
- `MORE`: smaller product and data projects; only add ones with a working link
- `SKILLS`: grouped skills; keep them matching the résumé

To refresh a live-site screenshot, capture the site at 1280px wide (tall captures for scrolling previews) and
overwrite the matching `assets/img/live-*.jpg`.

After changing a CSS or JS file, bump the `?v=` number on its link in `index.html` so returning visitors get the new file.

## Running locally

```bash
python -m http.server 8000
```

## Deploying

The repo is connected to Vercel. Pushing to `main` redeploys automatically.
