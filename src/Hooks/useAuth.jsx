import React, { use } from 'react';
import { AuthContext } from '../Context/AuthContex';

const useAuth = () => {
    const userInfo = use(AuthContext)
    return userInfo
};

export default useAuth;