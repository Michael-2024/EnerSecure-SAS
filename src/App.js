import React, { useState } from 'react';
import LayoutHeader from './components/LayoutHeader';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';
import AuthController from './controllers/AuthController'; // Import AuthController
import './styles.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const authController = new AuthController(); // Instantiate AuthController

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('dashboard'); // Redirect to dashboard after login
  };

  const handleLogout = () => {
    authController.logout(); // Clear current user from controller
    setIsLoggedIn(false);
    setCurrentPage('home'); // Redirect to home after logout
  };

  return (
    <div className="font-sans antialiased text-gray-900">
      {!isLoggedIn && <LayoutHeader currentPage={currentPage} onNavigate={handleNavigate} />}
      
      {currentPage === 'home' && !isLoggedIn && <HomePage onNavigate={handleNavigate} />}
      {currentPage === 'login' && !isLoggedIn && <LoginPage onLogin={handleLogin} onNavigate={handleNavigate} authController={authController} />}
      {isLoggedIn && <DashboardPage onLogout={handleLogout} />}
    </div>
  );
}

export default App;