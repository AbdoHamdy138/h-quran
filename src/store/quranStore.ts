import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { quranApi } from '../utils/api';
import type { Surah, SurahDetail, SearchResult } from '../types/quran';

interface QuranState {
  // Data
  surahs: Surah[];
  currentSurah: SurahDetail | null;
  searchResults: SearchResult[];
  
  // Loading states
  loading: boolean;
  searchLoading: boolean;
  error: string | null;
  
  // Search state
  searchQuery: string;
  searchCount: number;
  
  // Actions
  fetchSurahs: () => Promise<void>;
  fetchSurah: (number: number) => Promise<void>;
  searchVerses: (query: string, surahNumber?: number) => Promise<void>;
  clearSearch: () => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useQuranStore = create<QuranState>()(
  persist(
    (set, get) => ({
      // Initial state
      surahs: [],
      currentSurah: null,
      searchResults: [],
      loading: false,
      searchLoading: false,
      error: null,
      searchQuery: '',
      searchCount: 0,

      // Actions
      fetchSurahs: async () => {
        const { surahs } = get();
        if (surahs.length > 0) return; // Already loaded

        set({ loading: true, error: null });
        try {
          const data = await quranApi.getSurahs();
          set({ surahs: data, loading: false });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to fetch surahs';
          set({ error: errorMessage, loading: false });
        }
      },

      fetchSurah: async (number: number) => {
        set({ loading: true, error: null });
        try {
          const data = await quranApi.getSurah(number);
          set({ currentSurah: data, loading: false });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : `Failed to fetch surah ${number}`;
          set({ error: errorMessage, loading: false, currentSurah: null });
        }
      },

      searchVerses: async (query: string, surahNumber?: number) => {
        if (!query.trim()) {
          set({ searchResults: [], searchQuery: '', searchCount: 0 });
          return;
        }

        set({ searchLoading: true, error: null, searchQuery: query });
        try {
          const response = await quranApi.searchVerses(query, surahNumber);
          set({ 
            searchResults: response.data.matches || [],
            searchCount: response.data.count || 0,
            searchLoading: false 
          });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Search failed';
          set({ 
            error: errorMessage, 
            searchLoading: false,
            searchResults: [],
            searchCount: 0
          });
        }
      },

      clearSearch: () => {
        set({ 
          searchResults: [], 
          searchQuery: '', 
          searchCount: 0,
          searchLoading: false 
        });
      },

      setError: (error: string | null) => {
        set({ error });
      },

      clearError: () => {
        set({ error: null });
      }
    }),
    {
      name: 'quran-store',
      partialize: (state) => ({
        surahs: state.surahs,
        // Don't persist loading states or errors
      }),
    }
  )
);