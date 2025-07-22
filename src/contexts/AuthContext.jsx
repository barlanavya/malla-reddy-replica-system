import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (rollNumber, password) => {
    // Mock authentication - in real app, this would call an API
    if (rollNumber && password) {
      const mockUser = {
        rollNumber: rollNumber,
        name: rollNumber === 'MRU123456' ? 'John Doe' : 'Student Name',
        email: `${rollNumber.toLowerCase()}@student.mallareddyuniversity.ac.in`,
        course: 'B.Tech Computer Science',
        year: 2,
        semester: 4,
        totalFees: 150000,
        paidAmount: 75000,
        feesPaid: false,
        profilePicture: null
      };
      setUser(mockUser);
      localStorage.setItem('currentUser', JSON.stringify(mockUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const register = (userData) => {
    // Mock registration
    const newUser = {
      ...userData,
      rollNumber: `MRU${Date.now().toString().slice(-6)}`,
      totalFees: 150000,
      paidAmount: 0,
      feesPaid: false
    };
    setUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return true;
  };

  // Check for existing session on mount
  useState(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  });

  const value = {
    user,
    login,
    logout,
    register
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};