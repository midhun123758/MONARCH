// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { auth } from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  // ---------------- LOAD USER ----------------
  useEffect(() => {
    if (!token) return;
    auth.me(token)
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.clear();
        setUser(null);
        setToken(null);
      });
  }, [token]);

  // ---------------- REGISTER ----------------
  const register = async (username, email, password) => {
    await auth.register(username, email, password);
  };

  // ---------------- LOGIN ----------------
  const login = async (email, password) => {
    const { data } = await auth.login(email, password);
    localStorage.setItem("token", data.access);
    localStorage.setItem("refresh", data.refresh);
    setToken(data.access);
    setUser({
      username: data.username,
      email: data.email,
      is_staff: data.is_staff,
    });
    return data;
  };

  // ---------------- LOGOUT ----------------
  const logout = async () => {
    try {
      if (token) await auth.logout(token);
    } catch {}
    localStorage.clear();
    setUser(null);
    setToken(null);
  };

  // ---------------- PASSWORD ----------------
  const sendOtp = (email) => auth.sendOtp(email);
  const verifyOtp = (email, otp) => auth.verifyOtp(email, otp);
  const resetPassword = (email, password) => auth.resetPassword(email, password);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
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
