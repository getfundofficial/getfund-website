import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { GraduationCap, Globe, Search } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import LoadingScreen from '../components/LoadingScreen';
import AnnouncementBanner from '../components/AnnouncementBanner';
import { cmsApi } from '../services/cmsApi';
import { ScholarshipsContent, ScholarRecord, defaultContent } from '../data/scholarshipsContent';

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

export default function GetfundScholars() {
  const [content, setContent] = useState<ScholarshipsContent>(defaultContent);
  const [allScholars, setAllScholars] = useState<ScholarRecord[]>([]);
  const [scholarsLoaded, setScholarsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  // Load scholars data from public/ (not bundled)
  useEffect(() => {
    if (!scholarsLoaded) {
      fetch('/data/scholars.json')
        .then((res) => res.json())
        .then((data: ScholarRecord[]) => {
          setAllScholars(data);
          setScholarsLoaded(true);
        })
        .catch(() => {
          if (content.scholars.sampleData.length > 0) {
            setAllScholars(content.scholars.sampleData);
          }
          setScholarsLoaded(true);
        });
    }
  }, [scholarsLoaded, content.scholars.sampleData]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>GETFund Scholars | Ghana Education Trust Fund</title>
        <meta name="description" content="Browse the database of GETFund scholarship beneficiaries - over 16,000 scholars empowered across 14+ years." />
      </Helmet>

      <Header />
      <Breadcrumb />

      <main className="flex-1">
        <AnnouncementBanner
          message="All 2024/2025 GETFund local scholarship beneficiaries who have still not accepted their scholarship awards, are requested to accept their offers by Friday, 27th February, 2026. Failure to do so by the stated deadline, will result in a revocation and forfeiture of the award."
          storageKey="scholarship-acceptance-deadline-2026"
        />

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#2a3f75] to-[#1a2a55] text-white py-16 md:py-20">
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
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white">
              {content.scholars.heading}
            </h1>
            <p className="text-xl text-white max-w-3xl">
              {content.scholars.subheading}
            </p>
          </div>
        </section>

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
      </main>

      <Footer />
    </div>
  );
}
