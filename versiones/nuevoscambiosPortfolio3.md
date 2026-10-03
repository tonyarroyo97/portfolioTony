# Portfolio · Tony Arroyo

**Implementation spec · 03/10/2026 · final state of every change made in Framer after `nuevoscambiosPortfolio2.md`**

Project pages rebuilt (Tony Nieve, Matchaflix, Metamorfosis, Love), one shared image/video carousel with a fullscreen
lightbox, Metamorfosis reorganised into 8 stages with 4 illustration process videos, About › Equipment and
Education updated, plus small fixes.

Continues `Versiones/nuevoscambiosPortfolio2.md` (03/10). **Apply that file first**; this one only describes what
changed after it. If both files disagree, **this one wins**.
Source of truth: Framer project `4pRs8QyCSry0wVCAGf6n`. Production: https://shaggy-snow-332401.framer.app (not
published yet, so production still shows the old version).

> **Read this first.**
>
> - **Final state only.** Several things were changed more than once during the session (Metamorfosis especially).
>   Only the last version is described. Intermediate layouts are not mentioned anywhere.
> - **Everything below was read back from Framer after the change**, including the English text from Framer's
>   Localization. Apply it literally.
> - **Ready-made files** are in `Versiones/nuevoscambiosPortfolio3-assets/`:
>   - `code/CompositionCarousel.tsx`: the component of §3, already ported (no Framer APIs). It compiles with
>     `tsc --strict` and was tested in Chrome.
>   - `videos/metamorfosis-proceso-1…4.mp4`: the 4 process videos, already trimmed and converted (§10.3).
>   - `images/*.jpg`: the photos that were not on the site before this session, orientation-corrected (§10.2).
> - **Class names** (`.gallery-row`, `.text-section`…) are placeholders for whatever the repo already uses. The
>   gallery system (`.gallery`, `.gallery-row`, `--ratio`, `--gutter`) is the one from `nuevoscambiosPortfolio2.md` §7.1.
> - **Dictionary keys** follow the naming of the previous files (`projectPages.<slug>.…`). New keys are marked **NEW**,
>   removed ones **REMOVED**.
> - **No em dashes** in any visible text (rule from the previous specs). Stage numbers use « · » (`01 · …`).
> - **Name:** always «Tony» with a Y (Tony Arroyo, Tony Nieve).
> - **Love was not touched in the last rounds**, but it did change earlier in this session (§7). Apply §7.

---

## 1. What changed, in one screen

| # | Area | Change |
|---|---|---|
| 1 | Shared component | `CompositionCarousel` now handles **single images, image carousels, a fullscreen lightbox and an optional video**, shown either as a last slide or as an in-place **«Ver proceso» reveal**. Used on Tony Nieve, Matchaflix and Metamorfosis (§3) |
| 2 | Tony Nieve | **All 25 photos** (13 were missing) + reel. Grouped by shoot into carousels, ordered in 4 atmospheres separated by one-line pauses. Shorter intro «Enfoque». First-person closing text before the compositions. **Every photo opens fullscreen** (§5) |
| 3 | Matchaflix | Intro becomes «El reto» (quality vs perceived value). Green spray textures in one carousel. «La respuesta» text moved between textures and applications (§6) |
| 4 | Love | «Pieza / Caja, taza y aplicaciones gráficas» removed. Block becomes «El reto». Closing becomes «La respuesta» (§7) |
| 5 | Metamorfosis | Rebuilt as **8 stages**: 01 Conceptualización · 02 Selección de material · 03 Composición y diseño · 04 Ilustración y proceso · 05 Maquetación · 06 Impresión y acabados · 07 Sesión de fotos · 08 Presentación del TFG. **No carousels left**; 4 illustrations reveal their **process video** in place. «Pieza» block and «El proyecto» text removed (§8) |
| 6 | Metamorfosis TFG | New closing section: suit photo + text + link to the defence video **at 2:58:16** (§8.10) |
| 7 | About | Equipment replaced (Canon 6D Mark, 30 mm, 50 mm). Education reordered + Erasmus Naples + Escuela Mateo y Nuria; ESADA removed from About; new «Talleres y cursos» group in a smaller style (§9) |
| 8 | Fixes | Closing text block on all 4 project pages now has a tablet/phone layout. English of one Mentions detail fixed. Love box alt (§11) |

Unchanged: Home, Projects index, Contact, CV, header, footer, navigation, fonts, text styles, colours, Mentions.

---

## 2. Shared layout pieces

### 2.1 Breakpoints and gutters (unchanged)

| | Desktop `≥1200` | Laptop `1024–1199.98` | Tablet `810–1023.98` | Phone `≤809.98` |
|---|---|---|---|---|
| `--gutter` (gap in galleries and rows) | 26px | 24px | 20px | 16px |
| Label column of text sections | 170px | 145px | 114px | stacked (no column) |

### 2.2 Text section («Label + text»), used by every intro / stage / closing text

Same block as the existing project Intro: a full-width row, `max-width: 1760px`, label in `Label`, text in
**`Editorial Note`** (EB Garamond italic, the existing style), `max-width: 760px`, paragraphs as separate `<p>`.

```css
.text-section { display: flex; flex-direction: row; align-items: flex-start; gap: 26px; width: 100%; max-width: 1760px; }
.text-section__label { flex: 0 0 170px; }          /* Label style */
.text-section__text  { flex: 1 1 0; min-width: 0; max-width: 760px; }   /* Editorial Note style */
@media (min-width: 1024px) and (max-width: 1199.98px) { .text-section__label { flex-basis: 145px; } }
@media (min-width: 810px) and (max-width: 1023.98px)  { .text-section__label { flex-basis: 114px; } }
@media (max-width: 809.98px) {
  .text-section { flex-direction: column; gap: 14px; }
  .text-section__label { flex-basis: auto; }
  .text-section__text { width: 100%; }
}
```

Padding presets (top / bottom; left and right are always 0):

| Preset | Desktop | Laptop | Tablet | Phone | Used by |
|---|---|---|---|---|---|
| `full` | 110 / 110 | 97 / 97 | 79 / 79 | 55 / 55 | Intros, Matchaflix and Love «La respuesta» |
| `stage` | 110 / 64 | 97 / 56 | 79 / 46 | 55 / 32 | Metamorfosis stages with text, followed by images |
| `stage-label` | 110 / 40 | 97 / 35 | 79 / 28 | 55 / 20 | Metamorfosis stages 04 and 07 (label only, no text) |
| `stage-first` | 110 / 0 | 97 / 0 | 79 / 0 | 55 / 0 | Metamorfosis 01 (text only, followed by stage 02) |
| `closing-short` | 110 / 44 | 97 / 39 | 79 / 32 | 55 / 24 | Tony Nieve «Composiciones» (followed by the compositions carousel) |

**Metamorfosis stages only:** on **Tablet** the stage label goes **above** the text (same as Phone: column, gap 14px,
label full width), because «CONCEPTUALIZACIÓN» does not fit the 114px column. On **Laptop** the stage label keeps
**170px** (not 145px). Other text sections keep the normal table above.

### 2.3 Gallery cells

The gallery system of `nuevoscambiosPortfolio2.md` §7.1 stays. Items that are a `CompositionCarousel` (§3) use a
cell **without** `aspect-ratio`, because the component draws its own frame and may add controls underneath:

```css
.gallery-cell { flex: var(--ratio) 1 0; min-width: 0; }      /* the component inside sets the frame ratio */
@media (max-width: 809.98px) { .gallery-cell { flex: none; width: 100%; } }
```

In a row, give each cell the same `--ratio` as the component's `frameRatio`: frames then have equal heights,
exactly like `.gallery-item`.

### 2.4 Indented rows

Some rows start at the text column instead of the page edge (marked **indented** below):

```css
.row--indented { padding-left: 196px; }      /* 170 + 26 */
@media (min-width: 1024px) and (max-width: 1199.98px) { .row--indented { padding-left: 171px; } }
@media (min-width: 810px) and (max-width: 1023.98px)  { .row--indented { padding-left: 140px; } }
@media (max-width: 809.98px) { .row--indented { padding-left: 0; } }
```

---

## 3. Component: `CompositionCarousel` (replaces the one in `nuevoscambiosPortfolio2.md` §8.3)

### 3.1 What it does

One component for every image on the project pages that should be clickable:

| Case | Props | Result |
|---|---|---|
| Single photo | `images` with 1 item | The photo in a frame of `frameRatio`, no controls. Click → fullscreen lightbox |
| Series | `images` with 2+ items | Horizontal carousel: swipe (native scroll snap), ‹ › arrows (18px chevrons), dots (5px), ← / → keys. Above 10 items the dots become a counter «01 / 12». Click → lightbox that browses the same series |
| Image + video as last slide | `video`, `videoMode="slides"` | The video is the last slide. It plays **muted from the start** when its slide becomes active and visible, pauses when you leave. Optional `slideNames` («Resultado final⏎Proceso») shows the active slide's name under the dots. *(Not used on the site any more; kept because it is part of the component.)* |
| Image + video reveal | `video`, `videoMode="reveal"` | No arrows, no dots. The image shows. Underneath, a small text button «▶ Ver proceso» crossfades (0.5s) to the video, which plays **muted, looping, from the start**. The button then reads «Ver ilustración» and fades back (video pauses). Used in Metamorfosis stage 04 |

Common rules:
- `fit="cover"` fills the frame (use it when the frame ratio = the photo ratio, so nothing is cropped);
  `fit="contain"` never crops (series with mixed ratios). Videos are **always** `contain`, never cropped.
