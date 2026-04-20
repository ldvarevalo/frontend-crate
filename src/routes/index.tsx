import type { FunctionComponent } from 'react';
import { createFileRoute } from '@tanstack/react-router';

/**
 * Index component
 */

const App: FunctionComponent = () => (
  <main className="page-wrap px-4 pb-8 pt-14">
    <h1 className="display-title mb-5 max-w-3xl text-4xl leading-[1.02] font-bold tracking-tight text-primary sm:text-6xl">
      Start simple, ship quickly.
    </h1>
  </main>
);

/**
 * Index route
 */

export const Route = createFileRoute('/')({ component: App });
