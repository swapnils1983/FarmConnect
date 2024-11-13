import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const registerSeller = (sellerData) => apiClient.post('/auth/seller/register', sellerData);
export const loginSeller = (loginData) => apiClient.post('/auth/seller/login', loginData);
export const registerUser = (userData) => apiClient.post('/auth/user/register', userData);
export const loginUser = (loginData) => apiClient.post('/auth/user/login', loginData);
