# Portfolio · Tony Arroyo

**Consolidated implementation spec · 03/10/2026 · every change made in Framer in this session, final state**

Copy rewrite (ES/EN), social icons, Contact page headline, About restructure (accordions + Mentions carousel with
22 verified mentions), aligned project galleries, Tony Nieve curation + composition carousel + reel, Love cover.

Continues `Versiones/changesPortfolio.md` (02/10) and `Versiones/maquetacionPortfolio.md` (03/10, Projects grid).
**Replaces `Versiones/nuevoscambiosPortfolio.md`**: same changes, written as one final state without the round-by-round
history. If both files disagree, this one wins.
Source of truth: Framer project `4pRs8QyCSry0wVCAGf6n`. Production: **https://shaggy-snow-332401.framer.app**.

> **Read this first.**
>
> - **Not published yet.** Everything below is applied in the Framer project but production still serves the
>   02/10 version. Use this file as the reference, not the live site.
> - **Final state only.** Where something was changed several times during the session (About, Contact, Mentions),
>   only the last version is described. Old values to look for in the repo are in §12.
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
| 5 | Contact | «Contacto» + «Hablemos» replaced by the headline **«Si tienes una historia, / buscamos su imagen.»** and a supporting line. Column `Instagram` renamed `Redes` / `Social`. Closing row «Índice · Ver proyectos» **removed** |
| 6 | About | Intro shortened to 3 paragraphs. Services extended, Tools regrouped, **new** Equipment. **Experience, Education, Services, Tools, Equipment and Languages are all accordions** (one open at a time). The Contacto list was **removed** from About. **New Mentions carousel** with 22 verified mentions (LOOC, Shangay and 20 Instagram posts/reels), at the end of About |
| 6b | Love cover | Home and Projects card: the **whole packaging** is now visible (photo shown uncropped over a blurred copy of itself), same 3:2 card, grid unchanged |
| 7 | CV | Services and Tools updated to match About. Profile paragraph rewritten |
| 8 | Project pages | New intro (`concept`) for all four projects, shown on **every** breakpoint (Phone used to show the old `summary`) |
| 9 | Project galleries | All four galleries use one aligned grid: justified rows, no staggered offsets, uniform gutters |
| 10 | Tony Nieve | Photos regrouped by series. 8 compositions in **one carousel**. **New** reel video |
| 11 | Alt texts | Rewritten without dashes. The Tony Nieve burning-paper photo was labelled «Composición»; it's now «Retrato» |

Unchanged: fonts, text styles, colours, header, navigation, language switch, footer layout, Home and Projects index (except the Love card, §7.6),
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
| `sections.languages` (now an accordion title) | Idiomas | Languages |

Accordion titles reuse `sections.experience` (Experiencia / Experience), `sections.education` (Formación /
Education), `sections.services` (Servicios / Services), `sections.tools` (Herramientas / Tools),
`sections.equipment` and `sections.languages`. They are rendered **without** the trailing ` /`.

### 3.4b Contact page header **NEW** (replaces `contact.tag` and `contact.statement`)

| Key | ES | EN |
|---|---|---|
| `contact.headline` | Si tienes una historia,⏎buscamos su imagen. | If you have a story,⏎we'll find its image. |
| `contact.text` | Hago fotografía, dirección de arte, diseño gráfico y branded content. Escríbeme y lo hablamos. | I do photography, art direction, graphic design and branded content. Write to me and we'll talk it through. |
| `contact.tag` («Contacto») | **Removed** | **Removed** |
| `contact.statement` («Hablemos») | **Removed** | **Removed** |
| `about.mentions.count` **NEW** | (02) | (02) |

`⏎` is a forced line break (`<br>`), always after the comma. The headline wording «buscamos» is the owner's.
There is **no** contact block on the About page.

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

### 3.8 `mentions` **NEW** (About only)

**22 verified mentions.** None is a client. No follower counts. Creators are shown by their **exact Instagram
username** (Instagram usernames are lowercase), brands and publications by their name.

```json
"mentions": {
  "labels": {
    "link":          { "es": "Ver mención",      "en": "View mention" },
    "editorialLink": { "es": "Ver reportaje",    "en": "View feature" },
    "previous":      { "es": "Anterior",         "en": "Previous" },
    "next":          { "es": "Siguiente",        "en": "Next" },
    "slide":         { "es": "Mención",          "en": "Mention" },
    "noImage":       { "es": "Imagen pendiente", "en": "Image pending" },
    "reel":          { "es": "Reel",             "en": "Reel" },
    "video":         { "es": "Vídeo",            "en": "Video" }
  },
  "contexts": {
    "editorial":      { "es": "Editorial · Crédito de fotografía",  "en": "Editorial · Photography credit" },
    "fashionCredit":  { "es": "Moda · Crédito de fotografía",       "en": "Fashion · Photography credit" },
    "creditCondesa":  { "es": "Crédito de fotografía · La Condesa", "en": "Photography credit · La Condesa" },
    "fashion":        { "es": "Fotografía de moda",                 "en": "Fashion photography" },
    "photography":    { "es": "Fotografía",                         "en": "Photography" },
    "mention":        { "es": "Fotografía · Mención",               "en": "Photography · Mention" },
    "collaboration":  { "es": "Colaboración · Fotografía",          "en": "Collaboration · Photography" },
    "videoMention":   { "es": "Mención · Grabación",                "en": "Mention · Video shoot" },
    "feature":        { "es": "Destacado · Fotografía",             "en": "Feature · Photography" }
  }
}
```

**Item schema** (all optional except `name`): `secondaryName` (small muted line: real name or @username of a brand),
`detail` (small muted line, ES/EN), `context` (key above), `url`, `editorial` (link label «Ver reportaje»),
`type` (`post` | `reel` | `video`; reels and videos get a small badge), `orientation` (`vertical` = 4:5,
`horizontal` = 3:2), `focus` = `object-position` in % (x, y), `zoom` (≥ 100, default 100), `phoneFocus` /
`phoneZoom` (under 810px, default = desktop), `fit` (`cover` by default), `image` and `alt` (ES/EN).

**Items, in carousel order** (images in `Desktop/PortfolioTony/Proyectos/Menciones/`; all `orientation: vertical`,
`type: post`, `focus: 50 50` unless the row says otherwise):

