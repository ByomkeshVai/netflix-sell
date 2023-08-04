import { Slide } from "react-awesome-reveal";
import React, { useContext } from "react";
import useAdmin from "../../../hooks/useAdmin";
import useSelect from "../../../hooks/useSelect";
import { AuthContext } from "../../../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const EachCategory = ({ item }) => {
  const { image, name, price, stock, _id, duration, category } = item;

  const [isAdmin] = useAdmin();
  const [, refetch] = useSelect();

  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

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
    <Slide damping={0.1} direction="right">
      <div className="card lg:w-80 w-72 mx-auto bg-base-100 shadow-xl lg:ml-6 hover:scale-110 px-2 text-slate-50 bg-gradient-to-r from-blue-700 to-slate-600">
        <figure className="px-2 pt-3">
          <img
            src={item?.image}
            alt="images"
            className="mx-auto mt-4 mb-4 object-cover h-40 w-40 rounded-xl"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="font-bold mt-[-24px] text-xl">{item?.name}</h2>
          <p className="text-md">Price: {item?.price} BDT</p>
          <p className="text-sm">Validity: {item?.duration} Days</p>
          <p className="text-sm">Stock: {item?.stock}</p>
          <div className="">
            <div className="flex gap-3 justify-center mt-5">
              <button className="btn btn-sm rounded-md px-5 border-0 btn-error text-slate-50 bg-gradient-to-r from-rose-700 to-rose-500">
                <a href={`/productDetails/${item?._id}`}>View Item</a>
              </button>
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
    </Slide>
  );
};

export default EachCategory;
