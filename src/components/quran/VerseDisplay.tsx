import React, { useState } from 'react';
import { BookmarkIcon, ShareIcon, ClipboardIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';
import { useUserStore } from '../../store/userStore';
import { formatVerseNumber, copyToClipboard, shareVerse } from '../../utils/helpers';
import { showToast } from '../ui/Toast';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';

interface VerseDisplayProps {
  ayah: any;
  surahName: string;
  surahNumber: number;
  showActions?: boolean;
}

export const VerseDisplay: React.FC<VerseDisplayProps> = ({
  ayah,
  surahName,
  surahNumber,
  showActions = true
}) => {
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [note, setNote] = useState('');
  const {
    isBookmarked,
    addBookmark,
    removeBookmark,
    getBookmark,
    updateBookmark,
    updateProgress
  } = useUserStore();

  const bookmarked = isBookmarked(surahNumber, ayah.numberInSurah);
  const existingBookmark = getBookmark(surahNumber, ayah.numberInSurah);

  const handleBookmark = () => {
    if (bookmarked) {
      if (existingBookmark) {
        removeBookmark(existingBookmark.id);
        showToast.success('Bookmark removed');
      }
    } else {
      setNote(existingBookmark?.note || '');
      setShowNoteModal(true);
    }
  };

  const handleSaveBookmark = () => {
    addBookmark(surahNumber, ayah.numberInSurah, note.trim() || undefined);
    setShowNoteModal(false);
    setNote('');
    showToast.success('Verse bookmarked');
  };

  const handleCopy = async () => {
    const text = `${ayah.text}\n\n${surahName} - Verse ${ayah.numberInSurah}`;
    const success = await copyToClipboard(text);
    if (success) {
      showToast.success('Verse copied to clipboard');
    } else {
      showToast.error('Failed to copy verse');
    }
  };

  const handleShare = async () => {
    const success = await shareVerse(surahName, ayah.numberInSurah, ayah.text);
    if (success) {
      showToast.success('Verse shared successfully');
    } else {
      showToast.error('Failed to share verse');
    }
  };

  const handleVerseClick = () => {
    updateProgress(surahNumber, ayah.numberInSurah);
  };

  return (
    <>
      <div
        id={`ayah-${ayah.numberInSurah}`}
        className="card p-6 hover:shadow-md transition-shadow duration-200 scroll-mt-20"
        onClick={handleVerseClick}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="verse-number">
            {ayah.numberInSurah}
          </div>
          
          {showActions && (
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleBookmark();
                }}
                className="p-2"
              >
                {bookmarked ? (
                  <BookmarkSolidIcon className="w-5 h-5 text-primary-600" />
                ) : (
                  <BookmarkIcon className="w-5 h-5 text-gray-400 hover:text-primary-600" />
                )}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopy();
                }}
                className="p-2"
              >
                <ClipboardIcon className="w-5 h-5 text-gray-400 hover:text-primary-600" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleShare();
                }}
                className="p-2"
              >
                <ShareIcon className="w-5 h-5 text-gray-400 hover:text-primary-600" />
              </Button>
            </div>
          )}
        </div>

        <div className="arabic-text text-gray-800 mb-4 leading-loose">
          {ayah.text} {formatVerseNumber(ayah.numberInSurah)}
        </div>

        {/* Translation would go here if available */}
        
        {existingBookmark?.note && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> {existingBookmark.note}
            </p>
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-gray-500 mt-4">
          <div className="flex items-center space-x-4">
            <span>Juz {ayah.juz}</span>
            <span>Page {ayah.page}</span>
            {ayah.sajda && (
              <span className="text-emerald-600 font-medium">Sajda</span>
            )}
          </div>
          <span>Verse {ayah.number}</span>
        </div>
      </div>

      {/* Bookmark Note Modal */}
      <Modal
        isOpen={showNoteModal}
        onClose={() => setShowNoteModal(false)}
        title="Add Bookmark Note"
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-2">
              Note (optional)
            </label>
            <textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a personal note for this verse..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows={3}
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <Button
              variant="secondary"
              onClick={() => setShowNoteModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSaveBookmark}
            >
              Save Bookmark
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};