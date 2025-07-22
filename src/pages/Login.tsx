import { useState } from 'react';
import { Eye, EyeOff, User, Lock, GraduationCap, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    rollNumber: '',
    password: ''
  });
  const { login, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.rollNumber || !formData.password) {
      toast({
        title: "Validation Error",
        description: "Please enter both roll number and password.",
        variant: "destructive",
      });
      return;
    }

    try {
      const success = await login(formData.rollNumber, formData.password);
      
      if (success) {
        toast({
          title: "Login Successful!",
          description: "Welcome to your student portal.",
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
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-university-light-blue to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <Link 
          to="/" 
          className="inline-flex items-center text-university-blue hover:text-university-navy mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <Card className="p-8 shadow-strong border-0 bg-white/95 backdrop-blur-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-university-navy mb-2">Student Portal</h1>
            <p className="text-university-gray">Sign in to access your academic information</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-university-navy mb-2">
                Roll Number / Student ID
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-university-gray" />
                <Input
                  type="text"
                  name="rollNumber"
                  value={formData.rollNumber}
                  onChange={handleInputChange}
                  placeholder="Enter your roll number"
                  className="pl-10 border-university-light-blue/50 focus:border-university-blue"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-university-navy mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-university-gray" />
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="pl-10 pr-10 border-university-light-blue/50 focus:border-university-blue"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-university-gray hover:text-university-blue"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 text-university-blue border-university-light-blue rounded focus:ring-university-blue"
                />
                <span className="ml-2 text-sm text-university-gray">Remember me</span>
              </label>
              <a 
                href="#" 
                className="text-sm text-university-blue hover:text-university-navy transition-colors"
              >
                Forgot password?
              </a>
            </div>

            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-gradient-primary hover:shadow-medium transition-all duration-300"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          {/* Additional Options */}
          <div className="mt-8 pt-6 border-t border-university-light-blue/20">
            <div className="text-center space-y-4">
              <p className="text-sm text-university-gray">
                Don't have access to the student portal?
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 border-university-blue text-university-blue hover:bg-university-blue hover:text-white"
                >
                  Contact IT Support
                </Button>
                <Link to="/register">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 border-university-blue text-university-blue hover:bg-university-blue hover:text-white w-full"
                  >
                    New Student Registration
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-6 p-4 bg-university-light-gray rounded-lg">
            <h3 className="text-sm font-medium text-university-navy mb-3">Quick Access</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a href="#" className="text-university-blue hover:text-university-navy transition-colors">
                📚 Library Portal
              </a>
              <a href="#" className="text-university-blue hover:text-university-navy transition-colors">
                💳 Fee Payment
              </a>
              <a href="#" className="text-university-blue hover:text-university-navy transition-colors">
                📅 Academic Calendar
              </a>
              <a href="#" className="text-university-blue hover:text-university-navy transition-colors">
                📞 Help & Support
              </a>
            </div>
          </div>
        </Card>

        {/* Footer Note */}
        <p className="text-center text-sm text-university-gray mt-6">
          Having trouble? Contact the IT Help Desk at{' '}
          <a href="tel:+914012345678" className="text-university-blue hover:text-university-navy">
            +91 40 1234 5678
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;