- Hover (desktop): image `scale(1.02)`, 0.8s `cubic-bezier(0.4, 0, 0.2, 1)`. Cursor `zoom-in`.
- **Lightbox:** fixed overlay on the page background `rgb(236, 234, 222)`, fades in over 0.35s. A «( Cerrar )» text button at the
  top right (same style as the menu's «( Menu )»). Image or video as large as possible (`contain`), 48px side padding
  (16px on Phone). The same arrows and dots at the bottom when there are 2+ slides. Swipe, ← / →, Esc. Clicking the
  empty area closes it. Page scroll is locked. Focus is trapped and goes back to the clicked image on close. Closing moves
  the inline carousel to the slide you were on.
- Accessibility: series are `role="region"` + `aria-roledescription="carousel"` + `aria-label={label}`; slides are
  `role="group"` labelled «Imagen 3 / 5»; dots have `aria-current`; image buttons are «Ampliar imagen: {alt}».
- Per-breakpoint frame ratio: set the CSS variable `--carousel-ratio` on a parent (used by the compositions, §5.6).

### 3.2 Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `images` | `{ src, srcSet?, alt? }[]` | `[]` | `alt` is also used for the lightbox |
| `frameRatio` | number | `1` | width / height of the frame |
| `fit` | `"cover" \| "contain"` | `"contain"` | images only |
| `lightbox` | boolean | `true` | |
| `video` | string | — | mp4 URL, added after the images |
| `videoMode` | `"slides" \| "reveal"` | `"slides"` | |
| `videoLabel` | string | `""` | `aria-label` of the video |
| `slideNames` | string | `""` | one name per line; empty = hidden |
| `revealLabel` / `hideLabel` | string | «Ver proceso» / «Ver ilustración» | reveal button |
| `label` | string | «Composiciones» | carousel / dialog name |
| `previousLabel`, `nextLabel`, `slideLabel`, `openLabel`, `closeLabel` | string | «Anterior», «Siguiente», «Imagen», «Ampliar imagen», «Cerrar» | |
| `color`, `mutedColor`, `background` | string | Ink, Rule, Paper | defaults are the site tokens |
| `gap` | number | `20` | px between frame and controls |

**Always pass the translated strings** (`t()`), never rely on the Spanish defaults:

| Key | ES | EN |
|---|---|---|
| `carousel.previous` | Anterior | Previous |
| `carousel.next` | Siguiente | Next |
| `carousel.slide` | Imagen | Image |
| `carousel.open` **NEW** | Ampliar imagen | View larger |
| `carousel.close` **NEW** | Cerrar | Close |
| `carousel.revealProcess` **NEW** | Ver proceso | View process |
| `carousel.hideProcess` **NEW** | Ver ilustración | View illustration |
| `carousel.series` **NEW** (label of photo series) | Serie fotográfica | Photo series |
| `carousel.photo` **NEW** (label of single photos) | Fotografía | Photograph |
| `carousel.label` (compositions) | Composiciones | Compositions |

### 3.3 Code

Same file as `nuevoscambiosPortfolio3-assets/code/CompositionCarousel.tsx`. React 18, no dependencies, SSR-safe
(`window` / `document` only in effects and handlers; the lightbox is portalled to `document.body`). If the repo
also has the old `CompositionCarousel` from the previous spec, **replace it** (the props are compatible: `images`,
`label`, `previousLabel`, `nextLabel`, `slideLabel` are the same; the frame ratio is now `frameRatio` or
`--carousel-ratio`).

```tsx
import {
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
    startTransition,
    type CSSProperties,
    type KeyboardEvent,
    type ReactNode,
} from "react"
import { createPortal } from "react-dom"

export interface SlideImage {
    src: string
    srcSet?: string
    alt?: string
    kind?: "image" | "video"
}

export interface CompositionCarouselProps {
    images: SlideImage[]
    video?: string
    videoLabel?: string
    slideNames?: string
    videoMode?: "slides" | "reveal"
    revealLabel?: string
    hideLabel?: string
    frameRatio?: number
    fit?: "contain" | "cover"
    lightbox?: boolean
    color?: string
    mutedColor?: string
    background?: string
    gap?: number
    label?: string
    previousLabel?: string
    nextLabel?: string
    slideLabel?: string
    openLabel?: string
    closeLabel?: string
    style?: CSSProperties
}

const CLASS = "tn-carousel"
const TEXT_MUTED = "rgb(107, 95, 102)" // Ink Muted
const EASE = "cubic-bezier(0.44, 0, 0.56, 1)"
const LABEL_FONT: CSSProperties = {
    fontFamily: '"Arimo", "Arimo Placeholder", sans-serif',
    fontSize: 11,
    letterSpacing: "0.09em",
    textTransform: "uppercase",
    lineHeight: 1,
}

/**
 * Shared track logic: the active slide comes from the track's own scroll
 * position, so swipe, arrows, dots and keys all stay in sync.
 */
function useSnapTrack(count: number) {
    const trackRef = useRef<HTMLDivElement>(null)
    const [index, setIndex] = useState(0)

    const goTo = useCallback(
        (next: number, instant = false) => {
            const track = trackRef.current
            if (!track || count === 0) return
            const clamped = Math.max(0, Math.min(count - 1, next))
            track.scrollTo({
                left: clamped * track.clientWidth,
                behavior: instant ? "auto" : "smooth",
            })
            if (instant) setIndex(clamped)
        },
        [count]
    )

    const onScroll = useCallback(() => {
        const track = trackRef.current
        if (!track || track.clientWidth === 0) return
        const next = Math.round(track.scrollLeft / track.clientWidth)
        startTransition(() => setIndex(next))
    }, [])

    // Keep the current slide in place when the width changes
    useEffect(() => {
        if (typeof window === "undefined") return
        const track = trackRef.current
        if (!track) return
        const onResize = () => {
            track.scrollTo({ left: index * track.clientWidth })
        }
        window.addEventListener("resize", onResize)
        return () => window.removeEventListener("resize", onResize)
    }, [index])

    return { trackRef, index, goTo, onScroll }
}

function Controls(props: {
    count: number
    index: number
    color: string
    mutedColor: string
    previousLabel: string
    nextLabel: string
    slideLabel: string
    names?: string[]
    goTo: (i: number) => void
}) {
    const { count, index, color, mutedColor, goTo } = props
    const arrow = (direction: "prev" | "next") => {
        const disabled = direction === "prev" ? index <= 0 : index >= count - 1
        return (
            <button
                type="button"
                className={`${CLASS}-arrow`}
                aria-label={
                    direction === "prev" ? props.previousLabel : props.nextLabel
                }
                disabled={disabled}
                onClick={() =>
                    goTo(direction === "prev" ? index - 1 : index + 1)
                }
                style={{ ...arrowStyle, color, opacity: disabled ? 0.25 : 1 }}
            >
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    {direction === "prev" ? (
                        <path d="M15 5l-7 7 7 7" />
                    ) : (
                        <path d="M9 5l7 7-7 7" />
                    )}
                </svg>
            </button>
        )
    }

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
            }}
        >
            {arrow("prev")}
            {count > 10 ? (
                <span
                    aria-live="polite"
                    style={{
                        ...LABEL_FONT,
                        color,
                        fontVariantNumeric: "tabular-nums",
                        minWidth: 56,
                        textAlign: "center",
                    }}
                >
                    {String(index + 1).padStart(2, "0")} /{" "}
                    {String(count).padStart(2, "0")}
                </span>
            ) : (
                <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
                    {Array.from({ length: count }, (_, i) => (
                        <button
                            key={i}
                            type="button"
                            className={`${CLASS}-dot`}
                            aria-label={props.names?.[i] || `${props.slideLabel} ${i + 1}`}
                            aria-current={i === index ? "true" : undefined}
                            onClick={() => goTo(i)}
                            style={{ ...dotButtonStyle, color }}
                        >
                            <span
                                style={{
                                    display: "block",
                                    width: 5,
                                    height: 5,
                                    borderRadius: "50%",
                                    background:
                                        i === index ? color : mutedColor,
                                    transition: "background 0.3s ease",
                                }}
                            />
                        </button>
                    ))}
                </div>
            )}
            {arrow("next")}
        </div>
    )
}

const videoStyle: CSSProperties = {
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    width: "auto",
    height: "auto",
    objectFit: "contain",
}

/**
 * Plays from the start while its slide is active (and on screen), pauses
 * otherwise. Always muted, no controls, so it reads as part of the page.
 */
function useSlideVideo(active: boolean) {
    const ref = useRef<HTMLVideoElement>(null)
    useEffect(() => {
        const video = ref.current
        if (!video) return
        if (active) {
            video.currentTime = 0
            const playing = video.play()
            if (playing) playing.catch(() => {})
        } else {
            video.pause()
        }
    }, [active])
    return ref
}

function SlideVideo(props: { src: string; label?: string; active: boolean }) {
    const ref = useSlideVideo(props.active)
    return (
        <video
            ref={ref}
            src={props.src}
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={props.label}
            draggable={false}
            style={videoStyle}
        />
    )
}

function LightboxVideo(props: { src: string; label?: string; active: boolean }) {
    return <SlideVideo {...props} />
}

function Lightbox(props: {
    items: SlideImage[]
    startIndex: number
    color: string
    mutedColor: string
    background: string
    label: string
    previousLabel: string
    nextLabel: string
    slideLabel: string
    closeLabel: string
    onClose: (index: number) => void
}) {
    const { items, startIndex, color, background, onClose } = props
    const count = items.length
    const { trackRef, index, goTo, onScroll } = useSnapTrack(count)
    const dialogRef = useRef<HTMLDivElement>(null)
    const closeRef = useRef<HTMLButtonElement>(null)
    const indexRef = useRef(startIndex)
    indexRef.current = index
    const [visible, setVisible] = useState(false)

    // Open on the clicked image, then fade in
    useLayoutEffect(() => {
        goTo(startIndex, true)
        closeRef.current?.focus({ preventScroll: true })
        const frame = requestAnimationFrame(() => setVisible(true))
        return () => cancelAnimationFrame(frame)
    }, [])

    // Lock page scroll while open
    useEffect(() => {
        const root = document.documentElement
        const previous = root.style.overflow
        root.style.overflow = "hidden"
        return () => {
            root.style.overflow = previous
        }
    }, [])

    const close = useCallback(() => onClose(indexRef.current), [onClose])

    useEffect(() => {
        const onKey = (event: globalThis.KeyboardEvent) => {
            if (event.key === "Escape") {
                event.preventDefault()
                close()
            } else if (event.key === "ArrowLeft") {
                event.preventDefault()
                goTo(indexRef.current - 1)
            } else if (event.key === "ArrowRight") {
                event.preventDefault()
                goTo(indexRef.current + 1)
            } else if (event.key === "Tab") {
                // Keep focus inside the dialog
                const dialog = dialogRef.current
                if (!dialog) return
                const focusable = Array.from(
                    dialog.querySelectorAll<HTMLElement>(
                        "button:not(:disabled), [tabindex='0']"
                    )
                )
                if (focusable.length === 0) return
                const first = focusable[0]
                const last = focusable[focusable.length - 1]
                if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault()
                    last.focus()
                } else if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault()
                    first.focus()
                }
            }
        }
        document.addEventListener("keydown", onKey)
        return () => document.removeEventListener("keydown", onKey)
    }, [close, goTo])

    return (
        <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={props.label}
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 1000,
                background,
                display: "flex",
                flexDirection: "column",
                opacity: visible ? 1 : 0,
                transition: `opacity 0.35s ${EASE}`,
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    padding: "0 var(--tn-lb-pad)",
                    height: 56,
                    flex: "0 0 auto",
                }}
            >
                <button
                    ref={closeRef}
                    type="button"
                    className={`${CLASS}-close`}
                    onClick={close}
                    style={{
                        ...LABEL_FONT,
                        color,
                        background: "transparent",
                        border: "none",
                        padding: "12px 0",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                    }}
                >
                    ( {props.closeLabel} )
                </button>
            </div>
            <div
                ref={trackRef}
                className={`${CLASS}-track`}
                onScroll={onScroll}
                style={{
                    ...trackStyle,
                    flex: "1 1 auto",
                    minHeight: 0,
                }}
            >
                {items.map((image, i) => (
                    <div
                        key={i}
                        role="group"
                        aria-roledescription="slide"
                        aria-label={`${props.slideLabel} ${i + 1} / ${count}`}
                        onClick={(event) => {
                            if (event.target === event.currentTarget) close()
                        }}
                        style={{
                            ...slideStyle,
                            padding: "0 var(--tn-lb-pad)",
                            boxSizing: "border-box",
                        }}
                    >
                        {image.kind === "video" ? (
                            <LightboxVideo
                                src={image.src}
                                label={image.alt}
                                active={i === index}
                            />
                        ) : (
                            <img
                                src={image.src}
                                srcSet={image.srcSet}
                                sizes="100vw"
                                alt={image.alt ?? ""}
                                loading={Math.abs(i - startIndex) <= 1 ? "eager" : "lazy"}
                                draggable={false}
                                style={{
                                    display: "block",
                                    maxWidth: "100%",
                                    maxHeight: "100%",
                                    width: "auto",
                                    height: "auto",
                                    objectFit: "contain",
                                    userSelect: "none",
                                }}
                            />
                        )}
                    </div>
                ))}
            </div>
            <div
                style={{
                    flex: "0 0 auto",
                    height: 64,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {count > 1 && (
                    <Controls
                        count={count}
                        index={index}
                        color={color}
                        mutedColor={props.mutedColor}
                        previousLabel={props.previousLabel}
                        nextLabel={props.nextLabel}
                        slideLabel={props.slideLabel}
                        goTo={goTo}
                    />
                )}
            </div>
        </div>
    )
}

/**
 * Repo port of the Framer code component `CompositionCarousel.tsx` (same behaviour, no Framer APIs).
 * Per-breakpoint frame ratio: set `--carousel-ratio` on a parent class; otherwise `frameRatio` is used.
 *
 * Editorial image carousel used across the project pages.
 * One image shows a single photograph; several images become a carousel
 * with swipe, arrows, dots and ← / → keys. Images are never cropped
 * unless Fit is set to Fill. Clicking an image opens a fullscreen view
 * that can browse the same set.
 *
 */
export default function CompositionCarousel(props: CompositionCarouselProps) {
    const {
        images = [],
        frameRatio = 1,
        fit = "contain",
        lightbox = true,
        color = "rgb(40, 24, 34)",
        mutedColor = "rgb(206, 197, 159)",
        background = "rgb(236, 234, 222)",
        gap = 20,
        label = "Composiciones",
        previousLabel = "Anterior",
        nextLabel = "Siguiente",
        slideLabel = "Imagen",
        openLabel = "Ampliar imagen",
        closeLabel = "Cerrar",
        video,
        videoLabel = "",
        slideNames = "",
        videoMode = "slides",
        revealLabel = "Ver proceso",
        hideLabel = "Ver ilustración",
    } = props
    const reveal = videoMode === "reveal" && !!video

    // Images first, then the optional video as the last slide
    const items: SlideImage[] = images
        .filter((image) => image?.src)
        .map((image) => ({ ...image, kind: "image" as const }))
    if (video) items.push({ src: video, alt: videoLabel, kind: "video" })
    const names = slideNames
        .split("\n")
        .map((name) => name.trim())
    const count = items.length
    const isCarousel = count > 1 && !reveal
    const [showVideo, setShowVideo] = useState(false)
    const { trackRef, index, goTo, onScroll } = useSnapTrack(count)
    const [openIndex, setOpenIndex] = useState<number | null>(null)
    const triggerRefs = useRef<(HTMLButtonElement | null)[]>([])
    const [sizes, setSizes] = useState("(min-width: 810px) 50vw, 100vw")

    const canOpen = lightbox

    // Request the image size that matches the rendered width
    useEffect(() => {
        const track = trackRef.current
        if (!track || typeof ResizeObserver === "undefined") return
        let last = 0
        const observer = new ResizeObserver((entries) => {
            const width = Math.round(entries[0].contentRect.width)
            if (width > 0 && Math.abs(width - last) > 40) {
                last = width
                startTransition(() => setSizes(`${width}px`))
            }
        })
        observer.observe(track)
        return () => observer.disconnect()
    }, [])

    // Only play a video slide while the carousel is on screen
    const [inView, setInView] = useState(false)
    useEffect(() => {
        const track = trackRef.current
        if (!track || !video || typeof IntersectionObserver === "undefined") return
        const observer = new IntersectionObserver(
            ([entry]) => startTransition(() => setInView(entry.isIntersecting)),
            { threshold: 0.4 }
        )
        observer.observe(track)
        return () => observer.disconnect()
    }, [video])

    const onKeyDown = (event: KeyboardEvent) => {
        if (!isCarousel || openIndex !== null) return
        if (event.key === "ArrowLeft") {
            event.preventDefault()
            goTo(index - 1)
        } else if (event.key === "ArrowRight") {
            event.preventDefault()
            goTo(index + 1)
        }
    }

    const onClose = useCallback(
        (lastIndex: number) => {
            setOpenIndex(null)
            goTo(lastIndex, true)
            const trigger = triggerRefs.current[lastIndex]
            trigger?.focus({ preventScroll: true })
        },
        [goTo]
    )

    const slideContent = (image: SlideImage, i: number): ReactNode => {
        const img = image.kind === "video" ? (
            <SlideVideo
                src={image.src}
                label={image.alt}
                active={i === index && openIndex === null && inView}
            />
        ) : (
            <img
                className={`${CLASS}-img`}
                src={image.src}
                srcSet={image.srcSet}
                sizes={sizes}
                alt={image.alt ?? ""}
                loading="lazy"
                draggable={false}
                style={
                    fit === "cover"
                        ? {
                              display: "block",
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              userSelect: "none",
                          }
                        : {
                              display: "block",
                              maxWidth: "100%",
                              maxHeight: "100%",
                              width: "auto",
                              height: "auto",
                              objectFit: "contain",
                              userSelect: "none",
                          }
                }
            />
        )
        if (!lightbox) return img
        return (
            <button
                type="button"
                ref={(node) => {
                    triggerRefs.current[i] = node
                }}
                className={`${CLASS}-open`}
                aria-label={
                    image.alt ? `${openLabel}: ${image.alt}` : openLabel
                }
                aria-haspopup="dialog"
                onClick={() => {
                    if (canOpen) setOpenIndex(i)
                }}
                style={openButtonStyle}
            >
                {img}
            </button>
        )
    }

    return (
        <section
            role={isCarousel ? "region" : undefined}
            aria-roledescription={isCarousel ? "carousel" : undefined}
            aria-label={isCarousel ? label : undefined}
            onKeyDown={onKeyDown}
            style={{
                ...props.style,
                position: "relative",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap,
            }}
        >
            <style>{`
                .${CLASS}-track::-webkit-scrollbar { display: none; }
                .${CLASS}-arrow { transition: opacity 0.3s ease; }
                .${CLASS}-img { transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1); }
                .${CLASS}-close, .${CLASS}-reveal { transition: opacity 0.3s ease; }
                @media (hover: hover) {
                    .${CLASS}-arrow:not(:disabled):hover { opacity: 0.55 !important; }
                    .${CLASS}-open:hover .${CLASS}-img { transform: scale(1.02); }
                    .${CLASS}-close:hover, .${CLASS}-reveal:hover { opacity: 0.55; }
                }
                .${CLASS}-arrow:focus-visible, .${CLASS}-dot:focus-visible,
                .${CLASS}-close:focus-visible, .${CLASS}-open:focus-visible, .${CLASS}-reveal:focus-visible {
                    outline: 1px solid currentColor;
                    outline-offset: 2px;
                }
                :root { --tn-lb-pad: 48px; }
                @media (max-width: 809.98px) { :root { --tn-lb-pad: 16px; } }
            `}</style>
            {reveal ? (
                <>
                    <div
                        ref={trackRef}
                        style={{
                            position: "relative",
                            width: "100%",
                            aspectRatio: `var(--carousel-ratio, ${frameRatio})`,
                            overflow: "hidden",
                            color,
                        }}
                    >
                        {items.map((item, i) => {
                            const visible = (item.kind === "video") === showVideo
                            const playing = showVideo && openIndex === null && inView
                            const media =
                                item.kind === "video" ? (
                                    <SlideVideo src={item.src} label={item.alt} active={playing} />
                                ) : (
                                    slideContent(item, i)
                                )
                            return (
                                <div
                                    key={i}
                                    aria-hidden={!visible}
                                    style={{
                                        ...slideStyle,
                                        position: "absolute",
                                        inset: 0,
                                        opacity: visible ? 1 : 0,
                                        pointerEvents: visible ? "auto" : "none",
                                        transition: `opacity 0.5s ${EASE}`,
                                    }}
                                >
                                    {item.kind === "video" && lightbox ? (
                                        <button
                                            type="button"
                                            ref={(node) => {
                                                triggerRefs.current[i] = node
                                            }}
                                            className={`${CLASS}-open`}
                                            aria-label={item.alt ? `${openLabel}: ${item.alt}` : openLabel}
                                            aria-haspopup="dialog"
                                            tabIndex={visible ? 0 : -1}
                                            onClick={() => {
                                                if (canOpen) setOpenIndex(i)
                                            }}
                                            style={openButtonStyle}
                                        >
                                            {media}
                                        </button>
                                    ) : (
                                        media
                                    )}
                                </div>
                            )
                        })}
                    </div>
                    <button
                        type="button"
                        className={`${CLASS}-reveal`}
                        aria-pressed={showVideo}
                        onClick={() => setShowVideo((value) => !value)}
                        style={{
                            ...LABEL_FONT,
                            alignSelf: "flex-start",
                            display: "flex",
                            alignItems: "center",
                            gap: 7,
                            margin: 0,
                            padding: "6px 0",
                            border: "none",
                            background: "transparent",
                            color: TEXT_MUTED,
                            cursor: "pointer",
                        }}
                    >
                        {showVideo ? null : (
                            <svg width="7" height="8" viewBox="0 0 7 8" aria-hidden="true" style={{ display: "block" }}>
                                <path d="M0 0L7 4L0 8Z" fill="currentColor" />
                            </svg>
                        )}
                        {showVideo ? hideLabel : revealLabel}
                    </button>
                </>
            ) : (
            <div
                ref={trackRef}
                className={`${CLASS}-track`}
                onScroll={onScroll}
                tabIndex={isCarousel ? 0 : undefined}
                style={{
                    ...trackStyle,
                    width: "100%",
                    aspectRatio: `var(--carousel-ratio, ${frameRatio})`,
                    overflowX: isCarousel ? "auto" : "hidden",
                    color,
                }}
            >
                {items.map((image, i) => (
                    <div
                        key={i}
                        role={isCarousel ? "group" : undefined}
                        aria-roledescription={isCarousel ? "slide" : undefined}
                        aria-label={
                            isCarousel
                                ? `${names[i] || slideLabel} ${i + 1} / ${count}`
                                : undefined
                        }
                        style={{ ...slideStyle, overflow: "hidden" }}
                    >
                        {slideContent(image, i)}
                    </div>
                ))}
            </div>
            )}
            {isCarousel && (
                <Controls
                    count={count}
                    index={index}
                    color={color}
                    mutedColor={mutedColor}
                    previousLabel={previousLabel}
                    nextLabel={nextLabel}
                    slideLabel={slideLabel}
                    names={names}
                    goTo={goTo}
                />
            )}
            {isCarousel && names[index] ? (
                <p
                    aria-live="polite"
                    style={{
                        ...LABEL_FONT,
                        margin: "-12px 0 0",
                        color: TEXT_MUTED,
                        textAlign: "center",
                    }}
                >
                    {names[index]}
                </p>
            ) : null}
            {openIndex !== null &&
                typeof document !== "undefined" &&
                createPortal(
                    <Lightbox
                        items={items}
                        startIndex={openIndex}
                        color={color}
                        mutedColor={mutedColor}
                        background={background}
                        label={isCarousel ? label : (items[openIndex]?.alt ?? label)}
                        previousLabel={previousLabel}
                        nextLabel={nextLabel}
                        slideLabel={slideLabel}
                        closeLabel={closeLabel}
                        onClose={onClose}
                    />,
                    document.body
                )}
        </section>
    )
}

const trackStyle: CSSProperties = {
    display: "flex",
    overflowX: "auto",
    overflowY: "hidden",
    scrollSnapType: "x mandatory",
    scrollbarWidth: "none",
    overscrollBehaviorX: "contain",
    outline: "none",
}

const slideStyle: CSSProperties = {
    flex: "0 0 100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    scrollSnapAlign: "start",
    scrollSnapStop: "always",
}

const openButtonStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    padding: 0,
    margin: 0,
    border: "none",
    background: "transparent",
    color: "inherit",
    cursor: "zoom-in",
    overflow: "hidden",
}

const arrowStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 32,
    padding: 0,
    border: "none",
    background: "transparent",
    cursor: "pointer",
}

const dotButtonStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 16,
    height: 24,
    padding: 0,
    border: "none",
    background: "transparent",
    cursor: "pointer",
}
```

