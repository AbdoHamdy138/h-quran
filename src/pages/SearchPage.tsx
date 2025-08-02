import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuranStore } from '../store/quranStore';
import { SearchResults } from '../components/search/SearchResults';
import { SearchBar } from '../components/search/SearchBar';

export const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { searchVerses, clearSearch } = useQuranStore();

  useEffect(() => {
    if (query.trim().length >= 2) {
      searchVerses(query);
    } else {
      clearSearch();
    }
  }, [query, searchVerses, clearSearch]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Search the Quran
        </h1>
        <div className="max-w-2xl">
          <SearchBar />
        </div>
      </div>

      <SearchResults />
    </div>
  );
};