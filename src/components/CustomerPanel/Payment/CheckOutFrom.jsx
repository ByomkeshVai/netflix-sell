import React from "react";
import { useContext, useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { updateItems } from "../../../api/select";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { addPayment } from "../../../api/payment";
import { addDays, format, addHours, addMinutes } from "date-fns";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";

const CheckOutFrom = ({ closeModal, select, selectInfo, price, refetch }) => {
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

  const { data: singleUser = [] } = useQuery({
    queryKey: ["singleUser", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/single/user?email=${user?.email}`);
      return res.data;
    },
  });
  const singleId = singleUser.map((singleId) => singleId.userID);
  const userCode = singleId[0];

  const [userId, setUserId] = useState(user?.email);
  const [promoCode, setPromoCode] = useState("");
  const [productPrice, setProductPrice] = useState(price);
  const [message, setMessage] = useState("");
  const [finalPrice, setFinalPrice] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleApplyPromoCode = (event) => {
    event.preventDefault();
    axiosSecure
      .post("/check-promo", { userId, promoCode, productPrice })
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Promo Code Added",
          text: response.data.message,
        });
        setFinalPrice(response.data.finalPrice);
      })
      .catch((error) => {
        if (error.response) {
          // Server responded with an error status code (e.g., 4xx or 5xx)
          Swal.fire(error.response.data.message);
        } else if (error.request) {
          // Request was made but no response was received
          Swal.fire("No response from the server.");
        } else {
          // Something happened while setting up the request or handling the response
          Swal.fire("Error occurred while processing the request.");
        }
        setFinalPrice(null);
      });
  };

  // console.log(finalPrice);
  // console.log(typeof productPrice);
  // useEffect(() => {
  //   if (discount > 0) {
  //     axiosSecure
  //       .post("/create-payment-intent", { price: discount })
  //       .then((res) => {
  //         setClientSecret(res.data.clientSecret);
  //       });
  //   }
  // }, [select, axiosSecure]);

  function generateRandomID() {
    const min = 10000; // Minimum 5-digit number (10000)
    const max = 99999; // Maximum 5-digit number (99999)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const randomID = generateRandomID();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const productId = select?.selectItemId;
    const name = user.displayName;
    const promo = promoCode;
    const itemName = select?.name;
    const prices = parseFloat(price);
    const discountPrice = finalPrice;
    const remarks = form.remarks.value;
    const phone = form.phone.value;
    const email = form.email.value;
    const bdTimezone = "Asia/Dhaka"; // Timezone for Bangladesh
    const currentDate = new Date();
    const bdCurrentDate = utcToZonedTime(currentDate, bdTimezone);

    // Using date-fns to format the current date and time in a 12-hour format
    const formattedDate = format(bdCurrentDate, "dd-MM-yyyy");
    const formattedTime = format(bdCurrentDate, "hh:mm a"); // 12-hour format with AM/PM

    const checkItems = {
      productId,
      prices,
      itemName,
      remarks,
      userCode,
      discountPrice,
      promo,
      name,
      email,
      phone,
      selectId: select._id,
      status: "unpaid",
      orderID: randomID.toString(),
      amount: "",
      date: formattedDate + " " + " " + formattedTime,

      selectItems: select.map((item) => item._id),
      itemNames: select.map((item) => item.name),
    };

    // post item data to server
    addPayment(checkItems)
      .then((data) => {
        navigate(`/customer/dashboard/payment-page/${randomID}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex mt-2 justify-around">
          <div>
            <div className="mt-2">
              <p className="text-md font-bold text-red-600">
                Base Price: {price} (BDT)
              </p>
            </div>
            <div className="space-y-1 text-sm py-3">
              <label htmlFor="phone" className="block text-gray-900">
                Phone Number
              </label>
              <input
                className="w-full px-4 py-2 text-gray-900 border border-rose-300 focus:outline-rose-500 rounded-md "
                name="phone"
                id="phone"
                type="number"
                placeholder="Add Your Phone Number"
                required
              />
            </div>
            <div className="space-y-1 text-sm py-3">
              <label htmlFor="email" className="block text-gray-900">
                Email
              </label>
              <input
                className="w-full px-4 py-2 text-gray-900 border border-rose-300 focus:outline-rose-500 rounded-md "
                name="email"
                id="email"
                type="email"
                placeholder="Add Your email"
                required
                defaultValue={user.email}
              />
            </div>

            <div className="space-y-1 text-sm py-3">
              <label htmlFor="remarks" className="block text-gray-900">
                Remarks
              </label>
              <textarea
                className="w-full px-4 py-2 text-gray-900 border border-rose-300 focus:outline-rose-500 rounded-md "
                name="remarks"
                id="remarks"
                placeholder="Add Info"
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
                Pay {finalPrice > 0 ? finalPrice : price}৳
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckOutFrom;
