import { useState, useCallback } from 'react';
import { JournalEntry } from '@/context/JournalContext';

export function useJournalStorage() {
  const [storageError, setStorageError] = useState<string | null>(null);

  // Get saved entries from localStorage
  const getSavedEntries = useCallback((): JournalEntry[] => {
    try {
      const savedEntries = localStorage.getItem('journal_entries');
      return savedEntries ? JSON.parse(savedEntries) : [];
    } catch (error) {
      console.error('Error retrieving journal entries:', error);
      setStorageError('Failed to load your journal entries. Local storage might be unavailable.');
      return [];
    }
  }, []);

  // Save entries to localStorage
  const saveEntries = useCallback((entries: JournalEntry[]): void => {
    try {
      localStorage.setItem('journal_entries', JSON.stringify(entries));
      setStorageError(null);
    } catch (error) {
      console.error('Error saving journal entries:', error);
      setStorageError('Failed to save your journal entries. Local storage might be full or unavailable.');
    }
  }, []);

  // Clear all entries from localStorage
  const clearEntries = useCallback((): void => {
    try {
      localStorage.removeItem('journal_entries');
      setStorageError(null);
    } catch (error) {
      console.error('Error clearing journal entries:', error);
      setStorageError('Failed to clear your journal entries.');
    }
  }, []);

  return {
    getSavedEntries,
    saveEntries,
    clearEntries,
    storageError
  };
}
