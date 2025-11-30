// src/pages/Index.jsx
import { useState, useEffect } from "react";
import WelcomeScreen from "@/components/WelcomeScreen";
import RoleSwitcher from "@/components/roles/RoleSwitcher";
import { Bike, Sparkles, Shield, Zap, Crown, LogOut, User } from "lucide-react";

const Index = ({ walletAddress, currentUser, onLogout }) => {
  const [isConnected, setIsConnected] = useState(!!walletAddress);
  const [userName, setUserName] = useState('');

  // Debug logs to help identify the issue
  useEffect(() => {
    console.log("🔍 Index Component - currentUser:", currentUser);
    console.log("🔍 Index Component - walletAddress:", walletAddress);
    console.log("🔍 Index Component - isConnected:", isConnected);
    
    // Extract user name from currentUser
    if (currentUser) {
      const name = currentUser.name || 
                  currentUser.email?.split('@')[0] || 
                  'Delivery Partner';
      console.log("🔍 Extracted userName:", name);
      setUserName(name);
    }
  }, [currentUser, walletAddress, isConnected]);

  const handleConnect = (address) => {
    setIsConnected(true);
  };

  if (!isConnected) {
    return <WelcomeScreen onConnect={handleConnect} />;
  }

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      {/* Animated Background */}
      <div className="particles-container">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              width: `${Math.random() * 40 + 20}px`,
              height: `${Math.random() * 40 + 20}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 15 + 10}s`,
            }}
          />
        ))}
      </div>

      {/* Premium Header */}
      <header className="border-b border-border/50 backdrop-blur-xl bg-card/50 sticky top-0 z-50 glass-card border-glow">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center shadow-glow pulse-glow">
                <Bike className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="absolute -top-1 -right-1">
                <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
              </div>
            </div>
            
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                RideCredits
              </h1>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Zap className="w-3 h-3 text-purple-500" />
                Welcome, <span className="font-semibold text-foreground capitalize">{currentUser?.name || currentUser?.email?.split('@')[0] || 'Delivery Partner'}</span>
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* User Info Card - Simplified */}
            <div className="px-4 py-3 rounded-xl glass-card border-glow shadow-premium hover:shadow-glow transition-all duration-300 group">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-green-100 text-green-600">
                  <User className="w-3 h-3" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Logged in as</p>
                  <p className="text-sm font-medium text-foreground group-hover:text-purple-600 transition-colors duration-300">
                    {currentUser?.email || 'Unknown User'}
                  </p>
                </div>
              </div>
            </div>

            {/* Wallet Address Card - Simplified */}
            <div className="px-4 py-3 rounded-xl glass-card border-glow shadow-premium hover:shadow-glow transition-all duration-300 group">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-blue-100 text-blue-600">
                  <Shield className="w-3 h-3" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Wallet</p>
                  <p className="text-sm font-mono font-medium text-foreground group-hover:text-purple-600 transition-colors duration-300">
                    {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Not connected'}
                  </p>
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <button 
              onClick={onLogout}
              className="inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>

            {/* Premium Badge */}
            
           <a 
  href="../src/components/index.html"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center justify-center w-12 h-12 rounded-xl glass-card border-glow shadow-premium hover:shadow-glow hover:scale-110 hover:bg-white/30 transition-all duration-300 group relative bg-gradient-to-br from-white/60 to-white/40 border border-white/50"
  title="Open Petra Wallet"
>
  <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300" />
  <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-400 opacity-0 group-hover:opacity-10 rounded-xl transition-opacity" />
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.8"
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="w-6 h-6 text-gray-800 group-hover:text-purple-700 group-hover:drop-shadow-sm transition-all duration-300"
  >
    <path d="M21 8v13H3V8" />
    <path d="M1 3h22v5H1z" />
    <path d="M10 12h4" />
  </svg>
</a>

<div className="px-3 py-2 rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold shadow-lg flex items-center gap-1">
              <Crown className="w-3 h-3" />
              PRO
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="transform transition-all duration-700 animate-slide-up">
          <RoleSwitcher walletAddress={walletAddress} currentUser={currentUser} />
        </div>
      </main>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.4); }
          50% { box-shadow: 0 0 30px rgba(139, 92, 246, 0.8); }
        }
        .pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default Index;