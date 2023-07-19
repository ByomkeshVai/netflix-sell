import React, { useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import CheckOutFrom from "./CheckOutFrom";
import { AuthContext } from "../../../providers/AuthProvider";
import { addOrder } from "../../../api/order";

const CustomerPayment = ({
  setIsEditModalOpen,
  isOpen,
  closeModal,
  select,
  user,
  selectInfo,
}) => {
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
    addOrder(checkItems);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
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
                <Dialog.Title
                  as="h3"
                  className="text-lg mb-5 font-medium text-center leading-6 text-gray-900"
                >
                  Please Review Info Before Payment
                </Dialog.Title>
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
                {/* 
                <CheckOutFrom
                  closeModal={closeModal}
                  select={select}
                  handleSubmit={handleSubmit}
                /> */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CustomerPayment;
