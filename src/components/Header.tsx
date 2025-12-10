import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useScrollDirection } from '../hooks/useScrollDirection';
import { cmsApi, MenuItem } from '../services/cmsApi';
import DropdownMenu from './DropdownMenu';
import MobileDropdownMenu from './MobileDropdownMenu';
import ScrollProgressBar from './ScrollProgressBar';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const location = useLocation();
  const { scrollDirection, isScrolled } = useScrollDirection(50);

  const shouldHideHeader = scrollDirection === 'down' && isScrolled;

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const menuConfig = await cmsApi.getMenuConfig();
        if (menuConfig.menuItems.length > 0) {
          setMenuItems(menuConfig.menuItems);
        } else {
          // Fallback menu when backend is not available
          console.warn('Backend not available, using fallback menu');
          setMenuItems([
            { id: '1', slug: 'about', title: 'About', label: 'About' },
            { id: '2', slug: 'news', title: 'News', label: 'News' },
            {
              id: '3',
              slug: 'fundraising',
              title: 'Fundraising',
              label: 'Fundraising',
              children: [
                { id: '3-1', slug: 'fundraising-campaigns', title: 'Fundraising Campaigns', label: 'Fundraising Campaigns', parentId: '3' },
                { id: '3-2', slug: 'ways-to-donate', title: 'Ways to Donate', label: 'Ways to Donate', parentId: '3' }
              ]
            },
            { id: '4', slug: 'scholarships', title: 'Scholarships', label: 'Scholarships' },
            { id: '5', slug: 'contact', title: 'Contact', label: 'Contact' }
          ]);
        }
      } catch (error) {
        console.error('Failed to load menu:', error);
        // Fallback menu on error
        setMenuItems([
          { id: '1', slug: 'about', title: 'About', label: 'About' },
          { id: '2', slug: 'news', title: 'News', label: 'News' },
          {
            id: '3',
            slug: 'fundraising',
            title: 'Fundraising',
            label: 'Fundraising',
            children: [
              { id: '3-1', slug: 'fundraising-campaigns', title: 'Fundraising Campaigns', label: 'Fundraising Campaigns', parentId: '3' },
              { id: '3-2', slug: 'ways-to-donate', title: 'Ways to Donate', label: 'Ways to Donate', parentId: '3' }
            ]
          },
          { id: '4', slug: 'scholarships', title: 'Scholarships', label: 'Scholarships' },
          { id: '5', slug: 'contact', title: 'Contact', label: 'Contact' }
        ]);
      }
    };

    fetchMenu();
  }, []);

  return (
    <>
      <ScrollProgressBar />
      <header className={`fixed top-0 left-0 right-0 bg-white shadow-lg z-50 border-b border-gray-100 transition-transform duration-300 ease-in-out ${
        shouldHideHeader ? '-translate-y-full' : 'translate-y-0'
      }`}>
      <nav className="container mx-auto px-3 xs:px-4 sm:px-6 py-2 sm:py-3 3xl:px-8 4xl:px-12 max-w-9xl flex items-center justify-between">
        <Link to="/" className="flex items-center flex-shrink-0">
          <img
            src="/images/logos/GETFund logo_200cm Wide -  Black.png"
            alt="Ghana Education Trust Fund"
            className="h-12 xs:h-14 sm:h-16 md:h-20 lg:h-22 xl:h-24 3xl:h-28 4xl:h-32 w-auto object-contain max-w-[180px] xs:max-w-[220px] sm:max-w-[350px] md:max-w-[420px] lg:max-w-[500px] 3xl:max-w-[600px]"
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

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-2 lg:gap-3 xl:gap-4 2xl:gap-6 3xl:gap-8">
          {menuItems.map((item) => (
            item.children && item.children.length > 0 ? (
              <DropdownMenu key={item.id} item={item} />
            ) : (
              <li key={item.id}>
                <Link
                  to={`/${item.slug}`}
                  className={`${
                    location.pathname.startsWith(`/${item.slug}`) ? 'text-getfund-primary font-semibold' : 'text-getfund-secondary'
                  } hover:text-getfund-primary font-medium transition-colors text-xs lg:text-sm xl:text-base 3xl:text-lg uppercase tracking-wide whitespace-nowrap`}
                >
                  {item.label}
                </Link>
              </li>
            )
          ))}

          {/* Donate Button */}
          <li>
            <Link
              to="/fundraising/ways-to-donate"
              className="inline-flex items-center justify-center bg-getfund-gold text-white px-3 lg:px-4 xl:px-6 2xl:px-8 py-2 xl:py-2.5 3xl:py-3 rounded font-semibold hover:bg-yellow-600 transition-all text-xs lg:text-sm xl:text-base 3xl:text-lg uppercase tracking-wide whitespace-nowrap"
              title="Donate"
            >
              Donate
            </Link>
          </li>
        </ul>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-lg lg:hidden max-h-[calc(100vh-80px)] overflow-y-auto">
            <ul className="py-2 xs:py-4">
              {menuItems.map((item) => (
                item.children && item.children.length > 0 ? (
                  <MobileDropdownMenu
                    key={item.id}
                    item={item}
                    onItemClick={() => setIsMenuOpen(false)}
                  />
                ) : (
                  <li key={item.id}>
                    <Link
                      to={`/${item.slug}`}
                      className={`block px-4 py-3 ${
                        location.pathname.startsWith(`/${item.slug}`) ? 'text-getfund-primary font-semibold' : 'text-getfund-secondary'
                      } hover:text-getfund-primary hover:bg-gray-50 font-medium transition-colors text-sm uppercase tracking-wide`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              ))}
              <li>
                <Link
                  to="/fundraising/ways-to-donate"
                  className="block mx-4 mt-2 bg-getfund-gold text-white px-6 py-3 rounded-sm font-semibold hover:bg-yellow-600 transition-colors text-sm uppercase tracking-wide text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Donate
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
    </>
  );
}
