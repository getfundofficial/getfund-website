import { useEffect, useState } from 'react';
import { Eye, Target, Heart } from 'lucide-react';
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
  
  // Board of Directors
  boardImage?: string;
  boardTitle?: string;
  boardDescription?: string;
  boardCommitments?: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  
  // Footer Message
  footerMessage?: string;
}

export default function WhoWeAre() {
  const [pageContent, setPageContent] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState<{
    chairman: TeamMemberType | null;
    management: TeamMemberType[];
    historical_admins: TeamMemberType[];
    deputy_administrator?: TeamMemberType | null;
    financial_controller?: TeamMemberType | null;
  }>({ chairman: null, management: [], historical_admins: [], deputy_administrator: null, financial_controller: null });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        // Fetch page content
        const response = await cmsApi.getPageBySlug('about');

        // Fetch team members
        const members = await cmsApi.getTeamMembers();
        console.log('[WhoWeAre] Team members from API:', members);
        console.log('[WhoWeAre] Deputy Administrator:', members.deputy_administrator);
        console.log('[WhoWeAre] Financial Controller:', members.financial_controller);
        setTeamMembers(members);

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
                content.boardDescription = section.content.boardDescription;
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
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
              <div>
                <img
                  src={pageContent?.mainImage || '/images/about/getfund-7th-board-inauguration.jpg'}
                  alt={pageContent?.mainImageAlt || 'GETFund Board'}
                  className="rounded-2xl shadow-xl w-full h-[400px] md:h-[500px] object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">
                  {pageContent?.mainHeading || 'Ghana Education Trust Fund'}
                </h2>
                <h3 className="text-xl md:text-2xl font-semibold text-getfund-primary mb-8">
                  {pageContent?.redHeading || 'Since its establishment in 2000,'}
                </h3>
                <div className="space-y-5 text-gray-700 leading-relaxed text-lg md:text-xl">
                  <p>
                    {pageContent?.paragraph1 || 'The Fund has remained committed to its mandate as enshrined in its governing legislation, Act 581. The object of the Fund is to provide funding to supplement the government\'s efforts in providing educational infrastructure and facilities at all levels.'}
                  </p>
                  <p>
                    {pageContent?.paragraph2 || 'GETFund has, since its inception, remained a significant player in Ghana\'s education sector—not only through providing physical infrastructure, but also through enhancing human capital by awarding scholarships to many deserving citizens.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Vision, Mission, Values */}
            <div className="grid md:grid-cols-3 gap-10 mt-20">
              <div className="text-center">
                <div className="bg-red-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Eye className="w-12 h-12 text-getfund-primary" aria-hidden="true" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5">
                  {pageContent?.vision?.title || 'Our Vision'}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {pageContent?.vision?.description || 'To become a leading education trust fund in Africa, ensuring quality and accessible education for all Ghanaians'}
                </p>
              </div>
              <div className="text-center">
                <div className="bg-yellow-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Target className="w-12 h-12 text-getfund-gold" aria-hidden="true" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5">
                  {pageContent?.mission?.title || 'Our Mission'}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {pageContent?.mission?.description || 'To mobilize and manage financial resources for the provision and expansion of educational infrastructure at all levels of education in Ghana'}
                </p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Heart className="w-12 h-12 text-orange-600" aria-hidden="true" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5">
                  {pageContent?.values?.title || 'Our Values'}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
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
                    <h3 className="text-xl font-bold text-getfund-primary mb-3">The Cost-Sharing Policy</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {pageContent?.costSharingPolicy || 'In Ghana, due to the government\'s limited capacity to fully fund tertiary education, a cost-sharing policy has been introduced. This approach requires students and families to contribute towards the cost of higher education, supplementing government funding.'}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-getfund-primary mb-3">Public Responsibility</h3>
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
                      <div className="w-2 h-2 rounded-full bg-getfund-primary mt-2 flex-shrink-0"></div>
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
          chairman={teamMembers.chairman ? {
            name: teamMembers.chairman.name,
            title: teamMembers.chairman.title,
            image: teamMembers.chairman.image_url || '/images/board/s8507362-member1.jpg',
            bio: teamMembers.chairman.bio || ''
          } : undefined}
          managementTeam={teamMembers.management}
          currentAdministrator={(() => {
            // First look for an Administrator in management (not Deputy)
            const adminFromMgmt = teamMembers.management.find(m =>
              m.title.toLowerCase().includes('administrator') &&
              !m.title.toLowerCase().includes('deputy')
            );
            if (adminFromMgmt) {
              return {
                id: adminFromMgmt.id,
                name: adminFromMgmt.name,
                title: adminFromMgmt.title,
                image_url: adminFromMgmt.image_url,
                date_range: adminFromMgmt.date_range
              };
            }
            // Fallback: look in historical_admins for one marked as "present"
            return teamMembers.historical_admins.find(
              admin => admin.date_range?.toLowerCase().includes('present')
            );
          })()}
          deputyAdministrator={(() => {
            // First check if dedicated field exists from API
            if (teamMembers.deputy_administrator) {
              return {
                id: teamMembers.deputy_administrator.id,
                name: teamMembers.deputy_administrator.name,
                title: teamMembers.deputy_administrator.title,
                image_url: teamMembers.deputy_administrator.image_url
              };
            }
            // Fallback: filter from management by title
            const deputy = teamMembers.management.find(m =>
              m.title.toLowerCase().includes('deputy') && m.title.toLowerCase().includes('admin')
            );
            return deputy ? {
              id: deputy.id,
              name: deputy.name,
              title: deputy.title,
              image_url: deputy.image_url
            } : undefined;
          })()}
          financialController={(() => {
            // First check if dedicated field exists from API
            if (teamMembers.financial_controller) {
              return {
                id: teamMembers.financial_controller.id,
                name: teamMembers.financial_controller.name,
                title: teamMembers.financial_controller.title,
                image_url: teamMembers.financial_controller.image_url
              };
            }
            // Fallback: filter from management by title
            const fc = teamMembers.management.find(m =>
              m.title.toLowerCase().includes('financial') && m.title.toLowerCase().includes('controller')
            );
            return fc ? {
              id: fc.id,
              name: fc.name,
              title: fc.title,
              image_url: fc.image_url
            } : undefined;
          })()}
          pastAdministrators={teamMembers.historical_admins
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
            })
            .map(admin => ({
              id: admin.id,
              name: admin.name,
              title: admin.title,
              image_url: admin.image_url,
              date_range: admin.date_range,
              display_order: admin.display_order
            }))
          }
        />
        </div>

        {/* Footer Message */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="bg-getfund-primary text-white rounded-2xl p-16 text-center relative">
              <h2 className="text-4xl md:text-5xl font-bold">
                {pageContent?.footerMessage || 'Supporting the delivery of quality education.'}
              </h2>
              <p className="absolute bottom-4 right-6 text-sm text-white/70">Since 2000</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