Usage examples:

```tsx
// single photo
<CompositionCarousel images={[{ src: foto1, alt: t("tn.alt.1") }]} frameRatio={1.5} fit="cover"
  label={t("carousel.photo")} previousLabel={t("carousel.previous")} nextLabel={t("carousel.next")}
  slideLabel={t("carousel.slide")} openLabel={t("carousel.open")} closeLabel={t("carousel.close")} />

// illustration with its process video (Metamorfosis 04)
<CompositionCarousel images={[{ src: ilustracion1, alt: t("meta.alt.illustration") }]}
  video="/assets/metamorfosis/metamorfosis-proceso-1.mp4" videoMode="reveal" videoLabel={t("meta.alt.process")}
  revealLabel={t("carousel.revealProcess")} hideLabel={t("carousel.hideProcess")}
  frameRatio={1.333} fit="cover" label={t("meta.illustration1.label")} … />
```

---

## 4. Component change: `AboutAccordions` (`nuevoscambiosPortfolio2.md` §8.4)

Groups get an optional **`compact`** flag: smaller text, tighter spacing, for complementary training.

```tsx
export interface AccordionGroup { label?: string; items: AccordionItem[]; compact?: boolean }   // + compact
```

```tsx
{groups.map((group, g) => (
    <div key={g} className={`about-acc__group${group.compact ? " about-acc__group--compact" : ""}`}
         style={{ gap: group.compact ? 10 : itemGap }}>
        {group.label && <p className="body-small about-acc__muted">{group.label}</p>}
        {group.items.map((item, k) => (
            <div key={k} className="about-acc__item">
                <p className={group.compact ? "body-small" : "body"}>{item.text}</p>
                {item.note && <p className="body-small about-acc__muted">{item.note}</p>}
            </div>
        ))}
    </div>
))}
```

