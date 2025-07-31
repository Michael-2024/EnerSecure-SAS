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
        // Login exitoso
        console.log('Login exitoso:', result.user);
        onLogin(result.user); // Pasar datos del usuario al componente padre
      } else {
        // Login fallido
        setError(result.error || 'Error al iniciar sesión');
      }
    } catch (error) {
      setError('Error de conexión. Verifica que el servidor esté ejecutándose.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-green-500/30 p-8 rounded-xl shadow-2xl shadow-green-500/20 w-full max-w-md">
        <div className="text-center mb-8">
          {/* Logo */}
          <div className="mb-6 flex justify-center">
            <img 
              src="/logo_enersecure.png" 
              alt="EnerSecure S.A.S. Logo" 
              className="w-20 h-20 object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          <h2 className="text-4xl font-bold text-white mb-2">
            <span className="text-green-400">Iniciar</span> Sesión
          </h2>
          <p className="text-gray-400">Accede a tu panel de energía renovable</p>
        </div>
        
        {error && (
          <div className="bg-red-900/30 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-6 flex items-center">
            <span className="mr-2">⚠️</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-green-400 mb-2">
              📧 Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition duration-200"
              placeholder="juan.perez@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-lg font-medium text-green-400 mb-2">
              🔒 Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition duration-200"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-6 py-3 rounded-lg text-lg font-semibold shadow-lg transition-all duration-300 transform ${
              loading 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-gradient-to-r from-green-500 to-yellow-500 text-black hover:from-green-400 hover:to-yellow-400 hover:scale-105'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Iniciando sesión...
              </span>
            ) : (
              '🚀 Acceder'
            )}
          </button>
        </form>

        <div className="mt-8 text-center space-y-4">
          <p className="text-gray-400">
            ¿No tienes cuenta?{' '}
            <button 
              onClick={() => onNavigate('register')} 
              className="text-yellow-400 font-medium hover:text-yellow-300 transition-colors duration-200"
            >
              Registrarse aquí
            </button>
          </p>
          
          <button 
            onClick={() => onNavigate('home')} 
            className="text-gray-500 hover:text-gray-300 transition-colors duration-200 flex items-center justify-center mx-auto"
          >
            ← Regresar al Inicio
          </button>
        </div>

        {/* Credenciales de prueba */}
        <div className="mt-8 p-4 bg-gray-800/50 border border-yellow-500/30 rounded-lg">
          <p className="text-sm text-yellow-400 mb-2 font-semibold flex items-center">
            <span className="mr-2">🔑</span>
            Credenciales de prueba:
          </p>
          <div className="text-sm text-gray-300 space-y-1">
            <p><span className="text-green-400">Email:</span> juan.perez@example.com</p>
            <p><span className="text-green-400">Contraseña:</span> secure123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;