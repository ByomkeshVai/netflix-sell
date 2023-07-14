import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useCustomer = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  // use axios secure with react query
  const { data: isCustomer, isLoading: isCustomerLoading } = useQuery({
    queryKey: ["isCustomer", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/customer/${user?.email}`);
      return res.data.customer;
    },
  });
  return [isCustomer, isCustomerLoading];
};
export default useCustomer;
