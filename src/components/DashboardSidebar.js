import React from 'react';

const DashboardSidebar = ({ onNavigate = () => {}, currentPage = 'overview' }) => {
  const navItems = [
    { name: 'Resumen', page: 'overview' },
    { name: 'Estadísticas', page: 'statistics' },
    { name: 'Facturación', page: 'billing' },
    { name: 'Configuración', page: 'settings' },
  ];

  return (
    <div className="w-64 bg-white shadow-lg p-6 flex flex-col h-full">
      <div className="text-2xl font-bold text-gray-900 mb-8">Dashboard</div>
      <nav className="flex-grow">
        <ul className="space-y-3">
          {navItems.map((item) => (
            <li key={item.page}>
              <button
                onClick={() => onNavigate(item.page)}
                className={`w-full text-left px-4 py-3 rounded-lg text-lg font-medium transition-colors duration-200 flex items-center space-x-3
                  ${currentPage === item.page ? 'bg-gray-100 text-black' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`}
              >
                {/* Placeholder for icons */}
                <span className="w-5 h-5">
                  {item.page === 'overview' && (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0l-7 7m7-7v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                  )}
                  {item.page === 'statistics' && (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3m0 0l3 3m-3-3v8m0-9a9 9 0 110 18 9 9 0 010-18z"/></svg>
                  )}
                  {item.page === 'billing' && (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 8h6m-5 0h.01M9 12h6m-5 0h.01M9 16h6m-5 0h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  )}
                  {item.page === 'settings' && (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  )}
                </span>
                <span>{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <button
        onClick={() => onNavigate('logout')}
        className="w-full text-left px-4 py-3 rounded-lg text-lg font-medium text-red-600 hover:bg-red-50 transition-colors duration-200 flex items-center space-x-3 mt-8"
      >
        <span className="w-5 h-5">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
        </span>
        <span>Cerrar Sesión</span>
      </button>
    </div>
  );
};

export default DashboardSidebar;