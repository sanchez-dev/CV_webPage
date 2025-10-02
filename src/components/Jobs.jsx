import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useEffect } from 'react';
import Loader from './Loader';
import ScrollIndicator from './ScrollIndicator';


const Jobs = () => {
  const { t } = useTranslation();

  useEffect(() => {
    const updateArrowDirections = () => {
      const arrows = document.querySelectorAll('.arrow-indicator');
      arrows.forEach(arrow => {
        const arrowContainer = arrow.closest('div[class*="whitespace-nowrap"]');
        if (!arrowContainer) return;
        
        const nextKeywordContainer = arrowContainer.nextElementSibling;
        if (!nextKeywordContainer) return;
        
        const arrowRect = arrowContainer.getBoundingClientRect();
        const nextRect = nextKeywordContainer.getBoundingClientRect();
        
        const isOnNewLine = nextRect.top > arrowRect.top + 5; // 5px tolerance
        
        if (isOnNewLine) {
          arrow.textContent = '↓';
          arrow.setAttribute('data-arrow', 'vertical');
        } else {
          arrow.textContent = '→';
          arrow.setAttribute('data-arrow', 'horizontal');
        }
      });
    };

    updateArrowDirections();
    window.addEventListener('resize', updateArrowDirections);
    
    setTimeout(updateArrowDirections, 100);

    return () => window.removeEventListener('resize', updateArrowDirections);
  }, [t]);


  return (
    <section className="py-24 w-full lg:py-12 relative z-10 overflow-x-hidden" id="projects">
      <div className="max-w-7xl mx-auto px-4 lg:max-w-[1400px] lg:px-[12px]">

        <div className="lg:space-y-[160px] space-y-0" id="jobs_container">
          
          {/* First line BMM */}
          <div className="grid grid-cols-12 gap-4 lg:gap-16">

            <div className="col-span-12 lg:col-span-1 mb-16 lg:mb-0">
            </div>
            <div className="col-span-12 lg:col-span-5 mb-16 lg:mb-0">
              <div className="space-y-8 lg:space-y-[34px]">
                <div className="relative overflow-hidden rounded-[40px] h-[554px] lg:h-[650px]">
                  <video
                    className="w-full h-full object-cover"
                    preload="metadata"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src="/BMM_A.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                
                <div className="pt-2 space-y-8">
                  <h3 className="text-4xl font-tt-norms font-bold text-black break-words">
                    {t('jobs.projects.project1.title')}
                  </h3>
                  <p className="text-2xl font-tt-norms font-normal text-black leading-[1.54] break-words">
                    {t('jobs.projects.project1.description')}
                  </p>
                  <div className="flex flex-wrap gap-2 items-center">
                    {t('jobs.projects.project1.technologies', { returnObjects: true }).slice(0, -2).map((tech, i) => (
                      <span
                        className="px-3 py-1 text-base lg:text-xl font-tt-norms font-normal inline-flex items-center gap-1 break-words"
                        style={{backgroundColor: '#E4E4D9', color: 'var(--color-black)', borderRadius: '6px'}}
                      >
                        {tech}
                        <span
                          className="text-black text-base lg:text-lg arrow-indicator"
                          data-arrow="horizontal"
                        >
                          →
                        </span>
                      </span>
                    ))}
                    <span
                      className="px-3 py-1 text-base lg:text-xl font-tt-norms font-normal inline-flex items-center gap-1 break-words"
                      style={{backgroundColor: '#E4E4D9', color: 'var(--color-black)', borderRadius: '6px'}}
                    >
                      {t('jobs.projects.project1.technologies', { returnObjects: true })[t('jobs.projects.project1.technologies', { returnObjects: true }).length - 2]}
                      <span
                        className="text-black text-base lg:text-lg arrow-indicator"
                        data-arrow="horizontal"
                      >
                        →
                      </span>
                    </span>
                    <div className="flex items-center gap-1 whitespace-nowrap">
                      <span
                        className="px-3 py-1 text-base lg:text-xl font-tt-norms font-bold inline-flex items-center gap-1 break-words"
                        style={{backgroundColor: 'var(--shadow-color)', color: 'white', borderRadius: '6px'}}
                      >
                        R
                        <span
                          className="text-white text-base lg:text-lg arrow-indicator"
                          data-arrow="horizontal"
                        >
                          →
                        </span>
                      </span>
                      <span
                        className="px-3 py-1 text-base lg:text-xl font-tt-norms font-bold break-words"
                        style={{backgroundColor: 'var(--color-black)', color: 'white', borderRadius: '6px'}}
                      >
                        {t('jobs.projects.project1.technologies', { returnObjects: true })[t('jobs.projects.project1.technologies', { returnObjects: true }).length - 1]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-5 mb-16 lg:mb-0">
              <div className="space-y-8 lg:space-y-[34px]">
                <div className="relative overflow-hidden rounded-[40px] h-[554px] lg:h-[650px]">
                  <video
                    className="w-full h-full object-cover"
                    preload="none"
                    loading="lazy"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src="/BMM_W.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                
                <div className="pt-2 space-y-8">
                  <h3 className="text-4xl font-tt-norms font-bold text-black break-words">
                    {t('jobs.projects.project5.title')}
                  </h3>
                  <p className="text-2xl font-tt-norms font-normal text-black leading-[1.54] break-words">
                    {t('jobs.projects.project5.description')}
                  </p>
                  <div className="flex flex-wrap gap-2 items-center">
                    {t('jobs.projects.project5.technologies', { returnObjects: true }).slice(0, -2).map((tech, i) => (
                      <span
                        className="px-3 py-1 text-base lg:text-xl font-tt-norms font-normal inline-flex items-center gap-1 break-words"
                        style={{backgroundColor: '#E4E4D9', color: 'var(--color-black)', borderRadius: '6px'}}
                      >
                        {tech}
                        <span
                          className="text-black text-base lg:text-lg arrow-indicator"
                          data-arrow="horizontal"
                        >
                          →
                        </span>
                      </span>
                    ))}
                    <span
                      className="px-3 py-1 text-base lg:text-xl font-tt-norms font-normal inline-flex items-center gap-1 break-words"
                      style={{backgroundColor: '#E4E4D9', color: 'var(--color-black)', borderRadius: '6px'}}
                    >
                      {t('jobs.projects.project5.technologies', { returnObjects: true })[t('jobs.projects.project5.technologies', { returnObjects: true }).length - 2]}
                      <span
                        className="text-black text-base lg:text-lg arrow-indicator"
                        data-arrow="horizontal"
                      >
                        →
                      </span>
                    </span>
                    <div className="flex items-center gap-1 whitespace-nowrap">
                      <span
                        className="px-3 py-1 text-base lg:text-xl font-tt-norms font-bold inline-flex items-center gap-1 break-words"
                        style={{backgroundColor: 'var(--shadow-color)', color: 'white', borderRadius: '6px'}}
                      >
                        R
                        <span
                          className="text-white text-base lg:text-lg arrow-indicator"
                          data-arrow="horizontal"
                        >
                          →
                        </span>
                      </span>
                      <span
                        className="px-3 py-1 text-base lg:text-xl font-tt-norms font-bold break-words"
                        style={{backgroundColor: 'var(--color-black)', color: 'white', borderRadius: '6px'}}
                      >
                        {t('jobs.projects.project5.technologies', { returnObjects: true })[t('jobs.projects.project5.technologies', { returnObjects: true }).length - 1]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
          {/* First line BTG */}
          <div className="grid grid-cols-12 gap-4 lg:gap-16">
            <div className="space-y-1 lg:space-y-[34px]"></div>
            <div className="col-span-12 lg:col-span-10 mb-16 lg:mb-0">
              <div className="space-y-8 lg:space-y-[34px]">
                <div className="relative overflow-hidden rounded-[40px] h-[384px] lg:h-[650px]">
                  <video
                    className="w-full h-full object-cover"
                    preload="none"
                    loading="lazy"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src="/BTG.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                
                <div className="pt-2 space-y-8">
                  <h3 className="text-4xl font-tt-norms font-bold text-black break-words">
                    {t('jobs.projects.project2.title')}
                  </h3>
                  <p className="text-2xl font-tt-norms font-normal text-black leading-[1.54] break-words">
                    {t('jobs.projects.project2.description')}
                  </p>
                  <div className="flex flex-wrap gap-2 items-center">
                    {t('jobs.projects.project2.technologies', { returnObjects: true }).slice(0, -2).map((tech, i) => (
                      <span
                        className="px-3 py-1 text-base lg:text-xl font-tt-norms font-normal inline-flex items-center gap-1 break-words"
                        style={{backgroundColor: '#E4E4D9', color: 'var(--color-black)', borderRadius: '6px'}}
                      >
                        {tech}
                        <span
                          className="text-black text-base lg:text-lg arrow-indicator"
                          data-arrow="horizontal"
                        >
                          →
                        </span>
                      </span>
                    ))}
                    <span
                      className="px-3 py-1 text-base lg:text-xl font-tt-norms font-normal inline-flex items-center gap-1 break-words"
                      style={{backgroundColor: '#E4E4D9', color: 'var(--color-black)', borderRadius: '6px'}}
                    >
                      {t('jobs.projects.project2.technologies', { returnObjects: true })[t('jobs.projects.project2.technologies', { returnObjects: true }).length - 2]}
                      <span
                        className="text-black text-base lg:text-lg arrow-indicator"
                        data-arrow="horizontal"
                      >
                        →
                      </span>
                    </span>
                    <div className="flex items-center gap-1 whitespace-nowrap">
                      <span
                        className="px-3 py-1 text-base lg:text-xl font-tt-norms font-bold inline-flex items-center gap-1 break-words"
                        style={{backgroundColor: 'var(--shadow-color)', color: 'white', borderRadius: '6px'}}
                      >
                        R
                        <span
                          className="text-white text-base lg:text-lg arrow-indicator"
                          data-arrow="horizontal"
                        >
                          →
                        </span>
                      </span>
                      <span
                        className="px-3 py-1 text-base lg:text-xl font-tt-norms font-bold break-words bg-[--color-black]"
                        style={{color: 'white', borderRadius: '6px'}}
                      >
                        {t('jobs.projects.project2.technologies', { returnObjects: true })[t('jobs.projects.project2.technologies', { returnObjects: true }).length - 1]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* First line Boli */}
          <div className="grid grid-cols-12 gap-4 lg:gap-16">
            <div className="col-span-12 lg:col-span-1 mb-16 lg:mb-0"></div>
            <div className="col-span-12 lg:col-span-10 mb-16 lg:mb-0">
              <div className="space-y-8 lg:space-y-[34px]">
                <div className="relative overflow-hidden rounded-[40px] h-[384px] lg:h-[650px]">
                  <video
                    className="w-full h-full object-cover"
                    preload="none"
                    loading="lazy"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src="/BOLI.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                
                <div className="pt-2 space-y-8">
                  <h3 className="text-4xl font-tt-norms font-bold text-black break-words">
                    {t('jobs.projects.project3.title')}
                  </h3>
                  <p className="text-2xl font-tt-norms font-normal text-black leading-[1.54] break-words">
                    {t('jobs.projects.project3.description')}
                  </p>
                  <div className="flex flex-wrap gap-2 items-center">
                    {t('jobs.projects.project3.technologies', { returnObjects: true }).slice(0, -2).map((tech, i) => (
                      <span
                        className="px-3 py-1 text-base lg:text-xl font-tt-norms font-normal inline-flex items-center gap-1 break-words"
                        style={{backgroundColor: '#E4E4D9', color: 'var(--color-black)', borderRadius: '6px'}}
                      >
                        {tech}
                        <span
                          className="text-black text-base lg:text-lg arrow-indicator"
                          data-arrow="horizontal"
                        >
                          →
                        </span>
                      </span>
                    ))}
                    <span
                      className="px-3 py-1 text-base lg:text-xl font-tt-norms font-normal inline-flex items-center gap-1 break-words"
                      style={{backgroundColor: '#E4E4D9', color: 'var(--color-black)', borderRadius: '6px'}}
                    >
                      {t('jobs.projects.project3.technologies', { returnObjects: true })[t('jobs.projects.project3.technologies', { returnObjects: true }).length - 2]}
                      <span
                        className="text-black text-base lg:text-lg arrow-indicator"
                        data-arrow="horizontal"
                      >
                        →
                      </span>
                    </span>
                    <div className="flex items-center gap-1 whitespace-nowrap">
                      <span
                        className="px-3 py-1 text-base lg:text-xl font-tt-norms font-bold inline-flex items-center gap-1 break-words"
                        style={{backgroundColor: 'var(--shadow-color)', color: 'white', borderRadius: '6px'}}
                      >
                        R
                        <span
                          className="text-white text-base lg:text-lg arrow-indicator"
                          data-arrow="horizontal"
                        >
                          →
                        </span>
                      </span>
                      <span
                        className="px-3 py-1 text-base lg:text-xl font-tt-norms font-bold break-words"
                        style={{backgroundColor: 'var(--color-black)', color: 'white', borderRadius: '6px'}}
                      >
                        {t('jobs.projects.project3.technologies', { returnObjects: true })[t('jobs.projects.project3.technologies', { returnObjects: true }).length - 1]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Row 4: Hearthfield Game (9 cols) */}
          <div className="grid grid-cols-12 gap-4 lg:gap-16 items-stretch">
            <div className="col-span-10 lg:col-span-1 mb-16 lg:mb-0"></div>
            <div className="col-span-12 lg:col-span-10 mb-16 lg:mb-0">
              <div className="space-y-8 lg:space-y-[34px]">
                <div className="relative w-full aspect-video overflow-hidden rounded-[40px]">
                  <iframe
                    src="/hearthfield-game/index.html"
                    title={t('jobs.projects.project6.title')}
                    className="absolute top-0 left-0 w-full h-full rounded-xl"
                    style={{ border: 0, transform: 'translateY(0)' }}
                    allowFullScreen=""
                    loading="lazy"
                  ></iframe>
                </div>
                
                <div className="pt-2 space-y-8">
                  <h3 className="text-4xl font-tt-norms font-bold text-black break-words">
                    {t('jobs.projects.project6.title')}
                  </h3>
                  <p className="text-2xl font-tt-norms font-normal text-black leading-[1.54] break-words">
                    {t('jobs.projects.project6.description')}
                  </p>
                  <div className="flex flex-wrap gap-2 items-center">
                    {(() => {
                      const technologies = t('jobs.projects.project6.technologies', { returnObjects: true });
                      if (!Array.isArray(technologies) || technologies.length === 0) return null;
                      const techLength = technologies.length;

                      if (techLength < 3) {
                        return technologies.map((tech, i) => (
                          <span
                            className="px-3 py-1 text-base lg:text-xl font-tt-norms font-normal inline-flex items-center gap-1"
                            style={{backgroundColor: '#E4E4D9', color: 'var(--color-black)', borderRadius: '6px'}}
                          >
                            {tech}
                            {i < techLength - 1 && <span className="text-black text-base lg:text-lg arrow-indicator" data-arrow="horizontal">→</span>}
                          </span>
                        ));
                      }

                      return (
                        <>
                          {technologies.slice(0, -2).map((tech, i) => (
                            <span
                              className="px-3 py-1 text-base lg:text-xl font-tt-norms font-normal inline-flex items-center gap-1 break-words"
                              style={{backgroundColor: '#E4E4D9', color: 'var(--color-black)', borderRadius: '6px'}}
                            >
                              {tech}
                              <span className="text-black text-base lg:text-lg arrow-indicator" data-arrow="horizontal">→</span>
                            </span>
                          ))}
                          <span
                            className="px-3 py-1 text-base lg:text-xl font-tt-norms font-normal inline-flex items-center gap-1 break-words"
                            style={{backgroundColor: '#E4E4D9', color: 'var(--color-black)', borderRadius: '6px'}}
                          >
                            {technologies[techLength - 2]}
                            <span className="text-black text-base lg:text-lg arrow-indicator" data-arrow="horizontal">→</span>
                          </span>
                          <div className="flex items-center gap-1 whitespace-nowrap">
                            <span
                              className="px-3 py-1 text-base lg:text-xl font-tt-norms font-bold inline-flex items-center gap-1 break-words"
                              style={{backgroundColor: 'var(--shadow-color)', color: 'white', borderRadius: '6px'}}
                            >
                              R
                              <span
                                className="text-white text-base lg:text-lg arrow-indicator"
                                data-arrow="horizontal"
                              >
                                →
                              </span>
                            </span>
                            <span className="px-3 py-1 text-base lg:text-xl font-tt-norms font-bold break-words" style={{backgroundColor: 'var(--color-black)', color: 'white', borderRadius: '6px'}}>
                              {technologies[techLength - 1]}
                            </span>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ALL row */}
          <div className="grid grid-cols-12 gap-4 lg:gap-16">
            <div className="col-span-1"></div>
            <div className="col-span-12 lg:col-span-10">
              <div className="space-y-8 lg:space-y-[34px]">
                <div className="relative  overflow-hidden rounded-[40px] h-[650px]">
                  <video
                    className="w-full h-full object-cover"
                    preload="none"
                    loading="lazy"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src="/LEGACY.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="text-center mt-16">
          <a
            href="#contact"
            className="flex w-full md:inline-flex md:w-auto justify-center items-center px-12 py-4 bg-[--shadow-color] text-white font-tt-norms font-medium rounded-full hover:bg-secondary-dark transition-colors text-2xl"
          >
            <span dangerouslySetInnerHTML={{ __html: t('jobs.cta') }} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Jobs;
