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

  console.log(items);
  const [images, setImages] = useState({
    img1: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,b_rgb:f5f5f5/3396ee3c-08cc-4ada-baa9-655af12e3120/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
    img2: "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/e44d151a-e27a-4f7b-8650-68bc2e8cd37e/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
    img3: "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/44fc74b6-0553-4eef-a0cc-db4f815c9450/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
    img4: "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/d3eb254d-0901-4158-956a-4610180545e5/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
  });

  {
    items.map((product) => {
      <SingleProduct />;
    });
  }

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
