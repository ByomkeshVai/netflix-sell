// add a item
export const addAccessData = async (itemData) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/credential`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${localStorage.getItem("access-token")}`,
    },
    body: JSON.stringify(itemData),
  });

  const data = await response.json();
  return data;
};

// Delete a item
export const deleteAccess = async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/credential/${id}`,
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

export const editAccess = async (itemData, id) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/edit/credential/${id}`,
    {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
      body: JSON.stringify(itemData),
    }
  );
  const result = await response.json();
  return result;
};
