# Vivek Poddar — Portfolio

A single-file, self-contained portfolio website — interactive timeline (life & academic + projects), a "chat with my AI twin" Q&A widget, and a downloadable resume — with no build step and no external dependencies at runtime (all images and the resume PDF are embedded directly in the HTML).

**Live concept:** electronics engineer → data analyst → product thinker → AI/ML builder, told as a chronological, color-coded timeline (copper = academic, teal = extracurricular, violet = professional/internship).

---

## Tech stack

Plain HTML, CSS, and vanilla JavaScript. No React, no npm, no build tools, no bundler. Everything — timeline data, images, the resume PDF — lives inside `index.html`. This means:

- It runs by just opening `index.html` in a browser, or hosting it anywhere that serves static files.
- There is nothing to `npm install` and nothing to compile.
- The one tradeoff: the file is a few MB (mostly the embedded images/resume as base64), which is normal and fine for a personal site.

## Running it locally

Just double-click `index.html`, or serve it locally to test more accurately (recommended, since some browsers restrict certain features when opened via `file://`):

```bash
# from this folder
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploying with GitHub Pages (recommended, free)

1. Create a new GitHub repository (public).
2. Push these files to the repo's `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio site"
   git branch -M main
   git remote add origin https://github.com/PoddarVivek/YOUR-REPO-NAME.git
   git push -u origin main
   ```
3. On GitHub: go to **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**.
5. Under **Branch**, choose `main` and folder `/ (root)`, then **Save**.
6. GitHub will give you a live URL within a minute or two, typically:
   ```
   https://poddarvivek.github.io/YOUR-REPO-NAME/
   ```
7. Optional: to use `poddarvivek.github.io` as your root domain (no repo name in the URL), name the repo exactly `PoddarVivek.github.io` instead — GitHub treats that repo name specially.

### Custom domain (optional)
If you own a domain, add a `CNAME` file to the repo root containing just your domain (e.g. `vivekpoddar.dev`), then point your domain's DNS to GitHub Pages per [GitHub's custom domain docs](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Alternative: Vercel / Netlify

Both support "drag and drop a static folder" deployment with zero configuration — just upload this folder through their dashboard, or connect the GitHub repo for automatic redeploys on every push.

---

## Editing content

Open `index.html` and search for `EDIT ZONE` — that comment marks the data arrays you'll actually want to touch:

- `lifeTimeline` — academic + extracurricular + professional milestones (each with `year`, `category`, `title`, `story`, `skills`, and `proofs`)
- `projectsTimeline` — project history
- `qnaPairs` — the prepared Q&A the AI avatar answers instantly
- `githubGroups` / `skillsData` — the GitHub and Skills sections

Everything renders dynamically from these arrays — you generally won't need to touch the HTML or CSS to update content.

## Notes

- The AI chat section answers from a fixed set of prepared Q&A pairs — it's fully static (no API calls), so it works identically everywhere this is hosted.
- The resume button and all proof images are embedded as base64 data — swap them by re-running the same embedding approach (base64-encode the file, replace the relevant `src`/`href`), or ask for help regenerating them from updated source files.
