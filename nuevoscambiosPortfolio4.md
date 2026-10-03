# Portfolio · Tony Arroyo

**Implementation spec · 03/10/2026 · final state of every change made in Framer after `nuevoscambiosPortfolio3.md`**

Matchaflix rebuilt as a 7-stage rebranding case study with new identity assets, an «arrows only» mode for the shared
`CompositionCarousel`, and one name fix in About › Formación.

Continues `Versiones/nuevoscambiosPortfolio3.md`. **Apply that file first**; this one only describes what changed after
it. If both files disagree, **this one wins** (in particular: spec 3 §6 Matchaflix is fully replaced by §4 below, and
spec 3 §9.2 row 8 is corrected by §5 below).
Source of truth: Framer project `4pRs8QyCSry0wVCAGf6n`. Production: https://shaggy-snow-332401.framer.app (not
published yet).

> **Read this first.**
>
> - **Everything below was read back from Framer after the change**, including the English text from Framer's
>   Localization. Apply it literally.
> - **Ready-made files** are in `Versiones/nuevoscambiosPortfolio4-assets/`:
>   - `code/CompositionCarousel.tsx`: the component of §2, already ported (no Framer APIs). It is the spec 3 file plus
>     the change of §2 and nothing else. It compiles with `tsc --strict` (React 18 types).
>   - `images/*`: the 8 new Matchaflix images, already resized (max 3600 px wide) and with transparent edges flattened (§6).
>   - `code/make-matchaflix-logo-comparison.py`: rebuilds the two logo images of stage 02 byte for byte (§6.2). Only
>     needed if the source logos change.
> - **Class names** (`.text-section`, `.gallery-row`, `.row--indented`…) are the placeholders of the previous specs.
>   Map them to whatever the repo already uses.
> - **Dictionary keys** follow the previous naming (`projectPages.<slug>.…`). New keys are marked **NEW**, removed ones
>   **REMOVED**.
> - **No em dashes** in any visible text. Stage numbers use « · » (`01 · …`). Spanish quotes «…», English quotes “…”,
>   apostrophes ’.
> - **Name:** always «Tony» with a Y.

---

## 1. What changed, in one screen

| # | Area | Change |
|---|---|---|
| 1 | Shared component | `CompositionCarousel` gets a new prop **`indicator`** (`"dots"` default, or `"none"` = arrows only). With `"none"` the dots disappear and the active slide name (from `slideNames`) is shown **between** the arrows. Every existing carousel keeps `"dots"`, so nothing else on the site changes (§2) |
| 2 | Matchaflix | Page rebuilt as **7 stages**: 01 Concepto · 02 Evolución del logo · 03 Paleta de color · 04 Lenguaje gráfico · 05 Patrón y sistema visual · 06 I love you so matcha · 07 Aplicaciones. 8 new images. Before / after logo carousel. «El reto» / «La respuesta» copy replaced. Spray-texture carousel removed (§4) |
| 3 | About › Formación | «Noah Farrell» → **«Noah Pharrell»** (ES and EN). Nothing else changed (§5) |

Unchanged: Home, Projects index, Tony Nieve, Metamorfosis, Love, Contact, CV, header, footer, navigation, fonts, text
styles, colours, the rest of About.

---

## 2. Component change: `CompositionCarousel` (`indicator` prop)

Replace the repo file with `nuevoscambiosPortfolio4-assets/code/CompositionCarousel.tsx`. The diff against the spec 3
version is only this:

### 2.1 New prop

| Prop | Type | Default | Notes |
|---|---|---|---|
| `indicator` **NEW** | `"dots" \| "none"` | `"dots"` | `"none"`: no dots, no counter, no name line under the controls. The two arrows stay. If `slideNames` is set, the active slide name sits between the arrows (Label font, 11px, uppercase, `letter-spacing: 0.09em`, Ink Muted `rgb(107, 95, 102)`, `min-width: 88px`, centred, `aria-live="polite"`) so the arrows do not move when the name changes. Without `slideNames` the arrows sit next to each other (12px gap). The fullscreen lightbox uses the same mode |

Everything else (swipe with native scroll snap, ← / → keys, fullscreen lightbox, Esc, focus trap, hover zoom,
`frameRatio`, `fit`) is unchanged.

### 2.2 Code changes (already applied in the ready-made file)

