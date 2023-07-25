import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

const Profile = () => {
  const { user, logOut, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const { refetch, data: singleUser = [] } = useQuery({
    queryKey: ["singleUser", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/single/user?email=${user?.email}`);
      return res.data;
    },
  });
  return <div></div>;
};

export default Profile;
