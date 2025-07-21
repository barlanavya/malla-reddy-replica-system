import { ArrowRight, Award, Users, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import heroImage from '@/assets/university-hero.jpg';

const Hero = () => {
  const stats = [
    { icon: Users, label: 'Students', value: '15,000+' },
    { icon: BookOpen, label: 'Programs', value: '100+' },
    { icon: Award, label: 'Awards', value: '50+' },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-university-navy/90 to-university-blue/70"></div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Empowering
                <span className="block text-university-light-gold">Future Leaders</span>
              </h1>
              <p className="text-xl text-gray-200 max-w-lg">
                At Malla Reddy University, we shape tomorrow's innovators through world-class education, cutting-edge research, and holistic development.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-university-gold hover:bg-university-light-gold text-university-navy font-semibold">
                Explore Programs
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-university-navy">
                Virtual Tour
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <stat.icon className="w-6 h-6 text-university-light-gold" />
                  </div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Quick Access Cards */}
          <div className="space-y-6">
            <div className="grid gap-4">
              <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-medium hover:shadow-strong transition-all duration-300 hover:-translate-y-1">
                <h3 className="text-xl font-semibold text-university-navy mb-2">Student Portal</h3>
                <p className="text-university-gray mb-4">Access your academic records, fee status, and course materials.</p>
                <Button variant="outline" size="sm" className="w-full border-university-blue text-university-blue hover:bg-university-blue hover:text-white">
                  Login
                </Button>
              </Card>

              <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-medium hover:shadow-strong transition-all duration-300 hover:-translate-y-1">
                <h3 className="text-xl font-semibold text-university-navy mb-2">Apply for Admission</h3>
                <p className="text-university-gray mb-4">Start your journey with us. Apply online for various programs.</p>
                <Button size="sm" className="w-full bg-gradient-primary">
                  Apply Now
                </Button>
              </Card>

              <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-medium hover:shadow-strong transition-all duration-300 hover:-translate-y-1">
                <h3 className="text-xl font-semibold text-university-navy mb-2">Academic Calendar</h3>
                <p className="text-university-gray mb-4">View important dates, exam schedules, and academic events.</p>
                <Button variant="outline" size="sm" className="w-full border-university-blue text-university-blue hover:bg-university-blue hover:text-white">
                  View Calendar
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;