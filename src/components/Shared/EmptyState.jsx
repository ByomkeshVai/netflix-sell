import React from "react";

const EmptyState = ({ message, address, label }) => {
  return (
    <div className="h-screen gap-5 flex flex-col justify-center items-center pb-16 ">
      <p className="text-gray-600 text-xl lg:text-3xl">{message}</p>
    </div>
  );
};

export default EmptyState;
