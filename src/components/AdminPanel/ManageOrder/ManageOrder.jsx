import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet";
import EmptyState from "../../Shared/EmptyState";
import OrderDataRow from "./OrderDataRow";

const ManageOrder = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const { refetch, data: order = [] } = useQuery({
    queryKey: ["order"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/all/order`);
      return res.data;
    },
  });
  const [highlight, setHighlight] = useState(false);
  const tableContainerClassName = highlight ? "bg-red-200" : "";

  // Step 1: Add state for filtering by status
  const [statusFilter, setStatusFilter] = useState("");

  // Step 2: Filter orders based on status
  const filteredOrders = order.filter((order) => {
    return statusFilter == "" || order.status == statusFilter;
  });

  return (
    <>
      <Helmet>
        <title>Stream Cart - Manage Order</title>
      </Helmet>
      {order && Array.isArray(order) && order.length > 0 ? (
        <div className="container mx-auto px-4 sm:px-8">
          <div className="py-8">
            <div className="flex justify-end mb-4">
              <div>
                {/* Filter by status */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border rounded-lg"
                >
                  <option value="">All</option>
                  <option value="Approved">Approved</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Denied">Denied</option>
                  <option value="processing">Processing</option>
                  <option value="Hold">Hold</option>
                </select>
              </div>
            </div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr className={tableContainerClassName}>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        #
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
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Discount
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        OrderID
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        User Id
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Phone
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Promo
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Method
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
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        More
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders &&
                      filteredOrders.map((order, index) => (
                        <OrderDataRow
                          key={index} // It's better to use a unique identifier here
                          order={order}
                          index={index}
                          refetch={refetch}
                          user={user}
                          highlight={highlight}
                          setHighlight={setHighlight}
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
          <EmptyState message="No Order data available." />
        </div>
      )}
    </>
  );
};

export default ManageOrder;
