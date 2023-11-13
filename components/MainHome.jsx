'use client'
import React , {useRef,useState}from 'react'
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

      gsap.to(item.querySelector('.bottom'),
        {
          duration: 0.5,
          display: 'none',
          ease: Power3.easeOut,
        }
      )

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
    gsap.to(userItems[index].querySelector('.bottom'),
      {
        duration: 0.5,
        display: 'flex',
        ease: Power3.easeOut,
      }
    )

  }
  return (
    <div className='w-full h-full overflow-y-auto  text-[#005377]  bg-white rounded-lg pt-5 relative border border-red-700 break-normal box-shadowBottom'>
      <div className="text-xl font-bold text-right w-fit border border-red-700 ml-5 mb-4 md:ml-11">Currently financed items:</div>
      <div className="flex overflow-y-auto flex-col w-full  border gap-3 relative " ref={el => (ItemlistlistRef = el)}>
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
    <div className="flex flex-col items-center justify-between gap-3 max-w-[90%] w-full mx-auto p-2 border border-gray-600 bank rounded-xl relative cursor-pointer group" onClick={() => showFinanceDetails(id)}>
      <div id="top" className="flex items-center justify-between gap-3  w-full border border-gray-600  rounded-xl relative ">
        <div id="left-center" className='flex gap-2 md:gap-2 border-black'>
          <div id="left" className='w-fit'>
            <Image src={phone} alt='item-photo' width={60} className='rounded-full aspect-square md:w-20 md:rounded-lg lg:w-30' />
          </div>
          <div id="center" className=''>
            <h2 className='font-semibold text-[0.9rem] md:text-lg lg:text-xl'>Samsung Galaxy S21 Ultra</h2>
            <div className='flex justify-between items-center '>
              <div id="center-left" className='flex flex-col'>
                <div className="flex gap-2 text-xs md:text-base lg:text-lg">
                  <span className='capitalize'>from:</span>
                  <span className='capitalize'>05/02/2002</span>
                </div>
                <div className="flex gap-2 text-xs md:text-base lg:text-lg">
                  <span className='capitalize'>to:</span>
                  <span className='capitalize'>05/02/2002</span>
                </div>

              </div>
              <div id="center-right" className=' w-fit text-white bg-[#005377]  duration text-center rounded-full  md:absolute md:right-16 border border-black'>
                <div className="flex items-center justify-center w-6 h-6 text-sm font-bold aspect-square  months group-hover:none md:text-lg">
                  4
                </div>
                <div className="full-time p-1 px-2 text-xs font-bold hidden days group-hover:flex md:text-lg">120 days</div>
              </div>
            </div>
          </div>
        </div>
        <div id="right" className='w-fit  arrow-img '>
          <Image src={arrowRight} alt='user-photo' width={25} className='aspect-square' />
        </div>
       </div>
       <div className="hidden bottom">
        <ImageCarousel/>
       </div>
      </div>
    
  )
}



const ImageCarousel = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    phone,
    phone,
    phone,
    phone
  ];

  const handleClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <div className="flex flex-col gap-10 items-center rounded-xl box-shadow">
      <div className="border w-fit flex gap-5 mx-auto p-4 shadow-sm ">
        {images.map((image, index) => (
          <Image key={index} src={phone} alt={`Image ${index + 1}`} className='cursor-pointer w-10 md:w-16 lg:w-22 rounded-lg hover:shadow-inner'  onClick={() => handleClick(image)} />
        ))}
      </div>
      <div className="w-1/2">
        {selectedImage && (
          <Image  src={selectedImage}  alt="Selected Image" width={50} className="w-full transform object-cover"/>
        )}
      </div>
    </div>
  );
};