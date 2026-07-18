'use client';

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // In a real app, you might lift search state to Redux or a Context if many
  // nested routes need it, but for now we can provide it via React Context
  // or simply let individual pages handle their own search input if they need to.
  // We'll leave the prop wiring here for future expansion.

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        <Header toggleSidebar={toggleSidebar} onSearch={(term) => console.log('Search:', term)} />

        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
