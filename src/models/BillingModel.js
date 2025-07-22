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
            { id: 'INV001', date: '2023-10-01', amount: '$1200.00', status: 'Pagada' },
            { id: 'INV002', date: '2023-11-01', amount: '$1350.00', status: 'Pendiente' },
            { id: 'INV003', date: '2023-12-01', amount: '$1400.00', status: 'Pagada' },
          ]
        }));
      }, 500);
    });
  }
}

export default BillingModel;