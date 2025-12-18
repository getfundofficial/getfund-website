import React from 'react';
import { Building2, MapPin, Calendar, TrendingUp } from 'lucide-react';

interface InfrastructureProjectsPageProps {
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

    // Statistics
    stats?: Array<{
      number: string;
      label: string;
      description?: string;
    }>;

    // Project Categories
    categoriesTitle?: string;
    categories?: Array<{
      title: string;
      description: string;
      icon: 'building' | 'map' | 'calendar' | 'trending';
      count?: string;
    }>;

    // Featured Projects
    featuredProjectsTitle?: string;
    featuredProjects?: Array<{
      title: string;
      location: string;
      status: 'completed' | 'ongoing' | 'planned';
      description: string;
      imageUrl?: string;
      completionYear?: string;
      budget?: string;
    }>;

    // Impact Section
    impactTitle?: string;
    impactText?: string;
    impactPoints?: string[];
  };
}

/**
 * Infrastructure Projects Page Template
 *
 * Template for showcasing infrastructure development projects across Ghana.
 */
export const InfrastructureProjectsPage: React.FC<InfrastructureProjectsPageProps> = ({ pageData, content }) => {
  const getIcon = (iconName: string) => {
    const icons = {
      building: Building2,
      map: MapPin,
      calendar: Calendar,
      trending: TrendingUp,
    };
    const Icon = icons[iconName as keyof typeof icons] || Building2;
    return <Icon className="w-10 h-10" />;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      completed: 'bg-green-100 text-green-800',
      ongoing: 'bg-blue-100 text-blue-800',
      planned: 'bg-yellow-100 text-yellow-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="infrastructure-projects-page">
      {/* Hero Section */}
      <section className="relative bg-getfund-primary text-white pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Building2 className="w-20 h-20 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {content.heroTitle || pageData.title}
            </h1>
            <p className="text-xl md:text-2xl text-red-100 leading-relaxed">
              {content.heroSubtitle || 'Building world-class educational infrastructure across Ghana'}
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

      {/* Statistics Section */}
      {content.stats && content.stats.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {content.stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8 text-center">
                  <div className="text-5xl md:text-6xl font-bold text-getfund-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-xl font-semibold text-gray-900 mb-2">
                    {stat.label}
                  </div>
                  {stat.description && (
                    <p className="text-gray-600">{stat.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Project Categories Section */}
      {content.categories && content.categories.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              {content.categoriesTitle || 'Project Categories'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {content.categories.map((category, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="bg-getfund-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    {getIcon(category.icon)}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {category.title}
                  </h3>
                  {category.count && (
                    <div className="text-3xl font-bold text-getfund-primary mb-2">
                      {category.count}
                    </div>
                  )}
                  <p className="text-gray-600 text-sm">
                    {category.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Projects Section */}
      {content.featuredProjects && content.featuredProjects.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              {content.featuredProjectsTitle || 'Featured Projects'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.featuredProjects.map((project, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {project.imageUrl && (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          project.status
                        )}`}
                      >
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </span>
                      {project.completionYear && (
                        <span className="text-sm text-gray-500">
                          {project.completionYear}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {project.title}
                    </h3>
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{project.location}</span>
                    </div>
                    <p className="text-gray-700 mb-3 leading-relaxed">
                      {project.description}
                    </p>
                    {project.budget && (
                      <div className="pt-3 border-t border-gray-200">
                        <p className="text-sm font-semibold text-gray-900">
                          Budget: <span className="text-getfund-primary">{project.budget}</span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Impact Section */}
      {content.impactTitle && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
                {content.impactTitle}
              </h2>
              {content.impactText && (
                <p className="text-lg text-gray-700 mb-8 text-center leading-relaxed">
                  {content.impactText}
                </p>
              )}
              {content.impactPoints && content.impactPoints.length > 0 && (
                <div className="grid md:grid-cols-2 gap-4">
                  {content.impactPoints.map((point, index) => (
                    <div
                      key={index}
                      className="flex items-start bg-gray-50 rounded-lg p-4"
                    >
                      <div className="bg-getfund-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mr-3 mt-1">
                        <span className="text-sm font-bold">✓</span>
                      </div>
                      <p className="text-gray-700">{point}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
