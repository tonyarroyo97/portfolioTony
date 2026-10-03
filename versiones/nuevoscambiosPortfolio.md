# Portfolio · Tony Arroyo

**Change log & implementation spec · 03/10/2026 · Copy rewrite, social icons, About sections, project galleries, Tony Nieve carousel and reel**

Continues `Versiones/changesPortfolio.md` (02/10) and `Versiones/maquetacionPortfolio.md` (03/10, Projects grid).
Source of truth: Framer project `4pRs8QyCSry0wVCAGf6n`. Production: **https://shaggy-snow-332401.framer.app**.

> **Read this first.**
>
> - **Not published yet.** Everything below is applied in the Framer project but production still serves the
>   02/10 version. Use this file as the reference, not the live site.
> - **This is a specification, not a diff.** I don't have the repository. Every value below was read back from
>   the Framer project after the change, so you can apply it literally.
> - **Dictionary keys** reuse the names from `changesPortfolio.md` §6 wherever a key already existed. New keys are
>   marked **NEW**. Section labels still carry **no** trailing ` /` (the layout appends it, as in 02/10).
> - **Class names** in the code (`.gallery-row`, `.social`…) are placeholders. §12 lists the old values to search
>   for in the repo.
> - **Order of work.** If the repo doesn't have the 03/10 Projects grid yet (`maquetacionPortfolio.md`), apply that
>   first. Nothing here conflicts with it.
> - **Name spelling stays "Tony"** (Tony Arroyo, Tony Nieve). A brief said "Toni"; the owner confirmed "Tony".
>   Only the Instagram handle changed: `@toninieve` → **`@tonynieve`**.

---

## 1. What changed, in one screen

| # | Area | Change |
|---|---|---|
| 1 | Copy, all pages | Rewritten in first person, plainer wording, **no em dashes** anywhere (copy, page titles, footer, alt texts) |
| 2 | Page titles | Separator `—` → `\|`. The Spanish site's `About` / `Contact` titles are now Spanish |
| 3 | Instagram | Text links removed (Contact, About, CV). Replaced by an **Instagram + LinkedIn icon row**. Handle fixed to `@tonynieve` |
| 4 | LinkedIn | New icon, links to `https://www.linkedin.com/in/antonio-arroyo-garc%C3%ADa/` |
| 5 | Contact | Column `Instagram` renamed `Redes` / `Social`. Closing row «Índice · Ver proyectos» **removed** |
| 6 | About | Intro shortened to 3 paragraphs. Services extended. Tools rebuilt as a grouped list. **New** Equipment section. **New** Mentions section (built, **not rendered** until it has content) |
| 7 | CV | Services and Tools updated to match About. Profile paragraph rewritten |
| 8 | Project pages | New intro (`concept`) for all four projects, shown on **every** breakpoint (Phone used to show the old `summary`) |
| 9 | Project galleries | All four galleries use one aligned grid: justified rows, no staggered offsets, uniform gutters |
| 10 | Tony Nieve | Photos regrouped by series. 8 compositions in **one carousel**. **New** reel video |
| 11 | Alt texts | Rewritten without dashes. The Tony Nieve burning-paper photo was labelled «Composición»; it's now «Retrato» |

Unchanged: fonts, text styles, colours, header, navigation, language switch, footer layout, Home, Projects index,
the «Pieza» image + text blocks on Metamorfosis and Love, hover zoom on project images, appear animations.

---

## 2. Shared context (unchanged, needed to apply the changes)

### 2.1 Breakpoints

| Name | Media query |
|---|---|
| Desktop | `(min-width: 1200px)` |
| Laptop | `(min-width: 1024px) and (max-width: 1199.98px)` |
| Tablet | `(min-width: 810px) and (max-width: 1023.98px)` |
| Phone | `(max-width: 809.98px)` |

### 2.2 Tokens and text styles used below

| Token | Value |
|---|---|
| `Ink` | `rgb(40, 24, 34)` |
| `Ink Muted` | `rgb(107, 95, 102)` |
| `Rule` | `rgb(206, 197, 159)` |
| `Paper` | `rgb(236, 234, 222)` |

| Text style | Font | Desktop / ≥810 / <810 |
|---|---|---|
| `Body` | Arimo 400, line-height 1.55em, colour `Ink` | 17 / 16 / 15px |
| `Body Small` | Arimo 400, 14px, line-height 1.5em, colour `Ink Muted` | same |
| `Label` | Arimo 400, 11px, uppercase, letter-spacing 0.09em | same |
| `Lead` | EB Garamond 400, line-height 1.42em, paragraph spacing 26px | 32 (≥1200) / 26 (≥1024) / 21px |

Link style `Inline Link`: underline 1px, offset 4px, decoration colour `Rule`; hover text + decoration `Ink Muted`;
transition `0.3s cubic-bezier(0.44, 0, 0.56, 1)`.

---

## 3. Dictionary changes (ES / EN)

Only changed or new keys. Everything else in `changesPortfolio.md` §6 stays as it is.

### 3.1 `meta` (page `<title>` and description)

| Key | ES | EN |
|---|---|---|
| `meta.default.title` | Tony Arroyo \| Portfolio | Tony Arroyo \| Portfolio |
| `meta.default.description` | Soy Tony Arroyo, director de arte y diseñador gráfico en Madrid. Aquí reúno mis proyectos de fotografía, identidad, editorial y packaging. | I'm Tony Arroyo, an art director and graphic designer based in Madrid. Here you'll find my photography, identity, editorial and packaging work. |
| `meta./projects.title` | Proyectos \| Tony Arroyo | Projects \| Tony Arroyo |
| `meta./projects.description` | Una selección de mis proyectos de identidad, editorial, packaging y dirección de arte. | A selection of my identity, editorial, packaging and art direction projects. |
| `meta./about.title` | Sobre mí \| Tony Arroyo | About \| Tony Arroyo |
| `meta./about.description` | Quién soy, de dónde viene mi relación con la fotografía y el tipo de trabajo que me interesa. También mi experiencia, formación y servicios. | Who I am, where my relationship with photography comes from and the kind of work I'm interested in. Also my experience, education and services. |
| `meta./contact.title` | Contacto \| Tony Arroyo | Contact \| Tony Arroyo |
| `meta./contact.description` | Cómo contactar con Tony Arroyo, director de arte y diseñador gráfico en Madrid. | How to get in touch with Tony Arroyo, art director and graphic designer in Madrid. |
| `meta./cv.title` | CV \| Tony Arroyo | CV \| Tony Arroyo |
| `meta./cv.description` | Currículum de Tony Arroyo, director de arte y diseñador gráfico. | Tony Arroyo's CV. Art director and graphic designer. |
| `meta./projects/tony-nieve.title` | Tony Nieve \| Tony Arroyo | Tony Nieve \| Tony Arroyo |
| `meta./projects/tony-nieve.description` | Tony Nieve, mi proyecto personal de fotografía y dirección de arte. | Tony Nieve, my personal photography and art direction project. |
| `meta./projects/matchflix.title` | Matchaflix \| Tony Arroyo | Matchaflix \| Tony Arroyo |
| `meta./projects/matchflix.description` | Matchaflix, un rebranding conceptual que lleva una marca de matcha hacia el lujo silencioso. | Matchaflix, a conceptual rebrand that takes a matcha brand towards quiet luxury. |
| `meta./projects/metamorfosis.title` | Metamorfosis \| Tony Arroyo | Metamorfosis \| Tony Arroyo |
| `meta./projects/metamorfosis.description` | Metamorfosis, el inicio del cambio. Un libro ilustrado que escribí, ilustré y diseñé como proyecto final de carrera. | Metamorfosis, the beginning of change. An illustrated book I wrote, illustrated and designed as my final degree project. |
| `meta./projects/love-packaging.title` | Love \| Tony Arroyo | Love \| Tony Arroyo |
| `meta./projects/love-packaging.description` | Love, un proyecto conceptual de branding y packaging sobre el amor en todas sus formas. | Love, a conceptual branding and packaging project about love in all its forms. |

