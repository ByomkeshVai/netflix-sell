import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAdmin from "../../../hooks/useAdmin";
import useSelect from "../../../hooks/useSelect";
import { AuthContext } from "../../../providers/AuthProvider";
import toast from "react-hot-toast";
import { Slide } from "react-awesome-reveal";
import { useState } from "react";
import { useEffect } from "react";

const EachTop = ({ item }) => {
  const { image, name, price, stock, _id, duration, category, purchased } =
    item;
  const [isAdmin] = useAdmin();
  const [, refetch] = useSelect();

  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  function generateRandomID() {
    const min = 10000; // Minimum 5-digit number (10000)
    const max = 99999; // Maximum 5-digit number (99999)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const randomID = generateRandomID();

  const handleAddToSelect = (item) => {
    if (user && user.email) {
      const selectItem = {
        selectItemId: _id,
        name,
        image,
        price,
        duration,
        category,
        customer_name: user.name,
        email: user.email,
        status: "unpaid",
      };
      fetch(`${import.meta.env.VITE_API_URL}/customer/select`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
        body: JSON.stringify(selectItem),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            refetch();
            toast.success("Cart Updated, Check Your Dashboard");
          }
        });
    } else {
      navigate("/login", { state: { from: location } });
    }
  };
  return (
    <div className="ml-10 card mx-auto w-72 h-96 mx-auto bg-base-100 shadow-xl text-slate-50 bg-gradient-to-r from-gray-700 to-slate-600 py-3">
      <figure className="">
        <img
          src={item?.image}
          alt="images"
          className="mx-auto py-2 h-40 w-44 rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="font-bold mt-[-10px] text-3xl">
          {item?.name.substring(0, 18)}
        </h2>
        <p className="text-md">From: {item?.label}</p>
        <p className="text-md mt-[-10px]">Price: {item?.price} BDT</p>
        <div className="">
          <div className="flex gap-7 justify-center ">
            <button
              className="btn btn-sm rounded-md px-5 border-0 btn-error text-slate-50 bg-gradient-to-r from-rose-700 to-rose-500"
              disabled={isAdmin}
              onClick={() => handleAddToSelect(item)}
            >
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
