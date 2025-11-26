import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';

export default function Events() {
  // Placeholder events data - can be replaced with CMS data later
  const upcomingEvents = [
    {
      id: 1,
      title: 'Event 1',
      date: 'TBD',
      description: 'Event details coming soon',
    },
    {
      id: 2,
      title: 'Event 2',
      date: 'TBD',
      description: 'Event details coming soon',
    },
    {
      id: 3,
      title: 'Event 3',
      date: 'TBD',
      description: 'Event details coming soon',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Events | GETFund</title>
        <meta name="description" content="Upcoming GETFund events and fundraising activities" />
      </Helmet>

      <Header />
      <Breadcrumb />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-getfund-primary to-blue-700 text-white py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Events</h1>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Upcoming events
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  {/* Placeholder for event flyer/image */}
                  <div className="aspect-video bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-lg">Event Flyer</span>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-4">{event.date}</p>
                    <p className="text-gray-700">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {upcomingEvents.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No upcoming events at the moment.</p>
                <p className="text-gray-500 mt-2">Check back soon for updates!</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
