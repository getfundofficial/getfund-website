import { useState } from 'react';
import { MessageCircle, X, Phone, Mail, MapPin } from 'lucide-react';

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded Contact Panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-scale-in">
          <div className="bg-getfund-primary p-4">
            <h3 className="text-white font-semibold text-lg">Get in Touch</h3>
            <p className="text-green-100 text-sm">We're here to help</p>
          </div>
          <div className="p-4 space-y-3">
            <a
              href="tel:+233302664061"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-getfund-primary/10 rounded-full flex items-center justify-center group-hover:bg-getfund-primary/20 transition-colors">
                <Phone className="w-5 h-5 text-getfund-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Call Us</p>
                <p className="text-xs text-gray-500">+233 30 266 4061</p>
              </div>
            </a>
            <a
              href="mailto:info@getfund.gov.gh"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-getfund-gold/10 rounded-full flex items-center justify-center group-hover:bg-getfund-gold/20 transition-colors">
                <Mail className="w-5 h-5 text-getfund-gold" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Email Us</p>
                <p className="text-xs text-gray-500">info@getfund.gov.gh</p>
              </div>
            </a>
            <a
              href="https://maps.google.com/?q=GETFund+House+Accra"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-teal-500/10 rounded-full flex items-center justify-center group-hover:bg-teal-500/20 transition-colors">
                <MapPin className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Visit Us</p>
                <p className="text-xs text-gray-500">GETFund House, Accra</p>
              </div>
            </a>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          isOpen
            ? 'bg-gray-700 hover:bg-gray-800'
            : 'bg-getfund-primary hover:bg-getfund-primary/90'
        }`}
        aria-label={isOpen ? 'Close contact panel' : 'Open contact panel'}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>
    </div>
  );
}
