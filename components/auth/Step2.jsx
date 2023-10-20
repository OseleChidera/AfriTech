import { useState, useContext } from "react";
import { MyContext } from "@/utils/Datacontext";
import { Formik, Form, Field, FormikStep, FormikStepper, FormikProvider } from 'formik';
import * as Yup from 'yup';


const Step2 = () => {
    const { Values, pageindex, setPageIndex, isSubmitClicked, setIsSubmitClicked, partiallyDisableButton, user, setUser } = useContext(MyContext)
    return (
        <div id='form-two' className='max-w-xs w-full'>
            <div className="mb-3">
                {/* <h1 className='font-bold text-6xl capitalize mb-3 text-shadow-md '>Sign Up</h1> */}
                <span className='font-extrabold capitalize text-base mb-4'>
                    {/* Welcome to the club! We're so glad to have you on board. To continue, please fill out the remaining fields. */}
                    Welcome to the next level of [form name]! To continue, please fill out the remaining fields.

                </span>
            </div>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    Username: '',
                    Phone: '',
                    address: '',
                }}
                validationSchema={Yup.object().shape({
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

                })}
                onSubmit={values => {
                    // same shape as initial values
                    console.log(values);
                    setPageIndex(pageindex => pageindex + 1)
                }}
            >
                {({ errors, touched }) => (

                    <Form>

                        <div className="mb-3">
                            <label className='font-bold capitalize block mb-[0.25rem]' for="firstName">FirstName : </label>
                            <Field name="firstName" className="capitalize" />
                            {errors.firstName && touched.firstName ? (
                                <div className='text-[0.7rem] text-red-600 font-semibold'>{errors.firstName}</div>
                            ) : null}
                        </div>

                        <div className="mb-3">
                            <label className='font-bold capitalize block mb-[0.25rem]' for="lastName">LastName : </label>
                            <Field name="lastName" className="capitalize" />
                            {errors.lastName && touched.lastName ? (
                                <div className='text-[0.7rem] text-red-600 font-semibold'>{errors.lastName}</div>
                            ) : null}
                        </div>

                        <div className="mb-3">
                            <label className='font-bold capitalize block mb-[0.25rem]' for="Username">Username : </label>
                            <Field name="Username" type="text" className="capitalize" />
                            {errors.email && touched.email ? <div className='text-[0.7rem] text-red-600 font-semibold'>{errors.email}</div> : null}
                        </div>

                        <div className="mb-3">
                            <label className='font-bold capitalize block mb-[0.25rem]' for="Phone">Telephone Number: </label>
                            <Field name="Phone" type='text' />
                            {errors.Phone && touched.Phone ? (
                                <div className='text-[0.7rem] text-red-600 font-semibold'>{errors.Phone}</div>
                            ) : null}
                        </div>

                        <div className="mb-3">
                            <label className='font-bold capitalize block mb-[0.25rem]' for="address">Residential address: </label>
                            <Field name="address" type="text" />
                            {errors.address && touched.address ? <div className='text-[0.7rem] text-red-600 font-semibold'>{errors.address}</div> : null}
                        </div>
                        {/* <div className="flex flex-row justify-between items-center"> */}
                        <button
                            type="submit"
                            onClick={(e) => { partiallyDisableButton(e.target) }}
                            className='font-bold capitalize bg-blue-500 text-xl text-white capitalize px-4 py-[0.55rem] rounded-lg relative float-right'>
                            Submit
                        </button>
                        {/* </div> */}
                    </Form>
                )}
            </Formik>
        </div>
    )
}
export default Step2