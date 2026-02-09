import { GraduationCap, Users, TrendingUp, BookOpen } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

interface FocusAreaImage {
  image: string;
  title: string;
  description?: string;
}

interface ProgramsProps {
  title?: string;
  showTitle?: boolean;
  focusAreaImages?: FocusAreaImage[];
}

export default function Programs({ title, showTitle = true, focusAreaImages }: ProgramsProps = {}) {
  const defaultImages: FocusAreaImage[] = [
    { image: '/images/hero/main-slider-1.jpg', title: 'Educational Infrastructure', description: 'Building schools across Ghana' },
    { image: '/images/hero/main-slider-2.jpg', title: 'Scholarship Programs', description: 'Supporting students nationwide' },
    { image: '/images/hero/main-slider-3.jpg', title: 'Teacher Training', description: 'Empowering educators' },
    { image: '/images/hero/main-slider-1.jpg', title: 'STEM Education', description: 'Advancing science and technology' },
    { image: '/images/hero/main-slider-2.jpg', title: 'Community Schools', description: 'Bringing education closer' },
    { image: '/images/hero/main-slider-3.jpg', title: 'Research & Development', description: 'Innovating for the future' }
  ];

  const images = focusAreaImages || defaultImages;

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 3xl:py-28 bg-gray-50">
      {/* Scroll anchor with offset for fixed header */}
      <div id="what-we-do" className="absolute -mt-24 sm:-mt-28 md:-mt-32 lg:-mt-36"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 3xl:px-12 max-w-8xl">
        {showTitle && (
          <div className="text-center mb-12 sm:mb-16 md:mb-20 3xl:mb-24">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 3xl:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 3xl:mb-8">{title || 'What We Do'}</h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl 3xl:text-3xl text-gray-600 max-w-4xl 3xl:max-w-5xl mx-auto leading-relaxed">
              GETFund is committed to transforming education in Ghana through strategic investments and key initiatives.
            </p>
          </div>
        )}
      </div>

      {/* Focus Areas - Navy Blue Circles (full width) */}
      <div className="w-full px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 md:mb-20 3xl:mb-24">
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-10 xl:gap-12">
          {[
            'Educational Infrastructure Support',
            'Ministry of Education & Agencies Financial Support',
            'Government Policy & Programme Support',
            'Scholar & capacity Building Programmes',
            'Others'
          ].map((item, index) => (
            <div
              key={index}
              className="group flex flex-col items-center"
            >
              {/* Circle with text inside - using aspect-square to ensure perfect circle */}
              <div
                className="w-32 md:w-36 lg:w-40 xl:w-44 aspect-square rounded-full flex items-center justify-center shadow-lg transition-all duration-300 p-4"
                style={{ borderRadius: '50%', backgroundColor: '#2a3f75' }}
              >
                <span className="text-white text-[11px] md:text-xs lg:text-sm xl:text-base font-bold text-center leading-tight">
                  {item}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Screen Image Grid - 6 Edge-to-Edge Boxes */}
      <div className="w-full bg-white my-12 sm:my-16 md:my-20">
        <div className="grid grid-cols-2 md:grid-cols-3">
          {images.map((item, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden group cursor-default"
            >
              <OptimizedImage
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                fallbackSrc="/images/hero/main-slider-1.jpg"
              />
              {/* Overlay with title on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4">
                  <h3 className="text-white text-lg md:text-xl lg:text-2xl font-bold mb-1">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-white/80 text-sm md:text-base">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View Impact Button */}
      <div className="container mx-auto px-4 text-center mb-12 sm:mb-16">
        <button
          disabled
          className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white rounded-lg shadow-lg cursor-not-allowed opacity-80"
          style={{ backgroundColor: '#2a3f75' }}
        >
          View Our Impact
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>

      {/* Key Initiatives */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 3xl:px-12 max-w-8xl">
        <div className="text-center mb-10 sm:mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4" style={{ backgroundColor: 'rgba(42, 63, 117, 0.1)', color: '#2a3f75' }}>
            Key Initiatives
          </span>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
            Our Strategic Programs
          </h3>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Transforming education through targeted initiatives and sustainable development programs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Free SHS Policy - Featured Card */}
          <div className="group relative bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            {/* Accent line at top */}
            <div className="absolute top-0 left-6 right-6 h-1 rounded-b-full transition-all duration-300 group-hover:left-4 group-hover:right-4" style={{ backgroundColor: '#2a3f75' }} />
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(42, 63, 117, 0.1)' }}>
                <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: '#2a3f75' }} aria-hidden="true" />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Free SHS Policy</h3>
            </div>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
              Introduced in September 2017, this transformative policy removes cost barriers and expands access to secondary education for all Ghanaian students.
            </p>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-start gap-2 sm:gap-3">
                <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#f59e0b' }}></div>
                <span className="text-sm sm:text-base text-gray-700">Remove financial barriers to education</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#f59e0b' }}></div>
                <span className="text-sm sm:text-base text-gray-700">Expand and improve infrastructure</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#f59e0b' }}></div>
                <span className="text-sm sm:text-base text-gray-700">Enhance quality and equity in education</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#f59e0b' }}></div>
                <span className="text-sm sm:text-base text-gray-700">Develop employable skills for the future</span>
              </li>
            </ul>
          </div>

          {/* Right Column - Smaller Cards */}
          <div className="space-y-4 sm:space-y-6">
            <div className="group relative bg-white p-5 sm:p-6 md:p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-0 left-5 right-5 h-1 rounded-b-full transition-all duration-300 group-hover:left-3 group-hover:right-3" style={{ backgroundColor: '#f59e0b' }} />
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)' }}>
                  <Users className="w-5 h-5" style={{ color: '#f59e0b' }} aria-hidden="true" />
                </div>
                <h4 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">Community Day School Projects</h4>
              </div>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Establishing accessible secondary schools within communities to reduce the distance students must travel for education.
              </p>
            </div>

            <div className="group relative bg-white p-5 sm:p-6 md:p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-0 left-5 right-5 h-1 rounded-b-full transition-all duration-300 group-hover:left-3 group-hover:right-3" style={{ backgroundColor: '#2a3f75' }} />
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(42, 63, 117, 0.1)' }}>
                  <TrendingUp className="w-5 h-5" style={{ color: '#2a3f75' }} aria-hidden="true" />
                </div>
                <h4 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">Model School Projects</h4>
              </div>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Creating state-of-the-art educational facilities that serve as benchmarks for excellence in teaching and learning.
              </p>
            </div>

            <div className="group relative bg-white p-5 sm:p-6 md:p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-0 left-5 right-5 h-1 rounded-b-full transition-all duration-300 group-hover:left-3 group-hover:right-3" style={{ backgroundColor: '#1e3a5f' }} />
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(30, 58, 95, 0.1)' }}>
                  <BookOpen className="w-5 h-5" style={{ color: '#1e3a5f' }} aria-hidden="true" />
                </div>
                <h4 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">Basic Education Improvement</h4>
              </div>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Strengthening foundational education through infrastructure development and resource provision at the basic education level.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
