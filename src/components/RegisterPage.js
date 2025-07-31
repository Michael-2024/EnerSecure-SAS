import React, { useState } from 'react';
import { authService } from '../services/authService';

const RegisterPage = ({ onNavigate = () => {} }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    governmentId: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validaciones
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      setLoading(false);
      return;
    }

    try {
      const result = await authService.register(formData);
      
      if (result.success) {
        setSuccess('¡Usuario registrado exitosamente! Puedes iniciar sesión ahora.');
        // Limpiar formulario
        setFormData({
          firstName: '',
          lastName: '',
          governmentId: '',
          phoneNumber: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
        
        // Redirigir al login después de 2 segundos
        setTimeout(() => {
          onNavigate('login');
        }, 2000);
      } else {
        setError(result.error || 'Error al registrar usuario');
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
      <div className="bg-gray-900 border border-yellow-500/30 p-8 rounded-xl shadow-2xl shadow-yellow-500/20 w-full max-w-lg">
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
            <span className="text-yellow-400">Crear</span> Cuenta
          </h2>
          <p className="text-gray-400">Únete a la revolución de energía renovable</p>
        </div>
        
        {error && (
          <div className="bg-red-900/30 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-6 flex items-center">
            <span className="mr-2">⚠️</span>
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-900/30 border border-green-500/50 text-green-400 px-4 py-3 rounded-lg mb-6 flex items-center">
            <span className="mr-2">✅</span>
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-green-400 mb-1">
                👤 Nombre
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="w-full px-3 py-2 bg-black/30 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition duration-200"
                placeholder="Juan"
                value={formData.firstName}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-green-400 mb-1">
                👤 Apellido
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="w-full px-3 py-2 bg-black/30 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition duration-200"
                placeholder="Pérez"
                value={formData.lastName}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label htmlFor="governmentId" className="block text-sm font-medium text-green-400 mb-1">
              🆔 Cédula
            </label>
            <input
              type="number"
              id="governmentId"
              name="governmentId"
              className="w-full px-3 py-2 bg-black/30 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition duration-200"
              placeholder="123456789"
              value={formData.governmentId}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-green-400 mb-1">
              📱 Teléfono
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              className="w-full px-3 py-2 bg-black/30 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition duration-200"
              placeholder="1234567890"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-green-400 mb-1">
              📧 Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 bg-black/30 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition duration-200"
              placeholder="juan.perez@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-green-400 mb-1">
              🔒 Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 bg-black/30 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition duration-200"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-green-400 mb-1">
              🔒 Confirmar Contraseña
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full px-3 py-2 bg-black/30 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition duration-200"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
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
                : 'bg-gradient-to-r from-yellow-500 to-green-500 text-black hover:from-yellow-400 hover:to-green-400 hover:scale-105'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Registrando...
              </span>
            ) : (
              '🌟 Registrarse'
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-400">
            ¿Ya tienes cuenta?{' '}
            <button 
              onClick={() => onNavigate('login')} 
              className="text-green-400 font-medium hover:text-green-300 transition-colors duration-200"
            >
              Iniciar Sesión
            </button>
          </p>
          
          <button 
            onClick={() => onNavigate('home')} 
            className="text-gray-500 hover:text-gray-300 transition-colors duration-200 flex items-center justify-center mx-auto mt-4"
          >
            ← Regresar al Inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;