import Image from 'next/image'
import React, { useState,useEffect } from 'react'
import photo1 from '../public/images/photo1.jpeg'
import arrowRight from "../public/icons/arrow-right.svg"

import { useSelector, useDispatch } from "react-redux";
import { fetchDataByUserId } from '@/redux/user'
import { userData } from '@/redux/userData'
import ImageModal from './ImageModal'
import { collection, addDoc, doc, setDoc, updateDoc, onSnapshot, getDoc } from "firebase/firestore";
import { database } from '@/firebase/firebaseConfig'
import SettingOption from './Settings/SettingOption';
import UserProfileSetting from './Settings/UserProfileSetting';





const User = ({ showImageModal }) => {
    const [settingIndex , setSettingIndex] = useState(1)
  const settings = [<SettingOption setSettingIndex={setSettingIndex} />, <UserProfileSetting setSettingIndex={setSettingIndex} /> ]
  const userFormEntries = useSelector((state) => state.user.userFormEntries);
  const userId = useSelector((state) => state.user.value);
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();

  return (
      <div className='w-full h-full flex flex-col text-[#005377]  bg-white rounded-lg p-3 pt-5 relative border border-red-700 break-normal overflow-y-auto'>
      
        <div id="main-user" className='flex pb-4 border-b border-gray-700 items-center gap-5 mb-5 sticky top-0 cursor-pointer' onClick={() => { setSettingIndex(1)}}>
            
        <div id="left" className='w-fit' onClick={() => showImageModal()}>
          <Image src={`${userData.profilePicture.stringValue}`} alt='user-photo' width={200} height={100} className='rounded-md aspect-video  object-scale-down' 
            loading="lazy"  />
              </div>
              <div id="right" className='flex-1'>
          <h2 className='font-extrabold text-xl capitalize'>
            {`${userData.lastName.stringValue} ${userData.firstName.stringValue}`}
          </h2>
          {settingIndex == 1 ? <span className=''>Edit account details</span> : <span className=''>Account details</span>}
              </div>
              <div id="left" className='w-fit'>
          {settingIndex === 0 &&  (<Image src={arrowRight} alt='user-photo' width={35} className='aspect-square' />)}
              </div>
        </div>
          <div id="setting-options" className='flex flex-col gap-8 overflow-y-scroll hide-scrollbar'>
           {
                  settings[settingIndex]
           }
        </div>

    </div>
  )
}

export default User

