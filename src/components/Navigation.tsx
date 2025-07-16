import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { gsap } from 'gsap';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openMenu = () => {
    setIsOpen(true);
    setIsAnimating(true);
    gsap.to('.mobile-menu', {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: 'power2.out',
      onComplete: () => setIsAnimating(false),
    });
    gsap.fromTo(
      '.mobile-nav-item',
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.3,
        stagger: 0.1,
        delay: 0.2,
      }
    );
  };

  const closeMenu = () => {
    setIsAnimating(true);
    gsap.to('.mobile-menu', {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        setIsAnimating(false);
        setIsOpen(false);
      },
    });
  };

  const toggleMenu = () => {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    closeMenu();
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          isScrolled ? 'glass-card backdrop-blur-xl' : ''
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="nav-item">
              <a
                href="#hero"
                className="text-2xl font-bold neon-text hover:scale-105 transition-transform duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#hero');
                }}
              >
                Portfolio
              </a>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                { name: 'Home', href: '#hero' },
                { name: 'About', href: '#about' },
                { name: 'Projects', href: '#projects' },
                { name: 'Contact', href: '#contact' },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="nav-item text-foreground/80 hover:text-primary transition-colors duration-300 relative group"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden nav-item p-2 text-foreground hover:text-primary transition-colors duration-300 z-50"
              onClick={toggleMenu}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className={`
            mobile-menu
            md:hidden
            fixed inset-0
            glass-card backdrop-blur-xl
            border-white/10
            bg-black/90
            flex flex-col justify-center items-center space-y-8
            text-3xl font-semibold
            transition-opacity duration-300
            z-30
            ${isAnimating ? 'pointer-events-none' : 'pointer-events-auto'}
          `}
        >
          {/* Close button inside mobile menu */}
          <button
            className="absolute top-6 right-6 p-2 text-foreground hover:text-primary transition-colors duration-300"
            onClick={closeMenu}
          >
            <X size={32} />
          </button>

          {/* Navigation Items */}
          {[
            { name: 'Home', href: '#hero' },
            { name: 'About', href: '#about' },
            { name: 'Projects', href: '#projects' },
            { name: 'Contact', href: '#contact' },
          ].map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="mobile-nav-item text-foreground/80 hover:text-primary transition-colors duration-300 py-2"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.href);
              }}
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </>
  );
};

export default Navigation;