| # | Name | Secondary / detail | Context | URL | Image | Framing / type |
|---|---|---|---|---|---|---|
| 1 | LOOC | detail «Mercado Navarrete · Eduardo Navarrete» | editorial (editorial: true) | https://www.looc.es/la-travesura-mas-castiza-de-eduardo-navarrete/ | `looc.jpg` | horizontal |
| 2 | Eduardo Navarrete | | mention | https://www.instagram.com/p/CbSKEPUIRAg/ | `ig-CbSKEPUIRAg.jpg` | focus 50 30 |
| 3 | Shangay | detail «Mercado Navarrete · Eduardo Navarrete» | editorial (editorial: true) | https://shangay.com/tendencias/eduardo-navarrete-madrid-bano-lgtbi/ | `shangay.jpg` | horizontal, focus 70 50 |
| 4 | Eduardo Navarrete | | mention | https://www.instagram.com/p/CbDJjunI8Js/?img_index=6 | `ig-CbDJjunI8Js.jpg` | horizontal, focus 50 30 |
| 5 | La Condesa | @lacondesaconde · detail «Colección cápsula Fénix» / «Fénix capsule collection» | fashionCredit | https://www.instagram.com/p/CfpAWAHrcWH/ | `ig-CfpAWAHrcWH.jpg` | |
| 6 | @gemamakeup.es | Gema Bajo | creditCondesa | https://www.instagram.com/reel/CfbYVhkjboG/ | `ig-CfbYVhkjboG.jpg` | reel, focus 50 15 |
| 7 | La Condesa | @lacondesaconde | fashion | https://www.instagram.com/p/CfFAovGhyiO/ | `ig-CfFAovGhyiO.jpg` | |
| 8 | @isabelgomilaig | Isabel Gomila | fashion | https://www.instagram.com/reel/CbrwUmYqzWA/ | `ig-CbrwUmYqzWA.jpg` | reel, focus 50 5 |
| 9 | @estelanaval_ | | photography | https://www.instagram.com/p/ClI8qVfo6Zi/ | `ig-ClI8qVfo6Zi.jpg` | |
| 10 | @mimatateliershop | | fashion | https://www.instagram.com/reel/CbuEtr8j2vt/ | `ig-CbuEtr8j2vt.jpg` | reel, focus 50 20 |
| 11 | @alternativx.es | | fashion | https://www.instagram.com/p/Cf9OUT2jX4G/ | `ig-Cf9OUT2jX4G.jpg` | |
| 12 | @patriciasinprisa | Lucía Morger | collaboration | https://www.instagram.com/p/CkbiOhxDoVf/ | `ig-CkbiOhxDoVf.jpg` | focus 50 100 |
| 13 | @lapastanoengorda | | mention | https://www.instagram.com/p/CGABOm3j7uw/?img_index=5 | `ig-CGABOm3j7uw.jpg` | focus 30 50 |
| 14 | @gemavadillo | | mention | https://www.instagram.com/p/BwXdjzqBxKi/ | `ig-BwXdjzqBxKi.jpg` | focus 50 40 |
| 15 | @lapastanoengorda | | mention | https://www.instagram.com/p/CYTlzndK8US/ | `ig-CYTlzndK8US.jpg` | |
| 16 | @alexpenyas | Alex Peñas | mention | https://www.instagram.com/p/CCMZpRQhjLX/ | `ig-CCMZpRQhjLX-frame.jpg` | video, horizontal, focus 50 40 |
| 17 | @javialonso | | photography | https://www.instagram.com/p/Bqm4y--nikl/ | `ig-Bqm4y--nikl.jpg` | |
| 18 | @ellamuore | detail «Fotos del post: @fer.nnd0» / «Photos in the post: @fer.nnd0» | videoMention | https://www.instagram.com/p/Cgum9qUDBDl/ | `ig-Cgum9qUDBDl.jpg` | |
| 19 | @lapastanoengorda | | mention | https://www.instagram.com/p/B9ZFgxmqhCX/ | `ig-B9ZFgxmqhCX.jpg` | focus 45 50 |
| 20 | @sombrebeings | | feature | https://www.instagram.com/p/B01YYYvlQ2K/ | `ig-B01YYYvlQ2K.jpg` | |
| 21 | @human.edge | | feature | https://www.instagram.com/p/BZVVMswHa3j/ | `ig-BZVVMswHa3j.jpg` | |
| 22 | @sombrebeings | | feature | https://www.instagram.com/p/BXtnWUqD3oi/ | `ig-BXtnWUqD3oi.jpg` | |

**Alt texts** (ES / EN):

| # | ES | EN |
|---|---|---|
| 1 | Desfile Mercado Navarrete de Eduardo Navarrete en LOOC | Eduardo Navarrete's Mercado Navarrete show on LOOC |
| 2 | Retrato de Eduardo Navarrete | Portrait of Eduardo Navarrete |
| 3 | Desfile Mercado Navarrete de Eduardo Navarrete en Shangay | Eduardo Navarrete's Mercado Navarrete show in Shangay |
| 4 | Desfile de Eduardo Navarrete | Eduardo Navarrete's fashion show |
| 5 | Colección Fénix de La Condesa en Instagram | La Condesa's Fénix collection on Instagram |
| 6 | Reel de @gemamakeup.es sobre la sesión de La Condesa | Reel by @gemamakeup.es about the La Condesa shoot |
| 7 | Publicación de La Condesa en Instagram | Instagram post by La Condesa |
| 8 | Reel de @isabelgomilaig en Instagram | Instagram reel by @isabelgomilaig |
| 9 | Publicación de @estelanaval_ en Instagram | Instagram post by @estelanaval_ |
| 10 | Reel de @mimatateliershop en Instagram | Instagram reel by @mimatateliershop |
| 11 | Publicación de @alternativx.es en Instagram | Instagram post by @alternativx.es |
| 12 | Retrato de @patriciasinprisa | Portrait of @patriciasinprisa |
| 13 | Retrato con flores de @lapastanoengorda | Portrait of @lapastanoengorda with flowers |
| 14 | Retrato de @gemavadillo con una cámara | Portrait of @gemavadillo holding a camera |
| 15 | Retrato de @lapastanoengorda con flores | Portrait of @lapastanoengorda with flowers |
| 16 | Fotograma del vídeo de @alexpenyas | Still from @alexpenyas's video |
| 17 | Publicación de @javialonso en Instagram | Instagram post by @javialonso |
| 18 | Publicación de @ellamuore en Instagram | Instagram post by @ellamuore |
| 19 | Retrato de @lapastanoengorda | Portrait of @lapastanoengorda |
| 20, 22 | Fotografía de Tony destacada por @sombrebeings | Tony's photograph featured by @sombrebeings |
| 21 | Fotografía de Tony destacada por @human.edge | Tony's photograph featured by @human.edge |

**Order logic:** editorial coverage of the Mercado Navarrete show and Eduardo Navarrete (1–4), the La Condesa
shoots (5–7), fashion designers and brands from the 15 Segundos period (8–11, with 8 and 9 from what looks like
the same shoot), creator portraits (12–19, the three @lapastanoengorda posts spread out), then the 2017–2019
features by photography curators (20–22).

**Evidence for each item** (from the public caption on 03/10/2026; not displayed):

