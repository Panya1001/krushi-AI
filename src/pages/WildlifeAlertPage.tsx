import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Camera, 
  Volume2, 
  VolumeX, 
  Moon, 
  Sun, 
  Radio, 
  AlertOctagon, 
  Send, 
  Download, 
  CheckCircle2, 
  Eye, 
  Battery, 
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useNotifications } from '../context/NotificationContext';
import { initialCameras, sampleWildlifeLogs } from '../data/agriData';
import { SpeechService } from '../services/speech';
import { WildlifeCamera, WildlifeAlert } from '../types';

export const WildlifeAlertPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { addNotification } = useNotifications();

  const [cameras, setCameras] = useState<WildlifeCamera[]>(initialCameras);
  const [selectedCam, setSelectedCam] = useState<WildlifeCamera>(initialCameras[0]);
  const [nightVision, setNightVision] = useState(false);
  const [sirenPlaying, setSirenPlaying] = useState(false);
  const [smsDispatched, setSmsDispatched] = useState(false);
  const [capturedSnaps, setCapturedSnaps] = useState<string[]>([
    'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?w=600&auto=format&fit=crop&q=80'
  ]);
  const [incidentLogs, setIncidentLogs] = useState<WildlifeAlert[]>(sampleWildlifeLogs);

  const toggleSiren = () => {
    if (sirenPlaying) {
      SpeechService.stopWildlifeSiren();
      setSirenPlaying(false);
    } else {
      const started = SpeechService.startWildlifeSiren();
      if (started) {
        setSirenPlaying(true);
      }
    }
  };

  const handleSimulateNewIntrusion = () => {
    const animalOptions = [
      { en: 'Nilgai (Blue Bull)', mr: 'नीलगाय (रोज)', hi: 'नीलगाय' },
      { en: 'Elephant Herd (2)', mr: 'हत्तींचा कळप', hi: 'हाथियों का झुंड' },
      { en: 'Spotted Deer', mr: 'चितळ (हरिण)', hi: 'चित्तीदार हिरन' }
    ];
    const picked = animalOptions[Math.floor(Math.random() * animalOptions.length)];

    const newAlert: WildlifeAlert = {
      id: 'alert_' + Date.now(),
      cameraId: selectedCam.id,
      cameraName: selectedCam.name,
      animal: picked,
      confidence: 94.8,
      timestamp: 'Just now (Simulated test)',
      severity: 'critical',
      imageUrl: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?w=600&auto=format&fit=crop&q=80',
      status: 'active',
      notifiedAuthorities: true
    };

    const updatedCameras = cameras.map(c => 
      c.id === selectedCam.id 
        ? { ...c, intruderDetected: true, currentIntrusion: newAlert }
        : c
    );
    setCameras(updatedCameras);
    setSelectedCam({ ...selectedCam, intruderDetected: true, currentIntrusion: newAlert });
    setIncidentLogs(prev => [newAlert, ...prev]);

    // Push notification to farmer
    addNotification({
      title: `🚨 Wildlife Alert: ${picked[language]} on ${selectedCam.name}`,
      message: `Motion sensor activated siren and recorded incident frame.`,
      type: 'wildlife',
      linkTab: 'wildlife'
    });

    // Start siren
    SpeechService.startWildlifeSiren();
    setSirenPlaying(true);
  };

  const handleDispatchSMS = () => {
    setSmsDispatched(true);
    setTimeout(() => setSmsDispatched(false), 3500);
  };

  const handleTakeSnapshot = () => {
    const snap = selectedCam.currentIntrusion?.imageUrl || 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=600&auto=format&fit=crop&q=80';
    setCapturedSnaps(prev => [snap, ...prev]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Automated Optical Intrusion Deterrent</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {t.wildlife.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          {t.wildlife.subtitle}
        </p>
      </div>

      {/* Control Strip & Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-2xl border border-slate-200 text-center">
          <span className="text-[11px] text-slate-500 font-bold uppercase">{t.wildlife.camerasOnline}</span>
          <p className="text-2xl font-black text-emerald-700 mt-1">4 / 4</p>
        </div>
        <div className="glass-panel p-4 rounded-2xl border border-slate-200 text-center">
          <span className="text-[11px] text-slate-500 font-bold uppercase">{t.wildlife.intrusionsToday}</span>
          <p className="text-2xl font-black text-rose-600 mt-1">3 Breaches</p>
        </div>
        <div className="glass-panel p-4 rounded-2xl border border-slate-200 text-center">
          <span className="text-[11px] text-slate-500 font-bold uppercase">{t.wildlife.alertStatus}</span>
          <p className="text-2xl font-black text-amber-600 mt-1">HIGH (SECTOR A)</p>
        </div>
        <div className="glass-panel p-4 rounded-2xl border border-slate-200 text-center">
          <span className="text-[11px] text-slate-500 font-bold uppercase">Siren Status</span>
          <p className={`text-2xl font-black mt-1 ${sirenPlaying ? 'text-rose-600 animate-pulse' : 'text-slate-400'}`}>
            {sirenPlaying ? 'ACTIVE 🔊' : 'STANDBY 🔇'}
          </p>
        </div>
      </div>

      {/* Main Surveillance Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Live Camera Stream Box (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="glass-card rounded-3xl border-2 border-slate-200 overflow-hidden shadow-2xl bg-slate-950">
            {/* Camera Stream Header Bar */}
            <div className="p-4 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-white">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
                <span className="font-mono text-xs font-bold text-emerald-400">REC [LIVE 1080P]</span>
                <span className="text-xs text-slate-300 font-semibold">• {selectedCam.name}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setNightVision(!nightVision)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    nightVision ? 'bg-emerald-500 text-white font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {nightVision ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                  <span>{nightVision ? 'Normal Mode' : t.wildlife.nightVision}</span>
                </button>

                <div className="flex items-center gap-1 text-slate-400 text-xs px-2 py-1 bg-slate-800 rounded-lg">
                  <Battery className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{selectedCam.battery}%</span>
                </div>
              </div>
            </div>

            {/* Simulated Live Camera Feed Display */}
            <div className={`relative aspect-video w-full overflow-hidden ${nightVision ? 'filter brightness-125 contrast-125 sepia hue-rotate-50' : ''}`}>
              <img
                src={selectedCam.currentIntrusion?.imageUrl || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1000&auto=format&fit=crop&q=80'}
                alt="Camera live stream"
                className="w-full h-full object-cover"
              />

              {/* Timestamp Watermark Overlay */}
              <div className="absolute top-4 left-4 font-mono text-[11px] text-emerald-400 bg-black/60 px-2 py-1 rounded-md backdrop-blur-xs">
                FPS: 30 • ISO 800 • {new Date().toLocaleTimeString()}
              </div>

              {/* Neural Bounding Box if Intruder Detected */}
              {selectedCam.intruderDetected && selectedCam.currentIntrusion && (
                <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-2 border-rose-500 bg-rose-500/15 rounded-xl flex flex-col justify-between p-2 animate-pulse">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] bg-rose-600 text-white font-bold px-2 py-0.5 rounded-md shadow-xs">
                      {selectedCam.currentIntrusion.animal[language]} ({selectedCam.currentIntrusion.confidence}%)
                    </span>
                    <span className="text-[10px] text-white bg-black/70 px-1.5 py-0.5 rounded-sm font-mono">
                      CONFIRMED THREAT
                    </span>
                  </div>
                  <div className="flex justify-between items-end text-[10px] text-rose-200 font-mono">
                    <span>TRACK_ID: #WB_092</span>
                    <span className="animate-ping font-bold text-rose-400">🚨 BREACH DETECTED</span>
                  </div>
                </div>
              )}
            </div>

            {/* Camera Bottom Live Control Bar */}
            <div className="p-4 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {/* Acoustic Siren Button */}
                <button
                  onClick={toggleSiren}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                    sirenPlaying
                      ? 'bg-rose-600 text-white animate-bounce shadow-lg shadow-rose-600/50'
                      : 'bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40'
                  }`}
                >
                  {sirenPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  <span>{sirenPlaying ? t.wildlife.silenceAlarm : t.wildlife.soundAlarm}</span>
                </button>

                {/* Dispatch SMS */}
                <button
                  onClick={handleDispatchSMS}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-blue-400" />
                  <span>{smsDispatched ? 'SMS Sent to Forest Officer!' : t.wildlife.alertForestDept}</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                {/* Snapshot button */}
                <button
                  onClick={handleTakeSnapshot}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <Camera className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Save Snapshot</span>
                </button>

                {/* Simulate test trigger for Hackathon */}
                <button
                  onClick={handleSimulateNewIntrusion}
                  className="px-3 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Test Trigger (Demo)</span>
                </button>
              </div>
            </div>
          </div>

          {/* 4-Camera Selector Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {cameras.map((cam) => {
              const isSelected = selectedCam.id === cam.id;
              return (
                <button
                  key={cam.id}
                  onClick={() => setSelectedCam(cam)}
                  className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-400/40'
                      : cam.intruderDetected
                      ? 'border-rose-400 bg-rose-50/50 hover:bg-rose-50'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">{cam.id}</span>
                    <span className={`w-2 h-2 rounded-full ${cam.intruderDetected ? 'bg-rose-500 animate-ping' : 'bg-emerald-500'}`}></span>
                  </div>
                  <p className="text-xs font-bold text-slate-900 truncate">{cam.name.split(':')[1]}</p>
                  <p className="text-[10px] text-slate-500 truncate mt-0.5">{cam.location}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Intrusion Timeline & Saved Proof Gallery (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Recent Intrusions Log */}
          <div className="glass-card p-5 rounded-3xl border border-slate-200/90 bg-white space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 flex items-center justify-between">
              <span>{t.wildlife.recentIncidents}</span>
              <span className="text-[10px] font-bold text-slate-400">All Sectors</span>
            </h3>

            <div className="space-y-2.5 max-h-[320px] overflow-y-auto">
              {incidentLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3 text-xs"
                >
                  <img
                    src={log.imageUrl}
                    alt={log.animal.en}
                    className="w-12 h-12 rounded-xl object-cover shrink-0 ring-1 ring-slate-200"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <strong className="text-slate-900 truncate">{log.animal[language]}</strong>
                      <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded-full shrink-0">
                        {log.confidence}%
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 truncate">{log.cameraName}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{log.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Captured Proof Images Gallery */}
          <div className="glass-card p-5 rounded-3xl border border-slate-200/90 bg-white space-y-3">
            <h3 className="font-extrabold text-sm text-slate-900">
              {language === 'mr' ? 'जतन केलेले पुरावे (स्नॅपशॉट)' : 'Saved Incident Proofs'}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {capturedSnaps.map((url, i) => (
                <div key={i} className="relative rounded-xl overflow-hidden aspect-video border border-slate-200 group">
                  <img src={url} alt={`Snap ${i}`} className="w-full h-full object-cover" />
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity text-[10px] font-bold gap-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
