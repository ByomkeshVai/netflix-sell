import React from "react";
import { useState } from "react";
import { deleteItem } from "../../../api/item";
import EditCredential from "./EditCredential";
import DeleteModal from "../../Modal/DeleteModal";
import { deleteAccess } from "../../../api/credential";
import toast from "react-hot-toast";

const CredentialData = ({ credential, refetch }) => {
  let [isOpen, setIsOpen] = useState(false);
  let [isEditModalOpen, setIsEditModalOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const modalHandler = (id) => {
    deleteAccess(id)
      .then((data) => {
        refetch();
        toast.success("Credential deleted");
      })
      .catch((err) => console.log(err));
    closeModal();
  };
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{credential?.user}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          se{credential?.userID}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {credential?.itemName}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {credential?.renewDate}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {credential?.validity}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {credential?.credential}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="action-area flex gap-3">
          <div className="delete-area">
            <span className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-slate-50 leading-tight">
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-blue-600  rounded-full"
              ></span>
              <span
                className="relative"
                onClick={() => setIsEditModalOpen(true)}
              >
                Change Access
              </span>
            </span>
            <EditCredential
              isOpen={isEditModalOpen}
              closeModal={() => setIsEditModalOpen(false)}
              credential={credential}
              id={credential._id}
              refetch={refetch}
              setIsEditModalOpen={setIsEditModalOpen}
            />
          </div>

          <div className="edit-area">
            <span
              onClick={openModal}
              className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-slate-50 leading-tight"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0  bg-red-600  rounded-full"
              ></span>
              <span className="relative">Delete</span>
            </span>
            <DeleteModal
              isOpen={isOpen}
              closeModal={closeModal}
              modalHandler={modalHandler}
              id={credential._id}
            />
          </div>
        </div>
      </td>
    </tr>
  );
};

export default CredentialData;
