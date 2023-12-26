
import {getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};
const app = initializeApp(firebaseConfig);
let analytics ;

if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);;
}
export const auth = getAuth(app);
export const database = getFirestore(app);
export const storage = getStorage(app);
export {analytics}
    


// const firebaseConfig = {
//     apiKey: "AIzaSyC86iyRi00fdsct-5kqPZOqSbwsyoT8qEY",
//     authDomain: "afritech-b3227.firebaseapp.com",
//     projectId: "afritech-b3227",
//     storageBucket: "afritech-b3227.appspot.com",
//     messagingSenderId: "455315838555",
//     appId: "1:455315838555:web:7e970df96f6a47a685d17e",
//     measurementId: "G-3BB725XBY5"
// };