### 3.2 `footer`

| Key | ES | EN |
|---|---|---|
| `footer.identity` | Tony Arroyo, director de arte y diseñador gráfico | Tony Arroyo, art director and graphic designer |

It's rendered in `Label Muted` (uppercase), so it reads «TONY ARROYO, DIRECTOR DE ARTE Y DISEÑADOR GRÁFICO».

### 3.3 `about`

`about.intro` now has **3** paragraphs (it had 4). Rendered in `Lead`, max-width 900px, as before.

| Key | ES | EN |
|---|---|---|
| `about.intro[0]` | Soy Tony, director de arte y diseñador gráfico en Madrid. | I'm Tony, an art director and graphic designer based in Madrid. |
| `about.intro[1]` | La fotografía me viene de casa. A mi madre siempre le ha encantado, y fue ella quien me regaló mi primera cámara, más o menos cuando me gradué. Desde 2017 es una parte central de mi trabajo: fotografío y dirijo a personas, desde modelos hasta creadores de contenido y perfiles con presencia pública, y cuido la estética de cada sesión, desde las primeras referencias hasta la última foto. | Photography runs in the family. My mother has always loved it, and she was the one who gave me my first camera, around the time I graduated. Since 2017 it has been a central part of my work: I photograph and direct people, from models to content creators and public-facing profiles, and I shape the look of each shoot, from the first references to the last frame. |
| `about.intro[2]` | Lo que más me gusta es contar historias con imágenes, sobre todo en moda y lifestyle, y eso es lo que busco en la dirección de arte, la fotografía, el diseño gráfico, el branded content y el influencer marketing. | What I enjoy most is telling stories through images, especially in fashion and lifestyle, and that's what I look for in art direction, photography, graphic design, branded content and influencer marketing. |
| ~~`about.intro[3]`~~ | **Removed** | **Removed** |

### 3.4 `sections` (labels)

| Key | ES | EN |
|---|---|---|
| `sections.equipment` **NEW** | Equipo | Equipment |
| `sections.mentions` **NEW** | Menciones | Mentions |

### 3.5 `services` (About and CV)

13 items, in this order. 6 are new.

| # | ES | EN | |
|---|---|---|---|
| 1 | Dirección de arte | Art direction | |
| 2 | Dirección creativa | Creative direction | **NEW** |
| 3 | Fotografía | Photography | |
| 4 | Dirección de modelos | Model direction | **NEW** |
| 5 | Narrativa visual | Visual storytelling | **NEW** |
| 6 | Branded content | Branded content | **NEW** |
| 7 | Creación de contenido | Content creation | **NEW** |
| 8 | Influencer marketing | Influencer marketing | **NEW** |
| 9 | Diseño gráfico | Graphic design | |
| 10 | Identidad visual | Visual identity | |
| 11 | Diseño editorial | Editorial design | |
| 12 | Packaging | Packaging | |
| 13 | Ilustración | Illustration | |

### 3.6 `tools` (About and CV), **replaces** `tools.primary` / `tools.secondary`

```json
"tools": {
  "groups": [
    { "label": { "es": "Diseño",        "en": "Design" },       "items": ["Adobe Photoshop", "Adobe Illustrator", "Adobe InDesign", "Figma", "Affinity", "Canva"] },
    { "label": { "es": "Fotografía",    "en": "Photography" },  "items": ["Adobe Lightroom"] },
    { "label": { "es": "Vídeo",         "en": "Video" },        "items": ["Adobe Premiere Pro", "Adobe After Effects", "CapCut"] },
    { "label": { "es": "Productividad", "en": "Productivity" }, "items": ["Microsoft 365"] }
  ]
}
```

Tool names are identical in both languages. «Affinity» is kept as the generic name: the project folder has an
`.af` file (the unified Affinity app), so no individual Affinity app is named.

### 3.7 `equipment` **NEW** (About only)

No camera or lens model is given on purpose. Only these facts are confirmed.

```json
"equipment": {
  "groups": [
    { "label": { "es": "Cámara",    "en": "Camera" }, "items": [{ "es": "Cámara réflex Canon", "en": "Canon DSLR camera" }] },
    { "label": { "es": "Objetivos", "en": "Lenses" }, "items": [{ "es": "Objetivo de 50 mm", "en": "50 mm lens" }, { "es": "Otros objetivos", "en": "Other lenses" }] }
  ]
}
```

### 3.8 `mentions` **NEW** (About only, empty for now)

```json
"mentions": {
  "types": {
    "photographed":  { "es": "Fotografiado por mí",     "en": "Photographed by me" },
    "shared":        { "es": "Compartió mi fotografía", "en": "Shared my photograph" },
    "feature":       { "es": "Publicación",             "en": "Feature" },
    "collaboration": { "es": "Colaboración",            "en": "Collaboration" }
  },
  "items": []
}
```

Each future item: `{ "name": "…", "type": "photographed" | "shared" | "feature" | "collaboration", "url": "…" | null }`.
**Don't invent entries or URLs.** In Framer the section exists with 4 placeholder rows but is hidden on every
breakpoint. In the repo, **render the section only when `items.length > 0`** (§6.5).

### 3.9 `contact`

| Key | ES | EN |
|---|---|---|
| `contact.instagram` | **Removed** | **Removed** |
| `contact.social.label` **NEW** | Redes | Social |
| `contact.closing.label` / `contact.closing.link` | **Removed** (row deleted, §5) | **Removed** |

### 3.10 `social` **NEW** (same in both languages)

