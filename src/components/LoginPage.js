import React, { useState } from 'react';
import { authService } from '../services/authService';

const LoginPage = ({ onLogin = () => {}, onNavigate = () => {} }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const result = await authService.login(email, password);
      
      if (result.success) {
        onLogin(result.user);
      } else {
        setError(result.error || 'Credenciales incorrectas');
      }
    } catch (err) {
      setError('Error de conexión. Verifica que el servidor esté ejecutándose.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center p-4" style={{ minHeight: '100vh' }}>
      <div className="max-w-md w-full space-y-8">
        
        {/* Logo y título */}
        <div className="text-center">
          <div className="mx-auto mb-6 flex justify-center">
            <img 
              src="/logo_enersecure.png" 
              alt="EnerSecure S.A.S. Logo" 
              className="w-16 h-16 object-contain hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                // Fallback al logo con gradiente si la imagen no carga
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-2xl" style={{ display: 'none' }}>
              <span className="text-black font-bold text-2xl">🔋</span>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            <span className="text-green-400">Ener</span>Secure
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">Panel de Control de Energía Renovable</p>
        </div>

        {/* Formulario de login */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="bg-gray-900/90 backdrop-blur-sm border border-gray-700 p-6 sm:p-8 rounded-xl shadow-2xl">
            <div className="space-y-4">
              
              {/* Campo Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  📧 Correo Electrónico
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-green-400 focus:border-transparent transition duration-200"
                  placeholder="juan.perez@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Campo Contraseña */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  🔒 Contraseña
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-green-400 focus:border-transparent transition duration-200"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Mensaje de error */}
              {error && (
                <div className="bg-red-900/20 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm flex items-center">
                  <span className="mr-2">⚠️</span>
                  {error}
                </div>
              )}

              {/* Botón de login */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-3 rounded-lg font-semibold shadow-lg hover:from-green-600 hover:to-green-700 focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Iniciando sesión...
                  </div>
                ) : (
                  '🚀 Iniciar Sesión'
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Información de API */}
        <div className="bg-gray-900/50 border border-gray-700 p-4 rounded-lg">
          <h3 className="text-blue-400 font-semibold mb-2 text-sm flex items-center">
            <span className="mr-2">🌐</span>
            Credenciales de prueba:
          </h3>
          <p className="text-gray-300 text-xs mb-2">
            Usuario: <span className="text-green-400 font-mono">juan.perez@example.com</span>
          </p>
          <p className="text-gray-300 text-xs mb-2">
            Contraseña: <span className="text-green-400 font-mono">secure123</span>
          </p>
        </div>

        {/* Enlaces adicionales */}
        <div className="flex flex-col space-y-3">
          <button
            onClick={() => onNavigate('register')}
            className="w-full text-yellow-400 hover:text-yellow-300 px-4 py-2 rounded-lg border border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-200 text-sm flex items-center justify-center"
          >
            <span className="mr-2">👤</span>
            ¿No tienes cuenta? Regístrate
          </button>
          
          <button
            onClick={() => onNavigate('home')}
            className="w-full text-gray-400 hover:text-white px-4 py-2 rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-200 text-sm flex items-center justify-center"
          >
            <span className="mr-2">←</span>
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;