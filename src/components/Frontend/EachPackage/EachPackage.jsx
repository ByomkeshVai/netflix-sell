import React, { useContext, useEffect, useState } from "react";
import qs from "query-string";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import SinglePackage from "./SinglePackage";

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
    <div>
      {items.map((item, index) => (
        <SinglePackage key={index} items={item} />
      ))}
    </div>
  );
};

export default EachPackage;
