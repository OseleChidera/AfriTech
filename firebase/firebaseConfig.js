
import {getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC86iyRi00fdsct-5kqPZOqSbwsyoT8qEY",
    authDomain: "afritech-b3227.firebaseapp.com",
    projectId: "afritech-b3227",
    storageBucket: "afritech-b3227.appspot.com",
    messagingSenderId: "455315838555",
    appId: "1:455315838555:web:7e970df96f6a47a685d17e",
    measurementId: "G-3BB725XBY5"
};
// `https://firestore.googleapis.com/v1/projects/afritech-b3227/databases/(default)/documents/Users?key=AIzaSyC86iyRi00fdsct-5kqPZOqSbwsyoT8qEY`
//     `https://firestore.googleapis.com/v1/projects/afritech-b3227/databases/(default)/documents/Users/6QILI9x54HPQ740pJLrltneZ5Is1`
// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics ;

if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);;
}
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const database = getFirestore(app);
export const storage = getStorage(app);
export {analytics}
    






// firebaseConfig.js

// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
// import { getStorage } from 'firebase/storage';
// import { getAnalytics } from 'firebase/analytics';

// console.log(JSON.stringify(process.env));

// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_API_KEY,
//     authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_MESSAGE_BUCKET,
//     appId: process.env.REACT_APP_APP_ID,
//     measurementId: process.env.REACT_APP_MEASUREMENT_ID,
// };

// const app = initializeApp(firebaseConfig);
// let analytics;

// if (typeof window !== 'undefined') {
//     analytics = getAnalytics(app);
// }

// export const auth = getAuth(app);
// export const database = getFirestore(app);
// export const storage = getStorage(app);
// export { analytics };


