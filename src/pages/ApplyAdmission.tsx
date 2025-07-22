
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, GraduationCap, Upload, User, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const ApplyAdmission = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    guardianName: '',
    guardianPhone: '',
    course: '',
    previousSchool: '',
    percentage: '',
    yearOfPassing: '',
    category: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const courses = [
    'Computer Science Engineering',
    'Electronics and Communication Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electrical Engineering',
    'Information Technology',
    'Business Administration (MBA)',
    'Master of Computer Applications (MCA)',
    'Bachelor of Commerce',
    'Bachelor of Science',
    'Pharmacy',
    'Biotechnology'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.email || !formData.phone || !formData.course) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      // Save application to localStorage
      const applications = JSON.parse(localStorage.getItem('admissionApplications') || '[]');
      const newApplication = {
        id: Date.now().toString(),
        ...formData,
        status: 'Under Review',
        submittedDate: new Date().toISOString()
      };
      applications.push(newApplication);
      localStorage.setItem('admissionApplications', JSON.stringify(applications));

      setIsSubmitting(false);
      toast({
        title: "Application Submitted Successfully!",
        description: `Your application ID is ${newApplication.id}. You will receive an email confirmation shortly.`,
      });
      
      setTimeout(() => navigate('/'), 2000);
    }, 2000);
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
                <h1 className="text-lg font-bold text-university-navy">Apply for Admission</h1>
                <p className="text-xs text-university-gray">Academic Year 2025-26</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="p-8 border-0 shadow-strong bg-white/95 backdrop-blur-sm">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-university-navy mb-2">Admission Application Form</h1>
            <p className="text-university-gray">Please fill in all the required information to apply for admission</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-university-navy border-b border-university-light-blue pb-2">
                Personal Information
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-university-navy mb-2">
                    First Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-university-gray" />
                    <Input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter your first name"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-university-navy mb-2">
                    Last Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-university-gray" />
                    <Input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter your last name"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-university-navy mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-university-gray" />
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@gmail.com"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-university-navy mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-university-gray" />
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 9876543210"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-university-navy mb-2">
                    Date of Birth *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-university-gray" />
                    <Input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-university-navy mb-2">
                    Gender *
                  </label>
                  <Select onValueChange={(value) => handleSelectChange('gender', value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-university-navy mb-2">
                    Category
                  </label>
                  <Select onValueChange={(value) => handleSelectChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="obc">OBC</SelectItem>
                      <SelectItem value="sc">SC</SelectItem>
                      <SelectItem value="st">ST</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-university-navy border-b border-university-light-blue pb-2">
                Address Information
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-university-navy mb-2">
                  Full Address *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-university-gray" />
                  <Input
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your complete address"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-university-navy mb-2">
                    City *
                  </label>
                  <Input
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-university-navy mb-2">
                    State *
                  </label>
                  <Input
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="State"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-university-navy mb-2">
                    PIN Code *
                  </label>
                  <Input
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="PIN Code"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Guardian Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-university-navy border-b border-university-light-blue pb-2">
                Guardian Information
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-university-navy mb-2">
                    Guardian Name *
                  </label>
                  <Input
                    name="guardianName"
                    value={formData.guardianName}
                    onChange={handleInputChange}
                    placeholder="Father/Mother/Guardian name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-university-navy mb-2">
                    Guardian Phone *
                  </label>
                  <Input
                    type="tel"
                    name="guardianPhone"
                    value={formData.guardianPhone}
                    onChange={handleInputChange}
                    placeholder="Guardian's phone number"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-university-navy border-b border-university-light-blue pb-2">
                Academic Information
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-university-navy mb-2">
                  Course Applied For *
                </label>
                <Select onValueChange={(value) => handleSelectChange('course', value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course} value={course}>
                        {course}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-university-navy mb-2">
                    Previous School/College *
                  </label>
                  <Input
                    name="previousSchool"
                    value={formData.previousSchool}
                    onChange={handleInputChange}
                    placeholder="School/College name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-university-navy mb-2">
                    Percentage/CGPA *
                  </label>
                  <Input
                    name="percentage"
                    value={formData.percentage}
                    onChange={handleInputChange}
                    placeholder="85% or 8.5 CGPA"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-university-navy mb-2">
                    Year of Passing *
                  </label>
                  <Input
                    name="yearOfPassing"
                    value={formData.yearOfPassing}
                    onChange={handleInputChange}
                    placeholder="2024"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Document Upload */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-university-navy border-b border-university-light-blue pb-2">
                Document Upload
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border-2 border-dashed border-university-light-blue rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-university-blue mx-auto mb-2" />
                  <p className="text-sm text-university-gray mb-2">Upload Photo</p>
                  <Button type="button" variant="outline" size="sm">Choose File</Button>
                </div>
                <div className="border-2 border-dashed border-university-light-blue rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-university-blue mx-auto mb-2" />
                  <p className="text-sm text-university-gray mb-2">Upload Mark Sheet</p>
                  <Button type="button" variant="outline" size="sm">Choose File</Button>
                </div>
              </div>
            </div>

            {/* Terms and Submit */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="terms"
                  className="w-4 h-4 text-university-blue border-university-light-blue rounded focus:ring-university-blue"
                  required
                />
                <label htmlFor="terms" className="text-sm text-university-gray">
                  I agree to the{' '}
                  <a href="#" className="text-university-blue hover:text-university-navy underline">
                    Terms & Conditions
                  </a>{' '}
                  and confirm that all information provided is accurate.
                </label>
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gradient-primary hover:shadow-medium transition-all duration-300 py-4 text-lg"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                    Submitting Application...
                  </div>
                ) : (
                  'Submit Application'
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ApplyAdmission;
