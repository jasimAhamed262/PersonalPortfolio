import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import profileImage from '../assets/profile-image.jpg';
import { SiPython } from "react-icons/si";
import { Code, Database, Cloud, Layers, Network, Cpu, Globe, Zap } from 'lucide-react';

// Tech stack with proper icons
const techStack = [
  { name: 'HTML', Icon: Code, color: 'text-orange-500' },
  { name: 'CSS', Icon: Layers, color: 'text-blue-500' },
  { name: 'JavaScript', Icon: Zap, color: 'text-yellow-400' },
  { name: 'Python', Icon: SiPython, color: 'text-green-600' },
  { name: 'Networking', Icon: Network, color: 'text-indigo-500' },
  { name: 'Linux', Icon: Globe, color: 'text-gray-400' },
  { name: 'SQL', Icon: Database, color: 'text-green-600' },
  { name: 'AWS Cloud', Icon: Cloud, color: 'text-orange-400' },
];

const AboutSection = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Section reveal animation
    gsap.fromTo('.about-content',
      { 
        opacity: 0, 
        y: 60,
        filter: 'blur(5px)'
      },
      { 
        opacity: 1, 
        y: 0,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: '#about',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Profile image animation
    gsap.fromTo('.profile-image',
      { 
        opacity: 0, 
        x: -60,
        scale: 0.8
      },
      { 
        opacity: 1, 
        x: 0,
        scale: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: '#about',
          start: 'top 70%',
          end: 'bottom 30%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Tech stack staggered animation
    gsap.fromTo('.tech-item',
      { 
        opacity: 0, 
        y: 20,
        scale: 0.8
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.tech-grid',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Profile image hover effect
    const profileImg = document.querySelector('.profile-image');
    if (profileImg) {
      profileImg.addEventListener('mouseenter', () => {
        gsap.to('.profile-image', {
          scale: 1.05,
          rotationY: 5,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      profileImg.addEventListener('mouseleave', () => {
        gsap.to('.profile-image', {
          scale: 1,
          rotationY: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-primary rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-gradient-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <div className="profile-image relative">
            <div className="relative w-80 h-80 mx-auto">
              {/* Glowing frame */}
              <div className="absolute inset-0 bg-gradient-primary rounded-full blur-sm opacity-30 animate-pulse-glow" />
              
              {/* Image container */}
              <div className="relative glass-card rounded-full p-1 overflow-hidden">
                <img
                  src={profileImage}
                  alt="Jas - Web Developer"
                  className="w-80 h-80 object-cover rounded-full"
                />
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/30 rounded-full animate-float" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-secondary/30 rounded-full animate-float-delay" />
            </div>
          </div>

          {/* Content */}
          <div className="about-content space-y-8">
            {/* Section Header */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                About{' '}
                <span className="neon-text">Me</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-primary rounded-full" />
            </div>

            {/* Bio */}
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I build clean, responsive websites and enjoy figuring out how stuff works behind the scenes. 
                What started with basic HTML and CSS turned into me playing with JavaScript, React,
                and eventually diving into the cloud with AWS.
              </p>
              
              <p>
                I like making things that work well and look good whether it’s a smooth UI or an 
                automated script that saves time. I’m not the type to sit still 
                if there’s something new to learn or try, I’m on it.
              </p>

              <p>
                When I'm not coding, you'll find me exploring the latest tech trends, 
                contributing to projects, or gettin knowledge with the 
                developer community.
              </p>
            </div>

            {/* Skills Grid */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                Tech Stack
              </h3>
              <div className="tech-grid grid grid-cols-2 sm:grid-cols-4 gap-3">
                {techStack.map((tech, index) => (
                  <div
                    key={tech.name}
                    className="tech-item glass-card p-3 rounded-lg text-center group hover:scale-105 transition-all duration-300 cursor-pointer"
                  >
                    <div className={`text-2xl mb-1 ${tech.color} group-hover:scale-110 transition-transform duration-300 flex justify-center`}>
                      <tech.Icon size={32} />
                    </div>
                    <div className="text-xs font-medium text-foreground/80">
                      {tech.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
