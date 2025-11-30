// App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index.jsx";
import NotFound from "./pages/NotFound";
import LoanApplication from "./components/LoanApplication";
import LoginPage from "./components/LoginPage";

const queryClient = new QueryClient();

// Mock user database (in real app, this would be from backend)
const mockUsers = [
  {
    id: "1",
    email: "rajesh@example.com",
    password: "password123",
    walletAddress: "0x742d35Cc6634C0532925a3b8D",
    name: "Rajesh Kumar"
  },
  {
    id: "2", 
    email: "amit@example.com",
    password: "password123",
    walletAddress: "0x89205A3A3b2A69De6Dbf7f01ED",
    name: "Amit Singh"
  },
  {
    id: "3",
    email: "priya@example.com", 
    password: "password123",
    walletAddress: "0xde0B295669a9FD93d5F28D9Ec",
    name: "Priya Sharma"
  }
];

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    // Store user in localStorage for persistence
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    if (isLoading) {
      return (
        <div className="min-h-screen gradient-bg flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-800"></div>
        </div>
      );
    }
    
    return currentUser ? children : <Navigate to="/login" replace />;
  };

  // Public Route component (redirect to home if already logged in)
  const PublicRoute = ({ children }) => {
    if (isLoading) {
      return (
        <div className="min-h-screen gradient-bg flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      );
    }
    
    return currentUser ? <Navigate to="/" replace /> : children;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <LoginPage 
                    onLogin={handleLogin} 
                    mockUsers={mockUsers} 
                  />
                </PublicRoute>
              } 
            />
            
            {/* Protected routes */}
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <Index 
                    walletAddress={currentUser?.walletAddress} 
                    currentUser={currentUser}
                    onLogout={handleLogout}
                  />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/apply-loan" 
              element={
                <ProtectedRoute>
                  <LoanApplication 
                    walletAddress={currentUser?.walletAddress} 
                    currentUser={currentUser}
                  />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch all route - redirect to login if not authenticated */}
            <Route 
              path="*" 
              element={
                currentUser ? <NotFound /> : <Navigate to="/login" replace />
              } 
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;