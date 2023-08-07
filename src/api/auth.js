// save a user to database
export const saveUser = (user) => {
  const currentUser = {
    email: user.email,
    name: user.name,
  };

  fetch(`${import.meta.env.VITE_API_URL}/users/${user?.email}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(currentUser),
  }).then((res) => res.json());
};

// update user role
export const UpdateUser = async (id, role) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/users/status/${id}`,
    {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
      body: JSON.stringify(role),
    }
  );
  const data = await response.json();
  return data;
};
// Delete a user
export const deleteUser = async (id) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/user/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${localStorage.getItem("access-token")}`,
    },
  });
  const result = await response.json();
  return result;
};
