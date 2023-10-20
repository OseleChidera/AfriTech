// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import {getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

    const firebaseConfig = {
        // apiKey: process.env.Api_Key,
        // authDomain: process.env.Auth_Domain,
        // projectId: process.env.Project_Id,
        // storageBucket: process.env.Storage_Bucket,
        // messagingSenderId: process.env.Messaging_SenderId,
        // appId: process.env.App_Id,
        // measurementId: process.env.Measurement_Id




        apiKey: "AIzaSyC86iyRi00fdsct-5kqPZOqSbwsyoT8qEY",
        authDomain: "afritech-b3227.firebaseapp.com",
        projectId: "afritech-b3227",
        storageBucket: "afritech-b3227.appspot.com",
        messagingSenderId: "455315838555",
        appId: "1:455315838555:web:7e970df96f6a47a685d17e",
        measurementId: "G-3BB725XBY5"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
if (isSupported()) {
    const analytics = getAnalytics(app);
}
    // Initialize Firebase Authentication and get a reference to the service
    export const auth = getAuth(app);
    export const database = getFirestore(app);
    export const storage = getStorage(app);

