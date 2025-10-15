import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { CartContext } from "./CartContext";

export const UserProtectedRoute = () => {
  const { user } = useContext(CartContext);

  if (!user) {
    return <Navigate to="/user" replace />;
  }

  return <Outlet />;
};

export const AdminProtectedRoute = () => {
  const { user } = useContext(CartContext);

  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};