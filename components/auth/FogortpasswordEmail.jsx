import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import Link from 'next/link';
import * as Yup from 'yup';
import { auth } from '@/firebase/firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { ToastContainer, toast } from 'react-toastify'; 
const SignupSchema = Yup.object().shape({
    email: Yup.string()
        .min(2, 'Too Short!')
        .max(45, 'Too Long!')
        .required('Required'),

});

const FogortpasswordEmail = () => {
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

              }}
              validationSchema={SignupSchema}
              onSubmit={values => {
                  console.log(values);
                  signInWithEmailAndPassword(auth, values.email)
                      .then((userCredential) => {
                          console.log(userCredential)
                          // Signed in 
                          const userCredentials = userCredential.user;

                          toast.success('Password reset email sent successfully', {
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

                          <button
                              type="submit"
                              className='font-bold capitalize bg-blue-500 text-xl text-white capitalize px-4 py-[0.55rem] rounded-lg relative float-right'>
                              send
                          </button>
                  </Form>
              )}
          </Formik>
      </div>
  )
}

export default FogortpasswordEmail