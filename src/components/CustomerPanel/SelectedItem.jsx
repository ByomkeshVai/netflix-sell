import React, { useContext, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../providers/AuthProvider";
import { Helmet } from "react-helmet";
import EmptyState from "../Shared/EmptyState";
import { useQuery } from "@tanstack/react-query";
import SelectDataRow from "./SelectDataRow";
import PaymentArea from "./PaymentArea/PaymentArea";
import PaymentSelect from "./PaymentArea/PaymentSelect";
import CheckOutFrom from "./Payment/CheckOutFrom";
import CustomerPayment from "./Payment/CustomerPayment";

const SelectedItem = () => {
  let [isEditModalOpen, setIsEditModalOpen] = useState(false);
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
  const [selectInfo, setSelectInfo] = useState({
    itemId: select.selectItemId,
  });
  const total = select?.reduce((sum, item) => sum + parseInt(item?.price), 0);
  const price = parseFloat(total?.toFixed(2));
  return (
    <>
      <Helmet>
        <title>Stream Cart - Selected Items</title>
      </Helmet>
      {select && Array.isArray(select) && select.length > 0 ? (
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
                        Price
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
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {select &&
                      select.map((select) => (
                        <SelectDataRow
                          key={select?._id}
                          select={select}
                          refetch={refetch}
                          user={user}
                        />
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="flex flex-cols items-center gap-3 justify-end  p-4 ">
            <h2>Total Price: {price} ৳</h2>
            <span className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-slate-50 leading-tight">
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-blue-600 rounded-full"
              ></span>
              <button
                className="relative"
                onClick={() => setIsEditModalOpen(true)}
              >
                Checkout
              </button>
            </span>
          </div>
          <CustomerPayment
            isOpen={isEditModalOpen}
            closeModal={() => setIsEditModalOpen(false)}
            refetch={refetch}
            selectInfo={selectInfo}
            setIsEditModalOpen={setIsEditModalOpen}
            select={select}
            user={user}
          />
        </div>
      ) : (
        <div className="max-w-screen-xl mx-auto hero mt-14">
          <EmptyState message="No data Available On Cart." />
        </div>
      )}
    </>
  );
};

export default SelectedItem;
