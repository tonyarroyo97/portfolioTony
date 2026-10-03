# Portfolio — Tony Arroyo

**Change log & implementation spec — 02/10/2026 — ES/EN language switch + Matchaflix alt text fixes + unused `Menu` removed**

Continues `Versiones/Portfolio_Tony_24-09-2026.md`. Source of truth: Framer project `4pRs8QyCSry0wVCAGf6n`.
Production: **https://shaggy-snow-332401.framer.app** (published version `c8025858a`; full publish
history in §9).

> **Read this first.**
>
> - I don't have access to the GitHub repository, so this is a *specification*, not a diff against
>   your files. To keep it as drop-in as possible, everything a repo needs is given as literal values:
>   the routing rules, the switch behaviour, and the full ES/EN dictionary in §6. All of them were
>   extracted programmatically from the live project and the served HTML at the end of the session,
>   not written from memory.
> - **No source file was written or edited in Framer this session.** The code file `LocaleSwitch.tsx`
>   already existed; it was only *attached* to the layers (§9). The changes were site configuration
>   (locales), content (219 English strings) and wiring. The repo, on the other hand, needs real code
>   (§4–§5); a reference implementation is included.
> - It assumes the repo is up to date with the 23/09 and 24/09 specs. The keys in §6 reuse the 23/09
>   key names wherever one existed, so you can overwrite your existing dictionary values key by key.

---

## 1. What changed, in one screen

| # | Area | Change | Type |
|---|---|---|---|
| 1 | Locales | Default locale is now **Spanish (`es`)**, at the root with no prefix. It used to be mislabelled `en-US`. | **Root-cause bug** |
| 2 | Locales | New **English (`en`)** locale under the `/en` prefix, published (no longer a draft). | Configuration |
| 3 | Content | 219 English strings: every page, navigation, footer, image alt text and per-page SEO metadata. | Content |
| 4 | Switch | ES/EN now **changes the language**. It used to toggle its own highlight only (`SET_VARIANT cycle`). | **Bug** |
| 5 | Switch | The highlighted language follows the **active locale**, not the last click. | Behaviour |
| 6 | SEO | `<html lang>`, `canonical` and `hreflang` alternates (es / en / x-default) are now emitted per locale. | SEO |
| 7 | Alt text | Home: the Matchaflix cover was described as «Tony Nieve — fotografía». Corrected. | **Bug** (§11.1) |
| 8 | Alt text | Projects cover + 8 gallery images: old spelling `Matchflix` → **`Matchaflix`**, in both locales. | Content (§11.2) |
| 9 | `Menu` component | Hard-coded English links `Work / About / Contact` → Spanish `Proyectos / Sobre mí / Contacto`, with English translations. Superseded by row 10. | Content (§12.2) |
| 10 | `Menu` component | **Deleted.** It had no instances anywhere in the project. | Cleanup (§12.4) |

Items 1–6 close open items **11.2** (23/09) and **10.2** (24/09): «ES/EN — control built, translation
not wired». Items 7–8 were done later in the session and are detailed in **§11**; §6 already contains
their final values. Items 9–10 are detailed in **§12**. The component no longer exists, so nothing in §6 refers to it.

---

## 2. Root cause

Two independent faults, and both had to be fixed:

1. **There was nothing to switch to.** The project had a single locale, labelled `English (en-US)`,
   even though all the content is Spanish. With one locale, both buttons pointed at the same language.
   That label also reserved the `/en` slug, which blocked creating a real English locale until the
   default was relabelled as Spanish.
2. **The button wasn't connected to the locale.** The `Language` component's only interaction was
   `onTap → SET_VARIANT cycle`, which swaps the ES/EN highlight and nothing else. The overrides that
   do switch the locale existed in `LocaleSwitch.tsx` but were never attached to any layer.

In a code repo, (1) is the equivalent of the i18n layer having no `en` route or dictionary. (2) is the
equivalent of a toggle that holds local UI state instead of reading the locale from the router.

---

## 3. Locale configuration

```json
{
  "defaultLocale": { "code": "es", "name": "Spanish", "slug": "" },
  "locales": [
    { "code": "es", "name": "Spanish", "slug": "",   "default": true },
    { "code": "en", "name": "English", "slug": "en", "fallback": "es" }
  ]
}
```

- **Fallback `en → es`:** any key without an English value renders the Spanish one. In this project
  that only applies to strings that are identical in both languages (§7). The dictionary in §6 still
  gives an explicit `en` value for **every** key, so the repo doesn't need fallback logic.
- **Text direction:** `ltr` for both.

---

## 4. Routing & SEO

### 4.1 Routes

Every route is mirrored under `/en`. **Slugs are not translated.**

| Spanish (default) | English |
|---|---|
| `/` | `/en/` *(`/en` → `308` → `/en/`)* |
| `/projects` | `/en/projects` |
| `/about` | `/en/about` |
| `/contact` | `/en/contact` |
| `/cv` | `/en/cv` |
| `/projects/tony-nieve` | `/en/projects/tony-nieve` |
| `/projects/matchflix` | `/en/projects/matchflix` |
| `/projects/metamorfosis` | `/en/projects/metamorfosis` |
| `/projects/love-packaging` | `/en/projects/love-packaging` |

All 18 return `200` on production.

**Internal links keep the active locale.** On an English page, the nav, drawer, footer, project
cards, «Next project» and «View projects» all point to the `/en/...` version of their target.
`mailto:` and the Instagram link are the same in both locales.

### 4.2 `<head>` per page

Values as served by production, using `/about` as the example:

```html
<!-- Spanish: /about -->
<html lang="es" dir="ltr">
<link rel="canonical" href="https://shaggy-snow-332401.framer.app/about">
<meta property="og:url" content="https://shaggy-snow-332401.framer.app/about">
<link rel="alternate" hreflang="es"        href="https://shaggy-snow-332401.framer.app/about">
<link rel="alternate" hreflang="en"        href="https://shaggy-snow-332401.framer.app/en/about">
<link rel="alternate" hreflang="x-default" href="https://shaggy-snow-332401.framer.app/about">

<!-- English: /en/about -->
<html lang="en" dir="ltr">
<link rel="canonical" href="https://shaggy-snow-332401.framer.app/en/about">
<meta property="og:url" content="https://shaggy-snow-332401.framer.app/en/about">
<link rel="alternate" hreflang="es"        href="https://shaggy-snow-332401.framer.app/about">
<link rel="alternate" hreflang="en"        href="https://shaggy-snow-332401.framer.app/en/about">
<link rel="alternate" hreflang="x-default" href="https://shaggy-snow-332401.framer.app/about">
```

Rules:

- `lang` is the active locale.
- `canonical` and `og:url` point to the page itself, in its own locale.
- Both pages of a pair carry the same three alternates. `x-default` is always the **Spanish** URL.
- **The English home is the one exception to «no trailing slash»:** it lives at `/en/`, and `/en`
  answers `308 → /en/`. Every other URL, in both locales, has no trailing slash. Its canonical and
  alternates use `/en/`.
- `<title>` and `description` come from `meta` in §6, per locale. The site-level `meta.default`
  applies to any page without its own entry (the Home included).

