// src/components/dashboard/CompanyDashboard.jsx
import { Building2, Users, CheckCircle, Clock, TrendingUp, AlertCircle, Award, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CompanyDashboard = ({ walletAddress }) => {
  // Mock platform data
  const pendingVerifications = [
    { id: 1, partner: "Rajesh Kumar", deliveries: 12, shift: "Evening", rating: 5.0, platform: "Swiggy" },
    { id: 2, partner: "Amit Singh", deliveries: 8, shift: "Morning", rating: 4.8, platform: "Zomato" },
    { id: 3, partner: "Priya Sharma", deliveries: 15, shift: "Weekend", rating: 5.0, platform: "Swiggy" },
  ];

  const topPerformers = [
    { name: "Rajesh Kumar", deliveries: 342, rating: 4.9, earnings: 34200 },
    { name: "Amit Singh", deliveries: 318, rating: 4.8, earnings: 31800 },
    { name: "Priya Sharma", deliveries: 295, rating: 5.0, earnings: 29500 },
  ];

  return (
    <div className="min-h-screen gradient-bg p-6">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gradient">
          Partner Management
        </h1>
        <p className="text-muted-foreground mt-3 text-lg">
          Monitor and manage your delivery partners with elegance
        </p>
      </div>

      <div className="space-y-8 max-w-7xl mx-auto animate-slide-up">
        {/* Platform Stats */}
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { 
              label: "Active Partners", 
              value: "1,247", 
              icon: Users, 
              color: "from-purple-500 to-violet-600",
              trend: "+12%"
            },
            { 
              label: "Verified Today", 
              value: "342", 
              icon: CheckCircle, 
              color: "from-green-400 to-emerald-600",
              trend: "+5%"
            },
            { 
              label: "Pending Review", 
              value: "28", 
              icon: Clock, 
              color: "from-amber-400 to-orange-500",
              trend: "-3%"
            },
            { 
              label: "Avg Rating", 
              value: "4.8", 
              icon: Star, 
              color: "from-pink-400 to-rose-500",
              trend: "+0.2"
            }
          ].map((stat, index) => (
            <Card key={index} className="glass-card hover-lift group border-glow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                      {stat.label}
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        stat.trend.startsWith('+') 
                          ? 'bg-green-100 text-green-700 border border-green-200' 
                          : 'bg-amber-100 text-amber-700 border border-amber-200'
                      }`}>
                        {stat.trend}
                      </span>
                    </p>
                    <p className="text-3xl font-bold text-foreground">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Pending Verifications - 2/3 width */}
          <div className="lg:col-span-2">
            <Card className="glass-card hover-lift border-glow">
              <CardHeader className="pb-4 border-b border-border/50">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-2 rounded-lg bg-amber-100 text-amber-600 border border-amber-200">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    Pending Verifications
                    <Badge variant="secondary" className="ml-3 bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200">
                      {pendingVerifications.length} pending
                    </Badge>
                  </div>
                </CardTitle>
                <CardDescription className="text-base pt-2">
                  Review and verify partner deliveries to update credit scores
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {pendingVerifications.map((item) => (
                    <div 
                      key={item.id}
                      className="flex items-center justify-between p-5 rounded-xl border border-border/50 bg-white/50 hover:border-amber-300 hover:bg-amber-50/30 transition-all duration-300 group hover-lift"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-lg">
                          <Clock className="w-6 h-6" />
                        </div>
                        
                        <div>
                          <p className="font-semibold text-foreground text-lg">{item.partner}</p>
                          <div className="flex items-center gap-3 mt-2 flex-wrap">
                            <p className="text-sm text-muted-foreground">{item.deliveries} orders • {item.shift}</p>
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              {item.platform}
                            </Badge>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                              <span className="text-sm font-semibold text-foreground">{item.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Button size="sm" variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300">
                          Reject
                        </Button>
                        <Button size="sm" className="bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/25 hover:shadow-green-500/40">
                          Verify
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full mt-6 border-dashed border-2 border-border/50 hover:border-solid hover:border-primary/50 hover:bg-primary/5">
                  View All Pending ({pendingVerifications.length})
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - 1/3 width */}
          <div className="space-y-8">
            {/* Platform Health */}
            <Card className="glass-card hover-lift border-glow">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 rounded-lg bg-green-100 text-green-600 border border-green-200">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  Platform Health
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "On-Time Delivery", value: "97.5%", icon: CheckCircle, color: "green" },
                  { label: "Customer Satisfaction", value: "4.8/5", icon: Star, color: "purple" },
                  { label: "Partner Retention", value: "92%", icon: Users, color: "violet" },
                  { label: "Issues Reported", value: "12", icon: AlertCircle, color: "amber" }
                ].map((metric, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 rounded-xl border transition-all duration-200 hover:shadow-md bg-white/50"
                    style={{
                      borderColor: `var(--${metric.color}-200)`,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-${metric.color}-100 text-${metric.color}-600`}>
                        <metric.icon className="w-4 h-4" />
                      </div>
                      <span className="font-medium text-foreground">{metric.label}</span>
                    </div>
                    <span className={`font-bold text-${metric.color}-600 text-lg`}>{metric.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Top Performers */}
            <Card className="glass-card hover-lift border-glow">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 rounded-lg bg-purple-100 text-purple-600 border border-purple-200">
                    <Award className="w-5 h-5" />
                  </div>
                  Top Performers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPerformers.map((performer, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-4 rounded-xl bg-white/50 border border-border/50 hover:bg-white/80 hover:border-purple-200 transition-all duration-300 group hover-lift"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{performer.name}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{performer.deliveries} orders</span>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                              <span>{performer.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">₹{performer.earnings.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">earned</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full mt-6 border-dashed border-2 border-border/50 hover:border-solid hover:border-primary/50 hover:bg-primary/5">
                  View All Partners
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;