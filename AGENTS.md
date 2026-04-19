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

## Git Workflow

- **Never use `git add`** — only commit already staged files
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