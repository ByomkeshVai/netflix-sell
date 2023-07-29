import React, { useContext, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ConfirmSingle from "./ConfirmSingle";
import { Helmet } from "react-helmet";
import EmptyState from "../../Shared/EmptyState";

const PaymentPage = () => {
  const { orderID } = useParams();
  console.log(orderID);

  const [axiosSecure] = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);
  const { refetch, data: items = [] } = useQuery({
    queryKey: ["items", orderID],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(
        `${
          import.meta.env.VITE_API_URL
        }/customer/dashboard/payment-page/${orderID}`
      );

      return res.data;
    },
  });

  return (
    <>
      <Helmet>
        <title>Stream Cart - Payment</title>
      </Helmet>
      {items && Array.isArray(items) && items.length > 0 ? (
        <div className="container mx-auto px-4 sm:px-8">
          {items &&
            items.map((items) => (
              <ConfirmSingle
                key={items?._id}
                order={items}
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

export default PaymentPage;
