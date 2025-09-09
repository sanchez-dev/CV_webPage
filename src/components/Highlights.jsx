import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Highlights = () => {
  const { t } = useTranslation();
  const highlights = t('highlights.items', { returnObjects: true });

  return (
    <section className="py-16 lg:py-40" id="about">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-12 gap-6 lg:gap-8">
          {/* Left Side - Title (4 columns) */}
          <div className="col-span-12 lg:col-span-4">
            <h2 className="text-4xl mb-4 lg:text-5xl font-tt-norms font-bold text-black">
              {t('highlights.title')}
            </h2>
          </div>

          {/* Right Side - Content (8 columns) */}
          <div className="col-span-12 lg:col-span-8">
            {/* Opening text */}
            <div className="text-xl text-black font-tt-norms mb-12">
              {t('highlights.opening').split('\n').map((line, index) => (
                <p key={index} className="mb-4 last:mb-0" dangerouslySetInnerHTML={{ __html: line }}>
                </p>
              ))}
            </div>

            {/* Skills tags */}
            <div className="flex flex-wrap gap-3 mb-12">
              {highlights.map((highlight, index) => {
                // First 3 items are featured with secondary color hover
                const isFeatured = index < 3;
                // Items with bold font weight based on design
                const boldItems = ['Product 360°', 'User Centered Design', 'Banking / Payments', 'Vision 360° de Producto', 'Diseño Centrado en el Usuario (UCD)', 'Banking / Payments'];
                const isBold = boldItems.some(item => highlight.includes(item.split(' ')[0])) || isFeatured;
                
                return (
                  <span
                    key={index}
                    className={`px-3 py-2 border font-tt-norms text-xl rounded-sm transition-colors ${
                      isBold ? 'font-bold' : 'font-normal'
                    } ${
                      isFeatured 
                        ? 'border-black text-black hover:bg-secondary hover:text-white hover:border-secondary'
                        : 'border-black text-black hover:bg-black hover:text-white'
                    }`}
                  >
                    {highlight}
                  </span>
                );
              })}
            </div>

            {/* CTA Button */}
            <a
              href="#contact"
              className="block w-full md:inline-block md:w-auto text-center px-8 py-4 border-2 border-secondary text-secondary font-tt-norms font-medium rounded-full hover:bg-secondary hover:text-white transition-colors text-2xl"
            >
              Let's work together
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Highlights;