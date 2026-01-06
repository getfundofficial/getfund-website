import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { MenuItem } from '../services/cmsApi';

interface MobileDropdownMenuProps {
  item: MenuItem;
  onItemClick: () => void;
}

export default function MobileDropdownMenu({ item, onItemClick }: MobileDropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = location.pathname.startsWith(`/${item.slug}`);

  return (
    <li>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-3 ${
          isActive ? 'text-getfund-primary font-semibold' : 'text-getfund-secondary'
        } hover:text-getfund-primary hover:bg-gray-50 font-medium transition-colors text-sm tracking-wide`}
        aria-expanded={isOpen}
      >
        <span>{item.label}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && item.children && item.children.length > 0 && (
        <ul className="bg-gray-50 border-l-2 border-getfund-gold">
          {item.children.map((child) => {
            // Handle different slug formats:
            // - 'fundraising-campaigns' -> use directly as /fundraising-campaigns
            // - 'fundraising/why-fundraising' -> use directly as /fundraising/why-fundraising
            // - 'why-fundraising' -> prepend parent as /fundraising/why-fundraising
            let childPath: string;
            if (child.slug.includes('/') || child.slug.includes('-campaigns')) {
              childPath = `/${child.slug}`;
            } else {
              childPath = `/${item.slug}/${child.slug}`;
            }
            return (
              <li key={child.id}>
                <Link
                  to={childPath}
                  className={`block pl-8 pr-4 py-3 ${
                    location.pathname === childPath
                      ? 'text-getfund-primary font-semibold bg-gray-100'
                      : 'text-gray-700'
                  } hover:text-getfund-primary hover:bg-gray-100 transition-colors text-sm`}
                  onClick={onItemClick}
                >
                  {child.label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
}
