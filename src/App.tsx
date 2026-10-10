import React, { useState } from 'react';
import { Sparkles, Bot } from 'lucide-react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ChatbotModal } from './components/ChatbotModal';
import { NotificationModal } from './components/NotificationModal';
import { AuthModal } from './components/AuthModal';

import { HomePage } from './pages/HomePage';
import { FarmerDashboard } from './pages/FarmerDashboard';
import { DiseaseDetectionPage } from './pages/DiseaseDetectionPage';
import { CropRecommendationPage } from './pages/CropRecommendationPage';
import { WildlifeAlertPage } from './pages/WildlifeAlertPage';
import { MarketPricesPage } from './pages/MarketPricesPage';
import { GovtSchemesPage } from './pages/GovtSchemesPage';
import { ProfitCalculatorPage } from './pages/ProfitCalculatorPage';
import { WeatherSoilPage } from './pages/WeatherSoilPage';
import { UserProfilePage } from './pages/UserProfilePage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

const AppContent: React.FC = () => {
  const { language, t } = useLanguage();
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState('home');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMitraOpen, setIsMitraOpen] = useState(false);

  // Parameter handoff to profit calculator
  const [calcParams, setCalcParams] = useState<{ crop: string; acres: number }>({
    crop: 'Soybean',
    acres: 4.5
  });

  const handleNavigateToCalculator = (crop: string, acres: number) => {
    setCalcParams({ crop, acres });
    setActiveTab('calculator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-emerald-50/30 to-green-100/20 text-slate-800">
      {/* Sticky Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenNotifications={() => setIsNotificationOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenMitra={() => setIsMitraOpen(true)}
      />

      {/* Main Page Body */}
      <main className="flex-1 w-full">
        {activeTab === 'home' && (
          <HomePage
            setActiveTab={setActiveTab}
            onOpenMitra={() => setIsMitraOpen(true)}
          />
        )}

        {activeTab === 'dashboard' && (
          <FarmerDashboard
            setActiveTab={setActiveTab}
            onOpenMitra={() => setIsMitraOpen(true)}
          />
        )}

        {activeTab === 'disease' && <DiseaseDetectionPage />}

        {activeTab === 'crop-rec' && (
          <CropRecommendationPage
            onNavigateToCalculator={handleNavigateToCalculator}
          />
        )}

        {activeTab === 'wildlife' && <WildlifeAlertPage />}

        {activeTab === 'market' && <MarketPricesPage />}

        {activeTab === 'schemes' && <GovtSchemesPage />}

        {activeTab === 'calculator' && (
          <ProfitCalculatorPage
            initialCrop={calcParams.crop}
            initialAcres={calcParams.acres}
          />
        )}

        {activeTab === 'weather-soil' && <WeatherSoilPage />}

        {activeTab === 'profile' && <UserProfilePage />}

        {activeTab === 'admin' && <AdminDashboardPage />}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Floating AI Mitra Assistant Launcher Bubble */}
      <aside aria-label="Krishi Mitra Floating Assistant" className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsMitraOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-600 via-green-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-extrabold text-xs shadow-2xl shadow-emerald-700/50 hover:shadow-emerald-600/70 hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-white/60 cursor-pointer"
          title="Ask KrishiAI Mitra"
        >
          {/* Subtle pulse aura */}
          <span className="absolute -inset-1 rounded-full bg-emerald-400/40 animate-ping pointer-events-none opacity-75"></span>
          
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <Bot className="w-4 h-4 text-emerald-100" />
          </div>

          <span className="tracking-tight">
            {language === 'mr' ? 'कृषीAI मित्र' : language === 'hi' ? 'कृषिAI मित्र' : 'Krishi Mitra'}
          </span>

          <span className="inline-block w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
        </button>
      </aside>

      {/* Overlays and Modals */}
      <ChatbotModal
        isOpen={isMitraOpen}
        onClose={() => setIsMitraOpen(false)}
      />

      <NotificationModal
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
    </div>
  );
};

export function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <NotificationProvider>
          <AppContent />
        </NotificationProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
