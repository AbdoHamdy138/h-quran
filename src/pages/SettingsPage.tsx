import React from 'react';
import { useUserStore } from '../store/userStore';
import { Button } from '../components/ui/Button';
import { showToast } from '../components/ui/Toast';

export const SettingsPage: React.FC = () => {
  const { preferences, updatePreferences, resetPreferences } = useUserStore();

  const handleFontSizeChange = (size: number) => {
    updatePreferences({ fontSize: size });
    showToast.success('Font size updated');
  };

  const handleThemeChange = (theme: 'light' | 'dark') => {
    updatePreferences({ theme });
    showToast.success(`Switched to ${theme} theme`);
  };

  const handleLanguageChange = (language: 'en' | 'ar') => {
    updatePreferences({ language });
    showToast.success('Language preference updated');
  };

  const handleToggleTranslation = () => {
    updatePreferences({ showTranslation: !preferences.showTranslation });
    showToast.success(
      preferences.showTranslation ? 'Translation hidden' : 'Translation shown'
    );
  };

  const handleToggleAutoScroll = () => {
    updatePreferences({ autoScroll: !preferences.autoScroll });
    showToast.success(
      preferences.autoScroll ? 'Auto-scroll disabled' : 'Auto-scroll enabled'
    );
  };

  const handleResetSettings = () => {
    resetPreferences();
    showToast.success('Settings reset to defaults');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Settings
        </h1>
        <p className="text-gray-600">
          Customize your reading experience
        </p>
      </div>

      <div className="space-y-8">
        {/* Reading Preferences */}
        <section className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Reading Preferences
          </h2>

          <div className="space-y-6">
            {/* Font Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Arabic Text Size
              </label>
              <div className="flex items-center space-x-4">
                {[14, 16, 18, 20, 22, 24].map((size) => (
                  <button
                    key={size}
                    onClick={() => handleFontSizeChange(size)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      preferences.fontSize === size
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {size}px
                  </button>
                ))}
              </div>
              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                <div 
                  className="arabic-text text-gray-800"
                  style={{ fontSize: `${preferences.fontSize}px` }}
                >
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </div>
              </div>
            </div>

            {/* Theme */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Theme
              </label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleThemeChange('light')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    preferences.theme === 'light'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Light
                </button>
                <button
                  onClick={() => handleThemeChange('dark')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    preferences.theme === 'dark'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  disabled
                >
                  Dark (Coming Soon)
                </button>
              </div>
            </div>

            {/* Language */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Interface Language
              </label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleLanguageChange('en')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    preferences.language === 'en'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => handleLanguageChange('ar')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    preferences.language === 'ar'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  disabled
                >
                  العربية (Coming Soon)
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Display Options */}
        <section className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Display Options
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Show Translation</h3>
                <p className="text-sm text-gray-600">Display English translation below Arabic text</p>
              </div>
              <button
                onClick={handleToggleTranslation}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  preferences.showTranslation ? 'bg-primary-600' : 'bg-gray-200'
                }`}
                disabled
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    preferences.showTranslation ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Auto-scroll</h3>
                <p className="text-sm text-gray-600">Automatically scroll to next verse during audio playback</p>
              </div>
              <button
                onClick={handleToggleAutoScroll}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  preferences.autoScroll ? 'bg-primary-600' : 'bg-gray-200'
                }`}
                disabled
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    preferences.autoScroll ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </section>

        {/* Data Management */}
        <section className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Data Management
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Reset Settings</h3>
                <p className="text-sm text-gray-600">Reset all preferences to default values</p>
              </div>
              <Button
                variant="outline"
                onClick={handleResetSettings}
                size="sm"
              >
                Reset
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Export Data</h3>
                <p className="text-sm text-gray-600">Download your bookmarks and reading progress</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                disabled
              >
                Export (Coming Soon)
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Clear All Data</h3>
                <p className="text-sm text-gray-600">Remove all bookmarks and reading progress</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="text-red-600 border-red-300 hover:bg-red-50"
                disabled
              >
                Clear Data (Coming Soon)
              </Button>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            About
          </h2>

          <div className="space-y-4 text-sm text-gray-600">
            <div className="flex items-center justify-between">
              <span>Version</span>
              <span className="font-medium">1.0.0</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Data Source</span>
              <a 
                href="https://api.alquran.cloud" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-medium text-primary-600 hover:text-primary-700"
              >
                Al-Quran Cloud API
              </a>
            </div>
            <div className="flex items-center justify-between">
              <span>Last Updated</span>
              <span className="font-medium">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};