import { useParams } from 'react-router-dom';
import { Calendar, User, ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
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
  const [relatedArticles, setRelatedArticles] = useState<NewsArticle[]>([]);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        const cmsArticle = await cmsApi.getNewsArticleBySlug(slug);

        if (cmsArticle) {
          setArticle(cmsArticle);

          // Fetch related articles (excluding current one)
          const allArticles = await cmsApi.getNewsArticles(5);
          const related = allArticles.filter(a => a.id !== cmsArticle.id).slice(0, 2);
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
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Link 
              to="/news" 
              className="inline-flex items-center gap-2 text-getfund-primary hover:text-getfund-secondary mb-6 transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to News
            </Link>
            
            <div>
              <div className="mb-4">
                <span className="bg-getfund-primary text-white px-3 py-1 text-xs font-semibold uppercase">
                  {article.tags[0] || 'Announcement'}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
                {article.title}
              </h1>

              <div className="flex items-center gap-2 text-gray-500 text-sm">
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
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Featured Image */}
          <div className="mb-8 bg-white shadow">
            <img 
              src={article.image || '/images/hero/main-slider-1.jpg'}
              alt={article.title}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Article Content */}
          <div className="bg-white shadow p-8 md:p-12">
            <div 
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-justify prose-ul:text-gray-700 prose-li:mb-2"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>

          {/* Share and Navigation Section */}
          <div className="bg-white shadow p-6 mt-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-4">Share this article</h4>
                <div className="flex items-center gap-4">
                  <button className="inline-flex items-center gap-2 text-gray-700 hover:text-getfund-primary transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    Facebook
                  </button>
                  <button className="inline-flex items-center gap-2 text-gray-700 hover:text-getfund-primary transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                    X (Twitter)
                  </button>
                </div>
              </div>
              {relatedArticles.length > 0 && (
                <div className="md:text-right">
                  <Link 
                    to={`/news/${relatedArticles[0].slug}`}
                    className="inline-flex items-center gap-2 text-getfund-primary hover:text-getfund-secondary font-semibold transition-colors"
                  >
                    Next News <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Related News</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {relatedArticles.map((related) => (
                  <Link key={related.id} to={`/news/${related.slug}`} className="group">
                    <div className="bg-white shadow hover:shadow-lg transition-shadow overflow-hidden">
                      <div className="relative">
                        {related.image && (
                          <img
                            src={related.image}
                            alt={related.title}
                            className="w-full h-48 object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/images/news/news-placeholder.svg';
                            }}
                          />
                        )}
                        <div className="absolute top-4 left-4">
                          <span className="bg-getfund-primary text-white px-3 py-1 text-xs font-semibold uppercase">
                            {related.tags[0] || 'Announcement'}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                          <Calendar className="w-4 h-4" />
                          <time dateTime={related.date}>
                            {new Date(related.date).toLocaleDateString('en-US', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </time>
                        </div>
                        <h4 className="font-bold text-gray-900 group-hover:text-getfund-primary transition-colors line-clamp-2 mb-2">
                          {related.title}
                        </h4>
                        <p className="text-sm text-gray-600 line-clamp-2">{related.excerpt}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
      </div>
      <Footer />
    </div>
  );
}
// Force rebuild - v1.0.1
