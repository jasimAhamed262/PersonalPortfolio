import { useEffect } from 'react';
import { ArrowRight, Download } from 'lucide-react';
import { gsap } from 'gsap';

const HeroSection = () => {
  useEffect(() => {
    const tl = gsap.timeline({ delay: 3 }); // Wait for preloader

    // Hero content animations
    tl.fromTo('.hero-headline',
      { 
        opacity: 0, 
        y: 50, 
        filter: 'blur(10px)' 
      },
      { 
        opacity: 1, 
        y: 0, 
        filter: 'blur(0px)',
        duration: 1.2,
        ease: "power2.out"
      }
    )
    .fromTo('.hero-subtitle',
      { 
        opacity: 0, 
        y: 30 
      },
      { 
        opacity: 1, 
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      },
      "-=0.6"
    )
    .fromTo('.hero-cta',
      { 
        opacity: 0, 
        scale: 0.8 
      },
      { 
        opacity: 1, 
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)"
      },
      "-=0.4"
    )
    .fromTo('.spline-container',
      { 
        opacity: 0, 
        x: 100 
      },
      { 
        opacity: 1, 
        x: 0,
        duration: 1,
        ease: "power2.out"
      },
      "-=0.8"
    );

    // Floating orbs animation
    gsap.to('.floating-orb', {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      stagger: 0.5
    });

    // Pulse animation for CTA button
    gsap.to('.cta-pulse', {
      scale: 1.05,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

  }, []);

  const handleHireMe = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Spline 3D Background */}
      <div className="spline-container fixed inset-0 w-full h-full overflow-hidden" style={{ zIndex: 0 }}>
        <iframe 
          src='https://my.spline.design/worldplanet-cCTnlCN2S503chy6SebLNik7/' 
          frameBorder='0' 
          width='100%' 
          height='120%'
          title="3D Background"
          style={{ 
            position: 'absolute',
            top: '-10%',
            left: 0,
            width: '100%',
            height: '120%',
            border: 'none',
            pointerEvents: 'none',
            transform: 'scale(1.1)',
            transformOrigin: 'center center'
          }}
        />
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-orb absolute top-1/4 left-1/4 w-4 h-4 bg-primary/30 rounded-full blur-sm" />
        <div className="floating-orb absolute top-1/3 right-1/4 w-6 h-6 bg-secondary/30 rounded-full blur-sm" />
        <div className="floating-orb absolute bottom-1/3 left-1/3 w-3 h-3 bg-accent/30 rounded-full blur-sm" />
        <div className="floating-orb absolute bottom-1/4 right-1/3 w-5 h-5 bg-neon-pink/30 rounded-full blur-sm" />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/80" style={{ zIndex: 5 }} />

      {/* Hero Content */}
      <div className="relative container mx-auto px-6 text-center" style={{ zIndex: 10 }}>
        <div className="max-w-4xl mx-auto">
          {/* Main Headline */}
          <h1 className="hero-headline text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Hi, I'm{' '}
            <span className="neon-text">Jasim</span>
            <br />
            <span className="text-foreground/90">
              Web Developer &
            </span>
            <br />
            <span className="bg-gradient-accent bg-clip-text text-transparent">
              Cloud Enthusiast
            </span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Blending creativity with code to build responsive web experiences and 
          automate cloud operations turning ideas into interactive reality.
          </p>

      {/* CTA Button */}
<div className="hero-cta flex justify-center">
  <a
    href="/FinalResume.pdf"
    download="FinalResume.pdf"
    className="cta-pulse group glass-button bg-gradient-primary text-primary-foreground px-8 py-4 rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-glow flex items-center gap-2"
  >
    <Download size={20} className="group-hover:translate-y-1 transition-transform duration-300" />
    Download CV
  </a>
  </div>
</div>
</div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;