import { setDoc, doc } from 'firebase/firestore';
import { firestore } from './FirebaseConfig';

const addUser = async (email, name, collegeID, access, department, password) => {
  const userData = {
    name: name,
    collegeID: collegeID,
    access: access,
    department: department,
    password: password
  };
  console.log(userData);

  try {
    const userRef = doc(firestore, 'users', email);
    await setDoc(userRef, userData);
    console.log('User added successfully.');
    return true;
  } catch (error) {
    console.error('Error adding user:', error);
    return false;
  }
};

export {addUser};

// Example usage
const email = 'example@example.com';
const name = 'John Doe';
const collegeID = '123456';
const access = 'admin';
const department = 'IT';
const password = 'password123';