```json
"social": {
  "instagram": { "href": "https://www.instagram.com/tonynieve/", "ariaLabel": "Instagram @tonynieve" },
  "linkedin":  { "href": "https://www.linkedin.com/in/antonio-arroyo-garc%C3%ADa/", "ariaLabel": "LinkedIn" }
}
```

Keep the LinkedIn URL exactly as written (percent-encoded `í`).

### 3.11 `cv`

| Key | ES | EN |
|---|---|---|
| `cv.profile` | Soy director de arte, con formación en diseño gráfico y marketing. Me dedico sobre todo al branding, al contenido visual y a crear conceptos para marcas de moda, lifestyle y proyectos culturales. He trabajado en dirección creativa, fotografía, diseño y producción de contenido, y me gusta participar en todo el proceso, desde la primera idea hasta el resultado final. | I'm an art director with a background in graphic design and marketing. I mostly work on branding, visual content and creative concepts for fashion and lifestyle brands and cultural projects. I've worked in creative direction, photography, design and content production, and I like being involved in the whole process, from the first idea to the finished piece. |

### 3.12 `projectPages.*.concept` (intro, «Concepto»)

Each intro opens differently on purpose. **Render `concept` on every breakpoint.** In Framer the Phone layout used
to show the old one-line `summary` instead; that override is gone. `projectPages.*.summary` is no longer displayed
anywhere and can be deleted from the repo.

| Project | ES | EN |
|---|---|---|
| `tony-nieve` | Proyecto personal de fotografía desarrollado a través de la moda, el retrato y la experimentación visual. Desde 2017 la fotografía es una parte central de mi trabajo: fotografío a personas, trabajo con modelos y creadores de contenido, los dirijo durante las sesiones y decido la dirección visual de cada imagen. | Personal photography project developed through fashion, portraiture and visual experimentation. Photography has been central to my work since 2017. I photograph people, work with models and content creators, direct them during shoots and shape the visual direction of each image. |
| `matchflix` | Rebranding conceptual para una marca de matcha. La esencia del producto se queda; lo que cambia por completo es la forma de mirarlo. | Conceptual rebranding for a matcha brand. The essence of the product stays; what changes completely is the way you look at it. |
| `metamorfosis` | Mi Proyecto Final de Carrera, un libro sobre los finales y sobre cerrar una etapa para poder empezar otra. Lo escribí, lo ilustré, lo diseñé y lo maqueté de principio a fin. | My Final Degree Project, a book about endings and about closing one chapter so another can begin. I wrote, illustrated, designed and laid it out from start to finish. |
| `love-packaging` | Proyecto conceptual de branding y packaging que reinterpreta el estilo visual de Mr. Wonderful a partir del amor en todas sus formas. | Conceptual branding and packaging project that reinterprets Mr. Wonderful's visual style through love in all its forms. |

### 3.13 `projectPages.*.closing` («El proyecto»)

| Project | ES | EN |
|---|---|---|
| `tony-nieve` | Estas imágenes tienen algo de cuento de hadas y también algo de melancolía. En cada foto construyo un pequeño mundo a partir de una luz, un gesto o un personaje, y dejo que la historia aparezca sola, sin explicarla demasiado. Empezó como un proyecto personal, pero su forma de contar encaja de manera natural con la moda, lo editorial y la dirección de arte. | There's something of a fairy tale in these images, and some melancholy too. In each photo I build a small world out of a light, a gesture or a character, and let the story come through on its own without over-explaining it. It started as a personal project, but the way it tells stories fits naturally with fashion, editorial work and art direction. |
| `matchflix` | Con esta propuesta llevé la marca hacia el lujo silencioso. Le di una paleta de color nueva, una tipografía más refinada y un lenguaje gráfico más contenido, y lo apliqué de forma coherente en todas sus piezas. Quería que se sintiera más premium y actual, y que el matcha encajara con la estética del lujo discreto. | With this proposal I took the brand towards quiet luxury. I gave it a new colour palette, more refined typography and a more restrained graphic language, and applied it consistently across every piece. I wanted it to feel more premium and current, and for matcha to sit naturally within the look of understated luxury. |
| `metamorfosis` | La historia sigue las fases del duelo. Cada capítulo es un estado emocional distinto, del enfado a la aceptación, y el texto y la ilustración avanzan juntos para que el cambio se vea, además de leerse. Al final aparece la mariposa, y cerrar una etapa deja de ser solo una pérdida para convertirse en el principio de un cambio. | The story follows the stages of grief. Each chapter is a different emotional state, from anger to acceptance, and the text and illustrations move forward together so you can see the change as well as read it. At the end the butterfly appears, and closing a chapter stops being just a loss and becomes the start of a change. |
| `love-packaging` | Mantuve el tono cercano y emocional de la marca, pero simplifiqué su lenguaje gráfico para que el mensaje se entendiera mejor. El resultado es un packaging limpio y fácil de reconocer, que se adapta a distintos productos. Detrás de todo había una pregunta: hasta dónde se puede llevar una identidad ya consolidada sin que deje de ser ella misma. | I kept the brand's warm, emotional tone but simplified its graphic language so the message came through more clearly. The result is clean packaging that's easy to recognise and adapts to different products. Behind it all was one question: how far can you take an established identity before it stops being itself? |

### 3.14 Alt texts

Cover alts on Home and Projects (`home.coverAlts`, `projects.coverAlts`):

| # | ES | EN |
|---|---|---|
| 0 | Fotografía de Tony Nieve | Tony Nieve photography |
| 1 | Rebranding de Matchaflix | Matchaflix rebrand |
| 2 | Diseño editorial de Metamorfosis | Metamorfosis editorial design |
| 3 | Love Packaging *(unchanged)* | Love Packaging |

Gallery alts are listed per image in §7, with their file. Values used:

| ES | EN |
|---|---|
| Textura de Matchaflix | Matchaflix texture |
| Vasos de Matchaflix | Matchaflix cups |
| Packaging de Matchaflix | Matchaflix packaging |
| Packaging del té matcha de Matchaflix | Matchaflix matcha tea packaging |
| Camisetas de Matchaflix | Matchaflix T-shirts |
| El libro Metamorfosis | The Metamorfosis book |
| Ilustración de Metamorfosis | Metamorfosis illustration |
| Páginas interiores de Metamorfosis | Metamorfosis inside pages |
| Composición *N* de Tony Nieve | Tony Nieve composition *N* |
| Retrato | Portrait |
| Pieza | Piece |
| Tony Nieve | Tony Nieve |
| Love Packaging | Love Packaging |

### 3.15 `carousel` **NEW** (accessible labels of the composition carousel)

| Key | ES | EN |
|---|---|---|
| `carousel.label` | Composiciones | Compositions |
| `carousel.previous` | Anterior | Previous |
| `carousel.next` | Siguiente | Next |
| `carousel.slide` | Imagen | Image |
| `carousel.imageAlt` | Composición {n} de Tony Nieve | Tony Nieve composition {n} |

