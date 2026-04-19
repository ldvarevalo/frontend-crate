import {
  createRouter as createTanStackRouter,
  type AnyRouter,
} from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

export const getRouter = (): AnyRouter => {
  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
  });

  return router;
};

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