| # | Account, date | What the source says | Label chosen |
|---|---|---|---|
| 1 | LOOC article, March 2022 | photos credited to «Tony Photographer» | Editorial · credit |
| 2 | @eduardonavarreteoficial, 19/03/2022 | «gracias @chicodenieve por estos retratos» | Photography · Mention |
| 3 | Shangay, 17/03/2022 | «FOTOS: Tony Photographer y Pablo Paniagua»; card image = same moment as #4, so Tony's | Editorial · credit |
| 4 | @eduardonavarreteoficial, 13/03/2022 | «foto @chicodenieve» | Photography · Mention |
| 5 | @lacondesaconde, 05/07/2022 | «Fotografía: @tonynieve», Fénix capsule collection | Fashion · Photography credit |
| 6 | @gemamakeup.es (reel), 30/06/2022 | «Sesión de fotos de @lacondesaconde … Photo: @tonynieve» | Photography credit · La Condesa |
| 7 | @lacondesaconde, 21/06/2022 | no credit in the caption | Fashion photography |
| 8 | @isabelgomilaig (reel), 29/03/2022 | no credit in the caption | Fashion photography |
| 9 | @estelanaval_, 19/11/2022 | no credit in the caption | Photography |
| 10 | @mimatateliershop (reel), 30/03/2022 | mentions a shoot at @15segundos_store; no credit in the caption | Fashion photography |
| 11 | @alternativx.es, 13/07/2022 | no credit in the caption | Fashion photography |
| 12 | post by @lucia_amor_hair, 01/11/2022 | «La maravilla de foto de portada es de @tonynieve»; person = Lucía Morger (@patriciasinprisa), per the owner | Collaboration · Photography |
| 13 | @lapastanoengorda, 06/10/2020 | «@chicodenieve me hizo estas fotos» | Photography · Mention |
| 14 | @gemavadillo, 17/04/2019 | «📷: @chicodenieve» | Photography · Mention |
| 15 | @lapastanoengorda, 04/01/2022 | «Estas fotos me las hizo @chicodenieve» | Photography · Mention |
| 16 | @alexpenyas (video), 03/07/2020 | «Soon w @chicodenieve» | Photography · Mention |
| 17 | @javialonso, 25/11/2018 | no credit in the caption | Photography |
| 18 | @ellamuore, 01/08/2022 | photos by @fer.nnd0, «…que grabamos con @tonynieve»; the card says who took the photos | Mention · Video shoot |
| 19 | @lapastanoengorda, 06/03/2020 | «📸 : @chicodenieve» | Photography · Mention |
| 20 | @sombrebeings, 06/08/2019 | «Photo: @chicodenieve» (curated feature) | Feature · Photography |
| 21 | @human.edge, 21/09/2017 | «Featured artist: @chicodenieve» | Feature · Photography |
| 22 | @sombrebeings, 12/08/2017 | «Featured artist: @chicodenieve» | Feature · Photography |

Items 7–11 and 17 don't credit Tony **in the caption** (he may be tagged on the photo, which can't be read without
logging in). They're labelled neutrally («Fotografía», «Fotografía de moda»), never as collaboration, advertising or
branded content.

Images: the full first photo of each post, or the reel cover (1080 × 1350 for most posts; reels 1016 × 1800 and
720 × 1280). For #16 the video's own cover is a book page, so a frame from the video at 11.2s is used
(720 × 406). Carousel posts can only be read up to their first photo without logging in.

### 3.9 `contact`

| Key | ES | EN |
|---|---|---|
| `contact.instagram` | **Removed** | **Removed** |
| `contact.social.label` **NEW** | Redes | Social |
| `contact.closing.label` / `contact.closing.link` | **Removed** (row deleted, §5) | **Removed** |
| `contact.tag`, `contact.statement` | **Removed**, replaced by §3.4b | **Removed** |

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
| About | the list item «Instagram @toninieve» in Contacto | **nothing**: About no longer has a contact block (§6.1) |
| CV | the list item «Instagram @toninieve» in Contacto | same position |

---

## 5. Contact page

**Structure after the change**

```
Opening   «Si tienes una historia, / buscamos su imagen.»  (h1)    NEW
          «Hago fotografía, dirección de arte, … Escríbeme y lo hablamos.»   NEW
Rule      Email | Redes | Localización        (Redes = old Instagram column)
Footer
```

**Opening**

- **Removed:** the small label «Contacto» (`Label Muted`) and the word «Hablemos».
- **Headline** (`contact.headline`): same text treatment «Hablemos» had: EB Garamond 400, letter-spacing −0.03em,
  line-height 1em, colour `Ink`, **font size fitted to the content width** (Framer «auto-fit 100%»), now on two lines
  with a forced break after the comma. Tag **`h1`**. The longest line decides the size:

  | Locale | Longest line | Width at 1px font (with −0.03em tracking) |
  |---|---|---|
  | ES | «buscamos su imagen.» | 7.48em |
  | EN | «we'll find its image.» | 6.71em |

  So `font-size = content width / 7.48` (ES) or `/ 6.71` (EN): ≈ 153px at 1200, ≈ 103px at 810, ≈ 48px at 390
  (ES). CSS equivalent, with a small safety margin:

  ```css
  .contact-opening { container-type: inline-size; }
  .contact-headline { font-family: "EB Garamond", serif; font-weight: 400; letter-spacing: -0.03em; line-height: 1em;
                      font-size: calc(100cqw / 7.5); margin: 0; }
  :lang(en) .contact-headline { font-size: calc(100cqw / 6.75); }
  ```

- **Supporting line** (`contact.text`) in `Lead` (EB Garamond 32 / 26 / 21px, line-height 1.42em), max-width 760px.
- Opening: vertical stack, gap and padding per breakpoint:

| | Desktop | Laptop | Tablet | Phone |
|---|---|---|---|---|
| Opening padding | `230px 0 72px` | `207px 0 65px` | `138px 0 52px` | `64px 0 40px` |
| Gap headline → line | 40px | 36px | 28px | 20px |

**Rule row (Email · Redes · Localización)**

- **Removed:** the closing row «Índice ……… Ver proyectos» (`contact.closing`). Its bottom space moved to the Rule row.

| Breakpoint | `Rule` padding (original) | `Rule` padding (now) |
|---|---|---|
| Desktop | `72px 0 0` | **`72px 0 150px`** |
| Laptop | `65px 0 0` | **`65px 0 132px`** |
| Tablet | `43px 0 0` | **`43px 0 108px`** |
| Phone | `0` | **`32px 0 75px`** |

- The three columns are unchanged: `flex: 1`, gap 26px, each column vertical with a 14px gap between label
  (`Label`) and value. In the «Redes» column the value is the `.social` row from §4 (Instagram + LinkedIn,
  `https://www.linkedin.com/in/antonio-arroyo-garc%C3%ADa/`).

---

## 6. About page

### 6.1 Page structure (final)

