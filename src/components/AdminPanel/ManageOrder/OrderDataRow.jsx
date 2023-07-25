import React from "react";
import StatusModal from "./StatusModal";
import { useState } from "react";

const OrderDataRow = ({ order, refetch, user }) => {
  let [isEditModalOpen, setIsEditModalOpen] = useState(false);
  let classPending = "bg-blue-600";
  let classActive = "bg-green-600";
  let classDenied = "bg-green-600";

  const statusClass =
    order?.status === "Approved"
      ? classActive
      : order?.status === "unpaid"
      ? classPending
      : classDenied;
  return (
    <>
      <tr>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{order?.itemName}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">
            {order?.price} (BDT)
          </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">
            {order?.discountPrice > 0 ? order?.discountPrice : "N/A"}
          </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
          <p className="text-gray-900 whitespace-no-wrap">
            {order?.transactionId > 0 ? order?.transactionId : "N/A"}
          </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
          <p className="text-gray-900 whitespace-no-wrap">{order?.promo}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
          <p className="text-gray-900 whitespace-no-wrap">{order?.username}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
          <p className="text-gray-900 whitespace-no-wrap">{order?.useremail}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
          <p className="text-gray-900 whitespace-no-wrap">{order?.feedback}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
          <button className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-slate-50 leading-tight disabled:text-gray-900">
            <span
              className={`text-gray-900 whitespace-no-wrap rounded-full px-3 py-1 text-slate-50 ${statusClass} `}
              onClick={() => setIsEditModalOpen(true)}
            >
              {order?.status}
            </span>
          </button>
          <StatusModal
            isOpen={isEditModalOpen}
            closeModal={() => setIsEditModalOpen(false)}
            order={order}
            id={order._id}
            refetch={refetch}
            setIsEditModalOpen={setIsEditModalOpen}
          />
        </td>
      </tr>
    </>
  );
};

export default OrderDataRow;
