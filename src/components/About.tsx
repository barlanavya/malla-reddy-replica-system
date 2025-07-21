import { Target, Eye, Trophy, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'Committed to delivering world-class education and maintaining the highest academic standards.'
    },
    {
      icon: Eye,
      title: 'Innovation',
      description: 'Fostering creativity and critical thinking to prepare students for future challenges.'
    },
    {
      icon: Trophy,
      title: 'Achievement',
      description: 'Celebrating success and empowering students to reach their full potential.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building strong relationships and creating an inclusive learning environment.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-university-light-gray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-university-navy mb-4">About Malla Reddy University</h2>
          <p className="text-xl text-university-gray max-w-3xl mx-auto">
            A premier educational institution committed to academic excellence, innovation, and holistic development of students.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold text-university-navy mb-4">Our Vision</h3>
              <p className="text-university-gray leading-relaxed">
                To be a globally recognized university that transforms lives through innovative education, 
                cutting-edge research, and meaningful community engagement. We envision a future where our 
                graduates become leaders who make positive contributions to society.
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold text-university-navy mb-4">Our Mission</h3>
              <p className="text-university-gray leading-relaxed">
                To provide exceptional educational experiences that foster intellectual growth, practical skills, 
                and ethical values. We are committed to creating an environment that encourages innovation, 
                critical thinking, and lifelong learning while promoting diversity and inclusion.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-medium">
            <h3 className="text-2xl font-semibold text-university-navy mb-6">Key Highlights</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-university-gold rounded-full"></div>
                <span className="text-university-gray">Established with a commitment to excellence</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-university-gold rounded-full"></div>
                <span className="text-university-gray">State-of-the-art infrastructure and facilities</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-university-gold rounded-full"></div>
                <span className="text-university-gray">Experienced and dedicated faculty</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-university-gold rounded-full"></div>
                <span className="text-university-gray">Industry-aligned curriculum and programs</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-university-gold rounded-full"></div>
                <span className="text-university-gray">Strong placement and career support</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-university-gold rounded-full"></div>
                <span className="text-university-gray">Research and innovation focus</span>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-semibold text-university-navy mb-4">Our Core Values</h3>
          <p className="text-university-gray max-w-2xl mx-auto">
            These fundamental principles guide everything we do and shape the character of our institution.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-medium transition-all duration-300 hover:-translate-y-1 border-0 bg-white">
              <div className="w-16 h-16 bg-university-light-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <value.icon className="w-8 h-8 text-university-blue" />
              </div>
              <h4 className="text-xl font-semibold text-university-navy mb-3">{value.title}</h4>
              <p className="text-university-gray text-sm leading-relaxed">{value.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;