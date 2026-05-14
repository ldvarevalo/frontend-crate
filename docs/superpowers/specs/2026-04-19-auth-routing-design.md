# Authentication Routing Spec

## 1. Overview

Implement client-side authentication routing with mock auth (localStorage) for a TanStack Start application. All routes redirect to login unless authenticated.

## 2. Architecture

```
src/routes
├── _public
│   └── login.tsx         # Public login page
├── _authenticated
│   ├── _layout.tsx       # Authenticated layout (with header/sidebar)
│   └── dashboard
│       └── index.tsx     # Dashboard home
└── index.tsx             # Root redirect to login
```

**Redirect Flow:**
- User visits `/` → redirects to `/login`
- User visits any path → if not authenticated, redirects to `/login`
- User logs in → stores token in localStorage, redirects to `/dashboard`

## 3. Auth Context

Create `src/lib/auth-context.tsx`:

- `isAuthenticated: boolean` — read from localStorage on mount
- `login(): void` — sets auth token in localStorage
- `logout(): void` — removes token from localStorage

**Token key:** `auth_token`

## 4. Route Protection

- Create `_public` layout with no protection (contains login)
- Create `_authenticated` layout with auth guard
- Guard redirects to `/login` if not authenticated

## 5. Components

### Login Page (`/login`)
- Simple form with email/password
- Mock validation: any email + password "password" works
- On success: call `login()`, redirect to `/dashboard`
- Show error message on failed attempt

### Dashboard Page (`/dashboard`)
- Display "Welcome to your crate" message
- Logout button

## 6. Implementation Steps

1. Create auth context provider
2. Create `_public/login` route
3. Create `_authenticated/_layout` with redirect guard
4. Create `_authenticated/dashboard` route
5. Update root to redirect to `/login`
6. Remove old `/about` route

## 7. Verification

- Visiting `/` redirects to `/login`
- Visiting `/dashboard` when not logged in redirects to `/login`
- Logging in redirects to `/dashboard`
- Logging out redirects to `/login`
- Refreshing page preserves auth state