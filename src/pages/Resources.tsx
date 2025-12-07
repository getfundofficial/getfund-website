import { BannerBackground } from '../types/bannerBackground';
import { useEffect, useState } from 'react';
import { Download, Eye, FileText, Calendar, FileCheck } from 'lucide-react';
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
import Footer from '../components/Footer';
import PageBanner from '../components/PageBanner';
import { cmsApi } from '../services/cmsApi';

interface ResourceDocument {
  id: string;
  title: string;
  description: string;
  category: string;
  fileSize: string;
  pages: number;
  fileType: string;
  publishedDate: string;
  downloadUrl: string;
}


interface PageContent {
  bannerBackground?: BannerBackground;

  // Hero Section
  heroTitle?: string;
  heroSubtitle?: string;
  
  // Stats
  stats?: {
    documentsAvailable: number;
    policyDocuments: number;
    researchStudies: number;
    annualReports: number;
  };
  
  // Categories
  annualReports?: {
    title: string;
    description: string;
    documents: ResourceDocument[];
  };
  
  policiesGuidelines?: {
    title: string;
    description: string;
    documents: ResourceDocument[];
  };
  
  researchStudies?: {
    title: string;
    description: string;
    documents: ResourceDocument[];
  };
  
  strategicPublications?: {
    title: string;
    description: string;
    documents: ResourceDocument[];
  };
  
  // Newsletter Section
  newsletterTitle?: string;
  newsletterSubtitle?: string;
  newsletterPlaceholder?: string;
  newsletterButtonText?: string;
  newsletterFooterText?: string;
  newsletterContactEmail?: string;
  newsletterContactPhone?: string;
}

