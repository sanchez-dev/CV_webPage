import { useTranslation } from 'react-i18next';

const Jobs = () => {
  const { t } = useTranslation();


  return (
    <section className="py-20 lg:py-40 relative bg-background z-10" id="projects">
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
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="/V1.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Technologies - Bottom right */}
                <div className="absolute bottom-4 right-4 flex flex-wrap gap-2 justify-end z-10">
                  {t('jobs.projects.project1.technologies', { returnObjects: true }).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-white/90 border border-secondary text-secondary text-sm font-tt-norms rounded-sm backdrop-blur-lg"
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
                <img 
                  src="/item1.jpg" 
                  alt="Design element"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Project 3 - Background Video (mantiene sus 6 cols originales) */}
            <div className="col-span-12 lg:col-span-6">
              <div className="relative overflow-hidden rounded-sm h-[384px] lg:h-[550px] bg-[#e1e1e1]">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="/V3.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Technologies - Bottom right */}
                <div className="absolute bottom-4 right-4 flex flex-wrap gap-2 justify-end z-10">
                  {t('jobs.projects.project3.technologies', { returnObjects: true }).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-white/90 border border-secondary text-secondary text-sm font-tt-norms rounded-sm backdrop-blur-lg"
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
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="/p2.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Technologies - Bottom right */}
                <div className="absolute bottom-4 right-4 flex flex-wrap gap-2 justify-middle z-10">
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
                <img 
                  src="/item2.jpg" 
                  alt="Design element"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white font-tt-norms font-medium rounded-sm hover:bg-primary/90 transition-colors"
          >
            {t('jobs.cta')}
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M7 17l9.2-9.2M17 17V7H7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Jobs;