import React, { useState } from 'react';
import { 
  Landmark, 
  Search, 
  Filter, 
  CheckSquare, 
  FileText, 
  ExternalLink, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  Info,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { initialGovtSchemes } from '../data/agriData';
import { GovtScheme } from '../types';

export const GovtSchemesPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { user } = useAuth();

  const [search, setSearch] = useState('');
  const [selectedState, setSelectedState] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSchemeForApply, setSelectedSchemeForApply] = useState<GovtScheme | null>(null);

  const categories = [
    { id: 'All', label: 'All Categories' },
    { id: 'direct_benefit', label: 'Direct Cash Transfer (डीबीटी)' },
    { id: 'subsidy', label: 'Solar & Capital Subsidy (सबसिडी)' },
    { id: 'insurance', label: 'Crop Insurance (पीक विमा)' },
    { id: 'irrigation', label: 'Micro-Irrigation (ठिबक सिंचन)' },
    { id: 'machinery', label: 'Tractor & Machinery (अवजारे)' }
  ];

  const states = ['All', 'Maharashtra', 'All India', 'Punjab', 'Uttar Pradesh'];

  const filteredSchemes = initialGovtSchemes.filter((scheme) => {
    const matchesSearch = 
      scheme.title[language].toLowerCase().includes(search.toLowerCase()) ||
      scheme.description[language].toLowerCase().includes(search.toLowerCase());

    const matchesState = selectedState === 'All' || scheme.state === selectedState || scheme.state === 'All India';
    const matchesCategory = selectedCategory === 'All' || scheme.category === selectedCategory;

    return matchesSearch && matchesState && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
          <Landmark className="w-3.5 h-3.5" />
          <span>Central & State Government Agricultural Subsidies</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {t.schemes.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          {t.schemes.subtitle}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card p-5 rounded-3xl border border-slate-200/90 bg-white space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.schemes.search}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              {states.map(s => (
                <option key={s} value={s}>{s === 'All' ? 'All States (केंद्रीय व राज्य)' : s}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Matching User Highlight Banner */}
      {user && (
        <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="text-emerald-950">
              Matched against <strong>{user.name}</strong> ({user.district}, {user.state} • {user.landSizeAcres} Acres). You are eligible for <strong>all {filteredSchemes.length} schemes</strong> below!
            </span>
          </div>
        </div>
      )}

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSchemes.map((scheme) => (
          <div
            key={scheme.id}
            className="glass-card p-6 sm:p-7 rounded-3xl border border-slate-200/90 bg-white space-y-5 flex flex-col justify-between hover:border-emerald-300"
          >
            <div className="space-y-4">
              {/* Badge & Title */}
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900">
                    {scheme.state}
                  </span>
                  <h3 className="text-lg font-black text-slate-900 leading-snug">
                    {scheme.title[language]}
                  </h3>
                </div>

                <div className="text-right shrink-0">
                  <span className="inline-block px-3 py-1.5 rounded-2xl bg-emerald-100 text-emerald-900 font-extrabold text-xs">
                    {scheme.benefitAmount}
                  </span>
                  <p className="text-[10px] text-slate-400 mt-1">{t.schemes.benefit}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-relaxed">
                {scheme.description[language]}
              </p>

              {/* Eligibility Highlights */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5 text-xs">
                <span className="font-bold text-slate-800 text-[11px] block flex items-center gap-1.5">
                  <CheckSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t.schemes.eligibility}:</span>
                </span>
                <ul className="space-y-1 text-slate-600 text-[11px]">
                  {scheme.eligibility.slice(0, 2).map((el, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-500 font-bold">✓</span>
                      <span>{el}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Documents Required */}
              <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                <span className="text-slate-400 font-medium">Documents:</span>
                {scheme.documents.map((doc, idx) => (
                  <span key={idx} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                    {doc}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions Bottom Bar */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{scheme.deadline}</span>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedSchemeForApply(scheme)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs cursor-pointer transition-colors"
                >
                  Eligibility Checklist
                </button>

                <a
                  href={scheme.applyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/25 flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <span>{t.schemes.applyNow}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Step-by-Step Interactive Eligibility Checklist Modal */}
      {selectedSchemeForApply && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 p-6 space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  Eligibility Verification
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">
                  {selectedSchemeForApply.title[language]}
                </h3>
              </div>
              <button
                onClick={() => setSelectedSchemeForApply(null)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="font-bold text-slate-800">Check all criteria applicable to you:</p>
              {selectedSchemeForApply.eligibility.map((el, i) => (
                <label key={i} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer hover:bg-emerald-50/50">
                  <input type="checkbox" defaultChecked className="mt-0.5 accent-emerald-600 w-4 h-4 rounded" />
                  <span className="text-slate-700 text-[11px] leading-relaxed">{el}</span>
                </label>
              ))}
            </div>

            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs">
              <strong className="text-emerald-900 block font-bold mb-1">
                Required Upload Documents:
              </strong>
              <p className="text-emerald-800 text-[11px]">
                {selectedSchemeForApply.documents.join(' • ')}
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <a
                href={selectedSchemeForApply.applyUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs text-center flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/25"
              >
                <span>Proceed to Official Registration Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setSelectedSchemeForApply(null)}
                className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
