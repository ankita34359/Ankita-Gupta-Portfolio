import axios from 'axios';

const isDevelopment = import.meta.env.MODE === 'development';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_URL || 'http://localhost:5000';

const api = axios.create({
    baseURL: API_BASE_URL
});

// Add a request interceptor to include the token if it exists
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export { api, API_BASE_URL, IMAGE_BASE_URL };
export default api;
