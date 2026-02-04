import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { gettext } from '../utils/translations';
import logoImage from '../assets/logo.png';

export const Header = () => {
  const { language, toggleLanguage } = useLanguage();
  const { getTotalItems } = useCart();

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img 
              src={logoImage} 
              alt="RAMYAAS Logo" 
              className="h-12 w-auto"
            />
            <div>
              <h1 className="text-xl font-bold text-ramyaas-700">
                {gettext('ramyaas', language)}
              </h1>
              <p className="text-xs text-gray-500">
                {gettext('tagline', language)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* ✅ FIXED: Cart link */}
            <Link
              to="/cart"
              className="relative px-4 py-2 rounded-lg hover:bg-gray-100 transition-smooth"
            >
              <span className="text-2xl">🛒</span>
              {getTotalItems() > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            <button
              onClick={toggleLanguage}
              className="px-4 py-2 bg-ramyaas-100 text-ramyaas-700 rounded-lg font-semibold hover:bg-ramyaas-200 transition-smooth"
            >
              {language === 'ta' ? 'EN' : 'TA'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export const Navigation = () => {
  const { language } = useLanguage();

  const navItems = [
    { key: 'home', path: '/' },
    { key: 'snacks', path: '/snacks' },
    { key: 'menu', path: '/menu' },
    { key: 'catering', path: '/catering' },
    { key: 'bulkOrders', path: '/bulk-orders' },
    { key: 'reels', path: '/reels' },
    { key: 'contact', path: '/contact' },
    { key: 'admin', path: '/admin' },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-8 overflow-x-auto py-3">
          {navItems.map(item => (
            /* ✅ FIXED: NavLink instead of <a> */
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-medium whitespace-nowrap transition-smooth ${
                  isActive
                    ? 'text-ramyaas-700 font-bold'
                    : 'text-gray-600 hover:text-ramyaas-600'
                }`
              }
            >
              {gettext(item.key, language)}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export const Footer = () => {
  const { language } = useLanguage();

  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg text-ramyaas-700 mb-4">
              {gettext('ramyaas', language)}
            </h3>
            <p className="text-sm text-gray-600">
              {gettext('tagline', language)}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Links</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              {/* ✅ FIXED */}
              <li>
                <Link to="/" className="hover:text-ramyaas-600">
                  {gettext('home', language)}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-ramyaas-600">
                  {gettext('contact', language)}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Contact</h4>
            <p className="text-sm text-gray-600">
              Email: ramyakumar031998@gmail.com<br />
              Phone: +91 8248125388<br />
              WhatsApp: +91 7373105165<br />
              © 2024 RAMYAAS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
