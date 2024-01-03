import React, { useContext, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { throwMessage } from "@/utils/utility";
import { useSelector } from "react-redux";
import Image from "next/image";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, doc, setDoc, updateDoc, onSnapshot, getDoc } from "firebase/firestore";
import { database, storage } from '@/firebaseConfig';
import { toast } from 'react-toastify';
import { DataContext } from "@/utils/Context";
import { getAuth, sendEmailVerification } from "firebase/auth";


const ChangeNinSlipPicture = () => {
    const { user, closeChangeNinSlipModalFn } = useContext(DataContext)
    const [newNinSlipPicture, setNewNinSlipPicture] = useState(null);
    const hasPermission = useSelector((state) => state.user.hasStorageAccessPermission);
    const [disableUploadBtn, setDisableUploadBtn] = useState(false)


    const auth = getAuth();

    // Get the currently signed-in user
    const userRrR = auth.currentUser;
    console.log("userRrR" + " " + JSON.stringify(userRrR, null, 2));
    // console.log("reduxStoreUserId" + " " + user.uid)

    async function uploadNewNinSlipAndGetDownloadURL(newNinSlipPictureURL) {
        const docRef = doc(database, "Users", user.uid);
        try {

            await updateDoc(docRef, { ninImage: newNinSlipPictureURL })
            toast.success('New image of NIN slip updated', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });
            setNewNinSlipPicture(null)
        } catch (error) {
            console.log(error.message)
        }
    }

    async function updateNinSlipPicture(userId, newNinSlipPicture) {
        try {
            const imagePath = `${userId}/ninImage`;
            const storageRef = ref(storage, imagePath);
            await uploadBytes(storageRef, newNinSlipPicture);
            const downloadURL = await getDownloadURL(storageRef);
            uploadNewNinSlipAndGetDownloadURL(downloadURL)
        } catch (error) {
            console.error("Error updating NIN picture:", error.message);
            throw error;
        }
    }

    async function uploadNewNinSlip() {
        setDisableUploadBtn(!disableUploadBtn)
        if (newNinSlipPicture === null) {
            // Handle the case where newProfilePicture is null
            return;
        }

        const downloadurl = await updateNinSlipPicture(user.uid, newNinSlipPicture);
        setDisableUploadBtn(!disableUploadBtn)
    }



    return (
        <div
            id="imageModal"
            className="flex flex-col justify-center items-center svh-minHeight  w-full   bg-[#00537788] border py-4 px-5 border-1 border-red-800 gap-10 z-20 pointer-events-auto absolute"
        >
            <div className="flex flex-col items-center gap-5 w-4/5 h-4/5 p-8 bg-white text-[#00537788] rounded-lg">
                <h1 className="text-4xl font-extrabold text-center">
                    Select another image of your NIN slip from your media files
                </h1>
                <input
                    type="file"
                    name="ninSlipPicture"
                    accept="image/*"
                    disabled={!hasPermission}
                    value={null}
                    onChange={(event) => {
                        console.table(event.currentTarget.files[0]);
                        setNewNinSlipPicture(event.currentTarget.files[0]);
                        // event.currentTarget.files[0].name = "newProfilePicture";
                        console.log(event.currentTarget.files[0])

                    }}
                    className="text-[#00537788] border-none"
                />
                <div className="border border-red-700 ">
                    {newNinSlipPicture !== null && (
                        <Image
                            src={URL.createObjectURL(newNinSlipPicture)}
                            alt="new image"
                            layout="fixed"
                            width={250}
                            height={250}
                        />
                    )}
                </div>
                <div className="flex flex-row gap-8">
                    <button
                        className="py-2 px-4 border border-[#00537788] rounded-md text-2xl fontbold destructiveAction"
                        aria-label="No Cancel"
                        onClick={() => closeChangeNinSlipModalFn()}
                    >
                        Cancel
                    </button>
                    {
                        !disableUploadBtn && (<button
                            className="py-2 px-4 border border-[#00537788] rounded-md text-2xl fontbold "
                            aria-label="Yes upload"
                            onClick={uploadNewNinSlip}
                            disabled={newNinSlipPicture == null ? true : false}
                        >
                            Upload
                        </button>)
                    }
                </div>
            </div>
        </div>
    );
};

export default ChangeNinSlipPicture;
