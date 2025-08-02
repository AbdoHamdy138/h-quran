import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import { useUserStore } from '../store/userStore';
import { useQuranStore } from '../store/quranStore';
import { getRelativeTime, formatVerseNumber } from '../utils/helpers';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { showToast } from '../components/ui/Toast';

export const BookmarksPage: React.FC = () => {
  const { bookmarks, removeBookmark, updateBookmark } = useUserStore();
  const { surahs } = useQuranStore();
  const [editingBookmark, setEditingBookmark] = useState<string | null>(null);
  const [editNote, setEditNote] = useState('');

  const handleEditNote = (bookmarkId: string, currentNote: string = '') => {
    setEditingBookmark(bookmarkId);
    setEditNote(currentNote);
  };

  const handleSaveNote = () => {
    if (editingBookmark) {
      updateBookmark(editingBookmark, editNote.trim());
      setEditingBookmark(null);
      setEditNote('');
      showToast.success('Note updated');
    }
  };

  const handleDeleteBookmark = (bookmarkId: string) => {
    removeBookmark(bookmarkId);
    showToast.success('Bookmark removed');
  };

  if (bookmarks.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            My Bookmarks
          </h1>
          <p className="text-gray-600">
            Save verses that inspire you for easy access later
          </p>
        </div>

        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No bookmarks yet</h3>
          <p className="text-gray-600 mb-6">
            Start bookmarking verses while reading to build your personal collection
          </p>
          <Link to="/surahs">
            <Button>Browse Surahs</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Sort bookmarks by creation date (newest first)
  const sortedBookmarks = [...bookmarks].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            My Bookmarks
          </h1>
          <p className="text-gray-600">
            {bookmarks.length} saved verse{bookmarks.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="space-y-6">
          {sortedBookmarks.map((bookmark) => {
            const surah = surahs.find(s => s.number === bookmark.surahNumber);
            if (!surah) return null;

            return (
              <div key={bookmark.id} className="card p-6">
                <div className="flex items-start justify-between mb-4">
                  <Link
                    to={`/surahs/${bookmark.surahNumber}#ayah-${bookmark.ayahNumber}`}
                    className="flex items-center space-x-3 hover:text-primary-600 transition-colors"
                  >
                    <div className="verse-number">
                      {bookmark.ayahNumber}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {surah.englishName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Surah {bookmark.surahNumber} • Verse {bookmark.ayahNumber}
                      </p>
                    </div>
                  </Link>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditNote(bookmark.id, bookmark.note)}
                      className="p-2"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteBookmark(bookmark.id)}
                      className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="text-right mb-4">
                  <div className="text-lg font-arabic text-gray-700 mb-1">
                    {surah.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {formatVerseNumber(bookmark.ayahNumber)}
                  </div>
                </div>

                {bookmark.note && (
                  <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Note:</strong> {bookmark.note}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Bookmarked {getRelativeTime(bookmark.createdAt)}</span>
                  <Link
                    to={`/surahs/${bookmark.surahNumber}#ayah-${bookmark.ayahNumber}`}
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    View in context →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Edit Note Modal */}
      <Modal
        isOpen={editingBookmark !== null}
        onClose={() => setEditingBookmark(null)}
        title="Edit Bookmark Note"
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="edit-note" className="block text-sm font-medium text-gray-700 mb-2">
              Note
            </label>
            <textarea
              id="edit-note"
              value={editNote}
              onChange={(e) => setEditNote(e.target.value)}
              placeholder="Add a personal note for this verse..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows={3}
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <Button
              variant="secondary"
              onClick={() => setEditingBookmark(null)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSaveNote}
            >
              Save Note
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};