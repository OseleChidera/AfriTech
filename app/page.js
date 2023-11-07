'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react';
import { auth } from '@/firebase/firebaseConfig'
import Landing from "./home/welcome/page"
import { database } from '../firebase/firebaseConfig';
import { doc, getDoc } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
// import { useRouter } from 'next/router';

export default function Home() {
  const user = auth.currentUser;
  // const router = useRouter();
  const valueObj = useSelector((state) => state.user.valueObj);
  const dispatch = useDispatch();

  useEffect(()=>{
    // if (valueObj.email && valueObj.Username) {
    //   router.push('/home');
    // }
    // else{
    //   console.log('NOT FOUND')
    // }
  }, [valueObj])
  return (
      <main className="flex min-h-screen max-h-fit h-full w-full flex-col items-center justify-center bg-[#005377] border ">
      
      <Landing />
        
    </main>
  )
}

