```
Opening        «Tony Arroyo» + role + location                       (unchanged)
Rule           «Sobre mí ……… (01)»                                    (unchanged)
Intro          3 paragraphs, Lead                                    (§3.3)
Profile        [ Info column | Portrait (sticky, unchanged) ]
  Info: accordion list (1px Rule line above each item, one under the last)
      EXPERIENCIA    +            5 items: company + role             (content unchanged)
      FORMACIÓN      +            3 items: title + school             (content unchanged)
      SERVICIOS      +            13 items (§3.5)
      HERRAMIENTAS   +            4 groups (§3.6)
      EQUIPO         +            2 groups (§3.7)
      IDIOMAS        +            Español / Nativo · Inglés / B2
Rule           «Menciones ……… (02)»                                   NEW
Mentions       horizontal carousel, 22 cards                          NEW (§6.3)
Footer
```

**Removed from the page:** the open Experiencia / Formación / Servicios / Herramientas / Equipo / Idiomas sections
(all their content now lives in the accordions; nothing was dropped) and the «Contacto /» list. About has **no
contact block**; contact is on the Contact page only (§5).

The «Menciones (02)» row is a copy of «Sobre mí (01)»: full width, `border-top: 1px solid Rule`, `padding: 16px 0 0`,
label in `Label` on the left, count in `Label Muted` on the right.

Profile padding is unchanged: `96px 0 150px` / `84px 0 132px` / `69px 0 108px` / `48px 0 75px`.

### 6.2 Accordions (Experience, Education, Services, Tools, Equipment, Languages)

**Behaviour**

- All closed on load. **Only one open at a time**: opening one closes the others.
- The whole title row is a `<button>` with `aria-expanded` / `aria-controls`; the panel is a `region` labelled by
  the title; closed content is `inert`.
- Height animates with `grid-template-rows: 0fr → 1fr`, **0.45s cubic-bezier(0.44, 0, 0.56, 1)**; content fades
  0 → 1 over 0.35s.
- Indicator: an 11px «+» (two 1px lines, `Ink`); when open, the vertical line rotates flat so it reads «−».
- Hover (desktop only): title row at opacity 0.6. No boxes, no backgrounds, only the 1px `Rule` lines.

**Layout**

- Full width of the Info column. Title row `padding: 22px 0`, title in `Label` (11px, uppercase, 0.09em), icon right.
- Panel `padding: 6px 0 34px`; content indented by the old label column + gap (170 + 26 / 145 + 26 / 114 + 26px),
  so it sits where the lists used to be. No indent on Phone.
- Items: text in `Body`, optional note in `Body Small` 4px below. Groups 26px apart, group label in `Body Small`.

| Accordion | ES title / EN title | Item gap | Content |
|---|---|---|---|
| Experiencia | Experiencia / Experience | 26px | `Freelance` · Director de arte / Art director; `4AM Studio` · Creative director; `GoodNews Coffee` · Director de arte y diseñador gráfico / Art director and graphic designer; `La Condesa` · Fotografía de moda / Fashion photography; `15 Segundos` · Creative assistant y fotografía / Creative assistant and photography |
| Formación | Formación / Education | 26px | Curso de Dirección de Arte en Publicidad · CEI Escuela de Diseño y Marketing, Madrid; Grado en Diseño Gráfico + Especialización en Marketing · ESADA, Granada; Grado en Bellas Artes · Universidad Complutense de Madrid (EN as in `changesPortfolio.md` §6) |
| Servicios | Servicios / Services | 8px | the 13 items of §3.5 |
| Herramientas | Herramientas / Tools | 8px | the 4 groups of §3.6 |
| Equipo | Equipo / Equipment | 8px | the 2 groups of §3.7 |
| Idiomas | Idiomas / Languages | 26px | Español · Nativo; Inglés · B2 (EN: Spanish · Native; English · B2) |

The component is in §8.4.

### 6.3 Mentions carousel

- Section padding: `48px 0 150px` / `40px 0 132px` / `32px 0 108px` / `24px 0 75px`.
- Horizontal track with native scroll snapping, swipe on touch, smooth scrolling; no autoplay, no loop.
- **Photography first, no mats.** The photo fills its frame (`object-fit: cover`) with its own focal point; there is
  no grey background or padding around photos (the `Surface` colour only shows when an image is missing).
- **Two frame sizes**, sharing one height `--m-h` (**360px** Desktop, **320px** Laptop, **300px** Tablet and Phone):
  - vertical cards: **4:5**, width `0.8 × --m-h` (288px on Desktop). All vertical creator photos use this.
  - horizontal cards: **3:2**, width `min(1.5 × --m-h, 100% − 48px)`. Editorial and naturally landscape photos
    stay horizontal. On Phone the 3:2 frame is capped by the screen, so it gets shorter rather than cropping
    more.
- Gap between cards: 26 / 24 / 20 / 16px. About 3 cards on Desktop, 2 on Tablet, 1 + a peek on Phone.
- Text under the photo, 14px below it, 6px between lines, in this order:
  1. **name** in EB Garamond 400, 24px (22 Tablet, 21 Phone), line-height 1.15em, letter-spacing −0.01em, `Ink`
  2. optional real name (`secondaryName`) in `Body Small`, muted
  3. optional detail line in `Body Small`, muted (publications: «Mercado Navarrete · Eduardo Navarrete»)
  4. context in `Label` style, muted, 2px extra top margin
  5. «↗ VER MENCIÓN» or, for editorial items, «↗ VER REPORTAJE», in `Label`, `Ink`, 4px extra top margin
- The whole card is the link (`target="_blank" rel="noopener"`). Hover (desktop): photo `scale(1.02)` over
  0.8s cubic-bezier(0.4, 0, 0.2, 1) and the «↗» line at opacity 0.55.
- **Reels and videos** carry a small badge in the photo's top-left corner (10px from the edges): a 7px play
  triangle + «REEL» / «VÍDEO» (EN «VIDEO»), 10px uppercase, letter-spacing 0.09em, text `Paper`, background
  `rgba(40, 24, 34, 0.55)`, padding 4px 7px. Clicking opens the original post; there is no player in the card.
- Controls under the track, after a 1px `Rule` line and 12px padding: ‹ · position · ›, centred. With up to 10
  cards the position is shown as dots; **above 10 it's a counter «01 / 22»** (`Label` style, tabular figures), so
  the controls stay small on Phone however many mentions are added. Arrows disable at the ends; ← / → keys move
  between cards.
- Accessibility: `role="region"`, `aria-roledescription="carousel"`, `aria-label` «Menciones»; each card is a
  `group` labelled «Mención 12 / 22: @patriciasinprisa».

The component is in §8.5.

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

### 7.6 Love cover on Home and Projects

