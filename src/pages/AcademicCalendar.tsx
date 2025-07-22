
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar as CalendarIcon, GraduationCap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';

const AcademicCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const events = [
    { date: '2025-02-15', title: 'Mid-semester Examinations Begin', type: 'exam' },
    { date: '2025-02-20', title: 'Assignment Submission Deadline', type: 'deadline' },
    { date: '2025-03-05', title: 'Tech Fest 2025', type: 'event' },
    { date: '2025-03-15', title: 'Semester Break Begins', type: 'break' },
    { date: '2025-04-01', title: 'New Semester Registration', type: 'registration' },
    { date: '2025-04-15', title: 'Final Examinations Begin', type: 'exam' },
    { date: '2025-05-01', title: 'Summer Internship Program', type: 'program' },
  ];

  const getEventType = (type: string) => {
    switch (type) {
      case 'exam': return 'bg-red-500';
      case 'deadline': return 'bg-orange-500';
      case 'event': return 'bg-blue-500';
      case 'break': return 'bg-green-500';
      case 'registration': return 'bg-purple-500';
      case 'program': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-university-light-gray">
      {/* Header */}
      <header className="bg-white border-b border-university-light-blue/20 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center text-university-blue hover:text-university-navy transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-university-navy">Academic Calendar</h1>
                <p className="text-xs text-university-gray">2024-25 Academic Year</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calendar */}
          <Card className="p-6 border-0 shadow-medium">
            <div className="flex items-center mb-6">
              <CalendarIcon className="w-6 h-6 text-university-blue mr-3" />
              <h2 className="text-2xl font-bold text-university-navy">Calendar View</h2>
            </div>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border border-university-light-blue/50"
            />
          </Card>

          {/* Events List */}
          <Card className="p-6 border-0 shadow-medium">
            <h2 className="text-2xl font-bold text-university-navy mb-6">Upcoming Events</h2>
            <div className="space-y-4">
              {events.map((event, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-university-light-gray rounded-lg">
                  <div className="text-center min-w-16">
                    <div className="text-sm text-university-gray">
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                    </div>
                    <div className="text-xl font-bold text-university-navy">
                      {new Date(event.date).getDate()}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-university-navy">{event.title}</h3>
                    <div className="flex items-center mt-2">
                      <Badge className={`${getEventType(event.type)} text-white text-xs`}>
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Academic Year Overview */}
        <Card className="p-6 border-0 shadow-medium mt-8">
          <h2 className="text-2xl font-bold text-university-navy mb-6">Academic Year 2024-25 Overview</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-university-light-blue rounded-lg">
              <div className="text-2xl font-bold text-university-navy mb-2">Aug 2024</div>
              <div className="text-sm text-university-gray">Semester 1 Begins</div>
            </div>
            <div className="text-center p-4 bg-university-light-blue rounded-lg">
              <div className="text-2xl font-bold text-university-navy mb-2">Dec 2024</div>
              <div className="text-sm text-university-gray">Winter Break</div>
            </div>
            <div className="text-center p-4 bg-university-light-blue rounded-lg">
              <div className="text-2xl font-bold text-university-navy mb-2">Jan 2025</div>
              <div className="text-sm text-university-gray">Semester 2 Begins</div>
            </div>
            <div className="text-center p-4 bg-university-light-blue rounded-lg">
              <div className="text-2xl font-bold text-university-navy mb-2">May 2025</div>
              <div className="text-sm text-university-gray">Summer Vacation</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AcademicCalendar;
