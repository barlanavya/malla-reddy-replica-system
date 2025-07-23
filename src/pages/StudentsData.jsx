import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, Users, GraduationCap, DollarSign, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";

const StudentsData = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Add mock data if no students in database
      const mockStudents = [
        {
          id: 'mock1',
          roll_number: 'MRU123456',
          name: 'John Doe',
          email: 'john.doe@student.mallareddyuniversity.ac.in',
          course: 'B.Tech Computer Science',
          year: 2,
          semester: 4,
          total_fees: 150000,
          paid_amount: 75000,
          fees_paid: false,
          phone: '+91 9876543210',
          address: 'Hyderabad, Telangana'
        },
        {
          id: 'mock2',
          roll_number: 'MRU789012',
          name: 'Jane Smith',
          email: 'jane.smith@student.mallareddyuniversity.ac.in',
          course: 'B.Tech Electronics & Communication',
          year: 3,
          semester: 6,
          total_fees: 150000,
          paid_amount: 150000,
          fees_paid: true,
          phone: '+91 9876543211',
          address: 'Secunderabad, Telangana'
        }
      ];

      const allStudents = [...(data || []), ...mockStudents];
      setStudents(allStudents);
      setFilteredStudents(allStudents);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = students;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.roll_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Course filter
    if (courseFilter !== "all") {
      filtered = filtered.filter(student => student.course === courseFilter);
    }

    // Year filter
    if (yearFilter !== "all") {
      filtered = filtered.filter(student => student.year.toString() === yearFilter);
    }

    setFilteredStudents(filtered);
  }, [students, searchTerm, courseFilter, yearFilter]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading students data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="font-medium">Back to Dashboard</span>
            </Link>
            <div className="flex items-center space-x-3">
              <img 
                src="/placeholder.svg" 
                alt="MRU Logo" 
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h2 className="font-bold text-gray-900">Students Data</h2>
                <p className="text-sm text-gray-600">Malla Reddy University</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Students</p>
                  <p className="text-2xl font-bold text-gray-900">{students.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <GraduationCap className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Students</p>
                  <p className="text-2xl font-bold text-gray-900">{students.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="w-8 h-8 text-emerald-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Fees Paid</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {students.filter(s => s.fees_paid).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <XCircle className="w-8 h-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Fees Pending</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {students.filter(s => !s.fees_paid).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="w-5 h-5 mr-2" />
              Search & Filter Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Input
                  placeholder="Search by name, roll number, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <Select value={courseFilter} onValueChange={setCourseFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Courses</SelectItem>
                    <SelectItem value="B.Tech Computer Science">B.Tech Computer Science</SelectItem>
                    <SelectItem value="B.Tech Electronics & Communication">B.Tech ECE</SelectItem>
                    <SelectItem value="B.Tech Mechanical">B.Tech Mechanical</SelectItem>
                    <SelectItem value="B.Tech Civil">B.Tech Civil</SelectItem>
                    <SelectItem value="MBA">MBA</SelectItem>
                    <SelectItem value="MCA">MCA</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={yearFilter} onValueChange={setYearFilter}>
                  <SelectTrigger>
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
          </CardContent>
        </Card>

        {/* Students Grid */}
        {filteredStudents.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Students Found</h3>
              <p className="text-gray-600">
                {searchTerm || courseFilter !== "all" || yearFilter !== "all"
                  ? "Try adjusting your search filters"
                  : "No students have registered yet"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map((student) => (
              <Card key={student.id || student.roll_number} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{student.name}</CardTitle>
                      <CardDescription>{student.roll_number}</CardDescription>
                    </div>
                    <Badge variant={student.fees_paid ? "default" : "destructive"}>
                      {student.fees_paid ? "Paid" : "Pending"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Course</p>
                    <p className="text-sm text-gray-900">{student.course}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Year</p>
                      <p className="text-sm text-gray-900">{student.year}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Semester</p>
                      <p className="text-sm text-gray-900">{student.semester}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-600">Email</p>
                    <p className="text-sm text-gray-900 break-all">{student.email}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-600">Phone</p>
                    <p className="text-sm text-gray-900">{student.phone || 'Not provided'}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-600">Fee Status</p>
                    <div className="flex items-center justify-between text-sm">
                      <span>₹{student.paid_amount?.toLocaleString()} / ₹{student.total_fees?.toLocaleString()}</span>
                      {student.fees_paid ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentsData;