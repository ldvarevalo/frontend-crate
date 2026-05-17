# Add Release Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move `collection/add` to `release/add`, rename `TrackRow` → `AlbumRow`, move `SearchBar` to global, and build the full Add Release screen with search + manual entry.

**Architecture:** Three structural refactors (git mv + rename) followed by scaffolding release/add with 2 hooks, 5 page-specific presentational components, and the page orchestrator. All new components under `-components/`, hooks under `-hooks/`.

**Tech Stack:** React 19, TanStack Router, Tailwind CSS v4, lucide-react, shadcn/ui input

---

### Task 0: Create branch

- [ ] **Step 1: Create feature branch**

```bash
git checkout -b feat/add-release-page
```

---

### Task 1: Rename TrackRow → AlbumRow

**Files:**
- Rename: `src/components/track-row/` → `src/components/album-row/` (git mv)
- Rewrite: `src/components/album-row/album-row.tsx`
- Rewrite: `src/components/album-row/index.ts`

- [ ] **Step 1: git mv the directory**

```bash
git mv src/components/track-row src/components/album-row
```

- [ ] **Step 2: Rewrite album-row.tsx**

```tsx
import type { FunctionComponent, ReactNode } from 'react';
import { Typography } from '#/components/ui/typography';
import { cn } from '#/lib/utils';

/**
 * Types
 */

interface AlbumRowProps {
  thumbnail: string;
  title: string;
  artist: string;
  duration?: string;
  isActive?: boolean;
  isAdded?: boolean;
  actionIcon?: ReactNode;
  onClick: () => void;
}

/**
 * AlbumRow
 */

export const AlbumRow: FunctionComponent<AlbumRowProps> = ({
  thumbnail,
  title,
  artist,
  duration,
  isActive = false,
  isAdded = false,
  actionIcon,
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      'flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors',
      isActive && 'bg-secondary',
      !isActive && 'hover:bg-secondary/50',
      isAdded && 'border-l-2 border-primary-container',
    )}
  >
    <img
      src={thumbnail}
      alt={title}
      className="size-10 shrink-0 rounded-none object-cover"
    />
    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
      <Typography size="sm" className="truncate">
        {title}
      </Typography>
      <Typography size="xs" className="truncate">
        {artist}
      </Typography>
    </div>
    {actionIcon && (
      <span className={cn('shrink-0', isAdded ? 'text-primary' : 'text-on-surface-variant')}>
        {actionIcon}
      </span>
    )}
    {!actionIcon && duration && (
      <Typography size="xs" className="shrink-0">
        {duration}
      </Typography>
    )}
  </button>
);
```

- [ ] **Step 3: Rewrite index.ts**

```ts
export * from './album-row';
```

- [ ] **Step 4: Run typecheck**

Run: `yarn typescript` — expected: error because `inicio/index.tsx` still imports `TrackRow`.

- [ ] **Step 5: Commit**

```bash
git add src/components/album-row/
```

Then invoke `create-commit` skill.

---

### Task 2: Move SearchBar to global

**Files:**
- Move: `src/routes/_auth/collection/-components/search-bar.tsx` → `src/components/search-bar/search-bar.tsx` (git mv)
- Create: `src/components/search-bar/index.ts`

- [ ] **Step 1: git mv search-bar.tsx**

```bash
git mv src/routes/_auth/collection/-components/search-bar.tsx src/components/search-bar/search-bar.tsx
```

- [ ] **Step 2: Create src/components/search-bar/index.ts**

```ts
export * from './search-bar';
```

- [ ] **Step 3: Run typecheck**

Run: `yarn typescript` — expected: error because `collection/index.tsx` still imports from `./-components/search-bar`.

- [ ] **Step 4: Commit**

```bash
git add src/components/search-bar/
```

Then invoke `create-commit` skill.

---

### Task 3: Update inicio imports for AlbumRow