---

## 4. Social icons (Contact, About, CV)

### 4.1 Behaviour

- Two icons in a row: **Instagram**, then **LinkedIn**. Both are links opening in a new tab
  (`target="_blank" rel="noopener"`), same URL in both languages.
- Icon: 24 × 24px, line drawing, colour `Ink`. Gap between the two links: **14px**. The row has `1px` top and bottom
  padding, so it's 26px tall, the same as one line of `Body` text.
- Hover (desktop): **opacity 0.55**, `0.3s cubic-bezier(0.44, 0, 0.56, 1)`. **No scale.** Only under `(hover: hover)`.
- Accessible names: `aria-label="Instagram @tonynieve"` and `aria-label="LinkedIn"`. The SVGs are `aria-hidden`.
- Same size and spacing on all breakpoints.

### 4.2 Markup and CSS

```html
<div class="social">
  <a class="social__link" href="https://www.instagram.com/tonynieve/" target="_blank" rel="noopener" aria-label="Instagram @tonynieve">
    <svg width="24" height="24" viewBox="0 0 256 256" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="13.33" stroke-linecap="round" stroke-linejoin="round">
      <rect x="32" y="32" width="192" height="192" rx="48"/>
      <circle cx="128" cy="128" r="40"/>
      <circle cx="180" cy="76" r="12" fill="currentColor" stroke="none"/>
    </svg>
  </a>
  <a class="social__link" href="https://www.linkedin.com/in/antonio-arroyo-garc%C3%ADa/" target="_blank" rel="noopener" aria-label="LinkedIn">
    <svg width="24" height="24" viewBox="0 0 256 256" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="13.33" stroke-linecap="round" stroke-linejoin="round">
      <rect x="32" y="32" width="192" height="192" rx="8"/>
      <line x1="120" y1="112" x2="120" y2="176"/>
      <line x1="88" y1="112" x2="88" y2="176"/>
      <path d="M120,140a28,28,0,0,1,56,0v36"/>
      <circle cx="88" cy="84" r="12" fill="currentColor" stroke="none"/>
    </svg>
  </a>
</div>
```

```css
.social { display: flex; flex-direction: row; align-items: center; gap: 14px; padding: 1px 0; width: max-content; }
.social__link { display: flex; color: rgb(40, 24, 34); /* Ink */ transition: opacity 0.3s cubic-bezier(0.44, 0, 0.56, 1); }
.social__link svg { display: block; width: 24px; height: 24px; }
@media (hover: hover) { .social__link:hover { opacity: 0.55; } }
.social__link:focus-visible { outline: 1px solid currentColor; outline-offset: 2px; }
```

The icons are Phosphor's `InstagramLogo` and `LinkedinLogo`, drawn with a **1.25px** stroke at 24px. That's
`stroke-width="13.33"` in the 256 viewBox above. If the repo already uses `@phosphor-icons/react`, you can use those
two components at `size={24}` instead. Phosphor's `light` weight is the closest (1.125px).

### 4.3 Where it goes

| Page | Replaces | Container |
|---|---|---|
| Contact | the value `@toninieve` under the column label | the old «Instagram» column, now labelled `contact.social.label` (§5) |
| About | the list item «Instagram @toninieve» in Contacto | second item of the Contacto list, right after the email |
| CV | the list item «Instagram @toninieve» in Contacto | same position |

---

## 5. Contact page

**Structure after the change**

```
Opening   — «Contacto» + «Hablemos»            (unchanged)
Rule      — Email | Redes | Localización        (Redes = old Instagram column)
Footer
```

- **Removed:** the closing row «Índice ……… Ver proyectos» (`contact.closing`).
- So the space before the footer doesn't collapse, its bottom padding moved to the `Rule` row:

| Breakpoint | `Rule` padding before | `Rule` padding after |
|---|---|---|
| Desktop | `72px 0 0` | **`72px 0 150px`** |
| Laptop | `65px 0 0` | **`65px 0 132px`** |
| Tablet | `43px 0 0` | **`43px 0 108px`** |
| Phone | `0` | **`0 0 75px`** |

  (The removed row had `padding: 150 / 132 / 108 / 75px 0` top and bottom.)
- The three columns are unchanged: `flex: 1`, gap 26px, each column vertical with a 14px gap between label
  (`Label`) and value. In the «Redes» column the value is the `.social` row from §4.

---

## 6. About page

### 6.1 Section order (inside the left `Info` column, gap 80px, unchanged)

1. Experiencia
2. **Menciones** **NEW**, only rendered when it has items (§6.5)
3. Formación
4. Servicios *(extended)*
5. Herramientas *(rebuilt)*
6. **Equipo** **NEW**
7. Idiomas
8. Contacto *(email + `.social` row)*

### 6.2 Section anatomy (same as the existing sections, for the new ones)

| | Desktop | Laptop | Tablet | Phone |
|---|---|---|---|---|
| Section | row, gap 26px | row, gap 26px | row, gap 26px | **column, gap 12px** |
| Label column (`Label`, «Equipo /») | 170px | 145px | 114px | auto (170px) |
| List | `flex: 1`, column | same | same | same |

Appear animation, as on the other sections: from opacity 0, `y: 22px`, spring 0.9s, on view, threshold 0.1, no replay.

### 6.3 Services

Same list styling as before (one `Body` line per item, list gap **8px**), with the 13 items from §3.5.

### 6.4 Tools and Equipment: grouped list

Both use the same pattern: groups separated by 26px; inside each group a muted label (`Body Small`) followed by one
`Body` line per item, 8px apart.

```html
<section class="profile-section">
  <p class="label">Herramientas /</p>
  <div class="grouped-list">
    <div class="grouped-list__group">
      <p class="body-small">Diseño</p>
      <p class="body">Adobe Photoshop</p>
      <p class="body">Adobe Illustrator</p>
      <!-- … -->
    </div>
    <div class="grouped-list__group">
      <p class="body-small">Fotografía</p>
      <p class="body">Adobe Lightroom</p>
    </div>
    <!-- Vídeo, Productividad -->
  </div>
</section>
```

```css
.grouped-list { display: flex; flex-direction: column; gap: 26px; flex: 1; }
.grouped-list__group { display: flex; flex-direction: column; gap: 8px; }
```

Equipment: label «Equipo /» / «Equipment /», groups and items from §3.7.

### 6.5 Mentions

- Same section anatomy. List items like Experience: name in `Body` (+ `Inline Link` style when it has a `url`,
  `target="_blank" rel="noopener"`), and the type in `Body Small` below it, 4px gap; items 26px apart.
- Render the whole section **only if `mentions.items.length > 0`**. There are no entries yet.
- Keep the four types separate (photographed / shared / feature / collaboration); never label them «clients».

