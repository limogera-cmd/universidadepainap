import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { email, role }
  const navigate = useNavigate();

  const login = (email, password) => {
    // Mock login logic
    if (email === 'admin@painap.com' && password === 'admin') {
      setUser({ email, role: 'admin' });
      navigate('/admin/dashboard');
      return true;
    } else if (email === 'aluno@painap.com' && password === 'aluno') {
      setUser({ email, role: 'aluno', needsOnboarding: true });
      navigate('/aluno/dashboard');
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  const completeOnboarding = () => {
    setUser(prev => ({ ...prev, needsOnboarding: false }));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, completeOnboarding }}>
      {children}
    </AuthContext.Provider>
  );
};
