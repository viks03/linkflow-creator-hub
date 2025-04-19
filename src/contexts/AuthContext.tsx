
import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '@/types';
import { DEMO_USER_PROFILE } from '@/constants';
import { toast } from '@/components/ui/use-toast';

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string) => Promise<void>;
  logout: () => void;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login functionality - in a real app, this would call an API
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any email with a password
      if (password.length < 6) {
        toast({
          title: "Login failed",
          description: "Password must be at least 6 characters long",
          variant: "destructive"
        });
        throw new Error("Invalid credentials");
      }
      
      const userProfile = { ...DEMO_USER_PROFILE, email };
      localStorage.setItem('user', JSON.stringify(userProfile));
      
      setUser(userProfile);
      setIsAuthenticated(true);
      
      toast({
        title: "Login successful",
        description: "Welcome to your dashboard!",
      });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, username: string, password: string) => {
    // Mock registration functionality
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (password.length < 6) {
        toast({
          title: "Registration failed",
          description: "Password must be at least 6 characters long",
          variant: "destructive"
        });
        throw new Error("Password too short");
      }
      
      const userProfile = { 
        ...DEMO_USER_PROFILE, 
        email, 
        username,
        id: `user_${Date.now()}`
      };
      
      localStorage.setItem('user', JSON.stringify(userProfile));
      
      setUser(userProfile);
      setIsAuthenticated(true);
      
      toast({
        title: "Registration successful",
        description: "Your account has been created!",
      });
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    toast({
      title: "Profile updated",
      description: "Your changes have been saved",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        register,
        logout,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
