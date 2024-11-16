// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMPJHHB8b7aqsgMc6T2dAHuq-Nv06lEVg",
  authDomain: "car-parking-51799.firebaseapp.com",
  projectId: "car-parking-51799",
  storageBucket: "car-parking-51799.firebasestorage.app",
  messagingSenderId: "1060641640680",
  appId: "1:1060641640680:web:7793dcb0ec1981ca95795d",
  measurementId: "G-W9M3G8FN00"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);