```tsx
// 1. Props interface
    slideNames?: string
    /** "dots" (default) or "none": arrows only, with the active slide name between them */
    indicator?: "dots" | "none"
    videoMode?: "slides" | "reveal"

// 2. Controls: new prop + arrows-only branch
function Controls(props: {
    /* …existing props… */
    names?: string[]
    indicator?: "dots" | "none"
    goTo: (i: number) => void
}) {
    const { count, index, color, mutedColor, goTo } = props
    const arrowsOnly = props.indicator === "none"
    const activeName = props.names?.[index] || ""
    const hasNames = !!props.names?.some((name) => name)
    /* …arrow() unchanged… */
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
            {arrow("prev")}
            {arrowsOnly ? (
                hasNames ? (
                    <span
                        aria-live="polite"
                        style={{ ...LABEL_FONT, color: TEXT_MUTED, minWidth: 88, textAlign: "center" }}
                    >
                        {activeName}
                    </span>
                ) : null
            ) : count > 10 ? (
                /* …existing «01 / 12» counter… */
            ) : (
                /* …existing dots… */
            )}
            {arrow("next")}
        </div>
    )
}

// 3. Lightbox: two new props, forwarded to its Controls
    onClose: (index: number) => void
    indicator?: "dots" | "none"
    names?: string[]
/* inside Lightbox, on <Controls …/> */
    indicator={props.indicator}
    names={props.indicator === "none" ? props.names : undefined}

// 4. Main component
    slideNames = "",
    indicator = "dots",
    videoMode = "slides",
/* inline <Controls …/> */
    names={names}
    indicator={indicator}
/* the name line under the controls only renders in dots mode */
    {isCarousel && indicator === "dots" && names[index] ? ( /* …existing <p>… */ ) : null}
/* <Lightbox …/> */
    indicator={indicator}
    names={names}
```

---

## 3. Shared layout pieces used by the new Matchaflix page

Breakpoints, `--gutter` (26 / 24 / 20 / 16px), the `.text-section` block and its padding presets are the ones of
spec 3 §2.

### 3.1 Stage text sections (same rule as Metamorfosis stages)

Matchaflix stage labels are long («02 · EVOLUCIÓN DEL LOGO»), so they use the **Metamorfosis stage rule** of spec 3
§2.2: on **Laptop** the label keeps **170px** (not 145px); on **Tablet** the label goes **above** the text (column,
gap 14px), like Phone. If the repo already has a modifier for the Metamorfosis stages, reuse it; otherwise:

```css
@media (min-width: 1024px) and (max-width: 1199.98px) {
  .text-section--stage .text-section__label { flex-basis: 170px; }
}
@media (min-width: 810px) and (max-width: 1023.98px) {
  .text-section--stage { flex-direction: column; gap: 14px; }
  .text-section--stage .text-section__label { flex-basis: auto; }
  .text-section--stage .text-section__text { width: 100%; }
}
```

Presets used (top / bottom, from spec 3 §2.2):

| Preset | Desktop | Laptop | Tablet | Phone | Used by |
|---|---|---|---|---|---|
| `stage-first` | 110 / 0 | 97 / 0 | 79 / 0 | 55 / 0 | 01 Concepto |
| `stage-label` | 110 / 40 | 97 / 35 | 79 / 28 | 55 / 20 | 02 (label only) |
| `stage` | 110 / 64 | 97 / 56 | 79 / 46 | 55 / 32 | 03, 06, 07 |

### 3.2 Split block (text beside media), NEW

Used by stages 04 and 05. Text column and media share the row as `1fr : 1.6fr`, bottom-aligned (like Love «El reto»
and the Metamorfosis TFG block). On Tablet and Phone the block stacks, **text first**, media 100% wide.

```html
<section class="split split--graphic">          <!-- 04: text, then media -->
  <div class="split__text">
    <p class="label">…</p>
    <p class="editorial-note">…</p>
  </div>
  <div class="split__media"><CompositionCarousel … /></div>
</section>

<section class="split split--pattern">          <!-- 05: media, then text (DOM order) -->
  <div class="split__media"><CompositionCarousel … /></div>
  <div class="split__text">…</div>
</section>
```

