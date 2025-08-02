export interface User {
  id: string;
  email: string;
  displayName?: string;
  createdAt: string;
}

export interface UserProfile extends User {
  preferences: UserPreferences;
  bookmarks: Bookmark[];
  readingProgress: ReadingProgress[];
}

export interface UserPreferences {
  fontSize: number;
  theme: 'light' | 'dark';
  language: 'en' | 'ar';
  showTranslation: boolean;
  autoScroll: boolean;
  preferredReciter: string;
}

export interface Bookmark {
  id: string;
  surahNumber: number;
  ayahNumber: number;
  note?: string;
  createdAt: string;
}

export interface ReadingProgress {
  surahNumber: number;
  ayahNumber: number;
  lastReadAt: string;
}