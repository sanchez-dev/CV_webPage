import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useState, useRef, useEffect } from 'react';

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

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
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
      {!isLoaded && isInView && (
        <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-400">Loading...</div>
        </div>
      )}
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
        
        // Find the next keyword container (sibling)
        const nextKeywordContainer = arrowContainer.nextElementSibling;
        if (!nextKeywordContainer) return;
        
        const arrowRect = arrowContainer.getBoundingClientRect();
        const nextRect = nextKeywordContainer.getBoundingClientRect();
        
        // Check if the next element is on a different line
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

    // Run on mount and resize
    updateArrowDirections();
    window.addEventListener('resize', updateArrowDirections);
    
    // Run after a short delay to ensure layout is complete
    setTimeout(updateArrowDirections, 100);

    return () => window.removeEventListener('resize', updateArrowDirections);
  }, [t]);


  return (
    <section className="py-16 lg:py-40 relative bg-background z-10" id="projects">
      <div className="max-w-7xl mx-auto px-4 ">
        {/* Section Header */}
        <div className="mb-14 ">
          <h2 className="text-4xl lg:text-5xl font-tt-norms font-bold text-black tracking-tight mb-4">
            {t('jobs.title')} 
          </h2>
        </div>

        {/* Masonry Grid - Three rows with 120px spacing */}
        <div className="lg:space-y-[120px] space-y-0">
          {/* Row 1: Project 1 (3 cols) + Item1 (3 cols) + Project 3 (6 cols) */}
          <div className="grid grid-cols-12 gap-4">
            {/* Project 1 - Banking App */}
            <div className="col-span-12 lg:col-span-3 mb-16 lg:mb-0">
              <div className="space-y-6">
                <div className="relative overflow-hidden rounded-sm h-[554px] lg:h-[550px] bg-[#e1e1e1]">
                  <LazyVideo
                    src="/V1.mp4"
                    className="w-full h-full"
                  />
                </div>
                
                {/* Project Info Below Card */}
                <div className="space-y-4">
                  <h3 className="text-xl font-tt-norms font-bold text-black uppercase">
                    {t('jobs.projects.project1.title')}
                  </h3>
                  <p className="text-base font-tt-norms font-normal text-black">
                    {t('jobs.projects.project1.description')}
                  </p>
                  <div className="flex flex-wrap gap-1 items-center">
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

            {/* Empty container with item1 image - hidden on mobile */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="relative overflow-hidden rounded-sm h-64 lg:h-[550px] bg-[#e1e1e1]">
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url('/item1.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
              </div>
            </div>

            {/* Project 3 - Background Video */}
            <div className="col-span-12 lg:col-span-6 mb-16 lg:mb-0">
              <div className="space-y-6">
                <div className="relative overflow-hidden rounded-sm h-[384px] lg:h-[550px] bg-[#e1e1e1]">
                  <LazyVideo
                    src="/V3.mp4"
                    className="w-full h-full"
                  />
                </div>
                
                {/* Project Info Below Card */}
                <div className="space-y-4">
                  <h3 className="text-xl font-tt-norms font-bold text-black uppercase">
                    {t('jobs.projects.project3.title')}
                  </h3>
                  <p className="text-base font-tt-norms font-normal text-black">
                    {t('jobs.projects.project3.description')}
                  </p>
                  <div className="flex flex-wrap gap-1 items-center">
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

          {/* Row 2: Project 2 (9 cols) + Empty (3 cols) */}
          <div className="grid grid-cols-12 gap-4">
            {/* Project 2 - Real Estate Strategy */}
            <div className="col-span-12 lg:col-span-9 mb-16 lg:mb-0">
              <div className="space-y-6">
                <div className="relative overflow-hidden rounded-sm h-[384px] lg:h-[550px] bg-[#e1e1e1]">
                  <LazyVideo
                    src="/p2.mp4"
                    className="w-full h-full"
                  />
                </div>
                
                {/* Project Info Below Card */}
                <div className="space-y-4">
                  <h3 className="text-xl font-tt-norms font-bold text-black uppercase">
                    {t('jobs.projects.project2.title')}
                  </h3>
                  <p className="text-base font-tt-norms font-normal text-black">
                    {t('jobs.projects.project2.description')}
                  </p>
                  <div className="flex flex-wrap gap-1 items-center">
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
            
            {/* Empty container with item2 image - hidden on mobile */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="relative overflow-hidden rounded-sm h-64 lg:h-[550px] bg-[#e1e1e1]">
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url('/item2.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Row 3: Project 4 (6 cols) + Item 3 (3 cols) + Project 5 (3 cols) */}
          <div className="grid grid-cols-12 gap-4">
            {/* Project 4 - 6 columns */}
            <div className="col-span-12 lg:col-span-6 mb-16 lg:mb-0">
              <div className="space-y-6">
                <div className="relative overflow-hidden rounded-sm h-[384px] lg:h-[550px] bg-[#e1e1e1]">
                  <LazyVideo
                    src="/v4.mp4"
                    className="w-full h-full"
                  />
                </div>
                
                {/* Project Info Below Card */}
                <div className="space-y-4">
                  <h3 className="text-xl font-tt-norms font-bold text-black uppercase">
                    {t('jobs.projects.project4.title')}
                  </h3>
                  <p className="text-base font-tt-norms font-normal text-black">
                    {t('jobs.projects.project4.description')}
                  </p>
                  <div className="flex flex-wrap gap-1 items-center">
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

            {/* Item 3 decorative - 3 columns - hidden on mobile */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="relative overflow-hidden rounded-sm h-64 lg:h-[550px] bg-[#e1e1e1]">
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url('/item3.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
              </div>
            </div>

            {/* Project 5 - 3 columns */}
            <div className="col-span-12 lg:col-span-3 mb-16 lg:mb-0">
              <div className="space-y-6">
                <div className="relative overflow-hidden rounded-sm h-[554px] lg:h-[550px] bg-[#e1e1e1]">
                  <LazyVideo
                    src="/v5.mp4"
                    className="w-full h-full"
                  />
                </div>
                
                {/* Project Info Below Card */}
                <div className="space-y-4">
                  <h3 className="text-xl font-tt-norms font-bold text-black uppercase">
                    {t('jobs.projects.project5.title')}
                  </h3>
                  <p className="text-base font-tt-norms font-normal text-black">
                    {t('jobs.projects.project5.description')}
                  </p>
                  <div className="flex flex-wrap gap-1 items-center">
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

        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <a
            href="#contact"
            className="flex w-full md:inline-flex md:w-auto justify-center items-center px-12 py-4 bg-secondary text-white font-tt-norms font-medium rounded-full hover:bg-secondary-dark transition-colors text-2xl"
            style={{boxShadow: '0 0 3px rgba(0, 0, 255, 0.3), 0 0 10px rgba(0, 0, 255, 0.2)'}}
          >
            <span dangerouslySetInnerHTML={{ __html: t('jobs.cta') }} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Jobs;