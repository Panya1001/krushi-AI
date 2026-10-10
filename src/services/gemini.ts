// KrishiAI Mitra - AI Agriculture Chat Intelligence Service

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export async function askKrishiMitra(
  prompt: string,
  lang: 'en' | 'mr' | 'hi',
  conversationHistory: ChatMessage[] = []
): Promise<string> {
  const customKey = localStorage.getItem('krishiai_gemini_api_key');

  if (customKey && customKey.trim().length > 10) {
    try {
      const systemInstruction = `You are KrishiAI Mitra (कृषी मित्र / कृषि मित्र), an empathetic, highly knowledgeable agricultural scientist and agronomist for Indian farmers. Always answer in the farmer's requested language (${
        lang === 'mr' ? 'Marathi (मराठी)' : lang === 'hi' ? 'Hindi (हिंदी)' : 'English'
      }). Provide actionable, practical advice covering crop cultivation, fertilizer NPK dosages, biological and chemical pest remedies, PM schemes, and market timing. Format cleanly with bullet points.`;

      const contents = [
        { role: 'user', parts: [{ text: systemInstruction }] },
        ...conversationHistory.slice(-4).map(msg => ({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }]
        })),
        { role: 'user', parts: [{ text: prompt }] }
      ];

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${customKey.trim()}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents })
      });

      if (res.ok) {
        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text;
      }
    } catch (e) {
      console.warn("Gemini API call failed, falling back to local Agronomist AI model", e);
    }
  }

  // Local Intelligent Agronomy Knowledge Engine
  return generateOfflineAgriResponse(prompt, lang);
}

