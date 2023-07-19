import React from "react";
import update from "../../assets/lottie/update.json";
import Lottie, { useLottie } from "lottie-react";

const EmptyItem = ({ message }) => {
  return (
    <div>
      <div className="h-screen  flex flex-col justify-center items-center pb-16 ">
        <Lottie animationData={update} loop={true} className="h-48 w-48" />
        <p className="text-gray-900 text-xl lg:text-3xl">{message}</p>
      </div>
    </div>
  );
};

export default EmptyItem;
