import React, { useEffect, useState } from 'react';
import BillingModel from '../models/BillingModel'; // Importar el modelo de facturación

const DashboardBilling = ({ dashboardController = null }) => {
  const [billingData, setBillingData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBilling = async () => {
      if (dashboardController) {
        setLoading(true);
        const data = await dashboardController.loadBillingData('demoUser'); // Pasar un ID de usuario
        setBillingData(data);
        setLoading(false);
      }
    };
    fetchBilling();
  }, [dashboardController]);

  if (loading) {
    return (
      <div className="flex-1 p-8 bg-black flex justify-center items-center text-gray-300 text-xl">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
          <span>Cargando facturación...</span>
        </div>
      </div>
    );
  }

  if (!billingData) {
    return (
      <div className="flex-1 p-8 bg-black flex justify-center items-center text-red-400 text-xl">
        <div className="text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <p>Error al cargar los datos de facturación.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8 bg-black">
      <h1 className="text-4xl font-bold text-white mb-8 flex items-center">
        <span className="mr-3">💰</span>
        <span className="text-yellow-400">Facturación</span> y Pagos
      </h1>

      {/* Resumen de Facturación */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-900 border border-green-500/30 p-6 rounded-xl shadow-lg hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300">
          <h2 className="text-xl font-semibold text-green-400 mb-2 flex items-center">
            <span className="mr-2">📊</span>
            Total Mes Actual
          </h2>
          <p className="text-3xl font-bold text-white">$2,450,000</p>
          <div className="mt-2">
            <span className="inline-block bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs font-medium">
              +12% vs mes anterior
            </span>
          </div>
        </div>

        <div className="bg-gray-900 border border-yellow-500/30 p-6 rounded-xl shadow-lg hover:shadow-xl hover:shadow-yellow-500/20 transition-all duration-300">
          <h2 className="text-xl font-semibold text-yellow-400 mb-2 flex items-center">
            <span className="mr-2">⏰</span>
            Facturas Pendientes
          </h2>
          <p className="text-3xl font-bold text-white">1</p>
          <div className="mt-2">
            <span className="inline-block bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-xs font-medium">
              Próximo vencimiento: 15 días
            </span>
          </div>
        </div>

        <div className="bg-gray-900 border border-green-500/30 p-6 rounded-xl shadow-lg hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300">
          <h2 className="text-xl font-semibold text-green-400 mb-2 flex items-center">
            <span className="mr-2">✅</span>
            Facturas Pagadas
          </h2>
          <p className="text-3xl font-bold text-white">5</p>
          <div className="mt-2">
            <span className="inline-block bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs font-medium">
              100% al día este mes
            </span>
          </div>
        </div>
      </div>

      {/* Historial de Facturas */}
      <div className="bg-gray-900 border border-yellow-500/30 p-6 rounded-xl shadow-lg hover:shadow-xl hover:shadow-yellow-500/20 transition-all duration-300">
        <h2 className="text-xl font-semibold text-yellow-400 mb-4 flex items-center">
          <span className="mr-2">📋</span>
          Historial de Facturas
        </h2>
        {billingData.invoices.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-black/30">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-400 uppercase tracking-wider">
                    ID Factura
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-400 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-400 uppercase tracking-wider">
                    Monto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-400 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-400 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-900 divide-y divide-gray-700">
                {billingData.invoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-800 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{invoice.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{invoice.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-semibold">{invoice.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        invoice.status === 'Pagada' 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                          : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                      }`}>
                        {invoice.status === 'Pagada' ? '✅ Pagada' : '⏳ Pendiente'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => alert(`Descargando factura ${invoice.id}`)} 
                        className="bg-gradient-to-r from-green-500 to-yellow-500 text-black px-4 py-2 rounded-lg text-sm font-bold hover:from-green-400 hover:to-yellow-400 transition-all duration-300 transform hover:scale-105"
                      >
                        📥 Descargar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-gray-400 text-lg">No hay facturas disponibles.</p>
            <p className="text-gray-500 text-sm mt-2">Las facturas aparecerán aquí cuando se generen.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardBilling;