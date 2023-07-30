import { collection, addDoc } from "firebase/firestore";
import { collection, addDoc,doc, setDoc  } from "firebase/firestore";
import {firestore} from "./FirebaseConfig"

const db = firestore;
try {
    const docRef = await addDoc(collection(db, "users/document"), {
        first: "Ada",
        last: "Lovelace",
        born: 1815
    });
    console.log("Document written with ID: ", docRef.id);
} catch (e) {
    console.error("Error adding document: ", e);
}

const collectionName = 'myCollection/document';
const data = { name: 'John Doe', age: 30 };

try {
  await setDoc(doc(db, collectionName), data);
  console.log('Document saved');
} catch (error) {
  console.error('Error saving document:', error);
}