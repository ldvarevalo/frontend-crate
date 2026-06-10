import { QueryClient } from '@tanstack/react-query';
import { createRouter, type AnyRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

const initialQueryClient = new QueryClient();

export const router = createRouter({
  routeTree,
  scrollRestoration: true,
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
  context: { queryClient: initialQueryClient },
});

export const updateRouterContext = (queryClient: QueryClient): void => {
  router.update({ context: { queryClient } });
};

declare module '@tanstack/react-router' {
  interface Register {
    router: AnyRouter;
  }
}
