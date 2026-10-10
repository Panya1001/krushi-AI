import React, { useState } from 'react';
import { 
  TrendingUp, 
  Search, 
  MapPin, 
  ArrowUpRight, 
  ArrowDownRight, 
  Award, 
  Filter, 
  Sparkles, 
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { initialMandiPrices } from '../data/agriData';
import { MandiPrice } from '../types';

export const MarketPricesPage: React.FC = () => {
  const { language, t } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState<string>('All');
  const [selectedCrop, setSelectedCrop] = useState<string>('All');
  const [selectedMandiDetail, setSelectedMandiDetail] = useState<MandiPrice | null>(null);

  // States available
  const states = ['All', 'Maharashtra', 'Madhya Pradesh', 'Gujarat', 'Punjab'];
  const cropList = ['All', 'Soybean', 'Onion', 'Cotton', 'Wheat', 'Tomato', 'Sugarcane', 'Rice', 'Gram'];

  // Filtered Mandi list
  const filteredPrices = initialMandiPrices.filter((item) => {
    const matchesSearch = 
      item.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.market.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.cropLocal[language].toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesState = selectedState === 'All' || item.state === selectedState;
    const matchesCrop = selectedCrop === 'All' || item.crop === selectedCrop;

    return matchesSearch && matchesState && matchesCrop;
  });

  // Calculate Highest Net Return Mandi (Transport adjusted)
  const getNetPrice = (price: number, distanceKm: number = 20) => {
    const transportCostPerQuintal = distanceKm * 2.2; // approx ₹2.2 / km
    return Math.round(price - transportCostPerQuintal);
  };

  // Find the top net earner in the current filtered list
  const bestMandiId = filteredPrices.length > 0
    ? [...filteredPrices].sort((a, b) => getNetPrice(b.modalPrice, b.distanceKm) - getNetPrice(a.modalPrice, a.distanceKm))[0]?.id
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Real-time APMC Mandi Intelligence & MSP Tracker</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {t.market.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          {t.market.subtitle}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card p-4 sm:p-5 rounded-3xl border border-slate-200/90 bg-white space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Input (6 cols) */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.market.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* State Filter (3 cols) */}
          <div className="md:col-span-3">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              {states.map(s => (
                <option key={s} value={s}>{s === 'All' ? 'All States (सर्व राज्ये)' : s}</option>
              ))}
            </select>
          </div>

          {/* Crop Filter (3 cols) */}
          <div className="md:col-span-3">
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              {cropList.map(c => (
                <option key={c} value={c}>{c === 'All' ? 'All Crops (सर्व पिके)' : c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Best Mandi Recommendation Banner */}
      {bestMandiId && (
        <div className="rounded-2xl p-4 bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-teal-500/10 border border-emerald-300 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-md">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-900 bg-emerald-200/80 px-2 py-0.5 rounded-full">
                AI Best Market Recommendation
              </span>
              <p className="text-xs font-bold text-slate-800 mt-0.5">
                {language === 'mr' 
                  ? 'तुमच्या शेतातून वाहतूक खर्च वजा करता सर्वाधिक निव्वळ नफा देणारी बाजार समिती खाली हायलाइट केली आहे!' 
                  : 'Highest net profit market taking farm distance and diesel transportation into account!'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Mandi Rates Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrices.map((item) => {
          const isBest = item.id === bestMandiId;
          const isAboveMsp = item.modalPrice >= item.msp;
          const netReturn = getNetPrice(item.modalPrice, item.distanceKm);

          return (
            <div
              key={item.id}
              onClick={() => setSelectedMandiDetail(item)}
              className={`glass-card p-6 rounded-3xl border transition-all cursor-pointer space-y-4 relative bg-white ${
                isBest
                  ? 'border-2 border-emerald-500 shadow-xl ring-2 ring-emerald-400/20'
                  : 'border-slate-200/90 hover:border-emerald-300'
              }`}
            >
              {/* Highlight badge if Best Market */}
              {isBest && (
                <span className="absolute -top-3 right-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>{t.market.bestMandiTag}</span>
                </span>
              )}

              {/* Title & Market Location */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    {item.cropLocal[language]}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.market}, {item.district}</span>
                  </div>
                </div>

                <span className={`text-xs font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 ${
                  item.change >= 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  {item.change >= 0 ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                  <span>{Math.abs(item.change)}%</span>
                </span>
              </div>

              {/* Rate Breakdown */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">{t.market.modalPrice}</span>
                    <p className="text-2xl font-black text-emerald-800">₹{item.modalPrice.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Net After Transport</span>
                    <p className="text-sm font-extrabold text-slate-800">~₹{netReturn}/Q</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
                  <span>Min: ₹{item.minPrice}</span>
                  <span>•</span>
                  <span>Max: ₹{item.maxPrice}</span>
                  <span>•</span>
                  <span>{item.distanceKm} km away</span>
                </div>
              </div>

              {/* 7-Day Trend SVG Sparkline */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase">
                  <span>{t.market.priceHistory}</span>
                  <span className={isAboveMsp ? 'text-emerald-700 font-bold' : 'text-amber-700 font-bold'}>
                    MSP: ₹{item.msp} ({isAboveMsp ? t.market.aboveMsp : t.market.belowMsp})
                  </span>
                </div>

                {/* SVG Visual Sparkline */}
                <div className="h-14 w-full pt-1">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 200 40">
                    <path
                      d={`M ${item.trend.map((val, idx) => {
                        const min = Math.min(...item.trend) - 100;
                        const max = Math.max(...item.trend) + 100;
                        const x = (idx / (item.trend.length - 1)) * 190 + 5;
                        const y = 35 - ((val - min) / (max - min)) * 30;
                        return `${x},${y}`;
                      }).join(' L ')}`}
                      fill="none"
                      stroke={item.change >= 0 ? '#10b981' : '#f43f5e'}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    {item.trend.map((val, idx) => {
                      const min = Math.min(...item.trend) - 100;
                      const max = Math.max(...item.trend) + 100;
                      const x = (idx / (item.trend.length - 1)) * 190 + 5;
                      const y = 35 - ((val - min) / (max - min)) * 30;
                      return (
                        <circle
                          key={idx}
                          cx={x}
                          cy={y}
                          r={idx === item.trend.length - 1 ? 4 : 2}
                          fill={item.change >= 0 ? '#059669' : '#e11d48'}
                        />
                      );
                    })}
                  </svg>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>Updated: {item.date}</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  View Analysis <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal for Clicked Mandi */}
      {selectedMandiDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 p-6 space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  {selectedMandiDetail.market}
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  {selectedMandiDetail.cropLocal[language]} ({selectedMandiDetail.variety})
                </h3>
                <p className="text-xs text-slate-500">{selectedMandiDetail.district}, {selectedMandiDetail.state}</p>
              </div>
              <button
                onClick={() => setSelectedMandiDetail(null)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-slate-400 font-bold block text-[10px]">{t.market.minPrice}</span>
                <strong className="text-slate-800 text-sm">₹{selectedMandiDetail.minPrice}</strong>
              </div>
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200">
                <span className="text-emerald-700 font-bold block text-[10px]">{t.market.modalPrice}</span>
                <strong className="text-emerald-900 text-lg font-black">₹{selectedMandiDetail.modalPrice}</strong>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-slate-400 font-bold block text-[10px]">{t.market.maxPrice}</span>
                <strong className="text-slate-800 text-sm">₹{selectedMandiDetail.maxPrice}</strong>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
              <strong className="text-slate-900 font-bold block">
                🚚 Transport & Net Realization Analysis:
              </strong>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Estimated distance from your village: <strong>{selectedMandiDetail.distanceKm} km</strong>.<br />
                Estimated pickup freight: <strong>~₹{Math.round((selectedMandiDetail.distanceKm || 20) * 2.2)} / Quintal</strong>.<br />
                Net money in hand: <strong className="text-emerald-800">₹{getNetPrice(selectedMandiDetail.modalPrice, selectedMandiDetail.distanceKm)} / Quintal</strong>.
              </p>
            </div>

            <button
              onClick={() => setSelectedMandiDetail(null)}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
            >
              Done / Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
