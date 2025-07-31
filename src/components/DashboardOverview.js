import React, { useEffect, useState } from 'react';
import DashboardMap from './DashboardMap';

const DashboardOverview = ({ dashboardController = null }) => {
  const [deviceData, setDeviceData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Configuración de métricas operativas
  const operationalMetrics = [
    { label: 'Eficiencia', value: '98.5%', color: 'green' },
    { label: 'Uptime', value: '99.9%', color: 'yellow' },
    { label: 'Temp. Promedio', value: '22°C', color: 'blue' },
    { label: 'Horas Activo', value: '8,760h', color: 'purple' }
  ];

  useEffect(() => {
    const fetchDevice = async () => {
      if (dashboardController) {
        setLoading(true);
        try {
          const data = await dashboardController.loadOverviewData('demoUser');
          setDeviceData(data);
        } catch (error) {
          console.error('Error al cargar datos del dispositivo:', error);
          setDeviceData(null);
        } finally {
          setLoading(false);
        }
      } else {
        // Datos de prueba si no hay controlador
        setTimeout(() => {
          setDeviceData({
            type: 'solar',
            production: '150 kWh',
            lastMaintenance: '26 de octubre de 2023'
          });
          setLoading(false);
        }, 1000);
      }
    };
    
    fetchDevice();
  }, [dashboardController]);

  // Función para obtener el tipo de dispositivo formateado
  const getDeviceTypeDisplay = (type) => {
    if (type === 'solar') {
      return {
        icon: '☀️',
        name: 'Paneles solares',
        textColor: 'text-yellow-400'
      };
    }
    return {
      icon: '💨',
      name: 'Turbina Eólica',
      textColor: 'text-green-400'
    };
  };

  // Componente de estado de carga
  const LoadingState = () => (
    <div className="min-h-screen w-full p-4 sm:p-6 lg:p-8 bg-black flex justify-center items-center">
      <div className="flex items-center space-x-3 text-gray-300 text-lg sm:text-xl">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
        <span>Cargando datos del dispositivo...</span>
      </div>
    </div>
  );

  // Componente de estado de error
  const ErrorState = () => (
    <div className="min-h-screen w-full p-4 sm:p-6 lg:p-8 bg-black flex justify-center items-center">
      <div className="text-center text-red-400 text-lg sm:text-xl">
        <div className="text-4xl mb-4">⚠️</div>
        <p>Error al cargar los datos del dispositivo.</p>
      </div>
    </div>
  );

  // Componente de tarjeta de resumen
  const SummaryCard = ({ title, icon, children, borderColor = "border-gray-500/30", hoverColor = "hover:shadow-gray-500/20" }) => (
    <div className={`bg-gray-900/90 backdrop-blur-sm border ${borderColor} p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl ${hoverColor} transition-all duration-300`}>
      <h3 className={`text-lg sm:text-xl font-semibold mb-3 flex items-center ${borderColor.replace('border-', 'text-').replace('/30', '/80')}`}>
        <span className="mr-2 text-xl">{icon}</span>
        {title}
      </h3>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );

  // Componente de badge de estado
  const StatusBadge = ({ text, color = "gray" }) => (
    <span className={`inline-block bg-${color}-500/20 text-${color}-400 px-3 py-1 rounded-full text-xs font-medium mt-2`}>
      {text}
    </span>
  );

  // Componente de métrica operativa
  const MetricCard = ({ metric }) => (
    <div className={`bg-${metric.color}-500/10 border border-${metric.color}-500/30 p-3 sm:p-4 rounded-lg hover:bg-${metric.color}-500/20 transition-all duration-200`}>
      <p className={`text-${metric.color}-400 font-semibold text-sm mb-1`}>{metric.label}</p>
      <p className="text-white text-lg sm:text-xl font-bold">{metric.value}</p>
    </div>
  );

  // Estados de carga y error
  if (loading) return <LoadingState />;
  if (!deviceData) return <ErrorState />;

  const deviceType = getDeviceTypeDisplay(deviceData.type);

  return (
    <div className="min-h-screen w-full bg-black">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-7xl">
        
        {/* Título principal */}
        <header className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white flex items-center flex-wrap">
            <span className="mr-3 text-xl sm:text-2xl lg:text-3xl">📊</span>
            <span className="text-green-400">Resumen</span> 
            <span className="ml-2">del Dispositivo</span>
          </h1>
        </header>

        {/* Tarjetas de resumen principales */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
          
          {/* Tipo de dispositivo */}
          <SummaryCard
            title="Tipo de dispositivo"
            icon="🔧"
            borderColor="border-green-500/30"
            hoverColor="hover:shadow-green-500/20"
          >
            <div className={`text-xl sm:text-2xl font-bold ${deviceType.textColor} flex items-center`}>
              <span className="mr-2 text-2xl">{deviceType.icon}</span>
              <span>{deviceType.name}</span>
            </div>
          </SummaryCard>
          
          {/* Producción actual */}
          <SummaryCard
            title="Producción actual"
            icon="⚡"
            borderColor="border-yellow-500/30"
            hoverColor="hover:shadow-yellow-500/20"
          >
            <div className="text-xl sm:text-2xl font-bold text-white">{deviceData.production}</div>
            <StatusBadge text="En tiempo real" color="yellow" />
          </SummaryCard>
          
          {/* Último mantenimiento */}
                <SummaryCard
                title="Último mantenimiento"
                icon="🛠️"
                borderColor="border-green-500/30"
                hoverColor="hover:shadow-green-500/20"
                >
                <div className="text-xl sm:text-2xl font-bold text-white">{deviceData.lastMaintenance}</div>
                <StatusBadge text="Actualizado" color="green" />
                </SummaryCard>
                
              </section>

              {/* Mapa de ubicaciones con Google Maps */}
              <section className="bg-gray-900/90 backdrop-blur-sm border border-yellow-500/30 p-4 sm:p-6 rounded-xl shadow-lg mb-8 hover:shadow-xl hover:shadow-yellow-500/20 transition-all duration-300">
                <h2 className="text-lg sm:text-xl font-semibold text-yellow-400 mb-4 flex items-center">
                <span className="mr-2 text-xl">🗺️</span>
                Ubicación de dispositivos
                </h2>
                <div className="bg-black/50 rounded-lg p-2 sm:p-4 border border-gray-700">
                <div className="w-full h-[300px] sm:h-[400px] rounded-lg overflow-hidden">
                  {/* Google Maps Embed - Parque Eólico Jepírachi, La Guajira, Colombia */}
                  <iframe
                  title="Google Maps - Ubicación de Dispositivos"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&q=11.3500,-72.6000&maptype=satellite&zoom=13`}
                  ></iframe>
                </div>
                </div>
              </section>

              {/* Estado operativo */}
        <section className="bg-gray-900/90 backdrop-blur-sm border border-green-500/30 p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300">
          <h2 className="text-lg sm:text-xl font-semibold text-green-400 mb-4 flex items-center">
            <span className="mr-2 text-xl">📈</span>
            Estado Operativo
          </h2>
          
          {/* Estado principal */}
          <div className="flex items-center mb-6 p-4 bg-green-500/10 rounded-lg border border-green-500/20">
            <div className="relative mr-4">
              <span className="h-4 w-4 bg-green-400 rounded-full animate-pulse block"></span>
              <span className="absolute top-0 left-0 h-4 w-4 bg-green-400 rounded-full animate-ping opacity-30"></span>
            </div>
            <div className="flex-1">
              <p className="text-xl sm:text-2xl font-bold text-green-400">Operando Normal</p>
              <p className="text-sm text-gray-400 mt-1">Sistema funcionando correctamente</p>
            </div>
          </div>
          
          {/* Métricas operativas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {operationalMetrics.map((metric, index) => (
              <MetricCard key={`metric-${index}`} metric={metric} />
            ))}
          </div>
        </section>
        
      </div>
    </div>
  );
};

export default DashboardOverview;