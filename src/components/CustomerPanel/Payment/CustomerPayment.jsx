import React, { useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import CheckOutFrom from "./CheckOutFrom";
import { AuthContext } from "../../../providers/AuthProvider";
import { addOrder } from "../../../api/order";
import useSelect from "../../../hooks/useSelect";

const CustomerPayment = ({
  setIsEditModalOpen,
  isOpen,
  closeModal,
  user,
  selectInfo,
}) => {
  const [select] = useSelect();
  const total = select?.reduce((sum, item) => sum + parseInt(item?.price), 0);
  const price = parseFloat(total?.toFixed(2));
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

                <CheckOutFrom
                  closeModal={closeModal}
                  select={select}
                  price={price}
                  selectInfo={selectInfo}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CustomerPayment;
