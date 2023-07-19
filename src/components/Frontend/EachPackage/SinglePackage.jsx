import React, { useContext } from "react";
import SectionHead from "../../Shared/SectionHead";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAdmin from "../../../hooks/useAdmin";
import useSelect from "./../../../hooks/useSelect";
import { AuthContext } from "../../../providers/AuthProvider";
import toast from "react-hot-toast";

const SinglePackage = ({ items }) => {
  const { image, name, price, stock, _id, duration, category, purchased } =
    items;

  const [isAdmin] = useAdmin();
  const [select] = useSelect();

  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddToSelect = (items) => {
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
            toast.success("Cart Updated, Check Your Dashboard");
          }
        });
    } else {
      navigate("/login", { state: { from: location } });
    }
  };
  return (
    <div>
      <div className="card lg:w-80 w-full bg-base-100 shadow-xl lg:ml-6 hover:scale-110 px-2 text-slate-50 bg-gradient-to-r from-blue-700 to-slate-600">
        <figure className="px-2 pt-3">
          <img
            src={items?.image}
            alt="images"
            className="mx-auto object-cover h-56 w-56 rounded-xl"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="font-bold mt-[-24px] text-2xl">{items?.name}</h2>
          <p className="text-xl">Price: {items?.price} BDT</p>
          <p className="text-md">Duration: {items?.duration}</p>
          <p className="text-sm">Purchased: {items?.purchased}</p>
          <div className="card-actions">
            <button
              className="btn btn-md rounded-md px-10 border-0 btn-error text-slate-50 bg-gradient-to-r from-red-700 to-red-500"
              disabled={isAdmin}
            >
              Buy Now
            </button>
            <button
              className="btn btn-md rounded-md px-10 border-0 btn-error text-slate-50 bg-gradient-to-r from-red-700 to-red-500"
              disabled={isAdmin}
              onClick={() => handleAddToSelect(items)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePackage;
