import React from 'react';
import { GraduationCap, CheckCircle } from 'lucide-react';

interface ScholarshipProgrammePageProps {
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
    overviewTitle?: string;
    overviewText?: string;

    // Scholarship Types
    scholarshipTypesTitle?: string;
    scholarshipTypes?: Array<{
      title: string;
      description: string;
      eligibility?: string;
      benefits?: string[];
    }>;

    // Application Process
    applicationProcessTitle?: string;
    applicationSteps?: Array<{
      step: string;
      title: string;
      description: string;
    }>;

    // Eligibility Criteria
    eligibilityTitle?: string;
    eligibilityItems?: string[];

    // Success Stories
    successStoriesTitle?: string;
    successStories?: Array<{
      name: string;
      course: string;
      university: string;
      quote: string;
      imageUrl?: string;
    }>;

    // CTA
    ctaTitle?: string;
    ctaText?: string;
    ctaButtonText?: string;
    ctaButtonLink?: string;
  };
}

/**
 * Scholarship Programme Page Template
 *
 * Template for scholarship programs, eligibility, application process, and success stories.
 */
export const ScholarshipProgrammePage: React.FC<ScholarshipProgrammePageProps> = ({ pageData, content }) => {
  return (
    <div className="scholarship-programme-page">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-getfund-primary via-red-800 to-red-900 text-white pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <GraduationCap className="w-20 h-20 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {content.heroTitle || pageData.title}
            </h1>
            <p className="text-xl md:text-2xl text-red-100 leading-relaxed">
              {content.heroSubtitle || 'Empowering Ghanaian students to achieve academic excellence'}
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      {content.overviewText && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              {content.overviewTitle && (
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {content.overviewTitle}
                </h2>
              )}
              <p className="text-lg text-gray-700 leading-relaxed">
                {content.overviewText}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Scholarship Types Section */}
      {content.scholarshipTypes && content.scholarshipTypes.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              {content.scholarshipTypesTitle || 'Scholarship Types'}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {content.scholarshipTypes.map((scholarship, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow"
                >
                  <h3 className="text-2xl font-bold text-getfund-primary mb-4">
                    {scholarship.title}
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {scholarship.description}
                  </p>
                  {scholarship.eligibility && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Eligibility:</h4>
                      <p className="text-gray-600 text-sm">{scholarship.eligibility}</p>
                    </div>
                  )}
                  {scholarship.benefits && scholarship.benefits.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Benefits:</h4>
                      <ul className="space-y-1">
                        {scholarship.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600 text-sm">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Application Process Section */}
      {content.applicationSteps && content.applicationSteps.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              {content.applicationProcessTitle || 'Application Process'}
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                {content.applicationSteps.map((step, index) => (
                  <div
                    key={index}
                    className="flex items-start bg-gray-50 rounded-lg p-6"
                  >
                    <div className="bg-getfund-primary text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0 mr-4">
                      {step.step || index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Eligibility Criteria Section */}
      {content.eligibilityItems && content.eligibilityItems.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                {content.eligibilityTitle || 'Eligibility Criteria'}
              </h2>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <ul className="space-y-4">
                  {content.eligibilityItems.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-getfund-primary mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Success Stories Section */}
      {content.successStories && content.successStories.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              {content.successStoriesTitle || 'Success Stories'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.successStories.map((story, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                >
                  {story.imageUrl && (
                    <img
                      src={story.imageUrl}
                      alt={story.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    />
                  )}
                  <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                    {story.name}
                  </h3>
                  <p className="text-sm text-getfund-primary text-center font-semibold mb-2">
                    {story.course}
                  </p>
                  <p className="text-sm text-gray-600 text-center mb-4">
                    {story.university}
                  </p>
                  <p className="text-gray-700 italic leading-relaxed">
                    "{story.quote}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {content.ctaTitle && (
        <section className="py-16 bg-gradient-to-r from-getfund-primary to-red-800 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {content.ctaTitle}
              </h2>
              {content.ctaText && (
                <p className="text-xl mb-8 text-red-100">
                  {content.ctaText}
                </p>
              )}
              {content.ctaButtonText && content.ctaButtonLink && (
                <a
                  href={content.ctaButtonLink}
                  className="inline-block bg-white text-getfund-primary px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition-colors"
                >
                  {content.ctaButtonText}
                </a>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
