import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import toast from "react-hot-toast";
import { imageUpload } from "./../../../api/utlits";
import UpdateCategoryForm from "./UpdateCategoryForm";
import { editCategory } from "../../../api/category";

const EditCategory = ({
  setIsEditModalOpen,
  isEditModalOpen,
  refetch,
  category,
  id,
}) => {
  const [loading, setLoading] = useState(false);
  const [itemDatas, setItemDatas] = useState(category);
  const handleImageUpdate = (image) => {
    setLoading(true);
    imageUpload(image)
      .then((res) => {
        setItemDatas({ ...itemDatas, image: res.data.display_url });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedData = Object.assign({}, { ...itemDatas });
    delete updatedData._id;
    setLoading(true);
    editCategory(updatedData, id)
      .then((data) => {
        toast.success("Category Data updated");
        setLoading(false);
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
                  <UpdateCategoryForm
                    handleSubmit={handleSubmit}
                    itemDatas={itemDatas}
                    setItemDatas={setItemDatas}
                    handleImageUpdate={handleImageUpdate}
                    loading={loading}
                  />
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

export default EditCategory;
