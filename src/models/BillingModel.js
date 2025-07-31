// models/BillingModel.js
class BillingModel {
  constructor(data = { invoices: [] }) {
    this.invoices = data.invoices;
  }

  // Simulate fetching billing data
  static async fetchBillingData(userId = 'demoUser') {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(new BillingModel({
          invoices: [
            { id: 'INV001', date: '2025-01-16', amount: '$1200342.00', status: 'Pagada' },
            { id: 'INV002', date: '2025-02-16', amount: '$1876345.00', status: 'Pagada' },
            { id: 'INV003', date: '2025-03-16', amount: '$2010569.00', status: 'Pagada' },
            { id: 'INV004', date: '2025-04-16', amount: '$1980460.00', status: 'Pagada' },
            { id: 'INV005', date: '2025-05-16', amount: '$2127000.00', status: 'Pagada' },
            { id: 'INV006', date: '2025-06-16', amount: '$2187500.00', status: 'Pendiente' },
          ]
        }));
      }, 500);
    });
  }
}

export default BillingModel;