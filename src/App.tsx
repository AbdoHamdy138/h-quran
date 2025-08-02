import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { SurahListPage } from './pages/SurahListPage';
import { SurahDetailPage } from './pages/SurahDetailPage';
import { SearchPage } from './pages/SearchPage';
import { BookmarksPage } from './pages/BookmarksPage';
import { SettingsPage } from './pages/SettingsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'surahs',
        element: <SurahListPage />
      },
      {
        path: 'surahs/:number',
        element: <SurahDetailPage />
      },
      {
        path: 'search',
        element: <SearchPage />
      },
      {
        path: 'bookmarks',
        element: <BookmarksPage />
      },
      {
        path: 'settings',
        element: <SettingsPage />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;