### 4.3 Not configured

The following were not configured. Don't add them while porting unless you decide to:

- No automatic redirect based on the browser's language.
- The chosen language isn't remembered (no cookie or `localStorage`). The language is whatever the URL says.

---

## 5. Language switcher

### 5.1 Behaviour

**Visual:** unchanged from 23/09 §5. It's three inline runs at `Nav` size: the active language in
`Ink`, the separator `/` in `Rule`, the inactive language in `Ink Muted`. It appears in the desktop
bar and in the mobile drawer, so it's rendered in all three `Navigation` variants
(`Desktop`, `Phone`, `Phone Open`).

**What changed is where its state comes from.**

| | Before | Now |
|---|---|---|
| Highlight | Local toggle; any tap flips it | **Derived from the active locale**: `/en/...` highlights EN, anything else highlights ES |
| Click on the inactive language | Flips the highlight only | **Navigates to the same page in that language** (`/about` ⇄ `/en/about`) |
| Click on the active language | Flips the highlight (wrongly) | **Does nothing** |
| Click on the separator `/` | Flips the highlight | Does nothing |
| After a page load or a reload | Always showed ES | Shows the language of the URL |

**Accessibility** (identical to production):

| Attribute | ES label | EN label |
|---|---|---|
| `role` | `button` | `button` |
| `tabindex` | `0` | `0` |
| `aria-label` | `Cambiar idioma a español` | `Switch language to English` |
| `aria-current` | `"true"` when Spanish is active, absent otherwise | `"true"` when English is active, absent otherwise |
| Keyboard | `Enter` / `Space` activate (with `preventDefault`) | same |

`cursor: pointer` stays on the switch's container.

### 5.2 Reference implementation for the repo (React / TypeScript)

This is framework-agnostic: it only needs the current `pathname` and your link component, which
defaults to a plain `<a>`. The class names are placeholders, so map them to your `Ink`, `Ink Muted`,
`Rule` and `Nav` styles. Labels and `aria-label`s come from the `lang` keys in §6.

```tsx
// i18n/locale.ts
export type Locale = "es" | "en"
export const DEFAULT_LOCALE: Locale = "es"

/** "/en/about" → "en", "/about" → "es" */
export function localeFromPath(pathname: string): Locale {
    return /^\/en(\/|$)/.test(pathname) ? "en" : "es"
}

/** Strip the locale prefix: "/en/about" → "/about", "/en/" and "/en" → "/" */
export function basePath(pathname: string): string {
    const stripped = pathname.replace(/^\/en(?=\/|$)/, "")
    return stripped === "" || stripped === "/" ? "/" : stripped
}

/** Same page in another locale: ("/about", "en") → "/en/about", ("/", "en") → "/en/", ("/en/", "es") → "/" */
export function localizedPath(pathname: string, locale: Locale): string {
    const base = basePath(pathname)
    if (locale === DEFAULT_LOCALE) return base
    return base === "/" ? "/en/" : `/en${base}`
}
```

```tsx
// components/LanguageSwitch.tsx
import type { KeyboardEvent } from "react"
import { localeFromPath, localizedPath, type Locale } from "../i18n/locale"

const LABELS: Record<Locale, { label: string; ariaLabel: string }> = {
    es: { label: "ES", ariaLabel: "Cambiar idioma a español" },
    en: { label: "EN", ariaLabel: "Switch language to English" },
}

export function LanguageSwitch({
    pathname,
    navigate = (href: string) => window.location.assign(href),
}: {
    pathname: string
    /** Pass your router's push/navigate to keep client-side transitions. */
    navigate?: (href: string) => void
}) {
    const active = localeFromPath(pathname)

    const option = (locale: Locale) => {
        const isActive = locale === active
        const go = () => {
            if (!isActive) navigate(localizedPath(pathname, locale))
        }
        return (
            <span
                role="button"
                tabIndex={0}
                aria-current={isActive ? "true" : undefined}
                aria-label={LABELS[locale].ariaLabel}
                className={isActive ? "nav ink" : "nav ink-muted"}
                onClick={go}
                onKeyDown={(event: KeyboardEvent) => {
                    if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault()
                        go()
                    }
                }}
            >
                {LABELS[locale].label}
            </span>
        )
    }

    return (
        <div className="language-switch" style={{ display: "flex", gap: 6, alignItems: "center", cursor: "pointer", userSelect: "none" }}>
            {option("es")}
            <span className="nav rule" aria-hidden="true">/</span>
            {option("en")}
        </div>
    )
}
```

`gap: 6px`, horizontal and centred, `user-select: none`: these match the Framer component.

Use the same `localizedPath(target, active)` for **every internal link** (§4.1). Otherwise an English
visitor who clicks «Projects» falls back to the Spanish site.

### 5.3 What Framer actually runs (for reference only)

This is `LocaleSwitch.tsx` in the Framer project, unchanged this session. It's Framer-specific
(`useLocaleInfo` from `framer`) and **won't run in the repo**. It's included so you can check that
§5.2 is behaviourally equivalent.

```tsx
import type { ComponentType, KeyboardEvent } from "react"
import { useLocaleInfo } from "framer"

type Pick = "es" | "en"

// Resolve the Spanish (default) and English locales from the project's locale
// list. Matched on slug first, then on the BCP 47 language subtag, so the
// overrides keep working if either locale is renamed in Site Settings.
function useLocalePair() {
    const { locales, activeLocale, setLocale } = useLocaleInfo()

    const match = (slug: string, lang: string) =>
        locales.find((locale) => locale.slug === slug) ??
        locales.find((locale) =>
            locale.code.toLowerCase().startsWith(lang)
        )

    const spanish = match("", "es")
    const english = match("en", "en")
    const isEnglish = Boolean(english && activeLocale?.id === english.id)

    return { setLocale, spanish, english, isEnglish }
}

// Shared behaviour for the two switch overrides below. Keeps the layer's own
// canvas styling; only adds click/keyboard behaviour and a11y attributes.
function localeSwitchProps(
    pick: Pick,
    pair: ReturnType<typeof useLocalePair>
) {
    const { setLocale, spanish, english, isEnglish } = pair
    const target = pick === "en" ? english : spanish
    const isActive = pick === "en" ? isEnglish : !isEnglish

    const switchLocale = () => {
        if (!target || isActive) return
        setLocale(target)
    }

    return {
        role: "button",
        tabIndex: 0,
        "aria-current": isActive ? "true" : undefined,
        "aria-label":
            pick === "en"
                ? "Switch language to English"
                : "Cambiar idioma a español",
        onClick: switchLocale,
        onKeyDown: (event: KeyboardEvent) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault()
                switchLocale()
            }
        },
    }
}

export function withSwitchToSpanish(
    Component: ComponentType<any>
): ComponentType<any> {
    return function SwitchToSpanish(props) {
        const pair = useLocalePair()
        return <Component {...props} {...localeSwitchProps("es", pair)} />
    }
}

export function withSwitchToEnglish(
    Component: ComponentType<any>
): ComponentType<any> {
    return function SwitchToEnglish(props) {
        const pair = useLocalePair()
        return <Component {...props} {...localeSwitchProps("en", pair)} />
    }
}

// Drives the Language component's ES / EN variant from the locale that is
// actually active, replacing the old manual "cycle variant" toggle.
export function withActiveLocaleVariant(
    Component: ComponentType<any>
): ComponentType<any> {
    return function ActiveLocaleVariant(props) {
        const { isEnglish } = useLocalePair()
        return <Component {...props} variant={isEnglish ? "EN" : "ES"} />
    }
}
```

