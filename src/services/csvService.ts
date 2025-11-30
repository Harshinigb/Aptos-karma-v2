// src/services/csvService.ts
import { toast } from "@/hooks/use-toast";

// Import your CSV files
import usersData from '@/data/users.csv?raw';
import deliveriesData from '@/data/deliveries.csv?raw';
import loansData from '@/data/loans.csv?raw';

export interface User {
  id: string;
  walletAddress: string;
  creditScore: number;
  totalDeliveries: number;
  averageRating: number;
  patTokens: number;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  monthlyEarnings: number;
  onTimeRate: number;
}

export interface Delivery {
  id: string;
  userId: string;
  platform: string;
  ordersCount: number;
  averageRating: number;
  shift: string;
  date: string;
  status: 'pending' | 'verified' | 'rejected';
  patReward: number;
  earnings: number;
}

export interface Loan {
  id: string;
  userId: string;
  amount: number;
  duration: number;
  interestRate: number;
  totalRepayable: number;
  dueDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'disbursed' | 'repaid';
  appliedAt: string;
}

function parseCSV<T>(csvText: string): T[] {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',').map(header => header.trim());
  
  return lines.slice(1).map(line => {
    const values = line.split(',').map(value => value.trim());
    const obj: Record<string, string | number> = {}; // Fixed: Use Record instead of any
    
    headers.forEach((header, index) => {
      let value: string | number = values[index];
      
      // Convert numeric values
      if (['creditScore', 'totalDeliveries', 'averageRating', 'patTokens', 
           'monthlyEarnings', 'onTimeRate', 'ordersCount', 'patReward', 'earnings',
           'amount', 'duration', 'interestRate', 'totalRepayable'].includes(header)) {
        value = parseFloat(value);
      }
      
      obj[header] = value;
    });
    
    return obj as T;
  });
}

// Parse CSV data on module load
const users: User[] = parseCSV<User>(usersData);
const deliveries: Delivery[] = parseCSV<Delivery>(deliveriesData);
const loans: Loan[] = parseCSV<Loan>(loansData);

// Simulate API delay for realistic UX
const simulateDelay = (ms: number = 500) => 
  new Promise(resolve => setTimeout(resolve, ms));

export const csvService = {
  // User operations
  async getUserByWallet(walletAddress: string): Promise<User | null> {
    await simulateDelay(300);
    return users.find(user => 
      user.walletAddress.toLowerCase() === walletAddress.toLowerCase()
    ) || null;
  },

  async getAllUsers(): Promise<User[]> {
    await simulateDelay(400);
    return users;
  },

  // Delivery operations
  async getDeliveriesByUser(userId: string): Promise<Delivery[]> {
    await simulateDelay(400);
    return deliveries.filter(delivery => delivery.userId === userId);
  },

  async addDelivery(delivery: Omit<Delivery, 'id'>): Promise<Delivery> {
    await simulateDelay(600);
    
    const newDelivery: Delivery = {
      ...delivery,
      id: Date.now().toString(),
    };
    
    // Add to memory array
    deliveries.push(newDelivery);
    
    toast({
      title: "Delivery Logged Successfully",
      description: `Added ${delivery.ordersCount} deliveries from ${delivery.platform}`,
    });
    
    return newDelivery;
  },

  // Loan operations
  async getLoansByUser(userId: string): Promise<Loan[]> {
    await simulateDelay(400);
    return loans.filter(loan => loan.userId === userId);
  },

  async applyForLoan(application: {
    userId: string;
    amount: number;
    duration: number;
  }): Promise<Loan> {
    await simulateDelay(800);
    
    const user = users.find(u => u.id === application.userId);
    const interestRate = user?.tier === 'platinum' ? 2.0 : 
                        user?.tier === 'gold' ? 2.2 : 
                        user?.tier === 'silver' ? 2.5 : 3.0;
    
    const interestAmount = application.amount * (interestRate / 100) * (application.duration / 30);
    const totalRepayable = application.amount + interestAmount;
    
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + application.duration);
    
    const newLoan: Loan = {
      id: Date.now().toString(),
      userId: application.userId,
      amount: application.amount,
      duration: application.duration,
      interestRate,
      totalRepayable,
      dueDate: dueDate.toISOString().split('T')[0],
      status: 'approved',
      appliedAt: new Date().toISOString().split('T')[0],
    };
    
    loans.push(newLoan);
    
    toast({
      title: "Loan Application Submitted",
      description: `Your loan of ₹${application.amount} has been approved!`,
    });
    
    return newLoan;
  },

  // Analytics and stats
  async getUserStats(userId: string) {
    await simulateDelay(500);
    const userDeliveries = await this.getDeliveriesByUser(userId);
    const userLoans = await this.getLoansByUser(userId);
    
    const totalEarnings = userDeliveries.reduce((sum, d) => sum + d.earnings, 0);
    const totalPAT = userDeliveries.reduce((sum, d) => sum + d.patReward, 0);
    const activeLoans = userLoans.filter(loan => 
      ['approved', 'disbursed'].includes(loan.status)
    );
    
    return {
      totalEarnings,
      totalPAT,
      activeLoans: activeLoans.length,
      completedDeliveries: userDeliveries.filter(d => d.status === 'verified').length,
    };
  },
};