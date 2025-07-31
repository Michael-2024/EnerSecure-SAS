import React, { useEffect, useState } from 'react';
import DeviceModel from '../models/DeviceModel'; // Importar el modelo de dispositivo
import DashboardMap from './DashboardMap'; // Import the new map component

const DashboardOverview = ({ dashboardController = null }) => {
  const [deviceData, setDeviceData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDevice = async () => {
      if (dashboardController) {
        setLoading(true);
        const data = await dashboardController.loadOverviewData('demoUser'); // Pasar un ID de usuario
        setDeviceData(data);
        setLoading(false);
      }
    };
    fetchDevice();
  }, [dashboardController]);

  if (loading) {
    return (
      <div className="flex-1 p-8 bg-black flex justify-center items-center text-gray-300 text-xl">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
          <span>Cargando datos del dispositivo...</span>
        </div>
      </div>
    );
  }

  if (!deviceData) {
    return (
      <div className="flex-1 p-8 bg-black flex justify-center items-center text-red-400 text-xl">
        <div className="text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <p>Error al cargar los datos del dispositivo.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8 bg-black">
      <h1 className="text-4xl font-bold text-white mb-8 flex items-center">
        <span className="mr-3">📊</span>
        <span className="text-green-400">Resumen</span> del Dispositivo
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-900 border border-green-500/30 p-6 rounded-xl shadow-lg hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300">
          <h2 className="text-xl font-semibold text-green-400 mb-2 flex items-center">
            <span className="mr-2">🔧</span>
            Tipo de Dispositivo
          </h2>
          <p className="text-3xl font-bold text-white capitalize">
            {deviceData.type === 'solar' ? (
              <span className="text-yellow-400">☀️ Panel Solar</span>
            ) : (
              <span className="text-green-400">💨 Turbina Eólica</span>
            )}
          </p>
        </div>
        
        <div className="bg-gray-900 border border-yellow-500/30 p-6 rounded-xl shadow-lg hover:shadow-xl hover:shadow-yellow-500/20 transition-all duration-300">
          <h2 className="text-xl font-semibold text-yellow-400 mb-2 flex items-center">
            <span className="mr-2">⚡</span>
            Producción Actual
          </h2>
          <p className="text-3xl font-bold text-white">{deviceData.production}</p>
          <div className="mt-2">
            <span className="inline-block bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-xs font-medium">
              En tiempo real
            </span>
          </div>
        </div>
        
        <div className="bg-gray-900 border border-green-500/30 p-6 rounded-xl shadow-lg hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300">
          <h2 className="text-xl font-semibold text-green-400 mb-2 flex items-center">
            <span className="mr-2">🛠️</span>
            Último Mantenimiento
          </h2>
          <p className="text-3xl font-bold text-white">{deviceData.lastMaintenance}</p>
          <div className="mt-2">
            <span className="inline-block bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs font-medium">
              Actualizado
            </span>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 border border-yellow-500/30 p-6 rounded-xl shadow-lg mb-8 hover:shadow-xl hover:shadow-yellow-500/20 transition-all duration-300">
        <h2 className="text-xl font-semibold text-yellow-400 mb-4 flex items-center">
          <span className="mr-2">🗺️</span>
          Ubicación de Dispositivos
        </h2>
        <div className="bg-black/30 rounded-lg p-4 border border-gray-700">
          <DashboardMap />
        </div>
      </div>

      <div className="bg-gray-900 border border-green-500/30 p-6 rounded-xl shadow-lg hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300">
        <h2 className="text-xl font-semibold text-green-400 mb-2 flex items-center">
          <span className="mr-2">📈</span>
          Estado Operativo
        </h2>
        <div className="flex items-center mt-4">
          <div className="relative">
            <span className="h-4 w-4 bg-green-400 rounded-full mr-3 animate-pulse"></span>
            <span className="absolute top-0 left-0 h-4 w-4 bg-green-400 rounded-full animate-ping opacity-20"></span>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-400">Operando Normal</p>
            <p className="text-sm text-gray-400 mt-1">Sistema funcionando correctamente</p>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
            <p className="text-green-400 font-semibold text-sm">Eficiencia</p>
            <p className="text-white text-lg font-bold">98.5%</p>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/30 p-3 rounded-lg">
            <p className="text-yellow-400 font-semibold text-sm">Uptime</p>
            <p className="text-white text-lg font-bold">99.9%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;