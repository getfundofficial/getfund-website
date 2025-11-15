import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useScrollDirection } from '../hooks/useScrollDirection';

interface NavItem {
  name: string;
  href: string;
  onClick?: (e: React.MouseEvent) => void;
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { scrollDirection, isScrolled } = useScrollDirection(100);

  // Hide header when scrolling down and scrolled past threshold
  const shouldHideHeader = scrollDirection === 'down' && isScrolled;

  // No special scroll handler anymore - 'What We Do' is a dedicated page at /what-we-do

  const navItems: NavItem[] = [
    { name: 'Who We Are', href: '/who-we-are' },
    { name: 'What We Do', href: '/what-we-do' },
    { name: 'Impact', href: '/impact' },
    { name: 'News & Updates', href: '/news' },
    { name: 'Resources', href: '/resources' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 bg-white shadow-lg z-50 border-b border-gray-100 transition-transform duration-300 ease-in-out ${
      shouldHideHeader ? '-translate-y-full' : 'translate-y-0'
    }`}>
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img 
            src="/images/logos/GETFund logo_200cm Wide -  Black.png" 
            alt="Ghana Education Trust Fund" 
            className="h-20 md:h-24 lg:h-28 w-auto object-contain max-w-[600px]"
          />
        </Link>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <ul className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <li key={item.name}>
              {/* Highlight active nav item based on pathname */}
              {item.href.startsWith('#') || item.href.startsWith('/#') ? (
                <a
                  href={item.href}
                  className={`${
                    location.pathname === '/' && item.href.includes('#') ? 'text-getfund-primary font-semibold' : 'text-getfund-secondary'
                  } hover:text-getfund-primary font-medium transition-colors text-sm uppercase tracking-wide whitespace-nowrap`}
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  to={item.href}
                  className={`${
                    location.pathname.startsWith(item.href) ? 'text-getfund-primary font-semibold' : 'text-getfund-secondary'
                  } hover:text-getfund-primary font-medium transition-colors text-sm uppercase tracking-wide whitespace-nowrap`}
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
          <li className="relative group">
            <Link
              to="/support-us"
              className="bg-green-600 text-white px-6 py-2 rounded-sm font-semibold hover:bg-green-700 transition-colors text-sm uppercase tracking-wide"
            >
              Support Us
            </Link>
            <div className="absolute left-0 mt-2 hidden group-hover:block z-50">
              <a
                href="https://donate.getfund.gov.gh/"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white text-getfund-secondary px-6 py-2 rounded-b-sm font-semibold hover:bg-green-100 transition-colors text-sm uppercase tracking-wide whitespace-nowrap shadow-lg border border-gray-200"
              >
                Donate
              </a>
            </div>
          </li>
          <li>
            <Link
              to="/contact"
              className="bg-getfund-gold text-white px-6 py-2 rounded-sm font-semibold hover:bg-yellow-600 transition-colors text-sm uppercase tracking-wide"
            >
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-lg md:hidden">
            <ul className="py-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  {item.href.startsWith('#') || item.href.startsWith('/#') ? (
                    <a
                      href={item.href}
                      className="block px-4 py-3 text-getfund-secondary hover:text-getfund-primary hover:bg-gray-50 font-medium transition-colors text-sm uppercase tracking-wide"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      to={item.href}
                      className={`block px-4 py-3 ${location.pathname.startsWith(item.href) ? 'text-getfund-primary font-semibold' : 'text-getfund-secondary'} hover:text-getfund-primary hover:bg-gray-50 font-medium transition-colors text-sm uppercase tracking-wide`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
              <li className="relative">
                <div className="flex flex-col items-center">
                  <Link
                    to="/support-us"
                    className="block mx-4 mt-2 bg-green-600 text-white px-6 py-3 rounded-sm font-semibold hover:bg-green-700 transition-colors text-sm uppercase tracking-wide text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Support Us
                  </Link>
                  <a
                    href="https://donate.getfund.gov.gh/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mx-4 bg-white text-getfund-secondary px-6 py-3 rounded-b-sm font-semibold hover:bg-green-100 transition-colors text-sm uppercase tracking-wide text-center border border-gray-200"
                    style={{ marginTop: '-4px' }}
                  >
                    Donate
                  </a>
                </div>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="block mx-4 mt-2 bg-getfund-gold text-white px-6 py-3 rounded-sm font-semibold hover:bg-yellow-600 transition-colors text-sm uppercase tracking-wide text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
