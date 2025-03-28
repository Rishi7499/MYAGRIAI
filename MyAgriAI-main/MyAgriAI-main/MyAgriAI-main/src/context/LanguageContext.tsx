
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define available languages
export type Language = 'en' | 'hi';

// Define language context type
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

// English translations
const enTranslations: Record<string, string> = {
  // Navigation
  'nav.dashboard': 'Dashboard',
  'nav.cropAnalysis': 'Crop Analysis',
  'nav.chatWithAI': 'Chat with AI',
  'nav.pestDiagnosis': 'Pest & Disease Diagnosis',
  'nav.howToUse': 'How To Use',
  //'nav.signIn': 'Sign In',
  
  // Hero section
  'hero.subtitle': 'Smart Farming Technology',
  'hero.title': 'Precision Agriculture Powered by Advanced AI Technology',
  'hero.description': 'Transform your farm with data-driven insights and IoT technology. Our platform integrates sensors, drones, satellite imagery, and AI algorithms to optimize every aspect of your agricultural operations.',
  'hero.startOptimizing': 'Start Optimizing',
  'hero.exploreTechnologies': 'Explore Technologies',
  
  // Features
  'features.title': 'Smart Farming Features',
  'features.description': 'Our platform uses AI to help farmers diagnose plant issues and check weather conditions',
  
  // CTA
  'cta.title': 'Ready to Transform Your Farm?',
  'cta.description': 'Explore our crop analysis tool or chat with the agricultural AI assistant',
  'cta.analyzeCrop': 'Analyze Crop Data',
  'cta.chatWithAI': 'Chat with AI',
  
  // Footer
  'footer.description': 'Smart farming solutions',
  'footer.rights': 'All rights reserved.',
  
  // Pest Diagnosis
  'pest.title': 'Pest & Disease Diagnosis',
  'pest.description': 'Upload an image of your crop for AI diagnosis',
  'pest.upload': 'Click to upload or drag and drop',
  'pest.fileTypes': 'JPG, PNG or WEBP (max. 5MB)',
  'pest.diagnose': 'Diagnose Problem',
  'pest.analyzing': 'Analyzing Image...',
  'pest.result': 'AI Diagnosis:',
  'pest.removeImage': 'Remove Image',

  // How To Use
  'howto.title': 'How To Use MyAgriAI',
  'howto.description': 'Learn how to use all features of our platform',
  'howto.pestTitle': 'Pest & Disease Diagnosis',
  'howto.pestDesc': 'Upload clear images of affected crops. The AI will identify pests, diseases, severity, and suggest treatments.',
  'howto.weatherTitle': 'Weather Forecast',
  'howto.weatherDesc': 'Select your city from the dropdown menu to get accurate weather forecasts for better planning.',
  'howto.cropTitle': 'Crop Analysis',
  'howto.cropDesc': 'Upload CSV files with crop data to visualize and analyze performance metrics with our interactive charts.',
  'howto.chatTitle': 'Chat with AI',
  'howto.chatDesc': 'Ask farming-related questions to our AI assistant for personalized recommendations and guidance.',

  
  
  // Chat with AI
  'chat.title': 'Chat with FarmGenius AI',
  'chat.subtitle': 'AI Assistant',
  'chat.description': 'Ask questions about farming, crops, or agricultural practices',
  'chat.placeholder': 'Ask about farming, crops, or agricultural practices...',
  'chat.welcomeMessage': "Hello! I'm FarmGenius AI powered by Gemini. How can I help with your farming questions today?",
  'chat.imageSelected': 'Image selected',
  'chat.imageSelectedDesc': 'Your image is ready to send with your message',
  'chat.prefilledQuestion': "We've pre-filled your question from the crop analysis",
  'chat.getAdvice': 'Get farming advice, crop recommendations, and agricultural insights',
  'chat.error': 'Error',
  'chat.errorDesc': 'Failed to get response from AI. Please try again.',
  'chat.fileTooLarge': 'File too large',
  'chat.fileTooLargeDesc': 'Please select an image smaller than 5MB',
  'chat.invalidFileType': 'Invalid file type',
  'chat.invalidFileTypeDesc': 'Please select an image file',

  // Crop Analysis
  'crop.title': 'Crop Data Analysis',
  'crop.subtitle': 'Data Analytics',
  'crop.description': 'Upload your crop data and get AI-powered insights to optimize your farming practices',
  'crop.solutions': 'Intelligent farming solutions',
  
  // Weather Forecast
  'weather.title': 'Weather Forecast',
  'weather.description': 'Weather-based farming recommendations',
  'weather.searchPlaceholder': 'Search for a city in India...',
  'weather.updated': 'Weather Updated',
  'weather.updatedDesc': 'Weather data for {city} has been updated.',
  'weather.humidity': 'Humidity',
  'weather.windSpeed': 'Wind Speed',
  'weather.forecast': '3-Day Forecast',
  'weather.recommendation': 'Farming Recommendation:',
};

