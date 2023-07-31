import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import CustomerData from "./CustomerData";
import { Helmet } from "react-helmet";
import EmptyState from "../../Shared/EmptyState";

const CustomerCredential = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const { refetch, data: credential = [] } = useQuery({
    queryKey: ["credential", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/user/credential?email=${user?.email}`);
      return res.data;
    },
  });

  return (
    <>
      <Helmet>
        <title>Streamcart - User Credential</title>
      </Helmet>
      {credential && Array.isArray(credential) && credential.length > 0 ? (
        <div className="container mx-auto px-4 sm:px-8">
          <div className="py-8">
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        User Name
                      </th>

                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Item Name
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Credential
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {credential &&
                      credential.map((credential) => (
                        <CustomerData
                          key={credential?._id}
                          credential={credential}
                          refetch={refetch}
                        />
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-screen-xl mx-auto hero mt-14">
          <EmptyState message="No Credential available." />
        </div>
      )}
    </>
  );
};

export default CustomerCredential;