### 6.6 Contacto

The list keeps the email item, then the `.social` row (§4) as the second item. List gap 26px (unchanged).

---

## 7. Project galleries: aligned grid

### 7.1 The system (all four project pages)

Every gallery is a vertical stack of **rows**. A row is either one full-width image or a **justified row**: items
side by side with **the same height**, each taking a share of the width proportional to its aspect ratio. Nothing
is cropped beyond its own frame, nothing is offset, gutters are identical horizontally and vertically.

```css
.gallery { display: flex; flex-direction: column; gap: var(--gutter); width: 100%; max-width: 1760px; }
.gallery-row { display: flex; flex-direction: row; align-items: flex-start; gap: var(--gutter); width: 100%; }
.gallery-item {
  flex: var(--ratio) 1 0;   /* width proportional to the aspect ratio → equal heights */
  min-width: 0;
  aspect-ratio: var(--ratio);
  position: relative;
  overflow: clip;
}
.gallery-item > img,
.gallery-item > video { display: block; width: 100%; height: 100%; object-fit: cover; object-position: center; }

:root { --gutter: 26px; }
@media (min-width: 1024px) and (max-width: 1199.98px) { :root { --gutter: 24px; } }
@media (min-width: 810px) and (max-width: 1023.98px)  { :root { --gutter: 20px; } }
@media (max-width: 809.98px) {
  :root { --gutter: 16px; }
  .gallery-row { flex-direction: column; }
  .gallery-item { flex: none; width: 100%; }
}
```

Use `--ratio` = the image's own aspect ratio (width / height) from the tables below. With `flex-basis: 0` and
`flex-grow: ratio`, the items in a row always end up exactly the same height, at any width.

| | Desktop | Laptop | Tablet | Phone |
|---|---|---|---|---|
| Gallery gap (between rows) | 26px (was 90) | 24px (was 80) | 20px (was 68) | 16px (was 52) |
| Gap inside a row | 26px | 24px | 20px | 16px |
| Justified rows | side by side | side by side | side by side | **stacked, 100% width** |

The «Pieza» blocks (image + label + note) on Metamorfosis and Love are **not** part of this change: keep them as
they are.

### 7.2 Tony Nieve: curated order

Files are named as in `Desktop/PortfolioTony/Proyectos/Tony Nieve/`. The Framer file is given for checking.
Photos were matched to the local files by image comparison. Each of the 12 matched exactly one file.

| Row | Series | Items (left → right) | `--ratio` | Alt ES / EN |
|---|---|---|---|---|
| 1 | Opening | `Foto 1.jpeg` (Framer `zWVW9KKnUAGztsRa6E7iy005YDg.jpg`) | 1.5 | Tony Nieve / Tony Nieve |
| 2 | Flower studio shoot | `Foto 21.jpg` (`tl2UzWZvnw0pLD7fW47KDUefWo.jpg`) · **`Reel 21-25.mp4`** · `Foto 24.jpg` (`jkpLUqacfzFdyu5Wbe4XZoQxWw.jpg`) | 0.8 · **0.56** · 0.8 | Retrato / Portrait · (video) · Retrato / Portrait |
| 3 | Daisies, same model | `Foto 6.jpg` (`YFNE5EjXf4xT6aggTM6IG4Mox4.jpg`) · `Foto 12.jpg` (`id08TVMeulUs76mdhavP06DLruI.jpg`) | 0.8 · 0.8 | Retrato / Portrait |
| 4 | Faces and flowers | `Foto 3.jpg` (`Ok46fPKYmTTS1WFrU4AlkT20Nw.jpg`) · `Foto 7.jpg` (`2FREfGKqpcYnqzZEZ5cSFf6zLuU.jpg`) · `Foto 13.jpg` (`JhfzKnnxOBDFxMAM48nyxI9xV7M.jpg`) | 0.8 · 0.8 · 0.8 | Retrato / Portrait |
| 5 | Compositions | **Carousel** with `Composición 1.jpg` … `Composición 8.jpg` (§8) | full width | Composición N de Tony Nieve / Tony Nieve composition N |
| 6 | Backs | `Foto 8.jpg` (`6b5GpC46gX3raapbNNbkZqT9Qzs.jpg`) · `Foto 19.jpg` (`pHcrDDS8yHDHU5kpCgE3fKzjDc.jpg`) | 0.8 · 0.8 | Retrato / Portrait |
| 7 | Veil and fire | `Foto 15.jpg` (`yUhpyTZ4ZZ4tJy7b41m4hbvcM0.jpg`) · `Foto 17.jpg` (`FNKObqlQ555rLOSpJCbObMW5xoI.jpg`) | 0.8 · 1.27 | Retrato / Portrait (Foto 17 was «Composición», fixed) |

Framer image URLs are `https://framerusercontent.com/images/<file>`.

- **Removed from the page as separate images:** the two composition images that used to sit between rows
  (`gSVg2LxtwLvIFgmORrV2pj6mMoo.jpg` = Composición 1, `OPAeasSbVY10pqhuEIRYQqfQPU.jpg` = Composición 2). Both are
  now **inside the carousel**, so no asset is lost.
- **No photo was removed.** All 12 photos that were on the page are still there.
- `Foto 2, 4, 5, 9, 10, 11, 14, 16, 18, 20, 22, 23, 25` exist in the folder but **were not on the page before** and
  are not added.

**Reel** (row 2, middle item), the `Reel 21-25.mp4` file from the same folder (720 × 1280, 17.6 s, no change):

```html
<div class="gallery-item" style="--ratio: 0.56">
  <video src="/assets/tony-nieve/reel-21-25.mp4" autoplay muted loop playsinline preload="metadata"></video>
</div>
```

`object-fit: cover`, no controls, muted, looping, autoplay. Use ratio **0.56** for both the flex grow and the
`aspect-ratio` (the file is 0.5625; 0.56 is what Framer stores, and both values must match to keep equal heights).

### 7.3 Matchaflix

Files from `Desktop/PortfolioTony/Proyectos/Rebranding Matchaflix/`.

