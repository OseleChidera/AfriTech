

'use client'
import Image from "next/image";
import React, { useEffect, useRef, useState , createContext , useContext } from "react";
import User from "@/components/User";
import MainHome from "@/components/MainHome";
import Marketplace from "@/components/Marketplace";
import BankList from "@/components/BankList";
// import { gsap, Power3 } from 'gsap';
import { array } from "yup";
import { useSelector, useDispatch } from "react-redux";
import { setUserData, setUserIdData } from "@/redux/user";
import HomeNav from "@/components/HomeNav";
import axios from 'axios';
import ImageModal from "@/components/ImageModal";
import useSWR from 'swr';
import GoToSignIn from "../goToSignIn/Page";
import { checkIfEmailVerified } from "@/utils/emailVerificationUtil";
import { Auth } from "@/firebaseConfig";
import LogoutModal from "@/components/Settings/LogoutModal";
import ChangePasswordModal from "@/components/Settings/ChangePasswordModal";
import ChangeProfilePictureModal from "@/components/Settings/ChangeProfilePictureModal";
import { DataContext } from "@/utils/Context";
import ChangeCurrentUserEmail from "@/components/Settings/ChangeCurrentUserEmail";
import { auth, firestore } from '@/firebaseConfig'
import { setupAuthObserver } from "@/firebaseAuth";
import ChangeNinSlipPicture from "@/components/Settings/changeNinSlipPicture";


const page = () => {
  const dispatch = useDispatch();
  // const MyContext = createContext();
  const homePageNavIndex = useSelector((state) => state.user.homePageNavIndex);
  const userObject = useSelector((state) => state.user.userData);
  const currentUserData = useSelector((state) => state.user.currentUserData);
  const reduxStoreUserId = useSelector((state) => state.user.value);
  const [user, setUser] = useState(null)
  // let mobileNav = useRef(null)
  // let pages = useRef(null)
  let mainHomeRef = useRef(null)
  let marketplaceRef = useRef(null)
  let bankListRef = useRef(null)
  let userRef = useRef(null)
  const [showModal, setShowModal] = useState(false)
  function showImageModal() {
    setShowModal(!showModal)
  }
  function closeImageModal() {
    setShowModal(!showModal)
  }

  
  
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false)
  const [showUpdateProfilePictureModal, setShowUpdateProfilePictureModal] = useState(false)
  const [showUpdateNinSlipPictureModal, setUpdateNinSlipPictureModal] = useState(false)
  const [showChangeCurrentUserEmailModal, setShowChangeCurrentUserEmailModal] = useState(false)
  function showLogoutModalFn() {
    setShowLogoutModal(!showLogoutModal)
  }
  function closeLogoutModal() {
    setShowLogoutModal(!showLogoutModal)
  }
  function showResetPasswordModalFn() {
    setShowResetPasswordModal(!showResetPasswordModal)
  }
  function closeResetPasswordModal() {
    setShowResetPasswordModal(!showResetPasswordModal)
  }
  function showProfilePictureUpdateModalFn() {
    setShowUpdateProfilePictureModal(!showUpdateProfilePictureModal)
  }
  function closeProfilePictureUpdateModalFn() {
    setShowUpdateProfilePictureModal(!showUpdateProfilePictureModal)
  }
  function showChangeEmailModalFn() {
    setShowChangeCurrentUserEmailModal(!showChangeCurrentUserEmailModal)
  }
  function closeChangeEmailModalFn() {
    setShowChangeCurrentUserEmailModal(!showChangeCurrentUserEmailModal)
  }
  function showChangeNinSlipModalFn() {
    setUpdateNinSlipPictureModal(!showUpdateNinSlipPictureModal)
  }
  function closeChangeNinSlipModalFn() {
    setUpdateNinSlipPictureModal(!showUpdateNinSlipPictureModal)
  }
  const userIdFromLocalStorage = localStorage.getItem('afriTechUserID') ? JSON.parse(localStorage.getItem('afriTechUserID')) : null;

  async function getUserData() {
    try {
      const response = await axios.get(`https://firestore.googleapis.com/v1/projects/afritech-b3227/databases/(default)/documents/Users/${userIdFromLocalStorage}`);
      console.log(response.data.fields)
      dispatch(setUserData(response.data.fields))
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  }
  const list = [
  < MainHome className="MainHome" ref={el => (mainHomeRef = el)} />, 
  < Marketplace className="Marketplace" ref={el => (marketplaceRef = el)} />, 
  < BankList className="BankList" ref={el => (bankListRef = el)} />, 
  < User className="User" ref={el => (userRef = el)} />
]
useEffect(() => {
  getUserData()
  const revalidationInterval = setInterval(() => {
    getUserData();
  }, 60000);
  
  return () => clearInterval(revalidationInterval);
}, [])
  useEffect(() => {
    const authCallback = (user) => {
      if (user) {
        console.log('User is authenticated from HOME:', user);
        setUser(user)
        // Perform actions for authenticated user
      } else {
        console.log('User is not authenticated from HOME.');
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

  return (
    <DataContext.Provider value={{ showImageModal, showLogoutModalFn, showResetPasswordModalFn, setShowUpdateProfilePictureModal, showProfilePictureUpdateModalFn, closeProfilePictureUpdateModalFn, reduxStoreUserId, showChangeEmailModalFn, closeChangeEmailModalFn, user, userObject, closeChangeEmailModalFn, showChangeNinSlipModalFn, closeChangeNinSlipModalFn }} >

          <>
        {showModal && <ImageModal url={`${userObject.profilePicture.stringValue}`} closeImageModal={closeImageModal} />}
        {showLogoutModal && <LogoutModal closeLogoutModal={closeLogoutModal} />}
        {showResetPasswordModal && <ChangePasswordModal closeResetPasswordModal={closeResetPasswordModal} />}
        {showUpdateProfilePictureModal && <ChangeProfilePictureModal/>}
        {showUpdateNinSlipPictureModal && <ChangeNinSlipPicture/>}
        {showChangeCurrentUserEmailModal && <ChangeCurrentUserEmail />}
            <div className="flex svh-minHeight  w-full flex-col items-center justify-center bg-[#005377] border py-4 px-5 border-1 border-red-800 gap-10">
              <div id="display" className="w-full h-[75vh] flex rounded-2xl bg-red-700  relative  border border-red-700">
                {
                  list[homePageNavIndex]
                }
              </div>
              <HomeNav pageIndex={homePageNavIndex} />
            </div>
          </>
    </DataContext.Provider>
  )
};

export default page;