```css
.split { display: flex; flex-direction: row; align-items: flex-end; gap: var(--gutter);
         width: 100%; max-width: 1760px; padding: 110px 0 0; }
.split__text  { flex: 1 1 0; min-width: 0; display: flex; flex-direction: column; gap: 16px; }
.split__media { flex: 1.6 1 0; min-width: 0; }
.split__text .editorial-note { max-width: 560px; }
.split--graphic .split__text { padding-bottom: 78px; }   /* 26 + the carousel controls (20 gap + 32 arrows) */
.split--pattern .split__text { padding-bottom: 26px; }

@media (min-width: 1024px) and (max-width: 1199.98px) {
  .split { padding-top: 97px; }
  .split--graphic .split__text { padding-bottom: 75px; }
  .split--pattern .split__text { padding-bottom: 23px; }
}
@media (max-width: 1023.98px) {
  .split { flex-direction: column; align-items: flex-start; gap: 46px; padding-top: 79px; }
  .split__text, .split__media { flex: none; width: 100%; }
  .split--graphic .split__text, .split--pattern .split__text { padding-bottom: 0; }
  .split__text .editorial-note { max-width: 760px; }
  .split--pattern .split__text { order: -1; }              /* text before the image */
}
@media (max-width: 809.98px) {
  .split { gap: 32px; padding-top: 55px; }
}
```

### 3.3 Media wrappers

Each stage's images sit in a column wrapper: `display: flex; flex-direction: column; gap: var(--gutter);
width: 100%; max-width: 1760px;`, no vertical padding (the next stage's top padding gives the spacing).
Stage 02's wrapper is **indented** (`.row--indented` of spec 3 §2.4: 196 / 171 / 140 / 0px) and its carousel has
`max-width: 1100px`. Stage 03's wrapper has a **hairline border** so the cream swatch does not disappear into the
page background:

```css
.mf-palette { border: 1px solid rgb(206, 197, 159); overflow: hidden; }   /* Rule token */
```

All new sections and wrappers fade in like the rest of the site (opacity 0 → 1, `translateY(26px)` → 0, 0.95s, when
8% visible, once).

---

## 4. Matchaflix (`/projects/matchflix`), replaces spec 3 §6

### 4.1 Structure (final)

```
Opening + Meta                                                        (unchanged)
01 · Concepto                text-section--stage, stage-first          2 paragraphs
02 · Evolución del logo      text-section--stage, stage-label          label only
   Wrapper (indented)        [before / after carousel, max-width 1100]
03 · Paleta de color         text-section--stage, stage                1 paragraph
   Wrapper (.mf-palette)     [palette, full width]
04 · Lenguaje gráfico        .split.split--graphic                     text | carousel
05 · Patrón y sistema visual .split.split--pattern                     image | text
06 · I love you so matcha    text-section--stage, stage                1 paragraph
   Wrapper                   [carousel: lettering + T-shirt, full width]
07 · Aplicaciones            text-section--stage, stage                1 paragraph
   Gallery (gap = --gutter)
     Full   [emblem, full width]                                       NEW
     Row    [cups 01 1.33] [cups 02 1.33]                              (unchanged .gallery-item)
     Row    [Packaging 1.33] [Packaging Té Matcha 1.5]                 (unchanged .gallery-item)
