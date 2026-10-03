# Portfolio — Tony Arroyo

**Change log & implementation spec — 24/09/2026**

Continuación de `Portfolio_Tony_23-09-2026.md`. Fuente de verdad: proyecto Framer `4pRs8QyCSry0wVCAGf6n`.
Producción: **https://shaggy-snow-332401.framer.app** (versión publicada `00e514d4b`).

> **Léelo primero.** No tengo acceso al repositorio de GitHub, así que esto es una *especificación*,
> no un diff contra tus ficheros. Todos los valores de abajo se extrajeron programáticamente del
> estado vivo del proyecto al cierre de la sesión, no de memoria. Mapéalos sobre tus propios nombres
> de componente y tu estructura de ficheros.
>
> **Este documento asume que el repo ya está al día con la spec del 23/09.** Si no lo está, aplica
> aquella primero: lo de aquí son cambios *sobre* aquel estado.

Nota sobre el nombre del fichero: pediste `Portfolio_Tony_24/09/2026.md`, pero `/` es separador de
rutas y no puede formar parte de un nombre de fichero. Por eso es `Portfolio_Tony_24-09-2026.md`,
igual que el del día 23, y está en `Versiones/` junto al anterior.

---

## 1. Qué cambió, en una pantalla

| # | Área | Cambio | Tipo |
|---|---|---|---|
| 1 | Nomenclatura | «Toni» → **«Tony»** en todo el sitio, cuerpo de texto incluido. | Contenido |
| 2 | Metadatos | El título/descripción **por defecto del sitio** seguía diciendo «Toni». Corregido. | Bug |
| 3 | Estilos de texto | 32 nodos habían perdido su preset y renderizaban en Inter 16px negro. Restaurados. | **Bug crítico** |
| 4 | Navegación | Los 8 enlaces del menú y el «Contacto» del pie **no tenían `href`**. Restaurados. | **Bug crítico** |
| 5 | Home | Sección de proyectos rehecha como grid 2×2 según referencia. | Estructura |
| 6 | Proyectos | Nombres corregidos: `Matchflix` → **`Matchaflix`**, `Love Packaging` → **`Love`**. | Contenido |
| 7 | Proyectos | Contenido reescrito y arquitectura de las 4 páginas unificada. | Contenido |
| 8 | Proyectos | Matchaflix tenía la galería antes del texto. Reordenado. | Estructura |
| 9 | Despliegue | El sitio llevaba **sin publicar desde antes del rediseño del 23**. Publicado. | Despliegue |

Los puntos **3, 4 y 9** son la causa de que el sitio pareciera roto. Detalle en §9.

---

## 2. Nomenclatura: «Tony», no «Toni»

Decisión cerrada: **`Tony`** en todas partes — marca, titulares, cuerpo de texto y metadatos.

| Dónde | Antes | Ahora |
|---|---|---|
| Wordmark (cabecera) | `Toni Arroyo` | `Tony Arroyo` |
| Titular de About (`h1`) | `Toni ` + `*Arroyo*` | `Tony ` + `*Arroyo*` |
| Cuerpo de About, §1 | `Soy Toni, director de arte…` | `Soy Tony, director de arte…` |
| Identidad del pie | `Toni Arroyo — Director de arte…` | `Tony Arroyo — Director de arte…` |
| Título por defecto del sitio | `Toni Arroyo — Portfolio` | `Tony Arroyo — Portfolio` |
| Descripción por defecto | `Portfolio de Toni Arroyo…` | `Portfolio de Tony Arroyo…` |

**Excepción que no se toca:** el handle de Instagram es **`@toninieve`**. Es la cuenta real, no una
grafía del nombre. Cualquier find-and-replace de `Toni` → `Tony` en el repo debe excluirlo, igual que
el nombre del proyecto **`Tony Nieve`**, que ya era correcto.

### Titular de About — composición

No es un texto plano: son **dos runs**, el segundo en cursiva.

```html
<h1 class="display">Tony <em>Arroyo</em></h1>
```

Ojo al espacio en cola del primer run (`"Tony "`). Si se normaliza, las dos palabras se pegan.

---

## 3. Metadatos

