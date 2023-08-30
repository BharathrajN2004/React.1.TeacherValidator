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
    const [loading, setLoading] = useState(true);
    const [userDetail, setUserDetail] = useState(null);

    useEffect(() => {
        const fetchUserData = async (email) => {
            try {
                // Get the user document based on the email
                const userDocRef = doc(firestore, 'users', email);
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists()) {
                    // User document exists, retrieve the data
                    const userData = userDocSnap.data();
                    setUserDetail(prevData => ({
                        ...prevData,
                        ...userData
                    }));
                    setLoading(false);
                } else {
                    // User document does not exist
                    console.log('User document does not exist.');
                    setLoading(false); // Set loading to false even if the document doesn't exist
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setLoading(false); // Set loading to false in case of an error
            }
        };

        // Check if the user is logged in
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is logged in, fetch user data
                setUserDetail({ 'email': user.email });
                fetchUserData(user.email);
            } else {
                // User is logged out, reset states
                setUserDetail(null);
                setLoading(false);
            }
        });

        // Return the cleanup function
        return () => {
            unsubscribe(); // Unsubscribe from the auth state change listener
        };
    }, []);

    return (
        <authProvider.Provider value={{ userDetail, loading }}>
            {children}
        </authProvider.Provider>
    );
};
