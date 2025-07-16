// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
});

export const getPantryItems = (token) =>
    axios.get('/pantry', {
        headers: { Authorization: `Bearer ${token}` },
    });

export const addPantryItem = (item, token) =>
    axios.post('/pantry', item, {
        headers: { Authorization: `Bearer ${token}` },
    });

export const updatePantryItem = (id, item, token) =>
    axios.put(`/pantry/${id}`, item, {
        headers: { Authorization: `Bearer ${token}` },
    });

export const deletePantryItem = (id, token) =>
    axios.delete(`/pantry/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });

export const registerUser = (userData) => api.post('/auth/register', userData);
export const loginUser = (credentials) => api.post('/auth/login', credentials);
