import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Helmet } from "react-helmet";
import CustomerSidebar from "./CustomerSidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import PaymentConfirm from "./Payment/PaymentConfirm";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const CDashboard = () => {
  const { user, loading } = useContext(AuthContext);
  let [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [axiosSecure] = useAxiosSecure();
  const { refetch, data: payment = [] } = useQuery({
    queryKey: ["payment", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/customer/payment?email=${user?.email}`);
      return res.data;
    },
  });

  return (
    <>
      <Helmet>
        <title>Stream Cart - Customer Dashboard</title>
      </Helmet>
      <div className="relative min-h-screen md:flex">
        <CustomerSidebar />
        <div className="flex-1  md:ml-64">
          <div className="lg:flex lg:flex-row 2xl:flex-row md:flex-row mx-auto text-center  items-center mt-6 -mx-2">
            <h4 className="mx-2 mt-2 text-xl text-blue-900 font-medium text-gray-800 mx-auto text-center hover:underline">
              Customer Area - {user?.displayName}
            </h4>
            <div className="payment-button lg:mt-0 mt-10 lg:mr-10">
              <button
                className="btn btn-lg"
                onClick={() => setIsEditModalOpen(true)}
              >
                Apply Payment
              </button>
              <PaymentConfirm
                isEditModalOpen={isEditModalOpen}
                closeModal={() => setIsEditModalOpen(false)}
                payment={payment}
                id={payment._id}
                refetch={refetch}
                setIsEditModalOpen={setIsEditModalOpen}
                loading={loading}
              />
            </div>
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
