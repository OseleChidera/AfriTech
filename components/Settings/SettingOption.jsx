import React from 'react'
import Image from 'next/image'
import legal from "../../public/icons/legal.svg"
import logout from "../../public/icons/logout.svg"
import security from "../../public/icons/security.svg"
import help from "../../public/icons/help.svg"
import arrowRight from "../../public/icons/arrow-right.svg"
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
const SettingOption = ({ setSettingIndex }) => {
  return (
    <>
      {
        settingOptions.map((settingOption, index) => {
          return <div id="main-user" className=' pb-3 border-b border-gray-700 cursor-pointer' onClick={() => { setSettingIndex(index) }} key={index}>
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

export default SettingOption