The Love card (04) on **Home** and on the **Projects index** used a portrait photo (`IMG_4062.jpg`, 0.667) inside the
3:2 card frame with `object-fit: cover`, which cut the top and bottom of the box. Now the **complete photo** is shown,
centred, over a blurred copy of itself that fills the rest of the frame. The card keeps its 3:2 frame, so the
grid doesn't move.

```html
<a class="project-card__image love-cover" href="/projects/love-packaging">
  <div class="love-cover__inner">                                   <!-- keeps the existing hover zoom -->
    <img class="love-cover__backdrop" src="/assets/love/IMG_4062.jpg" alt="" aria-hidden="true">
    <img class="love-cover__photo" src="/assets/love/IMG_4062.jpg" alt="Love Packaging">
  </div>
</a>
```

```css
.love-cover { aspect-ratio: 1.5; overflow: clip; position: relative; }
.love-cover__inner {
  position: relative; width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: center;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);       /* existing hover: scale 1.02 */
}
@media (hover: hover) { .project-card:hover .love-cover__inner { transform: scale(1.02); } }
.love-cover__backdrop {
  position: absolute; inset: 0; width: 100%; height: 100%;
  object-fit: cover; filter: blur(40px); transform: scale(1.15); pointer-events: none;
}
.love-cover__photo {
  position: relative; width: 52%; height: 100%; object-fit: cover; object-position: center;
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 18%, #000 82%, transparent 100%);
          mask-image: linear-gradient(90deg, transparent 0%, #000 18%, #000 82%, transparent 100%);
}
```

- `52%` of a 3:2 frame is a 0.78 window on a 0.667 photo: it trims about 7% at the top and bottom of the photo
  (empty pink background only). The whole box, including its base, stays visible.
- The side mask fades the photo into the blurred backdrop, so there's no hard seam.
- Same values on every breakpoint (the frame is always 3:2). Alt text unchanged: «Love Packaging».
- The Love project page itself is unchanged; its «Pieza» image already shows the full box.

---

## 8. Components: composition carousel, About accordions, Mentions carousel

### 8.1 Tony Nieve composition carousel: behaviour

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

### 8.2 Composition carousel: images (in this order)

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

### 8.3 Composition carousel component (React + TypeScript, no dependencies)

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

### 8.4 About accordion component

Port of `AboutAccordion.tsx` from Framer, without Framer controls. «One open at a time» is handled by the parent
list, which is simpler in a repo than the event Framer uses between separate instances.

```tsx
// components/AboutAccordions.tsx
import { useId, useState } from "react"

export interface AccordionItem { text: string; note?: string }
export interface AccordionGroup { label?: string; items: AccordionItem[] }
export interface AccordionSection { title: string; groups: AccordionGroup[]; itemGap?: number }

export function AboutAccordions({ sections }: { sections: AccordionSection[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(null)
    return (
        <div className="about-acc-list">
            {sections.map((section, i) => (
                <AboutAccordion key={section.title} {...section} open={openIndex === i}
                    onToggle={() => setOpenIndex(openIndex === i ? null : i)} />
            ))}
        </div>
    )
}

function AboutAccordion({ title, groups, itemGap = 8, open, onToggle }: AccordionSection & { open: boolean; onToggle: () => void }) {
    const id = useId()
    return (
        <div className="about-acc" data-open={open}>
            <button type="button" className="about-acc__head" aria-expanded={open} aria-controls={`${id}-panel`} onClick={onToggle}>
                <span className="about-acc__title">{title}</span>
                <span className="about-acc__icon" aria-hidden="true" />
            </button>
            <div id={`${id}-panel`} role="region" aria-label={title} className="about-acc__panel">
                <div className="about-acc__clip" inert={!open}>
                    <div className="about-acc__body">
                        <div className="about-acc__spacer" />
                        <div className="about-acc__groups">
                            {groups.map((group, g) => (
                                <div key={g} className="about-acc__group" style={{ gap: itemGap }}>
                                    {group.label && <p className="body-small">{group.label}</p>}
                                    {group.items.map((item, k) => (
                                        <div key={k} className="about-acc__item">
                                            <p className="body">{item.text}</p>
                                            {item.note && <p className="body-small">{item.note}</p>}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
```

If your React version types `inert` as a string, use `inert={open ? undefined : ""}`.

```css
.about-acc-list { display: flex; flex-direction: column; border-bottom: 1px solid rgb(206, 197, 159); }
.about-acc { --acc-label: 170px; --acc-gap: 26px; border-top: 1px solid rgb(206, 197, 159); color: rgb(40, 24, 34); }
@media (min-width: 1024px) and (max-width: 1199.98px) { .about-acc { --acc-label: 145px; } }
@media (min-width: 810px) and (max-width: 1023.98px)  { .about-acc { --acc-label: 114px; } }
@media (max-width: 809.98px)                          { .about-acc { --acc-label: 0px; --acc-gap: 0px; } }

.about-acc__head {
  display: flex; align-items: center; justify-content: space-between; width: 100%;
  padding: 22px 0; margin: 0; border: 0; background: none; color: inherit; font: inherit; text-align: left; cursor: pointer;
  transition: opacity 0.3s cubic-bezier(0.44, 0, 0.56, 1);
}
@media (hover: hover) { .about-acc__head:hover { opacity: 0.6; } }
.about-acc__head:focus-visible { outline: 1px solid currentColor; outline-offset: 4px; }
.about-acc__title { font: 400 11px/1.2em "Arimo", sans-serif; letter-spacing: 0.09em; text-transform: uppercase; }

.about-acc__icon { position: relative; width: 11px; height: 11px; flex: 0 0 11px; }
.about-acc__icon::before, .about-acc__icon::after {
  content: ""; position: absolute; left: 0; top: 50%; width: 11px; height: 1px; background: currentColor;
  transition: transform 0.45s cubic-bezier(0.44, 0, 0.56, 1);
}
.about-acc__icon::after { transform: rotate(90deg); }                                  /* + */
.about-acc[data-open="true"] .about-acc__icon::after { transform: rotate(0deg); }       /* − */

.about-acc__panel { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.45s cubic-bezier(0.44, 0, 0.56, 1); }
.about-acc[data-open="true"] .about-acc__panel { grid-template-rows: 1fr; }
.about-acc__clip { overflow: hidden; min-height: 0; }
.about-acc__body { display: flex; gap: var(--acc-gap); padding: 6px 0 34px; opacity: 0; transition: opacity 0.35s ease; }
.about-acc[data-open="true"] .about-acc__body { opacity: 1; }
.about-acc__spacer { flex: 0 0 var(--acc-label); }
.about-acc__groups { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 26px; }
.about-acc__group { display: flex; flex-direction: column; }
.about-acc__item { display: flex; flex-direction: column; gap: 4px; }
```

`.body` and `.body-small` are your existing `Body` / `Body Small` styles. Usage:

