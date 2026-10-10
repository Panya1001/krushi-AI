import React, { createContext, useContext, useState, useEffect } from 'react';
import { NotificationItem } from '../types';

interface NotificationContextType {
  notifications: NotificationItem[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (item: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => void;
  clearAll: () => void;
}

const initialNotifications: NotificationItem[] = [
  {
    id: 'n1',
    title: '🚨 Wildlife Intrusion Alert (Sector A)',
    message: 'Wild Boar detected on Cam 01 near North Orchard fence. Perimeter siren active.',
    type: 'wildlife',
    timestamp: '2 mins ago',
    read: false,
    linkTab: 'wildlife'
  },
  {
    id: 'n2',
    title: '📈 Mandi Rate Surge: Onion Up +5.8%',
    message: 'Modal price at Pimpalgaon Baswant reached ₹2,890/Qtl. Favorable time to liquidate stored produce.',
    type: 'market',
    timestamp: '1 hour ago',
    read: false,
    linkTab: 'market'
  },
  {
    id: 'n3',
    title: '🌦️ Weather Advisory: Optimal Spraying Window',
    message: 'Clear morning skies forecasted until Wednesday. Wind speed <12 km/h. Ideal for foliar micronutrients.',
    type: 'weather',
    timestamp: '3 hours ago',
    read: false,
    linkTab: 'weather'
  },
  {
    id: 'n4',
    title: '🏛️ PM-KUSUM Solar Pump Phase-III Open',
    message: 'Maharashtra state quota application deadline is 30 November 2026. 90% subsidy on 5HP pumps.',
    type: 'scheme',
    timestamp: 'Yesterday',
    read: true,
    linkTab: 'schemes'
  },
  {
    id: 'n5',
    title: '🔬 District Alert: Stem Borer in Sugarcane',
    message: 'Early shoot borer reported in Niphad & Dindori talukas. Check leaf whorls for dead hearts.',
    type: 'disease',
    timestamp: '2 days ago',
    read: true,
    linkTab: 'disease'
  }
];

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('krishiai_notifications');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return initialNotifications;
  });

  useEffect(() => {
    localStorage.setItem('krishiai_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const addNotification = (item: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => {
    const newNotif: NotificationItem = {
      ...item,
      id: 'notif_' + Date.now(),
      timestamp: 'Just now',
      read: false,
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead, markAllAsRead, addNotification, clearAll }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
