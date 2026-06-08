import type { SupabaseClient } from '@supabase/supabase-js';
import type { ArtistsRepository } from '../types';

/**
 * SupabaseArtistsRepository
 */

export class SupabaseArtistsRepository implements ArtistsRepository {
  private supabase: SupabaseClient;

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase;
  }

  async findByName(name: string): Promise<string | null> {
    const { data, error } = await this.supabase
      .from('artists')
      .select('id')
      .ilike('name', name)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data?.id ?? null;
  }

  async create(name: string): Promise<string> {
    const { data, error } = await this.supabase
      .from('artists')
      .insert({ name })
      .select('id')
      .single();

    if (error) {
      throw error;
    }

    return data.id;
  }
}
