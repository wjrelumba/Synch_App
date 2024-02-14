'use client';
// components/Navbar.tsx

import React, { useState } from 'react';
import Link from 'next/link';
import Sidebar from './sidebar';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <nav className="flex items-center justify-between bg-gray-800 text-white p-4">
        <div className="flex items-center">
          <button className="text-white focus:outline-none" onClick={toggleSidebar}>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <line x1="4" y1="6" x2="20" y2="6" stroke="currentColor" strokeWidth="2" />
              <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="2" />
              <line x1="4" y1="18" x2="20" y2="18" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>
        <div className="flex flex-grow justify-center"> {/* Added flex-grow and justify-center */}
          <Link href="/">
            <h1 className="text-xl font-bold cursor-pointer">Synch</h1>
          </Link>
        </div>
        <div className="hidden md:block">
          <ul className="flex space-x-4">
            <li>
              <Link href="/dashboard">
                <h1 className="hover:text-gray-300 cursor-pointer">Dashboard</h1>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </div>
  );
};

export default Navbar;