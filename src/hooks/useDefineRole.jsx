// hooks/useDefineRole.js
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useDefineRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: roleData, isLoading } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !!user?.email, // Only run if user exists
    queryFn: async () => {
      // First check users collection
      const userRes = await axiosSecure.get(`/users/role?email=${user.email}`);
      if (userRes.data?.role) {
        return userRes.data;
      }

      // If not found, check decorators collection
      const decoratorRes = await axiosSecure.get(
        `/decorators/role?email=${user.email}`
      );
      return decoratorRes.data;
    },
  });

  return { role: roleData?.role || "user", isLoading, loading };
};

export default useDefineRole;
