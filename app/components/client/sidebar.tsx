// components/Sidebar.tsx
'use client'
import React, { useEffect, useState } from 'react';
import LogoutBtn from './buttons/logout';
import Link from 'next/link';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
  }

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [messageQuantity, setMessageQuantity] = useState<any>(0)
  useEffect(() => {
    const getMessageQuantity = async () => {
      const response = await fetch('/api/getMessageQuantity')
      const result = await response.json()
      setMessageQuantity(result)
    }
    getMessageQuantity()
  }, [])
  useEffect(() => {
  }, [messageQuantity])
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
          <Link href={'/user/profile'} className="hover:text-gray-300">Profile</Link>
        </li>
        <li className="mb-2">
          <Link href={'/user/messages'} className="hover:text-gray-300">
            <div className='flex'>
              <h1>Check Messages</h1>
              {(messageQuantity > 0) && (
                <div className='bg-red-500 px-2 rounded-lg ml-2'>
                <h1>
                  {messageQuantity}
                </h1>
              </div>
              )}
            </div>
          </Link>
        </li>
        <li className="mb-2">
          <Link href={'/createNewTeam'} className='hover:text-gray-300'>Create a Team</Link>
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
