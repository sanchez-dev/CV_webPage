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
    <footer className="bg-black text-white py-40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="space-y-12">
            <div>
              <h3 className="font-tt-norms font-semibold text-4xl mb-10 text-white">
                {t('footer.about')}
              </h3>
              <p className="font-tt-norms text-lg text-white/70 leading-relaxed">
                {t('footer.description')}
              </p>
            </div>

          </div>

          {/* Right Column */}
          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <nav className="space-y-3">
                <a 
                  href={t('contact.linkedin')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block font-tt-norms text-white/70 hover:text-primary transition-colors"
                >
                  {t('footer.linkedin')}
                </a>
                <a 
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block font-tt-norms text-white/70 hover:text-primary transition-colors"
                >
                  {t('footer.resume')}
                </a>
                <a 
                  href={`mailto:${t('contact.email')}`}
                  className="block font-tt-norms text-white/70 hover:text-primary transition-colors"
                >
                  {t('footer.contact')}
                </a>
              </nav>
            </div>

            <div>
              <div className="space-y-3">
                <div className="font-tt-norms text-white/70">
                  <a 
                    href={`mailto:${t('contact.email')}`}
                    className="hover:text-primary transition-colors"
                  >
                    {t('contact.email')}
                  </a>
                </div>
                <div className="font-tt-norms text-white/70">
                  <a 
                    href={`tel:${t('contact.phone').replace(/[^\d+]/g, '')}`}
                    className="hover:text-primary transition-colors"
                  >
                    {t('contact.phone')}
                  </a>
                </div>
                <div className="font-tt-norms text-white/70">
                  {t('contact.location')}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-12 pt-8 border-t border-white/10">
          <div className="font-tt-norms text-white/50 text-sm mb-4 md:mb-0">
            {t('footer.copyright')}
          </div>
          
          <div className="flex items-center space-x-4">
            
            {/* Language Selector */}
            <div className="flex items-center border border-white/20 rounded">
              <button
                onClick={() => toggleLanguage('en')}
                className={`px-2 py-1 text-xs font-tt-norms font-medium transition-all ${
                  i18n.language === 'en' 
                    ? 'bg-white text-black' 
                    : 'text-white/70 hover:bg-white/10'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => toggleLanguage('es')}
                className={`px-2 py-1 text-xs font-tt-norms font-medium transition-all ${
                  i18n.language === 'es' 
                    ? 'bg-white text-black' 
                    : 'text-white/70 hover:bg-white/10'
                }`}
              >
                ES
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;