import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';

// Custom WhatsApp SVG icon
function WhatsappIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
      <g>
        <circle cx="12" cy="12" r="10" fill="#25D366" />
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.198.297-.767.967-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.007-.372-.009-.571-.009-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.099 3.205 5.077 4.366.71.306 1.263.489 1.695.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.007-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347z" fill="#fff" />
      </g>
    </svg>
  );
}
import { Link } from 'react-router-dom';
import { handleAnchorClick } from '../utils/scroll';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/getfund', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/GETFundOfficial', label: 'Twitter' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/getfundofficial/', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://www.instagram.com/getfundofficial/', label: 'Instagram' },
    { icon: Youtube, href: 'https://www.youtube.com/@getfundghana', label: 'YouTube' },
    { icon: WhatsappIcon, href: 'https://whatsapp.com/channel/0029VaF1QwFJvQ1Q2Q1Q2Q', label: 'WhatsApp Channel' },
  ];


  const quickLinks = [
    { name: 'Who We Are', href: '/who-we-are' },
    { name: 'What We Do', href: '/what-we-do' },
    { name: 'Impact', href: '/impact' },
    { name: 'News & Updates', href: '/news' },
    { name: 'Resources', href: '/resources' },
  ];

  return (
    <footer id="contact" className="bg-getfund-secondary text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <img 
                src="/images/logos/getfund-logo-light-main.png" 
                alt="Ghana Education Trust Fund" 
                className="h-14 w-auto object-contain"
              />
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Supporting the delivery of quality education to Ghanaians from basic to tertiary level
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="bg-gray-800 w-10 h-10 rounded-lg flex items-center justify-center hover:bg-getfund-primary transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
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
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-getfund-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                <a href="tel:+233544323020" className="text-gray-400 hover:text-white transition-colors">
                  +233 (544) 323-020
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-getfund-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                <a href="mailto:info@getfund.gov.gh" className="text-gray-400 hover:text-white transition-colors">
                  info@getfund.gov.gh
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-getfund-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-gray-400">
                  No. 42, 4th Close, Airport Residential Area, Accra
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">Office Hours</h3>
            <div className="space-y-2 text-gray-400">
              <p>Monday - Friday</p>
              <p className="font-semibold text-white">8:00 AM - 5:00 PM</p>
              <p className="mt-4">Saturday - Sunday</p>
              <p className="font-semibold text-white">Closed</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
            <p>&copy; {currentYear} Ghana Education Trust Fund. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
