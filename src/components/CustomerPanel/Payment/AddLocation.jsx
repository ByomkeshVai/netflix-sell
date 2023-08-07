import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import toast from "react-hot-toast";
import { addAddress } from "../../../api/utlits";
import { TbFidgetSpinner } from "react-icons/Tb";
const districtsOfBangladesh = [
  "Dhaka",
  "Chittagong",
  "Rajshahi",
  "Khulna",
  "Barisal",
  "Sylhet",
  "Rangpur",
];
const AddLocation = ({
  setIsEditModalOpen,
  isEditModalOpen,
  refetch,
  orderID,
  id,
}) => {
  const [loading, setLoading] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    setLoading(true);
    const phone = event.target.phone.value;
    const house = event.target.house.value;
    const addressRemarks = event.target.address.value;
    const addressData = {
      house: house,
      phone: phone,
      district: selectedDistrict,
      addressRemarks: addressRemarks,
    };

    addAddress(addressData, id)
      .then((data) => {
        toast.success("Location info updated");
        refetch();
        setIsEditModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <Transition appear show={isEditModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsEditModalOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="mt-2 w-full">
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-10">
                      <div className="space-y-1 text-sm">
                        <label htmlFor="phone" className="block text-gray-600">
                          Phone Number
                        </label>
                        <input
                          className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                          name="phone"
                          id="phone"
                          type="number"
                          placeholder="phone"
                          required
                        />
                      </div>

                      <div className="space-y-1 text-sm">
                        <label htmlFor="house" className="block text-gray-600">
                          House/Road/Block
                        </label>
                        <input
                          className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                          name="house"
                          id="house"
                          type="text"
                          placeholder="House/Road/Block"
                          required
                        />
                      </div>

                      <div className="space-y-1 text-sm">
                        <label
                          htmlFor="address"
                          className="block text-gray-600"
                        >
                          Address Remarks
                        </label>
                        <textarea
                          className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                          name="address"
                          id="address"
                          placeholder="address"
                          required
                        />
                      </div>
                      <div className="space-y-1 text-sm">
                        <label
                          htmlFor="district"
                          className="block text-gray-600"
                        >
                          Select Division
                        </label>
                        <select
                          className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-rose-500 rounded-md"
                          value={selectedDistrict}
                          onChange={handleDistrictChange}
                        >
                          <option value="">-- Select Division --</option>
                          {districtsOfBangladesh.map((district) => (
                            <option key={district} value={district}>
                              {district}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-rose-500"
                    >
                      {loading ? (
                        <TbFidgetSpinner
                          className="m-auto animate-spin"
                          size={24}
                        />
                      ) : (
                        "Update"
                      )}
                    </button>
                  </form>
                </div>
                <hr className="mt-8 " />
                <div className="flex mt-2 justify-around">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                    onClick={() => setIsEditModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddLocation;
