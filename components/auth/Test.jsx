'use client'
import React, { useState, useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { auth } from '@/firebase/firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { collection, addDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { database, storage } from '@/firebase/firebaseConfig';
import { MyContext } from '@/utils/Datacontext';
import Togglepassword from '../Togglepassword';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";



const initialValues = {
    email: '',
    password: '',
    confirm_password: '',
    firstName: '',
    lastName: '',
    Username: '',
    Phone: '',
    address: '',
    passportnumber: '',
    image: null,
    ninnumber: '',
    image2: null,
    agreeToTerms: false
}
const validationSchema = Yup.object().shape({
    step1: Yup.object().shape({
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
    }),
    step2: Yup.object().shape({
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
            .max(45, 'Too Long!')
            .required('Required'),
    }),
    step3: Yup.object().shape({
        passportnumber: Yup.string()
            .min(2, 'Too Short!')
            .max(8, 'Too Long!')
            .required('Required'),
        image: Yup.mixed()
            .required('Image is required')
            .test('fileSize', 'Image must be less than 2MB', (value) => value && value.size <= 2 * 1024 * 1024)
            .test('fileType', 'Invalid file type. Only JPG and PNG are allowed.', (value) =>
                value && (value.type === 'image/jpeg' || value.type === 'image/png')
            ),
        ninnumber: Yup.number()
            .required('Required')
            .test("length", "too long", (value) => value.toString().length === 6),
        image2: Yup.mixed()
            .required('Image is required')
            .test('fileSize', 'Image must be less than 2MB', (value) => value && value.size <= 2 * 1024 * 1024)
            .test('fileType', 'Invalid file type. Only JPG and PNG are allowed.', (value) =>
                value && (value.type === 'image/jpeg' || value.type === 'image/png')
            ),
    }),
    step4: Yup.object().shape({
        agreeToTerms: Yup.bool()
            .required('You cant proceed further without accepting therms')
    }),



});


const Multistep = () => {
    const [pageindex, setPageIndex] = useState(0)
    const [userid, setUserId] = useState(null)
    const [data, setData] = useState({
        email: 'oselechidera560@gmail.com',
        password: '11111111',
        confirm_password: '11111111',
        firstName: 'Mustapha',
        lastName: 'JIMOH',
        Username: 'SSSSSS',
        Phone: '9012555781',
        address: '135 aransiol close oyaderan extate',
        passportnumber: 'a11111',
        image: null,
        ninnumber: '111111',
        image2: null,
        agreeToTerms: false
    })

    async function uploadImage(image) {
        const imagePath = `${userid}/${image.name}`
        const storageRef = ref(storage, imagePath);
        const snapshot = await uploadBytes(storageRef, image);
        return getDownloadURL(storageRef);
    }

    const steps = [
        <Step1 data={data} next={handleNextStep} setUserId={setUserId} />,
        <Step2 data={data} next={handleNextStep} prev={handlePrevStep} />,
        <Step3 data={data} next={handleNextStep} prev={handlePrevStep} />,
        <Step4 data={data} next={handleNextStep} prev={handlePrevStep} userid={userid} />]

    async function ApiReq(newData) {
        console.log('API REQUEST', userid, newData, newData.agreeToTerms)
        const docRef = doc(database, "Users", userid);
        if (newData.agreeToTerms) {
            try {
                const [image1Url, image2Url] = await Promise.all([
                    uploadImage(newData.image),
                    uploadImage(newData.image2),
                ])
                newData.image = image1Url
                newData.image2 = image2Url
                updateDoc(docRef, newData)
                toast.success('User SignUp complete', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "colored",
                });
            } catch (error) { console.log(error.message, error) }


        }
    }
    function handleNextStep(newData, final = false) {
        setData(prev => ({ ...prev, ...newData }))
        if (final) {
            ApiReq(newData)
            return;
        }
        setPageIndex(pageindex => pageindex + 1)
    }
    function handlePrevStep(newData) {
        setData(prev => ({ ...prev, ...newData }))
        setPageIndex(pageindex => pageindex - 1)
    }
    return (
        <div className="">
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
            {steps[pageindex]}
        </div>
    )
};

