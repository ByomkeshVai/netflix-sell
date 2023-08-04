import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/Tb";
import { setPayment } from "../../../api/payment";
import { useNavigate } from "react-router-dom";

const PaymentConfirm = ({
  setIsEditModalOpen,
  isEditModalOpen,
  payment,
  id,
  refetch,
  loading,
}) => {
  const navigate = useNavigate();

  const [arrayValues, setArrayValues] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const amount = form.amount.value;
    const transactionId = form.transactionId.value;
    const itemName = event.target.itemName.value;
    const grabItem = itemName.split(" , ");

    const setData = {
      grabItem,
      amount,
      transactionId,
    };
    setPayment(setData)
      .then((data) => {
        toast.success("Payment Added, Wait For Verification!");
        refetch();
        setIsEditModalOpen(false);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const items = payment.map((itemarea) =>
    itemarea.itemNames.map((str) => str.split(",")).join(" , ")
  );

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
                  <div className="w-full flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 gap-10">
                        <h2 className="text-center text-xl underline font-bold">
                          Payment Confirmation
                        </h2>
                        <div className="space-y-1 text-sm">
                          <label
                            htmlFor="amount"
                            className="block text-gray-600"
                          >
                            Payment Amount
                          </label>
                          <input
                            className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                            name="amount"
                            id="amount"
                            type="amount"
                            placeholder="Payment Amount"
                            required
                          />
                        </div>
                        <div className="space-y-1 text-sm">
                          <label
                            htmlFor="transactionId"
                            className="block text-gray-600"
                          >
                            transaction Id
                          </label>
                          <input
                            className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                            name="transactionId"
                            id="transactionId"
                            type="transactionId"
                            placeholder="Payment transaction Id"
                            required
                          />
                        </div>
                        <div className="space-y-1 text-sm">
                          <label
                            htmlFor="itemName"
                            className="block text-gray-600"
                          >
                            Item Name
                          </label>
                          <select
                            required
                            className="w-full px-4 py-3 border-rose-300 focus:outline-rose-500 rounded-md"
                            name="itemName"
                          >
                            {items.map((item) => (
                              <option value={item} key={item}>
                                {item}
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
                          "Confirm Transaction"
                        )}
                      </button>
                    </form>
                  </div>
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

export default PaymentConfirm;
