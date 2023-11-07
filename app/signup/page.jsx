'use client'
import React, { useState, useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { auth } from '@/firebase/firebaseConfig'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { collection, addDoc, doc, setDoc, updateDoc } from "firebase/firestore";
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
import { setUserData, removeUserData, setLoading, setUserObjData, incrementSignup, decrementSignup, incrementSignin, decrementSignin, updateUserFormEntries, fetchDataByUserId } from '../../redux/user'
import { useEffect } from 'react';


export default function Multistep () {
   
    const pageindex = useSelector((state) => state.user.signupIndex);
    const userFormEntries = useSelector((state) => state.user.userFormEntries);
    const userId = useSelector((state) => state.user.value);
    const userObj = useSelector((state) => state.user.valueObj);
    const valueObj = useSelector((state) => state.user.valueObj);
    const dispatch = useDispatch();
    const [data, setData] = useState(userFormEntries)
    
    async function uploadImage(image) {
        const imagePath = `${userId}/${image.name}`
        const storageRef = ref(storage, imagePath);
        const snapshot = await uploadBytes(storageRef, image);
        return getDownloadURL(storageRef);
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
                const [image1Url, image2Url] = await Promise.all([uploadImage(newData.image),uploadImage(newData.image2)])
                newData.image = image1Url
                newData.image2 = image2Url
                newData.confirm_password = null;
                newData.password = null;
                console.log(image1Url)
                console.log(image2Url)
                dispatch(updateUserFormEntries(newData))
                console.log('PAGE' + {userFormEntries})     
                updateDoc(docRef, newData)

                dispatch(fetchDataByUserId(userId,userObj));
                toast.success('User SignUp complete', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "colored",
                    onOpen: () => {
                        // window.location.href = "/home";
                        console.log('Toast opened redirecting to signup page')
                    }
                    
                });
               
            } catch (error) { console.log( 'Api req error' ,error.message, error) }


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












