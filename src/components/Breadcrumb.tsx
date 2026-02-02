import { ChevronRight, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useScrollDirection } from '../hooks/useScrollDirection';

interface BreadcrumbItem {
  label: string;
  href: string;
  isActive?: boolean;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
}

// Route to label mapping
const routeLabels: Record<string, string> = {
  '/': 'Home',
  '/about': 'About',
  '/impact': 'Impact',
  '/news': 'News & Updates',
  '/contact': 'Contact',
  '/faq': 'FAQ',
  '/scholarship-apply': 'Scholarship Application',
  '/support-us': 'Support Us',
  '/resources': 'Resources',
  '/service': 'Services',
  '/service/infrastructure-projects': 'Educational Infrastructure Projects',
  '/service/scholarship-programme': 'Scholarship Programme',
  '/service/education-sector-support': 'Education Sector Support',
  '/community-day-school-project': 'Community Day School Project',
  '/basic-education-project': 'Basic Education Improvement Project',
  '/fundraising': 'Fundraising',
  '/fundraising/why-fundraising': 'Why Fundraising?',
  '/fundraising/ways-to-donate': 'Ways to Donate',
  '/fundraising/partnerships': 'Partnerships',
  '/fundraising/beneficiaries-give-back': 'Beneficiaries Give Back',
  '/fundraising/events': 'Events',
  '/fundraising-campaigns': 'Fundraising Campaigns',
};

const Breadcrumb = ({ items, className = '' }: BreadcrumbProps) => {
  const location = useLocation();
  
  // Generate breadcrumbs from current path if items not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (items) return items;
    
    const pathnames = location.pathname.split('/').filter(x => x);
    
    // All breadcrumbs should link to the updated homepage
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', href: '/', isActive: false }
    ];

  // If on the home page we will render nothing later; keep generating
  // breadcrumbs here so callers can still pass custom items if needed.

    // Special handling for service routes - skip intermediate /service path
    if (pathnames[0] === 'service' && pathnames.length > 1) {
      const fullPath = location.pathname;
      const label = routeLabels[fullPath] || pathnames[pathnames.length - 1].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      
      // Add What We Do as intermediate breadcrumb for service routes
      breadcrumbs.push({
        label: 'What We Do',
        href: '/what-we-do',
        isActive: false
      });
      
      breadcrumbs.push({
        label: label,
        href: fullPath,
        isActive: true
      });
    }
    // Special handling for fundraising routes - show intermediate Fundraising breadcrumb
    else if (pathnames[0] === 'fundraising' && pathnames.length > 1) {
      const fullPath = location.pathname;
      const label = routeLabels[fullPath] || pathnames[pathnames.length - 1].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

      // Add Fundraising as intermediate breadcrumb for fundraising routes
      breadcrumbs.push({
        label: 'Fundraising',
        href: '/fundraising',
        isActive: false
      });

      breadcrumbs.push({
        label: label,
        href: fullPath,
        isActive: true
      });
    }
    // Special handling for fundraising-campaigns (at root level but part of fundraising)
    else if (pathnames[0] === 'fundraising-campaigns') {
      // Add Fundraising as intermediate breadcrumb
      breadcrumbs.push({
        label: 'Fundraising',
        href: '/fundraising/ways-to-donate',
        isActive: false
      });

      breadcrumbs.push({
        label: 'Fundraising Campaigns',
        href: '/fundraising-campaigns',
        isActive: true
      });
    } else {
      // Standard breadcrumb generation for other routes
      let currentPath = '';
      pathnames.forEach((pathname, index) => {
        currentPath += `/${pathname}`;
        const isLast = index === pathnames.length - 1;
        
        breadcrumbs.push({
          label: routeLabels[currentPath] || pathname.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          href: currentPath,
          isActive: isLast
        });
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();
  
  // Ensure we always have at least Home if on non-home page
  if (breadcrumbs.length === 1 && location.pathname !== '/') {
    breadcrumbs.push({
      label: 'Current Page',
      href: location.pathname,
      isActive: true
    });
  }

  // If on the home page we don't render breadcrumbs
  if (location.pathname === '/') return null;

  return (
  <nav
    aria-label="Breadcrumb"
    className={`glass-solid mt-[64px] sm:mt-[80px] md:mt-[88px] lg:mt-[88px] xl:mt-[88px] pt-4 sticky top-0 z-40 transition-all duration-300 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center space-x-2 pb-3 text-sm font-medium">
          {breadcrumbs.map((item, index) => (
            <li key={item.href} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2 flex-shrink-0" />
              )}
              {item.isActive ? (
                <span className="text-getfund-primary font-semibold flex items-center">
                  {index === 0 && <Home className="w-4 h-4 mr-2" />}
                  {item.label}
                </span>
              ) : (
                item.href.includes('#') ? (
                  <a
                    href={item.href}
                    className="text-gray-700 hover:text-getfund-primary flex items-center"
                  >
                    {index === 0 && <Home className="w-4 h-4 mr-2" />}
                    {item.label}
                  </a>
                ) : (
                  <Link
                    to={item.href}
                    className="text-gray-700 hover:text-getfund-primary flex items-center"
                  >
                    {index === 0 && <Home className="w-4 h-4 mr-2" />}
                    {item.label}
                  </Link>
                )
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;