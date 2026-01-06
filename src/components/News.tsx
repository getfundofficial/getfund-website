import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { cmsApi } from '../services/cmsApi';
import OptimizedImage from './OptimizedImage';

interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  date?: string;
  publishedAt?: string;
  excerpt: string;
  category: string;
  image?: string;
  imageUrl?: string;
  author?: string;
  content?: string;
}

interface NewsProps {
  articles?: NewsArticle[];
  title?: string;
  subtitle?: string;
}

export default function News({ articles: propArticles, title, subtitle }: NewsProps = {}) {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoadingCMS, setIsLoadingCMS] = useState(true);

  // Fetch news articles from CMS on component mount
  useEffect(() => {
    const fetchNews = async () => {
      try {
        console.log('[News Component] Fetching news from CMS...');
        const cmsArticles = await cmsApi.getRecentNews(3);
        console.log('[News Component] Received CMS articles:', cmsArticles.length);

        if (cmsArticles.length > 0) {
          // Transform CMS articles to component format
          const transformedArticles: NewsArticle[] = cmsArticles.map(article => ({
            id: article.id,
            slug: article.slug,
            title: article.title,
            date: article.date,
            publishedAt: article.date,
            excerpt: article.excerpt,
            category: article.tags[0] || 'News',
            image: article.image || undefined,
            imageUrl: article.image || undefined,
            author: article.author,
            content: article.content,
          }));

          console.log('[News Component] Setting articles:', transformedArticles.length);
          setArticles(transformedArticles);
        } else {
          console.log('[News Component] No CMS articles found');
          setArticles([]);
        }
      } catch (error) {
        console.error('[News Component] Failed to fetch news from CMS:', error);
        setArticles([]);
      } finally {
        setIsLoadingCMS(false);
      }
    };

    // Only fetch if propArticles wasn't provided
    if (!propArticles || propArticles.length === 0) {
      console.log('[News Component] No prop articles, fetching from CMS');
      fetchNews();
    } else {
      console.log('[News Component] Using prop articles:', propArticles.length);
      setArticles(propArticles);
      setIsLoadingCMS(false);
    }
  }, [propArticles]);

  // Show loading state
  if (isLoadingCMS) {
    return (
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4">
              <img
                src="/images/logos/getfund-cropped-icon.png"
                alt="Loading..."
                className="w-full h-full object-contain animate-spin-slow"
              />
            </div>
            <p className="text-gray-600">Loading news...</p>
          </div>
        </div>
      </section>
    );
  }

  // Show empty state if no articles
  if (!articles || articles.length === 0) {
    return (
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
        <div id="news" className="absolute -mt-24 sm:-mt-28 md:-mt-32 lg:-mt-36"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">{title || 'News & Updates'}</h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {subtitle || 'Stay updated with the latest developments and achievements from GETFund.'}
            </p>
          </div>
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No News Articles Yet</h3>
              <p className="text-gray-600">News articles will appear here once they are published through the CMS.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
      {/* Scroll anchor with offset for fixed header */}
      <div id="news" className="absolute -mt-24 sm:-mt-28 md:-mt-32 lg:-mt-36"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with title and View All link */}
        <div className="flex items-start justify-between mb-8 sm:mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">{title || 'Latest News & Updates'}</h2>
            <div className="w-16 h-1 bg-getfund-primary"></div>
          </div>
          <Link
            to="/news"
            className="hidden sm:inline-flex items-center gap-2 text-getfund-primary font-medium hover:gap-3 transition-all"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[...articles]
            .sort((a, b) => {
              const dateA = new Date(a.publishedAt || a.date || 0).getTime();
              const dateB = new Date(b.publishedAt || b.date || 0).getTime();
              return dateB - dateA; // Latest first
            })
            .slice(0, 3)
            .map((article) => (
            <Link
              key={article.title}
              to={`/news/${article.slug || article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              className="group block"
            >
              <article>
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-4">
                  <OptimizedImage
                    src={article.image || '/images/news/news-placeholder.svg'}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    fallbackSrc="/images/news/news-placeholder.svg"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 group-hover:text-getfund-primary transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <time
                  dateTime={article.publishedAt || article.date || ''}
                  className="text-sm text-gray-500"
                >
                  {(article.publishedAt || article.date)
                    ? new Date((article.publishedAt || article.date) as string).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })
                    : '—'}
                </time>
              </article>
            </Link>
          ))}
        </div>

        {/* Mobile View All link */}
        <div className="text-center mt-8 sm:hidden">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-getfund-primary font-medium"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
