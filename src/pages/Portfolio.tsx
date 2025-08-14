import React, { useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';

const Portfolio: React.FC = () => {
  useEffect(() => {
    // Enable smooth scrolling for the whole page
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add scroll animations on load
    const handleScroll = () => {
      const elements = document.querySelectorAll('.fade-in-up:not(.animate), .fade-in-left:not(.animate), .fade-in-right:not(.animate), .scale-in:not(.animate)');
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        
        if (isVisible) {
          element.classList.add('animate');
        }
      });
    };

    // Initial check
    handleScroll();
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <HeroSection />
      <ProjectsSection />
      <SkillsSection />
      <AboutSection />
      <ContactSection />
      
      {/* Footer */}
      <footer className="py-8 border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2025 TAMDA YAHYA
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;