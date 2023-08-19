import React from "react";
import InfinityScrollItem from "./InfinityScrollItem";

const InfinityScrollCard = ({ items }) => {
  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-8">
        {items.map((items, index) => (
          <InfinityScrollItem key={index} items={items} />
        ))}
      </div>
    </div>
  );
};

export default InfinityScrollCard;
