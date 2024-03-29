import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import illustration from '../public/images/Server-bro.svg'
import phoneImg from '../public/images/pexels-vlad-chețan-3121979.jpg'
import atmImg from '../public/images/pexels-luis-moya-14528919.jpg'
import twitter from '../public/icons/icons8-twitter-50.png'
import instagram from '../public/icons/icons8-instagram-50.png'
import twitch from '../public/icons/icons8-twitch-50.png'
import localFont from 'next/font/local';
import photo1 from "../public/images/photo1.jpeg"
import photo2 from "../public/images/photo2.jpg"
import photo3 from "../public/images/photo3.jpg"
import photo4 from "../public/images/photo4.jpg"
import Link from 'next/link'
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "@/redux/user";
import axios from 'axios';
import { getAuth, updateEmail, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';



const page = () => {
    const dispatch = useDispatch();
    const userObject = useSelector((state) => state.user.userData);
    const [userIdFromLocalStorage, setUserIdFromLocalStorage] = useState(localStorage.getItem('afriTechUserID') ? JSON.parse(localStorage.getItem('afriTechUserID')) : null)

    async function getUserData() {
        try {
            const response = await axios.get(`https://firestore.googleapis.com/v1/projects/afritech-b3227/databases/(default)/documents/Users/${userIdFromLocalStorage}`);
            dispatch(setUserData(response.data.fields))
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        
    }

function checkIfUserIsloggedIn(){
    const storedUserData = localStorage.getItem('afriTechUserID');
    const data = storedUserData ? JSON.parse(storedUserData) : null;
    if(data == null) {
        window.open('/signin', '_blank');
    }
    else if(data !== null) {
        window.open('/home', '_blank');
    }
}

    // console.log('UserObjectTTTTTTTTTTT: ' + JSON.stringify(userObject, null, 2))

    useEffect(()=>{
        // setUserIdFromLocalStorage(localStorage.getItem('afriTechUserID') ? JSON.parse(localStorage.getItem('afriTechUserID')) : null)

        getUserData()
    }, [userIdFromLocalStorage])
    return (
        <div className='flex flex-col border border-black  min-h-screen max-h-fit h-full  w-full '>
            <div id='first' className="w-full h-fit flex flex-col gap-4 text-white p-24 px-5   md:items-center md:constant-spacing-md md:px-48">
                <div className="w-fit h-fit mx-auto">
                    {/* <Image src={illustration}  className='mx-auto max-w-sm border border-red-500 md:max-w-md' /> */}
                    <Image src={illustration} width={250} objectFit='contain' className='max-w-md ' />
                </div>
                <h1 className="text-white max-w-md w-full text-5xl font-bold  md:mb-5 md:text-8xl md:text-center md:max-w-xl">
                    Finance Your Tech Dreams!
                </h1>
                <div className="flex flex-col gap-2 w-4/5 md:w-full md:flex-row mx-auto"  >
                    <Link href={`/signup`} className='flex-1'>
                        <button className="rounded-xl bg-[#F1A208] border-none p-[0.65rem] text-xl font-semibold w-full">
                            Get Started
                        </button>
                    </Link>
                    {/* <Link  className='flex-1'> */}
                    <button onClick={() => checkIfUserIsloggedIn()} className="rounded-xl bg-white border-none p-[0.65rem] text-xl font-semibold text-[#F1A208] w-full flex-1">
                            Resume
                        </button>
                    {/* </Link> */}
                </div>
            </div>
            <div id='second' className="flex flex-col  bg-[#0CEBAF] p-10 px-5 mb-7  md:px-48">
                <span className="mb-8 text-white text-2xl font-semibold md:text-5xl">Welcome to</span>
                <span className='text-5xl font-bold max-w-md text-[#FFAD08] text-shadow md:text-8xl md:max-w-3xl '>The Ultimate Tech Financing Platform</span>
            </div>
            <div id='third' className="flex flex-col  gap-14 constant-spacing p-4 md:px-48">

                <div className="flex flex-col gap-4  w-full md:flex-row md:gap-32 md:items-center md:justify-between">
                    <Image src={phoneImg} className='rounded-3xl w-full aspect-square grayscale-image object-cover md:flex-1 md:w-1/3' alt='mobile-phone' />
                    <div className="flex flex-col w-full  break-normal gap-[0.85rem] text-white md:flex-1">
                        <h1 className="font-bold text-[3rem] leading-[2.85rem] text-[#FFAD08] text-shadow  md:text-6xl">
                            Supercharge Your Tech Funding Journey
                        </h1>
                        <p className={` text-lg md:text-xl `}>
                            Our platform empowers tech entrepreneurs to secure funding efficiently and effectively, turning dreams into thriving businesses.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-4 md:flex-row-reverse md:gap-32 md:items-center md:justify-between">
                    <Image src={atmImg} className='rounded-3xl w-full aspect-square grayscale-image object-cover md:flex-1 md:w-1/4 border border-red-700' />
                    <div className="flex flex-col w-full object-contain break-normal gap-[0.85rem] text-white md:flex-1">
                        <h1 className="font-bold text-[3rem] leading-[2.85rem] text-[#FFAD08] text-shadow  md:text-6xl">
                            Customized Solutions to Kickstart Your Success
                        </h1>
                        <p className='text-lg md:text-xl'>
                            We offer tailored financing strategies to boost your tech startup’s growth and achieve milestones with confidence.
                        </p>
                    </div>
                </div>
            </div>
            <div id="fourth" className='constant-spacing p-4 md:constant-spacing-md '>
                <div id="title" className='text-center mb-10'>
                    <h1 className=' text-[#FFAD08] font-bold text-[3rem] leading-[2.85rem] mb-3 text-shadow md:text-6xl'>Our Experts</h1>
                    <span className='max-w-sm text-lg text-white font-semibold md:text-xl'>Meet our dedicated team of professionals ensuring your funding process</span>
                </div>
                <div className="flex flex-col items-center gap-8 md:flex-row">
                    <div className="flex flex-col items-center justify-center bg-white bg-opacity-10 rounded-2xl aspect-square w-full max-w-full md:w-1/2 ">
                        <Image src={photo1} width={120} className='rounded-full aspect-square grayscale-image object-cover  mb-1' alt='mobile-phone ' />
                        <h1 className="font-semibold text-[2rem] leading-[2.55rem] mb-[0.1rem] text-white">Peter Larson</h1>
                        <span className='font-regular text-lg text-white'>CEO</span>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-white bg-opacity-10 rounded-2xl aspect-square w-full max-w-full md:w-1/2 ">
                        <Image src={photo2} width={120} className='rounded-full aspect-square grayscale-image object-cover  mb-1' alt='mobile-phone ' />
                        <h1 className="font-semibold text-[2rem] leading-[2.55rem] mb-[0.05rem]  text-white">Samantha Brown</h1>
                        <span className='font-regular text-lg  text-white'>CFO</span>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-white bg-opacity-10 rounded-2xl aspect-square w-full max-w-full md:w-1/2">
                        <Image src={photo4} width={120} className='rounded-full aspect-square grayscale-image object-cover  mb-1' alt='mobile-phone ' />
                        <h1 className="font-semibold text-[2rem] leading-[2.55rem] mb-[0.15rem]  text-white">Jonathan Hill</h1>
                        <span className='font-regular text-lg text-white'>Operations Manager</span>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-white bg-opacity-10 rounded-2xl aspect-square w-full max-w-full md:w-1/2">
                        <Image src={photo3} width={120} className='rounded-full aspect-square grayscale-image object-cover  mb-1' alt='mobile-phone ' />
                        <h1 className="font-semibold text-[2rem] leading-[2.85rem] mb-[0.15rem]  text-white">Jenny Smith</h1>
                        <span className='font-regular text-lg  text-white'>Marketing Manager</span>
                    </div>
                </div>
            </div>
            <div id="fifth" className='flex flex-col gap-4 items-center text-center constant-spacing p-4 md:constant-spacing-md '>
                <h1 className="font-bold text-[2.5rem] leading-[2.85rem] text-[#FFAD08] text-shadow md:text-6xl">
                    Ready, Set, Fund!
                </h1>
                <div className="">
                    <p className='max-w-xs w-full text-lg text-center text-white md:text-xl'>
                        Start your tech funding journey with us now and discover the power of seamless and effective financing solutions!
                    </p>
                </div>
                {/* <div className="flex flex-col gap-2 w-full  md:flex-row"  >
                <Link href={`/signup`}><button className="rounded-xl bg-[#F1A208] border-none p-[0.65rem] text-xl font-semibold w-full ">Sign Up</button></Link>
                    <Link href={`/signin`}><button className="rounded-xl bg-white border-none p-[0.65rem] text-xl font-semibold text-[#F1A208] w-full ">Sign In</button></Link>
                </div> */}
                <div className="flex flex-col gap-2 w-4/5 md:w-full md:flex-row "  >
                    <Link href={`/signup`} className='flex-1'>
                        <button className="rounded-xl bg-[#F1A208] border-none p-[0.65rem] text-xl font-semibold w-full">
                            Sign Up
                        </button>
                    </Link>
                    {/* <Link href={`/signin`} className='flex-1'> */}
                        <button onClick={() => checkIfUserIsloggedIn()} className="rounded-xl flex-1 bg-white border-none p-[0.65rem] text-xl font-semibold text-[#F1A208] w-full">
                            Sign In
                        </button>
                    {/* </Link> */}
                </div>
            </div>
            <footer className=" bg-black text-white flex flex-col items-center text-center gap-6 p-4 mb-0 ">
                <div id="socials" className='flex flex-row gap-5 w-fit '>
                    <Image src={twitter} className='aspect-square' width={40} alt='social link twitter' />
                    <Image src={instagram} className='aspect-square' width={40} alt='social link instagram' />
                    <Image src={twitch} className='aspect-square' width={40} alt='social link twitch' />
                </div>
                <span className='max-w-xs w-full text-lg text-center'>All Rights Reserved, Tech Financing Platform, 2023</span>
            </footer>
        </div>
    )
}

export default page