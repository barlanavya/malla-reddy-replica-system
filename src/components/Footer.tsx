import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  const quickLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Academics', href: '#academics' },
    { name: 'Admissions', href: '#admissions' },
    { name: 'Campus Life', href: '#campus' },
    { name: 'Research', href: '#research' },
  ];

  const studentServices = [
    { name: 'Student Portal', href: '#portal' },
    { name: 'Library', href: '#library' },
    { name: 'Fee Payment', href: '#fees' },
    { name: 'Academic Calendar', href: '#calendar' },
    { name: 'Placement Cell', href: '#placement' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-university-navy text-white">
      {/* Newsletter Section */}
      <div className="border-b border-university-blue/20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-2">Stay Updated</h3>
              <p className="text-gray-300">
                Subscribe to our newsletter for the latest news, events, and announcements.
              </p>
            </div>
            <div className="flex space-x-4">
              <Input 
                placeholder="Enter your email address"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
              <Button className="bg-university-gold hover:bg-university-light-gold text-university-navy font-semibold">
                Subscribe
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* University Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-university-gold rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-university-navy" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Malla Reddy University</h3>
                <p className="text-sm text-gray-300">Excellence in Education</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Committed to providing world-class education and fostering innovation, 
              research, and holistic development of our students.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-university-gold" />
                <span className="text-sm text-gray-300">Hyderabad, Telangana, India</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-university-gold" />
                <span className="text-sm text-gray-300">+91 40 1234 5678</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-university-gold" />
                <span className="text-sm text-gray-300">info@mallareddy.edu.in</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-300 hover:text-university-gold transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Student Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Student Services</h4>
            <ul className="space-y-3">
              {studentServices.map((service, index) => (
                <li key={index}>
                  <a 
                    href={service.href}
                    className="text-gray-300 hover:text-university-gold transition-colors text-sm"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Connect With Us</h4>
            <div className="space-y-4">
              <p className="text-gray-300 text-sm">
                Follow us on social media for updates and campus life glimpses.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-university-gold hover:text-university-navy transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
              
              {/* Important Links */}
              <div className="pt-4">
                <p className="text-sm font-medium text-white mb-2">Important</p>
                <div className="space-y-2">
                  <a href="#" className="block text-xs text-gray-300 hover:text-university-gold transition-colors">
                    Privacy Policy
                  </a>
                  <a href="#" className="block text-xs text-gray-300 hover:text-university-gold transition-colors">
                    Terms & Conditions
                  </a>
                  <a href="#" className="block text-xs text-gray-300 hover:text-university-gold transition-colors">
                    Anti-Ragging Policy
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-university-blue/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-300">
              © 2025 Malla Reddy University. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-300">
              <span>Designed with 💙 for students</span>
              <a href="#" className="hover:text-university-gold transition-colors">
                Accessibility
              </a>
              <a href="#" className="hover:text-university-gold transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;