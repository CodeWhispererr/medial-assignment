import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Feed', path: '/posts' },
    { name: 'Create Post', path: '/' },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white fixed top-0 left-0 right-0 shadow-md z-50">
      <nav className="container mx-auto px-4 max-md:py-4 flex justify-between items-center">
        <Link to="/posts" className="text-2xl font-bold text-[#705C99] md:ml-16">
          Medial.
        </Link>
        
        <div className="md:hidden">
          {isMenuOpen ? (
            <CloseOutlined onClick={toggleMenu} className="text-2xl cursor-pointer" />
          ) : (
            <MenuOutlined onClick={toggleMenu} className="text-2xl cursor-pointer" />
          )}
        </div>
        
        <ul className={`md:flex md:mr-16 md:items-center absolute md:static bg-white left-0 w-full md:w-auto transition-all duration-500 ease-in ${
          isMenuOpen ? 'top-full opacity-100 visible' : 'top-[-490px] md:opacity-100 opacity-0 invisible md:visible'
        }`}>
          {navItems.map((item) => (
            <li key={item.path} className={`text-xl py-4 px-4 text-center font-semibold ${location.pathname === item.path ? 'bg-[#ece3febc]' : ''}`}>
              <Link
                to={item.path}
                className={`text-gray-800 hover:text-[#705C99] duration-500`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;