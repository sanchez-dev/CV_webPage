import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import profileImage from '../assets/me.png';

const Hero = () => {
  const { t, i18n } = useTranslation();
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
          const speed = scrolled * 0.6; // Increased from 0.4 to 0.6 for more movement
          const maxOffset = Math.min(speed, 600); // Set max to 600px
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

  // TEMPORARILY DISABLED CURSOR LOGIC
  // useEffect(() => {
  //   // cursor logic here  
  // }, [showBlur]);

  return (
    <section className="min-h-screen bg-background px-6 relative pb-16 lg:pb-40">
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

        <div className="min-h-[102vh] mt-0 flex flex-col items-start justify-between lg:justify-center pt-[60px] lg:pt-0 pb-0">
          {/* Main Title - First, with extra strong weight */}
          <div className="relative z-[-1] mb-0 lg:mb-28">
            <h1 className="space-y-0 -mt-8 font-tt-norms text-primary uppercase leading-none tracking-space font-[1000]" >
              {t('hero.title').split(' ').map((word, index) => (
                <span 
                  key={index} 
                  className={`block mr-3 ${
                    index === 0 ? 'text-5xl lg:text-7xl font-[800] ' : 
                    index === 1 ? 'text-5xl lg:text-7xl font-[800]' : 
                    index === 2 ? 'text-5xl lg:text-7xl font-[400] italic' : ''
                  }`}
                >
                  {word}
                </span>
              ))}
            </h1>
            <h2 className="mt-14 text-2xl lg:text-3xl font-tt-norms text-primary uppercase leading-none tracking-tight font-[400]" >
              <span className="block lg:hidden">
                {t('hero.subtitle').split(' ').map((word, index) => (
                  <span key={index} className="block">
                    {word}
                  </span>
                ))}
              </span>
              <span className="hidden lg:block">
                {t('hero.subtitle')}
              </span>
            </h2>
            <h3 className="text-3xl lg:text-7xl font-tt-norms font-normal text-primary uppercase tracking-wider mt-4">
              {t('hero.role')}
            </h3>
          </div>

          {/* Introduction Text - After title */}
          <div className="bg-background py-8 lg:py-10  lg:max-w-xl relative z-30 lg:mx-0 lg:pr-0 w-screen lg:w-auto -ml-6 lg:ml-0 px-6 lg:px-0">
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
        <div className="flex justify-center pb-0">
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