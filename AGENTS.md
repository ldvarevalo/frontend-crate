# AGENTS.md

## Convenciones de Código

### Naming Conventions

- **Archivos**: `kebab-case` (`footer.tsx`, `theme-toggle.tsx`)
- **Componentes**: `PascalCase` (`ThemeToggle`)
- **Hooks**: `use` + `PascalCase`
- **Types**: `Use[Nombre]Props`, `Use[Nombre]Hook`
- **Helpers**: `camelCase`
- **Tests**: `*.test.ts` en `__tests__/`

### Separadores de Sección

Orden obligatorio en TypeScript:

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

### TypeScript

- **NO usar `any`**: usar `unknown` + type guards
- **Type imports separados**

## Verificación

```bash
yarn build   # Build (verifica sintaxis y imports)
yarn lint   # ESLint (puede tener advertencias)
yarn test   # Vitest
```

Orden recomendado: `build → lint → test`