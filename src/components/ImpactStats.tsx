import { useEffect, useState } from 'react';

interface ImpactStat {
  id: number;
  title: string;
  value: string;
  color: string;
  page: string;
  order_number: number;
}

interface ImpactStatsProps {
  className?: string;
  page?: string; // 'why-fundraising', 'ways-to-donate', etc.
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://getfund-cms-backend.vercel.app/api';

export default function ImpactStats({ className = '', page }: ImpactStatsProps) {
  const [stats, setStats] = useState<ImpactStat[]>([]);
  const [title, setTitle] = useState('Our Impact');
  const [subtitle, setSubtitle] = useState('25+ years of giving');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const url = page
          ? `${API_BASE_URL}/impact-stats?page=${page}`
          : `${API_BASE_URL}/impact-stats`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.success) {
          setStats(data.data.stats || []);
          setTitle(data.data.title || 'Our Impact');
          setSubtitle(data.data.subtitle || '25+ years of giving');
        }
      } catch {
        // Keep default values on error
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [page]);

  const getColorClass = (color: string) => {
    const colorMap: { [key: string]: string } = {
      'primary': 'text-getfund-primary',
      'green': 'text-getfund-primary',
      'gold': 'text-getfund-gold',
      'orange': 'text-getfund-gold',
      'teal': 'text-teal-600',
    };
    
    // If it's a hex color, use inline style
    if (color.startsWith('#')) {
      return color;
    }
    
    return colorMap[color] || 'text-getfund-primary';
  };

  if (loading) {
    return (
      <section className={`py-16 bg-gray-50 ${className}`}>
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-48 mx-auto mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-32 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (stats.length === 0) {
    return null;
  }

  return (
    <section className={`py-16 bg-gray-50 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            {title}
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 mt-2">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {stats.map((stat) => {
            const colorClass = getColorClass(stat.color);
            const isHexColor = stat.color.startsWith('#');
            
            return (
              <div key={stat.id} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div 
                  className={`text-4xl md:text-5xl font-bold mb-2 ${!isHexColor ? colorClass : ''}`}
                  style={isHexColor ? { color: colorClass } : undefined}
                >
                  {stat.value}
                </div>
                <div className="text-gray-700 font-medium">{stat.title}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
