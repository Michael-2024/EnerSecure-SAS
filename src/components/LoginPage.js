import React, { useState } from 'react';

const LoginPage = ({ onLogin = () => {}, onNavigate = () => {}, authController = null }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (authController) {
      const success = await authController.login(email, password);
      if (success) {
        onLogin();
      } else {
        alert('Credenciales incorrectas. Usa user@example.com / password');
      }
    } else {
      alert('Error: AuthController no está disponible.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
              placeholder="tu@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-green-600 transition-all duration-300 transform hover:scale-105"
          >
            Acceder
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          ¿No tienes cuenta?{' '}
          <button onClick={() => onNavigate('home')} className="text-black font-medium hover:underline">
            Regresar al Inicio
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;