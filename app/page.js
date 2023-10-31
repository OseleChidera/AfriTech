'use client'
import Image from 'next/image'
import React, { useState } from 'react';
import { auth } from '@/firebase/firebaseConfig'
import Landing from "./home/page"
import { database } from '../../firebase/firebaseConfig';
import { doc, getDoc } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";


export default function Home() {
  const user = auth.currentUser;
  const [pageindex, setPageIndex] = useState(0)
  const [userid, setUserId] = useState(null)
  const [data, setData] = useState({
    email: 'oselechidera560@gmail.com',
    password: '11111111',
    confirm_password: '11111111',
    firstName: 'Mustapha',
    lastName: 'JIMOH',
    Username: 'SSSSSS',
    Phone: '9012555781',
    address: '135 aransiol close oyaderan extate',
    passportnumber: 'a11111',
    image: null,
    ninnumber: '111111',
    image2: null,
    agreeToTerms: false
  })
  const User = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();

  if (typeof User !== null && User) {
    console.log('page' , User)
    
  }
  // const [user, setUser] = useState(auth.currentUser)
  return (
      <main className="flex min-h-screen max-h-fit h-full w-full flex-col items-center justify-center bg-[#005377] border ">
      
      <Landing />
        
    </main>
  )
}

















