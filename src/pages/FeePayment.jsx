import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, GraduationCap, Lock, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const FeePayment = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentData, setPaymentData] = useState({
    amount: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolder: '',
    upiId: ''
  });

  if (!user) {
    navigate('/login');
    return null;
  }

  const remainingAmount = user.totalFees - user.paidAmount;
  const suggestedAmounts = [5000, 10000, 15000, remainingAmount];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAmountSelect = (amount) => {
    setPaymentData(prev => ({
      ...prev,
      amount: amount.toString()
    }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    
    if (!paymentMethod) {
      toast({
        title: "Payment Method Required",
        description: "Please select a payment method.",
        variant: "destructive",
      });
      return;
    }

    if (!paymentData.amount || parseFloat(paymentData.amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid payment amount.",
        variant: "destructive",
      });
      return;
    }

    if (parseFloat(paymentData.amount) > remainingAmount) {
      toast({
        title: "Amount Too High",
        description: `Amount cannot exceed remaining balance of ₹${remainingAmount.toLocaleString()}.`,
        variant: "destructive",
      });
      return;
    }

    // Validate payment method specific fields
    if (paymentMethod === 'card') {
      if (!paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvv || !paymentData.cardHolder) {
        toast({
          title: "Card Details Required",
          description: "Please fill in all card details.",
          variant: "destructive",
        });
        return;
      }
    }

    if (paymentMethod === 'upi' && !paymentData.upiId) {
      toast({
        title: "UPI ID Required",
        description: "Please enter your UPI ID.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Create payment record
      const payment = {
        amount: parseFloat(paymentData.amount),
        method: paymentMethod,
        date: new Date().toISOString(),
        transactionId: `TXN${Date.now()}`,
        status: 'Success'
      };
      
      // Store payment in localStorage
      const existingPayments = JSON.parse(localStorage.getItem('payments') || '[]');
      existingPayments.push({
        ...payment,
        userId: user.rollNumber,
        userName: user.name
      });
      localStorage.setItem('payments', JSON.stringify(existingPayments));
      
      navigate('/payment-success', { 
        state: { 
          payment,
          user 
        } 
      });
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
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
                <h1 className="text-lg font-bold text-university-navy">Fee Payment</h1>
                <p className="text-xs text-university-gray">Secure Online Payment Portal</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-2">
              <Card className="p-6 border-0 shadow-medium">
                <h2 className="text-2xl font-bold text-university-navy mb-6">Make Payment</h2>
                
                <form onSubmit={handlePayment} className="space-y-6">
                  {/* Amount Selection */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-university-navy">Payment Amount</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {suggestedAmounts.map((amount) => (
                        <Button
                          key={amount}
                          type="button"
                          variant="outline"
                          onClick={() => handleAmountSelect(amount)}
                          className={`p-4 ${paymentData.amount === amount.toString() ? 'bg-university-blue text-white' : ''}`}
                        >
                          ₹{amount.toLocaleString()}
                        </Button>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-university-navy">Custom Amount</label>
                      <Input
                        type="number"
                        name="amount"
                        placeholder="Enter amount"
                        value={paymentData.amount}
                        onChange={handleInputChange}
                        min="1"
                        max={remainingAmount}
                      />
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-university-navy">Payment Method</h3>
                    <Select onValueChange={setPaymentMethod}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="card">Credit/Debit Card</SelectItem>
                        <SelectItem value="upi">UPI</SelectItem>
                        <SelectItem value="netbanking">Net Banking</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Card Payment Details */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-university-navy">Card Details</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-university-navy">Card Holder Name</label>
                          <div className="relative">
                            <User className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-university-gray" />
                            <Input
                              type="text"
                              name="cardHolder"
                              placeholder="Enter card holder name"
                              value={paymentData.cardHolder}
                              onChange={handleInputChange}
                              className="pl-10"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-university-navy">Card Number</label>
                          <div className="relative">
                            <CreditCard className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-university-gray" />
                            <Input
                              type="text"
                              name="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              value={paymentData.cardNumber}
                              onChange={handleInputChange}
                              className="pl-10"
                              maxLength="19"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-university-navy">Expiry Date</label>
                            <div className="relative">
                              <Calendar className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-university-gray" />
                              <Input
                                type="text"
                                name="expiryDate"
                                placeholder="MM/YY"
                                value={paymentData.expiryDate}
                                onChange={handleInputChange}
                                className="pl-10"
                                maxLength="5"
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-university-navy">CVV</label>
                            <div className="relative">
                              <Lock className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-university-gray" />
                              <Input
                                type="text"
                                name="cvv"
                                placeholder="123"
                                value={paymentData.cvv}
                                onChange={handleInputChange}
                                className="pl-10"
                                maxLength="4"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* UPI Payment Details */}
                  {paymentMethod === 'upi' && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-university-navy">UPI Details</h3>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-university-navy">UPI ID</label>
                        <Input
                          type="text"
                          name="upiId"
                          placeholder="yourname@upi"
                          value={paymentData.upiId}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  )}

                  {/* Net Banking */}
                  {paymentMethod === 'netbanking' && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-university-navy">Net Banking</h3>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your bank" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sbi">State Bank of India</SelectItem>
                          <SelectItem value="hdfc">HDFC Bank</SelectItem>
                          <SelectItem value="icici">ICICI Bank</SelectItem>
                          <SelectItem value="axis">Axis Bank</SelectItem>
                          <SelectItem value="pnb">Punjab National Bank</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isProcessing || !paymentMethod}
                    className="w-full bg-university-gold hover:bg-university-light-gold text-university-navy font-semibold py-3"
                  >
                    {isProcessing ? (
                      <div className="flex items-center">
                        <div className="w-4 h-4 border-2 border-university-navy/30 border-t-university-navy rounded-full animate-spin mr-2"></div>
                        Processing Payment...
                      </div>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4 mr-2" />
                        Pay ₹{paymentData.amount ? parseFloat(paymentData.amount).toLocaleString() : '0'}
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </div>

            {/* Payment Summary */}
            <div className="space-y-6">
              <Card className="p-6 border-0 shadow-medium">
                <h3 className="text-lg font-semibold text-university-navy mb-4">Payment Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-university-gray">Student Name:</span>
                    <span className="font-medium text-university-navy">{user.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-university-gray">Roll Number:</span>
                    <span className="font-medium text-university-navy">{user.rollNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-university-gray">Course:</span>
                    <span className="font-medium text-university-navy">{user.course}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="text-university-gray">Total Fees:</span>
                      <span className="font-medium text-university-navy">₹{user.totalFees.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-university-gray">Paid Amount:</span>
                      <span className="font-medium text-green-600">₹{user.paidAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-university-gray">Remaining:</span>
                      <span className="font-semibold text-red-600">₹{remainingAmount.toLocaleString()}</span>
                    </div>
                  </div>
                  {paymentData.amount && (
                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-university-gray">Payment Amount:</span>
                        <Badge className="bg-university-blue">
                          ₹{parseFloat(paymentData.amount).toLocaleString()}
                        </Badge>
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              <Card className="p-6 border-0 shadow-medium">
                <h3 className="text-lg font-semibold text-university-navy mb-4">Security Information</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <span className="text-university-gray">256-bit SSL encryption</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <span className="text-university-gray">PCI DSS compliant</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <span className="text-university-gray">Secure payment gateway</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeePayment;