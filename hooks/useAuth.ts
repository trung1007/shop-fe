import { useState } from 'react';
import AuthService from '../services/authService';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(AuthService.isLoggedIn());

  const login = (username: string, password: string) => {
    const success = AuthService.login(username, password);
    setIsLoggedIn(success);
    return success;
  };

  const logout = () => {
    AuthService.logout();
    setIsLoggedIn(false);
  };

  return { isLoggedIn, login, logout };
};

export default useAuth;