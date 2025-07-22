import React from 'react';

const LayoutHeader = ({ currentPage = 'home', onNavigate = () => {} }) => {
  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-50">
      <div className="text-2xl font-bold text-gray-900">EnerSecure S.A.S.</div>
      <nav className="hidden md:flex space-x-6">
        <button
          onClick={() => onNavigate('home')}
          className={`text-lg font-medium transition-colors ${
            currentPage === 'home' ? 'text-black border-b-2 border-black' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Inicio
        </button>
        <button
          onClick={() => onNavigate('login')}
          className={`text-lg font-medium transition-colors ${
            currentPage === 'login' ? 'text-black border-b-2 border-black' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Iniciar Sesión
        </button>
      </nav>
      <div className="md:hidden">
        {/* Mobile menu icon placeholder */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-600 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </div>
    </header>
  );
};

export default LayoutHeader;