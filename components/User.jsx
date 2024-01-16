import Image from 'next/image'
import React, { useState,useEffect, useContext } from 'react'
import { DataContext } from '@/utils/Context'
import photo1 from '../public/images/photo1.jpeg'
import arrowRight from "../public/icons/arrow-right.svg"

import { useSelector, useDispatch } from "react-redux";
import { fetchDataByUserId } from '@/redux/user'
// import { userData } from '@/redux/userData'
import ImageModal from './ImageModal'
import { collection, addDoc, doc, setDoc, updateDoc, onSnapshot, getDoc } from "firebase/firestore";
import { database } from '@/firebaseConfig'
import SettingOptions from './Settings/SettingOption';
import UserDetailsSetting from './Settings/UserDetailsSetting';
import FeedbackForm from './Settings/FeedbackForm';
import { setupAuthObserver } from "@/firebaseAuth";





const User = () => {
  const { showImageModal, showLogoutModalFn, showResetPasswordModalFn, setShowUpdateProfilePictureModal, showUpdateProfilePictureModal,user,  } = useContext(DataContext)

  const [settingIndex , setSettingIndex] = useState(0)
  const userFormEntries = useSelector((state) => state.user.userFormEntries);
  const reduxStoreUserId = useSelector((state) => state.user.value);

  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const settingsOptionToDisplay = [<SettingOptions setSettingIndex={setSettingIndex} showLogoutModalFn={showLogoutModalFn} showResetPasswordModalFn={showResetPasswordModalFn}/>, 
    <UserDetailsSetting setSettingIndex={setSettingIndex} />, <FeedbackForm setSettingIndex={setSettingIndex} setShowUpdateProfilePictureModal={setShowUpdateProfilePictureModal} showUpdateProfilePictureModal={showUpdateProfilePictureModal} />]

  const [selectedComponent, setSelectedComponent] = useState(null);



  return (
      <div className='w-full h-full flex flex-col text-[#005377]  bg-white rounded-lg p-3 pt-5 relative border border-red-700 break-normal overflow-y-auto'>
      
      <div id="main-user" className='flex  border border-gray-700 items-center gap-5 mb-5 sticky top-0 cursor-pointer' onClick={()=>{
        if (settingIndex !== 0) {
          return;
        }
        setSettingIndex(1)
      }}>
        {settingIndex !== 0 && (<div id="left" className='w-fit' onClick={() => setSettingIndex(0)}>
         <Image src={arrowRight} alt='user-photo' width={45} className='aspect-square rotate-180' />
        </div>)}
        <div  className='w-[100px] border border-black' onClick={showImageModal}>
          <Image src={`${userData.profilePicture.stringValue}`} alt='user-photo' width={100} height={100} className=' '  loading="lazy"  />
        </div>
              <div id="right" className='flex-1'>
          <h2 className='font-extrabold text-xl capitalize'>
            {`${userData.lastname.stringValue} ${userData.firstname.stringValue}`}
          </h2>
          <span className='flex gap-1 items-end'>
          <span className='text-sm font-normal'>{userData.email.stringValue}</span>
          {
            user.emailVerified ? (<span className='text-[#005377] underline underline-offset-1 text-[9px]'>True</span>) : (<span className='text-red-700 underline underline-offset-1 text-[9px]'>False</span>)
          }
          </span>
        
          
          <p className='text-[9px] underline underline-offset-1 font-light'>{user.uid}</p>
              </div>
              <div id="left" className='w-fit'>
          {settingIndex == 0 &&  (<Image src={arrowRight} alt='user-photo' width={45} className='aspect-square' />)}
              </div>
        </div>



          <div id="setting-options" className='flex flex-col gap-8 overflow-y-scroll hide-scrollbar'>
           {
            settingsOptionToDisplay[settingIndex]
           }
        </div>

    </div>
  )
}

export default User

