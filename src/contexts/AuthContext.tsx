import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  rollNumber: string;
  name: string;
  email: string;
  course: string;
  year: number;
  semester: number;
  feesPaid: boolean;
  totalFees: number;
  paidAmount: number;
}

interface AuthContextType {
  user: User | null;
  login: (rollNumber: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

interface RegisterData {
  rollNumber: string;
  name: string;
  email: string;
  password: string;
  course: string;
  year: number;
  semester: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock user database - in production, this would be in your backend
  const mockUsers: User[] = [
    {
      id: '1',
      rollNumber: 'MRU2024001',
      name: 'John Doe',
      email: 'john.doe@student.mallareddy.edu.in',
      course: 'Computer Science Engineering',
      year: 2,
      semester: 3,
      feesPaid: false,
      totalFees: 85000,
      paidAmount: 25000
    },
    {
      id: '2',
      rollNumber: 'MRU2024002',
      name: 'Jane Smith',
      email: 'jane.smith@student.mallareddy.edu.in',
      course: 'Electronics and Communication',
      year: 1,
      semester: 2,
      feesPaid: true,
      totalFees: 80000,
      paidAmount: 80000
    }
  ];

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (rollNumber: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user exists (in production, this would be a secure backend call)
    const existingUser = mockUsers.find(u => u.rollNumber === rollNumber);
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const registeredUser = registeredUsers.find((u: User) => u.rollNumber === rollNumber);
    
    const foundUser = existingUser || registeredUser;
    
    if (foundUser && password) { // Simple password check - in production, use proper authentication
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check if roll number already exists
    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const existsInMock = mockUsers.find(u => u.rollNumber === userData.rollNumber);
    const existsInRegistered = existingUsers.find((u: User) => u.rollNumber === userData.rollNumber);
    
    if (existsInMock || existsInRegistered) {
      setIsLoading(false);
      return false; // User already exists
    }
    
    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      rollNumber: userData.rollNumber,
      name: userData.name,
      email: userData.email,
      course: userData.course,
      year: userData.year,
      semester: userData.semester,
      feesPaid: false,
      totalFees: 75000,
      paidAmount: 0
    };
    
    // Save to localStorage (in production, save to backend)
    existingUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
    
    setUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};