/**
 * Types
 */

import type { CollectionAlbum } from '#/routes/_auth/collection/-hooks/use-collection-data';
import type {
  Album,
  HomeData,
  HomeStats,
  Track,
} from '#/routes/_auth/inicio/-hooks/use-home-data';
import type { ManualEntryData } from '#/routes/_auth/release/add/-hooks/use-manual-entry';
import type { SearchResult } from '#/routes/_auth/release/add/-hooks/use-search-releases';

export interface SearchResults {
  results: SearchResult[];
  totalPages: number;
}

export interface ReleasesRepository {
  findByQuery(
    query: string,
    page: number,
    pageSize: number
  ): Promise<SearchResults>;
}

export interface UserReleasesRepository {
  findHomeData(userId: string): Promise<HomeData>;
  findRecent(userId: string, limit: number): Promise<Album[]>;
  findAllByUser(userId: string): Promise<CollectionAlbum[]>;
  create(data: ManualEntryData): Promise<void>;
}

export interface TracksRepository {
  findRecentByUser(userId: string, limit: number): Promise<Track[]>;
}

export interface StatsRepository {
  findStats(userId: string): Promise<HomeStats>;
}

/**
 * Constants
 */

export interface Repositories {
  releases: ReleasesRepository;
  userReleases: UserReleasesRepository;
  tracks: TracksRepository;
  stats: StatsRepository;
}
