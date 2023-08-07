import React from "react";
import StatusModal from "./StatusModal";
import { useState } from "react";
import AddressModal from "./AddressModal";
import { FcAddressBook } from "react-icons/fc";

const OrderDataRow = ({ order, refetch, user }) => {
  let [isEditModalOpen, setIsEditModalOpen] = useState(false);
  let [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  let classPending = "bg-yellow-600";
  let classActive = "bg-green-600";
  let classDenied = "bg-red-600";
  let classProccesing = "bg-pink-600";
  let classDelivered = "bg-blue-600";
  let classHold = "bg-yellow-900";

  let itemName = order?.itemNames?.map((str) => str.split(","));

  const statusClass =
    order?.status == "processing"
      ? classProccesing
      : order?.status == "Approved"
      ? classActive
      : order?.status == "unpaid"
      ? classPending
      : order?.status == "Hold"
      ? classHold
      : order?.status == "Delivered"
      ? classDelivered
      : classDenied;
  return (
    <>
      <tr>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">
            {itemName.map((splitStrings, index) => (
              <h2 key={index}>{splitStrings.join(", ")}</h2>
            ))}
          </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">
            {order?.prices} (BDT)
          </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">
            {order?.discountPrice > 0 ? order?.discountPrice : "N/A"}
          </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
          <p className="text-gray-900 whitespace-no-wrap">
            {order?.orderID > 0 ? order?.orderID : "N/A"}
          </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
          <p className="text-gray-900 whitespace-no-wrap">
            se{order?.userCode}
          </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
          <p className="text-gray-900 whitespace-no-wrap">{order?.promo}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
          <p className="text-gray-900 whitespace-no-wrap">
            {order?.amount.method}
          </p>
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
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
          <button className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-slate-50 leading-tight disabled:text-gray-900">
            <span
              className="text-gray-900 whitespace-no-wrap rounded-full px-3 py-1 text-slate-50"
              onClick={() => setIsAddressModalOpen(true)}
            >
              <FcAddressBook size={32} />
            </span>
          </button>
          <AddressModal
            isOpen={isAddressModalOpen}
            closeModal={() => setIsAddressModalOpen(false)}
            order={order}
            id={order._id}
            refetch={refetch}
            setIsAddressModalOpen={setIsAddressModalOpen}
          />
        </td>
      </tr>
    </>
  );
};

export default OrderDataRow;
