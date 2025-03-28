
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '@/context/LanguageContext';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Force dark mode for this project as per design
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
    localStorage.setItem('theme', 'dark');
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
      isScrolled ? 'py-2 bg-background/80 backdrop-blur-lg shadow-sm' : 'py-4 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Leaf className="h-6 w-6 text-primary" />
          <span className="text-foreground text-xl font-bold">MyAgriAI</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors ${
              isActive('/') ? 'text-primary' : 'text-foreground/80 hover:text-foreground'
            }`}
          >
            {t('nav.dashboard')}
          </Link>
          <Link 
            to="/crop-analysis" 
            className={`text-sm font-medium transition-colors ${
              isActive('/crop-analysis') ? 'text-primary' : 'text-foreground/80 hover:text-foreground'
            }`}
          >
            {t('nav.cropAnalysis')}
          </Link>
          <Link 
            to="/pest-diagnosis" 
            className={`text-sm font-medium transition-colors ${
              isActive('/pest-diagnosis') ? 'text-primary' : 'text-foreground/80 hover:text-foreground'
            }`}
          >
            {t('nav.pestDiagnosis')}
          </Link>
          <Link 
            to="/chat-with-ai" 
            className={`text-sm font-medium transition-colors ${
              isActive('/chat-with-ai') ? 'text-primary' : 'text-foreground/80 hover:text-foreground'
            }`}
          >
            {t('nav.chatWithAI')}
          </Link>
          <Link 
            to="/how-to-use" 
            className={`text-sm font-medium transition-colors ${
              isActive('/how-to-use') ? 'text-primary' : 'text-foreground/80 hover:text-foreground'
            }`}
          >
            {t('nav.howToUse')}
          </Link>
          <LanguageSwitcher />
          <ThemeToggle />
          {/* <Button size="sm" className="rounded-md" asChild>
            <Link to="/">{t('nav.signIn')}</Link>
          </Button> */}
        </nav>

        {/* Mobile Navigation Trigger */}
        <div className="flex items-center md:hidden space-x-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            className="w-9 h-9 rounded-md"
          >
            {isMobileMenuOpen ? 
              <X className="h-4 w-4" /> : 
              <Menu className="h-4 w-4" />
            }
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden p-4 animate-fade-in">
          <nav className="flex flex-col space-y-4 bg-card p-4 rounded-lg">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors ${
                isActive('/') ? 'text-primary' : 'text-foreground/80 hover:text-foreground'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.dashboard')}
            </Link>
            <Link 
              to="/crop-analysis" 
              className={`text-sm font-medium transition-colors ${
                isActive('/crop-analysis') ? 'text-primary' : 'text-foreground/80 hover:text-foreground'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.cropAnalysis')}
            </Link>
            <Link 
              to="/pest-diagnosis" 
              className={`text-sm font-medium transition-colors ${
                isActive('/pest-diagnosis') ? 'text-primary' : 'text-foreground/80 hover:text-foreground'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.pestDiagnosis')}
            </Link>
            <Link 
              to="/chat-with-ai" 
              className={`text-sm font-medium transition-colors ${
                isActive('/chat-with-ai') ? 'text-primary' : 'text-foreground/80 hover:text-foreground'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.chatWithAI')}
            </Link>
            <Link 
              to="/how-to-use" 
              className={`text-sm font-medium transition-colors ${
                isActive('/how-to-use') ? 'text-primary' : 'text-foreground/80 hover:text-foreground'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.howToUse')}
            </Link>
            {/* <Button size="sm" className="w-full" asChild>
              <Link to="/">{t('nav.signIn')}</Link>
            </Button> */}
          </nav>
        </div>
      )}
    </header>
  );
}
