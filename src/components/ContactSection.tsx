import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import emailjs from "emailjs-com";
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Section animation
    gsap.fromTo('.contact-content',
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
          trigger: '#contact',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Form elements animation
    gsap.fromTo('.form-element',
      { 
        opacity: 0, 
        x: -30
      },
      { 
        opacity: 1, 
        x: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.contact-form',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Contact info animation
    gsap.fromTo('.contact-info-item',
      { 
        opacity: 0, 
        y: 20
      },
      { 
        opacity: 1, 
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.contact-info',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  // Animate submit button
  gsap.to('.submit-btn', {
    scale: 0.95,
    duration: 0.1,
    yoyo: true,
    repeat: 1,
    ease: "power2.out"
  });

  emailjs.send(
    'service_5t71qrf', 
    'template_hl2znyp', 
    {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    },
    'HRy-uGWMaaou7wxsi'
  )
  .then(() => {
    setIsSubmitting(false);
    setFormData({ name: '', email: '', message: '' });

    // Success animation
    gsap.fromTo('.success-message', 
      { opacity: 0, y: 20, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.7)" }
    );
    setTimeout(() => {
      gsap.to('.success-message', {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: "power2.in"
      });
    }, 3000);
  })
  .catch((error) => {
    console.error('EmailJS Error:', error);
    setIsSubmitting(false);
    // Optional: add error message UI
  });
};

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-gradient-accent rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-gradient-warm rounded-full blur-3xl animate-float-delay" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="contact-content text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let's{' '}
            <span className="neon-text">Connect</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Ready to bring your ideas to life? Let's discuss your project and create something amazing together.
          </p>
          <div className="w-20 h-1 bg-gradient-primary rounded-full mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="contact-form">
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6 neon-text">Send Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="form-element">
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground/80">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="glass-input w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300"
                    placeholder="Leo Das"
                  />
                </div>

                <div className="form-element">
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground/80">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="glass-input w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300"
                    placeholder="das@example.com"
                  />
                </div>

                <div className="form-element">
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground/80">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="glass-input w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="submit-btn w-full glass-button bg-gradient-primary text-primary-foreground py-4 rounded-lg font-semibold hover:scale-[1.02] transition-all duration-300 shadow-glow flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={18} />
                    </>
                  )}
                </button>
              </form>

              {/* Success Message */}
              <div className="success-message mt-4 p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300 text-center opacity-0">
                Message sent successfully! I'll get back to you soon.
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="contact-info space-y-8">
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6 neon-text">Get in Touch</h3>
              
              <div className="space-y-6">
                <div className="contact-info-item flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 glass-button rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Mail size={20} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Email</div>
                    <div className="text-muted-foreground">jasimahamed262@gmail.com</div>
                  </div>
                </div>

                <div className="contact-info-item flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 glass-button rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Phone size={20} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Phone</div>
                    <div className="text-muted-foreground">(+91) 9994088893</div>
                  </div>
                </div>

                <div className="contact-info-item flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 glass-button rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <MapPin size={20} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Location</div>
                    <div className="text-muted-foreground">Tiruchirappalli</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-card p-8 rounded-2xl">
              <h4 className="text-xl font-semibold mb-4 text-foreground">Follow Me</h4>
              <div className="flex gap-4">
                <a
                  href="https://github.com/jasimAhamed262"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-info-item w-12 h-12 glass-button rounded-full flex items-center justify-center hover:scale-110 hover:text-primary transition-all duration-300 group"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/jasimahamed262/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-info-item w-12 h-12 glass-button rounded-full flex items-center justify-center hover:scale-110 hover:text-primary transition-all duration-300 group"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="mailto:jasimahamed262@gmail.com"
                  className="contact-info-item w-12 h-12 glass-button rounded-full flex items-center justify-center hover:scale-110 hover:text-primary transition-all duration-300 group"
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;