
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      
      <div className="flex-1 flex flex-col md:ml-64">
        <Header setIsSidebarOpen={setIsSidebarOpen} />
        <main className="flex-1 p-5 mt-16 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
