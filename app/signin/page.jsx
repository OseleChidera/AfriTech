"use client";
import React, { useState, useEffect} from "react";
import FogortpasswordEmail from "../../components/auth/FogortpasswordEmail";
import { ToastContainer, toast } from "react-toastify";
import { throwMessage } from "@/utils/utility";
import SigninMain from "../../components/auth/SigninMain";
import Step2 from "../../components/Step2";
import Step3 from "../../components/Step3";
import Step4 from "../../components/Step4";
import { doc, updateDoc } from "firebase/firestore";
import { database, storage } from '@/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useSelector, useDispatch } from "react-redux";
import { incrementSignin, decrementSignin, incrementSigninByAmmount, setCurrentUserData } from "../../redux/user"
import { onAuthStateChanged } from 'firebase/auth';
import { setupAuthObserver } from "@/firebaseAuth";


const SigninPage = ({user}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  const pageindex = useSelector((state) => state.user.signinIndex);
  const [userid , setUserId] =  useState(undefined)
  const localUserID = localStorage.getItem('afriTechUserID')
  const userIdFromLocalStorage = localUserID ? JSON.parse(localUserID): null;


  const userFormEntries = useSelector((state) => state.user.userFormEntries);
  // const currentUserData = useSelector((state) => state.user.currentUserData);
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
    <Step4 data={data} next={handleNextStep} prev={handlePrevStep} />

  ];

  useEffect(() => {
    const authCallback = (user) => {
      if (user) {
        console.log('User is authenticated:', user);
        // Perform actions for authenticated user
      } else {
        console.log('User is not authenticated.');
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



  //Onsubmit function of the multistep form
  async function SignumMultistepApiReq(newData) {
    const docRef = doc(database, "Users", userIdFromLocalStorage);
    console.log(JSON.stringify(docRef , null , 2))
    if (newData.agreeToTerms) {
      try {
        const [image1Url, image2Url] = await Promise.all([uploadProfilePicture(newData.profilePicture), uploadNinImage(newData.ninSlipPicture)])
        newData.profilePicture = image1Url,
          newData.ninSlipPicture = image2Url
        updateDoc(docRef, newData)
        toast.success(`User SignUp complete ${userIdFromLocalStorage}`, {
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
            console.log(userFormEntries, userIdFromLocalStorage)
          },
        });
        
      } catch (error) {
        console.log(error.message)
      }


    }
  }


  function handleNextStep(newData, final = false) {
    setData(prev => ({ ...prev, ...newData }))
    if (final) {
      SignumMultistepApiReq(newData)
      return;
    }
    dispatch(incrementSignin(final))
  }

  function handlePrevStep(newData) {
    setData(prev => ({ ...prev, ...newData }))
    dispatch(decrementSignin())
  }

  //upload the images from the form to a storage bucket  and get a urn to access said images
  async function uploadNinImage(image) {
    try {
      const imagePath = `${userIdFromLocalStorage}/ninImage`
      console.log(imagePath)
      const storageRef = ref(storage, imagePath);
      await uploadBytes(storageRef, image);
      return getDownloadURL(storageRef);
    } catch (error) {
      console.log(error.message)
      throwMessage('ninImage image couldnt upload')
    }
  }

  async function uploadProfilePicture(image) {
    try {
      const imagePath = `${userIdFromLocalStorage}/profilePicture`
      console.log(imagePath)
      const storageRef = ref(storage, imagePath);
      await uploadBytes(storageRef, image);
      return getDownloadURL(storageRef);
    } catch (error) {
      console.log(error.message)
      throwMessage('profilePicture image couldnt upload')
    }
  }
  


  return (
    <div className="flex min-h-screen max-h-fit h-full w-full flex-col items-center justify-center bg-[#005377] border">
      {steps[pageindex]}
    </div>
  )
};

export default SigninPage






