
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
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
            {sectionTitle}
          </h2>
          <p className="text-lg md:text-xl text-gray-500 font-medium">
            {sectionSubtitle}
          </p>
        </div>

        {/* Green Circles Row - Category Labels */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-10 xl:gap-12 mb-16">
          {displayCircles.map((circle, index) => (
            <div
              key={index}
              className="group flex flex-col items-center"
            >
              {/* Green Circle with text inside - using aspect-square to ensure perfect circle */}
              <div
                className="w-32 md:w-36 lg:w-40 xl:w-44 aspect-square rounded-full bg-green-600 flex items-center justify-center shadow-lg transition-all duration-300 p-4"
                style={{ borderRadius: '50%' }}
              >
                <span className="text-white text-[11px] md:text-xs lg:text-sm xl:text-base font-bold text-center leading-tight">
                  {circle.value || circle.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Category Cards Grid - Square Images with no hover cursor */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-10">
          {displayCategories.map((category, index) => (
            <div
              key={index}
              className="flex flex-col items-center cursor-default"
            >
              {/* Square Image - larger size */}
              <div className="w-36 md:w-44 lg:w-52 aspect-square mb-4 overflow-hidden rounded-lg shadow-md">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    // Use a valid fallback image that exists
                    target.src = '/images/hero/main-slider-1.jpg';
                  }}
                />
              </div>

              {/* Title and Description Under Image */}
              <h3 className="text-xs md:text-sm font-bold text-gray-900 text-center leading-tight">
                {category.title}
              </h3>
              {category.description && (
                <p className="text-[10px] md:text-xs text-gray-500 text-center mt-1">
                  {category.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
