
'use client'
import React, { useState } from 'react'
import Link from 'next/link'

const DeviceStoreInfoSection = ({ retailerData }) => {
    return (
        <>
            <div className="flex flex-col gap-2  text-sm mb-2">
                <span className='capitalize font-bold'>Store Name : <span className="font-normal md:text-xl"><Link href={`maps.google.com`} target="_blank">{retailerData.name}</Link></span></span>
                <span className='capitalize font-bold'>Store Address : <span className="font-normal md:text-xl">{retailerData.address}</span></span>
                <span className='capitalize font-bold'>Store Owners : <span className="font-normal md:text-xl">{retailerData.owners}</span></span>
                <span className='capitalize font-bold'>Customer Finance Completion Rate  : <span className="font-normal md:text-xl">{retailerData.orderCompletionRate}</span></span>
            </div>
            <div className="w-full flex flex-col gap-2">
                {/* <span className='capitalize  md:text-xl'>Outlet Pictures : </span> */}
                <div id="specification " className=' flex items-start gap-2 w-full justify-between'>
                    <span>Store Hotlines</span>
                    <section className="flex flex-col  text-xs w-[65%]">
                        {
                            retailerData.storeEmails?.map((e, index) => (<span className='font-bold'>{`Email ${index + 1} : `}<span className='font-normal'>{e}</span></span>))
                        }
                        {
                            retailerData.storeHotlines?.map((e, index) => (<span className='font-bold'>{`Line ${index + 1} : `}<span className='font-normal'>{e}</span></span>))
                        }
                        
                    </section>
                </div>

            </div>
        </>
    )
}


export default DeviceStoreInfoSection