export default Multistep




const Step1 = ({ data, next, setUserId }) => {
    const [showPassowrd1, setShowPassword1] = useState(false)
    const [showPassowrd2, setShowPassword2] = useState(false)


    const handleSubmit = (values) => {
        createUserWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
                console.log(userCredential)
                // Signed in 
                const userProfile = userCredential.user;
                // ...
                console.log(userProfile.reloadUserInfo.localId)
                const customDocRef = doc(database, 'Users', `${userProfile.reloadUserInfo.localId}`);
                setDoc(customDocRef, { email: values.email, password: values.password });
                setUserId(userProfile.reloadUserInfo.localId)
                next(values)

            })
            .catch((error) => {
                const errorCode = error.code;
                if (errorCode == "auth/email-already-in-use") {
                    toast.error('This Email is already in use . SignIn instead .', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                        theme: "colored",
                    });
                }
                console.log(errorCode)
                const errorMessage = error.message;
                console.log(errorMessage)
            });
        console.log('user created successfuly')
    }
    const validationSchema = Yup.object().shape({
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
    })
    return (
        <Formik
            initialValues={data}
            validationSchema={validationSchema}
            async onSubmit={handleSubmit}
        >
            {({ errors, touched }) => (

                <Form className=''>
                    <div id='form-two' className='max-w-4xl w-full border border-red-800 md:max-w-2xl'>
                        <div className="mb-3">
                            <span className='font-extrabold capitalize text-base mb-4'>
                                Hi there,welcome to AfriTech! 👋
                            </span>
                        </div>


                        <div className="mb-3">
                            <label className='font-bold capitalize block mb-[0.25rem]' for="email">Email : </label>
                            <Field name="email" type="email" />
                            {errors.email && touched.email ? (
                                <div className='text-[0.7rem] text-red-600 font-semibold'>{errors.email}</div>
                            ) : null}
                        </div>

                        <div className="mb-3 relative">
                            <label className='font-bold capitalize block mb-[0.25rem]' for="password">Password : </label>
                            <div className="flex flex-row items-center w-full">
                                <Field name="password" type={showPassowrd1 ? 'text' : 'password'} className="w-full" />
                                <button type='button' onClick={() => setShowPassword1((showPassowrd1) => !showPassowrd1)} className='bg-transparent absolute right-3'>
                                    <img width="18" height="18" src="https://img.icons8.com/ios/50/show-password.png" alt="show-password" />
                                </button>
                            </div>
                            {errors.password && touched.password ? (
                                <div className='text-[0.7rem] text-red-600 font-semibold'>{errors.password}</div>
                            ) : null}
                        </div>

                        <div className="mb-3 relative">
                            <label className='font-bold capitalize block mb-[0.25rem]' for="confirm_password">Re-enter Password : </label>
                            <div className="flex flex-row items-center w-full">
                                <Field name="confirm_password" type={showPassowrd2 ? 'text' : 'password'} className="w-full" />
                                <button type='button' onClick={() => setShowPassword2((showPassowrd2) => !showPassowrd2)} className='bg-transparent absolute  right-3'>
                                    <img width="18" height="18" src="https://img.icons8.com/ios/50/show-password.png" alt="show-password" />
                                </button>
                            </div>
                            {errors.confirm_password && touched.confirm_password ? (
                                <div className='text-[0.7rem] text-red-600 font-semibold'>{errors.confirm_password}</div>
                            ) : null}
                        </div>
                        {prompt && <p className="text-red-700 font-bold text-lg">{prompt}</p>}


                        <button
                            type="submit"
                            className={`font-bold capitalize bg-blue-500 text-xl text-white capitalize px-4 py-[0.55rem] rounded-lg relative float-right `}>
                            Sign Up
                        </button>
                        {/* </div> */}

                    </div>
                </Form >
            )}
        </Formik >

    )
}


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
                            <span className='font-extrabold capitalize text-base mb-4'>
                                {/* Welcome to the club! We're so glad to have you on board. To continue, please fill out the remaining fields. */}
                                Welcome to the next level of [form name]! To continue, please fill out the remaining fields.

                            </span>
                        </div>


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
                        <div className="">
                            {/* <button type="bbutton" onClick={() => prev(values)} className='flex items-center justify-center font-bold capitalize bg-blue-500 text-xl text-white capitalize p-2 rounded-sm relative float-right'
                            >Prev</button> */}
                            <button type="submit" className='flex items-center justify-center font-bold capitalize bg-blue-500 text-xl text-white capitalize p-2 rounded-sm relative float-right'
                            >Next</button>
                        </div>
                        {/* </div> */}
                    </div>
                </Form>
            )}
        </Formik>
    )
}

const Step3 = ({ data, next, prev }) => {
    const [hasPermission, setHasPermission] = useState(true);
    const requestPermission = async () => {
        // Request permission from the user to access storage
        if (!hasPermission) {
            if (window.confirm('To be able to upload your documents we would require access to your storage. Would you like to grant us access to your storage 😃 ?')) {
                setHasPermission(true);
            }
            else {
                setHasPermission(false);
            }
        }

    };
    requestPermission()

    const handleSubmit = (values) => {
        console.table(values)
        next(values)
    }
    const validationSchema = Yup.object().shape({
        passportnumber: Yup.string()
            .min(2, 'Too Short!')
            .max(8, 'Too Long!')
            .required('Required'),
        image: Yup.mixed()
            .required('Image is required')
            .test('fileSize', 'Image must be less than 2MB', (value) => value && value.size <= 2 * 1024 * 1024)
            .test('fileType', 'Invalid file type. Only JPG and PNG are allowed.', (value) =>
                value && (value.type === 'image/jpeg' || value.type === 'image/png')
            ),
        ninnumber: Yup.number()
            .required('Required')
            .test("length", "too long", (value) => value.toString().length === 6),
        image2: Yup.mixed()
            .required('Image is required')
            .test('fileSize', 'Image must be less than 2MB', (value) => value && value.size <= 2 * 1024 * 1024)
            .test('fileType', 'Invalid file type. Only JPG and PNG are allowed.', (value) =>
                value && (value.type === 'image/jpeg' || value.type === 'image/png')
            ),
    })
    return (
        <Formik
            initialValues={data}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ errors, touched, setFieldValue, values }) => (
                <Form>
                    <div id='form-three' className='max-w-lg w-full'>
                        <div className="mb-3">
                            <span className='font-extrabold capitalize text-base mb-4'>
                                Were almost there. ne last step ....
                            </span>
                        </div>

                        <div className=" flex flex-col gap-2 mb-3">
                            <div className="flex flex-col gap-2 justify-start">
                                <label className='font-bold capitalize block mb-[0.25rem]' for="passportnumber">Passport Number : </label>

                                <Field type="text" name="passportnumber" className='passportnumber' />
                                {errors.passportnumber && touched.passportnumber ? (
                                    <div className='text-[0.7rem] text-red-600 font-semibold mb-0'>{errors.passportnumber}</div>
                                ) : null}
                            </div>
                            <div>
                                <label className='font-bold capitalize block mb-[0.25rem]' for="image">Upload a clear image of your passport : </label>

                                <Field
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    disabled={!hasPermission}
                                    value=""
                                    onChange={(event) => {
                                        setFieldValue('image', event.currentTarget.files[0]);
                                    }}
                                />
                                {errors.image && <span className='text-[0.7rem] text-red-600 font-semibold'>{errors.image}</span>}
                            </div>
                        </div>
                        <div className=" flex flex-col gap-2 mb-3">
                            <div className="flex flex-col gap-2 justify-start">
                                <label className='font-bold capitalize block mb-[0.25rem]' htmlFor="ninnumber">NIN Number : </label>

                                <Field type="number" name="ninnumber" id='ninnumber' className='ninnumber' />
                                {errors.ninnumber && touched.ninnumber ? (
                                    <div className='text-[0.7rem] text-red-600 font-semibold mb-0'>{errors.ninnumber}</div>
                                ) : null}
                            </div>
                            <div>
                                <label className='font-bold capitalize block mb-[0.25rem]' for="image2">Upload a clear image of your NIN slip : </label>

                                <Field
                                    type="file"
                                    name="image2"
                                    accept="image/*"
                                    disabled={!hasPermission}
                                    value=""
                                    onChange={(event) => {
                                        setFieldValue('image2', event.currentTarget.files[0]);
                                    }}
                                />
                                {errors.image2 && <span className='text-[0.7rem] text-red-600 font-semibold'>{errors.image2}</span>}
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <button type="bbutton" onClick={() => prev(values)} className='flex items-center justify-center font-bold capitalize bg-blue-500 text-xl text-white capitalize p-2 rounded-sm relative float-right'
                            >Prev</button>
                            <button type="submit" className='flex items-center justify-center font-bold capitalize bg-blue-500 text-xl text-white capitalize p-2 rounded-sm relative float-right'
                            >Next</button>
                        </div>

                    </div>
                </Form>
            )}
        </Formik>
    )
}

