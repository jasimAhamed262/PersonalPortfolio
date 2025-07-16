import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onLoadComplete: () => void;
}

const Preloader = ({ onLoadComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Animate the text in
    tl.fromTo('.preloader-text', 
      { 
        opacity: 0, 
        y: 30,
        scale: 0.8
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power2.out"
      }
    );

    // Animate progress bar
    tl.fromTo('.progress-container',
      {
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      },
      "-=0.5"
    );

    // Progress animation
    let progressCounter = 0;
    const progressInterval = setInterval(() => {
      progressCounter += Math.random() * 3 + 1;
      if (progressCounter >= 100) {
        progressCounter = 100;
        clearInterval(progressInterval);
        
        // Complete animation
        setTimeout(() => {
          gsap.to('.progress-bar', {
            width: '100%',
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
              setProgress(100);
              
              // Exit animation
              setTimeout(() => {
                const exitTl = gsap.timeline();
                
                exitTl.to('.preloader-content', {
                  opacity: 0,
                  scale: 0.9,
                  duration: 0.8,
                  ease: "power2.in"
                });

                exitTl.to('.preloader', {
                  opacity: 0,
                  scale: 1.1,
                  duration: 1,
                  ease: "power2.out",
                  onComplete: () => {
                    onLoadComplete();
                  }
                }, "-=0.4");

              }, 500);
            }
          });
        }, 300);
      } else {
        setProgress(progressCounter);
        gsap.to('.progress-bar', {
          width: `${progressCounter}%`,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    }, 100);

    return () => {
      clearInterval(progressInterval);
    };
  }, [onLoadComplete]);

  return (
    <div className="preloader fixed inset-0 z-50 flex items-center justify-center bg-background overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="preloader-content relative z-10 text-center">
        {/* Main text */}
        <div className="preloader-text mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="neon-text">Jas</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl">
            Portfolio Loading...
          </p>
        </div>

        {/* Progress bar */}
        <div className="progress-container w-80 max-w-sm mx-auto">
          <div className="glass-card p-1 rounded-full">
            <div className="relative h-2 bg-muted/20 rounded-full overflow-hidden">
              <div 
                className="progress-bar h-full bg-gradient-primary rounded-full transition-all duration-300 shadow-glow"
                style={{ width: '0%' }}
              />
            </div>
          </div>
          <div className="mt-3 text-center">
            <span className="text-sm text-muted-foreground font-mono">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Pulsing rings */}
        <div className="absolute inset-0 flex items-center justify-center -z-10">
          <div className="w-96 h-96 border border-primary/20 rounded-full animate-pulse-glow" />
          <div className="absolute w-64 h-64 border border-secondary/20 rounded-full animate-pulse-glow" style={{ animationDelay: '1s' }} />
          <div className="absolute w-32 h-32 border border-accent/20 rounded-full animate-pulse-glow" style={{ animationDelay: '2s' }} />
        </div>
      </div>
    </div>
  );
};

export default Preloader;