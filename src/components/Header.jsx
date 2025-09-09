import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useResumeLink } from '../hooks/useResumeLink';
import menuIcon from '../assets/menu.svg';

const Header = () => {
  const { t, i18n } = useTranslation();
  const resumeUrl = useResumeLink();
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');

  const toggleLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setCurrentLang(lang);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    setCurrentLang(i18n.language);
  }, [i18n.language]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Check if screen is md or larger (768px+) and mouse is in top 150px
      if (window.innerWidth >= 768 && e.clientY <= 150) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-background transition-transform duration-300 ${
      (isVisible || isHovered) ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img 
              src="/brand.svg" 
              alt="Jose S. Logo" 
              className="w-6 h-6"
            />
            <span className="text-primary font-tt-norms font-bold text-lg tracking-wide">
              JOSE S.
            </span>
          </div>

          {/* Divider Line */}
          <div className="h-px w-60 bg-primary hidden md:block"></div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <a 
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-tt-norms font-medium text-sm tracking-wide hover:opacity-70 transition-opacity uppercase mr-8"
            >
              {t('navigation.resume')}
            </a>
            <a 
              href="#about" 
              className="text-primary font-tt-norms font-medium text-sm tracking-wide hover:opacity-70 transition-opacity uppercase mr-8"
            >
              {t('navigation.about')}
            </a>
            <a 
              href="#contact" 
              className="text-primary font-tt-norms font-medium text-sm tracking-wide hover:opacity-70 transition-opacity uppercase mr-8"
            >
              {t('navigation.contact')}
            </a>
            
            {/* Language Selector - Desktop */}
            <div className="relative ml-12">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-2 py-0 text-sm font-tt-norms font-medium tracking-wide text-primary border border-primary rounded-xs hover:bg-primary/10 transition-all uppercase"
              >
                {currentLang === 'en' ? 'ENG' : 'ESP'}
                <svg 
                  width="8" 
                  height="11" 
                  viewBox="0 0 8 11" 
                  fill="none"
                  className={`transform transition-transform ${isDropdownOpen ? '' : 'rotate-180'}`}
                >
                  <path d="M4.80078 10.5051C4.80078 10.7813 4.57692 11.0051 4.30078 11.0051C4.02464 11.0051 3.80078 10.7813 3.80078 10.5051L4.30078 10.5051L4.80078 10.5051ZM3.94723 0.859094C4.14249 0.663831 4.45907 0.663831 4.65434 0.859094L7.83632 4.04107C8.03158 4.23634 8.03158 4.55292 7.83632 4.74818C7.64105 4.94344 7.32447 4.94344 7.12921 4.74818L4.30078 1.91975L1.47235 4.74818C1.27709 4.94344 0.96051 4.94344 0.765248 4.74818C0.569985 4.55292 0.569985 4.23634 0.765248 4.04107L3.94723 0.859094ZM4.30078 10.5051L3.80078 10.5051L3.80078 1.21265L4.30078 1.21265L4.80078 1.21265L4.80078 10.5051L4.30078 10.5051Z" fill="currentColor"/>
                </svg>
              </button>
              
              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-1 bg-background border border-primary rounded-sm overflow-hidden z-10">
                  <button
                    onClick={() => toggleLanguage('en')}
                    className={`block w-full text-center px-2 py-0 text-sm font-tt-norms font-medium transition-all hover:bg-primary/10 ${
                      currentLang === 'en' ? 'bg-primary text-white' : 'text-primary'
                    }`}
                  >
                    ENG
                  </button>
                  <button
                    onClick={() => toggleLanguage('es')}
                    className={`block w-full text-center px-2 py-0 text-sm font-tt-norms font-medium transition-all hover:bg-primary/10 ${
                      currentLang === 'es' ? 'bg-primary text-white' : 'text-primary'
                    }`}
                  >
                    ESP
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Language Selector - Mobile */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-2 py-1 text-xs font-tt-norms font-medium text-primary border border-primary rounded-sm hover:bg-primary/10 transition-all"
              >
                {currentLang === 'en' ? 'ENG' : 'ESP'}
                <svg 
                  width="8" 
                  height="11" 
                  viewBox="0 0 8 11" 
                  fill="none"
                  className={`transform transition-transform ${isDropdownOpen ? '' : 'rotate-180'}`}
                >
                  <path d="M4.80078 10.5051C4.80078 10.7813 4.57692 11.0051 4.30078 11.0051C4.02464 11.0051 3.80078 10.7813 3.80078 10.5051L4.30078 10.5051L4.80078 10.5051ZM3.94723 0.859094C4.14249 0.663831 4.45907 0.663831 4.65434 0.859094L7.83632 4.04107C8.03158 4.23634 8.03158 4.55292 7.83632 4.74818C7.64105 4.94344 7.32447 4.94344 7.12921 4.74818L4.30078 1.91975L1.47235 4.74818C1.27709 4.94344 0.96051 4.94344 0.765248 4.74818C0.569985 4.55292 0.569985 4.23634 0.765248 4.04107L3.94723 0.859094ZM4.30078 10.5051L3.80078 10.5051L3.80078 1.21265L4.30078 1.21265L4.80078 1.21265L4.80078 10.5051L4.30078 10.5051Z" fill="currentColor"/>
                </svg>
              </button>
              
              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-1 bg-background border border-primary rounded-sm overflow-hidden z-10">
                  <button
                    onClick={() => toggleLanguage('en')}
                    className={`block w-full text-center px-2 py-1 text-xs font-tt-norms font-medium transition-all hover:bg-primary/10 ${
                      currentLang === 'en' ? 'bg-primary text-white' : 'text-primary'
                    }`}
                  >
                    ENG
                  </button>
                  <button
                    onClick={() => toggleLanguage('es')}
                    className={`block w-full text-center px-2 py-1 text-xs font-tt-norms font-medium transition-all hover:bg-primary/10 ${
                      currentLang === 'es' ? 'bg-primary text-white' : 'text-primary'
                    }`}
                  >
                    ESP
                  </button>
                </div>
              )}
            </div>

            {/* Hamburger Menu Button */}
            <button
              className="w-8 h-8 flex items-center justify-center"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <img src={menuIcon} alt="Menu" className="w-6 h-6" />
            </button>
          </div>

        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background border-t border-primary/20">
            <nav className="px-6 py-6 space-y-6">
              <a 
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-primary font-tt-norms font-medium text-2xl tracking-wide hover:opacity-70 transition-opacity uppercase"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('navigation.resume')}
              </a>
              <a 
                href="#about" 
                className="block text-primary font-tt-norms font-medium text-2xl tracking-wide hover:opacity-70 transition-opacity uppercase"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('navigation.about')}
              </a>
              <a 
                href="#contact" 
                className="block text-primary font-tt-norms font-medium text-2xl tracking-wide hover:opacity-70 transition-opacity uppercase"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('navigation.contact')}
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;