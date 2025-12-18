import { BannerBackground } from '../types/bannerBackground';
import { Calendar, ArrowRight, Search } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import PageBanner from '../components/PageBanner';
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
  bannerBackground?: BannerBackground;
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

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [content, setContent] = useState<NewsUpdatesContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
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

        // Fetch articles
        console.log('[NewsPage] Fetching all news articles...');
        const cmsArticles = await cmsApi.getNewsArticles();
        console.log('[NewsPage] Received articles:', cmsArticles.length);

        if (cmsArticles.length > 0) {
          setArticles(cmsArticles);
        } else {
          console.warn('[NewsPage] No articles returned from CMS');
          setArticles([]);
        }
      } catch (error) {
        console.error('[NewsPage] Failed to fetch data:', error);
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
      // Sort by date in descending order (latest first)
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });

  // Pagination calculations
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  // Reset to page 1 when search or category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

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

  console.log('[NewsPage] Total articles:', articles.length);
  console.log('[NewsPage] Filtered articles:', filteredArticles.length);
  console.log('[NewsPage] Current page:', currentPage);
  console.log('[NewsPage] Total pages:', totalPages);
  console.log('[NewsPage] Search term:', searchTerm);

  if (loading) {
    return <LoadingScreen />;
  }

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

      <PageBanner
        title={content?.hero?.title || 'News & Updates'}
        subtitle={content?.hero?.subtitle || 'Transforming Ghana\'s educational landscape through strategic investments and partnerships'}
        bannerBackground={content?.bannerBackground || {
          imageUrl: '/images/hero/main-slider-1.jpg',
          tintColor: '#DC143C',
          tintColor2: '#1F2937',
          useGradient: true,
          tintOpacity: 75,
          gradientDirection: 'to right'
        }}
      />

      <main className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="mb-6 max-w-2xl mx-auto">
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setSelectedCategory('ALL')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'ALL'
                    ? 'bg-getfund-primary text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedCategory('NEWS')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'NEWS'
                    ? 'bg-getfund-primary text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                News
              </button>
              <button
                onClick={() => setSelectedCategory('ANNOUNCEMENT')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'ANNOUNCEMENT'
                    ? 'bg-getfund-primary text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Announcement
              </button>
              <button
                onClick={() => setSelectedCategory('EVENT')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'EVENT'
                    ? 'bg-getfund-primary text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Event
              </button>
              <button
                onClick={() => setSelectedCategory('UPDATE')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'UPDATE'
                    ? 'bg-getfund-primary text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Update
              </button>
              <button
                onClick={() => setSelectedCategory('PRESS_RELEASE')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'PRESS_RELEASE'
                    ? 'bg-getfund-primary text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Press Release
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-8 max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder={content?.sidebar?.searchPlaceholder || 'Search articles...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-getfund-primary focus:border-transparent shadow-sm"
              />
              <Search className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* News Grid */}
          <div>
            {filteredArticles.length === 0 ? (
              <div className="bg-white shadow p-12 text-center">
                <p className="text-gray-600 text-lg">
                  {content?.emptyState?.noArticlesMessage || 'No articles found matching your criteria.'}
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentArticles.map((article) => (
                  <article
                    key={article.id}
                    className="bg-white shadow hover:shadow-lg transition-shadow overflow-hidden group"
                  >
                    <Link to={`/news/${article.slug}`} className="block">
                      <div className="relative h-48">
                        <OptimizedImage
                          src={article.image && article.image !== '/images/news/news-placeholder.svg' ? article.image : '/images/news/news-placeholder.svg'}
                          alt={article.title}
                          className="h-48 w-full object-cover"
                          fallbackSrc="/images/news/news-placeholder.svg"
                        />
                        <div className="absolute top-4 left-4 z-10">
                          <span className="bg-getfund-primary text-white px-3 py-1 text-xs font-semibold uppercase">
                            {article.tags[0] || 'Announcement'}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                          <Calendar className="w-4 h-4" aria-hidden="true" />
                          {article.date && !isNaN(Date.parse(article.date)) ? (
                            <time dateTime={article.date}>
                              {new Date(article.date).toLocaleDateString('en-US', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              })}
                            </time>
                          ) : null}
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-getfund-primary transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">{article.excerpt}</p>
                        <span className="inline-flex items-center gap-2 text-getfund-primary font-semibold text-sm group-hover:gap-3 transition-all">
                          Read more <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        </span>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12">
                  {/* Previous button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 transition-colors ${
                      currentPage === 1
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-600 hover:bg-gray-100'
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
                        className={`px-4 py-2 font-semibold transition-colors ${
                          currentPage === pageNumber
                            ? 'text-white bg-getfund-primary'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
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
                    className={`px-4 py-2 transition-colors ${
                      currentPage === totalPages
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    aria-label="Next page"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}