import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Slide } from "react-awesome-reveal";
import { useState } from "react";
import { useEffect } from "react";

const EachTop = ({ item }) => {
  return (
    <div className="ml-10 card mx-auto w-72 mx-auto bg-base-100 shadow-xl text-slate-50 bg-gradient-to-r from-gray-700 to-slate-600 py-3">
      <figure className="">
        <img
          src={item?.image}
          alt="images"
          className="mx-auto py-2 h-40 w-44 rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="font-bold mt-[-10px] text-3xl">
          {item?.name.substring(0, 10)}
        </h2>
        <p className="text-md">From: {item?.label}</p>
        <p className="text-md mt-[-10px]">Price: {item?.price} BDT</p>
        <div className="">
          <div className="flex gap-7 justify-center ">
            <button className="btn btn-sm rounded-md px-5 border-0 btn-error text-slate-50 bg-gradient-to-r from-rose-700 to-rose-500">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EachTop;

// onClick={() => handleAddToSelect(item)}
