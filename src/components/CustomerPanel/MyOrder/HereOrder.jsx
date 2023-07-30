import React from "react";
import { setPayment } from "../../../api/payment";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Stepper from "react-stepper-horizontal";
import CurrentStepper from "./CurrentStepper";

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
      Approved: 2,
    };

    // Update the current step based on the order status
    setCurrentStep(statusToStep[order.status]);
  }, [order.status]);

  const handlePayment = () => {
    navigate(`/customer/dashboard/payment-page/${order?.orderID}`);
  };
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
          <div className="mt-5">Price: {order?.prices}</div>
          <div>Placed On: {order?.date}</div>
          <div>Status: {order?.status}</div>
        </div>
        <div>
          <button
            className="btn btn-active btn-error"
            disabled={
              order?.status == "processing" || order?.status == "Approved"
            }
            onClick={handlePayment}
          >
            <h2>payment</h2>
          </button>
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
