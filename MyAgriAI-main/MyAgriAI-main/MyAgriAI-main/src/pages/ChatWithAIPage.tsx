
import Header from '@/components/Header';
import ChatWithAI from '@/components/ChatWithAI';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ChatWithAIPage = () => {
  const location = useLocation();
  const [questionFromAnalysis, setQuestionFromAnalysis] = useState<string | undefined>(undefined);
  
  useEffect(() => {
    // Check if there's a question in the location state
    if (location.state?.question) {
      setQuestionFromAnalysis(location.state.question);
      // Clear the state to prevent reusing the same question on page refreshes
      window.history.replaceState({}, document.title);
    }
  }, [location]);
  
  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="pt-28 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12"
          >
            <div className="subtle-chip mb-4 inline-block">AI Assistant</div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Chat with FarmGenius AI</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {questionFromAnalysis 
                ? "We've pre-filled your question from the crop analysis" 
                : "Get farming advice, crop recommendations, and agricultural insights"}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="flex justify-center"
          >
            <ChatWithAI initialQuestion={questionFromAnalysis} />
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-10 px-4 border-t mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <span className="text-primary text-xl font-bold">FarmGenius</span>
            <p className="text-sm text-muted-foreground mt-1">Intelligent farming solutions</p>
          </div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} FarmGenius. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ChatWithAIPage;
