import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useScrollDirection } from '../hooks/useScrollDirection';
import { cmsApi, MenuItem } from '../services/cmsApi';

interface NavItem {
  name: string;
  href: string;
  onClick?: (e: React.MouseEvent) => void;
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const location = useLocation();
  const { scrollDirection, isScrolled } = useScrollDirection(100);

  // Hide header when scrolling down and scrolled past threshold
  const shouldHideHeader = scrollDirection === 'down' && isScrolled;

  // Fetch menu configuration from CMS
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const menuConfig = await cmsApi.getMenuConfig();
        setMenuItems(menuConfig.menuItems);
      } catch (error) {
        console.error('Failed to load menu:', error);
      }
    };

    fetchMenu();
  }, []);

  // Fallback menu items if CMS fails to load
  const defaultNavItems: NavItem[] = [
    { name: 'Who We Are', href: '/who-we-are' },
    { name: 'What We Do', href: '/what-we-do' },
    { name: 'Impact', href: '/impact' },
    { name: 'News & Updates', href: '/news' },
    { name: 'Resources', href: '/resources' },
    { name: 'Support Us', href: '/support-us' },
  ];

  // Use CMS menu items if available, otherwise use defaults
  const navItems: NavItem[] = menuItems.length > 0
    ? menuItems.map(item => ({
        name: item.label,
        href: `/${item.slug}`,
      }))
    : defaultNavItems;

  return (
    <header className={`fixed top-0 left-0 right-0 bg-white shadow-lg z-50 border-b border-gray-100 transition-transform duration-300 ease-in-out ${
      shouldHideHeader ? '-translate-y-full' : 'translate-y-0'
    }`}>
      <nav className="container mx-auto px-3 xs:px-4 sm:px-6 py-3 sm:py-4 3xl:px-8 4xl:px-12 max-w-9xl flex items-center justify-between">
        <Link to="/" className="flex items-center flex-shrink-0">
          <img 
            src="/images/logos/GETFund logo_200cm Wide -  Black.png" 
            alt="Ghana Education Trust Fund" 
            className="h-14 xs:h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32 3xl:h-36 4xl:h-40 w-auto object-contain max-w-[200px] xs:max-w-[250px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] 3xl:max-w-[700px]"
          />
        </Link>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 xs:p-2.5 hover:bg-gray-100 rounded-lg transition-colors touch-manipulation"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="w-6 h-6 xs:w-7 xs:h-7" /> : <Menu className="w-6 h-6 xs:w-7 xs:h-7" />}
        </button>

        {/* Desktop Navigation - Responsive */}
        <ul className="hidden lg:flex items-center gap-2 lg:gap-3 xl:gap-4 2xl:gap-6 3xl:gap-8">
          {navItems.map((item) => (
            <li key={item.name}>
              {/* Highlight active nav item based on pathname */}
              {item.href.startsWith('#') || item.href.startsWith('/#') ? (
                <a
                  href={item.href}
                  className={`${
                    location.pathname === '/' && item.href.includes('#') ? 'text-getfund-primary font-semibold' : 'text-getfund-secondary'
                  } hover:text-getfund-primary font-medium transition-colors text-xs lg:text-sm xl:text-base 3xl:text-lg uppercase tracking-wide whitespace-nowrap`}
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  to={item.href}
                  className={`${
                    location.pathname.startsWith(item.href) ? 'text-getfund-primary font-semibold' : 'text-getfund-secondary'
                  } hover:text-getfund-primary font-medium transition-colors text-xs lg:text-sm xl:text-base 3xl:text-lg uppercase tracking-wide whitespace-nowrap`}
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}

          {/* Contact Button */}
          <li>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center bg-getfund-gold text-white px-3 lg:px-4 xl:px-6 2xl:px-8 py-2 xl:py-2.5 3xl:py-3 rounded font-semibold hover:bg-yellow-600 transition-all text-xs lg:text-sm xl:text-base 3xl:text-lg uppercase tracking-wide whitespace-nowrap"
              title="Contact Us"
            >
              <span className="hidden xl:inline">Contact Us</span>
              <span className="xl:hidden">Contact</span>
            </Link>
          </li>
        </ul>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-lg lg:hidden max-h-[calc(100vh-80px)] overflow-y-auto">
            <ul className="py-2 xs:py-4">
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
