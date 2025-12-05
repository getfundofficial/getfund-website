import { useState } from 'react';
import TeamMemberModal from './TeamMemberModal';

interface TeamMember {
  name: string;
  title: string;
  image: string;
  bio: string;
}

interface TeamSectionProps {
  boardGroupImage?: string;
  managementGroupImage?: string;
  chairman?: TeamMember;
}

export default function TeamSection({
  boardGroupImage = '/images/about/getfund-board.jpg',
  managementGroupImage = '/images/about/management-team.jpg',
  chairman
}: TeamSectionProps) {
  const [activeTab, setActiveTab] = useState<'board' | 'management'>('board');
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
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Leadership Team
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Meet the experienced professionals guiding GETFund's mission to transform education in Ghana
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-lg border border-gray-300 bg-gray-50 p-1">
              <button
                onClick={() => setActiveTab('board')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === 'board'
                    ? 'bg-white text-getfund-primary shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Board of Directors
              </button>
              <button
                onClick={() => setActiveTab('management')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === 'management'
                    ? 'bg-white text-getfund-primary shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Management Team
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
                    className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group transition-all hover:shadow-2xl h-full flex flex-col"
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
                    <div className="bg-gray-900 text-white px-6 py-4 text-center">
                      <h3 className="text-lg font-bold">Board Chairman</h3>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <img
                        src={chairman.image}
                        alt={chairman.name}
                        className="w-full h-64 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="text-center flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="text-xl font-bold text-gray-900 mb-2">{chairman.name}</h4>
                          <p className="text-sm text-getfund-primary font-semibold mb-4">{chairman.title}</p>
                        </div>
                        <button className="w-full bg-getfund-primary text-white px-4 py-3 rounded-lg font-semibold hover:bg-getfund-secondary transition-colors">
                          View Full Profile
                        </button>
                      </div>
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
              {/* Administrator */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <img
                  src="/images/about/paul-adjei.jpg"
                  alt="Mr. Paul Adjei"
                  className="w-full h-80 object-cover"
                />
                <div className="bg-gray-900 text-white text-center py-4 px-6">
                  <h3 className="text-lg font-bold">Mr. Paul Adjei</h3>
                </div>
                <div className="bg-gray-900 text-white text-center py-3 px-6 border-t border-gray-700">
                  <p className="text-sm font-semibold">Administrator</p>
                </div>
              </div>

              {/* Deputy Administrator */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <img
                  src="/images/about/alhassan-dandaawa.jpg"
                  alt="Hon. Alhassan S. Dandaawa"
                  className="w-full h-80 object-cover"
                />
                <div className="bg-gray-900 text-white text-center py-4 px-6">
                  <h3 className="text-lg font-bold">Hon. Alhassan S. Dandaawa</h3>
                </div>
                <div className="bg-gray-900 text-white text-center py-3 px-6 border-t border-gray-700">
                  <p className="text-sm font-semibold">Deputy Administrator</p>
                </div>
              </div>

              {/* Financial Controller */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <img
                  src="/images/about/alexis-asuinura.jpg"
                  alt="Mr. Alexis K. Asuinura"
                  className="w-full h-80 object-cover"
                />
                <div className="bg-gray-900 text-white text-center py-4 px-6">
                  <h3 className="text-lg font-bold">Mr. Alexis K. Asuinura</h3>
                </div>
                <div className="bg-gray-900 text-white text-center py-3 px-6 border-t border-gray-700">
                  <p className="text-sm font-semibold">Financial Controller</p>
                </div>
              </div>
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
