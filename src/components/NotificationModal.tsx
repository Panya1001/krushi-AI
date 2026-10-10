import React from 'react';
import { X, Bell, CheckCheck, Trash2, ShieldAlert, TrendingUp, CloudSun, Landmark, Bug, ExternalLink } from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';
import { useLanguage } from '../context/LanguageContext';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: string) => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  onNavigateTab,
}) => {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearAll } = useNotifications();
  const { language } = useLanguage();

  if (!isOpen) return null;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'wildlife':
        return <ShieldAlert className="w-4 h-4 text-rose-500" />;
      case 'market':
        return <TrendingUp className="w-4 h-4 text-emerald-500" />;
      case 'weather':
        return <CloudSun className="w-4 h-4 text-amber-500" />;
      case 'scheme':
        return <Landmark className="w-4 h-4 text-blue-500" />;
      case 'disease':
        return <Bug className="w-4 h-4 text-purple-500" />;
      default:
        return <Bell className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base tracking-tight">
                {language === 'mr' ? 'शेती सूचना व इशारे' : language === 'hi' ? 'सूचना एवं अलर्ट केंद्र' : 'Farmer Notification Center'}
              </h3>
              <p className="text-[11px] text-slate-300">
                {unreadCount > 0 ? `${unreadCount} unread agricultural alerts` : 'All alerts up to date'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-white/10 text-slate-300 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="px-5 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <span>{notifications.length} Total Alerts</span>
          <div className="flex items-center gap-3 font-semibold">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-1 text-emerald-700 hover:text-emerald-800 cursor-pointer"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Mark all read</span>
              </button>
            )}
            {notifications.length > 0 && (
              <button
                onClick={clearAll}
                className="flex items-center gap-1 text-slate-400 hover:text-rose-600 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            )}
          </div>
        </div>

        {/* Alert List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              <Bell className="w-8 h-8 mx-auto text-slate-300 mb-2" />
              <p>No active farm notifications.</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => {
                  markAsRead(notif.id);
                  if (notif.linkTab) {
                    onNavigateTab(notif.linkTab);
                    onClose();
                  }
                }}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex gap-3 ${
                  notif.read
                    ? 'bg-white border-slate-200/70 opacity-80 hover:opacity-100 hover:border-emerald-300'
                    : 'bg-emerald-50/40 border-emerald-200 shadow-xs hover:border-emerald-400'
                }`}
              >
                <div className="mt-0.5 shrink-0 p-2 rounded-xl bg-white shadow-xs border border-slate-100">
                  {getTypeIcon(notif.type)}
                </div>

                <div className="flex-1 text-xs">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className={`font-bold leading-tight ${notif.read ? 'text-slate-800' : 'text-emerald-950 font-extrabold'}`}>
                      {notif.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 shrink-0">{notif.timestamp}</span>
                  </div>

                  <p className="text-slate-600 mt-1 leading-relaxed text-[11px]">{notif.message}</p>

                  {notif.linkTab && (
                    <div className="mt-2 flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-800">
                      <span>View details in {notif.linkTab}</span>
                      <ExternalLink className="w-3 h-3" />
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
