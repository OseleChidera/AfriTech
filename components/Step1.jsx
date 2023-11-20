'use client'
import React, { useState , useEffect} from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { auth } from '@/firebase/firebaseConfig'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { collection, addDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { database, storage } from '@/firebase/firebaseConfig';
import 'react-toastify/dist/ReactToastify.css';
import { throwMessage } from '@/utils/utility';
import { step1ValidationSchema } from "../utils/schemaUtil"
import { useSelector, useDispatch } from "react-redux";
import { setUserIdData} from '../redux/user'

const Step1 = ({ data, next }) => {
    const [showPassowrd1, setShowPassword1] = useState(false)
    const [showPassowrd2, setShowPassword2] = useState(false)
    const userId = useSelector((state) => state.user.value);
    const dispatch = useDispatch();

    function createUserFirestoreEntry(userProfile) {
        const customDocRef = doc(database, 'Users', `${userProfile.reloadUserInfo.localId}`);
        setDoc(customDocRef, { email: values.email, password: values.password });
    }
    const saveUserDataToLocalStorage = (userData) => {
        localStorage.setItem('afriTechUserID', JSON.stringify(userData));
    };

    const handleSubmit = (values) => {
        next(values)
        createUserWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
                const userProfile = userCredential.user;
                try {
                    console.log("new user id" + userId)
                    sendEmailVerification(userProfile)
                    throwMessage('A verification email was sent to you follow the instructions')
                    const customDocRef = doc(database, 'Users', `${userProfile.reloadUserInfo.localId}`);
                    setDoc(customDocRef, { email: values.email});
                    console.log('user id: ' + userProfile.uid)
                    dispatch(setUserIdData(userProfile.uid))
                    //save the user id in local storage on signup
                    localStorage.setItem('afriTechUserID', JSON.stringify({ userID: `${userProfile.uid}` }))
                }
                catch (error) { 
                    console.log(error)
                    throwMessage(error.message) 
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                throwMessage(errorCode)
                console.log(errorCode)
            });
    }
   
    return (
        <Formik
            initialValues={data}
            validationSchema={step1ValidationSchema}
            async onSubmit={handleSubmit}>
            {({ errors, touched }) => (

                <Form>
                    <div id='form-two' className='max-w-xs  '>
                        <div className="mb-3">
                            <span className='font-extrabold capitalize mb-4 text-white text-3xl'>
                                Hi there,welcome to AfriTech! 👋
                            </span>
                        </div>


                        <div className="mb-3">
                            <div className="flex flex-col">
                                <label className='font-bold capitalize block mb-[0.25rem] text-white' htmlFor="email">Email : </label>
                                <Field name="email" type="email" />

                            </div>
                            {errors.email && touched.email ? (
                                <div className='text-[0.7rem] text-red-600 font-semibold'>{errors.email}</div>
                            ) : null}
                        </div>

                        <div className="mb-3 ">
                            <div className=" flex flex-col relative">
                                <label className='font-bold capitalize block mb-[0.25rem] text-white' htmlFor="password">Password : </label>
                                <div className="flex flex-row items-center w-full">
                                    <Field name="password" type={showPassowrd1 ? 'text' : 'password'} className="w-full" placeholder="*********" />
                                    <button type='button' onClick={() => setShowPassword1((showPassowrd1) => !showPassowrd1)} className='bg-transparent absolute right-3'>
                                        <img width="18" height="18" src="https://img.icons8.com/ios/50/show-password.png" alt="show-password" />
                                    </button>
                                </div>

                            </div>
                            {errors.password && touched.password ? (
                                <div className='text-[0.7rem] text-red-600 font-semibold'>{errors.password}</div>
                            ) : null}
                        </div>

                        <div className="mb-3 ">
                            <div className=" flex flex-col relative">
                                <label className='font-bold capitalize block mb-[0.25rem] text-white' htmlFor="confirm_password">Re-enter Password : </label>
                                <div className="flex flex-row items-center w-full">
                                    <Field name="confirm_password" type={showPassowrd2 ? 'text' : 'password'} className="w-full" placeholder="*********" />
                                    <button type='button' onClick={() => setShowPassword2((showPassowrd2) => !showPassowrd2)} className='bg-transparent absolute  right-3'>
                                        <img width="18" height="18" src="https://img.icons8.com/ios/50/show-password.png" alt="show-password" />
                                    </button>
                                </div>
                                {errors.confirm_password && touched.confirm_password ? (
                                    <div className='text-[0.7rem] text-red-600 font-semibold'>{errors.confirm_password}</div>
                                ) : null}
                            </div>
                            {/* {prompt && <p className="text-red-700 font-bold text-lg">{prompt}</p>} */}
                       </div>


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