| Row | Items (left → right) | `--ratio` | Alt ES / EN |
|---|---|---|---|
| 1 | `Ilustración_sin_título 10.jpg` (Framer `4z4ykBvaK8qKqHS7IFGapE0g8c.jpg`) | 1.33 | Textura de Matchaflix / Matchaflix texture |
| 2 | `Mockups finales /01.  Drinks Cup Mockup 2.jpg` (`3Yn2TtJ3nnpBAScc21KSkuAW40M.jpg`) · `Mockups finales /02.  Drinks Cup Mockup 2.jpg` (`siwfmcNNjNW1ZSmT1KCizy0aQ.jpg`) | 1.33 · 1.33 | Vasos de Matchaflix / Matchaflix cups |
| 3 | `Mockups finales /Packaging.jpg` (`gzSQbS1Phfw9YMuSyK7TbRe0Jxs.jpg`) · `Mockups finales /Packaging Té Matcha.jpg` (`iYlYUznNt4PCZNmQak5fyP1FBNI.jpg`) | 1.33 · 1.5 | Packaging de Matchaflix / Matchaflix packaging · Packaging del té matcha de Matchaflix / Matchaflix matcha tea packaging |
| 4 | `Ilustración_sin_título 8.jpg` (`s5m8eqfcsMyr05ibLnDu5ILk2U.jpg`) · `Ilustración_sin_título 9.jpg` (`RPzhadby9TDL7tuxYTR5miVlXdQ.jpg`) | 1.33 · 1.33 | Textura de Matchaflix / Matchaflix texture |
| 5 | `Mockups finales /T-Shirt Mockups copia.jpg` (`txL5L41W3WKWkEDA4GFNsRrJXI.jpg`) | 1.5 | Camisetas de Matchaflix / Matchaflix T-shirts |

Changes: row 2 lost its 80px offset on the right image; row 3 used to be a single centred 860px image, now paired
with the matcha tea packaging, which was a full-width row of its own.

### 7.4 Metamorfosis

Files from `Desktop/PortfolioTony/Proyectos/Metamorfosis/`.

| Row | Items (left → right) | `--ratio` | Alt ES / EN |
|---|---|---|---|
| 1 | `IMG_2135.JPG` (Framer `tbhOnHCftkT2cMJclI4f51v1Df4.jpg`) | 1.5 | El libro Metamorfosis / The Metamorfosis book |
| 2 | «Pieza» block, **unchanged**: text + image `WdRQZeqjlvmd1NDkBeKn6lCIeI8.jpg` (no local match; take it from Framer) | 0.67 | Pieza / Piece |
| 3 | `Ilustración 1.jpg` (`KR2iy8CqxgRO7ZC1TaWZRvlHFI.jpg`) · `Ilustración 2.jpg` (`RNtdjjzZXo9sqLw3HFdh5oYiOg.jpg`) | 1.33 · 1.33 | Ilustración de Metamorfosis / Metamorfosis illustration |
| 4 | `Ilustración 3.jpg` (`nflXT5XwLQj1KmHeNl37oXOwz2E.jpg`) · `Ilustración 4.jpg` (`kPJwota0nhq7HbqWXRwdfg3jw.jpg`) | 1.33 · 0.79 | Ilustración de Metamorfosis / Metamorfosis illustration |
| 5 | `IMG_2126.JPG` (`2md1GsJwLij99b5KwUH5Wc2blxo.jpg`) | 1.5 | Páginas interiores de Metamorfosis / Metamorfosis inside pages |
| 6 | `IMG_2132.JPG` (`koqjDkPKCAKTcjeMeVUVKmykn5s.jpg`) · `IMG_2133.JPG` (`5TziU31WGmAlkoQCrbwqHqu1bqU.jpg`) · `IMG_2136.JPG` (`r8DnHrFWxCV701XzXgpCePxOYLc.jpg`) | 1.5 · 1.5 · 1.5 | Páginas interiores de Metamorfosis / Metamorfosis inside pages |
| 7 | `IMG_2137.JPG` (`973ySNhlmY7CFwLJgti5w0Ns.jpg`) | 1.5 | El libro Metamorfosis / The Metamorfosis book |

Changes: row 4 (illustrations 3 + 4) moved up next to row 3, so the four illustrations are together; it used to
sit after the inside pages, with a 120px offset on the left image. Row 3 lost its 80px offset.

### 7.5 Love

Files from `Desktop/PortfolioTony/Proyectos/Love Packaging/`.

| Row | Items (left → right) | `--ratio` | Alt ES / EN |
|---|---|---|---|
| 1 | «Pieza» block, **unchanged**: `IMG_4062.jpg` (Framer `gXMM2EzhUd1nGCmDNu0y5HnpvHc.jpg`) + text | 0.67 | Pieza / Piece |
| 2 | `Captura de pantalla 2021-01-25 a las 18.23.40.png` (`TgQlRMiLA89WE3psXqhTiWpc8.jpg`) · `… 18.25.59.png` (`GIbgk9hhO5Je4HxvAuEMqT58.jpg`) · `… 18.26.17.png` (`vO3ONHxCG84Ru4UcVDRmMIu8kv4.jpg`) | 0.66 · 0.66 · 0.68 | Love Packaging / Love Packaging |

Change: row 2 lost its 70px offset on the middle image; the three images now share one height.

---

## 8. Tony Nieve composition carousel

### 8.1 Behaviour

- Shows **one composition at a time**, never cropped: each image is centred inside a fixed frame and scaled with
  `object-fit: contain`, so square and portrait images keep their proportions. Extra space shows the page background.
- Frame (width / height): **1.8** on Desktop and Laptop, **1.4** on Tablet, **1** on Phone. Full width of the gallery.
- Under the frame, 20px below: **‹ arrow · 8 dots · › arrow**, centred, 12px apart.
  - Arrows: 18px chevrons, 1.25px stroke, colour `Ink`, inside 32 × 32px buttons; 25% opacity when disabled at the
    first and last slide; hover 0.55 opacity.
  - Dots: 5px circles inside 16 × 24px buttons (2px apart); active `Ink`, inactive `Rule`.
- Swipe on touch (native horizontal scroll with snap), click on arrows or dots, ← / → keys when focused.
- No autoplay, no loop.
- Accessibility: `role="region"`, `aria-roledescription="carousel"`, `aria-label` from `carousel.label`; each slide is a
  `group` labelled «Imagen 3 / 8»; dots carry `aria-current` on the active one.

### 8.2 Images (in this order)

| # | File (local) | Framer file | Size | Ratio |
|---|---|---|---|---|
| 1 | `Composición 1.jpg` | `NOwNnRW6ReUuXkcmSPH6l4HWvBk.jpg` | 640 × 637 | 1.00 |
| 2 | `Composición 2.jpg` | `gszYLnWy2bQzJL3GaB9cvPYlZN8.jpg` | 921 × 921 | 1.00 |
| 3 | `Composición 3.jpg` | `i1FJ1fPViMeX3nLo0L3P1ckuQ.jpg` | 1440 × 1799 | 0.80 |
| 4 | `Composición 4.jpg` | `bcxWgEed4LeZihgeV8QAnXhF0nw.jpg` | 1440 × 1788 | 0.81 |
| 5 | `Composición 5.jpg` | `uR5vX7bVDhzoIc33PZ8JgpI2jY.jpg` | 1440 × 1800 | 0.80 |
| 6 | `Composición 6.jpg` | `PfLtb1xxtHPaGxmVIpsjkW7oc6Y.jpg` | 1440 × 1449 | 0.99 |
| 7 | `Composición 7.jpg` | `uaWcqlVIbwGYdXgO0TBIlj4Y2fs.jpg` | 1080 × 1346 | 0.80 |
| 8 | `Composición 8.jpg` | `mWQZMSvTKaK7iFdX1knqCytqvs8.jpg` | 3463 × 3463 | 1.00 |

All 8 are `.jpg` (the brief mentioned some `.png`; none exist). Alt: «Composición N de Tony Nieve» /
«Tony Nieve composition N».

### 8.3 Component (React + TypeScript, no dependencies)

This is the component running in Framer (`CompositionCarousel.tsx`), with the Framer-only parts removed
(`addPropertyControls`) and the frame ratio moved to CSS so it can change per breakpoint.

```tsx
// components/CompositionCarousel.tsx
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react"

export interface CarouselImage {
    src: string
    srcSet?: string
    alt: string
}

interface CompositionCarouselProps {
    images: CarouselImage[]
    label: string // carousel.label
    previousLabel: string // carousel.previous
    nextLabel: string // carousel.next
    slideLabel: string // carousel.slide
}

const CLASS = "tn-carousel"

export function CompositionCarousel({ images, label, previousLabel, nextLabel, slideLabel }: CompositionCarouselProps) {
    const items = images.filter((image) => image?.src)
    const count = items.length
    const trackRef = useRef<HTMLDivElement>(null)
    const [index, setIndex] = useState(0)

    const goTo = useCallback(
        (next: number) => {
            const track = trackRef.current
            if (!track || count === 0) return
            const clamped = Math.max(0, Math.min(count - 1, next))
            track.scrollTo({ left: clamped * track.clientWidth, behavior: "smooth" })
        },
        [count]
    )

    // The active slide comes from the track's own scroll position (works for swipe too)
    const onScroll = useCallback(() => {
        const track = trackRef.current
        if (!track || track.clientWidth === 0) return
        setIndex(Math.round(track.scrollLeft / track.clientWidth))
    }, [])

    // Keep the current slide in place when the width changes
    useEffect(() => {
        if (typeof window === "undefined") return
        const track = trackRef.current
        if (!track) return
        const onResize = () => track.scrollTo({ left: index * track.clientWidth })
        window.addEventListener("resize", onResize)
        return () => window.removeEventListener("resize", onResize)
    }, [index])

    const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "ArrowLeft") {
            event.preventDefault()
            goTo(index - 1)
        } else if (event.key === "ArrowRight") {
            event.preventDefault()
            goTo(index + 1)
        }
    }

    const arrow = (direction: "prev" | "next") => {
        const disabled = direction === "prev" ? index <= 0 : index >= count - 1
        return (
            <button
                type="button"
                className={`${CLASS}__arrow`}
                aria-label={direction === "prev" ? previousLabel : nextLabel}
                disabled={disabled}
                onClick={() => goTo(direction === "prev" ? index - 1 : index + 1)}
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {direction === "prev" ? <path d="M15 5l-7 7 7 7" /> : <path d="M9 5l7 7-7 7" />}
                </svg>
            </button>
        )
    }

    return (
        <section className={CLASS} role="region" aria-roledescription="carousel" aria-label={label} onKeyDown={onKeyDown}>
            <div ref={trackRef} className={`${CLASS}__track`} onScroll={onScroll} tabIndex={0}>
                {items.map((image, i) => (
                    <div key={i} className={`${CLASS}__slide`} role="group" aria-roledescription="slide"
                        aria-label={`${slideLabel} ${i + 1} / ${count}`}>
                        <img src={image.src} srcSet={image.srcSet} sizes="(min-width: 810px) 760px, 100vw"
                            alt={image.alt} loading={i === 0 ? "eager" : "lazy"} draggable={false} />
                    </div>
                ))}
            </div>
            {count > 1 && (
                <div className={`${CLASS}__controls`}>
                    {arrow("prev")}
                    <div className={`${CLASS}__dots`}>
                        {items.map((_, i) => (
                            <button key={i} type="button" className={`${CLASS}__dot`}
                                aria-label={`${slideLabel} ${i + 1}`}
                                aria-current={i === index ? "true" : undefined}
                                onClick={() => goTo(i)}>
                                <span />
                            </button>
                        ))}
                    </div>
                    {arrow("next")}
                </div>
            )}
        </section>
    )
}
```

```css
.tn-carousel { --carousel-ratio: 1.8; position: relative; width: 100%; display: flex; flex-direction: column; gap: 20px; color: rgb(40, 24, 34); }
@media (min-width: 810px) and (max-width: 1023.98px) { .tn-carousel { --carousel-ratio: 1.4; } }
@media (max-width: 809.98px) { .tn-carousel { --carousel-ratio: 1; } }

.tn-carousel__track {
  display: flex; width: 100%; aspect-ratio: var(--carousel-ratio);
  overflow-x: auto; overflow-y: hidden;
  scroll-snap-type: x mandatory; overscroll-behavior-x: contain;
  scrollbar-width: none; outline: none;
}
.tn-carousel__track::-webkit-scrollbar { display: none; }
.tn-carousel__slide {
  flex: 0 0 100%; height: 100%;
  display: flex; align-items: center; justify-content: center;
  scroll-snap-align: start; scroll-snap-stop: always;
}
.tn-carousel__slide img { display: block; max-width: 100%; max-height: 100%; width: auto; height: auto; object-fit: contain; user-select: none; }

.tn-carousel__controls { display: flex; align-items: center; justify-content: center; gap: 12px; }
.tn-carousel__arrow {
  display: flex; align-items: center; justify-content: center;
  width: 32px; height: 32px; padding: 0; border: 0; background: transparent; color: inherit; cursor: pointer;
  transition: opacity 0.3s ease;
}
.tn-carousel__arrow:disabled { opacity: 0.25; cursor: default; }
@media (hover: hover) { .tn-carousel__arrow:not(:disabled):hover { opacity: 0.55; } }
.tn-carousel__dots { display: flex; align-items: center; gap: 2px; }
.tn-carousel__dot { display: flex; align-items: center; justify-content: center; width: 16px; height: 24px; padding: 0; border: 0; background: transparent; cursor: pointer; }
.tn-carousel__dot span { display: block; width: 5px; height: 5px; border-radius: 50%; background: rgb(206, 197, 159); transition: background 0.3s ease; }
.tn-carousel__dot[aria-current="true"] span { background: rgb(40, 24, 34); }
.tn-carousel__arrow:focus-visible, .tn-carousel__dot:focus-visible { outline: 1px solid currentColor; outline-offset: 2px; }
```

Usage (row 5 of the Tony Nieve gallery, §7.2):

