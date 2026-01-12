import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Calendar, Clock } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import FloatingContact from '../components/FloatingContact';
import LoadingScreen from '../components/LoadingScreen';
import { cmsApi } from '../services/cmsApi';

interface Event {
  id: number;
  title: string;
  date: string;
  description: string;
  imageUrl?: string;
}


interface EventsContent {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    title: string;
    subtitle?: string;
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
    return <LoadingScreen />;
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
        {/* Page Title Section - Clean, minimal */}
        <section className="bg-white pt-8 pb-6">
          <div className="container mx-auto px-4 max-w-6xl">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {content.hero?.title || 'Events'}
            </h1>
            <div className="w-16 h-1" style={{ backgroundColor: '#2a3f75' }} />
            {content.hero?.subtitle && (
              <p className="text-gray-600 mt-4 max-w-3xl">
                {content.hero.subtitle}
              </p>
            )}
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-12" style={{ backgroundColor: 'rgba(42, 63, 117, 0.03)' }}>
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {content.upcomingEvents?.heading || 'Upcoming Events'}
              </h2>
              <div className="w-12 h-1" style={{ backgroundColor: '#2a3f75' }} />
            </div>

            {events.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-transparent hover:-translate-y-1"
                  >
                    {/* Event image or placeholder */}
                    {event.imageUrl ? (
                      <img src={event.imageUrl} alt={event.title} className="aspect-video w-full object-cover" />
                    ) : (
                      <div className="aspect-video flex items-center justify-center" style={{ backgroundColor: 'rgba(42, 63, 117, 0.1)' }}>
                        <Calendar className="w-12 h-12" style={{ color: '#2a3f75' }} />
                      </div>
                    )}

                    <div className="p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#2a3f75] transition-colors">
                        {event.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <Clock className="w-4 h-4" />
                        <span>{event.date}</span>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(42, 63, 117, 0.1)' }}>
                  <Calendar className="w-8 h-8" style={{ color: '#2a3f75' }} />
                </div>
                <p className="text-gray-700 text-lg font-medium">{content.upcomingEvents?.emptyStateTitle || 'No upcoming events'}</p>
                <p className="text-gray-500 mt-2 text-sm">{content.upcomingEvents?.emptyStateSubtitle || 'Check back soon for new events!'}</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />

      {/* Floating Contact Button */}
      <FloatingContact />
    </div>
  );
}
