import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import EmptyState from "../../Shared/EmptyState";
import { useState } from "react";
import HereOrder from "./HereOrder";

const MyOrder = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const { refetch, data: order = [] } = useQuery({
    queryKey: ["order", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/customer/payment?email=${user?.email}`);
      return res.data;
    },
  });

  return (
    <>
      <Helmet>
        <title>Stream Cart - My Order</title>
      </Helmet>
      {order && Array.isArray(order) && order.length > 0 ? (
        <div className="container mx-auto px-4 sm:px-8">
          {order &&
            order.map((order) => (
              <HereOrder
                key={order?._id}
                order={order}
                refetch={refetch}
                user={user}
              />
            ))}
        </div>
      ) : (
        <EmptyState message="No Order Data available." />
      )}
    </>
  );
};

export default MyOrder;
