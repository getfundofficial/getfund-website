import React, { useState } from 'react';
import { CheckCircle2, MapPin, BarChart3 } from 'lucide-react';
import CompletionVerticalChart from './CompletionVerticalChart';
import SectorProgressGrid from './SectorProgressGrid';
import GhanaRegionalMap from '../GhanaRegionalMap';
import { REGIONS_DATA } from '../../data/regional-data';

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
];

interface SectorTabsProps {
  className?: string;
}

export default function SectorTabs({ className = '' }: SectorTabsProps) {
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
      </div>
    </section>
  );
}