const Step4 = ({ data, next }) => {

    const handleSubmit = (values) => {
        next(values, true)
    }
    const validationSchema = Yup.object().shape({
        agreeToTerms: Yup.boolean().required("You must accept the terms and conditions."),
    })
    return (
        <Formik
            initialValues={data}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ errors, touched, values, handleChange, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <div className="max-w-xs w-full overflow-scroll">
                        <h5 className="font-bold text-7xl capitalize mb-3 text-shadow-md">
                            Legal Terms and Conditions
                        </h5>

                        <div className="mb-3 flex-row items-start">
                            {/* <span>1.</span> */}
                            <div className="flex flex-col gap-2">
                                <h3 className='font-bold underline leading-tight'> Introduction</h3>
                                <ol className='text-xs'>
                                    <li>
                                        Welcome to our platform! This platform provides users with
                                        access to a variety of features and services, including the
                                        ability to determine whether to grant user access to the platform
                                        based on user-entered data and data found online, as well as
                                        confirming with Nigeria's financial security standards.
                                    </li>
                                    <li>
                                        By using our platform, you agree to be bound by these Terms and
                                        Conditions. If you do not agree to these Terms and Conditions,
                                        please do not use our platform.
                                    </li>
                                </ol>
                            </div>
                        </div>

                        <div className="mb-3 flex-row items-start">
                            {/* <span>2.</span> */}
                            <div className="flex flex-col gap-2">
                                <h3 className='font-bold underline leading-tight'>2. Definitions</h3>
                                <ul className='text-xs'>
                                    <li>User: Any person or entity that uses our platform.</li>
                                    <li>Personal Data: Any information relating to an identified or identifiable natural person.</li>
                                    <li>Financial Security Standards: The financial security standards set by the Nigerian government.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="mb-3 flex-row items-start">
                            {/* <span>3. </span> */}
                            <h3 className='font-bold underline leading-tight'>Use of the Platform</h3>
                            <div className="flex flex-col gap-2 text-xs" >
                                <span>
                                    You may use our platform for any lawful purpose. However, you may
                                    not use our platform for any purpose that is:
                                </span>
                                <ul>
                                    <li>Illegal</li>
                                    <li>Fraudulent</li>
                                    <li>Harmful to our platform or to other users</li>
                                    <li>In violation of these Terms and Conditions</li>
                                </ul>
                            </div>
                        </div>

                        <div className="mb-3 flex-row items-start">
                            {/* <span>4. </span> */}
                            <div className="flex flex-col gap-2">
                                <h3 className='font-bold underline leading-tight'>Data Collection and Use</h3>
                                <ul className='text-xs'>
                                    <li>
                                        We collect and use Personal Data from users in order to provide the
                                        features and services of our platform. We also collect and use
                                        Personal Data to comply with Nigeria's financial security
                                        standards.
                                    </li>

                                    <li>
                                        We will only collect and use Personal Data that is necessary to
                                        provide the features and services of our platform and to comply
                                        with Nigeria's financial security standards. We will not sell or
                                        share your Personal Data with any third parties without your
                                        consent.
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* <div className="mb-3 flex-row items-start"> */}
                        <div className="mb-3 flex-row items-start">
                            {/* <span>5. </span> */}
                            <div className="flex flex-col gap-2">
                                <h3 className='font-bold underline leading-tight'>Data Security</h3>
                                <span className='text-xs'>
                                    We take the security of your Personal Data very seriously. We have
                                    implemented a variety of security measures to protect your
                                    Personal Data from unauthorized access, use, disclosure,
                                    modification, or destruction.
                                </span>
                            </div>
                        </div>

                        <div className="mb-3 flex-row items-start">
                            {/* <span>6. </span> */}
                            <div className="flex flex-col gap-2">
                                <h3 className='font-bold underline leading-tight'>Your Rights</h3>
                                <div className="flex flex-col gap-2 text-xs">
                                    <span>
                                        You have the following rights with respect to your Personal Data:
                                    </span>
                                    <ul>
                                        <li>The right to access your Personal Data</li>
                                        <li>The right to rectify your Personal Data</li>
                                        <li>The right to erase your Personal Data</li>
                                        <li>The right to restrict processing of your Personal Data</li>
                                        <li>The right to object to processing of your Personal Data</li>
                                        <li>The right to data portability</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="mb-3 flex-row items-start">
                            {/* <span>7. </span> */}
                            <div className="flex flex-col gap-2">
                                <h3 className='font-bold underline leading-tight'>Changes to These Terms and Conditions</h3>
                                <span className='text-xs'>
                                    We may update these Terms and Conditions from time to time. If we
                                    make any changes, we will post the updated Terms and Conditions on
                                    our platform.</span>
                            </div>
                        </div>

                        <div className="mb-3 flex-row items-start">
                            {/* <span>8. </span> */}
                            <div className="flex flex-col gap-2">
                                <h3 className='font-bold underline leading-tight'>Governing Law and Jurisdiction</h3>
                                <span className='text-xs'>These Terms and Conditions shall be governed by and construed in accordance with the laws of Nigeria. Any disputes arising out of or in connection with these Terms and Conditions shall be subject to the exclusive jurisdiction of the courts of Nigeria.</span>
                            </div>
                        </div>

                        <div className="mb-3 flex-row items-start">
                            {/* <span>9. </span> */}
                            <div className="flex flex-col gap-2">
                                <h3 className='font-bold underline leading-tight'>Contact Us</h3>
                                <span className='text-xs'>If you have any questions about these Terms and Conditions, please contact us at [email protected]</span>
                            </div>

                        </div>
                        <div className="mb-3">
                            <h3 className='font-bold underline leading-tight'>10. Acceptance</h3>
                            <span className='text-xs'>By using our platform, you agree to be bound by these Terms and Conditions.</span>
                        </div>

                        <div className="mb-3">
                            <div className="flex gap-3">
                                <Field name="agreeToTerms" type="checkbox" onChange={handleChange} />
                                <span className='text-sm'> I {data.email} agree to the terms and conditions stated above</span>
                            </div>
                            {errors.agreeToTerms && errors.touvhed ? <span className='text-[0.7rem] text-red-600 font-semibold'>{errors.agreeToTerms}</span> : null}
                        </div>
                        <div className="flex w-full">

                            <button
                                type="submit"
                                className='font-buld capitalize bg-blue-500 text-white capitalize px-[0.5rem] py-[0.35rem] w-full mb-3 rounded-lg'>
                                I Agree to the Terms and Conditions listed above.
                            </button>
                        </div>

                    </div>
                </Form>
            )}
        </Formik>
    )
}