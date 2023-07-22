import React from "react";
import { useContext, useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { updateItems } from "../../../api/select";
import { useQuery } from "@tanstack/react-query";

const CheckOutFrom = ({ closeModal, select, selectInfo }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  // const { refetch, data: promo = [] } = useQuery({
  //   queryKey: ["promo", user?.email],
  //   queryFn: async () => {
  //     const res = await axiosSecure(`/all/promo`);
  //     return res.data;
  //   },
  // });

  const [userId, setUserId] = useState(user?.email);
  const [promoCode, setPromoCode] = useState("");
  const [productName, setProductName] = useState(select?.name);
  const [message, setMessage] = useState("");
  const [finalPrice, setFinalPrice] = useState(null);

  const handleApplyPromoCode = (event) => {
    event.preventDefault();
    axiosSecure
      .post("/check-promo", { userId, promoCode, productName })
      .then((response) => {
        setMessage(response.data.message);
        setFinalPrice(response.data.finalPrice);
      })
      .catch((error) => {
        if (error.response) {
          // Server responded with an error status code (e.g., 4xx or 5xx)
          setMessage(error.response.data.message);
        } else if (error.request) {
          // Request was made but no response was received
          setMessage("No response from the server.");
        } else {
          // Something happened while setting up the request or handling the response
          setMessage("Error occurred while processing the request.");
        }
        setFinalPrice(null);
      });
  };

  // useEffect(() => {
  //   if (discount > 0) {
  //     axiosSecure
  //       .post("/create-payment-intent", { price: discount })
  //       .then((res) => {
  //         setClientSecret(res.data.clientSecret);
  //       });
  //   }
  // }, [select, axiosSecure]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const productId = select?.selectItemId;
    const name = user.displayName;
    const email = user.email;
    const promo = promoCode;
    const itemName = select?.name;
    const oldprice = select?.price;
    const price = parseFloat(oldprice);
    const discountPrice = finalPrice;
    const useremail = form.useremail.value;
    const username = form.username.value;
    const checkItems = {
      productId,
      price,
      itemName,
      useremail,
      username,
      discountPrice,
      promo,
      name,
      email,
    };
    console.log(checkItems);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex mt-2 justify-around">
          <div>
            <div className="mt-2">
              <p className="text-md text-gray-900">
                Items Name: {select?.name}
              </p>
            </div>
            <div className="mt-2">
              <p className="text-md text-gray-900">
                Main Price: {select?.price} (BDT)
              </p>
            </div>
            <div className="space-y-1 text-sm py-3">
              <label htmlFor="username" className="block text-gray-900">
                User Name:
              </label>
              <input
                className="w-full px-4 py-3 text-gray-900 border border-rose-300 focus:outline-rose-500 rounded-md "
                name="username"
                id="username"
                type="text"
                placeholder="This name will be used for create your selected account"
              />
            </div>

            <div className="space-y-1 text-sm py-3">
              <label htmlFor="useremail" className="block text-gray-900">
                Email:
              </label>
              <input
                className="w-full px-4 py-3 text-gray-900 border border-rose-300 focus:outline-rose-500 rounded-md "
                name="useremail"
                id="useremail"
                type="email"
                placeholder="This email will be used for create your selected account"
              />
            </div>
            <div className="space-y-1 text-sm py-3">
              <label htmlFor="promo" className="block text-gray-900">
                Promo Code (if Any)
              </label>
              <div className="flex items-center gap-5">
                <input
                  className="w-full px-4 py-3 text-gray-900 border border-rose-300 focus:outline-rose-500 rounded-md "
                  name="promo"
                  id="promo"
                  type="promo"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Promo Code"
                />
                <button
                  onClick={handleApplyPromoCode}
                  className="btn btn-sm bg-green-600"
                >
                  Apply Promo
                </button>
              </div>
              {message && (
                <p className="text-md text-red-600 text-center">{message}</p>
              )}
              {finalPrice !== null && (
                <p className="text-xl text-blue-700 text-center">
                  Final Price: {finalPrice}৳
                </p>
              )}
            </div>
            <hr className="mt-8 " />
            <div className="flex mt-2 justify-around">
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
              >
                Pay {finalPrice > 0 ? finalPrice : select?.price}৳
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckOutFrom;
