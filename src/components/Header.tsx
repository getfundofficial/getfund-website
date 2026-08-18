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
  {
    id: '3',
    slug: 'scholarships',
    title: 'Scholarships',
    label: 'Scholarships',
    children: [
      { id: '3-1', slug: 'overview', title: 'Programme Overview', label: 'Programme Overview', parentId: '3' },
      { id: '3-2', slug: 'partner-universities', title: 'Partner Universities', label: 'Partner Universities', parentId: '3' },
      { id: '3-3', slug: 'how-to-apply', title: 'How to Apply', label: 'How to Apply', parentId: '3' },
      { id: '3-4', slug: 'getfund-scholars', title: 'GETFund Scholars', label: 'GETFund Scholars', parentId: '3' },
    ]
  },
  { id: '4', slug: 'news', title: 'News & Updates', label: 'News & Updates' },
];

/**
 * Giving now happens on EFPI, so Fundraising is no longer a section of this
 * site's navigation and the header's call to action points there instead.
 */
const EFPI_URL = 'https://efpi.getfund.gov.gh';

/**
 * Donate opens EFPI with its donation form already up, rather than dropping the
 * visitor on the EFPI homepage to find it themselves. `?donate` is EFPI's own
 * parameter for this — it opens the form on arrival and strips itself from the
 * URL, so a refresh or the back button behaves normally.
 *
 * The printed QR codes redirect to this same address, so there is one way in
 * and it only has to be got right once.
 */
const EFPI_DONATE_URL = `${EFPI_URL}/?donate=1`;

/**
 * The menu comes from the CMS, which still publishes the Fundraising pages —
 * they remain live and linked from within the site, they are simply not in the
 * nav any more. Dropping the item here rather than only from the defaults above
 * means that stays true for visitors holding a cached menu, and on any response
 * the CMS gives back.
 *
 * Once those pages are unpublished from the menu in the CMS, this filter is
 * doing nothing and can go.
 */
const HIDDEN_FROM_NAV = new Set(['fundraising']);

function prepareMenu(items: MenuItem[]): MenuItem[] {
  return items.filter((item) => !HIDDEN_FROM_NAV.has(item.slug));
}

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


  useEffect(() => {
    let isMounted = true;

    const fetchMenu = async () => {
      try {
        const menuConfig = await cmsApi.getMenuConfig();
        if (!isMounted) return;

        // Update menu if CMS has valid items
        if (menuConfig.menuItems.length > 0) {
          const items = prepareMenu(menuConfig.menuItems);
          setMenuItems(items);
          cacheMenu(items);
        }
      } catch {
        // Keep using cached or default menu items
      }
    };

    // The cached menu was written before Fundraising left the nav, so filter
    // what we started with too rather than waiting for the fetch to land.
    setMenuItems(prev => prepareMenu(prev));

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
      <nav className="font-display container mx-auto px-3 xs:px-4 sm:px-6 py-2 sm:py-3 3xl:px-8 4xl:px-12 max-w-9xl flex items-center justify-between">
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

          {/* EFPI — a separate site, so a plain anchor rather than a router Link */}
          <li>
            <a
              href={EFPI_URL}
              className="flex items-center rounded transition-transform hover:scale-105"
              title="EFPI — Education Financing & Partnership Initiative"
            >
              <img
                src="/images/logos/efpi-logo.png"
                alt="EFPI — Education Financing and Partnership Initiative"
                className="h-6 xl:h-7 3xl:h-8 w-auto object-contain"
              />
            </a>
          </li>

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

          {/* Donate Button — now hands off to EFPI, which takes the payment */}
          <li>
            <a
              href={EFPI_DONATE_URL}
              className="inline-flex items-center justify-center bg-getfund-gold text-white px-3 lg:px-4 xl:px-6 2xl:px-8 py-2 xl:py-2.5 3xl:py-3 rounded font-semibold hover:bg-yellow-600 transition-all text-xs lg:text-sm xl:text-base 3xl:text-lg tracking-wide whitespace-nowrap hover:scale-105"
              style={{ boxShadow: '0 4px 15px rgba(245, 158, 11, 0.4), 0 2px 6px rgba(0, 0, 0, 0.2)' }}
              title="Donate"
            >
              Donate
            </a>
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
                <a
                  href={EFPI_URL}
                  className="flex items-center gap-3 px-4 py-3 border-t border-gray-100 hover:bg-gray-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <img
                    src="/images/logos/efpi-logo.png"
                    alt="EFPI — Education Financing and Partnership Initiative"
                    className="h-7 w-auto object-contain"
                  />
                </a>
              </li>
              <li>
                <a
                  href={EFPI_DONATE_URL}
                  className="block mx-4 mt-2 bg-getfund-gold text-white px-6 py-3 rounded-sm font-semibold hover:bg-yellow-600 transition-colors text-sm tracking-wide text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Donate
                </a>
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
