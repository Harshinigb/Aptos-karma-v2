import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bike, Shield, TrendingUp, Wallet, Zap, Award, Sparkles, Rocket, Star, Crown, Gem, Target, Users, Clock, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

const WelcomeScreen = ({ onConnect }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleConnectWallet = () => {
    const mockAddress = "0x" + Math.random().toString(16).slice(2, 42);
    onConnect(mockAddress);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Premium Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Gradient Orbs */}
        <div className="absolute top-1/4 -left-10 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/3 -right-10 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.1)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-16">
        {/* Premium Hero Section */}
        <div className={`text-center mb-16 md:mb-24 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Animated Logo */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="relative">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-gradient-to-br from-purple-500 via-violet-600 to-purple-700 flex items-center justify-center shadow-2xl shadow-purple-500/30 animate-pulse-glow">
                <Bike className="w-10 h-10 md:w-12 md:h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-6 h-6 text-yellow-400 animate-spin" />
              </div>
            </div>
          </div>
          
          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-purple-600 via-violet-600 to-pink-600 bg-clip-text text-transparent leading-tight">
            RideCredits
          </h1>
          
          {/* Tagline */}
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg mb-6">
            <Rocket className="w-5 h-5 text-purple-600" />
            <span className="text-lg font-semibold text-purple-700">Financial Freedom for Delivery Heroes</span>
          </div>
          
          {/* Description */}
          <p className="text-2xl md:text-3xl text-gray-700 max-w-4xl mx-auto mb-6 font-medium leading-relaxed">
            Transform Your <span className="text-purple-600 font-bold">Delivery Journey</span> into <span className="text-violet-600 font-bold">Wealth Creation</span>
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Every delivery builds your future. Access instant loans, earn crypto rewards, and build credit history through verified work.
          </p>
        </div>

        {/* Premium Connect Wallet Card */}
        <div className={`max-w-lg mx-auto mb-20 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'}`}>
          <Card className="glass-card border-glow shadow-super-premium hover:shadow-mega-glow transition-all duration-500 overflow-hidden relative">
            {/* Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5" />
            
            <CardHeader className="text-center relative z-10 pb-6">
              <div className="relative inline-block mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center mx-auto shadow-xl">
                  <Wallet className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                Start Your Journey
              </CardTitle>
              <CardDescription className="text-lg text-gray-600 mt-2">
                Connect your wallet to unlock your financial potential
              </CardDescription>
            </CardHeader>
            
            <CardContent className="relative z-10">
              <button
                onClick={handleConnectWallet}
                onMouseEnter={() => setIsButtonHovered(true)}
                onMouseLeave={() => setIsButtonHovered(false)}
                className="relative w-full group"
              >
                {/* Outer Glow */}
                <div className={`absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-70 transition-all duration-500 ${
                  isButtonHovered ? 'scale-105' : 'scale-100'
                }`} />
                
                {/* Main Button */}
                <div className={`
                  relative bg-gradient-to-br from-purple-600 via-purple-500 to-violet-600 
                  text-white rounded-2xl p-1 shadow-2xl transition-all duration-500
                  transform hover:scale-[1.02] hover:shadow-3xl border border-white/20
                  ${isButtonHovered ? 'shadow-purple-500/40' : 'shadow-purple-500/25'}
                `}>
                  {/* Shine Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  
                  <div className="relative p-6 rounded-xl bg-gradient-to-br from-purple-600/90 to-violet-600/90 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl bg-white/20 transform transition-all duration-500 ${
                          isButtonHovered ? 'scale-110 rotate-12' : 'scale-100 rotate-0'
                        }`}>
                          <Wallet className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-xl">Connect Wallet</p>
                          <p className="text-white/80 text-sm">Access Your Dashboard</p>
                        </div>
                      </div>
                      <Rocket className={`w-6 h-6 text-white/80 transition-transform duration-500 ${
                        isButtonHovered ? 'translate-x-2' : 'translate-x-0'
                      }`} />
                    </div>
                  </div>
                </div>
              </button>
              
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  Secure • Fast • No Fees
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Supports Petra, Martian, Pontem, and all Aptos wallets
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Premium Features Grid */}
        <div className="max-w-7xl mx-auto mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg mb-4">
              <Crown className="w-5 h-5 text-purple-600" />
              <span className="text-lg font-semibold text-purple-700">Why Choose RideCredits?</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent mb-4">
              Built for Delivery Heroes
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 stagger-animation">
            {[
              {
                icon: Shield,
                title: "Proof of Delivery",
                description: "Every completed delivery builds your on-chain reputation score. Verified by blockchain, trusted by lenders worldwide.",
                color: "from-purple-500 to-violet-600",
                features: ["Blockchain Verified", "Immutable Records", "Trust Score"]
              },
              {
                icon: TrendingUp,
                title: "Instant Micro-Loans",
                description: "Need emergency funds? Access collateral-free loans instantly based on your verified delivery history and ratings.",
                color: "from-green-400 to-emerald-600",
                features: ["0 Collateral", "Instant Approval", "Low Rates"]
              },
              {
                icon: Zap,
                title: "Earn PAT Rewards",
                description: "Get PAT tokens for every delivery, bonus for 5-star ratings, and extra rewards for consistency milestones.",
                color: "from-amber-400 to-orange-500",
                features: ["Crypto Rewards", "Bonus Tokens", "Milestone Rewards"]
              }
            ].map((feature, index) => (
              <Card key={index} className="glass-card border-glow shadow-premium hover:shadow-glow transition-all duration-500 group hover-lift">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
                  
                  <div className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-500">
                        <div className="w-2 h-2 bg-purple-500 rounded-full" />
                        {item}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Premium How It Works */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg mb-4">
              <Target className="w-5 h-5 text-purple-600" />
              <span className="text-lg font-semibold text-purple-700">Get Started in 3 Steps</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent mb-4">
              How It Works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-20 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>
            
            {[
              {
                step: "1",
                title: "Complete Deliveries",
                description: "Every order you deliver on Swiggy, Zomato, or any platform gets securely recorded on blockchain",
                icon: Bike
              },
              {
                step: "2",
                title: "Build Credit Score",
                description: "Your ratings, consistency, and work history automatically improve your financial credibility",
                icon: Star
              },
              {
                step: "3",
                title: "Access Benefits",
                description: "Borrow instantly, earn PAT rewards, and unlock premium partner tiers with better rates",
                icon: Award
              }
            ].map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-xl text-2xl font-bold text-white transform group-hover:scale-110 transition-transform duration-300">
                    {step.step}
                  </div>
                  <div className="absolute -top-2 -right-2">
                    <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
                  </div>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg flex items-center justify-center mx-auto mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { number: "10K+", label: "Active Partners" },
              { number: "₹5Cr+", label: "Loans Disbursed" },
              { number: "4.9★", label: "Partner Rating" },
              { number: "99.8%", label: "Success Rate" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-purple-600 mb-1">{stat.number}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add custom animations to your CSS */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(1deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.4); }
          50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.8); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .shadow-super-premium {
          box-shadow: 0 25px 50px -12px rgba(139, 92, 246, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1);
        }
        .shadow-mega-glow {
          box-shadow: 0 35px 60px -12px rgba(139, 92, 246, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
};

export default WelcomeScreen;