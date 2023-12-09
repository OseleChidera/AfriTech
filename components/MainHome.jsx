'use client'
import React , {useRef,useState}from 'react'
import Image from 'next/image'
import phone from '../public/images/pexels-luis-moya-14528919.jpg'
import arrowRight from '../public/icons/arrow-right.svg'
import FinancedItem from './Main Home/FinancedItem'
// import { gsap, Power3, TimelineLite, Power4 } from 'gsap/index';
const MainHome = () => {
  let ItemlistlistRef = useRef(null)
  // const tl = gsap.timeline();
  // const durationTl = gsap.timeline();
  function showFinanceDetails(index) {
    let userItems = Array.from(ItemlistlistRef.children);

    // userItems.forEach((item) => {
    //   tl.to(item, { duration: 0, boxShadow: 'none', height: 'auto', ease: Power3.easeIn })
        
    //   gsap.to(item.querySelector('.arrow-img'),
    //     {
    //       duration: 0.5,
    //       rotation: 0,
    //       ease: Power3.easeOut,
    //     }
    //   )

    //   gsap.to(item.querySelector('.bottom'),
    //     {
    //       duration: 0.5,
    //       display: 'none',
    //       ease: Power3.easeOut,
    //     }
    //   )

    // })



    
    // gsap.to(userItems[index],
    //   {
    //     duration: 0.5,
    //     boxShadow: '1px 1px 10px black',
    //     ease: Power3.easeOut,
    //   }
    // )
    // gsap.to(userItems[index].querySelector('.arrow-img'),
    //   {
    //     duration: 0.5,
    //     rotation: 90,
    //     ease: Power3.easeOut,
    //   }
    // )
    // gsap.to(userItems[index].querySelector('.bottom'),
    //   {
    //     duration: 0.5,
    //     display: 'flex',
    //     ease: Power3.easeOut,
    //   }
    // )

  }
  return (
    <div className='w-full h-full overflow-y-auto  text-[#005377]  bg-white rounded-lg pt-5 relative border border-red-700 break-normal box-shadowBottom hide-scrollbar'>
      <div className="text-xl font-bold text-right w-fit border border-red-700 ml-5 mb-4 md:ml-11">Currently financed items:</div>
      <div className="flex overflow-y-auto flex-col w-full  border gap-3 relative hide-scrollbar" ref={el => (ItemlistlistRef = el)}>
      <FinancedItem id={0} showFinanceDetails={showFinanceDetails} />
      <FinancedItem id={1} showFinanceDetails={showFinanceDetails} />
      <FinancedItem id={2} showFinanceDetails={showFinanceDetails} />
      <FinancedItem id={3} showFinanceDetails={showFinanceDetails} />
      <FinancedItem id={4} showFinanceDetails={showFinanceDetails} />
      <FinancedItem id={5} showFinanceDetails={showFinanceDetails} />
      <FinancedItem id={6} showFinanceDetails={showFinanceDetails} />
      <FinancedItem id={7} showFinanceDetails={showFinanceDetails} />
      <FinancedItem id={8} showFinanceDetails={showFinanceDetails} />
      </div>
    </div>
  )
}

export default MainHome