```tsx
<AboutAccordions sections={[
  { title: t("sections.experience"), itemGap: 26, groups: [{ items: experience.map((e) => ({ text: e.company, note: e.role })) }] },
  { title: t("sections.education"),  itemGap: 26, groups: [{ items: education.map((e) => ({ text: e.title, note: e.school })) }] },
  { title: t("sections.services"),   groups: [{ items: services.map((text) => ({ text })) }] },
  { title: t("sections.tools"),      groups: tools.groups },
  { title: t("sections.equipment"),  groups: equipment.groups },
  { title: t("sections.languages"),  itemGap: 26, groups: [{ items: languages.map((l) => ({ text: l.name, note: l.level })) }] },
]} />
```

### 8.5 Mentions carousel component

Port of `MentionsCarousel.tsx` from Framer, without Framer controls. It doesn't depend on the number of items.

```tsx
// components/MentionsCarousel.tsx
import React, { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react"

export interface MentionCard {
    name: string
    secondaryName?: string
    detail?: string
    context?: string
    url?: string | null
    editorial?: boolean
    type?: "post" | "reel" | "video"
    orientation?: "vertical" | "horizontal"
    image?: { src: string; srcSet?: string; alt: string }
    fit?: "cover" | "contain"
    zoom?: number                 // % (100 = no zoom)
    focus?: [number, number]      // object-position in %
    phoneZoom?: number
    phoneFocus?: [number, number]
}

interface Labels { region: string; link: string; editorialLink: string; previous: string; next: string; slide: string; noImage: string; reel: string; video: string }

const MAX_DOTS = 10   // above this, a «01 / 22» counter replaces the dots

function framingVars(m: MentionCard): React.CSSProperties {
    const [x, y] = m.focus ?? [50, 50]
    const [px, py] = m.phoneFocus ?? [x, y]
    const zoom = (m.zoom ?? 100) / 100
    return {
        "--fit": m.fit ?? "cover",
        "--zoom": zoom,
        "--pos": `${x}% ${y}%`,
        "--zoom-m": m.phoneZoom ? m.phoneZoom / 100 : zoom,
        "--pos-m": `${px}% ${py}%`,
    } as React.CSSProperties
}

export function MentionsCarousel({ items, labels }: { items: MentionCard[]; labels: Labels }) {
    const trackRef = useRef<HTMLDivElement>(null)
    const [index, setIndex] = useState(0)
    const [atStart, setAtStart] = useState(true)
    const [atEnd, setAtEnd] = useState(false)
    const count = items.length

    const cards = () => Array.from(trackRef.current?.children ?? []) as HTMLElement[]

    const goTo = useCallback((next: number) => {
        const track = trackRef.current
        const list = cards()
        if (!track || list.length === 0) return
        const target = list[Math.max(0, Math.min(list.length - 1, next))]
        track.scrollTo({ left: target.offsetLeft - list[0].offsetLeft, behavior: "smooth" })
    }, [])

    const onScroll = useCallback(() => {
        const track = trackRef.current
        const list = cards()
        if (!track || list.length === 0) return
        const left = track.scrollLeft
        const max = track.scrollWidth - track.clientWidth
        let nearest = 0
        list.forEach((card, i) => {
            const offset = card.offsetLeft - list[0].offsetLeft
            if (Math.abs(offset - left) < Math.abs(list[nearest].offsetLeft - list[0].offsetLeft - left)) nearest = i
        })
        setIndex(left >= max - 2 ? list.length - 1 : nearest)
        setAtStart(left <= 2)
        setAtEnd(left >= max - 2)
    }, [])

    useEffect(() => {
        if (typeof window === "undefined") return
        onScroll()
        window.addEventListener("resize", onScroll)
        return () => window.removeEventListener("resize", onScroll)
    }, [onScroll, count])

    const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "ArrowLeft") { event.preventDefault(); goTo(index - 1) }
        else if (event.key === "ArrowRight") { event.preventDefault(); goTo(index + 1) }
    }

    if (count === 0) return null

    const arrow = (dir: "prev" | "next") => (
        <button type="button" className="mentions__arrow" aria-label={dir === "prev" ? labels.previous : labels.next}
            disabled={dir === "prev" ? atStart : atEnd} onClick={() => goTo(dir === "prev" ? index - 1 : index + 1)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25"
                strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {dir === "prev" ? <path d="M15 5l-7 7 7 7" /> : <path d="M9 5l7 7-7 7" />}
            </svg>
        </button>
    )

    return (
        <section className="mentions" role="region" aria-roledescription="carousel" aria-label={labels.region} onKeyDown={onKeyDown}>
            <div ref={trackRef} className="mentions__track" onScroll={onScroll}>
                {items.map((m, i) => {
                    const Tag = m.url ? "a" : "div"
                    const linkProps = m.url ? { href: m.url, target: "_blank", rel: "noopener" } : {}
                    return (
                        <Tag key={i} {...linkProps} className="mentions__card" data-orientation={m.orientation ?? "vertical"}
                            role="group" aria-roledescription="slide" aria-label={`${labels.slide} ${i + 1} / ${count}: ${m.name}`}>
                            <div className="mentions__media" data-empty={!m.image} style={framingVars(m)}>
                                {m.image ? (
                                    <img src={m.image.src} srcSet={m.image.srcSet} sizes="(min-width: 810px) 540px, 90vw"
                                        alt={m.image.alt} loading="lazy" draggable={false} />
                                ) : (
                                    <span className="mentions__detail">{labels.noImage}</span>
                                )}
                                {(m.type === "reel" || m.type === "video") && (
                                    <span className="mentions__badge">
                                        <svg width="7" height="8" viewBox="0 0 7 8" aria-hidden="true"><path d="M0 0l7 4-7 4z" fill="currentColor" /></svg>
                                        {m.type === "reel" ? labels.reel : labels.video}
                                    </span>
                                )}
                            </div>
                            <div className="mentions__text">
                                <span className="mentions__name">{m.name}</span>
                                {m.secondaryName && <span className="mentions__detail">{m.secondaryName}</span>}
                                {m.detail && <span className="mentions__detail">{m.detail}</span>}
                                {m.context && <span className="mentions__context">{m.context}</span>}
                                {m.url && <span className="mentions__more">↗ {m.editorial ? labels.editorialLink : labels.link}</span>}
                            </div>
                        </Tag>
                    )
                })}
            </div>
            {count > 1 && (
                <div className="mentions__controls">
                    {arrow("prev")}
                    {count > MAX_DOTS ? (
                        <span className="mentions__counter" aria-live="polite">
                            {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                        </span>
                    ) : (
                        <div className="mentions__dots">
                            {items.map((_, i) => (
                                <button key={i} type="button" className="mentions__dot" aria-label={`${labels.slide} ${i + 1}`}
                                    aria-current={i === index ? "true" : undefined} onClick={() => goTo(i)}>
                                    <span />
                                </button>
                            ))}
                        </div>
                    )}
                    {arrow("next")}
                </div>
            )}
        </section>
    )
}
```

