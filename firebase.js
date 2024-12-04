// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDICLRsYV2KccOn5ElmUxm0aF2xaDv3jR8",
  authDomain: "advanced-internship-267b7.firebaseapp.com",
  projectId: "advanced-internship-267b7",
  storageBucket: "advanced-internship-267b7.appspot.com",
  messagingSenderId: "524931034489",
  appId: "1:524931034489:web:f208372fa17a120ae353a8",
  measurementId: "G-BT0CYQZ27J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const initFirebase = () => {
  return app;
};
const provider = new GoogleAuthProvider();
export {auth}
export {provider}
export {db}