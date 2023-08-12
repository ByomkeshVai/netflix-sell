import React from "react";
import { setPayment } from "../../../api/payment";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Stepper from "react-stepper-horizontal";
import CurrentStepper from "./CurrentStepper";
import AddLocation from "../Payment/AddLocation";

const HereOrder = ({ order, refetch, user }) => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const amount = form.amount.value;
    const transactionId = form.transactionId.value;
    const itemName = event.target.itemName.value;
    const grabItem = itemName.split(" , ");

    const setData = {
      grabItem,
      amount,
      transactionId,
    };
    console.log(grabItem);
    setPayment(setData)
      .then((data) => {
        toast.success("Payment Added, Wait For Verification!");
        refetch();
      })
      .catch((err) => console.log(err));
  };

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Define a mapping of status values to step index
    const statusToStep = {
      unpaid: 0,
      processing: 1,
      Hold: 2,
      Approved: 3,
      Delivered: 4,
    };

    // Update the current step based on the order status
    setCurrentStep(statusToStep[order.status]);
  }, [order.status]);

  const handlePayment = () => {
    navigate(`/customer/dashboard/payment-page/${order?.orderID}`);
  };

  let [isEditModalOpen, setIsEditModalOpen] = useState(false);
  return (
    <div className="mt-5 border border-1 p-3">
      <div className="flex justify-between items-center">
        <div className="">
          <div className="flex gap-2 items-center">
            <h2 className="text-md font-bold">Order ID: {order?.orderID}</h2>
            <span className="text-sm ">
              (Use this ID as your Bkash Reference Number)
            </span>
          </div>
          <div>
            <h2>My Items-</h2>
            {order?.itemNames.map((item, index) => (
              <h2 className="text-md ">{`${index + 1}: ${item}`}</h2>
            ))}
          </div>
          <div className="mt-5">Price: {order?.amount.amount}</div>
          <div>Placed On: {order?.date}</div>
          <div>Status: {order?.status}</div>
          <div>Method: {order?.amount.method}</div>
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
        <div className="flex flex-col gap-5">
          <button
            className="btn btn-active btn-error"
            disabled={
              order?.status == "processing" ||
              order?.status == "Approved" ||
              order?.status == "Delivered"
            }
            onClick={handlePayment}
          >
            <h2>payment</h2>
          </button>
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
      <div className="max-w-full ">
        <CurrentStepper currentStep={currentStep} />
        {/* <ul className="steps steps-vertical lg:steps-horizontal">
          <li className="step step-primary">Placed</li>
          <li className={`step ${className}`}>Unpaid</li>
          <li className={`step ${className}`}>Processing</li>
          <li className={`step ${className}`}>Approved</li>
        </ul> */}
      </div>
    </div>
  );
};

export default HereOrder;
