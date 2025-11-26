import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Breadcrumb from './Breadcrumb';
import Footer from './Footer';
import { cmsApi, CMSPage as CMSPageType } from '../services/cmsApi';

/**
 * Generic CMS-driven page component
 * Renders any page from the CMS dynamically based on slug
 */
export default function CMSPage() {
  const { slug, childSlug } = useParams<{ slug?: string; childSlug?: string }>();
  const [pageData, setPageData] = useState<CMSPageType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Determine which slug to fetch (child page takes precedence)
  const pageSlug = childSlug || slug || '';

  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true);
        setError(null);

        const page = await cmsApi.getPageBySlug(pageSlug);

        if (!page) {
          setError('Page not found');
          return;
        }

        setPageData(page);
      } catch (err) {
        console.error('Error fetching page:', err);
        setError('Failed to load page content');
      } finally {
        setLoading(false);
      }
    };

    if (pageSlug) {
      fetchPage();
    }
  }, [pageSlug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-getfund-primary mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading content...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !pageData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
            <p className="text-gray-600 mb-8">{error || 'The requested page could not be found.'}</p>
            <a href="/" className="inline-block bg-getfund-primary text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors">
              Go to Homepage
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Breadcrumb />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-getfund-primary via-getfund-secondary to-red-900 text-white pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
                {pageData.title}
              </h1>
              {pageData.meta_description && (
                <p className="text-xl md:text-2xl text-red-100 leading-relaxed">
                  {pageData.meta_description}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Render page sections dynamically */}
        {pageData.sections && pageData.sections.length > 0 ? (
          pageData.sections
            .filter(section => section.is_active)
            .sort((a, b) => a.order_index - b.order_index)
            .map(section => (
              <RenderSection key={section.id} section={section} />
            ))
        ) : (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto prose prose-lg">
                <p className="text-gray-600">
                  This page is under construction. Content will be added soon.
                </p>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}

/**
 * Render individual sections based on section type
 */
function RenderSection({ section }: { section: any }) {
  const { section_type, content, title } = section;

  switch (section_type) {
    case 'page_content':
      return <RenderPageContent content={content} title={title} />;

    case 'html':
      return <RenderHTML content={content} />;

    case 'text':
      return <RenderText content={content} title={title} />;

    case 'image':
      return <RenderImage content={content} />;

    default:
      // Generic fallback rendering
      return (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {title && <h2 className="text-3xl font-bold text-gray-900 mb-6">{title}</h2>}
              <div className="prose prose-lg max-w-none">
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                  {JSON.stringify(content, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </section>
      );
  }
}

function RenderPageContent({ content, title }: { content: any; title?: string }) {
  // Page content with tabs (like Who We Are)
  if (content.tabs && Array.isArray(content.tabs)) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {title && <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">{title}</h2>}
            {content.tabs.map((tab: any, index: number) => (
              <div key={index} className="mb-12">
                {tab.heading && <h3 className="text-2xl font-bold text-getfund-primary mb-4">{tab.heading}</h3>}
                {tab.content && (
                  <div
                    className="prose prose-lg max-w-none text-gray-700"
                    dangerouslySetInnerHTML={{ __html: tab.content }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Simple text content
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto prose prose-lg">
          {title && <h2>{title}</h2>}
          <div dangerouslySetInnerHTML={{ __html: content.text || content.body || '' }} />
        </div>
      </div>
    </section>
  );
}

function RenderHTML({ content }: { content: any }) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <div dangerouslySetInnerHTML={{ __html: content.html || content.body || '' }} />
        </div>
      </div>
    </section>
  );
}

function RenderText({ content, title }: { content: any; title?: string }) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {title && <h2 className="text-3xl font-bold text-gray-900 mb-6">{title}</h2>}
          <div className="prose prose-lg text-gray-700">
            <p>{content.text || content.body || ''}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function RenderImage({ content }: { content: any }) {
  if (!content.url && !content.image_url) return null;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <img
            src={content.url || content.image_url}
            alt={content.alt || content.caption || ''}
            className="w-full h-auto rounded-lg shadow-lg"
          />
          {content.caption && (
            <p className="text-center text-gray-600 mt-4 italic">{content.caption}</p>
          )}
        </div>
      </div>
    </section>
  );
}
