import type { FunctionComponent } from 'react';
import { createFileRoute } from '@tanstack/react-router';

/**
 * Index component
 */

const App: FunctionComponent = () => (
  <main className="page-wrap px-4 pb-8 pt-14">
    <></>
  </main>
);

/**
 * Index route
 */

export const Route = createFileRoute('/')({ component: App });
