/**
 * CMS API Client for Public Website
 * Fetches published content from the CMS backend
 */

const CMS_API_URL = import.meta.env.VITE_CMS_API_URL || '/api';

// Simple in-memory cache with TTL
const apiCache = new Map<string, { data: unknown; expiry: number }>();
const CACHE_TTL = 3 * 60 * 1000; // 3 minutes

function getCached<T>(key: string): T | null {
  const entry = apiCache.get(key);
  if (entry && Date.now() < entry.expiry) {
    return entry.data as T;
  }
  if (entry) apiCache.delete(key);
  return null;
}

function setCache(key: string, data: unknown, ttl: number = CACHE_TTL): void {
  apiCache.set(key, { data, expiry: Date.now() + ttl });
}

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
  title_font_size?: string;
  subtitle_font_size?: string;
  blue_box_text?: string;
  blue_box_color?: string;
  blue_box_opacity?: number;
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

export interface BlueBoxSettings {
  text?: string;
  color?: string;
  opacity?: number;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  buttonText?: string;
  buttonLink?: string;
  titleFontSize?: 'small' | 'medium' | 'large' | 'xlarge';
  subtitleFontSize?: 'small' | 'medium' | 'large' | 'xlarge';
  blueBoxText?: string;
  blueBox?: BlueBoxSettings;
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string | null;
  images?: string[];
  author: string;
  date: string;
  tags: string[];
  category?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  role: 'board_chairman' | 'board_member' | 'management' | 'historical_admin' | 'deputy_administrator' | 'financial_controller';
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
  deputy_administrator?: TeamMember | null;
  financial_controller?: TeamMember | null;
}

export interface FooterConfig {
  id: number;
  logo_url: string;
  about_text: string;
  phone: string;
  email: string;
  address: string;
  office_hours_weekday: string;
  office_hours_weekend: string;
  background_color: string;
  social_links: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    youtube?: string;
    whatsapp?: string;
  };
  quick_links: Array<{
    name: string;
    href: string;
    visible?: boolean;
  }>;
  is_active: boolean;
  updated_at: string;
}

