import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@test-utils';
import { createTestRepositories } from '#/repositories/__tests__/test-repositories';
import { setRepositories } from '#/repositories/instance';
import { AddReleasePage } from '../../index';

vi.mock('@tanstack/react-router', async () => {
  const actual =
    await vi.importActual<typeof import('@tanstack/react-router')>(
      '@tanstack/react-router'
    );

  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('AddReleasePage — wiring smoke test', () => {
  it('should render the search trigger, the manual entry form, and not call musicSearch at mount', () => {
    const musicSearch = { search: vi.fn() };

    setRepositories(
      createTestRepositories({
        releases: {
          findByQuery: vi.fn(),
          create: vi.fn(),
          linkArtist: vi.fn(),
          linkGenre: vi.fn(),
          findById: vi.fn(),
        },
        musicSearch,
        artists: {
          findByName: vi.fn(),
          create: vi.fn(),
          search: vi.fn(),
        },
        genres: {
          findByName: vi.fn(),
          create: vi.fn(),
          search: vi.fn(),
        },
      })
    );

    render(<AddReleasePage />);

    expect(screen.getByText('SEARCH ALBUM')).toBeInTheDocument();
    expect(screen.getByText('OR MANUAL ENTRY')).toBeInTheDocument();
    expect(screen.getByText('SAVE')).toBeInTheDocument();
    expect(musicSearch.search).not.toHaveBeenCalled();
  });
});
