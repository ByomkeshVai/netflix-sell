import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import EmptyState from "../../Shared/EmptyState";
import HistoryDataRow from "./HistoryDataRow";
import { Helmet } from "react-helmet";

const Transaciton = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const { refetch, data: transaction = [] } = useQuery({
    queryKey: ["transaction", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(
        `/customer/transaction?email=${user?.email}`
      );
      return res.data;
    },
  });

  console.log(transaction);
  return (
    <>
      <Helmet>
        <title>Stream Cart - Transaction History</title>
      </Helmet>
      {transaction && Array.isArray(transaction) && transaction.length > 0 ? (
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
                        Item Name
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        price
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Discount Price
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        transaction Id
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Remarks
                      </th>

                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {transaction &&
                      transaction.map((transaction) => (
                        <HistoryDataRow
                          key={transaction?._id}
                          transaction={transaction}
                          refetch={refetch}
                          user={user}
                        />
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <EmptyState message="No Transaction History available." />
      )}
    </>
  );
};

export default Transaciton;
