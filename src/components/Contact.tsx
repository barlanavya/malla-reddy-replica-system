import { MapPin, Phone, Mail, Clock, MessageSquare } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      details: [
        'Malla Reddy University',
        'Hyderabad, Telangana',
        'India - 500100'
      ]
    },
    {
      icon: Phone,
      title: 'Phone',
      details: [
        '+91 40 1234 5678',
        '+91 40 1234 5679'
      ]
    },
    {
      icon: Mail,
      title: 'Email',
      details: [
        'info@mallareddy.edu.in',
        'admissions@mallareddy.edu.in'
      ]
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: [
        'Mon - Fri: 9:00 AM - 6:00 PM',
        'Sat: 9:00 AM - 2:00 PM'
      ]
    }
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-university-navy mb-4">Get in Touch</h2>
          <p className="text-xl text-university-gray max-w-3xl mx-auto">
            Have questions? We're here to help. Reach out to us through any of the following channels.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <h3 className="text-2xl font-semibold text-university-navy mb-6">Contact Information</h3>
            
            {contactInfo.map((info, index) => (
              <Card key={index} className="p-6 border-university-light-blue/20 hover:shadow-medium transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-university-light-blue rounded-lg flex items-center justify-center">
                    <info.icon className="w-6 h-6 text-university-blue" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-university-navy mb-2">{info.title}</h4>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-university-gray text-sm">{detail}</p>
                    ))}
                  </div>
                </div>
              </Card>
            ))}

            {/* Quick Contact */}
            <Card className="p-6 bg-university-light-blue border-0">
              <div className="flex items-center space-x-3 mb-4">
                <MessageSquare className="w-6 h-6 text-university-blue" />
                <h4 className="font-semibold text-university-navy">Quick Assistance</h4>
              </div>
              <p className="text-university-gray text-sm mb-4">
                Need immediate help? Our admission counselors are available to assist you.
              </p>
              <Button size="sm" className="w-full bg-gradient-primary">
                Chat with Counselor
              </Button>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8 border-0 shadow-medium">
              <h3 className="text-2xl font-semibold text-university-navy mb-6">Send us a Message</h3>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-university-navy mb-2">
                      Full Name *
                    </label>
                    <Input 
                      placeholder="Enter your full name"
                      className="border-university-light-blue/50 focus:border-university-blue"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-university-navy mb-2">
                      Email Address *
                    </label>
                    <Input 
                      type="email"
                      placeholder="Enter your email address"
                      className="border-university-light-blue/50 focus:border-university-blue"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-university-navy mb-2">
                      Phone Number
                    </label>
                    <Input 
                      placeholder="Enter your phone number"
                      className="border-university-light-blue/50 focus:border-university-blue"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-university-navy mb-2">
                      Subject
                    </label>
                    <Input 
                      placeholder="What is this regarding?"
                      className="border-university-light-blue/50 focus:border-university-blue"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-university-navy mb-2">
                    Message *
                  </label>
                  <Textarea 
                    placeholder="Please describe your inquiry in detail..."
                    rows={6}
                    className="border-university-light-blue/50 focus:border-university-blue resize-none"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="privacy"
                    className="w-4 h-4 text-university-blue border-university-light-blue rounded focus:ring-university-blue"
                  />
                  <label htmlFor="privacy" className="text-sm text-university-gray">
                    I agree to the privacy policy and terms of service
                  </label>
                </div>

                <Button size="lg" className="w-full bg-gradient-primary">
                  Send Message
                </Button>
              </form>
            </Card>

            {/* Map Placeholder */}
            <Card className="mt-8 p-6 border-0">
              <h4 className="text-xl font-semibold text-university-navy mb-4">Find Us</h4>
              <div className="bg-university-light-gray rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-university-blue mx-auto mb-4" />
                  <p className="text-university-gray">Interactive map will be integrated here</p>
                  <p className="text-sm text-university-gray mt-2">Showing university campus location</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;