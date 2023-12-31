import React from "react";
import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import DeleteModal from "../../Modal/DeleteModal";

const AddressModal = ({
  setIsAddressModalOpen,
  isOpen,
  refetch,
  order,
  id,
}) => {
  let [isOpen2, setIsOpen2] = useState(false);
  function openModal() {
    setIsOpen2(true);
  }
  function closeModal() {
    setIsOpen2(false);
  }
  const modalHandler = (id) => {
    deleteUser(id)
      .then((data) => {
        refetch();
        toast.success("User deleted");
      })
      .catch((err) => console.log(err));
    closeModal();
  };
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsAddressModalOpen(false)}
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
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium text-center leading-6 text-gray-900"
                >
                  Customer Address
                </Dialog.Title>
                <div className="mt-2 max-w-screen-xl mx-auto">
                  <h2 className="text-lg text-center mb-2 mt-10">
                    Phone: {order?.phone ? order?.phone : "N/A"}
                  </h2>
                  <h2 className="text-lg text-center mb-2">
                    House/Road/Block: {order?.house ? order?.house : "N/A"}
                  </h2>
                  <h2 className="text-lg text-center mb-2">
                    Address:{" "}
                    {order?.addressRemarks ? order?.addressRemarks : "N/A"}
                  </h2>
                  <h2 className="text-lg text-center mb-2">
                    Division: {order?.district ? order?.district : "N/A"}
                  </h2>
                  <h2 className="text-lg text-center mb-2">
                    Remarks: {order?.remarks ? order?.remarks : "N/A"}
                  </h2>
                </div>
                <hr className="mt-8 " />
                <div className="mt-2 flex mt-2 justify-around">
                  <button
                    type="submit"
                    className=" inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-slate-50 hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => setIsAddressModalOpen(false)}
                  >
                    Okay
                  </button>
                  <button
                    className=" inline-flex justify-center rounded-md border border-transparent bg-red-300 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    onClick={openModal}
                  >
                    Delete
                  </button>
                  <DeleteModal
                    isOpen={isOpen2}
                    closeModal={closeModal}
                    modalHandler={modalHandler}
                    id={order._id}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddressModal;
