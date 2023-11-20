'use client'
import React, { useState } from 'react'
import Link from 'next/link'

const DeviceInfoSection = () => {
    return (
        <>
            <div className="flex flex-col gap-2  text-sm mb-2">
                <span className='capitalize font-bold'>Device Name : <span className="font-normal md:text-xl"><Link href={`https://www.gsmarena.com/samsung_galaxy_s21_ultra_5g-10596.php#`} target="_blank">Samsung Galaxy S21 Ultra</Link></span></span>
                <span className='capitalize font-bold'>Device Official Releade Date : <span className="font-normal md:text-xl">Released 2021, January 29</span></span>
                <span className='capitalize font-bold'>Device Model : <span className="font-normal md:text-xl">M00972</span></span>
            </div>
            <div className="w-full flex flex-col gap-2">
                <span className='capitalize  md:text-xl'>Device Specifitations : </span>
                <div id="specification " className='border  border-blue-500 flex items-start gap-2 w-full justify-between'>
                    <span>Body</span>
                    <section className="flex flex-col border border-blue-500 text-xs w-[75%]">
                        <span className='font-bold'>Dimensions : <span className='font-normal'>165.1 x 75.6 x 8.9 mm (6.5 x 2.98 x 0.35 in)</span></span>
                        <span className='font-bold'>Weight : <span className='font-normal'>227 g (Sub6), 229 g (mmWave) (8.01 oz)</span></span>
                        <span className='font-bold'>Build : <span className='font-normal'>Glass front (Gorilla Glass Victus), glass back (Gorilla Glass Victus), aluminum frame</span></span>
                        <span className='font-bold'>SIM : <span className='font-normal'>Nano-SIM and eSIM or Dual SIM (2 Nano-SIMs and eSIM, dual stand-by), IP68 dust/water resistant (up to 1.5m for 30 min)</span></span>
                    </section>
                </div>
                <div id="specification " className='border  border-blue-500 flex items-start gap-2 w-full justify-between'>
                    <span>DISPLAY</span>
                    <section className="flex flex-col border border-blue-500 text-xs w-[75%]">
                        <span className='font-bold'>Type : <span className='font-normal'>Dynamic AMOLED 2X, 120Hz, HDR10+, 1500 nits (peak)</span></span>
                        <span className='font-bold'>Size : <span className='font-normal'>6.8 inches, 112.1 cm2 (~89.8% screen-to-body ratio)</span></span>
                        <span className='font-bold'>Resolution : <span className='font-normal'>1440 x 3200 pixels, 20:9 ratio (~515 ppi density)</span></span>
                        <span className='font-bold'>Protection : <span className='font-normal'>Corning Gorilla Glass Victus</span></span>
                        <span className='font-bold'> <span className='font-normal'>Always-on display</span></span>
                    </section>
                </div>
                <div id="specification " className='border  border-blue-500 flex items-start gap-2 w-full justify-between'>
                    <span>PLATFORM</span>
                    <section className="flex flex-col border border-blue-500 text-xs w-[75%]">
                        <span className='font-bold'>OS : <span className='font-normal'>Android 11, upgradable to Android 13, One UI 5.1</span></span>
                        <span className='font-bold'>Chipset : <span className='font-normal'>Exynos 2100 (5 nm) - International</span></span>
                        <span className='font-bold'>CPU : <span className='font-normal'>Octa-core (1x2.9 GHz Cortex-X1 & 3x2.80 GHz Cortex-A78 & 4x2.2 GHz Cortex-A55) - International</span></span>
                        <span className='font-bold'>GPU : <span className='font-normal'>Mali-G78 MP14 - International</span></span>
                    </section>
                </div>
                <div id="specification " className='border  border-blue-500 flex items-start gap-2 w-full justify-between'>
                    <span>MEMORY</span>
                    <section className="flex flex-col border border-blue-500 text-xs w-[75%]">
                        <span className='font-bold'>Card slot : <span className='font-normal'>Android 11, upgradable to Android 13, One UI 5.1</span></span>
                        <span className='font-bold'>Internal : <span className='font-normal'>128GB 12GB RAM</span></span>
                    </section>
                </div>
                <div id="specification " className='border  border-blue-500 flex items-start gap-2 w-full justify-between'>
                    <span>MAIN CAMERA</span>
                    <section className="flex flex-col border border-blue-500 text-xs w-[75%]">
                        <span className='font-bold'>Quad : <span className='font-normal'>108 MP, f/1.8, 24mm (wide), 1/1.33", 0.8µm, PDAF, Laser AF, OIS
                            10 MP, f/4.9, 240mm (periscope telephoto), 1/3.24", 1.22µm, dual pixel PDAF, OIS, 10x optical zoom
                            10 MP, f/2.4, 72mm (telephoto), 1/3.24", 1.22µm, dual pixel PDAF, OIS, 3x optical zoom
                            12 MP, f/2.2, 13mm (ultrawide), 1/2.55", 1.4µm, dual pixel PDAF, Super Steady video</span></span>
                        <span className='font-bold'>Features : <span className='font-normal'>LED flash, auto-HDR, panorama</span></span>
                        <span className='font-bold'>Video : <span className='font-normal'>8K@24fps, 4K@30/60fps, 1080p@30/60/240fps, 720p@960fps, HDR10+, stereo sound rec., gyro-EIS</span></span>
                    </section>
                </div>
                <div id="specification " className='border  border-blue-500 flex items-start gap-2 w-full justify-between'>
                    <span>SELFIE CAMERA</span>
                    <section className="flex flex-col border border-blue-500 text-xs w-[75%]">
                        <span className='font-bold'>Single: <span className='font-normal'>40 MP, f/2.2, 26mm (wide), 1/2.8", 0.7µm, PDAF</span></span>
                        <span className='font-bold'>Features : <span className='font-normal'>Dual video call, Auto-HDR</span></span>
                        <span className='font-bold'>Video : <span className='font-normal'>4K@30/60fps, 1080p@30fps</span></span>
                    </section>
                </div>
                <div id="specification " className='border  border-blue-500 flex items-start gap-2 w-full justify-between'>
                    <span>SOUND</span>
                    <section className="flex flex-col border border-blue-500 text-xs w-[75%]">
                        <span className='font-bold'>SOUND : <span className='font-normal'>Yes, with stereo speakers</span></span>
                        <span className='font-bold'>	Loudspeaker : <span className='font-normal'>No</span></span>
                    </section>
                </div>
                <div id="specification " className='border  border-blue-500 flex items-start gap-2 w-full justify-between'>
                    <span>COMMS</span>
                    <section className="flex flex-col border border-blue-500 text-xs w-[75%]">
                        <span className='font-bold'>WLAN : <span className='font-normal'>Wi-Fi 802.11 a/b/g/n/ac/6e, dual-band, Wi-Fi Direct</span></span>
                        <span className='font-bold'>Bluetooth : <span className='font-normal'>5.2, A2DP, LE</span></span>
                        <span className='font-bold'>Positioning : <span className='font-normal'>GPS, GLONASS, BDS, GALILEO</span></span>
                        <span className='font-bold'>NFC : <span className='font-normal'>Yes</span></span>
                        <span className='font-bold'>Radio : <span className='font-normal'>FM radio (Snapdragon model only; market/operator dependent)</span></span>
                        <span className='font-bold'>USB : <span className='font-normal'>USB Type-C 3.2, OTG</span></span>
                    </section>
                </div>
                <div id="specification " className='border  border-blue-500 flex items-start gap-2 w-full justify-between'>
                    <span>FEATURES</span>
                    <section className="flex flex-col border border-blue-500 text-xs w-[75%]">
                        <span className='font-bold'>SENSORS : <span className='font-normal'>Fingerprint (under display, ultrasonic), accelerometer, gyro, proximity, compass, barometer</span></span>
                        <span className='font-bold'>	Loudspeaker : <span className='font-normal'>No</span></span>
                    </section>
                </div>
                <div id="specification " className='border  border-blue-500 flex items-start gap-2 w-full justify-between'>
                    <span>BATTERY</span>
                    <section className="flex flex-col border border-blue-500 text-xs w-[75%]">
                        <span className='font-bold'>Type : <span className='font-normal'>Li-Ion 5000 mAh, non-removable</span></span>
                        <span className='font-bold'>Charging : <span className='font-normal'>25W wired, PD3.0</span></span>
                    </section>
                </div>
                <div id="specification " className='border  border-blue-500 flex items-start gap-2 w-full justify-between'>
                    <span>MISC</span>
                    <section className="flex flex-col border border-blue-500 text-xs w-[75%]">
                        <span className='font-bold'>COLOR : <span className='font-normal'>Phantom Black</span></span>
                        <span className='font-bold'>MODELS : <span className='font-normal'>SM-G998B</span></span>
                    </section>
                </div>

            </div>
        </>
    )
}


export default DeviceInfoSection