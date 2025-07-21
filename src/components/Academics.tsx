import { GraduationCap, BookOpen, Users, Award } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Academics = () => {
  const departments = [
    {
      name: 'Engineering & Technology',
      programs: ['Computer Science', 'Electronics', 'Mechanical', 'Civil'],
      icon: '🔧',
      description: 'Cutting-edge engineering programs with industry-focused curriculum'
    },
    {
      name: 'Management & Commerce',
      programs: ['MBA', 'BBA', 'B.Com', 'M.Com'],
      icon: '💼',
      description: 'Comprehensive business education with practical exposure'
    },
    {
      name: 'Arts & Sciences',
      programs: ['Physics', 'Chemistry', 'Mathematics', 'English'],
      icon: '🔬',
      description: 'Strong foundation in fundamental sciences and liberal arts'
    },
    {
      name: 'Pharmacy',
      programs: ['B.Pharm', 'M.Pharm', 'Pharm.D'],
      icon: '💊',
      description: 'Professional pharmacy education with modern laboratory facilities'
    }
  ];

  const features = [
    {
      icon: GraduationCap,
      title: 'Expert Faculty',
      description: 'Learn from experienced professors and industry experts'
    },
    {
      icon: BookOpen,
      title: 'Modern Curriculum',
      description: 'Updated courses aligned with industry requirements'
    },
    {
      icon: Users,
      title: 'Small Class Sizes',
      description: 'Personalized attention with optimal student-faculty ratio'
    },
    {
      icon: Award,
      title: 'Research Focus',
      description: 'Opportunities for undergraduate and graduate research'
    }
  ];

  return (
    <section id="academics" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-university-navy mb-4">Academic Excellence</h2>
          <p className="text-xl text-university-gray max-w-3xl mx-auto">
            Discover our comprehensive range of programs designed to prepare you for success in your chosen field.
          </p>
        </div>

        {/* Academic Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-medium transition-all duration-300 hover:-translate-y-1 border-university-light-blue/20">
              <div className="w-16 h-16 bg-university-light-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8 text-university-blue" />
              </div>
              <h3 className="text-lg font-semibold text-university-navy mb-2">{feature.title}</h3>
              <p className="text-university-gray text-sm">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* Departments */}
        <div className="mb-16">
          <h3 className="text-3xl font-semibold text-university-navy text-center mb-12">Our Departments</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {departments.map((dept, index) => (
              <Card key={index} className="p-8 hover:shadow-medium transition-all duration-300 hover:-translate-y-1 border-0">
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{dept.icon}</div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-university-navy mb-2">{dept.name}</h4>
                    <p className="text-university-gray mb-4">{dept.description}</p>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-university-blue">Programs Offered:</p>
                      <div className="flex flex-wrap gap-2">
                        {dept.programs.map((program, idx) => (
                          <span 
                            key={idx}
                            className="px-3 py-1 bg-university-light-blue text-university-blue text-sm rounded-full"
                          >
                            {program}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-university-light-blue rounded-2xl p-12">
          <h3 className="text-3xl font-semibold text-university-navy mb-4">Ready to Start Your Journey?</h3>
          <p className="text-university-gray mb-8 max-w-2xl mx-auto">
            Explore our programs in detail and find the perfect fit for your academic and career goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-primary">
              View All Programs
            </Button>
            <Button size="lg" variant="outline" className="border-university-blue text-university-blue hover:bg-university-blue hover:text-white">
              Download Brochure
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Academics;