Next project                                                          (unchanged)
```

**REMOVED from the page:** the intro «El reto» and the closing «La respuesta» (their copy is replaced by stages 01 and
07); the spray-texture carousel (`Ilustración_sin_título 10 / 8 / 9`, label «Texturas de Matchaflix»); the separate
full-width T-shirt row (the T-shirt mockup now lives in the stage 06 carousel). In Framer the texture carousel is
**hidden**, not deleted; in the repo simply do not render it (the image files can stay).

### 4.2 Carousels on this page

Every image added on this page is a `CompositionCarousel`, `lightbox` on (click → fullscreen), `fit="cover"`. Each
`frameRatio` equals the image ratio, so nothing is cropped except where noted. Always pass the translated
`previousLabel`, `nextLabel`, `slideLabel`, `openLabel`, `closeLabel` (spec 3 §3.2 `carousel.*` keys).

| Stage | Images (in order, `images/` file) | `frameRatio` | `indicator` | `slideNames` | `label` key |
|---|---|---|---|---|---|
| 02 | `matchaflix-logo-antes.png`, `matchaflix-logo-despues.png` | 2.4 | **`"none"`** | `` `${t(before)}\n${t(after)}` `` → «Antes / Después» | `logoEvolution.label` |
| 03 | `matchaflix-paleta.png` | 1.97 | (single) | | `paletteLabel` |
| 04 | `matchaflix-grafica-crema.png`, `matchaflix-grafica-marron.png` | 1.414 | **`"none"`** | | `graphicLabel` |
| 05 | `matchaflix-patron.jpg` | 1.414 | (single) | | `patternLabel` |
| 06 | `matchaflix-i-love-you.png`, existing T-shirt mockup (`Mockups finales/T-Shirt Mockups copia.jpg`, Framer `txL5L41W3WKWkEDA4GFNsRrJXI.jpg`) | 1.5 | **`"none"`** | | `sloganLabel` |
| 07 | `matchaflix-emblema.png` | 2.077 | (single) | | `applicationsLabel` |

Stage 06: the lettering image is 1.414, so `cover` in a 1.5 frame trims about 3% of plain background at top and
bottom (no lettering is touched). This keeps both slides exactly the same size.

```tsx
// stage 02 example
<CompositionCarousel
  images={[
    { src: logoAntes, alt: t("projectPages.matchflix.alt.logoBefore") },
    { src: logoDespues, alt: t("projectPages.matchflix.alt.logoAfter") },
  ]}
  frameRatio={2.4} fit="cover" indicator="none"
  slideNames={`${t("projectPages.matchflix.logoEvolution.before")}\n${t("projectPages.matchflix.logoEvolution.after")}`}
  label={t("projectPages.matchflix.logoEvolution.label")}
  previousLabel={t("carousel.previous")} nextLabel={t("carousel.next")} slideLabel={t("carousel.slide")}
  openLabel={t("carousel.open")} closeLabel={t("carousel.close")}
