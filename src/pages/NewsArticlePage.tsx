import { useParams } from 'react-router-dom';
import { Calendar, User, ArrowLeft } from 'lucide-react';
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
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Breadcrumb />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-getfund-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading article...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-16">
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
    <div className="min-h-screen bg-white">
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      {/* Hero Section */}
      <div className="relative bg-getfund-primary text-white pt-40 pb-16">
        <div className="absolute inset-0">
          <img 
            src={article.image || '/images/hero/main-slider-1.jpg'}
            alt={article.title}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-getfund-primary/80"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4">
          <Link 
            to="/news" 
            className="inline-flex items-center gap-2 text-green-100 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to News
          </Link>
          
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium">
                {article.tags[0] || 'News'}
              </span>
              <div className="flex items-center gap-2 text-green-100">
                <Calendar className="w-4 h-4" />
                <time dateTime={article.date}>
                  {new Date(article.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </time>
              </div>
              <div className="flex items-center gap-2 text-green-100">
                <User className="w-4 h-4" />
                <span>By {article.author}</span>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              {article.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Featured Image */}
          <div className="mb-12">
            <img 
              src={article.image || '/images/hero/main-slider-1.jpg'}
              alt={article.title}
              className="w-full h-96 object-cover rounded-xl shadow-lg"
            />
          </div>

          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none prose-headings:text-getfund-secondary prose-p:text-gray-700 prose-p:leading-relaxed prose-ul:text-gray-700 prose-li:mb-2"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mt-16 pt-16 border-t border-gray-200">
              <h3 className="text-2xl font-bold text-getfund-secondary mb-8">Related Articles</h3>
              <div className="grid md:grid-cols-2 gap-8">
                {relatedArticles.map((related) => (
                  <Link key={related.id} to={`/news/${related.slug}`} className="group">
                    <div className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                      {related.image && (
                        <img
                          src={related.image}
                          alt={related.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/news/news-placeholder.svg';
                          }}
                        />
                      )}
                      <div className="p-6">
                        <h4 className="font-bold text-gray-900 group-hover:text-getfund-primary transition-colors line-clamp-2">
                          {related.title}
                        </h4>
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{related.excerpt}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
      <Footer />
    </div>
  );
}