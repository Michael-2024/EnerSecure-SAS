import React, { useState, useEffect } from 'react';
import DashboardOverview from './DashboardOverview';
import DashboardBilling from './DashboardBilling';
import DashboardSettings from './DashboardSettings';
import LayoutHeader from './LayoutHeader';
import DashboardController from '../controllers/DashboardController';

const DashboardPage = ({ user, onLogout = () => {} }) => {
  const [activeSection, setActiveSection] = useState('overview');
  const [dashboardController, setDashboardController] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const controller = new DashboardController();
    setDashboardController(controller);
  }, []);

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'overview':
        return <DashboardOverview dashboardController={dashboardController} />;
      case 'billing':
        return <DashboardBilling dashboardController={dashboardController} />;
      case 'settings':
        return <DashboardSettings />;
      default:
        return <DashboardOverview dashboardController={dashboardController} />;
    }
  };

  const menuItems = [
    { id: 'overview', name: 'Resumen', icon: '📊' },
    { id: 'billing', name: 'Facturación', icon: '💰' },
    { id: 'settings', name: 'Configuración', icon: '⚙️' }
  ];

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <div className={`bg-gray-900 border-r border-green-500/30 transition-all duration-300 ${
        sidebarOpen ? 'w-64' : 'w-20'
      } flex flex-col`}>
        {/* Logo y Toggle */}
        <div className="p-4 border-b border-green-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src="/logo.png" 
                alt="EnerSecure" 
                className="w-10 h-10 object-contain"
              />
              {sidebarOpen && (
                <div className="ml-3">
                  <h2 className="text-green-400 font-bold text-lg">EnerSecure</h2>
                  <p className="text-gray-400 text-xs">Panel de Control</p>
                </div>
              )}
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-400 hover:text-green-400 transition-colors p-1"
            >
              {sidebarOpen ? '◀' : '▶'}
            </button>
          </div>
        </div>

        {/* Usuario */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-yellow-500 rounded-full flex items-center justify-center text-black font-bold">
              {user?.first_name?.charAt(0) || 'U'}
            </div>
            {sidebarOpen && (
              <div className="ml-3">
                <p className="text-white font-medium">
                  {user?.first_name} {user?.last_name}
                </p>
                <p className="text-gray-400 text-sm">{user?.email}</p>
              </div>
            )}
          </div>
        </div>

        {/* Navegación */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-green-500/20 to-yellow-500/20 border border-green-500/30 text-green-400'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  {sidebarOpen && (
                    <span className="ml-3 font-medium">{item.name}</span>
                  )}
                  {activeSection === item.id && (
                    <div className="ml-auto w-2 h-2 bg-green-400 rounded-full"></div>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Estado del sistema */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center">
            <div className="relative">
              <span className="h-3 w-3 bg-green-400 rounded-full animate-pulse"></span>
              <span className="absolute top-0 left-0 h-3 w-3 bg-green-400 rounded-full animate-ping opacity-20"></span>
            </div>
            {sidebarOpen && (
              <div className="ml-3">
                <p className="text-sm text-green-400 font-medium">Sistema Online</p>
                <p className="text-xs text-gray-500">Todos los servicios operativos</p>
              </div>
            )}
          </div>
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-red-500/20">
          <button
            onClick={onLogout}
            className="w-full flex items-center p-3 rounded-lg text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-all duration-200"
          >
            <span className="text-xl">🚪</span>
            {sidebarOpen && (
              <span className="ml-3 font-medium">Cerrar Sesión</span>
            )}
          </button>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <LayoutHeader 
          user={user} 
          activeSection={activeSection}
          onLogout={onLogout}
        />

        {/* Contenido */}
        <main className="flex-1 overflow-auto">
          {renderActiveSection()}
        </main>
      </div>

      {/* Overlay para móvil */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardPage;
