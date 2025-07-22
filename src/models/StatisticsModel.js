// models/StatisticsModel.js
class StatisticsModel {
  constructor(data = { dailyProduction: [], totalMonthlyProduction: '0 kWh', estimatedMonthlySavings: '$0 USD' }) {
    this.dailyProduction = data.dailyProduction;
    this.totalMonthlyProduction = data.totalMonthlyProduction;
    this.estimatedMonthlySavings = data.estimatedMonthlySavings;
  }

  // Simulate fetching statistics data
  static async fetchStatisticsData(userId = 'demoUser') {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(new StatisticsModel({
          dailyProduction: [120, 150, 130, 180, 160, 190, 170],
          totalMonthlyProduction: '4500 kWh',
          estimatedMonthlySavings: '$540 USD'
        }));
      }, 500);
    });
  }
}

export default StatisticsModel;