/>
```

### 4.3 Copy

| Key | ES | EN |
|---|---|---|
| `projectPages.matchflix.stages[0].label` **NEW** | 01 · Concepto | 01 · Concept |
| `projectPages.matchflix.stages[0].text` **NEW** (2 ¶) | ¶1 Matchaflix ofrece un matcha de calidad, pero su imagen no lo transmitía. El rebranding construye a su alrededor un universo propio, cercano y con humor, pensado tanto para redes sociales como para un vaso, una bolsa o una camiseta. ¶2 La identidad mira al Art Nouveau: curvas orgánicas, formas botánicas y líneas que fluyen. Lo combino con un tono juguetón y una paleta tranquila para que la marca se sienta actual, joven y fácil de reconocer. | ¶1 Matchaflix offers quality matcha, but its image didn’t show it. The rebrand builds a world of its own around it, warm and playful, made to work on social media as well as on a cup, a bag or a T-shirt. ¶2 The identity looks to Art Nouveau: organic curves, botanical forms and flowing lines. I pair that with a playful tone and a calm palette so the brand feels current, young and easy to recognise. |
| `stages[1].label` **NEW** | 02 · Evolución del logo | 02 · Logo evolution |
| `stages[1].text` | *(none)* | *(none)* |
| `stages[2].label` **NEW** | 03 · Paleta de color | 03 · Colour palette |
| `stages[2].text` **NEW** | Cuatro colores: un gris claro, un crema, un verde salvia que remite al propio matcha y un marrón oscuro. Son tonos naturales y frescos; el verde lleva el carácter de la marca y el crema y el marrón le dan contraste y calidez. | Four colours: a pale grey, a cream, a sage green that points to matcha itself and a dark brown. They are natural, fresh tones: the green carries the brand’s character, while the cream and the brown add contrast and warmth. |
| `stages[3].label` **NEW** | 04 · Lenguaje gráfico | 04 · Graphic language |
| `stages[3].text` **NEW** | Más allá del logo, la marca habla con frases como «Welcome to the era of matcha», compuestas en una serif fina, dentro de un marco de línea con las esquinas redondeadas y con mucho aire alrededor. La misma pieza funciona sobre crema y sobre marrón. | Beyond the logo, the brand speaks through lines like “Welcome to the era of matcha”, set in a fine serif inside a thin frame with rounded corners and plenty of space around them. The same piece works on cream and on brown. |
| `stages[4].label` **NEW** | 05 · Patrón y sistema visual | 05 · Pattern and visual system |
| `stages[4].text` **NEW** | El patrón nace de un iris rodeado de tallos que se curvan y se enroscan, el gesto más claramente Art Nouveau de la identidad. Repetido en filas, se convierte en un fondo que da continuidad a la marca; aislado, funciona como emblema en los vasos y en la espalda de la camiseta. | The pattern grows from an iris framed by stems that curve and loop, the most clearly Art Nouveau gesture in the identity. Repeated in rows, it becomes a backdrop that carries the brand from piece to piece; on its own, it works as an emblem on the cups and on the back of the T-shirt. |
| `stages[5].label` **NEW** | 06 · I love you so matcha | 06 · I love you so matcha |
| `stages[5].text` **NEW** | Un juego de palabras que resume el tono de la marca y que reaparece en vasos y bolsas. Escrito en caligrafía inglesa, pasa del papel a la camiseta: delante, la frase; detrás, el iris y el nombre de Matchaflix. | A play on words that sums up the brand’s tone and returns on cups and bags. Set in copperplate script, it moves from paper to the T-shirt: the phrase on the front, the iris and the Matchaflix name on the back. |
| `stages[6].label` **NEW** | 07 · Aplicaciones | 07 · Applications |
| `stages[6].text` **NEW** | Al final, todo se junta. El logo, la paleta, la tipografía, el iris y la frase se reparten entre vasos, bolsas de papel y sobres de té: cada pieza usa solo una parte del sistema, pero todas se reconocen como Matchaflix. | In the end, everything comes together. The logo, the palette, the type, the iris and the phrase are shared across cups, paper bags and tea pouches: each piece uses only part of the system, yet all of them read as Matchaflix. |

Label style `Label`, text style `Editorial Note` (EB Garamond italic), paragraphs as separate `<p>`, exactly as in the
other project pages. On Desktop the stage 06 label wraps to two lines inside its 170px column; that is expected.

**Carousel labels and slide names:**

| Key **NEW** | ES | EN |
|---|---|---|
| `projectPages.matchflix.logoEvolution.label` | Evolución del logo | Logo evolution |
| `projectPages.matchflix.logoEvolution.before` | Antes | Before |
| `projectPages.matchflix.logoEvolution.after` | Después | After |
| `projectPages.matchflix.paletteLabel` | Paleta de color | Colour palette |
| `projectPages.matchflix.graphicLabel` | Lenguaje gráfico | Graphic language |
| `projectPages.matchflix.patternLabel` | Patrón de Matchaflix | Matchaflix pattern |
| `projectPages.matchflix.sloganLabel` | I love you so matcha | I love you so matcha |
| `projectPages.matchflix.applicationsLabel` | Aplicaciones | Applications |

**Alt texts:**

| Key **NEW** | ES | EN |
|---|---|---|
| `projectPages.matchflix.alt.logoBefore` | Logotipo anterior de Matchaflix | Previous Matchaflix logo |
| `projectPages.matchflix.alt.logoAfter` | Nuevo logotipo de Matchaflix con «the matcha club» | New Matchaflix logo with “the matcha club” |
| `projectPages.matchflix.alt.palette` | Paleta de color de Matchaflix: gris claro, crema, verde salvia y marrón oscuro | Matchaflix colour palette: pale grey, cream, sage green and dark brown |
| `projectPages.matchflix.alt.graphicCream` | «Welcome to the era of matcha» sobre fondo crema | “Welcome to the era of matcha” on a cream background |
| `projectPages.matchflix.alt.graphicBrown` | «Welcome to the era of matcha» sobre fondo marrón | “Welcome to the era of matcha” on a brown background |
| `projectPages.matchflix.alt.pattern` | Patrón de iris de inspiración Art Nouveau de Matchaflix | Matchaflix Art Nouveau inspired iris pattern |
| `projectPages.matchflix.alt.slogan` | «I love you so matcha» en caligrafía inglesa | “I love you so matcha” in copperplate script |
| `projectPages.matchflix.alt.tshirt` (was «Camisetas de Matchaflix / Matchaflix T-shirts») | Camisetas de Matchaflix con «I love you so matcha» delante y el iris detrás | Matchaflix T-shirts with “I love you so matcha” on the front and the iris on the back |
| `projectPages.matchflix.alt.emblem` | Emblema del iris de Matchaflix sobre crema, verde salvia y marrón | Matchaflix iris emblem on cream, sage green and brown |

The cups and packaging alts are unchanged («Vasos de Matchaflix», «Packaging de Matchaflix», «Packaging del té matcha
de Matchaflix» and their existing English).

**REMOVED keys:** `projectPages.matchflix.introLabel` («El reto»), `projectPages.matchflix.concept`,
`projectPages.matchflix.closingLabel` («La respuesta»), `projectPages.matchflix.closing`,
`projectPages.matchflix.texturesLabel` («Texturas de Matchaflix»), the textures alt «Textura de Matchaflix».

### 4.4 Values per breakpoint (read back from Framer)

| Element | Desktop | Laptop | Tablet | Phone |
|---|---|---|---|---|
| 01 padding | 110 / 0 | 97 / 0 | 79 / 0 | 55 / 0 |
| 02 label padding | 110 / 40 | 97 / 35 | 79 / 28 | 55 / 20 |
| 03, 06, 07 text padding | 110 / 64 | 97 / 56 | 79 / 46 | 55 / 32 |
| Stage label width | 170px | 170px | full (above text) | full (above text) |
| 02 wrapper indent | 196px | 171px | 140px | 0 |
| 02 carousel | 100%, max 1100px | same | same | same |
| 04 / 05 split | row, gap 26, top 110 | row, gap 24, top 97 | column, gap 46, top 79 | column, gap 32, top 55 |
| 04 text padding-bottom | 78 | 75 | 0 | 0 |
| 05 text padding-bottom | 26 | 23 | 0 | 0 |
| 05 order | image, text | image, text | **text, image** | **text, image** |
| Split body text max-width | 560px | 560px | 760px | 760px |
| Wrappers and gallery gap | 26 | 24 | 20 | 16 |
| 07 gallery rows | side by side | side by side | side by side | stacked 100% |

---

## 5. About › Formación (fix, replaces spec 3 §9.2 row 8)

| # | Group | `text` ES | `note` ES | `text` EN | `note` EN |
|---|---|---|---|---|---|
| 8 | compact | Curso de fotografía móvil | **Noah Pharrell** | Mobile photography course | **Noah Pharrell** |

Only the instructor's name changes («Farrell» → «Pharrell», two Ls). Rows 1 to 7, their order, the «Talleres y cursos»
group, the compact style and the layout are unchanged. Spec 3 §9.2 says «Noah Farrell (never Noa)»: that spelling is
now wrong; the correct one is **Noah Pharrell**. The CV page does not mention this course, so it has no change.

---

## 6. Assets

### 6.1 New images (`nuevoscambiosPortfolio4-assets/images/`)

All are 3600px wide max, PNG unless noted, with any transparent edge filled with the image's own background colour.
Source folder: `Desktop/PortfolioTony/Proyectos/Rebranding Matchaflix/`.

| File | Source | Size | Framer file | Used in |
|---|---|---|---|---|
| `matchaflix-logo-antes.png` | `logomatchaflix.png` (800 × 146) on a cream canvas, §6.2 | 2400 × 1000 | `GttB2sP6ev9HqM1nT7torE5FQ.png` | 02 |
| `matchaflix-logo-despues.png` | `Matchaflix6.png` on the same canvas, §6.2 | 2400 × 1000 | `C2pgLOR1qLmp8N5ZXIcDd20IDE.png` | 02 |
| `matchaflix-paleta.png` | `Matchaflix4.png` | 3600 × 1827 | `fLmkbsip1uCduKedQmf5umA5I.png` | 03 |
| `matchaflix-grafica-crema.png` | `Matchaflix3-09.png` | 3600 × 2545 | `d25o6d7X0AHH2jZopjZNpILMLE.png` | 04 |
| `matchaflix-grafica-marron.png` | `Matchaflix3-10.png` | 3600 × 2545 | `oeSQYwjLfldZewjoWZVf9JsJgx0.png` | 04 |
| `matchaflix-patron.jpg` | `Matchaflix7.png` (JPEG q90) | 3600 × 2546 | `jVPdTf1TX1aSdtfrinQWmwE4VaQ.jpg` | 05 |
| `matchaflix-i-love-you.png` | `Matchaflix2.png` | 3600 × 2546 | `SNyfJFwHtYCKS03Ilx7RbhmyQY.png` | 06 |
| `matchaflix-emblema.png` | `Matchaflix1.png` | 3600 × 1733 | `ImkU6qq3BKeNhr4JmUnxxeseSMY.png` | 07 |

Framer URLs are `https://framerusercontent.com/images/<file>`. `Matchaflix5.png` (new logo on cream) is not used.
Already in the repo and reused: the T-shirt mockup (stage 06) and the cups / packaging mockups (stage 07).

