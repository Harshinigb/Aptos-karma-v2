import { TrendingUp, Shield, DollarSign, Award, Star, Clock, Zap, Rocket, Crown, Sparkles, Target, PieChart, Wallet, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserDashboard = ({ walletAddress }) => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const creditScore = 785;
  const tierProgress = 65;
  const currentTier = "Gold Partner";

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleApplyForLoan = () => {
    // Navigate to loan application page
    navigate("/apply-loan");
    // Alternatively, you can use window.location if not using React Router:
    // window.location.href = "/apply-loan";
  };

  const financialStats = [
    { 
      label: "Available Credit", 
      value: "₹15,000", 
      icon: DollarSign, 
      color: "from-green-400 to-emerald-600",
      trend: "+₹2,000",
      description: "Interest: 2.5% per month"
    },
    { 
      label: "PAT Tokens", 
      value: "12,470", 
      icon: Award, 
      color: "from-purple-500 to-violet-600",
      trend: "+1,240",
      description: "≈ ₹2,494 value"
    },
    { 
      label: "Active Loan", 
      value: "₹0", 
      icon: Wallet, 
      color: "from-blue-400 to-cyan-600",
      trend: "Paid off",
      description: "No outstanding balance"
    }
  ];

  const performanceStats = [
    { label: "Total Deliveries", value: "1,247", trend: "+45", color: "purple" },
    { label: "Avg Rating", value: "4.9", trend: "+0.1", color: "amber" },
    { label: "On-Time Rate", value: "98%", trend: "+2%", color: "green" },
    { label: "Day Streak", value: "147", trend: "+7", color: "blue" }
  ];

  return (
    <div className="min-h-screen gradient-bg p-4 md:p-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="particles-container">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              width: `${Math.random() * 50 + 25}px`,
              height: `${Math.random() * 50 + 25}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 12}s`,
              animationDuration: `${Math.random() * 18 + 12}s`,
            }}
          />
        ))}
      </div>

      {/* Premium Header */}
      <div className={`mb-6 md:mb-8 text-center transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        <div className="inline-flex items-center gap-2 mb-3 px-4 py-2 rounded-full glass-card border-glow shadow-glow">
          <Sparkles className="w-4 h-4 text-purple-500" />
          <span className="text-xs font-semibold text-purple-600">Rider Dashboard</span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-2">
          Your Financial Hub
        </h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
          Manage your earnings, credit, and rewards in one place
        </p>
      </div>

      <div className={`space-y-6 max-w-7xl mx-auto transform transition-all duration-700 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        
        {/* Credit Score Card - Premium */}
        <Card className="glass-card border-glow shadow-premium hover:shadow-glow transition-all duration-500 overflow-hidden">
          <CardHeader className="pb-4 border-b border-border/50 bg-gradient-to-r from-white to-purple-50/30">
            <CardTitle className="flex items-center gap-4 text-xl md:text-2xl">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 text-white shadow-lg pulse-glow">
                <Shield className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                Rider Credit Score
                <CardDescription className="text-base pt-2">
                  Based on delivery history, ratings & consistency
                </CardDescription>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-6">
              <div className="text-center lg:text-left">
                <div className="relative inline-block">
                  <p className="text-5xl md:text-6xl font-bold text-gradient bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                    {creditScore}
                  </p>
                  <div className="absolute -top-2 -right-2">
                    <Crown className="w-6 h-6 text-amber-500 fill-amber-500" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Excellent Standing</p>
              </div>
              
              <div className="text-center lg:text-right">
                <Badge className="gradient-primary text-white px-4 py-2 text-sm font-semibold mb-2 shadow-lg">
                  {currentTier}
                </Badge>
                <p className="text-xs text-muted-foreground">Tier Level 3/5</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground font-medium">Progress to Platinum</span>
                <span className="font-bold text-purple-600">{tierProgress}%</span>
              </div>
              
              <div className="relative">
                <Progress value={tierProgress} className="h-3 rounded-full bg-purple-100" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full" style={{ width: `${tierProgress}%` }} />
              </div>
              
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Target className="w-3 h-3 text-purple-500" />
                <span>Complete 150 more deliveries with 4.8+ rating to unlock Platinum benefits</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Financial Summary - Premium */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-6 stagger-animation">
          {financialStats.map((stat, index) => (
            <Card key={index} className="glass-card glass-card-hover border-glow shadow-premium group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardContent className="p-4 md:p-6 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                    stat.trend.includes('+') || stat.trend === 'Paid off'
                      ? 'bg-green-100 text-green-700 border border-green-200' 
                      : 'bg-red-100 text-red-700 border border-red-200'
                  }`}>
                    {stat.trend}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions - Single Button */}
        <Card className="glass-card border-glow shadow-premium hover:shadow-glow transition-all duration-500 overflow-hidden">
          <CardHeader className="pb-4 bg-gradient-to-r from-white to-blue-50/30">
            <CardTitle className="flex items-center gap-4 text-xl md:text-2xl">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 text-white shadow-lg">
                <Zap className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              Quick Actions
            </CardTitle>
            <CardDescription className="text-base">
              Get instant access to funds when you need them
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex justify-center">
              <Button 
                onClick={handleApplyForLoan}
                className="btn-premium gradient-primary text-white py-6 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group w-full max-w-md"
              >
                <div className="flex items-center gap-4 w-full text-left">
                  <div className="p-3 rounded-xl bg-white/20 text-white group-hover:scale-110 transition-transform duration-300">
                    <Zap className="w-6 h-6 md:w-7 md:h-7" />
                  </div>
                  <div className="flex-2">
                    <p className="font-bold text-lg md:text-2xl">Apply for Instant Loan</p>
                    <p className="text-white/90 text-sm"></p>
                  </div>
                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-white/80 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </Button>
            </div>

            {/* Additional Info */}
            <div className="mt-6 grid md:grid-cols-3 gap-4 text-center">
              <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                <CheckCircle className="w-5 h-5 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-green-700">Instant Approval</p>
                <p className="text-xs text-green-600">Get decision in seconds</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                <DollarSign className="w-5 h-5 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-blue-700">Low Interest</p>
                <p className="text-xs text-blue-600">From 2.5% per month</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-50 border border-purple-200">
                <Clock className="w-5 h-5 text-purple-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-purple-700">Quick Disbursal</p>
                <p className="text-xs text-purple-600">Money in minutes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Stats - Premium */}
        <Card className="glass-card border-glow shadow-premium hover:shadow-glow transition-all duration-500 overflow-hidden">
          <CardHeader className="pb-4 bg-gradient-to-r from-white to-amber-50/30">
            <CardTitle className="flex items-center gap-4 text-xl md:text-2xl">
              <div className="p-3 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg">
                <Star className="w-5 h-5 md:w-6 md:h-6 fill-white" />
              </div>
              Performance Highlights
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {performanceStats.map((stat, index) => (
                <div 
                  key={index}
                  className="p-4 md:p-6 rounded-xl border border-border/50 bg-white/50 hover:bg-white/80 hover:shadow-md transition-all duration-300 group text-center"
                >
                  <p className="text-2xl md:text-3xl font-bold text-foreground mb-1 group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
                  <span className={`text-xs px-2 py-1 rounded-full font-semibold bg-${stat.color}-100 text-${stat.color}-700 border border-${stat.color}-200`}>
                    {stat.trend}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Additional Rewards Section */}
        <Card className="glass-card border-glow shadow-premium hover:shadow-glow transition-all duration-500 overflow-hidden">
          <CardHeader className="pb-4 bg-gradient-to-r from-white to-green-50/30">
            <CardTitle className="flex items-center gap-4 text-xl md:text-2xl">
              <div className="p-3 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-lg">
                <Award className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              Rewards & Benefits
            </CardTitle>
            <CardDescription className="text-base">
              Unlock exclusive benefits as you grow
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { 
                  title: "Lower Interest Rates", 
                  description: "From 2.5% to 1.8% APR", 
                  status: "Unlocked",
                  color: "green"
                },
                { 
                  title: "Higher Credit Limit", 
                  description: "Up to ₹25,000 available", 
                  status: "Next Tier",
                  color: "blue"
                },
                { 
                  title: "Instant Payouts", 
                  description: "Same-day earnings transfer", 
                  status: "Platinum",
                  color: "purple"
                }
              ].map((benefit, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-xl border border-border/50 bg-white/50 hover:bg-white/80 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-2 h-2 rounded-full bg-${benefit.color}-500`} />
                    <p className="font-semibold text-foreground">{benefit.title}</p>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{benefit.description}</p>
                  <Badge 
                    variant="secondary" 
                    className={`${
                      benefit.status === "Unlocked" 
                        ? "bg-green-100 text-green-700 border-green-200" 
                        : benefit.status === "Next Tier"
                        ? "bg-blue-100 text-blue-700 border-blue-200"
                        : "bg-purple-100 text-purple-700 border-purple-200"
                    } text-xs`}
                  >
                    {benefit.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Add missing CheckCircle component
const CheckCircle = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default UserDashboard;