'use client'
import React, { useState, useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { auth } from '@/firebase/firebaseConfig'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { collection, addDoc, doc, setDoc, updateDoc , onSnapshot , getDoc } from "firebase/firestore";
import { database, storage } from '@/firebase/firebaseConfig';
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
import { useEffect } from 'react';
import {fetchData, throwMessage} from '../../utils/utility'


export default function Multistep () {
   

   
    const pageindex = useSelector((state) => state.user.signupIndex);
    const userFormEntries = useSelector((state) => state.user.userFormEntries);
    const userId = useSelector((state) => state.user.value);
    const userDataVariable = useSelector((state) => state.user.userData);
    const dispatch = useDispatch();
    const [data, setData] = useState(userFormEntries)
  
   
    //upload the images from the form to a storage bucket  and get a urn to access said images
    async function uploadImage(image) {
     try {
         const imagePath = `${userId}/${image.name}`
         const storageRef = ref(storage, imagePath);
         await uploadBytes(storageRef, image);
         return getDownloadURL(storageRef);
     } catch (error) {
        console.log(error)
        console.log('image couldnt upload')
         throwMessage('image couldnt upload')
     }
    }

    const steps = [
        <Step1 data={data} next={handleNextStep}  setData={setData} />,
        <Step2 data={data} next={handleNextStep} prev={handlePrevStep} />,
        <Step3 data={data} next={handleNextStep} prev={handlePrevStep} />,
        <Step4 data={data} next={handleNextStep} prev={handlePrevStep} />]

    async function ApiReq(newData) {

        const docRef = doc(database, "Users", userId);
        if (newData.agreeToTerms) {
            try {
                const [image1Url, image2Url] = await Promise.all([uploadImage(newData.profilePicture),uploadImage(newData.image2)])
                newData.profilePicture = image1Url
                newData.image2 = image2Url
                newData.confirm_password = null;
                newData.password = null;
                newData.dateOfBirth = newData.dateOfBirth.getTime()
                console.log(image1Url)
                console.log(image2Url)
                dispatch(updateUserFormEntries(newData))  

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
    return (
        <div className="flex min-h-screen max-h-fit  max-w-full flex-col items-center justify-center bg-[#005377] border">
          {steps[pageindex]}
        </div>
    )
};












