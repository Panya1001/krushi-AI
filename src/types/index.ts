export type Language = 'en' | 'mr' | 'hi';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'farmer' | 'admin';
  state: string;
  district: string;
  village: string;
  landSizeAcres: number;
  soilType: string;
  primaryCrops: string[];
  avatar?: string;
}

export interface MandiPrice {
  id: string;
  crop: string;
  cropLocal: { en: string; mr: string; hi: string };
  variety: string;
  market: string;
  district: string;
  state: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  unit: string;
  change: number; // percentage or diff
  msp: number;
  date: string;
  trend: number[]; // 7 days prices
  distanceKm?: number;
}

export interface GovtScheme {
  id: string;
  title: { en: string; mr: string; hi: string };
  description: { en: string; mr: string; hi: string };
  category: 'subsidy' | 'insurance' | 'credit' | 'machinery' | 'direct_benefit' | 'irrigation';
  state: string;
  minLand?: number;
  maxLand?: number;
  benefitAmount: string;
  deadline: string;
  eligibility: string[];
  documents: string[];
  applyUrl: string;
  isActive: boolean;
}

export interface DiseaseDetectionResult {
  id: string;
  cropName: string;
  diseaseName: { en: string; mr: string; hi: string };
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  symptoms: string[];
  organicRemedy: string[];
  chemicalRemedy: string[];
  fertilizerAdvice: string;
  imageUrl: string;
  date: string;
}

export interface WildlifeAlert {
  id: string;
  cameraId: string;
  cameraName: string;
  animal: { en: string; mr: string; hi: string };
  confidence: number;
  timestamp: string;
  severity: 'low' | 'medium' | 'critical';
  imageUrl: string;
  status: 'active' | 'resolved' | 'false_positive';
  notifiedAuthorities: boolean;
}

export interface WildlifeCamera {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline';
  battery: number;
  lastActive: string;
  intruderDetected: boolean;
  currentIntrusion?: WildlifeAlert;
  nightVision: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'weather' | 'disease' | 'wildlife' | 'market' | 'scheme' | 'system';
  timestamp: string;
  read: boolean;
  linkTab?: string;
}

export interface CropRecommendationInput {
  state: string;
  district: string;
  soilType: string;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  ph: number;
  waterSource: string;
  season: 'Kharif' | 'Rabi' | 'Zaid';
  budgetPerAcre: number;
}

export interface CropRecommendationOutput {
  crop: string;
  cropLocal: { en: string; mr: string; hi: string };
  matchScore: number;
  expectedYieldQuintals: number;
  expectedRevenuePerAcre: number;
  estimatedNetProfit: number;
  durationDays: number;
  waterRequirement: 'Low' | 'Medium' | 'High';
  riskLevel: 'Low' | 'Medium' | 'High';
  reasons: string[];
  suitabilityTags: string[];
}
