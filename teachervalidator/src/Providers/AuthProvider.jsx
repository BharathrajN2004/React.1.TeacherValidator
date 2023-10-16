import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import { auth } from '../Firebase/FirebaseConfig';
import { firestore } from '../Firebase/FirebaseConfig';

export const authProvider = createContext({
    userDetail: null, // Set a default value of null
    loading: true
});

export const AuthContextProvider = ({ children }) => {

    return (
        <authProvider.Provider value={{ userDetail, loading }}>
            {children}
        </authProvider.Provider>
    );
};
