import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Footer = () => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="grid md:grid-cols-2 gap-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Left Column */}
          <div className="space-y-8">
            <div>
              <h3 className="font-tt-norms font-semibold text-lg mb-4 text-white">
                {t('footer.about')}
              </h3>
              <p className="font-tt-norms text-white/70 leading-relaxed">
                Product Lead specializing in Banking, Fintech, and Payments with 13+ years connecting business with users through data-driven design.
              </p>
            </div>

            <div>
              <h3 className="font-tt-norms font-semibold text-lg mb-4 text-white">
                {t('footer.newsletter')}
              </h3>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-l font-tt-norms text-white placeholder-white/50 focus:outline-none focus:border-primary"
                />
                <button className="px-6 py-2 bg-primary text-white font-tt-norms font-medium rounded-r hover:bg-primary/90 transition-colors">
                  Subscribe
                </button>
              </div>
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
                  href="#resume" 
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
        </motion.div>

        {/* Bottom Section */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center mt-12 pt-8 border-t border-white/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="font-tt-norms text-white/50 text-sm mb-4 md:mb-0">
            {t('footer.copyright')}
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="font-tt-norms text-white/50 text-sm">
              {t('footer.website')}
            </span>
            
            {/* Language Selector */}
            <div className="flex items-center border border-white/20 rounded">
              <button
                onClick={() => toggleLanguage('en')}
                className={`px-3 py-1 text-xs font-tt-norms font-medium transition-all ${
                  i18n.language === 'en' 
                    ? 'bg-primary text-white' 
                    : 'text-white/70 hover:bg-white/10'
                }`}
              >
                ENG
              </button>
              <button
                onClick={() => toggleLanguage('es')}
                className={`px-3 py-1 text-xs font-tt-norms font-medium transition-all ${
                  i18n.language === 'es' 
                    ? 'bg-primary text-white' 
                    : 'text-white/70 hover:bg-white/10'
                }`}
              >
                ESP
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;