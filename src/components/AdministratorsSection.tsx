import { TeamMember } from '../services/cmsApi';

interface AdministratorsSectionProps {
  administrators: TeamMember[];
  title?: string;
  subtitle?: string;
}

// Fallback data when CMS is not available
const fallbackAdministrators: TeamMember[] = [
  {
    id: '1',
    name: 'Mr. Fosubua Banahene',
    title: 'Administrator',
    role: 'historical_admin',
    image_url: '/images/board/s8507362-member1.jpg',
    date_range: '2001-2009',
    display_order: 1,
    status: 'active'
  },
  {
    id: '2',
    name: 'Mr. Sam Garbah',
    title: 'Administrator',
    role: 'historical_admin',
    image_url: '/images/board/s8507358-member2.jpg',
    date_range: '2009-2017',
    display_order: 2,
    status: 'active'
  },
  {
    id: '3',
    name: 'Dr. Richard A Boadu',
    title: 'Administrator',
    role: 'historical_admin',
    image_url: '/images/board/s8507356-member3.jpg',
    date_range: '2017-2024',
    display_order: 3,
    status: 'active'
  },
  {
    id: '4',
    name: 'Mr. Paul Adjei',
    title: 'Administrator',
    role: 'historical_admin',
    image_url: '/images/board/s8507353-member4.jpg',
    date_range: '2025-Date',
    display_order: 4,
    status: 'active'
  }
];

export default function AdministratorsSection({
  administrators,
  title = 'Administrators',
  subtitle = 'Leaders who have guided GETFund through its transformative journey'
}: AdministratorsSectionProps) {
  // Use fallback data if no administrators provided
  const adminsToDisplay = administrators.length > 0 ? administrators : fallbackAdministrators;

  // Sort by date range to find current admin (latest year or "Date" in date_range)
  const sortedAdmins = [...adminsToDisplay].sort((a, b) => {
    const getEndYear = (dateRange?: string) => {
      if (!dateRange) return 0;
      if (dateRange.toLowerCase().includes('date') || dateRange.toLowerCase().includes('present')) {
        return 9999; // Current admin
      }
      const match = dateRange.match(/(\d{4})$/);
      return match ? parseInt(match[1]) : 0;
    };
    return getEndYear(b.date_range) - getEndYear(a.date_range);
  });

  const currentAdmin = sortedAdmins[0];
  const pastAdmins = sortedAdmins.slice(1);

  // Check if current admin has "Date" or "Present" in date_range
  const isCurrentAdmin = (admin: TeamMember) => {
    return admin.date_range?.toLowerCase().includes('date') ||
           admin.date_range?.toLowerCase().includes('present');
  };

  const hasCurrentAdmin = currentAdmin && isCurrentAdmin(currentAdmin);

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Main Layout: Current Admin (Left) + Past Admins (Right) */}
        {hasCurrentAdmin ? (
          <div className="max-w-9xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Current Administrator - Large Card on Left */}
              <div className="lg:col-span-7">
                <div className="relative group h-full">
                  {/* Current Admin Badge */}
                  <div className="absolute -top-3 left-6 z-10">
                    <span className="inline-flex items-center gap-2 bg-getfund-primary text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                      Current Administrator
                    </span>
                  </div>

                  {/* Main Card */}
                  <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 h-full">
                    {/* Large Image */}
                    <div className="relative aspect-[3/4] lg:aspect-auto lg:h-full overflow-hidden">
                      <img
                        src={currentAdmin.image_url || '/images/placeholder.jpg'}
                        alt={currentAdmin.name}
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/placeholder.jpg';
                        }}
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                      {/* Name Overlay on Image */}
                      <div className="absolute bottom-0 left-0 right-0 p-8">
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
                          {currentAdmin.name}
                        </h3>
                        <p className="text-getfund-gold text-lg font-medium mb-3">
                          {currentAdmin.title}
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-0.5 bg-getfund-gold"></div>
                          <span className="text-white/90 font-medium">{currentAdmin.date_range}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Past Administrators - Stacked on Right */}
              <div className="lg:col-span-5">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Past Administrators</h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-getfund-primary to-getfund-gold rounded-full"></div>
                </div>

                <div className="space-y-4">
                  {pastAdmins.map((admin, index) => (
                    <div
                      key={admin.id}
                      className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-getfund-primary/30"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center">
                        {/* Thumbnail Image */}
                        <div className="relative w-28 h-28 flex-shrink-0 overflow-hidden">
                          <img
                            src={admin.image_url || '/images/placeholder.jpg'}
                            alt={admin.name}
                            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/images/placeholder.jpg';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10"></div>
                        </div>

                        {/* Info */}
                        <div className="flex-1 p-4">
                          <h4 className="font-bold text-gray-900 group-hover:text-getfund-primary transition-colors text-lg mb-1">
                            {admin.name}
                          </h4>
                          <p className="text-sm text-gray-500 mb-2">{admin.title}</p>
                          <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold group-hover:bg-getfund-primary/10 group-hover:text-getfund-primary transition-colors">
                            {admin.date_range}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Timeline End Marker */}
                <div className="flex items-center gap-3 mt-6 pl-4">
                  <div className="w-3 h-3 rounded-full bg-getfund-primary/30"></div>
                  <span className="text-sm text-gray-500 italic">Since 2001</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Fallback: Grid layout if no current admin */
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-9xl mx-auto">
            {sortedAdmins.map((admin, index) => (
              <div
                key={admin.id}
                className="group relative"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={admin.image_url || '/images/placeholder.jpg'}
                      alt={admin.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/placeholder.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300"></div>

                    <div className="absolute top-4 right-4">
                      <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-bold shadow-md">
                        {admin.date_range}
                      </span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h4 className="text-xl font-bold text-white mb-1 drop-shadow-lg">
                        {admin.name}
                      </h4>
                      {admin.title && (
                        <p className="text-gray-200 text-sm font-medium drop-shadow">
                          {admin.title}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="h-1 bg-gradient-to-r from-getfund-primary via-getfund-gold to-getfund-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