El `<title>` que realmente se sirve en **todas** las páginas sale del **default a nivel de sitio**,
no de los overrides por página. Es el que estaba mal.

```js
// Default del sitio (aplica a toda página sin override propio, la Home incluida)
title:       "Tony Arroyo — Portfolio"
description: "Portfolio de Tony Arroyo, director de arte y diseñador gráfico en Madrid. Dirección de arte, fotografía, identidad, editorial y packaging."
```

Overrides por página al cierre de la sesión:

| Ruta | `title` | `description` |
|---|---|---|
| `/` | *(sin override — usa el default)* | *(sin override)* |
| `/projects` | `Proyectos — Tony Arroyo` | `Proyectos seleccionados de Tony Arroyo: identidad, editorial, packaging y dirección de arte.` |
| `/about` | `About — Tony Arroyo` | `Tony Arroyo, diseñador gráfico. Sobre mí, servicios, experiencia y formación.` |
| `/contact` | `Contact — Tony Arroyo` | `Contacto de Tony Arroyo, diseñador gráfico.` |
| `/projects/tony-nieve` | `Tony Nieve — Tony Arroyo` | `Tony Nieve. Proyecto fotográfico y de dirección de arte de Tony Arroyo.` |
| `/projects/matchflix` | `Matchaflix — Tony Arroyo` | `Matchaflix. Rebranding conceptual de una marca de matcha hacia el lujo silencioso.` |
| `/projects/metamorfosis` | `Metamorfosis — Tony Arroyo` | `Metamorfosis, el inicio del cambio. Proyecto editorial e ilustración.` |
| `/projects/love-packaging` | `Love — Tony Arroyo` | `Love. Proyecto conceptual de branding y packaging sobre el amor en todas sus formas.` |
| `/cv` | `CV — Tony Arroyo` | `Currículum de Tony Arroyo, diseñador gráfico y director de arte.` |

> `/projects` y `/about` siguen con títulos en inglés (`Proyectos`, `About`, `Contact`) mientras que
> el contenido es español. Es incoherente pero se dejó como estaba: no formaba parte del encargo.
> Ver §10.

---

## 4. Bug: estilos de texto perdidos

**32 nodos** habían perdido su preset de estilo y renderizaban en `Inter 16px #000`. En un repo de
código esto se traduce en: **estos elementos habían perdido su clase / su componente de tipografía**.

| Ámbito | Elementos | Preset que les corresponde |
|---|---|---|
| Navegación | Wordmark | `Wordmark` |
| Navegación | Proyectos · Sobre mí · Contacto (barra) | `Nav` |
| Navegación | Inicio · Proyectos · Sobre mí · Contacto (cajón móvil) | `Display Small` |
| Pie | Identidad | `Label Muted` |
| Pie | Contacto | `Label Muted` |

Por cada uno hay 3 variantes de componente (Desktop / Phone / Phone Open) o 4 breakpoints en el pie;
de ahí los 32.

**Causa raíz, y esto importa para el repo:** en Framer, escribir la propiedad `text` de un nodo de
texto enriquecido **borra en silencio su preset**. Es el mismo fallo ya documentado en §12 de la spec
del 23/09, que reapareció. En un repo con CSS esto no ocurre, pero el síntoma sí es reproducible si
alguien sustituye un componente tipográfico por un `<p>` pelado. **Comprueba que estos 9 elementos
lógicos llevan su clase correcta.**

**Falsos positivos — deben seguir SIN preset:**

- Los 4 nodos `Statement` («Hablemos» en `/contact`): usan tamaño `auto-fit`, no una clase de la escala.
- El componente `Menu` antiguo y sin usar (ver §10).

---

## 5. Bug: la navegación no tenía `href`

Los enlaces del menú tenían `cursor: pointer` y su clase de enlace aplicada, así que **parecían**
clicables y cambiaban de color al hover, pero **no llevaban destino**. En HTML equivale a:

```html
<!-- ROTO: lo que había -->
<span class="nav-link">Proyectos</span>

<!-- CORRECTO: lo que debe haber -->
<a href="/projects" class="nav-link">Proyectos</a>
```

