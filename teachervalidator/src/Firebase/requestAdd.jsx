import { setDoc, doc } from 'firebase/firestore';
import { firestore } from './FirebaseConfig';

const requestAdd = async (email, leaveType, date, startDate, endDate, message, name, collegeID) => {
  const request = {
    [email]: {
      collegeID: collegeID,
      name: name,
      leaveType: leaveType,
      date: date,
      startDate: startDate,
      endDate: endDate,
      message: message,
      validation: false
    }
  };
  console.log(request);

  try {
    const requestRef = doc(firestore, 'leaveRecord', 'request');
    await setDoc(requestRef, request,{ merge: true });
    console.log('User added successfully.');
    return true;
  } catch (error) {
    console.error('Error adding user:', error);
    return false;
  }
};

export { requestAdd };

