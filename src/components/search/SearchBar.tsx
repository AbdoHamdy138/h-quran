import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useQuranStore } from '../../store/quranStore';
import { debounce } from '../../utils/helpers';
import { Button } from '../ui/Button';

export const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const { searchVerses, clearSearch, searchLoading } = useQuranStore();

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      if (searchQuery.trim().length >= 2) {
        searchVerses(searchQuery);
      } else {
        clearSearch();
      }
    }, 300),
    [searchVerses, clearSearch]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim().length >= 2) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleClear = () => {
    setQuery('');
    clearSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className={`relative transition-all duration-200 ${
        isFocused ? 'ring-2 ring-primary-500 ring-opacity-50' : ''
      }`}>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>
        
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search verses in Arabic or English..."
          className="block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg bg-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
          dir="auto"
        />

        <div className="absolute inset-y-0 right-0 flex items-center">
          {searchLoading && (
            <div className="mr-3">
              <div className="w-4 h-4 animate-spin rounded-full border-2 border-gray-300 border-t-primary-600" />
            </div>
          )}
          
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="mr-1 p-1 hover:bg-gray-100"
            >
              <XMarkIcon className="w-4 h-4 text-gray-400" />
            </Button>
          )}
        </div>
      </div>

      {/* Search suggestions could go here */}
      {query.length >= 2 && isFocused && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-3 text-sm text-gray-600">
            Press Enter to search for "{query}"
          </div>
        </div>
      )}
    </form>
  );
};