Mapa completo de enlaces, ya corregido:

| Elemento | Destino | Clase de enlace |
|---|---|---|
| Wordmark `Tony Arroyo` | `/` | `Project Link` |
| `Proyectos` (barra) | `/projects` | `Nav Link` |
| `Sobre mí` (barra) | `/about` | `Nav Link` |
| `Contacto` (barra) | `/contact` | `Nav Link` |
| `Inicio` (cajón) | `/` | `Project Link` |
| `Proyectos` (cajón) | `/projects` | `Project Link` |
| `Sobre mí` (cajón) | `/about` | `Project Link` |
| `Contacto` (cajón) | `/contact` | `Project Link` |
| `Contacto` (pie) | `/contact` | `Nav Link` |

**`( Menu )` / `( Close )` no lleva `href` a propósito**: es el toggle del cajón, no un enlace.

### Cómo auditar esto en el repo sin equivocarse

Es fácil dar un falso «todo bien», y de hecho pasó en esta sesión. Dos trampas:

1. **No deduplicar por `href`.** El componente `Menu` antiguo (§10) sí tiene `/projects`, `/about` y
   `/contact`. Si agrupas por destino, esas tres entradas parecen cubiertas y los enlaces vacíos de
   la navegación real quedan ocultos. Recorre **nodo a nodo**.
2. **Criterio correcto:** buscar todo lo que *parezca* clicable (`cursor: pointer` o clase de enlace)
   y **no** tenga `href`.

**Falsos positivos legítimos** — estos envoltorios no llevan enlace porque el enlace va en sus hijos,
que es el patrón deliberado del proyecto (§6 de la spec del 23/09: el nombre y la imagen se enlazan
por separado para no anidar un `<a>` dentro de otro `<a>`):

- Los envoltorios de celda de proyecto y los frames `Fill` de imagen.
- Los bloques «Siguiente proyecto» (el enlace está en el nombre).
- El componente `Language`, que cambia de estado en vez de navegar.

---

## 6. Home — sección de proyectos rehecha

Sustituye por completo a §9 «Home — work sequence» de la spec del 23/09. La composición
art-dirigida de 3 bloques (uno a ancho completo, un par con desfase de 150px y un bloque de tipografía
grande junto a imagen vertical) **desaparece** y se convierte en un grid regular 2×2.

> Esto revoca deliberadamente la decisión previa de «evitar tratamiento uniforme tipo card» **sólo en
> la Home**. Las páginas de proyecto conservan su art direction.

### Medidas, tomadas de la referencia

La referencia (`Referencias/Proyectos 2.png`, 1258×575) se midió en píxeles:

| Elemento | Medida en la referencia |
|---|---|
| Columnas | 613 px y 614 px |
| Gutter de columna | 13 px |
| Ratio de imagen | 613 / 409 = **1.4988 ≈ 3:2** |
| Fila meta → imagen | 8 px |
| Imagen → meta siguiente | 22 px |
| Filetes | **ninguno** |

### Implementación

```
Work (section)
└── grid, 2 columnas, 4 celdas en orden 01 · 02 / 03 · 04
    └── Celda (stack vertical, gap 8px, width 100%)
        ├── Meta   (stack horizontal, space-between, align center, width 100%)
        │   ├── Name    [Label]        ← enlace al proyecto
        │   └── Number  [Label Muted]  ← enlace al proyecto
        └── Image  (width 100%, aspect-ratio 3/2, overflow hidden)  ← enlace al proyecto
            └── Fill   (background-image, cover)
```

| Breakpoint | Ancho contenido | Columnas | `gap` (fila / columna) | Ancho celda | Alto imagen |
|---|---|---|---|---|---|
| Desktop ≥1200 | 1148 | 2 | 20 / 12 | 568 | 379 |
| Laptop 1024–1199 | 976 | 2 | 20 / 12 | 482 | 321 |
| Tablet 810–1023 | 770 | 2 | 18 / 12 | 379 | 253 |
| Phone <810 | 358 | **1** | 26 | 358 | 239 |

`padding-top` de la sección: 54 / 48 / 39 / 27 (la escala ×0.88 / ×0.72 / ×0.5 de la spec anterior).

