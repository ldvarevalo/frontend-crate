# Base Spec — The Sonic Archive

Documento de referencia compartido entre todas las pantallas y secciones de la app **Crate**.  
Cada spec de pantalla lo importa por referencia; no repite lo que está aquí.

---

## 1. Identidad visual

**Design System:** The Sonic Archive  
**Estética:** Editorial Brutalism — arquitectónico, autoritativo, permanente  
**Filosofía:** el canvas monocromático existe para servir a la artwork, nunca para competir con ella

---

## 2. Tokens de color

### Superficies (de más profundo a más elevado)

| Token | Valor | Uso |
|---|---|---|
| `surface-container-lowest` | `#0e0e0e` | Wells: search bars, listas inactivas |
| `surface` / `background` | `#131313` | Canvas base de la aplicación |
| `surface-container-low` | — | Separación de secciones sin borde |
| `surface-container-high` | `#2a2a2a` | Cards y paneles elevados |
| `surface-container-highest` | — | Estado activo de filas/tracks |

### Acento

| Token | Valor | Uso |
|---|---|---|
| `primary` | `#bbc3ff` | Color de acento, texto sobre fondos oscuros |
| `primary_container` | `#3d5afe` | Fondo de acciones primarias y tab activo |
| `on_primary_container` | `#ffffff` | Texto/íconos sobre `primary_container` |

### Texto

| Token | Uso |
|---|---|
| `on_surface` | Texto principal (`#ffffff`) |
| `on_surface_variant` | Metadata, labels secundarios — mínimo 4.5:1 de contraste sobre `surface` |

### Gradiente de acento — "Soul Gradient"

```
linear-gradient(135deg, #3d5afe, #bbc3ff)
```

Uso: acciones primarias destacadas y headers de alto nivel. No usar en elementos secundarios.

---

## 3. Tipografía

| Rol | Fuente | Estilo | Escala |
|---|---|---|---|
| Display / Headlines | Newsreader | Italic | `display-lg`, `headline-md` |
| UI / Metadata | Inter | Regular / Bold | `body-md`, `label-sm`, `label-md` |

### Reglas de uso

- Newsreader italic: nombres de artistas, títulos de álbum, títulos de sección
- Inter uppercase: labels funcionales, duraciones, navegación
- Duraciones y datos numéricos en listas: Inter `label-md` **monoespaced** para alineación vertical consistente
- No usar Arial, Roboto ni system fonts

---

## 4. Espaciado

| Uso | Valor |
|---|---|
| Separación entre filas de lista | `24px` vertical |
| Separación mínima entre filas | `16px` vertical |
| Padding horizontal de pantalla | relativo, sin valor fijo — consistente entre secciones |

---

## 5. Border radius

**0px absoluto en todos los elementos sin excepción.**  
Cards, botones, thumbnails, inputs, tabs, modales — todo tiene esquinas rectas.  
Un radio de 2px destruye la estética del sistema.

---

## 6. Regla de separación — "No-Line Rule"

**Prohibido usar bordes de 1px para separar contenido.**  
La estructura se define exclusivamente por **Background Shift**: cambiar el token de superficie entre secciones adyacentes.

**Excepción de accesibilidad:** si una separación es estrictamente necesaria, usar `outline-variant` al **15% de opacidad** (Ghost Border). No es la solución por defecto, es el último recurso.

---

## 7. Separación en listas

**Prohibido usar dividers horizontales entre filas.**  
La separación entre items de lista se logra solo con whitespace vertical (`24px` estándar, `16px` mínimo).

---

## 8. Elevación y profundidad

La profundidad se percibe, no se ve. No usar el tropo de "floating card con sombra".

| Técnica | Cuándo usarla |
|---|---|
| Tonal layering | Siempre — superficie más oscura debajo, más clara encima |
| Sombra ambient | Solo en modales flotantes: `0px 20px 40px rgba(0,0,0,0.4)` |
| Glassmorphism | Navegación persistente y barra Now Playing |

### Glassmorphism — spec exacta

```css
background: rgba(19, 19, 19, 0.8); /* surface al 80% */
backdrop-filter: blur(20px);
```

Permite que el color del artwork sangre a través de la UI.

