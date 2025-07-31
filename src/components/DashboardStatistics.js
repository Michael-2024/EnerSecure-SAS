import React, { useEffect, useState } from 'react';
import StatisticsModel from '../models/StatisticsModel';

const DashboardStatistics = ({ dashboardController = null }) => {
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (dashboardController) {
        setLoading(true);
        try {
          const data = await dashboardController.loadStatisticsData('demoUser');
          setStatsData(data);
        } catch (error) {
          console.error('Error al cargar estadísticas:', error);
          setStatsData(null);
        } finally {
          setLoading(false);
        }
      } else {
        // Datos de prueba si no hay controlador
        setTimeout(() => {
          setStatsData({
            dailyProduction: [120, 145, 98, 156, 134, 178, 142],
            totalMonthlyProduction: '4,250 kWh',
            estimatedMonthlySavings: '$1,275 MXN',
            efficiency: '96.8%',
            peakProduction: '189 kWh',
            averageDaily: '143 kWh',
            co2Saved: '2.1 toneladas'
          });
          setLoading(false);
        }, 1000);
      }
    };
    fetchStats();
  }, [dashboardController]);

  // Componente de carga
  const LoadingState = () => (
    <div className="min-h-screen w-full p-4 sm:p-6 lg:p-8 bg-black flex justify-center items-center">
      <div className="flex items-center space-x-3 text-gray-300 text-lg sm:text-xl">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
        <span>Cargando estadísticas...</span>
      </div>
    </div>
  );

  // Componente de error
  const ErrorState = () => (
    <div className="min-h-screen w-full p-4 sm:p-6 lg:p-8 bg-black flex justify-center items-center">
      <div className="text-center text-red-400 text-lg sm:text-xl">
        <div className="text-4xl mb-4">📊</div>
        <p>Error al cargar las estadísticas.</p>
      </div>
    </div>
  );

  // Componente de tarjeta estadística
  const StatCard = ({ title, value, icon, color = "green", subtitle = null }) => (
    <div className={`bg-gray-900/90 backdrop-blur-sm border border-${color}-500/30 p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl hover:shadow-${color}-500/20 transition-all duration-300`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className={`text-lg font-semibold text-${color}-400 flex items-center`}>
          <span className="mr-2 text-xl">{icon}</span>
          {title}
        </h3>
      </div>
      <p className="text-2xl sm:text-3xl font-bold text-white mb-1">{value}</p>
      {subtitle && (
        <p className="text-sm text-gray-400">{subtitle}</p>
      )}
    </div>
  );

  if (loading) return <LoadingState />;
  if (!statsData) return <ErrorState />;

  // Calcular la altura máxima para el gráfico
  const maxValue = Math.max(...statsData.dailyProduction);
  const chartHeight = 200;

  return (
    <div className="min-h-screen w-full bg-black">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-7xl">
        
        {/* Título principal */}
        <header className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white flex items-center flex-wrap">
            <span className="mr-3 text-xl sm:text-2xl lg:text-3xl">📈</span>
            <span className="text-green-400">Estadísticas</span> 
            <span className="ml-2">de Producción</span>
          </h1>
        </header>

        {/* Gráfico de Producción Diaria */}
        <section className="bg-gray-900/90 backdrop-blur-sm border border-blue-500/30 p-4 sm:p-6 rounded-xl shadow-lg mb-6 sm:mb-8 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300">
          <h2 className="text-lg sm:text-xl font-semibold text-blue-400 mb-4 flex items-center">
            <span className="mr-2 text-xl">📊</span>
            Producción Diaria (kWh)
          </h2>
          
          <div className="bg-black/30 rounded-lg p-4 border border-gray-700">
            <div className="h-64 flex items-end justify-center space-x-2 sm:space-x-3">
              {statsData.dailyProduction.length > 0 ? (
                statsData.dailyProduction.map((value, index) => {
                  const barHeight = (value / maxValue) * chartHeight;
                  const dayNames = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
                  
                  return (
                    <div key={index} className="flex flex-col items-center group">
                      <div
                        className="w-6 sm:w-8 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all duration-300 hover:from-blue-500 hover:to-blue-300 cursor-pointer relative"
                        style={{ height: `${barHeight}px` }}
                        title={`${dayNames[index]}: ${value} kWh`}
                      >
                        {/* Valor en hover */}
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                          {value} kWh
                        </div>
                      </div>
                      <span className="text-xs text-gray-400 mt-2">{dayNames[index]}</span>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-400 w-full text-center">No hay datos disponibles para mostrar.</p>
              )}
            </div>
            <p className="text-sm text-gray-400 mt-4 text-center">Datos de los últimos 7 días</p>
          </div>
        </section>

        {/* Estadísticas Principales */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <StatCard
            title="Producción Total (Mes)"
            value={statsData.totalMonthlyProduction}
            icon="⚡"
            color="green"
            subtitle="Energía generada este mes"
          />
          
          <StatCard
            title="Ahorro Estimado (Mes)"
            value={statsData.estimatedMonthlySavings}
            icon="💰"
            color="yellow"
            subtitle="Ahorro en factura eléctrica"
          />
          
          <StatCard
            title="Eficiencia del Sistema"
            value={statsData.efficiency}
            icon="🔧"
            color="blue"
            subtitle="Rendimiento promedio"
          />
        </section>

        {/* Estadísticas Adicionales */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <StatCard
            title="Pico de Producción"
            value={statsData.peakProduction}
            icon="🚀"
            color="purple"
            subtitle="Máximo registrado"
          />
          
          <StatCard
            title="Promedio Diario"
            value={statsData.averageDaily}
            icon="📅"
            color="green"
            subtitle="Producción promedio"
          />
          
          <StatCard
            title="CO₂ Evitado"
            value={statsData.co2Saved}
            icon="🌱"
            color="emerald"
            subtitle="Impacto ambiental positivo"
          />
          
          <div className="bg-gray-900/90 backdrop-blur-sm border border-orange-500/30 p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-orange-400 flex items-center">
                <span className="mr-2 text-xl">🏆</span>
                Estado del Sistema
              </h3>
            </div>
            <div className="flex items-center">
              <div className="relative mr-3">
                <span className="h-3 w-3 bg-green-400 rounded-full animate-pulse block"></span>
                <span className="absolute top-0 left-0 h-3 w-3 bg-green-400 rounded-full animate-ping opacity-30"></span>
              </div>
              <div>
                <p className="text-lg font-bold text-green-400">Óptimo</p>
                <p className="text-sm text-gray-400">Funcionando correctamente</p>
              </div>
            </div>
          </div>
        </section>

        {/* Análisis de Tendencias */}
        <section className="bg-gray-900/90 backdrop-blur-sm border border-purple-500/30 p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300">
          <h2 className="text-lg sm:text-xl font-semibold text-purple-400 mb-4 flex items-center">
            <span className="mr-2 text-xl">📈</span>
            Análisis de Tendencias
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <span className="mr-3 text-green-400">📈</span>
                <div>
                  <p className="font-medium text-green-300">Tendencia Positiva</p>
                  <p className="text-sm text-gray-400">+12% respecto al mes anterior</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <span className="mr-3 text-blue-400">🌤️</span>
                <div>
                  <p className="font-medium text-blue-300">Mejor Día</p>
                  <p className="text-sm text-gray-400">Sábado con 178 kWh</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                <span className="mr-3 text-yellow-400">⏰</span>
                <div>
                  <p className="font-medium text-yellow-300">Horario Pico</p>
                  <p className="text-sm text-gray-400">12:00 - 14:00 hrs</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <span className="mr-3 text-purple-400">🎯</span>
                <div>
                  <p className="font-medium text-purple-300">Meta Mensual</p>
                  <p className="text-sm text-gray-400">85% completada</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
      </div>
    </div>
  );
};

export default DashboardStatistics;