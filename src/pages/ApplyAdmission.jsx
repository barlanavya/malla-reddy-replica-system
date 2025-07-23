import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, FileText, GraduationCap, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

const ApplyAdmission = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    category: "",
    nationality: "",
    
    // Address Information
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    
    // Academic Information
    course: "",
    previousEducation: "",
    percentage: "",
    yearOfPassing: "",
    boardUniversity: "",
    
    // Additional Information
    fatherName: "",
    motherName: "",
    occupation: "",
    annualIncome: "",
    emergencyContact: "",
    
    // Documents
    photo: null,
    tenthCertificate: null,
    twelfthCertificate: null,
    transferCertificate: null
  });

  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const nextStep = () => {
    setStep(prev => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create application record
      const applicationData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        date_of_birth: formData.dateOfBirth,
        gender: formData.gender,
        category: formData.category,
        nationality: formData.nationality,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        country: formData.country,
        course: formData.course,
        previous_education: formData.previousEducation,
        percentage: parseFloat(formData.percentage),
        year_of_passing: parseInt(formData.yearOfPassing),
        board_university: formData.boardUniversity,
        father_name: formData.fatherName,
        mother_name: formData.motherName,
        occupation: formData.occupation,
        annual_income: parseFloat(formData.annualIncome),
        emergency_contact: formData.emergencyContact,
        application_status: 'submitted',
        application_number: `APP${Date.now().toString().slice(-8)}`,
        created_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('admissions')
        .insert([applicationData]);

      if (error) throw error;

      toast({
        title: "Application Submitted Successfully!",
        description: "Your admission application has been received. You will receive a confirmation email shortly.",
      });

      setStep(5); // Success step
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label>Gender *</Label>
                <Select onValueChange={(value) => handleSelectChange("gender", value)}>
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
                <Label>Category *</Label>
                <Select onValueChange={(value) => handleSelectChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="obc">OBC</SelectItem>
                    <SelectItem value="sc">SC</SelectItem>
                    <SelectItem value="st">ST</SelectItem>
                    <SelectItem value="ews">EWS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Address Information</h3>
            <div>
              <Label htmlFor="address">Full Address *</Label>
              <Textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows={3}
                required
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="pincode">PIN Code *</Label>
                <Input
                  id="pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="country">Country *</Label>
                <Input
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Academic & Family Information</h3>
            
            <div>
              <Label>Course Applied For *</Label>
              <Select onValueChange={(value) => handleSelectChange("course", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="btech-cse">B.Tech Computer Science & Engineering</SelectItem>
                  <SelectItem value="btech-ece">B.Tech Electronics & Communication</SelectItem>
                  <SelectItem value="btech-mech">B.Tech Mechanical Engineering</SelectItem>
                  <SelectItem value="btech-civil">B.Tech Civil Engineering</SelectItem>
                  <SelectItem value="btech-eee">B.Tech Electrical & Electronics</SelectItem>
                  <SelectItem value="mba">Master of Business Administration</SelectItem>
                  <SelectItem value="mca">Master of Computer Applications</SelectItem>
                  <SelectItem value="mtech-cse">M.Tech Computer Science</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="previousEducation">Previous Education *</Label>
                <Input
                  id="previousEducation"
                  name="previousEducation"
                  placeholder="e.g., 12th Standard, Diploma"
                  value={formData.previousEducation}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="percentage">Percentage/CGPA *</Label>
                <Input
                  id="percentage"
                  name="percentage"
                  type="number"
                  step="0.01"
                  value={formData.percentage}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="yearOfPassing">Year of Passing *</Label>
                <Input
                  id="yearOfPassing"
                  name="yearOfPassing"
                  type="number"
                  value={formData.yearOfPassing}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="boardUniversity">Board/University *</Label>
                <Input
                  id="boardUniversity"
                  name="boardUniversity"
                  value={formData.boardUniversity}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fatherName">Father's Name *</Label>
                <Input
                  id="fatherName"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="motherName">Mother's Name *</Label>
                <Input
                  id="motherName"
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="occupation">Parent's Occupation</Label>
                <Input
                  id="occupation"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="annualIncome">Annual Income</Label>
                <Input
                  id="annualIncome"
                  name="annualIncome"
                  type="number"
                  value={formData.annualIncome}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Document Upload</h3>
            <p className="text-sm text-gray-600 mb-4">
              Please upload clear, scanned copies of the following documents (PDF or Image format, max 2MB each):
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="photo">Passport Size Photo</Label>
                <Input
                  id="photo"
                  name="photo"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="tenthCertificate">10th Class Certificate</Label>
                <Input
                  id="tenthCertificate"
                  name="tenthCertificate"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="twelfthCertificate">12th/Diploma Certificate</Label>
                <Input
                  id="twelfthCertificate"
                  name="twelfthCertificate"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="transferCertificate">Transfer Certificate</Label>
                <Input
                  id="transferCertificate"
                  name="transferCertificate"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Declaration</h4>
              <p className="text-sm text-blue-800">
                I hereby declare that all the information provided is true and correct to the best of my knowledge. 
                I understand that any false information may lead to rejection of my application.
              </p>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="text-center space-y-6">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
            <h3 className="text-2xl font-bold text-green-900">Application Submitted Successfully!</h3>
            <div className="bg-green-50 p-6 rounded-lg">
              <p className="text-green-800 mb-4">
                Your admission application has been received and is being processed.
              </p>
              <p className="text-sm text-green-700">
                Application Number: <strong>APP{Date.now().toString().slice(-8)}</strong>
              </p>
              <p className="text-sm text-green-700 mt-2">
                You will receive email updates about your application status.
              </p>
            </div>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => navigate("/")}>Go to Home</Button>
              <Button variant="outline" onClick={() => navigate("/login")}>
                Login to Portal
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
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
                <h2 className="font-bold text-gray-900">Apply for Admission</h2>
                <p className="text-sm text-gray-600">Malla Reddy University</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center">
              <GraduationCap className="w-6 h-6 mr-2" />
              Admission Application Form
            </CardTitle>
            <CardDescription>
              Step {step} of 4 - Complete all sections to submit your application
            </CardDescription>
            
            {/* Progress Bar */}
            {step <= 4 && (
              <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(step / 4) * 100}%` }}
                ></div>
              </div>
            )}
          </CardHeader>
          
          <CardContent>
            <form onSubmit={step === 4 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }}>
              {renderStep()}
              
              {step <= 4 && (
                <div className="flex justify-between mt-8">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={prevStep}
                    disabled={step === 1}
                  >
                    Previous
                  </Button>
                  
                  <Button 
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : step === 4 ? "Submit Application" : "Next"}
                  </Button>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApplyAdmission;