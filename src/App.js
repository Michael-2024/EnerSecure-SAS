import React, { useState, useEffect } from 'react';
import LayoutHeader from './components/LayoutHeader';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import DashboardPage from './components/DashboardPage';
import { authService } from './services/authService';
import './styles.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Verificar si hay una sesión activa al cargar la app
  useEffect(() => {
    if (authService.isAuthenticated()) {
      const user = authService.getCurrentUser();
      setCurrentUser(user);
      setIsLoggedIn(true);
      setCurrentPage('dashboard');
    }
  }, []);

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    setIsLoggedIn(false);
    setCurrentPage('home');
  };

  return (
    <div className="font-sans antialiased text-gray-900">
      {!isLoggedIn && <LayoutHeader currentPage={currentPage} onNavigate={handleNavigate} />}
      
      {currentPage === 'home' && !isLoggedIn && <HomePage onNavigate={handleNavigate} />}
      {currentPage === 'login' && !isLoggedIn && <LoginPage onLogin={handleLogin} onNavigate={handleNavigate} />}
      {currentPage === 'register' && !isLoggedIn && <RegisterPage onNavigate={handleNavigate} />}
      {isLoggedIn && <DashboardPage onLogout={handleLogout} currentUser={currentUser} />}
    </div>
  );
}

export default App;