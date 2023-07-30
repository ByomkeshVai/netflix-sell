import React from "react";
import qs from "query-string";

import { useNavigate, useSearchParams } from "react-router-dom";

const MLabelBox = ({ label, image, selected }) => {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const handleClick = () => {
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }
    const updatedQuery = {
      ...currentQuery,
      label: label,
    };

    const url = qs.stringifyUrl(
      {
        url: "/all/mobile-cover",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    navigate(url);
  };
  return (
    <div
      onClick={handleClick}
      className={`
        flex 
        flex-col 
        items-center 
        justify-center 
        gap-2

        border-b-2
        hover:text-neutral-800
        transition
        cursor-pointer
        ${
          selected
            ? "border-b-pink-300 text-pink-800"
            : "border-transparent text-pink-500"
        }
     
      `}
    >
      <img src={image} alt="" />
      <div className="text-xl font-medium ">{label}</div>
    </div>
  );
};

export default MLabelBox;
