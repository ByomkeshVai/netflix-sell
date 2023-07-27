import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import EmptyState from "../../Shared/EmptyState";
import CredentialData from "./CredentialData";
import { Helmet } from "react-helmet";

const AllCredential = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [axiosSecure] = useAxiosSecure();
  const { refetch, data: credential = [] } = useQuery({
    queryKey: ["credential"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/credential`);
      return res.data;
    },
  });
  return (
    <>
      <Helmet>
        <title>Streamcart - All Credential</title>
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
                        User ID
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
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {credential &&
                      credential.map((credential) => (
                        <CredentialData
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
        <EmptyState message="No credential data available." />
      )}
    </>
  );
};

export default AllCredential;
