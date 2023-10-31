import React , {useRef}from 'react'
import Image from 'next/image'
import phone from '../public/images/pexels-luis-moya-14528919.jpg'
import arrowRight from '../public/icons/arrow-right.svg'
import { gsap, Power3, TimelineLite, Power4 } from 'gsap';
const MainHome = () => {
  let ItemlistlistRef = useRef(null)
  const tl = gsap.timeline();
  const durationTl = gsap.timeline();
  function showFinanceDetails(index) {
    let userItems = Array.from(ItemlistlistRef.children)

    userItems.forEach((item) => {
      tl.to(item, { duration: 0, boxShadow: 'none', height: 'auto', ease: Power3.easeIn })
        
      gsap.to(item.querySelector('.arrow-img'),
        {
          duration: 0.5,
          rotation: 0,
          ease: Power3.easeOut,
        }
      )
      gsap.timeline().to(item.querySelector('.days'),
       
        {
          duration: 0,
          display: 'none',
          ease: Power3.easeOut,
        }
      )
      // .to(item.querySelector('.number'),
      //   {
      //     duration: 0.5,
      //     display: 'flex',
      //     ease: Power3.easeOut,
      //   }
      // )
    })



    
    gsap.to(userItems[index],
      {
        duration: 0.5,
        boxShadow: '1px 1px 10px black',
        ease: Power3.easeOut,
      }
    )
    gsap.to(userItems[index].querySelector('.arrow-img'),
      {
        duration: 0.5,
        rotation: 90,
        ease: Power3.easeOut,
      }
    )



    gsap.to(ItemlistlistRef.children[index].querySelector('.number'),
      {
        duration: 0,
        display: 'none',
        ease: Power3.easeOut,
      }
    )
    gsap.to(ItemlistlistRef.children[index].querySelector('.days'),
      {
        duration: 0.5,
        display: 'flex',
        ease: Power3.easeOut,
      }
    )


    // gsap.to(ItemlistlistRef.children[index].querySelector('.days'), { autoAlpha: ItemlistlistRef.children[index].querySelector('.number').style.visibility === 'hidden' ? visibility : 'shown' : 0, duration: 0.5 });

  }
  return (
    <div className='w-full h-full overflow-y-auto  text-[#005377]  bg-white rounded-lg pt-5 relative border border-red-700 break-normal box-shadowBottom'>
      <div className="text-xl font-bold text-right w-fit border border-red-700  mb-4">Currently financed items:</div>
      <div className="flex  flex-col w-full  border gap-3 relative " ref={el => (ItemlistlistRef = el)}>
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


const FinancedItem = ({ id, showFinanceDetails }) => {
  return (
    <div className="flex items-center gap-3 max-w-[90%] w-full mx-auto p-2 border border-gray-600 bank rounded-xl relative" onClick={() => showFinanceDetails(id)}>
        <div id="left" className='w-fit'>
          <Image src={phone} alt='item-photo' width={60} className='rounded-full aspect-square ' />
        </div>
        <div id="center" className=''>
          <h2 className='font-semibold text-[0.9rem]'>Samsung Galaxy S21 Ultra</h2>
          <div className='flex justify-between items-center '>
           <div id="center-left" className='flex flex-col'>
              <div className="flex gap-2 text-xs">
                <span className='capitalize'>from:</span>
                <span className='capitalize'>05/02/2002</span>
              </div>
              <div className="flex gap-2 text-xs">
                <span className='capitalize'>to:</span>
                <span className='capitalize'>05/02/2002</span>
              </div>
              
           </div>
            <div id="center-right" className=' w-fit text-white bg-[#005377]  duration'>
            <div className="flex items-center justify-center w-6 h-6 text-sm font-bold aspect-square  number">
              4
            </div>
            <div className="full-time p-1 px-2 text-xs hidden days">120 days</div>
            </div>
          </div>
        </div>
        <div id="right" className='w-fit absolute right-0 arrow-img '>
          <Image src={arrowRight} alt='user-photo' width={25} className='aspect-square' />
        </div>
      </div>
    
  )
}
