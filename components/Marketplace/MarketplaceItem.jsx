import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import phone from '../../public/images/pexels-luis-moya-14528919.jpg'
import arrowRight from '../../public/icons/arrow-right.svg'

const MarketplaceItem = ({id}) => {
  return (
      <Link href="/home/marketplace/item/[id]" as={`/home/marketplace/item/${id}`}>
          <div className="flex flex-col items-center justify-between gap-3 max-w-[90%] w-full mx-auto p-2 border border-gray-600 bank rounded-xl relative cursor-pointer group">
              <div id="top" className="flex items-center justify-between gap-3  w-full  rounded-xl relative ">
                  <div id="left-center" className='flex gap-2 md:gap-2 border-black'>
                      <div id="left" className='w-fit'>
                          <Image src={phone} alt='item-photo' width={60} className='rounded-full aspect-square md:w-20 md:rounded-lg lg:w-30' />
                      </div>
                      <div id="center" className=''>
                          <h2 className='font-semibold text-[0.85rem] md:text-base lg:text-lg'>Samsung Galaxy S21 Ultra</h2>
                          <div className='flex justify-between items-center '>
                              <div id="center-left" className='flex flex-col'>
                                  <div className="flex gap-2 text-xs md:text-base lg:text-lg">
                                      <span className='capitalize'>Price:</span>
                                      <span className='capitalize'>₦365,000</span>
                                  </div>
                                  <div className="flex gap-2 text-xs md:text-base lg:text-lg">
                                      <span className='capitalize'>Store:</span>
                                      <span className='capitalize'>Emeka & Son's LTD</span>
                                  </div>

                              </div>
                              <div id="center-right" className=' w-fit text-white bg-[#005377]  duration text-center rounded-full  md:absolute md:right-16 border border-black'>
                                  <div className="flex items-center justify-center w-6 h-6 text-sm font-bold aspect-square  months group-hover:none md:text-lg">
                                      8
                                  </div>
                                  <div className="full-time p-1 px-2 text-xs font-bold hidden days group-hover:flex md:text-lg">240 days</div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div id="right" className='w-fit  arrow-img '>
                      <Image src={arrowRight} alt='user-photo' width={25} className='aspect-square' />
                  </div>
              </div>
          </div>
     </Link>
  )
}

export default MarketplaceItem