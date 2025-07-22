import React, { useEffect, useState } from 'react';
import StatisticsModel from '../models/StatisticsModel'; // Import the model directly for view to display

const DashboardStatistics = ({ dashboardController = null }) => {
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (dashboardController) {
        setLoading(true);
        const data = await dashboardController.loadStatisticsData('demoUser'); // Pass a user ID
        setStatsData(data);
        setLoading(false);
      }
    };
    fetchStats();
  }, [dashboardController]);

  if (loading) {
    return <div className="flex-1 p-8 bg-gray-50 flex justify-center items-center text-gray-600 text-xl">Cargando estadísticas...</div>;
  }

  if (!statsData) {
    return <div className="flex-1 p-8 bg-gray-50 flex justify-center items-center text-red-600 text-xl">Error al cargar las estadísticas.</div>;
  }

  return (
    <div className="flex-1 p-8 bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Estadísticas de Producción</h1>

      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Producción Diaria (kWh)</h2>
        <div className="h-64 bg-gray-100 rounded-lg flex items-end p-4 space-x-2">
          {/* Simple bar chart placeholder */}
          {statsData.dailyProduction.length > 0 ? (
            statsData.dailyProduction.map((value, index) => (
              <div
                key={index}
                className="w-8 bg-black rounded-t-lg transition-all duration-300"
                style={{ height: `${value / 2}px` }} // Scale for visualization
                title={`Día ${index + 1}: ${value} kWh`}
              ></div>
            ))
          ) : (
            <p className="text-gray-500 w-full text-center">No hay datos disponibles para mostrar.</p>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-2 text-center">Datos de los últimos 7 días</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Producción Total (Mes)</h2>
          <p className="text-3xl font-bold text-black">{statsData.totalMonthlyProduction}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Ahorro Estimado (Mes)</h2>
          <p className="text-3xl font-bold text-black">{statsData.estimatedMonthlySavings}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardStatistics;