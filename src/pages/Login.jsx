import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, GraduationCap, User, Lock, Phone, Mail, Calendar, BookOpen, CreditCard, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    rollNumber: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.rollNumber || !formData.password) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const success = login(formData.rollNumber, formData.password);
      
      if (success) {
        toast({
          title: "Login Successful",
          description: "Welcome to your student portal!",
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid roll number or password. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login Error",
        description: "An error occurred during login. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
                <h1 className="text-lg font-bold text-university-navy">Student Portal</h1>
                <p className="text-xs text-university-gray">Malla Reddy University</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Login Card */}
          <Card className="p-8 border-0 shadow-elegant">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-university-navy mb-2">Student Login</h2>
              <p className="text-university-gray">Enter your credentials to access your portal</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-university-navy">Roll Number</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-university-gray" />
                  <Input
                    type="text"
                    name="rollNumber"
                    placeholder="Enter your roll number"
                    value={formData.rollNumber}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-university-navy">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-university-gray" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-university-gray hover:text-university-navy"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <label htmlFor="remember" className="text-sm text-university-gray">
                    Remember me
                  </label>
                </div>
                <Link to="/forgot-password" className="text-sm text-university-blue hover:text-university-navy">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-primary hover:opacity-90 text-white font-semibold py-3"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Signing In...
                  </div>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <div className="text-center mt-6">
              <p className="text-university-gray">
                New student? {' '}
                <Link to="/register" className="text-university-blue hover:text-university-navy font-medium">
                  Register here
                </Link>
              </p>
            </div>
          </Card>

          {/* Help & Support */}
          <Card className="p-6 border-0 shadow-medium mt-6">
            <h3 className="text-lg font-semibold text-university-navy mb-4">Need Help?</h3>
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <Phone className="w-4 h-4 text-university-blue mr-3" />
                <span className="text-university-gray">IT Support: +91-40-2374-0456</span>
              </div>
              <div className="flex items-center text-sm">
                <Mail className="w-4 h-4 text-university-blue mr-3" />
                <span className="text-university-gray">support@mallareddyuniversity.ac.in</span>
              </div>
            </div>
          </Card>

          {/* Quick Access */}
          <Card className="p-6 border-0 shadow-medium mt-6">
            <h3 className="text-lg font-semibold text-university-navy mb-4">Quick Access</h3>
            <div className="grid grid-cols-2 gap-3">
              <Link to="/library" className="flex items-center p-3 bg-university-light-blue rounded-lg hover:shadow-md transition-all">
                <BookOpen className="w-5 h-5 text-university-blue mr-2" />
                <span className="text-sm font-medium text-university-navy">Library Portal</span>
              </Link>
              <Link to="/fee-payment" className="flex items-center p-3 bg-university-light-blue rounded-lg hover:shadow-md transition-all">
                <CreditCard className="w-5 h-5 text-university-blue mr-2" />
                <span className="text-sm font-medium text-university-navy">Fee Payment</span>
              </Link>
              <Link to="/academic-calendar" className="flex items-center p-3 bg-university-light-blue rounded-lg hover:shadow-md transition-all">
                <Calendar className="w-5 h-5 text-university-blue mr-2" />
                <span className="text-sm font-medium text-university-navy">Academic Calendar</span>
              </Link>
              <Link to="/help" className="flex items-center p-3 bg-university-light-blue rounded-lg hover:shadow-md transition-all">
                <HelpCircle className="w-5 h-5 text-university-blue mr-2" />
                <span className="text-sm font-medium text-university-navy">Help & Support</span>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;