```css
.about-acc__muted { color: rgb(107, 95, 102); }                       /* Ink Muted */
.about-acc__group--compact .about-acc__item { gap: 0; }               /* note sits right under the title */
.about-acc__group--compact .about-acc__item > p:first-child { color: rgb(40, 24, 34); }  /* Ink, at Body Small size */
```

Groups are 26px apart (unchanged). The group label is `Body Small` in Ink Muted (as before).

---

## 5. Tony Nieve (`/projects/tony-nieve`)

### 5.1 Page structure (final)

```
Opening + Meta                                                      (unchanged)
Intro «Enfoque»                     text-section, preset full       §5.2
Gallery (gap = --gutter)
  Apertura      Foto 1                                             single, 1.5
  Pause I       «En estudio, la escena se construye…»
  Row           [Studio series 21–25 carousel 0.8] [Reel 0.56]
  Pause II      «Fuera, busco lugares…»
  Row           [Foto 2 1.5] [Foto 5 0.8]
  Row           [Palace series 18,14 0.8] [Pearls series 19,20 0.8]
  Pause III     «A veces basta un objeto fuera de lugar…»
  Row           [Daisies series 6,12 0.8] [Freckles series 4,7 0.8]
  Row           [Foto 3 0.8] [Foto 13 0.8] [Foto 16 0.8]
  Pause IV      «La melancolía también tiene su propia luz.»
  Row           [Bathtub series 9–11 0.8] [Foto 8 0.8]
  Row           [Foto 15 0.8] [Foto 17 1.27]
Closing «Composiciones»            text-section, preset closing-short    §5.5
Compositions carousel (8)                                           §5.6
Next project                                                        (unchanged)
```

Removed: the old «El proyecto» closing paragraph (its idea moved into the intro and the closing), the old rows
«Rostros y flores» with Foto 7, «Espaldas», «Velo y fuego» as they were, and the compositions carousel inside the
gallery (it now sits after the closing text).

### 5.2 Intro

| Key | ES | EN |
|---|---|---|
| `projectPages.tony-nieve.introLabel` **NEW** (was «Concepto») | Enfoque | Approach |
| `projectPages.tony-nieve.concept` (1 paragraph) | Tony Nieve es mi fotografía más personal. Vive entre lo real y lo imaginado: escenas que podrían ser un recuerdo o un sueño, con algo familiar y algo que no termina de encajar. Dirijo a cada persona, el gesto y la luz para construir ese pequeño mundo. | Tony Nieve is my most personal photography. It lives somewhere between the real and the imagined: scenes that could be a memory or a dream, with something familiar and something that doesn't quite fit. I direct each person, the gesture and the light to build that small world. |

### 5.3 Pauses (one line between atmospheres)

Block: full width, `Editorial Note`, text `max-width: 620px`, no label. **Indented** to the text column.

| | Desktop | Laptop | Tablet | Phone |
|---|---|---|---|---|
| Padding (top right bottom left) | `84 0 58 196` | `74 0 50 171` | `64 0 40 140` | `40 0 24 0` |

| Key **NEW** | ES | EN |
|---|---|---|
| `projectPages.tony-nieve.pauses[0]` | En estudio, la escena se construye: dónde mira, qué tapa una flor, cuánto se deja ver. | In the studio, the scene is built: where they look, what a flower hides, how much is left to see. |
| `projectPages.tony-nieve.pauses[1]` | Fuera, busco lugares que parezcan de otro tiempo, como esos recuerdos de infancia que no sabes si pasaron o si los soñaste. | Outdoors, I look for places that seem to belong to another time, like those childhood memories you can't tell whether you lived or dreamed. |
| `projectPages.tony-nieve.pauses[2]` | A veces basta un objeto fuera de lugar para que un retrato deje de ser solo un retrato. | Sometimes one object out of place is enough for a portrait to stop being just a portrait. |
| `projectPages.tony-nieve.pauses[3]` | La melancolía también tiene su propia luz. | Melancholy has its own light too. |

### 5.4 Gallery items

Every photo is a `CompositionCarousel` in a `.gallery-cell` with `--ratio` = frame ratio (§2.3). Rows are
`.gallery-row` (stacked on Phone). `label` = `carousel.series` for series, `carousel.photo` for single photos.
Local files are in `Desktop/PortfolioTony/Proyectos/Tony Nieve/`. Framer URLs are `https://framerusercontent.com/images/<file>`.

| Row | Item | Photos in order (local file → Framer file) | `frameRatio` | `fit` |
|---|---|---|---|---|
| Apertura | single | `Foto 1.jpeg` → `zWVW9KKnUAGztsRa6E7iy005YDg.jpg` | 1.5 | cover |
| Studio | **series** | `Foto 21.jpg` → `tl2UzWZvnw0pLD7fW47KDUefWo.jpg` · `Foto 22.jpg` → `b7ECE1qbaBrTEFEB3AAJ7uPSWOM.jpg` · `Foto 23.jpg` → `4ub3S7fCXgBE5HHpWMeo3pBFh8.jpg` · `Foto 24.jpg` → `jkpLUqacfzFdyu5Wbe4XZoQxWw.jpg` · `Foto 25.jpg` → `HHTYRXu1qOveocPlvu0V93MY910.jpg` | 0.8 | cover |
| Studio | reel (unchanged `<video autoplay muted loop playsinline>`, cover) | `Reel 21-25.mp4` | 0.56 | — |
| Bosque | single | `Foto 2.jpeg` → `APNAt0sUU16YpzVbGnAB33rAmg.jpg` | 1.5 | cover |
| Bosque | single | `Foto 5.jpg` → `X44QamilaNkOP9kzR5O07iM21O8.jpg` | 0.8 | cover |
| Palacio y perlas | **series** | `Foto 18.jpg` → `3zqsZfz4Gn6S81hLguVXnZh8.jpg` · `Foto 14.jpg` → `nRMGMHgCE6w1D5WUp3ZKrm1Gwk.jpg` | 0.8 | **contain** (14 is 3:2) |
| Palacio y perlas | **series** | `Foto 19.jpg` → `pHcrDDS8yHDHU5kpCgE3fKzjDc.jpg` · `Foto 20.jpg` → `c6TpP4ZO3CpPPDgWtQgkUyda4.jpg` | 0.8 | cover |
| Margaritas y pecas | **series** | `Foto 6.jpg` → `YFNE5EjXf4xT6aggTM6IG4Mox4.jpg` · `Foto 12.jpg` → `id08TVMeulUs76mdhavP06DLruI.jpg` | 0.8 | cover |
| Margaritas y pecas | **series** | `Foto 4.jpg` → `H3zuKL4fTdPY9xR5ivSIH8mWlZI.jpg` · `Foto 7.jpg` → `2FREfGKqpcYnqzZEZ5cSFf6zLuU.jpg` | 0.8 | cover |
| Rostros y flores | single ×3 | `Foto 3.jpg` → `Ok46fPKYmTTS1WFrU4AlkT20Nw.jpg` · `Foto 13.jpg` → `JhfzKnnxOBDFxMAM48nyxI9xV7M.jpg` · `Foto 16.jpg` → `LjH5rOTOn3HY8nTwSBZUXzwI.jpg` | 0.8 each | cover |
| Bañera y espalda | **series** | `Foto 9.jpg` → `uKTp5OzJbra4BGjo1paYZjE0Ot0.jpg` · `Foto 10.jpg` → `hezb2bkM4FcaKe5FCigl2N0preY.jpg` · `Foto 11.jpg` → `OnNytthXoRw90CVnX0Zo5dVbBII.jpg` | 0.8 | cover |
| Bañera y espalda | single | `Foto 8.jpg` → `6b5GpC46gX3raapbNNbkZqT9Qzs.jpg` | 0.8 | cover |
| Velo y fuego | single | `Foto 15.jpg` → `yUhpyTZ4ZZ4tJy7b41m4hbvcM0.jpg` | 0.8 | cover |
| Velo y fuego | single | `Foto 17.jpg` → `FNKObqlQ555rLOSpJCbObMW5xoI.jpg` | 1.27 | cover |

All 25 photos appear exactly once. Breakpoints: rows side by side on Desktop / Laptop / Tablet with `--gutter`;
stacked at 100% width on Phone (gap 16px).

**Alt texts** (key `projectPages.tony-nieve.alt.<photo number>` **NEW**, replace the old «Retrato / Portrait»):

| Foto | ES | EN |
|---|---|---|
| 1 | Boca abierta con una mariposa sobre la lengua | Open mouth with a butterfly on the tongue |
| 2 | Retrato frente a un espejo en el bosque | Portrait in front of a mirror in the woods |
| 3 | Retrato con sombras de flores sobre la cara | Portrait with flower shadows across the face |
| 4 | Retrato con pecas a través de una lupa | Freckled portrait through a magnifying glass |
| 5 | Figura con vestido largo entre los árboles | Figure in a long dress among the trees |
| 6 | Retrato con margaritas en el pelo | Portrait with daisies in the hair |
| 7 | Retrato con una barba de margaritas | Portrait with a beard of daisies |
| 8 | Espalda con una margarita sobre la columna | Back with a daisy along the spine |
| 9 | Retrato en una bañera entre ramas verdes | Portrait in a bathtub among green branches |
| 10 | Retrato con brillo en la mejilla entre ramas verdes | Portrait with glitter on the cheek among green branches |
| 11 | Retrato con los ojos cerrados en una bañera | Portrait with closed eyes in a bathtub |
| 12 | Retrato en blanco y negro con margaritas en el pelo | Black and white portrait with daisies in the hair |
| 13 | Rostro cubierto de tiritas y flores secas | Face covered in plasters and dried flowers |
| 14 | Retrato a contraluz frente a un palacio | Backlit portrait in front of a palace |
| 15 | Dos personas bajo un velo, en blanco y negro | Two people under a veil, in black and white |
| 16 | Retrato de pelo rizado con una flor sobre el ojo | Curly-haired portrait with a flower over one eye |
| 17 | Retrato con un papel en llamas | Portrait holding a burning sheet of paper |
| 18 | Retrato con corona de flores a contraluz | Backlit portrait with a flower crown |
| 19 | Espalda con un collar de perlas | Back with a pearl necklace |
| 20 | Retrato entre luces y sombras | Portrait in light and shadow |
| 21 | Retrato tras flores rosas y amarillas | Portrait behind pink and yellow flowers |
| 22 | Retrato con chaqueta negra tras flores blancas | Portrait in a black jacket behind white flowers |
| 23 | Retrato colocando flores en jarrones | Portrait arranging flowers in vases |
| 24 | Retrato entre flores rosas | Portrait through pink flowers |
| 25 | Retrato tras flores rojas desenfocadas | Portrait behind blurred red flowers |

### 5.5 Closing text (before the compositions)

Text section, preset `closing-short`. Two paragraphs.

| Key | ES | EN |
|---|---|---|
| `projectPages.tony-nieve.closingLabel` **NEW** (was «El proyecto») | Composiciones | Compositions |
| `projectPages.tony-nieve.closing` (replaces the old text) | ¶1 Mis fotos casi nunca están solas. Las pienso como fragmentos de una historia más grande. ¶2 Cuando las junto, aparecen relaciones entre gestos, colores, personajes y atmósferas. Como fotogramas de una misma película, pueden sugerir una historia sin tener que explicarla. | ¶1 My photos are rarely on their own. I think of them as fragments of a bigger story. ¶2 When I bring them together, relationships appear between gestures, colours, characters and atmospheres. Like frames from the same film, they can suggest a story without having to explain it. |

### 5.6 Compositions carousel (moved, same 8 images as before)

Now **after** the closing text, full width, `max-width: 1760px`, outside the gallery. Same images and alts as
`nuevoscambiosPortfolio2.md` §8.2. `fit="contain"`, `label={t("carousel.label")}`, lightbox on.
Frame ratio per breakpoint with the CSS variable:

```css
.compositions { --carousel-ratio: 1.8; }
@media (min-width: 810px) and (max-width: 1023.98px) { .compositions { --carousel-ratio: 1.4; } }
@media (max-width: 809.98px) { .compositions { --carousel-ratio: 1; } }
```

---

## 6. Matchaflix (`/projects/matchflix`)

### 6.1 Structure (final)

```
Opening + Meta                                   (unchanged)
Intro «El reto»              text-section, full   2 paragraphs
Textures carousel            full width, max 1760px, 3 images, frameRatio 1.33, cover, label «Texturas de Matchaflix»
«La respuesta»               text-section, full   2 paragraphs   (was the closing «El proyecto», moved up)
Gallery
  Row   [cups 01 1.33] [cups 02 1.33]              (unchanged images, plain .gallery-item)
  Row   [Packaging 1.33] [Packaging Té Matcha 1.5] (unchanged)
  Full  [T-Shirt Mockups 1.5]                      (unchanged)
Next project
```

Removed from the gallery: the single full-width texture (`Ilustración_sin_título 10`) and the textures row
(`8`, `9`). These three are now the carousel. Nothing else on the page uses a carousel.

### 6.2 Textures carousel

`CompositionCarousel`, `images` in this order (local folder `Proyectos/Rebranding Matchaflix/`):

| # | Local | Framer | Alt ES / EN |
|---|---|---|---|
| 1 | `Ilustración_sin_título 10.jpg` | `4z4ykBvaK8qKqHS7IFGapE0g8c.jpg` | Textura de Matchaflix / Matchaflix texture |
| 2 | `Ilustración_sin_título 8.jpg` | `s5m8eqfcsMyr05ibLnDu5ILk2U.jpg` | same |
| 3 | `Ilustración_sin_título 9.jpg` | `RPzhadby9TDL7tuxYTR5miVlXdQ.jpg` | same |

| Key | ES | EN |
|---|---|---|
| `projectPages.matchflix.texturesLabel` **NEW** | Texturas de Matchaflix | Matchaflix textures |

### 6.3 Copy

| Key | ES | EN |
|---|---|---|
| `projectPages.matchflix.introLabel` **NEW** (was «Concepto») | El reto | The challenge |
| `projectPages.matchflix.concept` (2 ¶) | ¶1 Rebranding conceptual para una marca de matcha. Matchaflix ofrece un matcha de calidad, pero su imagen no lo transmitía: entre lo que había dentro y lo que se veía por fuera había una distancia. ¶2 El proyecto parte de esa tensión entre la calidad del producto y el valor que percibe quien ve la marca. La pregunta era cómo conseguir que la imagen de Matchaflix contara lo bueno que es su matcha y, a la vez, la hiciera más reconocible y deseable. | ¶1 Conceptual rebrand for a matcha brand. Matchaflix offers quality matcha, but its image didn't show it: there was a gap between what was inside and what you saw on the outside. ¶2 The project starts from that tension between the quality of the product and the value people perceive in the brand. The question was how Matchaflix's image could show how good its matcha is while making the brand more recognisable and desirable. |
| `projectPages.matchflix.closingLabel` **NEW** (was «El proyecto») | La respuesta | The response |
| `projectPages.matchflix.closing` (2 ¶) | ¶1 La esencia del producto se queda; lo que cambia es la forma de mirarlo. Llevé la marca hacia el lujo silencioso: verdes profundos y tonos crema, una tipografía más refinada y un lenguaje gráfico más contenido. ¶2 Las texturas en spray traen el color del matcha y le quitan rigidez al sistema. A partir de ahí, la identidad se aplica igual en vasos, bolsas de papel, sobres de té y camisetas, para que cada pieza se sienta parte del mismo mundo y el matcha encaje con naturalidad en una estética premium y discreta. | ¶1 The essence of the product stays; what changes is the way you look at it. I took the brand towards quiet luxury: deep greens and cream tones, more refined typography and a more restrained graphic language. ¶2 The spray textures bring in the colour of matcha and keep the system from feeling rigid. From there, the identity is applied consistently to cups, paper bags, tea pouches and T-shirts, so every piece feels part of the same world and matcha sits naturally within an understated, premium look. |

---

## 7. Love (`/projects/love-packaging`)

### 7.1 Structure (final)

```
Opening + Meta + Intro «Concepto»   (unchanged text)
Gallery
  «El reto» block    image left + text right, bottom aligned   (was the «Pieza» block)
  Row                3 photos (unchanged)
«La respuesta»       text-section, full, 2 paragraphs   (was «El proyecto»)
Next project
```

### 7.2 «El reto» block (same layout as the old «Pieza» block)

Row, `align-items: flex-end`, gap = `--gutter`. Image `IMG_4062.jpg` (Framer `gXMM2EzhUd1nGCmDNu0y5HnpvHc.jpg`),
ratio 0.67, width 620 / 527 / 416px (Desktop / Laptop / Tablet), 100% on Phone (block stacks, image first).
Text column: `flex: 1`, gap 16px, padding-bottom 26 / 23 / 19 / 13px. Label in `Label`, text in `Editorial Note`.

