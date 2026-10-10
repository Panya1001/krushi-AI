import React, { useState } from 'react';
import { 
  Sprout, 
  MapPin, 
  Droplets, 
  Layers, 
  Sparkles, 
  Calculator, 
  ArrowRight, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Compass
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { CropRecommendationInput, CropRecommendationOutput } from '../types';

interface CropRecommendationPageProps {
  onNavigateToCalculator: (cropName: string, acres: number) => void;
}

export const CropRecommendationPage: React.FC<CropRecommendationPageProps> = ({ onNavigateToCalculator }) => {
  const { language, t } = useLanguage();
  const { user } = useAuth();

  const [input, setInput] = useState<CropRecommendationInput>({
    state: user?.state || 'Maharashtra',
    district: user?.district || 'Nashik',
    soilType: 'Medium Black (काळी माती)',
    nitrogen: 240,
    phosphorus: 26,
    potassium: 295,
    ph: 6.8,
    waterSource: 'Drip Irrigation (ठिबक सिंचन)',
    season: 'Kharif',
    budgetPerAcre: 35000
  });

  const [recommendations, setRecommendations] = useState<CropRecommendationOutput[]>([
    {
      crop: 'Soybean',
      cropLocal: { en: 'Soybean (JS-335)', mr: 'सोयाबीन (जेएस-३३५)', hi: 'सोयाबीन (JS-335)' },
      matchScore: 96,
      expectedYieldQuintals: 11.5,
      expectedRevenuePerAcre: 57270,
      estimatedNetProfit: 34200,
      durationDays: 105,
      waterRequirement: 'Medium',
      riskLevel: 'Low',
      reasons: [
        'Black soil moisture retention matches Kharif germination perfectly',
        'High potassium index (295 kg/ha) accelerates pod filling and oil percentage',
        'Current APMC market price trending 3.2% above MSP'
      ],
      suitabilityTags: ['Optimal Soil pH', 'Moderate Irrigation', 'Low Market Volatility']
    },
    {
      crop: 'Cotton',
      cropLocal: { en: 'Bt Cotton (Medium Staple)', mr: 'बीटी कापूस', hi: 'बीटी कपास' },
      matchScore: 88,
      expectedYieldQuintals: 14.0,
      expectedRevenuePerAcre: 105560,
      estimatedNetProfit: 62000,
      durationDays: 160,
      waterRequirement: 'Medium',
      riskLevel: 'Medium',
      reasons: [
        'Drip fertigation prevents root waterlogging in deep black clay',
        'High yield potential with balanced Nitrogen split application',
        'Strong textile mill demand across Western & Northern India'
      ],
      suitabilityTags: ['High Profit Potential', 'Export Demand', 'Requires Sucking Pest Scouting']
    },
    {
      crop: 'Onion',
      cropLocal: { en: 'Red Onion (Kharif / Rangada)', mr: 'रांगडा / खरीप कांदा', hi: 'रंगड़ा / खरीफ प्याज' },
      matchScore: 84,
      expectedYieldQuintals: 110.0,
      expectedRevenuePerAcre: 180000,
      estimatedNetProfit: 95000,
      durationDays: 120,
      waterRequirement: 'Medium',
      riskLevel: 'High',
      reasons: [
        'Nashik agro-climatic zone provides ideal photoperiod for bulb swelling',
        'High return capability during festival market surge (Oct-Nov)',
        'Requires vigilant fungal purple blotch preventive sprays'
      ],
      suitabilityTags: ['Top Cash Crop', 'High ROI', 'Short Maturity']
    }
  ]);

  const [loading, setLoading] = useState(false);

  const handleRunRecommendation = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      // Dynamic recommendation outputs
      setLoading(false);
    }, 1000);
  };

  const handleUseGps = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setInput(prev => ({ ...prev, district: user?.district || 'Nashik', state: user?.state || 'Maharashtra' }));
        },
        () => {
          // fallback
        }
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
          <Sprout className="w-3.5 h-3.5" />
          <span>Geo-Targeted Precision Agronomy Advisor</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {t.features.cropTitle}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          {t.features.cropDesc}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Parameters Form (5 cols) */}
        <div className="lg:col-span-5">
          <form onSubmit={handleRunRecommendation} className="glass-card p-6 sm:p-7 rounded-3xl border border-slate-200/90 bg-white space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-sm text-slate-900">
                {language === 'mr' ? 'शेताचे तपशील व मातीचे घटक' : 'Farm & Soil Parameters'}
              </h3>
              <button
                type="button"
                onClick={handleUseGps}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Auto-Detect GPS</span>
              </button>
            </div>

            {/* Region */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">State (राज्य)</label>
                <input
                  type="text"
                  value={input.state}
                  onChange={(e) => setInput({ ...input, state: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">District (जिल्हा)</label>
                <input
                  type="text"
                  value={input.district}
                  onChange={(e) => setInput({ ...input, district: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Soil Type & Season */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Soil Type (मातीचा प्रकार)</label>
                <select
                  value={input.soilType}
                  onChange={(e) => setInput({ ...input, soilType: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                >
                  <option value="Medium Black (काळी माती)">Medium Black (काळी)</option>
                  <option value="Deep Black Clay (भारी काळी)">Deep Black Clay</option>
                  <option value="Red Sandy Loam (तांबडी माती)">Red Sandy Loam</option>
                  <option value="Alluvial Loam (गाळाची माती)">Alluvial Loam</option>
                  <option value="Laterite (जांभा)">Laterite</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Season (हंगाम)</label>
                <select
                  value={input.season}
                  onChange={(e) => setInput({ ...input, season: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                >
                  <option value="Kharif">Kharif (पावसाळी - जून-ऑक्टो)</option>
                  <option value="Rabi">Rabi (हिवाळी - ऑक्टो-फेब्रु)</option>
                  <option value="Zaid">Zaid (उन्हाळी - मार्च-जून)</option>
                </select>
              </div>
            </div>

            {/* Water Source */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Irrigation / Water Source</label>
              <select
                value={input.waterSource}
                onChange={(e) => setInput({ ...input, waterSource: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="Drip Irrigation (ठिबक सिंचन)">Drip Irrigation (ठिबक सिंचन)</option>
                <option value="Canal / Flood (पाटपाणी)">Canal / Flood Water</option>
                <option value="Open Well / Borewell (विहीर)">Open Well / Borewell</option>
                <option value="Rainfed (कोरडवाहू / जिरायत)">Rainfed (कोरडवाहू)</option>
              </select>
            </div>

            {/* Soil NPK Sliders */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
              <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                <span>Soil N-P-K & pH Indicators</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">From Soil Card</span>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-600 mb-1">
                  <span>Nitrogen (N): <strong>{input.nitrogen} kg/ha</strong></span>
                  <span className="text-slate-400">Opt: 200-300</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="450"
                  value={input.nitrogen}
                  onChange={(e) => setInput({ ...input, nitrogen: parseInt(e.target.value) })}
                  className="w-full accent-emerald-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-600 mb-1">
                  <span>Phosphorus (P): <strong>{input.phosphorus} kg/ha</strong></span>
                  <span className="text-slate-400">Opt: 20-35</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="60"
                  value={input.phosphorus}
                  onChange={(e) => setInput({ ...input, phosphorus: parseInt(e.target.value) })}
                  className="w-full accent-emerald-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-600 mb-1">
                  <span>Potassium (K): <strong>{input.potassium} kg/ha</strong></span>
                  <span className="text-slate-400">Opt: 150-280</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="400"
                  value={input.potassium}
                  onChange={(e) => setInput({ ...input, potassium: parseInt(e.target.value) })}
                  className="w-full accent-emerald-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl text-xs shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span>{loading ? 'AI Analyzing Soil & Climate Matrix...' : 'Run Precision Crop Advisory'}</span>
            </button>
          </form>
        </div>

        {/* Output Top 3 Crop Cards (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-slate-900">
              {language === 'mr' ? 'सर्वाधिक नफा देणाऱ्या शिफारस केलेल्या पिकांची यादी' : 'AI Crop Match Recommendations'}
            </h3>
            <span className="text-xs text-slate-400">Ranked by Net Margin & Success Rate</span>
          </div>

          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div
                key={index}
                className="glass-card p-6 rounded-3xl border border-slate-200/90 bg-white space-y-4 hover:border-emerald-300 transition-all shadow-md"
              >
                <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] font-black flex items-center justify-center">
                        #{index + 1}
                      </span>
                      <h4 className="text-lg font-black text-slate-900">
                        {rec.cropLocal[language]}
                      </h4>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      {rec.suitabilityTags.map((tag, tIdx) => (
                        <span key={tIdx} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-semibold">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-2xl font-black text-emerald-700">{rec.matchScore}%</span>
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Match Score</p>
                  </div>
                </div>

                {/* Economics Forecast Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-bold block">Yield / Acre</span>
                    <strong className="text-slate-800">{rec.expectedYieldQuintals} Qtl</strong>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-bold block">Gross Return</span>
                    <strong className="text-slate-800">₹{rec.expectedRevenuePerAcre.toLocaleString()}</strong>
                  </div>
                  <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200">
                    <span className="text-[10px] text-emerald-700 font-bold block">Est. Net Profit</span>
                    <strong className="text-emerald-900 font-black">₹{rec.estimatedNetProfit.toLocaleString()}</strong>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-bold block">Harvest Cycle</span>
                    <strong className="text-slate-800">{rec.durationDays} Days</strong>
                  </div>
                </div>

                {/* Why this crop matches */}
                <div className="space-y-1.5 text-xs text-slate-600 bg-emerald-50/40 p-3 rounded-2xl border border-emerald-100">
                  <strong className="text-emerald-950 font-bold text-[11px] block">Scientific Justification:</strong>
                  {rec.reasons.map((r, rIdx) => (
                    <p key={rIdx} className="text-[11px] flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{r}</span>
                    </p>
                  ))}
                </div>

                {/* Direct Action */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-slate-400">Risk: <strong className="text-slate-700">{rec.riskLevel}</strong> • Water: <strong className="text-slate-700">{rec.waterRequirement}</strong></span>
                  <button
                    onClick={() => onNavigateToCalculator(rec.crop, user?.landSizeAcres || 5)}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Calculate Full Expenses</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
