
import axios from 'axios';

// Créer une instance axios avec la configuration de base
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api', // URL par défaut, à remplacer par votre URL API
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter des tokens d'authentification si nécessaire
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Exemple de fonction pour les comptes
export const accountsApi = {
  getAccounts: async (page = 1, pageSize = 10, filters = {}) => {
    try {
      const response = await api.get('/accounts', { 
        params: { page, pageSize, ...filters } 
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching accounts:', error);
      throw error;
    }
  },
  
  getAccountById: async (id: number) => {
    try {
      const response = await api.get(`/accounts/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching account ${id}:`, error);
      throw error;
    }
  }
};

// Vous pouvez ajouter d'autres groupes d'API ici (ex: utilisateurs, authentification, etc.)
export const authApi = {
  login: async (credentials: { username: string; password: string }) => {
    try {
      const response = await api.post('/auth/login', credentials);
      const { token } = response.data;
      if (token) {
        localStorage.setItem('auth_token', token);
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  logout: async () => {
    localStorage.removeItem('auth_token');
    // Vous pouvez aussi appeler votre API de déconnexion si nécessaire
    // await api.post('/auth/logout');
  }
};

export default api;
