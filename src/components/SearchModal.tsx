import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X, FileText, Newspaper, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cmsApi, NewsArticle } from '../services/cmsApi';

interface SearchResult {
  id: string;
  type: 'page' | 'news';
  title: string;
  description: string;
  url: string;
  category?: string;
}

// Static pages that can be searched
const STATIC_PAGES: SearchResult[] = [
  { id: 'home', type: 'page', title: 'Home', description: 'Ghana Education Trust Fund - Transforming Education', url: '/' },
  { id: 'who-we-are', type: 'page', title: 'Who We Are', description: 'Learn about GETFund\'s history, mission, vision and leadership', url: '/who-we-are' },
  { id: 'what-we-do', type: 'page', title: 'What We Do', description: 'Discover our programmes and initiatives in education', url: '/what-we-do' },
  { id: 'impact', type: 'page', title: 'Our Impact', description: 'See the measurable impact of our work across Ghana', url: '/impact' },
  { id: 'news', type: 'page', title: 'News & Updates', description: 'Latest news and announcements from GETFund', url: '/news' },
  { id: 'resources', type: 'page', title: 'Resources & Publications', description: 'Access reports, policies, and research documents', url: '/resources' },
  { id: 'faq', type: 'page', title: 'FAQ', description: 'Frequently asked questions about GETFund', url: '/faq' },
  { id: 'scholarship-apply', type: 'page', title: 'Apply for Scholarship', description: 'Apply for GETFund scholarship programmes', url: '/scholarship-apply', category: 'Scholarships' },
  { id: 'scholarship-programme', type: 'page', title: 'Scholarship Programme', description: 'Learn about our scholarship opportunities', url: '/service/scholarship-programme', category: 'Services' },
  { id: 'infrastructure-projects', type: 'page', title: 'Infrastructure Projects', description: 'Educational infrastructure development across Ghana', url: '/service/infrastructure-projects', category: 'Services' },
  { id: 'education-sector-support', type: 'page', title: 'Education Sector Support', description: 'Supporting educational institutions nationwide', url: '/service/education-sector-support', category: 'Services' },
  { id: 'fundraising-campaigns', type: 'page', title: 'Fundraising Campaigns', description: 'Support our current fundraising initiatives', url: '/fundraising-campaigns', category: 'Fundraising' },
  { id: 'why-fundraising', type: 'page', title: 'Why Fundraising?', description: 'Understand the importance of supporting education', url: '/fundraising/why-fundraising', category: 'Fundraising' },
  { id: 'ways-to-donate', type: 'page', title: 'Ways to Donate', description: 'Different ways you can support GETFund', url: '/fundraising/ways-to-donate', category: 'Fundraising' },
  { id: 'lottery', type: 'page', title: 'Scholarship Lottery', description: 'Participate in our scholarship lottery', url: '/fundraising/lottery', category: 'Fundraising' },
  { id: 'partnerships', type: 'page', title: 'Partnerships', description: 'Partner with GETFund to support education', url: '/fundraising/partnerships', category: 'Fundraising' },
  { id: 'beneficiaries-give-back', type: 'page', title: 'Beneficiaries Give Back', description: 'Stories of beneficiaries contributing back', url: '/fundraising/beneficiaries-give-back', category: 'Fundraising' },
  { id: 'events', type: 'page', title: 'Events', description: 'Upcoming and past GETFund events', url: '/fundraising/events', category: 'Events' },
  { id: 'community-shs', type: 'page', title: 'Community SHS Programme', description: 'Community day senior high schools initiative', url: '/portfolio/community-shs-programme', category: 'Portfolio' },
  { id: 'seip', type: 'page', title: 'Secondary Education Improvement Programme', description: 'Improving secondary education quality', url: '/portfolio/secondary-education-improvement-programme', category: 'Portfolio' },
];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Fetch news articles on mount
  useEffect(() => {
    const fetchNews = async () => {
      const articles = await cmsApi.getNewsArticles();
      setNewsArticles(articles);
    };
    fetchNews();
  }, []);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    if (!isOpen) {
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Search function
  const performSearch = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    const lowerQuery = searchQuery.toLowerCase();

    // Search static pages
    const pageResults = STATIC_PAGES.filter(
      page =>
        page.title.toLowerCase().includes(lowerQuery) ||
        page.description.toLowerCase().includes(lowerQuery) ||
        (page.category && page.category.toLowerCase().includes(lowerQuery))
    );

    // Search news articles
    const newsResults: SearchResult[] = newsArticles
      .filter(
        article =>
          article.title.toLowerCase().includes(lowerQuery) ||
          article.excerpt.toLowerCase().includes(lowerQuery) ||
          (article.category && article.category.toLowerCase().includes(lowerQuery))
      )
      .map(article => ({
        id: article.id,
        type: 'news' as const,
        title: article.title,
        description: article.excerpt.slice(0, 120) + (article.excerpt.length > 120 ? '...' : ''),
        url: `/news/${article.slug}`,
        category: article.category,
      }));

    // Combine and limit results
    const allResults = [...pageResults.slice(0, 5), ...newsResults.slice(0, 5)];
    setResults(allResults);
    setSelectedIndex(0);
    setIsLoading(false);
  }, [newsArticles]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(query);
    }, 200);
    return () => clearTimeout(timer);
  }, [query, performSearch]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault();
      navigate(results[selectedIndex].url);
      onClose();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-200">
          <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search pages, news, resources..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 text-lg outline-none placeholder-gray-400"
          />
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close search"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {isLoading ? (
            <div className="p-8 text-center text-gray-500">Searching...</div>
          ) : query && results.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500 mb-2">No results found for "{query}"</p>
              <p className="text-sm text-gray-400">Try different keywords or browse our pages</p>
            </div>
          ) : results.length > 0 ? (
            <div className="py-2">
              {results.map((result, index) => (
                <Link
                  key={result.id}
                  to={result.url}
                  onClick={onClose}
                  className={`flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${
                    index === selectedIndex ? 'bg-blue-50' : ''
                  }`}
                >
                  <div
                    className="p-2 rounded-lg flex-shrink-0"
                    style={{ backgroundColor: result.type === 'news' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(42, 63, 117, 0.1)' }}
                  >
                    {result.type === 'news' ? (
                      <Newspaper className="w-4 h-4" style={{ color: '#f59e0b' }} />
                    ) : (
                      <FileText className="w-4 h-4" style={{ color: '#2a3f75' }} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-gray-900 truncate">{result.title}</h4>
                      {result.category && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 flex-shrink-0">
                          {result.category}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-1">{result.description}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-6">
              <p className="text-sm text-gray-500 mb-4">Quick Links</p>
              <div className="grid grid-cols-2 gap-2">
                {STATIC_PAGES.slice(0, 6).map(page => (
                  <Link
                    key={page.id}
                    to={page.url}
                    onClick={onClose}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-700"
                  >
                    <FileText className="w-4 h-4 text-gray-400" />
                    {page.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded text-xs">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded text-xs">↓</kbd>
              to navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded text-xs">Enter</kbd>
              to select
            </span>
          </div>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded text-xs">Esc</kbd>
            to close
          </span>
        </div>
      </div>
    </div>
  );
}
