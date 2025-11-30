import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Bike, Building2, Wallet } from "lucide-react";
import UserDashboard from "@/components/dashboard/UserDashboard"; 
import EmployeeDashboard from "@/components/dashboard/EmployeeDashboard"; 
import CompanyDashboard from "@/components/dashboard/CompanyDashboard";
import LoanProviderDashboard from "@/components/dashboard/LoanProviderDashboard";

const RoleSwitcher = ({ walletAddress }) => {
  const [activeRole, setActiveRole] = useState("partner");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Dashboard
          </h2>
          <p className="text-muted-foreground text-lg">Manage your delivery partner profile and finances</p>
        </div>
      </div>

      <Tabs value={activeRole} onValueChange={setActiveRole} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-secondary/50 p-2 rounded-xl">
          <TabsTrigger value="partner" className="data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground py-3 text-base">
            <Bike className="w-5 h-5 mr-2" />
            Delivery Partner
          </TabsTrigger>
          <TabsTrigger value="user" className="data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground py-3 text-base">
            <User className="w-5 h-5 mr-2" />
            Personal
          </TabsTrigger>
          <TabsTrigger value="platform" className="data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground py-3 text-base">
            <Building2 className="w-5 h-5 mr-2" />
            Platform Manager
          </TabsTrigger>
          <TabsTrigger value="lender" className="data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground py-3 text-base">
            <Wallet className="w-5 h-5 mr-2" />
            Lender
          </TabsTrigger>
        </TabsList>

        <TabsContent value="partner" className="mt-6">
          <EmployeeDashboard walletAddress={walletAddress} />
        </TabsContent>

        <TabsContent value="user" className="mt-6">
          <UserDashboard walletAddress={walletAddress} />
        </TabsContent>

        <TabsContent value="platform" className="mt-6">
          <CompanyDashboard walletAddress={walletAddress} />
        </TabsContent>

        <TabsContent value="lender" className="mt-6">
          <LoanProviderDashboard walletAddress={walletAddress} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RoleSwitcher;