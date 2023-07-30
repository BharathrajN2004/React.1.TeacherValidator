
const fetchUserData = async (email) => {
  const userRef = doc(firestore, 'users', email);
  try {
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      console.log('User data:', userData);
      return userData;
    } else {
      console.log('User document does not exist.');
      return false;
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    return false;
  }
};


export {fetchUserData};
