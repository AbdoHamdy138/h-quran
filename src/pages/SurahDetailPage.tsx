import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';
import { useQuranStore } from '../store/quranStore';
import { useUserStore } from '../store/userStore';
import { VerseDisplay } from '../components/quran/VerseDisplay';
import { Loading, VerseCardSkeleton } from '../components/ui/Loading';
import { Button } from '../components/ui/Button';
import { showToast } from '../components/ui/Toast';
import { REVELATION_TYPES } from '../utils/constants';
import { formatArabicNumber } from '../utils/helpers';

export const SurahDetailPage: React.FC = () => {
  const { number } = useParams<{ number: string }>();
  const surahNumber = parseInt(number || '1', 10);
  
  const { currentSurah, loading, error, fetchSurah } = useQuranStore();
  const { updateProgress } = useUserStore();

  useEffect(() => {
    if (surahNumber >= 1 && surahNumber <= 114) {
      fetchSurah(surahNumber);
    }
  }, [surahNumber, fetchSurah]);

  useEffect(() => {
    if (error) {
      showToast.error(error);
    }
  }, [error]);

  // Auto-scroll to specific ayah if hash is present
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && currentSurah) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, [currentSurah]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4 loading-shimmer" />
          <div className="h-4 bg-gray-200 rounded w-1/4 loading-shimmer" />
        </div>
        <div className="space-y-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <VerseCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error || !currentSurah) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to load surah</h3>
          <p className="text-gray-600 mb-4">{error || 'Surah not found'}</p>
          <div className="space-x-4">
            <Button onClick={() => fetchSurah(surahNumber)}>
              Try Again
            </Button>
            <Link to="/surahs">
              <Button variant="secondary">
                Back to Surahs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const prevSurah = surahNumber > 1 ? surahNumber - 1 : null;
  const nextSurah = surahNumber < 114 ? surahNumber + 1 : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        <Link to="/" className="hover:text-primary-600 transition-colors">
          <HomeIcon className="w-4 h-4" />
        </Link>
        <span>/</span>
        <Link to="/surahs" className="hover:text-primary-600 transition-colors">
          Surahs
        </Link>
        <span>/</span>
        <span className="text-gray-900">{currentSurah.englishName}</span>
      </nav>

      {/* Surah Header */}
      <div className="card p-8 mb-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
            {formatArabicNumber(currentSurah.number)}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {currentSurah.englishName}
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            {currentSurah.englishNameTranslation}
          </p>
        </div>

        <div className="text-4xl font-arabic text-gray-800 mb-6">
          {currentSurah.name}
        </div>

        <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <span className="font-medium">Verses:</span>
            <span>{currentSurah.numberOfAyahs}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-medium">Type:</span>
            <span className="capitalize">{currentSurah.revelationType}</span>
            <span className="text-xs">
              ({REVELATION_TYPES[currentSurah.revelationType as keyof typeof REVELATION_TYPES]})
            </span>
          </div>
        </div>
      </div>

      {/* Bismillah (except for Surah At-Tawbah) */}
      {currentSurah.number !== 9 && (
        <div className="card p-6 mb-8 text-center">
          <div className="text-2xl font-arabic text-gray-800 leading-loose">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>
          <div className="text-sm text-gray-600 mt-2">
            In the name of Allah, the Most Gracious, the Most Merciful
          </div>
        </div>
      )}

      {/* Verses */}
      <div className="space-y-6 mb-12">
        {currentSurah.ayahs.map((ayah: any) => (
          <VerseDisplay
            key={ayah.number}
            ayah={ayah}
            surahName={currentSurah.englishName}
            surahNumber={currentSurah.number}
            showActions={true}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        {prevSurah ? (
          <Link to={`/surahs/${prevSurah}`}>
            <Button variant="outline" className="flex items-center space-x-2">
              <ChevronLeftIcon className="w-4 h-4" />
              <span>Previous Surah</span>
            </Button>
          </Link>
        ) : (
          <div />
        )}

        <Link to="/surahs">
          <Button variant="secondary">
            All Surahs
          </Button>
        </Link>

        {nextSurah ? (
          <Link to={`/surahs/${nextSurah}`}>
            <Button variant="outline" className="flex items-center space-x-2">
              <span>Next Surah</span>
              <ChevronRightIcon className="w-4 h-4" />
            </Button>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};