import type { FunctionComponent } from 'react';
import { createFileRoute } from '@tanstack/react-router';

/**
 * AddCollectionPage
 */

const AddCollectionPage: FunctionComponent = () => (
  <main className="page-wrap py-6">
    <p>Add</p>
  </main>
);

/**
 * AddCollectionRoute
 */

export const Route = createFileRoute('/_auth/collection/add/')({
  component: AddCollectionPage,
});
