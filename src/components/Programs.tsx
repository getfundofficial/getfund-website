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
  hideFocusCircles?: boolean;
  focusAreaImages?: FocusAreaImage[];
}

export default function Programs({ title, showTitle = true, hideFocusCircles = false, focusAreaImages }: ProgramsProps = {}) {
  const defaultImages: FocusAreaImage[] = [
    { image: '/images/hero/main-slider-1.jpg', title: 'Educational Infrastructure', description: 'Building schools across Ghana' },
    { image: '/images/hero/main-slider-2.jpg', title: 'Scholarship Programs', description: 'Supporting students nationwide' },
    { image: '/images/hero/main-slider-3.jpg', title: 'Teacher Training', description: 'Empowering educators' },
    { image: '/images/hero/main-slider-1.jpg', title: 'STEM Education', description: 'Advancing science and technology' },
    { image: '/images/hero/main-slider-2.jpg', title: 'Community Schools', description: 'Bringing education closer' },
    { image: '/images/hero/main-slider-3.jpg', title: 'Research & Development', description: 'Innovating for the future' }
  ];

  const images = focusAreaImages || defaultImages;

  const focusCircles = [
    'Educational Infrastructure Support',
    'Ministry of Education & Agencies Financial Support',
    'Government Policy & Programme Support',
    'Scholar & capacity Building Programmes',
    'Others'
  ];

  return (
    <section className="pt-6 md:pt-10 pb-20 md:pb-32 bg-white">
      {/* Scroll anchor with offset for fixed header */}
      <div id="what-we-do" className="absolute -mt-24 sm:-mt-28 md:-mt-32 lg:-mt-36"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {showTitle ? (
          /* Asymmetric Section Header with title + circles */
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 mb-14 md:mb-20 max-w-6xl">
            <div className="md:col-span-5">
              <span className="text-eyebrow">Since 2000</span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-getfund-secondary mt-4 leading-[1.05]" style={{ letterSpacing: '-0.03em' }}>
                {title || 'Transforming education across Ghana.'}
              </h2>
            </div>
            <div className="md:col-span-7 md:col-start-6 flex items-center">
              <div className="flex flex-nowrap justify-start md:justify-end gap-2 sm:gap-3 md:gap-4 w-full">
                {focusCircles.map((item, index) => (
                  <div
                    key={index}
                    className="flex-1 min-w-0 aspect-square max-w-[120px] md:max-w-[140px] bg-green-500 flex items-center justify-center shadow-md p-2 sm:p-3"
                    style={{ borderRadius: '50%' }}
                  >
                    <span className="text-white text-[7px] sm:text-[10px] md:text-xs font-semibold text-center leading-tight">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : !hideFocusCircles ? (
          /* Original-style focus circles — larger, full labels, wrap when needed */
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-10 xl:gap-12 mb-12 sm:mb-16">
            {focusCircles.map((item, index) => (
              <div
                key={index}
                className="w-32 md:w-36 lg:w-40 xl:w-44 aspect-square bg-green-500 flex items-center justify-center shadow-lg p-4"
                style={{ borderRadius: '50%' }}
              >
                <span className="text-white text-[11px] md:text-xs lg:text-sm xl:text-base font-bold text-center leading-tight">
                  {item}
                </span>
              </div>
            ))}
          </div>
        ) : null}

        {/* Category Grid — 4 per row on desktop, tight clean lines */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
          {images.map((item, index) => (
            <div
              key={index}
              className="group block"
            >
              <div className="relative overflow-hidden bg-gray-100 aspect-[4/3]">
                <OptimizedImage
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  fallbackSrc="/images/hero/main-slider-1.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                  <h3 className="font-display text-sm sm:text-lg md:text-xl font-semibold text-white leading-tight" style={{ letterSpacing: '-0.015em' }}>
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-xs sm:text-sm text-white/80 mt-1 sm:mt-2 line-clamp-2 hidden sm:block leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View Impact Button - disabled until page ready */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center mt-16 md:mt-24 mb-20 md:mb-28">
        <button
          disabled
          className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold text-white rounded-full shadow-sm cursor-not-allowed opacity-70 bg-getfund-dark hover:bg-getfund-secondary transition-colors"
        >
          View Our Impact
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>

      {/* Key Initiatives */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 3xl:px-12 max-w-8xl">
        <div className="text-center mb-10 sm:mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4" style={{ backgroundColor: 'rgba(6, 78, 59, 0.1)', color: '#064e3b' }}>
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
            <div className="absolute top-0 left-6 right-6 h-1 rounded-b-full transition-all duration-300 group-hover:left-4 group-hover:right-4" style={{ backgroundColor: '#064e3b' }} />
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(6, 78, 59, 0.1)' }}>
                <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: '#064e3b' }} aria-hidden="true" />
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
              <div className="absolute top-0 left-5 right-5 h-1 rounded-b-full transition-all duration-300 group-hover:left-3 group-hover:right-3" style={{ backgroundColor: '#064e3b' }} />
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(6, 78, 59, 0.1)' }}>
                  <TrendingUp className="w-5 h-5" style={{ color: '#064e3b' }} aria-hidden="true" />
                </div>
                <h4 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">Model School Projects</h4>
              </div>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Creating state-of-the-art educational facilities that serve as benchmarks for excellence in teaching and learning.
              </p>
            </div>

            <div className="group relative bg-white p-5 sm:p-6 md:p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-0 left-5 right-5 h-1 rounded-b-full transition-all duration-300 group-hover:left-3 group-hover:right-3" style={{ backgroundColor: '#052e16' }} />
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(6, 78, 59, 0.1)' }}>
                  <BookOpen className="w-5 h-5" style={{ color: '#052e16' }} aria-hidden="true" />
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