| Key | ES | EN |
|---|---|---|
| `projectPages.love-packaging.piece.label` → rename **`challengeLabel`** | El reto | The challenge |
| `projectPages.love-packaging.piece.note` → rename **`challenge`** (2 ¶) | ¶1 Mr. Wonderful tiene una identidad muy reconocible, llena de color, dibujos y mensajes. Quería ver hasta dónde podía llevarla sin que dejara de ser ella misma. ¶2 Lo que había que conservar era el tono: cercano, emocional, con algo que decir. Lo que podía cambiar era casi todo lo demás. | ¶1 Mr. Wonderful has a very recognisable identity, full of colour, drawings and messages. I wanted to see how far I could take it before it stopped being itself. ¶2 What had to stay was the tone: warm, emotional, with something to say. Almost everything else could change. |
| image alt (was «Pieza / Piece») | Caja de Love Packaging | Love Packaging box |

**REMOVED:** «Pieza» / «Piece», «Caja, taza y aplicaciones gráficas.» / «Box, mug and graphic applications.»

### 7.3 Closing

| Key | ES | EN |
|---|---|---|
| `projectPages.love-packaging.closingLabel` **NEW** (was «El proyecto») | La respuesta | The response |
| `projectPages.love-packaging.closing` (2 ¶) | ¶1 Reduje el lenguaje gráfico a lo esencial: fondo blanco, una línea fina en dorado y corazones que se repiten. El amor, en todas sus formas, pasa a ser el hilo que lo une todo, para que el mensaje se entienda a primera vista. ¶2 La caja, la taza y el resto de aplicaciones comparten esa misma línea, así que funcionan solas y también juntas: la caja guarda la taza y el conjunto se entiende como un regalo. Cada pieza amplía el mismo mundo en lugar de añadir uno nuevo. | ¶1 I pared the graphic language back to the essentials: a white base, a fine gold line and repeated hearts. Love, in all its forms, becomes the thread that ties everything together, so the message reads at first glance. ¶2 The box, the mug and the other applications share that same line, so they work on their own and together: the box holds the mug and the set reads as a gift. Each piece extends the same world instead of adding a new one. |

---

## 8. Metamorfosis (`/projects/metamorfosis`)

### 8.1 Structure (final)

```
Opening + Meta                                                      (unchanged)
Intro «Concepto»                       text-section, full           (unchanged text)
Opening photo  IMG_2135  full width, ratio 1.5, plain .gallery-item (unchanged)
01 · Conceptualización                 text-section, stage-first     text only
02 · Selección de material             text-section, stage
   Row      [Material 1 0.563] [Material 2 0.75]
03 · Composición y diseño              text-section, stage
   Row      [Collage 0.75] [Collage y libro 0.667]
04 · Ilustración y proceso             text-section, stage-label     label only
   Row      [Ilustración 1 + video 1  1.333] [Ilustración 4 + video 4  0.787]
   Row      [Ilustración 2 + video 2  1.333] [Ilustración 3  1.333]
   Row (indented)  [Ilustración del libro + video 3, width 70%]
05 · Maquetación                       text-section, stage
   Full     Doble página collage       1.5
   Full     Doble página ilustración   1.5
06 · Impresión y acabados              text-section, stage
   Row      [Portada 0.67] [Libro junto al collage 1.5]
07 · Sesión de fotos                   text-section, stage-label     label only
   Row (indented)  [Libro, collage y cámara 0.667] [Libro y cámara 0.563]
08 · Presentación del TFG              suit photo + text + link      §8.10
Next project
```

Every image from 02 to 07 is a single `CompositionCarousel` (clickable, fullscreen) in a `.gallery-cell`, `fit="cover"`,
`frameRatio` = the value above, `label="Metamorfosis"`. **No series carousels on this page.**
Each stage's images sit in a column wrapper: `max-width: 1760px`, gap = `--gutter` (stage 04 on Phone: 40px between rows).
Rows are side by side on Desktop / Laptop / Tablet and stacked on Phone (gap 16px; stage 04 rows: 40px).

**REMOVED from the page:** the «Pieza» block («Libro impreso, con texto e ilustración originales.»), the «El
proyecto» closing text, every carousel (illustrations, pages), the per-image captions of the old process steps
(«01 · Material», «02 · Pruebas»…), and the separate full-width rows of the old gallery.

### 8.2 Stage copy

| Key **NEW** | ES | EN |
|---|---|---|
| `projectPages.metamorfosis.stages[0].label` | 01 · Conceptualización | 01 · Conceptualisation |
| `projectPages.metamorfosis.stages[0].text` | La historia sigue las fases del duelo, del enfado a la aceptación, y termina con una mariposa. Quería que ese cambio se viera, además de leerse, y de ahí nace su lenguaje visual: collage e ilustración. | The story follows the stages of grief, from anger to acceptance, and ends with a butterfly. I wanted that change to be seen as well as read, and that's where its visual language comes from: collage and illustration. |
| `stages[1].label` | 02 · Selección de material | 02 · Material selection |
| `stages[1].text` | El collage empieza con material físico: papel antiguo, postales, fotografías en blanco y negro y flores secas. Sobre la mesa fui probando qué texturas e imágenes tenían el tono de la historia. | The collage starts with physical material: old paper, postcards, black and white photographs and dried flowers. On the table, I tried out which textures and images carried the tone of the story. |
| `stages[2].label` | 03 · Composición y diseño | 03 · Composition and design |
| `stages[2].text` | Después vino la composición: recortar, superponer y dejar que imagen, texto y flor convivan en una misma pieza. Ese mismo lenguaje llega a la portada. | Then came composition: cutting, layering and letting image, text and flowers share a single piece. That same language reaches the cover. |
| `stages[3].label` | 04 · Ilustración y proceso | 04 · Illustration and process |
| `stages[3].text` | *(none)* | *(none)* |
| `stages[4].label` | 05 · Maquetación | 05 · Layout |
| `stages[4].text` | Todo se unió en Adobe InDesign: ilustración, collage, texto y tipografía, página a página. | Everything came together in Adobe InDesign: illustration, collage, text and type, page by page. |
| `stages[5].label` | 06 · Impresión y acabados | 06 · Printing and finishes |
| `stages[5].text` | Al final, todo pasa al papel. El libro impreso reúne el collage, la ilustración y el texto en un mismo objeto. | In the end, everything moves onto paper. The printed book brings collage, illustration and text together in a single object. |
| `stages[6].label` | 07 · Sesión de fotos | 07 · Photoshoot |
| `stages[6].text` | *(none)* | *(none)* |
| `stages[7].label` | 08 · Presentación del TFG | 08 · Final degree project presentation |

**REMOVED keys:** `projectPages.metamorfosis.closing` («La historia sigue las fases del duelo…», its content is now
stage 01), `projectPages.metamorfosis.piece.*`.

### 8.3 Stage 02 · Selección de material

| Item | Local file | Framer file | Ratio | Alt ES / EN |
|---|---|---|---|---|
| Material 1 | `PortfolioTony/Collage/Metamorfosis1.JPG` | `XgTHG09Q7vRHSXwsQP9oC7C9bBI.jpg` | 0.563 | Papel antiguo, postales y una fotografía de flores / Old paper, postcards and a photograph of flowers |
| Material 2 | `PortfolioTony/Collage/Metamorfosis4.JPG` | `Qu5btnP9ekSQiWJ7xt8QskrsPs.jpg` | 0.75 | Recortes y fotografías sobre la mesa de trabajo / Cut-outs and photographs on the work table |

### 8.4 Stage 03 · Composición y diseño

| Item | Local file | Framer file | Ratio | Alt ES / EN |
|---|---|---|---|---|
| Collage | `PortfolioTony/Collage/Metamorfosis2.JPG` | `LWxpMTPiSd7OCShJgEHjlfGtscs.jpg` | 0.75 | Collage con flores secas, texto y fotografía / Collage with dried flowers, text and a photograph |
| Collage y libro | `Proyectos/Metamorfosis/IMG_2120.JPG` | `2hStAfCUUB55JYdClBmldgdXo.jpg` | 0.667 | El collage junto al libro Metamorfosis / The collage beside the Metamorfosis book |

### 8.5 Stage 04 · Ilustración y proceso

Each item is a `CompositionCarousel` with **`videoMode="reveal"`** (§3.1): the illustration shows first; «▶ Ver proceso»
underneath fades in its process video. The video matches each illustration (checked frame by frame):

| Row / position | Final image (local → Framer) | Process video | `frameRatio` / `--ratio` | Alt ES / EN |
|---|---|---|---|---|
| 1, left | `Ilustración 1.jpg` → `KR2iy8CqxgRO7ZC1TaWZRvlHFI.jpg` | `metamorfosis-proceso-1.mp4` (from `Ilustracion1.mov`) | 1.333 | Ilustración de Metamorfosis / Metamorfosis illustration |
| 1, right | `Ilustración 4.jpg` → `kPJwota0nhq7HbqWXRwdfg3jw.jpg` | `metamorfosis-proceso-4.mp4` (from `Ilustraciom4.mov`) | 0.787 | same |
| 2, left | `Ilustración 2.jpg` → `RNtdjjzZXo9sqLw3HFdh5oYiOg.jpg` | `metamorfosis-proceso-2.mp4` (from `Ilustracion2.mov`) | 1.333 | same |
| 2, right | `Ilustración 3.jpg` → `nflXT5XwLQj1KmHeNl37oXOwz2E.jpg` | **none** (no process video exists): plain single image, no reveal button | 1.333 | same |
| 3 (indented, width 70%, 100% on Phone) | `IMG_2126.JPG` → `2md1GsJwLij99b5KwUH5Wc2blxo.jpg` | `metamorfosis-proceso-3.mp4` (from `Ilustracion3.mov`) | 1.5 | Páginas de Metamorfosis con la ilustración del chico de la chaqueta / Metamorfosis pages with the illustration of the boy in the jacket |

> `Ilustracion3.mov` draws the **boy in the jacket with a red scribbled flower**, not `Ilustración 3.jpg` (the boy
> in the water). That illustration has no standalone file; its finished version only exists printed, in
> `IMG_2126.JPG`. Do not pair video 3 with `Ilustración 3.jpg`.

Props for the 4 video items: `video`, `videoMode="reveal"`, `videoLabel={t("…videoLabel")}`,
`revealLabel={t("carousel.revealProcess")}`, `hideLabel={t("carousel.hideProcess")}`, `fit="cover"`, and `label` from:

| Key **NEW** | ES | EN |
|---|---|---|
| `projectPages.metamorfosis.illustrations[0].label` | Ilustración 1 y su proceso | Illustration 1 and its process |
| `…illustrations[1].label` (Ilustración 2) | Ilustración 2 y su proceso | Illustration 2 and its process |
| `…illustrations[2].label` (book) | Ilustración del libro y su proceso | Book illustration and its process |
| `…illustrations[3].label` (Ilustración 4) | Ilustración 4 y su proceso | Illustration 4 and its process |
| `projectPages.metamorfosis.videoLabel` | Proceso de la ilustración | Illustration process |

