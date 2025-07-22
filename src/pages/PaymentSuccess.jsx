import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Download, Share2, GraduationCap, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [countdown, setCountdown] = useState(10);

  const { payment, user } = location.state || {};

  useEffect(() => {
    if (!payment || !user) {
      navigate('/dashboard');
      return;
    }

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          navigate('/dashboard');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [payment, user, navigate]);

  if (!payment || !user) {
    return null;
  }

  const handleDownloadReceipt = () => {
    toast({
      title: "Download Started",
      description: "Your payment receipt is being downloaded.",
    });
  };

  const handleShareReceipt = () => {
    toast({
      title: "Share Receipt",
      description: "Receipt sharing options will be available soon.",
    });
  };

  return (
    <div className="min-h-screen bg-university-light-gray">
      {/* Header */}
      <header className="bg-white border-b border-university-light-blue/20 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center text-university-blue hover:text-university-navy transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-university-navy">Payment Confirmation</h1>
                <p className="text-xs text-university-gray">Transaction Successful</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          <Card className="p-8 border-0 shadow-elegant text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-university-navy mb-4">Payment Successful!</h2>
            <p className="text-university-gray mb-6">
              Your payment has been processed successfully. You will receive a confirmation email shortly.
            </p>
            <Badge className="bg-green-500 text-white text-lg px-4 py-2">
              ₹{payment.amount.toLocaleString()} Paid
            </Badge>
          </Card>

          {/* Payment Details */}
          <Card className="p-6 border-0 shadow-medium mb-8">
            <h3 className="text-xl font-semibold text-university-navy mb-6">Payment Details</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-university-gray">Transaction ID</span>
                  <p className="font-mono font-medium text-university-navy">{payment.transactionId}</p>
                </div>
                <div>
                  <span className="text-sm text-university-gray">Payment Date</span>
                  <p className="font-medium text-university-navy">
                    {new Date(payment.date).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-university-gray">Payment Method</span>
                  <p className="font-medium text-university-navy capitalize">{payment.method}</p>
                </div>
                <div>
                  <span className="text-sm text-university-gray">Status</span>
                  <Badge className="bg-green-500 ml-2">{payment.status}</Badge>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-semibold text-university-navy mb-3">Student Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-university-gray">Student Name</span>
                    <p className="font-medium text-university-navy">{user.name}</p>
                  </div>
                  <div>
                    <span className="text-sm text-university-gray">Roll Number</span>
                    <p className="font-medium text-university-navy">{user.rollNumber}</p>
                  </div>
                  <div>
                    <span className="text-sm text-university-gray">Course</span>
                    <p className="font-medium text-university-navy">{user.course}</p>
                  </div>
                  <div>
                    <span className="text-sm text-university-gray">Academic Year</span>
                    <p className="font-medium text-university-navy">Year {user.year}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <Card className="p-6 border-0 shadow-medium mb-8">
            <h3 className="text-lg font-semibold text-university-navy mb-4">Receipt Options</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleDownloadReceipt}
                className="flex-1 bg-university-blue hover:bg-university-navy"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Receipt
              </Button>
              <Button 
                variant="outline" 
                onClick={handleShareReceipt}
                className="flex-1"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share Receipt
              </Button>
            </div>
          </Card>

          {/* Auto Redirect Notice */}
          <Card className="p-4 border-0 shadow-medium text-center bg-university-light-blue">
            <p className="text-sm text-university-gray">
              You will be automatically redirected to your dashboard in{' '}
              <span className="font-semibold text-university-navy">{countdown}</span> seconds.
            </p>
            <Link to="/dashboard">
              <Button variant="link" className="text-university-blue">
                Go to Dashboard Now
              </Button>
            </Link>
          </Card>

          {/* Important Notice */}
          <Card className="p-6 border-0 shadow-medium mt-8">
            <h3 className="text-lg font-semibold text-university-navy mb-4">Important Information</h3>
            <div className="space-y-3 text-sm text-university-gray">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-university-blue rounded-full mt-2"></div>
                <span>Keep this transaction ID for your records and future reference.</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-university-blue rounded-full mt-2"></div>
                <span>A confirmation email has been sent to your registered email address.</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-university-blue rounded-full mt-2"></div>
                <span>If you face any issues, contact the accounts office with this transaction ID.</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-university-blue rounded-full mt-2"></div>
                <span>Your payment will be reflected in your fee status within 24 hours.</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;