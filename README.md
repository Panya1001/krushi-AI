# 🌱 KrishiAI (कृषी AI / कृषि AI)
### Next-Gen AI-Powered Smart Agriculture Ecosystem for Indian Farmers

KrishiAI is an AI-powered smart farming application designed to empower Indian farmers to make better agricultural decisions, increase crop productivity, eliminate losses from pest outbreaks and wildlife intrusions, and maximize profitability.

---

## 🌟 Key Features & Modules

1. **🌐 Trilingual Multilingual Support**
   - Full native localization in **Marathi (मराठी)**, **Hindi (हिंदी)**, and **English**.
   - Language selector readily available in the top bar with localized terms, currencies, and crops.

2. **🔬 AI Crop Disease Detection**
   - Upload leaf photos or select from pre-loaded field samples (Tomato Early Blight, Cotton Leaf Curl Virus, Rice Blast, Sugarcane Red Rot).
   - Instant computer vision diagnosis: confidence score, severity level, symptoms, and organic biocontrol vs. chemical remedies with exact dosage per liter.
   - Saves diagnostic medical records with celebratory confetti and printable prescriptions.

3. **🚨 Smart Wildlife Intrusion System**
   - Simulated 4-camera smart boundary surveillance grid (Sector A Orchard, Sugarcane Ridge, Forest Buffer, Polyhouse).
   - AI bounding box identification for **Wild Boars (रानडुक्कर)**, **Nilgai (नीलगाय)**, **Elephant Herds (हत्ती)**, and **Spotted Deer**.
   - Interactive acoustic emergency siren with browser Web Audio API dual-tone frequency generator.
   - Night vision (infrared) toggle, snapshot photo capture gallery, and instant SMS alert dispatch to forest officials.
   - Demo test intrusion trigger button for quick presentation testing.

4. **📈 Real-Time APMC Mandi Rates & Best Market Recommendation**
   - Live prices across major mandis (Lasalgaon, Pimpalgaon, Pune, Indore, Rajkot, Khanna, Akola).
   - 7-day SVG interactive rate trend curves.
   - MSP comparison indicators (Above MSP / Below MSP).
   - **AI Best Mandi Recommendation Engine**: Computes distance and diesel freight cost to identify the highest net-profit market.

5. **🏛️ Government Schemes & Subsidies Matcher**
   - Central and State schemes (PM-KISAN, Namo Shetkari Mahasanman Nidhi, PM-KUSUM Solar Pump 90% subsidy, PM Fasal Bima Yojana, SMAM Tractor subsidy).
   - Filterable by State, Category, and Landholding size.
   - Interactive step-by-step eligibility checklist and required document verification.

6. **💰 AI Farm Profit & Cost Calculator**
   - Calculates production costs (seeds, fertilizers, pesticides, labor, irrigation, tractor machinery hire, transport).
   - Instant calculation of gross revenue, net profit per acre, profit margin %, and **Break-Even Price per Quintal** to prevent distress sales.

7. **🌾 Precision Crop Recommendation**
   - Inputs: GPS location, Soil Type (Medium Black, Red Loam, Alluvial), N-P-K nutrient indicators, irrigation method, and season.
   - Output: Top 3 ranked crops with match scores, expected yields, projected profits, and scientific justifications.

8. **🌦️ Weather & Soil Health Analytics**
   - 7-day agricultural forecast with rain probabilities and wind speed.
   - Precision pesticide spraying window advisory.
   - Digital Soil Health Card with Nitrogen, Phosphorus, Potassium, pH, Organic Carbon, and Moisture gauges.

9. **🤖 KrishiAI Mitra (कृषी मित्र) AI Chat Specialist**
   - Floating agronomist assistant.
   - **Voice Input** via Web Speech API (speech-to-text in Marathi, Hindi, English).
   - **Audio Playback** (text-to-speech) so farmers can listen to advice in their regional language.
   - Optional Google Gemini API key configuration with smart offline fallback knowledge base.

10. **👨‍🌾 Farmer Profile & 🛡️ Admin Command Center**
    - Profile management with 1-click hackathon demo presets:
      - `Ramesh Patil` (Maharashtra Farmer • 5.5 Acres)
      - `Gurpreet Singh` (Punjab Farmer • 8.0 Acres)
      - `Dr. Swati Kulkarni` (Admin / State Agri Officer)
    - Admin console to manage schemes, update APMC rates, and broadcast emergency alerts to farmers.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide Icons
- **Build Tool**: Vite 8
- **Audio & Speech**: Web Speech API (Recognition + Synthesis), Web Audio API (Dual-tone Siren Generator)
- **Design System**: Glassmorphism, Emerald and White agricultural theme, responsive for mobile, tablet, and desktop

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.
