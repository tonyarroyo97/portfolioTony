# Portfolio Tony Arroyo

Static site exported from the Framer project **Portfolio Tony**
(`4pRs8QyCSry0wVCAGf6n`) as plain HTML + CSS — no build step, no dependencies.

Full documentation of the export, including every Framer value and every
breakpoint, is in [`codeAdapted.md`](codeAdapted.md).

## Structure

```
index.html                         /
projects/index.html                /projects
projects/tony-nieve/index.html     /projects/tony-nieve
projects/matchflix/index.html      /projects/matchflix
projects/metamorfosis/index.html   /projects/metamorfosis
projects/love-packaging/index.html /projects/love-packaging
about/index.html                   /about
contact/index.html                 /contact
cv/index.html                      /cv

css/tokens.css    colour tokens, text styles, link styles
css/base.css      reset, layout template, navigation, footer, motion
css/pages.css     per-page layout at all four breakpoints
js/site.js        menu, language toggle, scroll reveals, auto-fit type
public/images/    38 project images
favicon.svg
```

Each page lives in its own folder as `index.html`, so the deployed URLs match
the Framer paths exactly (`/projects/tony-nieve`, not `.../tony-nieve.html`).
All asset and link paths are relative, so the site works at a domain root, in a
subfolder, or opened straight from disk.

## Run it locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Opening `index.html` by double-clicking also works.

## Deploy

**GitHub Pages** — push this folder as the repository root, then
*Settings → Pages → Source: Deploy from a branch*, branch `main`, folder `/`.

**Netlify** — drag the folder onto app.netlify.com, or connect the repo with
no build command and publish directory `.`.

**Vercel** — import the repo, framework preset *Other*, no build command,
output directory `.`.

## Breakpoints

The four Framer breakpoints are reproduced exactly:

| Name | Media query |
|---|---|
| Desktop | `(min-width: 1200px)` |
| Laptop | `(min-width: 1024px) and (max-width: 1199.98px)` |
| Tablet | `(min-width: 810px) and (max-width: 1023.98px)` |
| Phone | `(max-width: 809.98px)` |

Fonts are **EB Garamond** and **Arimo**, loaded from Google Fonts.