How it's attached in Framer:

| Layer | Override |
|---|---|
| `Language` component, `ES` label (both variants) | `withSwitchToSpanish` |
| `Language` component, `EN` label (both variants) | `withSwitchToEnglish` |
| Both `Language` instances inside `Navigation` (bar + drawer; replicated to the 3 variants) | `withActiveLocaleVariant` |
| `Language` variant frames `ES` / `EN` | `onTap` **removed** (was `SET_VARIANT cycle`) |

---

## 6. Dictionary (ES / EN) — complete

All **177 keys** for both locales. Extracted from the live project. 43 keys are intentionally the
same in both languages (§7).

Conventions, consistent with the 23/09 spec:

- **Key names** reuse 23/09 §8 where a key existed (`nav.*`, `drawer.*`, `footer.*`, `home.*`,
  `projects.*`, `contact.*`, `project.*`).
- **Section labels** (`sections.*`) carry **no** trailing ` /`; the layout appends it, as in 23/09 §8.6.
- **`home.lede.a` ends in a space.** It's followed by `home.lede.b` in italics; don't trim it.
- **The About `h1`** (`Tony` + italic `Arroyo`) is a proper noun and isn't in the dictionary. It's the
  same in both locales; see 24/09 §2.
- **Project titles** are proper nouns and are kept outside the dictionary: `Tony Nieve`, `Matchaflix`,
  `Metamorfosis`, `Love`.
- **`galleryAlts` / `coverAlts`** are listed in DOM order.
- **`projectPages.*.summary`** is the short one-line description from 23/09 §8.9 (`concept` there). It
  is still present in the Framer project and published HTML, translated like everything else. Keep it
  only if your repo still renders that block (see §8).

