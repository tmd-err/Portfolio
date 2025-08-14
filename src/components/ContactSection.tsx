import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, Github, Linkedin, PhoneCall } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const ContactSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message sent!",
      description: "Thank you for your message. I'll get back to you soon.",
    });
    
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/tmd-err',
      label: 'GitHub',
      color: 'hover:text-primary'
    },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/yahya-tamda-0660352a7/',
      label: 'LinkedIn',
      color: 'hover:text-blue-400'
    },
    {
      icon: PhoneCall,
      href: 'https://web.whatsapp.com/send?phone=212681533815',
      label: 'WhatsApp',
      color: 'hover:text-blue-400'
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className={`text-center mb-16 ${isVisible ? 'fade-in-up animate' : 'fade-in-up'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Let's Work Together
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Ready to bring your ideas to life? Let's discuss your project and create something amazing together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className={`${isVisible ? 'fade-in-left animate' : 'fade-in-left'}`}>
            <div className="card-glow p-8 h-full">
              <h3 className="text-2xl font-bold mb-8 text-foreground">Get in Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-center group">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/20 rounded-full mr-4 group-hover:bg-primary/30 transition-colors">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <p className="text-muted-foreground">yahyatamda444@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center group">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/20 rounded-full mr-4 group-hover:bg-primary/30 transition-colors">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Phone</p>
                    <p className="text-muted-foreground">+2126 815 33 815</p>
                  </div>
                </div>
                
                <div className="flex items-center group">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/20 rounded-full mr-4 group-hover:bg-primary/30 transition-colors">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Location</p>
                    <p className="text-muted-foreground">Rabat, Morocco</p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h4 className="text-lg font-semibold mb-6 text-foreground">Connect with me</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-3 rounded-full border border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-300 group ${link.color}`}
                        aria-label={link.label}
                      >
                        <Icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`${isVisible ? 'fade-in-right animate' : 'fade-in-right'}`}>
            <form onSubmit={handleSubmit} className="card-glow p-8">
              <h3 className="text-2xl font-bold mb-8 text-foreground">Send a Message</h3>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Name *
                  </label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="bg-background/50 border-border focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email *
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-background/50 border-border focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="bg-background/50 border-border focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-neon"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;