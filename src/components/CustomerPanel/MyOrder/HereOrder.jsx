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

  return (
    <div className="mt-5 border border-1 p-3">
      <div>
        {order?.itemNames.map((item) => (
          <h2>{item}</h2>
        ))}
      </div>
      <div>Price: {order?.prices}</div>
      <div>Placed On: {order?.date}</div>
      <div>Placed On: {order?.status}</div>
      <div>Order Id: {order?.orderID}</div>
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
