import React, { useState } from 'react';
import { 
  Sprout, 
  Bell, 
  Globe, 
  Menu, 
  X, 
  ShieldAlert, 
  TrendingUp, 
  Calculator, 
  CloudSun, 
  UserCheck, 
  ScanSearch, 
  Landmark, 
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { Language } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenNotifications: () => void;
  onOpenAuth: () => void;
  onOpenMitra: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenNotifications,
  onOpenAuth,
  onOpenMitra,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const { user, logout, login } = useAuth();
  const { unreadCount } = useNotifications();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [demoDropdownOpen, setDemoDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: t.nav.home },
    { id: 'dashboard', label: t.nav.dashboard },
    { id: 'disease', label: t.nav.diseaseDetection, icon: ScanSearch },
    { id: 'crop-rec', label: t.nav.cropRec },
    { id: 'wildlife', label: t.nav.wildlife, icon: ShieldAlert, highlight: true },
    { id: 'market', label: t.nav.marketPrices, icon: TrendingUp },
    { id: 'schemes', label: t.nav.schemes, icon: Landmark },
    { id: 'calculator', label: t.nav.calculator, icon: Calculator },
    { id: 'weather-soil', label: t.nav.weatherSoil, icon: CloudSun },
    { id: 'profile', label: t.nav.profile },
  ];

  if (user?.role === 'admin') {
    navLinks.push({ id: 'admin', label: t.nav.admin });
  }

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 border-b border-emerald-100/80 shadow-xs">
      {/* Live Market Ticker Strip */}
      <div className="bg-gradient-to-r from-emerald-900 via-green-800 to-teal-900 text-white text-xs py-1.5 px-4 overflow-hidden shadow-inner">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-semibold text-emerald-300 shrink-0">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>{t.hero.liveBadge}:</span>
          </div>
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar whitespace-nowrap text-xs font-medium text-slate-100">
            <span className="flex items-center gap-1.5">
              <span>🧅 {language === 'mr' ? 'कांदा (लासलगाव)' : language === 'hi' ? 'प्याज (लासलगांव)' : 'Onion (Lasalgaon)'}:</span>
              <strong className="text-emerald-300">₹2,890/Q</strong>
              <span className="text-emerald-400 text-[10px]">▲ +5.8%</span>
            </span>
            <span className="text-emerald-600/60">•</span>
            <span className="flex items-center gap-1.5">
              <span>🌱 {language === 'mr' ? 'सोयाबीन (नाशिक)' : language === 'hi' ? 'सोयाबीन (नासिक)' : 'Soybean (Nashik)'}:</span>
              <strong className="text-emerald-300">₹4,980/Q</strong>
              <span className="text-emerald-400 text-[10px]">▲ +3.2%</span>
            </span>
            <span className="text-emerald-600/60">•</span>
            <span className="flex items-center gap-1.5">
              <span>🌾 {language === 'mr' ? 'गहू (इंदूर)' : language === 'hi' ? 'गेहूं (इंदौर)' : 'Wheat (Indore)'}:</span>
              <strong className="text-emerald-300">₹3,180/Q</strong>
              <span className="text-emerald-400 text-[10px]">▲ +2.1%</span>
            </span>
            <span className="text-emerald-600/60">•</span>
            <span className="flex items-center gap-1.5">
              <span>☁️ {language === 'mr' ? 'कापूस (राजकोट)' : language === 'hi' ? 'कपास (राजकोट)' : 'Cotton (Rajkot)'}:</span>
              <strong className="text-emerald-300">₹7,540/Q</strong>
              <span className="text-amber-300 text-[10px]">▼ -1.2%</span>
            </span>
            <span className="text-emerald-600/60">•</span>
            <span className="flex items-center gap-1.5">
              <span>🚨 {language === 'mr' ? 'वन्यजीव कुंपण स्थिती: सुरक्षित' : language === 'hi' ? 'खेत सुरक्षा: सक्रिय' : 'Perimeter: Guarded'}</span>
            </span>
          </div>
          <button 
            onClick={onOpenMitra}
            className="hidden md:flex items-center gap-1.5 text-xs text-emerald-200 hover:text-white bg-emerald-800/80 hover:bg-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-600/50 transition-all shrink-0 cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-emerald-300" />
            <span>{language === 'mr' ? 'कृषी मित्र विचारा' : language === 'hi' ? 'कृषि मित्र से पूछें' : 'Ask Krishi Mitra'}</span>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 via-green-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/25 group-hover:scale-105 transition-transform duration-200 border border-white/40">
              <Sprout className="w-6 h-6 text-emerald-50" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                  Krishi<span className="text-emerald-600">AI</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-sm border border-emerald-200">
                  {language === 'mr' ? 'कृषी' : language === 'hi' ? 'कृषि' : 'Kisan'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium line-clamp-1 -mt-0.5 hidden sm:block">
                {language === 'mr' ? 'भारतीय शेतकऱ्यांचे स्मार्ट एआय व्यासपीठ' : language === 'hi' ? 'भारतीय किसानों का स्मार्ट कृषि मंच' : 'Smart Agriculture Platform'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all relative flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                      : 'text-slate-700 hover:text-emerald-800 hover:bg-emerald-50/80'
                  }`}
                >
                  {link.highlight && (
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span>
                  )}
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Tools: Language, Notifications, User */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-emerald-50 text-slate-800 border border-slate-200 hover:border-emerald-300 transition-all cursor-pointer"
                title="Change Language"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-600" />
                <span className="uppercase">{language}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {langDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-36 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onMouseLeave={() => setLangDropdownOpen(false)}
                >
                  <button
                    onClick={() => { setLanguage('mr'); setLangDropdownOpen(false); }}
                    className={`w-full px-3 py-2 text-left text-xs font-semibold flex items-center justify-between cursor-pointer ${
                      language === 'mr' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>मराठी</span>
                    {language === 'mr' && <span className="text-emerald-600 text-xs">✓</span>}
                  </button>
                  <button
                    onClick={() => { setLanguage('hi'); setLangDropdownOpen(false); }}
                    className={`w-full px-3 py-2 text-left text-xs font-semibold flex items-center justify-between cursor-pointer ${
                      language === 'hi' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>हिंदी</span>
                    {language === 'hi' && <span className="text-emerald-600 text-xs">✓</span>}
                  </button>
                  <button
                    onClick={() => { setLanguage('en'); setLangDropdownOpen(false); }}
                    className={`w-full px-3 py-2 text-left text-xs font-semibold flex items-center justify-between cursor-pointer ${
                      language === 'en' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>English</span>
                    {language === 'en' && <span className="text-emerald-600 text-xs">✓</span>}
                  </button>
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2 rounded-xl text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors border border-slate-200/80 cursor-pointer"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* User Profile / Quick Switcher */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDemoDropdownOpen(!demoDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-emerald-50/80 hover:bg-emerald-100/80 text-emerald-950 border border-emerald-200 transition-all cursor-pointer"
                >
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'}
                    alt={user.name}
                    className="w-7 h-7 rounded-lg object-cover ring-1 ring-emerald-500/50"
                  />
                  <div className="text-left hidden md:block">
                    <p className="text-xs font-bold leading-none line-clamp-1 text-slate-800">{user.name.split(' ')[0]}</p>
                    <p className="text-[10px] text-emerald-700 font-medium">
                      {user.role === 'admin' ? 'Agri Admin' : `${user.district} (${user.landSizeAcres} Ac)`}
                    </p>
                  </div>
                  <ChevronDown className="w-3 h-3 text-emerald-700 hidden md:block" />
                </button>

                {demoDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in duration-150"
                    onMouseLeave={() => setDemoDropdownOpen(false)}
                  >
                    <div className="px-3 py-2 border-b border-slate-100 text-xs">
                      <p className="font-bold text-slate-900">{user.name}</p>
                      <p className="text-[11px] text-slate-500">{user.email}</p>
                    </div>

                    <div className="py-1">
                      <p className="text-[10px] font-bold text-slate-400 px-3 uppercase tracking-wider py-1">Quick Demo Switch</p>
                      <button
                        onClick={() => { login('farmer_mh'); setDemoDropdownOpen(false); }}
                        className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 flex items-center justify-between"
                      >
                        <span>👨‍🌾 Ramesh Patil (MH Farmer)</span>
                      </button>
                      <button
                        onClick={() => { login('farmer_pb'); setDemoDropdownOpen(false); }}
                        className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 flex items-center justify-between"
                      >
                        <span>🌾 Gurpreet Singh (PB Farmer)</span>
                      </button>
                      <button
                        onClick={() => { login('admin'); setDemoDropdownOpen(false); }}
                        className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 flex items-center justify-between"
                      >
                        <span>🛡️ Dr. Swati (Admin Officer)</span>
                      </button>
                    </div>

                    <div className="border-t border-slate-100 pt-1">
                      <button
                        onClick={() => { handleNavClick('profile'); setDemoDropdownOpen(false); }}
                        className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-700 hover:bg-emerald-50"
                      >
                        {t.nav.profile}
                      </button>
                      <button
                        onClick={() => { logout(); setDemoDropdownOpen(false); }}
                        className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50"
                      >
                        {t.nav.logout}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all cursor-pointer"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.nav.login}</span>
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-slate-700 hover:bg-emerald-50 border border-slate-200 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-emerald-100 bg-white/95 backdrop-blur-lg px-4 pt-3 pb-6 max-h-[85vh] overflow-y-auto shadow-2xl">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`p-2.5 rounded-xl text-left text-xs font-semibold flex items-center gap-2 ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-50 text-slate-800 hover:bg-emerald-50'
                  }`}
                >
                  {link.highlight && <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>}
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>

          <div className="border-t border-slate-100 pt-3 flex flex-col gap-2">
            <button
              onClick={() => { onOpenMitra(); setMobileMenuOpen(false); }}
              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t.chat.title}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
