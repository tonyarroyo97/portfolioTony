# Portfolio — Tony Arroyo

**Change log & implementation spec — 03/10/2026 — Projects page: project grid aligned with the Home grid**

Continues `Versiones/changesPortfolio.md` (02/10). Source of truth: Framer project `4pRs8QyCSry0wVCAGf6n`.
Production: **https://shaggy-snow-332401.framer.app**.

> **Read this first.**
>
> - **Not published yet.** The change is applied in the Framer project, but at the time of writing production
>   still serves version `c8025858a` (published 02/10/2026 17:32 UTC), which has the **old** Projects layout.
>   Don't use the live `/projects` page as the reference for this change until it's republished; use this file.
> - **Only the Projects page changed** (`/projects` and, because it's the same page, `/en/projects`). The Home
>   page was used as the reference and **was not modified**.
> - **Layout only.** No change to typography, colours, text, links, image files, hover effects or appear
>   animations. The only visible change in the images is their crop: all four now use Home's 3:2 frame (§4.3).
> - Like the 02/10 spec, this is a *specification*, not a diff against your repo. All values below were
>   extracted programmatically from the Framer project and from the CSS that production serves for the Home
>   grid (which the Projects grid now reproduces exactly). Nothing is written from memory.
> - Class names in §5 (`.projects-index`, `.project-card`…) are placeholders. §6 lists the old values to search
>   for, so you can find the rules to replace in your repo.

---

## 1. What changed, in one screen

| # | Element | Before | After (= Home) |
|---|---|---|---|
| 1 | Cards 02 (Matchaflix) and 04 (Love) | Pushed down by a top padding: 130px (Desktop), 117px (Laptop), 78px (Tablet), 0 (Phone) | **No offset.** Both rows start on the same line |
| 2 | Grid gap (row × column) | `130px 26px` on Desktop, Laptop and Tablet | `20px 12px` Desktop and Laptop, `18px 12px` Tablet |
| 3 | Gap between projects on Phone | `90px` | `26px` |
| 4 | Grid columns | `repeat(2, minmax(240px, 1fr))`, aligned `start` | `repeat(2, minmax(50px, 1fr))`, aligned `center` |
| 5 | Grid rows | `min-content`, each row sized independently (`fit`) | `minmax(0, 1fr)`, equal rows (`auto`) |
| 6 | Gap between project name and image | `12px` | `8px` |
| 7 | Image proportions | Mixed: 1.4997, 1.3333, 1.5042, 0.6668 | **1.5 (3:2) on all four**, every breakpoint |

What stays the same: the bottom padding of the grid (space before the footer), the side margins, the
`max-width`, the meta row (name + number), the image hover zoom, the appear animations, all content.

---

## 2. Why the two pages didn't match

The Projects page had been built as a staggered, editorial layout: the right column was dropped by 130px, the
rows were sized independently (`grid-auto-rows: min-content`), the gaps were much larger, and each image
kept its own native ratio (Love was a tall portrait at 0.67). The Home page uses a strict 2×2 grid: equal
columns, equal rows, a 12px gutter and a single 3:2 image frame. The fix makes the Projects grid use **exactly
the same grid, card and image rules as Home**.

---

## 3. Shared context (unchanged, needed to reproduce the result)

### 3.1 Breakpoints

| Name | Media query | Frame width in Framer |
|---|---|---|
| Desktop | `(min-width: 1200px)` | 1200px |
| Laptop | `(min-width: 1024px) and (max-width: 1199.98px)` | 1024px |
| Tablet | `(min-width: 810px) and (max-width: 1023.98px)` | 810px |
| Phone | `(max-width: 809.98px)` | 390px |

### 3.2 Side margins and content width

These come from the shared `Site` layout (header + page + footer), so Home and Projects get the same values
automatically. **Not changed.**

| Breakpoint | Page side padding | Content section |
|---|---|---|
| Desktop | `0 26px` | `width: 100%; max-width: 1760px` |
| Laptop | `0 24px` | same |
| Tablet | `0 20px` | same |
| Phone | `0 16px` | same |

### 3.3 Page structure of `/projects` (unchanged)

```
Site layout (side padding §3.2)
├─ Header (Navigation)
├─ Opening        — title «Proyectos» + subtitle
├─ Index Rule     — «Índice» ……… «(04)»
├─ Index          — the project grid  ← THIS CHANGE
│   ├─ Card (01) Tony Nieve      → Meta [Name · Number] + Image [img]
│   ├─ Card (02) Matchaflix      → Meta [Name · Number] + Image [img]
│   ├─ Card (03) Metamorfosis    → Meta [Name · Number] + Image [img]
│   └─ Card (04) Love            → Meta [Name · Number] + Image [img]
└─ Footer
```

DOM order of the cards is unchanged: 01, 02, 03, 04, so the grid reads 01 02 / 03 04, and Phone stacks them 01 → 04.

---

## 4. Exact values, per breakpoint

### 4.1 Grid (`Index`)

| Property | Desktop | Laptop | Tablet | Phone |
|---|---|---|---|---|
| Display | grid | grid | grid | flex column |
| Columns | `repeat(2, minmax(50px, 1fr))` | same | same | — (1 column) |
| Rows | `repeat(1, minmax(0, 1fr))` + `grid-auto-rows: minmax(0, 1fr)` | same | same | — |
| `justify-content` | `center` | same | same | `flex-start` (`align-items: flex-start`) |
| `gap` | **`20px 12px`** (was `130px 26px`) | **`20px 12px`** (was `130px 26px`) | **`18px 12px`** (was `130px 26px`) | **`26px`** (was `90px`) |
| `padding` | `54px 0 150px` *(unchanged)* | `48px 0 132px` *(unchanged)* | `39px 0 108px` *(unchanged)* | `27px 0 75px` *(unchanged)* |
| `width` / `max-width` | `100%` / `1760px` | same | same | same |

The top padding matches Home's grid at every breakpoint. Only the bottom padding differs from Home, on purpose:
on Home the space after the grid is the 150px top padding of the closing «Índice / Todos los proyectos» row.
The Projects page has no closing row, so the grid keeps its own bottom padding to keep the same space before
the footer.

On Phone, Home uses a 1-column grid and Projects uses a vertical flex column. With the values above they render
identically: same width, same 26px spacing, same order.

### 4.2 Card (`(01) … (04)`)

Identical for the four cards, on every breakpoint.

| Property | Value | Before |
|---|---|---|
| `display` | `flex`, `flex-direction: column` | same |
| `justify-content` / `align-items` | `flex-start` / `flex-start` | same |
| `place-self` | `start` | same |
| `gap` | **`8px`** | `12px` |
| `padding` | **`0`** on all four cards | cards 02 and 04: `130px 0 0` Desktop, `117px 0 0` Laptop, `78px 0 0` Tablet |
| `width` / `height` | `100%` / `min-content` | same (Framer had `1fr`, which compiles to the same `width: 100%`) |
| `cursor` | `pointer` | same |

Meta row (name left, number right): `display: flex; flex-direction: row; justify-content: space-between;
align-items: center; width: 100%`. **Unchanged.**

### 4.3 Image frame

| Property | Value | Before |
|---|---|---|
| `aspect-ratio` | **`1.5`** on all four | `1.4997` (01), `1.3333` (02), `1.5042` (03), `.6668` (04) |
| `width` / `height` | `100%` / `auto` | same |
| `overflow` | `clip` | same |
| `<img>` | `display: block; width: 100%; height: 100%; object-fit: cover; object-position: center` | same |

- With `object-fit: cover` and centred position, the images are cropped like on Home. Matchaflix loses a
  little at the left and right. **Love goes from portrait to 3:2 landscape**, so it shows the centre of the photo:
  the box with the heart, cropped top and bottom. Home already shows it this way.
- The fixed pixel heights you may see in Framer (379 / 321 / 253 / 239px) are editor values only. The served
  CSS is `height: auto` + `aspect-ratio: 1.5`, so the height always follows the column width, including at
  in-between screen sizes.

### 4.4 Resulting sizes (for checking)

Column width = (viewport − 2 × side padding − column gap) / 2; image height = column width / 1.5.

| Viewport | Column width | Image (w × h) | Column gutter | Row gap |
|---|---|---|---|---|
| 1200 (Desktop) | 568px | 568 × 378.67 | 12px | 20px |
| 1024 (Laptop) | 482px | 482 × 321.33 | 12px | 20px |
| 810 (Tablet) | 379px | 379 × 252.67 | 12px | 18px |
| 390 (Phone) | 358px | 358 × 238.67 | — | 26px between cards |

These are identical to the Home page at the same widths.

---

## 5. Drop-in code for the repo

### 5.1 Recommended: reuse the Home grid

If your repo already renders the Home project grid with a component or a set of classes, the most faithful
port is to **render that same grid on `/projects`**, changing only the bottom padding (§4.1). Every other value
in §4 is identical to Home by design.

### 5.2 Standalone CSS (if Projects has its own rules)

Replace the current rules for the Projects grid, cards and images with this. Class names are placeholders, so
map them to yours (the Framer layer names are in the comments).

```css
/* Projects page — project grid (Framer layer "Index") */
.projects-index {
  display: grid;
  grid-template-columns: repeat(2, minmax(50px, 1fr));
  grid-template-rows: repeat(1, minmax(0, 1fr));
  grid-auto-rows: minmax(0, 1fr);
  justify-content: center;
  gap: 20px 12px;
  width: 100%;
  max-width: 1760px;
  height: min-content;
  padding: 54px 0 150px;
  position: relative;
}

/* Card (Framer layers "(01) Tony Nieve" … "(04) Love Packaging") — same rule for all four */
.project-card {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  place-self: start;
  gap: 8px;
  width: 100%;
  height: min-content;
  padding: 0;            /* removes the old 130 / 117 / 78px offset on cards 02 and 04 */
  position: relative;
  cursor: pointer;
}

/* Name + number row (Framer layer "Meta") — unchanged, included for completeness */
.project-card__meta {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

/* Image frame (Framer layer "Image") — same ratio for all four */
.project-card__image {
  display: flex;
  position: relative;
  width: 100%;
  height: auto;
  aspect-ratio: 1.5;
  overflow: clip;
}

.project-card__image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

/* Laptop */
@media (min-width: 1024px) and (max-width: 1199.98px) {
  .projects-index { padding: 48px 0 132px; }
}

/* Tablet */
@media (min-width: 810px) and (max-width: 1023.98px) {
  .projects-index { gap: 18px 12px; padding: 39px 0 108px; }
}

/* Phone — one column, stacked */
@media (max-width: 809.98px) {
  .projects-index {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 26px;
    padding: 27px 0 75px;
  }
}
```

**Remove** any per-card or per-image overrides on the Projects page, such as a `padding-top` or `margin-top`
on cards 02 / 04, or an `aspect-ratio` set per image. After this change, all four cards and all four images
share one rule.

### 5.3 `sizes` for the card images (only if you use `srcset` / `next/image`)

The column maths changed (gutter 26 → 12px, min column 240 → 50px). Use the same `sizes` Home serves:

```
(min-width: 1200px) max((min(100vw, 1760px) - 12px) / 2, 50px),
(min-width: 1024px) and (max-width: 1199.98px) max((min(100vw, 1760px) - 12px) / 2, 50px),
(min-width: 810px) and (max-width: 1023.98px) max((min(100vw, 1760px) - 12px) / 2, 50px),
(max-width: 809.98px) max(min(100vw, 1760px), 50px)
```

### 5.4 Not changed: don't touch

- Hover on the image: `scale: 1.02`, `tween 0.4,0,0.2,1 0.8s`.
- Appear animations of the cards.
- Text styles `Label` (name) and `Label Muted` (number), link style `Project Link`.
- Links (`/projects/tony-nieve`, `/projects/matchflix`, `/projects/metamorfosis`, `/projects/love-packaging`;
  `/en/...` on the English page), alt texts (§6 of `changesPortfolio.md`), image files.
- `Opening`, `Index Rule`, header, footer.

---

## 6. Finding the old code in your repo

If the repo was ported from the published Framer CSS, these are the **old** values to search for. All of them
belong to the Projects grid and are replaced by §5.2:

| Search for | What it was |
|---|---|
| `gap: 130px 26px` / `gap:130px 26px` | Grid gap, Desktop / Laptop / Tablet |
| `minmax(240px` | Grid columns |
| `grid-auto-rows: min-content` + `justify-content: start` | Rows sized independently, grid aligned left |
| `gap: 90px` | Phone gap between projects |
| `padding: 130px 0 0`, `padding: 117px 0 0`, `padding: 78px 0 0` | Offset of cards 02 and 04 |
| `gap: 12px` on the project cards | Name ↔ image gap |
| `aspect-ratio: 1.4997`, `1.3333`, `1.5042`, `.6668` (or `0.6668`) | Per-image ratios |
| `minmax(240px, 1fr)` / `- 26px` inside an image `sizes` attribute | Old `sizes` (§5.3) |

For reference, in the Framer build these were in the scope `.framer-wGip0` (Projects page) under classes
`framer-1psgns6` (grid), `framer-1462wyd` / `framer-1wbv6sm` (cards 02 / 04) and `framer-128iaz0`,
`framer-vpn74d`, `framer-i7duvd`, `framer-9tws1p` (images). The Home reference is `.framer-Jy4An .framer-jllqat`.
The hashes change on every Framer publish, so search by value rather than by class.

---

## 7. Verification checklist for the repo

Run on `/projects` and `/en/projects`, side by side with `/`.

- [ ] At 1440, 1200, 1100, 1024, 900, 810 px: two columns of exactly equal width, 12px gutter.
- [ ] Cards 01 and 02 start at the same `top`; cards 03 and 04 start at the same `top`.
- [ ] The four images have the same height in each row, and `width / height = 1.5` (± 1px rounding).
- [ ] At 1200px the images measure 568 × ~379; at 1024, 482 × ~321; at 810, 379 × ~253 (§4.4).
- [ ] Left edge of the grid = left edge of «Proyectos», «Índice» and the header wordmark. Right edge = «(04)».
- [ ] At 809, 600, 390 and 320 px: one column, order 01 → 04, 26px between cards, image 3:2 full width.
- [ ] No horizontal scroll at any width (`document.documentElement.scrollWidth === innerWidth`).
- [ ] Compared with `/` at the same width, the grid's left/right edges, gutter, row gap and image sizes are identical.

Quick console check (paste on `/projects`; adapt the selector to your card image class):

```js
const imgs = [...document.querySelectorAll(".project-card__image")].map(e => e.getBoundingClientRect())
console.table(imgs.map(r => ({ left: Math.round(r.left), top: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height), ratio: (r.width / r.height).toFixed(3) })))
console.log("no h-scroll:", document.documentElement.scrollWidth === innerWidth)
```

Expected on Desktop: two distinct `left` values, two distinct `top` values, one `w`, one `h`, every `ratio` = 1.500.

---

## 8. How this was verified in Framer

- After the change, every layout property of the Projects grid, its cards, meta rows and image frames was
  compared programmatically with the Home grid on all four breakpoints. The only remaining differences are
  the intended ones: the grid's bottom padding (§4.1), and on Phone, flex column vs 1-column grid, which render
  the same.
- Screenshots of the Projects page were taken in Framer on Desktop, Laptop, Tablet and Phone, plus Home on Desktop and
  Phone for comparison. On every breakpoint the four projects are aligned on the same axes, with the same
  margins, gutters and image frames as Home.
- Framer's linter reported a «siblings might be too close» warning between `Opening` and `Index`, with spacing
  `-100` on all four breakpoints. It's a measurement artefact of the Projects page not being laid out in the
  editor session: neither of those sections was touched, and the screenshots show no overlap. Nothing to port.

---

## 9. Earlier in this session — 02/10 spec verified (no changes)

Before this change, the Framer project and production were checked against `changesPortfolio.md`. Everything
matched: 18 routes return 200, `/en` → `308 /en/`, `lang` / `canonical` / `hreflang`, titles and descriptions,
every dictionary string, the ES/EN switch wiring and `aria-current`, Matchaflix alt texts, no `Menu` component,
`LocaleSwitch.tsx` identical to §5.3 there. **No code or content changes came from that check**, so there's
nothing to port from it.

---

## 10. Pending

| # | Item |
|---|---|
| 10.1 | **Publish** the Framer project so production matches this spec. Afterwards, re-run §7 against production. |
| 10.2 | Still open from earlier specs: ES page titles in English (02/10 §8.5), `summary` blocks (02/10 §8.4), slug `/projects/matchflix` (24/09 §10.3). |

---

*Generated on 03/10/2026 from the live state of Framer project `4pRs8QyCSry0wVCAGf6n` (unpublished changes) and the CSS
served by production version `c8025858a` for the Home grid.*