### 8.6 Stage 05 · Maquetación (Adobe InDesign)

Two full-width singles, one under the other (gap = `--gutter`; 16px on Phone).

| Item | Local file | Framer file | Ratio | Alt ES / EN |
|---|---|---|---|---|
| Doble página collage | `IMG_2133.JPG` | `5TziU31WGmAlkoQCrbwqHqu1bqU.jpg` | 1.5 | Doble página de Metamorfosis con collage / Metamorfosis spread with collage |
| Doble página ilustración | `IMG_2132.JPG` | `koqjDkPKCAKTcjeMeVUVKmykn5s.jpg` | 1.5 | Doble página de Metamorfosis con ilustración / Metamorfosis spread with illustration |

### 8.7 Stage 06 · Impresión y acabados

| Item | Local file | Framer file | Ratio | Alt ES / EN |
|---|---|---|---|---|
| Portada | `IMG_2092.JPG` (Framer file matches it visually) | `WdRQZeqjlvmd1NDkBeKn6lCIeI8.jpg` | 0.67 | Portada del libro Metamorfosis / Cover of the Metamorfosis book |
| Libro junto al collage | `IMG_2137.JPG` | `973ySNhlmY7CFwLJgti5w0Ns.jpg` | 1.5 | El libro Metamorfosis junto a su collage / The Metamorfosis book beside its collage |

### 8.8 Stage 07 · Sesión de fotos (row indented)

| Item | Local file | Framer file | Ratio | Alt ES / EN |
|---|---|---|---|---|
| Libro, collage y cámara | `IMG_2121.JPG` | `0wHEDsMwkdARuPvJwn6EopYEjs.jpg` | 0.667 | El libro Metamorfosis con el collage, una cámara y fotografías / The Metamorfosis book with the collage, a camera and photographs |
| Libro y cámara | `PortfolioTony/Collage/Metamorfosis3.JPG` | `lPKnyBf881FOJcUrtev6EGOxw8.jpg` | 0.563 | El libro Metamorfosis con una cámara y flores prensadas / The Metamorfosis book with a camera and pressed flowers |

Row gap = `--gutter`; indented (§2.4); stacked at 100% on Phone.

### 8.9 Assets not used on purpose

`IMG_2117.JPG` and `IMG_2136.JPG` (near-duplicates of `IMG_2092` / `IMG_2137` and `IMG_2135`).
Every image that was on the page before is still on it, each exactly once.

### 8.10 Stage 08 · Presentación del TFG (last section of the page)

Row, `align-items: flex-end`, gap = `--gutter`, `max-width: 1760px`, padding = preset `full` (110 / 97 / 79 / 55 top and bottom).
Fades in like the other sections.

- **Image** (left): `PortfolioTony/Collage/Metamorfosis5.JPG` → Framer `ZGekIjYLvqkDUhfiwF2jGYVfX54.jpg`, ratio 0.75,
  `object-fit: cover`, width **560 / 480 / 360px** (Desktop / Laptop / Tablet), 100% on Phone. The whole image is a
  link to the video (new tab, `rel="noopener"`). Hover: scale 1.02 over 0.8s, clipped by the frame. Alt:
  «El libro Metamorfosis sobre un traje claro» / «The Metamorfosis book on a light-coloured suit». No `aria-label` on the link: its name
  comes from the translated alt.
- **Text column** (right): `flex: 1`, gap 16px, padding-bottom 26 / 23 / 19 / 0px. Label, one sentence in
  `Editorial Note` (`max-width: 560px`), link in `Label` style.
- **Phone:** column, `align-items: flex-start`, gap 20px, image first.

**Video URL (opens at 2:58:16 = 10696 s):** `https://www.youtube.com/watch?v=5TKR03lWfs8&t=10696s`

| Key **NEW** | ES | EN |
|---|---|---|
| `projectPages.metamorfosis.tfg.label` | 08 · Presentación del TFG | 08 · Final degree project presentation |
| `projectPages.metamorfosis.tfg.text` | La defensa del TFG fue el cierre de Metamorfosis: el momento de presentar el proyecto entero, del collage y las ilustraciones al libro impreso. | The final project defence was where Metamorfosis came to a close: the moment to present the whole project, from the collage and illustrations to the printed book. |
| `projectPages.metamorfosis.tfg.link` | ↗ Ver la defensa | ↗ Watch the defence |
| `projectPages.metamorfosis.tfg.alt` | El libro Metamorfosis sobre un traje claro | The Metamorfosis book on a light-coloured suit |

```tsx
<section className="tfg">
  <a className="tfg__image" href="https://www.youtube.com/watch?v=5TKR03lWfs8&t=10696s" target="_blank" rel="noopener">
    <img src="/assets/metamorfosis/metamorfosis-traje.jpg" alt={t("projectPages.metamorfosis.tfg.alt")} />
  </a>
  <div className="tfg__text">
    <p className="label">{t("projectPages.metamorfosis.tfg.label")}</p>
    <p className="editorial-note">{t("projectPages.metamorfosis.tfg.text")}</p>
    <a className="label" href="https://www.youtube.com/watch?v=5TKR03lWfs8&t=10696s" target="_blank" rel="noopener">
      {t("projectPages.metamorfosis.tfg.link")}
    </a>
  </div>
</section>
```

```css
.tfg { display: flex; align-items: flex-end; gap: var(--gutter); width: 100%; max-width: 1760px; padding: 110px 0; }
.tfg__image { flex: 0 0 560px; aspect-ratio: 0.75; overflow: clip; display: block; }
.tfg__image img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1); }
@media (hover: hover) { .tfg__image:hover img { transform: scale(1.02); } }
.tfg__text { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 16px; padding-bottom: 26px; }
.tfg__text .editorial-note { max-width: 560px; }
@media (min-width: 1024px) and (max-width: 1199.98px) { .tfg { padding: 97px 0; } .tfg__image { flex-basis: 480px; } .tfg__text { padding-bottom: 23px; } }
@media (min-width: 810px) and (max-width: 1023.98px)  { .tfg { padding: 79px 0; } .tfg__image { flex-basis: 360px; } .tfg__text { padding-bottom: 19px; } }
@media (max-width: 809.98px) {
  .tfg { flex-direction: column; align-items: flex-start; gap: 20px; padding: 55px 0; }
  .tfg__image { flex: none; width: 100%; }
  .tfg__text { padding-bottom: 0; }
}
```

---

## 9. About (`/about`)

### 9.1 Equipment accordion (replaces `nuevoscambiosPortfolio2.md` §3.7)

```json
"equipment": {
  "groups": [
    { "label": { "es": "Cámara",    "en": "Camera" }, "items": [{ "es": "Canon 6D Mark", "en": "Canon 6D Mark" }] },
    { "label": { "es": "Objetivos", "en": "Lenses" }, "items": [{ "es": "Objetivo de 30 mm", "en": "30 mm lens" }, { "es": "Objetivo de 50 mm", "en": "50 mm lens" }] }
  ]
}
```

**REMOVED:** «Cámara réflex Canon / Canon DSLR camera», «Otros objetivos / Other lenses». «Canon 6D Mark» is written
exactly as the owner gave it (to be confirmed, §12).

### 9.2 Education accordion (final, in this exact order)

Two groups. Group 1 (normal style, `itemGap: 26`) = formal education. Group 2 = **`compact: true`** (§4) with label.
Each item is `text` + `note` (note = small muted line underneath).

| # | Group | `text` ES | `note` ES | `text` EN | `note` EN |
|---|---|---|---|---|---|
| 1 | formal | Grado en Bellas Artes | Universidad Complutense de Madrid | Degree in Fine Arts | Complutense University of Madrid |
| 2 | formal | Accademia di Belle Arti di Napoli | Programa Erasmus, Nápoles, Italia | Accademia di Belle Arti di Napoli | Erasmus Programme, Naples, Italy |
| 3 | formal | Escuela Mateo y Nuria | Grado en Diseño Gráfico | Escuela Mateo y Nuria | Degree in Graphic Design |
| 4 | formal | Curso de Dirección de Arte en Publicidad | CEI Escuela de Diseño y Marketing, Madrid | Course in Advertising Art Direction | CEI School of Design and Marketing, Madrid |
| 5 | compact | Taller de escritura creativa | Alejandra G. Remón | Creative writing workshop | Alejandra G. Remón |
| 6 | compact | Taller de collage | Alejandra G. Remón | Collage workshop | Alejandra G. Remón |
| 7 | compact | Taller de postales navideñas | Alejandra G. Remón | Christmas postcard workshop | Alejandra G. Remón |
| 8 | compact | Curso de fotografía móvil | Noah Farrell | Mobile photography course | Noah Farrell |

| Key **NEW** | ES | EN |
|---|---|---|
| `about.education.complementaryLabel` (label of group 2) | Talleres y cursos | Workshops and courses |

**REMOVED from About:** «Grado en Diseño Gráfico + Especialización en Marketing · ESADA, Granada». It is **still on
the CV page** (the CV was not changed). The instructor's name is **Noah** Farrell (never «Noa»).

```tsx
{ title: t("sections.education"), itemGap: 26, groups: [
    { items: educationFormal.map((e) => ({ text: e.text, note: e.note })) },                       // rows 1–4
    { label: t("about.education.complementaryLabel"), compact: true,
      items: educationComplementary.map((e) => ({ text: e.text, note: e.note })) },             // rows 5–8
] }
```

---

## 10. Assets

### 10.1 Already on the site before (no action)

Every Framer file not listed in §10.2 / §10.3 was already in `nuevoscambiosPortfolio2.md`. Download them from
`https://framerusercontent.com/images/<file>` if the repo does not have them yet.

### 10.2 Photos added in this session

Ready, orientation-corrected copies are in `nuevoscambiosPortfolio3-assets/images/`.

