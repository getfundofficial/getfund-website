import React from 'react';
import { BookOpen, Building2, Users, Award } from 'lucide-react';

interface WhatWeDoPageProps {
  pageData: {
    title: string;
    meta_title?: string;
    meta_description?: string;
    template_variables?: Record<string, any>;
  };
  content: {
    heroTitle?: string;
    heroSubtitle?: string;

    // Overview Section
    overviewHeading?: string;
    overviewText?: string;

    // Programs Section
    programsTitle?: string;
    programs?: Array<{
      title: string;
      description: string;
      icon: 'book' | 'building' | 'users' | 'award';
      link?: string;
    }>;

    // Key Areas Section
    keyAreasTitle?: string;
    keyAreas?: Array<{
      title: string;
      description: string;
      imageUrl?: string;
      stats?: string;
    }>;

    // Impact Stats
    impactStats?: Array<{
      number: string;
      label: string;
      description?: string;
    }>;
  };
}

/**
 * What We Do Page Template
 *
 * Template for showcasing GETFund's programs, initiatives, and key areas of focus.
 */
export const WhatWeDoPage: React.FC<WhatWeDoPageProps> = ({ pageData, content }) => {
  const getIcon = (iconName: string) => {
    const icons = {
      book: BookOpen,
      building: Building2,
      users: Users,
      award: Award,
    };
    const Icon = icons[iconName as keyof typeof icons] || BookOpen;
    return <Icon className="w-12 h-12" />;
  };

  return (
    <div className="what-we-do-page">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-getfund-primary via-red-800 to-red-900 text-white pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {content.heroTitle || pageData.title}
            </h1>
            <p className="text-xl md:text-2xl text-red-100 leading-relaxed">
              {content.heroSubtitle || 'Transforming education across Ghana through strategic funding and support'}
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      {content.overviewText && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {content.overviewHeading && (
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
                  {content.overviewHeading}
                </h2>
              )}
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                {content.overviewText}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Programs Section */}
      {content.programs && content.programs.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              {content.programsTitle || 'Our Programs'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {content.programs.map((program, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow"
                >
                  <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <div className="text-getfund-primary">
                      {getIcon(program.icon)}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {program.description}
                  </p>
                  {program.link && (
                    <a
                      href={program.link}
                      className="inline-block text-getfund-primary font-semibold hover:text-red-700 transition-colors"
                    >
                      Learn More →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Key Areas Section */}
      {content.keyAreas && content.keyAreas.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              {content.keyAreasTitle || 'Key Areas of Focus'}
            </h2>
            <div className="space-y-12">
              {content.keyAreas.map((area, index) => (
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

      {/* Impact Stats Section */}
      {content.impactStats && content.impactStats.length > 0 && (
        <section className="py-16 bg-gradient-to-r from-getfund-primary to-red-800 text-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {content.impactStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-5xl md:text-6xl font-bold mb-2">
                    {stat.number}
                  </div>
                  <div className="text-xl md:text-2xl font-semibold mb-2">
                    {stat.label}
                  </div>
                  {stat.description && (
                    <p className="text-red-100">{stat.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
