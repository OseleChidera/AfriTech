'use client'
export const dynamicParams = false;
import React, { useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import phone from '../../../../../public/images/samsung-galaxy-s21-ultra-5g-4.jpg'
// import phone from '../../public/images/photo1.jpeg'
import DeviceInfoSection from '@/components/Device Page/DeviceInfoSection'
import DeviceStoreInfoSection from '@/components/Device Page/DeviceStoreInfoSection'
import { useRouter } from 'next/router';
import { sethomePageNavIndex } from "@/redux/user";
import { useSelector, useDispatch } from "react-redux";
import { notFound } from 'next/navigation';

// export async function generateStaticParams(){
//     const res = await fetch('api url')
//     const devices = await res.json();
//     return devices.map((device)=>({
//         id:device.id
//     }))
// }

// async function fetchDeviceItem(){
//     const res = await fetch("api url", { next: { revalidate: 60} })
//     if(!res.ok){
//         notFound()
//     }
//     return res.json()
// }



const  page = ({ params }) => {
    const deviceID = params.id
    // useEffect(()=>{
    //  fetchDeviceItem(deviceID)
    // }, [deviceID])
    const dispatch = useDispatch();
    const [deviceIndex, setDeviceIndex] = useState(0)
    const showArray = [<DeviceInfoSection />, <DeviceStoreInfoSection />]
    return (
        <div id="product_description" className='svh-minHeight flex flex-col w- gap-5  bg-[#005377]  py-4 px-5 border border-red-800 text-white'>

            <div id="left-center" className='flex gap-2  items-center'>
                <div id="left" className='w-fit '>
                    <Image src={phone} alt='item-photo' width={160} className='rounded-md aspect-square md:w-36 lg:w-40 object-fill' />
                </div>
                <div id="center" className='text-sm'>
                    <span>
                        <h2 className='font-semibold text-lg md:text-2xl lg:text-5xl mb-3 inline'>Samsung Galaxy S21 Ultra</h2>
                        <h1>Item ID: {deviceID}</h1>
                    </span>
                    <div className='flex flex-col justify-between items-center md:flex-row'>
                        <div id="center-left" className='flex flex-col  md:mr-5'>
                            <div className="flex gap-2  md:text-2xl ">
                                <span className='capitalize'>Price :</span>
                                <span className='font-bold'>₦365,000</span>
                            </div>
                            <div className="flex flex-col gap-2 md:text-xl ">
                                <span className='capitalize'>Price Spread over <span className='underline underline-offset-4 text-xl md:text-2xl font-bold'>8</span> Months : <span className=' font-bold'>₦45,625</span></span>
                                <span className='capitalize text-xl'>Emeka & Son's LTD</span>
                            </div>
                        </div>
                        <Link href={`/home`} onClick={() => dispatch(sethomePageNavIndex(1))}>
                            <div className="flex justify-center items-center text-center rounded-full w-fit p-2 px-2 font-bold  text-sm border border-white  cursor-pointer home md:text-xl self-end" >
                                Home
                            </div>
                        </Link>
                    </div>

                </div>
            </div>
            <div className="flex flex-col gap-2 w-md  rounded-md h-[70vh]  ">
                <div className="flex h-fit  text-white overflow-hidden gap-2 relative">
                    <button className='flex-1 p-2 px-4 border border-white  rounded-tl-md rounded-bl-md details-btn-left relative z-10' onClick={() => setDeviceIndex(0)}>Device Details</button>
                    <button className='flex-1 p-2 px-4 border border-white rounded-tr-md rounded-br-md details-btn-right relative z-10' onClick={() => setDeviceIndex(1)}>Store Details</button>
                </div>
                <div id='inf0-section' className="flex-1 h-full bg-white  flex overflow-y-auto flex-col w-full hide-scrollbar rounded-md text-[#005377] p-2">
                    {/* <DeviceInfoSection/> */}
                    {/* <DeviceStoreInfoSection/> */}
                    {
                        showArray[deviceIndex]
                    }
                </div>
                <div className="flex h-fit  text-white overflow-hidden gap-2 relative">
                    <button className='flex-1 p-2 px-4 border border-white  rounded-md  details-btn-left relative z-10'>Finance Item</button>
                </div>
            </div>
        </div>
    )
}
export default page