### 6.2 Logo comparison images

Both logos sit centred on the same 2400 × 1000 canvas filled with the page background `rgb(236, 234, 222)`, so the
carousel frame never changes size and the canvas blends into the page. The old logo has a white background, so its
alpha is rebuilt from the ink colour before placing it (old logo 1300px wide, new logo 1440px wide).
`code/make-matchaflix-logo-comparison.py` reproduces both files exactly (checked pixel by pixel). The old logo source
is only 800px wide, so it is upscaled; a vector or larger file would make it sharper.

---

## 7. Search list (old values to remove from the repo)

| Search for | Where | Action |
|---|---|---|
| `Rebranding conceptual para una marca de matcha` | Matchaflix | replaced by stage 01 (§4.3) |
| `El proyecto parte de esa tensión` | Matchaflix | removed |
| `La esencia del producto se queda` | Matchaflix | replaced by stage 07 |
| `El reto`, `La respuesta` | Matchaflix only | removed (Love keeps them) |
| `Texturas de Matchaflix`, `Textura de Matchaflix` | Matchaflix | carousel removed |
| T-shirt full-width row | Matchaflix gallery | removed; mockup moved to stage 06 |
| `Camisetas de Matchaflix` (alt alone) | Matchaflix | new alt §4.3 |
| `Noah Farrell` | About, dictionary, any spec copy | `Noah Pharrell` |
| `CompositionCarousel.tsx` (spec 3 version) | components | replace with `nuevoscambiosPortfolio4-assets/code/CompositionCarousel.tsx` |

