import type { FunctionComponent } from 'react';
import { createFileRoute } from '@tanstack/react-router';

/**
 * CollectionPage
 */

const CollectionPage: FunctionComponent = () => (
  <main className="page-wrap py-6">
    <p>Collection</p>
  </main>
);

/**
 * CollectionRoute
 */

export const Route = createFileRoute('/_auth/collection/')({
  component: CollectionPage,
});
