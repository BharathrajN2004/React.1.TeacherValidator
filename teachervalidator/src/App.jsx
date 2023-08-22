import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore';

import { auth } from './Firebase/FirebaseConfig'
import { firestore } from './Firebase/FirebaseConfig'

import Routing from './pages/Routing'
import LoadingSpinner from './pages/components/Spinner';
import AuthRoute from './pages/auth/AuthRoute'

function App() {
  const [loading, setLoading] = useState(true);
  const [userDetail, setUserDetail] = useState(null);

  useEffect(() => {
    const fetchUserData = async (email) => {
      try {
        // Get the user document based on the email
        const userDocRef = doc(firestore, 'users', email);
        const userDocSnap = await getDoc(userDocRef);
        console.log(userDocSnap.data(),email);
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
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    // Check if the user is logged in
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in, fetch user data
        setUserDetail({ 'email': user.email })
        fetchUserData(user.email);
      } else {
        // User is logged out, reset states
        setUserDetail(null);
        setLoading(false);
      }
    });

  }, []);
  console.log(userDetail)


  return (
    <>
      {loading ? <LoadingSpinner /> :
        userDetail != null ?
          <Routing userDetail={userDetail} /> :
          <AuthRoute />}
    </>
  )
}

export default App
