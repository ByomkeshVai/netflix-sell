import React, { useContext, useEffect, useState } from "react";
import qs from "query-string";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import SinglePackage from "./SinglePackage";
import SectionHead from "../../Shared/SectionHead";
import EmptyState from "../../Shared/EmptyState";
import EmptyItem from "../../Shared/EmptyItem";

const EachPackage = () => {
  const { category } = useParams();

  const [axiosSecure] = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);
  const { refetch, data: items = [] } = useQuery({
    queryKey: ["items", category],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(
        `${import.meta.env.VITE_API_URL}/all/items/${category}`
      );

      return res.data;
    },
  });

  console.log(items);

  return (
    <>
      <div>
        {items?.slice(0, 1).map((item, index) => (
          <SectionHead slogan={`${item?.category} Packages`}></SectionHead>
        ))}
      </div>
      <div className="max-w-screen-xl mx-auto">
        {items && Array.isArray(items) && items.length > 0 ? (
          <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
            {items.map((item, index) => (
              <SinglePackage key={index} items={item} />
            ))}
          </div>
        ) : (
          <>
            <EmptyItem message={"This Package Will Update Soon"} />
          </>
        )}
      </div>
    </>
  );
};

export default EachPackage;
