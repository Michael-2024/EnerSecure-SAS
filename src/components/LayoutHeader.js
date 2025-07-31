import React, { useState } from 'react';

const LayoutHeader = ({ currentPage = 'home', onNavigate = () => {} }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900 border-b border-green-500/30 shadow-lg shadow-green-500/10 p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo y título */}
        <div className="flex items-center space-x-3">
          <img 
            src="/logo_enersecure.png" 
            alt="EnerSecure S.A.S. Logo" 
            className="w-10 h-10 object-contain hover:scale-105 transition-transform duration-300"
          />
          <div className="text-2xl font-bold">
            <span className="text-green-400">Ener</span>
            <span className="text-yellow-400">Secure</span>
            <span className="text-white text-lg ml-2">S.A.S.</span>
          </div>
        </div>

        {/* Navegación desktop */}
        <nav className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => onNavigate('home')}
            className={`relative px-4 py-2 text-lg font-medium transition-all duration-300 ${
              currentPage === 'home' 
                ? 'text-green-400' 
                : 'text-gray-300 hover:text-green-400'
            }`}
          >
            <span className="flex items-center">
              <span className="mr-2">🏠</span>
              Inicio
            </span>
            {currentPage === 'home' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 to-yellow-500 rounded-full"></div>
            )}
          </button>

          <button
            onClick={() => onNavigate('login')}
            className={`relative px-4 py-2 text-lg font-medium transition-all duration-300 ${
              currentPage === 'login' 
                ? 'text-yellow-400' 
                : 'text-gray-300 hover:text-yellow-400'
            }`}
          >
            <span className="flex items-center">
              <span className="mr-2">🔐</span>
              Iniciar Sesión
            </span>
            {currentPage === 'login' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-500 to-green-500 rounded-full"></div>
            )}
          </button>


        </nav>

        {/* Botón menú móvil */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-300 hover:text-green-400 transition-colors p-2"
          >
            {mobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-gray-700">
          <nav className="flex flex-col space-y-3 pt-4">
            <button
              onClick={() => {
                onNavigate('home');
                setMobileMenuOpen(false);
              }}
              className={`flex items-center px-4 py-3 rounded-lg text-lg font-medium transition-all duration-300 ${
                currentPage === 'home' 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                  : 'text-gray-300 hover:text-green-400 hover:bg-gray-800'
              }`}
            >
              <span className="mr-3">🏠</span>
              Inicio
            </button>

            <button
              onClick={() => {
                onNavigate('login');
                setMobileMenuOpen(false);
              }}
              className={`flex items-center px-4 py-3 rounded-lg text-lg font-medium transition-all duration-300 ${
                currentPage === 'login' 
                  ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' 
                  : 'text-gray-300 hover:text-yellow-400 hover:bg-gray-800'
              }`}
            >
              <span className="mr-3">🔐</span>
              Iniciar Sesión
            </button>

            <button
              onClick={() => {
                onNavigate('register');
                setMobileMenuOpen(false);
              }}
              className={`flex items-center px-4 py-3 rounded-lg text-lg font-medium transition-all duration-300 ${
                currentPage === 'register' 
                  ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' 
                  : 'text-gray-300 hover:text-yellow-400 hover:bg-gray-800'
              }`}
            >
              <span className="mr-3">📝</span>
              Registrarse
            </button>

            <div className="pt-2 border-t border-gray-700">
              <button
                onClick={() => {
                  onNavigate('login');
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-gradient-to-r from-green-500 to-yellow-500 text-black px-6 py-3 rounded-lg font-bold hover:from-green-400 hover:to-yellow-400 transition-all duration-300 flex items-center justify-center"
              >
                <span className="mr-2">⚡</span>
                Acceder al Panel
              </button>
            </div>
          </nav>
        </div>
      )}

      {/* Overlay para cerrar menú móvil */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default LayoutHeader;