import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserProfile, useLoanApplication, useUserLoans } from '@/hooks/useCSVData';

// --- Icon Mock Components (Lucide-React equivalents) ---
const DollarSign = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="2" y2="22"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>;
const Calendar = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2V4"></path><path d="M16 2V4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>;
const Shield = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>;
const Zap = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>;
const CheckCircle = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><path d="m9 11 3 3L22 4"></path></svg>;
const ArrowLeft = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>;

// --- UI Component Mocks ---
const Card = ({ className = '', children, ...props }) => (
  <div className={`rounded-xl border bg-card text-card-foreground shadow ${className}`} {...props}>
    {children}
  </div>
);
const CardHeader = ({ className = '', children, ...props }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
    {children}
  </div>
);
const CardTitle = ({ className = '', children, ...props }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props}>
    {children}
  </h3>
);
const CardDescription = ({ className = '', children, ...props }) => (
  <p className={`text-sm text-muted-foreground ${className}`} {...props}>
    {children}
  </p>
);
const CardContent = ({ className = '', children, ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

const Button = ({ className = '', children, variant = 'default', onClick, disabled, ...props }) => {
  let baseStyles = 'inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2';
  let variantStyles = '';

  if (variant === 'outline') {
    variantStyles = 'border border-input bg-background hover:bg-accent hover:text-accent-foreground';
  } else {
    variantStyles = 'bg-primary text-primary-foreground hover:bg-primary/90';
  }

  return (
    <button className={`${baseStyles} ${variantStyles} ${className}`} onClick={onClick} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

const Label = ({ className = '', children, htmlFor, ...props }) => (
  <label htmlFor={htmlFor} className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`} {...props}>
    {children}
  </label>
);

const Input = ({ className = '', type = 'text', ...props }) => (
  <input
    type={type}
    className={`flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

const Select = ({ value, onValueChange, children }) => {
  const handleChange = (event) => {
    if (onValueChange) {
      onValueChange(event.target.value);
    }
  };
  return (
    <select
      value={value}
      onChange={handleChange}
      className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {children}
    </select>
  );
};

const SelectContent = ({ children }) => <>{children}</>;
const SelectItem = ({ value, children, ...props }) => (
  <option value={value} {...props}>
    {children}
  </option>
);

// --- Main Loan Application Component ---

const LoanApplication = () => {
  const navigate = useNavigate();
  const walletAddress = "0x742d35Cc6634C0532925a3b8D"; // Mock wallet for demo
  
  const { data: user, isLoading: userLoading } = useUserProfile(walletAddress);
  const { data: userLoans = [] } = useUserLoans(user?.id);
  const loanMutation = useLoanApplication();
  
  const [loanAmount, setLoanAmount] = useState(5000);
  const [loanDuration, setLoanDuration] = useState(30);
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Constants
  const MIN_AMOUNT = 1000;
  const MAX_AMOUNT = user?.tier === 'platinum' ? 25000 : 
                    user?.tier === 'gold' ? 15000 : 
                    user?.tier === 'silver' ? 10000 : 5000;

  const MONTHLY_RATE = user?.tier === 'platinum' ? 0.02 : 
                      user?.tier === 'gold' ? 0.022 : 
                      user?.tier === 'silver' ? 0.025 : 0.03;

  // Ensure loanAmount is within bounds when changed manually
  useEffect(() => {
    if (loanAmount < MIN_AMOUNT) setLoanAmount(MIN_AMOUNT);
    if (loanAmount > MAX_AMOUNT) setLoanAmount(MAX_AMOUNT);
  }, [loanAmount, MAX_AMOUNT]);

  // Calculate interest and total amount
  const { totalAmount, interestAmount, dueDate } = useMemo(() => {
    const amount = Math.min(Math.max(loanAmount, MIN_AMOUNT), MAX_AMOUNT);
    const duration = loanDuration;
    
    const interest = amount * MONTHLY_RATE * (duration / 30);
    const total = amount + interest;

    const date = new Date();
    date.setDate(date.getDate() + duration);
    
    return {
      totalAmount: total,
      interestAmount: interest,
      dueDate: date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    };
  }, [loanAmount, loanDuration, MONTHLY_RATE, MAX_AMOUNT]);

  // Currency Formatter
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleSubmit = async () => {
    if (!user) return;

    try {
      const result = await loanMutation.mutateAsync({
        userId: user.id,
        amount: loanAmount,
        duration: loanDuration,
      });
      
      setMessage(`Successfully submitted application for ${formatCurrency(loanAmount)}. Total repayable: ${formatCurrency(totalAmount)}. Due date: ${dueDate}.`);
      setIsModalOpen(true);
    } catch (error) {
      setMessage('Failed to submit loan application. Please try again.');
      setIsModalOpen(true);
    }
  };

  const handleBack = () => navigate("/");

  if (userLoading) {
    return (
      <div className="min-h-screen gradient-bg p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  // Custom Styles
  const customStyles = `
    .gradient-bg {
      background: linear-gradient(135deg, #f0f4f8 0%, #e0e8f0 100%);
      background-attachment: fixed;
    }
    .glass-card {
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.3);
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    }
    .border-glow {
      box-shadow: 0 0 10px rgba(100, 116, 139, 0.2);
    }
    .shadow-premium {
      box-shadow: 0 20px 25px -5px rgba(124, 58, 237, 0.1), 0 8px 10px -6px rgba(124, 58, 237, 0.1);
    }
    .text-gradient {
      background: linear-gradient(90deg, #7c3aed, #4f46e5);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .gradient-primary {
      background: linear-gradient(90deg, #8b5cf6, #a855f7);
      transition: all 0.3s ease;
    }
    .gradient-primary:hover {
        background: linear-gradient(90deg, #7c3aed, #9333ea);
    }
    input[type=range]::-webkit-slider-thumb {
        appearance: none;
        height: 20px;
        width: 20px;
        border-radius: 9999px;
        background: #8b5cf6;
        cursor: pointer;
        border: 4px solid #fff;
        box-shadow: 0 0 5px rgba(0,0,0,0.1);
        margin-top: -8px;
    }
    input[type=range]::-moz-range-thumb {
        height: 20px;
        width: 20px;
        border-radius: 9999px;
        background: #8b5cf6;
        cursor: pointer;
        border: 4px solid #fff;
        box-shadow: 0 0 5px rgba(0,0,0,0.1);
    }
    input[type=range]::-webkit-slider-runnable-track {
        height: 4px;
        background: #ede9fe;
        border-radius: 10px;
    }
    input[type=range]::-moz-range-track {
        height: 4px;
        background: #ede9fe;
        border-radius: 10px;
    }
  `;

  const activeLoans = userLoans.filter(loan => 
    ['approved', 'disbursed', 'pending'].includes(loan.status)
  );

  return (
    <>
      <script src="https://cdn.tailwindcss.com"></script>
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />

      <div className="min-h-screen gradient-bg font-inter p-4 md:p-6 text-gray-800">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button 
            variant="outline" 
            onClick={handleBack}
            className="mb-6 glass-card border-glow text-purple-700 hover:text-purple-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          
          {/* User Info Banner */}
          {user && (
            <Card className="glass-card border-glow shadow-premium mb-6 bg-gradient-to-r from-purple-50 to-indigo-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg">Welcome, {user.walletAddress.slice(0, 8)}...</h3>
                    <p className="text-sm text-muted-foreground">
                      Credit Score: <span className="font-semibold text-purple-600">{user.creditScore}</span> • 
                      Tier: <span className="font-semibold text-purple-600 capitalize">{user.tier}</span> • 
                      Max Loan: <span className="font-semibold text-purple-600">{formatCurrency(MAX_AMOUNT)}</span>
                    </p>
                  </div>
                  <Badge variant={user.tier === 'platinum' ? 'default' : 'secondary'} className="capitalize">
                    {user.tier} Partner
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Active Loans Warning */}
          {activeLoans.length > 0 && (
            <Card className="glass-card border-glow shadow-premium mb-6 border-amber-200 bg-amber-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-amber-600" />
                  <div>
                    <p className="font-semibold text-amber-800">You have {activeLoans.length} active loan(s)</p>
                    <p className="text-sm text-amber-700">
                      Total outstanding: {formatCurrency(activeLoans.reduce((sum, loan) => sum + loan.amount, 0))}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Main Loan Application Card */}
          <Card className="glass-card border-glow shadow-premium mb-6">
            <CardHeader className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-gradient">Instant Loan Application</CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Get the funds you need in minutes with your verified credit score.
                {user && (
                  <span className="block mt-1 text-sm">
                    Your tier: <span className="font-semibold capitalize">{user.tier}</span> • 
                    Interest rate: <span className="font-semibold">{(MONTHLY_RATE * 100).toFixed(1)}% monthly</span>
                  </span>
                )}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-8">
              {/* Loan Amount */}
              <div className="space-y-4">
                <Label htmlFor="amount" className="text-lg font-bold flex items-center gap-2 text-gray-700">
                  <DollarSign className="w-5 h-5 text-purple-600" />
                  Loan Amount: <span className="text-purple-800">{formatCurrency(loanAmount)}</span>
                  <span className="text-sm font-normal text-gray-500 ml-2">
                    (Max: {formatCurrency(MAX_AMOUNT)})
                  </span>
                </Label>
                <div className="space-y-2">
                  <Input
                    id="amount"
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    min={MIN_AMOUNT}
                    max={MAX_AMOUNT}
                    step={500}
                    className="text-lg py-6 rounded-xl border-2 border-purple-200 focus:border-purple-500 shadow-inner"
                  />
                  <div className="flex justify-between text-sm text-gray-500 px-1">
                    <span>{formatCurrency(MIN_AMOUNT)}</span>
                    <span>{formatCurrency(MAX_AMOUNT)}</span>
                  </div>
                  <input
                    type="range"
                    min={MIN_AMOUNT}
                    max={MAX_AMOUNT}
                    step={500}
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Loan Duration */}
              <div className="space-y-4">
                <Label htmlFor="duration" className="text-lg font-bold flex items-center gap-2 text-gray-700">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  Loan Duration
                </Label>
                <Select value={loanDuration.toString()} onValueChange={(value) => setLoanDuration(Number(value))}>
                    <SelectContent>
                      <SelectItem value="15">15 days</SelectItem>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="45">45 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                    </SelectContent>
                </Select>
              </div>

              {/* Loan Summary */}
              <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-300 shadow-md">
                <CardContent className="p-6">
                  <h3 className="font-extrabold text-xl mb-4 flex items-center gap-2 text-purple-700">
                    <Shield className="w-6 h-6 text-purple-600" />
                    Loan Summary
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b border-purple-200 pb-2">
                      <span className="text-gray-600">Loan Amount</span>
                      <span className="font-bold text-gray-800">{formatCurrency(loanAmount)}</span>
                    </div>
                    <div className="flex justify-between border-b border-purple-200 pb-2">
                      <span className="text-gray-600">Interest ({(MONTHLY_RATE * 100).toFixed(1)}% monthly)</span>
                      <span className="font-bold text-orange-600">{formatCurrency(interestAmount)}</span>
                    </div>
                    <div className="flex justify-between pt-3">
                      <span className="font-extrabold text-xl text-gray-800">Total Repayable</span>
                      <span className="font-extrabold text-xl text-green-600">{formatCurrency(totalAmount)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 pt-1">
                      <span>Due Date</span>
                      <span className="font-semibold text-gray-700">{dueDate}</span>
                    </div>
                    {user && (
                      <div className="flex justify-between text-sm text-gray-500 pt-1">
                        <span>Your Tier Benefits</span>
                        <span className="font-semibold text-purple-600 capitalize">{user.tier} Rate</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <Button 
                className="w-full py-6 text-xl font-extrabold gradient-primary text-white shadow-glow hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01]"
                onClick={handleSubmit}
                disabled={loanMutation.isPending || activeLoans.length >= 2}
              >
                {loanMutation.isPending ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Zap className="w-5 h-5 mr-3" />
                    {activeLoans.length >= 2 ? 'Maximum Active Loans Reached' : 'Apply for Instant Loan'}
                  </>
                )}
              </Button>

              {activeLoans.length >= 2 && (
                <p className="text-sm text-amber-600 text-center">
                  You have reached the maximum number of active loans (2). Please repay existing loans to apply for new ones.
                </p>
              )}

              {/* Trust Indicators */}
              <div className="text-center space-y-2">
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-600 font-medium">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>No Hidden Fees</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4 text-blue-500" />
                    <span>SSL Secured</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap className="w-4 h-4 text-amber-500" />
                    <span>Instant Approval</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Success Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
          <Card className="glass-card border-glow max-w-lg w-full text-center p-8">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <CardTitle className="text-2xl font-bold mb-3 text-green-700">
              {message.includes('Failed') ? 'Application Failed' : 'Application Submitted!'}
            </CardTitle>
            <CardDescription className="text-gray-700 mb-6">{message}</CardDescription>
            <Button 
              className="gradient-primary text-white font-semibold" 
              onClick={() => {
                setIsModalOpen(false);
                if (!message.includes('Failed')) {
                  navigate("/");
                }
              }}
            >
              {message.includes('Failed') ? 'Try Again' : 'Back to Dashboard'}
            </Button>
          </Card>
        </div>
      )}
    </>
  );
};

// Badge component (needed for the user info banner)
const Badge = ({ variant = 'default', className = '', children, ...props }) => {
  const baseStyles = 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2';
  const variantStyles = {
    default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
    secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
    destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
    outline: 'text-foreground',
  };

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default LoanApplication;