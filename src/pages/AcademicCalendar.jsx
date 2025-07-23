import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar as CalendarIcon, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";

const AcademicCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const academicEvents = [
    {
      id: 1,
      title: "Semester 1 Begins",
      date: "2024-07-15",
      type: "academic",
      description: "First semester classes commence"
    },
    {
      id: 2,
      title: "Mid-Term Examinations",
      date: "2024-09-15",
      type: "exam",
      description: "Mid-semester examinations for all courses"
    },
    {
      id: 3,
      title: "Festival Holiday - Diwali",
      date: "2024-11-01",
      type: "holiday",
      description: "University closed for Diwali celebrations"
    },
    {
      id: 4,
      title: "End-Term Examinations",
      date: "2024-12-15",
      type: "exam",
      description: "Final examinations for semester 1"
    },
    {
      id: 5,
      title: "Semester Break",
      date: "2024-12-25",
      type: "holiday",
      description: "Winter break begins"
    },
    {
      id: 6,
      title: "Semester 2 Begins",
      date: "2025-01-15",
      type: "academic",
      description: "Second semester classes commence"
    },
    {
      id: 7,
      title: "Annual Sports Day",
      date: "2025-02-14",
      type: "event",
      description: "University annual sports competition"
    },
    {
      id: 8,
      title: "Mid-Term Examinations",
      date: "2025-03-15",
      type: "exam",
      description: "Mid-semester examinations for semester 2"
    },
    {
      id: 9,
      title: "Cultural Fest",
      date: "2025-04-05",
      type: "event",
      description: "Annual cultural festival - Mallar Utsav"
    },
    {
      id: 10,
      title: "End-Term Examinations",
      date: "2025-05-15",
      type: "exam",
      description: "Final examinations for semester 2"
    }
  ];

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'academic':
        return 'bg-blue-100 text-blue-800';
      case 'exam':
        return 'bg-red-100 text-red-800';
      case 'holiday':
        return 'bg-green-100 text-green-800';
      case 'event':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const downloadCalendar = () => {
    // Create a simple text version of the calendar
    const calendarText = academicEvents
      .map(event => `${formatDate(event.date)} - ${event.title}: ${event.description}`)
      .join('\n');
    
    const blob = new Blob([calendarText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'academic-calendar-2024-25.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="font-medium">Back to Home</span>
            </Link>
            <div className="flex items-center space-x-3">
              <img 
                src="/placeholder.svg" 
                alt="MRU Logo" 
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h2 className="font-bold text-gray-900">Academic Calendar</h2>
                <p className="text-sm text-gray-600">2024-25 Academic Year</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <Button 
            onClick={() => setShowCalendar(!showCalendar)}
            className="flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            {showCalendar ? 'Hide Calendar' : 'View Calendar'}
          </Button>
          <Button 
            onClick={downloadCalendar}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download Calendar
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar Widget */}
          {showCalendar && (
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CalendarIcon className="w-5 h-5 mr-2" />
                    Calendar View
                  </CardTitle>
                  <CardDescription>
                    Select a date to view events
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>
            </div>
          )}

          {/* Events List */}
          <div className={showCalendar ? "lg:col-span-2" : "lg:col-span-3"}>
            <Card>
              <CardHeader>
                <CardTitle>Academic Events 2024-25</CardTitle>
                <CardDescription>
                  Important dates and events for the academic year
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {academicEvents.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-shrink-0">
                        <CalendarIcon className="w-5 h-5 text-blue-600 mt-1" />
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">{event.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                            <p className="text-sm text-gray-500 mt-2">{formatDate(event.date)}</p>
                          </div>
                          <Badge className={getEventTypeColor(event.type)}>
                            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Important Notes */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Important Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• All dates are subject to change. Students will be notified of any modifications.</li>
                  <li>• Examination schedules will be published separately before each exam period.</li>
                  <li>• Holiday dates may vary based on government notifications.</li>
                  <li>• Class timings and academic policies are available in the student handbook.</li>
                  <li>• For any queries, contact the academic office at academics@mallareddyuniversity.ac.in</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicCalendar;