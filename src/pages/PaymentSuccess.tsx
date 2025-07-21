import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Download, ArrowLeft, CreditCard, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const PaymentSuccess = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentAmount, setPaymentAmount] = useState(0);

  useEffect(() => {
    // Get payment amount from location state
    if (location.state?.amount) {
      setPaymentAmount(location.state.amount);
    } else {
      // If no state, redirect to dashboard
      navigate('/dashboard');
    }
  }, [location.state, navigate]);

  if (!user) {
    navigate('/login');
    return null;
  }

  const transactionId = `TXN${Date.now()}`;
  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const handleDownloadReceipt = () => {
    // In a real application, this would generate and download a PDF receipt
    const receiptData = {
      transactionId,
      studentName: user.name,
      rollNumber: user.rollNumber,
      amount: paymentAmount,
      date: currentDate,
      course: user.course,
      year: user.year,
      semester: user.semester
    };
    
    console.log('Downloading receipt:', receiptData);
    alert('Receipt download functionality would be implemented here');
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
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Success Message */}
        <Card className="p-8 border-0 shadow-strong text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-university-navy mb-4">Payment Successful!</h1>
          <p className="text-university-gray mb-6">
            Your fee payment has been processed successfully. You will receive a confirmation email shortly.
          </p>
          
          <div className="bg-university-light-blue rounded-lg p-6 mb-6">
            <div className="text-4xl font-bold text-university-navy mb-2">
              ₹{paymentAmount.toLocaleString()}
            </div>
            <div className="text-university-gray">Payment Amount</div>
          </div>
        </Card>

        {/* Transaction Details */}
        <Card className="p-6 border-0 shadow-medium mb-8">
          <h3 className="text-xl font-semibold text-university-navy mb-6">Transaction Details</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-university-gray">Transaction ID</label>
                <div className="font-medium text-university-navy">{transactionId}</div>
              </div>
              <div>
                <label className="text-sm text-university-gray">Date & Time</label>
                <div className="font-medium text-university-navy">{currentDate}</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-university-gray">Student Name</label>
                <div className="font-medium text-university-navy">{user.name}</div>
              </div>
              <div>
                <label className="text-sm text-university-gray">Roll Number</label>
                <div className="font-medium text-university-navy">{user.rollNumber}</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-university-gray">Course</label>
                <div className="font-medium text-university-navy">{user.course}</div>
              </div>
              <div>
                <label className="text-sm text-university-gray">Year/Semester</label>
                <div className="font-medium text-university-navy">Year {user.year}, Sem {user.semester}</div>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="text-university-gray">Payment Method</span>
                <div className="flex items-center">
                  <CreditCard className="w-4 h-4 mr-2 text-university-blue" />
                  <span className="font-medium text-university-navy">Online Payment</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-university-gray">Status</span>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                <span className="font-medium text-green-600">Completed</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Updated Fee Status */}
        <Card className="p-6 border-0 shadow-medium mb-8">
          <h3 className="text-xl font-semibold text-university-navy mb-6">Updated Fee Status</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-university-gray">Total Fees:</span>
              <span className="font-semibold">₹{user.totalFees.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-university-gray">Total Paid:</span>
              <span className="font-semibold text-green-600">₹{user.paidAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-t pt-4">
              <span className="text-university-gray">Remaining Balance:</span>
              <span className="font-bold text-university-navy">
                ₹{(user.totalFees - user.paidAmount).toLocaleString()}
              </span>
            </div>
            
            {user.feesPaid && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <p className="text-green-800 font-medium">All fees paid in full!</p>
              </div>
            )}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-4">
          <Button 
            onClick={handleDownloadReceipt}
            variant="outline" 
            className="border-university-blue text-university-blue hover:bg-university-blue hover:text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Receipt
          </Button>
          
          <Link to="/dashboard">
            <Button className="w-full bg-gradient-primary">
              <Calendar className="w-4 h-4 mr-2" />
              Go to Dashboard
            </Button>
          </Link>
        </div>

        {/* Important Note */}
        <Card className="p-6 border-0 shadow-medium mt-8 bg-blue-50">
          <h4 className="font-semibold text-university-navy mb-2">Important Note</h4>
          <ul className="text-sm text-university-gray space-y-1">
            <li>• Keep this transaction ID for your records</li>
            <li>• Receipt will be emailed to your registered email address</li>
            <li>• For any queries, contact the fee collection office</li>
            <li>• Payment confirmation may take 2-3 working hours to reflect in all systems</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default PaymentSuccess;