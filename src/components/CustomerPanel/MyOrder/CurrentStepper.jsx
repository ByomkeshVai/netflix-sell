import React from "react";
import Stepper from "react-stepper-horizontal";

const CurrentStepper = ({ currentStep }) => {
  const steps = [
    { title: "Unpaid" },
    { title: "Processing" },
    { title: "Hold" },
    { title: "Approved" },
    { title: "Delivered" },
  ];
  return (
    <Stepper
      steps={steps}
      activeStep={currentStep}
      activeColor="#28a745" // Change this to the color you prefer for the active step
      completeColor="#007bff" // Change this to the color you prefer for completed steps
      defaultColor="#6c757d" // Change this to the color you prefer for the inactive steps
      circleFontColor="#fff" // Change this to the font color you prefer for step titles
    />
  );
};

export default CurrentStepper;
