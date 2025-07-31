import React from 'react';

const DashboardSidebar = ({ onNavigate = () => {}, currentPage = 'overview' }) => {
  const navItems = [
    { name: 'Resumen', page: 'overview', icon: '📊' },
    { name: 'Estadísticas', page: 'statistics', icon: '📈' },
    { name: 'Facturación', page: 'billing', icon: '💰' },
    { name: 'Configuración', page: 'settings', icon: '⚙️' },
  ];

  return (
    <div className="w-64 bg-gray-900 border-r border-gray-700 shadow-xl p-4 sm:p-6 flex flex-col h-full">
      {/* Logo y Título */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-black font-bold text-lg">🔋</span>
          </div>
          <div className="ml-3">
            <h2 className="text-green-400 font-bold text-lg">EnerSecure</h2>
            <p className="text-gray-400 text-xs">Panel de Control</p>
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
      </div>

      {/* Navegación Principal */}
      <nav className="flex-grow">
        <div className="mb-4">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Navegación
          </h3>
        </div>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.page}>
              <button
                onClick={() => onNavigate(item.page)}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-3 group
                  ${currentPage === item.page 
                    ? 'bg-gray-800 border border-green-500/30 text-green-400 shadow-lg shadow-green-500/10' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-800 hover:border hover:border-gray-600'
                  }`}
              >
                <span className="text-xl">
                  {item.icon}
                </span>
                <span className="text-sm sm:text-base">{item.name}</span>
                {currentPage === item.page && (
                  <div className="ml-auto w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Estado del Sistema */}
      <div className="mb-6 p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
        <div className="flex items-center">
          <div className="relative mr-3">
            <span className="h-3 w-3 bg-green-400 rounded-full animate-pulse block"></span>
            <span className="absolute top-0 left-0 h-3 w-3 bg-green-400 rounded-full animate-ping opacity-20"></span>
          </div>
          <div>
            <p className="text-sm text-green-400 font-medium">Sistema Online</p>
            <p className="text-xs text-gray-500">Servicios operativos</p>
          </div>
        </div>
      </div>

      {/* Información del Usuario */}
      <div className="mb-6 p-4 bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-lg">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-black font-bold shadow-lg">
            U
          </div>
          <div className="ml-3">
            <p className="text-white font-medium text-sm">Usuario Demo</p>
            <p className="text-gray-400 text-xs">demo@enersecure.com</p>
          </div>
        </div>
      </div>

      {/* Botón de Cerrar Sesión */}
      <button
        onClick={() => onNavigate('logout')}
        className="w-full text-left px-4 py-3 rounded-lg font-medium text-red-400 hover:text-red-300 hover:bg-red-900/20 hover:border hover:border-red-700/50 transition-all duration-200 flex items-center space-x-3 group"
      >
        <span className="text-xl">🚪</span>
        <span className="text-sm sm:text-base">Cerrar Sesión</span>
      </button>

      {/* Versión */}
      <div className="mt-4 pt-4 border-t border-gray-700">
        <p className="text-xs text-gray-500 text-center">
          EnerSecure v2.1.0
        </p>
      </div>
    </div>
  );
};

export default DashboardSidebar;