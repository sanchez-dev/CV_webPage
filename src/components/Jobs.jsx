import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useState, useRef, useEffect } from 'react';
import Loader from './Loader';
import ScrollIndicator from './ScrollIndicator';

const LazyVideo = ({ src, className, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = videoRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isInView]);

  return (
    <div ref={videoRef} className={className}>
      {isInView && (
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setIsLoaded(true)}
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out'
          }}
          {...props}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      {!isLoaded && <Loader />}
    </div>
  );
};

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
    <section className="py-16 lg:py-40 relative bg-background z-10" id="projects">
      <div className="max-w-7xl mx-auto px-4 ">
        <div className="mb-14 ">
          <h2 className="text-4xl lg:text-5xl font-tt-norms font-bold text-black tracking-tight mb-4">
            {t('jobs.title')}
          </h2>
        </div>

        <div className="lg:space-y-[120px] space-y-0">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-9 mb-16 lg:mb-0">
              <div className="space-y-[34px]">
                <div className="relative overflow-hidden rounded-md h-[384px] lg:h-[550px]">
                  <LazyVideo
                    src="/p2.mp4"
                    className="w-full h-full"
                  />
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-3xl font-tt-norms font-bold text-black">
                    {t('jobs.projects.project2.title')}
                  </h3>
                  <p className="text-lg font-tt-norms font-normal text-black">
                    {t('jobs.projects.project2.description')}
                  </p>
                  <div className="flex flex-wrap gap-2 items-center">
                    {t('jobs.projects.project2.technologies', { returnObjects: true }).slice(0, -2).map((tech, i, slicedArray) => (
                      <div key={i} className="flex items-center gap-1 whitespace-nowrap">
                        <span
                          className="px-3 py-1 text-base font-tt-norms font-normal"
                          style={{border: '1px solid black', backgroundColor: 'transparent', color: 'black', borderRadius: '6px'}}
                        >
                          {tech}
                        </span>
                        {(
                          <span 
                            className="text-black text-base arrow-indicator"
                            data-arrow="horizontal"
                          >
                            →
                          </span>
                        )}
                      </div>
                    ))}
                    <div className="flex items-center gap-1 whitespace-nowrap">
                      <span
                        className="px-3 py-1 text-base font-tt-norms font-normal"
                        style={{border: '1px solid black', backgroundColor: 'transparent', color: 'black', borderRadius: '6px'}}
                      >
                        {t('jobs.projects.project2.technologies', { returnObjects: true })[t('jobs.projects.project2.technologies', { returnObjects: true }).length - 2]}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 whitespace-nowrap">
                      <span 
                        className="px-3 py-1 text-base font-tt-norms font-bold"
                        style={{backgroundColor: 'var(--color-primary)', color: 'white', borderRadius: '6px'}}
                      >
                        R→
                      </span>
                      <span
                        className="px-3 py-1 text-base font-tt-norms font-bold"
                        style={{backgroundColor: 'black', color: 'white', borderRadius: '6px'}}
                      >
                        {t('jobs.projects.project2.technologies', { returnObjects: true })[t('jobs.projects.project2.technologies', { returnObjects: true }).length - 1]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block col-span-3">
              <div className="relative rounded-2xl shadow-xl h-[550px]">
                <div className="h-full border border-stone-200 rounded-2xl w-full overflow-y-scroll scrollbar-hide">
                  <LazyLoadImage
                    src="/BTG1.png"
                    alt="BTG Pactual Design"
                    className="w-full h-auto"
                    wrapperClassName="w-full"
                  />
                </div>
                <ScrollIndicator />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-6 mb-16 lg:mb-0">
              <div className="space-y-[34px]">
                <div className="relative overflow-hidden rounded-md h-[384px] lg:h-[550px]">
                  <LazyVideo
                    src="/v4.mp4"
                    className="w-full h-full"
                  />
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-3xl font-tt-norms font-bold text-black">
                    {t('jobs.projects.project4.title')}
                  </h3>
                  <p className="text-lg font-tt-norms font-normal text-black">
                    {t('jobs.projects.project4.description')}
                  </p>
                  <div className="flex flex-wrap gap-2 items-center">
                    {t('jobs.projects.project4.technologies', { returnObjects: true }).slice(0, -2).map((tech, i, slicedArray) => (
                      <div key={i} className="flex items-center gap-1 whitespace-nowrap">
                        <span
                          className="px-3 py-1 text-base font-tt-norms font-normal"
                          style={{border: '1px solid black', backgroundColor: 'transparent', color: 'black', borderRadius: '6px'}}
                        >
                          {tech}
                        </span>
                        {(
                          <span 
                            className="text-black text-base arrow-indicator"
                            data-arrow="horizontal"
                          >
                            →
                          </span>
                        )}
                      </div>
                    ))}
                    <div className="flex items-center gap-1 whitespace-nowrap">
                      <span
                        className="px-3 py-1 text-base font-tt-norms font-normal"
                        style={{border: '1px solid black', backgroundColor: 'transparent', color: 'black', borderRadius: '6px'}}
                      >
                        {t('jobs.projects.project4.technologies', { returnObjects: true })[t('jobs.projects.project4.technologies', { returnObjects: true }).length - 2]}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 whitespace-nowrap">
                      <span 
                        className="px-3 py-1 text-base font-tt-norms font-bold"
                        style={{backgroundColor: 'var(--color-primary)', color: 'white', borderRadius: '6px'}}
                      >
                        R→
                      </span>
                      <span
                        className="px-3 py-1 text-base font-tt-norms font-bold"
                        style={{backgroundColor: 'black', color: 'white', borderRadius: '6px'}}
                      >
                        {t('jobs.projects.project4.technologies', { returnObjects: true })[t('jobs.projects.project4.technologies', { returnObjects: true }).length - 1]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block col-span-3">
              <div className="relative overflow-hidden rounded-md h-64 lg:h-[550px]">
                <LazyLoadImage
                  src="/item3.png"
                  alt="Decorative Item 3"
                  effect="blur"
                  placeholder={<Loader />}
                  className="w-full h-full object-cover"
                  wrapperClassName="w-full h-full"
                />
              </div>
            </div>

            <div className="col-span-12 lg:col-span-3 mb-16 lg:mb-0">
              <div className="space-y-[34px]">
                <div className="relative overflow-hidden rounded-md h-[554px] lg:h-[550px]">
                  <LazyVideo
                    src="/v5.mp4"
                    className="w-full h-full"
                  />
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-3xl font-tt-norms font-bold text-black">
                    {t('jobs.projects.project5.title')}
                  </h3>
                  <p className="text-lg font-tt-norms font-normal text-black">
                    {t('jobs.projects.project5.description')}
                  </p>
                  <div className="flex flex-wrap gap-2 items-center">
                    {t('jobs.projects.project5.technologies', { returnObjects: true }).slice(0, -2).map((tech, i, slicedArray) => (
                      <div key={i} className="flex items-center gap-1 whitespace-nowrap">
                        <span
                          className="px-3 py-1 text-base font-tt-norms font-normal"
                          style={{border: '1px solid black', backgroundColor: 'transparent', color: 'black', borderRadius: '6px'}}
                        >
                          {tech}
                        </span>
                        {(
                          <span 
                            className="text-black text-base arrow-indicator"
                            data-arrow="horizontal"
                          >
                            →
                          </span>
                        )}
                      </div>
                    ))}
                    <div className="flex items-center gap-1 whitespace-nowrap">
                      <span
                        className="px-3 py-1 text-base font-tt-norms font-normal"
                        style={{border: '1px solid black', backgroundColor: 'transparent', color: 'black', borderRadius: '6px'}}
                      >
                        {t('jobs.projects.project5.technologies', { returnObjects: true })[t('jobs.projects.project5.technologies', { returnObjects: true }).length - 2]}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 whitespace-nowrap">
                      <span 
                        className="px-3 py-1 text-base font-tt-norms font-bold"
                        style={{backgroundColor: 'var(--color-primary)', color: 'white', borderRadius: '6px'}}
                      >
                        R→
                      </span>
                      <span
                        className="px-3 py-1 text-base font-tt-norms font-bold"
                        style={{backgroundColor: 'black', color: 'white', borderRadius: '6px'}}
                      >
                        {t('jobs.projects.project5.technologies', { returnObjects: true })[t('jobs.projects.project5.technologies', { returnObjects: true }).length - 1]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-3 mb-16 lg:mb-0">
              <div className="space-y-[34px]">
                <div className="relative overflow-hidden rounded-md h-[554px] lg:h-[550px]">
                  <LazyVideo
                    src="/V1.mp4"
                    className="w-full h-full"
                  />
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-3xl font-tt-norms font-bold text-black">
                    {t('jobs.projects.project1.title')}
                  </h3>
                  <p className="text-lg font-tt-norms font-normal text-black">
                    {t('jobs.projects.project1.description')}
                  </p>
                  <div className="flex flex-wrap gap-2 items-center">
                    {t('jobs.projects.project1.technologies', { returnObjects: true }).slice(0, -2).map((tech, i, slicedArray) => (
                      <div key={i} className="flex items-center gap-1 whitespace-nowrap">
                        <span
                          className="px-3 py-1 text-base font-tt-norms font-normal"
                          style={{border: '1px solid black', backgroundColor: 'transparent', color: 'black', borderRadius: '6px'}}
                        >
                          {tech}
                        </span>
                        {(
                          <span 
                            className="text-black text-base arrow-indicator"
                            data-arrow="horizontal"
                          >
                            →
                          </span>
                        )}
                      </div>
                    ))}
                    <div className="flex items-center gap-1 whitespace-nowrap">
                      <span
                        className="px-3 py-1 text-base font-tt-norms font-normal"
                        style={{border: '1px solid black', backgroundColor: 'transparent', color: 'black', borderRadius: '6px'}}
                      >
                        {t('jobs.projects.project1.technologies', { returnObjects: true })[t('jobs.projects.project1.technologies', { returnObjects: true }).length - 2]}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 whitespace-nowrap">
                      <span 
                        className="px-3 py-1 text-base font-tt-norms font-bold"
                        style={{backgroundColor: 'var(--color-primary)', color: 'white', borderRadius: '6px'}}
                      >
                        R→
                      </span>
                      <span
                        className="px-3 py-1 text-base font-tt-norms font-bold"
                        style={{backgroundColor: 'black', color: 'white', borderRadius: '6px'}}
                      >
                        {t('jobs.projects.project1.technologies', { returnObjects: true })[t('jobs.projects.project1.technologies', { returnObjects: true }).length - 1]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block col-span-3">
              <div className="relative rounded-2xl shadow-2xl shadow-black/70 h-[550px]">
                <div className="h-full border border-stone-200 rounded-2xl w-full overflow-y-scroll scrollbar-hide">
                  <LazyLoadImage
                    src="/Boli1.png"
                    alt="Boli 1 Design"
                    className="w-full h-auto"
                    wrapperClassName="w-full"
                  />
                </div>
                <ScrollIndicator />
              </div>
            </div>

            <div className="col-span-12 lg:col-span-6 mb-16 lg:mb-0">
              <div className="space-y-[34px]">
                <div className="relative overflow-hidden rounded-md h-[384px] lg:h-[550px]">
                  <LazyVideo
                    src="/V3.mp4"
                    className="w-full h-full"
                  />
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-3xl font-tt-norms font-bold text-black">
                    {t('jobs.projects.project3.title')}
                  </h3>
                  <p className="text-lg font-tt-norms font-normal text-black">
                    {t('jobs.projects.project3.description')}
                  </p>
                  <div className="flex flex-wrap gap-2 items-center">
                    {t('jobs.projects.project3.technologies', { returnObjects: true }).slice(0, -2).map((tech, i, slicedArray) => (
                      <div key={i} className="flex items-center gap-1 whitespace-nowrap">
                        <span
                          className="px-3 py-1 text-base font-tt-norms font-normal"
                          style={{border: '1px solid black', backgroundColor: 'transparent', color: 'black', borderRadius: '6px'}}
                        >
                          {tech}
                        </span>
                        {(
                          <span 
                            className="text-black text-base arrow-indicator"
                            data-arrow="horizontal"
                          >
                            →
                          </span>
                        )}
                      </div>
                    ))}
                    <div className="flex items-center gap-1 whitespace-nowrap">
                      <span
                        className="px-3 py-1 text-base font-tt-norms font-normal"
                        style={{border: '1px solid black', backgroundColor: 'transparent', color: 'black', borderRadius: '6px'}}
                      >
                        {t('jobs.projects.project3.technologies', { returnObjects: true })[t('jobs.projects.project3.technologies', { returnObjects: true }).length - 2]}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 whitespace-nowrap">
                      <span 
                        className="px-3 py-1 text-base font-tt-norms font-bold"
                        style={{backgroundColor: 'var(--color-primary)', color: 'white', borderRadius: '6px'}}
                      >
                        R→
                      </span>
                      <span
                        className="px-3 py-1 text-base font-tt-norms font-bold"
                        style={{backgroundColor: 'black', color: 'white', borderRadius: '6px'}}
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
          <div className="grid grid-cols-12 gap-8 items-stretch">
            <div className="col-span-12 lg:col-span-9 mb-16 lg:mb-0">
              <div className="space-y-[34px]">
                <div className="relative w-full aspect-video overflow-hidden rounded-md">
                  <iframe
                    src="/hearthfield-game/index.html"
                    title={t('jobs.projects.project6.title')}
                    className="absolute top-0 left-0 w-full h-full"
                    style={{ border: 0, transform: 'translateY(-20px)' }}
                    allowFullScreen=""
                    loading="lazy"
                  ></iframe>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-3xl font-tt-norms font-bold text-black">
                    {t('jobs.projects.project6.title')}
                  </h3>
                  <p className="text-lg font-tt-norms font-normal text-black">
                    {t('jobs.projects.project6.description')}
                  </p>
                  <div className="flex flex-wrap gap-2 items-center">
                    {(() => {
                      const technologies = t('jobs.projects.project6.technologies', { returnObjects: true });
                      if (!Array.isArray(technologies) || technologies.length === 0) return null;
                      const techLength = technologies.length;

                      if (techLength < 3) {
                        return technologies.map((tech, i) => (
                          <div key={i} className="flex items-center gap-1 whitespace-nowrap">
                            <span
                              className="px-3 py-1 text-base font-tt-norms font-normal"
                              style={{border: '1px solid black', backgroundColor: 'transparent', color: 'black', borderRadius: '6px'}}
                            >
                              {tech}
                            </span>
                            {i < techLength - 1 && <span className="text-black text-base arrow-indicator">→</span>}
                          </div>
                        ));
                      }

                      return (
                        <>
                          {technologies.slice(0, -2).map((tech, i) => (
                            <div key={i} className="flex items-center gap-1 whitespace-nowrap">
                              <span className="px-3 py-1 text-base font-tt-norms font-normal" style={{border: '1px solid black', backgroundColor: 'transparent', color: 'black', borderRadius: '6px'}}>
                                {tech}
                              </span>
                              <span className="text-black text-base arrow-indicator">→</span>
                            </div>
                          ))}
                          <div className="flex items-center gap-1 whitespace-nowrap">
                            <span className="px-3 py-1 text-base font-tt-norms font-normal" style={{border: '1px solid black', backgroundColor: 'transparent', color: 'black', borderRadius: '6px'}}>
                              {technologies[techLength - 2]}
                            </span>
                            <span className="text-black text-base arrow-indicator">→</span>
                          </div>
                          <div className="flex items-center gap-1 whitespace-nowrap">
                            <span className="px-3 py-1 text-base font-tt-norms font-bold" style={{backgroundColor: 'var(--color-primary)', color: 'white', borderRadius: '6px'}}>
                              R→
                            </span>
                            <span className="px-3 py-1 text-base font-tt-norms font-bold" style={{backgroundColor: 'black', color: 'white', borderRadius: '6px'}}>
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
            <div className="hidden lg:block col-span-3">
              <div className="relative overflow-hidden rounded-md h-64 lg:h-[500px]">
                <LazyLoadImage
                  src="/item2.jpg"
                  alt="Decorative Item 2"
                  effect="blur"
                  placeholder={<Loader />}
                  className="w-full h-full object-cover"
                  wrapperClassName="w-full h-full"
                />
              </div>
            </div>
          </div>

        </div>

        <div className="text-center mt-16">
          <a
            href="#contact"
            className="flex w-full md:inline-flex md:w-auto justify-center items-center px-12 py-4 bg-secondary text-white font-tt-norms font-medium rounded-full hover:bg-secondary-dark transition-colors text-2xl"
          >
            <span dangerouslySetInnerHTML={{ __html: t('jobs.cta') }} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Jobs;