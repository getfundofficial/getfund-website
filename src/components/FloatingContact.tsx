import { useState, useEffect } from 'react';
import { X, Phone, Mail, MapPin } from 'lucide-react';

interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  button_text?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://getfund-cms-backend.vercel.app/api';

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    phone: '+233 30 266 4061',
    email: 'info@getfund.gov.gh',
    address: 'GETFund House, Accra',
    button_text: 'GET IN TOUCH WITH FUNDRAISING!',
  });

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/fundraising-contact`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
          },
        });
        if (response.ok) {
          const data = await response.json();
          if (data.phone || data.email || data.address || data.button_text) {
            setContactInfo(prev => ({
              phone: data.phone || prev.phone,
              email: data.email || prev.email,
              address: data.address || prev.address,
              button_text: data.button_text || prev.button_text,
            }));
          }
        }
      } catch (error) {
        console.error('Failed to fetch contact info:', error);
      }
    };

    fetchContactInfo();
  }, []);

  // Format phone for tel: link (remove spaces and special chars)
  const phoneLink = contactInfo.phone.replace(/[\s-()]/g, '');

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50">
      {/* Expanded Contact Panel */}
      {isOpen && (
        <div className="absolute right-40 top-1/2 -translate-y-1/2 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden animate-scale-in">
          <div className="p-4" style={{ backgroundColor: '#1e3a5f' }}>
            <h3 className="text-white font-semibold text-lg">Get in Touch</h3>
            <p className="text-blue-200 text-sm">We're here to help</p>
          </div>
          <div className="p-4 space-y-3">
            <a
              href={`tel:${phoneLink}`}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition-colors group"
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center transition-colors" style={{ backgroundColor: 'rgba(30, 58, 95, 0.1)' }}>
                <Phone className="w-5 h-5" style={{ color: '#1e3a5f' }} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Call Us</p>
                <p className="text-xs text-gray-500">{contactInfo.phone}</p>
              </div>
            </a>
            <a
              href={`mailto:${contactInfo.email}`}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition-colors group"
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center transition-colors" style={{ backgroundColor: 'rgba(30, 58, 95, 0.1)' }}>
                <Mail className="w-5 h-5" style={{ color: '#1e3a5f' }} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Email Us</p>
                <p className="text-xs text-gray-500">{contactInfo.email}</p>
              </div>
            </a>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(contactInfo.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition-colors group"
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center transition-colors" style={{ backgroundColor: 'rgba(30, 58, 95, 0.1)' }}>
                <MapPin className="w-5 h-5" style={{ color: '#1e3a5f' }} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Visit Us</p>
                <p className="text-xs text-gray-500">{contactInfo.address}</p>
              </div>
            </a>
          </div>
        </div>
      )}

      {/* Floating Glass Circle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-36 h-36 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group ${
          isOpen ? '' : ''
        }`}
        aria-label={isOpen ? 'Close contact panel' : 'Open contact panel'}
      >
        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-full opacity-80 blur-sm group-hover:opacity-100 group-hover:blur-md transition-all duration-300" style={{ backgroundColor: '#1e3a5f' }}></div>

        {/* Glass effect background */}
        <div className={`absolute inset-1 rounded-full backdrop-blur-md border border-white/30 shadow-2xl transition-all duration-300 ${
          isOpen
            ? 'bg-gray-800/90'
            : 'bg-white/20'
        }`}></div>

        {/* Inner gradient ring */}
        <div className="absolute inset-2 rounded-full opacity-90" style={{ backgroundColor: '#1e3a5f' }}></div>

        {/* Content */}
        <div className="relative z-10">
          {isOpen ? (
            <X className="w-10 h-10 text-white drop-shadow-lg" />
          ) : (
            <div className="text-center px-2">
              <span className="text-white font-bold text-sm leading-tight drop-shadow-lg block">
                {contactInfo.button_text || 'GET IN TOUCH WITH FUNDRAISING!'}
              </span>
            </div>
          )}
        </div>

      </button>
    </div>
  );
}
