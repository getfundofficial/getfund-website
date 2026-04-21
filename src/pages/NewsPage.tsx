import { Calendar, ArrowRight, Search, ArrowUpDown } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import LoadingScreen from '../components/LoadingScreen';
import OptimizedImage from '../components/OptimizedImage';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { cmsApi } from '../services/cmsApi';

interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string | null;
  author: string;
  date: string;
  tags: string[];
  category?: string;
}


interface NewsUpdatesContent {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    title: string;
    subtitle: string;
  };
  sidebar: {
    searchLabel: string;
    searchPlaceholder: string;
    recentPostsLabel: string;
    categoriesLabel: string;
  };
  emptyState: {
    noArticlesMessage: string;
  };
}

const PLACEHOLDER_IMAGE = '/images/news/news-placeholder.svg';

const CATEGORY_LABELS: Record<string, string> = {
  NEWS: 'News',
  ANNOUNCEMENT: 'Announcement',
  ANNOUNCEMENTS: 'Announcement',
  PRESS_RELEASE: 'Press Release',
  'PRESS RELEASE': 'Press Release',
  EVENT: 'Event',
  EVENTS: 'Event',
  UPDATE: 'Update',
  UPDATES: 'Update',
  'EVENTS AND UPDATES': 'Update',
};

function getValidImage(image: string | null): string {
  const lowerImg = image?.toLowerCase() || '';
  const isValid = image &&
    image !== PLACEHOLDER_IMAGE &&
    !lowerImg.includes('logo-light') &&
    !lowerImg.includes('logo-dark') &&
    !lowerImg.includes('site-icon') &&
    !lowerImg.includes('getfund-site-icon') &&
    !lowerImg.includes('getfund-cropped') &&
    !lowerImg.includes('cropped-getfund') &&
    !lowerImg.includes('placeholder') &&
    !lowerImg.includes('favicon') &&
    !lowerImg.endsWith('icon.png') &&
    !lowerImg.endsWith('logo.png');
  return isValid ? image : PLACEHOLDER_IMAGE;
}

function getCategoryLabel(category?: string): string | null {
  const cat = category?.toUpperCase().replace(/[-_]/g, ' ').trim();
  if (!cat) return null;
  return CATEGORY_LABELS[cat] || CATEGORY_LABELS[cat.replace(/\s+/g, '_')] || null;
}

