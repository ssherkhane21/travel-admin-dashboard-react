
import React from 'react';
import { Menu, Bell, User } from 'lucide-react';

const Header = ({ setIsSidebarOpen }) => {
  return (
    <header className="bg-white border-b h-16 fixed top-0 right-0 left-0 md:left-64 z-30">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center">
          <button
            className="p-1 mr-4 rounded-md hover:bg-gray-100 focus:outline-none md:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-1 rounded-full hover:bg-gray-100 relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
              <User size={16} />
            </div>
            <div className="ml-2 hidden md:block">
              <p className="text-sm font-medium">Admin User</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
