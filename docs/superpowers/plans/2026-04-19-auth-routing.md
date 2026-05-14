# Authentication Routing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

> **Important:** Apply `/add-file-sections` skill to all TypeScript/React files created. For commits, use `git add` to stage files then invoke `/create-commit` skill.

**Goal:** Implement client-side mock authentication with protected routes for TanStack Start.

**Architecture:** Create auth context with localStorage token, use TanStack Router's beforeLoad for route guards, structure routes with _public (login) and _authenticated (protected) layouts.

**Tech Stack:** TanStack Start, React Context, localStorage

---

### Task 1: Create Auth Context

**Files:**
- Create: `src/lib/auth-context.tsx`

- [ ] **Step 1: Write the failing test**

> Note: @test-utils render includes AuthProvider

```typescript
import { renderHook, act } from '@test-utils';
import { useAuth, AuthProvider } from './auth-context';

describe('useAuth', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return isAuthenticated false when no token', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('should return isAuthenticated true when token exists', () => {
    localStorage.setItem('auth_token', 'mock-token');
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });
    expect(result.current.isAuthenticated).toBe(true);
  });

  it('should set token on login', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });
    act(() => {
      result.current.login();
    });
    expect(localStorage.getItem('auth_token')).toBe('mock-token');
    expect(result.current.isAuthenticated).toBe(true);
  });

  it('should remove token on logout', () => {
    localStorage.setItem('auth_token', 'mock-token');
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });
    act(() => {
      result.current.logout();
    });
    expect(localStorage.getItem('auth_token')).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `yarn test src/lib/auth-context.test.tsx`
Expected: FAIL - file does not exist

- [ ] **Step 3: Write minimal implementation**

> **Important:** Use `/add-file-sections src/lib/auth-context.tsx` after writing the file

```typescript
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'auth_token';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    setIsAuthenticated(!!token);
  }, []);

  const login = () => {
    localStorage.setItem(TOKEN_KEY, 'mock-token');
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `yarn test src/lib/auth-context.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

Run: `git add src/lib/auth-context.tsx src/lib/__tests__/auth-context.test.tsx`
Then use `/create-commit` skill

---

### Task 2: Update Root Route with Auth Provider

**Files:**
- Modify: `src/routes/__root.tsx`

- [ ] **Step 1: Modify root to wrap with AuthProvider**

```typescript
import type { ReactNode } from 'react';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { AuthProvider } from '../lib/auth-context';

import appCss from '../styles.css?url';

/**
 * Root
 */

const RootDocument = ({ children }: { children: ReactNode }): ReactNode => (
  <html lang="en" suppressHydrationWarning>
    <head>
      <HeadContent />
    </head>
    <body className="font-sans antialiased [overflow-wrap:anywhere]">
      <AuthProvider>
        {children}
      </AuthProvider>
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
      <Scripts />
    </body>
  </html>
);

/**
 * Root route
 */

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'The Sonic Archive',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
});
```

- [ ] **Step 2: Run build to verify**

Run: `yarn build`
Expected: PASS

- [ ] **Step 3: Commit**

Run: `git add src/routes/__root.tsx`
Then use `/create-commit` skill

---

### Task 3: Create Login Route

**Files:**
- Create: `src/routes/_public/login.tsx`

- [ ] **Step 1: Write the failing test**

> Note: @test-utils already includes AuthProvider and RouterProvider

```typescript
import { render, screen } from '@test-utils';
import userEvent from '@testing-library/user-event';
import { Route as LoginRoute } from './login';

