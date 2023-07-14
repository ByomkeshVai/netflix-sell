// add a item
export const addItemData = async (itemData) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/items`, {
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
export const deleteItem = async (id) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/items/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${localStorage.getItem("access-token")}`,
    },
  });
  const result = await response.json();
  return result;
};
