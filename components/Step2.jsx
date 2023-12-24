'use client'
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import { step2ValidationSchema } from "../utils/schemaUtil"


const Step2 = ({ data, next }) => {
    const handleSubmit = (values) => {
        next(values)
    }
    
    return (
        <Formik
            initialValues={data}
            validationSchema={step2ValidationSchema}
            onSubmit={handleSubmit}>
            {({ errors, touched, values }) => (
                <Form>
                    <div id='form-two' className='max-w-xs w-full'>
                        <div className="mb-3">
                            <span className='font-extrabold capitalize  mb-4 text-white text-xl'>
                                Welcome to the next stage dera! To proceed, please fill out the remaining fields.

                            </span>
                        </div>


                        <div className="mb-3">
                            <label className='font-bold capitalize block mb-[0.25rem] text-white' htmlFor="firstname">FirstName : </label>
                            <Field name="firstname" className="capitalize" placeholder="Firstname"/>
                            {errors.firstname && touched.firstname ? (
                                <div className='text-[0.7rem] text-red-600 font-semibold'>{errors.firstname}</div>
                            ) : null}
                        </div>

                        <div className="mb-3">
                            <label className='font-bold capitalize block mb-[0.25rem] text-white' htmlFor="lastname">LastName : </label>
                            <Field name="lastname" className="capitalize" placeholder="Lastname" />
                            {errors.lastname && touched.lastname ? (
                                <div className='text-[0.7rem] text-red-600 font-semibold'>{errors.lastname}</div>
                            ) : null}
                        </div>

                        <div className="mb-3">
                            <label className='font-bold capitalize block mb-[0.25rem] text-white' htmlFor="Username">Username : </label>
                            <Field name="Username" type="text" className="capitalize" placeholder="John" />
                            {errors.Username && touched.Username ? <div className='text-[0.7rem] text-red-600 font-semibold'>{errors.Username}</div> : null}
                        </div>
                        

                        <div className="mb-3">
                            <label className='font-bold capitalize block mb-[0.25rem] text-white' htmlFor="Phone">Telephone Number: </label>
                            <Field name="Phone" type='text' placeholder="09040500800" />
                            {errors.Phone && touched.Phone ? (
                                <div className='text-[0.7rem] text-red-600 font-semibold'>{errors.Phone}</div>
                            ) : null}
                        </div>

                        <div className="mb-3">
                            <label className='font-bold capitalize block mb-[0.25rem] text-white' htmlFor="address">Residential address: </label>
                            <Field name="address" type="text" placeholder="12, Anytown Anywhere Nigeria." />
                            {errors.address && touched.address ? <div className='text-[0.7rem] text-red-600 font-semibold'>{errors.address}</div> : null}
                        </div>
                        {/* <div className="flex flex-row justify-between items-center"> */}
                        <div className="">
                            <button type="submit" className='justify-center font-bold   bg-white text-xl text-[#005377] capitalize px-4 py-[0.55rem] rounded-lg relative float-right' 
                            >Next</button>
                        </div>
                        {/* </div> */}
                    </div>
                </Form>
            )}
        </Formik>
    )
}
export default Step2