import axios from 'axios';
import type { ApiResponse, Surah, SurahDetail, SearchResponse } from '../types/quran';

const API_BASE_URL = 'https://api.alquran.cloud/v1';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Response Error:', error);
    if (error.response?.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }
    if (error.response?.status >= 500) {
      throw new Error('Server error. Please try again later.');
    }
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please check your connection.');
    }
    throw error;
  }
);

export const quranApi = {
  // Get all surahs
  async getSurahs(): Promise<Surah[]> {
    try {
      const response = await api.get<ApiResponse<Surah[]>>('/surah');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching surahs:', error);
      throw new Error('Failed to fetch surahs');
    }
  },

  // Get specific surah with verses
  async getSurah(number: number): Promise<SurahDetail> {
    try {
      const response = await api.get<ApiResponse<SurahDetail>>(`/surah/${number}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching surah ${number}:`, error);
      throw new Error(`Failed to fetch surah ${number}`);
    }
  },

  // Search verses
  async searchVerses(query: string, surah?: number): Promise<SearchResponse> {
    try {
      const searchUrl = surah 
        ? `/search/${encodeURIComponent(query)}/${surah}`
        : `/search/${encodeURIComponent(query)}/all`;
      
      const response = await api.get<ApiResponse<SearchResponse['data']>>(searchUrl);
      return { data: response.data.data };
    } catch (error) {
      console.error('Error searching verses:', error);
      throw new Error('Failed to search verses');
    }
  },

  // Get random ayah
  async getRandomAyah(): Promise<any> {
    try {
      const response = await api.get('/ayah/random');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching random ayah:', error);
      throw new Error('Failed to fetch random ayah');
    }
  }
};

export default api;