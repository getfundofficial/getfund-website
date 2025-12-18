interface Region {
  name: string;
  totalProjects: number;
  basicEducation?: number;
  secondaryEducation?: number;
  tertiaryEducation?: number;
  modelSchools?: number;
  tvetCenters?: number;
}

interface RegionalDetailPanelProps {
  region: Region;
  onClose: () => void;
}

export default function RegionalDetailPanel({ region, onClose }: RegionalDetailPanelProps) {
  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-getfund-primary animate-fadeIn h-full">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">
            {region.name} Region
          </h3>
          <p className="text-gray-500">Detailed project breakdown</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-all"
          aria-label="Close details"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Total Projects */}
        <div className="col-span-2 bg-gradient-to-br from-getfund-primary via-red-600 to-red-700 text-white rounded-xl p-6 shadow-lg">
          <div className="text-5xl font-bold mb-2">{region.totalProjects.toLocaleString()}</div>
          <div className="text-lg opacity-95">Total Projects</div>
        </div>

        {/* Basic Education */}
        {region.basicEducation !== undefined && region.basicEducation > 0 && (
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-xl p-5 shadow-lg">
            <div className="text-3xl font-bold mb-1">{region.basicEducation.toLocaleString()}</div>
            <div className="text-sm opacity-90">Basic Education</div>
          </div>
        )}

        {/* Secondary Education */}
        {region.secondaryEducation !== undefined && region.secondaryEducation > 0 && (
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-5 shadow-lg">
            <div className="text-3xl font-bold mb-1">{region.secondaryEducation.toLocaleString()}</div>
            <div className="text-sm opacity-90">Secondary Education</div>
          </div>
        )}

        {/* Tertiary Education */}
        {region.tertiaryEducation !== undefined && region.tertiaryEducation > 0 && (
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-5 shadow-lg">
            <div className="text-3xl font-bold mb-1">{region.tertiaryEducation.toLocaleString()}</div>
            <div className="text-sm opacity-90">Tertiary Education</div>
          </div>
        )}

        {/* Model Schools */}
        {region.modelSchools !== undefined && region.modelSchools > 0 && (
          <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-xl p-5 shadow-lg">
            <div className="text-3xl font-bold mb-1">{region.modelSchools.toLocaleString()}</div>
            <div className="text-sm opacity-90">Model Schools</div>
          </div>
        )}

        {/* TVET Centers */}
        {region.tvetCenters !== undefined && region.tvetCenters > 0 && (
          <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-xl p-5 shadow-lg">
            <div className="text-3xl font-bold mb-1">{region.tvetCenters.toLocaleString()}</div>
            <div className="text-sm opacity-90">TVET Centers</div>
          </div>
        )}
      </div>
    </div>
  );
}
