import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const News = () => {
  const newsItems = [
    {
      id: 1,
      title: 'Annual Tech Fest 2025 - Innovation Summit',
      excerpt: 'Join us for the biggest tech event of the year featuring competitions, workshops, and industry speakers.',
      date: '2025-02-15',
      category: 'Events',
      image: '🎯',
      urgent: false
    },
    {
      id: 2,
      title: 'New Engineering Block Inauguration',
      excerpt: 'State-of-the-art engineering facilities with advanced laboratories and modern classrooms now open.',
      date: '2025-01-28',
      category: 'Infrastructure',
      image: '🏗️',
      urgent: false
    },
    {
      id: 3,
      title: 'Placement Record Achievement',
      excerpt: 'Congratulations to our students for achieving 95% placement rate with top companies visiting campus.',
      date: '2025-01-25',
      category: 'Achievement',
      image: '🎉',
      urgent: false
    },
    {
      id: 4,
      title: 'Admission Process 2025-26 Started',
      excerpt: 'Online applications are now open for all undergraduate and postgraduate programs.',
      date: '2025-01-20',
      category: 'Admissions',
      image: '📝',
      urgent: true
    }
  ];

  const announcements = [
    {
      text: 'Semester exam results for Fall 2024 are now available',
      urgent: true
    },
    {
      text: 'Library will remain open 24/7 during exam period',
      urgent: false
    },
    {
      text: 'New scholarship applications deadline: February 28, 2025',
      urgent: true
    }
  ];

  return (
    <section id="news" className="py-20 bg-university-light-gray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-university-navy mb-4">News & Updates</h2>
          <p className="text-xl text-university-gray max-w-3xl mx-auto">
            Stay informed with the latest happenings, achievements, and announcements from our university.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* News Articles */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-semibold text-university-navy mb-6">Latest News</h3>
            <div className="space-y-6">
              {newsItems.map((item) => (
                <Card key={item.id} className="p-6 hover:shadow-medium transition-all duration-300 hover:-translate-y-1 border-0">
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl">{item.image}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge 
                          variant={item.category === 'Admissions' ? 'default' : 'secondary'}
                          className={item.category === 'Admissions' ? 'bg-university-gold text-university-navy' : ''}
                        >
                          {item.category}
                        </Badge>
                        {item.urgent && (
                          <Badge variant="destructive" className="animate-pulse">
                            Urgent
                          </Badge>
                        )}
                      </div>
                      <h4 className="text-xl font-semibold text-university-navy mb-2">{item.title}</h4>
                      <p className="text-university-gray mb-4">{item.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-university-gray">
                          <Calendar className="w-4 h-4 mr-2" />
                          {new Date(item.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </div>
                        <Button variant="ghost" size="sm" className="text-university-blue hover:text-university-navy">
                          Read More
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Button variant="outline" className="border-university-blue text-university-blue hover:bg-university-blue hover:text-white">
                View All News
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Announcements */}
            <Card className="p-6 border-0">
              <h3 className="text-xl font-semibold text-university-navy mb-4">Quick Announcements</h3>
              <div className="space-y-4">
                {announcements.map((announcement, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${announcement.urgent ? 'bg-destructive animate-pulse' : 'bg-university-gold'}`}></div>
                    <p className="text-sm text-university-gray">{announcement.text}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Important Dates */}
            <Card className="p-6 border-0">
              <h3 className="text-xl font-semibold text-university-navy mb-4">Important Dates</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-university-blue" />
                  <div>
                    <p className="font-medium text-university-navy">Exam Registration</p>
                    <p className="text-sm text-university-gray">Ends Feb 28, 2025</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-university-blue" />
                  <div>
                    <p className="font-medium text-university-navy">Spring Semester</p>
                    <p className="text-sm text-university-gray">Starts Mar 15, 2025</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-university-blue" />
                  <div>
                    <p className="font-medium text-university-navy">Annual Day</p>
                    <p className="text-sm text-university-gray">Apr 10, 2025</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Links */}
            <Card className="p-6 border-0 bg-university-light-blue">
              <h3 className="text-xl font-semibold text-university-navy mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start p-2 h-auto text-university-blue hover:text-university-navy">
                  Academic Calendar
                </Button>
                <Button variant="ghost" className="w-full justify-start p-2 h-auto text-university-blue hover:text-university-navy">
                  Exam Schedule
                </Button>
                <Button variant="ghost" className="w-full justify-start p-2 h-auto text-university-blue hover:text-university-navy">
                  Fee Payment
                </Button>
                <Button variant="ghost" className="w-full justify-start p-2 h-auto text-university-blue hover:text-university-navy">
                  Library Resources
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;