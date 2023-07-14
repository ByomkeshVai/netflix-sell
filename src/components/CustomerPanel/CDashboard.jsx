import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Helmet } from "react-helmet";
import CustomerSidebar from "./CustomerSidebar";
import { Outlet } from "react-router-dom";

const CDashboard = () => {
  const { user, loading } = useContext(AuthContext);
  return (
    <>
      <Helmet>
        <title>NetflixHub - Customer Dashboard</title>
      </Helmet>
      <div className="relative min-h-screen md:flex">
        <CustomerSidebar />
        <div className="flex-1  md:ml-64">
          <div className="flex flex-row items-center mt-6 -mx-2">
            <h4 className="mx-2 mt-2 text-xl text-blue-900 font-medium text-gray-800 mx-auto text-center hover:underline">
              Customer Area - {user?.displayName}
            </h4>
          </div>
          <div className="p-5">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default CDashboard;
