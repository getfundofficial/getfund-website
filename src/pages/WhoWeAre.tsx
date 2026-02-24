import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
import Footer from '../components/Footer';
import TeamSection from '../components/TeamSection';
import LoadingScreen from '../components/LoadingScreen';
import { cmsApi, TeamMember as TeamMemberType } from '../services/cmsApi';


interface PageContent {
  // Hero Section
  heroTitle?: string;
  heroSubtitle?: string;

  // About GETFund Section
  mainImage?: string;
  mainImageAlt?: string;
  mainHeading?: string;
  redHeading?: string;
  paragraph1?: string;
  paragraph2?: string;

  // Mission, Vision, Values
  vision?: { title: string; description: string };
  mission?: { title: string; description: string };
  values?: { title: string; description: string };

  // Educational Financing
  financingTitle?: string;
  costSharingPolicy?: string;
  publicResponsibility?: string;

  // Funding Formula
  fundingFormulaTitle?: string;
  fundingFormulaIntro?: string;
  relevantFactors?: string[];

  // Leadership & Governance
  leadershipTitle?: string;
  leadershipSubtitle?: string;

  // Board of Trustees
  boardImage?: string;
  boardTitle?: string;
  boardMembers?: Array<{ name: string; organization: string }>;
  boardCommitments?: Array<{
    title: string;
    description: string;
    icon: string;
  }>;

  // Footer Message
  footerMessage?: string;
}

// Helper function to find team member by role or title
function findTeamMember(
  members: TeamMemberType[],
  role: string,
  titleKeywords?: string[]
): TeamMemberType | null {
  // First try to find by exact role
  const byRole = members.find(m => m.role === role && m.status === 'active');
  if (byRole) return byRole;

  // Fallback: search by title keywords in management members
  if (titleKeywords) {
    const byTitle = members.find(m => {
      const title = m.title.toLowerCase();
      return titleKeywords.every(kw => title.includes(kw.toLowerCase())) && m.status === 'active';
    });
    if (byTitle) return byTitle;
  }

  return null;
}