En CSS el alto explícito no hace falta; basta `aspect-ratio: 3 / 2`. Los valores de la tabla están
porque Framer **exige** `height` explícito junto a `aspectRatio` o descarta la propiedad.

```css
.work {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px 12px;
  padding-top: 54px;
}
.work__image { width: 100%; aspect-ratio: 3 / 2; overflow: hidden; }
.work__image img { width: 100%; height: 100%; object-fit: cover; }

@media (max-width: 1023.98px) { .work { gap: 18px 12px; padding-top: 39px; } }
@media (max-width: 809.98px)  { .work { grid-template-columns: 1fr; gap: 26px; padding-top: 27px; } }
```

### Imágenes

Las 4 portadas se muestran en el **mismo marco 3:2** con `object-fit: cover`:

| Celda | Clave | Ratio nativo | Encaje |
|---|---|---|---|
| 01 Tony Nieve | `tn-cover` | 1.5042 | nativo |
| 02 Matchaflix | `mf-cover` | 1.3333 | recorte leve |
| 03 Metamorfosis | `mt-cover` | 1.4997 | nativo |
| 04 Love | `lp-cover` | **0.6668 (vertical)** | **recorte fuerte** |

`lp-cover` es vertical y pierde bastante al encajar en 3:2. Se revisó visualmente y el producto queda
centrado y limpio. **Todas** las imágenes de Love son verticales, así que no hay alternativa apaisada;
si en el repo prefieres otro encuadre, ajusta `object-position`.

### Enlaces e interacción — sin cambios

Nombre, número e imagen se enlazan **por separado** (no el envoltorio). Se conservan el hover
`scale 1.02` sobre la imagen recortada por el marco y la animación de aparición de cada celda.

---

## 7. Páginas de proyecto

### 7.1 Nombres

| Antes | Ahora |
|---|---|
| `Matchflix` / `Matchflix — Rebranding` | **`Matchaflix`** |
| `Love Packaging` | **`Love`** |
| `Tony Nieve` | sin cambios |
| `Metamorfosis` | sin cambios |

Propagado a: título de la página, Home, índice `/projects`, enlaces «Siguiente proyecto» y metadatos.

> **Las rutas NO cambiaron.** Siguen siendo `/projects/matchflix` y `/projects/love-packaging`, así
> que hay desajuste entre nombre y URL. Se dejó así para no romper enlaces. Decisión pendiente (§10).

### 7.2 Arquitectura unificada

Las 4 páginas comparten ahora exactamente la misma secuencia de secciones, en los 4 breakpoints:

```
Opening       → título del proyecto  [Display]
Meta          → Disciplinas + número
Intro         → «Concepto»
Gallery       → composición art-dirigida, distinta en cada proyecto
Closing Text  → «El proyecto»          ← NUEVO
Next Project  → «Siguiente proyecto» + nombre
```

Cambios estructurales aplicados:

1. **`Closing Text` es nuevo** en las 4 páginas. Es un clon exacto de la sección `Intro`
   (mismo padding `110px 0`, mismo `gap: 26px`, `width: 100%`, `max-width: 1760px`, mismas clases).
2. **Matchaflix tenía la galería antes del `Intro`.** Reordenado para igualarlo al resto.
3. **El `Opening` de Matchaflix** tenía `padding: 230px 0 180px` frente a `230px 0 44px` del resto.
   Igualado.

La sección `Intro` / `Closing Text` es una fila de dos columnas: etiqueta a la izquierda
(`Label`, 170px) y párrafo a la derecha (`Editorial Note`, cursiva).

### 7.3 Contenido final, literal

Extraído del proyecto. **No inventes nada que no esté aquí.**

#### 01 · Tony Nieve — `/projects/tony-nieve`

```
Disciplinas: Fotografía · Dirección de arte · Storytelling · Retrato · Narrativa visual

Concepto:
Proyecto fotográfico personal, iniciado en 2016 y construido desde entonces. Retratos
hechos desde una mirada naturalista, donde la imagen no se queda en lo estético: cuenta algo.

El proyecto:
Hay algo de cuento de hadas en estas imágenes, y también de melancolía. Cada fotografía
levanta un pequeño universo —una luz, un gesto, un personaje— y confía en que el relato
aparezca ahí, sin subrayarlo. Aunque nace como proyecto personal, su lenguaje se traslada
con naturalidad a la moda, lo editorial y la dirección artística.

Siguiente proyecto: Matchaflix
```

