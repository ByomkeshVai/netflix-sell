import React from "react";
import { setPayment } from "../../../api/payment";

const ConfirmSingle = ({ order, refetch, user }) => {
  const handleSubmit = () => {
    const setData = {
      amount: order?.prices,
    };
    setPayment(order?.orderID, setData)
      .then((data) => {
        window.location =
          "https://shop.bkash.com/stream-cart-bangladesh01601699/paymentlink/default-payment";
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="mt-5 border border-1 p-3">
        <div className="flex gap-2 items-center">
          <h2 className="text-md">Order Id: {order?.orderID}</h2>
          <span className="text-sm">
            (Use this Id as your Bkash Reference Code)
          </span>
        </div>
        <div>
          {order?.itemNames.map((item) => (
            <h2>{item}</h2>
          ))}
        </div>
        <div>Price: {order?.prices}</div>
        <div>Placed On: {order?.date}</div>
        <div>Order Status: {order?.status}</div>
      </div>
      <h2 className="text-center mt-10 text-3xl">Pay With -</h2>
      <div className="flex gap-10 mt-10 items-center justify-between max-w-2xl mx-auto">
        <button onClick={handleSubmit}>
          <img
            className="h-32 w-48"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNjUT1aDf58ol4MsTblmfhk3WuThbQm7vZfF3gXBq_I2H58WT_ZGlRxmuMIPpCmrP3Kxk&usqp=CAU"
            alt=""
          />
        </button>
        <button>
          <img
            className="h-32 w-48"
            src="https://logos-download.com/wp-content/uploads/2022/11/Bank_Transfer_Logo.png"
            alt=""
          />
        </button>
        <button>
          <img
            className="h-48 w-36"
            src="https://static.vecteezy.com/system/resources/previews/020/574/330/original/cash-on-delivery-badge-pack-free-png.png"
            alt=""
          />
        </button>
      </div>
    </>
  );
};

export default ConfirmSingle;
