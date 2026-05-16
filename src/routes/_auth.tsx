import type { FunctionComponent } from 'react';
import { createFileRoute, redirect, Outlet, useMatchRoute } from '@tanstack/react-router';
import { BottomNav } from '#/components/bottom-nav';
import { Header } from '#/components/header';

/**
 * Helpers
 */

const isAuthenticated = (): boolean =>
  localStorage?.getItem('is_authenticated') === 'true';

const TAB_ROUTES: [string, string][] = [
  ['home', '/inicio'],
  ['collection', '/collection'],
  ['add', '/add'],
];

/**
 * AuthenticatedLayout
 */

const AuthenticatedLayout: FunctionComponent = () => {
  const matchRoute = useMatchRoute();
  const activeTab = TAB_ROUTES.find(([, to]) => matchRoute({ to }))?.[0] ?? 'home';

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      <Outlet />
      <BottomNav activeTab={activeTab as 'home' | 'collection' | 'add'} />
    </div>
  );
};

/**
 * AuthenticatedRoute
 */

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ location }) => {
    if (!isAuthenticated()) {
      throw redirect({
        to: '/',
        search: { redirect: location.href },
      });
    }
  },
  component: AuthenticatedLayout,
});
