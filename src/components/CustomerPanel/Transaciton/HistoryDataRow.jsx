import React from "react";

const HistoryDataRow = ({ transaction, refetch, user }) => {
  let itemName = transaction?.itemNames?.map((str) => str.split(","));
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
            {transaction?.prices} (BDT)
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
            {transaction?.date}
          </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
          <p className="text-gray-900 whitespace-no-wrap">
            {transaction?.remarks}
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
