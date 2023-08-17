import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAdmin from "../../../hooks/useAdmin";
import useSelect from "../../../hooks/useSelect";
import { AuthContext } from "../../../providers/AuthProvider";
import toast from "react-hot-toast";
import { Slide } from "react-awesome-reveal";
import { useState } from "react";
import { useEffect } from "react";
import Loader from "../../Shared/Loader";

const SaleItemCard = ({ items }) => {
  const { image, name, price, stock, _id, duration, category, purchased } =
    items;

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
            refetch();
            toast.success("Cart Updated, Check Your Dashboard");
          }
        });
    } else {
      navigate("/login", { state: { from: location } });
    }
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading with setTimeout for demonstration purposes
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulating 2 seconds of loading time
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      {isLoading ? (
        // Show the loading screen while data is loading
        <div className="mx-auto">
          <Loader></Loader>
        </div>
      ) : (
        <Slide damping={0.1} direction="right">
          <div className="card lg:w-72 w-72 mx-auto bg-base-100 shadow-xl lg:ml-6 hover:scale-110 px-2 text-slate-50 bg-gradient-to-r from-blue-700 to-slate-600">
            <figure className="px-2 pt-3">
              <img
                src={items?.image}
                alt="images"
                className="mx-auto mt-4 mb-4 object-cover h-40 w-40 rounded-xl"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="font-bold mt-[-24px] text-xl">{items?.name}</h2>
              <p className="text-md">Price: {items?.price} BDT</p>
              <p className="text-sm">Validity: {items?.duration} Days</p>
              <p className="text-sm">Stock: {items?.stock}</p>
              {/* <p className="text-sm">Purchased: {items?.purchased}</p> */}
              <div className="">
                <div className="flex gap-3 justify-center mt-5">
                  <button className="btn btn-sm rounded-md px-5 border-0 btn-error text-slate-50 bg-gradient-to-r from-rose-700 to-rose-500">
                    <Link to={`/productDetails/${items?._id}`}>View Item</Link>
                  </button>
                  <button
                    className="btn btn-sm rounded-md px-5 border-0 btn-error text-slate-50 bg-gradient-to-r from-rose-700 to-rose-500"
                    disabled={isAdmin}
                    onClick={() => handleAddToSelect(items)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Slide>
      )}
    </div>
  );
};

export default SaleItemCard;
