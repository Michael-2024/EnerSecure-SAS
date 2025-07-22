// models/UserModel.js
class UserModel {
  constructor(data = { email: '', password: '', name: 'Usuario EnerSecure' }) {
    this.email = data.email;
    this.password = data.password;
    this.name = data.name;
  }

  // Simulate fetching user data
  static async fetchUser(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'user@example.com' && password === 'password') {
          resolve(new UserModel({ email: 'user@example.com', password: 'password', name: 'Usuario Demo' }));
        } else {
          reject(new Error('Credenciales incorrectas'));
        }
      }, 500);
    });
  }

  // Simulate updating user profile
  async updateProfile(newName, newEmail) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.name = newName;
        this.email = newEmail;
        resolve(this);
      }, 300);
    });
  }

  // Simulate changing password
  async changePassword(newPassword) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.password = newPassword; // In a real app, this would be hashed
        resolve(true);
      }, 300);
    });
  }
}

export default UserModel;