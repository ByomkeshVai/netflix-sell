import { useQuery } from "@tanstack/react-query";

const useItem = () => {
  const {
    data: item = [],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["item"],
    queryFn: async () => {
      const res = await fetch(
        "https://bistro-boss-server-fawn.vercel.app/item"
      );
      return res.json();
    },
  });

  return [item, loading, refetch];
};

export default useItem;
