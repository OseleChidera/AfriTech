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


const ShowChosenImageModal = ({}) => {
    const { showProductImageModal } = useContext(DataContext)
    console.log("showProductImageModal" + showProductImageModal)
    // const [newProfilePicture, setNewProfilePicture] = useState(null);
    // const hasPermission = useSelector((state) => state.user.hasStorageAccessPermission);
    // const [disableUploadBtn, setDisableUploadBtn] = useState(false)

    const auth = getAuth();

    // Get the currently signed-in user
    // const userRrR = auth.currentUser;
    // console.log("userRrR" + " " + JSON.stringify(userRrR, null, 2));
    // console.log("reduxStoreUserId" + " " + user.uid)
return (
        <div
            id="imageModal"
            className="flex flex-col justify-center items-center svh-minHeight  w-full   bg-[#00537788] border py-4 px-5 border-1 border-red-800 gap-10 z-20 pointer-events-auto absolute"
        >
            <div className="flex flex-col items-center gap-5 w-4/5 max-w-[90%] mx-auto h-4/5 max-h-fit p-8 bg-white text-[#00537788] rounded-lg">
                <h1 className="text-2xl font-extrabold text-center md:text-4xl">
                    Select another image from your media files
                </h1>
            
                <div className="border border-red-700 ">
                   
                        {/* <Image
                            // src={URL.createObjectURL(newProfilePicture)}
                            alt="new image"
                            layout="fixed"
                            width={250}
                            height={250}
                        /> */}
                    
                </div>
                <div className="flex flex-row gap-8">
                    <button
                        className="py-2 px-4 border border-[#00537788] rounded-md text-2xl fontbold destructiveAction"
                        aria-label="No Cancel"
                        onClick={() => closeProfilePictureUpdateModalFn()}
                    >
                        close
                    </button>
                    
                </div>
            </div>
        </div>
    );
};

export default ShowChosenImageModal;
