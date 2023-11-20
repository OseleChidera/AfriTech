"use client";
import React, { useState  } from "react";
import { ToastContainer, toast } from "react-toastify";
import FogortpasswordEmail from "../../components/auth/FogortpasswordEmail";
import { throwMessage } from "@/utils/utility";
import SigninMain from "../../components/auth/SigninMain";
import Step2 from "../../components/Step2";
import Step3 from "../../components/Step3";
import Step4 from "../../components/Step4";
import { doc, updateDoc } from "firebase/firestore";
import { database, storage } from '@/firebase/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { useSelector, useDispatch } from "react-redux";
import { incrementSignin, decrementSignin, incrementSigninByAmmount } from "../../redux/user"

const SigninPage = (user) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  const pageindex = useSelector((state) => state.user.signinIndex);
  const userId = useSelector((state) => state.user.value);
  const userFormEntries = useSelector((state) => state.user.userFormEntries);
  const dispatch = useDispatch();
  const [data, setData] = useState(userFormEntries)

  const steps = [
    <SigninMain
      nextStep={handleNextStep}
      prevStep={handlePrevStep}
      isDisabled={isDisabled}
      setIsDisabled={setIsDisabled}
      user={user}
    />,
    <FogortpasswordEmail
      nextStep={handleNextStep}
      prevStep={handlePrevStep}
      currentIndex={pageindex}
      setCurrentIndex={setCurrentIndex}
      isDisabled={isDisabled}
      setIsDisabled={setIsDisabled}
      user={user}
    />,
    <Step2 data={data}  next={handleNextStep} prev={handlePrevStep} />,
    <Step3 data={data}  next={handleNextStep} prev={handlePrevStep} />,
    <Step4 data={data} next={handleNextStep} prev={handlePrevStep} userid={userId} />

  ];

  function handleNextStep(newData, final = false) {
    setData(prev => ({ ...prev, ...newData }))
    if (final) {
      console.log('fetchhhhhhhhh')
      ApiReq(newData)
      return;
    }
    dispatch(incrementSignin(final))
  }

  function handlePrevStep(newData) {
    setData(prev => ({ ...prev, ...newData }))
    dispatch(decrementSignin())
  }

  //upload the images from the form to a storage bucket  and get a urn to access said images
  async function uploadImage(image) {
    try {
      const imagePath = `${userId}/${image.name}`
      const storageRef = ref(storage, imagePath);
      await uploadBytes(storageRef, image);
      return getDownloadURL(storageRef);
    } catch (error) {
      console.log('image couldnt upload')
      throwMessage('image couldnt upload')
    }
  }
 

  //Onsubmit function of the multistep form
  async function ApiReq(newData) {
    console.log('API REQUEST', userId, newData, newData.agreeToTerms)
    const docRef = doc(database, "Users", userId);
    if (newData.agreeToTerms) {
      try {
        const [image1Url, image2Url] = await Promise.all([
          uploadImage(newData.image),
          uploadImage(newData.image2),
        ])
        newData.image = image1Url
        newData.image2 = image2Url
        //update the created firestore documeent with the user email
        updateDoc(docRef, newData)
        //prompt the user
        toast.success('User SignUp complete', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
          onOpen: () => {
            console.log('Toast opened redirecting to home page');
            // Perform actions after toast is displayed
            window.location.href = "/home";
            console.log(userFormEntries , userId)
          },
        });
      } catch (error) { console.log(error.message, error) }


    }
  }

  return (
    <div className="flex min-h-screen max-h-fit h-full w-full flex-col items-center justify-center bg-[#005377] border">
      {steps[pageindex]}
    </div>
  )
};

export default SigninPage
