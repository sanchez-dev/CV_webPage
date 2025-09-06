import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Highlights = () => {
  const { t } = useTranslation();
  const highlights = t('highlights.items', { returnObjects: true });

  return (
    <section className="py-[140px] lg:py-[360px] ">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Side - Title */}
          <div>
            <h2 className="text-4xl lg:text-5xl font-tt-norms font-bold text-black mb-10">
              {t('highlights.title')}
            </h2>
            <div className="text-lg text-black/60 font-tt-norms">
              {t('highlights.opening').split('\n').map((line, index) => (
                <p key={index} className="mb-4 last:mb-0">
                  {line}
                </p>
              ))}
            </div>
          </div>

          {/* Right Side - Skills List */}
          <div className="space-y-4">
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className="group"
              >
                <div className="text-xl font-tt-norms font-medium text-black py-3 border-b border-black/10 hover:border-primary/30 transition-colors cursor-default">
                  {highlight}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Highlights;