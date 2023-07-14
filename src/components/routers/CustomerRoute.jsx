import React from "react";
import useAuth from "../../hooks/useAuth";
import { Navigate, useLocation } from "react-router";
import Loader from "../Shared/Loader";
import useCustomer from "../../hooks/useCustomer";

const CustomerRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isCustomer, CustomerLoading] = useCustomer();
  const location = useLocation();

  if (loading || CustomerLoading) {
    return <Loader></Loader>;
  }

  if (user && isCustomer) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default CustomerRoute;
