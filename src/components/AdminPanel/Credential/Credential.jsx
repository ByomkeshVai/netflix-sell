import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAdmin from "../../../hooks/useAdmin";
import { useState } from "react";
import { TbFidgetSpinner } from "react-icons/Tb";
import { addAccessData } from "../../../api/credential";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Credential = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [axiosSecure] = useAxiosSecure();
  const { refetch, data: singleUser = [] } = useQuery({
    queryKey: ["singleUser"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/all/user`);
      return res.data;
    },
  });

  const { data: itemData = [] } = useQuery({
    queryKey: ["itemData"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/all/items`);
      return res.data;
    },
  });

  const alluser = singleUser.map((alluser) => alluser.name);
  const userId = singleUser.map((alluser) => alluser.userID);
  const items = itemData.map((itemData) => itemData.name);

  const [selectedName, setSelectedName] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedEmail, setSelectedEmail] = useState("");

  const handleNameChange = (e) => {
    const selectedName = e.target.value;
    setSelectedName(selectedName);

    // Find the corresponding userId for the selected name
    const selectedPerson = singleUser.find(
      (person) => person.name === selectedName
    );
    if (selectedPerson) {
      setSelectedUserId(selectedPerson.userID);
      setSelectedEmail(selectedPerson.email);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const itemName = event.target.itemName.value;
    const credential = event.target.credential.value;
    const validity = event.target.validity.value;
    const date = event.target.date.value;
    const itemData = {
      user: selectedName,
      itemName,
      email: selectedEmail,
      userID: selectedUserId,
      credential,
      validity: validity,
      renewDate: date,
    };
    console.log(itemData);

    addAccessData(itemData)
      .then((data) => {
        setLoading(false);
        toast.success("Credential Data Added");
        navigate("/admin/dashboard/all/credential");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="w-full max-w-md mx-auto transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
        <div className="mt-2 w-full">
          <div className="w-full flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-10">
                <h2 className="text-center text-xl underline font-bold">
                  User Credential
                </h2>

                <div className="space-y-1 text-sm">
                  <div className="space-y-1 text-sm">
                    <label htmlFor="users" className="block text-gray-600">
                      Users
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 border-rose-300 focus:outline-rose-500 rounded-md"
                      value={selectedName}
                      onChange={handleNameChange}
                    >
                      <option value="">Select a name</option>
                      {singleUser.map((person) => (
                        <option key={person.name} value={person.name}>
                          {person.name + " " + `(${person.userID})`}
                        </option>
                      ))}
                    </select>
                    {selectedName && (
                      <div className="space-y-1 text-sm">
                        <label htmlFor="name" className="block text-gray-600">
                          Selected UserId:
                        </label>
                        <input
                          className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md bg-blue-100"
                          value={selectedUserId}
                          disabled
                        />
                        <input
                          className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md bg-blue-300"
                          value={selectedEmail}
                          disabled
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-1 text-sm mb-5 ">
                  <label htmlFor="itemName" className="block text-gray-600">
                    Item Name
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 border-rose-300 focus:outline-rose-500 rounded-md"
                    name="itemName"
                  >
                    {items.map((items) => (
                      <option value={items} key={items._id}>
                        {items}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-1 text-sm">
                <label htmlFor="credential" className="block text-gray-600">
                  Credential
                </label>
                <textarea
                  name="credential"
                  id="credential"
                  cols="40"
                  rows="5"
                  className="border border-2 mt-5"
                  required
                ></textarea>
              </div>
              <div className="space-y-6">
                <div className="space-y-1 text-sm">
                  <label htmlFor="validity" className="block text-gray-600">
                    Validity
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      className=" px-4 w-full py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                      name="validity"
                      id="validity"
                      type="number"
                      required
                    />
                    <h2>Days</h2>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="space-y-1 text-sm">
                  <label htmlFor="date" className="block text-gray-600">
                    Next Renew Date
                  </label>
                  <input
                    className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                    name="date"
                    id="date"
                    type="date"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-rose-500"
              >
                {loading ? (
                  <TbFidgetSpinner className="m-auto animate-spin" size={24} />
                ) : (
                  "Confirm Credential"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Credential;
