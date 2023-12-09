

'use client'
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
// import homeIcon from "../../../public/icons/home-inactive.svg";
// import homeIconAvtive from "../../../public/icons/home-05-active.svg";
// import storeIcon from "../../../public/icons/store-inactive.svg";
// import storeIconActive from "../../../public/icons/store-active.svg";
// import userIcon from "../../../public/icons/user-inactive.svg";
// import userIconActive from "../../../public/icons/user-active.svg";
// import clipboardIcon from "../../../public/icons/clipboard-inactive.svg";
// import clipboardIconActive from "../../../public/icons/clipboard-active.svg";
import User from "@/components/User";
import MainHome from "@/components/MainHome";
import Marketplace from "@/components/Marketplace";
import BankList from "@/components/BankList";
// import { gsap, Power3 } from 'gsap';
import { array } from "yup";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "@/redux/user";
import HomeNav from "@/components/HomeNav";
import axios from 'axios';
import ImageModal from "@/components/ImageModal";
import useSWR from 'swr';


const page = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.value);
  const homePageNavIndex = useSelector((state) => state.user.homePageNavIndex);
  const userObject = useSelector((state) => state.user.userData);
  let mobileNav = useRef(null)
  let pages = useRef(null)
  let mainHomeRef = useRef(null)
  let marketplaceRef = useRef(null)
  let bankListRef = useRef(null)
  let userRef = useRef(null)
  
  
  
  
  const [fetchedData, setFetchedData] = useState(null)
async function getUserData(){
  const storedUserData = localStorage.getItem('afriTechUserID');
  const data = storedUserData ? JSON.parse(storedUserData) : null
  console.log(data)

  try {
    const response = await axios.get(`https://firestore.googleapis.com/v1/projects/afritech-b3227/databases/(default)/documents/Users/${data.userID}`);
    setFetchedData(response)
    console.log("response.data.fields" + JSON.stringify(response.data.fields, null, 2))
    dispatch(setUserData(response.data.fields))
    console.log("use selectorrrrrrrrrrrrrrrrrrrrrrrr" + useSelector((state) => state.user.userData))
    // console.log("axios fetch : " + JSON.stringify(userObject, null, 2) );
  } catch (error) {
    console.error('Error fetching data:', error);
  }

}




  // {
  //   "agreeToTerms": {
  //     "booleanValue": true
  //   },
  //   "genderOptions": {
  //     "stringValue": "male"
  //   },
  //   "bvnnumber": {
  //     "stringValue": "n111111111"
  //   },
  //   "password": {
  //     "nullValue": null
  //   },
  //   "lastName": {
  //     "stringValue": ""
  //   },
  //   "lastname": {
  //     "stringValue": "osele"
  //   },
  //   "confirm_password": {
  //     "nullValue": null
  //   },
  //   "Phone": {
  //     "stringValue": "07957640902"
  //   },
  //   "Username": {
  //     "stringValue": "ddddddddd"
  //   },
  //   "dateOfBirth": {
  //     "integerValue": "1025823600000"
  //   },
  //   "ninnumber": {
  //     "integerValue": "111111"
  //   },
  //   "firstname": {
  //     "stringValue": "chidera"
  //   },
  //   "profilePicture": {
  //     "stringValue": "https://firebasestorage.googleapis.com/v0/b/afritech-b3227.appspot.com/o/6QILI9x54HPQ740pJLrltneZ5Is1%2FScreenshot%20(265).png?alt=media&token=3a4c7a4a-c38a-495b-95a4-bc5f05e24a61"
  //   },
  //   "address": {
  //     "stringValue": "Chancellor Pl, London NW9 5JB"
  //   },
  //   "email": {
  //     "stringValue": "2e3rwedeera590@gmail.com"
  //   },
  //   "sectorOption": {
  //     "stringValue": "Business"
  //   },
  //   "image2": {
  //     "stringValue": "https://firebasestorage.googleapis.com/v0/b/afritech-b3227.appspot.com/o/6QILI9x54HPQ740pJLrltneZ5Is1%2FGantt%20chart.png?alt=media&token=eb6d724e-3c47-49f4-8634-889d7b0f6642"
  //   },
  //   "firstName": {
  //     "stringValue": ""
  //   }
  // }
  useEffect(()=>{
 getUserData()
  },[])

  const list = [< MainHome className="MainHome" ref={el => (mainHomeRef = el)} />, < Marketplace className="Marketplace" ref={el => (marketplaceRef = el)} />, < BankList className="BankList" ref={el => (bankListRef = el)} />, < User className="User" ref={el => (userRef = el)} showImageModal={showImageModal}/>]
  const [showModal, setShowModal] = useState(false)
  function showImageModal() {
    setShowModal(!showModal)
  }
  function closeImageModal() {
    setShowModal(!showModal)
  }
  return (
      <>
      {showModal && <ImageModal url={`${userObject.profilePicture.stringValue}`} closeImageModal={closeImageModal}/>}
      <div className="flex svh-minHeight  w-full flex-col items-center justify-center bg-[#005377] border py-4 px-5 border-1 border-red-800 gap-10">
        {/* <div id="mobile-container" className="flex flex-col w-full svh-minHeight border-1 border-red-800 gap-3"> */}
        <div id="display" className="w-full h-[75vh] flex rounded-2xl bg-red-700  relative  border border-red-700">
          {
            list[homePageNavIndex]
          }
        </div>
        <HomeNav pageIndex={homePageNavIndex} />
      </div>
      </>
    // </div>
  )
};

export default page;

