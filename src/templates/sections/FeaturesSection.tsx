import React from 'react';

interface Feature {
  title: string;
  description: string;
  icon?: string;
  imageUrl?: string;
}

interface FeaturesSectionProps {
  features: Feature[];
  columns?: number;
  variables?: Record<string, any>;
  pageVariables?: Record<string, any>;
}

/**
 * Features Section Component
 *
 * Display features or services in card format
 * Used in: All layouts
 */
export const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  features = [],
  columns = 3,
}) => {
  const gridClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }[columns] || 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

  return (
    <section className="features-section py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className={`grid ${gridClasses} gap-8`}>
          {features.map((feature, index) => (
            <div key={index} className="feature-card bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              {feature.imageUrl && (
                <img
                  src={feature.imageUrl}
                  alt={feature.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              {feature.icon && (
                <div className="text-4xl mb-4">{feature.icon}</div>
              )}
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
