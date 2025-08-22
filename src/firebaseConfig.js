// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARVW2FIxyPDK8IcraoZ1mmmDGCCamVQQ8",
  authDomain: "cruds-cdb8f.firebaseapp.com",
  projectId: "cruds-cdb8f",
  storageBucket: "cruds-cdb8f.firebasestorage.app",
  messagingSenderId: "975935463513",
  appId: "1:975935463513:web:4f48ba6752be27fb369148",
  measurementId: "G-BBQ6FG2DFM",
  databaseURL: "https://cruds-cdb8f-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);