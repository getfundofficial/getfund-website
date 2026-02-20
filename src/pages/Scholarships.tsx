import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, ArrowRight, GraduationCap, BookOpen, Users, Award, FileText, AlertTriangle, HelpCircle, ChevronDown, ChevronUp, Search, Globe, Building, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import LoadingScreen from '../components/LoadingScreen';
import { cmsApi } from '../services/cmsApi';

interface ScholarRecord {
  name: string;
  academicYear: string;
  country: string;
  institution: string;
  course: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface ScholarshipsContent {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    title: string;
    subtitle: string;
    heroImage: string;
  };
  programmeOverview: {
    heading: string;
    paragraphs: string[];
  };
  supportProvided: {
    heading: string;
    description: string;
  };
  coreBelief: string;
  priorityAreas: {
    heading: string;
    items: { title: string; description: string }[];
  };
  programmeStats: {
    heading: string;
    stats: { label: string; value: string }[];
  };
  scopeOfScholarship: {
    heading: string;
    description: string;
    items: string[];
  };
  callForApplication: {
    heading: string;
    subheading: string;
    description: string;
    openingDate: string;
    closingDate: string;
  };
  applicationProcedure: {
    heading: string;
    steps: { title: string; description: string }[];
  };
  eligibilityRequirements: {
    heading: string;
    items: string[];
  };
  academicRequirements: {
    heading: string;
    items: string[];
  };
  supportingDocuments: {
    heading: string;
    items: string[];
  };
  specialDispensation: {
    heading: string;
    description: string;
    items: string[];
  };
  applicationSteps: {
    heading: string;
    steps: string[];
  };
  disqualifyingFactors: {
    heading: string;
    items: string[];
  };
  fundingAndDuration: {
    heading: string;
    items: FAQItem[];
  };
  faqs: {
    heading: string;
    items: FAQItem[];
  };
  scholars: {
    heading: string;
    subheading: string;
    totalRecords: string;
    sampleData: ScholarRecord[];
  };
  contactInfo: {
    address: string;
    phone: string;
    email: string;
    website: string;
  };
  cta: {
    heading: string;
    description: string;
    buttonText: string;
    buttonUrl: string;
  };
}