**Files:**
- Modify: `src/routes/_auth/inicio/index.tsx`
- Modify: `src/routes/_auth/inicio/-hooks/use-home-data.ts`

- [ ] **Step 1: Update use-home-data.ts — add thumbnail to Track**

Add `thumbnail: string` to the `Track` interface and populate it in mock data:

```tsx
import { useState } from 'react';

/**
 * Types
 */

export interface Album {
  id: string;
  coverUrl: string;
  title: string;
  artist: string;
}

export interface Track {
  id: string;
  thumbnail: string;
  title: string;
  artist: string;
  duration: string;
  isActive?: boolean;
}

export interface HomeStats {
  totalReleases: number;
  thisMonth: number;
  wantToListen: number;
}

export interface HomeData {
  stats: HomeStats;
  albums: Album[];
  tracks: Track[];
}

/**
 * Constants
 */

const MOCK_ALBUMS: Album[] = [
  {
    id: '1',
    coverUrl: 'https://picsum.photos/seed/album1/400',
    title: 'Dark Side',
    artist: 'Pink Floyd',
  },
  {
    id: '2',
    coverUrl: 'https://picsum.photos/seed/album2/400',
    title: 'Rumours',
    artist: 'Fleetwood Mac',
  },
  {
    id: '3',
    coverUrl: 'https://picsum.photos/seed/album3/400',
    title: 'Thriller',
    artist: 'Michael Jackson',
  },
  {
    id: '4',
    coverUrl: 'https://picsum.photos/seed/album4/400',
    title: 'Back in Black',
    artist: 'AC/DC',
  },
];

const MOCK_TRACKS: Track[] = [
  {
    id: 't1',
    thumbnail: 'https://picsum.photos/seed/track1/200',
    title: 'Time',
    artist: 'Pink Floyd',
    duration: '6:53',
  },
  {
    id: 't2',
    thumbnail: 'https://picsum.photos/seed/track2/200',
    title: 'Dreams',
    artist: 'Fleetwood Mac',
    duration: '4:17',
  },
  {
    id: 't3',
    thumbnail: 'https://picsum.photos/seed/track3/200',
    title: 'Billie Jean',
    artist: 'Michael Jackson',
    duration: '4:54',
    isActive: true,
  },
  {
    id: 't4',
    thumbnail: 'https://picsum.photos/seed/track4/200',
    title: 'Hells Bells',
    artist: 'AC/DC',
    duration: '5:12',
  },
  {
    id: 't5',
    thumbnail: 'https://picsum.photos/seed/track5/200',
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    duration: '5:55',
  },
];

const MOCK_STATS: HomeStats = {
  totalReleases: 1428,
  thisMonth: 42,
  wantToListen: 12,
};

/**
 * UseHomeData
 */

export const useHomeData = (): HomeData => ({
  stats: MOCK_STATS,
  albums: MOCK_ALBUMS,
  tracks: MOCK_TRACKS,
});
```

- [ ] **Step 2: Update inicio/index.tsx — import AlbumRow instead of TrackRow**

