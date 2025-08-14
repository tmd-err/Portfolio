import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Code2, Palette, Rocket, Users } from 'lucide-react';
import profileImage from '@/assets/portfolio.png';

const skills = [
  {
    icon: Code2,
    title: 'Full-Stack Development',
    description: 'Expertise in both frontend and backend technologies, creating complete web solutions.'
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Crafting intuitive user experiences with modern design principles and accessibility.'
  },
  {
    icon: Rocket,
    title: 'Performance Optimization',
    description: 'Building fast, scalable applications with attention to performance and best practices.'
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Strong communication skills and experience working in agile development teams.'
  }
];

const AboutSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();
  const skillsRef = useScrollAnimation();

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-muted/20 to-background">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className={`text-center mb-16 ${isVisible ? 'fade-in-up animate' : 'fade-in-up'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Passionate developer with a love for creating innovative solutions 
            and bringing ideas to life through code.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className={`${isVisible ? 'fade-in-left animate' : 'fade-in-left'}`}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-xl"></div>
              <img
                src={profileImage}
                alt="John Developer"
                className="relative w-full max-w-md mx-auto rounded-2xl shadow-2xl glass"
              />
            </div>
          </div>
          
          <div className={`${isVisible ? 'fade-in-right animate' : 'fade-in-right'}`}>
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
              Building the future, one line of code at a time
            </h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I specialize in creating 
                robust, scalable applications using modern technologies. My journey began with a 
                passion for problem-solving and has evolved into expertise across multiple domains.
              </p>
              <p>
                I thrive on challenges that push the boundaries of what's possible on the web. 
                From complex database architectures to intuitive user interfaces, I bring a 
                holistic approach to every project.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies, contributing to 
                open-source projects, or mentoring fellow developers in the community.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="text-center p-4 glass rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">5 +</div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </div>
              <div className="text-center p-4 glass rounded-lg">
                <div className="text-2xl font-bold text-accent mb-1">1</div>
                <div className="text-sm text-muted-foreground">Year Of Experience</div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div ref={skillsRef.ref} className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${skillsRef.isVisible ? 'fade-in-up animate' : 'fade-in-up'}`}>
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div
                key={skill.title}
                className="card-glow p-6 text-center group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {skill.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {skill.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;