```css
.mentions { --m-h: 360px; --m-gap: 26px; --m-name: 24px; display: flex; flex-direction: column; gap: 24px; width: 100%; color: rgb(40, 24, 34); }
@media (min-width: 1024px) and (max-width: 1199.98px) { .mentions { --m-h: 320px; --m-gap: 24px; } }
@media (min-width: 810px) and (max-width: 1023.98px)  { .mentions { --m-h: 300px; --m-gap: 20px; --m-name: 22px; } }
@media (max-width: 809.98px)                          { .mentions { --m-h: 300px; --m-gap: 16px; --m-name: 21px; } }

.mentions__track {
  display: flex; align-items: flex-start; gap: var(--m-gap); overflow-x: auto; overflow-y: hidden;
  scroll-snap-type: x mandatory; overscroll-behavior-x: contain; scroll-behavior: smooth; scrollbar-width: none;
}
.mentions__track::-webkit-scrollbar { display: none; }
.mentions__card { flex: 0 0 auto; display: flex; flex-direction: column; gap: 14px; scroll-snap-align: start; color: inherit; text-decoration: none; }
.mentions__card[data-orientation="vertical"]   { width: calc(var(--m-h) * 0.8); }
.mentions__card[data-orientation="horizontal"] { width: min(calc(var(--m-h) * 1.5), calc(100% - 48px)); }
.mentions__media { position: relative; width: 100%; overflow: hidden; display: flex; align-items: center; justify-content: center; }
.mentions__badge {
  position: absolute; left: 10px; top: 10px; display: flex; align-items: center; gap: 5px; padding: 4px 7px;
  background: rgba(40, 24, 34, 0.55); color: rgb(236, 234, 222); pointer-events: none;
  font: 400 10px/1em "Arimo", sans-serif; letter-spacing: 0.09em; text-transform: uppercase;
}
.mentions__card[data-orientation="vertical"]   .mentions__media { aspect-ratio: 4 / 5; }
.mentions__card[data-orientation="horizontal"] .mentions__media { aspect-ratio: 3 / 2; }
.mentions__media[data-empty="true"] { background: rgb(232, 229, 222); }      /* only when there's no image */
.mentions__media img {
  display: block; width: 100%; height: 100%;
  object-fit: var(--fit); object-position: var(--pos); scale: var(--zoom);
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
@media (max-width: 809.98px) { .mentions__media img { object-position: var(--pos-m); scale: var(--zoom-m); } }

.mentions__text { display: flex; flex-direction: column; gap: 6px; }
.mentions__name { font: 400 var(--m-name)/1.15em "EB Garamond", serif; letter-spacing: -0.01em; overflow-wrap: anywhere; }
.mentions__detail { font: 400 14px/1.5em "Arimo", sans-serif; color: rgb(107, 95, 102); }
.mentions__context, .mentions__more { font: 400 11px/1.2em "Arimo", sans-serif; letter-spacing: 0.09em; text-transform: uppercase; }
.mentions__context { color: rgb(107, 95, 102); margin-top: 2px; }
.mentions__more { margin-top: 4px; transition: opacity 0.3s cubic-bezier(0.44, 0, 0.56, 1); }
@media (hover: hover) {
  a.mentions__card:hover .mentions__media img { transform: scale(1.02); }
  a.mentions__card:hover .mentions__more { opacity: 0.55; }
  .mentions__arrow:not(:disabled):hover { opacity: 0.55; }
}
.mentions__controls { display: flex; align-items: center; justify-content: center; gap: 12px; border-top: 1px solid rgb(206, 197, 159); padding-top: 12px; }
.mentions__arrow { display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; padding: 0; border: 0; background: none; color: inherit; cursor: pointer; transition: opacity 0.3s ease; }
.mentions__arrow:disabled { opacity: 0.25; cursor: default; }
.mentions__dots { display: flex; align-items: center; gap: 2px; }
.mentions__counter { min-width: 64px; text-align: center; font: 400 11px/1.2em "Arimo", sans-serif; letter-spacing: 0.09em; font-variant-numeric: tabular-nums; }
.mentions__dot { display: flex; align-items: center; justify-content: center; width: 16px; height: 24px; padding: 0; border: 0; background: none; cursor: pointer; }
.mentions__dot span { display: block; width: 5px; height: 5px; border-radius: 50%; background: rgb(206, 197, 159); transition: background 0.3s ease; }
.mentions__dot[aria-current="true"] span { background: rgb(40, 24, 34); }
.mentions__card:focus-visible, .mentions__arrow:focus-visible, .mentions__dot:focus-visible { outline: 1px solid currentColor; outline-offset: 3px; }
```

Build `items` from §3.8 for the active locale: resolve `context` through `mentions.contexts`, `alt` per language;
`name`, `secondaryName`, `url`, `type` and framing are the same in both; `detail` is per language where §3.8 gives
two values. Pass `labels` from `mentions.labels` plus
`region: t("sections.mentions")`.

---

## 9. New assets to add to the repo

| File | Source | Used in |
|---|---|---|
| `Composición 1.jpg` … `Composición 8.jpg` | `Desktop/PortfolioTony/Proyectos/Tony Nieve/` | Tony Nieve carousel (§8) |
| `Reel 21-25.mp4` (1.5 MB, 720 × 1280) | same folder | Tony Nieve row 2 (§7.2). Framer: `https://framerusercontent.com/assets/BiGzJ0YIUmoPuZhim9m31TpWL0.mp4` |