```tsx
import type { FunctionComponent } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { AlbumCard } from '#/components/album-card';
import { SectionHeader } from '#/components/section-header';
import { AlbumRow } from '#/components/album-row';
import { BannerCta } from './-components/banner-cta';
import { StatsCard } from './-components/stats-card';
import { useHomeData } from './-hooks/use-home-data';

/**
 * HomePage
 */

const HomePage: FunctionComponent = () => {
  const navigate = useNavigate();
  const { stats, albums, tracks } = useHomeData();

  return (
    <main className="page-wrap space-y-6 py-6">
      <StatsCard
        totalReleases={stats.totalReleases}
        thisMonth={stats.thisMonth}
      />
      <BannerCta
        count={stats.wantToListen}
        onClick={() => navigate({ to: '/want-to-listen' })}
      />
      <SectionHeader title="Recently Listened" onLinkClick={() => navigate({ to: '/recent' })} />
      <div className="grid grid-cols-2 gap-4">
        {albums.map((album) => (
          <AlbumCard
            key={album.id}
            coverUrl={album.coverUrl}
            title={album.title}
            artist={album.artist}
            onClick={() => navigate({ to: `/album/${album.id}` })}
          />
        ))}
      </div>
      <SectionHeader title="Up Next" />
      <div className="flex flex-col">
        {tracks.map((track) => (
          <AlbumRow
            key={track.id}
            thumbnail={track.thumbnail}
            title={track.title}
            artist={track.artist}
            duration={track.duration}
            isActive={track.isActive}
            onClick={() => navigate({ to: `/album/${track.id}` })}
          />
        ))}
      </div>
    </main>
  );
};

/**
 * HomeRoute
 */

export const Route = createFileRoute('/_auth/inicio/')({
  component: HomePage,
  loader: () => ({
    pageHeader: {
      title: 'Crate',
    },
  }),
});
```

- [ ] **Step 3: Run typecheck**

Run: `yarn typescript` — expected: pass.

- [ ] **Step 4: Commit**

```bash
git add src/routes/_auth/inicio/
```

Then invoke `create-commit` skill.

---

### Task 4: Move collection/add → release/add + routing

**Files:**
- Rename: `src/routes/_auth/collection/add/` → `src/routes/_auth/release/add/` (git mv)
- Rewrite: `src/routes/_auth/release/add/index.tsx`
- Modify: `src/routes/_auth.tsx`
- Modify: `src/components/bottom-nav/bottom-nav.tsx`

- [ ] **Step 1: git mv the directory**

```bash
git mv src/routes/_auth/collection/add src/routes/_auth/release/add
```

- [ ] **Step 2: Rewrite release/add/index.tsx**

```tsx
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
```

- [ ] **Step 3: Update _auth.tsx — TAB_ROUTES**

Find:
```tsx
const TAB_ROUTES: [TabId, FileRouteTypes['to']][] = [
  ['home', '/inicio'],
  ['collection', '/collection'],
  ['add', '/collection/add'],
];
```

Replace `'/collection/add'` with `'/release/add'`:
```tsx
const TAB_ROUTES: [TabId, FileRouteTypes['to']][] = [
  ['home', '/inicio'],
  ['collection', '/collection'],
  ['add', '/release/add'],
];
```

- [ ] **Step 4: Update bottom-nav.tsx — Add tab to**

Find:
```tsx
  {
    id: 'add',
    label: 'Add',
    icon: Plus,
    to: '/collection/add',
  },
```

Replace `'/collection/add'` with `'/release/add'`:
```tsx
  {
    id: 'add',
    label: 'Add',
    icon: Plus,
    to: '/release/add',
  },
```

- [ ] **Step 5: Update collection/index.tsx — import SearchBar from global**

Find:
```tsx
import { SearchBar } from './-components/search-bar';
```

Replace with:
```tsx
import { SearchBar } from '#/components/search-bar';
```

- [ ] **Step 6: Run typecheck**

Run: `yarn typescript` — expected: pass.

- [ ] **Step 7: Run tests**

Run: `yarn test` — expected: pass.

- [ ] **Step 8: Commit**

```bash
git add src/routes/_auth/release/add/ src/routes/_auth.tsx src/components/bottom-nav/bottom-nav.tsx src/routes/_auth/collection/index.tsx
```

Then invoke `create-commit` skill.

---

### Task 5: Create use-search-releases hook

**Files:**
- Create: `src/routes/_auth/release/add/-hooks/use-search-releases.ts`

- [ ] **Step 1: Create use-search-releases.ts**

