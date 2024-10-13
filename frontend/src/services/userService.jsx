import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_API_URL || 'https://memorize-that.onrender.com';

export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.get(`${API_URL}/user/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (updatedData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const response = await axios.put(`${API_URL}/user/profile`, updatedData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const response = await axios.delete(`${API_URL}/user/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};