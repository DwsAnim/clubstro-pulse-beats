// src/components/PrivateRoute.tsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/components/AuthContext";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const loc = useLocation();

  if (loading) return <div className="min-h-screen flex items-center justify-center">Checking authentication...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: loc }} />;

  return <>{children}</>;
};

export default PrivateRoute;
