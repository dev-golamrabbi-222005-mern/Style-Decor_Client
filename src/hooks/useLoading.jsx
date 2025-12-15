import { useContext } from "react";
import LoadingContext from "../pages/Auth/Contexts/Loading-Context&Provider/LoadingContext";

const useLoading = () => {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error("useLoading must be used within LoadingProvider");
  }

  return context;
};

export default useLoading;
