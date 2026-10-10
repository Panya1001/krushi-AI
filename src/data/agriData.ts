import { User, MandiPrice, GovtScheme, DiseaseDetectionResult, WildlifeCamera, WildlifeAlert } from '../types';

export const demoUsers: Record<string, User> = {
  farmer_mh: {
    id: 'farmer_01',
    name: 'Ramesh Balasaheb Patil',
    email: 'ramesh.patil@krishiai.org',
    phone: '+91 98224 81920',
    role: 'farmer',
    state: 'Maharashtra',
    district: 'Nashik',
    village: 'Niphad',
    landSizeAcres: 5.5,
    soilType: 'Medium Black (काळी माती)',
    primaryCrops: ['Soybean', 'Onion', 'Sugarcane', 'Tomato'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  farmer_pb: {
    id: 'farmer_02',
    name: 'Gurpreet Singh Dhillon',
    email: 'gurpreet.singh@krishiai.org',
    phone: '+91 98765 43210',
    role: 'farmer',
    state: 'Punjab',
    district: 'Ludhiana',
    village: 'Samrala',
    landSizeAcres: 8.0,
    soilType: 'Alluvial Loam (दोमट मिट्टी)',
    primaryCrops: ['Wheat', 'Basmati Rice', 'Mustard'],
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  },
  admin: {
    id: 'admin_01',
    name: 'Dr. Swati Kulkarni',
    email: 'dr.swati@krishiai.gov.in',
    phone: '+91 94220 12345',
    role: 'admin',
    state: 'Maharashtra',
    district: 'Pune',
    village: 'Agri Directorate',
    landSizeAcres: 0,
    soilType: 'State Agricultural Specialist',
    primaryCrops: [],
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  }
};

export const initialMandiPrices: MandiPrice[] = [
  {
    id: 'm1',
    crop: 'Soybean',
    cropLocal: { en: 'Soybean (Yellow)', mr: 'सोयाबीन (पिवळा)', hi: 'सोयाबीन (पीला)' },
    variety: 'JS-335 / JS-9560',
    market: 'Lasalgaon APMC',
    district: 'Nashik',
    state: 'Maharashtra',
    minPrice: 4650,
    maxPrice: 5180,
    modalPrice: 4980,
    unit: '₹ / Quintal',
    change: 3.2,
    msp: 4892,
    date: 'Today, 08:30 AM',
    trend: [4720, 4780, 4810, 4890, 4920, 4950, 4980],
    distanceKm: 22,
  },
  {
    id: 'm2',
    crop: 'Onion',
    cropLocal: { en: 'Red Onion (Summer)', mr: 'लाल कांदा (उन्हाळी)', hi: 'लाल प्याज (गर्मी)' },
    variety: 'Nashik Red / Garwa',
    market: 'Pimpalgaon Baswant',
    district: 'Nashik',
    state: 'Maharashtra',
    minPrice: 2150,
    maxPrice: 3250,
    modalPrice: 2890,
    unit: '₹ / Quintal',
    change: 5.8,
    msp: 2400,
    date: 'Today, 09:15 AM',
    trend: [2400, 2520, 2600, 2710, 2750, 2820, 2890],
    distanceKm: 18,
  },
  {
    id: 'm3',
    crop: 'Cotton',
    cropLocal: { en: 'Medium Staple Cotton', mr: 'मध्यम धाग्याचा कापूस', hi: 'कपास (मध्यम रेशा)' },
    variety: 'Bt Cotton (G-cot 21)',
    market: 'Rajkot APMC',
    district: 'Rajkot',
    state: 'Gujarat',
    minPrice: 7100,
    maxPrice: 7850,
    modalPrice: 7540,
    unit: '₹ / Quintal',
    change: -1.2,
    msp: 7121,
    date: 'Today, 10:00 AM',
    trend: [7650, 7620, 7590, 7580, 7550, 7530, 7540],
    distanceKm: 340,
  },
  {
    id: 'm4',
    crop: 'Wheat',
    cropLocal: { en: 'Sharbati Wheat', mr: 'शरबती / सिहोर गहू', hi: 'शरबती गेहूं' },
    variety: 'Sharbati Super',
    market: 'Indore Mandi',
    district: 'Indore',
    state: 'Madhya Pradesh',
    minPrice: 2750,
    maxPrice: 3420,
    modalPrice: 3180,
    unit: '₹ / Quintal',
    change: 2.1,
    msp: 2275,
    date: 'Today, 09:45 AM',
    trend: [2980, 3020, 3060, 3100, 3120, 3150, 3180],
    distanceKm: 280,
  },
  {
    id: 'm5',
    crop: 'Tomato',
    cropLocal: { en: 'Hybrid Tomato', mr: 'हायब्रिड टोमॅटो', hi: 'हाइब्रिड टमाटर' },
    variety: 'Abhinav / Shivam',
    market: 'Narayangaon APMC',
    district: 'Pune',
    state: 'Maharashtra',
    minPrice: 1600,
    maxPrice: 2450,
    modalPrice: 2150,
    unit: '₹ / Quintal',
    change: 8.4,
    msp: 1500,
    date: 'Today, 07:30 AM',
    trend: [1750, 1800, 1920, 1980, 2020, 2090, 2150],
    distanceKm: 95,
  },
  {
    id: 'm6',
    crop: 'Sugarcane',
    cropLocal: { en: 'Co-86032 Sugarcane', mr: 'को-८६०३२ ऊस', hi: 'गन्ना (८६०३२)' },
    variety: 'Co-86032 (Nira)',
    market: 'Kolhapur Sugar Mill Gate',
    district: 'Kolhapur',
    state: 'Maharashtra',
    minPrice: 3150,
    maxPrice: 3480,
    modalPrice: 3350,
    unit: '₹ / Ton (FRP+Bonus)',
    change: 0.5,
    msp: 3150,
    date: 'Today, 06:00 AM',
    trend: [3300, 3300, 3320, 3320, 3350, 3350, 3350],
    distanceKm: 260,
  },
  {
    id: 'm7',
    crop: 'Rice',
    cropLocal: { en: 'Pusa 1121 Basmati', mr: 'पुसा ११२१ बासमती', hi: 'पूसा ११२१ बासमती' },
    variety: 'Pusa 1121 Extra Long',
    market: 'Khanna Grain Market',
    district: 'Ludhiana',
    state: 'Punjab',
    minPrice: 4200,
    maxPrice: 4950,
    modalPrice: 4720,
    unit: '₹ / Quintal',
    change: 1.8,
    msp: 2320,
    date: 'Today, 10:15 AM',
    trend: [4500, 4550, 4610, 4630, 4680, 4700, 4720],
    distanceKm: 850,
  },
  {
    id: 'm8',
    crop: 'Gram',
    cropLocal: { en: 'Desi Chana (Bengal Gram)', mr: 'देशी हरभरा (चाणा)', hi: 'देसी चना' },
    variety: 'Vijay / Vishal',
    market: 'Akola APMC',
    district: 'Akola',
    state: 'Maharashtra',
    minPrice: 5800,
    maxPrice: 6550,
    modalPrice: 6320,
    unit: '₹ / Quintal',
    change: 4.5,
    msp: 5440,
    date: 'Today, 08:50 AM',
    trend: [5900, 5980, 6050, 6120, 6200, 6280, 6320],
    distanceKm: 310,
  }
];

export const initialGovtSchemes: GovtScheme[] = [
  {
    id: 'sch_01',
    title: {
      en: 'PM-KISAN Samman Nidhi Yojana',
      mr: 'पंतप्रधान किसान सन्मान निधी योजना',
      hi: 'प्रधानमंत्री किसान सम्मान निधि योजना'
    },
    description: {
      en: 'Direct income support of ₹6,000 per year transferred directly to bank accounts of all landholding farmer families across India in 3 equal four-monthly installments.',
      mr: 'भारतातील सर्व पात्र शेतकरी कुटुंबांना वर्षाला ₹६,००० थेट बँक खात्यात तीन समान हप्त्यांमध्ये (प्रत्येकी ₹२,०००) जमा केले जातात.',
      hi: 'सभी भूमिधारक किसान परिवारों को प्रति वर्ष ₹६,००० की प्रत्यक्ष आय सहायता, तीन समान किस्तों में सीधे बैंक खाते में।'
    },
    category: 'direct_benefit',
    state: 'All India',
    minLand: 0.1,
    maxLand: 25,
    benefitAmount: '₹6,000 / Year (100% Direct Transfer)',
    deadline: 'Open Ongoing (Year-Round)',
    eligibility: [
      'Valid Aadhaar card linked with Bank Account and NPCI active',
      'Land records (7/12 & 8A in MH / Khasra-Khatauni in North India) updated in state portal',
      'e-KYC biometric or OTP verified on PM-KISAN portal',
      'Farmer or family members must not be constitutional post holders or high income taxpayers'
    ],
    documents: ['Aadhaar Card', 'Bank Passbook with IFSC', 'Land Record (7/12 Extract)', 'Mobile Number linked to Aadhaar'],
    applyUrl: 'https://pmkisan.gov.in',
    isActive: true
  },
  {
    id: 'sch_02',
    title: {
      en: 'Namo Shetkari Mahasanman Nidhi (Maharashtra)',
      mr: 'नमो शेतकरी महासन्मान निधी योजना (महाराष्ट्र)',
      hi: 'नमो शेतकारी महासम्मान निधि (महाराष्ट्र)'
    },
    description: {
      en: 'State Government of Maharashtra additional income support of ₹6,000 per year given over and above PM-KISAN, making total annual benefit ₹12,000 for Maharashtra farmers.',
      mr: 'महाराष्ट्र शासनातर्फे पीएम-किसानच्या ₹६,००० च्या जोडीला अतिरिक्त ₹६,००० ची वार्षिक मदत; महाराष्ट्रातील शेतकऱ्यांना आता एकूण ₹१२,००० मिळतात.',
      hi: 'महाराष्ट्र सरकार द्वारा पीएम-किसान के ऊपर ₹६,००० की अतिरिक्त सहायता, जिससे राज्य के किसानों को कुल ₹१२,००० का वार्षिक लाभ मिलता है।'
    },
    category: 'direct_benefit',
    state: 'Maharashtra',
    minLand: 0.1,
    maxLand: 25,
    benefitAmount: '₹6,000 / Year (+ ₹6,000 PM-KISAN = ₹12,000)',
    deadline: 'Active for all PM-KISAN active MH farmers',
    eligibility: [
      'Must be a permanent resident of Maharashtra',
      'Must be actively receiving PM-KISAN installments',
      'Land title registered in Maharashtra revenue records'
    ],
    documents: ['PM-KISAN Registration ID', 'Aadhaar Card', '7/12 उतारा', 'Bank Passbook'],
    applyUrl: 'https://mahadbt.maharashtra.gov.in',
    isActive: true
  },
  {
    id: 'sch_03',
    title: {
      en: 'PM-KUSUM Component B: Solar Agricultural Pump Subsidy',
      mr: 'पंतप्रधान कुसुम योजना: सौर कृषी पंप अनुदान (९०% पर्यंत सबसिडी)',
      hi: 'पीएम-कुसुम योजना: सोलर कृषि पंप सब्सिडी (९०% तक छूट)'
    },
    description: {
      en: 'Up to 90% subsidy for standalone off-grid DC/AC solar pumps (3 HP, 5 HP, and 7.5 HP) for farmers with existing open wells, borewells, or farm ponds with no conventional electricity connection.',
      mr: 'विजेचे कनेक्शन नसलेल्या शेतकऱ्यांसाठी ३ एचपी, ५ एचपी व ७.५ एचपी सौर पंपांवर ९०% पर्यंत शासकीय अनुदान. रात्रीच्या वीजपुरवठ्याच्या त्रासापासून मुक्ती.',
      hi: 'अविद्युतीकृत किसानों के लिए ३, ५ और ७.५ एचपी सौर जल पंपों पर ९०% तक सरकारी सब्सिडी। दिन में सुनिश्चित सिंचाई का वरदान।'
    },
    category: 'subsidy',
    state: 'All India',
    minLand: 1.0,
    maxLand: 15,
    benefitAmount: 'Up to 90% Subsidy (Farmer pays only 10%)',
    deadline: 'Next Batch Closes: 30 November 2026',
    eligibility: [
      'Applicant must possess functional water source (Well, Borewell, River, or Shettale)',
      'No prior conventional electricity connection for the said water source',
      'Minimum land: 1 Acre for 3HP, 2.5 Acres for 5HP, 5 Acres for 7.5HP'
    ],
    documents: ['7/12 and 8A Extracts', 'NOC for Water Source', 'Aadhaar Card', 'Caste Certificate (if SC/ST quota)', 'Passport Photo'],
    applyUrl: 'https://pmkusum.mnre.gov.in',
    isActive: true
  },
  {
    id: 'sch_04',
    title: {
      en: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
      mr: 'पंतप्रधान पीक विमा योजना (१ रुपयात पीक विमा)',
      hi: 'प्रधानमंत्री फसल बीमा योजना (मात्र १ रुपये में बीमा)'
    },
    description: {
      en: 'Comprehensive crop insurance against non-preventable natural risks (drought, flood, unseasonal hail, pests, localized disasters). In Maharashtra, nominal premium is just ₹1 for farmers.',
      mr: 'नैसर्गिक आपत्ती, अवकाळी पाऊस, दुष्काळ किंवा गारपिटीमुळे पिकांचे नुकसान झाल्यास संपूर्ण भरपाई. महाराष्ट्रात शेतकऱ्यांना अवघ्या ₹१ मध्ये पीक विमा उपलब्ध.',
      hi: 'सूखा, बाढ़, ओलावृष्टि और कीट प्रकोप से होने वाले फसल नुकसान की व्यापक भरपाई। न्यूनतम प्रीमियम पर अधिकतम सुरक्षा।'
    },
    category: 'insurance',
    state: 'All India',
    minLand: 0.1,
    maxLand: 50,
    benefitAmount: 'Sum Insured up to ₹55,000 - ₹90,000 / Hectare',
    deadline: 'Kharif: 31 July | Rabi: 15 Dec',
    eligibility: [
      'All farmers cultivating notified crops in notified areas',
      'Both loanee and non-loanee farmers eligible',
      'Must apply within cut-off date with crop sowing certificate'
    ],
    documents: ['Sowing Certificate (पीक पेरा स्वघोषणा पत्र)', '7/12 Extract', 'Aadhaar Card', 'Cancelled Cheque/Passbook'],
    applyUrl: 'https://pmfby.gov.in',
    isActive: true
  },
  {
    id: 'sch_05',
    title: {
      en: 'Per Drop More Crop (Micro-Irrigation Subsidy)',
      mr: 'प्रति थेंब अधिक पीक: ठिबक व तुषार सिंचन अनुदान (५५% ते ७५%)',
      hi: 'प्रति बूंद अधिक फसल: ड्रिप एवं स्प्रिंकलर सिंचाई सब्सिडी'
    },
    description: {
      en: 'Financial assistance of 55% for general farmers and 75% for small/marginal & SC/ST farmers for installing Drip Irrigation and Sprinkler systems, saving up to 50% water while boosting yield by 40%.',
      mr: 'ठिबक सिंचन व तुषार सिंचन संच बसवण्यासाठी अल्प/अत्यल्प भूधारक शेतकऱ्यांना ७५% व इतर शेतकऱ्यांना ५५% शासकीय अनुदान.',
      hi: 'ड्रिप व फव्वारा सिंचाई प्रणालियों की स्थापना पर छोटे और सीमांत किसानों को ७५% तथा अन्य किसानों को ५५% वित्तीय सहायता।'
    },
    category: 'irrigation',
    state: 'All India',
    minLand: 0.5,
    maxLand: 12.5,
    benefitAmount: '55% to 75% Subsidy (Up to ₹58,000/ha)',
    deadline: 'Ongoing through State Portals (MahaDBT / e-Udyan)',
    eligibility: [
      'Farmer must have access to assured water source',
      'Subsidy available once every 7 years for same land piece',
      'Equipment must be purchased from empanelled BIS certified manufacturers'
    ],
    documents: ['7/12 Extract with Water Source remark', 'Soil & Water Testing Report', 'Quotation from Authorized Drip Dealer', 'Aadhaar'],
    applyUrl: 'https://pmksy.gov.in',
    isActive: true
  },
  {
    id: 'sch_06',
    title: {
      en: 'Sub-Mission on Agricultural Mechanization (SMAM)',
      mr: 'कृषी यांत्रिकीकरण उप-अभियान (ट्रॅक्टर व अवजारे अनुदान)',
      hi: 'कृषि यंत्रीकरण उप-मिशन (ट्रैक्टर एवं उपकरण अनुदान)'
    },
    description: {
      en: 'Capital subsidy of 40% to 50% for purchasing tractors, power tillers, rotavators, drone sprayers, multi-crop threshers, and harvesting machinery to modernize field operations.',
      mr: 'ट्रॅक्टर, रोटाव्हेटर, पॉवर टिलर, ड्रोन फवारणी यंत्र आणि मळणी यंत्र खरेदीसाठी ४०% ते ५०% थेट अनुदान (जास्तीत जास्त ₹१.२५ लाख ते ₹५ लाख).',
      hi: 'ट्रैक्टर, रोटावेटर, कल्टीवेटर और फसल कटाई मशीनों की खरीद पर ४०% से ५०% तक सरकारी अनुदान।'
    },
    category: 'machinery',
    state: 'All India',
    minLand: 1.0,
    maxLand: 25,
    benefitAmount: '40% - 50% (Up to ₹1,25,000 on Tractor)',
    deadline: 'Lottery System Cycles (Quarterly)',
    eligibility: [
      'Individual farmers, SHGs, and Farmer Producer Organizations (FPOs)',
      'Women and SC/ST farmers receive priority and 10% higher subsidy',
      'Applicant should not have received subsidy for same machine in past 5 years'
    ],
    documents: ['Land Records', 'Aadhaar Card', 'Driving License (for tractor)', 'Dealer Quotation', 'Bank Passbook'],
    applyUrl: 'https://agrimachinery.nic.in',
    isActive: true
  }
];

export const sampleDiseaseScans: DiseaseDetectionResult[] = [
  {
    id: 'scan_01',
    cropName: 'Tomato',
    diseaseName: {
      en: 'Tomato Early Blight (Alternaria solani)',
      mr: 'टोमॅटोवरील करपा (अल्टरनेरिया सोलाणी)',
      hi: 'टमाटर का अगेती झुलसा (अल्टरनेरिया)'
    },
    confidence: 96.8,
    severity: 'medium',
    symptoms: [
      'Concentric target-board rings on older lower leaves',
      'Dark brown to black irregular necrotic spots surrounded by chlorotic yellow halos',
      'Premature defoliation exposing green fruits to sunscald'
    ],
    organicRemedy: [
      'Spray 5% Neem Seed Kernel Extract (NSKE) or Neem Oil 1500 ppm @ 4 ml per liter water',
      'Apply Trichoderma viride or Pseudomonas fluorescens biopesticide @ 5g/liter as foliar spray in evening',
      'Drench soil with Jeevamrut to strengthen root rhizosphere microbial immunity'
    ],
    chemicalRemedy: [
      'Foliar spray of Mancozeb 75% WP @ 2.5 grams per liter water at first appearance',
      'In severe cases, spray Azoxystrobin 18.2% + Difenoconazole 11.4% SC (Amistar Top) @ 1 ml/L',
      'Alternate with Chlorothalonil 75% WP @ 2g/L at 10-12 days interval to avoid resistance'
    ],
    fertilizerAdvice: 'Avoid excess foliar Nitrogen which promotes soft succulent vegetative tissue vulnerable to fungal hyphae. Boost Potassium (K) and Calcium (Ca) for leaf cell wall thickening.',
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d69109853?w=500&auto=format&fit=crop&q=80',
    date: '2026-10-09'
  },
  {
    id: 'scan_02',
    cropName: 'Cotton',
    diseaseName: {
      en: 'Cotton Leaf Curl Virus (CLCuV)',
      mr: 'कापसावरील पानांचा चुरडा-मुरडा (व्हायरस)',
      hi: 'कपास का पत्ती मरोड़ रोग (पत्ती कुंचन वायरस)'
    },
    confidence: 94.2,
    severity: 'high',
    symptoms: [
      'Upward and downward curling of margins of leaves with thickened leaf veins',
      'Cup-shaped enations on the lower surface of the leaves',
      'Severe stunting of cotton plants with shortened internodes and fruit drop'
    ],
    organicRemedy: [
      'Install 15-20 Yellow Sticky Traps per acre to trap vector Whiteflies (Bemisia tabaci)',
      'Spray Dashparni Ark @ 250 ml in 15 liters of water mixed with 50g cow urine',
      'Encourage natural ladybird beetles and chrysoperla predators in field borders'
    ],
    chemicalRemedy: [
      'Control Whitefly vector with Diafenthiuron 50% WP @ 1.25 g/liter of water',
      'Spray Pyriproxyfen 10% + Bifenthrin 10% EC @ 1.5 ml/L during egg-nymph phase',
      'Uproot and burn severely infected viral plants to break transmission cycle'
    ],
    fertilizerAdvice: 'Apply Micronutrient mixture grade-2 containing Zinc, Boron, and Magnesium @ 30g/pump to alleviate viral stress symptoms.',
    imageUrl: 'https://images.unsplash.com/photo-1589133428956-6216db8a13a9?w=500&auto=format&fit=crop&q=80',
    date: '2026-10-08'
  },
  {
    id: 'scan_03',
    cropName: 'Rice',
    diseaseName: {
      en: 'Rice Blast (Magnaporthe oryzae)',
      mr: 'तांदळावरील तांबेरा / करपा (राईस ब्लास्ट)',
      hi: 'धान का झोंका रोग (राइस ब्लास्ट)'
    },
    confidence: 97.4,
    severity: 'high',
    symptoms: [
      'Spindle-shaped diamond lesions with gray or whitish centers and brown margins on leaf blade',
      'Neck rot causing panicle breakage and chaffy empty grain heads',
      'Rapid lesion enlargement under cloudy days with high relative humidity (>90%)'
    ],
    organicRemedy: [
      'Seed treatment with Pseudomonas fluorescens @ 10g/kg seed before nursery sowing',
      'Spray fermented buttermilk (3 days old) @ 50 ml/liter mixed with 5g turmeric powder',
      'Avoid standing stagnant warm water; maintain alternate wetting and moderate drying'
    ],
    chemicalRemedy: [
      'Spray Tricyclazole 75% WP (Baan/Beam) @ 0.6 grams per liter of water',
      'Spray Isoprothiolane 40% EC (Fuji-one) @ 1.5 ml per liter of water',
      'Spray Kasugamycin 3% SL @ 2 ml/liter if bacterial blight secondary infection appears'
    ],
    fertilizerAdvice: 'Immediately stop top-dressing of Urea. High chemical nitrogen drastically accelerates blast fungal sporulation. Apply Muriate of Potash (MOP) @ 25 kg/acre.',
    imageUrl: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?w=500&auto=format&fit=crop&q=80',
    date: '2026-10-07'
  },
  {
    id: 'scan_04',
    cropName: 'Sugarcane',
    diseaseName: {
      en: 'Sugarcane Red Rot (Colletotrichum falcatum)',
      mr: 'उसावरील तांबडा कूज रोग (रेड रॉट)',
      hi: 'गन्ने का लाल सड़न रोग (रेड रॉट)'
    },
    confidence: 95.1,
    severity: 'critical' as any,
    symptoms: [
      'Third and fourth leaves from top show yellowing and drying along margins',
      'Longitudinal splitting of cane reveals internal stalk tissue stained blood-red with white cross patches',
      'Sour alcoholic fermented odor emanating from cut infected stems'
    ],
    organicRemedy: [
      'Hot water sett treatment at 52°C for 30 minutes before planting',
      'Dip seed setts in Trichoderma harzianum slurry (10g/L) for 15 minutes before sowing',
      'Practice crop rotation with green manure (Daincha / Sunnhemp) for at least one season'
    ],
    chemicalRemedy: [
      'Sett dip in Carbendazim 50% WP @ 1g/liter of water before planting',
      'Drench planting furrows with Thiophanate Methyl 70% WP @ 2g/liter',
      'Ensure strict phytosanitary burning of infected dry trash to prevent soil spore survival'
    ],
    fertilizerAdvice: 'Apply Silicon fertilizer (Diatomaceous earth / Calcium silicate) @ 150 kg/acre to build tough silica rind defense in cane stalks against borer and fungal entry.',
    imageUrl: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=500&auto=format&fit=crop&q=80',
    date: '2026-10-05'
  }
];

export const initialCameras: WildlifeCamera[] = [
  {
    id: 'cam_01',
    name: 'Cam 01: North Orchard & Creek Border',
    location: 'North-East Fencing (Sector A)',
    status: 'online',
    battery: 92,
    lastActive: 'Live Just now',
    intruderDetected: true,
    nightVision: true,
    currentIntrusion: {
      id: 'alert_w01',
      cameraId: 'cam_01',
      cameraName: 'Cam 01: North Orchard & Creek Border',
      animal: {
        en: 'Wild Boar (Herd of 3)',
        mr: 'रानडुक्कर (३ प्राण्यांचा कळप)',
        hi: 'जंगली सुअर (३ का झुंड)'
      },
      confidence: 96.5,
      timestamp: '2 mins ago (Active in Sector A)',
      severity: 'critical',
      imageUrl: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=600&auto=format&fit=crop&q=80',
      status: 'active',
      notifiedAuthorities: true
    }
  },
  {
    id: 'cam_02',
    name: 'Cam 02: Sugarcane Field East Ridge',
    location: 'East Ridge (Sector B)',
    status: 'online',
    battery: 84,
    lastActive: 'Live Just now',
    intruderDetected: false,
    nightVision: false
  },
  {
    id: 'cam_03',
    name: 'Cam 03: Forest Buffer Zone Boundary',
    location: 'South Perimeter (Forest Border)',
    status: 'online',
    battery: 79,
    lastActive: 'Live Just now',
    intruderDetected: false,
    nightVision: true
  },
  {
    id: 'cam_04',
    name: 'Cam 04: Cotton & Nursery Polyhouse',
    location: 'West Gate Nursery',
    status: 'online',
    battery: 98,
    lastActive: 'Live Just now',
    intruderDetected: false,
    nightVision: false
  }
];

export const sampleWildlifeLogs: WildlifeAlert[] = [
  {
    id: 'log_01',
    cameraId: 'cam_01',
    cameraName: 'Cam 01: North Orchard & Creek Border',
    animal: { en: 'Wild Boar', mr: 'रानडुक्कर', hi: 'जंगली सुअर' },
    confidence: 96.5,
    timestamp: 'Today, 03:12 AM',
    severity: 'critical',
    imageUrl: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=600&auto=format&fit=crop&q=80',
    status: 'active',
    notifiedAuthorities: true
  },
  {
    id: 'log_02',
    cameraId: 'cam_03',
    cameraName: 'Cam 03: Forest Buffer Zone Boundary',
    animal: { en: 'Nilgai (Blue Bull)', mr: 'नीलगाय (रोज)', hi: 'नीलगाय (घोरपड़)' },
    confidence: 92.8,
    timestamp: 'Yesterday, 11:45 PM',
    severity: 'medium',
    imageUrl: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?w=600&auto=format&fit=crop&q=80',
    status: 'resolved',
    notifiedAuthorities: false
  },
  {
    id: 'log_03',
    cameraId: 'cam_02',
    cameraName: 'Cam 02: Sugarcane Field East Ridge',
    animal: { en: 'Spotted Deer Herd', mr: 'चितळ (हरिण)', hi: 'चित्तीदार हिरन' },
    confidence: 95.0,
    timestamp: '08 Oct, 02:20 AM',
    severity: 'low',
    imageUrl: 'https://images.unsplash.com/photo-1484406566174-9da000fda645?w=600&auto=format&fit=crop&q=80',
    status: 'resolved',
    notifiedAuthorities: false
  }
];

export const mockWeatherData = {
  currentTemp: 28,
  condition: 'Partly Sunny / Optimal Humidity',
  feelsLike: 30,
  humidity: 62,
  windSpeed: 11,
  windDirection: 'SW (South-West)',
  rainProbability: 18,
  uvIndex: 'Moderate (5.4)',
  soilMoisture: '64% (Adequate)',
  sprayAdvisory: {
    status: 'Ideal Window for Spraying',
    statusLocal: {
      en: 'Ideal Window for Spraying (Wind < 15km/h, No Heavy Rain in 24h)',
      mr: 'फवारणीसाठी उत्तम वेळ (हवा शांत, २४ तासांत मुसळधार पावसाची शक्यता नाही)',
      hi: 'कीटनाशक छिड़काव का सबसे उत्तम समय (हवा की गति सामान्य, बारिश का खतरा नहीं)'
    },
    recommendedTime: 'Morning 07:00 AM - 10:30 AM or Evening 04:30 PM - 06:30 PM',
  },
  weeklyForecast: [
    { day: 'Mon', high: 31, low: 20, rain: 15, icon: 'sun' },
    { day: 'Tue', high: 32, low: 21, rain: 20, icon: 'sun-cloud' },
    { day: 'Wed', high: 29, low: 22, rain: 45, icon: 'cloud-rain' },
    { day: 'Thu', high: 28, low: 21, rain: 30, icon: 'cloud' },
    { day: 'Fri', high: 30, low: 19, rain: 10, icon: 'sun' },
    { day: 'Sat', high: 32, low: 20, rain: 5, icon: 'sun' },
    { day: 'Sun', high: 33, low: 21, rain: 10, icon: 'sun' },
  ]
};

export const mockSoilData = {
  nitrogen: { value: 240, status: 'Optimal', unit: 'kg/ha', optimalRange: '200 - 300' },
  phosphorus: { value: 26, status: 'Good', unit: 'kg/ha', optimalRange: '20 - 35' },
  potassium: { value: 295, status: 'High', unit: 'kg/ha', optimalRange: '150 - 250' },
  ph: { value: 6.8, status: 'Slightly Acidic (Ideal for Most Crops)', unit: 'pH', optimalRange: '6.5 - 7.5' },
  organicCarbon: { value: 0.65, status: 'Moderate (Boost recommended)', unit: '%', optimalRange: '0.75 - 1.2%' },
  electricalConductivity: { value: 0.42, status: 'Normal Non-Saline', unit: 'dS/m', optimalRange: '< 1.0' },
  recommendation: {
    en: 'Incorporate 4-5 tonnes of well-rotted FYM (Farm Yard Manure) or vermicompost per acre during secondary tillage to raise organic carbon. Soil biology and micronutrient availability will improve by 30%.',
    mr: 'सेंद्रिय कर्ब वाढवण्यासाठी मशागतीच्या वेळी एकरी ४-५ ट्रॉली चांगले कुजलेले शेणखत किंवा गांडूळ खत टाका. जमिनीची सुपीकता आणि सूक्ष्मअन्नद्रव्यांची कार्यक्षमता ३०% वाढेल.',
    hi: 'जैविक कार्बन बढ़ाने के लिए खेत की तैयारी के समय प्रति एकड़ ४-५ टन अच्छी तरह सड़ी हुई गोबर की खाद या वर्मीकम्पोस्ट मिलाएं। इससे मिट्टी की उर्वरता ३०% तक बढ़ेगी।'
  }
};
