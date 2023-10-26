'use client'
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import Link from 'next/link';
import * as Yup from 'yup';
import { auth } from '@/firebase/firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { ToastContainer, toast } from 'react-toastify'; 
import FogortpasswordEmail from './FogortpasswordEmail';
import { throwMessage } from '@/utils/utility';
import SigninMain from './SigninMain';






const ValidationSchemaExample = (user) => {
    const [currentIndex , setCurrentIndex] = useState(0)
    const [isDisabled, setIsDisabled] = useState(false)

    function nextStep(final = false){
        setCurrentIndex(currentIndex => currentIndex + 1)
    }
    function prevStep(final = false) {
        setCurrentIndex(currentIndex => currentIndex - 1)
    }
    const steps = [<SigninMain 
                    nextStep={nextStep} 
                    prevStep={prevStep} 
                    isDisabled={isDisabled} 
                    setIsDisabled={setIsDisabled} 
                    user={user}/>,
                   <FogortpasswordEmail 
                   nextStep={nextStep} 
                   prevStep={prevStep} 
                   currentIndex={currentIndex} 
                   setCurrentIndex={setCurrentIndex} 
                   isDisabled={isDisabled} 
                   setIsDisabled={setIsDisabled} user={user} />]
    return (
        <>
            {steps[currentIndex]}
        </>
    )
};

export default ValidationSchemaExample

