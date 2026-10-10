import React, { useState } from 'react';
import { 
  Calculator, 
  Coins, 
  TrendingUp, 
  TrendingDown, 
  Scale, 
  Printer, 
  Bookmark, 
  Sparkles,
  PieChart,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

interface ProfitCalculatorPageProps {
  initialCrop?: string;
  initialAcres?: number;
}

export const ProfitCalculatorPage: React.FC<ProfitCalculatorPageProps> = ({ 
  initialCrop = 'Soybean', 
  initialAcres = 4.0 
}) => {
  const { language, t } = useLanguage();
  const { user } = useAuth();

  const [crop, setCrop] = useState(initialCrop);
  const [acres, setAcres] = useState(user?.landSizeAcres || initialAcres);

  // Cost items (per acre or total)
  const [seedCost, setSeedCost] = useState(3800);
  const [fertilizerCost, setFertilizerCost] = useState(5500);
  const [pesticideCost, setPesticideCost] = useState(3200);
  const [laborCost, setLaborCost] = useState(6500);
  const [irrigationCost, setIrrigationCost] = useState(2400);
  const [machineryCost, setMachineryCost] = useState(4800);
  const [transportCost, setTransportCost] = useState(1800);

  // Revenue parameters
  const [expectedYieldPerAcre, setExpectedYieldPerAcre] = useState(11.0); // Quintals
  const [sellingPricePerQuintal, setSellingPricePerQuintal] = useState(4980); // ₹

  const [savedSuccess, setSavedSuccess] = useState(false);

  // Calculations
  const costPerAcre = seedCost + fertilizerCost + pesticideCost + laborCost + irrigationCost + machineryCost + transportCost;
  const totalCost = costPerAcre * acres;

  const totalYieldQuintals = expectedYieldPerAcre * acres;
  const grossRevenue = totalYieldQuintals * sellingPricePerQuintal;

  const netProfit = grossRevenue - totalCost;
  const netProfitPerAcre = Math.round(netProfit / acres);
  const profitMarginPercent = totalCost > 0 ? ((netProfit / grossRevenue) * 100).toFixed(1) : '0';
  const breakEvenPrice = totalYieldQuintals > 0 ? Math.round(totalCost / totalYieldQuintals) : 0;

  const handleSaveCalculation = () => {
    setSavedSuccess(true);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-bold">
          <Calculator className="w-3.5 h-3.5" />
          <span>Agricultural Economics & ROI Modeler</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {t.calculator.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          {t.calculator.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Cost Controls (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          <div className="glass-card p-6 rounded-3xl border border-slate-200/90 bg-white space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 pb-2 border-b border-slate-100">
              {language === 'mr' ? 'पीक व लागवड खर्च तपशील (प्रति एकर)' : 'Crop & Production Expenses (Per Acre)'}
            </h3>

            {/* Crop & Land Size */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">{t.calculator.selectCrop}</label>
                <select
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                >
                  <option value="Soybean">Soybean (सोयाबीन)</option>
                  <option value="Onion">Onion (कांदा)</option>
                  <option value="Cotton">Cotton (कापूस)</option>
                  <option value="Wheat">Wheat (गहू)</option>
                  <option value="Tomato">Tomato (टोमॅटो)</option>
                  <option value="Sugarcane">Sugarcane (ऊस)</option>
                  <option value="Gram">Chana / Gram (हरभरा)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">{t.calculator.acres}</label>
                <input
                  type="number"
                  step="0.5"
                  min="0.5"
                  value={acres}
                  onChange={(e) => setAcres(parseFloat(e.target.value) || 1)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Individual Cost inputs */}
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">{t.calculator.seedCost}</label>
                  <input
                    type="number"
                    value={seedCost}
                    onChange={(e) => setSeedCost(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">{t.calculator.fertilizerCost}</label>
                  <input
                    type="number"
                    value={fertilizerCost}
                    onChange={(e) => setFertilizerCost(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">{t.calculator.pesticideCost}</label>
                  <input
                    type="number"
                    value={pesticideCost}
                    onChange={(e) => setPesticideCost(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">{t.calculator.laborCost}</label>
                  <input
                    type="number"
                    value={laborCost}
                    onChange={(e) => setLaborCost(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-600 mb-1">{t.calculator.irrigationCost}</label>
                  <input
                    type="number"
                    value={irrigationCost}
                    onChange={(e) => setIrrigationCost(parseInt(e.target.value) || 0)}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-600 mb-1">{t.calculator.machineryCost}</label>
                  <input
                    type="number"
                    value={machineryCost}
                    onChange={(e) => setMachineryCost(parseInt(e.target.value) || 0)}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-600 mb-1">{t.calculator.transportCost}</label>
                  <input
                    type="number"
                    value={transportCost}
                    onChange={(e) => setTransportCost(parseInt(e.target.value) || 0)}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Expected Yield & Selling Price */}
            <div className="pt-3 border-t border-slate-100 space-y-3">
              <h4 className="text-xs font-bold text-slate-800">
                {language === 'mr' ? 'अपेक्षित उत्पादन व विक्री भाव' : 'Expected Harvest Yield & Market Rate'}
              </h4>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">{t.calculator.expectedYield}</label>
                  <input
                    type="number"
                    step="0.5"
                    value={expectedYieldPerAcre}
                    onChange={(e) => setExpectedYieldPerAcre(parseFloat(e.target.value) || 1)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">{t.calculator.sellingPrice}</label>
                  <input
                    type="number"
                    value={sellingPricePerQuintal}
                    onChange={(e) => setSellingPricePerQuintal(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Forecast Output Card (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          <div className="glass-card p-6 sm:p-7 rounded-3xl border-2 border-emerald-300 bg-white space-y-6 shadow-xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  Financial Health Card
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  {t.calculator.summary} ({acres} Acres {crop})
                </h3>
              </div>
              <span className="text-xs font-bold text-slate-400">Total Yield: {totalYieldQuintals} Qtl</span>
            </div>

            {/* Key Outcomes Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 font-bold uppercase">{t.calculator.totalCost}</span>
                <p className="text-xl font-black text-slate-900 mt-0.5">₹{totalCost.toLocaleString()}</p>
                <span className="text-[10px] text-slate-400">₹{costPerAcre.toLocaleString()} / Acre</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 font-bold uppercase">{t.calculator.grossRevenue}</span>
                <p className="text-xl font-black text-slate-900 mt-0.5">₹{grossRevenue.toLocaleString()}</p>
                <span className="text-[10px] text-slate-400">{totalYieldQuintals} Qtl @ ₹{sellingPricePerQuintal}</span>
              </div>
            </div>

            {/* Net Profit Spotlight */}
            <div className={`p-5 rounded-3xl border text-center space-y-1 ${
              netProfit >= 0 
                ? 'bg-gradient-to-r from-emerald-500/10 via-green-500/10 to-teal-500/10 border-emerald-300' 
                : 'bg-rose-50 border-rose-200'
            }`}>
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-900">
                {t.calculator.netProfit} ({acres} Acres)
              </span>
              <p className={`text-3xl sm:text-4xl font-black ${netProfit >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                {netProfit >= 0 ? '+' : ''}₹{netProfit.toLocaleString()}
              </p>
              <div className="flex items-center justify-center gap-4 text-xs font-bold text-slate-700 pt-1">
                <span>₹{netProfitPerAcre.toLocaleString()} / Acre</span>
                <span>•</span>
                <span>Margin: {profitMarginPercent}%</span>
              </div>
            </div>

            {/* Break-Even Safety Threshold */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-amber-600 shrink-0" />
                <div>
                  <strong className="text-amber-950 font-bold block">{t.calculator.breakEven}</strong>
                  <span className="text-amber-800 text-[11px]">Minimum rate required to recover all input costs</span>
                </div>
              </div>
              <strong className="text-base font-black text-amber-900">₹{breakEvenPrice} / Qtl</strong>
            </div>

            {/* Cost Distribution Breakdown */}
            <div className="space-y-2 text-xs">
              <strong className="text-slate-800 font-bold block">Input Cost Distribution:</strong>
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
                <div style={{ width: `${(seedCost/costPerAcre)*100}%` }} className="bg-emerald-500" title="Seeds"></div>
                <div style={{ width: `${(fertilizerCost/costPerAcre)*100}%` }} className="bg-teal-500" title="Fertilizers"></div>
                <div style={{ width: `${(laborCost/costPerAcre)*100}%` }} className="bg-amber-500" title="Labor"></div>
                <div style={{ width: `${(machineryCost/costPerAcre)*100}%` }} className="bg-blue-500" title="Machinery"></div>
                <div style={{ width: `${((pesticideCost+irrigationCost+transportCost)/costPerAcre)*100}%` }} className="bg-purple-500" title="Other"></div>
              </div>
              <div className="flex flex-wrap gap-3 text-[10px] text-slate-500 pt-1">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Seeds ({Math.round((seedCost/costPerAcre)*100)}%)</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-teal-500"></span> Fertilizers ({Math.round((fertilizerCost/costPerAcre)*100)}%)</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Labor ({Math.round((laborCost/costPerAcre)*100)}%)</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Machinery ({Math.round((machineryCost/costPerAcre)*100)}%)</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={handleSaveCalculation}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/25 flex items-center gap-2 transition-all cursor-pointer"
              >
                <Bookmark className="w-4 h-4" />
                <span>{savedSuccess ? 'Budget Saved!' : 'Save Financial Budget'}</span>
              </button>

              <button
                onClick={() => window.print()}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200 flex items-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Budget</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
