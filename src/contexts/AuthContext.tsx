import React, { createContext, useContext, useState, useEffect } from 'react';

type UserRole = 'student' | 'mentor' | 'admin' | null;

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers = {
  student: { id: '1', email: 'student@test.com', password: 'password', name: 'John Doe', role: 'student' as UserRole },
  mentor: { id: '2', email: 'mentor@test.com', password: 'password', name: 'Jane Smith', role: 'mentor' as UserRole },
  admin: { id: '3', email: 'admin@test.com', password: 'password', name: 'Admin User', role: 'admin' as UserRole },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [registeredUsers, setRegisteredUsers] = useState<typeof mockUsers>(mockUsers);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('pm_portal_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockUser = registeredUsers[role as keyof typeof registeredUsers];
    
    if (mockUser && mockUser.email === email && mockUser.password === password) {
      const userData = { id: mockUser.id, email: mockUser.email, name: mockUser.name, role: mockUser.role };
      setUser(userData);
      localStorage.setItem('pm_portal_user', JSON.stringify(userData));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (name: string, email: string, password: string, role: UserRole): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check if user already exists
    const existingUser = Object.values(registeredUsers).find(u => u.email === email);
    if (existingUser) {
      setIsLoading(false);
      return { success: false, error: 'User with this email already exists' };
    }

    // Create new user
    const newUser = {
      id: Math.random().toString(36).substring(7),
      email,
      password,
      name,
      role,
    };

    // Update registered users
    setRegisteredUsers(prev => ({
      ...prev,
      [role as keyof typeof mockUsers]: newUser,
    }));

    // Auto-login after registration
    const userData = { id: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role };
    setUser(userData);
    localStorage.setItem('pm_portal_user', JSON.stringify(userData));
    
    setIsLoading(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pm_portal_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
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
