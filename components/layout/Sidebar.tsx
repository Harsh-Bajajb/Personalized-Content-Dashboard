'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, TrendingUp, Heart, Settings, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Feed', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Trending', href: '/dashboard/trending', icon: TrendingUp },
    { name: 'Favorites', href: '/dashboard/favorites', icon: Heart },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:flex-shrink-0 flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            My App
          </h1>
          <button
            onClick={toggleSidebar}
            className="p-1 md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Close Sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto" aria-label="Sidebar Navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                onClick={() => setIsOpen(false)} // Close on mobile navigation
              >
                <Icon
                  size={20}
                  className={
                    isActive
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-500 dark:text-gray-400'
                  }
                />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
