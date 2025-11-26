import { useEffect, useState } from 'react';
import { Eye, Target, Heart } from 'lucide-react';
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
import Footer from '../components/Footer';
import { cmsApi } from '../services/cmsApi';

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

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await cmsApi.getPageBySlug('who-we-are');

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
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-getfund-primary mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Breadcrumb />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-getfund-primary via-getfund-secondary to-red-900 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
                {pageContent?.heroTitle || 'About Us'}
              </h1>
              <p className="text-xl md:text-2xl text-red-100 leading-relaxed">
                {pageContent?.heroSubtitle || 'Supporting the delivery of quality education to Ghanaians from basic to tertiary level'}
              </p>
            </div>
          </div>
        </section>

        {/* Main Content - Ghana Education Trust Fund */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <img 
                  src={pageContent?.mainImage || '/images/about/getfund-board.jpg'}
                  alt={pageContent?.mainImageAlt || 'GETFund Board'}
                  className="rounded-xl shadow-lg w-full h-auto object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {pageContent?.mainHeading || 'Ghana Education Trust Fund'}
                </h2>
                <h3 className="text-xl md:text-2xl font-semibold text-getfund-primary mb-6">
                  {pageContent?.redHeading || 'Since its establishment in the year 2000,'}
                </h3>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    {pageContent?.paragraph1 || 'The fund has remained committed to its mandate espoused in its governing legislation, Act 581. The object of the Fund is to provide funding to supplement government\'s effort for the provision of educational infrastructure and facilities at all levels.'}
                  </p>
                  <p>
                    {pageContent?.paragraph2 || 'GETFund has since its inception remained a significant player in Ghana\'s education sector not only by way of providing physical infrastructure, but also through the enhancement of our human capital, awarding scholarships to many deserving citizens.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Vision, Mission, Values */}
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="text-center">
                <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Eye className="w-10 h-10 text-getfund-primary" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {pageContent?.vision?.title || 'Our Vision'}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {pageContent?.vision?.description || 'To become a leading education trust fund in Africa, ensuring quality and accessible education for all Ghanaians'}
                </p>
              </div>
              <div className="text-center">
                <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-10 h-10 text-getfund-gold" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {pageContent?.mission?.title || 'Our Mission'}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {pageContent?.mission?.description || 'To mobilize and manage financial resources for the provision and expansion of educational infrastructure at all levels of education in Ghana'}
                </p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-10 h-10 text-orange-600" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {pageContent?.values?.title || 'Our Values'}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {pageContent?.values?.description || 'Integrity, transparency, excellence, and commitment to transforming lives through education'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Educational Financing Section */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              {pageContent?.financingTitle || 'The Issue of Educational Financing'}
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-getfund-primary mb-3">The Cost Sharing Policy</h3>
                <p className="text-gray-700 leading-relaxed">
                  {pageContent?.costSharingPolicy || 'Currently in Ghana, due to government\'s inability to solely sustain tertiary education efforts, the cost of self financing has been introduced by HEP through the adoption of the discredited to cost sharing NCHE 1998.'}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-getfund-primary mb-3">Public Responsibility</h3>
                <p className="text-gray-700 leading-relaxed">
                  {pageContent?.publicResponsibility || 'Notwithstanding all cost sharing options/variable cost options available from the public, the policy will not only politicize and elaborate Ghanaians but it is central capable of reaching their full purpose of HEP promotion if the purpose of HEP funding is not adequately equalized by the government.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Funding Formula */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {pageContent?.fundingFormulaTitle || 'Funding Formula'}
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              {pageContent?.fundingFormulaIntro || 'The law establishing GETFund further emphasizes a distribution formula that must be approved by Parliament each year, requiring that some crucial factors related to education delivery and development are considered in the process of preparing the Formula. These relevant factors should include but not limited to:'}
            </p>
            <ul className="space-y-3">
              {(pageContent?.relevantFactors || [
                'promotion of the study of Mathematics, Science and Technology',
                'advancement of female education',
                'reduction in the high level of illiteracy in historically disadvantaged areas',
                'promotion of Vocational, Technical Education and Training',
                'equitable allocation of funds to the Districts at the Pre-Tertiary level of education'
              ]).map((factor, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-getfund-primary mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{factor}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Leadership & Governance */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {pageContent?.leadershipTitle || 'Leadership & Governance'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {pageContent?.leadershipSubtitle || 'Strong leadership and transparent governance for educational transformation'}
              </p>
            </div>

            {/* Board of Directors */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src={pageContent?.boardImage || '/images/about/getfund-board.jpg'}
                  alt="GETFund Board of Directors"
                  className="rounded-xl shadow-lg w-full h-auto object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {pageContent?.boardTitle || 'Committed Board of Directors'}
                </h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {pageContent?.boardDescription || 'Our experienced board of directors includes all spheres of education, finance, and public administration to guide GETFund\'s strategic direction and ensure accountability to all our initiatives.'}
                </p>
                <div className="space-y-4">
                  {(pageContent?.boardCommitments || [
                    { title: 'Strategic Direction', description: 'Setting priorities and overseeing implementation', icon: '1' },
                    { title: 'Performance Monitoring', description: 'Ensuring all projects achieve educational outcomes', icon: '2' },
                    { title: 'Stakeholder Engagement', description: 'Building partnerships for educational success', icon: '3' }
                  ]).map((commitment, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        index === 0 ? 'bg-red-100 text-red-800' :
                        index === 1 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        <span className="font-bold">{commitment.icon}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">{commitment.title}</h4>
                        <p className="text-gray-600 text-sm">{commitment.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Message */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-getfund-primary to-getfund-secondary text-white rounded-2xl p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {pageContent?.footerMessage || 'Supporting the delivery of quality education.'}
              </h2>
              <button className="bg-white text-getfund-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors mt-4">
                Learn More
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
