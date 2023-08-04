import React, { useState } from "react";
import { TbFidgetSpinner } from "react-icons/Tb";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { categories } from "../Category/CategoryData";

const AddItemForm = ({
  handleSubmit,
  loading,
  handleImageChange,
  handleImageChange2,
  handleImageChange3,
  handleImageChange4,
  uploadButtonText,
  uploadButtonText2,
  uploadButtonText3,
  uploadButtonText4,
  handleOptionChange,
}) => {
  const [axiosSecure] = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const { refetch, data: category = [] } = useQuery({
    queryKey: ["category"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(
        `${import.meta.env.VITE_API_URL}/all/category`
      );

      return res.data;
    },
  });

  return (
    <div className="max-w-screen-xl mx-auto min-h-[calc(100vh-270px)] flex flex-col justify-center  text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleSubmit}>
        <div className="mx-auto lg:w-3/6 w-full">
          <div className="space-y-6">
            <div className="space-y-1 text-sm mx-auto">
              <label htmlFor="category" className="block text-gray-600">
                Category
              </label>
              <select
                required
                className="w-full px-4 py-3 border-rose-300 focus:outline-rose-500 rounded-md"
                name="category"
              >
                {categories?.map((category) => (
                  <option value={category.category} key={category.category}>
                    {category?.category}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1 text-sm mx-auto">
              <label htmlFor="category" className="block text-gray-600">
                Sub Category
              </label>
              <select
                required
                className="w-full px-4 py-3 border-rose-300 focus:outline-rose-500 rounded-md"
                name="label"
              >
                {category?.map((categorys) => (
                  <option value={categorys.label} key={categorys.label}>
                    {categorys?.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-6">
              <div className="space-y-1 text-sm">
                <label htmlFor="name" className="block text-gray-600">
                  Item Name
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                  name="name"
                  id="name"
                  type="text"
                  placeholder="Item Name"
                  required
                />
              </div>
            </div>

            <div className=" p-4 bg-white w-full  m-auto rounded-lg ">
              <h2 className="mb-5">Main Image</h2>
              <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                <div className="flex flex-col w-max mx-auto text-center">
                  <label className="block text-gray-600">
                    <input
                      onChange={(event) => {
                        handleImageChange(event.target.files[0]);
                      }}
                      className="text-sm cursor-pointer w-36 hidden"
                      type="file"
                      name="image"
                      id="image"
                      accept="image/*"
                      hidden
                    />
                    <div className="bg-[#085885] text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-info-500">
                      {uploadButtonText}
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <div className=" p-4 bg-white w-full  m-auto rounded-lg ">
              <h2 className="mb-5">2nd Image</h2>
              <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                <div className="flex flex-col w-max mx-auto text-center">
                  <label className="block text-gray-600">
                    <input
                      onChange={(event) => {
                        handleImageChange2(event.target.files[0]);
                      }}
                      className="text-sm cursor-pointer w-36 hidden"
                      type="file"
                      name="image2"
                      id="image2"
                      accept="image/*"
                      hidden
                    />
                    <div className="bg-[#085885] text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-info-500">
                      {uploadButtonText2}
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <div className=" p-4 bg-white w-full  m-auto rounded-lg ">
              <h2 className="mb-5">3rd Image</h2>
              <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                <div className="flex flex-col w-max mx-auto text-center">
                  <label className="block text-gray-600">
                    <input
                      onChange={(event) => {
                        handleImageChange3(event.target.files[0]);
                      }}
                      className="text-sm cursor-pointer w-36 hidden"
                      type="file"
                      name="image3"
                      id="image3"
                      accept="image/*"
                      hidden
                    />
                    <div className="bg-[#085885] text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-info-500">
                      {uploadButtonText3}
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <div className=" p-4 bg-white w-full  m-auto rounded-lg ">
              <h2 className="mb-5">4th Image</h2>
              <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                <div className="flex flex-col w-max mx-auto text-center">
                  <label className="block text-gray-600">
                    <input
                      onChange={(event) => {
                        handleImageChange4(event.target.files[0]);
                      }}
                      className="text-sm cursor-pointer w-36 hidden"
                      type="file"
                      name="image4"
                      id="image4"
                      accept="image/*"
                      hidden
                    />
                    <div className="bg-[#085885] text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-info-500">
                      {uploadButtonText4}
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div className="lg:flex lg:flex-row flex-col justify-between gap-2">
              <div className="space-y-1 text-sm">
                <label htmlFor="price" className="block text-gray-600">
                  Price
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                  name="price"
                  id="price"
                  type="number"
                  placeholder="Price"
                  required
                />
              </div>
              <div className="lg:flex lg:flex-row flex-col justify-between gap-2">
                <div className="space-y-1 text-sm">
                  <label htmlFor="stock" className="block text-gray-600">
                    Stock
                  </label>
                  <input
                    className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                    name="stock"
                    id="stock"
                    type="number"
                    placeholder="stock"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1 text-sm">
                <label htmlFor="duration" className="block text-gray-600">
                  Validity (in Days)
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                  name="duration"
                  id="duration"
                  type="number"
                  placeholder="Total duration (in Days)"
                />
              </div>
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="description" className="block text-gray-600">
                Description
              </label>
              <textarea
                className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                name="description"
                id="description"
                type="text"
                placeholder="Item Description"
                required
              />
            </div>
            <div className="space-y-1 text-sm mx-auto">
              <label htmlFor="type" className="block text-gray-600">
                Select Product Type:
              </label>
              <select
                required
                className="w-full px-4 py-3 border-rose-300 focus:outline-rose-500 rounded-md"
                name="type"
                onChange={(e) => handleOptionChange(e.target.value)}
              >
                <option value="">-- Select --</option>
                <option value="topRated">Top Rated Product</option>
                <option value="newArrival">New Arrival</option>
                <option value="nowTrending">Now Trending</option>
              </select>
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

export default AddItemForm;
