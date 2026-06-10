import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUser } from '#/core/auth';
import { useRepositories } from '#/repositories/hooks';
import type { CollectionStatus } from '#/types/domain';

/**
 * Types
 */

interface UpsertPayload {
  releaseId: string;
  status: CollectionStatus;
}

interface UseSetCollectionStatusHook {
  mutate: (payload: UpsertPayload) => void;
  isPending: boolean;
}

/**
 * useSetCollectionStatus
 */

export const useSetCollectionStatus = (): UseSetCollectionStatusHook => {
  const queryClient = useQueryClient();
  const user = useUser();
  const { userReleases } = useRepositories();

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: UpsertPayload): Promise<void> => {
      if (!user) {
        throw new Error('User not authenticated');
      }

      await userReleases.upsert({
        userId: user.id,
        releaseId: payload.releaseId,
        status: payload.status,
      });
    },
    onSuccess: (_data, payload) => {
      queryClient.invalidateQueries({
        queryKey: ['album', payload.releaseId],
      });
      queryClient.invalidateQueries({ queryKey: ['collection'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
  });

  return {
    mutate,
    isPending,
  };
};