```json
{
  "es": {
    "meta": {
      "default": {
        "title": "Tony Arroyo — Portfolio",
        "description": "Portfolio de Tony Arroyo, director de arte y diseñador gráfico en Madrid. Dirección de arte, fotografía, identidad, editorial y packaging."
      },
      "/projects": {
        "title": "Proyectos — Tony Arroyo",
        "description": "Proyectos seleccionados de Tony Arroyo: identidad, editorial, packaging y dirección de arte."
      },
      "/about": {
        "title": "About — Tony Arroyo",
        "description": "Tony Arroyo, diseñador gráfico. Sobre mí, servicios, experiencia y formación."
      },
      "/contact": {
        "title": "Contact — Tony Arroyo",
        "description": "Contacto de Tony Arroyo, diseñador gráfico."
      },
      "/cv": {
        "title": "CV — Tony Arroyo",
        "description": "Currículum de Tony Arroyo, diseñador gráfico y director de arte."
      },
      "/projects/tony-nieve": {
        "title": "Tony Nieve — Tony Arroyo",
        "description": "Tony Nieve. Proyecto fotográfico y de dirección de arte de Tony Arroyo."
      },
      "/projects/matchflix": {
        "title": "Matchaflix — Tony Arroyo",
        "description": "Matchaflix. Rebranding conceptual de una marca de matcha hacia el lujo silencioso."
      },
      "/projects/metamorfosis": {
        "title": "Metamorfosis — Tony Arroyo",
        "description": "Metamorfosis, el inicio del cambio. Proyecto editorial e ilustración."
      },
      "/projects/love-packaging": {
        "title": "Love — Tony Arroyo",
        "description": "Love. Proyecto conceptual de branding y packaging sobre el amor en todas sus formas."
      }
    },
    "nav": {
      "wordmark": "Tony Arroyo",
      "projects": "Proyectos",
      "about": "Sobre mí",
      "contact": "Contacto",
      "toggle": {
        "closed": "( Menu )",
        "open": "( Close )"
      }
    },
    "drawer": {
      "home": "Inicio",
      "projects": "Proyectos",
      "about": "Sobre mí",
      "contact": "Contacto"
    },
    "lang": {
      "es": {
        "label": "ES",
        "ariaLabel": "Cambiar idioma a español"
      },
      "en": {
        "label": "EN",
        "ariaLabel": "Switch language to English"
      },
      "separator": "/"
    },
    "footer": {
      "identity": "Tony Arroyo — Director de arte y diseñador gráfico",
      "contact": "Contacto",
      "copyright": "© 2026"
    },
    "home": {
      "lede": {
        "a": "Director de arte ",
        "b": "y diseñador gráfico"
      },
      "sub": {
        "left": "Fotografía, identidad, editorial y packaging",
        "right": "Madrid, España"
      },
      "rule": {
        "label": "Trabajos seleccionados",
        "count": "(04)"
      },
      "closing": {
        "label": "Índice",
        "link": "Todos los proyectos"
      },
      "coverAlts": [
        "Tony Nieve — fotografía",
        "Matchaflix — rebranding",
        "Metamorfosis — editorial",
        "Love Packaging"
      ]
    },
    "projects": {
      "title": "Proyectos",
      "note": "Identidad, editorial, packaging y dirección de arte",
      "rule": {
        "label": "Índice",
        "count": "(04)"
      },
      "coverAlts": [
        "Tony Nieve — fotografía",
        "Matchaflix — rebranding",
        "Metamorfosis — editorial",
        "Love Packaging"
      ]
    },
    "project": {
      "meta": {
        "disciplines": "Disciplinas"
      },
      "concept": "Concepto",
      "piece": "Pieza",
      "closing": "El proyecto",
      "next": "Siguiente proyecto"
    },
    "projectPages": {
      "/projects/tony-nieve": {
        "disciplines": "Fotografía · Dirección de arte · Storytelling · Retrato · Narrativa visual",
        "concept": "Proyecto fotográfico personal, iniciado en 2016 y construido desde entonces. Retratos hechos desde una mirada naturalista, donde la imagen no se queda en lo estético: cuenta algo.",
        "closing": "Hay algo de cuento de hadas en estas imágenes, y también de melancolía. Cada fotografía levanta un pequeño universo —una luz, un gesto, un personaje— y confía en que el relato aparezca ahí, sin subrayarlo. Aunque nace como proyecto personal, su lenguaje se traslada con naturalidad a la moda, lo editorial y la dirección artística.",
        "summary": "Fotografía y dirección de arte. Retrato, color y composición.",
        "galleryAlts": [
          "Tony Nieve",
          "Retrato",
          "Retrato",
          "Composición",
          "Composición",
          "Retrato",
          "Retrato",
          "Retrato",
          "Retrato",
          "Retrato",
          "Retrato",
          "Retrato",
          "Retrato",
          "Composición"
        ]
      },
      "/projects/matchflix": {
        "disciplines": "Rebranding · Branding · Dirección de arte · Packaging · Identidad visual",
        "concept": "Rebranding conceptual de una marca de matcha. La esencia del producto se mantiene; lo que cambia por completo es la manera de percibirla.",
        "closing": "La propuesta lleva la marca al territorio del lujo silencioso: nueva paleta cromática, una tipografía más refinada y un lenguaje gráfico contenido, aplicado de forma coherente en cada punto de contacto. El objetivo es un posicionamiento más premium y contemporáneo, donde el matcha conversa con los códigos visuales del lujo discreto.",
        "summary": "Rebranding de una marca de matcha: identidad, packaging y aplicaciones gráficas.",
        "galleryAlts": [
          "Matchaflix — textura",
          "Matchaflix — vasos",
          "Matchaflix — vasos",
          "Matchaflix — packaging",
          "Matchaflix — textura",
          "Matchaflix — textura",
          "Matchaflix — packaging té matcha",
          "Matchaflix — camisetas"
        ]
      },
      "/projects/metamorfosis": {
        "disciplines": "Diseño editorial · Ilustración · Dirección de arte · Escritura · Storytelling",
        "concept": "Proyecto Final de Carrera, escrito, ilustrado, diseñado y maquetado íntegramente por mí. Un libro sobre los finales: sobre cerrar una etapa para poder empezar otra.",
        "closing": "Las fases del duelo ordenan la narración: cada capítulo es un estado emocional distinto, del enfado a la aceptación, y texto e ilustración avanzan juntos para que la transformación se vea además de leerse. Al final aparece la mariposa, donde el cierre de una etapa deja de ser sólo una pérdida para convertirse en el principio de un cambio.",
        "summary": "«Metamorfosis, el inicio del cambio». Libro ilustrado: diseño editorial e ilustración.",
        "piece": "Libro impreso, con texto e ilustración originales.",
        "galleryAlts": [
          "Metamorfosis — libro",
          "Pieza",
          "Metamorfosis — ilustración",
          "Metamorfosis — ilustración",
          "Metamorfosis — interior",
          "Metamorfosis — interior",
          "Metamorfosis — interior",
          "Metamorfosis — interior",
          "Metamorfosis — ilustración",
          "Metamorfosis — ilustración",
          "Metamorfosis — libro"
        ]
      },
      "/projects/love-packaging": {
        "disciplines": "Packaging · Branding · Dirección de arte · Diseño gráfico",
        "concept": "Proyecto conceptual de branding y packaging. Una reinterpretación del universo visual de Mr. Wonderful, partiendo del amor entendido en todas sus formas.",
        "closing": "El tono emocional y cercano de la marca se mantiene, pero el lenguaje gráfico se depura: menos ruido, más mensaje. El resultado es un sistema de packaging limpio y reconocible, adaptable a distintos productos. La pregunta de fondo es hasta dónde puede estirarse una identidad consolidada sin dejar de ser ella misma.",
        "summary": "Diseño de packaging y aplicación gráfica.",
        "piece": "Caja, taza y aplicaciones gráficas.",
        "galleryAlts": [
          "Pieza",
          "Love Packaging",
          "Love Packaging",
          "Love Packaging"
        ]
      }
    },
    "about": {
      "role": "Director de arte y diseñador gráfico",
      "location": "Madrid, España",
      "rule": {
        "label": "Sobre mí",
        "count": "(01)"
      },
      "intro": [
        "Soy Tony, director de arte y diseñador gráfico. Vivo y trabajo en Madrid.",
        "Llegué al diseño por la fotografía, y creo que se nota. Antes de pensar en una tipografía o en un color casi siempre hay una imagen: una luz concreta, un gesto, una textura que pide quedarse.",
        "Trabajo con marcas de moda, lifestyle y proyectos culturales, y me gusta estar en todo el recorrido — el concepto, la dirección del shooting, el diseño y la edición final. No sabría separarlo.",
        "Lo que busco en cada proyecto es una atmósfera propia. Menos un estilo que una mirada: un universo visual que se reconozca aunque no lleve mi nombre."
      ],
      "portraitAlt": "Retrato de Tony Arroyo"
    },
    "sections": {
      "profile": "Perfil",
      "experience": "Experiencia",
      "education": "Formación",
      "services": "Servicios",
      "tools": "Herramientas",
      "languages": "Idiomas",
      "contact": "Contacto"
    },
    "experience": [
      {
        "company": "Freelance",
        "role": "Director de arte"
      },
      {
        "company": "4AM Studio",
        "role": "Creative director"
      },
      {
        "company": "GoodNews Coffee",
        "role": "Director de arte y diseñador gráfico"
      },
      {
        "company": "La Condesa",
        "role": "Fotografía de moda"
      },
      {
        "company": "15 Segundos",
        "role": "Creative assistant y fotografía"
      }
    ],
    "education": [
      {
        "title": "Curso de Dirección de Arte en Publicidad",
        "school": "CEI Escuela de Diseño y Marketing, Madrid"
      },
      {
        "title": "Grado en Diseño Gráfico + Especialización en Marketing",
        "school": "ESADA, Granada"
      },
      {
        "title": "Grado en Bellas Artes",
        "school": "Universidad Complutense de Madrid"
      }
    ],
    "services": [
      "Dirección de arte",
      "Fotografía",
      "Diseño gráfico",
      "Identidad visual",
      "Diseño editorial",
      "Packaging",
      "Ilustración"
    ],
    "tools": {
      "primary": "Photoshop, Illustrator, InDesign",
      "secondary": "Premiere, CapCut"
    },
    "languages": [
      {
        "name": "Español",
        "level": "Nativo"
      },
      {
        "name": "Inglés",
        "level": "B2"
      }
    ],
    "contact": {
      "tag": "Contacto",
      "statement": "Hablemos",
      "email": {
        "label": "Email"
      },
      "instagram": {
        "label": "Instagram"
      },
      "location": {
        "label": "Localización",
        "value": "Madrid, España"
      },
      "closing": {
        "label": "Índice",
        "link": "Ver proyectos"
      }
    },
    "cv": {
      "title": "Currículum",
      "role": "Director de arte y diseñador gráfico",
      "location": "Madrid, España",
      "rule": {
        "label": "Perfil",
        "count": "(CV)"
      },
      "profile": "Director de arte con formación en diseño gráfico y marketing, especializado en branding, contenido visual y desarrollo de conceptos creativos para marcas de moda, lifestyle y proyectos culturales. Experiencia en dirección creativa, fotografía, diseño y producción de contenidos, participando en todas las fases del proceso, desde la conceptualización hasta la ejecución final.",
      "closing": {
        "label": "Índice",
        "link": "Ver proyectos"
      }
    }
  },
  "en": {
    "meta": {
      "default": {
        "title": "Tony Arroyo — Portfolio",
        "description": "Portfolio of Tony Arroyo, art director and graphic designer based in Madrid. Art direction, photography, identity, editorial and packaging."
      },
      "/projects": {
        "title": "Projects — Tony Arroyo",
        "description": "Selected projects by Tony Arroyo: identity, editorial, packaging and art direction."
      },
      "/about": {
        "title": "About — Tony Arroyo",
        "description": "Tony Arroyo, graphic designer. About me, services, experience and education."
      },
      "/contact": {
        "title": "Contact — Tony Arroyo",
        "description": "Get in touch with Tony Arroyo, graphic designer."
      },
      "/cv": {
        "title": "CV — Tony Arroyo",
        "description": "CV of Tony Arroyo, graphic designer and art director."
      },
      "/projects/tony-nieve": {
        "title": "Tony Nieve — Tony Arroyo",
        "description": "Tony Nieve. A photography and art direction project by Tony Arroyo."
      },
      "/projects/matchflix": {
        "title": "Matchaflix — Tony Arroyo",
        "description": "Matchaflix. A conceptual rebrand of a matcha brand towards quiet luxury."
      },
      "/projects/metamorfosis": {
        "title": "Metamorfosis — Tony Arroyo",
        "description": "Metamorfosis, the beginning of change. An editorial and illustration project."
      },
      "/projects/love-packaging": {
        "title": "Love — Tony Arroyo",
        "description": "Love. A conceptual branding and packaging project about love in all its forms."
      }
    },
    "nav": {
      "wordmark": "Tony Arroyo",
      "projects": "Projects",
      "about": "About",
      "contact": "Contact",
      "toggle": {
        "closed": "( Menu )",
        "open": "( Close )"
      }
    },
    "drawer": {
      "home": "Home",
      "projects": "Projects",
      "about": "About",
      "contact": "Contact"
    },
    "lang": {
      "es": {
        "label": "ES",
        "ariaLabel": "Cambiar idioma a español"
      },
      "en": {
        "label": "EN",
        "ariaLabel": "Switch language to English"
      },
      "separator": "/"
    },
    "footer": {
      "identity": "Tony Arroyo — Art director and graphic designer",
      "contact": "Contact",
      "copyright": "© 2026"
    },
    "home": {
      "lede": {
        "a": "Art director ",
        "b": "and graphic designer"
      },
      "sub": {
        "left": "Photography, identity, editorial and packaging",
        "right": "Madrid, Spain"
      },
      "rule": {
        "label": "Selected work",
        "count": "(04)"
      },
      "closing": {
        "label": "Index",
        "link": "All projects"
      },
      "coverAlts": [
        "Tony Nieve — photography",
        "Matchaflix — rebrand",
        "Metamorfosis — editorial",
        "Love Packaging"
      ]
    },
    "projects": {
      "title": "Projects",
      "note": "Identity, editorial, packaging and art direction",
      "rule": {
        "label": "Index",
        "count": "(04)"
      },
      "coverAlts": [
        "Tony Nieve — photography",
        "Matchaflix — rebrand",
        "Metamorfosis — editorial",
        "Love Packaging"
      ]
    },
    "project": {
      "meta": {
        "disciplines": "Disciplines"
      },
      "concept": "Concept",
      "piece": "Piece",
      "closing": "The project",
      "next": "Next project"
    },
    "projectPages": {
      "/projects/tony-nieve": {
        "disciplines": "Photography · Art direction · Storytelling · Portraiture · Visual narrative",
        "concept": "A personal photography project, started in 2016 and built on ever since. Portraits made with a naturalistic eye, where the image goes beyond aesthetics: it tells a story.",
        "closing": "There is something of a fairy tale in these images, and something melancholic too. Each photograph builds a small universe —a light, a gesture, a character— and trusts the story to emerge on its own, without spelling it out. Although it began as a personal project, its language carries over naturally into fashion, editorial and art direction.",
        "summary": "Photography and art direction. Portraiture, colour and composition.",
        "galleryAlts": [
          "Tony Nieve",
          "Portrait",
          "Portrait",
          "Composition",
          "Composition",
          "Portrait",
          "Portrait",
          "Portrait",
          "Portrait",
          "Portrait",
          "Portrait",
          "Portrait",
          "Portrait",
          "Composition"
        ]
      },
      "/projects/matchflix": {
        "disciplines": "Rebranding · Branding · Art direction · Packaging · Visual identity",
        "concept": "A conceptual rebrand of a matcha brand. The essence of the product stays the same; what changes completely is the way it is perceived.",
        "closing": "The proposal takes the brand into the territory of quiet luxury: a new colour palette, more refined typography and a restrained graphic language, applied consistently across every touchpoint. The goal is a more premium, contemporary positioning, where matcha speaks the visual language of understated luxury.",
        "summary": "Rebrand of a matcha brand: identity, packaging and graphic applications.",
        "galleryAlts": [
          "Matchaflix — texture",
          "Matchaflix — cups",
          "Matchaflix — cups",
          "Matchaflix — packaging",
          "Matchaflix — texture",
          "Matchaflix — texture",
          "Matchaflix — matcha tea packaging",
          "Matchaflix — T-shirts"
        ]
      },
      "/projects/metamorfosis": {
        "disciplines": "Editorial design · Illustration · Art direction · Writing · Storytelling",
        "concept": "My final degree project, written, illustrated, designed and laid out entirely by me. A book about endings: about closing one chapter in order to begin another.",
        "closing": "The stages of grief shape the narrative: each chapter is a different emotional state, from anger to acceptance, and text and illustration move forward together so the transformation can be seen as well as read. At the end the butterfly appears, and closing a chapter stops being only a loss and becomes the beginning of change.",
        "summary": "“Metamorfosis, the beginning of change”. Illustrated book: editorial design and illustration.",
        "piece": "Printed book with original text and illustrations.",
        "galleryAlts": [
          "Metamorfosis — book",
          "Piece",
          "Metamorfosis — illustration",
          "Metamorfosis — illustration",
          "Metamorfosis — inside pages",
          "Metamorfosis — inside pages",
          "Metamorfosis — inside pages",
          "Metamorfosis — inside pages",
          "Metamorfosis — illustration",
          "Metamorfosis — illustration",
          "Metamorfosis — book"
        ]
      },
      "/projects/love-packaging": {
        "disciplines": "Packaging · Branding · Art direction · Graphic design",
        "concept": "A conceptual branding and packaging project. A reinterpretation of Mr. Wonderful's visual universe, built around love in all its forms.",
        "closing": "The brand's warm, emotional tone stays, but the graphic language is pared back: less noise, more message. The result is a clean, recognisable packaging system that adapts to different products. The underlying question is how far an established identity can stretch without ceasing to be itself.",
        "summary": "Packaging design and graphic application.",
        "piece": "Box, mug and graphic applications.",
        "galleryAlts": [
          "Piece",
          "Love Packaging",
          "Love Packaging",
          "Love Packaging"
        ]
      }
    },
    "about": {
      "role": "Art director and graphic designer",
      "location": "Madrid, Spain",
      "rule": {
        "label": "About me",
        "count": "(01)"
      },
      "intro": [
        "I'm Tony, an art director and graphic designer. I live and work in Madrid.",
        "I came to design through photography, and I think it shows. Before I think about a typeface or a colour, there is almost always an image: a particular light, a gesture, a texture that asks to stay.",
        "I work with fashion and lifestyle brands and cultural projects, and I like to be part of the whole journey — the concept, directing the shoot, the design and the final edit. I couldn't separate them.",
        "What I look for in every project is an atmosphere of its own. Less a style than a way of seeing: a visual universe you would recognise even without my name on it."
      ],
      "portraitAlt": "Portrait of Tony Arroyo"
    },
    "sections": {
      "profile": "Profile",
      "experience": "Experience",
      "education": "Education",
      "services": "Services",
      "tools": "Tools",
      "languages": "Languages",
      "contact": "Contact"
    },
    "experience": [
      {
        "company": "Freelance",
        "role": "Art director"
      },
      {
        "company": "4AM Studio",
        "role": "Creative director"
      },
      {
        "company": "GoodNews Coffee",
        "role": "Art director and graphic designer"
      },
      {
        "company": "La Condesa",
        "role": "Fashion photography"
      },
      {
        "company": "15 Segundos",
        "role": "Creative assistant and photography"
      }
    ],
    "education": [
      {
        "title": "Course in Advertising Art Direction",
        "school": "CEI School of Design and Marketing, Madrid"
      },
      {
        "title": "Degree in Graphic Design + Specialisation in Marketing",
        "school": "ESADA, Granada"
      },
      {
        "title": "Degree in Fine Arts",
        "school": "Complutense University of Madrid"
      }
    ],
    "services": [
      "Art direction",
      "Photography",
      "Graphic design",
      "Visual identity",
      "Editorial design",
      "Packaging",
      "Illustration"
    ],
    "tools": {
      "primary": "Photoshop, Illustrator, InDesign",
      "secondary": "Premiere, CapCut"
    },
    "languages": [
      {
        "name": "Spanish",
        "level": "Native"
      },
      {
        "name": "English",
        "level": "B2"
      }
    ],
    "contact": {
      "tag": "Contact",
      "statement": "Let's talk",
      "email": {
        "label": "Email"
      },
      "instagram": {
        "label": "Instagram"
      },
      "location": {
        "label": "Location",
        "value": "Madrid, Spain"
      },
      "closing": {
        "label": "Index",
        "link": "View projects"
      }
    },
    "cv": {
      "title": "Curriculum",
      "role": "Art director and graphic designer",
      "location": "Madrid, Spain",
      "rule": {
        "label": "Profile",
        "count": "(CV)"
      },
      "profile": "Art director with a background in graphic design and marketing, specialising in branding, visual content and the development of creative concepts for fashion and lifestyle brands and cultural projects. Experienced in creative direction, photography, design and content production, taking part in every stage of the process, from concept through to final execution.",
      "closing": {
        "label": "Index",
        "link": "View projects"
      }
    }
  }
}
```

