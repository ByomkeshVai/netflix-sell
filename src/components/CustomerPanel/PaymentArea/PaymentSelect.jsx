import React from "react";
import useSelect from "../../../hooks/useSelect";
import CheckOutFrom from "./../Payment/CheckOutFrom";

const PaymentSelect = () => {
  const [select] = useSelect();
  const total = select?.reduce((sum, item) => sum + parseInt(item?.price), 0);
  const price = parseFloat(total?.toFixed(2));

  return (
    <div>
      <h2 className="text-xl">Total: {price}</h2>
      <CheckOutFrom select={select} price={price} />
    </div>
  );
};

export default PaymentSelect;
