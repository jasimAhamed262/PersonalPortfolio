import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "AIFA - Complete AI Solutions",
    description: "An AI-powered web platform integrating image generation, chatbot, and image finder in a modern responsive interface.",
    tech: ["HTML", "CSS", "JavaScript", "UI/UX"],
    image: "/images/project-1.png",
    category: "AI",
    year: "2025",
    github: "https://github.com/jasimAhamed262/AIFA-AI",
    live: "https://jasimahamed262.github.io/AIFA-AI/"
  },
  {
    id: 2,
    title: "Miche - Juice Shop Website",
    description: "A vibrant and modern website for a juice brand featuring product showcases, brand story and smooth experience.",
    tech: ["HTML", "CSS", "JavaScript", "Framer Motion", "UI/UX"],
    image: "/images/project -4.png",
    category: "Brochure",
    year: "2025",
    github: "https://github.com/jasimAhamed262/Miche-s-Brochure",
    live: "https://jasimahamed262.github.io/Miche-s-Brochure/"
  },
  {
    id: 3,
    title: "Cloud Cost Optimization",
    description: "Automated AWS Lambda solution to identify and delete stale EBS snapshots, reducing cloud storage costs by up to 70%.",
    tech: ["Python", "AWS Lambda", "CloudWatch", "Boto3"],
    image: "/images/project-2.jpg",
    category: "AWS",
    year: "2024",
    github: "https://github.com/jasimAhamed262/CloudCostOptimization"
  },
  {
    id: 4,
    title: "Game Application Deployment",
    description: "Deployed a scalable game app on AWS EKS using Fargate. Configured ALB for efficient traffic distribution and exposed the app via external IP for public access.",
    tech: ["AWS", "EKS", "LoadBalancer", "Fargate"],
    image: "/images/project -3.jpg",
    category: "AWS",
    year: "2024",
    github: "https://github.com/jasimAhamed262/Game-Application-Deployment-on-AWS-EKS"
  }
];

const ProjectsSection = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo('.projects-header',
      { opacity: 0, y: 50, filter: 'blur(5px)' },
      {
        opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: "power2.out",
        scrollTrigger: {
          trigger: '#projects',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      });

    gsap.fromTo('.project-card',
      { opacity: 0, y: 80, scale: 0.9 },
      {
        opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power2.out", stagger: 0.15,
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 70%',
          end: 'bottom 30%',
          toggleActions: 'play none none reverse'
        }
      });

    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { y: -10, scale: 1.02, duration: 0.3, ease: "power2.out" });
        gsap.to(card.querySelector('.project-image'), { scale: 1.1, duration: 0.4, ease: "power2.out" });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { y: 0, scale: 1, duration: 0.3, ease: "power2.out" });
        gsap.to(card.querySelector('.project-image'), { scale: 1, duration: 0.4, ease: "power2.out" });
      });
    });

    return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }, []);

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-warm rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-cool rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="projects-header text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="neon-text">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Showcasing innovative solutions and cutting-edge technologies.
            Each project represents a unique challenge solved with creativity and precision.
          </p>
          <div className="w-20 h-1 bg-gradient-primary rounded-full mx-auto" />
        </div>

        <div className="projects-grid grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="project-card glass-card rounded-xl overflow-hidden group cursor-pointer">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

                <div className="absolute top-4 left-4">
                  <span className="glass-button px-3 py-1 rounded-full text-xs font-medium text-primary">
                    {project.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="glass-button px-3 py-1 rounded-full text-xs font-medium text-accent">
                    {project.year}
                  </span>
                </div>

                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                      className="glass-button p-3 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300">
                      <Github size={20} className="text-white" />
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer"
                      className="glass-button p-3 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300">
                      <ExternalLink size={20} className="text-white" />
                    </a>
                  )}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span key={tech} className="px-2 py-1 text-xs rounded-md bg-muted/20 text-muted-foreground border border-muted/20">
                      {tech}
                    </span>
                  ))}
                </div>

                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all duration-300"
                  >
                    View Project
                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

       
      </div>
    </section>
  );
};

export default ProjectsSection;
