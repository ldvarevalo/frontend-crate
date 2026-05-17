import type { FunctionComponent } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Typography } from '#/components/ui/typography';

/**
 * AddReleasePage
 */

const AddReleasePage: FunctionComponent = () => (
  <main className="page-wrap py-6">
    <Typography family="heading" size="md">
      Add release
    </Typography>
  </main>
);

/**
 * AddReleaseRoute
 */

export const Route = createFileRoute('/_auth/release/add/')({
  component: AddReleasePage,
});