describe('Login Page', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should render login form', () => {
    render(<LoginRoute.component />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('should show error with invalid credentials', async () => {
    render(<LoginRoute.component />);
    await userEvent.type(screen.getByLabelText(/email/i), 'test@test.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'wrong');
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));
    expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
  });

  it('should login with valid credentials and redirect', async () => {
    render(<LoginRoute.component />);
    await userEvent.type(screen.getByLabelText(/email/i), 'test@test.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'password');
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));
    expect(localStorage.getItem('auth_token')).toBe('mock-token');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `yarn test src/routes/_public/__tests__/login.test.tsx`
Expected: FAIL - file/directory does not exist

- [ ] **Step 3: Write implementation**

> **Important:** Use `/add-file-sections src/routes/_public/login.tsx` after writing the file

```typescript
import { useState, type FunctionComponent } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '../../lib/auth-context';

/**
 * Login
 */

export const Login: FunctionComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'password') {
      login();
      navigate({ to: '/dashboard' });
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--surface)]">
      <div className="w-full max-w-md p-8 bg-[var(--surface-container)]">
        <h1 className="text-2xl font-serif text-[var(--foreground)] mb-8">
          Sign In
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <p className="text-[var(--destructive)] text-sm">{error}</p>
          )}
          <div>
            <label
              htmlFor="email"
              className="block text-sm text-[var(--muted-foreground)] mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[var(--surface-container-lowest)] border border-[var(--outline)] text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm text-[var(--muted-foreground)] mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[var(--surface-container-lowest)] border border-[var(--outline)] text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[var(--primary-container)] text-[var(--on-primary)] font-semibold hover:opacity-90 transition-opacity"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_public/login')({
  component: Login,
});
```

- [ ] **Step 4: Run test to verify it passes**

Run: `yarn test src/routes/_public/__tests__/login.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

Run: `git add src/routes/_public/login.tsx src/routes/_public/__tests__/login.test.tsx`
Then use `/create-commit` skill

---

### Task 4: Create Authenticated Layout with Guard

**Files:**
- Create: `src/routes/_authenticated.tsx`

- [ ] **Step 1: Write the failing test**

```typescript
import { render } from '@test-utils';
import { Route as AuthenticatedRoute } from './_authenticated';

describe('Authenticated Layout', () => {
  it('should redirect to login when not authenticated', () => {
    localStorage.clear();
    render(<AuthenticatedRoute.component />);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `yarn test src/routes/_authenticated/__tests__/layout.test.tsx`
Expected: FAIL - file/directory does not exist

- [ ] **Step 3: Write implementation**

> **Important:** Use `/add-file-sections src/routes/_authenticated/dashboard.tsx` after writing the file

```typescript
import { useAuth } from '../../lib/auth-context';
import { useNavigate } from '@tanstack/react-router';
import type { FunctionComponent } from 'react';

/**
 * Dashboard
 */

export const Dashboard: FunctionComponent = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate({ to: '/login' });
  };

  return (
    <div className="page-wrap py-20">
      <h1 className="font-serif text-4xl text-[var(--foreground)] mb-4">
        Welcome to your crate
      </h1>
      <p className="text-[var(--muted-foreground)] mb-8">
        Your personal music archive awaits.
      </p>
      <button
        onClick={handleLogout}
        className="px-6 py-3 border border-[var(--outline)] text-[var(--foreground)] hover:bg-[var(--surface-container-high)] transition-colors"
      >
        Sign Out
      </button>
    </div>
  );
};

import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: Dashboard,
});
```

- [ ] **Step 4: Run test to verify it passes**

Run: `yarn test src/routes/_authenticated/__tests__/dashboard.test.tsx`
Expected: PASS

---

### Task 5: Create Dashboard Route

**Files:**
- Create: `src/routes/_authenticated/dashboard.tsx`

- [ ] **Step 1: Write the failing test**

> Note: @test-utils includes AuthProvider and RouterProvider

```typescript
import { render, screen } from '@test-utils';
import userEvent from '@testing-library/user-event';
import { Route as DashboardRoute } from './dashboard';

describe('Dashboard Page', () => {
  beforeEach(() => {
    localStorage.setItem('auth_token', 'mock-token');
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should render welcome message', () => {
    render(<DashboardRoute.component />);
    expect(screen.getByText(/welcome to your crate/i)).toBeInTheDocument();
  });

  it('should have logout button', () => {
    render(<DashboardRoute.component />);
    expect(screen.getByRole('button', { name: /sign out/i })).toBeInTheDocument();
  });

  it('should clear auth on logout', async () => {
    render(<DashboardRoute.component />);
    await userEvent.click(screen.getByRole('button', { name: /sign out/i }));
    expect(localStorage.getItem('auth_token')).toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `yarn test src/routes/_authenticated/__tests__/dashboard.test.tsx`
Expected: FAIL - file does not exist

- [ ] **Step 3: Write implementation**

> **Important:** Use `/add-file-sections src/routes/_authenticated/dashboard.tsx` after writing the file

```typescript
import { useAuth } from '../../lib/auth-context';
import { useNavigate } from '@tanstack/react-router';
import type { FunctionComponent } from 'react';

/**
 * Index
 */

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    throw redirect({ to: '/login' });
  },
});
```

- [ ] **Step 2: Run build to verify**

Run: `yarn build`
Expected: PASS

- [ ] **Step 3: Commit**

Run: `git add src/routes/index.tsx`
Then use `/create-commit` skill

---

### Task 7: Remove Old Routes

**Files:**
- Delete: `src/routes/about.tsx`

- [ ] **Step 1: Remove files**

```bash
rm src/routes/about.tsx
```

- [ ] **Step 2: Run build to verify**

Run: `yarn build`
Expected: PASS

- [ ] **Step 3: Commit**

Run: `git add -A`
Then use `/create-commit` skill

---

## Verification Steps

After all tasks complete, run:

```bash
yarn build && yarn lint && yarn typescript
```

All should pass.