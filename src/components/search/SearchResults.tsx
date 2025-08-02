import React from 'react';
import { Link } from 'react-router-dom';
import { useQuranStore } from '../../store/quranStore';
import { highlightSearchTerm } from '../../utils/helpers';
import { formatVerseNumber } from '../../utils/helpers';
import { Loading } from '../ui/Loading';

export const SearchResults: React.FC = () => {
  const { searchResults, searchLoading, searchQuery, searchCount } = useQuranStore();

  if (searchLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loading size="lg" text="Searching verses..." />
      </div>
    );
  }

  if (!searchQuery) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 mb-4">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Search the Quran</h3>
        <p className="text-gray-600">
          Enter at least 2 characters to search for verses in Arabic or English
        </p>
      </div>
    );
  }

  if (searchResults.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 mb-4">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 17H9v-2.5A6.002 6.002 0 003 9a6.002 6.002 0 006-6h6a6.002 6.002 0 006 6 6.002 6.002 0 00-6 8.5V17z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
        <p className="text-gray-600">
          No verses found for "{searchQuery}". Try different keywords or check your spelling.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          Search Results
        </h2>
        <span className="text-sm text-gray-600">
          {searchCount} result{searchCount !== 1 ? 's' : ''} for "{searchQuery}"
        </span>
      </div>

      {/* Results list */}
      <div className="space-y-4">
        {searchResults.map((result, index) => (
          <SearchResultCard
            key={`${result.surah.number}-${result.ayah.number}-${index}`}
            result={result}
            searchQuery={searchQuery}
          />
        ))}
      </div>
    </div>
  );
};

interface SearchResultCardProps {
  result: any;
  searchQuery: string;
}

const SearchResultCard: React.FC<SearchResultCardProps> = ({ result, searchQuery }) => {
  return (
    <Link
      to={`/surahs/${result.surah.number}#ayah-${result.ayah.numberInSurah}`}
      className="block card p-6 hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="verse-number">
            {result.ayah.numberInSurah}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              {result.surah.englishName}
            </h3>
            <p className="text-sm text-gray-600">
              Surah {result.surah.number} • Verse {result.ayah.numberInSurah}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-arabic text-gray-700 mb-1">
            {result.surah.name}
          </div>
          <div className="text-sm text-gray-500">
            {formatVerseNumber(result.ayah.numberInSurah)}
          </div>
        </div>
      </div>

      <div className="arabic-text text-gray-800 mb-4 leading-loose">
        <div
          dangerouslySetInnerHTML={{
            __html: highlightSearchTerm(result.ayah.text, searchQuery)
          }}
        />
      </div>

      {/* Translation would go here if available */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>Click to view in context</span>
        <span>Match score: {Math.round((result.matchScore || 0) * 100)}%</span>
      </div>
    </Link>
  );
};