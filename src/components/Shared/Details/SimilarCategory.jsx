import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../providers/AuthProvider";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import EachCategory from "./EachCategory";
import SectionHead from "../SectionHead";

const SimilarCategory = ({ category }) => {
  const [axiosSecure] = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);
  const { refetch, data: items = [] } = useQuery({
    queryKey: ["items", category],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(
        `${import.meta.env.VITE_API_URL}/items/${category}`
      );

      return res.data;
    },
  });
  console.log(items);

  const maping = items.map((items) => items.name);

  return (
    <>
      <div>
        <div className="max-w-screen-xl mx-auto lg:py-10 pb-5">
          <SectionHead slogan={"Find Similar Product"}></SectionHead>
          <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-8 mt-8">
            {items.map((item, index) => (
              <EachCategory key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SimilarCategory;
