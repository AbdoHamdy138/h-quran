export const SURAH_NAMES = {
  1: { arabic: 'الفاتحة', english: 'Al-Fatihah', translation: 'The Opening' },
  2: { arabic: 'البقرة', english: 'Al-Baqarah', translation: 'The Cow' },
  3: { arabic: 'آل عمران', english: 'Ali \'Imran', translation: 'Family of Imran' },
  4: { arabic: 'النساء', english: 'An-Nisa', translation: 'The Women' },
  5: { arabic: 'المائدة', english: 'Al-Ma\'idah', translation: 'The Table Spread' },
  6: { arabic: 'الأنعام', english: 'Al-An\'am', translation: 'The Cattle' },
  7: { arabic: 'الأعراف', english: 'Al-A\'raf', translation: 'The Heights' },
  8: { arabic: 'الأنفال', english: 'Al-Anfal', translation: 'The Spoils of War' },
  9: { arabic: 'التوبة', english: 'At-Tawbah', translation: 'The Repentance' },
  10: { arabic: 'يونس', english: 'Yunus', translation: 'Jonah' },
  // Add more as needed - this is a sample
};

export const REVELATION_TYPES = {
  Meccan: 'مكية',
  Medinan: 'مدنية'
};

export const RECITERS = [
  { id: 'ar.alafasy', name: 'Mishary Rashid Alafasy', arabic: 'مشاري راشد العفاسي' },
  { id: 'ar.abdurrahmaansudais', name: 'Abdul Rahman Al-Sudais', arabic: 'عبد الرحمن السديس' },
  { id: 'ar.saoodshuraym', name: 'Saood bin Ibrahim Ash-Shuraym', arabic: 'سعود الشريم' },
  { id: 'ar.mahermuaiqly', name: 'Maher Al Muaiqly', arabic: 'ماهر المعيقلي' },
  { id: 'ar.hudhaify', name: 'Ali Al-Hudhaify', arabic: 'علي الحذيفي' },
];

export const DEFAULT_PREFERENCES = {
  fontSize: 18,
  theme: 'light' as const,
  language: 'en' as const,
  showTranslation: true,
  autoScroll: false,
  preferredReciter: 'ar.alafasy'
};

export const CACHE_KEYS = {
  SURAHS: 'quran_surahs',
  SURAH_DETAIL: 'quran_surah_',
  SEARCH_RESULTS: 'quran_search_',
  USER_PREFERENCES: 'quran_preferences',
  BOOKMARKS: 'quran_bookmarks',
  READING_PROGRESS: 'quran_progress'
};

export const CACHE_DURATION = {
  SURAHS: 24 * 60 * 60 * 1000, // 24 hours
  SURAH_DETAIL: 24 * 60 * 60 * 1000, // 24 hours
  SEARCH_RESULTS: 60 * 60 * 1000, // 1 hour
};

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

export const ARABIC_NUMBERS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', 'ى'];

export const PERFORMANCE_THRESHOLDS = {
  SEARCH_DEBOUNCE: 300,
  SCROLL_THROTTLE: 100,
  LAZY_LOAD_OFFSET: 200
};