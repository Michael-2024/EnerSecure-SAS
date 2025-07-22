import React, { useState } from 'react';
import DashboardSidebar from './DashboardSidebar';
import DashboardOverview from './DashboardOverview';
import DashboardStatistics from './DashboardStatistics';
import DashboardBilling from './DashboardBilling';
import DashboardSettings from './DashboardSettings';
import DashboardController from '../controllers/DashboardController'; // Importar el controlador

const DashboardPage = ({ onLogout = () => {} }) => {
  const [currentPage, setCurrentPage] = useState('overview');
  const dashboardController = new DashboardController(); // Instanciar el controlador

  const handleNavigate = (page) => {
    if (page === 'logout') {
      onLogout();
    } else {
      setCurrentPage(page);
    }
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'overview':
        return <DashboardOverview dashboardController={dashboardController} />;
      case 'statistics':
        return <DashboardStatistics dashboardController={dashboardController} />;
      case 'billing':
        return <DashboardBilling dashboardController={dashboardController} />;
      case 'settings':
        return <DashboardSettings dashboardController={dashboardController} />;
      default:
        return <DashboardOverview dashboardController={dashboardController} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <DashboardSidebar onNavigate={handleNavigate} currentPage={currentPage} />
      {renderContent()}
    </div>
  );
};

export default DashboardPage;