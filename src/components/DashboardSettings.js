import React, { useEffect, useState } from 'react';
import UserModel from '../models/UserModel';

const DashboardSettings = ({ dashboardController = null }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      if (dashboardController) {
        setLoading(true);
        try {
          const profile = await dashboardController.loadUserProfile('demoUser');
          setUserProfile(profile);
          setName(profile.name);
          setEmail(profile.email);
        } catch (error) {
          console.error('Error al cargar perfil:', error);
          setUserProfile(null);
        } finally {
          setLoading(false);
        }
      } else {
        // Datos de prueba si no hay controlador
        setTimeout(() => {
          const mockProfile = {
            name: 'Usuario Demo',
            email: 'demo@enersecure.com'
          };
          setUserProfile(mockProfile);
          setName(mockProfile.name);
          setEmail(mockProfile.email);
          setLoading(false);
        }, 1000);
      }
    };
    fetchProfile();
  }, [dashboardController]);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    if (dashboardController) {
      const success = await dashboardController.updateProfile(name, email);
      if (success) {
        alert('Perfil actualizado con éxito.');
      } else {
        alert('Error al actualizar el perfil.');
      }
    } else {
      // Simulación para datos de prueba
      alert('Perfil actualizado con éxito (modo demo).');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (password === confirmPassword && password.length >= 6) {
      if (dashboardController) {
        const success = await dashboardController.changePassword(password);
        if (success) {
          alert('Contraseña cambiada con éxito.');
          setPassword('');
          setConfirmPassword('');
        } else {
          alert('Error al cambiar la contraseña.');
        }
      } else {
        // Simulación para datos de prueba
        alert('Contraseña cambiada con éxito (modo demo).');
        setPassword('');
        setConfirmPassword('');
      }
    } else {
      alert('Las contraseñas no coinciden o son muy cortas (mínimo 6 caracteres).');
    }
  };

  // Componente de carga
  const LoadingState = () => (
    <div className="min-h-screen w-full p-4 sm:p-6 lg:p-8 bg-black flex justify-center items-center">
      <div className="flex items-center space-x-3 text-gray-300 text-lg sm:text-xl">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
        <span>Cargando configuración...</span>
      </div>
    </div>
  );

  // Componente de error
  const ErrorState = () => (
    <div className="min-h-screen w-full p-4 sm:p-6 lg:p-8 bg-black flex justify-center items-center">
      <div className="text-center text-red-400 text-lg sm:text-xl">
        <div className="text-4xl mb-4">⚠️</div>
        <p>Error al cargar el perfil de usuario.</p>
      </div>
    </div>
  );

  if (loading) return <LoadingState />;
  if (!userProfile) return <ErrorState />;

  return (
    <div className="min-h-screen w-full bg-black">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl">
        
        {/* Título principal */}
        <header className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white flex items-center flex-wrap">
            <span className="mr-3 text-xl sm:text-2xl lg:text-3xl">⚙️</span>
            <span className="text-green-400">Configuración</span>
            <span className="ml-2">del Perfil</span>
          </h1>
        </header>

        {/* Información Personal */}
        <section className="bg-gray-900/90 backdrop-blur-sm border border-green-500/30 p-4 sm:p-6 rounded-xl shadow-lg mb-6 sm:mb-8 hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300">
          <h2 className="text-lg sm:text-xl font-semibold text-green-400 mb-4 flex items-center">
            <span className="mr-2 text-xl">👤</span>
            Información Personal
          </h2>
          
          <form onSubmit={handleProfileSave} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Nombre Completo
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-green-400 focus:border-transparent transition duration-200"
                placeholder="Ingresa tu nombre completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-green-400 focus:border-transparent transition duration-200"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-green-500/20 transition-all duration-300 flex items-center"
            >
              <span className="mr-2">💾</span>
              Guardar Cambios
            </button>
          </form>
        </section>

        {/* Cambiar Contraseña */}
        <section className="bg-gray-900/90 backdrop-blur-sm border border-yellow-500/30 p-4 sm:p-6 rounded-xl shadow-lg mb-6 sm:mb-8 hover:shadow-xl hover:shadow-yellow-500/20 transition-all duration-300">
          <h2 className="text-lg sm:text-xl font-semibold text-yellow-400 mb-4 flex items-center">
            <span className="mr-2 text-xl">🔒</span>
            Cambiar Contraseña
          </h2>
          
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-gray-300 mb-2">
                Nueva Contraseña
              </label>
              <input
                type="password"
                id="new-password"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-200"
                placeholder="Mínimo 6 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
              />
            </div>
            
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300 mb-2">
                Confirmar Nueva Contraseña
              </label>
              <input
                type="password"
                id="confirm-password"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-200"
                placeholder="Repite la nueva contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                minLength={6}
                required
              />
            </div>
            
            {/* Indicador de coincidencia de contraseñas */}
            {password && confirmPassword && (
              <div className={`text-sm flex items-center ${
                password === confirmPassword ? 'text-green-400' : 'text-red-400'
              }`}>
                <span className="mr-2">
                  {password === confirmPassword ? '✅' : '❌'}
                </span>
                {password === confirmPassword 
                  ? 'Las contraseñas coinciden' 
                  : 'Las contraseñas no coinciden'
                }
              </div>
            )}
            
            <button
              type="submit"
              className="bg-yellow-600 hover:bg-yellow-700 text-black px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 flex items-center"
              disabled={!password || !confirmPassword || password !== confirmPassword || password.length < 6}
            >
              <span className="mr-2">🔐</span>
              Cambiar Contraseña
            </button>
          </form>
        </section>

        {/* Información adicional */}
        <section className="bg-gray-900/90 backdrop-blur-sm border border-blue-500/30 p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300">
          <h2 className="text-lg sm:text-xl font-semibold text-blue-400 mb-4 flex items-center">
            <span className="mr-2 text-xl">ℹ️</span>
            Información de Seguridad
          </h2>
          
          <div className="space-y-3 text-gray-300">
            <div className="flex items-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <span className="mr-3 text-blue-400">🛡️</span>
              <div>
                <p className="font-medium text-blue-300">Sesión Segura</p>
                <p className="text-sm text-gray-400">Tu conexión está protegida con cifrado SSL</p>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
              <span className="mr-3 text-green-400">✅</span>
              <div>
                <p className="font-medium text-green-300">Perfil Verificado</p>
                <p className="text-sm text-gray-400">Tu cuenta ha sido verificada correctamente</p>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <span className="mr-3 text-purple-400">🔄</span>
              <div>
                <p className="font-medium text-purple-300">Sincronización Automática</p>
                <p className="text-sm text-gray-400">Los cambios se guardan automáticamente</p>
              </div>
            </div>
          </div>
        </section>
        
      </div>
    </div>
  );
};

export default DashboardSettings;