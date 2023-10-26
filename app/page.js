'use client'
import Image from 'next/image'
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Signin from '@/components/auth/SigninC';

import { ToastContainer, toast } from 'react-toastify';
import { auth } from '@/firebase/firebaseConfig'
import Multistep from '@/components/auth/SignupC';
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import Landing from './home/page'

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
  // const [user, setUser] = useState(auth.currentUser)
  return (
    <Provider store={store}>
      <main className="flex min-h-screen max-h-fit h-full w-full flex-col items-center justify-center bg-[#005377] border constant-spacing">
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="colored"
      />
      {/* <Signin user={user} /> */}
        < Landing />
        
    </main>
    </Provider>
  )
}

















