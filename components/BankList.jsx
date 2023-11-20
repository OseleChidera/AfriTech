import React ,{useRef}from 'react'
import Image from 'next/image'
import phone from '../public/images/pexels-luis-moya-14528919.jpg'
import arrowRight from '../public/icons/arrow-right.svg'
// import { gsap, Power3, TimelineLite, Power4 } from 'gsap/index';
import { useSelector, useDispatch } from "react-redux";
const BankList = () => {
  let banklistRef = useRef(null)
  // const tl = gsap.timeline();


  function showBankDetails(index){
    let userBanks = Array.from(banklistRef.children)
    // userBanks.forEach((bank)=>{
    //     tl.to(bank, { duration: 0, boxShadow: 'none', height: 'auto', ease: Power3.easeIn })
    //     .to(bank.querySelector('.account-hidden'),{ display: 'none', duration: 0.01, ease: Power3.easeIn })
    //   gsap.to(bank.querySelector('.arrow-img'),
    //     {
    //       duration: 0.5,
    //       rotation: 0,
    //       ease: Power3.easeOut,
    //     }
    //   )
    // })
    // gsap.to(userBanks[index].querySelector('.account-hidden'),
    //   {
    //     duration: 0.5,
    //     display: 'flex',
    //     ease: Power3.easeOut,
    //   }
    // )
    // gsap.to(userBanks[index],
    //   {
    //     duration: 0.5,
    //     boxShadow: '1px 1px 10px black',
    //     ease: Power3.easeOut,
    //   }
    // )
    // gsap.to(userBanks[index].querySelector('.arrow-img'),
    //   {
    //     duration: 0.5,
    //     rotation: 90,
    //     ease: Power3.easeOut,
    //   }
    // )
  }
  const userObject = useSelector((state) => state.user.userData);
  return (
    <div className='w-full h-full overflow-y-auto  text-[#005377]  bg-white rounded-lg pt-5 relative border border-red-700 break-normal box-shadowBottom hide-scrollbar'>
      <div className="text-xl font-bold text-right w-fit border border-red-700 ml-5 mb-4 md:ml-11">User BVN : {userObject.bvnnumber.stringValue}</div>
      <div className="flex  flex-col w-full  border gap-3 relative " ref={el => (banklistRef = el)}>
        <Bank id={0} showBankDetails={showBankDetails}/>
        <Bank id={1} showBankDetails={showBankDetails} />
        <Bank id={2} showBankDetails={showBankDetails} />
        <Bank id={3} showBankDetails={showBankDetails} />
        <Bank id={4} showBankDetails={showBankDetails} />
        <Bank id={5} showBankDetails={showBankDetails} />
        <Bank id={6} showBankDetails={showBankDetails} />
        <Bank id={7} showBankDetails={showBankDetails} />
        <Bank id={8} showBankDetails={showBankDetails} />
      </div>
    </div>
  )
}

export default BankList


const Bank = ({id,  showBankDetails }) => {
  return (
    <div className="flex items-center gap-3 max-w-[90%] w-full mx-auto p-2 border border-gray-600 bank rounded-xl relative" onClick={() => showBankDetails(id)}>
      <div id="left" className='w-fit '>
        <Image src={phone} alt='bank-photo' width={60} className='rounded-full aspect-square ' />
      </div>
      <div id="center" className=' flex-1'>
        <h2 className='font-bold text-[0.9rem]'>Osele Chidera</h2>
        <div className='flex flex-col'>
          <div className="flex gap-2 text-xs">
            <span className='capitalize'>Providus Bank</span>
          </div>
         <div className=" flex-col w-fit mb-2 account-hidden hidden ">
              <span className='capitalize text-xs'>M00900792</span>
              <span className='capitalize text-xs'>Unilag GRA</span>
         </div>
        </div>
      </div>
      <div id="right" className='w-fit absolute right-0 arrow-img '>
        <Image src={arrowRight} alt='user-photo' width={25} className='aspect-square' />
      </div>
    </div>
  )
}