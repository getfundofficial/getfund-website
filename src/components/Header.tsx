import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useScrollDirection } from '../hooks/useScrollDirection';
import { cmsApi, MenuItem } from '../services/cmsApi';
import DropdownMenu from './DropdownMenu';
import MobileDropdownMenu from './MobileDropdownMenu';
import ScrollProgressBar from './ScrollProgressBar';

// Default menu items (shown immediately, may be updated from CMS)
// These match the actual routes defined in App.tsx
const DEFAULT_MENU_ITEMS: MenuItem[] = [
  { id: '1', slug: 'who-we-are', title: 'Who We Are', label: 'Who We Are' },
  { id: '2', slug: 'what-we-do', title: 'What We Do', label: 'What We Do' },
  { id: '3', slug: 'impact', title: 'Our Work & Impact', label: 'Our Work & Impact' },
  { id: '4', slug: 'news', title: 'News & Updates', label: 'News & Updates' },
  { id: '5', slug: 'resources', title: 'Resources', label: 'Resources' },
  {
    id: '6',
    slug: 'fundraising',
    title: 'Fundraising',
    label: 'Fundraising',
    children: [
      { id: '6-1', slug: 'fundraising/why-fundraising', title: 'Why Fundraising?', label: 'Why Fundraising?', parentId: '6' },
      { id: '6-2', slug: 'fundraising/ways-to-donate', title: 'Ways to donate', label: 'Ways to donate', parentId: '6' },
      { id: '6-3', slug: 'fundraising-campaigns', title: 'Fundraising Campaigns', label: 'Fundraising Campaigns', parentId: '6' },
      { id: '6-4', slug: 'fundraising/partnerships', title: 'Partnerships', label: 'Partnerships', parentId: '6' },
      { id: '6-5', slug: 'fundraising/beneficiaries-give-back', title: 'Beneficiaries Give back', label: 'Beneficiaries Give back', parentId: '6' },
      { id: '6-6', slug: 'fundraising/events', title: 'Events', label: 'Events', parentId: '6' }
    ]
  }
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(DEFAULT_MENU_ITEMS);
  const location = useLocation();
  const { scrollDirection, isScrolled } = useScrollDirection(50);

  const shouldHideHeader = scrollDirection === 'down' && isScrolled;

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const menuConfig = await cmsApi.getMenuConfig();
        // Only use CMS menu if it has valid items and matches our routes
        if (menuConfig.menuItems.length > 0) {
          setMenuItems(menuConfig.menuItems);
        }
      } catch {
        // Keep using default menu items (already set in state)
      }
    };

  }, []);

  return (
    <>
      <ScrollProgressBar />
      <header className={`fixed top-0 left-0 right-0 glass-header z-50 transition-transform duration-300 ease-in-out ${
        shouldHideHeader ? '-translate-y-full' : 'translate-y-0'
      }`}>
      <nav className="container mx-auto px-3 xs:px-4 sm:px-6 py-2 sm:py-3 3xl:px-8 4xl:px-12 max-w-9xl flex items-center justify-between">
        <Link to="/" className="flex items-center flex-shrink-0">
          <img
            src="/images/logos/GETFund logo_200cm Wide -  Black.png"
            alt="Ghana Education Trust Fund"
            className="h-12 sm:h-14 md:h-16 w-auto object-contain max-w-[180px] sm:max-w-[280px] md:max-w-[350px]"
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
                  } hover:text-getfund-primary font-medium transition-colors text-xs lg:text-sm xl:text-base 3xl:text-lg tracking-wide whitespace-nowrap`}
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
              className="inline-flex items-center justify-center bg-getfund-gold text-white px-3 lg:px-4 xl:px-6 2xl:px-8 py-2 xl:py-2.5 3xl:py-3 rounded font-semibold hover:bg-yellow-600 transition-all text-xs lg:text-sm xl:text-base 3xl:text-lg tracking-wide whitespace-nowrap"
              title="Donate"
            >
              Donate
            </Link>
          </li>
        </ul>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 glass-mobile-menu lg:hidden max-h-[calc(100vh-80px)] overflow-y-auto">
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
                      } hover:text-getfund-primary hover:bg-gray-50 font-medium transition-colors text-sm tracking-wide`}
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
                  className="block mx-4 mt-2 bg-getfund-gold text-white px-6 py-3 rounded-sm font-semibold hover:bg-yellow-600 transition-colors text-sm tracking-wide text-center"
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
