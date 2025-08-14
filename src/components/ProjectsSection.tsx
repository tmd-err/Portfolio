import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';

const projects = [
  {
    title: 'AutoTrack',
    description: 'Comprehensive car tracking system with real-time GPS monitoring, maintenance scheduling, and analytics dashboard for fleet management.',
    technologies: ['Laravel', 'MySQL', 'JavaScript', 'Tailwind CSS', 'PHP'],
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    title: 'CraftHub',
    description: 'Modern platform connecting skilled artisans with businesses, featuring marketplace functionality, booking system, and portfolio showcasing.',
    technologies: ['React', 'Redux Toolkit', 'Express.js', 'MongoDB', 'Node.js'],
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    title: 'E-commerce Platform',
    description: 'Full-featured online store with modern UI, secure payment integration, inventory management, and comprehensive admin dashboard.',
    technologies: ['Next.js', 'TypeScript',  'Tailwind CSS', 'Prisma'],
    liveUrl: '#',
    githubUrl: '#'
  }
];

const ProjectCard: React.FC<{ project: typeof projects[0]; index: number }> = ({ project, index }) => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`card-glow rounded-xl p-6 group ${isVisible ? 'scale-in animate' : 'scale-in'}`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="relative overflow-hidden rounded-lg mb-6">
       
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
        {project.title}
      </h3>
      
      <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
        {project.description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {project.technologies.map((tech) => (
          <span key={tech} className="tech-badge">
            {tech}
          </span>
        ))}
      </div>
      
      
    </div>
  );
};

const ProjectsSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="projects" className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className={`text-center mb-16 ${isVisible ? 'fade-in-up animate' : 'fade-in-up'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A showcase of my recent work, demonstrating expertise in full-stack development 
            and modern web technologies.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;