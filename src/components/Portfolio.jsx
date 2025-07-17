import { useState, useEffect } from 'react';
import Preloader from './Preloader';
import Navigation from './Navigation';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import ProjectsSection from './ProjectsSection';
import ContactSection from './ContactSection';

const Portfolio = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadComplete = () => {
    setIsLoading(false);

    // Initialize smooth scrolling and other effects after loading
    setTimeout(() => {
      document.body.style.overflow = 'visible';
    }, 100);
  };

  useEffect(() => {
    // Hide overflow during loading
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, []);

  return (
    <div className="portfolio-container">
      {/* Preloader */}
      {isLoading && <Preloader onLoadComplete={handleLoadComplete} />}

      {/* Main Content */}
      <div className={`main-content transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Navigation />

        <main className="relative">
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <ContactSection />
        </main>
      </div>

      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/10" />

        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-secondary/5 rounded-full blur-3xl animate-float-delay" />
        <div className="absolute top-3/4 left-3/4 w-20 h-20 bg-accent/5 rounded-full blur-3xl animate-float" />
      </div>
    </div>
  );
};

export default Portfolio;