```tsx
<CompositionCarousel
  images={[1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({
    src: `/assets/tony-nieve/composicion-${n}.jpg`,
    alt: t("carousel.imageAlt", { n }), // «Composición N de Tony Nieve»
  }))}
  label={t("carousel.label")}
  previousLabel={t("carousel.previous")}
  nextLabel={t("carousel.next")}
  slideLabel={t("carousel.slide")}
/>
```

Adapt `t()` and the asset paths to the repo. It's SSR-safe: `window` is only read inside effects and handlers.

---

## 9. New assets to add to the repo

| File | Source | Used in |
|---|---|---|
| `Composición 1.jpg` … `Composición 8.jpg` | `Desktop/PortfolioTony/Proyectos/Tony Nieve/` | Tony Nieve carousel (§8) |
| `Reel 21-25.mp4` (1.5 MB, 720 × 1280) | same folder | Tony Nieve row 2 (§7.2). Framer: `https://framerusercontent.com/assets/BiGzJ0YIUmoPuZhim9m31TpWL0.mp4` |

No other image changed. Photos in the galleries are the same files as before, only their order and layout changed.

---

## 10. CV page

- `cv.profile`: new text (§3.11).
- Services: same 13 items as About (§3.5). The CV keeps its own list spacing (26px between items, as before).
- Tools: same grouped list as About (§3.6, §6.4).
- Contacto: «Instagram @toninieve» replaced by the `.social` row (§4).
- No Equipment or Mentions on the CV.

---

## 11. Not changed: don't touch

- Text styles, fonts, colours, spacing outside the sections listed above.
- Header, navigation, mobile drawer, ES/EN switch (`changesPortfolio.md` §5), footer layout.
- Home and the Projects index (the Projects grid spec is `maquetacionPortfolio.md`).
- Experience and Education content, languages, email address, locale routing and SEO tags (only their text
  changed, §3.1).
- The «Pieza» image + text blocks on Metamorfosis and Love.

---

## 12. Finding the old code in the repo

| Search for | What it was | Replace with |
|---|---|---|
| `toninieve` | Instagram handle / URL | §3.10, §4 |
| `Instagram @` | written Instagram links on About and CV | `.social` row |
| `—` (em dash) and `–` | separators in titles, footer, alts, prose | §3 |
| `About — Tony Arroyo`, `Contact — Tony Arroyo` | English titles on the Spanish site | §3.1 |
| `Ver proyectos` / `View projects` inside the Contact page | closing row | delete (§5) |
| `Photoshop, Illustrator, InDesign` + `Premiere, CapCut` | old tools block | §3.6 |
| `Llegué al diseño por la fotografía`, `I came to design through photography` | old About intro | §3.3 |
| `Proyecto fotográfico personal, iniciado en 2016` | old Tony Nieve concept | §3.12 |
| `summary` keys on project pages / any Phone-only intro | old one-line description | render `concept` instead |
| `gap: 90px` (and 80 / 68 / 52px) on project galleries | old row spacing | §7.1 |
| `padding-top: 70px / 80px / 90px / 110px / 120px` (Laptop 81px, Tablet 54px) on gallery columns | staggered offsets | remove (§7.1) |
| fixed gallery widths `520px`, `700px`, `760px`, `860px` | centred «narrow» rows | §7.2–§7.4 |

---

## 13. Verification checklist

Run on every page in both `/…` and `/en/…`, at 1440, 1200, 1100, 1024, 900, 810, 600, 390 and 320 px.

- [ ] No `—` or `–` in any visible text, `<title>`, meta description or `alt`.
- [ ] `toninieve` appears nowhere. Instagram goes to `https://www.instagram.com/tonynieve/`, LinkedIn to
      `https://www.linkedin.com/in/antonio-arroyo-garc%C3%ADa/`, both in a new tab.
- [ ] Contact: three columns (Email / Redes / Localización), no «Índice · Ver proyectos» row, footer still well spaced.
- [ ] About: intro has 3 paragraphs and no «aunque no lleve mi nombre» / «without my name on it».
- [ ] About: Services 13 items; Tools in 4 groups including Adobe Lightroom and Affinity; Equipment present;
      Mentions not rendered.
- [ ] On Phone, each About section shows its label above the list.
- [ ] Project intros start differently and the Phone layout shows the same `concept` text as Desktop.
- [ ] In every justified row, all items have the same top and the same height (±1px), and gutters are equal.
- [ ] Tony Nieve: 12 photos + reel + carousel. The reel autoplays muted and loops inline on iOS (`playsinline`).
- [ ] Carousel: 8 dots; arrows disable at the ends; swipe works on touch; no image is cropped.
- [ ] No horizontal scroll at any width (`document.documentElement.scrollWidth === innerWidth`).

Quick check for a justified row (paste on a project page; adapt the selector):

```js
document.querySelectorAll(".gallery-row").forEach((row, i) => {
  const r = [...row.children].map((c) => c.getBoundingClientRect())
  console.log(i, r.map((x) => `${Math.round(x.top)}/${Math.round(x.height)}`).join("  "))
})
```

Expected: inside each row, every item prints the same `top/height`.

---

## 14. Framer-only notes (not needed for the repo)

- The carousel is the code component `CompositionCarousel.tsx` (image list, frame ratio, colours and labels are
  editable in the properties panel). The reel uses Framer's built-in **Video** component.
- The social icons are Framer's Phosphor icons (`Instagram Logo`, `Linkedin Logo`, stroke width 1.25, colour `Ink`).
  Framer's hover effect adds `scale: 1.1` by default; it was reset to `1` so the hover is opacity only.
- The Mentions section exists on the About canvas as «Menciones (oculto hasta tener contenido)», hidden on every
  breakpoint, with 4 placeholder rows. To use it: replace the placeholders, add the links, set it visible.
- On each project page the Phone breakpoint had overridden the intro with the old `summary` text. That override
  was replaced with the new intro.
- English values were written to Localization explicitly. Editing Spanish on the canvas doesn't always flag the
  English as «needs review», so every changed string was set by hand.

---

## 15. Pending

| # | Item |
|---|---|
| 15.1 | **Publish** the Framer project. This also publishes the Projects grid from `maquetacionPortfolio.md`. Then re-run §13 on production. |
| 15.2 | **Mentions:** names, type and links are needed. Until then the section stays hidden. |
| 15.3 | **2017 vs 2016:** the copy follows the brief («desde 2017»). The previous Tony Nieve text said the project started in 2016; that sentence was removed. Confirm the year. |
| 15.4 | Still open from earlier specs: slug `/projects/matchflix` (24/09 §10.3). |

---

*Generated on 03/10/2026 from the live state of Framer project `4pRs8QyCSry0wVCAGf6n` (unpublished changes).
Image-to-file mapping verified by comparing the Framer images with the files in `Desktop/PortfolioTony/Proyectos/`.*
