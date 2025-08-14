import React from 'react';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import NetworkBackground from './NetworkBackground';
import { Button } from '@/components/ui/button';
import { useTypewriter } from '@/hooks/useTypewriter';

const HeroSection: React.FC = () => {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const { text: currentRole } = useTypewriter({
    words: [
      'Full-Stack Developer',
      'UI/UX Designer', 
      'React/Next.js Developer',
      'Backend Developer' ,
      'Vibe Coder'
    ],
    typeSpeed: 100,
    deleteSpeed: 50,
    pauseTime: 2000,
    loop: true
  });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <NetworkBackground />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="fade-in-up animate">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            TAMDA YAHYA
          </h1>
          <div className="text-xl md:text-2xl font-light mb-2 text-foreground/80 h-8 flex items-center justify-center">
            <span className="typewriter-text">
              {currentRole}
              <span className="animate-pulse text-primary">|</span>
            </span>
          </div>
          <p className="text-lg md:text-xl font-light mb-8 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Crafting digital experiences with modern technologies and innovative solutions. 
            Passionate about creating scalable applications that make a difference.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              onClick={scrollToProjects}
              className="btn-neon group"
            >
              View My Work
              <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
            </Button>
            
            <div className="flex space-x-4">
              <a 
                href="https://github.com/tmd-err" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-300 group"
              >
                <Github className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="https://www.linkedin.com/in/yahya-tamda-0660352a7/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-300 group"
              >
                <Linkedin className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="mailto:yahyatamda444@gmail.com"
                className="p-3 rounded-full border border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-300 group"
              >
                <Mail className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;