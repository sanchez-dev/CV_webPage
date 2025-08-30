import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import profileImage from '../assets/me.png';

const Hero = () => {
  const { t } = useTranslation();
  const [scrollY, setScrollY] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isOverInteractive, setIsOverInteractive] = useState(false);
  const [showBlur, setShowBlur] = useState(true);

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
          const maxOffset = Math.min(speed, 600);
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
        className="absolute top-1/2 left-1/2 z-0 parallax-element"
        style={{ 
          transform: 'translate(-50%, calc(-50% - 30px))',
          willChange: 'transform'
        }}
      >
        <img 
          src={profileImage}
          alt="Jose Luis Sanchez"
          className={`w-[639px] h-[639px] lg:w-[799px] lg:h-[799px] object-contain will-change-transform transition-all duration-1000 ease-out ${
            imageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-20">
        <div className="min-h-[100vh] flex flex-col items-start justify-center">
          {/* Main Title - First, with extra strong weight */}
          <div className="space-y-2 relative z-5 mb-28">
            <h1 className="text-6xl lg:text-8xl font-tt-norms text-primary uppercase leading-none tracking-tight font-[1000]" >
              {t('hero.title')}
            </h1>
            <h2 className="text-6xl lg:text-8xl font-tt-norms text-primary uppercase leading-none tracking-tight font-[1000]" >
              {t('hero.subtitle')}
            </h2>
            <h3 className="text-6xl lg:text-6xl font-tt-norms font-normal text-primary uppercase tracking-wider mt-4">
              {t('hero.role')}
            </h3>
          </div>

          {/* Introduction Text - After title */}
          <div className="bg-background p-8 rounded-sm max-w-xl relative z-30">
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
          background: `rgba(255, 255, 255, ${showBlur ? 0.1 : 0})`
        }}
      />
    </section>
  );
};

export default Hero;