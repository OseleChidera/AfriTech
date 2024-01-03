import React, { useContext, useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import { throwMessage } from "@/utils/utility";
import { useSelector } from "react-redux";
import Image from "next/image";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, doc, setDoc, updateDoc, onSnapshot, getDoc } from "firebase/firestore";
import { database, storage } from '@/firebaseConfig';
import { toast } from 'react-toastify';
import { DataContext } from "@/utils/Context";
import { auth, firestore } from '@/firebaseConfig'
import { getAuth, updateEmail,  sendEmailVerification } from "firebase/auth";
import { setupAuthObserver } from "@/firebaseAuth";
import firebase from 'firebase/app';


const ChangeCurrentUserEmail = () => {
    const {closeChangeEmailModalFn } = useContext(DataContext)
    const [newEmail, setNewEmail] = useState('');
    const hasPermission = useSelector((state) => state.user.hasStorageAccessPermission);
    const reduxStoreUserId = useSelector((state) => state.user.value);
    const [disableUploadBtn, setDisableUploadBtn] = useState(false)

    // const auth = getAuth();

    async function changeUserEmail(userId, newEmail) {
        const userDocRef = doc(database, "Users", `${userId}`);
        console.log(userId,newEmail,auth.currentUser.emailVerified)
        try {
            // Check if the new email is verified
            if (!auth.currentUser.emailVerified) {
                throw new Error('New email is not verified.');
            }

            // Update the email in Firebase Authentication
            await updateEmail(auth.currentUser, newEmail);

            // Update the email in Firestore
            await updateDoc(userDocRef, { email: newEmail });

            toast.success('Email updated successfully.', {
                position: 'top-right',
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: 'colored',
                onOpen: () => { closeChangeEmailModalFn(); },
            });
             await sendEmailVerification(auth.currentUser);
            await auth.signOut();
            window.location.href = "/signin";
            localStorage.removeItem('afriTechUserID')
            throwMessage("logout successful")
        } catch (error) {
            console.log(error, error.message, error.code);
            await auth.signOut();
            window.location.href = "/signin";
            localStorage.removeItem('afriTechUserID')
                toast.info('An email containing a verification lnk was sent to your email. Verify and signin again.', {
                    position: 'top-right',
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: 'colored',
                });
            await sendEmailVerification(auth.currentUser);
        
        }
    }




    useEffect(() => {
        const authCallback = (user) => {
            if (user) {
                console.log('User is authenticated ChangeCurrentUserEmail:', user);
                
                // Perform actions for authenticated user
            } else {
                console.log('User is not authenticated ChangeCurrentUserEmail.');
                // Perform actions for unauthenticated user
            }
        };

        // Set up the auth observer
        setupAuthObserver(authCallback);

        // Clean up the observer on component unmount
        return () => {
            // Clean up the observer when the component is unmounted
            // This is important to avoid memory leaks
            // You might want to store the observer cleanup function in a state variable
            // and call it when the component is unmounted
        };
    }, []);

    const emailModalValidationSchema = Yup.object().shape({
        newEmail: Yup.string()
        .email("Invalid email address")
        .required("Required"),
    });

    return (
        <Formik
            initialValues={{email : ""}}
            validationSchema={emailModalValidationSchema}
            // async onSubmit={() => changeUserEmail(reduxStoreUserId, newEmail)}
        >
            {({ errors, touched }) => (
            <div id="modal"
                className="flex flex-col justify-center items-center svh-minHeight  w-full   bg-[#00537788] border py-4 px-5 border-1 border-red-800 gap-10 z-20 pointer-events-auto absolute">
            <div className="flex flex-col items-center gap-5 w-4/5 h-4/5 p-8 bg-white text-[#00537788] rounded-lg">
                <h1 className="text-4xl font-extrabold text-center">
                    Enter your new email.
                </h1>
                <Field
                    type="email"
                    name="newEmail"
                    disabled={!hasPermission}
                    value={newEmail}
                    placeholder="Enter new email"
                    onChange={(event) => {setNewEmail(event.target.value)}}
                    className="text-[#00537788] p-1 w-md indent-1"
                />
                    {errors.newEmail && touched.newEmail ? (
                        <div className='text-[0.7rem] text-red-600 font-semibold'>{errors.newEmail}</div>
                    ) : null}
                <div className="flex flex-row gap-8">
                    <button
                        className="py-2 px-4 border border-[#00537788] rounded-md text-xl fontbold destructiveAction"
                        aria-label="No Cancel"
                        onClick={() => closeChangeEmailModalFn()}
                    >
                        Cancel
                    </button>
                    {
                            newEmail !== '' && (<button
                            className="py-2 px-4 border border-[#00537788] rounded-md text-xl fontbold "
                            type="submit"
                            aria-label="Yes upload"
                            onClick={() => changeUserEmail(auth.currentUser.uid, newEmail)}
                            disabled={newEmail == "" ? true : false}>
                            Change
                        </button>)
                    }
                </div>
            </div>
            </div>
            )}
        </Formik>
    );
};

export default ChangeCurrentUserEmail;
