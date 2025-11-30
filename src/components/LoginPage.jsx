// src/components/LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bike, Wallet, Shield, Sparkles, Eye, EyeOff } from "lucide-react";

const LoginPage = ({ onLogin, mockUsers }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    walletAddress: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      if (isLogin) {
        // Login logic
        const user = mockUsers.find(u => 
          u.email === formData.email && u.password === formData.password
        );
        
        if (user) {
          onLogin(user);
          navigate("/");
        } else {
          setError("Invalid email or password");
        }
      } else {
        // Signup logic
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords don't match");
          setIsLoading(false);
          return;
        }

        // Check if user already exists
        const existingUser = mockUsers.find(u => u.email === formData.email);
        if (existingUser) {
          setError("User with this email already exists");
          setIsLoading(false);
          return;
        }

        const newUser = {
          id: Date.now().toString(),
          email: formData.email,
          password: formData.password,
          walletAddress: formData.walletAddress || `0x${Math.random().toString(16).slice(2, 42)}`,
          name: formData.email.split('@')[0]
        };

        // In real app, you'd save to backend
        mockUsers.push(newUser);
        onLogin(newUser);
        navigate("/");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-lg">
              <Bike className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gradient mb-2">RideCredits</h1>
          <p className="text-muted-foreground">Financial freedom for delivery heroes</p>
        </div>

        {/* Login/Signup Card */}
        <Card className="glass-card border-glow shadow-premium">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              {isLogin ? "Welcome Back" : "Create Account"}
            </CardTitle>
            <CardDescription>
              {isLogin 
                ? "Sign in to access your dashboard" 
                : "Join thousands of delivery partners"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  className="w-full"
                />
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="walletAddress">
                    <div className="flex items-center gap-2">
                      <Wallet className="w-4 h-4" />
                      Wallet Address (Optional)
                    </div>
                  </Label>
                  <Input
                    id="walletAddress"
                    placeholder="0x..."
                    value={formData.walletAddress}
                    onChange={(e) => handleInputChange('walletAddress', e.target.value)}
                    className="w-full font-mono"
                  />
                  <p className="text-xs text-muted-foreground">
                    Leave empty to auto-generate a wallet address
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    required
                    className="w-full pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    required
                    className="w-full"
                  />
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full gradient-primary text-white py-3"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  isLogin ? "Sign In" : "Create Account"
                )}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError("");
                    setFormData({
                      email: "",
                      password: "",
                      confirmPassword: "",
                      walletAddress: ""
                    });
                  }}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {isLogin 
                    ? "Don't have an account? Sign up" 
                    : "Already have an account? Sign in"
                  }
                </button>
              </div>
            </form>

            
          </CardContent>
        </Card>

        {/* Security Note */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4" />
            Your data is secure and encrypted
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;