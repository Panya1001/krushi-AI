import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Settings, 
  RefreshCw, 
  Bot, 
  User as UserIcon,
  CheckCircle2,
  Key
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SpeechService } from '../services/speech';
import { askKrishiMitra } from '../services/gemini';

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export const ChatbotModal: React.FC<ChatbotModalProps> = ({ isOpen, onClose }) => {
  const { language, t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm_welcome',
      role: 'assistant',
      content: language === 'mr'
        ? `🌱 **नमस्कार शेतकरी बंधूंनो! मी कृषीAI मित्र आहे.**\n\nमी पिकांवरील रोग, खते, फवारणी, आजचे बाजारभाव किंवा शासकीय योजनांबद्दल तुम्हाला मार्गदर्शन करू शकतो. तुम्ही खालील माइक दाबून बोलू शकता किंवा प्रश्न टाईप करू शकता!`
        : language === 'hi'
        ? `🌱 **नमस्ते किसान भाई! मैं कृषिAI मित्र हूँ।**\n\nमैं फसलों के रोग, उर्वरक, छिड़काव, आज के मंडी भाव और सरकारी योजनाओं पर आपकी सहायता के लिए तैयार हूँ। आप माइक दबाकर बोल भी सकते हैं!`
        : `🌱 **Welcome Farmer! I am KrishiAI Mitra, your personal AI agronomist.**\n\nAsk me anything about leaf diseases, N-P-K fertilizer schedules, APMC market rates, or government subsidies. Voice input and audio playback are fully supported!`,
      timestamp: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showKeyConfig, setShowKeyConfig] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(() => localStorage.getItem('krishiai_gemini_api_key') || '');
  const [keySavedMessage, setKeySavedMessage] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Clean up speech on close
  useEffect(() => {
    if (!isOpen) {
      SpeechService.stopListening();
      SpeechService.stopSpeaking();
      setIsListening(false);
      setIsSpeaking(false);
    }
  }, [isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || loading) return;

    const userMsg: Message = {
      id: 'user_' + Date.now(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await askKrishiMitra(text, language, messages.map(m => ({ role: m.role, content: m.content })));
      const assistantMsg: Message = {
        id: 'ai_' + Date.now(),
        role: 'assistant',
        content: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (e) {
      const errorMsg: Message = {
        id: 'ai_' + Date.now(),
        role: 'assistant',
        content: language === 'mr' 
          ? 'माफ करा, तांत्रिक समस्येमुळे उत्तर मिळू शकले नाही. कृपया पुन्हा प्रयत्न करा.' 
          : 'Could not fetch response. Please try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceToggle = () => {
    if (isListening) {
      SpeechService.stopListening();
      setIsListening(false);
    } else {
      setIsListening(true);
      SpeechService.startListening(
        language,
        (recognized) => {
          setIsListening(false);
          setInput(recognized);
          handleSendMessage(recognized);
        },
        (error) => {
          setIsListening(false);
          console.warn('Speech err:', error);
        },
        () => {
          setIsListening(false);
        }
      );
    }
  };

  const handleSpeakMessage = (text: string) => {
    if (isSpeaking) {
      SpeechService.stopSpeaking();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      SpeechService.speak(text, language, () => {
        setIsSpeaking(false);
      });
    }
  };

  const handleSaveApiKey = () => {
    localStorage.setItem('krishiai_gemini_api_key', apiKeyInput.trim());
    setKeySavedMessage(true);
    setTimeout(() => setKeySavedMessage(false), 2000);
    setShowKeyConfig(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end sm:p-6 p-0 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white w-full sm:w-[480px] h-[92vh] sm:h-[650px] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col border border-emerald-100 overflow-hidden animate-in slide-in-from-bottom duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-700 via-green-700 to-teal-800 p-4 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
              <Bot className="w-6 h-6 text-emerald-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base tracking-tight text-white leading-none">
                  {language === 'mr' ? 'कृषीAI मित्र' : language === 'hi' ? 'कृषिAI मित्र' : 'KrishiAI Mitra'}
                </h3>
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping"></span>
              </div>
              <p className="text-[11px] text-emerald-100/90 font-medium mt-0.5">
                {language === 'mr' ? 'आपला २४x७ वैयक्तिक कृषी शास्त्रज्ञ' : language === 'hi' ? 'आपका २४x७ व्यक्तिगत कृषि वैज्ञानिक' : 'Voice & Text Smart Agronomist'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowKeyConfig(!showKeyConfig)}
              className="p-2 rounded-xl hover:bg-white/10 text-emerald-100 transition-colors"
              title="Configure Gemini API Key"
            >
              <Settings className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                SpeechService.stopSpeaking();
                SpeechService.stopListening();
                onClose();
              }}
              className="p-2 rounded-xl hover:bg-white/10 text-emerald-100 transition-colors"
              aria-label="Close Assistant"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* API Key Drawer (Optional) */}
        {showKeyConfig && (
          <div className="bg-emerald-50/95 border-b border-emerald-200 p-3.5 text-xs text-slate-800">
            <div className="flex items-center justify-between mb-2 font-bold text-emerald-900">
              <span className="flex items-center gap-1.5">
                <Key className="w-4 h-4 text-emerald-600" />
                <span>Google Gemini API Key (Optional)</span>
              </span>
              <span className="text-[10px] bg-emerald-200/80 text-emerald-800 px-2 py-0.5 rounded-full font-semibold">
                Offline AI Active
              </span>
            </div>
            <p className="text-[11px] text-slate-600 mb-2">
              KrishiAI comes with built-in agricultural agronomy intelligence. You can optionally connect your live Gemini Key for boundless answers.
            </p>
            <div className="flex gap-2">
              <input
                type="password"
                placeholder="AIzaSy..."
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                className="flex-1 px-3 py-1.5 bg-white border border-emerald-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                onClick={handleSaveApiKey}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-colors cursor-pointer"
              >
                Save
              </button>
            </div>
            {keySavedMessage && (
              <p className="text-[11px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Key Saved Successfully!
              </p>
            )}
          </div>
        )}

        {/* Chat Messages Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/60">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-7 h-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[85%] rounded-2xl p-3.5 text-xs shadow-xs leading-relaxed ${
                  isUser
                    ? 'bg-emerald-600 text-white rounded-tr-xs'
                    : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-xs'
                }`}>
                  <div className="whitespace-pre-wrap font-sans">
                    {msg.content}
                  </div>

                  <div className={`flex items-center justify-between gap-3 mt-2 text-[10px] ${
                    isUser ? 'text-emerald-100' : 'text-slate-400'
                  }`}>
                    <span>{msg.timestamp}</span>
                    {!isUser && (
                      <button
                        onClick={() => handleSpeakMessage(msg.content)}
                        className="hover:text-emerald-700 flex items-center gap-1 font-semibold cursor-pointer"
                        title="Listen to audio response"
                      >
                        {isSpeaking ? <VolumeX className="w-3 h-3 text-rose-500 animate-pulse" /> : <Volume2 className="w-3 h-3" />}
                        <span>{isSpeaking ? t.chat.stopAudio : t.chat.aiSpeaking}</span>
                      </button>
                    )}
                  </div>
                </div>

                {isUser && (
                  <div className="w-7 h-7 rounded-xl bg-slate-700 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <UserIcon className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-2.5 items-center text-xs text-slate-500 italic py-2">
              <div className="w-6 h-6 rounded-xl bg-emerald-600/20 text-emerald-700 flex items-center justify-center animate-spin">
                <RefreshCw className="w-3.5 h-3.5" />
              </div>
              <span>{language === 'mr' ? 'कृषी मित्र माहिती शोधत आहे...' : language === 'hi' ? 'कृषि मित्र उत्तर तैयार कर रहे हैं...' : 'Consulting agricultural science base...'}</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-3 py-2 bg-white border-t border-slate-100 overflow-x-auto no-scrollbar flex items-center gap-1.5">
          {t.chat.quickPrompts.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(chip)}
              className="shrink-0 px-2.5 py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-[11px] font-medium transition-colors cursor-pointer"
            >
              🌱 {chip}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200/80 flex items-center gap-2">
          {/* Voice Input Button */}
          <button
            onClick={handleVoiceToggle}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
              isListening
                ? 'bg-rose-500 text-white border-rose-600 animate-pulse ring-4 ring-rose-200'
                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200'
            }`}
            title={isListening ? 'Stop Listening' : 'Speak into Microphone'}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={isListening ? t.chat.listening : t.chat.placeholder}
            className="flex-1 px-3.5 py-2.5 bg-slate-100/80 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
          />

          <button
            onClick={() => handleSendMessage()}
            disabled={!input.trim() || loading}
            className="p-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl shadow-xs transition-all cursor-pointer"
            title="Send"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
