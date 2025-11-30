import { Award, Plus, Clock, CheckCircle, Bike, Star, TrendingUp, Sparkles, Zap, Crown, Target, Gem, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { useUserProfile, useUserDeliveries, useDeliveryLog, useUserStats } from "@/hooks/useCSVData";

const EmployeeDashboard = ({ walletAddress }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [deliveryForm, setDeliveryForm] = useState({
    platform: "swiggy",
    ordersCount: "",
    averageRating: "",
    shift: ""
  });

  const { data: user, isLoading: userLoading } = useUserProfile(walletAddress);
  const { data: deliveries = [], isLoading: deliveriesLoading } = useUserDeliveries(user?.id);
  const { data: stats } = useUserStats(user?.id);
  const deliveryMutation = useDeliveryLog();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (field, value) => {
    setDeliveryForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitDelivery = async (e) => {
    e.preventDefault();
    if (!user || !deliveryForm.ordersCount || !deliveryForm.averageRating) return;

    try {
      await deliveryMutation.mutateAsync({
        userId: user.id,
        platform: deliveryForm.platform,
        ordersCount: parseInt(deliveryForm.ordersCount),
        averageRating: parseFloat(deliveryForm.averageRating),
        shift: deliveryForm.shift || "regular",
        date: new Date().toISOString().split('T')[0],
        status: 'pending',
        patReward: parseInt(deliveryForm.ordersCount) * 10,
        earnings: parseInt(deliveryForm.ordersCount) * 150,
      });

      // Reset form
      setDeliveryForm({
        platform: "swiggy",
        ordersCount: "",
        averageRating: "",
        shift: ""
      });
    } catch (error) {
      console.error("Failed to submit delivery:", error);
    }
  };

  // Stats based on real data
  const statsData = [
    { 
      label: "Total Deliveries", 
      value: user?.totalDeliveries?.toString() || "0", 
      icon: Bike, 
      color: "from-purple-500 to-violet-600",
      trend: "+45",
      description: "Lifetime deliveries"
    },
    { 
      label: "Avg Rating", 
      value: user?.averageRating?.toString() || "0.0", 
      icon: Star, 
      color: "from-amber-400 to-orange-500",
      trend: "+0.1",
      description: "Customer satisfaction"
    },
    { 
      label: "This Month", 
      value: stats?.completedDeliveries?.toString() || "0", 
      icon: TrendingUp, 
      color: "from-green-400 to-emerald-600",
      trend: "+28",
      description: "Current month progress"
    },
    { 
      label: "PAT Earned", 
      value: user?.patTokens?.toLocaleString() || "0", 
      icon: Award, 
      color: "from-blue-400 to-cyan-600",
      trend: "+1,240",
      description: "Total rewards earned"
    }
  ];

  if (userLoading) {
    return (
      <div className="min-h-screen gradient-bg p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg p-4 md:p-6 relative overflow-hidden">
      {/* Animated Background */}
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

      {/* Premium Header */}
      <div className={`mb-6 md:mb-8 text-center transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        <div className="inline-flex items-center gap-2 mb-3 px-4 py-2 rounded-full glass-card border-glow shadow-glow">
          <Sparkles className="w-4 h-4 text-purple-500" />
          <span className="text-xs font-semibold text-purple-600">Delivery Partner Dashboard</span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-2">
          Welcome, {user?.name?.split(' ')[0] || 'Delivery Partner'}
        </h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
          Track your deliveries, build your credit score, and earn rewards
        </p>
      </div>

      <div className={`space-y-6 max-w-7xl mx-auto transform transition-all duration-700 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        
        {/* Premium Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 stagger-animation">
          {statsData.map((stat, index) => (
            <Card key={index} className="glass-card glass-card-hover border-glow shadow-premium group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardContent className="p-4 md:p-6 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                      {stat.label}
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
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
                    <p className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {stat.description}
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Log New Delivery - Premium */}
        <Card className="glass-card border-glow shadow-premium hover:shadow-glow transition-all duration-500 overflow-hidden">
          <CardHeader className="pb-4 border-b border-border/50 bg-gradient-to-r from-white to-purple-50/30">
            <CardTitle className="flex items-center gap-4 text-xl md:text-2xl">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 text-white shadow-lg pulse-glow">
                <Plus className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                Log Delivery Proof
                <CardDescription className="text-base pt-2">
                  Record completed deliveries to build credit score and earn PAT tokens
                </CardDescription>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmitDelivery}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Target className="w-4 h-4 text-purple-500" />
                      Platform
                    </label>
                    <select 
                      value={deliveryForm.platform}
                      onChange={(e) => handleInputChange('platform', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/80 border border-border/50 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                      <option value="swiggy">Swiggy</option>
                      <option value="zomato">Zomato</option>
                      <option value="dunzo">Dunzo</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Zap className="w-4 h-4 text-purple-500" />
                      Number of Orders
                    </label>
                    <input 
                      type="number" 
                      placeholder="e.g., 12"
                      value={deliveryForm.ordersCount}
                      onChange={(e) => handleInputChange('ordersCount', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/80 border border-border/50 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-300 shadow-sm hover:shadow-md"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Star className="w-4 h-4 text-purple-500 fill-purple-500" />
                      Average Rating Received
                    </label>
                    <input 
                      type="number" 
                      step="0.1"
                      min="1"
                      max="5"
                      placeholder="e.g., 4.8"
                      value={deliveryForm.averageRating}
                      onChange={(e) => handleInputChange('averageRating', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/80 border border-border/50 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-300 shadow-sm hover:shadow-md"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Clock className="w-4 h-4 text-purple-500" />
                      Shift Details
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Evening peak hours"
                      value={deliveryForm.shift}
                      onChange={(e) => handleInputChange('shift', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/80 border border-border/50 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-300 shadow-sm hover:shadow-md"
                    />
                  </div>
                </div>
              </div>

              <Button 
                type="submit"
                disabled={deliveryMutation.isPending}
                className="w-full mt-6 btn-premium gradient-primary text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {deliveryMutation.isPending ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Plus className="w-5 h-5 mr-2" />
                    Submit Proof of Delivery
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Delivery History - Premium */}
        <Card className="glass-card border-glow shadow-premium hover:shadow-glow transition-all duration-500 overflow-hidden">
          <CardHeader className="pb-4 border-b border-border/50 bg-gradient-to-r from-white to-blue-50/30">
            <CardTitle className="flex items-center gap-4 text-xl md:text-2xl">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 text-white shadow-lg">
                <Award className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                Your Delivery History
                <Badge variant="secondary" className="ml-3 bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200 text-sm py-1 px-3">
                  <Sparkles className="w-3 h-3 mr-1" />
                  {deliveries.length} Records
                </Badge>
              </div>
            </CardTitle>
            <CardDescription className="text-base pt-2">
              Complete record of verified deliveries and earnings
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {deliveriesLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {deliveries.map((delivery, index) => (
                  <div 
                    key={delivery.id}
                    className="flex items-center justify-between p-5 rounded-2xl border border-border/50 bg-white/60 hover:bg-white/80 hover:border-purple-300/50 transition-all duration-500 group hover-lift shadow-premium hover:shadow-glow"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg ${
                          delivery.status === 'verified' 
                            ? 'bg-gradient-to-br from-green-400 to-emerald-500' 
                            : 'bg-gradient-to-br from-amber-400 to-orange-500'
                        }`}>
                          {delivery.status === 'verified' ? (
                            <CheckCircle className="w-6 h-6" />
                          ) : (
                            <Clock className="w-6 h-6" />
                          )}
                        </div>
                        {delivery.status === 'verified' && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                            <CheckCircle className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <p className="font-bold text-foreground text-lg">
                          {delivery.platform.charAt(0).toUpperCase() + delivery.platform.slice(1)} Delivery ({delivery.ordersCount} orders)
                        </p>
                        <div className="flex items-center gap-3 mt-2 flex-wrap">
                          <p className="text-sm text-muted-foreground">{delivery.date} • {delivery.shift}</p>
                          <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-full border border-amber-200">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <span className="text-xs font-semibold text-amber-700">{delivery.averageRating}</span>
                          </div>
                          <div className="flex items-center gap-1 bg-purple-50 px-2 py-1 rounded-full border border-purple-200">
                            <Award className="w-3 h-3 text-purple-600" />
                            <span className="text-xs font-semibold text-purple-700">+{delivery.patReward} PAT</span>
                          </div>
                          <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full border border-green-200">
                            <span className="text-xs font-semibold text-green-700">₹{delivery.earnings}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <Badge 
                        variant={delivery.status === 'verified' ? 'default' : 'secondary'} 
                        className={`${
                          delivery.status === 'verified' 
                            ? 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200' 
                            : 'bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200'
                        } font-semibold px-3 py-1`}
                      >
                        {delivery.status === 'verified' ? (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        ) : (
                          <Clock className="w-3 h-3 mr-1" />
                        )}
                        {delivery.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {deliveries.length === 0 && !deliveriesLoading && (
              <div className="text-center py-8">
                <Bike className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No delivery records found</p>
                <p className="text-sm text-muted-foreground mt-1">Start by logging your first delivery above</p>
              </div>
            )}

            <Button variant="outline" className="w-full mt-6 border-dashed border-2 border-purple-200 text-purple-600 hover:border-solid hover:border-purple-400 hover:bg-purple-50/50 transition-all duration-300 py-3 rounded-xl font-semibold">
              <Bike className="w-4 h-4 mr-2" />
              View Complete Delivery History
            </Button>
          </CardContent>
        </Card>

        {/* Performance Insights */}
        <Card className="glass-card border-glow shadow-premium hover:shadow-glow transition-all duration-500 overflow-hidden">
          <CardHeader className="pb-4 bg-gradient-to-r from-white to-green-50/30">
            <CardTitle className="flex items-center gap-4 text-xl md:text-2xl">
              <div className="p-3 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-lg">
                <TrendingUp className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              Performance Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { 
                  title: "On-Time Delivery", 
                  value: `${user?.onTimeRate || 0}%`, 
                  description: "Excellent timing", 
                  color: "green"
                },
                { 
                  title: "Customer Rating", 
                  value: `${user?.averageRating || 0}/5`, 
                  description: "Top performer", 
                  color: "amber"
                },
                { 
                  title: "Credit Score", 
                  value: user?.creditScore?.toString() || "0", 
                  description: "Financial health", 
                  color: "purple"
                }
              ].map((insight, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-xl border border-border/50 bg-white/50 hover:bg-white/80 hover:shadow-md transition-all duration-300 group text-center"
                >
                  <p className="text-2xl md:text-3xl font-bold text-foreground mb-1 group-hover:scale-110 transition-transform duration-300">
                    {insight.value}
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">{insight.title}</p>
                  <span className={`text-xs px-2 py-1 rounded-full font-semibold bg-${insight.color}-100 text-${insight.color}-700 border border-${insight.color}-200`}>
                    {insight.description}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeDashboard;