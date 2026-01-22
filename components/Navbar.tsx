
import React from 'react';
import { Page } from '../types';

interface NavbarProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
  onAdminClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onPageChange, onAdminClick }) => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white z-50 border-b border-gray-100 h-20 flex items-center justify-between px-8">
      <div 
        className="text-2xl font-bold tracking-tighter cursor-pointer select-none"
        onClick={() => onPageChange('home')}
      >
        studi_ho
      </div>
      
      <div className="flex items-center space-x-12">
        <button 
          onClick={() => onPageChange('home')}
          className={`text-sm tracking-widest uppercase transition-colors ${currentPage === 'home' ? 'font-bold' : 'text-gray-400 hover:text-black'}`}
        >
          Index
        </button>
        <button 
          onClick={() => onPageChange('records')}
          className={`text-sm tracking-widest uppercase transition-colors ${currentPage === 'records' ? 'font-bold' : 'text-gray-400 hover:text-black'}`}
        >
          Records
        </button>
        <button 
          onClick={onAdminClick}
          className="p-2 text-gray-400 hover:text-black transition-colors"
          title="Admin Mode"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
