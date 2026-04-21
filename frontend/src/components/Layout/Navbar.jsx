import { Link, useLocation } from 'react-router-dom';
import { Sprout, Menu, X, User } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import LanguageSwitcher from '../common/LanguageSwitcher';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const { t } = useLanguage();

  const navLinks = [
    { path: '/', label: t('navHome') },
    { path: '/upload', label: t('navAnalyze') },
    { path: '/dashboard', label: t('navDashboard') },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-agri-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-agri-600 rounded-xl flex items-center justify-center group-hover:bg-agri-700 transition-colors">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-agri-900 hidden sm:block">
              {t('appName')}
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? 'bg-agri-100 text-agri-800'
                    : 'text-agri-700 hover:bg-agri-50 hover:text-agri-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <LanguageSwitcher />
            <Link
              to="/?login=true"
              className="flex items-center gap-1.5 px-3 py-2 bg-agri-600 text-white text-sm font-medium rounded-lg hover:bg-agri-700 transition-colors"
            >
              <User className="w-4 h-4" />
              {t('login')}
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher />
            <button
              className="p-2 rounded-lg text-agri-700 hover:bg-agri-50"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-agri-100 animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(link.path)
                    ? 'bg-agri-100 text-agri-800'
                    : 'text-agri-700 hover:bg-agri-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/?login=true"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-agri-700 hover:bg-agri-50"
            >
              <User className="w-4 h-4" />
              {t('login')}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
