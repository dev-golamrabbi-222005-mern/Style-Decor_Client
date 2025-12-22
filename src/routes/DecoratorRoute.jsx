import { Navigate } from 'react-router-dom';
import useDefineRole from '../hooks/useDefineRole'

const DecoratorRoute = ({ children }) => {
  const { role, isLoading, loading } = useDefineRole();

  if (isLoading || loading) return <p>Loading...</p>;

  if (role !== "decorator") return <Navigate to="/unauthorized" />;

  return children;
};

export default DecoratorRoute;
