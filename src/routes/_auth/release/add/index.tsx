import type { FunctionComponent } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { SearchBar } from '#/components/search-bar';
import { Typography } from '#/components/ui/typography';
import { ManualEntryForm } from './-components/manual-entry-form';
import { Pagination } from './-components/pagination';
import { SearchResults } from './-components/search-results';
import { SectionDivider } from './-components/section-divider';
import { useManualEntry } from './-hooks/use-manual-entry';
import { useSearchReleases } from './-hooks/use-search-releases';

/**
 * AddReleasePage
 */

const AddReleasePage: FunctionComponent = () => {
  const navigate = useNavigate();
  const {
    query,
    setQuery,
    results,
    currentPage,
    totalPages,
    setCurrentPage,
    toggleResult,
  } = useSearchReleases();
  const {
    values,
    setField,
    isValid,
    handleSubmit,
  } = useManualEntry();

  return (
    <main className="page-wrap space-y-6 py-6">
      <Typography as="h2" family="heading" size="2xl">
        Add release
      </Typography>

      <div>
        <Typography
          size="xs"
          weight="bold"
          tracking="widest"
          transform="uppercase"
          className="mb-6 text-primary"
        >
          SEARCH RESULTS
        </Typography>
        <SearchBar
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="SEARCH ARTIST OR ALBUM"
        />
      </div>

      {results.length > 0 && (
        <>
          <SearchResults results={results} onToggle={toggleResult} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      <SectionDivider label="OR MANUAL ENTRY" />

      <ManualEntryForm
        values={values}
        onFieldChange={setField}
        onSubmit={() => {
          handleSubmit();
          navigate({ to: '/collection' });
        }}
        isValid={isValid}
      />
    </main>
  );
};

/**
 * AddReleaseRoute
 */

export const Route = createFileRoute('/_auth/release/add/')({
  component: AddReleasePage,
  loader: () => ({
    pageHeader: {
      title: 'Crate',
    },
  }),
});
