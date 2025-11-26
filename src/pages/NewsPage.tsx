import { Calendar, ArrowRight, Search } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
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
}

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Fetch all news articles from CMS on component mount
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        console.log('[NewsPage] Fetching all news articles...');
        const cmsArticles = await cmsApi.getNewsArticles();
        console.log('[NewsPage] Received articles:', cmsArticles.length);
        console.log('[NewsPage] Articles:', cmsArticles);

        if (cmsArticles.length > 0) {
          setArticles(cmsArticles);
        } else {
          console.warn('[NewsPage] No articles returned from CMS');
          setArticles([]);
        }
      } catch (error) {
        console.error('[NewsPage] Failed to fetch news articles:', error);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Filter articles based on search and category
  const filteredArticles = articles.filter(article => {
    const matchesSearch = searchTerm === '' ||
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'All' ||
      article.tags.includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  console.log('[NewsPage] Total articles:', articles.length);
  console.log('[NewsPage] Filtered articles:', filteredArticles.length);
  console.log('[NewsPage] Search term:', searchTerm);
  console.log('[NewsPage] Selected category:', selectedCategory);

  // Get unique categories from articles
  const categories = ['All', ...Array.from(new Set(articles.flatMap(a => a.tags)))];

  const recentPosts = articles.slice(0, 3)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-getfund-primary mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading news articles...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Breadcrumb />
      
      {/* Hero Section */}
      <section className="relative bg-white pt-8 pb-8 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              News & Updates
            </h1>
          </div>
        </div>
      </section>

      <main className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Main Content */}
            <div>
              {filteredArticles.length === 0 ? (
                <div className="bg-white shadow p-12 text-center">
                  <p className="text-gray-600 text-lg">No articles found matching your criteria.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article) => (
                  <article
                    key={article.id}
                    className="bg-white shadow hover:shadow-lg transition-shadow overflow-hidden group"
                  >
                    <Link to={`/news/${article.slug}`} className="block">
                      <div className="relative">
                        <img
                          src={article.image && article.image !== '/images/news/news-placeholder.svg' ? article.image : '/images/news/news-placeholder.svg'}
                          alt={article.title}
                          className="h-48 w-full object-cover"
                          onError={e => { e.currentTarget.src = '/images/news/news-placeholder.svg'; }}
                        />
                        <div className="absolute top-4 left-4">
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

              {/* Pagination: Only show if more than 1 page (e.g. > 10 articles) */}
              {filteredArticles.length > 10 && (
                <div className="flex justify-center items-center gap-2 mt-12">
                  <button className="px-4 py-2 text-white font-semibold bg-getfund-primary">1</button>
                  <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors">2</button>
                  <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors">3</button>
                  <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors">4</button>
                  <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}