| Copy in `images/` | Original | Framer file | Used in |
|---|---|---|---|
| `tn-foto-2.jpg` | `Tony Nieve/Foto 2.jpeg` | `APNAt0sUU16YpzVbGnAB33rAmg.jpg` | Tony Nieve |
| `tn-foto-4.jpg` | `Tony Nieve/Foto 4.jpg` | `H3zuKL4fTdPY9xR5ivSIH8mWlZI.jpg` | Tony Nieve |
| `tn-foto-5.jpg` | `Tony Nieve/Foto 5.jpg` | `X44QamilaNkOP9kzR5O07iM21O8.jpg` | Tony Nieve |
| `tn-foto-9.jpg` | `Tony Nieve/Foto 9.jpg` | `uKTp5OzJbra4BGjo1paYZjE0Ot0.jpg` | Tony Nieve |
| `tn-foto-10.jpg` | `Tony Nieve/Foto 10.jpg` | `hezb2bkM4FcaKe5FCigl2N0preY.jpg` | Tony Nieve |
| `tn-foto-11.jpg` | `Tony Nieve/Foto 11.jpg` | `OnNytthXoRw90CVnX0Zo5dVbBII.jpg` | Tony Nieve |
| `tn-foto-14.jpg` | `Tony Nieve/Foto 14.jpg` | `nRMGMHgCE6w1D5WUp3ZKrm1Gwk.jpg` | Tony Nieve |
| `tn-foto-16.jpg` | `Tony Nieve/Foto 16.jpg` | `LjH5rOTOn3HY8nTwSBZUXzwI.jpg` | Tony Nieve |
| `tn-foto-18.jpg` | `Tony Nieve/Foto 18.jpg` | `3zqsZfz4Gn6S81hLguVXnZh8.jpg` | Tony Nieve |
| `tn-foto-20.jpg` | `Tony Nieve/Foto 20.jpg` | `c6TpP4ZO3CpPPDgWtQgkUyda4.jpg` | Tony Nieve |
| `tn-foto-22.jpg` | `Tony Nieve/Foto 22.jpg` | `b7ECE1qbaBrTEFEB3AAJ7uPSWOM.jpg` | Tony Nieve |
| `tn-foto-23.jpg` | `Tony Nieve/Foto 23.jpg` | `4ub3S7fCXgBE5HHpWMeo3pBFh8.jpg` | Tony Nieve |
| `tn-foto-25.jpg` | `Tony Nieve/Foto 25.jpg` | `HHTYRXu1qOveocPlvu0V93MY910.jpg` | Tony Nieve |
| `metamorfosis-collage-1.jpg` | `Collage/Metamorfosis1.JPG` | `XgTHG09Q7vRHSXwsQP9oC7C9bBI.jpg` | Metamorfosis 02 |
| `metamorfosis-collage-2.jpg` | `Collage/Metamorfosis2.JPG` | `LWxpMTPiSd7OCShJgEHjlfGtscs.jpg` | Metamorfosis 03 |
| `metamorfosis-collage-3.jpg` | `Collage/Metamorfosis3.JPG` | `lPKnyBf881FOJcUrtev6EGOxw8.jpg` | Metamorfosis 07 |
| `metamorfosis-collage-4.jpg` | `Collage/Metamorfosis4.JPG` | `Qu5btnP9ekSQiWJ7xt8QskrsPs.jpg` | Metamorfosis 02 |
| `metamorfosis-collage-5.jpg` | `Collage/Metamorfosis5.JPG` | `ZGekIjYLvqkDUhfiwF2jGYVfX54.jpg` | Metamorfosis 08 (TFG) |
| `metamorfosis-IMG_2120.jpg` | `Metamorfosis/IMG_2120.JPG` (1600 × 2400) | `2hStAfCUUB55JYdClBmldgdXo.jpg` | Metamorfosis 03 |
| `metamorfosis-IMG_2121.jpg` | `Metamorfosis/IMG_2121.JPG` (1600 × 2400) | `0wHEDsMwkdARuPvJwn6EopYEjs.jpg` | Metamorfosis 07 |

### 10.3 Process videos (Metamorfosis 04)

Use the files in `nuevoscambiosPortfolio3-assets/videos/`, **not the original `.mov`** (`.mov` does not play reliably in
Chrome / Firefox, and videos 2–4 end with glitchy dark frames). All are H.264 MP4, no audio, `+faststart`, and each ends
with a **1.5s hold of its last good frame** so the loop does not jump straight back to the blank canvas.

| File | Source | Trim | Size | Framer asset |
|---|---|---|---|---|
| `metamorfosis-proceso-1.mp4` | `Ilustracion1.mov` | none | 1090 × 1456, 13.2s | `https://framerusercontent.com/assets/9qJWtu6vIfSjrzzfavF1dn88HHY.mp4` |
| `metamorfosis-proceso-2.mp4` | `Ilustracion2.mov` | first 21.69s | 1090 × 1456, 23.2s | `https://framerusercontent.com/assets/NbbeDobEEzZhy1mGw2wg6dRCQk.mp4` |
| `metamorfosis-proceso-3.mp4` | `Ilustracion3.mov` | first 13.66s | 1456 × 1090, 15.2s | `https://framerusercontent.com/assets/e6NkXub9PZ3ZmpazEBAxEk09LU.mp4` |
| `metamorfosis-proceso-4.mp4` | `Ilustraciom4.mov` (sic) | first 11.64s | 1090 × 1456, 13.2s | `https://framerusercontent.com/assets/2MdKMuIPDpQLzVEuPacfMdbL48.mp4` |

To regenerate them (ffmpeg rotates the portrait `.mov` files automatically):

```bash
M="Desktop/PortfolioTony/Proyectos/Metamorfosis"
enc() { ffmpeg -y $1 -i "$M/$2" -an -vf "tpad=stop_mode=clone:stop_duration=1.5,format=yuv420p" \
          -c:v libx264 -crf 21 -preset slow -movflags +faststart "$3"; }
enc ""          Ilustracion1.mov metamorfosis-proceso-1.mp4
enc "-t 21.69"  Ilustracion2.mov metamorfosis-proceso-2.mp4
enc "-t 13.66"  Ilustracion3.mov metamorfosis-proceso-3.mp4
enc "-t 11.64"  Ilustraciom4.mov metamorfosis-proceso-4.mp4
```

(`-t` must go **before** `-i`, so the hold is added after the trim.)

---

## 11. Fixes

| # | Where | Fix |
|---|---|---|
| 11.1 | All 4 project pages, closing text block | Had no responsive values (on Phone the 170px label squeezed the text). Now a normal text section (§2.2): Tablet label 114px, Laptop 145px, Phone stacked |
| 11.2 | About › Mentions, detail line of cards #1 (LOOC) and #3 (Shangay), EN | English value was «Mercado Navarrete · Eduardo Navarrete⏎Photography credited to Tony Photographer». Now **«Mercado Navarrete · Eduardo Navarrete»** (same as ES) |
| 11.3 | Love, box photo alt | «Pieza / Piece» → «Caja de Love Packaging / Love Packaging box» |
| 11.4 | Lightbox and carousel button labels | Must always come from the dictionary (§3.2); the English site must never show «Cerrar» / «Ampliar imagen» |

---

## 12. Search list (old values to remove from the repo)

| Search for | Where | Action |
|---|---|---|
| `Concepto` as the label of Tony Nieve / Matchaflix intros | project pages | Tony Nieve «Enfoque», Matchaflix «El reto» (Metamorfosis and Love keep «Concepto») |
| `El proyecto` (closing label) | 4 project pages | Tony Nieve «Composiciones», Matchaflix / Love «La respuesta», Metamorfosis: removed |
| `Proyecto personal de fotografía desarrollado` | Tony Nieve | new intro §5.2 |
| `Estas imágenes tienen algo de cuento de hadas` | Tony Nieve | removed |
| `Con esta propuesta llevé la marca` | Matchaflix | §6.3 |
| `Mantuve el tono cercano` | Love | §7.3 |
| `Caja, taza y aplicaciones gráficas`, `Pieza` | Love, Metamorfosis | removed |
| `Libro impreso, con texto e ilustración originales` | Metamorfosis | removed |
| `Rebranding conceptual para una marca de matcha. La esencia del producto se queda` | Matchaflix | §6.3 |
| `Cámara réflex Canon`, `Otros objetivos` | About | §9.1 |
| `ESADA` | About (only) | removed from About, keep on CV |
| `Noa Farrell` | anywhere | `Noah Farrell` |
| `Retrato` / `Portrait` as alt of Tony Nieve photos | Tony Nieve | §5.4 alts |
| old `CompositionCarousel` (§8.3 of spec 2) | components | replace with §3.3 |

---

## 13. Verification checklist

Check every changed page in `/…` and `/en/…` at 1440, 1200, 1100, 1024, 900, 810, 600 and 390px.

- [ ] No `—` / `–` in visible text, titles or alts. «Tony» always with a Y.
- [ ] Tony Nieve: 25 different photos + reel + 8 compositions. 4 pauses, indented on Desktop / Laptop / Tablet.
      Series: studio (5), palace (2, contain), pearls (2), daisies (2), freckles (2), bathtub (3).
- [ ] Every Tony Nieve photo opens fullscreen. Series can be browsed in the fullscreen view (arrows, swipe, ← / →). Esc closes.
- [ ] In a row, all frames start at the same top and have the same height (±1px).
- [ ] Matchaflix: texture carousel (3) between «El reto» and «La respuesta». No textures left in the gallery.
- [ ] Love: no «Pieza» anywhere. «El reto» next to the box photo, «La respuesta» at the end.
- [ ] Metamorfosis: labels 01 → 08 in this order. No carousels (no dots or arrows) anywhere on the page.
- [ ] Metamorfosis 04: 4 «Ver proceso» buttons (not under Ilustración 3). Each fades into the right video
      (1 ↔ Ilustración 1, 2 ↔ Ilustración 2, 3 ↔ the book spread with the boy in the jacket, 4 ↔ Ilustración 4).
      The video plays muted and loops; «Ver ilustración» fades back and pauses it. Works on iOS (`playsinline`).
- [ ] Metamorfosis 08: image and «↗ Ver la defensa» open YouTube in a new tab at **2:58:16**.
- [ ] About: Equipment = Canon 6D Mark / 30 mm / 50 mm. Education order 1–8 as §9.2, with the complementary group smaller.
      No ESADA on About. «Noah Farrell».
- [ ] English site: all labels translated (including «( Close )», «View larger», «View process»).
- [ ] No horizontal scroll at any width.

---

## 14. Pending (owner decisions)

| # | Item |
|---|---|
| 14.1 | **Publish** the Framer project (this also publishes everything in `nuevoscambiosPortfolio2.md`). |
| 14.2 | «**Escuela Mateo y Nuria**» is written exactly as given. Possibly the *Escuela de Arte Mateo Inurria* (Córdoba). Confirm before publishing. |
| 14.3 | «**Canon 6D Mark**» as given. Possibly «Canon EOS 6D Mark II». Confirm. |
| 14.4 | **ESADA** was removed from About but is still on the CV, and the TFG video is ESADA's defence stream. Confirm whether the CV should match. |
| 14.5 | The new Education entries put the school first («Accademia…», «Escuela Mateo y Nuria») as the owner wrote them; the others put the degree first. |
| 14.6 | Still open from earlier specs: Tony Nieve «desde 2017» (now not mentioned on the project page), slug `/projects/matchflix`. |

---

*Generated on 03/10/2026 from the live state of Framer project `4pRs8QyCSry0wVCAGf6n` (unpublished). Text read
from Framer Localization (ES source + EN). Video/illustration pairs verified frame by frame.*
