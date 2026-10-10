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
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    // Default to Ramesh Patil (Maharashtra farmer) so hackathon demo is immediately populated!
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
      id: 'custom_' + Date.now(),
      name: custom.name || 'Prashant More',
      email: custom.email || 'farmer@krishiai.org',
      phone: custom.phone || '+91 99887 76655',
      role: custom.role || 'farmer',
      state: custom.state || 'Maharashtra',
      district: custom.district || 'Pune',
      village: custom.village || 'Baramati',
      landSizeAcres: custom.landSizeAcres || 4.0,
      soilType: custom.soilType || 'Black Soil',
      primaryCrops: custom.primaryCrops || ['Soybean', 'Sugarcane'],
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updated: Partial<User>) => {
    if (!user) return;
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
