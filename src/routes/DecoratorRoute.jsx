import { Navigate } from 'react-router-dom';
import useDefineRole from '../hooks/useDefineRole'

const DecoratorRoute = ({ children }) => {
  const { role, isLoading } = useDefineRole();

  if (isLoading) return <p>Loading...</p>;

  if (role !== "decorator") return <Navigate to="/unauthorized" />;

  return children;
};

export default DecoratorRoute;
