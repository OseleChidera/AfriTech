import Image from 'next/image'
import React from 'react'
import photo1 from '../public/images/photo1.jpeg'
import arrowRight from "../public/icons/arrow-right.svg"
import legal from "../public/icons/legal.svg"
import logout from "../public/icons/logout.svg"
import security from "../public/icons/security.svg"
import help from "../public/icons/help.svg"


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
  return (
      <div className='w-full h-full flex flex-col text-[#005377]  bg-white rounded-lg p-3 pt-5 relative border border-red-700 break-normal overflow-y-auto'>
        <div id="main-user" className='flex pb-4 border-b border-gray-700 items-center gap-5 mb-5 sticky top-0'>
            
              <div id="left" className='w-fit'>
                  <Image src={photo1} alt='user-photo' width={80} className='rounded-full aspect-square grayscale-image object-cover '   />
              </div>
              <div id="right" className='flex-1'>
                  <h2 className='font-extrabold text-xl'>Osele Chidera</h2>
                <span className=''>Account details</span>
              </div>
              <div id="left" className='w-fit'>
                  <Image src={arrowRight} alt='user-photo' width={35} className='aspect-square' />
              </div>
        </div>
        <div id="setting-options" className='flex flex-col gap-8 '>
            {
                settingOptions.map((settingOption)=>{
      return  <div id="main-user" className=' pb-3 border-b border-gray-700 '>
          <div className="flex items-center gap-5  max-w-[90%] mx-auto">
              <div id="left" className='w-fit'>
              <Image src={settingOption.image} alt='user-photo' width={25} className=' aspect-square '   />
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
        </div>

    </div>
  )
}

export default User


