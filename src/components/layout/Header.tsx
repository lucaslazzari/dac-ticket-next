'use client';

import { useState, useRef, useEffect } from 'react';
import { User, LogOut, ChevronDown } from 'lucide-react';

export default function Header() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    console.log('Logout');
  };

  const handleProfile = () => {
    console.log('Ir para perfil');
    setIsUserMenuOpen(false);
  };

  return (
    <header className="bg-[#134C60] text-white shadow-xl border-b border-[#1d6478]">
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#44C0CF] to-[#2a9fb0] flex items-center justify-center shadow-lg">
            <div className="w-6 h-6 rounded-md border-2 border-white"></div>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-wide">DAC</h1>
            <p className="text-xs text-[#44C0CF] font-medium">Management System</p>
          </div>
        </div>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-3 hover:bg-[#1d6478] px-4 py-2 rounded-xl transition-all group"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold">John Doe</p>
              <p className="text-xs text-gray-300">Administrator</p>
            </div>
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#44C0CF] to-[#2a9fb0] flex items-center justify-center text-white font-bold shadow-lg text-lg">
              JD
            </div>
            <ChevronDown 
              size={18} 
              className={`text-gray-300 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-2xl py-2 z-50 border border-gray-100 animate-fadeIn">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-800">John Doe</p>
                <p className="text-xs text-gray-500">john.doe@dac.com</p>
              </div>
              
              <button 
                onClick={handleProfile}
                className="w-full text-left px-4 py-3 text-gray-700 hover:bg-[#44C0CF] hover:text-white flex items-center gap-3 transition-colors group"
              >
                <User size={18} className="text-gray-400 group-hover:text-white" />
                <span className="font-medium text-sm">Profile</span>
              </button>
              
              <div className="border-t border-gray-100 mt-1 pt-1">
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors group"
                >
                  <LogOut size={18} className="text-red-500" />
                  <span className="font-medium text-sm">Log Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}