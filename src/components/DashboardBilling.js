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
    return <div className="flex-1 p-8 bg-gray-50 flex justify-center items-center text-gray-600 text-xl">Cargando facturación...</div>;
  }

  if (!billingData) {
    return <div className="flex-1 p-8 bg-gray-50 flex justify-center items-center text-red-600 text-xl">Error al cargar los datos de facturación.</div>;
  }

  return (
    <div className="flex-1 p-8 bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Facturación</h1>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Historial de Facturas</h2>
        {billingData.invoices.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID Factura
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Monto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {billingData.invoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{invoice.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{invoice.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{invoice.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        invoice.status === 'Pagada' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button onClick={() => alert(`Descargando factura ${invoice.id}`)} className="text-black hover:text-gray-700 transition-colors">
                        Descargar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No hay facturas disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardBilling;