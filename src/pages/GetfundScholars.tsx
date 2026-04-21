import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Globe } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import LoadingScreen from '../components/LoadingScreen';
import AnnouncementBanner from '../components/AnnouncementBanner';
import { cmsApi } from '../services/cmsApi';
import { ScholarshipsContent, ScholarRecord, defaultContent } from '../data/scholarshipsContent';

function ScholarTable({ scholars, totalRecords }: { scholars: ScholarRecord[]; totalRecords: string }) {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const filtered = scholars;

  const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedScholars = filtered.slice(startIndex, startIndex + rowsPerPage);

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
      <div className="mb-6 flex justify-end">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: 'rgba(6, 78, 59, 0.1)' }}>
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#064e3b' }} />
          <span className="text-sm font-semibold" style={{ color: '#064e3b' }}>{totalRecords} total records</span>
        </div>
      </div>
      <div className="overflow-x-auto border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ backgroundColor: '#064e3b' }}>
              <th className="text-left px-4 py-3 font-semibold text-white">Name of Beneficiary</th>
              <th className="text-left px-4 py-3 font-semibold text-white">Academic Year</th>
              <th className="text-left px-4 py-3 font-semibold text-white">Country</th>
              <th className="text-left px-4 py-3 font-semibold text-white">Institution</th>
              <th className="text-left px-4 py-3 font-semibold text-white">Course/Programme</th>
            </tr>
          </thead>
          <tbody>
            {paginatedScholars.map((scholar, idx) => (
              <tr key={idx} className={`border-b border-gray-100 hover:bg-gray-100 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
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
        <p className="text-center text-gray-500 py-8">No scholars available.</p>
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
              className="px-3 py-1.5 text-sm border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
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
                  className={`px-3 py-1.5 text-sm border ${
                    currentPage === page
                      ? 'text-white border-transparent'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                  style={currentPage === page ? { backgroundColor: '#064e3b' } : undefined}
                >
                  {page}
                </button>
              )
            )}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 text-sm border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
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

        {/* Page Title Section */}
        <section className="pt-8 pb-6">
          <div className="container mx-auto px-4 max-w-7xl">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {content.scholars.heading}
            </h1>
            <div className="w-16 h-1" style={{ backgroundColor: '#064e3b' }} />
            <p className="text-gray-600 mt-4 max-w-3xl">
              {content.scholars.subheading}
            </p>
          </div>
        </section>

        {/* Scholars Database */}
        <section className="py-16 md:py-24 bg-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#064e3b 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          <div className="container mx-auto px-4 max-w-7xl relative">
            <div className="flex items-center gap-3 mb-8">
              <Globe className="w-6 h-6" style={{ color: '#064e3b' }} />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Scholar Database</h2>
            </div>
            <ScholarTable scholars={allScholars} totalRecords={scholarsLoaded ? allScholars.length.toLocaleString() : content.scholars.totalRecords} />
          </div>
        </section>

        {/* Partnership Message */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="bg-getfund-primary text-white rounded-2xl p-16 text-center relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                "By working in partnership, we create lasting change."
              </h2>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
