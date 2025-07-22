import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  GraduationCap, 
  BookOpen, 
  CreditCard, 
  Calendar, 
  FileText, 
  LogOut, 
  Settings,
  DollarSign,
  Download,
  Bell,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  const handleFeePayment = () => {
    setIsPaymentLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsPaymentLoading(false);
      navigate('/fee-payment');
    }, 1000);
  };

  const feeProgressPercentage = (user.paidAmount / user.totalFees) * 100;
  const remainingAmount = user.totalFees - user.paidAmount;

  const quickActions = [
    { 
      icon: CreditCard, 
      title: 'Pay Fees', 
      description: 'Make fee payments online',
      action: handleFeePayment,
      color: 'bg-university-gold',
      urgent: !user.feesPaid
    },
    { 
      icon: FileText, 
      title: 'View Transcripts', 
      description: 'Download academic records',
      action: () => navigate('/transcripts'),
      color: 'bg-university-blue'
    },
    { 
      icon: Calendar, 
      title: 'Academic Calendar', 
      description: 'Check important dates',
      action: () => navigate('/academic-calendar'),
      color: 'bg-green-500'
    },
    { 
      icon: BookOpen, 
      title: 'Course Materials', 
      description: 'Access study resources',
      action: () => navigate('/courses'),
      color: 'bg-purple-500'
    }
  ];

  const recentActivities = [
    { date: '2025-01-20', activity: 'Fee payment received', amount: '₹25,000' },
    { date: '2025-01-15', activity: 'Semester exam registration', amount: null },
    { date: '2025-01-10', activity: 'Library book borrowed', amount: null },
    { date: '2025-01-05', activity: 'Course material downloaded', amount: null }
  ];

  return (
    <div className="min-h-screen bg-university-light-gray">
      {/* Header */}
      <header className="bg-white border-b border-university-light-blue/20 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-university-navy">Malla Reddy University</h1>
                <p className="text-xs text-university-gray">Student Portal</p>
              </div>
            </Link>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-university-navy mb-2">
            Welcome back, {user.name}!
          </h2>
          <p className="text-university-gray">
            Roll Number: {user.rollNumber} | {user.course} - Year {user.year}, Semester {user.semester}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Fee Status Card */}
            <Card className="p-6 border-0 shadow-medium">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-university-navy">Fee Status</h3>
                <Badge 
                  variant={user.feesPaid ? "default" : "destructive"}
                  className={user.feesPaid ? "bg-green-500" : "bg-red-500"}
                >
                  {user.feesPaid ? "Paid" : "Pending"}
                </Badge>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-university-gray">Total Fees:</span>
                  <span className="font-semibold text-university-navy">₹{user.totalFees.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-university-gray">Paid Amount:</span>
                  <span className="font-semibold text-green-600">₹{user.paidAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-university-gray">Remaining:</span>
                  <span className="font-semibold text-red-600">₹{remainingAmount.toLocaleString()}</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Payment Progress</span>
                    <span>{feeProgressPercentage.toFixed(1)}%</span>
                  </div>
                  <Progress value={feeProgressPercentage} className="h-2" />
                </div>

                {!user.feesPaid && (
                  <Button 
                    onClick={handleFeePayment}
                    disabled={isPaymentLoading}
                    className="w-full mt-4 bg-university-gold hover:bg-university-light-gold text-university-navy font-semibold"
                  >
                    {isPaymentLoading ? (
                      <div className="flex items-center">
                        <div className="w-4 h-4 border-2 border-university-navy/30 border-t-university-navy rounded-full animate-spin mr-2"></div>
                        Processing...
                      </div>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4 mr-2" />
                        Pay Remaining Fees
                      </>
                    )}
                  </Button>
                )}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6 border-0 shadow-medium">
              <h3 className="text-xl font-semibold text-university-navy mb-6">Quick Actions</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <div
                    key={index}
                    onClick={action.action}
                    className="flex items-center p-4 bg-university-light-gray rounded-lg hover:shadow-medium transition-all duration-300 cursor-pointer hover:-translate-y-1"
                  >
                    <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mr-4`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-university-navy flex items-center">
                        {action.title}
                        {action.urgent && (
                          <Badge variant="destructive" className="ml-2 text-xs animate-pulse">
                            URGENT
                          </Badge>
                        )}
                      </h4>
                      <p className="text-sm text-university-gray">{action.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Academic Performance */}
            <Card className="p-6 border-0 shadow-medium">
              <h3 className="text-xl font-semibold text-university-navy mb-6">Academic Overview</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-university-light-blue rounded-lg">
                  <TrendingUp className="w-8 h-8 text-university-blue mx-auto mb-2" />
                  <div className="text-2xl font-bold text-university-navy">8.5</div>
                  <div className="text-sm text-university-gray">Current CGPA</div>
                </div>
                <div className="text-center p-4 bg-university-light-blue rounded-lg">
                  <BookOpen className="w-8 h-8 text-university-blue mx-auto mb-2" />
                  <div className="text-2xl font-bold text-university-navy">6</div>
                  <div className="text-sm text-university-gray">Subjects This Sem</div>
                </div>
                <div className="text-center p-4 bg-university-light-blue rounded-lg">
                  <Calendar className="w-8 h-8 text-university-blue mx-auto mb-2" />
                  <div className="text-2xl font-bold text-university-navy">85%</div>
                  <div className="text-sm text-university-gray">Attendance</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card className="p-6 border-0 shadow-medium">
              <div className="text-center">
                <div className="w-20 h-20 bg-university-light-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-university-blue" />
                </div>
                <h3 className="font-semibold text-university-navy">{user.name}</h3>
                <p className="text-sm text-university-gray mb-4">{user.email}</p>
                <Button variant="outline" size="sm" className="w-full">
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </Card>

            {/* Recent Activities */}
            <Card className="p-6 border-0 shadow-medium">
              <h3 className="text-lg font-semibold text-university-navy mb-4">Recent Activities</h3>
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 text-sm">
                    <div className="w-2 h-2 bg-university-gold rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-university-navy">{activity.activity}</p>
                      <div className="flex justify-between">
                        <span className="text-university-gray">{activity.date}</span>
                        {activity.amount && (
                          <span className="text-green-600 font-medium">{activity.amount}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Upcoming Events */}
            <Card className="p-6 border-0 shadow-medium">
              <h3 className="text-lg font-semibold text-university-navy mb-4">Upcoming Events</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-university-navy">Mid-semester Exam</span>
                  <span className="text-university-gray">Feb 15</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-university-navy">Assignment Submission</span>
                  <span className="text-university-gray">Feb 20</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-university-navy">Tech Fest 2025</span>
                  <span className="text-university-gray">Mar 5</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;