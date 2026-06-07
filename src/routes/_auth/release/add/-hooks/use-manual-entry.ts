import { useState } from 'react';

import type { ManualEntryData } from '#/types/domain';

/**
 * Types
 */

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
    setValues(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const isValid = values.title.trim() !== '' && values.artist.trim() !== '';

  const handleSubmit = async (): Promise<void> => {
    if (!isValid) {
      return;
    }

    // TODO: create releases + user_release via repositories
    // when the Supabase schema and insert flow are finalized
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
