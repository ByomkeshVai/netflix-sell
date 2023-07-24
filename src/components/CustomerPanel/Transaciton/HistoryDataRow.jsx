import React from "react";

const HistoryDataRow = ({ transaction, refetch, user }) => {
  return (
    <>
      <tr>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">
            {transaction?.itemName}
          </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">
            {transaction?.price} (BDT)
          </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">
            {transaction?.discountPrice > 0
              ? transaction?.discountPrice
              : "N/A"}
          </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
          <p className="text-gray-900 whitespace-no-wrap">
            {transaction?.transactionId > 0
              ? transaction?.transactionId
              : "N/A"}
          </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
          <p className="text-gray-900 whitespace-no-wrap">
            {transaction?.status}
          </p>
        </td>
      </tr>
    </>
  );
};

export default HistoryDataRow;
