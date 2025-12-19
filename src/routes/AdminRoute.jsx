import { Navigate } from "react-router-dom";
import useDefineRole from "../hooks/useDefineRole";

const AdminRoute = ({ children }) => {
  const { role, isLoading } = useDefineRole();

  if (isLoading) return <p>Loading...</p>;

  if (role !== "admin") return <Navigate to="/unauthorized" />;

  return children;
};

export default AdminRoute;
