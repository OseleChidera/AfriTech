import React, { useState } from 'react'
import Image from 'next/image'
import { auth } from '@/firebase/firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import Link from 'next/link'
const Signin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassowrd] = useState('')
    const [showPassowrd, setShowPassowrd] = useState(false)

    const handleInputs = (e) => {
        setUsername((username) => e.target.value)
    };

    const isSubmitting = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential)
                // Signed in 
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                console.log(error)
                const errorCode = error.code;
                const errorMessage = error.message;
            });

    }
    return (
        <div className='max-w-xs w-full' >
            <h1 className='font-bold text-7xl capitalize mb-3 text-shadow-md '>Sign In</h1>
            <h1 className='font-extrabold capitalize text-xl mb-4'>
                Hi, welcome Back! 👋
            </h1>
            <form onSubmit={(e) => isSubmitting(e)} >
                <div className="mb-3">
                    <label className='font-bold capitalize block mb-[0.25rem]' for="email">Email : </label>
                    <input
                        id='email'
                        type="email"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        onClick={() => setShowPassowrd(showPassowrd => false)}
                        //   onBlur={handleBlur}
                        value={email}
                        placeholder='Enter your E-mail'
                        className='rounded-lg p-[0.35rem] indent-2 w-full'
                        required={true}
                    />
                </div>
                <div className="mb-3">
                    <label className='font-bold capitalize block mb-[0.25rem]' for="password">Password : </label>
                    <span className='flex flex-row items-center'>
                        <input
                            id='password'
                            type={showPassowrd ? 'text' : 'password'}
                            name="password"
                            onChange={(e) => setPassowrd(e.target.value)}
                            onBlur={() => setShowPassowrd(showPassowrd => false)}
                            value={password}
                            placeholder='Enter your password'
                            className='rounded-lg p-[0.35rem] indent-2 w-full'
                            required={true}

                        />
                        <button type='button' onClick={() => setShowPassowrd(showPassowrd => !showPassowrd)} className='bg-transparent border-none absolute right-10 z-10'>
                            <img width="22" height="22" src="https://img.icons8.com/ios/50/show-password.png" alt="show-password" /></button>
                    </span>
                </div>
               <div className="flex flex-row justify-between items-center">
                <Link href={`/signup`} className='underline text-white' >Or SignUp</Link>
                    <button 
                    type="submit" 
                    onClick={isSubmitting} 
                    className='font-bold capitalize bg-blue-500 text-white capitalize px-[0.5rem] py-[0.35rem] rounded-lg '>
                        
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Signin