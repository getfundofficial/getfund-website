import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { MenuItem } from '../services/cmsApi';

interface DropdownMenuProps {
  item: MenuItem;
}

export default function DropdownMenu({ item }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200); // 200ms delay before closing
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  const isActive = location.pathname.startsWith(`/${item.slug}`);

  return (
    <li
      ref={dropdownRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={`${
          isActive ? 'text-getfund-primary font-semibold' : 'text-getfund-secondary'
        } hover:text-getfund-primary font-medium transition-colors text-xs lg:text-sm xl:text-base 3xl:text-lg uppercase tracking-wide whitespace-nowrap flex items-center gap-1`}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {item.label}
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && item.children && item.children.length > 0 && (
        <div className="absolute top-full left-0 pt-2 z-50">
          <div className="w-64 bg-white border border-gray-200 rounded-lg shadow-xl">
            <ul className="py-2" role="menu">
              {item.children.map((child) => (
                <li key={child.id} role="none">
                  <Link
                    to={`/${item.slug}/${child.slug}`}
                    className={`block px-4 py-3 ${
                      location.pathname === `/${item.slug}/${child.slug}`
                        ? 'bg-gray-100 text-getfund-primary font-semibold'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-getfund-primary'
                    } transition-colors`}
                    role="menuitem"
                    onClick={() => setIsOpen(false)}
                  >
                    {child.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </li>
  );
}
