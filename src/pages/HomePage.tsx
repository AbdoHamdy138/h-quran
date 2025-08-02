import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpenIcon, MagnifyingGlassIcon, BookmarkIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { useQuranStore } from '../store/quranStore';
import { useUserStore } from '../store/userStore';
import { quranApi } from '../utils/api';
import { Button } from '../components/ui/Button';
import { SearchBar } from '../components/search/SearchBar';
import { VerseDisplay } from '../components/quran/VerseDisplay';
import { Loading } from '../components/ui/Loading';

export const HomePage: React.FC = () => {
  const [randomAyah, setRandomAyah] = useState<any>(null);
  const [loadingRandom, setLoadingRandom] = useState(false);
  const { surahs, fetchSurahs } = useQuranStore();
  const { bookmarks, readingProgress } = useUserStore();

  useEffect(() => {
    fetchSurahs();
    fetchRandomAyah();
  }, [fetchSurahs]);

  const fetchRandomAyah = async () => {
    setLoadingRandom(true);
    try {
      const ayah = await quranApi.getRandomAyah();
      setRandomAyah(ayah);
    } catch (error) {
      console.error('Failed to fetch random ayah:', error);
    } finally {
      setLoadingRandom(false);
    }
  };

  const recentlyRead = readingProgress
    .sort((a, b) => new Date(b.lastReadAt).getTime() - new Date(a.lastReadAt).getTime())
    .slice(0, 3);

  const featuredSurahs = surahs.slice(0, 6);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-primary-600 to-emerald-600 bg-clip-text text-transparent">
                Holy Quran
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Read, search, and study the Holy Quran with a modern, accessible interface. 
              Discover the beauty and wisdom of Allah's words.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <SearchBar />
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link
              to="/surahs"
              className="group p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
            >
              <BookOpenIcon className="w-12 h-12 text-primary-600 mx-auto mb-4 group-hover:scale-110 transition-transform duration-200" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Browse Surahs</h3>
              <p className="text-gray-600">Explore all 114 chapters of the Quran</p>
            </Link>

            <Link
              to="/search"
              className="group p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
            >
              <MagnifyingGlassIcon className="w-12 h-12 text-emerald-600 mx-auto mb-4 group-hover:scale-110 transition-transform duration-200" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Search Verses</h3>
              <p className="text-gray-600">Find specific verses in Arabic or English</p>
            </Link>

            <Link
              to="/bookmarks"
              className="group p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
            >
              <BookmarkIcon className="w-12 h-12 text-purple-600 mx-auto mb-4 group-hover:scale-110 transition-transform duration-200" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">My Bookmarks</h3>
              <p className="text-gray-600">Access your saved verses and notes</p>
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Random Verse Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <SparklesIcon className="w-8 h-8 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Verse of the Moment</h2>
            </div>
            <Button
              variant="outline"
              onClick={fetchRandomAyah}
              loading={loadingRandom}
              size="sm"
            >
              New Verse
            </Button>
          </div>

          {loadingRandom ? (
            <div className="flex justify-center py-12">
              <Loading size="lg" text="Loading verse..." />
            </div>
          ) : randomAyah ? (
            <VerseDisplay
              ayah={randomAyah}
              surahName={randomAyah.surah?.englishName || 'Unknown'}
              surahNumber={randomAyah.surah?.number || 1}
              showActions={true}
            />
          ) : null}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Recently Read */}
          {recentlyRead.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Continue Reading</h2>
              <div className="space-y-4">
                {recentlyRead.map((progress) => {
                  const surah = surahs.find(s => s.number === progress.surahNumber);
                  if (!surah) return null;

                  return (
                    <Link
                      key={progress.surahNumber}
                      to={`/surahs/${progress.surahNumber}#ayah-${progress.ayahNumber}`}
                      className="block card p-4 hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">{surah.englishName}</h3>
                          <p className="text-sm text-gray-600">
                            Continue from verse {progress.ayahNumber}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-arabic text-gray-700">{surah.name}</div>
                          <div className="text-xs text-gray-500">
                            {Math.round((progress.ayahNumber / surah.numberOfAyahs) * 100)}% complete
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* Featured Surahs */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Featured Surahs</h2>
              <Link to="/surahs" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View all →
              </Link>
            </div>
            <div className="space-y-4">
              {featuredSurahs.map((surah) => (
                <Link
                  key={surah.number}
                  to={`/surahs/${surah.number}`}
                  className="block card p-4 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {surah.number}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{surah.englishName}</h3>
                        <p className="text-sm text-gray-600">{surah.numberOfAyahs} verses</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-arabic text-gray-700">{surah.name}</div>
                      <div className="text-xs text-gray-500 capitalize">{surah.revelationType}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* Stats Section */}
        {(bookmarks.length > 0 || readingProgress.length > 0) && (
          <section className="mt-16 p-8 bg-gradient-to-r from-primary-50 to-emerald-50 rounded-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Your Progress</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-2">{bookmarks.length}</div>
                <div className="text-gray-600">Bookmarked Verses</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-600 mb-2">{readingProgress.length}</div>
                <div className="text-gray-600">Surahs Started</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {Math.round((readingProgress.length / 114) * 100)}%
                </div>
                <div className="text-gray-600">Quran Explored</div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};