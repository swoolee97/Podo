// userContext.js

import { createContext, useContext } from 'react';
import { useState } from 'react';
const UserContext = createContext();

export const useUserContext = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [userEmail, setUserEmail] = useState(null);

    return (
        <UserContext.Provider value={{ userEmail, setUserEmail }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