#### 02 · Matchaflix — `/projects/matchflix`

```
Disciplinas: Rebranding · Branding · Dirección de arte · Packaging · Identidad visual

Concepto:
Rebranding conceptual de una marca de matcha. La esencia del producto se mantiene; lo que
cambia por completo es la manera de percibirla.

El proyecto:
La propuesta lleva la marca al territorio del lujo silencioso: nueva paleta cromática, una
tipografía más refinada y un lenguaje gráfico contenido, aplicado de forma coherente en cada
punto de contacto. El objetivo es un posicionamiento más premium y contemporáneo, donde el
matcha conversa con los códigos visuales del lujo discreto.

Siguiente proyecto: Metamorfosis
```

#### 03 · Metamorfosis — `/projects/metamorfosis`

```
Disciplinas: Diseño editorial · Ilustración · Dirección de arte · Escritura · Storytelling

Concepto:
Proyecto Final de Carrera, escrito, ilustrado, diseñado y maquetado íntegramente por mí.
Un libro sobre los finales: sobre cerrar una etapa para poder empezar otra.

Pieza:            (bloque dentro de la galería)
Libro impreso, con texto e ilustración originales.

El proyecto:
Las fases del duelo ordenan la narración: cada capítulo es un estado emocional distinto, del
enfado a la aceptación, y texto e ilustración avanzan juntos para que la transformación se vea
además de leerse. Al final aparece la mariposa, donde el cierre de una etapa deja de ser sólo
una pérdida para convertirse en el principio de un cambio.

Siguiente proyecto: Love
```

#### 04 · Love — `/projects/love-packaging`

```
Disciplinas: Packaging · Branding · Dirección de arte · Diseño gráfico

Concepto:
Proyecto conceptual de branding y packaging. Una reinterpretación del universo visual de
Mr. Wonderful, partiendo del amor entendido en todas sus formas.

Pieza:            (bloque dentro de la galería)
Caja, taza y aplicaciones gráficas.

El proyecto:
El tono emocional y cercano de la marca se mantiene, pero el lenguaje gráfico se depura: menos
ruido, más mensaje. El resultado es un sistema de packaging limpio y reconocible, adaptable a
distintos productos. La pregunta de fondo es hasta dónde puede estirarse una identidad
consolidada sin dejar de ser ella misma.

Siguiente proyecto: Tony Nieve
```

### 7.4 Reglas editoriales que el contenido debe respetar

- **No inventar** clientes, fechas, procesos, resultados ni métricas.
- **Love y Matchaflix son proyectos conceptuales.** Nunca presentarlos como encargos reales.
  El texto dice «conceptual» de forma explícita en ambos: no lo quites al reescribir.
- **No explicar el origen del nombre «Tony Nieve».** No se dispone de esa información.
- El único dato temporal que existe es **2016** (inicio de Tony Nieve). No hay más fechas.
- Ortografía exacta: `Tony Nieve`, `Metamorfosis`, `Love`, `Matchaflix`.

### 7.5 Asimetría conocida

Los bloques **«Pieza»** sólo existen en Metamorfosis y Love, dentro de la galería (bloques
«Image + Text»). Rompen ligeramente la simetría entre las 4 páginas. Se mantuvieron porque forman
parte de la composición visual. Ver §10.

---

## 8. Estado de la galería

**Sin cambios.** Las composiciones de galería descritas en §9 de la spec del 23/09 siguen vigentes
tal cual, igual que las 38 imágenes y sus URLs de §10. Nada de esta sesión tocó imágenes.

---

## 9. Por qué el sitio parecía roto

Relevante sobre todo como aviso de proceso.

Durante la sesión el sitio publicado servía un build **anterior al rediseño del 23/09**: titular
«Diseñador gráfico», placeholders `( Pendiente: … )` visibles, textos en inglés y la barra superior
era el componente `Menu` viejo con sólo un `( + )`. Todo el trabajo de ambas sesiones estaba en el
canvas **sin publicar**.

