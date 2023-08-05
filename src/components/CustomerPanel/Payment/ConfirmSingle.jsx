import React, { useState } from "react";
import { setPayment } from "../../../api/payment";
import AddLocation from "./AddLocation";
import Swal from "sweetalert2";

const ConfirmSingle = ({ order, refetch, user }) => {
  let [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [phones, setPhones] = useState(order?.phone);

  const handleSubmitBkash = (e) => {
    e.preventDefault();
    if (!phones) {
      Swal.fire({
        title: "Please add your Address first!",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    } else {
      const setData = {
        amount: order?.prices,
        method: "Bkash",
      };
      setPayment(order?.orderID, setData)
        .then((data) => {
          window.location =
            "https://shop.bkash.com/stream-cart-bangladesh01601699/paymentlink/default-payment";
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      <div className="mt-5 border border-1 p-3">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex gap-2 items-center">
              <h2 className="text-md font-bold">Order Id: {order?.orderID}</h2>
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
            <div>
              <h2>Phone: {order?.phone ? order?.phone : "N/A"}</h2>
              <h2>House/Road/Block: {order?.house ? order?.house : "N/A"}</h2>
              <h2>
                AddressRemarks:
                {order?.addressRemarks ? order?.addressRemarks : "N/A"}
              </h2>
              <h2>District: {order?.district ? order?.district : "N/A"}</h2>
            </div>
          </div>
          <div className="btn btn-active btn-md btn-primary">
            <button onClick={() => setIsEditModalOpen(true)}>
              <h2 className="text-lg">Add Address</h2>
            </button>
            <AddLocation
              isEditModalOpen={isEditModalOpen}
              closeModal={() => setIsEditModalOpen(false)}
              orderID={order?.orderID}
              id={order._id}
              refetch={refetch}
              setIsEditModalOpen={setIsEditModalOpen}
            />
          </div>
        </div>
      </div>

      <h2 className="text-center mt-10 text-3xl">Pay With -</h2>
      <div className="flex gap-10 mt-10 items-center justify-between max-w-2xl mx-auto">
        <button onClick={handleSubmitBkash}>
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