---

## 7. Intentionally left identical in both languages

These are not missing translations:

- **Proper nouns:** `Tony Arroyo`, `Tony Nieve`, `Matchaflix`, `Metamorfosis`, `Love`,
  `Love Packaging`, `Freelance`, `4AM Studio`, `GoodNews Coffee`, `La Condesa`, `15 Segundos`,
  `ESADA, Granada`, `Mr. Wonderful`.
- **Already English, or the same word in both:** `Creative director`, `Packaging`, `Email`,
  `Instagram`, `( Menu )`, `( Close )`, `B2`, the tools list (`Photoshop, Illustrator, InDesign` /
  `Premiere, CapCut`).
- **Numbers & marks:** `(01)`–`(04)`, `(CV)`, `© 2026`, `ES`, `EN`, `/`.
- **Contact values:** `antonio.arr.gar@gmail.com`, `@toninieve`, `Instagram @toninieve`.
- **Titles that were already in English in Spanish:** `About — Tony Arroyo`, `Contact — Tony Arroyo`,
  `CV — Tony Arroyo` (still open as 24/09 §10.6).

### 7.1 English wording that differs from the 23/09 spec

The 23/09 spec had a draft English column, and some of the published wording differs from it. If
your repo already has the 23/09 English values, **these are the ones to overwrite.** Everything not
listed here is either new or unchanged.