```ts
import { useState, useMemo } from 'react';

/**
 * Types
 */

export interface SearchResult {
  id: string;
  thumbnail: string;
  title: string;
  artist: string;
  isAdded: boolean;
}

export interface UseSearchReleasesHook {
  query: string;
  setQuery: (q: string) => void;
  results: SearchResult[];
  currentPage: number;
  totalPages: number;
  setPage: (p: number) => void;
  toggleResult: (id: string) => void;
  addedIds: Set<string>;
}

/**
 * Constants
 */

const PAGE_SIZE = 4;

const MOCK_RESULTS: Omit<SearchResult, 'isAdded'>[] = [
  { id: 'r1', thumbnail: 'https://picsum.photos/seed/release1/200', title: 'A Love Supreme', artist: 'John Coltrane' },
  { id: 'r2', thumbnail: 'https://picsum.photos/seed/release2/200', title: 'Blue Train', artist: 'John Coltrane' },
  { id: 'r3', thumbnail: 'https://picsum.photos/seed/release3/200', title: 'Giant Steps', artist: 'John Coltrane' },
  { id: 'r4', thumbnail: 'https://picsum.photos/seed/release4/200', title: 'My Favorite Things', artist: 'John Coltrane' },
  { id: 'r5', thumbnail: 'https://picsum.photos/seed/release5/200', title: 'Kind of Blue', artist: 'Miles Davis' },
  { id: 'r6', thumbnail: 'https://picsum.photos/seed/release6/200', title: 'Bitches Brew', artist: 'Miles Davis' },
  { id: 'r7', thumbnail: 'https://picsum.photos/seed/release7/200', title: 'Sketches of Spain', artist: 'Miles Davis' },
  { id: 'r8', thumbnail: 'https://picsum.photos/seed/release8/200', title: 'Round About Midnight', artist: 'Miles Davis' },
  { id: 'r9', thumbnail: 'https://picsum.photos/seed/release9/200', title: 'Maiden Voyage', artist: 'Herbie Hancock' },
  { id: 'r10', thumbnail: 'https://picsum.photos/seed/release10/200', title: 'Head Hunters', artist: 'Herbie Hancock' },
];

/**
 * UseSearchReleases
 */

export const useSearchReleases = (): UseSearchReleasesHook => {
  const [query, setQuery] = useState('');
  const [currentPage, setPage] = useState(1);
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    if (!q) return [];
    return MOCK_RESULTS.filter(
      (r) => r.title.toLowerCase().includes(q) || r.artist.toLowerCase().includes(q),
    );
  }, [query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const clampedPage = Math.min(currentPage, totalPages);

  const results = useMemo(() => {
    const start = (clampedPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE).map((r) => ({
      ...r,
      isAdded: addedIds.has(r.id),
    }));
  }, [filtered, clampedPage, addedIds]);

  const toggleResult = (id: string): void => {
    setAddedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return {
    query,
    setQuery,
    results,
    currentPage: clampedPage,
    totalPages,
    setPage,
    toggleResult,
    addedIds,
  };
};
```

- [ ] **Step 2: Run typecheck**

Run: `yarn typescript` — expected: pass.

- [ ] **Step 3: Commit**

```bash
git add src/routes/_auth/release/add/-hooks/use-search-releases.ts
```

Then invoke `create-commit` skill.

---

### Task 6: Create use-manual-entry hook

**Files:**
- Create: `src/routes/_auth/release/add/-hooks/use-manual-entry.ts`

- [ ] **Step 1: Create use-manual-entry.ts**

