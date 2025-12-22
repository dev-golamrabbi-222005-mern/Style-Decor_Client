import { Navigate } from "react-router-dom";
import useDefineRole from "../hooks/useDefineRole";

const AdminRoute = ({ children }) => {
  const { role, isLoading, loading } = useDefineRole();

  if (isLoading || loading) return <p>Loading...</p>;
  
  if (role !== "admin") return <Navigate to="/unauthorized" />;

  return children;
};

export default AdminRoute;