| Mentions images (22) | `Desktop/PortfolioTony/Proyectos/Menciones/` (`looc.jpg`, `shangay.jpg` and one `ig-<post code>.jpg` per Instagram post; for #16 `ig-CCMZpRQhjLX-frame.jpg`) | Mentions carousel (§3.8 lists the file of each item, §6.3) |

The mention images are the full, uncropped first photo of each public post and the LOOC article's lead image,
saved on 03/10/2026. Instagram's own image links expire, so use the saved files, not Instagram URLs. No other image changed: gallery photos are the same
files as before, only their order and layout changed. The Love cover reuses `IMG_4062.jpg` twice (§7.6).

---

## 10. CV page

- `cv.profile`: new text (§3.11).
- Services: same 13 items as About (§3.5). The CV keeps its own list spacing (26px between items, as before).
- Tools: same 4 groups as About (§3.6), but on the CV they stay an open list (not an accordion): muted group label, then one `Body` line per tool, 8px apart, groups 26px apart.
- Contacto: «Instagram @toninieve» replaced by the `.social` row (§4).
- No Equipment or Mentions on the CV.

---

## 11. Not changed: don't touch

- Text styles, fonts, colours, spacing outside the sections listed above.
- Header, navigation, mobile drawer, ES/EN switch (`changesPortfolio.md` §5), footer layout.
- Home and the Projects index, except the Love card image (§7.6). The Projects grid spec is `maquetacionPortfolio.md`.
- The Contact page (only the changes in §5). The new CTA is on the About page.
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
| About sections `Experiencia /`, `Formación /`, `Servicios /`, `Herramientas /`, `Equipo /`, `Idiomas /` | open lists | accordions (§6.2, §8.4) |
| About section `Contacto /` (email + icons) | contact list on About | delete: About has no contact block; contact is on the Contact page (§5) |
| `object-fit: cover` on the Love card image (Home, Projects) | cropped box | §7.6 |

---

## 13. Verification checklist

Run on every page in both `/…` and `/en/…`, at 1440, 1200, 1100, 1024, 900, 810, 600, 390 and 320 px.

- [ ] No `—` or `–` in any visible text, `<title>`, meta description or `alt`.
- [ ] `toninieve` appears nowhere. Instagram goes to `https://www.instagram.com/tonynieve/`, LinkedIn to
      `https://www.linkedin.com/in/antonio-arroyo-garc%C3%ADa/`, both in a new tab.
- [ ] Contact: three columns (Email / Redes / Localización), no «Índice · Ver proyectos» row, footer still well spaced.
- [ ] About: intro has 3 paragraphs and no «aunque no lleve mi nombre» / «without my name on it».
- [ ] About: Experience, Education, Services (13 items), Tools (4 groups incl. Adobe Lightroom and Affinity),
      Equipment and Languages are all closed on load; each opens smoothly with + → −; opening one closes the
      others; keyboard works; no content missing compared with `changesPortfolio.md` §6.
- [ ] On Phone, accordion content has no indent.
- [ ] About has **no** contact block; it ends with «Menciones (02)» and the carousel.
- [ ] Contact: headline «Si tienes una historia, / buscamos su imagen.» fills the content width on two lines at every
      width (no third line, no overflow); supporting line below; Email / Redes / Localización row; LinkedIn works.
- [ ] Mentions: 22 cards in the §3.8 order, no duplicate URLs; @patriciasinprisa with «Lucía Morger» below; no
      «Lucía Amor» / «Lucia Amor» anywhere; each card opens its exact URL in a new tab; no follower or like counts;
      reels (#6, #8, #10) and the video (#16) show the small badge; the counter reads «01 / 22»; swipe works.
- [ ] No grey mats around photos. All vertical cards are the same 4:5 size; horizontal cards are 3:2; no photo is
      stretched; every face is fully visible on Desktop, Tablet and Phone.
- [ ] Love card on Home and Projects shows the whole box, not stretched; the grid rows stay aligned.
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

Code components in the Framer project (all edited from the properties panel; their text is in Localization):

| File | Used on | Properties |
|---|---|---|
| `CompositionCarousel.tsx` | Tony Nieve, row 5 | Images, Frame ratio (1.8 / 1.8 / 1.4 / 1 per breakpoint), Color, Inactive dot, Gap, labels |
| `AboutAccordion.tsx` | About, 6 instances | Title, Groups (Label + Lines: one item per line, `Text \| Note` for a second line), Item gap, colours, Group (default `about`: accordions in the same group close each other through a window event; the repo port in §8.4 uses parent state instead) |
| `MentionsCarousel.tsx` | About, Mentions | per mention: Image, Name, Real name, Context, Detail, URL, Editorial, Type (Post / Reel / Video), Orientation (Vertical 4:5 / Horizontal 3:2), Fit, Zoom, Focus X / Y, Phone zoom / focus X / focus Y (empty or 0 = desktop value); global: link labels, Reel / Video labels, Max dots (10), colours |
| `LocaleSwitch.tsx` | Navigation | unchanged (`changesPortfolio.md` §5.3) |

Other notes:

- The Tony Nieve reel uses Framer's built-in **Video** component (upload, autoplay, muted, loop, no controls, cover).
- Social icons are Framer's Phosphor icons (`Instagram Logo`, `Linkedin Logo`, stroke width 1.25, colour `Ink`).
  Framer's hover effect adds `scale: 1.1` by default; it's set to `1`, so the hover is opacity only.
- Love card (Home and Projects): the inner image layer (which carries the hover zoom) holds «Backdrop» (same image,
  blur 40px, scale 1.15) and «Photo» (52% width, side mask).
- The «Menciones (02)» rule row is a duplicate of «Sobre mí (01)»; its English was set explicitly («Mentions»)
  because a duplicate keeps the original's translation.
- The Contact headline is the former «Hablemos» text layer: now an `h1` with two runs and a line break, font size
  «auto-fit 100%».
- On each project page the Phone breakpoint used to override the intro with the old `summary` text; it now shows
  the same intro as Desktop.
- English values were written to Localization explicitly. Editing Spanish on the canvas doesn't always flag the
  English as «needs review», and replacing a code component's list creates new Localization entries, so after
  editing the Mentions list check that its English is still set.

---

## 15. Pending

| # | Item |
|---|---|
| 15.1 | **Publish** the Framer project. This also publishes the Projects grid from `maquetacionPortfolio.md`. Then re-run §13 on production. |
| 15.2 | **Instagram handle in the credits:** older captions (2017–2022) credit **@chicodenieve**, recent ones (2022) **@tonynieve**. The site never shows Tony's own handle on the cards; confirm @chicodenieve was Tony's account before mentioning it anywhere. |
| 15.3 | **Mention images from multi-photo posts:** without logging in only the **first** photo (or the reel cover) of a post can be fetched. Two links point to a specific slide (`?img_index=6`, `?img_index=5`). If a later slide is the credited or a better photo, swap the image. |
| 15.4 | **Uncredited captions:** Mentions #7–#11 and #17 don't credit Tony in their caption (he may be tagged on the photo). They're labelled neutrally («Fotografía», «Fotografía de moda»); make the label more specific if you have the details. |
| 15.5 | **@ellamuore (#18):** the post's photos are by @fer.nnd0; Tony is only mentioned («grabamos con @tonynieve»). The card says so. Remove it, or replace the image with a frame from Tony's footage, to show only Tony's own images. |
| 15.6 | **Phone spacing in Mentions:** the track takes the height of its tallest card, so a horizontal card shows some extra space under its text on Phone. Accepted to avoid cropping horizontal photos into the vertical frame. |
| 15.7 | **2017 vs 2016:** the copy follows the brief («desde 2017»). The previous Tony Nieve text said the project started in 2016; that sentence was removed. Confirm the year. |
| 15.8 | Still open from earlier specs: slug `/projects/matchflix` (24/09 §10.3). |

---

*Generated on 03/10/2026 from the live state of Framer project `4pRs8QyCSry0wVCAGf6n` (unpublished changes).
Image-to-file mapping verified by comparing the Framer images with the files in `Desktop/PortfolioTony/Proyectos/`.*
