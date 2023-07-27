import React from "react";
import { useContext } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import EmptyState from "../Shared/EmptyState";
import TableData from "./TableData";
import { AuthContext } from "../../providers/AuthProvider";

const AllItems = () => {
  const [axiosSecure] = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);
  const { refetch, data: items = [] } = useQuery({
    queryKey: ["items"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(
        `${import.meta.env.VITE_API_URL}/all/items`
      );

      return res.data;
    },
  });
  return (
    <>
      <Helmet>
        <title>Streamcart - My Items</title>
      </Helmet>
      {items && Array.isArray(items) && items.length > 0 ? (
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
                        Image
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Category
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Stock
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Price (৳- BDT)
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Purchased
                      </th>

                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Duration
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Type
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
                    {items &&
                      items.map((items) => (
                        <TableData
                          key={items?._id}
                          items={items}
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
        <EmptyState message="No Items data available." />
      )}
    </>
  );
};

export default AllItems;
