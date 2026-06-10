import { useQuery } from '@tanstack/react-query';
import { useUser } from '#/core/auth';
import { useRepositories } from '#/repositories/hooks';
import type { AlbumDetail } from '#/types/domain';

/**
 * useAlbumData
 */

export const useAlbumData = (
  id: string | undefined
): {
  album: AlbumDetail | null;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
} => {
  const { releases } = useRepositories();
  const user = useUser();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['album', id, user?.id],
    queryFn: () => releases.findById(id!, user?.id),
    enabled: !!id,
  });

  return {
    album: data ?? null,
    isLoading,
    isError,
    error: error as Error | null,
  };
};
