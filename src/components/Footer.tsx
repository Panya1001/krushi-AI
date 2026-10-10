import React from 'react';
import { Sprout, PhoneCall, ShieldCheck, Heart, ExternalLink, Leaf } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-emerald-950/60 pt-16 pb-12 mt-20 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-green-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
                <Sprout className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                Krishi<span className="text-emerald-400">AI</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              {language === 'mr' 
                ? 'भारतीय शेतकऱ्यांसाठी संपूर्ण आधुनिक कृषी परिसंस्था. रोग निदान, स्मार्ट कॅमेरा वन्यजीव सुरक्षा, थेट बाजार भाव आणि शासकीय अनुदान.' 
                : language === 'hi' 
                ? 'भारतीय किसानों के लिए सम्पूर्ण स्मार्ट कृषि समाधान। एआई फसल रोग जांच, वन्यजीव सुरक्षा, लाइव मंडी भाव और सरकारी योजनाएं।' 
                : 'India\'s premier AI-powered smart agriculture ecosystem. Crop disease diagnosis, edge wildlife intruder defense, transparent mandi rates, and direct subsidies.'}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800/80">
                <Leaf className="w-3.5 h-3.5" />
                <span>Made for Indian Kisan</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                <span>EN • MR • HI</span>
              </span>
            </div>
          </div>

          {/* Quick Platform Services */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              {language === 'mr' ? 'स्मार्ट सेवा' : language === 'hi' ? 'स्मार्ट सेवाएं' : 'Key Modules'}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => setActiveTab('disease')} className="hover:text-emerald-400 transition-colors text-left cursor-pointer">
                  {t.nav.diseaseDetection}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('wildlife')} className="hover:text-emerald-400 transition-colors text-left cursor-pointer">
                  {t.nav.wildlife}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('market')} className="hover:text-emerald-400 transition-colors text-left cursor-pointer">
                  {t.nav.marketPrices}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('schemes')} className="hover:text-emerald-400 transition-colors text-left cursor-pointer">
                  {t.nav.schemes}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('calculator')} className="hover:text-emerald-400 transition-colors text-left cursor-pointer">
                  {t.nav.calculator}
                </button>
              </li>
            </ul>
          </div>

          {/* Precision Analytics */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              {language === 'mr' ? 'तंत्रज्ञान' : language === 'hi' ? 'तकनीक' : 'AI Intelligence'}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => setActiveTab('crop-rec')} className="hover:text-emerald-400 transition-colors text-left cursor-pointer">
                  {t.nav.cropRec}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('weather-soil')} className="hover:text-emerald-400 transition-colors text-left cursor-pointer">
                  {t.nav.weatherSoil}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('dashboard')} className="hover:text-emerald-400 transition-colors text-left cursor-pointer">
                  {t.nav.dashboard}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('admin')} className="hover:text-emerald-400 transition-colors text-left cursor-pointer">
                  {t.nav.admin}
                </button>
              </li>
            </ul>
          </div>

          {/* National Farmer Helpline Numbers */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5 text-emerald-400">
              <PhoneCall className="w-4 h-4" />
              <span>{language === 'mr' ? 'शेतकरी मदत कक्ष' : language === 'hi' ? 'किसान हेल्पलाइन' : 'Agri Helplines'}</span>
            </h4>
            <div className="space-y-3 text-xs">
              <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Kisan Call Center (24x7 Toll-Free)</p>
                <a href="tel:18001801551" className="text-sm font-bold text-emerald-400 hover:underline">1800-180-1551</a>
              </div>
              <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Wildlife Emergency (Forest Dept)</p>
                <a href="tel:1926" className="text-sm font-bold text-amber-400 hover:underline">1926 (Dial 1926)</a>
              </div>
              <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">PM Fasal Bima Insurance</p>
                <a href="tel:18002005142" className="text-sm font-bold text-blue-400 hover:underline">1800-200-5142</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>© 2026 KrishiAI Inc.</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-400">
              <span>Smart Agriculture Hackathon Platform</span>
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified APMC & ICAR Agronomy Data</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
