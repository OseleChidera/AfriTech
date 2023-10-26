'use client'
import React, { useState, useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { auth } from '@/firebase/firebaseConfig'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { collection, addDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { database, storage } from '@/firebase/firebaseConfig';
import { MyContext } from '@/utils/Datacontext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Step1 from '../../components/Step1';
import Step2 from '../../components/Step2';
import Step3 from '../../components/Step3';
import Step4 from '../../components/Step4';



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
        <div className="flex min-h-screen max-h-fit h-full w-full flex-col items-center justify-center bg-[#005377] border">
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










