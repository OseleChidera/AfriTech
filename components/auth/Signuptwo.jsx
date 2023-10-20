'use client'
import React,{useState} from 'react';
import { Formik, Form, Field } from 'formik';
import Link from 'next/link';
import * as Yup from 'yup';
import { auth } from '@/firebase/firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { collection, addDoc,  doc, setDoc } from "firebase/firestore";
import { database } from '@/firebase/firebaseConfig';
import FogortpasswordEmail from './FogortpasswordEmail';
import FoggortpasswordPassword from './FogortpasswordPassword';

const SignupSchema = Yup.object().shape({
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

});
const ValidationSchemaExample = () => {
    const [showPassowrd1, setShowPassword1] = useState(false)
    const [showPassowrd2 , setShowPassword2] = useState(false)
    const [prompt, setPrompt] = useState("");


    // const Users_Collection = db.collection("Users");
 return (
        // <div id='form-two' className='max-w-xs w-full'>
        //     <div className="mb-3">
        //         <span className='font-extrabold capitalize text-base mb-4'>
        //             Hi there,welcome to AfriTech! 👋
        //         </span>
        //     </div>
        //     <Formik
        //         initialValues={{
        //             email: 'oselechidera5600000@gmail.com',
        //             password: 'dddddddd',
        //             confirm_password: 'dddddddd',

        //         }}
        //         validationSchema={SignupSchema}
        //         async onSubmit={(values) => {
        //             console.log(values);
        //              createUserWithEmailAndPassword(auth, values.email, values.password)
        //                 .then((userCredential) => {
        //                     console.log(userCredential)
        //                     // Signed in 
        //                     const userProfile = userCredential.user;
        //                     // ...
        //                     console.log(userProfile.reloadUserInfo.localId)
        //                     const customDocRef = doc(database, 'Users', `${userProfile.reloadUserInfo.localId}`);
        //                     setDoc(customDocRef, { email: values.email, password: values.password });
        //                     // addDoc(collection(database, "Users", userProfile.reloadUserInfo.localId), {email: values.email,password: values.password});
                            

        //                 })
        //                 .catch((error) => {
        //                     console.log(error)
        //                     const errorCode = error.code;
        //                     const errorMessage = error.message;
        //                 });



        //         }}
        //     >
        //         {({ errors, touched }) => (

        //             <Form>

        //                 <div className="mb-3">
        //                     <label className='font-bold capitalize block mb-[0.25rem]' for="email">Email : </label>
        //                     <Field name="email" type="email" />
        //                     {errors.email && touched.email ? (
        //                         <div className='text-[0.7rem] text-red-600 font-semibold'>{errors.email}</div>
        //                     ) : null}
        //                 </div>

        //                 <div className="mb-3">
        //                     <label className='font-bold capitalize block mb-[0.25rem]' for="password">Password : </label>
        //                     <div className="flex flex-row items-center">
        //                         <Field name="password" type={showPassowrd1 ?  'text' : 'password'}/>
        //                         <button type='button' onClick={() => setShowPassword1((showPassowrd1) => !showPassowrd1)} className='bg-transparent border-none absolute right-10 z-10'>
        //                             <img width="18" height="18" src="https://img.icons8.com/ios/50/show-password.png" alt="show-password" />
        //                         </button>
        //                     </div>
        //                     {errors.password && touched.password ? (
        //                         <div className='text-[0.7rem] text-red-600 font-semibold'>{errors.password}</div>
        //                     ) : null}
        //                 </div>

        //                 <div className="mb-3">
        //                     <label className='font-bold capitalize block mb-[0.25rem]' for="confirm_password">Re-enter Password : </label>
        //                  <div className="flex flex-row items-center">
        //                         <Field name="confirm_password" type={showPassowrd2 ? 'text' : 'password'} />
        //                         <button type='button' onClick={() => setShowPassword2((showPassowrd2) => !showPassowrd2)} className='bg-transparent border-none absolute right-10 z-10'>
        //                             <img width="18" height="18" src="https://img.icons8.com/ios/50/show-password.png" alt="show-password" />
        //                         </button>
        //                     </div>
        //                     {errors.confirm_password && touched.confirm_password ? (
        //                         <div className='text-[0.7rem] text-red-600 font-semibold'>{errors.confirm_password}</div>
        //                     ) : null}
        //                 </div>
        //                 {prompt && <p className="text-red-700 font-bold text-lg">{prompt}</p>}


        //                 {/* <div className="flex flex-row justify-between items-center"> */}
        //                 <button
        //                     type="submit"
        //                     // onClick={isSubmitting}
        //                     className='font-bold capitalize bg-blue-500 text-xl text-white capitalize px-4 py-[0.55rem] rounded-lg relative float-right'>
        //                     Sign In
        //                 </button>
        //                 {/* </div> */}
        //             </Form>
        //         )}
        //     </Formik>
        // </div>
        // <FogortpasswordEmail/>
        <FoggortpasswordPassword/>
    )
};

export default ValidationSchemaExample