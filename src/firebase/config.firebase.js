import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    // apiKey: process.env.REACT_APP_API_KEY,
    // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    // databaseURL: process.env.REACT_APP_DATABASE_URL,
    // projectId: process.env.REACT_APP_PROJECT_ID,
    // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    // messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    // appId: process.env.REACT_APP_ID,
    // measurementId: process.env.REACT_APP_MEASUREMENT_ID
    apiKey: "AIzaSyB_YYwKCWWKxfahQswE2Ei8HBMRaAFaCh0",
    authDomain: "shopping-list-hebrew.firebaseapp.com",
    databaseURL: "https://shopping-list-hebrew.firebaseio.com",
    projectId: "shopping-list-hebrew",
    storageBucket: "shopping-list-hebrew.appspot.com",
    messagingSenderId: "400046151867",
    appId: "1:400046151867:web:85e9f58ac03b0baa29319e",
    measurementId: "G-J60CLLB030"
};

// Initialize Firebase
//firebase.firestore().settings({ timestampsInSnapshots: true });
firebase.initializeApp(firebaseConfig);

export default firebase;
