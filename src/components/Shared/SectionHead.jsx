import React from "react";

const SectionHead = ({ slogan }) => {
  return (
    <div class="container flex justify-center mx-auto mt-6">
      <div className="gallery-head mx-auto">
        <h2 className="text-center text-4xl font-bold ">Our Top Packages</h2>
        <div className="divider before:bg-gray-900 after:bg-gray-900 "></div>
      </div>
    </div>
  );
};

export default SectionHead;
