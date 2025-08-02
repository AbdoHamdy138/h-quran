import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Bookmark, ReadingProgress, UserPreferences } from '../types/user';
import { DEFAULT_PREFERENCES } from '../utils/constants';
import { generateId } from '../utils/helpers';

interface UserState {
  // User data
  bookmarks: Bookmark[];
  readingProgress: ReadingProgress[];
  preferences: UserPreferences;
  
  // Actions
  addBookmark: (surahNumber: number, ayahNumber: number, note?: string) => void;
  removeBookmark: (id: string) => void;
  updateBookmark: (id: string, note: string) => void;
  isBookmarked: (surahNumber: number, ayahNumber: number) => boolean;
  getBookmark: (surahNumber: number, ayahNumber: number) => Bookmark | undefined;
  
  updateProgress: (surahNumber: number, ayahNumber: number) => void;
  getProgress: (surahNumber: number) => ReadingProgress | undefined;
  
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  resetPreferences: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      // Initial state
      bookmarks: [],
      readingProgress: [],
      preferences: DEFAULT_PREFERENCES,

      // Bookmark actions
      addBookmark: (surahNumber: number, ayahNumber: number, note?: string) => {
        const { bookmarks } = get();
        const existingBookmark = bookmarks.find(
          b => b.surahNumber === surahNumber && b.ayahNumber === ayahNumber
        );

        if (existingBookmark) return; // Already bookmarked

        const newBookmark: Bookmark = {
          id: generateId(),
          surahNumber,
          ayahNumber,
          note,
          createdAt: new Date().toISOString()
        };

        set({ bookmarks: [...bookmarks, newBookmark] });
      },

      removeBookmark: (id: string) => {
        const { bookmarks } = get();
        set({ bookmarks: bookmarks.filter(b => b.id !== id) });
      },

      updateBookmark: (id: string, note: string) => {
        const { bookmarks } = get();
        set({
          bookmarks: bookmarks.map(b => 
            b.id === id ? { ...b, note } : b
          )
        });
      },

      isBookmarked: (surahNumber: number, ayahNumber: number) => {
        const { bookmarks } = get();
        return bookmarks.some(
          b => b.surahNumber === surahNumber && b.ayahNumber === ayahNumber
        );
      },

      getBookmark: (surahNumber: number, ayahNumber: number) => {
        const { bookmarks } = get();
        return bookmarks.find(
          b => b.surahNumber === surahNumber && b.ayahNumber === ayahNumber
        );
      },

      // Reading progress actions
      updateProgress: (surahNumber: number, ayahNumber: number) => {
        const { readingProgress } = get();
        const existingProgress = readingProgress.find(p => p.surahNumber === surahNumber);

        const newProgress: ReadingProgress = {
          surahNumber,
          ayahNumber,
          lastReadAt: new Date().toISOString()
        };

        if (existingProgress) {
          set({
            readingProgress: readingProgress.map(p =>
              p.surahNumber === surahNumber ? newProgress : p
            )
          });
        } else {
          set({ readingProgress: [...readingProgress, newProgress] });
        }
      },

      getProgress: (surahNumber: number) => {
        const { readingProgress } = get();
        return readingProgress.find(p => p.surahNumber === surahNumber);
      },

      // Preferences actions
      updatePreferences: (newPreferences: Partial<UserPreferences>) => {
        const { preferences } = get();
        set({ preferences: { ...preferences, ...newPreferences } });
      },

      resetPreferences: () => {
        set({ preferences: DEFAULT_PREFERENCES });
      }
    }),
    {
      name: 'user-store',
    }
  )
);