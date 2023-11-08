import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./initialize";

export const signIn = (email, password) => {
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential.user.email);
                resolve(true);
            })
            .catch((error) => {
                if (error.code == "auth/wrong-password") {
                    alert("Wrong password");
                } else {
                    alert("error.code");
                }
                resolve(false);
            });
    });
};

export const createUser = (email, password) => {
    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential.user.email);
            resolve(true);
        })
        .catch((error) => {
            if (error.code == "auth/email-already-in-use") {
                alert("Email ID already exists");
            } else {
                alert(error.code);
            }
            resolve(false);
        });
    })
}

export const userSignOut = () => {
    return new Promise((resolve, reject) => {
        signOut(auth).then(() => {
            console.log('user loged out');
            resolve(true);
        }).catch((error) => {
            console.log(error.code);
            resolve(false);
        })
    })
};


