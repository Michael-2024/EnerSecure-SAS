import React, { useEffect, useState } from 'react';
import BillingModel from '../models/BillingModel';

const DashboardBilling = ({ dashboardController = null }) => {
  const [billingData, setBillingData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBilling = async () => {
      if (dashboardController) {
        setLoading(true);
        try {
          const data = await dashboardController.loadBillingData('demoUser');
          setBillingData(data);
        } catch (error) {
          console.error('Error al cargar datos de facturación:', error);
          setBillingData(null);
        } finally {
          setLoading(false);
        }
      } else {
        // Datos de prueba si no hay controlador
        setTimeout(async () => {
          try {
            const data = await BillingModel.fetchBillingData('demoUser');
            setBillingData(data);
          } catch (error) {
            console.error('Error al cargar datos de facturación:', error);
            setBillingData(null);
          } finally {
            setLoading(false);
          }
        }, 1000);
      }
    };
    fetchBilling();
  }, [dashboardController]);

  // Funciones auxiliares para calcular datos
  const calculateTotalAmount = (invoices) => {
    if (!invoices || !Array.isArray(invoices)) return 0;
    return invoices.reduce((total, invoice) => {
      const amount = parseFloat(invoice.amount.replace(/[$,]/g, '')) || 0;
      return total + amount;
    }, 0);
  };

  const getPendingInvoices = (invoices) => {
    if (!invoices || !Array.isArray(invoices)) return [];
    return invoices.filter(invoice => invoice.status === 'Pendiente');
  };

  const getPaidInvoices = (invoices) => {
    if (!invoices || !Array.isArray(invoices)) return [];
    return invoices.filter(invoice => invoice.status === 'Pagada');
  };

  // Componente de carga
  const LoadingState = () => (
    <div className="min-h-screen w-full p-4 sm:p-6 lg:p-8 bg-black flex justify-center items-center" style={{ minHeight: '100vh' }}>
      <div className="flex items-center space-x-3 text-gray-300 text-lg sm:text-xl">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
        <span>Cargando datos de facturación...</span>
      </div>
    </div>
  );

  // Componente de error
  const ErrorState = () => (
    <div className="min-h-screen w-full p-4 sm:p-6 lg:p-8 bg-black flex justify-center items-center" style={{ minHeight: '100vh' }}>
      <div className="text-center text-red-400 text-lg sm:text-xl">
        <div className="text-4xl mb-4">💰</div>
        <p>Error al cargar los datos de facturación.</p>
        <p className="text-sm mt-2 text-gray-400">Verifica tu conexión e intenta nuevamente.</p>
      </div>
    </div>
  );

  // Componente de badge de estado
  const StatusBadge = ({ status }) => {
    const isPaid = status === 'Pagada';
    return (
      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
        isPaid 
          ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
          : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
      }`}>
        {status}
      </span>
    );
  };

  if (loading) return <LoadingState />;
  if (!billingData || !billingData.invoices) return <ErrorState />;

  // Calcular datos usando las funciones auxiliares
  const invoices = billingData.invoices || [];
  const totalAmount = calculateTotalAmount(invoices);
  const pendingInvoices = getPendingInvoices(invoices);
  const paidInvoices = getPaidInvoices(invoices);

  return (
    <div className="min-h-screen w-full bg-black" style={{ minHeight: '100vh' }}>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-7xl">
        
        {/* Título principal */}
        <header className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white flex items-center flex-wrap">
            <span className="mr-3 text-xl sm:text-2xl lg:text-3xl">💰</span>
            <span className="text-green-400">Facturación</span> 
            <span className="ml-2">y Pagos</span>
          </h1>
        </header>

        {/* Resumen de facturación */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-gray-900/90 backdrop-blur-sm border border-green-500/30 p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300">
            <h3 className="text-lg font-semibold text-green-400 flex items-center mb-3">
              <span className="mr-2 text-xl">💵</span>
              Total Facturado
            </h3>
            <p className="text-2xl sm:text-3xl font-bold text-white">
              ${totalAmount.toLocaleString('es-ES')}
            </p>
            <p className="text-sm text-gray-400 mt-1">Monto total histórico</p>
          </div>
          
          <div className="bg-gray-900/90 backdrop-blur-sm border border-yellow-500/30 p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl hover:shadow-yellow-500/20 transition-all duration-300">
            <h3 className="text-lg font-semibold text-yellow-400 flex items-center mb-3">
              <span className="mr-2 text-xl">⏳</span>
              Facturas Pendientes
            </h3>
            <p className="text-2xl sm:text-3xl font-bold text-white">{pendingInvoices.length}</p>
            <p className="text-sm text-gray-400 mt-1">Por pagar</p>
          </div>
          
          <div className="bg-gray-900/90 backdrop-blur-sm border border-blue-500/30 p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300">
            <h3 className="text-lg font-semibold text-blue-400 flex items-center mb-3">
              <span className="mr-2 text-xl">✅</span>
              Facturas Pagadas
            </h3>
            <p className="text-2xl sm:text-3xl font-bold text-white">{paidInvoices.length}</p>
            <p className="text-sm text-gray-400 mt-1">Completadas</p>
          </div>
        </section>

        {/* Tabla de facturas o mensaje vacío */}
        {invoices.length > 0 ? (
          <section className="bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-gray-700">
              <h2 className="text-lg sm:text-xl font-semibold text-white flex items-center">
                <span className="mr-2 text-xl">📋</span>
                Historial de Facturas
              </h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800/50">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      ID Factura
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Monto
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {invoices.map((invoice, index) => (
                    <tr key={invoice.id || index} className="hover:bg-gray-800/30 transition-colors duration-200">
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-white">
                            {invoice.id || `INV-${index + 1}`}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">
                          {invoice.date ? new Date(invoice.date).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          }) : 'N/A'}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-white">
                          {invoice.amount || 'N/A'}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={invoice.status || 'Pendiente'} />
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-green-400 hover:text-green-300 mr-3 transition-colors duration-200">
                          📄 Ver
                        </button>
                        <button className="text-blue-400 hover:text-blue-300 transition-colors duration-200">
                          📥 Descargar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : (
          <section className="bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-xl shadow-lg p-8 text-center">
            <div className="text-4xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-white mb-2">No hay facturas disponibles</h3>
            <p className="text-gray-400">Las facturas aparecerán aquí cuando estén disponibles.</p>
          </section>
        )}
        
      </div>
    </div>
  );
};

export default DashboardBilling;