function generateOfflineAgriResponse(prompt: string, lang: 'en' | 'mr' | 'hi'): string {
  const p = prompt.toLowerCase();

  // Whitefly / Cotton
  if (p.includes('पांढरी माशी') || p.includes('सफेद मक्खी') || p.includes('whitefly') || p.includes('कापूस') || p.includes('कपास') || p.includes('cotton')) {
    if (lang === 'mr') {
      return `🌱 **कापसावरील पांढऱ्या माशीचे (Whitefly) नियंत्रण व उपाय:**

1. **जैविक व प्रतिबंधक उपाय:**
   - एकरी १५ ते २० **पिवळे चिकट सापळे (Yellow Sticky Traps)** पिकाच्या उंचीपेक्षा एक फूट वर लावावेत.
   - **दशपर्णी अर्क** (२०० मिली प्रति १५ लिटर पाणी) फवारल्यास प्राथमिक अवस्थेत चांगला फायदा होतो.
   - लिंबोळी अर्क (५%) किंवा निम तेल १५०० पीपीएम (४ मिली/लिटर) फवारावे.

2. **रासायनिक फवारणी (तीव्रतेनुसार):**
   - अंडी व पिल्लांच्या अवस्थेत: **पायरीप्रॉक्सिफेन १०% + बायफेन्थ्रीन १०% EC** @ २५ मिली प्रति १५ लिटर पंप.
   - प्रौढ माशीच्या तीव्र प्रादुर्भावासाठी: **डायफेन्थियुरॉन ५०% WP** @ २० ग्रॅम प्रति १५ लिटर पाणी.

⚠️ *टीप: सकाळी किंवा संध्याकाळी फवारणी करावी व पानांच्या खालच्या बाजूवर औषध व्यवस्थित पोहोचेल याची काळजी घ्यावी.*`;
    } else if (lang === 'hi') {
      return `🌱 **कपास में सफेद मक्खी (Whitefly) का वैज्ञानिक समाधान:**

1. **जैविक एवं यांत्रिक नियंत्रण:**
   - प्रति एकड़ १५-२० **पीले चिपचिपे ट्रैप (Yellow Sticky Traps)** लगाएं।
   - नीम का तेल १५०० पीपीएम (४ मिली प्रति लीटर पानी) का छिड़काव करें।

2. **रासायनिक उपचार:**
   - प्रारंभिक अवस्था में: **पायरीप्रॉक्सीफेन १०% + बाइफेंथ्रिन १०% EC** @ १.५ मिली/लीटर पानी।
   - वयस्क मक्खी की अधिकता होने पर: **डायफेंथियूरॉन ५०% WP** @ १.२५ ग्राम/लीटर पानी।

⚠️ *सलाह: हमेशा कीटनाशक का छिड़काव पत्तियों की निचली सतह पर करें क्योंकि सफेद मक्खी वहीं छिपी रहती है।*`;
    } else {
      return `🌱 **Management of Whitefly in Cotton Crop:**

1. **Cultural & Biocontrol:**
   - Install 15-20 **Yellow Sticky Traps** per acre just above canopy height.
   - Spray 5% Neem Seed Kernel Extract (NSKE) or Neem Oil 1500 ppm @ 4 ml/L.

2. **Chemical Recommendations:**
   - For nymph & egg suppression: **Pyriproxyfen 10% + Bifenthrin 10% EC** @ 25 ml per 15L sprayer.
   - For heavy adult infestation: **Diafenthiuron 50% WP** @ 20g per 15L sprayer.

⚠️ *Pro-tip: Ensure thorough under-leaf coverage as whiteflies congregate on leaf undersides.*`;
    }
  }

  // Yellow Rust / Wheat
  if (p.includes('yellow rust') || p.includes('पीला रतुआ') || p.includes('तांबेरा') || p.includes('गहू') || p.includes('गेहूं') || p.includes('wheat')) {
    if (lang === 'mr') {
      return `🌾 **गव्हावरील तांबेरा (Yellow Rust) व्यवस्थापन:**

1. **लक्षणे:** पानांवर पिवळ्या रंगाच्या ओळींमध्ये बारीक ठिपके दिसतात, हाताला पिवळी पावडर लागते.
2. **तात्काळ उपाय:**
   - **प्रोपिकोनाझोल २५% EC (टिल्ट)** @ १ मिली प्रति लिटर पाणी (१५ मिली प्रति पंप) फवारावे.
   - किंवा **टेबुकोनाझोल २५.९% EC** @ १ मिली प्रति लिटर पाणी.
   - युरियाचा अतिरिक्त वापर ताबडतोब थांबवावा; पोटॅश खताचा वापर वाढवावा.`;
    } else if (lang === 'hi') {
      return `🌾 **गेहूं में पीला रतुआ (Yellow Rust) की रोकथाम:**

1. **पहचान:** पत्तियों पर हल्दी जैसी पीली धारियां बनती हैं और छूने पर उंगलियों पर पीला पाउडर लगता है।
2. **सटीक उपचार:**
   - **प्रोपिकोनाजोल २५% EC (टिल्ट)** @ १ मिली प्रति लीटर पानी (१५ मिली प्रति पंप) का तत्काल छिड़काव करें।
   - अथवा **टेबुकोनाजोल २५.९% EC** @ १ मिली/लीटर पानी।
   - यूरिया की अतिरिक्त खुराक बंद करें और खेत में पोटाश दें।`;
    } else {
      return `🌾 **Management of Yellow Rust in Wheat:**

1. **Key Symptoms:** Bright yellow linear powdery stripes along leaf veins resembling turmeric powder.
2. **Immediate Remedial Spray:**
   - Foliar spray of **Propiconazole 25% EC (Tilt)** @ 1 ml/L (15 ml per 15-liter spray tank).
   - Alternatively spray **Tebuconazole 25.9% EC** @ 1 ml/L.
   - Cease nitrogenous top dressing immediately and supply MOP (Potash) to boost immunity.`;
    }
  }

  // Kusum Solar Pump / Schemes
  if (p.includes('kusum') || p.includes('कुसुम') || p.includes('solar') || p.includes('सोलर') || p.includes('पंप') || p.includes('योजना') || p.includes('scheme')) {
    if (lang === 'mr') {
      return `☀️ **पंतप्रधान कुसुम सोलर कृषी पंप योजना माहिती व अर्ज प्रक्रिया:**

1. **सबसिडी:** ३, ५ आणि ७.५ एचपी सौर पंपावर **९०% पर्यंत शासकीय अनुदान** मिळते (शेतकऱ्याला फक्त १०% रक्कम भरावी लागते).
2. **पात्रता:**
   - स्वतःची शेतजमीन आणि हक्काचा पाण्याचा स्रोत (विहीर, कूपनलिका किंवा शेततळे) असणे आवश्यक.
   - यापूर्वी त्या विहिरीवर पारंपरिक कृषी वीज कनेक्शन घेतलेले नसावे.
3. **आवश्यक कागदपत्रे:**
   - ७/१२ व ८-अ उतारा (विहिरीची नोंद असलेला)
   - आधार कार्ड आणि बँक पासबुक झेरॉक्स
   - महाडीबीटी पोर्टलवर 'कुसुम सोलर पंप' अंतर्गत नोंदणी करा.`;
    } else if (lang === 'hi') {
      return `☀️ **पीएम कुसुम सोलर पंप योजना - पूरी जानकारी:**

1. **सब्सिडी:** ३, ५ और ७.५ हॉर्सपावर के सोलर पंपों पर **९०% तक सरकारी सब्सिडी** दी जाती है (किसान को मात्र १०% अंशदान देना होता है)।
2. **पात्रता:**
   - खेत में पानी का स्रोत (कुआं, बोरवेल, या तालाब) होना आवश्यक।
   - पहले से कोई पारंपरिक बिजली कनेक्शन न हो।
3. **जरूरी दस्तावेज:**
   - जमीन का खसरा-खतौनी
   - आधार कार्ड, बैंक पासबुक और मोबाइल नंबर।
   - राज्य के कृषि/ऊर्जा पोर्टल (जैसे महाऊर्जा / यूपीनेडा) पर ऑनलाइन आवेदन करें।`;
    } else {
      return `☀️ **PM-KUSUM Solar Agricultural Pump Scheme Overview:**

1. **Subsidy:** Up to **90% government subsidy** on 3 HP, 5 HP, and 7.5 HP off-grid solar pumps (farmer contribution is just 10%).
2. **Eligibility:**
   - Farmer must have confirmed water source (Well, Borewell, Farm pond).
   - Must not have active grid electricity connection on said pump site.
3. **Key Documents:**
   - Land ownership records (7/12 & 8A / Khasra-Khatauni)
   - Aadhaar, Bank Passbook, NOC for water source.
   - Apply online via State Renewable Energy Portal (MahaUrja / UPNEDA / PM-KUSUM).`;
    }
  }

  // General Agronomy Advisory
  if (lang === 'mr') {
    return `🌾 **कृषीAI मित्र सल्लागार:**

तुमच्या प्रश्नासाठी धन्यवाद! चांगल्या उत्पादनासाठी आणि पिकांच्या आरोग्यासाठी खालील तीन मुख्य गोष्टी लक्षात ठेवा:

1. **समतोल खत व्यवस्थापन:** नत्र, स्फुरद आणि पालाश (N:P:K) चा वापर जमिनीच्या माती परीक्षणानुसारच करावा.
2. **रोग प्रतिबंधक फवारणी:** रोगाची पहिली लक्षणे दिसताच जैविक उपाय (निम अर्क / ट्रायकोडर्मा) सुरू करा.
3. **पाणी व्यवस्थापन:** ठिबक सिंचनाचा वापर केल्यास पाण्याची ५०% बचत होते आणि उत्पादनात ३०% वाढ होते.

*तुम्हाला कोणत्या विशिष्ट पिकाबद्दल (कापूस, सोयाबीन, कांदा, ऊस, टोमॅटो) माहिती हवी आहे? विचारू शकता!*`;
  } else if (lang === 'hi') {
    return `🌾 **कृषिAI मित्र सलाहकार:**

आपके सवाल के लिए धन्यवाद! बेहतर पैदावार और फसलों की सुरक्षा के लिए ये तीन बातें हमेशा ध्यान रखें:

1. **संतुलित उर्वरक:** मृदा स्वास्थ्य कार्ड के अनुसार ही यूरिया, डीएपी और पोटाश का प्रयोग करें।
2. **समय पर रोकथाम:** रोग के शुरुआती लक्षणों में नीम तेल या जैविक ट्राइकोडर्मा का छिड़काव अत्यधिक प्रभावी होता है।
3. **सूक्ष्म सिंचाई:** ड्रिप व स्प्रिंकलर तकनीक अपनाकर ५०% पानी की बचत और पैदावार में ३५% तक बढ़ोतरी करें।

*कृपया बताएं कि आपको किस विशेष फसल (गेहूं, धान, कपास, गन्ना, प्याज या टमाटर) के बारे में जानकारी चाहिए?*`;
  } else {
    return `🌾 **KrishiAI Specialist Advisory:**

Thank you for your question! For optimal harvest efficiency and soil vitality, consider these three principles:

1. **Balanced Nutrition:** Apply N-P-K according to soil test values to avoid wasteful excessive nitrogen.
2. **Integrated Pest Management (IPM):** Employ yellow sticky traps and bio-agents (Trichoderma / Neem 1500ppm) at early stages.
3. **Precision Drip Fertigation:** Conserves 50% irrigation water while boosting fertilizer uptake efficiency by 35%.

*Feel free to ask specifically about cotton, soybean, sugarcane, wheat, onion, or tomato cultivation!*`;
  }
}
