import React, { useEffect, useState } from 'react';
import UserModel from '../models/UserModel';

const DashboardSettings = ({ dashboardController = null }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Estados para los modales
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: '',
    message: '',
    type: 'success', // 'success', 'error', 'warning'
    onConfirm: null
  });

  // Función para mostrar modal
  const showNotification = (title, message, type = 'success', onConfirm = null) => {
    setModalConfig({ title, message, type, onConfirm });
    setShowModal(true);
  };

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
    
    // Modal de confirmación antes de guardar
    showNotification(
      '¿Confirmar cambios?',
      '¿Estás seguro de que deseas actualizar tu información personal?',
      'warning',
      async () => {
        if (dashboardController) {
          const success = await dashboardController.updateProfile(name, email);
          if (success) {
            showNotification(
              '¡Éxito!',
              'Tu perfil ha sido actualizado correctamente.',
              'success'
            );
          } else {
            showNotification(
              'Error',
              'No se pudo actualizar tu perfil. Inténtalo de nuevo.',
              'error'
            );
          }
        } else {
          // Simulación para datos de prueba
          showNotification(
            '¡Éxito!',
            'Tu perfil ha sido actualizado correctamente (modo demo).',
            'success'
          );
        }
      }
    );
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      showNotification(
        'Error de validación',
        'Las contraseñas no coinciden. Por favor, verifica que ambas contraseñas sean idénticas.',
        'error'
      );
      return;
    }
    
    if (password.length < 6) {
      showNotification(
        'Contraseña muy corta',
        'La contraseña debe tener al menos 6 caracteres.',
        'error'
      );
      return;
    }

    // Modal de confirmación antes de cambiar contraseña
    showNotification(
      '¿Cambiar contraseña?',
      '¿Estás seguro de que deseas cambiar tu contraseña? Esta acción no se puede deshacer.',
      'warning',
      async () => {
        if (dashboardController) {
          const success = await dashboardController.changePassword(password);
          if (success) {
            showNotification(
              '¡Contraseña actualizada!',
              'Tu contraseña ha sido cambiada exitosamente.',
              'success'
            );
            setPassword('');
            setConfirmPassword('');
          } else {
            showNotification(
              'Error',
              'No se pudo cambiar la contraseña. Inténtalo de nuevo.',
              'error'
            );
          }
        } else {
          // Simulación para datos de prueba
          showNotification(
            '¡Contraseña actualizada!',
            'Tu contraseña ha sido cambiada exitosamente (modo demo).',
            'success'
          );
          setPassword('');
          setConfirmPassword('');
        }
      }
    );
  };

  // Componente Modal personalizado
  const Modal = () => {
    if (!showModal) return null;

    const getModalIcon = () => {
      switch (modalConfig.type) {
        case 'success':
          return '✅';
        case 'error':
          return '❌';
        case 'warning':
          return '⚠️';
        default:
          return 'ℹ️';
      }
    };

    const getModalColors = () => {
      switch (modalConfig.type) {
        case 'success':
          return {
            border: 'border-green-500/50',
            bg: 'bg-green-500/10',
            text: 'text-green-400',
            buttonPrimary: 'bg-green-600 hover:bg-green-700',
            buttonSecondary: 'bg-gray-600 hover:bg-gray-700'
          };
        case 'error':
          return {
            border: 'border-red-500/50',
            bg: 'bg-red-500/10',
            text: 'text-red-400',
            buttonPrimary: 'bg-red-600 hover:bg-red-700',
            buttonSecondary: 'bg-gray-600 hover:bg-gray-700'
          };
        case 'warning':
          return {
            border: 'border-yellow-500/50',
            bg: 'bg-yellow-500/10',
            text: 'text-yellow-400',
            buttonPrimary: 'bg-yellow-600 hover:bg-yellow-700',
            buttonSecondary: 'bg-gray-600 hover:bg-gray-700'
          };
        default:
          return {
            border: 'border-blue-500/50',
            bg: 'bg-blue-500/10',
            text: 'text-blue-400',
            buttonPrimary: 'bg-blue-600 hover:bg-blue-700',
            buttonSecondary: 'bg-gray-600 hover:bg-gray-700'
          };
      }
    };

    const colors = getModalColors();

    return (
      <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className={`bg-gray-900 border ${colors.border} rounded-xl shadow-2xl max-w-md w-full mx-4 transform animate-pulse`}>
          {/* Header del modal */}
          <div className={`${colors.bg} p-6 rounded-t-xl border-b ${colors.border}`}>
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{getModalIcon()}</span>
              <h3 className={`text-xl font-bold ${colors.text}`}>
                {modalConfig.title}
              </h3>
            </div>
          </div>
          
          {/* Contenido del modal */}
          <div className="p-6">
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              {modalConfig.message}
            </p>
            
            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
              {modalConfig.onConfirm ? (
                <>
                  <button
                    onClick={() => setShowModal(false)}
                    className={`${colors.buttonSecondary} text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center`}
                  >
                    <span className="mr-2">❌</span>
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      modalConfig.onConfirm();
                    }}
                    className={`${colors.buttonPrimary} text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center`}
                  >
                    <span className="mr-2">✅</span>
                    Confirmar
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowModal(false)}
                  className={`${colors.buttonPrimary} text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center w-full`}
                >
                  <span className="mr-2">👍</span>
                  Entendido
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
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
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-green-500/20 transition-all duration-300 flex items-center hover:scale-105"
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
              className="bg-yellow-600 hover:bg-yellow-700 text-black px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 flex items-center hover:scale-105"
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
      
      {/* Modal Component */}
      <Modal />
    </div>
  );
};

export default DashboardSettings;