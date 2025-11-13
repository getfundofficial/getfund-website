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
}

const defaultArticles: NewsArticle[] = [
    {
      id: 'default-1',
      slug: 'getfund-commences-accelerated-infrastructure-program-at-ambariya-schools',
      title: 'GETFund Commences Accelerated Infrastructure Program at Ambariya Schools; Targets 18-Month Completion',
      date: '2025-10-14',
      excerpt: 'The Ghana Education Trust Fund has signaled the immediate start of major infrastructure projects at Ambariya Senior High School and Ambariya Community Primary School in the Tamale Metropolis. Projects include 2 new two-storey dormitory blocks for boys, 2 new two-storey dormitory blocks for girls, a twelve-unit classroom block, a two-storey administration and library complex, and a 5,000-capacity multipurpose auditorium.',
      category: 'Infrastructure',
      image: '/images/recent-projects/ambariya.png',
      author: 'Isaac Asiedu Odei',
      content: `On the 5th of October 2025, a delegation led by the Deputy Administrator of GETFund, Hon Alhaji Alhassan Sualihu Dandaawa on an official working visit, confirmed after an on-site assessment that the sites are ready for crucial possession and assessment. This forms part of the Administrator of the Fund, Mr. Paul Adjei's vision to transform educational facilities nationwide.

During engagements with the school authorities and community elders, Hon. Dandaawa confirmed that funds have been allocated to support the construction of the following planned comprehensive projects for Ambariya SHS:

• 2 new two-storey dormitory blocks for boys
• 2 new Two-storey dormitory blocks for girls  
• A twelve-unit classroom block
• A two-storey administration and library complex and
• A 5,000-capacity multipurpose auditorium for the primary school.

The Ambariya community was visibly grateful for the massive infrastructural boost, with leaders pledging full support to ensure a smooth and swift execution. "Education is the bedrock of our community's future," a school dignitary emphasized, expressing profound thanks.`
    },
    {
      id: 'default-2',
      slug: 'getfund-kicks-off-multi-project-construction-to-boost-education-in-the-northern-region',
      title: 'GETFund Kicks Off Multi-Project Construction to Boost Education in the Northern Region',
      date: '2025-10-14',
      excerpt: 'The Ghana Education Trust Fund has commenced a significant push to bridge the infrastructure gap in the Northern Region\'s education sector. On Sunday, October 5, 2025, a high-level team visited the Northern School of Business (NOBISCO) to inspect the site for a new three-storey, 18-unit classroom block. Kumbungu SHS will receive a 2,500-capacity Dining Hall with Kitchen, Assembly Hall, and dormitory block.',
      category: 'Infrastructure',
      image: '/images/recent-projects/nobisco.png',
      author: 'Isaac Asiedu Odei',
      content: `On Sunday, October 5, 2025, a high-level team led by the Deputy Administrator, Hon. Alhaji Alhassan Sualihu Dandaawa, visited the Northern School of Business (NOBISCO). The team, which included the project consultant and the contractor, inspected the site earmarked for the construction of a new three-storey, 18-unit classroom block.

Management of NOBISCO warmly welcomed the project, which they saw as a crucial step towards expanding access to quality education. They also used the opportunity to appeal for additional support, specifically requesting a girls' dormitory block and a 12-seater toilet facility.

Kumbungu SHS is set to receive a major overhaul with the construction of a large 2,500-capacity Dining Hall with an attached Kitchen, a 2,500-capacity Assembly Hall, and a much-needed single-storey dormitory block. Sang Community Day SHS in the Mion District will also benefit from a new 2,500-capacity Dining Hall with an attached Kitchen.`
    },
    {
      id: 'default-3',
      slug: 'n-r-getfund-launches-major-infrastructure-expansion-at-ghana-senior-high-school',
      title: 'N/R: GETFund Launches Major Infrastructure Expansion at Ghana Senior High School',
      date: '2025-10-14',
      excerpt: 'Ghana Education Trust Fund has launched a major infrastructural expansion at the Ghana Senior High School (GHANASCO). The project includes a 2-storey, 12-unit classroom block, a 2-storey boys\' dormitory block, two new 12-seater toilet facilities, science laboratory rehabilitation, and a 5,000-capacity multipurpose assembly hall. The expansion is motivated by the school\'s rapidly growing population and aims to end the double-track system.',
      category: 'Infrastructure',
      image: '/images/recent-projects/ghanasco.png',
      author: 'Isaac Asiedu Odei',
      content: `Ghana Education Trust Fund (GETFund) has launched a major infrastructural expansion at the Ghana Senior High School (GHANASCO). The project, which has full funding and is scheduled for completion within 18 months, includes a 2-storey, 12-unit classroom block, a 2-storey boys' dormitory block, two new 12-seater toilet facilities, the rehabilitation of the science laboratory, and the construction of a 5,000-capacity multipurpose assembly hall.

A high powered delegation from Ghana Education Trust Fund (GETFund), led by the Deputy Administrator, Hon. Alhaji Alhassan Sualihu Dandaawa, visited the school on October 5, 2025, to formalise the commencement of a substantial infrastructure project.

This expansion is directly motivated by the school's rapidly growing population. It is a strategic step toward fulfilling President Mahama's agenda to end the double-track system, aligning with the vision of the GETFund Administrator, Mr. Paul Adjei, to improve educational facilities nationwide.`
    }
  ];

export default function News({ articles: propArticles }: NewsProps) {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoadingCMS, setIsLoadingCMS] = useState(true);

  // Fetch news articles from CMS on component mount
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const cmsArticles = await cmsApi.getRecentNews(3);

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

          setArticles(transformedArticles);
        } else {
          setArticles(defaultArticles);
        }
      } catch (error) {
        console.error('Failed to fetch news from CMS, using default articles:', error);
        setArticles(defaultArticles);
      } finally {
        setIsLoadingCMS(false);
      }
    };

    // Only fetch if propArticles wasn't provided
    if (!propArticles || propArticles.length === 0) {
      fetchNews();
    } else {
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
            <p className="mt-4 text-gray-600">Loading news...</p>
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">News & Updates</h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Stay updated with the latest developments and achievements from GETFund.
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