```ts
import { useState } from 'react';

/**
 * Types
 */

export interface ManualEntryData {
  title: string;
  artist: string;
  year: string;
  genre: string;
  artworkUrl: string;
}

export interface UseManualEntryHook {
  values: ManualEntryData;
  setField: (field: keyof ManualEntryData, value: string) => void;
  isValid: boolean;
  handleSubmit: () => void;
}

const INITIAL_VALUES: ManualEntryData = {
  title: '',
  artist: '',
  year: '',
  genre: '',
  artworkUrl: '',
};

/**
 * UseManualEntry
 */

export const useManualEntry = (): UseManualEntryHook => {
  const [values, setValues] = useState<ManualEntryData>(INITIAL_VALUES);

  const setField = (field: keyof ManualEntryData, value: string): void => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const isValid = values.title.trim() !== '' && values.artist.trim() !== '';

  const handleSubmit = (): void => {
    if (!isValid) return;
    // Mock: log release data
    console.log('Release added:', values);
    setValues(INITIAL_VALUES);
  };

  return {
    values,
    setField,
    isValid,
    handleSubmit,
  };
};
```

- [ ] **Step 2: Run typecheck**

Run: `yarn typescript` — expected: pass.

- [ ] **Step 3: Commit**

```bash
git add src/routes/_auth/release/add/-hooks/use-manual-entry.ts
```

Then invoke `create-commit` skill.

---

### Task 7: Create SectionDivider component

**Files:**
- Create: `src/routes/_auth/release/add/-components/section-divider.tsx`

- [ ] **Step 1: Create section-divider.tsx**

```tsx
import type { FunctionComponent } from 'react';
import { Typography } from '#/components/ui/typography';

/**
 * Types
 */

interface SectionDividerProps {
  label: string;
}

/**
 * SectionDivider
 */

export const SectionDivider: FunctionComponent<SectionDividerProps> = ({ label }) => (
  <div className="flex items-center gap-3">
    <div className="h-px flex-1 bg-outline/15" />
    <Typography
      size="xs"
      weight="medium"
      tracking="widest"
      transform="uppercase"
      className="shrink-0 text-on-surface-variant"
    >
      {label}
    </Typography>
    <div className="h-px flex-1 bg-outline/15" />
  </div>
);
```

- [ ] **Step 2: Run typecheck**

Run: `yarn typescript` — expected: pass.

- [ ] **Step 3: Commit**

```bash
git add src/routes/_auth/release/add/-components/section-divider.tsx
```

Then invoke `create-commit` skill.

---

### Task 8: Create ArtworkPreview component

**Files:**
- Create: `src/routes/_auth/release/add/-components/artwork-preview.tsx`

- [ ] **Step 1: Create artwork-preview.tsx**

```tsx
import type { FunctionComponent } from 'react';
import { ImageIcon } from 'lucide-react';
import { Typography } from '#/components/ui/typography';

/**
 * Types
 */

interface ArtworkPreviewProps {
  imageUrl: string;
}

/**
 * ArtworkPreview
 */

export const ArtworkPreview: FunctionComponent<ArtworkPreviewProps> = ({ imageUrl }) => {
  const hasValidUrl = imageUrl.startsWith('http');

  if (hasValidUrl) {
    return (
      <div className="aspect-square w-full overflow-hidden">
        <img src={imageUrl} alt="Artwork preview" className="h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <div className="flex aspect-square w-full flex-col items-center justify-center gap-1 border-2 border-dashed border-outline/15 bg-surface-container-lowest">
      <ImageIcon className="size-6 text-on-surface-variant" />
      <Typography size="2xs" weight="medium" tracking="wider" transform="uppercase" className="text-on-surface-variant">
        PREVIEW
      </Typography>
    </div>
  );
};
```

- [ ] **Step 2: Run typecheck**

Run: `yarn typescript` — expected: pass.

- [ ] **Step 3: Commit**

```bash
git add src/routes/_auth/release/add/-components/artwork-preview.tsx
```

Then invoke `create-commit` skill.

---

### Task 9: Create Pagination component

**Files:**
- Create: `src/routes/_auth/release/add/-components/pagination.tsx`

- [ ] **Step 1: Create pagination.tsx**

