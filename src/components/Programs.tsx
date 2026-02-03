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

        {/* Focus Areas - Navy Blue Circles (same style as homepage) */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12 sm:mb-16 md:mb-20 3xl:mb-24">
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
                className="w-28 md:w-32 lg:w-36 aspect-square rounded-full flex items-center justify-center shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-xl p-4"
                style={{ borderRadius: '50%', backgroundColor: '#2a3f75' }}
              >
                <span className="text-white text-[10px] md:text-xs lg:text-sm font-bold text-center leading-tight">
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
              className="relative aspect-square overflow-hidden group"
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

      {/* Key Initiatives */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 3xl:px-12 max-w-8xl">
        <div className="bg-white p-6 sm:p-8 md:p-10 lg:p-12 rounded-xl shadow-lg">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 md:mb-10 text-center">Key Initiatives (detailed)</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 sm:p-8 md:p-10 rounded-xl border-l-4 border-getfund-primary">
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="bg-getfund-primary w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Free SHS Policy</h3>
            </div>
            <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 leading-relaxed">
              Introduced in September 2017, this transformative policy removes cost barriers and expands access to secondary education for all Ghanaian students.
            </p>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-start gap-2 sm:gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-getfund-primary mt-2 flex-shrink-0"></div>
                <span className="text-sm sm:text-base text-gray-700">Remove financial barriers to education</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-getfund-primary mt-2 flex-shrink-0"></div>
                <span className="text-sm sm:text-base text-gray-700">Expand and improve infrastructure</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-getfund-primary mt-2 flex-shrink-0"></div>
                <span className="text-sm sm:text-base text-gray-700">Enhance quality and equity in education</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-getfund-primary mt-2 flex-shrink-0"></div>
                <span className="text-sm sm:text-base text-gray-700">Develop employable skills for the future</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div className="bg-getfund-secondary/5 p-4 sm:p-6 md:p-8 rounded-xl border-l-4 border-getfund-secondary">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-getfund-secondary" aria-hidden="true" />
                <h4 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">Community Day School Projects</h4>
              </div>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Establishing accessible secondary schools within communities to reduce the distance students must travel for education.
              </p>
            </div>

            <div className="bg-getfund-accent/10 p-4 sm:p-6 md:p-8 rounded-xl border-l-4 border-getfund-accent">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-getfund-accent" aria-hidden="true" />
                <h4 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">Model School Projects</h4>
              </div>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Creating state-of-the-art educational facilities that serve as benchmarks for excellence in teaching and learning.
              </p>
            </div>

            <div className="bg-green-50 p-4 sm:p-6 md:p-8 rounded-xl border-l-4 border-green-600">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" aria-hidden="true" />
                <h4 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">Basic Education Improvement</h4>
              </div>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Strengthening foundational education through infrastructure development and resource provision at the basic education level.
              </p>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
