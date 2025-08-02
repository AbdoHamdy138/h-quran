import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuranStore } from '../../store/quranStore';
import { useUserStore } from '../../store/userStore';
import { formatArabicNumber } from '../../utils/helpers';
import { REVELATION_TYPES } from '../../utils/constants';
import { Loading, SurahCardSkeleton } from '../ui/Loading';
import { showToast } from '../ui/Toast';

export const SurahList: React.FC = () => {
  const { surahs, loading, error, fetchSurahs } = useQuranStore();
  const { getProgress } = useUserStore();

  useEffect(() => {
    fetchSurahs();
  }, [fetchSurahs]);

  useEffect(() => {
    if (error) {
      showToast.error(error);
    }
  }, [error]);

  if (loading && surahs.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <SurahCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error && surahs.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to load surahs</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchSurahs}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          All Surahs
        </h1>
        <p className="text-gray-600">
          Browse all 114 chapters of the Holy Quran
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {surahs.map((surah) => (
          <SurahCard
            key={surah.number}
            surah={surah}
            progress={getProgress(surah.number)}
          />
        ))}
      </div>
    </div>
  );
};

interface SurahCardProps {
  surah: any;
  progress?: any;
}

const SurahCard: React.FC<SurahCardProps> = ({ surah, progress }) => {
  return (
    <Link
      to={`/surahs/${surah.number}`}
      className="card p-6 hover:shadow-lg transition-all duration-200 group"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
            {formatArabicNumber(surah.number)}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
              {surah.englishName}
            </h3>
            <p className="text-sm text-gray-600">
              {surah.englishNameTranslation}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xl font-arabic text-gray-700 mb-1">
            {surah.name}
          </div>
          <div className="text-xs text-gray-500">
            {REVELATION_TYPES[surah.revelationType as keyof typeof REVELATION_TYPES]}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>{surah.numberOfAyahs} verses</span>
        <span className="capitalize">{surah.revelationType}</span>
      </div>

      {progress && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>Progress</span>
            <span>Verse {progress.ayahNumber}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-gradient-to-r from-primary-600 to-emerald-600 h-1.5 rounded-full transition-all duration-300"
              style={{
                width: `${(progress.ayahNumber / surah.numberOfAyahs) * 100}%`
              }}
            />
          </div>
        </div>
      )}
    </Link>
  );
};