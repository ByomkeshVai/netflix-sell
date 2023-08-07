import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { UpdateUser } from "../../../api/auth";
import { useNavigate } from "react-router-dom";

const RoleModal = ({ setIsEditModalOpen, isOpen, refetch, users, id }) => {
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const roleData = {
      role: role,
    };
    UpdateUser(id, roleData)
      .then((data) => {
        if (data.modifiedCount == 1) {
          setLoading(false);
          toast.success("Role Updated!");
          navigate("/admin/dashboard/users");
          refetch();
          setIsEditModalOpen(false);
        }
      })
      .catch((err) => console.log(err));

    setLoading(false);
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
                  className="text-lg font-medium text-center leading-6 text-gray-900"
                >
                  Set Role For User
                </Dialog.Title>

                <form onSubmit={handleSubmit}>
                  <div className="mt-2 max-w-screen-xl mx-auto">
                    <label htmlFor="feedback" className="mb-5">
                      Set Role For User
                    </label>
                  </div>
                  <hr className="mt-8 " />
                  <div className="mt-2 flex mt-2 justify-around">
                    <button
                      type="submit"
                      className=" inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                      onClick={() => setRole("admin")}
                    >
                      Admin
                    </button>
                    <button
                      type="submit"
                      className=" inline-flex justify-center rounded-md border border-transparent bg-yellow-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-yellow-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                      onClick={() => setRole("moderator")}
                    >
                      Moderator
                    </button>
                    <button
                      type="submit"
                      className=" inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                      onClick={() => setRole("customer")}
                    >
                      Customer
                    </button>
                    <button
                      type="submit"
                      className=" inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                      onClick={() => setRole("vendor")}
                    >
                      Vendor
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default RoleModal;
