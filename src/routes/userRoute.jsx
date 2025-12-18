import { Navigate } from "react-router-dom";
import useUserRole from "../hooks/useUserRole";

const UserRoute = ({ children }) => {
  const { role, isLoading } = useUserRole();

  if (isLoading) return <p>Loading...</p>;

  if (role !== "user") return <Navigate to="/unauthorized" />;

  return children;
};

export default UserRoute;
