// controllers/DashboardController.js
import DeviceModel from '../models/DeviceModel';
import StatisticsModel from '../models/StatisticsModel';
import BillingModel from '../models/BillingModel';
import UserModel from '../models/UserModel';

class DashboardController {
  constructor(view = null) {
    this.view = view;
    this.deviceData = null;
    this.statisticsData = null;
    this.billingData = null;
    this.userProfile = null;
  }

  async loadOverviewData(userId) {
    this.deviceData = await DeviceModel.fetchDeviceData(userId);
    return this.deviceData;
  }

  async loadStatisticsData(userId) {
    this.statisticsData = await StatisticsModel.fetchStatisticsData(userId);
    return this.statisticsData;
  }

  async loadBillingData(userId) {
    this.billingData = await BillingModel.fetchBillingData(userId);
    return this.billingData;
  }

  async loadUserProfile(userId) {
    // In a real app, this would fetch the user profile based on userId
    // For this demo, we'll use a mock user
    this.userProfile = new UserModel({ name: 'Usuario EnerSecure', email: 'user@example.com' });
    return this.userProfile;
  }

  async updateProfile(newName, newEmail) {
    if (this.userProfile) {
      await this.userProfile.updateProfile(newName, newEmail);
      return true;
    }
    return false;
  }

  async changePassword(newPassword) {
    if (this.userProfile) {
      await this.userProfile.changePassword(newPassword);
      return true;
    }
    return false;
  }
}

export default DashboardController;