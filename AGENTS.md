# AGENTS.md

## Commands

```bash
yarn dev          # Start dev server
yarn build       # Build (validates syntax + imports)
yarn lint        # ESLint
yarn lint:fix    # ESLint auto-fix
yarn typescript  # TypeScript check
yarn test        # Run tests
yarn test:watch  # Watch mode
```

## Verification Order

`lint → typescript → test`

## Workflow

- **Branch first:** crear branch (`feat/<name>`) antes de implementar
- **Brainstorming first:** usar `brainstorming` skill para diseñar antes de tocar código
- **Plan approval:** presentar diseño/plan y obtener aprobación antes de implementar
- **No commitear specs ni plans:** archivos de diseño y planificación no se commitean
- **Commits granulares:** un commit por componente/grupo lógico — no commits masivos

## UI Conventions

- Seguir `docs/ui-spec.md` estrictamente: solo tokens CSS, `--radius: 0px`, sin hex hardcodeados
- Seguir `.claude/skills/new-page` para estructura de rutas: `-components/`, `-hooks/`, `-helpers/`
- **Component directory pattern:** cada componente en su carpeta con `{component}.tsx` + `index.ts` + `__tests__/` (ej: `src/components/header/`)
- **Typography:** usar `<Typography>` de `#/components/ui/typography` con props `family`, `size`, `weight`, `transform`, `tracking`, `as`. El color lo define el contenedor, no el componente
- **Button links:** usar `<Button variant="text">` para links inline ("VIEW ALL"). La variant `text` usa Typography internamente
- **Navigation activeTab:** usar array lookup (`TAB_ROUTES.find`) en vez de ternary chains

## Data Layer

- **Mock data primero:** empezar con datos mock en hooks; GraphQL solo cuando se necesite

## Git Workflow

- **Never use `git add`** — only commit already staged files. Never use `git add -A` or `git add .` (picks up unintended files like `.claude/`, `.codegraph/`, docs)
- **Only commit what's defined in the plan/task** — no extra files
- Use `git commit --no-verify -m "<message>"` with staged files
- Use `yarn add -E <package>` for exact versions

## Naming

| Type | Convention | Example |
|------|------------|---------|
| Files | kebab-case | `footer.tsx`, `theme-toggle.tsx` |
| Components | PascalCase | `ThemeToggle` |
| Hooks | use + PascalCase | `useThemeToggle` |
| Types | Use[Nombre]Props/Hook | `UseThemeToggleProps` |

## TanStack Router

- `routeTree.gen.ts` is **auto-generated** — never edit manually
- Exclude it from linter/formatter in `eslint.config.js`
- Tests require `RouterContextProvider` wrapper (see `test-utils`)

## Testing

- Test utilities: `src/lib/test-utils/index.tsx`
- Import via `@test-utils`: `import { render, screen } from '@test-utils'`
- Render wraps components with `RouterContextProvider`

## Section Order (TypeScript)

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

## TypeScript Rules

- **NO `any`** — use `unknown` + type guards
- Keep type imports separate
