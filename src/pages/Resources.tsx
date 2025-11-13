import { FileText, Download, Calendar, Eye, Book, BarChart3 } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';

interface Resource {
  id: number;
  title: string;
  description: string;
  year: string;
  size: string;
  pages: string;
  type: string;
  downloadUrl: string;
}

export default function Resources() {
  const annualReports = [
    {
      id: 1,
      title: 'GETFund Annual Report 2023',
      description: 'Comprehensive overview of our activities, achievements, and financial performance for 2023.',
      year: '2023',
      size: '2.8 MB',
      pages: '68 pages',
      type: 'Annual Report',
      downloadUrl: '/resources/pdfs/getfund-annual-report-2023.pdf',
    },
    {
      id: 2,
      title: 'GETFund Annual Report 2022',
      description: 'Detailed analysis of educational investments and impact metrics for 2022.',
      year: '2022',
      size: '3.2 MB',
      pages: '72 pages',
      type: 'Annual Report',
      downloadUrl: '/resources/pdfs/getfund-annual-report-2022.pdf',
    },
    {
      id: 3,
      title: 'GETFund Annual Report 2021',
      description: 'Strategic initiatives and outcomes in Ghana\'s educational development for 2021.',
      year: '2021',
      size: '2.9 MB',
      pages: '65 pages',
      type: 'Annual Report',
      downloadUrl: '/resources/pdfs/getfund-annual-report-2021.pdf',
    },
  ];

  const policies = [
    {
      id: 4,
      title: 'Scholarship Guidelines 2024',
      description: 'Complete guidelines for scholarship applications, eligibility criteria, and selection processes.',
      year: '2024',
      size: '1.5 MB',
      pages: '32 pages',
      type: 'Policy Document',
      downloadUrl: '/resources/pdfs/scholarship-guidelines-2024.pdf',
    },
    {
      id: 5,
      title: 'Infrastructure Investment Policy',
      description: 'Framework for educational infrastructure development and funding allocation.',
      year: '2024',
      size: '2.1 MB',
      pages: '45 pages',
      type: 'Policy Document',
      downloadUrl: '/resources/pdfs/infrastructure-investment-policy.pdf',
    },
    {
      id: 6,
      title: 'Financial Management Guidelines',
      description: 'Comprehensive guidelines for financial management and procurement processes.',
      year: '2023',
      size: '1.8 MB',
      pages: '38 pages',
      type: 'Guidelines',
      downloadUrl: '/resources/pdfs/financial-management-guidelines.pdf',
    },
  ];

  const researchReports = [
    {
      id: 7,
      title: 'Impact Assessment of Free SHS Program',
      description: 'Comprehensive evaluation of the Free Senior High School program implementation and outcomes.',
      year: '2024',
      size: '4.2 MB',
      pages: '89 pages',
      type: 'Research Report',
      downloadUrl: '/resources/pdfs/free-shs-impact-assessment-2024.pdf',
    },
    {
      id: 8,
      title: 'Educational Infrastructure Needs Analysis',
      description: 'Detailed analysis of educational infrastructure gaps and development priorities.',
      year: '2023',
      size: '3.7 MB',
      pages: '76 pages',
      type: 'Research Report',
      downloadUrl: '/resources/pdfs/infrastructure-needs-analysis-2023.pdf',
    },
    {
      id: 9,
      title: 'Scholarship Program Effectiveness Study',
      description: 'Longitudinal study on the effectiveness and impact of GETFund scholarship programs.',
      year: '2023',
      size: '3.1 MB',
      pages: '62 pages',
      type: 'Research Report',
      downloadUrl: '/resources/pdfs/scholarship-effectiveness-study-2023.pdf',
    },
  ];

  const publications = [
    {
      id: 10,
      title: 'GETFund Strategic Plan 2024-2029',
      description: 'Five-year strategic roadmap for educational development in Ghana.',
      year: '2024',
      size: '2.6 MB',
      pages: '54 pages',
      type: 'Strategic Document',
      downloadUrl: '/resources/pdfs/strategic-plan-2024-2029.pdf',
    },
    {
      id: 11,
      title: 'Educational Quality Improvement Framework',
      description: 'Framework for enhancing educational quality across all levels of Ghana\'s education system.',
      year: '2024',
      size: '2.2 MB',
      pages: '48 pages',
      type: 'Framework',
      downloadUrl: '/resources/pdfs/quality-improvement-framework.pdf',
    },
  ];

  const ResourceCard = ({ resource }: { resource: Resource }) => (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-getfund-primary" />
              <span className="text-sm font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
                {resource.type}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-getfund-secondary mb-2 line-clamp-2">
              {resource.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
              {resource.description}
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{resource.year}</span>
            </div>
            <div className="flex items-center gap-1">
              <Book className="w-4 h-4" />
              <span>{resource.pages}</span>
            </div>
            <div className="flex items-center gap-1">
              <BarChart3 className="w-4 h-4" />
              <span>{resource.size}</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button 
            className="flex-1 bg-getfund-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
            onClick={() => window.open(resource.downloadUrl, '_blank')}
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
          <button 
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
            onClick={() => window.open(resource.downloadUrl, '_blank')}
          >
            <Eye className="w-4 h-4" />
            Preview
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Breadcrumb />
      
      {/* Hero Section */}
      <section className="pt-20 bg-gradient-to-br from-getfund-secondary to-blue-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Resources & Publications
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Access our comprehensive collection of reports, policies, research studies, and strategic documents 
              that showcase Ghana's educational development journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-getfund-secondary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                <Book className="w-6 h-6" />
                Browse All Resources
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-getfund-secondary transition-colors">
                Subscribe to Updates
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-getfund-primary mb-2">50+</div>
              <div className="text-gray-600 text-sm">Documents Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-getfund-primary mb-2">15</div>
              <div className="text-gray-600 text-sm">Annual Reports</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-getfund-primary mb-2">25</div>
              <div className="text-gray-600 text-sm">Policy Documents</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-getfund-primary mb-2">12</div>
              <div className="text-gray-600 text-sm">Research Studies</div>
            </div>
          </div>
        </div>
      </section>

      {/* Annual Reports Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-getfund-secondary mb-4">
              Annual Reports
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive yearly summaries of our activities, achievements, and financial performance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {annualReports.map((report) => (
              <ResourceCard key={report.id} resource={report} />
            ))}
          </div>
        </div>
      </section>

      {/* Policy Documents Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-getfund-secondary mb-4">
              Policies & Guidelines
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Official policies, guidelines, and frameworks governing our operations and programs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {policies.map((policy) => (
              <ResourceCard key={policy.id} resource={policy} />
            ))}
          </div>
        </div>
      </section>

      {/* Research Reports Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-getfund-secondary mb-4">
              Research & Studies
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              In-depth research studies and impact assessments of our educational initiatives
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {researchReports.map((report) => (
              <ResourceCard key={report.id} resource={report} />
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Publications Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-getfund-secondary mb-4">
              Strategic Publications
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Strategic plans, frameworks, and roadmaps for Ghana's educational development
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publications.map((publication) => (
              <ResourceCard key={publication.id} resource={publication} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-getfund-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Stay Updated with Our Latest Publications
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Subscribe to our newsletter to receive notifications when new reports, policies, 
            and research studies are published.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-getfund-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
              Subscribe
            </button>
          </div>
          
          <div className="mt-12 text-blue-100">
            <p className="mb-2">Need help finding a specific document?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <span>Email: info@getfund.gov.gh</span>
              <span className="hidden sm:block">|</span>
              <span>Phone: +233 544 323 020</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}