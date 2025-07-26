const API_BASE_URL = 'http://10.253.2.129:8080/api/v1/public';

export const authService = {
  // Login de usuario
  async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Guardar token en localStorage si el backend lo devuelve
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }
      if (data.user) {
        localStorage.setItem('userData', JSON.stringify(data.user));
      }

      return {
        success: true,
        data: data,
        user: data.user
      };
    } catch (error) {
      console.error('Error en login:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Registro de usuario
  async register(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: userData.firstName,
          last_name: userData.lastName,
          government_id: parseInt(userData.governmentId),
          phone_number: userData.phoneNumber,
          password: userData.password,
          email: userData.email
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      return {
        success: true,
        data: data,
        message: 'Usuario registrado exitosamente'
      };
    } catch (error) {
      console.error('Error en registro:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Logout
  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
  },

  // Verificar si el usuario está autenticado
  isAuthenticated() {
    return localStorage.getItem('authToken') !== null;
  },

  // Obtener datos del usuario actual
  getCurrentUser() {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }
};