export type SectionType = 'text' | 'html' | 'image' | 'gallery' | 'stats' | 'hero' | 'cta' | 'page_content';

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
    const cacheKey = 'hero-slides';
    const cached = getCached<HeroSlide[]>(cacheKey);
    if (cached) return cached;

    try {
      const response = await this.fetchWithTimeout(`${this.baseUrl}/hero-slides`);

      if (!response.ok) {
        throw new Error(`Failed to fetch hero slides: ${response.statusText}`);
      }

      const data: HeroSlideResponse[] = await response.json();

      // Transform database format to website format
      const result = data.map((slide) => ({
        id: slide.id.toString(),
        title: slide.title,
        subtitle: slide.subtitle || '',
        image: slide.image_url || '',
        buttonText: slide.link_text || '',
        buttonLink: slide.link_url || '',
        titleFontSize: (slide.title_font_size as HeroSlide['titleFontSize']) || 'medium',
        subtitleFontSize: (slide.subtitle_font_size as HeroSlide['subtitleFontSize']) || 'medium',
        blueBoxText: slide.blue_box_text || '',
        blueBox: {
          text: slide.blue_box_text || '',
          color: slide.blue_box_color || '#064e3b',
          opacity: slide.blue_box_opacity ?? 100,
        },
      }));
      setCache(cacheKey, result);
      return result;
    } catch {
      return [];
    }
  }

  /**
   * Fetch all published news articles
   */
  async getNewsArticles(limit?: number): Promise<NewsArticle[]> {
    const cacheKey = `news-${limit || 'all'}`;
    const cached = getCached<NewsArticle[]>(cacheKey);
    if (cached) return cached;

    try {
      const response = await this.fetchWithTimeout(`${this.baseUrl}/news`);

      if (!response.ok) {
        throw new Error(`Failed to fetch news articles: ${response.statusText}`);
      }

      const data: NewsArticleResponse[] = await response.json();

      // Transform database format to website format
      const result = data.map((article) => ({
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
      }))
        // Sort by date (newest first) before applying the limit, so a limited
        // request (e.g. homepage's getRecentNews) returns the actual latest articles
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, limit);
      setCache(cacheKey, result);
      return result;
    } catch {
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

      // Get images from meta_data if available
      const metaImages = (article.meta_data?.images as string[]) || [];

      return {
        id: article.id,
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt,
        content: article.body || '',
        image: article.featured_image_url,
        images: metaImages.length > 0 ? metaImages : (article.featured_image_url ? [article.featured_image_url] : []),
        author: article.author || 'GETFund',
        date: article.published_at || new Date().toISOString(),
        tags: article.category ? [article.category] : ['News'],
        category: article.category || 'NEWS',
      };
    } catch {
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
    const cacheKey = `page-${slug}`;
    const cached = getCached<CMSPage | null>(cacheKey);
    if (cached !== null) return cached;

    try {
      const url = `${this.baseUrl}/pages/${slug}`;
      const response = await this.fetchWithTimeout(url);

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`Failed to fetch page: ${response.statusText}`);
      }

      const data = await response.json();
      const page: CMSPage = data.page;

      // Only return if it's published
      if (!page.is_active) {
        return null;
      }

      setCache(cacheKey, page);
      return page;
    } catch {
      return null;
    }
  }

  /**
   * Fetch menu configuration
   */
  async getMenuConfig(): Promise<{ menuItems: MenuItem[]; ctaButton: MenuItem | null }> {
    const cacheKey = 'menu-config';
    const cached = getCached<{ menuItems: MenuItem[]; ctaButton: MenuItem | null }>(cacheKey);
    if (cached) return cached;

    try {
      const url = `${this.baseUrl}/menu`;
      const response = await this.fetchWithTimeout(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch menu: ${response.statusText}`);
      }

      const result = await response.json();
      setCache(cacheKey, result, 5 * 60 * 1000); // 5 min for menu
      return result;
    } catch {
      return { menuItems: [], ctaButton: null };
    }
  }

  /**
   * Fetch all team members (chairman, management, historical admins)
   */
  async getTeamMembers(): Promise<TeamMembersResponse> {
    const cacheKey = 'team-members';
    const cached = getCached<TeamMembersResponse>(cacheKey);
    if (cached) return cached;

    try {
      const url = `${this.baseUrl}/team-members`;
      const response = await this.fetchWithTimeout(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch team members: ${response.statusText}`);
      }

      const result = await response.json();
      setCache(cacheKey, result.data, 5 * 60 * 1000); // 5 min
      return result.data;
    } catch {
      return { chairman: null, management: [], historical_admins: [], deputy_administrator: null, financial_controller: null };
    }
  }

  /**
   * Fetch footer configuration
   */
  async getFooterConfig(): Promise<FooterConfig | null> {
    const cacheKey = 'footer-config';
    const cached = getCached<FooterConfig | null>(cacheKey);
    if (cached !== null) return cached;

    try {
      const url = `${this.baseUrl}/footer-config`;
      const response = await this.fetchWithTimeout(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch footer config: ${response.statusText}`);
      }

      const result = await response.json();
      setCache(cacheKey, result, 5 * 60 * 1000); // 5 min for footer
      return result;
    } catch {
      return null;
    }
  }

  /**
   * Fetch all campaigns (optionally featured only)
   */
  async getCampaigns(featured: boolean = false): Promise<Campaign[]> {
    const cacheKey = `campaigns-${featured}`;
    const cached = getCached<Campaign[]>(cacheKey);
    if (cached) return cached;

    try {
      const url = `${this.baseUrl}/campaigns${featured ? '?featured=true' : ''}`;
      const response = await this.fetchWithTimeout(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch campaigns: ${response.statusText}`);
      }

      const data = await response.json();
      const result = data.campaigns || [];
      setCache(cacheKey, result);
      return result;
    } catch {
      return [];
    }
  }

  /**
   * Fetch a single campaign by slug
   */
  async getCampaignBySlug(slug: string): Promise<Campaign | null> {
    try {
      const url = `${this.baseUrl}/campaigns/${slug}`;
      const response = await this.fetchWithTimeout(url);

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`Failed to fetch campaign: ${response.statusText}`);
      }

      const data = await response.json();
      return data.campaign || null;
    } catch {
      return null;
    }
  }

  /**
   * Fetch lottery configuration
   */
  async getLotteryConfig(): Promise<LotteryConfig | null> {
    const cacheKey = 'lottery-config';
    const cached = getCached<LotteryConfig | null>(cacheKey);
    if (cached !== null) return cached;

    try {
      const url = `${this.baseUrl}/lottery/config`;
      const response = await this.fetchWithTimeout(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch lottery config: ${response.statusText}`);
      }

      const data = await response.json();
      const result = data.config || null;
      if (result) setCache(cacheKey, result);
      return result;
    } catch {
      return null;
    }
  }

  /**
   * Fetch active partners, optionally filtered by category
   */
  async getPartners(category?: string): Promise<Partner[]> {
    const cacheKey = `partners-${category || 'all'}`;
    const cached = getCached<Partner[]>(cacheKey);
    if (cached) return cached;

    try {
      const params = category ? `?category=${encodeURIComponent(category)}` : '';
      const url = `${this.baseUrl}/partners${params}`;
      const response = await this.fetchWithTimeout(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch partners: ${response.statusText}`);
      }

      const data = await response.json();
      const result = data.data || [];
      setCache(cacheKey, result);
      return result;
    } catch {
      return [];
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

export interface Campaign {
  id: string;
  slug: string;
  title: string;
  description: string;
  image_url: string | null;
  goal_amount: number;
  raised_amount: number;
  currency: string;
  status: string;
  button_text: string;
  percentage_funded: number;
  days_left: number | null;
  donation_count: number;
}

export interface LotteryConfig {
  prizes: Array<{
    rank: number | string;
    amount: number;
    description: string;
    currency: string;
    count?: number;
  }>;
  next_draw_date: string;
  how_it_works_steps: Array<{
    step: number;
    title: string;
    description: string;
  }>;
  is_active: boolean;
  banner_color: string;
  current_entries_count: number;
}

export interface Partner {
  id: string;
  name: string;
  logo_url: string;
  website_url?: string;
  description?: string;
  category?: string;
  display_order: number;
  is_active: boolean;
}

// Export a singleton instance
export const cmsApi = new CMSApiClient();

// Export the class for testing or custom instances
export default CMSApiClient;