// Hindi translations
const hiTranslations: Record<string, string> = {
  // Navigation
  'nav.dashboard': 'डैशबोर्ड',
  'nav.cropAnalysis': 'फसल विश्लेषण',
  'nav.chatWithAI': 'AI के साथ चैट करें',
  'nav.pestDiagnosis': 'कीट और रोग निदान',
  'nav.howToUse': 'उपयोग कैसे करें',
  //'nav.signIn': 'साइन इन करें',
  
  // Hero section
  'hero.subtitle': 'स्मार्ट खेती तकनीक',
  'hero.title': 'उन्नत AI तकनीक द्वारा संचालित सटीक कृषि',
  'hero.description': 'डेटा-संचालित अंतर्दृष्टि और IoT तकनीक के साथ अपने खेत को बदलें। हमारा प्लेटफॉर्म आपके कृषि संचालन के हर पहलू को अनुकूलित करने के लिए सेंसर, ड्रोन, उपग्रह इमेजरी और AI एल्गोरिदम को एकीकृत करता है।',
  'hero.startOptimizing': 'अनुकूलन शुरू करें',
  'hero.exploreTechnologies': 'तकनीकों का अन्वेषण करें',
  
  // Features
  'features.title': 'स्मार्ट खेती विशेषताएं',
  'features.description': 'हमारा प्लेटफॉर्म किसानों को पौधों की समस्याओं का निदान करने और मौसम की स्थिति की जांच करने में मदद करने के लिए AI का उपयोग करता है',
  
  // CTA
  'cta.title': 'अपने खेत को बदलने के लिए तैयार हैं?',
  'cta.description': 'हमारे फसल विश्लेषण उपकरण का अन्वेषण करें या कृषि AI सहायक के साथ चैट करें',
  'cta.analyzeCrop': 'फसल डेटा का विश्लेषण करें',
  'cta.chatWithAI': 'AI के साथ चैट करें',
  
  // Footer
  'footer.description': 'स्मार्ट खेती समाधान',
  'footer.rights': 'सर्वाधिकार सुरक्षित।',
  
  // Pest Diagnosis
  'pest.title': 'कीट और रोग निदान',
  'pest.description': 'AI निदान के लिए अपनी फसल की छवि अपलोड करें',
  'pest.upload': 'अपलोड करने के लिए क्लिक करें या खींचें और छोड़ें',
  'pest.fileTypes': 'JPG, PNG या WEBP (अधिकतम 5MB)',
  'pest.diagnose': 'समस्या का निदान करें',
  'pest.analyzing': 'छवि का विश्लेषण...',
  'pest.result': 'AI निदान:',
  'pest.removeImage': 'छवि हटाएं',

  // How To Use
  'howto.title': 'MyAgriAI का उपयोग कैसे करें',
  'howto.description': 'हमारे प्लेटफॉर्म की सभी सुविधाओं का उपयोग करना सीखें',
  'howto.pestTitle': 'कीट और रोग निदान',
  'howto.pestDesc': 'प्रभावित फसलों की स्पष्ट छवियां अपलोड करें। AI कीटों, बीमारियों, गंभीरता की पहचान करेगा, और उपचार सुझाएगा।',
  'howto.weatherTitle': 'मौसम का पूर्वानुमान',
  'howto.weatherDesc': 'बेहतर योजना के लिए सटीक मौसम पूर्वानुमान प्राप्त करने के लिए ड्रॉपडाउन मेनू से अपना शहर चुनें।',
  'howto.cropTitle': 'फसल विश्लेषण',
  'howto.cropDesc': 'हमारे इंटरैक्टिव चार्ट के साथ प्रदर्शन मेट्रिक्स को विज़ुअलाइज़ और विश्लेषण करने के लिए फसल डेटा के साथ CSV फ़ाइलें अपलोड करें।',
  'howto.chatTitle': 'AI के साथ चैट करें',
  'howto.chatDesc': 'व्यक्तिगत सिफारिशों और मार्गदर्शन के लिए हमारे AI सहायक से खेती से संबंधित प्रश्न पूछें।',
  
  //crop analysis
  










  // Chat with AI

  'chat.title': 'FarmGenius AI के साथ चैट करें',
  //'chat.title': 'Chat--------------',
  'chat.subtitle': 'AI सहायक',
  'chat.description': 'खेती, फसलों, या कृषि प्रथाओं के बारे में प्रश्न पूछें',
  'chat.placeholder': 'खेती, फसलों, या कृषि प्रथाओं के बारे में पूछें...',
  'chat.welcomeMessage': "नमस्ते! मैं FarmGenius AI हूँ, Gemini द्वारा संचालित। मैं आज आपके कृषि प्रश्नों में कैसे सहायता कर सकता हूँ?",
  'chat.imageSelected': 'छवि चयनित',
  'chat.imageSelectedDesc': 'आपकी छवि आपके संदेश के साथ भेजने के लिए तैयार है',
  'chat.prefilledQuestion': "हमने फसल विश्लेषण से आपका प्रश्न पहले से भर दिया है",
  'chat.getAdvice': 'खेती की सलाह, फसल अनुशंसाएं और कृषि अंतर्दृष्टि प्राप्त करें',
  'chat.error': 'त्रुटि',
  'chat.errorDesc': 'AI से प्रतिक्रिया प्राप्त करने में विफल। कृपया पुन: प्रयास करें।',
  'chat.fileTooLarge': 'फ़ाइल बहुत बड़ी है',
  'chat.fileTooLargeDesc': 'कृपया 5MB से छोटी छवि चुनें',
  'chat.invalidFileType': 'अमान्य फ़ाइल प्रकार',
  'chat.invalidFileTypeDesc': 'कृपया एक छवि फ़ाइल चुनें',
  



  // Crop Analysis
  'crop.title': 'फसल डेटा विश्लेषण',
  'crop.subtitle': 'डेटा विश्लेषिकी',
  'crop.description': 'अपनी खेती प्रथाओं को अनुकूलित करने के लिए अपना फसल डेटा अपलोड करें और AI-संचालित अंतर्दृष्टि प्राप्त करें',
  'crop.solutions': 'बुद्धिमान खेती समाधान',
  
  // Weather Forecast
  'weather.title': 'मौसम पूर्वानुमान',
  'weather.description': 'मौसम-आधारित खेती की सिफारिशें',
  'weather.searchPlaceholder': 'भारत में किसी शहर की खोज करें...',
  'weather.updated': 'मौसम अपडेट हुआ',
  'weather.updatedDesc': '{city} के लिए मौसम डेटा अपडेट कर दिया गया है।',
  'weather.humidity': 'आर्द्रता',
  'weather.windSpeed': 'हवा की गति',
  'weather.forecast': '3-दिन का पूर्वानुमान',
  'weather.recommendation': 'खेती की सिफारिश:',
};

// Provider component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get initial language preference from localStorage or default to English
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage === 'hi' ? 'hi' : 'en') as Language;
  });

  // Translations object based on current language
  const translations = language === 'en' ? enTranslations : hiTranslations;

  // Translation function
  const t = (key: string): string => {
    return translations[key] || key;
  };

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using language context
export const useLanguage = () => useContext(LanguageContext);