---

## 8. Verification checklist

Check `/projects/matchflix`, `/en/projects/matchflix` and `/about`, `/en/about` at 1440, 1200, 1100, 1024, 900, 810,
600 and 390px.

- [ ] Matchaflix labels 01 → 07 in order; no «El reto», «La respuesta» or texture carousel left.
- [ ] Stage 02: arrows with «ANTES» between them; → shows the new logo and «DESPUÉS» («BEFORE / AFTER» in English). No dots. Frame height does not change between slides.
- [ ] Stages 04 and 06: arrows only, no dots, no name. Swipe works on touch; ← / → work when focused.
- [ ] Every Matchaflix carousel / single image opens fullscreen; the lightbox also shows arrows only for 02, 04 and 06.
- [ ] Palette has a 1px Rule border and the cream swatch is visible.
- [ ] Desktop / Laptop: 04 text left, carousel right; 05 image left, text right; both bottom-aligned.
- [ ] Tablet / Phone: every stage is text first, then media at 100% width (including 05).
- [ ] Every other carousel on the site (Tony Nieve, Metamorfosis, Composiciones) still shows dots.
- [ ] About: last workshop line reads «Curso de fotografía móvil · Noah Pharrell» / «Mobile photography course · Noah Pharrell». Nothing else in Formación changed.
- [ ] English site: every new label, text and alt translated (§4.3). No `—` / `–` in visible text.
- [ ] No horizontal scroll at any width.

---

## 9. Pending (owner decisions)

| # | Item |
|---|---|
| 9.1 | **Publish** the Framer project (this also publishes everything in specs 2 and 3). |
| 9.2 | Old Matchaflix logo is only 800px wide; send a vector or larger file if one exists. |
| 9.3 | The spray textures are hidden in Framer, not deleted. Confirm they can be deleted for good. |
| 9.4 | Still open from spec 3 §14: «Escuela Mateo y Nuria», «Canon 6D Mark», ESADA on the CV. |

---

*Generated on 03/10/2026 from the live state of Framer project `4pRs8QyCSry0wVCAGf6n` (unpublished). Text read
from Framer Localization (ES source + EN). Component typechecked with `tsc --strict`; logo images verified pixel by
pixel against the script output.*
