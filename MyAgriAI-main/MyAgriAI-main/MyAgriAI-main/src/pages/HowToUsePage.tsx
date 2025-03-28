
import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Camera, CloudSun, BarChart3, MessageCircle } from 'lucide-react';

const HowToUsePage = () => {
  const { t } = useLanguage();

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

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-16"
        >
          <div className="text-center mb-12">
            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-4">
              {t('howto.title')}
            </motion.h1>
            <motion.p variants={itemVariants} className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('howto.description')}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div variants={itemVariants}>
              <Card className="h-full glass-morphism card-hover">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Camera className="h-6 w-6 text-primary" />
                    <CardTitle>{t('howto.pestTitle')}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {t('howto.pestDesc')}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card className="h-full glass-morphism card-hover">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <CloudSun className="h-6 w-6 text-primary" />
                    <CardTitle>{t('howto.weatherTitle')}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {t('howto.weatherDesc')}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card className="h-full glass-morphism card-hover">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="h-6 w-6 text-primary" />
                    <CardTitle>{t('howto.cropTitle')}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {t('howto.cropDesc')}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card className="h-full glass-morphism card-hover">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="h-6 w-6 text-primary" />
                    <CardTitle>{t('howto.chatTitle')}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {t('howto.chatDesc')}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default HowToUsePage;
