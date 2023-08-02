// add a item
export const stockUpdate = async (selectItems) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/updateStock`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${localStorage.getItem("access-token")}`,
    },
    body: JSON.stringify(selectItems),
  });

  const data = await response.json();
  return data;
};
