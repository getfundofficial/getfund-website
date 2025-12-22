import React from 'react';
import { BarChart3, Users, TrendingUp } from 'lucide-react';

interface ImpactPageProps {
  pageData: {
    title: string;
    meta_title?: string;
    meta_description?: string;
    template_variables?: Record<string, any>;
  };
  content: {
    heroTitle?: string;
    heroSubtitle?: string;

    // Overview
    overviewText?: string;

    // Impact Statistics
    impactStats?: Array<{
      number: string;
      label: string;
      description?: string;
      trend?: string;
    }>;

    // Key Impact Areas
    impactAreasTitle?: string;
    impactAreas?: Array<{
      title: string;
      description: string;
      stats?: string;
      imageUrl?: string;
    }>;

    // Success Metrics
    metricsTitle?: string;
    metrics?: Array<{
      category: string;
      value: string;
      change?: string;
      description?: string;
    }>;

    // Beneficiary Stories
    storiesTitle?: string;
    stories?: Array<{
      title: string;
      location: string;
      beneficiaries: string;
      description: string;
      imageUrl?: string;
      quote?: string;
    }>;

    // Regional Impact
    regionalTitle?: string;
    regionalImpact?: Array<{
      region: string;
      projects: string;
      beneficiaries: string;
      investment: string;
    }>;
  };
}

/**
 * Impact Page Template
 *
 * Template for showcasing GETFund's impact through statistics, stories, and regional data.
 */
export const ImpactPage: React.FC<ImpactPageProps> = ({ pageData, content }) => {
  return (
    <div className="impact-page">
      {/* Hero Section */}
      <section className="relative bg-getfund-primary text-white pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <TrendingUp className="w-20 h-20 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {content.heroTitle || pageData.title}
            </h1>
            <p className="text-xl md:text-2xl text-red-100 leading-relaxed">
              {content.heroSubtitle || 'Transforming lives through education across Ghana'}
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      {content.overviewText && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-lg text-gray-700 leading-relaxed">
                {content.overviewText}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Impact Statistics Section */}
      {content.impactStats && content.impactStats.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {content.impactStats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8 text-center">
                  <div className="text-5xl md:text-6xl font-bold text-getfund-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-xl font-semibold text-gray-900 mb-2">
                    {stat.label}
                  </div>
                  {stat.trend && (
                    <div className="text-green-600 font-semibold mb-2 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      {stat.trend}
                    </div>
                  )}
                  {stat.description && (
                    <p className="text-gray-600 text-sm">{stat.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Key Impact Areas Section */}
      {content.impactAreas && content.impactAreas.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              {content.impactAreasTitle || 'Key Impact Areas'}
            </h2>
            <div className="space-y-12">
              {content.impactAreas.map((area, index) => (
                <div
                  key={index}
                  className={`grid md:grid-cols-2 gap-8 items-center ${
                    index % 2 === 1 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {area.imageUrl && (
                    <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                      <img
                        src={area.imageUrl}
                        alt={area.title}
                        className="rounded-xl shadow-lg w-full h-80 object-cover"
                      />
                    </div>
                  )}
                  <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                      {area.title}
                    </h3>
                    {area.stats && (
                      <div className="inline-block bg-getfund-primary text-white px-4 py-2 rounded-lg font-bold mb-4">
                        {area.stats}
                      </div>
                    )}
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {area.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Success Metrics Section */}
      {content.metrics && content.metrics.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              {content.metricsTitle || 'Success Metrics'}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {content.metrics.map((metric, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md p-6 flex items-center"
                >
                  <div className="bg-getfund-primary text-white w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                    <BarChart3 className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {metric.category}
                    </h3>
                    <div className="flex items-baseline">
                      <p className="text-3xl font-bold text-getfund-primary mr-2">
                        {metric.value}
                      </p>
                      {metric.change && (
                        <span className="text-green-600 text-sm font-semibold">
                          {metric.change}
                        </span>
                      )}
                    </div>
                    {metric.description && (
                      <p className="text-gray-600 text-sm mt-1">{metric.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Beneficiary Stories Section */}
      {content.stories && content.stories.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              {content.storiesTitle || 'Impact Stories'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.stories.map((story, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  {story.imageUrl && (
                    <img
                      src={story.imageUrl}
                      alt={story.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {story.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <span className="mr-4">{story.location}</span>
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {story.beneficiaries}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {story.description}
                    </p>
                    {story.quote && (
                      <blockquote className="border-l-4 border-getfund-primary pl-4 italic text-gray-600">
                        "{story.quote}"
                      </blockquote>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regional Impact Section */}
      {content.regionalImpact && content.regionalImpact.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              {content.regionalTitle || 'Regional Impact'}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
                <thead className="bg-getfund-primary text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Region</th>
                    <th className="px-6 py-4 text-left font-semibold">Projects</th>
                    <th className="px-6 py-4 text-left font-semibold">Beneficiaries</th>
                    <th className="px-6 py-4 text-left font-semibold">Investment</th>
                  </tr>
                </thead>
                <tbody>
                  {content.regionalImpact.map((region, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                    >
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        {region.region}
                      </td>
                      <td className="px-6 py-4 text-gray-700">{region.projects}</td>
                      <td className="px-6 py-4 text-gray-700">{region.beneficiaries}</td>
                      <td className="px-6 py-4 font-semibold text-getfund-primary">
                        {region.investment}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