export default function Resources() {
  const [pageContent, setPageContent] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await cmsApi.getPageBySlug('resources');

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
              } else if (section.section_key === 'stats' && section.content) {
                if (section.content.stats && section.content.stats.length === 4) {
                  content.stats = {
                    documentsAvailable: parseInt(section.content.stats[0].number) || 50,
                    policyDocuments: parseInt(section.content.stats[1].number) || 15,
                    researchStudies: parseInt(section.content.stats[2].number) || 25,
                    annualReports: parseInt(section.content.stats[3].number) || 12
                  };
                }
              } else if (section.section_key === 'annual_reports' && section.content) {
                content.annualReports = {
                  title: section.content.title,
                  description: section.content.description,
                  documents: section.content.documents
                };
              } else if (section.section_key === 'policies_guidelines' && section.content) {
                content.policiesGuidelines = {
                  title: section.content.title,
                  description: section.content.description,
                  documents: section.content.documents
                };
              } else if (section.section_key === 'research_studies' && section.content) {
                content.researchStudies = {
                  title: section.content.title,
                  description: section.content.description,
                  documents: section.content.documents
                };
              } else if (section.section_key === 'strategic_publications' && section.content) {
                content.strategicPublications = {
                  title: section.content.title,
                  description: section.content.description,
                  documents: section.content.documents
                };
              } else if (section.section_key === 'newsletter_subscription' && section.content) {
                content.newsletterTitle = section.content.title;
                content.newsletterSubtitle = section.content.subtitle;
                content.newsletterPlaceholder = section.content.placeholder;
                content.newsletterButtonText = section.content.buttonText;
                content.newsletterFooterText = section.content.footerText;
                content.newsletterContactEmail = section.content.contactEmail;
                content.newsletterContactPhone = section.content.contactPhone;
              }
            });

            setPageContent(content);
          }
        }
      } catch (error) {
        console.error('Failed to fetch resources content from CMS:', error);
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
          <p className="text-gray-600 text-lg">Loading resources...</p>
        </div>
      </div>
    );
  }

  const defaultStats = {
    documentsAvailable: 50,
    policyDocuments: 15,
    researchStudies: 25,
    annualReports: 12
  };

  const stats = pageContent?.stats || defaultStats;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Breadcrumb />
      <main className="flex-1">
        <PageBanner
          title={pageContent?.heroTitle || 'Resources & Publications'}
          subtitle={pageContent?.heroSubtitle || "Access our comprehensive collection of reports, policies, research studies, and strategic documents that showcase Ghana's educational development journey."}
          bannerBackground={pageContent?.bannerBackground}
        />

        {/* Quick Action Buttons */}
        <div className="bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-white text-getfund-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2 shadow-sm border border-gray-200">
                <Download className="w-5 h-5" />
                Browse All Resources
              </button>
              <button className="bg-getfund-gold text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors">
                Subscribe to Updates
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-getfund-primary mb-2">{stats.documentsAvailable}+</div>
                <div className="text-gray-600 font-medium">Documents Available</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-getfund-primary mb-2">{stats.policyDocuments}</div>
                <div className="text-gray-600 font-medium">Policy Documents</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-getfund-primary mb-2">{stats.researchStudies}</div>
                <div className="text-gray-600 font-medium">Research Studies</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-getfund-primary mb-2">{stats.annualReports}</div>
                <div className="text-gray-600 font-medium">Annual Reports</div>
              </div>
            </div>
          </div>
        </section>

        {/* Annual Reports Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-red-100 text-getfund-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <FileText className="w-4 h-4" />
                Annual Reports
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {pageContent?.annualReports?.title || 'Annual Reports'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {pageContent?.annualReports?.description || "Comprehensive yearly summaries of our activities, achievements, and financial performance"}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(pageContent?.annualReports?.documents || [
                {
                  id: '1',
                  title: 'GETFund Annual Report 2023',
                  description: 'Comprehensive review of activities, projects, and financial performance for 2023',
                  category: 'Annual Report',
                  fileSize: '2.4 MB',
                  pages: 98,
                  fileType: 'PDF',
                  publishedDate: 'Jan 2024',
                  downloadUrl: '/resources/pdfs/annual-report-2023.pdf'
                },
                {
                  id: '2',
                  title: 'GETFund Annual Report 2022',
                  description: 'Full year report covering all educational initiatives and funding allocations',
                  category: 'Annual Report',
                  fileSize: '3.1 MB',
                  pages: 102,
                  fileType: 'PDF',
                  publishedDate: 'Jan 2023',
                  downloadUrl: '/resources/pdfs/annual-report-2022.pdf'
                },
                {
                  id: '3',
                  title: 'GETFund Annual Report 2021',
                  description: 'Detailed account of programs, scholarships, and infrastructure projects',
                  category: 'Annual Report',
                  fileSize: '2.8 MB',
                  pages: 94,
                  fileType: 'PDF',
                  publishedDate: 'Feb 2022',
                  downloadUrl: '/resources/pdfs/annual-report-2021.pdf'
                }
              ]).map((doc) => (
                <div key={doc.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-red-100 p-3 rounded-lg">
                      <FileText className="w-6 h-6 text-getfund-primary" />
                    </div>
                    <span className="text-xs font-semibold bg-green-100 text-green-700 px-3 py-1 rounded-full">
                      {doc.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{doc.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{doc.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <FileCheck className="w-4 h-4" />
                      {doc.fileType}
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      {doc.pages} pages
                    </span>
                    <span>{doc.fileSize}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="flex-1 bg-getfund-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Download PDF
                    </button>
                    <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
                      <Eye className="w-4 h-4" />
                      Preview
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Policies & Guidelines Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <FileCheck className="w-4 h-4" />
                Policy Documents
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {pageContent?.policiesGuidelines?.title || 'Policies & Guidelines'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {pageContent?.policiesGuidelines?.description || "Official policies, guidelines, and frameworks governing our operations and programs"}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(pageContent?.policiesGuidelines?.documents || [
                {
                  id: '4',
                  title: 'Scholarship Guidelines 2024',
                  description: 'Complete guidelines for scholarship applications, eligibility, and selection criteria',
                  category: 'Policy Document',
                  fileSize: '890 KB',
                  pages: 24,
                  fileType: 'PDF',
                  publishedDate: 'Mar 2024',
                  downloadUrl: '/resources/pdfs/scholarship-guidelines-2024.pdf'
                },
                {
                  id: '5',
                  title: 'Infrastructure Investment Policy',
                  description: 'Framework for educational infrastructure project funding and implementation',
                  category: 'Policy Document',
                  fileSize: '1.2 MB',
                  pages: 36,
                  fileType: 'PDF',
                  publishedDate: 'Feb 2024',
                  downloadUrl: '/resources/pdfs/infrastructure-policy.pdf'
                },
                {
                  id: '6',
                  title: 'Financial Management Guidelines',
                  description: 'Comprehensive financial management and accountability framework',
                  category: 'Policy Document',
                  fileSize: '1.1 MB',
                  pages: 42,
                  fileType: 'PDF',
                  publishedDate: 'Jan 2024',
                  downloadUrl: '/resources/pdfs/financial-guidelines.pdf'
                }
              ]).map((doc) => (
                <div key={doc.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <FileCheck className="w-6 h-6 text-blue-700" />
                    </div>
                    <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                      {doc.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{doc.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{doc.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <FileCheck className="w-4 h-4" />
                      {doc.fileType}
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      {doc.pages} pages
                    </span>
                    <span>{doc.fileSize}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="flex-1 bg-getfund-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Download PDF
                    </button>
                    <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
                      <Eye className="w-4 h-4" />
                      Preview
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Research & Studies Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <FileText className="w-4 h-4" />
                Research
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {pageContent?.researchStudies?.title || 'Research & Studies'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {pageContent?.researchStudies?.description || "In-depth research studies and impact assessments of our educational initiatives"}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(pageContent?.researchStudies?.documents || [
                {
                  id: '7',
                  title: 'Impact Assessment of Free SHS Program',
                  description: 'Comprehensive study analyzing the impact and effectiveness of free education initiatives',
                  category: 'Research Study',
                  fileSize: '3.5 MB',
                  pages: 128,
                  fileType: 'PDF',
                  publishedDate: 'Apr 2024',
                  downloadUrl: '/resources/pdfs/free-shs-impact.pdf'
                },
                {
                  id: '8',
                  title: 'Educational Infrastructure Needs Analysis',
                  description: 'Detailed assessment of infrastructure gaps and investment requirements',
                  category: 'Research Study',
                  fileSize: '2.9 MB',
                  pages: 86,
                  fileType: 'PDF',
                  publishedDate: 'Mar 2024',
                  downloadUrl: '/resources/pdfs/infrastructure-needs.pdf'
                },
                {
                  id: '9',
                  title: 'Scholarship Program Effectiveness Study',
                  description: 'Analysis of scholarship outcomes and impact on beneficiaries',
                  category: 'Research Study',
                  fileSize: '2.2 MB',
                  pages: 64,
                  fileType: 'PDF',
                  publishedDate: 'Feb 2024',
                  downloadUrl: '/resources/pdfs/scholarship-effectiveness.pdf'
                }
              ]).map((doc) => (
                <div key={doc.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <FileText className="w-6 h-6 text-purple-700" />
                    </div>
                    <span className="text-xs font-semibold bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                      {doc.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{doc.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{doc.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <FileCheck className="w-4 h-4" />
                      {doc.fileType}
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      {doc.pages} pages
                    </span>
                    <span>{doc.fileSize}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="flex-1 bg-getfund-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Download PDF
                    </button>
                    <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
                      <Eye className="w-4 h-4" />
                      Preview
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Strategic Publications Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Calendar className="w-4 h-4" />
                Strategic Plans
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {pageContent?.strategicPublications?.title || 'Strategic Publications'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {pageContent?.strategicPublications?.description || "Strategic plans, frameworks, and roadmaps for Ghana's educational development"}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(pageContent?.strategicPublications?.documents || [
                {
                  id: '10',
                  title: 'GETFund Strategic Plan 2024-2029',
                  description: 'Five-year roadmap outlining vision, priorities, and implementation strategies',
                  category: 'Strategic Plan',
                  fileSize: '4.2 MB',
                  pages: 156,
                  fileType: 'PDF',
                  publishedDate: 'Jan 2024',
                  downloadUrl: '/resources/pdfs/strategic-plan-2024-2029.pdf'
                },
                {
                  id: '11',
                  title: 'Educational Quality Improvement Framework',
                  description: 'Framework for advancing educational standards and learning outcomes',
                  category: 'Strategic Plan',
                  fileSize: '2.7 MB',
                  pages: 78,
                  fileType: 'PDF',
                  publishedDate: 'Dec 2023',
                  downloadUrl: '/resources/pdfs/quality-framework.pdf'
                }
              ]).map((doc) => (
                <div key={doc.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-orange-100 p-3 rounded-lg">
                      <Calendar className="w-6 h-6 text-orange-700" />
                    </div>
                    <span className="text-xs font-semibold bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
                      {doc.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{doc.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{doc.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <FileCheck className="w-4 h-4" />
                      {doc.fileType}
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      {doc.pages} pages
                    </span>
                    <span>{doc.fileSize}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="flex-1 bg-getfund-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Download PDF
                    </button>
                    <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
                      <Eye className="w-4 h-4" />
                      Preview
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Subscription Section */}
        <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-getfund-primary text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {pageContent?.newsletterTitle || 'Stay Updated with Our Latest Publications'}
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                {pageContent?.newsletterSubtitle || 'Subscribe to our newsletter to receive notifications about new reports, policies, and research studies as published.'}
              </p>
              
              <form className="flex flex-col sm:flex-row gap-4 mb-6">
                <input 
                  type="email" 
                  placeholder={pageContent?.newsletterPlaceholder || "Enter your email address"}
                  className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-getfund-gold"
                />
                <button 
                  type="submit"
                  className="bg-getfund-gold text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-500 transition-colors whitespace-nowrap"
                >
                  {pageContent?.newsletterButtonText || 'Subscribe'}
                </button>
              </form>
              
              <p className="text-sm text-gray-400 mb-6">
                {pageContent?.newsletterFooterText || "Need help finding a specific document?"}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
                <a href={`mailto:${pageContent?.newsletterContactEmail || 'info@getfund.gov.gh'}`} className="text-getfund-gold hover:underline">
                  Email: {pageContent?.newsletterContactEmail || 'info@getfund.gov.gh'}
                </a>
                <span className="hidden sm:inline text-gray-600">|</span>
                <span className="text-gray-300">
                  Phone: {pageContent?.newsletterContactPhone || '+233 (0)302 664 928-930'}
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
