import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import { throwMessage } from "@/utils/utility";
import { useSelector } from "react-redux";
import Image from "next/image";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, doc, setDoc, updateDoc, onSnapshot, getDoc } from "firebase/firestore";
import { database, storage } from '@/firebase/firebaseConfig';
import { toast } from 'react-toastify';
import { DataContext } from "@/utils/Context";
import { auth, firestore } from '@/firebase/firebaseConfig'
import { getAuth, updateEmail,  sendEmailVerification } from "firebase/auth";


const ChangeCurrentUserEmail = () => {
    const {closeChangeEmailModalFn } = useContext(DataContext)
    const [newEmail, setNewEmail] = useState('');
    const hasPermission = useSelector((state) => state.user.hasStorageAccessPermission);
    const reduxStoreUserId = useSelector((state) => state.user.value);
    const [disableUploadBtn, setDisableUploadBtn] = useState(false)




    async function changeUserEmail(userId, newEmail) {
        // Update email in Firebase Authentication
        // console.log(JSON.stringify(auth.currentUser,null , 2))
        try {
            await updateEmail(auth.currentUser, newEmail);
            toast.success('Email updated successfully in Firebase Authentication', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
                onOpen: () => { closeChangeEmailModalFn() }
            });
        } catch (error) {
            throwMessage('Error updating email. Ensure email has been verified and retry.')
            if (error.code == "auth/operation-not-allowed" || error.code == "auth/operation-not-allowed") {
                try {
                    await sendEmailVerification(auth.currentUser);
                    toast.success('Verification email sent successfully!. Check your inbox', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                        theme: "colored",
                        onOpen: () => {closeChangeEmailModalFn() }
                    });
                } catch (error) {
                    console.error("Error sending verification email:", error);
                }
            }
            console.log(error)
        }

        // Update email in Firestore document
        const userDocRef = doc(database, "Users", `${userId}`);

        try {
            await updateDoc(userDocRef, { email: newEmail });
            console.log('Email updated successfully in Firestore document');
        } catch (error) {
            throwMessage('Error updating email in Firestore document:', error.message)

            // If updating email in Firestore fails, you may want to roll back the email update in Firebase Authentication.
            // Handle this based on your use case.
            throw error;
        }
    }



    const emailModalValidationSchema = Yup.object().shape({
        newEmail: Yup.string()
        .email("Invalid email address")
        .required("Required"),
    });

    return (
        <Formik
            initialValues={{email : ""}}
            validationSchema={emailModalValidationSchema}
            async onSubmit={changeUserEmail}
            
        >
            {({ errors, touched }) => (
            <div id="modal"
                className="flex flex-col justify-center items-center svh-minHeight  w-full   bg-[#00537788] border py-4 px-5 border-1 border-red-800 gap-10 z-20 pointer-events-auto absolute">
            <Form className="flex flex-col items-center gap-5 w-4/5 h-4/5 p-8 bg-white text-[#00537788] rounded-lg">
                <h1 className="text-4xl font-extrabold text-center">
                    Enter your new email.
                </h1>
                <Field
                    type="email"
                    name="newEmail"
                    disabled={!hasPermission}
                    value={newEmail}
                    onChange={(event) => {
                        setNewEmail(event.target.value);
                        console.log("newEmail" + " " + newEmail)
                        console.log(reduxStoreUserId)

                    }}
                    className="text-[#00537788] p-1 w-md indent-1"
                />
                    {errors.newEmail && touched.newEmail ? (
                        <div className='text-[0.7rem] text-red-600 font-semibold'>{errors.newEmail}</div>
                    ) : null}
                <div className="flex flex-row gap-8">
                    <button
                        className="py-2 px-8 border border-[#00537788] rounded-md text-2xl fontbold destructiveAction"
                        aria-label="No Cancel"
                        onClick={() => closeChangeEmailModalFn()}
                    >
                        Cancel
                    </button>
                    {
                        !disableUploadBtn && (<button
                            className="py-2 px-8 border border-[#00537788] rounded-md text-2xl fontbold "
                            type="submit"
                            aria-label="Yes upload"
                            onClick={() => changeUserEmail(reduxStoreUserId, newEmail)}
                            disabled={newEmail == "" ? true : false}
                            
                        >
                            Upload
                        </button>)
                    }
                </div>
            </Form>
            </div>
            )}
        </Formik>
    );
};

export default ChangeCurrentUserEmail;
