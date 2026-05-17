import type { FunctionComponent } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Typography } from '#/components/ui/typography';
import { SearchBar } from '#/components/search-bar';
import { SearchResults } from './-components/search-results';
import { Pagination } from './-components/pagination';
import { SectionDivider } from './-components/section-divider';
import { ManualEntryForm } from './-components/manual-entry-form';
import { useSearchReleases } from './-hooks/use-search-releases';
import { useManualEntry } from './-hooks/use-manual-entry';

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
    setPage,
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
      <Typography family="heading" size="md">
        Add release
      </Typography>

      <div>
        <Typography
          size="xs"
          weight="medium"
          tracking="widest"
          transform="uppercase"
          className="mb-2 text-primary"
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
            onPageChange={setPage}
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
