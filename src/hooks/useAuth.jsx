import React, { use } from 'react';
import AuthContext from '../pages/Auth/Contexts/AuthContext';

const useAuth = () => {
   const AuthInfo = use(AuthContext);
   return AuthInfo;
};

export default useAuth;