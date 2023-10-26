'use client'
import React, { useState, useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';


const Step2 = ({ data, next }) => {
    const handleSubmit = (values) => {
        console.table(values)
        next(values)
    }
    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, 'Too Short!')
            .max(15, 'Too Long!')
            .required('Required'),
        lastName: Yup.string()
            .min(2, 'Too Short!')
            .max(15, 'Too Long!')
            .required('Required'),
        Username: Yup.string()
            .min(2, 'Too Short!')
            .max(10, 'Too Long!')
            .required('Required'),
        Phone: Yup.string()
            .min(10, 'Too Short!')
            .max(11, 'Too Long!')
            .required('Required'),
        address: Yup.string()
            .min(10, 'Too Short!')
            .max(60, 'Too Long!')
            .required('Required'),

    })
    return (
        <Formik
            initialValues={data}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
            {({ errors, touched, values }) => (
                <Form>
                    <div id='form-two' className='max-w-xs w-full'>
                        <div className="mb-3">
                            {/* <h1 className='font-bold text-6xl capitalize mb-3 text-shadow-md '>Sign Up</h1> */}
                            <span className='font-extrabold capitalize  mb-4 text-white text-xl'>
                                {/* Welcome to the club! We're so glad to have you on board. To continue, please fill out the remaining fields. */}
                                Welcome to the next stage dera! To continue, please fill out the remaining fields.

                            </span>
                        </div>


                        <div className="mb-3">
                            <label className='font-bold capitalize block mb-[0.25rem] text-white' htmlFor="firstName">FirstName : </label>
                            <Field name="firstName" className="capitalize" />
                            {errors.firstName && touched.firstName ? (
                                <div className='text-[0.7rem] text-red-600 font-semibold'>{errors.firstName}</div>
                            ) : null}
                        </div>

                        <div className="mb-3">
                            <label className='font-bold capitalize block mb-[0.25rem] text-white' htmlFor="lastName">LastName : </label>
                            <Field name="lastName" className="capitalize" />
                            {errors.lastName && touched.lastName ? (
                                <div className='text-[0.7rem] text-red-600 font-semibold'>{errors.lastName}</div>
                            ) : null}
                        </div>

                        <div className="mb-3">
                            <label className='font-bold capitalize block mb-[0.25rem] text-white' htmlFor="Username">Username : </label>
                            <Field name="Username" type="text" className="capitalize" />
                            {errors.email && touched.email ? <div className='text-[0.7rem] text-red-600 font-semibold'>{errors.email}</div> : null}
                        </div>

                        <div className="mb-3">
                            <label className='font-bold capitalize block mb-[0.25rem] text-white' htmlFor="Phone">Telephone Number: </label>
                            <Field name="Phone" type='text' />
                            {errors.Phone && touched.Phone ? (
                                <div className='text-[0.7rem] text-red-600 font-semibold'>{errors.Phone}</div>
                            ) : null}
                        </div>

                        <div className="mb-3">
                            <label className='font-bold capitalize block mb-[0.25rem] text-white' htmlFor="address">Residential address: </label>
                            <Field name="address" type="text" />
                            {errors.address && touched.address ? <div className='text-[0.7rem] text-red-600 font-semibold'>{errors.address}</div> : null}
                        </div>
                        {/* <div className="flex flex-row justify-between items-center"> */}
                        <div className="">
                            {/* <button type="bbutton" onClick={() => prev(values)} className='flex items-center justify-center font-bold capitalize bg-blue-500 text-xl text-white capitalize p-2 rounded-sm relative float-right'
                            >Prev</button> */}
                            <button type="submit" className='flex items-center justify-center font-bold capitalize bg-white text-xl text-[#005377] p-2 rounded-sm relative float-right'
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