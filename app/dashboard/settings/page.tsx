'use client';

import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import { toggleDarkMode } from '../../../features/preferences/preferencesSlice';

export default function SettingsPage() {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.preferences.darkMode);

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          Settings
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Manage your account preferences.
        </p>
      </div>

      <div className="bg-white dark:bg-[#1e2332] shadow-sm rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden transition-colors">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Appearance
          </h3>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-700 dark:text-gray-200">
                Dark Mode
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Toggle dark mode for the application (mock implementation)
              </p>
            </div>
            <button
              onClick={handleToggleDarkMode}
              aria-label="Toggle Dark Mode"
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                darkMode ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  darkMode ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
