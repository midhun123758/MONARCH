// src/context/AuthContext.js
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();
const API = "http://127.0.0.1:8000/api/users";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  // ---------------- LOAD USER ----------------
  useEffect(() => {
    if (!token) return;

    axios
      .get(`${API}/auth/me/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.clear();
        setUser(null);
        setToken(null);
      });
  }, [token]);

  // ---------------- REGISTER ----------------
  const register = async (username, email, password) => {
    await axios.post(`${API}/register/`, {
      username,
      email,
      password,
    });
  };

  // ---------------- LOGIN ----------------
  const login = async (email, password) => {
    const { data } = await axios.post(`${API}/login/`, {
       email, // backend expects "username"
      password,
    });

    localStorage.setItem("token", data.access);
    localStorage.setItem("refresh", data.refresh);
    setToken(data.access);
    setUser(data.user);
    return data;
  };

  // ---------------- FORGOT PASSWORD ----------------
  const sendOtp = async (email) => {
    await axios.post(`${API}/forgot-password/`, { email });
  };

  const verifyOtp = async (email, otp) => {
    await axios.post(`${API}/verify-otp/`, { email, otp });
  };

  const resetPassword = async (email, password) => {
    await axios.post(`${API}/reset-password/`, {
      email,
      password,
    });
  };

  // ---------------- LOGOUT ----------------
  const logout = async () => {
    try {
      const refresh = localStorage.getItem("refresh");
      if (refresh) {
        await axios.post(
          `${API}/logout/`,
          { refresh },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
    } catch {}

    localStorage.clear();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        sendOtp,
        verifyOtp,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
