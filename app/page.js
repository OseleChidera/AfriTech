'use client'
import Image from 'next/image'
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Signin from '@/components/auth/Signin';
import Signintwo from '@/components/auth/Signintwo';
import Signup from '@/components/auth/Signup';
import Signuptwo from '@/components/auth/Signuptwo';
import Sig from '@/components/auth/Formtwo';
import Formthreec from '@/components/auth/Formthreec'
import Terms from '@/components/auth/Terms';
import Multistep from '@/components/auth/Multistep';
import Testing from '@/components/auth/Test';
export default function Home() {
  const [user , setUser] = useState({})
  return (
    <main className="flex min-h-screen max-h-full h-full w-full flex-col items-center justify-center  overflow-hidden bg-blue-400 border">
      {/* <Testing/> */}
      <Signintwo user={user}  SetUser={setUser}/>
    </main>
  )
}

















