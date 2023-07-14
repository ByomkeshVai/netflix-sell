import React from "react";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useSelect = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const { refetch, data: select = [] } = useQuery({
    queryKey: ["select", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/customer/select?email=${user?.email}`);
      return res.data;
    },
  });

  return [select, refetch];
};

export default useSelect;
