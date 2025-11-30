// src/hooks/useCSVData.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { csvService, User, Delivery, Loan } from '@/services/csvService';

export const useUserProfile = (walletAddress: string) => {
  return useQuery({
    queryKey: ['user', walletAddress],
    queryFn: () => csvService.getUserByWallet(walletAddress),
    enabled: !!walletAddress,
  });
};

export const useUserDeliveries = (userId: string) => {
  return useQuery({
    queryKey: ['deliveries', userId],
    queryFn: () => csvService.getDeliveriesByUser(userId),
    enabled: !!userId,
  });
};

export const useUserLoans = (userId: string) => {
  return useQuery({
    queryKey: ['loans', userId],
    queryFn: () => csvService.getLoansByUser(userId),
    enabled: !!userId,
  });
};

export const useDeliveryLog = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: csvService.addDelivery,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deliveries'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export const useLoanApplication = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: csvService.applyForLoan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loans'] });
    },
  });
};

export const useUserStats = (userId: string) => {
  return useQuery({
    queryKey: ['stats', userId],
    queryFn: () => csvService.getUserStats(userId),
    enabled: !!userId,
  });
};