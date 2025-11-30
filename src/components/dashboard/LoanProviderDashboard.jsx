import { Wallet, TrendingUp, Users, DollarSign, AlertCircle, CheckCircle, Clock, Shield, Zap, Target, Crown, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

const LoanProviderDashboard = ({ walletAddress }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Mock lender data
  const loanRequests = [
    { 
      id: 1, 
      partner: "Rajesh Kumar", 
      amount: 8000, 
      score: 785, 
      deliveries: 1247, 
      rating: 4.9, 
      risk: "low",
      avatar: "🚀",
      trend: "+15%"
    },
    { 
      id: 2, 
      partner: "Amit Singh", 
      amount: 5000, 
      score: 720, 
      deliveries: 856, 
      rating: 4.7, 
      risk: "medium",
      avatar: "⭐",
      trend: "+8%"
    },
    { 
      id: 3, 
      partner: "Priya Sharma", 
      amount: 12000, 
      score: 810, 
      deliveries: 1523, 
      rating: 5.0, 
      risk: "low",
      avatar: "👑",
      trend: "+22%"
    },
  ];

  const stats = [
    { 
      label: "Total Pool", 
      value: "₹24.5L", 
      icon: Wallet, 
      color: "from-purple-500 to-violet-600",
      trend: "+12.5%",
      description: "Total capital deployed"
    },
    { 
      label: "Active Loans", 
      value: "₹18.2L", 
      icon: TrendingUp, 
      color: "from-green-400 to-emerald-600",
      trend: "+8.3%",
      description: "Currently active"
    },
    { 
      label: "Monthly Returns", 
      value: "3.8%", 
      icon: DollarSign, 
      color: "from-blue-400 to-cyan-600",
      trend: "+0.4%",
      description: "Average yield"
    },
    { 
      label: "Active Borrowers", 
      value: "342", 
      icon: Users, 
      color: "from-pink-400 to-rose-500",
      trend: "+15%",
      description: "Trusted partners"
    }
  ];

  return (
    <div className="min-h-screen gradient-bg p-4 md:p-6 relative overflow-hidden">
      {/* Fixed Particles Container - Behind Content */}
      <div className="particles-container">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              width: `${Math.random() * 60 + 30}px`,
              height: `${Math.random() * 60 + 30}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${Math.random() * 20 + 10}s`,
            }}
          />
        ))}
      </div>

      {/* Compact Header */}
      <div className={`mb-6 md:mb-8 text-center transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        <div className="inline-flex items-center gap-2 mb-3 px-4 py-2 rounded-full glass-card border-glow shadow-glow">
          <Sparkles className="w-4 h-4 text-purple-500" />
          <span className="text-xs font-semibold text-purple-600">Lending Platform</span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-2">
          Smart Lending Hub
        </h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
          Manage your lending portfolio with AI-powered risk analysis
        </p>
      </div>

      <div className={`space-y-6 max-w-7xl mx-auto transform transition-all duration-700 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        
        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 stagger-animation">
          {stats.map((stat, index) => (
            <Card key={index} className="glass-card glass-card-hover border-glow shadow-premium group relative overflow-hidden">
              <CardContent className="p-4 md:p-6 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-1 flex items-center gap-2">
                      {stat.label}
                      <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                        stat.trend.startsWith('+') 
                          ? 'bg-green-100 text-green-700 border border-green-200' 
                          : 'bg-red-100 text-red-700 border border-red-200'
                      }`}>
                        {stat.trend}
                      </span>
                    </p>
                    <p className="text-2xl md:text-3xl font-bold text-foreground">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-2 md:p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg`}>
                    <stat.icon className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content - More Compact */}
        <div className="grid lg:grid-cols-2 gap-6">
          
          {/* Pool Management */}
          <Card className="glass-card border-glow shadow-premium">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 text-lg md:text-xl">
                <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-violet-600 text-white">
                  <Wallet className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                Capital Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Pool Utilization</span>
                  <span className="font-bold text-purple-600">74%</span>
                </div>
                <Progress value={74} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                  <p className="text-xs text-muted-foreground">Available</p>
                  <p className="text-lg font-bold text-green-600">₹6.3L</p>
                </div>
                <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <p className="text-xs text-muted-foreground">Interest Earned</p>
                  <p className="text-lg font-bold text-blue-600">₹68,420</p>
                </div>
              </div>

              <div className="space-y-2">
                <Button className="w-full btn-premium">
                  Add Liquidity
                </Button>
                <Button variant="outline" className="w-full">
                  Withdraw Earnings
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card className="glass-card border-glow shadow-premium">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 text-lg md:text-xl">
                <div className="p-2 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 text-white">
                  <TrendingUp className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "Repayment Rate", value: "96.5%", color: "green" },
                { label: "Avg Loan Size", value: "₹7,200", color: "purple" },
                { label: "Avg Duration", value: "45 days", color: "blue" },
                { label: "Default Rate", value: "3.5%", color: "amber" }
              ].map((metric, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/50 border">
                  <span className="font-medium text-sm">{metric.label}</span>
                  <span className={`font-bold text-${metric.color}-600`}>{metric.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Loan Requests */}
        <Card className="glass-card border-glow shadow-premium">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-3 text-lg md:text-xl">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
                <Users className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              Loan Requests
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                {loanRequests.length} New
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {loanRequests.map((request) => (
                <div 
                  key={request.id}
                  className="flex items-center justify-between p-4 rounded-xl border bg-white/50 hover:bg-white/80 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white ${
                      request.risk === 'low' ? 'bg-green-500' : 'bg-amber-500'
                    }`}>
                      {request.avatar}
                    </div>
                    <div>
                      <p className="font-semibold">{request.partner}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>Score: {request.score}</span>
                        <span>•</span>
                        <span>{request.deliveries} deliveries</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-bold text-lg">₹{request.amount.toLocaleString()}</p>
                      <Badge variant={request.risk === 'low' ? 'default' : 'secondary'} className="text-xs">
                        {request.risk} risk
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Review</Button>
                      <Button size="sm" className="bg-green-500 hover:bg-green-600">Approve</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full mt-4">
              View All Requests
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoanProviderDashboard;