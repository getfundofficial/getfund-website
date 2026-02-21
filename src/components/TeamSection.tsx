import { useState } from 'react';
import TeamMemberModal from './TeamMemberModal';

interface TeamMember {
  name: string;
  title: string;
  image: string;
  bio: string;
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
  bio?: string;
}

interface TeamSectionProps {
  sectionTitle?: string;
  sectionSubtitle?: string;
  boardGroupImage?: string;
  boardDescription?: string;
  chairman?: TeamMember;
  currentAdministrator?: CurrentAdmin;
  deputyAdministrator?: CurrentAdmin;
  financialController?: CurrentAdmin;
  pastAdministrators?: Administrator[];
}

export default function TeamSection({
  sectionTitle = 'Leadership & Governance',
  sectionSubtitle = 'Strong leadership and transparent governance for educational transformation',
  boardGroupImage = '/images/about/getfund-7th-board-inauguration.jpg',
  boardDescription,
  chairman,
  currentAdministrator,
  deputyAdministrator,
  financialController,
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

  const handleBoardOfDirectorsClick = () => {
    // Use CMS content if provided, otherwise use default
    const defaultContent = `
      <p class="text-lg mb-4">The GETFund Board of Directors comprises distinguished individuals with expertise in education, finance, and public administration.</p>

      <h3 class="text-xl font-bold text-gray-900 mb-3 mt-6">Organizational Structure</h3>
      <p class="mb-4">The Board provides strategic oversight and ensures accountability in all GETFund initiatives. Members bring decades of combined experience to guide the fund's mission of transforming Ghana's educational landscape.</p>

      <h3 class="text-xl font-bold text-gray-900 mb-4 mt-8">Key Responsibilities</h3>
      <ul class="space-y-3 mb-4">
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 rounded-full bg-[#8B2332] mt-2 flex-shrink-0"></span>
          <span>Setting strategic priorities aligned with national education goals</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 rounded-full bg-[#8B2332] mt-2 flex-shrink-0"></span>
          <span>Ensuring efficient resource utilization and project delivery</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 rounded-full bg-[#8B2332] mt-2 flex-shrink-0"></span>
          <span>Building partnerships across all education sectors</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-2 h-2 rounded-full bg-[#8B2332] mt-2 flex-shrink-0"></span>
          <span>Monitoring performance and educational outcomes</span>
        </li>
      </ul>

      <p class="text-sm text-gray-600 italic mt-6">Individual board member profiles coming soon.</p>
    `;

    setModalContent({
      title: 'Board of Directors',
      content: boardDescription || defaultContent,
      image: boardGroupImage,
      type: 'group'
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

  const handleChairmanClick = () => {
    if (!chairman) return;

    setModalContent({
      title: chairman.name,
      content: `
        <div class="mb-6">
          <p class="text-xl font-semibold text-getfund-primary mb-4">${chairman.title}</p>
        </div>

        <div class="prose prose-lg">
          ${chairman.bio || '<p class="text-gray-500 italic">Biography coming soon.</p>'}
        </div>
      `,
      image: chairman.image,
      type: 'individual'
    });
    setModalOpen(true);
  };

  const handleAdministratorClick = () => {
    if (!currentAdministrator) return;

    setModalContent({
      title: currentAdministrator.name,
      content: `
        <div class="mb-6">
          <p class="text-xl font-semibold text-getfund-gold mb-4">${currentAdministrator.title}</p>
        </div>

        <div class="prose prose-lg">
          ${currentAdministrator.bio || '<p class="text-gray-500 italic">Biography coming soon.</p>'}
        </div>
      `,
      image: currentAdministrator.image_url,
      type: 'individual'
    });
    setModalOpen(true);
  };

  const handleDeputyClick = () => {
    if (!deputyAdministrator) return;

    setModalContent({
      title: deputyAdministrator.name,
      content: `
        <div class="mb-6">
          <p class="text-xl font-semibold text-blue-600 mb-4">${deputyAdministrator.title}</p>
        </div>

        <div class="prose prose-lg">
          ${deputyAdministrator.bio || '<p class="text-gray-500 italic">Biography coming soon.</p>'}
        </div>
      `,
      image: deputyAdministrator.image_url,
      type: 'individual'
    });
    setModalOpen(true);
  };

  const handleFinancialControllerClick = () => {
    if (!financialController) return;

    setModalContent({
      title: financialController.name,
      content: `
        <div class="mb-6">
          <p class="text-xl font-semibold text-emerald-600 mb-4">${financialController.title}</p>
        </div>

        <div class="prose prose-lg">
          ${financialController.bio || '<p class="text-gray-500 italic">Biography coming soon.</p>'}
        </div>
      `,
      image: financialController.image_url,
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
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={handleChairmanClick}
                className="px-6 py-3 glass-card rounded-lg text-gray-700 font-medium transition-all"
              >
                Board Chair
              </button>
              <button
                onClick={handleBoardOfDirectorsClick}
                className="px-6 py-3 glass-card rounded-lg text-gray-700 font-medium transition-all"
              >
                Board of Directors
              </button>
              <button
                onClick={handlePastAdministratorsClick}
                className="px-6 py-3 glass-card rounded-lg text-gray-700 font-medium transition-all"
              >
                Past Administrators
              </button>
            </div>
          </div>

          {/* Leadership Cards: Administrator, Deputy Admin, Financial Controller */}
          <div className="mb-12">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Current Administrator Card */}
              {currentAdministrator ? (
                <div
                  className="group cursor-pointer"
                  onClick={handleAdministratorClick}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleAdministratorClick();
                    }
                  }}
                  aria-label={`View ${currentAdministrator.name} profile`}
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={currentAdministrator.image_url || '/images/placeholder.jpg'}
                      alt={currentAdministrator.name}
                      className="w-full h-full object-cover object-top transition-all duration-300 scale-105 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/placeholder.jpg';
                      }}
                    />
                  </div>
                  <div className="pt-4">
                    <p className="text-xs font-semibold text-getfund-gold uppercase tracking-wider mb-1">Administrator</p>
                    <h3 className="text-lg font-bold text-gray-900">{currentAdministrator.name}</h3>
                    <p className="text-sm text-gray-600">{currentAdministrator.title}</p>
                  </div>
                </div>
              ) : (
                <div className="border border-dashed border-gray-300 p-8 flex items-center justify-center aspect-[3/4]">
                  <p className="text-gray-400 text-center text-sm">
                    Administrator<br />coming soon
                  </p>
                </div>
              )}

              {/* Deputy Administrator Card */}
              {deputyAdministrator ? (
                <div
                  className="group cursor-pointer"
                  onClick={handleDeputyClick}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleDeputyClick();
                    }
                  }}
                  aria-label={`View ${deputyAdministrator.name} profile`}
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={deputyAdministrator.image_url || '/images/placeholder.jpg'}
                      alt={deputyAdministrator.name}
                      className="w-full h-full object-cover object-top transition-all duration-300 scale-105 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/placeholder.jpg';
                      }}
                    />
                  </div>
                  <div className="pt-4">
                    <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">Deputy Administrator</p>
                    <h3 className="text-lg font-bold text-gray-900">{deputyAdministrator.name}</h3>
                    <p className="text-sm text-gray-600">{deputyAdministrator.title}</p>
                  </div>
                </div>
              ) : (
                <div className="border border-dashed border-gray-300 p-8 flex items-center justify-center aspect-[3/4]">
                  <p className="text-gray-400 text-center text-sm">
                    Deputy Administrator<br />coming soon
                  </p>
                </div>
              )}

              {/* Financial Controller Card */}
              {financialController ? (
                <div
                  className="group cursor-pointer"
                  onClick={handleFinancialControllerClick}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleFinancialControllerClick();
                    }
                  }}
                  aria-label={`View ${financialController.name} profile`}
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={financialController.image_url || '/images/placeholder.jpg'}
                      alt={financialController.name}
                      className="w-full h-full object-cover object-top transition-all duration-300 scale-105 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/placeholder.jpg';
                      }}
                    />
                  </div>
                  <div className="pt-4">
                    <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">Financial Controller</p>
                    <h3 className="text-lg font-bold text-gray-900">{financialController.name}</h3>
                    <p className="text-sm text-gray-600">{financialController.title}</p>
                  </div>
                </div>
              ) : (
                <div className="border border-dashed border-gray-300 p-8 flex items-center justify-center aspect-[3/4]">
                  <p className="text-gray-400 text-center text-sm">
                    Financial Controller<br />coming soon
                  </p>
                </div>
              )}
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
