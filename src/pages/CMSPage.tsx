/**
 * Dynamic CMS Page Component
 * Fetches and renders pages from the CMS based on slug
 */

import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import LoadingScreen from '../components/LoadingScreen';
import SectionRenderer from '../components/cms/SectionRenderer';
import { cmsApi, CMSPage as CMSPageType } from '../services/cmsApi';
import { getPageTemplate } from '../templates/pages';

export default function CMSPage() {
  const { slug: slugParam } = useParams<{ slug: string }>();
  const location = useLocation();
  const [page, setPage] = useState<CMSPageType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Extract slug from URL path
  const getSlugFromPath = () => {
    const path = location.pathname;

    // Remove leading and trailing slashes
    const cleanPath = path.replace(/^\/|\/$/g, '');

    // Root path "/" maps to "home" page
    if (!cleanPath) return 'home';

    // If we have a slug param (sub-page), use the full path as slug
    if (slugParam) {
      return cleanPath;
    }

    // For parent pages (e.g., /who-we-are), use the first segment
    const segments = cleanPath.split('/');
    return segments[0];
  };

  useEffect(() => {
    async function fetchPage() {
      const slug = getSlugFromPath();

      if (!slug) {
        setError('No page slug provided');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        console.log('[CMSPage] Fetching page:', slug);
        const pageData = await cmsApi.getPageBySlug(slug);

        if (!pageData) {
          console.log('[CMSPage] Page not found');
          setError('Page not found');
        } else {
          console.log('[CMSPage] Page loaded successfully:', pageData.title);
          console.log('[CMSPage] Page content:', pageData.sections?.[0]?.content);
          setPage(pageData);
        }
      } catch (err) {
        console.error('[CMSPage] Error loading page:', err);
        setError('Failed to load page');
      } finally {
        setIsLoading(false);
      }
    }

    fetchPage();

    // Auto-refresh in development mode every 1 minute
    let intervalId: NodeJS.Timeout | null = null;
    if (import.meta.env.DEV) {
      intervalId = setInterval(() => {
        console.log('[CMSPage] Auto-refreshing page content...');
        fetchPage();
      }, 60000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [location.pathname, location.key]); // Re-fetch when pathname or navigation key changes

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error || !page) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="container mx-auto px-4 py-20 flex-1">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
            <p className="text-gray-600 mb-8">{error || 'The page you are looking for does not exist.'}</p>
            <a
              href="/"
              className="inline-block bg-getfund-red text-white px-8 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors"
            >
              Go to Homepage
            </a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Helper to check if page has legacy content structure
  const hasLegacyContent = () => {
    return page.content && (page.content.hero || (page.content.sections && page.content.sections.length > 0));
  };

  // Render legacy content from the old structure
  const renderLegacyContent = () => {
    if (!page.content) return null;

    return (
      <>
        {/* Legacy Hero Section */}
        {page.content.hero && (
          <div className="relative bg-gradient-to-r from-getfund-red to-red-600 text-white">
            <div className="container mx-auto px-4 py-20">
              <div className="max-w-4xl">
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  {page.content.hero.title}
                </h1>
                {page.content.hero.subtitle && (
                  <p className="text-xl md:text-2xl text-gray-100">
                    {page.content.hero.subtitle}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Legacy Sections */}
        {page.content.sections && page.content.sections.map((section: any, index: number) => {
          if (section.type === 'text-image') {
            return (
              <section key={index} className="py-16 bg-white">
                <div className="container mx-auto px-4">
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                      {section.title && (
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                          {section.title}
                        </h2>
                      )}
                      {section.subtitle && (
                        <p className="text-xl text-getfund-red font-semibold mb-6">
                          {section.subtitle}
                        </p>
                      )}
                      {section.content && (
                        <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                          {section.content}
                        </div>
                      )}
                    </div>
                    {section.image && (
                      <div className="rounded-lg overflow-hidden shadow-xl">
                        <img
                          src={section.image}
                          alt={section.title || 'Section image'}
                          className="w-full h-auto"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </section>
            );
          }

          if (section.type === 'vision-mission') {
            return (
              <section key={index} className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                  <div className="grid md:grid-cols-3 gap-8">
                    {section.items && section.items.map((item: any, itemIndex: number) => (
                      <div key={itemIndex} className="bg-white p-8 rounded-lg shadow-lg text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-getfund-red text-white rounded-full mb-6">
                          {item.icon === 'eye' && (
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          )}
                          {item.icon === 'target' && (
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          )}
                          {item.icon === 'heart' && (
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                          )}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                          {item.title}
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {item.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          }

          return null;
        })}
      </>
    );
  };

  // Check if page uses a specific template
  const PageTemplate = page.layout_template && page.layout_template !== 'generic'
    ? getPageTemplate(page.layout_template)
    : null;

  // Extract content from all page_content sections and merge them
  const getTemplateContent = () => {
    if (!page.sections || page.sections.length === 0) return {};

    // Find all page_content sections and merge their content
    const contentSections = page.sections.filter(s => s.section_type === 'page_content');

    if (contentSections.length === 0) return {};

    // If there's only one section, return its content directly
    if (contentSections.length === 1) {
      const content = contentSections[0].content || {};
      console.log('[CMSPage] Template content for', page.slug, ':', content);
      return content;
    }

    // If there are multiple sections, merge them all into one object
    const merged = contentSections.reduce((merged, section) => {
      return { ...merged, ...section.content };
    }, {});
    console.log('[CMSPage] Merged template content for', page.slug, ':', merged);
    return merged;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{page.meta_title || page.title}</title>
        {page.meta_description && <meta name="description" content={page.meta_description} />}
      </Helmet>

      <Header />
      <Breadcrumb />

      <main className="flex-1">
        {/* Render using page template if specified */}
        {PageTemplate && (
          <PageTemplate
            pageData={{
              title: page.title,
              meta_title: page.meta_title,
              meta_description: page.meta_description,
              template_variables: page.template_variables,
            }}
            content={getTemplateContent()}
          />
        )}

        {/* Render new CMS sections if no page template */}
        {!PageTemplate && page.sections && page.sections.length > 0 && (
          page.sections.map((section) => (
            <SectionRenderer key={section.id} section={section} />
          ))
        )}

        {/* Render legacy content if sections array is empty but content exists */}
        {!PageTemplate && (!page.sections || page.sections.length === 0) && hasLegacyContent() && renderLegacyContent()}

        {/* Show placeholder if no content at all */}
        {!PageTemplate && (!page.sections || page.sections.length === 0) && !hasLegacyContent() && (
          <div className="container mx-auto px-4 py-20">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{page.title}</h1>
              <p className="text-gray-600">This page has no content yet.</p>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
