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
    return <div className="flex-1 p-8 bg-gray-50 flex justify-center items-center text-gray-600 text-xl">Cargando datos del dispositivo...</div>;
  }

  if (!deviceData) {
    return <div className="flex-1 p-8 bg-gray-50 flex justify-center items-center text-red-600 text-xl">Error al cargar los datos del dispositivo.</div>;
  }

  return (
    <div className="flex-1 p-8 bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Resumen del Dispositivo</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Tipo de Dispositivo</h2>
          <p className="text-3xl font-bold text-black capitalize">{deviceData.type === 'solar' ? 'Panel Solar' : 'Turbina Eólica'}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Producción Actual</h2>
          <p className="text-3xl font-bold text-black">{deviceData.production}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Último Mantenimiento</h2>
          <p className="text-3xl font-bold text-black">{deviceData.lastMaintenance}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Ubicación de Dispositivos</h2>
        <DashboardMap />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Estado Operativo</h2>
        <div className="flex items-center mt-2">
          <span className="h-4 w-4 bg-green-500 rounded-full mr-2"></span>
          <p className="text-2xl font-bold text-green-700">Operando Normal</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;