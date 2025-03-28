
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import PestDiagnosis from '@/components/PestDiagnosis';
import WeatherForecast from '@/components/WeatherForecast';
import FeatureCard from '@/components/FeatureCard';
import { ChevronDown, Cpu, Cloud, Leaf, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    setIsLoaded(true);
    
    // Force dark mode as per design
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
    localStorage.setItem('theme', 'dark');
  }, []);

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  const handleStartOptimizing = () => {
    navigate('/crop-analysis');
  };

  const handleExploreTechnologies = () => {
    navigate('/chat-with-ai');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-section px-4 relative pt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="subtle-chip mb-4 inline-flex"
            >
              <Leaf className="h-3 w-3 mr-1" /> {t('hero.subtitle')}
            </motion.div>
            
            <motion.h1
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={textVariants}
              className="text-5xl md:text-6xl font-bold mb-6 max-w-4xl tracking-tight"
            >
              {t('hero.title')}
            </motion.h1>
            
            <motion.p
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={textVariants}
              transition={{ delay: 0.1 }}
              className="text-base md:text-lg text-muted-foreground mb-10 max-w-xl"
            >
              {t('hero.description')}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mb-20"
            >
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 bg-primary text-white hover:bg-primary/90"
                onClick={handleStartOptimizing}
              >
                {t('hero.startOptimizing')}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 group"
                onClick={handleExploreTechnologies}
              >
                {t('hero.exploreTechnologies')} <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
          
          <div className="order-1 lg:order-2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="relative"
            >
              <img 
                src="/lovable-uploads/R.jpeg" 
                alt="Smart Agriculture" 
                className="rounded-2xl object-cover w-full h-[500px]"
              />
              
              <div className="absolute top-6 right-6 feature-card w-64">
                <Cloud className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold text-sm">IoT Sensor Network</h3>
                  <p className="text-xs text-muted-foreground">24/7 environmental monitoring</p>
                </div>
              </div>
              
              <div className="absolute bottom-6 right-6 feature-card w-64">
                <Cpu className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold text-sm">AI-Powered Analytics</h3>
                  <p className="text-xs text-muted-foreground">Real-time crop insights</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-secondary/30">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center mb-16">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={textVariants}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              {t('features.title')}
            </motion.h2>
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={textVariants}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              {t('features.description')}
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="col-span-1 h-full">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={itemVariants}
                className="h-full"
              >
                <PestDiagnosis />
              </motion.div>
            </div>
            
            <div className="col-span-1 h-full">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={itemVariants}
                className="h-full"
              >
                <WeatherForecast />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-primary/5 rounded-3xl p-8 md:p-16 text-center">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={textVariants}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              {t('cta.title')}
            </motion.h2>
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={textVariants}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
            >
              {t('cta.description')}
            </motion.p>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={textVariants}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" className="text-lg px-8" asChild>
                <a href="/crop-analysis">{t('cta.analyzeCrop')}</a>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                <a href="/chat-with-ai">{t('cta.chatWithAI')}</a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-10 px-4 border-t border-border/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 flex items-center">
            <Leaf className="h-5 w-5 text-primary mr-2" />
            <span className="text-foreground text-xl font-bold">MyAgriAI</span>
            <p className="text-sm text-muted-foreground ml-4">{t('footer.description')}</p>
          </div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} MyAgriAI. {t('footer.rights')}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
