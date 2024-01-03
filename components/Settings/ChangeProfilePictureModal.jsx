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


const ChangeProfilePictureModal = () => {
  const {closeProfilePictureUpdateModalFn,user } = useContext(DataContext)
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const hasPermission = useSelector((state) => state.user.hasStorageAccessPermission);
  const [disableUploadBtn , setDisableUploadBtn] = useState(false)

  const auth = getAuth();

  // Get the currently signed-in user
  const userRrR = auth.currentUser;
  console.log("userRrR" + " " + JSON.stringify(userRrR , null, 2));
  console.log("reduxStoreUserId" + " " + user.uid)

  async function uploadNewProfilePictureAndGetDownloadURL(newProfilePictureURL) {
      const docRef = doc(database, "Users", user.uid);
      try {
        
        await updateDoc(docRef, { profilePicture: newProfilePictureURL })
        closeProfilePictureUpdateModalFn()
        toast.success('New profile picture updated', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
        setNewProfilePicture(null)
      } catch (error) {
        console.log(error.message)
      }
  }

  async function updateProfilePicture(userId, newProfilePicture) {
    try {
      const imagePath = `${userId}/profilePicture`;
      const storageRef = ref(storage, imagePath);
      await uploadBytes(storageRef, newProfilePicture);
      const downloadURL = await getDownloadURL(storageRef);
      uploadNewProfilePictureAndGetDownloadURL(downloadURL)
    } catch (error) {
      console.error("Error updating profile picture:", error.message);
      throw error;
    }
  }

  async function uploadProfilePicture() {
    setDisableUploadBtn(!disableUploadBtn)
    if (newProfilePicture === null) {
      // Handle the case where newProfilePicture is null
      return;
    }

   const downloadurl = await updateProfilePicture(user.uid, newProfilePicture);
    setDisableUploadBtn(!disableUploadBtn)
  }


 
  return (
    <div
      id="imageModal"
      className="flex flex-col justify-center items-center svh-minHeight  w-full   bg-[#00537788] border py-4 px-5 border-1 border-red-800 gap-10 z-20 pointer-events-auto absolute"
    >
      <div className="flex flex-col items-center gap-5 w-4/5 max-w-[90%] mx-auto h-4/5 max-h-fit p-8 bg-white text-[#00537788] rounded-lg">
        <h1 className="text-2xl font-extrabold text-center md:text-4xl">
          Select another image from your media files
        </h1>
        <input
        
          type="file"
          name="ninSlipPicture"
          accept="image/*"
          disabled={!hasPermission}
          value={null}
          onChange={(event) => {
            console.table(event.currentTarget.files[0]);
            setNewProfilePicture(event.currentTarget.files[0]);
            // event.currentTarget.files[0].name = "newProfilePicture";
            console.log(event.currentTarget.files[0])

          }}
          className="text-[#00537788] border-none"
        />
        <div className="border border-red-700 ">
          {newProfilePicture !== null && (
            <Image
              src={URL.createObjectURL(newProfilePicture)}
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
            onClick={() => closeProfilePictureUpdateModalFn()}
          >
            Cancel
          </button>
          {
            !disableUploadBtn && (<button
              className="py-2 px-4 border border-[#00537788] rounded-md text-2xl fontbold "
              aria-label="Yes upload"
              onClick={uploadProfilePicture}
              disabled={newProfilePicture == null ? true : false}
            >
              Upload
            </button>)
          }
        </div>
      </div>
    </div>
  );
};

export default ChangeProfilePictureModal;
