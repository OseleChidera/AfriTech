
'use client'
import React, { useState } from 'react'
import Link from 'next/link'

const DeviceStoreInfoSection = () => {
    return (
        <>
            <div className="flex flex-col gap-2  text-sm mb-2">
                <span className='capitalize font-bold'>Store Name : <span className="font-normal md:text-xl"><Link href={`maps.google.com`} target="_blank">Emeka & Son's LTD</Link></span></span>
                <span className='capitalize font-bold'>Store Address : <span className="font-normal md:text-xl">123, Gadgets Avenue Victoria Island, Lagos.</span></span>
                <span className='capitalize font-bold'>Store CEO : <span className="font-normal md:text-xl">MR Frank Emeka</span></span>
                <span className='capitalize font-bold'>Store CFO : <span className="font-normal md:text-xl">MRS Sharon Emeka </span></span>
                <span className='capitalize font-bold'>Store Manager : <span className="font-normal md:text-xl">MR Damian Emeka </span></span>
                <span className='capitalize font-bold'>Customer Finance Completion Rate  : <span className="font-normal md:text-xl">98.95%</span></span>
            </div>
            <div className="w-full flex flex-col gap-2">
                {/* <span className='capitalize  md:text-xl'>Outlet Pictures : </span> */}
                <div id="specification " className=' flex items-start gap-2 w-full justify-between'>
                    <span>Store Hotlines</span>
                    <section className="flex flex-col  text-xs w-[65%]">
                        <span className='font-bold'>Main : <span className='font-normal'>+(234)9043533781</span></span>
                        <span className='font-bold'>Backup : <span className='font-normal'>+(234)9043533781</span></span>
                        <span className='font-bold'>backup 2 : <span className='font-normal'>+(234)9043533781</span></span>
                        <span className='font-bold'>Email 1 : <span className='font-normal'>Emeka&$onsLTD@gmail.com</span></span>
                        <span className='font-bold'>Email 2 : <span className='font-normal'>Emeka&$onsLTD2@gmail.com</span></span>
                    </section>
                </div>

            </div>
        </>
    )
}


export default DeviceStoreInfoSection