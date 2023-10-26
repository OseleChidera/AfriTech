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

const SignupSchema = Yup.object().shape({
    email: Yup.string()
        .min(2, 'Too Short!')
        .max(45, 'Too Long!')
        .required('Required'),
    password: Yup.string()
        .min(8, 'Too Short!')
        .max(12, 'Too Long!')
        .required('Required'),

});

const SigninMain = ({user, nextStep, isDisabled, setIsDisabled }) => {
    const [showPassword, setShowPassword] = useState(false)
    if (user) {
    console.log('hurray user is logged in ')
    }
    return (
            <>
            {user ? 
                <div id='form-two' className='max-w-xs w-full'>

                    <div div className="mb-3" >
                        <span className='font-extrabold capitalize mb-4 text-white text-3xl'>
                            Hi there,welcome to AfriTech! 👋
                        </span>
                    </div >
                    <Formik
                        initialValues={{
                            email: 'oselechidera560@gmail.com',
                            password: !isDisabled ? 'Goerge4real' : '',

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
                                    throwMessage(error.code)
                                });



                        }}
                    >
                        {({ errors, touched }) => (

                            <Form>

                                <div className="mb-3 ">
                                    <label className='font-bold capitalize block mb-[0.25rem] text-white' htmlFor="email">Email : </label>
                                    <Field name="email" type="email" />
                                    {errors.email && touched.email ? (
                                        <div className='text-[0.7rem] text-red-600 font-semibold'>{errors.email}</div>
                                    ) : null}
                                </div>

                                <div className="mb-3 relative">
                                    <label className='font-bold capitalize block mb-[0.25rem] text-white' htmlFor="password">Password : </label>
                                    <div className="flex flex-row items-center w-full">
                                        <Field name="password" type={showPassword ? 'password' : 'text'} className="w-full" placeholder="Enter your password" />

                                        <button type='button' onClick={() => setShowPassword((showPassowrd) => !showPassowrd)} className='bg-transparent absolute right-3'>
                                            <img width="18" height="18" src="https://img.icons8.com/ios/50/show-password.png" alt="show-password" />
                                        </button>
                                    </div>
                                    {errors.password && touched.password ? (
                                        <div className='text-[0.7rem] text-red-600 font-semibold'>{errors.password}</div>
                                    ) : null}
                                </div>

                                <div className="flex justify-between">
                                    <button className="text-white border-none underline underline-offset-4" type='button' onClick={() => nextStep()}>Forgort Password ?</button>
                                    <button
                                        type="submit"
                                        className='font-bold  bg-white text-xl text-[#005377] capitalize px-4 py-[0.55rem] rounded-lg relative float-right'>
                                        Sign In
                                    </button>
                                </div>
                                {/* </div> */}
                            </Form>
                        )}
                    </Formik>
                </div > : <Home/>}
            </>
    )
}


export default SigninMain