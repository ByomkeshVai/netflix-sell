import React from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import SaleItemCard from "./SaleItemCard";

const SaleItems = () => {
  const { option } = useParams();

  const [axiosSecure] = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);
  const { refetch, data: items = [] } = useQuery({
    queryKey: ["items"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(
        `${import.meta.env.VITE_API_URL}/items/flashSale/${option}`
      );

      return res.data;
    },
  });
  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-8">
        {items.map((items, index) => (
          <SaleItemCard key={index} items={items} />
        ))}
      </div>
    </div>
  );
};

export default SaleItems;
