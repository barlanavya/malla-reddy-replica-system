
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Search, Filter, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Student {
  id: string;
  rollNumber: string;
  name: string;
  email: string;
  course: string;
  year: number;
  semester: number;
  feesPaid: boolean;
  totalFees: number;
  paidAmount: number;
}

const StudentsData = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');

  useEffect(() => {
    // Get registered students from localStorage
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const mockUsers = [
      {
        id: '1',
        rollNumber: 'MRU2024001',
        name: 'John Doe',
        email: 'john.doe@student.mallareddy.edu.in',
        course: 'Computer Science Engineering',
        year: 2,
        semester: 3,
        feesPaid: false,
        totalFees: 85000,
        paidAmount: 25000
      },
      {
        id: '2',
        rollNumber: 'MRU2024002',
        name: 'Jane Smith',
        email: 'jane.smith@student.mallareddy.edu.in',
        course: 'Electronics and Communication',
        year: 1,
        semester: 2,
        feesPaid: true,
        totalFees: 80000,
        paidAmount: 80000
      }
    ];
    
    const allStudents = [...mockUsers, ...registeredUsers];
    setStudents(allStudents);
    setFilteredStudents(allStudents);
  }, []);

  useEffect(() => {
    let filtered = students;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Course filter
    if (courseFilter !== 'all') {
      filtered = filtered.filter(student => student.course === courseFilter);
    }

    // Year filter
    if (yearFilter !== 'all') {
      filtered = filtered.filter(student => student.year.toString() === yearFilter);
    }

    setFilteredStudents(filtered);
  }, [students, searchTerm, courseFilter, yearFilter]);

  const courses = [...new Set(students.map(student => student.course))];

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
                <Users className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-university-navy">Students Database</h1>
                <p className="text-xs text-university-gray">Registered Students</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="p-6 border-0 shadow-medium mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-university-blue" />
              <h2 className="text-xl font-semibold text-university-navy">
                Total Students: {filteredStudents.length}
              </h2>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-university-gray" />
                <Input
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 min-w-64"
                />
              </div>
              
              <Select value={courseFilter} onValueChange={setCourseFilter}>
                <SelectTrigger className="min-w-48">
                  <SelectValue placeholder="Filter by course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  {courses.map((course) => (
                    <SelectItem key={course} value={course}>{course}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={yearFilter} onValueChange={setYearFilter}>
                <SelectTrigger className="min-w-32">
                  <SelectValue placeholder="Filter by year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  <SelectItem value="1">1st Year</SelectItem>
                  <SelectItem value="2">2nd Year</SelectItem>
                  <SelectItem value="3">3rd Year</SelectItem>
                  <SelectItem value="4">4th Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Students Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <Card key={student.id} className="p-6 border-0 shadow-medium hover:shadow-strong transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-university-light-blue rounded-full flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-university-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-university-navy">{student.name}</h3>
                    <p className="text-sm text-university-gray">{student.rollNumber}</p>
                  </div>
                </div>
                <Badge 
                  variant={student.feesPaid ? "default" : "destructive"}
                  className={student.feesPaid ? "bg-green-500" : "bg-red-500"}
                >
                  {student.feesPaid ? "Paid" : "Pending"}
                </Badge>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-university-gray">Course:</span>
                  <span className="font-medium text-university-navy">{student.course}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-university-gray">Year/Semester:</span>
                  <span className="font-medium text-university-navy">
                    Year {student.year}, Sem {student.semester}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-university-gray">Email:</span>
                  <span className="font-medium text-university-navy text-xs">{student.email}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-university-gray">Fee Status:</span>
                  <span className="font-medium text-university-navy">
                    ₹{student.paidAmount.toLocaleString()} / ₹{student.totalFees.toLocaleString()}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <Card className="p-12 border-0 shadow-medium text-center">
            <Users className="w-12 h-12 text-university-gray mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-university-navy mb-2">No Students Found</h3>
            <p className="text-university-gray">No students match your current search criteria.</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default StudentsData;
