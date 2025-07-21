import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Shield, DollarSign, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const FeePayment = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!user) {
    navigate('/login');
    return null;
  }

  const remainingAmount = user.totalFees - user.paidAmount;
  const suggestedAmounts = [5000, 10000, 25000, remainingAmount];

  const feeBreakdown = [
    { item: 'Tuition Fees', amount: 60000 },
    { item: 'Laboratory Fees', amount: 8000 },
    { item: 'Library Fees', amount: 2000 },
    { item: 'Development Fees', amount: 5000 },
    { item: 'Examination Fees', amount: 3000 },
    { item: 'Miscellaneous', amount: 7000 }
  ];

  const handleAmountSelect = (selectedAmount: number) => {
    setAmount(selectedAmount.toString());
  };

  const handlePayment = async () => {
    if (!amount || parseInt(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid payment amount.",
        variant: "destructive",
      });
      return;
    }

    if (parseInt(amount) > remainingAmount) {
      toast({
        title: "Amount Exceeds Balance",
        description: `Amount cannot exceed remaining balance of ₹${remainingAmount.toLocaleString()}.`,
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      // Update user's paid amount in localStorage
      const updatedUser = {
        ...user,
        paidAmount: user.paidAmount + parseInt(amount),
        feesPaid: (user.paidAmount + parseInt(amount)) >= user.totalFees
      };

      // Update in localStorage
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
      // Update registered users list if user exists there
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const userIndex = registeredUsers.findIndex((u: any) => u.rollNumber === user.rollNumber);
      if (userIndex !== -1) {
        registeredUsers[userIndex] = updatedUser;
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
      }

      setIsProcessing(false);
      
      toast({
        title: "Payment Successful!",
        description: `₹${parseInt(amount).toLocaleString()} has been successfully paid.`,
      });

      // Redirect to success page
      navigate('/payment-success', { state: { amount: parseInt(amount) } });
    }, 3000);
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
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-500" />
              <span className="text-sm text-university-gray">Secure Payment</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-university-navy mb-2">Fee Payment</h1>
          <p className="text-university-gray">Secure online payment for your academic fees</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Amount */}
            <Card className="p-6 border-0 shadow-medium">
              <h3 className="text-xl font-semibold text-university-navy mb-4">Payment Amount</h3>
              
              {/* Quick Amount Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-university-navy mb-3">
                  Quick Select Amount
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {suggestedAmounts.map((suggestedAmount, index) => (
                    <Button
                      key={index}
                      variant={amount === suggestedAmount.toString() ? "default" : "outline"}
                      onClick={() => handleAmountSelect(suggestedAmount)}
                      className={amount === suggestedAmount.toString() ? "bg-university-blue" : "border-university-blue text-university-blue hover:bg-university-blue hover:text-white"}
                    >
                      ₹{suggestedAmount.toLocaleString()}
                      {suggestedAmount === remainingAmount && (
                        <Badge variant="secondary" className="ml-2 text-xs">Full</Badge>
                      )}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Custom Amount */}
              <div>
                <label className="block text-sm font-medium text-university-navy mb-2">
                  Custom Amount
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-university-gray" />
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount in ₹"
                    className="pl-10 border-university-light-blue/50 focus:border-university-blue"
                    min="1"
                    max={remainingAmount}
                  />
                </div>
                <p className="text-sm text-university-gray mt-2">
                  Maximum amount: ₹{remainingAmount.toLocaleString()}
                </p>
              </div>
            </Card>

            {/* Payment Method */}
            <Card className="p-6 border-0 shadow-medium">
              <h3 className="text-xl font-semibold text-university-navy mb-4">Payment Method</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    variant={paymentMethod === 'card' ? "default" : "outline"}
                    onClick={() => setPaymentMethod('card')}
                    className={paymentMethod === 'card' ? "bg-university-blue" : "border-university-blue text-university-blue hover:bg-university-blue hover:text-white"}
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Card
                  </Button>
                  <Button
                    variant={paymentMethod === 'upi' ? "default" : "outline"}
                    onClick={() => setPaymentMethod('upi')}
                    className={paymentMethod === 'upi' ? "bg-university-blue" : "border-university-blue text-university-blue hover:bg-university-blue hover:text-white"}
                  >
                    UPI
                  </Button>
                  <Button
                    variant={paymentMethod === 'netbanking' ? "default" : "outline"}
                    onClick={() => setPaymentMethod('netbanking')}
                    className={paymentMethod === 'netbanking' ? "bg-university-blue" : "border-university-blue text-university-blue hover:bg-university-blue hover:text-white"}
                  >
                    Net Banking
                  </Button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4 p-4 bg-university-light-gray rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-university-navy mb-2">
                          Card Number
                        </label>
                        <Input placeholder="1234 5678 9012 3456" className="border-university-light-blue/50" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-university-navy mb-2">
                          Cardholder Name
                        </label>
                        <Input placeholder="JOHN DOE" className="border-university-light-blue/50" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-university-navy mb-2">
                          Expiry Date
                        </label>
                        <Input placeholder="MM/YY" className="border-university-light-blue/50" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-university-navy mb-2">
                          CVV
                        </label>
                        <Input placeholder="123" type="password" className="border-university-light-blue/50" />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'upi' && (
                  <div className="p-4 bg-university-light-gray rounded-lg">
                    <label className="block text-sm font-medium text-university-navy mb-2">
                      UPI ID
                    </label>
                    <Input placeholder="yourname@upi" className="border-university-light-blue/50" />
                  </div>
                )}

                {paymentMethod === 'netbanking' && (
                  <div className="p-4 bg-university-light-gray rounded-lg">
                    <label className="block text-sm font-medium text-university-navy mb-2">
                      Select Bank
                    </label>
                    <Select>
                      <SelectTrigger className="border-university-light-blue/50">
                        <SelectValue placeholder="Choose your bank" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sbi">State Bank of India</SelectItem>
                        <SelectItem value="hdfc">HDFC Bank</SelectItem>
                        <SelectItem value="icici">ICICI Bank</SelectItem>
                        <SelectItem value="axis">Axis Bank</SelectItem>
                        <SelectItem value="kotak">Kotak Mahindra Bank</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </Card>

            {/* Payment Button */}
            <Button
              onClick={handlePayment}
              disabled={isProcessing || !amount}
              className="w-full bg-university-gold hover:bg-university-light-gold text-university-navy font-semibold py-4 text-lg"
            >
              {isProcessing ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 border-2 border-university-navy/30 border-t-university-navy rounded-full animate-spin mr-3"></div>
                  Processing Payment...
                </div>
              ) : (
                <>
                  <CreditCard className="w-5 h-5 mr-3" />
                  Pay ₹{amount ? parseInt(amount).toLocaleString() : '0'}
                </>
              )}
            </Button>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Fee Summary */}
            <Card className="p-6 border-0 shadow-medium">
              <h3 className="text-lg font-semibold text-university-navy mb-4">Fee Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-university-gray">Total Fees:</span>
                  <span className="font-medium">₹{user.totalFees.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-university-gray">Paid Amount:</span>
                  <span className="font-medium text-green-600">₹{user.paidAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-university-gray">Remaining:</span>
                  <span className="font-bold text-red-600">₹{remainingAmount.toLocaleString()}</span>
                </div>
              </div>
            </Card>

            {/* Fee Breakdown */}
            <Card className="p-6 border-0 shadow-medium">
              <h3 className="text-lg font-semibold text-university-navy mb-4">Fee Breakdown</h3>
              <div className="space-y-2 text-sm">
                {feeBreakdown.map((fee, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-university-gray">{fee.item}:</span>
                    <span>₹{fee.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Security Info */}
            <Card className="p-6 border-0 shadow-medium bg-green-50">
              <div className="flex items-center mb-3">
                <Shield className="w-5 h-5 text-green-600 mr-2" />
                <h3 className="text-lg font-semibold text-green-800">Secure Payment</h3>
              </div>
              <div className="space-y-2 text-sm text-green-700">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span>256-bit SSL encryption</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span>PCI DSS compliant</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span>Instant payment confirmation</span>
                </div>
              </div>
            </Card>

            {/* Help */}
            <Card className="p-6 border-0 shadow-medium">
              <div className="flex items-center mb-3">
                <AlertCircle className="w-5 h-5 text-university-blue mr-2" />
                <h3 className="text-lg font-semibold text-university-navy">Need Help?</h3>
              </div>
              <p className="text-sm text-university-gray mb-3">
                Contact our fee collection office for any payment related queries.
              </p>
              <div className="space-y-1 text-sm">
                <p className="text-university-navy font-medium">📞 +91 40 1234 5678</p>
                <p className="text-university-navy font-medium">📧 fees@mallareddy.edu.in</p>
                <p className="text-university-gray">Mon-Fri: 9:00 AM - 6:00 PM</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeePayment;