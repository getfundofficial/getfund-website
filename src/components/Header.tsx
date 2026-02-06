import { Menu, X, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useScrollDirection } from '../hooks/useScrollDirection';
import { cmsApi, MenuItem } from '../services/cmsApi';
import DropdownMenu from './DropdownMenu';
import MobileDropdownMenu from './MobileDropdownMenu';
import ScrollProgressBar from './ScrollProgressBar';
import SearchModal from './SearchModal';

// Default menu items (fallback only if no cache and CMS fails)
// Keep in sync with CMS pages that have show_in_menu = true
const DEFAULT_MENU_ITEMS: MenuItem[] = [
  { id: '1', slug: 'about', title: 'About', label: 'About' },
  { id: '2', slug: 'what-we-do', title: 'What We Do', label: 'What We Do' },
  { id: '3', slug: 'news', title: 'News & Updates', label: 'News & Updates' },
  {
    id: '4',
    slug: 'fundraising',
    title: 'Fundraising',
    label: 'Fundraising',
    children: [
      { id: '4-1', slug: 'why-fundraising', title: 'Why Fundraising?', label: 'Why Fundraising', parentId: '4' },
      { id: '4-2', slug: 'ways-to-donate', title: 'Ways to Donate', label: 'Ways to Donate', parentId: '4' },
      { id: '4-3', slug: 'fundraising-campaigns', title: 'Fundraising Campaigns', label: 'Fundraising Campaigns', parentId: '4' },
      { id: '4-4', slug: 'lottery', title: 'Scholarship Lottery', label: 'Scholarship Lottery', parentId: '4' },
      { id: '4-5', slug: 'partnerships', title: 'Partnerships', label: 'Partnerships', parentId: '4' },
      { id: '4-6', slug: 'beneficiaries-give-back', title: 'Beneficiaries Give Back', label: 'Beneficiaries Give Back', parentId: '4' },
      { id: '4-7', slug: 'events', title: 'Events', label: 'Events', parentId: '4' }
    ]
  }
];

const MENU_CACHE_KEY = 'getfund_menu_cache';

// Get cached menu from localStorage (synchronous, prevents flash)
function getCachedMenu(): MenuItem[] | null {
  try {
    const cached = localStorage.getItem(MENU_CACHE_KEY);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch {
    // Ignore localStorage errors
  }
  return null;
}

// Save menu to localStorage
function cacheMenu(items: MenuItem[]): void {
  try {
    localStorage.setItem(MENU_CACHE_KEY, JSON.stringify(items));
  } catch {
    // Ignore localStorage errors
  }
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  // Load immediately from cache or defaults
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => getCachedMenu() || DEFAULT_MENU_ITEMS);
  const location = useLocation();
  const { scrollDirection, isScrolled } = useScrollDirection(50);

  // Keyboard shortcut for search (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const shouldHideHeader = scrollDirection === 'down' && isScrolled;

  // Ensure lottery is always in the Fundraising menu
  const ensureLotteryInMenu = (items: MenuItem[]): MenuItem[] => {
    return items.map(item => {
      if (item.slug === 'fundraising' && item.children) {
        const hasLottery = item.children.some(child => child.slug === 'lottery');
        if (!hasLottery) {
          // Add lottery after fundraising-campaigns
          const campaignsIndex = item.children.findIndex(child => child.slug === 'fundraising-campaigns');
          const lotteryItem: MenuItem = {
            id: '4-lottery',
            slug: 'lottery',
            title: 'Scholarship Lottery',
            label: 'Scholarship Lottery',
            parentId: item.id
          };
          const newChildren = [...item.children];
          newChildren.splice(campaignsIndex + 1, 0, lotteryItem);
          return { ...item, children: newChildren };
        }
      }
      return item;
    });
  };

  useEffect(() => {
    let isMounted = true;

    const fetchMenu = async () => {
      try {
        const menuConfig = await cmsApi.getMenuConfig();
        if (!isMounted) return;

        // Update menu if CMS has valid items
        if (menuConfig.menuItems.length > 0) {
          const menuWithLottery = ensureLotteryInMenu(menuConfig.menuItems);
          setMenuItems(menuWithLottery);
          cacheMenu(menuWithLottery);
        }
      } catch {
        // Keep using cached or default menu items
      }
    };

    // Also ensure lottery in initial/cached menu
    setMenuItems(prev => ensureLotteryInMenu(prev));

    fetchMenu();

    return () => {
      isMounted = false;
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
            className="h-14 sm:h-18 md:h-22 lg:h-24 w-auto object-contain max-w-[200px] sm:max-w-[300px] md:max-w-[380px] lg:max-w-[420px] -my-1 sm:-my-2 md:-my-3 lg:-my-4"
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
        <ul className="hidden lg:flex items-center gap-4 lg:gap-5 xl:gap-6 2xl:gap-8 3xl:gap-10">
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

          {/* Search Button */}
          <li>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-getfund-secondary hover:text-getfund-primary hover:bg-gray-100 rounded-lg transition-colors"
              title="Search (Ctrl+K)"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </li>

          {/* Donate Button */}
          <li>
            <Link
              to="/fundraising/ways-to-donate"
              className="inline-flex items-center justify-center bg-getfund-gold text-white px-3 lg:px-4 xl:px-6 2xl:px-8 py-2 xl:py-2.5 3xl:py-3 rounded font-semibold hover:bg-yellow-600 transition-all text-xs lg:text-sm xl:text-base 3xl:text-lg tracking-wide whitespace-nowrap hover:scale-105"
              style={{ boxShadow: '0 4px 15px rgba(245, 158, 11, 0.4), 0 2px 6px rgba(0, 0, 0, 0.2)' }}
              title="Donate"
            >
              Donate
            </Link>
          </li>
        </ul>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 glass-mobile-menu lg:hidden max-h-[calc(100vh-80px)] overflow-y-auto">
            {/* Mobile Search Button */}
            <button
              onClick={() => {
                setIsMenuOpen(false);
                setIsSearchOpen(true);
              }}
              className="flex items-center gap-2 w-full px-4 py-3 text-getfund-secondary hover:text-getfund-primary hover:bg-gray-50 border-b border-gray-100"
            >
              <Search className="w-5 h-5" />
              <span className="font-medium">Search</span>
            </button>
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

    {/* Search Modal */}
    <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
