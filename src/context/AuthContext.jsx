import { createContext, useContext, useState } from 'react';
import api from '../api/axios';

const AuthCtx = createContext();
export const useAuth = () => useContext(AuthCtx);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Register function with correct /api prefix
  const register = async (data) => {
    // Backend routes /api/auth par mapped hain, isliye prefix zaroori hai
    const res = await api.post('/auth/register', data); 
    setUser(res.data);
  };

  // Login function with correct /api prefix
  const login = async (data) => {
    const res = await api.post('/auth/login', data); 
    setUser(res.data);
  };

  // Logout function with correct /api prefix
  const logout = async () => {
    await api.post('/auth/logout'); 
    setUser(null);
  };

  return (
    <AuthCtx.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}