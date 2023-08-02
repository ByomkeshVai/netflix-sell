import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { toast } from "react-hot-toast";
import { UpdateOrder } from "../../../api/order";
import { stockUpdate } from "../../../api/stock";

const StatusModal = ({ setIsEditModalOpen, isOpen, refetch, order, id }) => {
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const feedback = event.target.feedback.value;
    const feedData = {
      status: status,
      feedback: feedback,
    };
    UpdateOrder(id, feedData)
      .then((data) => {
        if (data.modifiedCount == 1) {
          setLoading(false);
          toast.success("Credential Added!");
          refetch();
          setIsEditModalOpen(false);
          onDisable(false);
        }
      })
      .catch((err) => console.log(err));

    setLoading(false);
  };
  if (status === "Approved") {
    console.log(order.selectItems);
    stockUpdate(order.selectItems);
  }
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
                  Remarks From Admin
                </Dialog.Title>

                <form onSubmit={handleSubmit}>
                  <div className="mt-2 max-w-screen-xl mx-auto">
                    <label htmlFor="feedback" className="mb-5">
                      Remarks From Admin
                    </label>
                    <textarea
                      name="feedback"
                      id="feedback"
                      cols="40"
                      rows="5"
                      className="border border-2 mt-5"
                      required
                    ></textarea>
                  </div>
                  <hr className="mt-8 " />
                  <div className="mt-2 flex mt-2 justify-around">
                    <button
                      type="submit"
                      className=" inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                      onClick={() => setStatus("Approved")}
                    >
                      Approved
                    </button>
                    <button
                      type="submit"
                      className=" inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={() => setStatus("Denied")}
                    >
                      Denied
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

export default StatusModal;
