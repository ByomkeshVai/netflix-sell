export const addPromoData = async (itemData) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/promo`, {
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

// Delete a promo
export const deletePromo = async (id) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/promo/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${localStorage.getItem("access-token")}`,
    },
  });
  const result = await response.json();
  return result;
};
