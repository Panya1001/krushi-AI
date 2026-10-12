import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, DiseaseDetectionResult } from '../types';
import { demoUsers, sampleDiseaseScans } from '../data/agriData';

interface AuthContextType {
  user: User | null;
  login: (roleKey: 'farmer_mh' | 'farmer_pb' | 'admin') => void;
  loginCustom: (user: Partial<User>) => void;
  logout: () => void;
  updateProfile: (updated: Partial<User>) => void;
  savedScans: DiseaseDetectionResult[];
  saveScan: (scan: DiseaseDetectionResult) => void;
  removeScan: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('krishiai_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.avatar && parsed.avatar.includes('unsplash.com')) {
          parsed.avatar = '';
        }
        return parsed;
      } catch (e) {
        // fallback
      }
    }
    return demoUsers.farmer_mh;
  });

  const [savedScans, setSavedScans] = useState<DiseaseDetectionResult[]>(() => {
    const saved = localStorage.getItem('krishiai_saved_scans');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return sampleDiseaseScans;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('krishiai_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('krishiai_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('krishiai_saved_scans', JSON.stringify(savedScans));
  }, [savedScans]);

  const login = (roleKey: 'farmer_mh' | 'farmer_pb' | 'admin') => {
    const selected = demoUsers[roleKey] || demoUsers.farmer_mh;
    setUser(selected);
  };

  const loginCustom = (custom: Partial<User>) => {
    const newUser: User = {
      id: 'farmer_' + Date.now(),
      name: custom.name || 'शेतकरी मित्र',
      email: custom.email || '',
      phone: custom.phone || '',
      role: custom.role || 'farmer',
      state: custom.state || 'Maharashtra',
      district: custom.district || '',
      village: custom.village || '',
      landSizeAcres: custom.landSizeAcres || 4.0,
      soilType: custom.soilType || 'Medium Black (काळी माती)',
      primaryCrops: custom.primaryCrops || ['Soybean', 'Sugarcane'],
      avatar: (custom.avatar && !custom.avatar.includes('unsplash.com')) ? custom.avatar : '',
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updated: Partial<User>) => {
    if (!user) return;
    if (updated.avatar && updated.avatar.includes('unsplash.com')) {
      updated.avatar = '';
    }
    setUser({ ...user, ...updated });
  };

  const saveScan = (scan: DiseaseDetectionResult) => {
    setSavedScans(prev => [scan, ...prev.filter(s => s.id !== scan.id)]);
  };

  const removeScan = (id: string) => {
    setSavedScans(prev => prev.filter(s => s.id !== id));
  };

  return (
    <AuthContext.Provider value={{ user, login, loginCustom, logout, updateProfile, savedScans, saveScan, removeScan }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
