import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import profileImage from '../assets/me.png';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="min-h-screen bg-background pt-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          {/* Left Side - Text Content */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Main Title */}
            <div className="space-y-2">
              <h1 className="text-6xl lg:text-8xl font-tt-norms font-bold text-primary uppercase leading-none">
                {t('hero.title')}
              </h1>
              <h2 className="text-6xl lg:text-8xl font-tt-norms font-bold text-primary uppercase leading-none">
                {t('hero.subtitle')}
              </h2>
              <h3 className="text-3xl lg:text-4xl font-tt-norms font-normal text-primary uppercase tracking-wider mt-4">
                {t('hero.role')}
              </h3>
            </div>

            {/* Introduction Text */}
            <div className="bg-white p-8 rounded-lg shadow-sm max-w-md">
              <p className="text-black font-tt-norms text-lg">
                <span className="font-normal">{t('hero.intro')} </span>
                <span className="font-bold text-primary">{t('hero.name')}</span>
                <br />
                <span className="font-normal">
                  {t('hero.description')}
                </span>
              </p>
            </div>
          </motion.div>

          {/* Right Side - Profile Image */}
          <motion.div 
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <div className="w-96 h-96 lg:w-[500px] lg:h-[500px] relative">
                {/* Background blur circle */}
                <div 
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `url(${profileImage}) center/cover`,
                    filter: 'blur(40px)',
                    opacity: 0.3,
                    transform: 'scale(1.2)'
                  }}
                />
                
                {/* Main profile image */}
                <div 
                  className="w-full h-full rounded-full bg-cover bg-center relative z-10"
                  style={{
                    backgroundImage: `url(${profileImage})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                  }}
                />
                
                {/* Gradient overlay for better integration */}
                <div 
                  className="absolute inset-0 rounded-full z-20"
                  style={{
                    background: 'radial-gradient(circle at center, transparent 60%, rgba(243, 243, 237, 0.8) 100%)'
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="flex justify-center pb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
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
              <path d="M2 12h20" />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;