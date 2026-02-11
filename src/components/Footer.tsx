import { Phone, Mail, MapPin, Facebook, Linkedin, Instagram, Youtube } from 'lucide-react';

// Custom X (Twitter) icon
function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props} xmlns="http://www.w3.org/2000/svg">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
import { Link } from 'react-router-dom';
import { handleAnchorClick } from '../utils/scroll';
import { useState, useEffect } from 'react';
import { cmsApi, FooterConfig } from '../services/cmsApi';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [footerConfig, setFooterConfig] = useState<FooterConfig | null>(null);
  const [, setLoading] = useState(true);

  useEffect(() => {
    const fetchFooterConfig = async () => {
      try {
        const config = await cmsApi.getFooterConfig();
        setFooterConfig(config);
      } catch (error) {
        console.error('Failed to load footer config, using defaults', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFooterConfig();
  }, []);

  // Default values (fallback)
  const defaultSocialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/getfund', label: 'Facebook' },
    { icon: XIcon, href: 'https://twitter.com/GETFundOfficial', label: 'X (Twitter)' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/getfundofficial/', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://www.instagram.com/getfundofficial/', label: 'Instagram' },
    { icon: Youtube, href: 'https://www.youtube.com/@GETFundOfficial', label: 'YouTube' },
  ];

  const defaultQuickLinks = [
    { name: 'About', href: '/about' },
    { name: 'What We Do', href: '/what-we-do' },
    { name: 'News & Updates', href: '/news' },
    { name: 'Resources', href: '/resources' },
    { name: 'Support Us', href: '/support-us' },
  ];

  // Use CMS data or fallback to defaults
  const logoUrl = footerConfig?.logo_url || '/images/logos/getfund-logo-light-main.png';
  const aboutText = footerConfig?.about_text || 'Supporting the delivery of quality education to Ghanaians from basic to tertiary level';
  const phone = footerConfig?.phone || '+233 (544) 323-020';
  const email = footerConfig?.email || 'info@getfund.gov.gh';
  const address = footerConfig?.address || 'No. 42, 4th Close, Airport Residential Area, Accra';
  const officeHoursWeekday = footerConfig?.office_hours_weekday || 'Monday - Friday: 8:00 AM - 5:00 PM';
  const officeHoursWeekend = footerConfig?.office_hours_weekend || 'Saturday - Sunday: Closed';
  const backgroundColor = footerConfig?.background_color || '#1e3a5f';

  // Build social links from CMS data
  const socialLinks = footerConfig?.social_links ? [
    footerConfig.social_links.facebook ? { icon: Facebook, href: footerConfig.social_links.facebook, label: 'Facebook' } : null,
    footerConfig.social_links.twitter ? { icon: XIcon, href: footerConfig.social_links.twitter, label: 'X (Twitter)' } : null,
    footerConfig.social_links.linkedin ? { icon: Linkedin, href: footerConfig.social_links.linkedin, label: 'LinkedIn' } : null,
    footerConfig.social_links.instagram ? { icon: Instagram, href: footerConfig.social_links.instagram, label: 'Instagram' } : null,
    footerConfig.social_links.youtube ? { icon: Youtube, href: footerConfig.social_links.youtube, label: 'YouTube' } : null,
  ].filter(Boolean) : defaultSocialLinks;

  const quickLinks = (footerConfig?.quick_links && footerConfig.quick_links.length > 0
    ? footerConfig.quick_links
        .filter(link => link.visible !== false) // Filter hidden links (CMS controlled)
        .map(link => ({
          ...link,
          name: link.name === 'Who We Are' ? 'About' : link.name,
          href: link.href === '/who-we-are' ? '/about' : link.href
        }))
    : defaultQuickLinks
  );

  return (
    <footer id="contact" className="text-white glass-footer full-bleed" style={{ backgroundColor }}>
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 3xl:px-8 4xl:px-12 max-w-9xl py-12 sm:py-16 3xl:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 3xl:gap-16 mb-8 sm:mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <img
                src={logoUrl}
                alt="Ghana Education Trust Fund"
                className="h-12 sm:h-14 3xl:h-16 4xl:h-20 w-auto object-contain"
              />
            </div>
            <p className="text-sm sm:text-base 3xl:text-lg text-gray-400 leading-relaxed mb-4 sm:mb-6">
              {aboutText}
            </p>
            <div className="flex gap-3 sm:gap-4 flex-wrap">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="glass-icon w-10 h-10 3xl:w-12 3xl:h-12 4xl:w-14 4xl:h-14 rounded-lg flex items-center justify-center touch-manipulation"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5 3xl:w-6 3xl:h-6 4xl:w-7 4xl:h-7" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-base sm:text-lg 3xl:text-xl mb-4 sm:mb-6">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith('#') ? (
                    <a
                      href={link.href}
                      onClick={(e) => handleAnchorClick(link.href, e)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-sm sm:text-base 3xl:text-lg text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-base sm:text-lg 3xl:text-xl mb-4 sm:mb-6">Contact Info</h3>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-2 sm:gap-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 3xl:w-6 3xl:h-6 text-getfund-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="text-sm sm:text-base 3xl:text-lg text-gray-400 hover:text-white transition-colors">
                  {phone}
                </a>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 3xl:w-6 3xl:h-6 text-getfund-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                <a href={`mailto:${email}`} className="text-sm sm:text-base 3xl:text-lg text-gray-400 hover:text-white transition-colors">
                  {email}
                </a>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 3xl:w-6 3xl:h-6 text-getfund-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-sm sm:text-base 3xl:text-lg text-gray-400">
                  {address}
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-base sm:text-lg 3xl:text-xl mb-4 sm:mb-6">Office Hours</h3>
            <div className="space-y-2 text-sm sm:text-base 3xl:text-lg text-gray-400">
              <p className="font-semibold text-white">{officeHoursWeekday}</p>
              <p className="font-semibold text-white mt-4">{officeHoursWeekend}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-gray-400 text-xs sm:text-sm 3xl:text-base">
            <p>&copy; {currentYear} Ghana Education Trust Fund. All rights reserved.</p>
            <div className="flex gap-4 sm:gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
