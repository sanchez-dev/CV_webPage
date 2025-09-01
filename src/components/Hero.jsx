import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import profileImage from '../assets/me.png';

const Hero = () => {
  const { t, i18n } = useTranslation();
  console.log('Hero component loaded - Language selector should be visible');
  const [scrollY, setScrollY] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isOverInteractive, setIsOverInteractive] = useState(false);
  const [showBlur, setShowBlur] = useState(true);
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
    let animationId;
    
    const handleScroll = () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      
      animationId = requestAnimationFrame(() => {
        const element = document.querySelector('.parallax-element');
        if (element) {
          const scrolled = window.scrollY;
          const speed = scrolled * 0.4;
          const maxOffset = Math.min(speed, 300);
          element.style.transform = `translate(-50%, calc(-50% - 30px + ${maxOffset}px))`;
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  useEffect(() => {
    let restoreBlurTimer;
    let hasStartedTimer = false;

    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      
      // Check if cursor is over an interactive element
      const target = e.target;
      const isInteractive = target.tagName === 'BUTTON' || 
                           target.tagName === 'A' || 
                           target.closest('button') || 
                           target.closest('a') ||
                           target.style.cursor === 'pointer' ||
                           getComputedStyle(target).cursor === 'pointer';
      
      setIsOverInteractive(isInteractive);
      
      if (isInteractive) {
        // Clear any existing timer and remove blur immediately
        clearTimeout(restoreBlurTimer);
        hasStartedTimer = false;
        setShowBlur(false);
      } else if (!showBlur && !hasStartedTimer) {
        // Only start timer once when blur is off and timer hasn't started yet
        hasStartedTimer = true;
        restoreBlurTimer = setTimeout(() => {
          setShowBlur(true);
          hasStartedTimer = false;
        }, 3000);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(restoreBlurTimer);
    };
  }, [showBlur]);

  return (
    <section className="min-h-screen bg-background px-6 relative">
      {/* Profile Image - Background with parallax effect */}
      <div 
        className="absolute top-1/2 left-1/2 z-0 parallax-element flex items-center justify-center"
        style={{ 
          transform: window.innerWidth < 1024 
            ? 'translate(-50%, calc(-50% + 25px))' 
            : 'translate(-50%, calc(-50% - 20px))',
          willChange: 'transform'
        }}
      >
        <img 
          src={profileImage}
          alt="Jose Luis Sanchez"
          className={`w-[799px] h-[799px] max-w-[210%] lg:max-w-none object-contain will-change-transform transition-all duration-1000 ease-out ${
            imageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-20">
        {/* Language Selector - Hidden on mobile, visible on desktop */}
        <div className="absolute top-40 right-0 z-40 hidden md:block">
          <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-2 py-0 text-sm font-tt-norms font-medium text-primary border font-bold border-primary rounded-xs hover:bg-primary/10 transition-all"
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
                <div className="absolute top-full left-0 mt-1 bg-background border border-primary rounded-sm overflow-hidden z-10">
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
        </div>

        <div className="min-h-[100vh] flex flex-col items-start justify-between lg:justify-center pt-[60px] lg:pt-0 pb-4 lg:pb-0">
          {/* Main Title - First, with extra strong weight */}
          <div className="relative z-[-1] mb-0 lg:mb-28">
            <h1 className="space-y-2 text-7xl lg:text-7xl font-tt-norms text-primary uppercase leading-none tracking-tight font-[1000]" >
              {t('hero.title').split(' ').map((word, index) => (
                <span 
                  key={index} 
                  className={`block ${
                    index === 0 ? 'text-[30]' : 
                    index === 2 ? 'text-4xl lg:text-7xl italic font-[300]' : ''
                  }`}
                >
                  {word}
                </span>
              ))}
            </h1>
            <h2 className="text-7xl lg:text-6xl font-tt-norms text-primary uppercase leading-none tracking-tight font-[1000]" >
              {t('hero.subtitle')}
            </h2>
            <h3 className="text-3xl lg:text-7xl font-tt-norms font-normal text-primary uppercase tracking-wider mt-4">
              {t('hero.role')}
            </h3>
          </div>

          {/* Introduction Text - After title */}
          <div 
            className="bg-background py-8 sm:py-4 rounded-sm lg:max-w-xl relative z-30 lg:mx-0 lg:pr-0" 
            style={{
              width: window.innerWidth < 1024 ? '100vw' : 'auto',
              marginLeft: window.innerWidth < 1024 ? 'calc(-50vw + 50%)' : '0',
              marginRight: window.innerWidth < 1024 ? 'calc(-50vw + 50%)' : '0',
              paddingLeft: window.innerWidth < 1024 ? '1.5rem' : '0',
              paddingRight: window.innerWidth < 1024 ? '1.5rem' : '0'
            }}
          >
            <p className="text-black font-tt-norms text-4xl">
              <span className="font-normal">{t('hero.intro')} </span>
              <span className="font-bold text-primary text-5xl">{t('hero.name')}</span>
              <br />
              <span className="font-normal" dangerouslySetInnerHTML={{ __html: t('hero.description') }}>
              </span>
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center pb-12">
          <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center cursor-pointer hover:bg-primary transition-colors">
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              className="text-white"
            >
              <path d="M7 13l3 3 7-7" />
            </svg>
          </div>
        </div>

      </div>


      {/* Custom Cursor Circle */}
      <div 
        className="cursor-circle"
        style={{
          left: cursorPosition.x + 9,
          top: cursorPosition.y + 9,
          backdropFilter: `blur(${showBlur ? 8 : 0}px)`,
          background: `rgba(255, 255, 255, ${showBlur ? 0.2 : 0})`
        }}
      />
    </section>
  );
};

export default Hero;