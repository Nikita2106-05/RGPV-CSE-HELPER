// frontend/src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Base URL for your backend API
  const API_URL = 'http://localhost:5000/api/auth';

  useEffect(() => {
    // Check for stored token on initial load
    const token = localStorage.getItem('token');
    if (token) {
      // You might want to validate the token with your backend here
      // For now, we'll assume a valid token means a logged-in user
      const storedUser = JSON.parse(localStorage.getItem('user'));
      setUser(storedUser);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  // Register user
  const register = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/register`, { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify({ _id: response.data._id, email: response.data.email }));
      setUser({ _id: response.data._id, email: response.data.email });
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      return response.data;
    } catch (error) {
      console.error('Registration error:', error.response?.data?.message || error.message);
      throw error.response?.data?.message || 'Registration failed';
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify({ _id: response.data._id, email: response.data.email }));
      setUser({ _id: response.data._id, email: response.data.email });
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      return response.data;
    } catch (error) {
      console.error('Login error:', error.response?.data?.message || error.message);
      throw error.response?.data?.message || 'Login failed';
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};