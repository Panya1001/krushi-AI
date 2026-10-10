import React, { useState } from 'react';
import { 
  User as UserIcon, 
  MapPin, 
  Phone, 
  Mail, 
  Sprout, 
  Save, 
  Printer, 
  Trash2, 
  CheckCircle2, 
  ShieldCheck, 
  ExternalLink,
  Layers,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export const UserProfilePage: React.FC = () => {
  const { language } = useLanguage();
  const { user, updateProfile, savedScans, removeScan } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [district, setDistrict] = useState(user?.district || '');
  const [village, setVillage] = useState(user?.village || '');
  const [landAcres, setLandAcres] = useState(user?.landSizeAcres || 5.0);
  const [soilType, setSoilType] = useState(user?.soilType || 'Medium Black');
  const [primaryCrops, setPrimaryCrops] = useState(user?.primaryCrops?.join(', ') || 'Soybean, Onion');

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      phone,
      district,
      village,
      landSizeAcres: Number(landAcres),
      soilType,
      primaryCrops: primaryCrops.split(',').map(s => s.trim()).filter(Boolean)
    });
    setSavedSuccess(true);
    confetti({
      particleCount: 60,
      spread: 50,
      origin: { y: 0.6 }
    });
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
          <UserIcon className="w-3.5 h-3.5" />
          <span>Farmer Profile & Saved Agricultural Diagnostic Dossier</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {language === 'mr' ? 'शेतकरी खाते व शेत तपशील' : 'Farm Profile & Saved Records'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Manage your registered land area, soil categorization, and past disease diagnostic prescriptions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Edit Farmer Details Form (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <form onSubmit={handleSave} className="glass-card p-6 sm:p-7 rounded-3xl border border-slate-200/90 bg-white space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120'}
                alt="Profile"
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-emerald-500 shadow-md"
              />
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">{user?.name}</h3>
                <span className="text-[10px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">
                  {user?.role === 'admin' ? 'State Agri Admin' : 'Verified Farmer (शेतकरी)'}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Farmer Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Land (Acres)</label>
                <input
                  type="number"
                  step="0.5"
                  value={landAcres}
                  onChange={(e) => setLandAcres(parseFloat(e.target.value) || 1)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">District</label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Village (गाव)</label>
                <input
                  type="text"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Soil Classification</label>
              <input
                type="text"
                value={soilType}
                onChange={(e) => setSoilType(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Primary Crops (कॉमा देऊन वेगळे करा)</label>
              <input
                type="text"
                value={primaryCrops}
                onChange={(e) => setPrimaryCrops(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                type="submit"
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md shadow-emerald-600/25 flex items-center gap-2 cursor-pointer transition-all"
              >
                <Save className="w-4 h-4" />
                <span>{savedSuccess ? 'Profile Updated!' : 'Save Farm Details'}</span>
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Card</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Saved Diagnostic Disease Scans History (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-slate-900">
              {language === 'mr' ? 'जतन केलेल्या रोग तपासणी पावत्या' : 'Saved Diagnostic Prescriptions'} ({savedScans.length})
            </h3>
            <span className="text-xs text-slate-400">Offline Synced</span>
          </div>

          <div className="space-y-3">
            {savedScans.length === 0 ? (
              <div className="glass-card p-10 rounded-3xl border border-slate-200 text-center text-xs text-slate-500">
                No diagnostic reports saved yet.
              </div>
            ) : (
              savedScans.map((scan) => (
                <div
                  key={scan.id}
                  className="glass-card p-4 rounded-2xl border border-slate-200/90 bg-white space-y-3 text-xs shadow-xs"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={scan.imageUrl}
                        alt={scan.cropName}
                        className="w-14 h-14 rounded-xl object-cover shrink-0 ring-1 ring-slate-200"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-slate-900 text-sm">{scan.diseaseName[language]}</strong>
                          <span className="text-[10px] text-emerald-800 bg-emerald-100 font-bold px-1.5 py-0.5 rounded-md">
                            {scan.confidence}%
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">Crop: {scan.cropName} • Date: {scan.date}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => removeScan(scan.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer transition-colors"
                      title="Remove record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-700">
                    <strong className="text-emerald-900 block font-bold mb-0.5">Prescribed Treatment:</strong>
                    <p>{scan.organicRemedy[0]}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
