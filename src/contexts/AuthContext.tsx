import { createContext, useContext } from 'react';

// Mock user type for demonstration - keeping interfaces for compatibility
interface MockUser {
  id: string;
  email: string;
}

interface MockProfile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  is_admin: boolean;
}

interface AuthContextType {
  user: MockUser | null;
  profile: MockProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Always return null for user/profile to make signin decorative only
  // Remove all authentication logic
  const signIn = async (email: string, password: string) => {
    // Do nothing - decorative only
  };

  const signUp = async (email: string, password: string) => {
    // Do nothing - decorative only
  };

  const signOut = async () => {
    // Do nothing - decorative only
  };

  const value = {
    user: null,
    profile: null,
    loading: false,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}