| Key | 23/09 EN (old) | Published EN (new) |
|---|---|---|
| `about.intro[0]` | I'm Toni, an art director and graphic designer based in Madrid. | I'm Tony, an art director and graphic designer. I live and work in Madrid. |
| `about.intro[1]` | …Before there's a typeface or a colour there's usually an image — a particular light, a gesture, a texture that insists on staying. | I came to design through photography, and I think it shows. Before I think about a typeface or a colour, there is almost always an image: a particular light, a gesture, a texture that asks to stay. |
| `about.intro[2]` | I work with fashion, lifestyle and cultural projects, and I like being there for the whole thing: … I wouldn't know how to separate them. | I work with fashion and lifestyle brands and cultural projects, and I like to be part of the whole journey — the concept, directing the shoot, the design and the final edit. I couldn't separate them. |
| `about.intro[3]` | …Less a style than a way of looking — a visual world you'd recognise without the signature. | What I look for in every project is an atmosphere of its own. Less a style than a way of seeing: a visual universe you would recognise even without my name on it. |
| `education[0].title` | Art Direction in Advertising | Course in Advertising Art Direction |
| `education[1].title` | BA in Graphic Design + Marketing specialisation | Degree in Graphic Design + Specialisation in Marketing |
| `education[2].title` | BA in Fine Arts | Degree in Fine Arts |
| `education[*].school` | *(not translated)* | `CEI School of Design and Marketing, Madrid` · `ESADA, Granada` · `Complutense University of Madrid` |
| `services[*]` | Title Case (`Art Direction`, `Graphic Design`…) | Sentence case (`Art direction`, `Graphic design`…) |
| `cv.title` | Curriculum vitae | Curriculum |
| `cv.profile` | Art director trained in graphic design and marketing, … | Art director with a background in graphic design and marketing, … *(full text in §6)* |
| `footer.identity` | Toni Arroyo — Art director and graphic designer | Tony Arroyo — Art director and graphic designer |
| `project.meta.category` | Category | **Removed** on 24/09. Replaced by `project.meta.disciplines` = `Disciplines` |
| `projectPages[tony-nieve].summary` | Photography and art direction. Portrait, colour and composition. | Photography and art direction. Portraiture, colour and composition. |
| `projectPages[matchflix].summary` | Rebranding for a matcha brand: … | Rebrand of a matcha brand: identity, packaging and graphic applications. |
| `projectPages[metamorfosis].summary` | «Metamorfosis, el inicio del cambio». Illustrated book: … | “Metamorfosis, the beginning of change”. Illustrated book: editorial design and illustration. |
| `projectPages[metamorfosis].piece` | Printed book with original illustrations. | Printed book with original text and illustrations. |

**New keys** (no 23/09 equivalent): `meta.*` in English, `lang.*`, `project.meta.disciplines`,
`project.closing`, `projectPages.*.disciplines` / `concept` / `closing` (the 24/09 content),
`sections.profile`, all `*Alts`, `about.portraitAlt`, `about.rule.*`, `cv.rule.*`, `cv.closing.*`.

The English is **British** (`colour`, `recognisable`, `specialisation`), matching the 23/09 column.

---

## 8. Known issues found during the session

These were found while doing the ES/EN work. 8.1 and 8.2 were fixed later in the session (§11), and
8.3 was resolved by deleting the component (§12). The rest are still open and listed so the port doesn't copy them blindly.

