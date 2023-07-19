// add a item
export const addOrder = async (itemData) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/order`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${localStorage.getItem("access-token")}`,
    },
    body: JSON.stringify(itemData),
  });

  const data = await response.json();
  window.location.replace(data.url);
};
