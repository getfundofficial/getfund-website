import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQPageProps {
  pageData: {
    title: string;
    meta_title?: string;
    meta_description?: string;
    template_variables?: Record<string, any>;
  };
  content: {
    heroTitle?: string;
    heroSubtitle?: string;

    // FAQ Categories
    categories?: Array<{
      title: string;
      faqs: Array<{
        question: string;
        answer: string;
      }>;
    }>;

    // Contact CTA
    ctaTitle?: string;
    ctaText?: string;
    ctaButtonText?: string;
    ctaButtonLink?: string;
  };
}

/**
 * FAQ Page Template
 *
 * Template for frequently asked questions with collapsible sections.
 */
export const FAQPage: React.FC<FAQPageProps> = ({ pageData, content }) => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="faq-page">
      {/* Hero Section */}
      <section className="relative bg-getfund-primary text-white pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <HelpCircle className="w-20 h-20 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {content.heroTitle || pageData.title}
            </h1>
            <p className="text-xl md:text-2xl text-red-100 leading-relaxed">
              {content.heroSubtitle || 'Find answers to commonly asked questions'}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Categories Section */}
      {content.categories && content.categories.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {content.categories.map((category, catIndex) => (
                <div key={catIndex} className="mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                    {category.title}
                  </h2>
                  <div className="space-y-4">
                    {category.faqs.map((faq, faqIndex) => {
                      const itemId = `${catIndex}-${faqIndex}`;
                      const isOpen = openItems[itemId];

                      return (
                        <div
                          key={faqIndex}
                          className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                        >
                          <button
                            onClick={() => toggleItem(itemId)}
                            className="w-full flex items-center justify-between p-6 text-left"
                          >
                            <h3 className="text-lg font-semibold text-gray-900 pr-4">
                              {faq.question}
                            </h3>
                            <div className="flex-shrink-0">
                              {isOpen ? (
                                <ChevronUp className="w-6 h-6 text-getfund-primary" />
                              ) : (
                                <ChevronDown className="w-6 h-6 text-gray-400" />
                              )}
                            </div>
                          </button>
                          {isOpen && (
                            <div className="px-6 pb-6">
                              <div className="pt-4 border-t border-gray-200">
                                <p className="text-gray-700 leading-relaxed">
                                  {faq.answer}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact CTA Section */}
      {content.ctaTitle && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {content.ctaTitle}
              </h2>
              {content.ctaText && (
                <p className="text-lg text-gray-700 mb-6">
                  {content.ctaText}
                </p>
              )}
              {content.ctaButtonText && content.ctaButtonLink && (
                <a
                  href={content.ctaButtonLink}
                  className="inline-block bg-getfund-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  {content.ctaButtonText}
                </a>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
