export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: 'Meccan' | 'Medinan';
}

export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean | { id: number; recommended: boolean; obligatory: boolean };
}

export interface SurahDetail extends Surah {
  ayahs: Ayah[];
}

export interface SearchResult {
  surah: {
    number: number;
    name: string;
    englishName: string;
  };
  ayah: {
    number: number;
    text: string;
    numberInSurah: number;
  };
  matchScore: number;
}

export interface SearchResponse {
  data: {
    matches: SearchResult[];
    count: number;
  };
}

export interface ApiResponse<T> {
  code: number;
  status: string;
  data: T;
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

export interface UserPreferences {
  fontSize: number;
  theme: 'light' | 'dark';
  language: 'en' | 'ar';
  showTranslation: boolean;
  autoScroll: boolean;
}