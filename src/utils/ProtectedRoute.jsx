// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { status } = useSelector((state) => state.auth);

  if (!status) return <Navigate to="/login" replace />;

  return children;
};


export default ProtectedRoute;
