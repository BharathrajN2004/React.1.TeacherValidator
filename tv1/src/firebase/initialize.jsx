import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDaF9GYqc1xxUQHp2B8eiv6nsZ6n5Zyq5A",
    authDomain: "handler-ccae0.firebaseapp.com",
    projectId: "handler-ccae0",
    storageBucket: "handler-ccae0.appspot.com",
    messagingSenderId: "692760401723",
    appId: "1:692760401723:web:fc0a56bcf57da99fa9891e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(app);

// Initialize FireStore 
const firestore = getFirestore(app);

// Initialize Storage
const storage = getStorage(app);

export { auth, firestore, storage };