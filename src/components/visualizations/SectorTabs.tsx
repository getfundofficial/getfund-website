import React, { useState } from 'react';
import { CheckCircle2, MapPin, BarChart3, GraduationCap } from 'lucide-react';
import CompletionVerticalChart from './CompletionVerticalChart';
import SectorProgressGrid from './SectorProgressGrid';
import GhanaRegionalMap from '../GhanaRegionalMap';
import { REGIONS_DATA } from '../../data/regional-data';
import OptimizedImage from '../OptimizedImage';

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const tabs: Tab[] = [
  {
    id: 'completion',
    label: 'Progress Completion',
    icon: <CheckCircle2 className="w-4 h-4" />,
  },
  {
    id: 'regional',
    label: 'Regional Impact',
    icon: <MapPin className="w-4 h-4" />,
  },
  {
    id: 'performance',
    label: 'Sector Performance',
    icon: <BarChart3 className="w-4 h-4" />,
  },
  {
    id: 'scholarships',
    label: 'Scholarships',
    icon: <GraduationCap className="w-4 h-4" />,
  },
];

interface ScholarshipCategory {
  title: string;
  description: string;
}

// Default scholarship data
const defaultScholarshipCategories: ScholarshipCategory[] = [
  { title: 'General Scholarships', description: 'Applications for Tertiary education' },
  { title: 'Faculty Development', description: 'PhD scholarships through GTEC' },
  { title: 'Professional Enhancement', description: 'Government organizations support' },
  { title: 'Educational Sponsorship', description: 'NSMQ, Robotics, STEM Programmes' }
];

const defaultReforms = [
  'Streamlined eligibility',
  'Digitized applications',
  'STEM emphasis',
  'Girl-child Education',
  'Payment optimization',
  'Programme Monitoring'
];

interface SectorTabsProps {
  className?: string;
  // Scholarship data
  scholarshipTitle?: string;
  scholarshipSubtitle?: string;
  totalScholars?: string;
  scholarshipGrowth?: {
    from: { year: string; count: number };
    to: { year: string; count: number };
  };
  scholarshipCategories?: ScholarshipCategory[];
  reforms?: string[];
  universityLogos?: string[];
}

export default function SectorTabs({
  className = '',
  scholarshipTitle,
  scholarshipSubtitle,
  totalScholars,
  scholarshipGrowth,
  scholarshipCategories,
  reforms,
  universityLogos
}: SectorTabsProps) {
  const [activeTab, setActiveTab] = useState('completion');

  return (
    <section className={`py-12 bg-gray-50 ${className}`}>
      {/* Section Header */}
      <div className="container mx-auto px-4 max-w-6xl mb-8">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Project Analytics
          </h2>
          <p className="text-gray-600 max-w-2xl">
            Explore detailed insights into GETFund's educational infrastructure projects
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center">
          <div className="inline-flex bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-5 md:px-6 py-3 font-medium text-sm
                  transition-all duration-200
                  ${activeTab === tab.id
                    ? 'text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }
                  ${index !== 0 ? 'border-l border-gray-200' : ''}
                `}
                style={activeTab === tab.id ? { backgroundColor: '#2a3f75' } : {}}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'completion' && (
          <CompletionVerticalChart />
        )}

        {activeTab === 'regional' && (
          <section className="py-12 bg-blue-50">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="mb-6">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                  Regional Project Distribution
                </h3>
                <p className="text-gray-600 max-w-2xl">
                  Explore how GETFund projects are distributed across Ghana's 16 regions
                </p>
              </div>

              <GhanaRegionalMap
                regions={REGIONS_DATA}
                showCompletionToggle
              />
            </div>
          </section>
        )}

        {activeTab === 'performance' && (
          <SectorProgressGrid
            title="Sector Performance Analysis"
            subtitle="Detailed completion metrics for each education sector"
          />
        )}

        {activeTab === 'scholarships' && (
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="mb-6">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                  {scholarshipTitle || 'Scholarship Program'}
                </h3>
                <p className="text-gray-600 max-w-2xl">
                  {scholarshipSubtitle || 'Transforming lives through educational opportunities'}
                </p>
              </div>

              {/* Total Scholars and Growth */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-1" style={{ color: '#2a3f75' }}>
                    {totalScholars || '16,000+'}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">Total Scholars Supported</h4>
                  <p className="text-gray-500 text-sm">Across local and foreign institutions</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 text-center">Scholarship Growth</h4>
                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-600">
                        {scholarshipGrowth?.from.count.toLocaleString() || '1,680'}
                      </div>
                      <div className="text-xs text-gray-500">{scholarshipGrowth?.from.year || '2019/20'}</div>
                    </div>
                    <div className="text-2xl" style={{ color: '#2a3f75' }}>→</div>
                    <div className="text-center">
                      <div className="text-2xl font-bold" style={{ color: '#2a3f75' }}>
                        {scholarshipGrowth?.to.count.toLocaleString() || '5,026'}
                      </div>
                      <div className="text-xs text-gray-500">{scholarshipGrowth?.to.year || '2023/24'}</div>
                    </div>
                  </div>
                  <div className="mt-3 text-center">
                    <span className="inline-block text-white text-xs px-3 py-1 rounded-full font-semibold" style={{ backgroundColor: '#2a3f75' }}>
                      199% Growth
                    </span>
                  </div>
                </div>
              </div>

              {/* Scholarship Categories */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-gray-900 mb-3">Scholarship Categories</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {(scholarshipCategories || defaultScholarshipCategories).map((category, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3 border-l-3" style={{ borderLeftWidth: '3px', borderLeftColor: '#2a3f75' }}>
                      <h5 className="text-sm font-semibold text-gray-900">{category.title}</h5>
                      <p className="text-gray-500 text-xs">{category.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reforms */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-gray-900 mb-3">Key Reforms</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {(reforms || defaultReforms).map((reform, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: '#2a3f75' }}>
                        <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-gray-600 text-xs">{reform}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* University Logos */}
              {universityLogos && universityLogos.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 text-center">Partner Universities</h4>
                  <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {universityLogos.map((logo, index) => (
                      <div key={index} className="bg-white rounded-lg p-3 flex items-center justify-center aspect-square hover:shadow-md transition-shadow">
                        <OptimizedImage
                          src={logo}
                          alt={`University ${index + 1}`}
                          className="max-h-12 max-w-full object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </section>
  );
}
