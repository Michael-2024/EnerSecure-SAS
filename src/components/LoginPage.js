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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">Iniciar Sesión</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
              placeholder="juan.perez@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
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
            className={`w-full px-6 py-3 rounded-lg text-lg font-semibold shadow-md transition-all duration-300 transform ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-500 hover:bg-green-600 hover:scale-105'
            } text-white`}
          >
            {loading ? 'Iniciando sesión...' : 'Acceder'}
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <p className="text-gray-600">
            ¿No tienes cuenta?{' '}
            <button 
              onClick={() => onNavigate('register')} 
              className="text-black font-medium hover:underline"
            >
              Registrarse
            </button>
          </p>
          
          <button 
            onClick={() => onNavigate('home')} 
            className="text-gray-500 hover:text-gray-700 underline"
          >
            Regresar al Inicio
          </button>
        </div>

        {/* Credenciales de prueba */}
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <p className="text-sm text-gray-600 mb-2"><strong>Credenciales de prueba:</strong></p>
          <p className="text-sm text-gray-600">Email: juan.perez@example.com</p>
          <p className="text-sm text-gray-600">Contraseña: secure123</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;