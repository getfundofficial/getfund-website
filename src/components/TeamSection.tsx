import { useState } from 'react';
import TeamMemberModal from './TeamMemberModal';

interface TeamMember {
  name: string;
  title: string;
  image: string;
  bio: string;
}

interface ManagementMember {
  id: string;
  name: string;
  title: string;
  image_url?: string;
  display_order: number;
}

interface Administrator {
  id: string;
  name: string;
  title: string;
  image_url?: string;
  date_range?: string;
  display_order: number;
}

interface CurrentAdmin {
  id: string;
  name: string;
  title: string;
  image_url?: string;
  date_range?: string;
}

interface TeamSectionProps {
  sectionTitle?: string;
  sectionSubtitle?: string;
  boardGroupImage?: string;
  chairman?: TeamMember;
  managementTeam?: ManagementMember[];
  currentAdministrator?: CurrentAdmin;
  pastAdministrators?: Administrator[];
}

export default function TeamSection({
  sectionTitle = 'Leadership & Governance',
  sectionSubtitle = 'Strong leadership and transparent governance for educational transformation',
  boardGroupImage = '/images/about/getfund-7th-board-inauguration.jpg',
  chairman,
  managementTeam = [],
  currentAdministrator,
  pastAdministrators = []
}: TeamSectionProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{
    title: string;
    content: string;
    image?: string;
    type: 'individual' | 'group' | 'gallery';
    galleryItems?: Array<{ name: string; title: string; image: string; dateRange?: string }>;
  }>({ title: '', content: '', type: 'group' });

  const handleManagementTeamClick = () => {
    const galleryItems = managementTeam.map(member => ({
      name: member.name,
      title: member.title,
      image: member.image_url || '/images/placeholder.jpg'
    }));

    setModalContent({
      title: 'Management Team',
      content: `
        <p class="text-lg mb-4">The GETFund Management Team executes the strategic vision set by the Board of Directors, ensuring operational excellence across all programs and initiatives.</p>
        <p class="mb-4">The team is led by experienced professionals who oversee daily operations, financial management, and program implementation.</p>
      `,
      type: 'gallery',
      galleryItems
    });
    setModalOpen(true);
  };

  const handlePastAdministratorsClick = () => {
    const galleryItems = pastAdministrators.map(admin => ({
      name: admin.name,
      title: admin.title,
      image: admin.image_url || '/images/placeholder.jpg',
      dateRange: admin.date_range
    }));

    setModalContent({
      title: 'Past Administrators',
      content: `
        <p class="text-lg mb-4">Leaders who have guided GETFund through its transformative journey since its establishment in 2000.</p>
      `,
      type: 'gallery',
      galleryItems
    });
    setModalOpen(true);
  };

  const handleBoardGroupClick = () => {
    setModalContent({
      title: 'Board of Directors',
      content: `
        <p class="text-lg mb-4">The GETFund Board of Directors comprises distinguished individuals with expertise in education, finance, and public administration.</p>

        <h3 class="text-xl font-bold text-gray-900 mb-3 mt-6">Organizational Structure</h3>
        <p class="mb-4">The Board provides strategic oversight and ensures accountability in all GETFund initiatives. Members bring decades of combined experience to guide the fund's mission of transforming Ghana's educational landscape.</p>

        <h3 class="text-xl font-bold text-gray-900 mb-3 mt-6">Key Responsibilities</h3>
        <ul class="space-y-2 mb-4">
          <li class="flex items-start gap-2">
            <span class="text-getfund-primary font-bold">•</span>
            <span>Setting strategic priorities aligned with national education goals</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-getfund-primary font-bold">•</span>
            <span>Ensuring efficient resource utilization and project delivery</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-getfund-primary font-bold">•</span>
            <span>Building partnerships across all education sectors</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-getfund-primary font-bold">•</span>
            <span>Monitoring performance and educational outcomes</span>
          </li>
        </ul>

        <p class="text-sm text-gray-600 italic mt-6">Individual board member profiles coming soon.</p>
      `,
      image: boardGroupImage,
      type: 'group'
    });
    setModalOpen(true);
  };

  const handleChairmanClick = () => {
    if (!chairman) return;

    setModalContent({
      title: chairman.name,
      content: `
        <div class="mb-6">
          <p class="text-xl font-semibold text-getfund-primary mb-4">${chairman.title}</p>
        </div>

        <div class="prose prose-lg">
          ${chairman.bio}
        </div>
      `,
      image: chairman.image,
      type: 'individual'
    });
    setModalOpen(true);
  };

  return (
    <>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {sectionTitle}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
              {sectionSubtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              <button
                onClick={handleManagementTeamClick}
                className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium shadow-sm hover:bg-gray-50 hover:shadow-md transition-all"
              >
                Management Team
              </button>
              <button
                onClick={handlePastAdministratorsClick}
                className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium shadow-sm hover:bg-gray-50 hover:shadow-md transition-all"
              >
                Past Administrators
              </button>
            </div>
          </div>

          {/* Unified Leadership Section: Chairman, Administrator, and Group Photo */}
          <div className="mb-12">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Board Chairman Card */}
              {chairman ? (
                <div className="lg:col-span-1">
                  <div
                    className="group bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl h-full"
                    onClick={handleChairmanClick}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleChairmanClick();
                      }
                    }}
                    aria-label={`View ${chairman.name} profile`}
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
                      <img
                        src={chairman.image}
                        alt={chairman.name}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/board/s8507362-member1.jpg';
                        }}
                      />
                      {/* Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center gap-2 bg-getfund-primary text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                          Board Chairman
                        </span>
                      </div>
                    </div>
                    {/* Info */}
                    <div className="bg-gray-900 text-white p-5 text-center">
                      <h3 className="text-xl font-bold mb-1">{chairman.name}</h3>
                      <p className="text-sm text-gray-300">{chairman.title}</p>
                      <p className="text-xs text-getfund-gold mt-2">Click to view profile</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="lg:col-span-1">
                  <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-8 h-full flex items-center justify-center">
                    <p className="text-gray-500 text-center">
                      Board Chairman profile coming soon
                    </p>
                  </div>
                </div>
              )}

              {/* Current Administrator Card */}
              {currentAdministrator ? (
                <div className="lg:col-span-1">
                  <div className="group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl h-full">
                    {/* Image */}
                    <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
                      <img
                        src={currentAdministrator.image_url || '/images/placeholder.jpg'}
                        alt={currentAdministrator.name}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/placeholder.jpg';
                        }}
                      />
                      {/* Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center gap-2 bg-getfund-gold text-gray-900 px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                          <span className="w-1.5 h-1.5 bg-gray-900 rounded-full animate-pulse"></span>
                          Administrator
                        </span>
                      </div>
                    </div>
                    {/* Info */}
                    <div className="bg-gray-900 text-white p-5 text-center">
                      <h3 className="text-xl font-bold mb-1">{currentAdministrator.name}</h3>
                      <p className="text-sm text-gray-300">{currentAdministrator.title}</p>
                      {currentAdministrator.date_range && (
                        <p className="text-xs text-getfund-gold mt-2">{currentAdministrator.date_range}</p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="lg:col-span-1">
                  <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-8 h-full flex items-center justify-center">
                    <p className="text-gray-500 text-center">
                      Administrator profile coming soon
                    </p>
                  </div>
                </div>
              )}

              {/* Group Photo Card (Big Picture) */}
              <div className="lg:col-span-1">
                <div
                  className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group transition-all hover:shadow-2xl h-full"
                  onClick={handleBoardGroupClick}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleBoardGroupClick();
                    }
                  }}
                  aria-label="View Board of Directors details"
                >
                  <div className="relative h-full min-h-[400px]">
                    <img
                      src={boardGroupImage}
                      alt="Board of Directors Group Photo"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-bold mb-2">Board of Directors</h3>
                      <p className="text-sm text-gray-200 group-hover:text-white transition-colors">
                        Click to view details
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TeamMemberModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalContent.title}
        content={modalContent.content}
        image={modalContent.image}
        type={modalContent.type}
        galleryItems={modalContent.galleryItems}
      />
    </>
  );
}
