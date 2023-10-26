'use client'
import React, { useState, useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { auth } from '@/firebase/firebaseConfig'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { collection, addDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { database, storage } from '@/firebase/firebaseConfig';
import 'react-toastify/dist/ReactToastify.css';
import { throwMessage } from '@/utils/utility';

const Step1 = ({ data, next, setUserId }) => {
    const [showPassowrd1, setShowPassword1] = useState(false)
    const [showPassowrd2, setShowPassword2] = useState(false)

    function createUserFirestoreEntry(userProfile) {
        const customDocRef = doc(database, 'Users', `${userProfile.reloadUserInfo.localId}`);
        setDoc(customDocRef, { email: values.email, password: values.password });
    }

    const handleSubmit = (values) => {
        createUserWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
                console.log(userCredential)
                const userProfile = userCredential.user;
                console.log(userProfile.reloadUserInfo.localId)
                try {
                    sendEmailVerification(userProfile)
                    throwMessage('A verification email was sent to you follow the instructions')
                    console.log("second then" + userProfile)
                    const customDocRef = doc(database, 'Users', `${userProfile.reloadUserInfo.localId}`);
                    console.log(customDocRef)
                    setDoc(customDocRef, { email: values.email, password: values.password });

                    setUserId(userProfile.reloadUserInfo.localId)
                    next(values)

                }
                catch (error) { throwMessage(error.message) }



            })
            .catch((error) => {
                const errorCode = error.code;
                throwMessage(errorCode)
                console.log(errorCode)
            });
        console.log('user created successfuly')
    }
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .min(2, 'Too Short!')
            .max(45, 'Too Long!')
            .required('Required'),
        password: Yup.string()
            .min(8, 'Too Short!')
            .max(12, 'Too Long!')
            .required('Required'),
        confirm_password: Yup.string()
            .min(8, 'Too Short!')
            .max(12, 'Too Long!')
            .required('Required')
            .oneOf([Yup.ref("password")], "Passwords must match"),
    })
    return (
        <Formik
            initialValues={data}
            validationSchema={validationSchema}
            async onSubmit={handleSubmit}
        >
            {({ errors, touched }) => (

                <Form className=''>
                    <div id='form-two' className='max-w-xs border '>
                        <div className="mb-3">
                            <span className='font-extrabold capitalize mb-4 text-white text-3xl'>
                                Hi there,welcome to AfriTech! 👋
                            </span>
                        </div>


                        <div className="mb-3">
                            <label className='font-bold capitalize block mb-[0.25rem] text-white' htmlFor="email">Email : </label>
                            <Field name="email" type="email" />
                            {errors.email && touched.email ? (
                                <div className='text-[0.7rem] text-red-600 font-semibold'>{errors.email}</div>
                            ) : null}
                        </div>

                        <div className="mb-3 relative">
                            <label className='font-bold capitalize block mb-[0.25rem] text-white' htmlFor="password">Password : </label>
                            <div className="flex flex-row items-center w-full">
                                <Field name="password" type={showPassowrd1 ? 'text' : 'password'} className="w-full" />
                                <button type='button' onClick={() => setShowPassword1((showPassowrd1) => !showPassowrd1)} className='bg-transparent absolute right-3'>
                                    <img width="18" height="18" src="https://img.icons8.com/ios/50/show-password.png" alt="show-password" />
                                </button>
                            </div>
                            {errors.password && touched.password ? (
                                <div className='text-[0.7rem] text-red-600 font-semibold'>{errors.password}</div>
                            ) : null}
                        </div>

                        <div className="mb-4 relative">
                            <label className='font-bold capitalize block mb-[0.25rem] text-white' htmlFor="confirm_password">Re-enter Password : </label>
                            <div className="flex flex-row items-center w-full">
                                <Field name="confirm_password" type={showPassowrd2 ? 'text' : 'password'} className="w-full" />
                                <button type='button' onClick={() => setShowPassword2((showPassowrd2) => !showPassowrd2)} className='bg-transparent absolute  right-3'>
                                    <img width="18" height="18" src="https://img.icons8.com/ios/50/show-password.png" alt="show-password" />
                                </button>
                            </div>
                            {errors.confirm_password && touched.confirm_password ? (
                                <div className='text-[0.7rem] text-red-600 font-semibold'>{errors.confirm_password}</div>
                            ) : null}
                        </div>
                        {prompt && <p className="text-red-700 font-bold text-lg">{prompt}</p>}


                        <button
                            type="submit"
                            className={`font-bold  bg-white text-xl text-[#005377] capitalize px-4 py-[0.55rem] rounded-lg relative float-right `}>
                            Sign Up
                        </button>
                        {/* </div> */}

                    </div>
                </Form >
            )}
        </Formik >

    )
}
export default Step1