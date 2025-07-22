// controllers/AuthController.js
import UserModel from '../models/UserModel';

class AuthController {
  constructor(view = null) {
    this.view = view;
    this.currentUser = null;
  }

  async login(email, password) {
    try {
      this.currentUser = await UserModel.fetchUser(email, password);
      return true;
    } catch (error) {
      console.error('Login failed:', error.message);
      return false;
    }
  }

  logout() {
    this.currentUser = null;
  }

  getCurrentUser() {
    return this.currentUser;
  }
}

export default AuthController;