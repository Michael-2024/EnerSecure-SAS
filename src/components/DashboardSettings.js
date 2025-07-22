import React, { useEffect, useState } from 'react';
import UserModel from '../models/UserModel'; // Import the model directly for view to display

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
        const profile = await dashboardController.loadUserProfile('demoUser'); // Pass a user ID
        setUserProfile(profile);
        setName(profile.name);
        setEmail(profile.email);
        setLoading(false);
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
      }
    } else {
      alert('Las contraseñas no coinciden o son muy cortas (mínimo 6 caracteres).');
    }
  };

  if (loading) {
    return <div className="flex-1 p-8 bg-gray-50 flex justify-center items-center text-gray-600 text-xl">Cargando configuración...</div>;
  }

  if (!userProfile) {
    return <div className="flex-1 p-8 bg-gray-50 flex justify-center items-center text-red-600 text-xl">Error al cargar el perfil de usuario.</div>;
  }

  return (
    <div className="flex-1 p-8 bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Configuración del Perfil</h1>

      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Información Personal</h2>
        <form onSubmit={handleProfileSave} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-black text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-gray-800 transition-all duration-300"
          >
            Guardar Cambios
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Cambiar Contraseña</h2>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label htmlFor="new-password" className="block text-lg font-medium text-gray-700 mb-2">
              Nueva Contraseña
            </label>
            <input
              type="password"
              id="new-password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-lg font-medium text-gray-700 mb-2">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              id="confirm-password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-black text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-gray-800 transition-all duration-300"
          >
            Cambiar Contraseña
          </button>
        </form>
      </div>
    </div>
  );
};

export default DashboardSettings;