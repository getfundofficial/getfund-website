import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { cmsApi } from '../services/cmsApi';

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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-getfund-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading news from CMS...</p>
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
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
      {/* Scroll anchor with offset for fixed header */}
      <div id="news" className="absolute -mt-24 sm:-mt-28 md:-mt-32 lg:-mt-36"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">{title || 'News & Updates'}</h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {subtitle || 'Stay updated with the latest developments and achievements from GETFund.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 mb-8 sm:mb-10 md:mb-12">
          {articles.slice(0, 3).map((article) => (
            <article
              key={article.title}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col"
            >
              <img 
                src={article.image} 
                alt={`${article.title} - GETFund infrastructure project`}
                className="h-40 sm:h-48 md:h-52 w-full object-cover"
                loading="lazy"
                decoding="async"
                width="400"
                height="200"
              />
              <div className="p-4 sm:p-6 flex flex-col flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                  <span className="bg-getfund-primary/10 text-getfund-primary px-3 py-1 rounded-full text-xs sm:text-sm font-medium w-fit">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-1 text-gray-500 text-xs sm:text-sm">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
                    <time dateTime={(article.publishedAt || article.date || '')}>
                      {(article.publishedAt || article.date)
                        ? new Date((article.publishedAt || article.date) as string).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })
                        : '—'}
                    </time>
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 leading-tight">{article.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6 flex-1">{article.excerpt}</p>
                <Link
                  to={`/news/${article.slug || article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                  className="inline-flex items-center gap-2 text-getfund-primary font-semibold hover:gap-3 transition-all text-sm sm:text-base min-h-[44px] mt-auto"
                >
                  Read More <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/news"
            className="inline-block bg-getfund-primary text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-sm font-semibold hover:bg-green-700 transition-colors shadow-lg uppercase tracking-wide text-sm sm:text-base md:text-lg min-h-[48px] flex items-center justify-center max-w-xs mx-auto"
            aria-label="View all news articles"
          >
            View All News
          </Link>
        </div>
      </div>
    </section>
  );
}
