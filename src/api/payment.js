// add a payment
export const addPayment = async (itemData) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/payments`, {
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

// set a payment
export const setPayment = async (itemData) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/setPayment`, {
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
