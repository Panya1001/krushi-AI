import React from 'react';
import { 
  Sprout, 
  ScanSearch, 
  ShieldAlert, 
  TrendingUp, 
  Landmark, 
  Calculator, 
  CloudSun, 
  Wind, 
  Droplets, 
  Thermometer, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { mockWeatherData, mockSoilData, initialMandiPrices, initialGovtSchemes, initialCameras } from '../data/agriData';
import { UserAvatar } from '../components/UserAvatar';

interface FarmerDashboardProps {
  setActiveTab: (tab: string) => void;
  onOpenMitra: () => void;
}

export const FarmerDashboard: React.FC<FarmerDashboardProps> = ({ setActiveTab, onOpenMitra }) => {
  const { language, t } = useLanguage();
  const { user, savedScans } = useAuth();

  // Time-based regional greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 
    ? t.dashboard.greetingMorning 
    : hour < 17 
    ? t.dashboard.greetingAfternoon 
    : t.dashboard.greetingEvening;

  const activeIntrusion = initialCameras.some(c => c.intruderDetected);

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Welcome Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border-2 border-emerald-100 bg-gradient-to-r from-emerald-50/90 via-white to-green-50/80 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <UserAvatar
              name={user?.name}
              avatar={user?.avatar}
              className="w-16 h-16 rounded-2xl ring-2 ring-emerald-500 shadow-md"
              textClassName="text-xl"
              iconClassName="w-8 h-8"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100/90 px-2.5 py-0.5 rounded-full">
                  {greeting}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {user?.village}, {user?.district} ({user?.state})
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                {user?.name}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 pt-1">
                <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  🌱 {user?.landSizeAcres} Acres Farm
                </span>
                <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                  🪨 {user?.soilType}
                </span>
                <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                  🌾 {user?.primaryCrops?.join(', ')}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action Assistant Launcher */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenMitra}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-extrabold text-xs shadow-md shadow-emerald-600/30 flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span>{t.chat.title}</span>
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className="px-4 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs border border-slate-200 shadow-xs cursor-pointer"
            >
              {language === 'mr' ? 'माझे शेत प्रोफाइल' : 'Farm Profile'}
            </button>
          </div>
        </div>
      </div>

      {/* Critical Farm Status Grid (Weather, Soil, Wildlife, Market) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Live Agri Weather */}
        <div 
          onClick={() => setActiveTab('weather-soil')}
          className="glass-card p-5 rounded-3xl border border-slate-200/90 space-y-3 cursor-pointer hover:border-emerald-400 group bg-white"
        >
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-500 uppercase tracking-wider">{t.dashboard.weatherCard}</span>
            <CloudSun className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
          </div>

          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-slate-900">{mockWeatherData.currentTemp}°C</span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
              {mockWeatherData.rainProbability}% Rain
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 pt-1">
            <div className="flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-blue-500" />
              <span>Hum: {mockWeatherData.humidity}%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Wind className="w-3.5 h-3.5 text-slate-400" />
              <span>Wind: {mockWeatherData.windSpeed} km/h</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-emerald-700 font-semibold">
            <span>{mockWeatherData.sprayAdvisory.statusLocal[language]}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 2: Soil Health Score */}
        <div 
          onClick={() => setActiveTab('weather-soil')}
          className="glass-card p-5 rounded-3xl border border-slate-200/90 space-y-3 cursor-pointer hover:border-emerald-400 group bg-white"
        >
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-500 uppercase tracking-wider">{t.dashboard.soilCard}</span>
            <Sprout className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform" />
          </div>

          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-emerald-700">pH {mockSoilData.ph.value}</span>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
              {t.dashboard.soilHealthOptimal}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1 text-[11px] text-center pt-1">
            <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-100">
              <span className="text-[10px] text-slate-400 font-bold block">N (नत्र)</span>
              <strong className="text-slate-800">{mockSoilData.nitrogen.value}</strong>
            </div>
            <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-100">
              <span className="text-[10px] text-slate-400 font-bold block">P (स्फुरद)</span>
              <strong className="text-slate-800">{mockSoilData.phosphorus.value}</strong>
            </div>
            <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-100">
              <span className="text-[10px] text-slate-400 font-bold block">K (पालाश)</span>
              <strong className="text-slate-800">{mockSoilData.potassium.value}</strong>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-emerald-700 font-semibold">
            <span>Carbon: {mockSoilData.organicCarbon.value}%</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 3: Wildlife Alert Perimeter Status */}
        <div 
          onClick={() => setActiveTab('wildlife')}
          className={`glass-card p-5 rounded-3xl border space-y-3 cursor-pointer group bg-white ${
            activeIntrusion 
              ? 'border-rose-300 shadow-md shadow-rose-500/10 hover:border-rose-500' 
              : 'border-slate-200/90 hover:border-emerald-400'
          }`}
        >
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-500 uppercase tracking-wider">{t.dashboard.wildlifeCard}</span>
            <ShieldAlert className={`w-5 h-5 ${activeIntrusion ? 'text-rose-600 animate-pulse' : 'text-emerald-600'}`} />
          </div>

          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-rose-600">
              {activeIntrusion ? '⚠️ Sector A Alert' : 'Guarded'}
            </span>
            <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
              4/4 Cameras
            </span>
          </div>

          <p className="text-[11px] text-slate-600 leading-tight">
            {activeIntrusion 
              ? 'Wild Boar detected on Cam 01 North Orchard fence.' 
              : 'All 4 farm boundary cameras online. No breaches.'}
          </p>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-rose-700 font-bold">
            <span>{activeIntrusion ? 'Inspect Camera Feed' : 'Perimeter Safe'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 4: Top Mandi Price Mover */}
        <div 
          onClick={() => setActiveTab('market')}
          className="glass-card p-5 rounded-3xl border border-slate-200/90 space-y-3 cursor-pointer hover:border-teal-400 group bg-white"
        >
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-500 uppercase tracking-wider">{t.dashboard.marketCard}</span>
            <TrendingUp className="w-5 h-5 text-teal-600 group-hover:scale-110 transition-transform" />
          </div>

          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-emerald-700">₹{initialMandiPrices[1].modalPrice}</span>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
              ▲ +{initialMandiPrices[1].change}%
            </span>
          </div>

          <p className="text-[11px] text-slate-700 font-semibold leading-tight">
            {initialMandiPrices[1].cropLocal[language]} @ {initialMandiPrices[1].market}
          </p>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-teal-700 font-semibold">
            <span>MSP: ₹{initialMandiPrices[1].msp}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Quick Action Navigation Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-black text-slate-900 tracking-tight">
          {t.dashboard.quickActionTitle}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <button
            onClick={() => setActiveTab('disease')}
            className="p-4 rounded-2xl bg-white hover:bg-emerald-50/80 border border-slate-200 hover:border-emerald-300 text-left transition-all shadow-xs cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <ScanSearch className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-xs text-slate-900">{t.nav.diseaseDetection}</h3>
            <p className="text-[10px] text-slate-500 mt-0.5">Instant leaf diagnosis</p>
          </button>

          <button
            onClick={() => setActiveTab('wildlife')}
            className="p-4 rounded-2xl bg-white hover:bg-rose-50/80 border border-slate-200 hover:border-rose-300 text-left transition-all shadow-xs cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-xs text-slate-900">{t.nav.wildlife}</h3>
            <p className="text-[10px] text-slate-500 mt-0.5">Live cameras & siren</p>
          </button>

          <button
            onClick={() => setActiveTab('market')}
            className="p-4 rounded-2xl bg-white hover:bg-teal-50/80 border border-slate-200 hover:border-teal-300 text-left transition-all shadow-xs cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-xs text-slate-900">{t.nav.marketPrices}</h3>
            <p className="text-[10px] text-slate-500 mt-0.5">Mandi bhav & trends</p>
          </button>

          <button
            onClick={() => setActiveTab('schemes')}
            className="p-4 rounded-2xl bg-white hover:bg-blue-50/80 border border-slate-200 hover:border-blue-300 text-left transition-all shadow-xs cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Landmark className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-xs text-slate-900">{t.nav.schemes}</h3>
            <p className="text-[10px] text-slate-500 mt-0.5">Direct subsidies & loans</p>
          </button>

          <button
            onClick={() => setActiveTab('crop-rec')}
            className="p-4 rounded-2xl bg-white hover:bg-amber-50/80 border border-slate-200 hover:border-amber-300 text-left transition-all shadow-xs cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Sprout className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-xs text-slate-900">{t.nav.cropRec}</h3>
            <p className="text-[10px] text-slate-500 mt-0.5">Soil & climate match</p>
          </button>

          <button
            onClick={() => setActiveTab('calculator')}
            className="p-4 rounded-2xl bg-white hover:bg-green-50/80 border border-slate-200 hover:border-green-300 text-left transition-all shadow-xs cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-green-100 text-green-700 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Calculator className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-xs text-slate-900">{t.nav.calculator}</h3>
            <p className="text-[10px] text-slate-500 mt-0.5">Cost & profit forecasting</p>
          </button>
        </div>
      </div>

      {/* Two Column Detailed Sections: Eligible Schemes & Recent Diagnostic History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Government Schemes Matching Your Land */}
        <div className="glass-card p-6 rounded-3xl border border-slate-200/90 space-y-4 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Landmark className="w-5 h-5 text-emerald-700" />
              <h3 className="font-extrabold text-sm text-slate-900">
                {t.dashboard.schemesCard} ({user?.state})
              </h3>
            </div>
            <button
              onClick={() => setActiveTab('schemes')}
              className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{t.common.all} (6)</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {initialGovtSchemes.slice(0, 3).map((scheme) => (
              <div 
                key={scheme.id}
                onClick={() => setActiveTab('schemes')}
                className="p-3.5 rounded-2xl bg-slate-50 hover:bg-emerald-50/60 border border-slate-200/80 hover:border-emerald-300 transition-all cursor-pointer text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900">{scheme.title[language]}</h4>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                    {scheme.benefitAmount}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 line-clamp-1">{scheme.description[language]}</p>
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                  <span>Land: {scheme.minLand} - {scheme.maxLand} Ha</span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    Apply Online <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Saved Diagnostic Records */}
        <div className="glass-card p-6 rounded-3xl border border-slate-200/90 space-y-4 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ScanSearch className="w-5 h-5 text-emerald-700" />
              <h3 className="font-extrabold text-sm text-slate-900">
                {language === 'mr' ? 'पिकांचे रोग निदान इतिहास' : language === 'hi' ? 'फसल रोग जांच इतिहास' : 'Recent Diagnostic Medical Records'}
              </h3>
            </div>
            <button
              onClick={() => setActiveTab('disease')}
              className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{language === 'mr' ? 'नवीन तपासणी' : 'New Scan'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {savedScans.slice(0, 3).map((scan) => (
              <div
                key={scan.id}
                onClick={() => setActiveTab('disease')}
                className="p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition-all cursor-pointer flex items-center gap-3 text-xs"
              >
                <img
                  src={scan.imageUrl}
                  alt={scan.cropName}
                  className="w-12 h-12 rounded-xl object-cover shrink-0 ring-1 ring-slate-200"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 truncate">{scan.diseaseName[language]}</h4>
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-1.5 py-0.5 rounded-full shrink-0">
                      {scan.confidence}%
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">Crop: {scan.cropName} • {scan.date}</p>
                  <p className="text-[11px] text-emerald-800 font-semibold truncate mt-0.5">
                    Rx: {scan.organicRemedy[0]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