```tsx
import type { FunctionComponent } from 'react';
import { Button } from '#/components/ui/button';
import { cn } from '#/lib/utils';

/**
 * Types
 */

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/**
 * Pagination
 */

export const Pagination: FunctionComponent<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const pages: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-3">
      <Button
        variant="text"
        size="icon-xs"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ‹
      </Button>
      {pages.map((page) => (
        <Button
          key={page}
          variant="text"
          onClick={() => onPageChange(page)}
          className={cn(
            'min-w-6',
            page === currentPage
              ? 'font-bold text-on-surface underline decoration-2 underline-offset-4 decoration-primary'
              : 'text-on-surface-variant',
          )}
        >
          {page}
        </Button>
      ))}
      <Button
        variant="text"
        size="icon-xs"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        ›
      </Button>
    </div>
  );
};
```

- [ ] **Step 2: Run typecheck**

Run: `yarn typescript` — expected: pass.

- [ ] **Step 3: Commit**

```bash
git add src/routes/_auth/release/add/-components/pagination.tsx
```

Then invoke `create-commit` skill.

---

### Task 10: Create ManualEntryForm component

**Files:**
- Create: `src/routes/_auth/release/add/-components/manual-entry-form.tsx`

- [ ] **Step 1: Create manual-entry-form.tsx**

```tsx
import type { FunctionComponent } from 'react';
import { Input } from '#/components/ui/input';
import { Button } from '#/components/ui/button';
import { Typography } from '#/components/ui/typography';
import { ArtworkPreview } from './artwork-preview';
import type { ManualEntryData } from '../-hooks/use-manual-entry';

/**
 * Types
 */

interface ManualEntryFormField {
  key: keyof ManualEntryData;
  label: string;
  placeholder: string;
  width: 'full' | 'half';
}

interface ManualEntryFormProps {
  values: ManualEntryData;
  onFieldChange: (field: keyof ManualEntryData, value: string) => void;
  onSubmit: () => void;
  isValid: boolean;
}

/**
 * Constants
 */

const FIELDS: ManualEntryFormField[] = [
  { key: 'title', label: 'RELEASE TITLE', placeholder: 'e.g. A Love Supreme', width: 'full' },
  { key: 'artist', label: 'ARTIST', placeholder: 'e.g. John Coltrane', width: 'full' },
  { key: 'year', label: 'RELEASE YEAR', placeholder: '1965', width: 'half' },
  { key: 'genre', label: 'GENRE', placeholder: 'Jazz', width: 'half' },
];

/**
 * ManualEntryForm
 */

export const ManualEntryForm: FunctionComponent<ManualEntryFormProps> = ({
  values,
  onFieldChange,
  onSubmit,
  isValid,
}) => (
  <div className="space-y-4">
    {FIELDS.map(({ key, label, placeholder, width }) => (
      <div key={key}>
        <Typography
          size="xs"
          weight="medium"
          tracking="widest"
          transform="uppercase"
          className="mb-1 text-on-surface-variant"
        >
          {label}
        </Typography>
        <Input
          value={values[key]}
          onChange={(e) => onFieldChange(key, e.target.value)}
          placeholder={placeholder}
        />
      </div>
    ))}

    {/* Artwork URL + Preview row */}
    <div className="flex gap-4">
      <div className="flex-1">
        <Typography
          size="xs"
          weight="medium"
          tracking="widest"
          transform="uppercase"
          className="mb-1 text-on-surface-variant"
        >
          ARTWORK URL
        </Typography>
        <Input
          value={values.artworkUrl}
          onChange={(e) => onFieldChange('artworkUrl', e.target.value)}
          placeholder="https://..."
        />
      </div>
      <div className="w-20 flex-shrink-0">
        <ArtworkPreview imageUrl={values.artworkUrl} />
      </div>
    </div>

    <Button
      variant="default"
      size="lg"
      onClick={onSubmit}
      disabled={!isValid}
      className="w-full"
    >
      SAVE
    </Button>
  </div>
);
```

- [ ] **Step 2: Run typecheck**

Run: `yarn typescript` — expected: pass.

