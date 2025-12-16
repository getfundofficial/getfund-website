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
  managementGroupImage?: string;
  chairman?: TeamMember;
  managementTeam?: ManagementMember[];
  currentAdministrator?: CurrentAdmin;
  pastAdministrators?: Administrator[];
}

export default function TeamSection({
  sectionTitle = 'Leadership & Governance',
  sectionSubtitle = 'Strong leadership and transparent governance for educational transformation',
  boardGroupImage = '/images/about/getfund-7th-board-inauguration.jpg',
  managementGroupImage = '/images/about/getfund-7th-board-inauguration.jpg',
  chairman,
  managementTeam = [],
  currentAdministrator,
  pastAdministrators = []
}: TeamSectionProps) {
  const [activeTab, setActiveTab] = useState<'board' | 'management' | 'administrators'>('board');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{
    title: string;
    content: string;
    image?: string;
    type: 'individual' | 'group';
  }>({ title: '', content: '', type: 'group' });

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

  const handleManagementGroupClick = () => {
    setModalContent({
      title: 'Management Team',
      content: `
        <p class="text-lg mb-4">The GETFund Management Team executes the strategic vision set by the Board of Directors, ensuring operational excellence across all programs and initiatives.</p>

        <h3 class="text-xl font-bold text-gray-900 mb-3 mt-6">Leadership Structure</h3>
        <p class="mb-4">The team is led by experienced professionals who oversee daily operations, financial management, and program implementation.</p>

        <h3 class="text-xl font-bold text-gray-900 mb-3 mt-6">Key Positions</h3>
        <ul class="space-y-3 mb-4">
          <li>
            <strong class="text-getfund-primary">Administrator</strong>
            <p class="text-gray-600">Provides overall leadership and ensures alignment with strategic objectives</p>
          </li>
          <li>
            <strong class="text-getfund-primary">Deputy Administrator</strong>
            <p class="text-gray-600">Supports the Administrator and oversees operational functions</p>
          </li>
          <li>
            <strong class="text-getfund-primary">Financial Controller</strong>
            <p class="text-gray-600">Manages financial operations, budgeting, and resource allocation</p>
          </li>
        </ul>

        <p class="text-sm text-gray-600 italic mt-6">Individual management team profiles coming soon.</p>
      `,
      image: managementGroupImage,
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
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {sectionTitle}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {sectionSubtitle}
            </p>
          </div>

          {/* Current Administrator - Featured */}
          {currentAdministrator && (
            <div className="max-w-md mx-auto mb-12">
              <div className="group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl">
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
                    <span className="inline-flex items-center gap-2 bg-getfund-primary text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                      Current Administrator
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
          )}

          {/* Tab Switcher */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex rounded-lg border border-gray-300 bg-white p-1 shadow-sm">
              <button
                onClick={() => setActiveTab('board')}
                className={`px-5 py-2.5 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'board'
                    ? 'bg-getfund-primary text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Board of Directors
              </button>
              <button
                onClick={() => setActiveTab('management')}
                className={`px-5 py-2.5 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'management'
                    ? 'bg-getfund-primary text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Management Team
              </button>
              <button
                onClick={() => setActiveTab('administrators')}
                className={`px-5 py-2.5 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'administrators'
                    ? 'bg-getfund-primary text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Past Administrators
              </button>
            </div>
          </div>

          {/* Board of Directors Tab Content */}
          {activeTab === 'board' && (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Board Chairman Card - 1/3 width (LEFT SIDE) */}
              {chairman && (
                <div className="lg:col-span-1 lg:order-1">
                  <div
                    className="group bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl"
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
              )}

              {/* Placeholder if no chairman data */}
              {!chairman && (
                <div className="lg:col-span-1 lg:order-1">
                  <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-8 h-full flex items-center justify-center">
                    <p className="text-gray-500 text-center">
                      Board Chairman profile coming soon
                    </p>
                  </div>
                </div>
              )}

              {/* Group Photo Card - 2/3 width (RIGHT SIDE) */}
              <div className="lg:col-span-2 lg:order-2">
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
                  <div className="relative h-full">
                    <img
                      src={boardGroupImage}
                      alt="Board of Directors Group Photo"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <h3 className="text-2xl font-bold mb-2">Board of Directors</h3>
                      <p className="text-sm text-gray-200 group-hover:text-white transition-colors">
                        Click to learn more about our board structure and responsibilities
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Management Team Tab Content */}
          {activeTab === 'management' && (
            <div className="grid md:grid-cols-3 gap-8">
              {managementTeam.map((member) => (
                <div
                  key={member.id}
                  className="group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/5] bg-gray-50 overflow-hidden">
                    <img
                      src={member.image_url || '/images/placeholder.jpg'}
                      alt={member.name}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/board/s8507362-member1.jpg';
                      }}
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                  </div>

                  {/* Info Section */}
                  <div className="bg-gray-900 text-white p-5">
                    <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                    <p className="text-sm text-gray-300">{member.title}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Past Administrators Tab Content */}
          {activeTab === 'administrators' && (
            <div className="grid md:grid-cols-3 gap-8">
              {pastAdministrators.length > 0 ? (
                pastAdministrators.map((admin) => (
                  <div
                    key={admin.id}
                    className="group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-[4/5] bg-gray-50 overflow-hidden">
                      <img
                        src={admin.image_url || '/images/placeholder.jpg'}
                        alt={admin.name}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/placeholder.jpg';
                        }}
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                    </div>

                    {/* Info Section */}
                    <div className="bg-gray-900 text-white p-5">
                      <h3 className="text-lg font-bold mb-1">{admin.name}</h3>
                      <p className="text-sm text-gray-300">{admin.title}</p>
                      {admin.date_range && (
                        <p className="text-xs text-getfund-gold mt-2">{admin.date_range}</p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
                  <p className="text-gray-500">Past administrators information coming soon</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <TeamMemberModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalContent.title}
        content={modalContent.content}
        image={modalContent.image}
        type={modalContent.type}
      />
    </>
  );
}
