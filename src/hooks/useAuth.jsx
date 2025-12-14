import React, { use } from "react";
import AuthContext from "../pages/Auth/Contexts/Auth-Context&Provider/AuthContext";

const useAuth = () => {
  const AuthInfo = use(AuthContext);
  return AuthInfo;
};

export default useAuth;
