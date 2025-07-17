import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { gsap } from 'gsap';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef(null);
  const navItemsRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openMenu = () => {
    setIsOpen(true);
    setIsAnimating(true);

    gsap.fromTo(
      menuRef.current,
      { opacity: 0, y: -20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
        onComplete: () => setIsAnimating(false),
      }
    );

    gsap.fromTo(
      navItemsRef.current,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.3,
        stagger: 0.1,
        delay: 0.1,
      }
    );
  };

  const closeMenu = () => {
    setIsAnimating(true);
    gsap.to(menuRef.current, {
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

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    closeMenu();
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'glass-card backdrop-blur-xl' : ''
        }`}
      >
        <div className="container mx-auto px-6 py-4 relative">
          <div className="flex items-center justify-between">
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

            {!isOpen && (
              <button
                className="md:hidden nav-item p-2 text-foreground hover:text-primary transition-colors duration-300 z-50"
                onClick={openMenu}
              >
                <Menu size={24} />
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          ref={menuRef}
          className={`mobile-menu fixed inset-0 z-[9998]
            flex flex-col justify-center items-center
            space-y-8 text-3xl font-semibold
            glass-card backdrop-blur-xl bg-black/90 border-white/10
            transition-opacity duration-300
            ${isAnimating ? 'pointer-events-none' : 'pointer-events-auto'}`}
        >
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 p-2 text-white hover:text-primary transition-colors duration-300 z-[10000]"
            onClick={closeMenu}
          >
            <X size={32} />
          </button>

          {/* Mobile Nav Links */}
          {[
            { name: 'Home', href: '#hero' },
            { name: 'About', href: '#about' },
            { name: 'Projects', href: '#projects' },
            { name: 'Contact', href: '#contact' },
          ].map((item, index) => (
            <a
              key={item.name}
              ref={(el) => (navItemsRef.current[index] = el)}
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