const defaultContent: ScholarshipsContent = {
  meta: {
    title: 'Scholarships | Ghana Education Trust Fund',
    description: 'GETFund Scholarship Programme - Empowering Ghanaian students through postgraduate and undergraduate scholarships. Learn about eligibility, application process, and our scholars.',
  },
  hero: {
    title: 'GETFund Scholarship Programme',
    subtitle: 'GETFund Scholarships: Meeting 21st Century Needs',
    heroImage: '/images/scholarship/GETFund-Scholarship-Programme.jpg',
  },
  programmeOverview: {
    heading: 'Programme Overview',
    paragraphs: [
      'Education is the bedrock upon which every nation\'s growth and development is anchored, particularly in our fast-evolving 21st century global society that requires a multiplicity of skill sets.',
      'Our human resource capital is our greatest asset, and we have a duty to capitalize on that for the ultimate benefit of our society.',
      'A nation that therefore fails or refuses to invest in the education of its citizens clearly sets itself up for failure. Brains, it is said, develop a nation, not its natural resources, as countries like Japan, Switzerland, Singapore and several other countries have proven over time.',
    ],
  },
  supportProvided: {
    heading: 'Support Provided',
    description: 'The Program provides financial, social, and academic support to Scholars. Financial support includes tuition fees, accommodation, and scholastic materials.',
  },
  coreBelief: 'We believe education is a catalyst for social and economic change.',
  priorityAreas: {
    heading: 'Priority Areas',
    items: [
      { title: 'STEM Programmes', description: 'High prevalence to Science, Technology, Engineering and Mathematics programmes' },
      { title: 'Female Education', description: 'Promoting access and equity in education for women and girls' },
    ],
  },
  programmeStats: {
    heading: 'Programme Statistics',
    stats: [
      { label: 'Undergraduate Scholars', value: '00' },
      { label: 'Executive Education Programmes', value: '00' },
      { label: 'Masters Scholars', value: '00' },
      { label: 'PhD Scholars', value: '00' },
    ],
  },
  scopeOfScholarship: {
    heading: 'Scope of Scholarship',
    description: 'The programme expands beyond the traditional "brilliant but needy" requirement to include:',
    items: [
      'Support for "brilliant but needy" applicants at undergraduate and postgraduate levels',
      'Capacity building in public institutions and agencies (e.g., forensic science, cyber security, fire-fighting domains)',
      'Faculty development through Ghana Tertiary Education Commission (GTEC) for university lecturers pursuing further education abroad',
      'Funding for short courses abroad by MPs, judges and others upon request',
      'Support for students competing in international educational competitive programmes',
    ],
  },
  callForApplication: {
    heading: '2024/25 Scholarship Call For Application',
    subheading: 'Postgraduate Foreign Scholarship Call for Application',
    description: 'The Ghana Education Trust Fund is accepting applications for Postgraduate (Masters Programmes) for the award of Foreign scholarships for the 2024/25 Academic Year.',
    openingDate: 'Friday 30th May 2025',
    closingDate: 'Sunday 15th June 2025',
  },
  applicationProcedure: {
    heading: 'Procedure For Applications',
    steps: [
      { title: 'Apply via Scholarship Portal', description: 'Applicants must visit the GETFund Website to access the scholarship Portal and complete an online application form.' },
      { title: 'Provide Required Documentation', description: 'Complete the online form with required information and upload documents for vetting and shortlisting.' },
      { title: 'Application Status Update', description: 'Communication occurs via email and SMS, with further actions continuing through the portal.' },
    ],
  },
  eligibilityRequirements: {
    heading: 'Eligibility Requirements',
    items: [
      'Applicant must be a Ghanaian',
      'Must have obtained admission to undertake a Masters or Undergraduate-Medicine Only (Eastern Europe & Asia)',
      'Must hold a first degree of at least second-class (for Master\'s applicants)',
      'Must be available to start academic studies by the start of the academic year for which sponsorship is sought',
      'Applicant must not be pursuing a PhD or Master\'s degree at the time of application',
      'Should not be a previous beneficiary of a GETFund Foreign Scholarship applying for the same scholarship category',
    ],
  },
  academicRequirements: {
    heading: 'Academic Requirements',
    items: [
      'Admission Letter from accredited University (Unconditional & Financial Condition letters only)',
      'Fee Schedule',
      'Previous academic certificates (Where Applicable)',
      'Previous transcript (Where Applicable)',
      'Project or Research proposal (not exceeding 5 pages) (Masters and PhD Applicants)',
    ],
  },
  supportingDocuments: {
    heading: 'Supporting Documents',
    items: [
      'Curriculum Vitae',
      'Academic Referees',
      'Letter of Recommendation (occupational)',
      'Support Document from employer for Academic Leave (Where applicable)',
      'Passport Bio Page',
      'Ghana Card',
      'National Service certificate (Where Applicable)',
    ],
  },
  specialDispensation: {
    heading: 'Special Dispensation',
    description: 'Priority consideration for applicants pursuing:',
    items: [
      'Science, Technology, Engineering, Mathematics (STEM)',
      'Technical and Vocational Education and Training (TVET)',
      'Special needs programmes',
      'National Initiative Priority programmes',
      'Programmes at tuition-free Universities',
      'Lecturers of public Tertiary Institutions (Via GTEC)',
      'Persons with special needs',
    ],
  },
  applicationSteps: {
    heading: 'Application Steps',
    steps: [
      'Create Profile',
      'Verify Account',
      'Fill Application Form and upload required documents',
      'Review Application Summary',
      'Submit Application',
    ],
  },
  disqualifyingFactors: {
    heading: 'Disqualifying Factors',
    items: [
      'Poor Academic Performance',
      'Not providing required documentation (Admission letter & Financial Details)',
      'Uploading invisible or unclear documents',
      'Not completing application before deadline',
      'Providing false or misleading information',
      'Multiple applications by one applicant (instant disqualification)',
      'Previous GETFund Scholarship beneficiary applying for the same category',
    ],
  },
  fundingAndDuration: {
    heading: 'Funding and Duration',
    items: [
      { question: 'Local Scholarship Coverage', answer: 'Tuition Fees Only' },
      { question: 'Foreign Scholarship Coverage', answer: 'Typically covers tuition, accommodation, and sometimes stipend for living expenses. Specific details regarding partial or full scholarship will be provided upon award.' },
      { question: 'Deferment', answer: 'No, scholarships must be used for the academic year awarded.' },
      { question: 'Duration', answer: 'Valid for the postgraduate program duration as specified in the admission letter, subject to satisfactory academic performance.' },
    ],
  },
  faqs: {
    heading: 'Frequently Asked Questions',
    items: [
      { question: 'Who can apply?', answer: 'Every Ghanaian citizen who meets the prerequisite requirements.' },
      { question: 'Which Universities qualify?', answer: 'For Foreign Universities: Accredited and Globally Recognised Universities. For Local Universities: All Local Universities accredited by Ghana Tertiary Education Commission to run Post Graduate courses.' },
      { question: 'Can I apply before university acceptance?', answer: 'No. All applicants are required to have a valid Admission letter from a local university.' },
      { question: 'How do I know if I\'m eligible?', answer: 'The basic requirement is being a Ghanaian Citizen, followed by other requirements stated on the application portal.' },
      { question: 'How are applications submitted?', answer: 'All correspondences occur exclusively between GETFund and the applicant. All submissions are received through the scholarship web application portal only.' },
      { question: 'Can second-year and beyond students apply?', answer: 'For programmes with more than one year of academic activities, yes, but sponsorship takes effect from the year of application.' },
      { question: 'Can I apply to other government agencies?', answer: 'Yes, but applicants cannot hold two or more scholarships from Ghana Government Agencies simultaneously.' },
      { question: 'Where is the portal?', answer: 'Visit www.getfund.gov.gh/scholarship-apply' },
      { question: 'Can I save my progress?', answer: 'Yes, the portal allows saving progress to complete later before the deadline.' },
      { question: 'What if I have technical issues?', answer: 'Contact the support team via details provided on the portal.' },
      { question: 'Can I edit after submission?', answer: 'No, once submitted, changes cannot be made. Ensure accuracy before submitting.' },
      { question: 'What is the selection process?', answer: 'Applications are vetted and shortlisted based on eligibility and documentation completeness. Shortlisted applicants will be contacted for further processes.' },
      { question: 'When will I be notified?', answer: 'Shortlisted applicants receive notification after vetting completion. The specific timeline will be communicated via portal and email.' },
      { question: 'What if I am not shortlisted?', answer: 'Applicants receive email notification and may reapply in the following cycle if eligible.' },
    ],
  },
  scholars: {
    heading: 'GETFund Scholars',
    subheading: '14+ Years of Empowering Minds, Transforming Futures',
    totalRecords: '16,367',
    sampleData: [],
  },
  contactInfo: {
    address: 'No. 42, 4th Close, Airport Res. Area, Accra',
    phone: '+233 544 323 020',
    email: 'info@getfund.gov.gh',
    website: 'www.getfund.gov.gh',
  },
  cta: {
    heading: 'Ready to Apply?',
    description: 'Ghana Education Trust Fund (GETFund) - Supporting the delivery of quality education in Ghana. By working in partnership, we create lasting change.',
    buttonText: 'Start Application',
    buttonUrl: 'https://scholarships.getfund.gov.gh/',
  },
};

