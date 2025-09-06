import { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    // Simulate login
    setUser({ id: 1, email });
    localStorage.setItem('token', 'mock-token');
  };

  const register = async (email, password) => {
    // Simulate registration
    setUser({ id: 1, email });
    localStorage.setItem('token', 'mock-token');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};