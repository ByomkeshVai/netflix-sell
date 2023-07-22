import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { addPromoData } from "../../../api/promo";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { TbFidgetSpinner } from "react-icons/Tb";

const AddPromo = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [axiosSecure] = useAxiosSecure();
  const { refetch, data: items = [] } = useQuery({
    queryKey: ["items"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(
        `${import.meta.env.VITE_API_URL}/all/items`
      );

      return res.data;
    },
  });

  console.log(items);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const promo = event.target.promo.value;
    const product = event.target.product.value;
    const discount = event.target.discount.value;
    const duration = event.target.duration.value;
    const itemData = {
      promo,
      discount: parseInt(discount),
      duration: parseInt(duration),
      product,
    };
    console.log(itemData);

    addPromoData(itemData)
      .then((data) => {
        setLoading(false);
        toast.success("Promo Code Added");
        navigate("/admin/dashboard/allpromo");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="max-w-screen-xl mx-auto min-h-[calc(100vh-270px)] flex flex-col justify-center  text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleSubmit}>
        <div className="mx-auto lg:w-3/6 w-full">
          <div className="space-y-6">
            <div className="space-y-1 text-sm mx-auto">
              <label htmlFor="product" className="block text-gray-600">
                Item Name
              </label>
              <select
                required
                className="w-full px-4 py-3 border-rose-300 focus:outline-rose-500 rounded-md"
                name="product"
              >
                {items.map((items) => (
                  <option value={items.name} key={items.name}>
                    {items.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-6">
              <div className="space-y-1 text-sm">
                <label htmlFor="promo" className="block text-gray-600">
                  Promo Code
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                  name="promo"
                  id="promo"
                  type="text"
                  placeholder="Promo Code"
                  required
                />
              </div>
            </div>

            <div className="lg:flex lg:flex-row flex-col justify-between gap-2">
              <div className="space-y-1 text-sm">
                <label htmlFor="discount" className="block text-gray-600">
                  Discount Price
                </label>
                <div className="flex items-center gap-3">
                  <input
                    className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                    name="discount"
                    id="discount"
                    type="number"
                    placeholder="Discount Price"
                  />
                  <span>%</span>
                </div>
              </div>

              <div className="space-y-1 text-sm">
                <label htmlFor="duration" className="block text-gray-600">
                  Discount Duration
                </label>
                <div className="flex items-center gap-3">
                  <input
                    className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                    name="duration"
                    id="duration"
                    type="number"
                    placeholder="Duration"
                  />
                  <span className="text-md">Days</span>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-[#085885]"
            >
              {loading ? (
                <TbFidgetSpinner className="m-auto animate-spin" size={24} />
              ) : (
                "Save & Continue"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPromo;