function formatArticleDate(date: string): string | null {
  if (!date || isNaN(Date.parse(date))) return null;
  return new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [content, setContent] = useState<NewsUpdatesContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 12;

  // Fetch news articles and page content from CMS on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch page content
        const page = await cmsApi.getPageBySlug('news');
        const section = page?.sections?.find(s => s.section_type === 'page_content');
        if (section?.content) {
          setContent(section.content as NewsUpdatesContent);
        }

        const cmsArticles = await cmsApi.getNewsArticles();

        if (cmsArticles.length > 0) {
          setArticles(cmsArticles);
        } else {
          setArticles([]);
        }
      } catch {
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter articles based on search and category, then sort by date (latest first)
  const filteredArticles = articles
    .filter(article => {
      const matchesSearch = searchTerm === '' ||
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory === 'ALL' ||
        article.category === selectedCategory;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      // Sort by date based on sortOrder
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

  // Pagination calculations
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  // Reset to page 1 when search, category, or sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, sortOrder]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // Show all pages if total is less than max
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Show first page, last page, current page and neighbors
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        pageNumbers.push(currentPage - 1);
        pageNumbers.push(currentPage);
        pageNumbers.push(currentPage + 1);
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  if (loading) {
    return <LoadingScreen />;
  }

  // Filter tab categories
  const categories = [
    { key: 'ALL', label: 'All' },
    { key: 'NEWS', label: 'News' },
    { key: 'ANNOUNCEMENT', label: 'Announcements' },
    { key: 'EVENT', label: 'Events' },
    { key: 'UPDATE', label: 'Updates' },
    { key: 'PRESS_RELEASE', label: 'Press Releases' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{content?.meta?.title || 'News & Updates | GETFund'}</title>
        <meta
          name="description"
          content={content?.meta?.description || 'Stay updated with the latest news from GETFund'}
        />
      </Helmet>

      <Header />
      <Breadcrumb />

      <main className="flex-1">
        {/* Page Title Section */}
        <section className="bg-white pt-8 pb-6">
          <div className="container mx-auto px-4 max-w-6xl">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {content?.hero?.title || 'News & Events'}
            </h1>
            <div className="w-16 h-1" style={{ backgroundColor: '#2a3f75' }} />
          </div>
        </section>

        {/* Filter Tabs and Search */}
        <section className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-4">
              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-1">
                {categories.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => setSelectedCategory(cat.key)}
                    className={`px-4 py-2 text-sm font-medium transition-colors rounded-md ${
                      selectedCategory === cat.key
                        ? 'text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    style={selectedCategory === cat.key ? { backgroundColor: '#2a3f75' } : {}}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Search and Sort */}
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                {/* Search Bar */}
                <div className="relative w-full sm:w-64">
                  <input
                    type="text"
                    placeholder={content?.sidebar?.searchPlaceholder || 'Search articles...'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Search className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>

                {/* Sort Dropdown */}
                <div className="relative w-full sm:w-44">
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
                    className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white cursor-pointer"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                  </select>
                  <ArrowUpDown className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* News Grid Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">

            {/* Results count */}
            {filteredArticles.length > 0 && (
              <div className="flex items-center justify-between mb-8">
                <p className="text-sm text-gray-500">
                  Showing {indexOfFirstArticle + 1}&ndash;{Math.min(indexOfLastArticle, filteredArticles.length)} of{' '}
                  {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''}
                </p>
              </div>
            )}

            {/* News Grid */}
            {filteredArticles.length === 0 ? (
              <div className="bg-white shadow-sm p-12 text-center">
                <p className="text-gray-600 text-lg">
                  {content?.emptyState?.noArticlesMessage || 'No articles found matching your criteria.'}
                </p>
              </div>
            ) : (
              <>
                {/* Featured Article — first article displayed as a hero card */}
                <article className="bg-white shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
                  <Link to={`/news/${currentArticles[0].slug}`} className="block md:flex">
                    <div className="relative md:w-3/5 overflow-hidden">
                      <OptimizedImage
                        src={getValidImage(currentArticles[0].image)}
                        alt={currentArticles[0].title}
                        className="w-full h-64 md:h-80 lg:h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
                        fallbackSrc={PLACEHOLDER_IMAGE}
                        priority
                      />
                      {getCategoryLabel(currentArticles[0].category) && (
                        <div className="absolute top-4 left-4 z-10">
                          <span
                            className="text-white px-3 py-1 text-xs font-semibold"
                            style={{ backgroundColor: '#2a3f75' }}
                          >
                            {getCategoryLabel(currentArticles[0].category)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center md:w-2/5">
                      <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                        <Calendar className="w-4 h-4" aria-hidden="true" />
                        {formatArticleDate(currentArticles[0].date) && (
                          <time dateTime={currentArticles[0].date}>
                            {formatArticleDate(currentArticles[0].date)}
                          </time>
                        )}
                      </div>
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-3">
                        {currentArticles[0].title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-6 line-clamp-4">
                        {currentArticles[0].excerpt}
                      </p>
                      <span
                        className="inline-flex items-center gap-2 font-semibold text-sm group-hover:gap-3 transition-all"
                        style={{ color: '#2a3f75' }}
                      >
                        Read full article <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </article>

                {/* Remaining Articles Grid */}
                {currentArticles.length > 1 && (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    {currentArticles.slice(1).map((article) => (
                      <article
                        key={article.id}
                        className="bg-white shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group flex flex-col"
                      >
                        <Link to={`/news/${article.slug}`} className="flex flex-col h-full">
                          <div className="relative overflow-hidden">
                            <div className="aspect-[16/10]">
                              <OptimizedImage
                                src={getValidImage(article.image)}
                                alt={article.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                fallbackSrc={PLACEHOLDER_IMAGE}
                              />
                            </div>
                            {getCategoryLabel(article.category) && (
                              <div className="absolute top-4 left-4 z-10">
                                <span
                                  className="text-white px-3 py-1 text-xs font-semibold"
                                  style={{ backgroundColor: '#2a3f75' }}
                                >
                                  {getCategoryLabel(article.category)}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="p-5 flex flex-col flex-1">
                            <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                              <Calendar className="w-4 h-4" aria-hidden="true" />
                              {formatArticleDate(article.date) && (
                                <time dateTime={article.date}>
                                  {formatArticleDate(article.date)}
                                </time>
                              )}
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                              {article.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                              {article.excerpt}
                            </p>
                            <span
                              className="inline-flex items-center gap-2 font-semibold text-sm group-hover:gap-3 transition-all mt-auto"
                              style={{ color: '#2a3f75' }}
                            >
                              Read more <ArrowRight className="w-4 h-4" aria-hidden="true" />
                            </span>
                          </div>
                        </Link>
                      </article>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                {/* Previous button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-2 rounded transition-colors ${
                    currentPage === 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                  aria-label="Previous page"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                </button>

                {/* Page numbers */}
                {generatePageNumbers().map((pageNum, index) => {
                  if (pageNum === '...') {
                    return (
                      <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
                        ...
                      </span>
                    );
                  }

                  const pageNumber = pageNum as number;
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`px-4 py-2 rounded font-medium transition-colors ${
                        currentPage === pageNumber
                          ? 'text-white'
                          : 'text-gray-600 hover:bg-gray-200'
                      }`}
                      style={currentPage === pageNumber ? { backgroundColor: '#2a3f75' } : {}}
                      aria-label={`Page ${pageNumber}`}
                      aria-current={currentPage === pageNumber ? 'page' : undefined}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                {/* Next button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-2 rounded transition-colors ${
                    currentPage === totalPages
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                  aria-label="Next page"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}