Sumado a los bugs de §4 y §5, el efecto era que la navegación no funcionaba de ninguna manera.

Se publicó en tres tandas: `5ce50c5bb`, `6c9c8c4cb` y `00e514d4b`.

**Verificación final sobre el HTML realmente servido** (no sobre el canvas):

- Anclas presentes: `./projects`, `./about`, `./contact`, `./` — y sus equivalentes `../` en subpáginas.
- Las 8 rutas devuelven `200`.
- `Disciplinas`, `El proyecto` y `Matchaflix` presentes; `Matchflix` y `Categoría` ya no aparecen.
- `<title>` correcto por página.

> Al comprobar texto en el HTML servido por Framer, **no filtres los `<script>` ni quites etiquetas
> con una regex**: el contenido viaja en el payload y da falsos negativos. Busca la cadena sobre el
> HTML crudo.

---

## 10. Decisiones abiertas

| # | Asunto | Estado |
|---|---|---|
| 10.1 | **Helvetica LT Std Roman** | Sigue sin instalar. `custom-fonts` vacío. Arimo hace de sustituta. En el repo, apunta la pila sans a Helvetica. |
| 10.2 | **ES/EN** | El selector existe pero el proyecto no tiene locales. En un repo esta limitación no aplica: §8 de la spec del 23/09 tiene ambos idiomas. |
| 10.3 | **Rutas vs. nombres** | `/projects/matchflix` y `/projects/love-packaging` no coinciden con `Matchaflix` y `Love`. Sin decidir. |
| 10.4 | **«Proyecto anterior»** | No implementado. Sólo hay «Siguiente proyecto». Se pidió, pero chocaba con «mantener la navegación intacta». |
| 10.5 | **Bloques «Pieza»** | Sólo en 2 de las 4 páginas. Sin decidir: quitarlos o replicarlos. |
| 10.6 | **Títulos en inglés** | `/projects` → `Proyectos — …` pero `/about` → `About — …` y `/contact` → `Contact — …`. Incoherente. |
| 10.7 | **Componente `Menu` sin usar** | Sigue en el proyecto. **En el repo debe borrarse**: sólo crea ruido y falsea las auditorías de enlaces (§5). |
| 10.8 | **`/cv`** | Sigue existiendo y ahora está publicada. No enlazada desde el menú, pero accesible por URL directa. |
| 10.9 | **Gutter vs. referencia** | La referencia de la Home va casi a sangre (~7px). Se mantuvo el gutter de 26px del proyecto por coherencia con el resto de secciones. |

---

## 11. Notas específicas de Framer

Sólo útiles para quien mantenga el lado Framer. **Nada de esto aplica a un repo de código.**

- Escribir `text` en un nodo de texto enriquecido **borra su `textStylePreset`**. Edita el `TextRun`
  hijo (`v:<nodeId>:<bloque>:<run>`) en su lugar, y comprueba antes cuántos runs tiene: el titular de
  About son dos (`"Tony "` + `"Arroyo"` en cursiva) y escribir sobre el primero se come el segundo.
- `DEL` de un frame contenedor **borra también los hijos que creías haber sacado antes en el mismo
  lote**, y aborta el resto del lote en silencio. Haz los `MOVE` en un lote y el `DEL` en otro.
- Un lote con comentarios `/* */` y varios `SET … link.href=` puede fallar parcialmente con
  «Some commands failed to parse» sin marcar error. Verifica siempre después.
- Los `SET` sobre nodos de una página concreta necesitan `{ pagePath }`; sin él fallan.
- `aspectRatio` exige `width` **y** `height` explícitos.
- Para recrear un bloque perdido, `DUPE` de uno hermano conserva efectos de aparición, hover y estilos
  de enlace; reconstruirlo a mano no.
- Los cambios en el nodo base se propagan solos a variantes de componente y a breakpoints.

---

*Generado el 24/09/2026 a partir del estado vivo del proyecto Framer `4pRs8QyCSry0wVCAGf6n`.*
