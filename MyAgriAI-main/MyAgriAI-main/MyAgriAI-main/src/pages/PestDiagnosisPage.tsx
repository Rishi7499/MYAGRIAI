
import React from 'react';
import Header from '@/components/Header';
import PestDiagnosis from '@/components/PestDiagnosis';
import { useLanguage } from '@/context/LanguageContext';

const PestDiagnosisPage = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-24">
        <div className="container mx-auto py-8">
          <div className="w-full max-w-3xl mx-auto">
            <PestDiagnosis />
          </div>
        </div>
      </main>
    </div>
  );
};

export default PestDiagnosisPage;
