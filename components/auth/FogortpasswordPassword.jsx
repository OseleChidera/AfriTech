'use client'
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import Link from 'next/link';
import * as Yup from 'yup';
import { auth } from '@/firebase/firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { ToastContainer, toast } from 'react-toastify';





const SignupSchema = Yup.object().shape({
    password1: Yup.string()
        .min(8, 'Too Short!')
        .max(12, 'Too Long!')
        .required('Required'),
    password2: Yup.string()
        .min(8, 'Too Short!')
        .max(12, 'Too Long!')
        .required('Required'),

});
const FoggortpasswordPassword = (user, setUser) => {
    const [showPassword, setShowPassword] = useState({first: false, last: false})
   
    return (
        <div id='form-two' className='max-w-xs w-full'>
            <ToastContainer
                position="top-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover
                theme="colored"
            />
            <div className="mb-3">
                <span className='font-extrabold capitalize text-base mb-4'>
                    Hi there,welcome to AfriTech! 👋
                </span>
            </div>
            <Formik
                initialValues={{
                    password1: 'dddddddd',
                    password2: 'dddddddd',

                }}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    // same shape as initial values
                    console.log(values);
                    signInWithEmailAndPassword(auth, values.email, values.password)
                        .then((userCredential) => {
                            console.log(userCredential)
                            // Signed in 
                            const userCredentials = userCredential.user;

                            toast.success('Login successful', {
                                position: "top-right",
                                autoClose: 2000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: false,
                                progress: undefined,
                                theme: "colored",
                            });
                        })
                        .catch((error) => {
                            console.log(error.code)
                            throwError(error.code)
                        });



                }}
            >
                {({ errors, touched }) => (

                    <Form>

                        <div className="mb-3 relative">
                            <label className='font-bold capitalize block mb-[0.25rem]' for="password1">Password : </label>
                            <div className="flex flex-row items-center w-full">
                                <Field name="password1" type={showPassword.first ? 'password' : 'text'} className="w-full" />

                                <button type='button' onClick={() => setShowPassword(prevState => ({ ...prevState, first: !prevState.first }))} className='bg-transparent absolute right-3'>
                                    
                                    <img width="18" height="18" src="https://img.icons8.com/ios/50/show-password.png" alt="show-password" />
                                </button>
                            </div>
                            {errors.password1 && touched.password1 ? (
                                <div className='text-[0.7rem] text-red-600 font-semibold'>{errors.password1}</div>
                            ) : null}
                        </div>

                        <div className="mb-3 relative">
                            <label className='font-bold capitalize block mb-[0.25rem]' for="password2">Confirm Password : </label>
                            <div className="flex flex-row items-center w-full">
                                <Field name="password2" type={showPassword.last ? 'password' : 'text'} className="w-full" />

                                <button type='button' onClick={() => setShowPassword(prevState => ({ ...prevState, last: !prevState.last }))} className='bg-transparent absolute right-3'>
                                    <img width="18" height="18" src="https://img.icons8.com/ios/50/show-password.png" alt="show-password" />
                                </button>
                            </div>
                            {errors.password2 && touched.password2 ? (
                                <div className='text-[0.7rem] text-red-600 font-semibold'>{errors.password2}</div>
                            ) : null}
                        </div>

                            <button
                                type="submit"
                                className='font-bold capitalize bg-blue-500 text-xl text-white capitalize px-4 py-[0.55rem] rounded-lg relative float-right'>
                                Change Password
                            </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
};

export default FoggortpasswordPassword