- [ ] **Step 3: Commit**

```bash
git add src/routes/_auth/release/add/-components/manual-entry-form.tsx
```

Then invoke `create-commit` skill.

---

### Task 11: Create SearchResults component

**Files:**
- Create: `src/routes/_auth/release/add/-components/search-results.tsx`

- [ ] **Step 1: Create search-results.tsx**

Note: `SearchInput` is reusing `SearchBar` from `#/components/search-bar` directly in the page, no separate component needed. This component handles displaying the results list.

```tsx
import type { FunctionComponent } from 'react';
import { Plus, Check } from 'lucide-react';
import { AlbumRow } from '#/components/album-row';
import type { SearchResult } from '../-hooks/use-search-releases';

/**
 * Types
 */

interface SearchResultsProps {
  results: SearchResult[];
  onToggle: (id: string) => void;
}

/**
 * SearchResults
 */

export const SearchResults: FunctionComponent<SearchResultsProps> = ({
  results,
  onToggle,
}) => (
  <div className="divide-y divide-outline/15">
    {results.map((result) => (
      <AlbumRow
        key={result.id}
        thumbnail={result.thumbnail}
        title={result.title}
        artist={result.artist}
        isAdded={result.isAdded}
        actionIcon={result.isAdded ? <Check className="size-4" /> : <Plus className="size-4" />}
        onClick={() => onToggle(result.id)}
      />
    ))}
  </div>
);
```

- [ ] **Step 2: Run typecheck**

Run: `yarn typescript` — expected: pass.

- [ ] **Step 3: Commit**

```bash
git add src/routes/_auth/release/add/-components/search-results.tsx
```

Then invoke `create-commit` skill.

---

### Task 12: Rewrite release/add/index.tsx page orchestrator

**Files:**
- Rewrite: `src/routes/_auth/release/add/index.tsx`

- [ ] **Step 1: Rewrite index.tsx**

```tsx
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
```

- [ ] **Step 2: Run typecheck**

Run: `yarn typescript` — expected: pass.

- [ ] **Step 3: Commit**

```bash
git add src/routes/_auth/release/add/index.tsx
```

Then invoke `create-commit` skill.

---

### Task 13: Run full verification suite

- [ ] **Step 1: Lint**

Run: `yarn lint` — expected: no errors.

- [ ] **Step 2: TypeScript check**

Run: `yarn typescript` — expected: no errors.

- [ ] **Step 3: Tests**

Run: `yarn test` — expected: all tests pass.

- [ ] **Step 4: Build**

Run: `yarn build` — expected: builds successfully.

---

## Self-Review

**1. Spec coverage:**
- TrackRow → AlbumRow rename + new props (thumbnail required, actionIcon, isAdded) → Task 1
- SearchBar moved to global → Task 2
- Inicio updated to use AlbumRow with thumbnail → Task 3
- git mv collection/add → release/add + routing updates → Task 4
- use-search-releases hook with pagination, toggle, query filter → Task 5
- use-manual-entry hook with form state, validation → Task 6
- SectionDivider component → Task 7
- ArtworkPreview component (dashed border empty / image preview) → Task 8
- Pagination component (‹ › nav, active underline) → Task 9
- ManualEntryForm (all fields, SAVE button, artwork URL + preview row) → Task 10
- SearchResults (AlbumRow with +/✓ toggle) → Task 11
- Page orchestrator index.tsx connecting all pieces → Task 12
- Verification suite → Task 13

**2. Placeholder scan:** No TBD, TODOs, or vague steps. All code complete with exact file paths.

**3. Type consistency:** `AlbumRowProps.thumbnail` is required string, `SearchResult.thumbnail` is string — consistent. `ManualEntryData` used in both hook and form component. `SearchResult.isAdded` matches `AlbumRowProps.isAdded`. `UseSearchReleasesHook.results` uses `SearchResult[]` passed to `SearchResultsProps.results`.
