import type { SupabaseClient } from '@supabase/supabase-js';
import type { ListeningScope } from '#/types/domain';
import type { ListeningSessionsRepository } from '../types';

/**
 * SupabaseListeningSessionsRepository
 */

export class SupabaseListeningSessionsRepository
  implements ListeningSessionsRepository
{
  private supabase: SupabaseClient;

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase;
  }

  async create(data: {
    userReleaseId: string;
    scope: ListeningScope;
    durationSeconds: number | null;
  }): Promise<void> {
    const { error } = await this.supabase
      .from('listening_sessions')
      .insert({
        user_release_id: data.userReleaseId,
        scope: data.scope,
        duration_seconds: data.durationSeconds,
      });

    if (error) {
      throw error;
    }
  }
}
