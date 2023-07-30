// get all category
export const getMobileCover = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/mobileCover/category`,
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    }
  );
  const data = await response.json();
  return data;
};
