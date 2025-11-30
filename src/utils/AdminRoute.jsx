// src/components/AdminRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ children }) => {
  const { status, userData } = useSelector((state) => state.auth);

  if (!status) return <Navigate to="/login" replace />;

  if (userData?.role !== "admin") return <Navigate to="/" replace />;

  return children;
};

export default AdminRoute;
