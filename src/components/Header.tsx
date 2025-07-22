
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, User, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const menuItems = [
    { name: 'Home', href: '/' },
    {
      name: 'About',
      href: '#about',
      dropdown: [
        { name: 'Vision & Mission', href: '#vision' },
        { name: 'Administration', href: '#administration' },
        { name: 'Infrastructure', href: '#infrastructure' },
      ]
    },
    {
      name: 'Academics',
      href: '#academics',
      dropdown: [
        { name: 'Courses Offered', href: '#courses' },
        { name: 'Departments', href: '#departments' },
        { name: 'Faculty', href: '#faculty' },
      ]
    },
    { name: 'Admissions', href: '/apply-admission' },
    { name: 'Academic Calendar', href: '/academic-calendar' },
    { name: 'Students Data', href: '/students-data' },
    { name: 'Campus Life', href: '#campus' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-university-navy">Malla Reddy University</h1>
              <p className="text-xs text-university-gray">Excellence in Education</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {menuItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.href}
                  className="flex items-center text-foreground hover:text-primary transition-colors font-medium text-sm"
                >
                  {item.name}
                  {item.dropdown && <ChevronDown className="w-4 h-4 ml-1" />}
                </Link>
                
                {item.dropdown && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-card rounded-lg shadow-medium border border-border py-2">
                    {item.dropdown.map((subItem) => (
                      <a
                        key={subItem.name}
                        href={subItem.href}
                        className="block px-4 py-2 text-foreground hover:bg-muted hover:text-primary transition-colors"
                      >
                        {subItem.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Student Login Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/login">
              <Button variant="outline" size="sm">
                <User className="w-4 h-4 mr-2" />
                Student Login
              </Button>
            </Link>
            <Link to="/apply-admission">
              <Button size="sm" className="bg-gradient-primary">
                Apply Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            {menuItems.map((item) => (
              <div key={item.name} className="py-2">
                <Link
                  to={item.href}
                  className="block text-foreground hover:text-primary font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
                {item.dropdown && (
                  <div className="ml-4 mt-2 space-y-1">
                    {item.dropdown.map((subItem) => (
                      <a
                        key={subItem.name}
                        href={subItem.href}
                        className="block text-sm text-muted-foreground hover:text-primary"
                      >
                        {subItem.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-4 space-y-2">
              <Link to="/login" className="block" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full">
                  <User className="w-4 h-4 mr-2" />
                  Student Login
                </Button>
              </Link>
              <Link to="/apply-admission" onClick={() => setIsMenuOpen(false)}>
                <Button size="sm" className="w-full bg-gradient-primary">
                  Apply Now
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
