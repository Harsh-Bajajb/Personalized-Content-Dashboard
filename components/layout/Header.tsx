'use client';

import React, { useState } from 'react';
import { Menu, Search, User } from 'lucide-react';

interface HeaderProps {
  toggleSidebar: () => void;
  onSearch: (term: string) => void;
}

export default function Header({ toggleSidebar, onSearch }: HeaderProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // We are notifying the parent about the search, but we could also
  // debounce here or directly in the components that need it.
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <header aria-label="Top Header" className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
          className="p-1 md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <Menu size={24} />
        </button>

        <div className="relative max-w-md w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search feed..."
            aria-label="Search content"
            value={searchTerm}
            onChange={handleSearchChange}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md leading-5 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center ml-4">
        <button aria-label="User Profile" className="flex items-center gap-2 p-1 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full md:rounded-md md:px-3 md:py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
          <User size={20} />
          <span className="hidden md:block text-sm font-medium">Profile</span>
        </button>
      </div>
    </header>
  );
}
