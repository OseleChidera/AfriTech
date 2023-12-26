'use client'
import React, { useState, useContext, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// import { auth } from '@/firebase/firebaseConfig'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { collection, addDoc, doc, setDoc, updateDoc , onSnapshot , getDoc } from "firebase/firestore";
import { database, storage } from '@/firebaseConfig';
import { MyContext } from '@/utils/Datacontext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Step1 from '../../components/Step1';
import Step2 from '../../components/Step2';
import Step3 from '../../components/Step3';
import Step4 from '../../components/Step4';
import { useSelector, useDispatch } from "react-redux";
import { setLoading, incrementSignup, decrementSignup, incrementSignin, decrementSignin, updateUserFormEntries, fetchDataByUserId, userData, setUserData } from '../../redux/user'
import {fetchData, throwMessage} from '../../utils/utility'
import { setupAuthObserver } from "@/firebaseAuth";



export default function Multistep () {
    const pageindex = useSelector((state) => state.user.signupIndex);
    const userFormEntries = useSelector((state) => state.user.userFormEntries);
    const userIdFromLocalStorage = localStorage.getItem('afriTechUserID') ? JSON.parse(localStorage.getItem('afriTechUserID')) : null;
    const userDataVariable = useSelector((state) => state.user.userData);
    const dispatch = useDispatch();
    const [data, setData] = useState(userFormEntries)
  

    async function uploadNinImage(image) {
        console.log("IMAGE ID INSIDE uploadProfilePicture"+""+image)
        console.log("USER ID INSIDE uploadProfilePicture" + "" + userIdFromLocalStorage)

        try {
            const imagePath = `${userIdFromLocalStorage}/ninImage`
            console.log(imagePath)
            const storageRef = ref(storage, imagePath);
            await uploadBytes(storageRef, image);
            return getDownloadURL(storageRef);
        } catch (error) {
            console.log(error.message)
            throwMessage('ninImage image couldnt upload')
        }
    }

    async function uploadProfilePicture(image) {
        console.log("IMAGE ID INSIDE uploadProfilePicture" + "" + image)
        console.log("USER ID INSIDE uploadProfilePicture" + "" + userIdFromLocalStorage)
        try {
            const imagePath = `${userIdFromLocalStorage}/profilePicture`
            console.log(imagePath)
            const storageRef = ref(storage, imagePath);
            await uploadBytes(storageRef, image);
            return getDownloadURL(storageRef);
        } catch (error) {
            console.log(error.message)
            throwMessage('profilePicture image couldnt upload')
        }
    }




    const steps = [
        <Step1 data={data} next={handleNextStep}  setData={setData} />,
        <Step2 data={data} next={handleNextStep} prev={handlePrevStep} />,
        <Step3 data={data} next={handleNextStep} prev={handlePrevStep} />,
        <Step4 data={data} next={handleNextStep} prev={handlePrevStep} />]

    async function ApiReq(newData) {
        console.log("RUNNING API REQ" + " " + newData.agreeToTerms)

        const docRef = doc(database, "Users", `${userIdFromLocalStorage}`);
        console.log("RUNNING API REQ")
        if (newData.agreeToTerms) {
            try {
                console.log("RUNNING TRY IN API REQ")

                const [image1Url, image2Url] = await Promise.all([uploadProfilePicture(newData.profilePicture), uploadNinImage(newData.image2)])
                newData.profilePicture = image1Url
                newData.image2 = image2Url
                delete newData.confirm_password;
                delete newData.password;
                newData.dateOfBirth = newData.dateOfBirth.getTime()
                console.log(image1Url)
                console.log(image2Url)
                console.log(newData)
                dispatch(updateUserFormEntries(JSON.stringify(newData , null, 2)))  

                await updateDoc(docRef, newData)
                try {
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        console.log('USER DATABASE INFO ', JSON.stringify(docSnap.data(), null, 2))
                        dispatch(setUserData(docSnap.data()))
                        console.log("userDataVariable: " + JSON.stringify(userDataVariable, null, 2))

                        throwMessage('User SignUp complete')
                    } else {
                        console.log('No such document!');
                    }
                } catch (error) {console.log(error)
                    throwMessage(error.message)}
               
            } catch (error) {
                console.log(error)
                throwMessage(error.message) }


        }
    }
    
    function handleNextStep(newData, final = false) {

        setData(prev => ({ ...prev, ...newData }))
        console.log(newData)
       
        if (final) {
            ApiReq(newData)
            return;
        }
        dispatch(incrementSignup(final))
    }
    function handlePrevStep(newData) {
        setData(prev => ({ ...prev, ...newData }))
        dispatch(decrementSignup())
    }


    useEffect(() => {
        const authCallback = (user) => {
            if (user) {
                console.log('User is authenticated at signin:', user);
                // Perform actions for authenticated user
            } else {
                console.log('User is not authenticated at signin.');
                // Perform actions for unauthenticated user
            }
        };

        // Set up the auth observer
        setupAuthObserver(authCallback);

        // Clean up the observer on component unmount
        return () => {
            // Clean up the observer when the component is unmounted
            // This is important to avoid memory leaks
            // You might want to store the observer cleanup function in a state variable
            // and call it when the component is unmounted
        };
    }, []);
    return (
        <div className="flex min-h-screen max-h-fit  max-w-full flex-col items-center justify-center bg-[#005377] border">
          {steps[pageindex]}
        </div>
    )
};












