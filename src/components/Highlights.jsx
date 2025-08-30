import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Highlights = () => {
  const { t } = useTranslation();
  const highlights = t('highlights.items', { returnObjects: true });

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Side - Title */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-tt-norms font-bold text-black mb-4">
              {t('highlights.title')}
            </h2>
            <p className="text-lg text-black/60 font-tt-norms">
              {t('highlights.title')}
            </p>
          </motion.div>

          {/* Right Side - Skills List */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="text-xl font-tt-norms font-medium text-black py-3 border-b border-black/10 hover:border-primary/30 transition-colors cursor-default">
                  {highlight}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Highlights;