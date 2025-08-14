import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import { 
  FaWordpress,
  FaLaravel,
  FaPhp,
  FaReact,

} from 'react-icons/fa';
import { SiTailwindcss, SiExpress, SiMongodb, SiMysql,SiTypescript  , SiNextdotjs, SiJavascript, SiNodedotjs } from "react-icons/si";
import Autoplay from 'embla-carousel-autoplay';

interface Skill {
  name: string;
  icon: React.ComponentType<any>;
  gradient: string;
}

const skills: Skill[] = [
  { name: 'JavaScript', icon: SiJavascript, gradient: 'from-yellow-400 to-orange-500' },
  { name: 'TypeScript', icon: SiTypescript, gradient: 'from-blue-400 to-blue-600' },
  { name: 'NodeJs', icon: SiNodedotjs, gradient: 'from-green-400 to-green-600' },
  { name: 'PHP', icon: FaPhp, gradient: 'from-purple-500 to-indigo-600' },
  { name: 'Laravel', icon: FaLaravel, gradient: 'from-red-500 to-pink-600' },
  { name: 'React', icon: FaReact, gradient: 'from-cyan-400 to-blue-500' },
  { name: 'Next.js', icon: SiNextdotjs, gradient: 'from-gray-700 to-gray-900' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, gradient: 'from-teal-400 to-cyan-500' },
  { name: 'Express.js', icon: SiExpress, gradient: 'from-yellow-500 to-yellow-500' },
  { name: 'MongoDB', icon: SiMongodb, gradient: 'from-green-400 to-green-600' },
  { name: 'MySQL', icon: SiMysql, gradient: 'from-blue-500 to-indigo-600' },
  { name: 'Wordpress', icon: FaWordpress, gradient: 'from-blue-500 to-indigo-600' },
];

const SkillsSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();
  
  const autoplay = React.useRef(
    Autoplay({ 
      delay: 3000, 
      stopOnInteraction: true,
      stopOnMouseEnter: true 
    })
  );

  return (
    <section className="py-20 bg-gradient-to-b from-background to-card/50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4">
        <div className={`text-center mb-16 fade-in-up ${isVisible ? 'animate' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Technologies I use to craft exceptional digital experiences
          </p>
        </div>

        <div className={`fade-in-up ${isVisible ? 'animate' : ''}`} style={{ animationDelay: '0.2s' }}>
          <Carousel
            opts={{
              align: 'start',
              loop: true,
              skipSnaps: false,
              dragFree: true,
            }}
            plugins={[autoplay.current]}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {skills.map((skill, index) => (
                <CarouselItem key={skill.name} className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6">
                  <div 
                    className="skill-card group"
                    style={{ 
                      animationDelay: `${index * 0.1}s`,
                      transform: 'translateZ(0)' // GPU acceleration
                    }}
                  >
                    <div className="relative p-8 h-full card-glow rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-3 group-hover:rotate-2 overflow-hidden">
                      {/* Animated gradient background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${skill.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                      
                      {/* Floating particles effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute top-2 right-2 w-1 h-1 bg-primary rounded-full animate-ping"></div>
                        <div className="absolute bottom-3 left-3 w-1 h-1 bg-accent rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                      </div>
                      
                      <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                        {/* Icon with gradient */}
                        <div className="relative p-4 rounded-xl bg-gradient-to-br from-card to-muted/50 group-hover:from-card/80 group-hover:to-muted/80 transition-all duration-300">
                          <skill.icon 
                            className={`w-8 h-8 text-foreground group-hover:text-primary transition-all duration-300 group-hover:scale-125`}
                          />
                          <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${skill.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-300`}></div>
                        </div>
                        
                        {/* Skill name with glow effect */}
                        <h3 className="font-semibold text-base text-foreground group-hover:text-primary transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.5)]">
                          {skill.name}
                        </h3>
                        
                        {/* Subtle pulse indicator */}
                        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <CarouselPrevious 
              className="hidden md:flex -left-12 bg-card/80 border-border hover:bg-card hover:border-primary/50 transition-all duration-300"
              aria-label="Previous skills"
            />
            <CarouselNext 
              className="hidden md:flex -right-12 bg-card/80 border-border hover:bg-card hover:border-primary/50 transition-all duration-300"
              aria-label="Next skills"
            />
          </Carousel>
        </div>

        {/* Mobile touch hint */}
        <div className={`md:hidden text-center mt-8 fade-in-up ${isVisible ? 'animate' : ''}`} style={{ animationDelay: '0.4s' }}>
          <p className="text-sm text-muted-foreground">
            Swipe to explore skills →
          </p>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;