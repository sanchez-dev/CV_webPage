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


  return (
    <section className="py-16 lg:py-40 relative bg-background z-10" id="projects">
      <div className="max-w-7xl mx-auto px-6 ">
        {/* Section Header */}
        <div className="mb-14 ">
          <h2 className="text-4xl lg:text-5xl font-tt-norms font-bold text-black tracking-tight mb-4">
            {t('jobs.title')} 
          </h2>
        </div>

        {/* Masonry Grid - Two explicit rows */}
        <div className="space-y-4">
          {/* Row 1: Project 1 (3 cols) + Item1 (3 cols) + Project 3 (6 cols) */}
          <div className="grid grid-cols-12 gap-4">
            {/* Project 1 - Banking App (mantiene sus 3 cols originales) */}
            <div className="col-span-12 lg:col-span-3">
              <div className="relative overflow-hidden rounded-sm h-[554px] lg:h-[550px] bg-[#e1e1e1]">
                <LazyVideo
                  src="/V1.mp4"
                  className="w-full h-full"
                />

                {/* Technologies - Bottom center */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-wrap gap-2 justify-center z-10">
                  {t('jobs.projects.project1.technologies', { returnObjects: true }).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 border-stone-600/20 border text-stone-600/40 text-sm font-tt-norms rounded-sm backdrop-blur-lg"
                    >
                      {tech}
                    </span>
                  ))}
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

            {/* Project 3 - Background Video (mantiene sus 6 cols originales) */}
            <div className="col-span-12 lg:col-span-6">
              <div className="relative overflow-hidden rounded-sm h-[384px] lg:h-[550px] bg-[#e1e1e1]">
                <LazyVideo
                  src="/V3.mp4"
                  className="w-full h-full"
                />

                {/* Technologies - Bottom center */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-wrap gap-2 justify-center z-10">
                  {t('jobs.projects.project3.technologies', { returnObjects: true }).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 border-stone-600/20 border text-stone-600/40 text-sm font-tt-norms rounded-sm backdrop-blur-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Project 2 (9 cols) + Empty (3 cols) */}
          <div className="grid grid-cols-12 gap-4">
            {/* Project 2 - Real Estate Strategy */}
            <div className="col-span-12 lg:col-span-9">
              <div className="relative overflow-hidden rounded-sm h-[384px] lg:h-[550px] bg-[#e1e1e1]">
                <LazyVideo
                  src="/p2.mp4"
                  className="w-full h-full"
                />

                {/* Technologies - Bottom center */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-wrap gap-2 justify-center z-10">
                  {t('jobs.projects.project2.technologies', { returnObjects: true }).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 border-stone-600/20 border text-stone-600/40 text-sm font-tt-norms rounded-sm backdrop-blur-lg"
                    >
                      {tech} 
                    </span>
                  ))}
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
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <a
            href="#contact"
            className="flex w-full md:inline-flex md:w-auto justify-center items-center px-12 py-4 bg-secondary text-white font-tt-norms font-medium rounded-full hover:bg-secondary-dark transition-colors text-2xl"
            style={{boxShadow: '0 0 3px rgba(0, 0, 255, 0.3), 0 0 10px rgba(0, 0, 255, 0.3)'}}
          >
            <span dangerouslySetInnerHTML={{ __html: t('jobs.cta') }} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Jobs;