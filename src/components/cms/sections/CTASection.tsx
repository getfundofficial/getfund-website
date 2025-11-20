/**
 * CTA Section Renderer
 * Displays a call-to-action with button
 */

import { PageSection } from '../../../services/cmsApi';
import { Link } from 'react-router-dom';

interface CTASectionProps {
  section: PageSection;
}

export default function CTASection({ section }: CTASectionProps) {
  const { text, buttonText, buttonLink, style = 'primary' } = section.content;

  const buttonClasses = style === 'primary'
    ? 'bg-getfund-red text-white hover:bg-red-700'
    : 'bg-gray-200 text-gray-900 hover:bg-gray-300';

  return (
    <section className="py-12 md:py-16 bg-gradient-to-r from-red-50 to-red-100">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xl md:text-2xl text-gray-800 mb-8 leading-relaxed">
            {text}
          </p>
          <Link
            to={buttonLink}
            className={`inline-block px-8 py-4 rounded-full font-semibold text-lg transition-colors shadow-lg ${buttonClasses}`}
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
}
