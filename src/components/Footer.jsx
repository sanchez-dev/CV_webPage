import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useResumeLink } from '../hooks/useResumeLink';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const resumeUrl = useResumeLink();

  const toggleLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <>
      {/* Section 1: Dark Footer */}
      <footer className="py-16 lg:pt-40 lg:pb-20" id="contact">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-tr from-gray-800 to-black text-white rounded-lg lg:rounded-xl px-6 lg:px-12 py-12 lg:py-16" style={{boxShadow: '0 0 3px rgba(0, 0, 0, 0.3), 0 0 10px rgba(0, 0, 0, 0.4)'}}>
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Column 1: Contact Title */}
            <div>
              <h3 className="font-tt-norms font-bold text-3xl lg:text-4xl text-white">
                {t('navigation.contact')}
              </h3>
            </div>

            {/* Column 2: Contact Links */}
            <div>
              {/* LinkedIn */}
              <div className="flex items-center gap-3 mb-6">
                <img src="/design/linkedin.svg" alt="LinkedIn" className="w-5 h-5" />
                <a 
                  href={t('contact.linkedin')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-tt-norms text-white hover:text-primary transition-colors text-lg"
                >
                  Linkedin
                </a>
              </div>

              {/* WhatsApp */}
              <div className="flex items-center gap-3 mb-8">
                <img src="/design/whatsapp.svg" alt="WhatsApp" className="w-5 h-5 filter brightness-0 invert" />
                <a 
                  href={`https://wa.me/${t('contact.phone').replace(/[^\d]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-tt-norms text-white hover:text-primary transition-colors text-lg"
                >
                  Whatsapp
                </a>
              </div>

              {/* Resume */}
              <div className="inline-flex items-center gap-3 px-4 py-2 border border-white rounded-sm">
                <img src="/design/resume.svg" alt="Resume" className="w-4 h-4" />
                <a 
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-tt-norms text-white hover:text-primary transition-colors text-lg"
                >
                  {t('footer.resumeText')}
                </a>
              </div>
              <p className="font-tt-norms text-white/60 text-sm mt-2 leading-relaxed">
                {i18n.language === 'es' ? (
                  <>
                    Este archivo está en Español. Cambia el idioma a{' '}
                    <button 
                      onClick={() => toggleLanguage('en')}
                      className="underline hover:text-white transition-colors cursor-pointer"
                    >
                      inglés
                    </button>
                    {' '}para obtener la versión en inglés.
                  </>
                ) : (
                  <>
                    This file is in English. Change the page to{' '}
                    <button 
                      onClick={() => toggleLanguage('es')}
                      className="underline hover:text-white transition-colors cursor-pointer"
                    >
                      Spanish
                    </button>
                    {' '}to grab the Spanish version.
                  </>
                )}
              </p>
            </div>

            {/* Column 3: Navigation with divider */}
            <div className="relative border-l border-white/20 pl-8">
              <nav className="space-y-4">
                <a 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="block font-tt-norms text-white hover:text-primary transition-colors text-lg cursor-pointer"
                >
                  {t('navigation.home')}
                </a>
                <a 
                  href="#projects"
                  className="block font-tt-norms text-white hover:text-primary transition-colors text-lg"
                >
                  {t('navigation.projects')}
                </a>
                <a 
                  href="#about"
                  className="block font-tt-norms text-white hover:text-primary transition-colors text-lg"
                >
                  {t('navigation.about')}
                </a>
                <a 
                  href="#contact"
                  className="block font-tt-norms text-white hover:text-primary transition-colors text-lg"
                >
                  {t('navigation.contact')}
                </a>
              </nav>
            </div>
          </div>
          </div>
        </div>
      </footer>

      {/* Section 2: Light Footer */}
      <section className="bg-gradient-to-b from-transparent to-[#CBCBCE] py-16 lg:py-30">
        <div className="max-w-7xl mx-auto px-6 text-center">
          {/* Logo - Centered */}
          <img src="/design/brand-footer.svg" alt="Jose S." className="w-[7.8rem] h-[7.8rem] lg:w-[9.75rem] lg:h-[9.75rem] mx-auto mb-28" />

          {/* Bottom content */}
          <div className="space-y-1">
            {/* Copyright */}
            <p className="font-tt-norms text-black/60 text-sm">
              <span className="font-bold">JS © 2025.</span> / Bogotá ✘ Remote
            </p>

            {/* Language Selector */}
            <div className="flex justify-center items-center space-x-2">
              <button
                onClick={() => toggleLanguage('en')}
                className={`px-2 py-2 text-sm font-tt-norms transition-all ${
                  i18n.language === 'en' 
                    ? 'text-black font-bold underline underline-offset-4 decoration-2' 
                    : 'text-gray-400 font-normal hover:text-gray-600'
                }`}
              >
                ENGLISH
              </button>
              <button
                onClick={() => toggleLanguage('es')}
                className={`px-2 py-2 text-sm font-tt-norms transition-all ${
                  i18n.language === 'es' 
                    ? 'text-black font-bold underline underline-offset-4 decoration-2' 
                    : 'text-gray-400 font-normal hover:text-gray-600'
                }`}
              >
                ESPAÑOL
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;