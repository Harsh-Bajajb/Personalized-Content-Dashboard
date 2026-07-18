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
    <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={toggleSidebar}
          className="p-1 md:hidden text-gray-500 hover:bg-gray-100 rounded-md"
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
            value={searchTerm}
            onChange={handleSearchChange}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center ml-4">
        <button className="flex items-center gap-2 p-1 text-gray-500 hover:bg-gray-100 rounded-full md:rounded-md md:px-3 md:py-2 transition-colors">
          <User size={20} />
          <span className="hidden md:block text-sm font-medium">Profile</span>
        </button>
      </div>
    </header>
  );
}
