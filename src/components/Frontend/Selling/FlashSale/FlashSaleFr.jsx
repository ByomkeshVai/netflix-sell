import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAdmin from "../../../../hooks/useAdmin";
import useSelect from "../../../../hooks/useSelect";
import { AuthContext } from "../../../../providers/AuthProvider";
import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";

const FlashSaleFr = ({ flash }) => {
  const { image, name, price, stock, _id, duration, category, purchased } =
    flash;

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

  const handleAddToSelect = (flash) => {
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
    <div className="card lg:w-72 mb-10 w-60 h-96 mx-auto bg-base-100 shadow-xl lg:ml-6 hover:scale-110 px-2 text-slate-50 bg-gradient-to-r from-blue-700 to-slate-600">
      <figure className="px-2 pt-3">
        <img
          src={flash?.image}
          alt="images"
          className="mx-auto mt-4 mb-4 object-cover h-40 w-40 rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="font-bold mt-[-24px] text-xl">
          {flash?.name.substring(0, 15)}
        </h2>
        <p className="text-md">Price: {flash?.price} BDT</p>
        <p className="text-sm">Validity: {flash?.duration} Days</p>
        <p className="text-sm">Stock: {flash?.stock}</p>
        <div className="">
          <div className="flex gap-3 justify-center mt-5">
            <button className="btn btn-sm rounded-md lg:px-5 border-0 btn-error text-slate-50 bg-gradient-to-r from-rose-700 to-rose-500">
              <Link to={`/productDetails/${flash?._id}`}>View Item</Link>
            </button>
            <button
              className="btn btn-sm rounded-md lg:px-5 border-0 btn-error text-slate-50 bg-gradient-to-r from-rose-700 to-rose-500"
              disabled={isAdmin}
              onClick={() => handleAddToSelect(flash)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashSaleFr;
