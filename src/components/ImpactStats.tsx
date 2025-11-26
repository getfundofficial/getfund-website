interface ImpactStatsProps {
  className?: string;
}

export default function ImpactStats({ className = '' }: ImpactStatsProps) {
  return (
    <section className={`py-16 bg-gray-50 ${className}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
          Our Impact. 25+ years of giving
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Scholarships awarded */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl md:text-5xl font-bold text-getfund-primary mb-2">
              [TBD]
            </div>
            <div className="text-gray-700 font-medium">Scholarships awarded –</div>
          </div>

          {/* Infrastructure projects */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center md:col-span-2 lg:col-span-1">
            <div className="text-4xl md:text-5xl font-bold text-getfund-primary mb-2">
              [TBD]
            </div>
            <div className="text-gray-700 font-medium">Infrastructure projects to date -</div>
          </div>

          {/* Basic education */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl md:text-5xl font-bold text-getfund-gold mb-2">
              [TBD]
            </div>
            <div className="text-gray-700 font-medium">Basic education</div>
          </div>

          {/* Secondary education */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl md:text-5xl font-bold text-getfund-gold mb-2">
              [TBD]
            </div>
            <div className="text-gray-700 font-medium">Secondary education</div>
          </div>

          {/* Tertiary education */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl md:text-5xl font-bold text-getfund-gold mb-2">
              [TBD]
            </div>
            <div className="text-gray-700 font-medium">Tertiary education</div>
          </div>

          {/* Model schools */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl md:text-5xl font-bold text-getfund-gold mb-2">
              [TBD]
            </div>
            <div className="text-gray-700 font-medium">Model schools</div>
          </div>

          {/* TVET */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl md:text-5xl font-bold text-getfund-gold mb-2">
              [TBD]
            </div>
            <div className="text-gray-700 font-medium">TVET</div>
          </div>
        </div>
      </div>
    </section>
  );
}
