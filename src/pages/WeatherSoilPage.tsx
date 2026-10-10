import React, { useState } from 'react';
import { 
  CloudSun, 
  Sprout, 
  Droplets, 
  Wind, 
  Sun, 
  CloudRain, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Sparkles,
  Layers,
  Thermometer
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { mockWeatherData, mockSoilData } from '../data/agriData';

export const WeatherSoilPage: React.FC = () => {
  const { language } = useLanguage();
  const { user } = useAuth();

  const [activeSubTab, setActiveSubTab] = useState<'weather' | 'soil'>('weather');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
          <CloudSun className="w-3.5 h-3.5" />
          <span>Micro-Climate & Soil Health Intelligence</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {language === 'mr' ? 'हवामान व माती परीक्षण डॅशबोर्ड' : language === 'hi' ? 'मौसम एवं मृदा स्वास्थ्य डॅशबोर्ड' : 'Weather & Soil Health Analytics'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          {language === 'mr' 
            ? '७ दिवसांचा कृषी हवामान अंदाज, फवारणीसाठी योग्य वेळा आणि डिजिटल सॉईल हेल्थ कार्ड.' 
            : '7-day agricultural weather radar, precision spray windows, and digital soil health card.'}
        </p>

        {/* Tab switcher */}
        <div className="pt-2 flex justify-center">
          <div className="inline-flex p-1 bg-slate-100 rounded-2xl border border-slate-200">
            <button
              onClick={() => setActiveSubTab('weather')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeSubTab === 'weather' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🌦️ {language === 'mr' ? 'कृषी हवामान' : 'Agri Weather Radar'}
            </button>
            <button
              onClick={() => setActiveSubTab('soil')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeSubTab === 'soil' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🌱 {language === 'mr' ? 'माती आरोग्य कार्ड (N-P-K)' : 'Soil Health Card'}
            </button>
          </div>
        </div>
      </div>

      {activeSubTab === 'weather' ? (
        <div className="space-y-6">
          {/* Hero Weather Card */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl border-2 border-emerald-200 bg-gradient-to-r from-emerald-50 via-teal-50 to-white shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-7 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-200/80 px-2.5 py-0.5 rounded-full">
                    {user?.district || 'Nashik'}, {user?.state || 'Maharashtra'}
                  </span>
                  <span className="text-xs text-slate-500">• Live Satellite Telemetry</span>
                </div>

                <div className="flex items-baseline gap-4">
                  <span className="text-5xl font-black text-slate-900">{mockWeatherData.currentTemp}°C</span>
                  <div>
                    <p className="text-base font-bold text-slate-700">{mockWeatherData.condition}</p>
                    <p className="text-xs text-slate-500">Feels like {mockWeatherData.feelsLike}°C</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-2 text-xs">
                  <div className="p-3 bg-white/80 rounded-2xl border border-slate-100">
                    <span className="text-slate-400 font-bold block text-[10px]">Humidity</span>
                    <strong className="text-slate-800 text-sm">{mockWeatherData.humidity}%</strong>
                  </div>
                  <div className="p-3 bg-white/80 rounded-2xl border border-slate-100">
                    <span className="text-slate-400 font-bold block text-[10px]">Wind Velocity</span>
                    <strong className="text-slate-800 text-sm">{mockWeatherData.windSpeed} km/h {mockWeatherData.windDirection}</strong>
                  </div>
                  <div className="p-3 bg-white/80 rounded-2xl border border-slate-100">
                    <span className="text-slate-400 font-bold block text-[10px]">Rain Chance</span>
                    <strong className="text-slate-800 text-sm">{mockWeatherData.rainProbability}%</strong>
                  </div>
                </div>
              </div>

              {/* Spray Advisory Banner */}
              <div className="md:col-span-5 p-5 rounded-2xl bg-white border border-emerald-300 shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{mockWeatherData.sprayAdvisory.status}</span>
                </div>
                <p className="text-xs text-slate-700 font-semibold leading-relaxed">
                  {mockWeatherData.sprayAdvisory.statusLocal[language]}
                </p>
                <div className="p-2.5 bg-emerald-50 rounded-xl text-[11px] text-emerald-900 border border-emerald-100">
                  <strong>Recommended Window:</strong> {mockWeatherData.sprayAdvisory.recommendedTime}
                </div>
              </div>
            </div>
          </div>

          {/* 7-Day Forecast Grid */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-sm text-slate-900">
              {language === 'mr' ? '७ दिवसांचा कृषी अंदाज' : '7-Day Agricultural Forecast'}
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
              {mockWeatherData.weeklyForecast.map((fc, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-2xl border text-center space-y-2 ${
                    i === 0 ? 'bg-emerald-50 border-emerald-300 shadow-xs' : 'bg-white border-slate-200/90'
                  }`}
                >
                  <p className="text-xs font-bold text-slate-700">{fc.day}</p>
                  <div className="text-2xl py-1">
                    {fc.icon === 'sun' ? '☀️' : fc.icon === 'sun-cloud' ? '⛅' : fc.icon === 'cloud-rain' ? '🌧️' : '☁️'}
                  </div>
                  <p className="text-xs font-black text-slate-900">{fc.high}° / <span className="text-slate-400 font-medium">{fc.low}°</span></p>
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100/70 px-2 py-0.5 rounded-full inline-block">
                    {fc.rain}% Rain
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Soil Health Card Section */
        <div className="space-y-6">
          <div className="glass-card p-6 sm:p-8 rounded-3xl border-2 border-emerald-200 bg-white space-y-6 shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  Govt Soil Health Card #SHC-2026-9812
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  Soil Chemistry & Micronutrient Status ({user?.soilType})
                </h3>
              </div>

              <span className="text-xs font-bold text-slate-400">Tested: Niphad Krishi Vigyan Kendra</span>
            </div>

            {/* Major Macronutrient Dials (N, P, K, pH) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Nitrogen (नत्र - N)</span>
                <p className="text-3xl font-black text-slate-900">{mockSoilData.nitrogen.value}</p>
                <p className="text-xs text-emerald-700 font-bold">{mockSoilData.nitrogen.status} ({mockSoilData.nitrogen.unit})</p>
                <span className="text-[10px] text-slate-400">Opt: {mockSoilData.nitrogen.optimalRange}</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Phosphorus (स्फुरद - P)</span>
                <p className="text-3xl font-black text-slate-900">{mockSoilData.phosphorus.value}</p>
                <p className="text-xs text-emerald-700 font-bold">{mockSoilData.phosphorus.status} ({mockSoilData.phosphorus.unit})</p>
                <span className="text-[10px] text-slate-400">Opt: {mockSoilData.phosphorus.optimalRange}</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Potassium (पालाश - K)</span>
                <p className="text-3xl font-black text-slate-900">{mockSoilData.potassium.value}</p>
                <p className="text-xs text-emerald-700 font-bold">{mockSoilData.potassium.status} ({mockSoilData.potassium.unit})</p>
                <span className="text-[10px] text-slate-400">Opt: {mockSoilData.potassium.optimalRange}</span>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-center space-y-1">
                <span className="text-[10px] text-emerald-800 font-bold uppercase">Soil Reaction (pH)</span>
                <p className="text-3xl font-black text-emerald-800">{mockSoilData.ph.value}</p>
                <p className="text-xs text-emerald-700 font-bold">Optimal (Neutral)</p>
                <span className="text-[10px] text-emerald-600">Opt: {mockSoilData.ph.optimalRange}</span>
              </div>
            </div>

            {/* Organic Carbon & Moisture */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-700">Organic Carbon (सेंद्रिय कर्ब):</span>
                  <strong className="text-sm font-black text-slate-900">{mockSoilData.organicCarbon.value}%</strong>
                </div>
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[65%]"></div>
                </div>
                <span className="text-[10px] text-slate-400">Target: {mockSoilData.organicCarbon.optimalRange}</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-700">Root Zone Moisture (ओलावा):</span>
                  <strong className="text-sm font-black text-slate-900">{mockWeatherData.soilMoisture}</strong>
                </div>
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full w-[64%]"></div>
                </div>
                <span className="text-[10px] text-slate-400">Optimal Field Capacity</span>
              </div>
            </div>

            {/* Rejuvenation Advisory */}
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2 text-xs">
              <strong className="text-emerald-950 font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Agronomist Rejuvenation Advisory:</span>
              </strong>
              <p className="text-emerald-900 text-xs leading-relaxed">
                {mockSoilData.recommendation[language]}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
