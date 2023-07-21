import React from "react";
import { useContext, useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { updateItems } from "../../../api/select";

const CheckOutFrom = ({ closeModal, select }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  useEffect(() => {
    if (select.price > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: select.price })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [select, axiosSecure]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const productId = select?.selectItemId;
    const name = user.displayName;
    const email = user.email;
    const itemName = select?.name;
    const price = select?.price;
    const newPrice = parseFloat(price);
    const useremail = form.useremail.value;
    const username = form.username.value;
    const checkItems = {
      productId,
      newPrice,
      itemName,
      useremail,
      username,
      name,
      email,
    };
    console.log(checkItems);
  };
  return (
    <div>
      <form action="">
        <div className="flex mt-2 justify-around">
          <form onSubmit={handleSubmit}>
            <div className="mt-2">
              <p className="text-md text-gray-900">
                Items Name: {select?.name}
              </p>
            </div>
            <div className="mt-2">
              <p className="text-md text-gray-900">
                Price: {select?.price} (BDT)
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
                Pay ${select.price}
              </button>
            </div>
          </form>
        </div>
      </form>
    </div>
  );
};

export default CheckOutFrom;
