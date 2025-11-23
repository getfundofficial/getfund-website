import { GraduationCap, Users, TrendingUp, BookOpen, Building2, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Program {
  title: string;
  description: string;
  link: string;
}

interface Stat {
  number: string;
  label: string;
  description: string;
}

interface ProgramsProps {
  title?: string;
  programs?: Program[];
  stats?: Stat[];
  showTitle?: boolean;
}

export default function Programs({ title, programs: propPrograms, stats, showTitle = true }: ProgramsProps = {}) {
  const defaultServices = [
    {
      icon: Building2,
      title: 'Educational Infrastructure Projects',
      description: 'Building and renovating educational facilities across Ghana to provide conducive learning environments for students at all levels.',
      link: '/service/infrastructure-projects'
    },
    {
      icon: Award,
      title: 'Scholarship Programme',
      description: 'Providing financial support to deserving students to pursue higher education both locally and internationally.',
      link: '/service/scholarship-programme'
    },
    {
      icon: BookOpen,
      title: 'Education Sector Support',
      description: 'Supporting initiatives that improve the quality of education delivery and learning outcomes across Ghana.',
      link: '/service/education-sector-support'
    },
  ];
  
  const services = propPrograms?.map(p => ({
    ...p,
    icon: Building2
  })) || defaultServices;

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

        {/* Services Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 3xl:gap-12 mb-12 sm:mb-16 md:mb-20 3xl:mb-24">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.title}
                to={service.link}
                className="bg-white p-6 sm:p-8 md:p-10 rounded-xl shadow-lg hover:shadow-xl transition-all border-t-4 border-getfund-primary group cursor-pointer min-h-[280px] flex flex-col"
              >
                <div className="bg-getfund-primary/10 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-lg flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-getfund-primary/20 transition-colors">
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-getfund-primary" aria-hidden="true" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-getfund-primary transition-colors">{service.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed flex-1">{service.description}</p>
              </Link>
            );
          })}
        </div>

        {/* Key Initiatives */}
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
