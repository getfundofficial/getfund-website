/**
 * Stats Section Renderer
 * Displays statistics in a grid layout
 */

import { PageSection } from '../../../services/cmsApi';
import { School, Users, Building2, Map } from 'lucide-react';

interface StatsSectionProps {
  section: PageSection;
}

const iconMap: Record<string, any> = {
  school: School,
  users: Users,
  building: Building2,
  map: Map,
};

export default function StatsSection({ section }: StatsSectionProps) {
  const { stats } = section.content;

  if (!stats || !Array.isArray(stats)) {
    return null;
  }

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {section.title && (
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            {section.title}
          </h2>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat: any, index: number) => {
            const Icon = iconMap[stat.icon] || Building2;

            return (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-getfund-red/10 rounded-full mb-4">
                  <Icon className="w-8 h-8 text-getfund-red" />
                </div>
                <div className="text-4xl font-bold text-getfund-red mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
