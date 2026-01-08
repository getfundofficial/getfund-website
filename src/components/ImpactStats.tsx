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
  page?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://getfund-cms-backend.vercel.app/api';

export default function ImpactStats({ className = '', page = 'all' }: ImpactStatsProps) {
  const [stats, setStats] = useState<ImpactStat[]>([]);
  const [title, setTitle] = useState('Our Impact');
  const [subtitle, setSubtitle] = useState('25+ years of giving');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchStats = async () => {
      try {
        const url = `${API_BASE_URL}/impact-stats?page=${page}&t=${Date.now()}`;

        const response = await fetch(url, {
          method: 'GET',
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch');
        }

        const data = await response.json();

        if (isMounted && data.success && data.data) {
          setStats(data.data.stats || []);
          if (data.data.title) {
            setTitle(data.data.title);
          }
          if (data.data.subtitle) {
            setSubtitle(data.data.subtitle);
          }
        }
      } catch (error) {
        console.error('Failed to fetch impact stats:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchStats();

    return () => {
      isMounted = false;
    };
  }, [page]);

  const getAccentColor = (color: string) => {
    const colorMap: Record<string, string> = {
      'primary': '#22c55e',
      'green': '#22c55e',
      'gold': '#f59e0b',
      'orange': '#f97316',
      'teal': '#14b8a6',
    };

    if (color.startsWith('#')) {
      return color;
    }

    return colorMap[color] || '#22c55e';
  };

  if (loading) {
    return (
      <section className={`py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 ${className}`}>
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-white/10 rounded w-48 mx-auto mb-4"></div>
              <div className="h-6 bg-white/5 rounded w-32 mx-auto"></div>
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
    <section className={`py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden ${className}`}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-getfund-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-getfund-gold/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-white/60">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
          {stats.map((stat, index) => {
            const accentColor = getAccentColor(stat.color);

            return (
              <div
                key={stat.id}
                className="group relative"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Glass card */}
                <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 md:p-6 text-center transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-105 hover:shadow-2xl">
                  {/* Accent line */}
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full"
                    style={{ backgroundColor: accentColor }}
                  ></div>

                  {/* Value */}
                  <div
                    className="text-3xl md:text-4xl font-bold mb-2 transition-transform duration-300 group-hover:scale-110"
                    style={{ color: accentColor }}
                  >
                    {stat.value}
                  </div>

                  {/* Title */}
                  <div className="text-white/80 text-sm md:text-base font-medium leading-tight">
                    {stat.title}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
