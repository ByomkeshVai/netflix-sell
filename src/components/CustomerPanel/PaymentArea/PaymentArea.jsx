import React from "react";
import PaymentSelect from "./PaymentSelect";

const PaymentArea = ({ select, user, refetch }) => {
  return (
    <>
      {select &&
        select.map((select) => (
          <PaymentSelect
            key={select?._id}
            select={select}
            refetch={refetch}
            user={user}
          ></PaymentSelect>
        ))}
    </>
  );
};

export default PaymentArea;
