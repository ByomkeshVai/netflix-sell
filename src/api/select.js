// Delete a Selection
export const deleteSelect = async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/customer/select/${id}`,
    {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    }
  );
  const result = await response.json();
  return result;
};

// update Enrolled status
export const updateStatus = async (id, status) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/select/status/${id}`,
    {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
      body: JSON.stringify({ status }),
    }
  );
  const data = await response.json();
  return data;
};

// update Enrolled status
export const setSelect = async (selectItem) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/customer/select`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
      body: JSON.stringify(selectItem),
    }
  );
  const data = await response.json();
  return data;
};

// update seats
// update room status
export const updateItems = async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/item/update/${id}`,
    {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    }
  );
  const data = await response.json();
  return data;
};

// // Delete a Selection
// export const deleteSelect = async id => {
//   const response = await fetch(`${import.meta.env.VITE_API_URL}/select/${id}`, {
//     method: 'DELETE',
//     headers: {
//       'content-type': 'application/json',
//       authorization: `Bearer ${localStorage.getItem('access-token')}`,
//     },
//   })
//   const result = await response.json()
//   return result
// }
