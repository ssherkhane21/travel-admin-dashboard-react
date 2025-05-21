
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Bus, 
  Hotel, 
  Car, 
  Bike,
  ChevronDown,
  LogOut,
  Menu,
  X
} from 'lucide-react';

const MenuItem = ({ icon: Icon, title, to, isActive, hasSubmenu, isOpen, onClick, children }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const toggleSubmenu = (e) => {
    e.preventDefault();
    setSubmenuOpen(!submenuOpen);
  };

  return (
    <div className="mb-1">
      <Link
        to={to}
        className={`flex items-center px-4 py-2 rounded-md group transition-all ${
          isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
        }`}
        onClick={hasSubmenu ? toggleSubmenu : onClick}
      >
        {Icon && <Icon className="h-5 w-5 mr-3" />}
        <span className="flex-1">{title}</span>
        {hasSubmenu && (
          <ChevronDown
            className={`h-4 w-4 transition-transform ${submenuOpen ? 'transform rotate-180' : ''}`}
          />
        )}
      </Link>
      {hasSubmenu && submenuOpen && (
        <div className="pl-10 mt-1 space-y-1">
          {children}
        </div>
      )}
    </div>
  );
};

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const closeSidebar = () => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const menuItems = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      path: '/'
    },
    {
      title: 'Bus Management',
      icon: Bus,
      path: '/bus',
      submenu: [
        { title: 'Bus Operators', path: '/bus/operators' },
        { title: 'Bus Bookings', path: '/bus/bookings' }
      ]
    },
    {
      title: 'Hotel Management',
      icon: Hotel,
      path: '/hotel',
      submenu: [
        { title: 'Hotel Managers', path: '/hotel/managers' },
        { title: 'Hotel Bookings', path: '/hotel/bookings' }
      ]
    },
    {
      title: 'Taxi Management',
      icon: Car,
      path: '/taxi',
      submenu: [
        { title: 'Taxi Drivers', path: '/taxi/drivers' },
        { title: 'Taxi Bookings', path: '/taxi/bookings' }
      ]
    },
    {
      title: 'Bike Management',
      icon: Bike,
      path: '/bike',
      submenu: [
        { title: 'Bike Riders', path: '/bike/riders' },
        { title: 'Bike Bookings', path: '/bike/bookings' }
      ]
    }
  ];

  return (
    <div 
      className={`fixed top-0 left-0 h-full bg-white border-r z-40 transition-all duration-300 w-64 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b">
        <div className="flex items-center">
          <span className="text-xl font-bold text-primary">Travel Admin</span>
        </div>
        <button 
          className="p-1 rounded-md md:hidden focus:outline-none"
          onClick={() => setIsSidebarOpen(false)}
        >
          <X size={20} />
        </button>
      </div>

      <div className="py-4 px-3 overflow-y-auto h-[calc(100%-4rem)]">
        <nav>
          {menuItems.map((item, index) => (
            item.submenu ? (
              <MenuItem
                key={index}
                icon={item.icon}
                title={item.title}
                to={item.path}
                isActive={currentPath.startsWith(item.path)}
                hasSubmenu={true}
              >
                {item.submenu.map((subItem, subIndex) => (
                  <Link
                    key={subIndex}
                    to={subItem.path}
                    className={`block py-2 px-3 rounded-md ${
                      currentPath === subItem.path
                        ? 'bg-secondary font-medium'
                        : 'hover:bg-secondary/50'
                    }`}
                    onClick={closeSidebar}
                  >
                    {subItem.title}
                  </Link>
                ))}
              </MenuItem>
            ) : (
              <MenuItem
                key={index}
                icon={item.icon}
                title={item.title}
                to={item.path}
                isActive={currentPath === item.path}
                onClick={closeSidebar}
              />
            )
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
