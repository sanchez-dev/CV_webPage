import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);

  const toggleLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setCurrentLang(lang);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-primary font-tt-norms font-bold text-lg tracking-wide">
            JOSE SÁNCHEZ
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#resume" 
              className="text-primary font-tt-norms font-medium text-sm tracking-wide hover:opacity-70 transition-opacity"
            >
              {t('navigation.resume')}
            </a>
            <a 
              href="#about" 
              className="text-primary font-tt-norms font-medium text-sm tracking-wide hover:opacity-70 transition-opacity"
            >
              {t('navigation.about')}
            </a>
            <a 
              href="#contact" 
              className="text-primary font-tt-norms font-medium text-sm tracking-wide hover:opacity-70 transition-opacity"
            >
              {t('navigation.contact')}
            </a>
          </nav>

          {/* Language Selector */}
          <div className="flex items-center border border-primary/20 rounded">
            <button
              onClick={() => toggleLanguage('en')}
              className={`px-3 py-1 text-xs font-tt-norms font-medium transition-all ${
                currentLang === 'en' 
                  ? 'bg-primary text-white' 
                  : 'text-primary hover:bg-primary/10'
              }`}
            >
              ENG
            </button>
            <button
              onClick={() => toggleLanguage('es')}
              className={`px-3 py-1 text-xs font-tt-norms font-medium transition-all ${
                currentLang === 'es' 
                  ? 'bg-primary text-white' 
                  : 'text-primary hover:bg-primary/10'
              }`}
            >
              ESP
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;