import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import SingleProduct from "./SingleProduct";
import SectionHead from "../SectionHead";
import SimilarCategory from "./SimilarCategory";

const ProductDetails = () => {
  const { id } = useParams();

  const [axiosSecure] = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);
  const { refetch, data: items = [] } = useQuery({
    queryKey: ["items"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(
        `${import.meta.env.VITE_API_URL}/single/items/${id}`
      );

      return res.data;
    },
  });

  return (
    <>
      <div className="lg:max-w-5xl mx-auto py-10 max-w-lg">
        <div className="flex flex-col justify-between lg:flex-row gap-16 lg:items-center">
          {items?.map((product) => (
            <SingleProduct key={product._id} product={product} />
          ))}
        </div>
      </div>
      <div className="lg:max-w-7xl mx-auto py-10 max-w-lg">
        <div>
          {items?.map((product) => (
            <SimilarCategory key={product._id} category={product?.category} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
