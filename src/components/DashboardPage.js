import React, { useState } from 'react';
import DashboardSidebar from './DashboardSidebar';
import DashboardOverview from './DashboardOverview';
import DashboardStatistics from './DashboardStatistics';
import DashboardBilling from './DashboardBilling';
import DashboardSettings from './DashboardSettings';

const DashboardPage = ({ onLogout = () => {}, dashboardController = null }) => {
  const [currentPage, setCurrentPage] = useState('overview');

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
    <div className="min-h-screen w-full bg-black flex" style={{ minHeight: '100vh', height: '100vh' }}>
      {/* Sidebar */}
      <div className="flex-shrink-0">
        <DashboardSidebar 
          onNavigate={handleNavigate} 
          currentPage={currentPage}
        />
      </div>
      
      {/* Contenido principal */}
      <div className="flex-1 bg-black overflow-y-auto min-h-screen" style={{ minHeight: '100vh', height: '100vh' }}>
        {renderContent()}
      </div>
    </div>
  );
};

export default DashboardPage;