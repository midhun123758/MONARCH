import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export const UserProtectedRoute = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/user" replace />;
  }

  return <Outlet />;
};

export const AdminProtectedRoute = () => {
  const { user } = useContext(AuthContext);
  

  if (!user || !user.is_staff) {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
};