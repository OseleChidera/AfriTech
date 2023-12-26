import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { auth } from '@/firebaseConfig'
import { findUserByEmail } from '@/utils/utility';
import {sendPasswordResetEmail} from "firebase/auth";
import { throwMessage } from '@/utils/utility';

const SignupSchema = Yup.object().shape({
    email: Yup.string()
        .min(2, 'Too Short!')
        .max(45, 'Too Long!')
        .required('Required'),

});

const FogortpasswordEmail = ({ user, prevStep, currentIndex, setCurrentIndex, isDisabled, setIsDisabled }) => {
    // console.log(user)
  return (
      <div id='form-two' className='max-w-xs w-full'>
          <div className="mb-3">
              <span className='font-extrabold capitalize mb-4 text-white text-3xl mb-6'>
                  Enter your E-mail to reset the password.
              </span>
          </div>
          <Formik
              initialValues={{
                  email: 'oselechidera560@gmail.com',

              }}
              validationSchema={SignupSchema}
              onSubmit={values => {
              sendPasswordResetEmail(auth, values.email)
              .then(() => {throwMessage('An Email was sent to reset your password')})
              .catch((error) => {
                  console.log(error)
                throwMessage(error.code)}
                );
              setIsDisabled(isDisabled => true)
              setTimeout(() => {
                  setCurrentIndex(currentIndex => 0)
                //   setIsDisabled(isDisabled => !isDisabled)
              }, 2000);
              console.log(values.email)   
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

                         <div className="flex justify-between">
                          <button
                              onClick={() => prevStep()}
                              type="button"
                              className='font-bold  bg-white text-xl text-[#005377] capitalize px-4 py-[0.55rem] rounded-lg relative float-right'>
                              Back
                          </button>
                          <button
                            disabled={isDisabled}
                              type="submit"
                              className={`font-bold  bg-white text-xl text-[#005377] capitalize px-4 py-[0.55rem] rounded-lg relative float-right ${isDisabled ? 'opacity-50' : 'opacity-100'}`}>
                              Reset
                          </button>
                         </div>
                  </Form>
              )}
          </Formik>
      </div>
  )
}

export default FogortpasswordEmail