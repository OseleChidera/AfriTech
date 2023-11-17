import Image from 'next/image'
import React, { useState,useEffect } from 'react'
import photo1 from '../public/images/photo1.jpeg'
import arrowRight from "../public/icons/arrow-right.svg"
import legal from "../public/icons/legal.svg"
import logout from "../public/icons/logout.svg"
import security from "../public/icons/security.svg"
import help from "../public/icons/help.svg"
import { useSelector, useDispatch } from "react-redux";
import { fetchDataByUserId } from '@/redux/user'
import { userData } from '@/redux/userData'



const settingOptions = [
    {
        image: help,
        title: 'Help',
        text: 'Get support or send feedback'
    },
    {
        image: security,
        title: 'Security',
        text: 'Protect yourself from intruders'
    },
    {
        image: legal,
        title: 'Legal',
        text: 'About our contract with you'
    },
    {
        image: logout,
        title: 'Logout',
        text: 'Logout'
    },

]

const User = () => {
    const [settingIndex , setSettingIndex] = useState(0)
    const settings = [<Home setSettingIndex={setSettingIndex} />, <Other setSettingIndex={setSettingIndex} /> ]
  const userFormEntries = useSelector((state) => state.user.userFormEntries);
  const userId = useSelector((state) => state.user.value);
  const userDataVariable = useSelector(userData);
  const dispatch = useDispatch();

  useEffect(()=>{
    console.log(JSON.stringify(userDataVariable))
    console.log(JSON.parse(userDataVariable))
  }, [])

  return (
      <div className='w-full h-full flex flex-col text-[#005377]  bg-white rounded-lg p-3 pt-5 relative border border-red-700 break-normal overflow-y-auto'>
        <div id="main-user" className='flex pb-4 border-b border-gray-700 items-center gap-5 mb-5 sticky top-0 cursor-pointer' onClick={() => { setSettingIndex(1)}}>
            
              <div id="left" className='w-fit'>
                  <Image src={photo1} alt='user-photo' width={80} className='rounded-full aspect-square grayscale-image object-cover '   />
              </div>
              <div id="right" className='flex-1'>
          <h2 className='font-extrabold text-xl'>
            {/* {userDataVariable.firstName + userDataVariable.lastName} */}
            Osele Chidera
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


const Home = ({ setSettingIndex }) => {
  return (
    <>
          {
              settingOptions.map((settingOption, index) => {
                  return <div id="main-user" className=' pb-3 border-b border-gray-700 ' onClick={() => { setSettingIndex(index)}}>
                      <div className="flex items-center gap-5  max-w-[90%] mx-auto">
                          <div id="left" className='w-fit'>
                              <Image src={settingOption.image} alt='user-photo' width={25} className=' aspect-square ' />
                          </div>
                          <div id="right" className='flex-1 gap-0'>
                              <h2 className='font-extrabold text-lg'>{settingOption.title}</h2>
                              <span className='text-xs'>{settingOption.text}</span>
                          </div>
                          <div id="left" className='w-fit'>
                              <Image src={arrowRight} alt='user-photo' width={25} className='aspect-square' />
                          </div>
                      </div>
                  </div>
              })
          }
    </>
  )
}
const formEntries = {
    email: 'oselechidera560@gmail.com',
    firstName: 'Mustapha',
    lastName: 'JIMOH',
    Username: 'SSSSSS',
    Phone: '9012555781',
    address: '135 aransiol close oyaderan extate',
    passportnumber: 'a11111',
    ninnumber: '111111',
    verified: true.toString()
}

const Other = ({ setSettingIndex }) => {
  
    return (
        <div className='border border-black' >
            <div id="nav" className='flex flex-row justify-between mb-4'>
                <button onClick={() => { setSettingIndex(0) }} className='border border-black px-4 text-lg py-2 rounded-md capitalize text-[#005377] text-bold'>back</button>
                <button onClick={() => { setSettingIndex(0) }} className='border border-black px-4 text-lg py-2 rounded-md capitalize text-[#005377] text-bold'>save</button>
            </div>
            <main className='border border-red-700 max-w-full flex flex-col gap-5 mb-10'>
               {
                    Object.keys(formEntries).map((key, index) => <Setting title={key} value={formEntries[key]} index={index}/>)
               }
            </main>
        <div id="bottom" className='border border-black'>
          <button onClick={() => { setSettingIndex(0) }} className='border border-black px-3 py-2 rounded-md capitalize text-[#005377] text-bold w-full'>save</button>
            </div>
        </div>
    )
}


const Setting = ({ title, value, index }) => {
  const [isEditing, setIsEditing] = useState(null);
  const [inputValue, setInputValue] = useState(value);

  function selectEditing(index) {
    // console.log(index)

    document.querySelectorAll('.user-setting-item').forEach((item)=>{
        item.querySelector('input').disabled = true;
    })
      // console.log(document.querySelectorAll('.user-setting-item')[index].querySelector('input'))
      document.querySelectorAll('.user-setting-item')[index].querySelector('input').classList.add = 'input-active'
      document.querySelectorAll('.user-setting-item')[index].querySelector('input').disabled = false
  }
   
  return (
    <div className="flex justify-between items-center w-full p-2 py-4 box-shadow rounded-md user-setting-item bank">
      {
        <div id="left" className=' text-[#005377] w-full '>
                  <h3 className="text-bold capitalize">{title}:</h3>
          <input
            value={inputValue}
            onChange={(e) => setValue(e.target.value)}
            className="w-3/4 border border-black input-regular md:w-1/2"
            disabled={true}
          />
        </div>
      }
      <div id="right">
        <button
          className="border border-black px-3 py-2 rounded-md capitalize cursor-pointer"
          disable={isEditing}
        onClick={() => selectEditing(index)}
        >
          edit
        </button>
      </div>
    </div>
  );
};
