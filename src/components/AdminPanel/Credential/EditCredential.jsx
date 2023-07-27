import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/Tb";
import { editAccess } from "../../../api/credential";

const EditCredential = ({
  setIsEditModalOpen,
  isOpen,
  refetch,
  credential,
  id,
}) => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const credential = event.target.credential.value;
    const feedData = {
      credential,
    };
    editAccess(feedData, id)
      .then((data) => {
        if (data.modifiedCount == 1) {
          setLoading(false);
          toast.success("Credential Updated!");
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
                  Remarks From Admin
                </Dialog.Title>

                <form onSubmit={handleSubmit}>
                  <div className="mt-2 max-w-screen-xl mx-auto">
                    <label htmlFor="credential" className="mb-5">
                      Remarks From Admin
                    </label>
                    <textarea
                      name="credential"
                      id="credential"
                      cols="40"
                      rows="5"
                      className="border border-2 mt-5"
                      defaultValue={credential?.credential}
                      required
                    ></textarea>
                  </div>
                  <hr className="mt-8 gap-5" />
                  <div className="mt-2 flex mt-2 justify-around">
                    <button
                      type="submit"
                      className="py-2 px-5  p-2 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-rose-500"
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
                    <button
                      type="button"
                      className="py-2 px-5 p-2 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-rose-500"
                      onClick={() => setIsEditModalOpen(false)}
                    >
                      Cancel
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

export default EditCredential;
