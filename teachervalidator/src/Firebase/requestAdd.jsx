import { setDoc, doc, getDoc } from 'firebase/firestore';
import { firestore } from './FirebaseConfig';

const requestAdd = async (email, leaveType, date, startDate, endDate, message, name, collegeID, canValidate) => {
  const request = {
    [collegeID]: {
      email: email,
      collegeID: collegeID,
      name: name,
      leaveType: leaveType,
      date: date,
      startDate: startDate,
      endDate: endDate,
      message: message,
      validation: false,
      canValidate: canValidate
    }
  };

  try {
    const requestRef = doc(firestore, 'leaveRecord', 'request');
    const data = await getDoc(requestRef);
    var validation = false;
    if (data.exists()) {
      const userRequests = data.data();
      Object.entries(userRequests).forEach(([key, value]) => {
        if (key == "collegeID") {
          validation = true;
        }
      });
    }
    console.log(validation);
    if (validation != true) {
      await setDoc(requestRef, request, { merge: true });
      console.log('leave Request added successfully.');
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error adding user:', error);
    return false;
  }
};

export { requestAdd };

