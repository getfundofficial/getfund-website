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
  id: number | string;
  title: string;
  slug?: string;
  excerpt?: string;
  summary?: string;
  content?: string;
  image_url?: string;
  date?: string;
  published_date?: string;
  category?: string;
  author?: string;
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
  category?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  role: 'board_chairman' | 'board_member' | 'management' | 'historical_admin';
  image_url?: string;
  bio?: string;
  date_range?: string;
  display_order: number;
  status: 'active' | 'inactive';
}

export interface TeamMembersResponse {
  chairman: TeamMember | null;
  management: TeamMember[];
  historical_admins: TeamMember[];
}

export type SectionType = 'text' | 'html' | 'image' | 'gallery' | 'video' | 'stats' | 'hero' | 'cta' | 'page_content';

export interface PageSection {
  id: string;
  section_key: string;
  section_type: SectionType;
  title?: string;
  content: any; // JSONB content, varies by section type
  order_index: number;
  is_active: boolean;
}

export interface CMSPage {
  id: string;
  slug: string;
  title: string;
  meta_title?: string;
  meta_description?: string;
  is_active: boolean;
  layout_template: string;
  template_variables?: Record<string, any>; // Template-level variables
  content?: any; // Legacy content structure (JSON)
  sections?: PageSection[];
}

class CMSApiClient {
  private baseUrl: string;
  private fetchTimeout: number = 15000; // 15 second timeout

  constructor(baseUrl: string = CMS_API_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Fetch with timeout
   */
  private async fetchWithTimeout(url: string, options: RequestInit = {}, timeout: number = this.fetchTimeout): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        cache: 'no-store', // Disable caching to always get fresh data
        headers: {
          ...options.headers,
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error(`Request timeout after ${timeout}ms`);
      }
      throw error;
    }
  }

  /**
   * Fetch all published hero slides
   */
  async getHeroSlides(): Promise<HeroSlide[]> {
    try {
      const response = await this.fetchWithTimeout(`${this.baseUrl}/hero-slides`);

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
      console.log('[CMS API] Fetching news from:', `${this.baseUrl}/news`);
      const response = await this.fetchWithTimeout(`${this.baseUrl}/news`);

      console.log('[CMS API] Response status:', response.status, response.statusText);

      if (!response.ok) {
        throw new Error(`Failed to fetch news articles: ${response.statusText}`);
      }

      const data: NewsArticleResponse[] = await response.json();
      console.log('[CMS API] Received articles:', data.length);

      // Transform database format to website format
      const transformed = data.map((article) => ({
        id: article.id.toString(),
        slug: article.slug || article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        title: article.title,
        excerpt: article.excerpt || article.summary || '',
        content: article.content || '',
        image: article.image_url || null,
        author: article.author || 'GETFund',
        date: article.date || article.published_date || '',
        tags: article.category ? [article.category] : ['News'],
        category: article.category || 'NEWS',
      })).slice(0, limit);

      console.log('[CMS API] Transformed articles:', transformed.length);
      return transformed;
    } catch (error) {
      console.error('[CMS API] Error fetching news articles:', error);
      return [];
    }
  }

  /**
   * Fetch a single news article by slug
   */
  async getNewsArticleBySlug(slug: string): Promise<NewsArticle | null> {
    try {
      const response = await this.fetchWithTimeout(`${this.baseUrl}/content/published/${slug}`);

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
        date: article.published_at || new Date().toISOString(),
        tags: article.category ? [article.category] : ['News'],
        category: article.category || 'NEWS',
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

  /**
   * Fetch a single published page by slug with all its sections
   */
  async getPageBySlug(slug: string): Promise<CMSPage | null> {
    try {
      // Add timestamp to prevent any caching
      const timestamp = Date.now();
      const url = `${this.baseUrl}/pages/${slug}?_t=${timestamp}`;
      console.log('[CMS API] Fetching page:', url);
      const response = await this.fetchWithTimeout(url);

      console.log('[CMS API] Page response status:', response.status, response.statusText);

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`Failed to fetch page: ${response.statusText}`);
      }

      const data = await response.json();
      const page: CMSPage = data.page;

      console.log('[CMS API] Received page:', page.title, 'with', page.sections?.length || 0, 'sections');

      // Only return if it's published
      if (!page.is_active) {
        console.log('[CMS API] Page is not published');
        return null;
      }

      return page;
    } catch (error) {
      console.error(`[CMS API] Error fetching page by slug (${slug}):`, error);
      return null;
    }
  }

  /**
   * Fetch menu configuration
   */
  async getMenuConfig(): Promise<{ menuItems: MenuItem[]; ctaButton: MenuItem | null }> {
    try {
      const url = `${this.baseUrl}/menu`;
      console.log('[CMS API] Fetching menu config:', url);
      const response = await this.fetchWithTimeout(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch menu: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('[CMS API] Received menu:', data);

      return data;
    } catch (error) {
      console.error('[CMS API] Error fetching menu config:', error);
      // Return empty menu on error
      return { menuItems: [], ctaButton: null };
    }
  }

  /**
   * Fetch all team members (chairman, management, historical admins)
   */
  async getTeamMembers(): Promise<TeamMembersResponse> {
    try {
      const url = `${this.baseUrl}/team-members`;
      console.log('[CMS API] Fetching team members:', url);
      const response = await this.fetchWithTimeout(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch team members: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('[CMS API] Received team members:', result);

      return result.data;
    } catch (error) {
      console.error('[CMS API] Error fetching team members:', error);
      // Return empty data on error
      return { chairman: null, management: [], historical_admins: [] };
    }
  }
}

export interface MenuItem {
  id: string;
  slug: string;
  title: string;
  label: string;
  order?: number;
  parentId?: string | null;
  children?: MenuItem[];
}

// Export a singleton instance
export const cmsApi = new CMSApiClient();

// Export the class for testing or custom instances
export default CMSApiClient;