| # | Issue | Recommendation for the repo |
|---|---|---|
| 8.1 | ~~**Wrong alt text.**~~ **Fixed later in the session (§11.1).** On the Home, the Matchaflix cover's alt was `Tony Nieve — fotografía` / `Tony Nieve — photography`, copied from the first cover. It is now `Matchaflix — rebranding` (ES) / `Matchaflix — rebrand` (EN) on all four breakpoints. | Use `home.coverAlts[1]` from §6, which already has the corrected values. |
| 8.2 | ~~**Spelling drift in alts.**~~ **Fixed later in the session (§11.2).** The `/projects` cover and the 8 Matchaflix gallery images said `Matchflix` (the old name). All 9 now say `Matchaflix` in both locales, on every breakpoint, and no text in the project contains `Matchflix` any more. Only the URL `/projects/matchflix` keeps the old spelling (24/09 §10.3). | Use `projects.coverAlts[1]` and `projectPages["/projects/matchflix"].galleryAlts` from §6, which already have the corrected values. |
| 8.3 | ~~**Unused `Menu` component** with hard-coded English links (`Work` / `About` / `Contact`).~~ **Resolved later in the session: the component was deleted (§12.4).** It had no instances anywhere. | Delete it in the repo too (§12.5). |
| 8.4 | **`summary` blocks.** Each project page still contains a «Concepto» label plus the old one-line description from 23/09. It's in the served HTML, but the 24/09 page architecture doesn't list it. | Check whether your repo renders it. If not, drop the `summary` keys. |
| 8.5 | **ES titles in English.** `About — Tony Arroyo` and `Contact — Tony Arroyo` on the Spanish site. | Unchanged; still 24/09 §10.6. |

---

## 9. Framer-specific notes

These are only useful to whoever maintains the Framer side. **None of this applies to a code repo.**

- **The default locale can't be changed from the plugin API.** `createLocale` failed with
  `Locale name "English" is already in use` and then `Locale slug "en" is already in use` while the
  default was labelled English. The fix was made in the UI: **Canvas ▾ → Localization → Add locale**.
  The default language is set from that dialog.
- **New locales can be created as drafts, and drafts aren't published.** The first publish
  (`0637044d8`) shipped the translations inside the bundles but listed only `es` in the router, so
  `/en/*` returned 404. Turning off *Draft* on the English locale and republishing (`2393c39b2`) fixed it.
- **Removing an interaction:** `SET <id> onTap="null"` was silently ignored. `SET <id> onTap.0="null"`
  worked.
- **Overrides are attached with `codeOverride`** on the layer. They're shared across component
  variants and breakpoints, so they're set once on the primary.
- **The editor always shows the default locale.** The canvas showing Spanish after this change is
  expected. Use the Localization view to review or edit English, and preview or publish to test the
  switch, because overrides only run in preview and on the live site.
- **Translations live in Localization, not on the canvas.** Editing Spanish text later marks its
  English value as *Needs review*; it doesn't update it automatically.
- **Word allowance:** the plan shows a 5,000-word localization limit. This site's English content
  fits within it.
- **Changing a Spanish value doesn't update its English one.** Editing an alt text on the canvas left
  its English translation untouched and flagged it *Needs review* (§11). Set the English value
  explicitly after every Spanish edit.
- **`getNodesOfTypes` ignores `pagePath`.** It returns nodes from the whole project, so the same node
  appears once per page you query. Deduplicate by node id before editing.
- **Right after a publish, the live pages can briefly serve placeholder content** (same `<title>` on
  every route, wrong `lang`, no images). It usually clears within seconds, but after `c8025858a` it
  took a few minutes. Poll and re-check before concluding anything is broken.

### Publish history (this session)

| Version | What it shipped |
|---|---|
| `0637044d8` | Translations + switch wiring. `/en/*` returned 404 because the English locale was still a draft. |
| `2393c39b2` | Same content with the English locale published. ES/EN fully working. |
| `7ef46ddd5` | §11.1: Home Matchaflix cover alt text. |
| `b3ef61149` | §11.2: `Matchflix` → `Matchaflix` in the Projects cover and Matchaflix gallery alt texts. |
| `bcb453b35` | §12.2: `Menu` component text. The only change in this publish. The component isn't rendered on any page, so the live pages are unchanged. |
| `c8025858a` | §12.4: `Menu` component deleted. The changelog's only entry was `Menu: removed`. **Current.** |

---

## 10. Verification checklist for the repo

These are the checks that were run against production. Run the same ones against the repo build.

- [ ] All 18 routes in §4.1 return `200`.
- [ ] `/en` answers `308 → /en/`.
- [ ] `/` has `<html lang="es">`; `/en/` has `<html lang="en">`.
- [ ] Every page has the three `hreflang` alternates and a self-referencing `canonical` (§4.2).
- [ ] `/` contains «Trabajos seleccionados». `/en/` contains «Selected work».
- [ ] `/en/about` contains «I'm Tony». `/en/projects/tony-nieve` contains «A personal photography project».
- [ ] On `/en/*`, the nav reads `Projects` / `About` / `Contact`, and the links stay under `/en`.
- [ ] On `/`, the ES label has `aria-current="true"`. On `/en/`, the EN label has it.
- [ ] Clicking EN on `/about` goes to `/en/about`; clicking ES there goes back to `/about`. Clicking the active one does nothing.
- [ ] The switch works with the keyboard (Tab to it, then `Enter` / `Space`).
- [ ] The switch shows the right language after a reload on any `/en/*` URL.
- [ ] `/` and `/projects`: the Matchaflix cover has `alt="Matchaflix — rebranding"`. `/en/` and `/en/projects`: `alt="Matchaflix — rebrand"`.
- [ ] `/projects/matchflix` and `/en/projects/matchflix`: the 8 gallery alts match §11.2, in the right language.
- [ ] No page, in either locale, contains `alt="Matchflix` (old spelling) or `alt="Tony Nieve — fotografía"` on a non-Tony Nieve image.

> When checking text in Framer's served HTML, search the **raw** HTML. Content can sit in
> breakpoint-specific `ssr-variant` blocks, so stripping tags or scripts gives false negatives
> (same warning as 24/09 §9).

---

## 11. Later in the session — Matchaflix alt text fixes

These are content-only changes. As before, no source file was edited. **§6 already contains every
value below**, so if you copy the dictionary from §6 you get them automatically. This section exists
so you can apply them as a targeted patch to a repo that already has the earlier values.

### 11.1 Home — wrong alt on the Matchaflix cover

The second cover in the Home grid (the one linking to `/projects/matchflix`) had the alt text of the
first cover, copied over.

| Key | Locale | Before | After |
|---|---|---|---|
| `home.coverAlts[1]` | `es` | `Tony Nieve — fotografía` | `Matchaflix — rebranding` |
| `home.coverAlts[1]` | `en` | `Tony Nieve — photography` | `Matchaflix — rebrand` |

- The wording matches the same image's alt on `/projects` (§11.2), with the current project name.
- English uses «rebrand», consistent with the English project copy («A conceptual rebrand of a
  matcha brand»).
- Applied on all four breakpoints (Desktop, Laptop, Tablet, Phone). In a repo the cover is a single
  `<img>`, so it's one change.
