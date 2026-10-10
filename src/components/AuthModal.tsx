import React, { useState } from 'react';
import { 
  X, 
  Sprout, 
  Smartphone, 
  Lock, 
  User as UserIcon, 
  MapPin, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  KeyRound
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, loginCustom } = useAuth();
  const { language } = useLanguage();

  const [mode, setMode] = useState<'login' | 'signup' | 'forgot' | 'otp'>('login');
  const [phone, setPhone] = useState('9822481920');
  const [name, setName] = useState('');
  const [district, setDistrict] = useState('Nashik');
  const [landAcres, setLandAcres] = useState('5.0');
  const [otp, setOtp] = useState(['4', '8', '2', '1']);
  const [otpSent, setOtpSent] = useState(false);

  if (!isOpen) return null;

  const handleQuickDemoLogin = (roleKey: 'farmer_mh' | 'farmer_pb' | 'admin') => {
    login(roleKey);
    onClose();
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpSent(true);
    setMode('otp');
  };

  const handleOtpVerify = (e: React.FormEvent) => {
    e.preventDefault();
    loginCustom({
      name: name || 'Kisan Bandhu',
      phone: `+91 ${phone}`,
      district: district,
      landSizeAcres: parseFloat(landAcres) || 4.0,
      state: 'Maharashtra',
      village: 'Grampanchayat',
      role: 'farmer'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 z-10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="p-6 bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 text-white text-center relative overflow-hidden">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 mb-3 shadow-md">
            <Sprout className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-black tracking-tight">
            Krishi<span className="text-emerald-200">AI</span> {language === 'mr' ? 'शेतकरी पोर्टल' : language === 'hi' ? 'किसान पोर्टल' : 'Farmer Portal'}
          </h2>
          <p className="text-xs text-emerald-100 mt-1">
            {language === 'mr' ? 'आपल्या शेताची संपूर्ण माहिती एकाच ठिकाणी' : language === 'hi' ? 'स्मार्ट खेती, सुरक्षित फसल, अधिकतम मुनाफा' : 'Smart Agriculture Intelligence Suite'}
          </p>
        </div>

        {/* Instant 1-Click Demo Presets Bar */}
        <div className="bg-emerald-50/70 p-4 border-b border-emerald-100">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Hackathon Quick 1-Click Demo Profiles:</span>
          </div>
          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={() => handleQuickDemoLogin('farmer_mh')}
              className="px-3 py-2 rounded-xl bg-white hover:bg-emerald-100/60 text-slate-800 border border-emerald-200 text-xs font-semibold flex items-center justify-between transition-all shadow-xs cursor-pointer text-left"
            >
              <span>👨‍🌾 <strong>Ramesh Patil</strong> (Maharashtra, 5.5 Ac)</span>
              <span className="text-emerald-700 text-[11px] font-bold">Auto-Login →</span>
            </button>
            <button
              onClick={() => handleQuickDemoLogin('farmer_pb')}
              className="px-3 py-2 rounded-xl bg-white hover:bg-emerald-100/60 text-slate-800 border border-emerald-200 text-xs font-semibold flex items-center justify-between transition-all shadow-xs cursor-pointer text-left"
            >
              <span>🌾 <strong>Gurpreet Singh</strong> (Punjab, 8.0 Ac)</span>
              <span className="text-emerald-700 text-[11px] font-bold">Auto-Login →</span>
            </button>
            <button
              onClick={() => handleQuickDemoLogin('admin')}
              className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-between transition-all shadow-xs cursor-pointer text-left"
            >
              <span>🛡️ <strong>Dr. Swati Kulkarni</strong> (Agri Admin Officer)</span>
              <span className="text-emerald-300 text-[11px] font-bold">Admin Console →</span>
            </button>
          </div>
        </div>

        {/* Regular Auth Forms */}
        <div className="p-6">
          {mode === 'login' && (
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-slate-800">
                  {language === 'mr' ? 'मोबाईल नंबर किंवा ओटीपी' : language === 'hi' ? 'मोबाइल नंबर द्वारा लॉगिन' : 'Mobile Number Login'}
                </span>
                <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">
                  Instant SMS OTP
                </span>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Mobile Number</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">+91</span>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98224 81920"
                    className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <Smartphone className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Send 4-Digit OTP</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 text-center text-xs text-slate-500">
                <span>New farmer? </span>
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="font-bold text-emerald-700 hover:underline cursor-pointer"
                >
                  Create farm profile
                </button>
              </div>
            </form>
          )}

          {mode === 'signup' && (
            <form onSubmit={handlePhoneSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Balasaheb Patil"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">District / Taluka</label>
                <input
                  type="text"
                  required
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="e.g. Nashik / Niphad"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Landholding (Acres)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={landAcres}
                    onChange={(e) => setLandAcres(e.target.value)}
                    placeholder="5.0"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Mobile Phone</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98224..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Register with Mobile OTP</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-1 text-center text-xs text-slate-500">
                <span>Already registered? </span>
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="font-bold text-emerald-700 hover:underline cursor-pointer"
                >
                  Log in here
                </button>
              </div>
            </form>
          )}

          {mode === 'otp' && (
            <form onSubmit={handleOtpVerify} className="space-y-4 text-center">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-1">
                <KeyRound className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Enter Verification Code</h3>
              <p className="text-xs text-slate-500">
                4-digit code sent to <strong>+91 {phone}</strong>
              </p>

              {/* OTP Digits */}
              <div className="flex justify-center gap-3 my-4">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const newOtp = [...otp];
                      newOtp[i] = e.target.value;
                      setOtp(newOtp);
                    }}
                    className="w-12 h-12 text-center text-lg font-bold bg-slate-50 border-2 border-emerald-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                ))}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Verify & Access Dashboard</span>
              </button>

              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-xs text-slate-400 hover:text-slate-600 block mx-auto cursor-pointer"
              >
                ← Back to Mobile Entry
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
