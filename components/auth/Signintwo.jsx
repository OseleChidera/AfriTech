'use client'
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import Link from 'next/link';
import * as Yup from 'yup';
import { auth } from '@/firebase/firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { ToastContainer, toast } from 'react-toastify'; 
import FoggortpasswordPassword from './FogortpasswordPassword';
import FogortpasswordEmail from './FogortpasswordEmail';





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
const ValidationSchemaExample = (user, setUser) => {
const [showPassword , setShowPassword] = useState(false)
    function throwError(errorcode) {
        console.log('error', errorcode)
        let errorCode ;
        switch (errorcode) {
            case 'auth/user-not-found':
                toast.error('This user does not exist . SignUp instead', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "colored",
                    onOpen: () => {
                        console.log('Toast opened redirecting to signup page');
                        // Perform actions after toast is displayed
                    }
                });
                break;
            case 'auth/invalid-login-credentials':
                console.log(auth.getUser())
                toast.error('Invalid username or password22', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "colored",
                });
                break;
            case 'auth/network-request-failed':
                toast.error('Network error please get a stable connection and retry login', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "colored",
                });
                break;
            case 'auth/user-disabled':
                toast.error('This users account has been temporarily disabled. Contact support', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "colored",
                });
                break;
           

            default:
                
                
        }
    }
    return (
        <SignupMain/>
    )
};

export default ValidationSchemaExample

const SignupMain = () => {
    const [showPassword, setShowPassword] = useState(false)
    function throwError(errorcode) {
        console.log('error', errorcode)
        let errorCode;
        switch (errorcode) {
            case 'auth/user-not-found':
                toast.error('This user does not exist . SignUp instead', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "colored",
                    onOpen: () => {
                        console.log('Toast opened redirecting to signup page');
                        // Perform actions after toast is displayed
                    }
                });
                break;
            case 'auth/invalid-login-credentials':
                console.log(auth.getUser())
                toast.error('Invalid username or password22', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "colored",
                });
                break;
            case 'auth/network-request-failed':
                toast.error('Network error please get a stable connection and retry login', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "colored",
                });
                break;
            case 'auth/user-disabled':
                toast.error('This users account has been temporarily disabled. Contact support', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "colored",
                });
                break;


            default:


        }
    }
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
                    email: 'oselechidera560@gmail.com',
                    password: 'dddddddd',

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

                        <div className="mb-3 ">
                            <label className='font-bold capitalize block mb-[0.25rem]' for="email">Email : </label>
                            <Field name="email" type="email" />
                            {errors.email && touched.email ? (
                                <div className='text-[0.7rem] text-red-600 font-semibold'>{errors.email}</div>
                            ) : null}
                        </div>

                        <div className="mb-3 relative">
                            <label className='font-bold capitalize block mb-[0.25rem]' for="password">Password : </label>
                            <div className="flex flex-row items-center w-full">
                                <Field name="password" type={showPassword ? 'password' : 'text'} className="w-full" />

                                <button type='button' onClick={() => setShowPassword((showPassowrd) => !showPassowrd)} className='bg-transparent absolute right-3'>
                                    <img width="18" height="18" src="https://img.icons8.com/ios/50/show-password.png" alt="show-password" />
                                </button>
                            </div>
                            {errors.password && touched.password ? (
                                <div className='text-[0.7rem] text-red-600 font-semibold'>{errors.password}</div>
                            ) : null}
                        </div>

                        <div className="flex justify-between">
                            <button className="text-white border-none underline underline-offset-4">Forgort Password ?</button>
                            <button
                                type="submit"
                                className='font-bold capitalize bg-blue-500 text-xl text-white capitalize px-4 py-[0.55rem] rounded-lg relative float-right'>
                                Sign In
                            </button>
                        </div>
                        {/* </div> */}
                    </Form>
                )}
            </Formik>
        </div>
  )
}
