'use client'
import React,{useState} from 'react';
import { Formik, Form, Field } from 'formik';
import Link from 'next/link';
import * as Yup from 'yup';
import Image from 'next/image';
import arrow from '../../public/icons/icons8-right-arrow-ios-16-filled-16.png'

const SignupSchema = Yup.object().shape({
    passportnumber: Yup.string()
        .min(2, 'Too Short!')
        .max(8, 'Too Long!')
        .required('Required'),
        // .matches(/^(?=.*[a-zA-Z])(?=.*[0-9]).+$/, "Input must contain a letter and a number"),
    
        passportImage: Yup.mixed()
            .test("fileSize", "Image must be less than 2MB", (file) => file && file.size < 1024 * 1024)
        .test("fileType", "Image must be a JPEG or PNG file", (file) => file.type === "image/jpeg" || file.type === "image/png")
        .required("Image is required"),

    ninnumber: Yup.number()
        .required('Required')
        .test("length", "Number must be 6 characters long", (val) => {
            return val.toString().length > 6;
        })
        .test("length", "too long", (val) => {
            return val.toString().length === 7;
        }),
        // .matches(/^[0-9]+$/, "Number must contain only numbers"),


    
    
    ninImage: Yup.mixed()
    .test("FILE_SIZE", "Image must be less than 2MB", (file) => file && file.size < 1024*1024)
    .test("FILE_TYPE", "Image must be a JPEG or PNG file", (file) => file.type === "image/jpeg" || file.type === "image/png")
    .required("Image is required"),
   
});
const ValidationSchemaExample = () =>{
    const [hasPermission, setHasPermission] = useState(true);
    const [passportImage, setPassportImage] = useState(null);
    const [ninImage, setNinImage] = useState(null);
    

    const requestPermission = async () => {
        // Request permission from the user to access storage
        if (!hasPermission) {
            if (window.confirm('To be able to upload your documents we would require access to your storage. Would you like to grant us access to your storage 😃 ?')) {
                setHasPermission(true);
            }
            else{
                setHasPermission(false);
            }
        }

    };
    requestPermission()
    return (
        <div id='form-three' className='max-w-xs w-full'>
            <div className="mb-3">
                {/* <h1 className='font-bold text-6xl capitalize mb-3 text-shadow-md '>Sign Up</h1> */}
                <span className='font-extrabold capitalize text-base mb-4'>
                   Were almost there. ne last step ....
                </span>
            </div>
            <Formik
                initialValues={{
                    passportnumber: '',
                    passportImage: '',
                    ninnumber: '',
                    ninImage: '',

                }}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    // same shape as initial values
                    console.log(values);
                    
                }}
            >
                {({ values, handleChange ,errors, touched }) => (

                    <Form>

                        <div className="mb-3">
                            <label className='font-bold capitalize block mb-[0.25rem]' htmlFor="passportnumber">Passport Number : </label>
                            <div className="flex flex-col gap-2 justify-start">
                                <Field type="text" name="passportnumber" id='passportnumber' className='passportnumber' />
                                <input
                                    type="file"
                                    id='passportImage'
                                    name="passportImage"
                                    accept='image/*'
                                    disabled={!hasPermission}
                                    value={values.passportImage}
                                    onChange={(event) => {
                                        console.log(event.target.files)
                                        setPassportImage((passportImage)=>event.target.files[0]);
                                    }}
                                />
                            </div>

                                
                            
                            {errors.passportnumber && touched.passportnumber ? (
                                <div className='text-[0.7rem] text-red-600 font-semibold mb-0'>{errors.passportnumber}</div>
                            ) : null}
                            {errors.passportImage && <span className='text-[0.7rem] text-red-600 font-semibold'>{errors.passportImage}</span>}
                        </div>
                        <div className="mb-3">
                            <label className='font-bold capitalize block mb-[0.25rem]' htmlFor="ninnumber">NIN Number : </label>
                            <div className="flex flex-col gap-2 justify-start">
                                <Field name="ninnumber" type="number" />
                                {/* <input
                                    type="file"
                                    name="ninImage"
                                    accept='image/*'
                                    disabled={!hasPermission}
                                    // value={values.ninImage}
                                    onChange={(event) => {
                                        console.log(event.target.files)
                                        setNinImage((ninImage)=>event.target.files[0]);
                                    }}
                                /> */}
                            </div>
                            {errors.ninnumber && touched.ninnumber ? (
                                <div className='text-[0.7rem] text-red-600 font-semibold mb-0'>{errors.ninnumber}</div>
                            ) : null}
                            {/* {errors.ninImage && <span className='text-[0.7rem] text-red-600 font-semibold'>{errors.ninImage}</span>} */}
                        </div>

                        <button
                            type="submit"
                            // onClick={isSubmitting}
                            className='flex items-center justify-center font-bold capitalize bg-blue-500 text-sm text-white capitalize p-2 rounded-full relative float-right'>
                            <Image width="25" height="25" src={arrow} alt="long-arrow-right" />
                        </button>
                        {/* </div> */}
                    </Form>
                )}
            </Formik>
        </div>
    )
};

export default ValidationSchemaExample