- Published in `7ef46ddd5`.

### 11.2 Old spelling `Matchflix` → `Matchaflix` in alt texts

24/09 §7.1 renamed the project to **Matchaflix**, but 9 image alt texts kept the old spelling.

| Key | Locale | Before | After |
|---|---|---|---|
| `projects.coverAlts[1]` | `es` | `Matchflix — rebranding` | `Matchaflix — rebranding` |
| `projects.coverAlts[1]` | `en` | *(no value, fell back to Spanish)* `Matchflix — rebranding` | `Matchaflix — rebrand` |
| `projectPages["/projects/matchflix"].galleryAlts[0]` | `es` / `en` | `Matchflix — textura` / `Matchflix — texture` | `Matchaflix — textura` / `Matchaflix — texture` |
| `…galleryAlts[1]` | `es` / `en` | `Matchflix — vasos` / `Matchflix — cups` | `Matchaflix — vasos` / `Matchaflix — cups` |
| `…galleryAlts[2]` | `es` / `en` | `Matchflix — vasos` / `Matchflix — cups` | `Matchaflix — vasos` / `Matchaflix — cups` |
| `…galleryAlts[3]` | `es` / `en` | `Matchflix — packaging` / *(no value, fell back)* | `Matchaflix — packaging` / `Matchaflix — packaging` |
| `…galleryAlts[4]` | `es` / `en` | `Matchflix — textura` / `Matchflix — texture` | `Matchaflix — textura` / `Matchaflix — texture` |
| `…galleryAlts[5]` | `es` / `en` | `Matchflix — textura` / `Matchflix — texture` | `Matchaflix — textura` / `Matchaflix — texture` |
| `…galleryAlts[6]` | `es` / `en` | `Matchflix — packaging té matcha` / `Matchflix — matcha tea packaging` | `Matchaflix — packaging té matcha` / `Matchaflix — matcha tea packaging` |
| `…galleryAlts[7]` | `es` / `en` | `Matchflix — camisetas` / `Matchflix — T-shirts` | `Matchaflix — camisetas` / `Matchaflix — T-shirts` |

- Applied on all four breakpoints of each image.
- Two English values that used to be empty (and so showed the Spanish text) now have explicit
  English values, so every alt in the site has an English value or is intentionally identical (§7).
- After the change, **no text anywhere in the project contains `Matchflix`**: no content, alt text
  or metadata, in either locale. The only remaining occurrence is the **URL slug**
  `/projects/matchflix`, deliberately left unchanged so existing links keep working (24/09 §10.3,
  still open). Don't run a blind find-and-replace of `Matchflix` over the repo: it would rename the
  route.
- Published in `b3ef61149`.

### 11.3 How this was verified

Against the served HTML of production `b3ef61149`, raw HTML, no tag stripping:

| Page | `lang` | Matchaflix alts found | `alt="Matchflix…"` |
|---|---|---|---|
| `/` | `es` | `Matchaflix — rebranding` ×1 | 0 |
| `/en/` | `en` | `Matchaflix — rebrand` ×1 | 0 |
| `/projects` | `es` | `Matchaflix — rebranding` ×1 | 0 |
| `/en/projects` | `en` | `Matchaflix — rebrand` ×1 | 0 |
| `/projects/matchflix` | `es` | `textura` ×3, `vasos` ×2, `packaging` ×1, `packaging té matcha` ×1, `camisetas` ×1 | 0 |
| `/en/projects/matchflix` | `en` | `texture` ×3, `cups` ×2, `packaging` ×1, `matcha tea packaging` ×1, `T-shirts` ×1 | 0 |

---

## 12. Later in the session — `Menu` component: text fixed, then deleted

No source file was edited. The component's text was fixed first (§12.2). It was then **deleted
from the project** (§12.4), because it wasn't used anywhere.

### 12.1 What the component was

`Menu` was an old two-variant component: `Closed` hid the links and showed `( + )`; `Open` showed
the links and `( – )`. Tapping the toggle cycled the variant. It predates the current `Navigation`
component (23/09 §5) and **had no instance on any page**, so it was never part of the live site in
either locale. Its links were the only hard-coded English text left on the Spanish side of the
project.

> Not to be confused with the **`( Menu )` / `( Close )` toggle** of the mobile drawer
> (`nav.toggle.*` in §6). That toggle belongs to the `Navigation` component and is unaffected.

### 12.2 Step 1: text fixed (published in `bcb453b35`)

The labels were changed to match the main navigation (`nav.*` in §6):

| Link | `href` | ES — before | ES — after | EN — before | EN — after |
|---|---|---|---|---|---|
| 1 | `/projects` | `Work` | `Proyectos` | *(no value, fell back to Spanish)* | `Projects` |
| 2 | `/about` | `About` | `Sobre mí` | *(no value)* | `About` |
| 3 | `/contact` | `Contact` | `Contacto` | *(no value)* | `Contact` |
| Toggle | — | `( + )` / `( – )` | unchanged | — | unchanged |

Only the text changed; the `href`s, the `Nav` text style and the toggle interaction were untouched.
That publish's changelog listed only the `Menu` component. After it, `/`, `/en/`, `/about`,
`/en/about`, `/projects/matchflix` and `/en/projects/matchflix` all returned `200` with the right
`lang` and navigation language, and no `Work` link anywhere.

This step is now **superseded by step 2**. It's kept here only as a record.

### 12.3 Step 2: checks before deleting

Run against the whole project immediately before the deletion:

| Check | Result |
|---|---|
| Instances of `Menu` on any page, layout template or component | **0**. The project's 10 component instances are all `Language` (6) or `Navigation` (4) |
| Other nodes referencing its id (links, overlays, slots, variables) | **None**. The only matches were the component's own layers |
| Code files importing or mentioning it | **None**. `LocaleSwitch.tsx` is the only code file and doesn't reference it |

### 12.4 Step 2: deleted

- **What was removed:** the `Menu` component, with both variants and all its layers.
- **Components left:** `Language` and `Navigation`, the only two. All 10 instances are intact.
- **Translations:** its five localization entries (three links, two toggle symbols) were removed
  with it. The project now has 13 localization groups.
- **Live site:** no visible change, since nothing rendered the component.
- **Publishing:** published in `c8025858a`. That publish's only change was `Menu: removed`. After
  it, all 18 routes (§4.1) were checked on production:
  - each returns `200` with the right `lang`
  - the navigation is in the right language
  - the matching ES/EN label carries `aria-current="true"`
  - no page contains a `Work` link

This resolves 24/09 §10.7 («Componente `Menu` sin usar») and 8.3 here.

### 12.5 For the repo

**Delete the `Menu` component** and everything that exists only for it: its file, styles, and any
dictionary keys or translations you created only for it. Don't add `menu.*` keys; §6 has none.

Before deleting, run the same check as §12.3 in the repo: search for imports or usages of the
component. In Framer it had none; if your repo renders it somewhere, that's a divergence from the
Framer source, and the `Navigation` component is the one that should be used there instead.

---

*Generated on 02/10/2026 from the live state of Framer project `4pRs8QyCSry0wVCAGf6n` and production version `c8025858a`.*
