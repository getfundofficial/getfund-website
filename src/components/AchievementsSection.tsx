
interface CircleItem {
  title: string;
  value?: string;
}

interface CategoryCard {
  title: string;
  description: string;
  image: string;
  link?: string;
}

interface AchievementsSectionProps {
  sectionTitle?: string;
  sectionSubtitle?: string;
  circles?: CircleItem[];
  categories?: CategoryCard[];
}

const defaultCircles: CircleItem[] = [
  { title: 'Educational Infrastructure Support', value: '' },
  { title: 'Ministry of Education & Agencies', value: '' },
  { title: 'Government Policy & Programme Support', value: '' },
  { title: 'Scholarship & Capacity Building', value: '' },
  { title: 'Others', value: '' }
];

const defaultCategories: CategoryCard[] = [
  {
    title: 'Ho Technical University Auditorium',
    description: 'State-of-the-art facility for academic and community events.',
    image: '/images/scholarship/OME1079.jpg',
    link: '/infrastructure'
  },
  {
    title: 'School Infrastructure',
    description: 'Building classrooms and facilities across Ghana.',
    image: '/images/hero/main-slider-1.jpg',
    link: '/infrastructure'
  },
  {
    title: 'Science Laboratories',
    description: 'Modern labs for practical STEM education.',
    image: '/images/scholarship/GETFund-Projects-02-768x436.jpg',
    link: '/infrastructure'
  },
  {
    title: 'Libraries',
    description: 'Promoting reading culture nationwide.',
    image: '/images/infrastructure/school-building.jpg',
    link: '/infrastructure'
  },
  {
    title: 'TVET Centers',
    description: 'Technical and vocational training facilities.',
    image: '/images/hero/main-slider-3.jpg',
    link: '/tvet'
  },
  {
    title: 'Teacher Training',
    description: 'Professional development for educators.',
    image: '/images/about/getfund-7th-board-inauguration.jpg',
    link: '/about'
  }
];

export default function AchievementsSection({
  sectionTitle = 'Supporting the delivery of Quality Education...',
  sectionSubtitle = 'Since 2000',
  circles = defaultCircles,
  categories = defaultCategories
}: AchievementsSectionProps) {
  // Use defaults if empty arrays are passed
  const displayCircles = circles && circles.length > 0 ? circles : defaultCircles;

  // For categories, check if they have valid images - if not, use defaults
  const hasValidCategories = categories && categories.length > 0 &&
    categories.some(cat => cat.image && cat.image.trim() !== '');

  // If CMS categories exist but have empty images, merge with defaults to get images
  const displayCategories = hasValidCategories
    ? categories.map((cat, index) => ({
        ...cat,
        // Use CMS image if valid, otherwise use default image for that index
        image: cat.image && cat.image.trim() !== ''
          ? cat.image
          : (defaultCategories[index]?.image || defaultCategories[0].image)
      }))
    : defaultCategories;

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Asymmetric Section Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 mb-14 md:mb-20 max-w-6xl">
          <div className="md:col-span-5">
            <span className="text-eyebrow">{sectionSubtitle}</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-getfund-secondary mt-4 leading-[1.05]" style={{ letterSpacing: '-0.03em' }}>
              {sectionTitle}
            </h2>
          </div>
          <div className="md:col-span-7 md:col-start-6 flex items-center">
            <div className="flex flex-nowrap justify-start md:justify-end gap-2 sm:gap-3 md:gap-4 w-full">
              {displayCircles.map((circle, index) => (
                <div
                  key={index}
                  className="flex-1 min-w-0 aspect-square max-w-[120px] md:max-w-[140px] bg-getfund-dark flex items-center justify-center shadow-md p-2 sm:p-3"
                  style={{ borderRadius: '50%' }}
                >
                  <span className="text-white text-[7px] sm:text-[10px] md:text-xs font-semibold text-center leading-tight">
                    {circle.value || circle.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Category Grid — 4 per row on desktop, tight clean lines */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
          {displayCategories.map((category, index) => (
            <a
              key={index}
              href={category.link || '#'}
              className="group block"
            >
              <div className="relative overflow-hidden bg-gray-100 aspect-[4/3]">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/hero/main-slider-1.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                  <h3 className="font-display text-sm sm:text-lg md:text-xl font-semibold text-white leading-tight" style={{ letterSpacing: '-0.015em' }}>
                    {category.title}
                  </h3>
                  {category.description && (
                    <p className="text-xs sm:text-sm text-white/80 mt-1 sm:mt-2 line-clamp-2 hidden sm:block leading-relaxed">
                      {category.description}
                    </p>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
