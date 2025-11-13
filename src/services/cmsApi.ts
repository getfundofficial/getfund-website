/**
 * CMS API Client for Public Website
 * Fetches published content from the CMS backend
 */

const CMS_API_URL = import.meta.env.VITE_CMS_API_URL || 'http://localhost:5000/api';

export interface CMSContent {
  id: string;
  type: 'news' | 'hero_slide';
  title: string;
  slug: string;
  excerpt: string;
  body: string | null;
  featured_image_url: string | null;
  category: string | null;
  author: string | null;
  published_at: string;
  meta_data?: Record<string, unknown>;
}

interface HeroSlideResponse {
  id: number;
  title: string;
  subtitle: string;
  image_url: string;
  link_text?: string;
  link_url?: string;
}

interface NewsArticleResponse {
  id: number;
  title: string;
  excerpt?: string;
  summary?: string;
  content?: string;
  image_url?: string;
  date?: string;
  published_date?: string;
  category?: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  buttonText?: string;
  buttonLink?: string;
}

export interface NewsArticle {
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

class CMSApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = CMS_API_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Fetch all published hero slides
   */
  async getHeroSlides(): Promise<HeroSlide[]> {
    try {
      const response = await fetch(`${this.baseUrl}/hero-slides`);

      if (!response.ok) {
        throw new Error(`Failed to fetch hero slides: ${response.statusText}`);
      }

      const data: HeroSlideResponse[] = await response.json();

      // Transform database format to website format
      return data.map((slide) => ({
        id: slide.id.toString(),
        title: slide.title,
        subtitle: slide.subtitle || '',
        image: slide.image_url || '',
        buttonText: slide.link_text || '',
        buttonLink: slide.link_url || '',
      }));
    } catch (error) {
      console.error('Error fetching hero slides:', error);
      return [];
    }
  }

  /**
   * Fetch all published news articles
   */
  async getNewsArticles(limit?: number): Promise<NewsArticle[]> {
    try {
      const response = await fetch(`${this.baseUrl}/news`);

      if (!response.ok) {
        throw new Error(`Failed to fetch news articles: ${response.statusText}`);
      }

      const data: NewsArticleResponse[] = await response.json();

      // Transform database format to website format
      return data.map((article) => ({
        id: article.id.toString(),
        slug: article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        title: article.title,
        excerpt: article.excerpt || article.summary || '',
        content: article.content || '',
        image: article.image_url || null,
        author: 'GETFund',
        date: article.date || article.published_date || '',
        tags: article.category ? [article.category] : ['News'],
      })).slice(0, limit);
    } catch (error) {
      console.error('Error fetching news articles:', error);
      return [];
    }
  }

  /**
   * Fetch a single news article by slug
   */
  async getNewsArticleBySlug(slug: string): Promise<NewsArticle | null> {
    try {
      const response = await fetch(`${this.baseUrl}/content/published/${slug}`);

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`Failed to fetch news article: ${response.statusText}`);
      }

      const article: CMSContent = await response.json();

      // Only return if it's published
      if (article.type !== 'news') {
        return null;
      }

      return {
        id: article.id,
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt,
        content: article.body || '',
        image: article.featured_image_url,
        author: article.author || 'GETFund',
        date: article.published_at,
        tags: article.category ? [article.category] : ['News'],
      };
    } catch (error) {
      console.error(`Error fetching news article by slug (${slug}):`, error);
      return null;
    }
  }

  /**
   * Fetch recent news articles (for homepage)
   */
  async getRecentNews(count: number = 3): Promise<NewsArticle[]> {
    return this.getNewsArticles(count);
  }
}

// Export a singleton instance
export const cmsApi = new CMSApiClient();

// Export the class for testing or custom instances
export default CMSApiClient;