function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, idx) => (
        <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            className="w-full flex items-center justify-between px-5 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
          >
            <span className="font-medium text-gray-900 pr-4">{item.question}</span>
            {openIndex === idx ? (
              <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
            )}
          </button>
          {openIndex === idx && (
            <div className="px-5 pb-4 bg-gray-50">
              <p className="text-gray-700 leading-relaxed">{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function ScholarTable({ scholars, totalRecords }: { scholars: ScholarRecord[]; totalRecords: string }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const filtered = scholars.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedScholars = filtered.slice(startIndex, startIndex + rowsPerPage);

  // Reset to page 1 when search changes
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const getPageNumbers = () => {
    const pages: (number | '...')[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div>
      <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, institution, or course..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <span className="text-sm text-gray-500">{totalRecords} total records</span>
      </div>
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Name of Beneficiary</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Academic Year</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Country</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Institution</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Course/Programme</th>
            </tr>
          </thead>
          <tbody>
            {paginatedScholars.map((scholar, idx) => (
              <tr key={idx} className={`border-b border-gray-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                <td className="px-4 py-3 text-gray-900 font-medium">{scholar.name}</td>
                <td className="px-4 py-3 text-gray-600">{scholar.academicYear}</td>
                <td className="px-4 py-3 text-gray-600">{scholar.country}</td>
                <td className="px-4 py-3 text-gray-600">{scholar.institution}</td>
                <td className="px-4 py-3 text-gray-600">{scholar.course}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filtered.length === 0 && (
        <p className="text-center text-gray-500 py-8">No scholars found matching your search.</p>
      )}

      {/* Pagination Controls */}
      {filtered.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 px-1">
          <p className="text-sm text-gray-500">
            Showing {startIndex + 1}–{Math.min(startIndex + rowsPerPage, filtered.length)} of {filtered.length} scholars
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {getPageNumbers().map((page, idx) =>
              page === '...' ? (
                <span key={`ellipsis-${idx}`} className="px-2 py-1.5 text-sm text-gray-400">...</span>
              ) : (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1.5 text-sm rounded-md border ${
                    currentPage === page
                      ? 'bg-[#2a3f75] text-white border-[#2a3f75]'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              )
            )}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Scholarships() {
  const [content, setContent] = useState<ScholarshipsContent>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'apply' | 'scholars'>('overview');
  const [allScholars, setAllScholars] = useState<ScholarRecord[]>(defaultContent.scholars.sampleData);
  const [scholarsLoaded, setScholarsLoaded] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const page = await cmsApi.getPageBySlug('scholarships');
        if (page?.sections) {
          const section = page.sections.find(s => s.section_type === 'page_content');
          if (section?.content) {
            setContent(prev => ({ ...prev, ...section.content as ScholarshipsContent }));
          }
        }
      } catch (error) {
        console.error('Failed to load scholarships content from CMS:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, []);

  // Lazy-load the full scholars dataset when the scholars tab is opened
  useEffect(() => {
    if (activeTab === 'scholars' && !scholarsLoaded) {
      import('../data/scholars.json')
        .then((module) => {
          const data = module.default as ScholarRecord[];
          setAllScholars(data);
          setScholarsLoaded(true);
        })
        .catch(() => {
          // Fallback to CMS/default sample data if JSON not available
          setAllScholars(content.scholars.sampleData);
          setScholarsLoaded(true);
        });
    }
  }, [activeTab, scholarsLoaded, content.scholars.sampleData]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const tabs = [
    { id: 'overview' as const, label: 'Programme Overview', icon: BookOpen },
    { id: 'apply' as const, label: 'How to Apply', icon: FileText },
    { id: 'scholars' as const, label: 'GETFund Scholars', icon: Users },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{content.meta.title}</title>
        <meta name="description" content={content.meta.description} />
      </Helmet>

      <Header />
      <Breadcrumb />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#2a3f75] to-[#1a2a55] text-white py-16 md:py-24">
          <div className="absolute inset-0">
            <img
              src={content.hero.heroImage || '/images/scholarship/scholarship-programme-hero.jpg'}
              alt=""
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#2a3f75]/80 to-[#1a2a55]/90" />
          <div className="relative container mx-auto px-4 max-w-6xl">
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="w-10 h-10 text-getfund-gold" />
              <span className="text-getfund-gold font-semibold tracking-wide uppercase text-sm">Scholarship Programme</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              {content.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl">
              {content.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={content.cta.buttonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-getfund-gold text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
              >
                {content.cta.buttonText}
                <ArrowRight className="w-5 h-5" />
              </a>
              <button
                onClick={() => setActiveTab('scholars')}
                className="inline-flex items-center gap-2 border-2 border-white/60 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                View Our Scholars
              </button>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <section className="sticky top-[72px] z-30 bg-white border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-[#2a3f75] text-[#2a3f75]'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===== OVERVIEW TAB ===== */}
        {activeTab === 'overview' && (
          <>
            {/* Programme Overview */}
            <section className="py-16 bg-white">
              <div className="container mx-auto px-4 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      {content.programmeOverview.heading}
                    </h2>
                    <div className="w-12 h-1 bg-[#2a3f75] mb-6" />
                    <div className="space-y-4">
                      {content.programmeOverview.paragraphs.map((p, idx) => (
                        <p key={idx} className="text-gray-700 leading-relaxed">{p}</p>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <img
                      src="/images/scholarship/service-details-01.jpg"
                      alt="GETFund Scholarship students"
                      className="w-full h-36 md:h-44 object-cover rounded-lg shadow-md"
                    />
                    <img
                      src="/images/scholarship/service-details-02.jpg"
                      alt="GETFund education support"
                      className="w-full h-36 md:h-44 object-cover rounded-lg shadow-md"
                    />
                    <img
                      src="/images/scholarship/service-details-03.jpg"
                      alt="GETFund scholars programme"
                      className="w-full h-36 md:h-44 object-cover rounded-lg shadow-md"
                    />
                    <img
                      src="/images/scholarship/service-details-04.jpg"
                      alt="GETFund academic facilities"
                      className="w-full h-36 md:h-44 object-cover rounded-lg shadow-md"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Core Belief + Support Provided */}
            <section className="py-16 bg-gray-50">
              <div className="container mx-auto px-4 max-w-6xl">
                {/* Core Belief Quote */}
                <div className="bg-[#2a3f75] text-white rounded-xl p-8 md:p-12 mb-12 text-center">
                  <Star className="w-8 h-8 text-getfund-gold mx-auto mb-4" />
                  <blockquote className="text-xl md:text-2xl font-medium italic">
                    "{content.coreBelief}"
                  </blockquote>
                </div>

                {/* Support Provided */}
                <div className="bg-white rounded-lg shadow-sm p-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {content.supportProvided.heading}
                  </h2>
                  <div className="w-12 h-1 bg-[#2a3f75] mb-6" />
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {content.supportProvided.description}
                  </p>
                </div>
              </div>
            </section>

            {/* Priority Areas */}
            <section className="py-16 bg-white">
              <div className="container mx-auto px-4 max-w-6xl">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {content.priorityAreas.heading}
                </h2>
                <div className="w-12 h-1 bg-[#2a3f75] mb-8" />
                <p className="text-gray-600 mb-8">The Fund sets out other areas of priority aligned with the nation's development agenda.</p>
                <div className="grid md:grid-cols-2 gap-6">
                  {content.priorityAreas.items.map((area, idx) => (
                    <div key={idx} className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-[#2a3f75] rounded-lg flex items-center justify-center flex-shrink-0">
                          {idx === 0 ? <Building className="w-6 h-6 text-white" /> : <Users className="w-6 h-6 text-white" />}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-1">{area.title}</h3>
                          <p className="text-gray-600">{area.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Programme Statistics */}
            <section className="py-16 bg-[#2a3f75] text-white">
              <div className="container mx-auto px-4 max-w-6xl">
                <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">
                  {content.programmeStats.heading}
                </h2>
                <div className="w-12 h-1 bg-getfund-gold mx-auto mb-10" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {content.programmeStats.stats.map((stat, idx) => (
                    <div key={idx} className="text-center bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                      <p className="text-3xl md:text-4xl font-bold text-getfund-gold mb-2">{stat.value}</p>
                      <p className="text-sm text-white/80">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Scope of Scholarship */}
            <section className="py-16 bg-white">
              <div className="container mx-auto px-4 max-w-6xl">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {content.scopeOfScholarship.heading}
                </h2>
                <div className="w-12 h-1 bg-[#2a3f75] mb-6" />
                <p className="text-gray-700 mb-8">{content.scopeOfScholarship.description}</p>
                <div className="space-y-4">
                  {content.scopeOfScholarship.items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* ===== APPLY TAB ===== */}
        {activeTab === 'apply' && (
          <>
            {/* Call for Application Banner */}
            <section className="py-12 bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-amber-200">
              <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex items-start gap-4">
                  <Award className="w-10 h-10 text-amber-600 flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                      {content.callForApplication.heading}
                    </h2>
                    <p className="text-lg text-amber-800 font-medium mb-3">
                      {content.callForApplication.subheading}
                    </p>
                    <p className="text-gray-700 mb-4">{content.callForApplication.description}</p>
                    <div className="flex flex-wrap gap-6">
                      <div className="bg-white rounded-lg px-5 py-3 border border-amber-200">
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Opening Date</p>
                        <p className="font-semibold text-gray-900">{content.callForApplication.openingDate}</p>
                      </div>
                      <div className="bg-white rounded-lg px-5 py-3 border border-amber-200">
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Closing Date</p>
                        <p className="font-semibold text-red-600">{content.callForApplication.closingDate}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Application Procedure */}
            <section className="py-16 bg-white">
              <div className="container mx-auto px-4 max-w-6xl">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {content.applicationProcedure.heading}
                </h2>
                <div className="w-12 h-1 bg-[#2a3f75] mb-8" />
                <div className="grid md:grid-cols-3 gap-6">
                  {content.applicationProcedure.steps.map((step, idx) => (
                    <div key={idx} className="relative bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <div className="w-10 h-10 rounded-full bg-[#2a3f75] text-white flex items-center justify-center text-lg font-bold mb-4">
                        {idx + 1}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Eligibility & Academic Requirements Side by Side */}
            <section className="py-16 bg-gray-50">
              <div className="container mx-auto px-4 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Eligibility */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {content.eligibilityRequirements.heading}
                    </h2>
                    <div className="w-12 h-1 bg-[#2a3f75] mb-6" />
                    <div className="space-y-3">
                      {content.eligibilityRequirements.items.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                          <div className="w-6 h-6 rounded-full bg-[#2a3f75] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                            {idx + 1}
                          </div>
                          <p className="text-gray-700">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Academic Requirements */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {content.academicRequirements.heading}
                    </h2>
                    <div className="w-12 h-1 bg-[#2a3f75] mb-6" />
                    <div className="space-y-3">
                      {content.academicRequirements.items.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                          <FileText className="w-5 h-5 text-[#2a3f75] flex-shrink-0 mt-0.5" />
                          <p className="text-gray-700">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Supporting Documents */}
            <section className="py-16 bg-white">
              <div className="container mx-auto px-4 max-w-6xl">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {content.supportingDocuments.heading}
                </h2>
                <div className="w-12 h-1 bg-[#2a3f75] mb-8" />
                <div className="grid md:grid-cols-2 gap-4">
                  {content.supportingDocuments.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <p className="text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Special Dispensation */}
            <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
              <div className="container mx-auto px-4 max-w-6xl">
                <div className="bg-white rounded-lg shadow-sm p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <Award className="w-8 h-8 text-[#2a3f75] flex-shrink-0" />
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-1">
                        {content.specialDispensation.heading}
                      </h2>
                      <p className="text-gray-600">{content.specialDispensation.description}</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    {content.specialDispensation.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg">
                        <Star className="w-5 h-5 text-amber-500 flex-shrink-0" />
                        <p className="text-gray-700 text-sm">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Application Steps */}
            <section className="py-16 bg-white">
              <div className="container mx-auto px-4 max-w-6xl">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {content.applicationSteps.heading}
                </h2>
                <div className="w-12 h-1 bg-[#2a3f75] mb-8" />
                <div className="flex flex-col md:flex-row gap-4">
                  {content.applicationSteps.steps.map((step, idx) => (
                    <div key={idx} className="flex-1 relative">
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 text-center h-full">
                        <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center text-lg font-bold mx-auto mb-3">
                          {idx + 1}
                        </div>
                        <p className="text-gray-700 font-medium text-sm">{step}</p>
                      </div>
                      {idx < content.applicationSteps.steps.length - 1 && (
                        <ArrowRight className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 z-10" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Disqualifying Factors */}
            <section className="py-16 bg-gray-50">
              <div className="container mx-auto px-4 max-w-6xl">
                <div className="bg-red-50 border border-red-200 rounded-lg p-8">
                  <div className="flex items-start gap-3 mb-6">
                    <AlertTriangle className="w-7 h-7 text-red-500 flex-shrink-0" />
                    <h2 className="text-2xl font-bold text-gray-900">
                      {content.disqualifyingFactors.heading}
                    </h2>
                  </div>
                  <div className="space-y-3">
                    {content.disqualifyingFactors.items.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                        <p className="text-gray-700">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Funding & Duration */}
            <section className="py-16 bg-white">
              <div className="container mx-auto px-4 max-w-6xl">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {content.fundingAndDuration.heading}
                </h2>
                <div className="w-12 h-1 bg-[#2a3f75] mb-8" />
                <div className="space-y-4">
                  {content.fundingAndDuration.items.map((item, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                      <p className="font-semibold text-gray-900 mb-1">{item.question}</p>
                      <p className="text-gray-600">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* FAQs */}
            <section className="py-16 bg-gray-50">
              <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex items-center gap-3 mb-2">
                  <HelpCircle className="w-7 h-7 text-[#2a3f75]" />
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {content.faqs.heading}
                  </h2>
                </div>
                <div className="w-12 h-1 bg-[#2a3f75] mb-8" />
                <FAQAccordion items={content.faqs.items} />
              </div>
            </section>

            {/* Contact Info */}
            <section className="py-16 bg-white">
              <div className="container mx-auto px-4 max-w-6xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Address</p>
                    <p className="text-gray-900 font-medium">{content.contactInfo.address}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Phone</p>
                    <p className="text-gray-900 font-medium">{content.contactInfo.phone}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Email</p>
                    <p className="text-gray-900 font-medium">{content.contactInfo.email}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Website</p>
                    <p className="text-gray-900 font-medium">{content.contactInfo.website}</p>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* ===== SCHOLARS TAB ===== */}
        {activeTab === 'scholars' && (
          <>
            {/* Scholars Header */}
            <section className="py-12 bg-white">
              <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {content.scholars.heading}
                  </h2>
                  <p className="text-lg text-gray-600">{content.scholars.subheading}</p>
                  <div className="w-12 h-1 bg-[#2a3f75] mx-auto mt-4" />
                </div>
              </div>
            </section>

            {/* Scholars Database */}
            <section className="py-8 bg-gray-50">
              <div className="container mx-auto px-4 max-w-6xl">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Globe className="w-6 h-6 text-[#2a3f75]" />
                    <h3 className="text-lg font-bold text-gray-900">Scholar Database</h3>
                  </div>
                  <ScholarTable scholars={allScholars} totalRecords={scholarsLoaded ? allScholars.length.toLocaleString() : content.scholars.totalRecords} />
                </div>
              </div>
            </section>

            {/* Partnership Message */}
            <section className="py-12 bg-white">
              <div className="container mx-auto px-4 max-w-4xl text-center">
                <blockquote className="text-xl text-gray-700 italic">
                  "By working in partnership, we create lasting change."
                </blockquote>
              </div>
            </section>
          </>
        )}

        {/* CTA Section (always visible) */}
        <section className="py-16 bg-[#2a3f75]">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {content.cta.heading}
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              {content.cta.description}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={content.cta.buttonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-getfund-gold text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
              >
                {content.cta.buttonText}
                <ArrowRight className="w-5 h-5" />
              </a>
              <Link
                to="/resources"
                className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                View Resources
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
