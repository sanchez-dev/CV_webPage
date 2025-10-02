import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import profileImage from '../assets/me.webp';
import Loader from './Loader';
import TextPressure from "./SplitText";

const Hero = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

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
          element.style.transform = `translate(-50%, calc(-50% - 80px + ${maxOffset}px))`;
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
    <section className="min-h-screen px-4 relative pb-16 lg:pb-40">


      {/* Profile Image - Background with parallax effect */}
      <div 
        className="absolute top-1/2 left-1/2 z-0 parallax-element flex items-center justify-center"
        style={{ 
          transform: window.innerWidth < 1024 
            ? 'translate(-50%, calc(-50% + 45px))'
            : 'translate(-50%, calc(-50% - 70px))',
          willChange: 'transform'
        }}
      >
        {!imageLoaded && <Loader />}
        <img
          src={profileImage}
          alt="Jose Luis Sanchez"
          fetchpriority="high"
          className={`w-[639px] h-[639px] lg:w-[799px] lg:h-[799px] max-w-[168%] lg:max-w-none object-contain will-change-transform transition-all duration-1000 ease-out ${
            imageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          onLoad={() => {
            setImageLoaded(true);
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-20">
        <div className="absolute block w-full h-full flex top-[44vh] text-shadow-lg">
          <TextPressure className="justify-between drop-shadow-[0px_4px_0px_var(--shadow-color)]"
            text="JOSE SÁNCHEZ"
            flex={true}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={true}
            textColor="var(--color-primary)"
            strokeColor="#F3F3ED"
            minFontSize={100}
          />
        </div>
        <div className="absolute block w-full h-10 flex top-[58vh] lg:top-[68vh] text-shadow-lg">
          <TextPressure className="justify-between drop-shadow-[0px_4px_0px_var(--shadow-color)]"
            text="SENIOR PRODUCT DESIGNER"
            flex={true}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={true}
            textColor="var(--color-primary)"
            strokeColor="#F3F3ED"
            minFontSize={50}
          />
        </div>
        <div className="min-h-[102vh] mt-0 flex flex-col items-start justify-between lg:justify-center pt-[60px] lg:pt-0 pb-0">

          {/* <div className="bg-background py-8 lg:py-10  lg:max-w-xl relative z-30 lg:mx-0 lg:pr-0 w-screen lg:w-auto -ml-4 lg:ml-0 px-4 lg:px-0">
            <p className="text-black font-tt-norms text-4xl">
              <span className="font-normal">{t('hero.intro')} </span>
              <span className="font-bold text-primary text-5xl">{t('hero.name')}</span>
              <br />
              <span className="font-normal" dangerouslySetInnerHTML={{ __html: t('hero.description') }}>
              </span>
            </p>
          </div> */}
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