---

## 9. Imágenes y artwork

- Siempre `object-fit: cover`
- Siempre `aspect-ratio: 1 / 1` para thumbnails y album cards
- Sin bordes, sin sombras, sin border-radius
- El canvas nunca compite cromáticamente con el artwork

---

## 10. Componentes base

### Botón primario
- Fondo: `primary_container` (#3d5afe)
- Texto: `on_primary_container`, Inter, `label-md`, uppercase
- Border-radius: 0px

### Botón secundario (ghost)
- Sin fondo
- Borde: `outline` token al 20% de opacidad
- Border-radius: 0px

### Botón terciario (text-only)
- Sin contenedor
- Texto: Inter, `label-md`, uppercase, color `primary`

### Input / Search
- Fondo: `surface-container-lowest`
- Estado activo: subrayado de 2px en `primary` — sin box focus

### Header de sección
- Label principal: Newsreader italic, `headline-md`, color `on_surface`, alineado a la izquierda
- Link secundario (opcional): Inter, `label-sm`, uppercase, color `on_surface_variant`, alineado a la derecha

### Fila de lista (track row)
- Thumbnail + título + artista + dato alineado a la derecha
- Sin divider
- Estado activo: fondo `surface-container-highest` en toda la fila
- Toda la fila es tappable

### Album card
- Imagen cuadrada como hero (sin decoración)
- Título: Inter, `body-md`, bold, color `on_surface`
- Artista: Inter, `label-sm`, uppercase, color `on_surface_variant`

---

## 11. Bottom Navigation

Componente fijo al pie de pantalla, compartido entre todas las pantallas.

- Glassmorphism (ver spec §8)
- 3 tabs: ícono + label uppercase Inter `label-sm`
- Tab activo: fondo rectangular `primary_container`, texto `on_primary_container`
- Tab inactivo: color `on_surface_variant`
- Border-radius: 0px
- Padding inferior para safe area (home indicator / notch)

---

## 12. Lo que nunca se hace

| Prohibición | Motivo |
|---|---|
| Border-radius > 0px | Destruye la estética Editorial Brutalism |
| Bordes de 1px como separadores | Viola la No-Line Rule |
| Dividers horizontales en listas | El sistema usa whitespace |
| Grises genéricos (#888888) | Usar siempre tokens del sistema |
| Elementos sociales (likes, followers, shares) | Es una herramienta personal, no una red social |
| Fuentes genéricas (Inter como display, Arial, Roboto) | El sistema tiene tipografía definida |

---

## 13. Accesibilidad

- `on_surface_variant` debe mantener mínimo **4.5:1** de contraste sobre `surface`
- Acciones primarias: siempre `primary_container` con `on_primary_container` para máxima legibilidad
- El Ghost Border (§6) existe exclusivamente como fallback de accesibilidad

---

## Cómo usar este documento en specs de pantalla

Cada spec de pantalla referencia este documento y solo define:

1. **Qué componentes base usa** y con qué contenido
2. **Qué superficies** se asignan a cada sección (qué token de fondo)
3. **Comportamiento e interacciones** específicas de esa pantalla
4. **Excepciones o variaciones** respecto a la base (deben ser explícitas y justificadas)

Lo que está en este documento **no se repite** en el spec de pantalla.

---

## Convenciones de implementación

### Naming
- Componentes: `PascalCase` → `Header`, `Button`
- Archivos: `kebab-case` → `header.tsx`, `button.tsx`
- Hooks: `use` + `PascalCase` → `useAuth`, `useTheme`
- Tipos: `Use[Nombre]Props` → `UseButtonProps`

### Orden de secciones (TypeScript)
```typescript
/**
 * Types
 */

interface MyProps { ... }

/**
 * Constants
 */

const MAX_ITEMS = 10;

/**
 * Helpers
 */

const formatDate = () => { ... };

/**
 * MyComponent
 */

export const MyComponent = () => { ... };
```

### Testing
- Wrapper: `RouterContextProvider` (ver `test-utils`)
- Import: `import { render, screen } from '@test-utils'`

### Tareas de verificación
```bash
yarn lint → yarn typescript → yarn test
```