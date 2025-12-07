import { useParams, Link } from 'react-router-dom';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
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


export default function NewsArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [latestNews, setLatestNews] = useState<NewsArticle[]>([]);
  const [relatedArticles, setRelatedArticles] = useState<NewsArticle[]>([]);
  const [previousArticle, setPreviousArticle] = useState<NewsArticle | null>(null);
  const [nextArticle, setNextArticle] = useState<NewsArticle | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        const cmsArticle = await cmsApi.getNewsArticleBySlug(slug);

        if (cmsArticle) {
          setArticle(cmsArticle);

          // Fetch all articles for navigation and sidebar
          const allArticles = await cmsApi.getNewsArticles();

          // Find current article index
          const currentIndex = allArticles.findIndex(a => a.id === cmsArticle.id);

          // Set previous and next articles
          if (currentIndex > 0) {
            setNextArticle(allArticles[currentIndex - 1]);
          }
          if (currentIndex < allArticles.length - 1) {
            setPreviousArticle(allArticles[currentIndex + 1]);
          }

          // Set latest news (first 4 articles excluding current)
          const latest = allArticles.filter(a => a.id !== cmsArticle.id).slice(0, 4);
          setLatestNews(latest);

          // Set related articles (3 articles excluding current)
          const related = allArticles.filter(a => a.id !== cmsArticle.id).slice(0, 3);
          setRelatedArticles(related);
        }
      } catch (error) {
        console.error('Failed to fetch article:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-getfund-primary mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex flex-col">
        <div className="container mx-auto px-4 py-16 flex-1">
          <h1 className="text-2xl font-bold text-gray-900">Article not found</h1>
          <Link to="/news" className="text-getfund-primary hover:underline">
            ← Back to News
          </Link>
        </div>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'News & Updates', href: '/news' },
    { label: article.title, href: `/news/${slug}`, isActive: true }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <Breadcrumb items={breadcrumbItems} />

      <div className="flex-1 bg-gray-50">
        {/* Back to News Link */}
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-6">
            <Link
              to="/news"
              className="inline-flex items-center gap-2 text-getfund-primary hover:text-getfund-secondary transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to News
            </Link>
          </div>
        </div>

        {/* Main Content Area - 2 Column Layout */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Left Column */}
            <div className="lg:col-span-2">
              {/* Featured Image */}
              {article.image && (
                <div className="mb-6">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/news/news-placeholder.svg';
                    }}
                  />
                </div>
              )}

              {/* Article Header */}
              <div className="mb-6">
                <span className="bg-getfund-primary text-white px-3 py-1 text-sm font-semibold">
                  {article.tags[0] || 'General News'}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-4">
                  {article.title}
                </h1>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={article.date}>
                    {new Date(article.date).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </time>
                </div>
              </div>

              {/* Article Content */}
              <div className="bg-white p-8 mb-6">
                <div
                  className="prose prose-lg max-w-none
                    prose-headings:text-gray-900 prose-headings:font-bold prose-headings:mb-4 prose-headings:mt-6
                    prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                    prose-ul:list-disc prose-ul:ml-6 prose-ul:mb-4 prose-ul:text-gray-700
                    prose-ol:list-decimal prose-ol:ml-6 prose-ol:mb-4 prose-ol:text-gray-700
                    prose-li:mb-2 prose-li:ml-2 prose-li:leading-relaxed
                    prose-strong:font-bold prose-strong:text-gray-900"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </div>

              {/* Share this article */}
              <div className="bg-white p-6 mb-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Share this article</h4>
                <div className="flex items-center gap-4">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#1877F2] text-white rounded hover:bg-[#0d65d9] transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${article.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    X (Twitter)
                  </a>
                </div>
              </div>

              {/* Previous/Next News Navigation */}
              <div className="flex justify-between items-center bg-white p-6 mb-6">
                <div>
                  {previousArticle && (
                    <Link
                      to={`/news/${previousArticle.slug}`}
                      className="inline-flex items-center gap-2 text-getfund-primary hover:text-getfund-secondary transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                      Previous News
                    </Link>
                  )}
                </div>
                <div>
                  {nextArticle && (
                    <Link
                      to={`/news/${nextArticle.slug}`}
                      className="inline-flex items-center gap-2 text-getfund-primary hover:text-getfund-secondary transition-colors"
                    >
                      Next News
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                  )}
                </div>
              </div>

              {/* Related News */}
              {relatedArticles.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Related News</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {relatedArticles.map((related) => (
                      <Link key={related.id} to={`/news/${related.slug}`} className="group bg-white overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="relative h-48">
                          {related.image ? (
                            <img
                              src={related.image}
                              alt={related.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/images/news/news-placeholder.svg';
                              }}
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-400">No image</span>
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <div className="flex items-center gap-1 text-gray-500 text-xs mb-2">
                            <Calendar className="w-3 h-3" />
                            <time dateTime={related.date}>
                              {new Date(related.date).toLocaleDateString('en-US', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </time>
                          </div>
                          <h4 className="font-bold text-gray-900 group-hover:text-getfund-primary transition-colors text-sm line-clamp-2">
                            {related.title}
                          </h4>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar - Right Column */}
            <div className="lg:col-span-1">
              {/* Latest News */}
              <div className="bg-white p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                  Latest News
                </h3>
                <div className="space-y-4">
                  {latestNews.map((news) => (
                    <Link
                      key={news.id}
                      to={`/news/${news.slug}`}
                      className="flex gap-3 group"
                    >
                      <div className="flex-shrink-0 w-20 h-20">
                        {news.image ? (
                          <img
                            src={news.image}
                            alt={news.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/images/news/news-placeholder.svg';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-gray-900 group-hover:text-getfund-primary transition-colors line-clamp-2 mb-1">
                          {news.title}
                        </h4>
                        <div className="flex items-center gap-1 text-gray-500 text-xs">
                          <Calendar className="w-3 h-3" />
                          <time dateTime={news.date}>
                            {new Date(news.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </time>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link
                  to="/news"
                  className="block mt-4 pt-4 border-t border-gray-200 text-getfund-primary hover:text-getfund-secondary font-semibold text-sm transition-colors"
                >
                  View All News →
                </Link>
              </div>

              {/* Quick Links */}
              <div className="bg-white p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                  Quick Links
                </h3>
                <nav className="space-y-2">
                  <Link
                    to="/what-we-do"
                    className="block py-2 text-gray-700 hover:text-getfund-primary hover:pl-2 transition-all"
                  >
                    → What We Do
                  </Link>
                  <Link
                    to="/who-we-are"
                    className="block py-2 text-gray-700 hover:text-getfund-primary hover:pl-2 transition-all"
                  >
                    → Who We Are
                  </Link>
                  <Link
                    to="/impact"
                    className="block py-2 text-gray-700 hover:text-getfund-primary hover:pl-2 transition-all"
                  >
                    → Impact
                  </Link>
                  <Link
                    to="/resources"
                    className="block py-2 text-gray-700 hover:text-getfund-primary hover:pl-2 transition-all"
                  >
                    → Resources
                  </Link>
                  <Link
                    to="/support-us"
                    className="block py-2 text-gray-700 hover:text-getfund-primary hover:pl-2 transition-all"
                  >
                    → Support Us
                  </Link>
                  <Link
                    to="/faq"
                    className="block py-2 text-gray-700 hover:text-getfund-primary hover:pl-2 transition-all"
                  >
                    → FAQs
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
