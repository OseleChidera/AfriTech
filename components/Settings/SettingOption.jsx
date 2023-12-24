import React from 'react'
import Image from 'next/image'
import legal from "../../public/icons/legal.svg"
import logout from "../../public/icons/logout.svg"
import security from "../../public/icons/security.svg"
import help from "../../public/icons/help.svg"
import arrowRight from "../../public/icons/arrow-right.svg"




const SettingOptions = ({ setSettingIndex, showLogoutModalFn, showResetPasswordModalFn }) => {
  const settingOptions = [
    {
      image: help,
      title: 'Help',
      text: 'Get support or send feedback',
      optionId: 2
    },
    {
      image: security,
      title: 'Password Security',
      text: 'Change current password',
      optionId: 3
    },
    {
      image: legal,
      title: 'Legal',
      text: 'About our contract with you',
      optionId: 4
    },
    {
      image: logout,
      title: 'Logout',
      text: 'Logout',
      optionId: 5
    },

  ]
  return (
    <>
      <SettingOption image={settingOptions[0].image} title={settingOptions[0].title} text={settingOptions[0].text} action={() => setSettingIndex(2)} />
      <SettingOption image={settingOptions[1].image} title={settingOptions[1].title} text={settingOptions[1].text} action={() => showResetPasswordModalFn(true)} />
      <SettingOption image={settingOptions[2].image} title={settingOptions[2].title} text={settingOptions[2].text} action={() => setSettingIndex(4)} />
      <SettingOption image={settingOptions[3].image} title={settingOptions[3].title} text={settingOptions[3].text} action={() => showLogoutModalFn(true)} />

    </>
  )
}

export default SettingOptions




const SettingOption = ({ image, title, text, action }) => {
  return (
    <div id="main-user" className=' pb-3 border-b border-gray-700 cursor-pointer' onClick={action}>
      <div className="flex items-center gap-5  max-w-[90%] mx-auto">
        <div id="left" className='w-fit'>
          <Image src={image} alt='user-photo' width={25} className=' aspect-square ' />
        </div>
        <div id="right" className='flex-1 gap-0'>
          <h2 className='font-extrabold text-lg'>{title}</h2>
          <span className='text-xs'>{text}</span>
        </div>
        <div id="left" className='w-fit'>
          <Image src={arrowRight} alt='user-photo' width={25} className='aspect-square' />
        </div>
      </div>
    </div>
  )
}
















// return (
//   <>
//     {settingOptions.map((settingOption, index) => (
//       <SettingOption image={settingOption.image} title={settingOption.title} text={settingOption.text} setSettingIndex={setSettingIndex} optionId={settingOption.optionId} key={index} />
//     ))}

//   </>
// )
// }

// export default SettingOptions




// const SettingOption = ({ image, title, text, setSettingIndex, optionId }) => {
//   return (
//     <div id="main-user" className=' pb-3 border-b border-gray-700 cursor-pointer' onClick={() => { setSettingIndex(optionId) }}>
//       <div className="flex items-center gap-5  max-w-[90%] mx-auto">
//         <div id="left" className='w-fit'>
//           <Image src={image} alt='user-photo' width={25} className=' aspect-square ' />
//         </div>
//         <div id="right" className='flex-1 gap-0'>
//           <h2 className='font-extrabold text-lg'>{title}</h2>
//           <span className='text-xs'>{text}</span>
//         </div>
//         <div id="left" className='w-fit'>
//           <Image src={arrowRight} alt='user-photo' width={25} className='aspect-square' />
//         </div>
//       </div>
//     </div>
//   )
// }













// return (
//   <>

//     <SettingOption image={settingOptions[0].image} title={settingOptions[0].title} text={settingOptions[0].text} onClick={() => setSettingIndex(2)} />
//     <SettingOption image={settingOptions[1].image} title={settingOptions[1].title} text={settingOptions[1].text} onClick={() => showResetPasswordModal(true)} />
//     <SettingOption image={settingOptions[2].image} title={settingOptions[2].title} text={settingOptions[2].text} onClick={() => setSettingIndex(4)} />
//     <SettingOption image={settingOptions[3].image} title={settingOptions[3].title} text={settingOptions[3].text} onClick={() => showLogoutModal(true)} />

//   </>
// )
// }

// export default SettingOptions




// const SettingOption = ({ image, title, text, action }) => {
//   return (
//     <div id="main-user" className=' pb-3 border-b border-gray-700 cursor-pointer' >
//       <div className="flex items-center gap-5  max-w-[90%] mx-auto">
//         <div id="left" className='w-fit'>
//           <Image src={image} alt='user-photo' width={25} className=' aspect-square ' />
//         </div>
//         <div id="right" className='flex-1 gap-0'>
//           <h2 className='font-extrabold text-lg'>{title}</h2>
//           <span className='text-xs'>{text}</span>
//         </div>
//         <div id="left" className='w-fit'>
//           <Image src={arrowRight} alt='user-photo' width={25} className='aspect-square' />
//         </div>
//       </div>
//     </div>
//   )
// }