export default function WhoWeAre() {
  const [pageContent, setPageContent] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [teamData, setTeamData] = useState<{
    chairman: TeamMemberType | null;
    administrator: TeamMemberType | null;
    deputyAdministrator: TeamMemberType | null;
    financialController: TeamMemberType | null;
    historicalAdmins: TeamMemberType[];
    allMembers: TeamMemberType[];
  }>({
    chairman: null,
    administrator: null,
    deputyAdministrator: null,
    financialController: null,
    historicalAdmins: [],
    allMembers: []
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        // Fetch page content
        const response = await cmsApi.getPageBySlug('about');

        // Fetch team members from API
        const apiResponse = await cmsApi.getTeamMembers();
        console.log('[WhoWeAre] API Response:', apiResponse);

        // Combine all members into a single array for easier searching
        const allMembers: TeamMemberType[] = [
          ...(apiResponse.chairman ? [apiResponse.chairman] : []),
          ...apiResponse.management,
          ...apiResponse.historical_admins,
          ...(apiResponse.deputy_administrator ? [apiResponse.deputy_administrator] : []),
          ...(apiResponse.financial_controller ? [apiResponse.financial_controller] : [])
        ];

        // Find each leadership position
        const chairman = apiResponse.chairman || findTeamMember(allMembers, 'board_chairman');

        // Administrator: look for role=management with title containing "administrator" but not "deputy"
        const administrator = findTeamMember(
          apiResponse.management,
          'administrator', // This won't match, so it'll use title fallback
          ['administrator']
        ) || apiResponse.management.find(m =>
          m.title.toLowerCase().includes('administrator') &&
          !m.title.toLowerCase().includes('deputy') &&
          m.status === 'active'
        ) || null;

        // Deputy Administrator: check dedicated field first, then fallback
        const deputyAdministrator = apiResponse.deputy_administrator ||
          findTeamMember(apiResponse.management, 'deputy_administrator', ['deputy', 'administrator']);

        // Financial Controller: check dedicated field first, then fallback
        const financialController = apiResponse.financial_controller ||
          findTeamMember(apiResponse.management, 'financial_controller', ['financial', 'controller']);

        // Historical admins: filter out current ones
        const historicalAdmins = apiResponse.historical_admins
          .filter(admin =>
            !admin.date_range?.toLowerCase().includes('date') &&
            !admin.date_range?.toLowerCase().includes('present')
          )
          .sort((a, b) => {
            const getEndYear = (dateRange?: string) => {
              if (!dateRange) return 0;
              const match = dateRange.match(/(\d{4})$/);
              return match ? parseInt(match[1]) : 0;
            };
            return getEndYear(b.date_range) - getEndYear(a.date_range);
          });

        setTeamData({
          chairman,
          administrator,
          deputyAdministrator,
          financialController,
          historicalAdmins,
          allMembers
        });

        console.log('[WhoWeAre] Processed team data:', {
          chairman: chairman?.name,
          administrator: administrator?.name,
          deputyAdministrator: deputyAdministrator?.name,
          financialController: financialController?.name,
          historicalAdmins: historicalAdmins.map(a => a.name)
        });

        if (response && response.sections) {
          // Look for page_content section first
          const pageContentSection = response.sections.find((s: any) => s.section_type === 'page_content');

          if (pageContentSection && pageContentSection.content) {
            // Use page_content section directly
            setPageContent(pageContentSection.content as PageContent);
          } else {
            // Fallback: Map individual sections (legacy support)
            const content: PageContent = {};

            response.sections.forEach((section: any) => {
              if (section.section_key === 'hero' && section.content) {
                content.heroTitle = section.content.title;
                content.heroSubtitle = section.content.subtitle;
              } else if (section.section_key === 'ghana_education_trust_fund' && section.content) {
                content.mainHeading = section.content.heading;
                content.redHeading = section.content.subheading;
                content.mainImage = section.content.image;
                content.mainImageAlt = section.content.imageAlt;
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = section.content.body;
                const paragraphs = Array.from(tempDiv.querySelectorAll('p')).map(p => p.textContent || '');
                content.paragraph1 = paragraphs[0];
                content.paragraph2 = paragraphs[1];
              } else if (section.section_key === 'vision_mission_values' && section.content) {
                content.vision = section.content.vision;
                content.mission = section.content.mission;
                content.values = section.content.values;
              } else if (section.section_key === 'educational_financing' && section.content) {
                content.financingTitle = section.content.heading;
                if (section.content.sections && section.content.sections.length >= 2) {
                  content.costSharingPolicy = section.content.sections[0].body;
                  content.publicResponsibility = section.content.sections[1].body;
                }
              } else if (section.section_key === 'funding_formula' && section.content) {
                content.fundingFormulaTitle = section.content.heading;
                content.fundingFormulaIntro = section.content.introduction;
                content.relevantFactors = section.content.factors;
              } else if (section.section_key === 'leadership_governance' && section.content) {
                content.leadershipTitle = section.content.heading;
                content.leadershipSubtitle = section.content.subtitle;
                content.boardTitle = section.content.boardTitle;
                content.boardMembers = section.content.boardMembers;
                content.boardImage = section.content.boardImage;
                content.boardCommitments = section.content.commitments?.map((c: any, i: number) => ({
                  title: c.title,
                  description: c.description,
                  icon: String(i + 1)
                }));
              } else if (section.section_key === 'footer_cta' && section.content) {
                content.footerMessage = section.content.heading;
              }
            });

            setPageContent(content);
          }
        }
      } catch (error) {
        console.error('Failed to fetch who-we-are content from CMS:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Breadcrumb />
      <main className="flex-1">
        {/* Page Title Section */}
        <section className="pt-8 pb-6">
          <div className="container mx-auto px-4 max-w-7xl">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {pageContent?.heroTitle || 'About Us'}
            </h1>
            <div className="w-16 h-1" style={{ backgroundColor: '#2a3f75' }} />
          </div>
        </section>

        {/* Main Content - Ghana Education Trust Fund */}
        <section className="py-16 md:py-24 bg-white relative overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#2a3f75 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

          <div className="container mx-auto px-4 max-w-7xl relative">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
              {/* Image with enhanced styling */}
              <div className="relative group">
                <div className="absolute -inset-4 rounded-2xl opacity-20 blur-xl transition-all duration-500 group-hover:opacity-30" style={{ backgroundColor: '#2a3f75' }} />
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src={pageContent?.mainImage || '/images/about/getfund-7th-board-inauguration.jpg'}
                    alt={pageContent?.mainImageAlt || 'GETFund Board'}
                    className="w-full h-[400px] md:h-[520px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>

              {/* Text content with accent styling */}
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 rounded-full hidden lg:block" style={{ backgroundColor: '#2a3f75' }} />
                <div className="lg:pl-8">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    {pageContent?.mainHeading || 'Ghana Education Trust Fund'}
                  </h2>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style={{ backgroundColor: 'rgba(42, 63, 117, 0.1)' }}>
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#2a3f75' }} />
                    <span className="text-sm md:text-base font-semibold" style={{ color: '#2a3f75' }}>
                      {pageContent?.redHeading || 'Since its establishment in 2000'}
                    </span>
                  </div>
                  <div className="space-y-6 text-gray-600 leading-relaxed text-base md:text-lg">
                    <p>
                      {pageContent?.paragraph1 || 'The Fund has remained committed to its mandate as enshrined in its governing legislation, Act 581. The object of the Fund is to provide funding to supplement the government\'s efforts in providing educational infrastructure and facilities at all levels.'}
                    </p>
                    <p>
                      {pageContent?.paragraph2 || 'GETFund has, since its inception, remained a significant player in Ghana\'s education sector—not only through providing physical infrastructure, but also through enhancing human capital by awarding scholarships to many deserving citizens.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Vision, Mission, Values */}
        <section className="py-12 md:py-16 -mt-56 md:-mt-72 pt-60 md:pt-80" style={{ backgroundColor: 'rgba(42, 63, 117, 0.85)' }}>
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid md:grid-cols-3 gap-10">
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-5">
                  {pageContent?.vision?.title || 'Our Vision'}
                </h3>
                <p className="text-white/90 leading-relaxed text-lg">
                  {pageContent?.vision?.description || 'To become a leading education trust fund in Africa, ensuring quality and accessible education for all Ghanaians'}
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-5">
                  {pageContent?.mission?.title || 'Our Mission'}
                </h3>
                <p className="text-white/90 leading-relaxed text-lg">
                  {pageContent?.mission?.description || 'To mobilize and manage financial resources for the provision and expansion of educational infrastructure at all levels of education in Ghana'}
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-5">
                  {pageContent?.values?.title || 'Our Values'}
                </h3>
                <p className="text-white/90 leading-relaxed text-lg">
                  {pageContent?.values?.description || 'Integrity, transparency, excellence, and commitment to transforming lives through education'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Educational Financing & Funding Formula - Split Layout */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="relative grid lg:grid-cols-2 gap-0 max-w-7xl mx-auto">
              {/* Educational Financing - Left */}
              <div className="pr-0 lg:pr-12 pb-10 lg:pb-0">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                  {pageContent?.financingTitle || 'The Issue of Educational Financing'}
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-3" style={{ color: '#2a3f75' }}>The Cost-Sharing Policy</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {pageContent?.costSharingPolicy || 'In Ghana, due to the government\'s limited capacity to fully fund tertiary education, a cost-sharing policy has been introduced. This approach requires students and families to contribute towards the cost of higher education, supplementing government funding.'}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3" style={{ color: '#2a3f75' }}>Public Responsibility</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {pageContent?.publicResponsibility || 'While various cost-sharing options exist, the policy recognizes that education remains a public responsibility. The government continues to play a central role in ensuring that higher education funding is adequately supported and equitably distributed.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Vertical Divider - contained within this section */}
              <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200"></div>

              {/* Funding Formula - Right */}
              <div className="pl-0 lg:pl-12 pt-10 lg:pt-0 border-t lg:border-t-0 border-gray-200">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-14">
                  {pageContent?.fundingFormulaTitle || 'Funding Formula'}
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {pageContent?.fundingFormulaIntro || 'The law establishing GETFund emphasizes a distribution formula that must be approved by Parliament each year. This requires that crucial factors related to education delivery and development are considered in preparing the formula. These relevant factors include, but are not limited to:'}
                </p>
                <ul className="space-y-3">
                  {(pageContent?.relevantFactors || [
                    'Promotion of the study of mathematics, science, and technology',
                    'Advancement of female education',
                    'Reduction of illiteracy in historically disadvantaged areas',
                    'Promotion of vocational, technical education, and training',
                    'Equitable allocation of funds to districts at the pre-tertiary level of education'
                  ]).map((factor, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#2a3f75' }}></div>
                      <span className="text-gray-700">{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership & Governance - Unified Section */}
        <div>
        <TeamSection
          sectionTitle={pageContent?.leadershipTitle || 'Leadership & Governance'}
          sectionSubtitle={pageContent?.leadershipSubtitle || 'Strong leadership and transparent governance for educational transformation'}
          boardGroupImage={pageContent?.boardImage || '/images/about/getfund-7th-board-inauguration.jpg'}
          boardMembers={pageContent?.boardMembers}
          chairman={teamData.chairman ? {
            name: teamData.chairman.name,
            title: teamData.chairman.title,
            image: teamData.chairman.image_url || '/images/board/s8507362-member1.jpg',
            bio: teamData.chairman.bio || ''
          } : undefined}
          currentAdministrator={teamData.administrator ? {
            id: teamData.administrator.id,
            name: teamData.administrator.name,
            title: teamData.administrator.title,
            image_url: teamData.administrator.image_url,
            date_range: teamData.administrator.date_range,
            bio: teamData.administrator.bio
          } : undefined}
          deputyAdministrator={teamData.deputyAdministrator ? {
            id: teamData.deputyAdministrator.id,
            name: teamData.deputyAdministrator.name,
            title: teamData.deputyAdministrator.title,
            image_url: teamData.deputyAdministrator.image_url,
            bio: teamData.deputyAdministrator.bio
          } : undefined}
          financialController={teamData.financialController ? {
            id: teamData.financialController.id,
            name: teamData.financialController.name,
            title: teamData.financialController.title,
            image_url: teamData.financialController.image_url,
            bio: teamData.financialController.bio
          } : undefined}
          pastAdministrators={teamData.historicalAdmins.map(admin => ({
            id: admin.id,
            name: admin.name,
            title: admin.title,
            image_url: admin.image_url,
            date_range: admin.date_range,
            display_order: admin.display_order
          }))}
        />
        </div>

        {/* Footer Message */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="bg-getfund-primary text-white rounded-2xl p-16 text-center relative">
              <h2 className="text-4xl md:text-5xl font-bold">
                {pageContent?.footerMessage || 'Supporting the delivery of quality education.'}
              </h2>
              <p className="absolute bottom-4 right-6 text-sm text-white/70">Since 2001</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
