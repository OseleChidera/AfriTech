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
import { setUserData, removeUserData, setLoading, setUserObjData, incrementSignup, decrementSignup, incrementSignin, decrementSignin, updateUserFormEntries } from '../../redux/user'
import { useEffect } from 'react';

const Multistep = () => {
    const pageindex = useSelector((state) => state.user.signupIndex);
    const userFormEntries = useSelector((state) => state.user.userFormEntries);
    const dispatch = useDispatch();
    const [userid, setUserId] = useState(null)
    const [data, setData] = useState(userFormEntries)

    async function uploadImage(image) {
        const imagePath = `${userid}/${image.name}`
        const storageRef = ref(storage, imagePath);
        const snapshot = await uploadBytes(storageRef, image);
        return getDownloadURL(storageRef);
    }
useEffect(()=>{
    console.log("check index " + pageindex)
}, [pageindex])
    const steps = [
        <Step1 data={data} next={handleNextStep} setUserId={setUserId} />,
        <Step2 data={data} next={handleNextStep} prev={handlePrevStep} />,
        <Step3 data={data} next={handleNextStep} prev={handlePrevStep} />,
        <Step4 data={data} next={handleNextStep} prev={handlePrevStep} userid={userid}/>]

    async function ApiReq(newData) {
        console.log('API REQUEST infoooooooooooooooooooooooo', userid, newData, newData.agreeToTerms)

        const docRef = doc(database, "Users", userid);
        if (newData.agreeToTerms) {
            try {
                const [image1Url, image2Url] = await Promise.all([
                    uploadImage(newData.image),
                    uploadImage(newData.image2),
                ])
                newData.image = image1Url
                newData.image2 = image2Url
                updateDoc(docRef, newData)
                toast.success('User SignUp complete', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "colored",
                });
            } catch (error) { console.log( 'Api req error' ,error.message, error) }


        }
    }
    
    function handleNextStep(newData, final = false) {
        // setData(prev => ({ ...prev, ...newData }))
        dispatch(updateUserFormEntries(data))

        if (final) {
            ApiReq(newData)
            return;
        }
        dispatch(incrementSignup(final))
    }
    function handlePrevStep(newData) {
        setData(prev => ({ ...prev, ...newData }))
        // dispatch(updateUserFormEntries(data))
        dispatch(decrementSignup())
    }
    return (
        <div className="flex min-h-screen max-h-fit h-full w-full flex-col items-center justify-center bg-[#005377] border">
          

            {steps[pageindex]}
        </div>
    )
};

export default Multistep










