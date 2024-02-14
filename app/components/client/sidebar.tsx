// components/Sidebar.tsx

import React from 'react';
import LogoutBtn from './buttons/logout';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
  }

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <div className={`fixed inset-y-0 left-0 w-64 bg-gray-900 text-white p-4 transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className='flex justify-between'>
            <h1 className="text-xl font-bold">Synch</h1>
            <button className="text-white focus:outline-none" onClick={onClose}>
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <line x1="4" y1="6" x2="20" y2="6" stroke="currentColor" strokeWidth="2" />
                <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="2" />
                <line x1="4" y1="18" x2="20" y2="18" stroke="currentColor" strokeWidth="2" />
                </svg>
            </button>
        </div>
      <ul className="mt-4">
        <li className="mb-2">
          <a href="/user/messages" className="hover:text-gray-300">Check Messages</a>
        </li>
        <li className="mb-2">
          <a href="/createNewTeam" className="hover:text-gray-300">Create a Team</a>
        </li>
      </ul>
      <LogoutBtn />
      <div className='text-sm absolute bottom-4 left-11'>
        Elumba, De Guia &copy; 2024
      </div>
    </div>
  );
};

export default Sidebar;
