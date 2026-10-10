import React, { useState } from 'react';
import { 
  Sprout, 
  ScanSearch, 
  ShieldAlert, 
  TrendingUp, 
  Landmark, 
  Calculator, 
  CloudSun, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Award, 
  Users, 
  Layers, 
  Play, 
  Activity,
  Star,
  Quote,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { sampleDiseaseScans, initialMandiPrices } from '../data/agriData';

interface HomePageProps {
  setActiveTab: (tab: string) => void;
  onOpenMitra: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setActiveTab, onOpenMitra }) => {
  const { language, t } = useLanguage();
  const { user } = useAuth();

  const [activeFeatureTab, setActiveFeatureTab] = useState<'disease' | 'wildlife' | 'mandi'>('disease');

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative pt-6 pb-16 md:pt-12 md:pb-24 overflow-hidden">
        {/* Soft background ambient glow orbs */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-r from-emerald-300/20 via-green-200/20 to-teal-300/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100/80 border border-emerald-300/80 text-emerald-900 text-xs font-bold shadow-xs animate-float">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
              <span>{t.hero.badge}</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              {t.hero.headingStart}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-green-600 to-teal-700">
                {t.hero.headingHighlight}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
              {t.hero.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <button
                onClick={() => setActiveTab('dashboard')}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 hover:from-emerald-700 hover:to-green-800 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/40 hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sprout className="w-4 h-4" />
                <span>{t.hero.ctaStart}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('disease')}
                className="px-6 py-3.5 rounded-2xl bg-white/90 hover:bg-white text-emerald-900 font-bold text-sm border border-emerald-200/90 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
              >
                <ScanSearch className="w-4 h-4 text-emerald-600" />
                <span>{t.hero.ctaScan}</span>
              </button>

              <button
                onClick={() => setActiveTab('wildlife')}
                className="px-6 py-3.5 rounded-2xl bg-rose-50/90 hover:bg-rose-100 text-rose-900 font-bold text-sm border border-rose-200/80 shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span>{t.hero.ctaWildlife}</span>
              </button>
            </div>

            {/* Impact Highlights Bar */}
            <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
              <div className="glass-panel p-4 rounded-2xl text-center border border-emerald-100">
                <p className="text-2xl font-black text-emerald-700">{t.hero.statsTrained}</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {language === 'mr' ? 'रोग निदान अचूकता' : language === 'hi' ? 'रोग पहचान सटीकता' : 'Leaf Disease Accuracy'}
                </p>
              </div>
              <div className="glass-panel p-4 rounded-2xl text-center border border-emerald-100">
                <p className="text-2xl font-black text-emerald-700">{t.hero.statsFarmers}</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {language === 'mr' ? 'नोंदणीकृत शेतकरी' : language === 'hi' ? 'पंजीकृत किसान' : 'Active Farmers'}
                </p>
              </div>
              <div className="glass-panel p-4 rounded-2xl text-center border border-emerald-100">
                <p className="text-2xl font-black text-emerald-700">{t.hero.statsProtected}</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {language === 'mr' ? 'वन्यजीवांपासून सुरक्षित' : language === 'hi' ? 'वन्यजीवों से सुरक्षित' : 'Crop Area Guarded'}
                </p>
              </div>
              <div className="glass-panel p-4 rounded-2xl text-center border border-emerald-100">
                <p className="text-2xl font-black text-emerald-700">{t.hero.statsSubsidies}</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {language === 'mr' ? 'अनुदान वाटप' : language === 'hi' ? 'सब्सिडी राशि' : 'Direct Subsidies'}
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Feature Showcase Interactive Card */}
          <div className="mt-14 max-w-5xl mx-auto">
            <div className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-emerald-200/70 shadow-2xl relative overflow-hidden bg-white/90">
              {/* Badge top right */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                    {language === 'mr' ? 'थेट परस्परसंवादी चाचणी' : language === 'hi' ? 'लाइव इंटरैक्टिव डेमो' : 'Live Interactive Demo Sandbox'}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-2xl border border-slate-200">
                  <button
                    onClick={() => setActiveFeatureTab('disease')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeFeatureTab === 'disease' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    🌱 {language === 'mr' ? 'रोग निदान' : language === 'hi' ? 'रोग पहचान' : 'Disease AI'}
                  </button>
                  <button
                    onClick={() => setActiveFeatureTab('wildlife')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeFeatureTab === 'wildlife' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    🚨 {language === 'mr' ? 'कॅमेरा अलर्ट' : language === 'hi' ? 'वन्यजीव कैमरा' : 'Wildlife Camera'}
                  </button>
                  <button
                    onClick={() => setActiveFeatureTab('mandi')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeFeatureTab === 'mandi' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    📈 {language === 'mr' ? 'मंडी भाव' : language === 'hi' ? 'मंडी भाव' : 'Live APMC'}
                  </button>
                </div>
              </div>

              {/* Showcase Body */}
              <div className="pt-6">
                {activeFeatureTab === 'disease' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div className="space-y-4">
                      <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-100 text-purple-900">
                        {language === 'mr' ? 'एआय संगणक दृष्टी (Computer Vision)' : 'Real-time Leaf Diagnostics'}
                      </span>
                      <h3 className="text-xl font-extrabold text-slate-900">
                        {sampleDiseaseScans[0].diseaseName[language]}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {sampleDiseaseScans[0].symptoms[0]}
                      </p>

                      <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs">
                        <strong className="text-emerald-900 block mb-1">
                          {language === 'mr' ? 'सेंद्रिय व रासायनिक फवारणी प्रमाण:' : 'Prescribed Spray & Biocontrol:'}
                        </strong>
                        <p className="text-emerald-800 text-[11px]">{sampleDiseaseScans[0].organicRemedy[0]}</p>
                      </div>

                      <button
                        onClick={() => setActiveTab('disease')}
                        className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>{language === 'mr' ? 'पूर्ण रोग निदान मॉड्यूल उघडा' : 'Launch Full Crop Scanner'}</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 aspect-video md:aspect-auto h-52 sm:h-64">
                      <img
                        src={sampleDiseaseScans[0].imageUrl}
                        alt="Crop leaf sample"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                        <div className="w-full flex items-center justify-between text-white text-xs">
                          <span className="font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span>Confidence: 96.8%</span>
                          </span>
                          <span className="bg-emerald-500 text-white font-bold px-2 py-0.5 rounded-full text-[10px]">
                            Alternaria Solani
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeFeatureTab === 'wildlife' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div className="space-y-4">
                      <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-100 text-rose-900">
                        {language === 'mr' ? 'शेताचे कुंपण संरक्षण' : 'Smart Edge Sensor Guard'}
                      </span>
                      <h3 className="text-xl font-extrabold text-slate-900">
                        {language === 'mr' ? 'रानडुक्कर घुसखोरी अलर्ट (सेक्टर A)' : 'Wild Boar Perimeter Breach Alert'}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {language === 'mr' 
                          ? 'कॅमेरा क्र. ०१ द्वारे उत्तर बांधावर ३ रानडुकरांचा कळप आढळला. रात्रीच्या वेळी ऊस व मका पिकाचे नुकसान टाळण्यासाठी ध्वनी सायरन सक्रिय.'
                          : 'Cam 01 smart motion analysis identified 3 wild boars attempting fence breach. High-frequency ultrasonic buzzer triggered.'}
                      </p>

                      <div className="p-3 bg-rose-50 rounded-2xl border border-rose-200 text-xs">
                        <strong className="text-rose-900 block mb-1">
                          {language === 'mr' ? 'तातडीने केलेली कारवाई:' : 'Automated Safety Action:'}
                        </strong>
                        <p className="text-rose-800 text-[11px]">
                          {language === 'mr' ? 'सायरन चालू झाला • वनरक्षक व शेतकऱ्याला तत्काळ एसएमएस पाठवला' : 'Acoustic siren pulsed • Forest Guard & SMS alert dispatched'}
                        </p>
                      </div>

                      <button
                        onClick={() => setActiveTab('wildlife')}
                        className="text-xs font-bold text-rose-700 hover:text-rose-800 flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>{language === 'mr' ? 'थेट ४ कॅमेरे व सायरन पॅनेल पहा' : 'View Live 4-Cam Grid & Siren'}</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 aspect-video md:aspect-auto h-52 sm:h-64">
                      <img
                        src="https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=600&auto=format&fit=crop&q=80"
                        alt="Wild Boar intrusion camera capture"
                        className="w-full h-full object-cover"
                      />
                      {/* Bounding box animation */}
                      <div className="absolute top-10 left-12 w-48 h-36 border-2 border-rose-500 bg-rose-500/10 rounded-lg flex flex-col justify-between p-1.5 animate-pulse">
                        <span className="text-[10px] bg-rose-600 text-white font-bold px-1.5 py-0.5 rounded-sm w-fit">
                          Sus scrofa (96.5%)
                        </span>
                        <span className="text-[9px] text-rose-300 font-mono text-right">
                          SECTOR A : ACTIVE
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {activeFeatureTab === 'mandi' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-800">
                        {language === 'mr' ? 'आजचे प्रमुख कृषी उत्पन्न बाजार समिती दर' : 'Real-Time APMC Mandi Rates'}
                      </h4>
                      <button
                        onClick={() => setActiveTab('market')}
                        className="text-xs font-bold text-teal-700 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>View all 200+ Mandis</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {initialMandiPrices.slice(0, 3).map((item) => (
                        <div key={item.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="font-extrabold text-slate-900">{item.cropLocal[language]}</span>
                            <span className="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full text-[10px]">
                              ▲ +{item.change}%
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500">{item.market}</p>
                          <div className="flex items-baseline justify-between pt-1">
                            <span className="text-lg font-black text-emerald-800">₹{item.modalPrice.toLocaleString()}</span>
                            <span className="text-[10px] text-slate-400">MSP: ₹{item.msp}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            {t.features.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {t.features.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature 1: Disease */}
          <div 
            onClick={() => setActiveTab('disease')}
            className="glass-card p-6 rounded-3xl border border-slate-200/80 cursor-pointer space-y-3 hover:border-emerald-400"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <ScanSearch className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">{t.features.diseaseTitle}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{t.features.diseaseDesc}</p>
            <div className="pt-2 text-xs font-bold text-emerald-700 flex items-center gap-1">
              <span>{t.common.viewDetails}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Feature 2: Wildlife */}
          <div 
            onClick={() => setActiveTab('wildlife')}
            className="glass-card p-6 rounded-3xl border border-rose-100 cursor-pointer space-y-3 hover:border-rose-400"
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">{t.features.wildlifeTitle}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{t.features.wildlifeDesc}</p>
            <div className="pt-2 text-xs font-bold text-rose-700 flex items-center gap-1">
              <span>{t.common.viewDetails}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Feature 3: Live Mandi */}
          <div 
            onClick={() => setActiveTab('market')}
            className="glass-card p-6 rounded-3xl border border-slate-200/80 cursor-pointer space-y-3 hover:border-teal-400"
          >
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">{t.features.marketTitle}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{t.features.marketDesc}</p>
            <div className="pt-2 text-xs font-bold text-teal-700 flex items-center gap-1">
              <span>{t.common.viewDetails}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Feature 4: Schemes */}
          <div 
            onClick={() => setActiveTab('schemes')}
            className="glass-card p-6 rounded-3xl border border-slate-200/80 cursor-pointer space-y-3 hover:border-blue-400"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <Landmark className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">{t.features.schemeTitle}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{t.features.schemeDesc}</p>
            <div className="pt-2 text-xs font-bold text-blue-700 flex items-center gap-1">
              <span>{t.common.viewDetails}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Feature 5: Crop Advisory */}
          <div 
            onClick={() => setActiveTab('crop-rec')}
            className="glass-card p-6 rounded-3xl border border-slate-200/80 cursor-pointer space-y-3 hover:border-amber-400"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <Sprout className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">{t.features.cropTitle}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{t.features.cropDesc}</p>
            <div className="pt-2 text-xs font-bold text-amber-700 flex items-center gap-1">
              <span>{t.common.viewDetails}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Feature 6: Profit Calculator */}
          <div 
            onClick={() => setActiveTab('calculator')}
            className="glass-card p-6 rounded-3xl border border-slate-200/80 cursor-pointer space-y-3 hover:border-emerald-400"
          >
            <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center font-bold">
              <Calculator className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">{t.features.profitTitle}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{t.features.profitDesc}</p>
            <div className="pt-2 text-xs font-bold text-green-700 flex items-center gap-1">
              <span>{t.common.viewDetails}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* Authentic Farmer Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs uppercase font-extrabold text-emerald-700 tracking-wider">
            {language === 'mr' ? 'शेतकऱ्यांचे अनुभव' : language === 'hi' ? 'किसानों के अनुभव' : 'Farmer Success Stories'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            {language === 'mr' ? 'शेतकऱ्यांच्या जीवनातील प्रत्यक्ष बदल' : 'Trusted by Farmers Across India'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Testimonial 1 */}
          <div className="glass-card p-6 rounded-3xl space-y-4 border border-slate-200/80 bg-white">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
            </div>
            <p className="text-xs text-slate-700 leading-relaxed italic">
              {language === 'mr'
                ? '"माझ्या टोमॅटो पिकावर करपा आला होता. कृषीAI वर फोटो अपलोड करताच ५ सेकंदात औषध व प्रमाण मिळाले. दुसऱ्याच दिवशी फवारणी केली आणि पीक वाचले!"'
                : '"Leaf curl attacked my tomato crop. KrishiAI accurately diagnosed Alternaria and gave the exact organic spray dosage within 5 seconds."'}
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                alt="Farmer Ashok Patil"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500/30"
              />
              <div>
                <p className="text-xs font-bold text-slate-900">Ashok Patil</p>
                <p className="text-[10px] text-slate-500">Niphad, Nashik (Maharashtra)</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="glass-card p-6 rounded-3xl space-y-4 border border-slate-200/80 bg-white">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
            </div>
            <p className="text-xs text-slate-700 leading-relaxed italic">
              {language === 'mr'
                ? '"रात्रीच्या वेळी रानडुकरांचा कळप ऊस शेतात घुसायचा. आता कॅमेरा सायरनमुळे जनावरे कुंपणावरूनच पळून जातात. आमचे लाखो रुपयांचे नुकसान टळले."'
                : '"Wild boars used to destroy our sugarcane nursery at night. The smart camera automated siren deters them before they can even breach the fence."'}
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
                alt="Farmer Harpreet Singh"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500/30"
              />
              <div>
                <p className="text-xs font-bold text-slate-900">Harpreet Singh</p>
                <p className="text-[10px] text-slate-500">Samrala, Ludhiana (Punjab)</p>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="glass-card p-6 rounded-3xl space-y-4 border border-slate-200/80 bg-white">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
            </div>
            <p className="text-xs text-slate-700 leading-relaxed italic">
              {language === 'hi'
                ? '"कुसुम सोलर पंप योजना की पूरी जानकारी और आवेदन की प्रक्रिया इस ऐप से मिली। आज मुझे 90% सब्सिडी पर 5HP का सोलर पंप मिल चुका है!"'
                : '"Learned the entire eligibility checklist for PM-KUSUM 90% solar pump on KrishiAI. The application was smooth and approved within 3 weeks."'}
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80"
                alt="Farmer Sunita Yadav"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500/30"
              />
              <div>
                <p className="text-xs font-bold text-slate-900">Sunita Yadav</p>
                <p className="text-[10px] text-slate-500">Meerut (Uttar Pradesh)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Krishi AI Assistant Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 bg-gradient-to-r from-emerald-800 via-green-800 to-teal-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-300" />
              <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-200">
                {language === 'mr' ? '२४x७ डिजिटल कृषी सहाय्यक' : 'Speak or Type in Your Language'}
              </span>
            </div>
            <h3 className="text-2xl font-black">
              {language === 'mr' ? 'कोणतीही शंका? विचारा "कृषीAI मित्र" ला!' : 'Have a farming doubt? Consult KrishiAI Mitra'}
            </h3>
            <p className="text-xs text-emerald-100/80 leading-relaxed">
              {language === 'mr' 
                ? 'माइक बटण दाबून आपल्या आवाजात बोला. मराठी, हिंदी किंवा इंग्रजीत तात्काळ अचूक उत्तरे ऐका.'
                : 'Click voice microphone to ask questions in Marathi, Hindi, or English. Listen to audio spoken back!'}
            </p>
          </div>

          <button
            onClick={onOpenMitra}
            className="px-6 py-3.5 rounded-2xl bg-white text-emerald-900 font-extrabold text-xs shadow-lg hover:bg-emerald-50 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>{t.chat.title}</span>
          </button>
        </div>
      </section>
    </div>
  );
};
