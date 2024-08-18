// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0WuiaYraFXxhQ5S_4lHVyCjlljtP9l_M",
  authDomain: "flashcards-14cd6.firebaseapp.com",
  projectId: "flashcards-14cd6",
  storageBucket: "flashcards-14cd6.appspot.com",
  messagingSenderId: "811464888505",
  appId: "1:811464888505:web:5baa3dc6ce8c3431984b68",
  measurementId: "G-XS4STS2185"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore(app);

export {db};