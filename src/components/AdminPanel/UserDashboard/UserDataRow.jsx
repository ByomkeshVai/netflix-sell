import React from "react";
import { useState } from "react";
import RoleModal from "./RoleModal";
import DeleteModal from "../../Modal/DeleteModal";
import toast from "react-hot-toast";
import { deleteUser } from "./../../../api/auth";

const UserDataRow = ({ users, refetch, user, id, index }) => {
  let [isEditModalOpen, setIsEditModalOpen] = useState(false);
  let [isOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
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

  let usersAdmin = "bg-red-600";
  let usersModeator = "bg-yellow-600";
  let userCustomer = "bg-green-600";
  let userVendor = "bg-blue-600";

  const userStatus =
    users?.role == "admin"
      ? usersAdmin
      : users?.role == "moderator"
      ? usersModeator
      : users?.role == "customer"
      ? userCustomer
      : users?.role == "vendor"
      ? userVendor
      : "";
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap font-bold">
          {index + 1}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{users?.name}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{users.email}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{users.phone}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
        <p className="text-gray-900 whitespace-no-wrap">SC{users?.userID}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
        <button className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-slate-50 leading-tight disabled:text-gray-900">
          <span
            className={`text-gray-900 whitespace-no-wrap rounded-full px-3 py-1 text-slate-50  ${userStatus}`}
            onClick={() => setIsEditModalOpen(true)}
          >
            {users?.role}
          </span>
        </button>
        <RoleModal
          isOpen={isEditModalOpen}
          closeModal={() => setIsEditModalOpen(false)}
          users={users}
          id={users._id}
          refetch={refetch}
          setIsEditModalOpen={setIsEditModalOpen}
        />
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
        <span
          onClick={openModal}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-slate-50 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0  bg-red-800  rounded-full"
          ></span>
          <span className="relative">Delete</span>
        </span>
        <DeleteModal
          isOpen={isOpen}
          closeModal={closeModal}
          modalHandler={modalHandler}
          id={users._id}
        />
      </td>
    </tr>
  );
};

export default UserDataRow;
