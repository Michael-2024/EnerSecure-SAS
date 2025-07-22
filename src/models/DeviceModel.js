// models/DeviceModel.js
class DeviceModel {
  constructor(data = { type: 'solar', production: '0 kWh', lastMaintenance: 'N/A', location: 'N/A' }) {
    this.type = data.type;
    this.production = data.production;
    this.lastMaintenance = data.lastMaintenance;
    this.location = data.location;
  }

  // Simulate fetching device data
  static async fetchDeviceData(userId = 'demoUser') {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(new DeviceModel({
          type: 'solar',
          production: '150 kWh',
          lastMaintenance: '2023-10-26',
          location: 'Lat: 34.05, Lon: -118.25'
        }));
      }, 500);
    });
  }
}

export default DeviceModel;