import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Landmark, 
  TrendingUp, 
  ShieldAlert, 
  Plus, 
  Send, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  AlertTriangle,
  Radio,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useNotifications } from '../context/NotificationContext';
import { initialGovtSchemes, initialMandiPrices, initialCameras } from '../data/agriData';
import { GovtScheme, MandiPrice } from '../types';

export const AdminDashboardPage: React.FC = () => {
  const { language } = useLanguage();
  const { addNotification } = useNotifications();

  const [activeTab, setActiveTab] = useState<'schemes' | 'market' | 'wildlife' | 'broadcast'>('schemes');
  const [schemes, setSchemes] = useState<GovtScheme[]>(initialGovtSchemes);
  const [mandiPrices, setMandiPrices] = useState<MandiPrice[]>(initialMandiPrices);

  // New scheme modal form state
  const [showAddScheme, setShowAddScheme] = useState(false);
  const [newSchemeTitle, setNewSchemeTitle] = useState('');
  const [newSchemeBenefit, setNewSchemeBenefit] = useState('');
  const [newSchemeState, setNewSchemeState] = useState('Maharashtra');

  // Broadcast notification state
  const [broadcastTitle, setBroadcastTitle] = useState('⚡ Hailstorm Warning in Nashik & Niphad');
  const [broadcastMessage, setBroadcastMessage] = useState('Unseasonal convective thunderstorms predicted between 04:00 PM and 07:00 PM. Cover harvested onion heaps.');
  const [broadcastSent, setBroadcastSent] = useState(false);

  const handleAddScheme = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSchemeTitle.trim()) return;

    const newObj: GovtScheme = {
      id: 'sch_' + Date.now(),
      title: { en: newSchemeTitle, mr: newSchemeTitle, hi: newSchemeTitle },
      description: {
        en: 'Newly notified agricultural initiative published by State Agri Department.',
        mr: 'कृषी विभागामार्फत नव्याने जाहीर करण्यात आलेली योजना.',
        hi: 'कृषि विभाग द्वारा हाल ही में शुरू की गई योजना।'
      },
      category: 'subsidy',
      state: newSchemeState,
      benefitAmount: newSchemeBenefit || 'Up to ₹25,000 grant',
      deadline: 'Active for Kharif',
      eligibility: ['Aadhaar linked 7/12 landholding extract', 'Resident of respective state'],
      documents: ['7/12 Extract', 'Bank Passbook', 'Aadhaar Card'],
      applyUrl: 'https://mahadbt.maharashtra.gov.in',
      isActive: true
    };

    setSchemes(prev => [newObj, ...prev]);
    setShowAddScheme(false);
    setNewSchemeTitle('');
    setNewSchemeBenefit('');
  };

  const handleUpdatePrice = (id: string, newRate: number) => {
    setMandiPrices(prev => prev.map(m => m.id === id ? { ...m, modalPrice: newRate } : m));
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    addNotification({
      title: broadcastTitle,
      message: broadcastMessage,
      type: 'weather',
      linkTab: 'weather'
    });
    setBroadcastSent(true);
    setTimeout(() => setBroadcastSent(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-emerald-400 text-xs font-bold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Agricultural Directorate & Field Officer Administration Console</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          KrishiAI Command Center
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Manage state agricultural schemes, push live APMC market updates, oversee wildlife cameras, and broadcast emergency alerts to 42,000+ farmers.
        </p>
      </div>

      {/* Admin KPI Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-3xl border border-slate-200/90 text-center bg-white">
          <span className="text-[10px] text-slate-400 uppercase font-bold">Registered Farmers</span>
          <p className="text-2xl font-black text-slate-900 mt-1">42,150</p>
          <span className="text-[10px] text-emerald-700 font-bold">↑ +380 This Week</span>
        </div>

        <div className="glass-card p-5 rounded-3xl border border-slate-200/90 text-center bg-white">
          <span className="text-[10px] text-slate-400 uppercase font-bold">Smart Wildlife Cameras</span>
          <p className="text-2xl font-black text-slate-900 mt-1">124 Active</p>
          <span className="text-[10px] text-emerald-700 font-bold">99.2% Uptime</span>
        </div>

        <div className="glass-card p-5 rounded-3xl border border-slate-200/90 text-center bg-white">
          <span className="text-[10px] text-slate-400 uppercase font-bold">Disease Scans Today</span>
          <p className="text-2xl font-black text-slate-900 mt-1">1,482 Scans</p>
          <span className="text-[10px] text-emerald-700 font-bold">96.4% Precision</span>
        </div>

        <div className="glass-card p-5 rounded-3xl border border-slate-200/90 text-center bg-white">
          <span className="text-[10px] text-slate-400 uppercase font-bold">Subsidies Facilitated</span>
          <p className="text-2xl font-black text-emerald-700 mt-1">₹8.4 Cr</p>
          <span className="text-[10px] text-slate-400">Direct DBT Transfer</span>
        </div>
      </div>

      {/* Management Navigation Tabs */}
      <div className="flex border-b border-slate-200 overflow-x-auto no-scrollbar gap-2">
        <button
          onClick={() => setActiveTab('schemes')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'schemes' ? 'border-emerald-600 text-emerald-800' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          🏛️ Manage Government Schemes ({schemes.length})
        </button>
        <button
          onClick={() => setActiveTab('market')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'market' ? 'border-emerald-600 text-emerald-800' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          📈 Live APMC Rate Manager ({mandiPrices.length})
        </button>
        <button
          onClick={() => setActiveTab('broadcast')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'broadcast' ? 'border-emerald-600 text-emerald-800' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          📢 Broadcast Alert to Farmers
        </button>
      </div>

      {/* Tab 1: Manage Schemes */}
      {activeTab === 'schemes' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900">Registered Government Subsidies & Grants</h3>
            <button
              onClick={() => setShowAddScheme(true)}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Scheme</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {schemes.map((s) => (
              <div key={s.id} className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-sm">{s.title.en}</h4>
                  <span className="text-[10px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">
                    {s.benefitAmount}
                  </span>
                </div>
                <p className="text-slate-500 text-[11px] line-clamp-2">{s.description.en}</p>
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-slate-400 text-[10px]">
                  <span>State: {s.state}</span>
                  <span className="text-emerald-700 font-bold">Active & Open</span>
                </div>
              </div>
            ))}
          </div>

          {/* Add Scheme Modal */}
          {showAddScheme && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
              <form onSubmit={handleAddScheme} className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4 text-xs">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-sm text-slate-900">Add New Agricultural Scheme</h3>
                  <button type="button" onClick={() => setShowAddScheme(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">✕</button>
                </div>

                <div>
                  <label className="block font-semibold text-slate-600 mb-1">Scheme Title</label>
                  <input
                    type="text"
                    required
                    value={newSchemeTitle}
                    onChange={(e) => setNewSchemeTitle(e.target.value)}
                    placeholder="e.g. MahaDBT Drip & Mulching Paper Subsidy"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-600 mb-1">Benefit / Subsidy Amount</label>
                  <input
                    type="text"
                    required
                    value={newSchemeBenefit}
                    onChange={(e) => setNewSchemeBenefit(e.target.value)}
                    placeholder="e.g. ₹25,000 / Acre or 60% Subsidy"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-600 mb-1">State / Scope</label>
                  <select
                    value={newSchemeState}
                    onChange={(e) => setNewSchemeState(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  >
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="All India">All India (Central)</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                  </select>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl"
                  >
                    Save & Publish to Farmers
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddScheme(false)}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Manage Mandi Rates */}
      {activeTab === 'market' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900">APMC Live Rate Bulletin Manager</h3>
            <span className="text-xs text-slate-400">Updates sync in real-time across farmer mobile screens</span>
          </div>

          <div className="glass-card rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Commodity</th>
                    <th className="p-3">APMC Market</th>
                    <th className="p-3">MSP</th>
                    <th className="p-3">Current Modal Rate (₹/Q)</th>
                    <th className="p-3">Quick Update</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {mandiPrices.map((m) => (
                    <tr key={m.id} className="hover:bg-slate-50/80">
                      <td className="p-3 font-bold text-slate-900">{m.crop} ({m.variety})</td>
                      <td className="p-3 text-slate-600">{m.market}, {m.district}</td>
                      <td className="p-3 text-slate-500">₹{m.msp}</td>
                      <td className="p-3 font-extrabold text-emerald-800">₹{m.modalPrice}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            defaultValue={m.modalPrice}
                            onBlur={(e) => handleUpdatePrice(m.id, parseInt(e.target.value) || m.modalPrice)}
                            className="w-24 px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold"
                          />
                          <span className="text-[10px] text-slate-400">Blur to save</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Broadcast Notification Alert */}
      {activeTab === 'broadcast' && (
        <div className="max-w-2xl mx-auto glass-card p-6 sm:p-7 rounded-3xl border border-slate-200 bg-white space-y-5">
          <div className="space-y-1">
            <h3 className="text-base font-extrabold text-slate-900">Broadcast Agricultural Push Notification</h3>
            <p className="text-xs text-slate-500">Sends high-priority SMS and in-app banners to farmers registered in targeted district.</p>
          </div>

          <form onSubmit={handleSendBroadcast} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-600 mb-1">Notification Title</label>
              <input
                type="text"
                required
                value={broadcastTitle}
                onChange={(e) => setBroadcastTitle(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-600 mb-1">Message Content (Advisory / Warning)</label>
              <textarea
                rows={3}
                required
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl leading-relaxed"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <Send className="w-4 h-4 text-emerald-400" />
              <span>{broadcastSent ? 'Alert Dispatched to 42,150 Farmers!' : 'Dispatch Broadcast Now'}</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
