import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import PageBanner from '../components/PageBanner';
import ContactSection from '../components/ContactSection';
import { cmsApi } from '../services/cmsApi';

interface Event {
  id: number;
  title: string;
  date: string;
  description: string;
  imageUrl?: string;
}

interface BannerBackground {
  imageUrl?: string | null;
  tintColor?: string;
  tintOpacity?: number;
}

interface EventsContent {
  bannerBackground?: BannerBackground;
  meta: {
    title: string;
    description: string;
  };
  hero: {
    title: string;
  };
  upcomingEvents: {
    heading: string;
    events: Event[];
    emptyStateTitle: string;
    emptyStateSubtitle: string;
  };
}

export default function Events() {
  const [content, setContent] = useState<EventsContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const page = await cmsApi.getPageBySlug('events');
        const section = page.sections?.find(s => s.section_type === 'page_content');
        if (section?.content) {
          setContent(section.content as EventsContent);
        }
      } catch (error) {
        console.error('Failed to load page content:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-getfund-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Content not found</p>
      </div>
    );
  }

  const events = content.upcomingEvents?.events || [];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{content.meta?.title || 'Events | GETFund'}</title>
        <meta name="description" content={content.meta?.description || 'Upcoming GETFund events and fundraising activities'} />
      </Helmet>

      <Header />
      <Breadcrumb />

      <main className="flex-1">
        <PageBanner
          title={content.hero?.title || 'Events'}
          bannerBackground={content.bannerBackground}
          defaultGradient="linear-gradient(to right, #DC143C, #2563EB)"
        />

        {/* Upcoming Events */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              {content.upcomingEvents?.heading}
            </h2>

            {events.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  >
                    {/* Event image or placeholder */}
                    {event.imageUrl ? (
                      <img src={event.imageUrl} alt={event.title} className="aspect-video w-full object-cover" />
                    ) : (
                      <div className="aspect-video bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-lg">Event Flyer</span>
                      </div>
                    )}

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                      <p className="text-gray-600 mb-4">{event.date}</p>
                      <p className="text-gray-700">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">{content.upcomingEvents?.emptyStateTitle}</p>
                <p className="text-gray-500 mt-2">{content.upcomingEvents?.emptyStateSubtitle}</p>
              </div>
            )}
          </div>
        </section>

        {/* Contact Section */}
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
