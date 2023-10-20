import React, { useState , useRef} from 'react'
import { auth } from '@/firebase/firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import Link from 'next/link'
const Signin = () => {
    const [email, setEmail] = useState('')
    const [password1, setPassowrd1] = useState('')
    const [password2, setPassowrd2] = useState('')
    const [showPassowrd1, setShowPassword1] = useState(false)
    const [showPassowrd2, setShowPassword2] = useState(false)
    const [passwordAreTheSame, setPasswordAreTheSame] = useState(false)


    const handleInputs = (e) => {
        setEmail((email) => e.target.value)
    };

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const isSubmitting = (e) => {
        e.preventDefault();
        setShowPassword1(false);
        setShowPassword2(false);





        if (password1.trimEnd() !== password2.trimEnd() && validateEmail(email)) {
            setPasswordAreTheSame((passwordAreTheSame)=>false)
            console.log('diffeent passwords',passwordAreTheSame ,password1 , password2)
            return;
        }
        setPasswordAreTheSame((passwordAreTheSame) => true)

            console.log('same passwords', passwordAreTheSame, password1, password2)
    createUserWithEmailAndPassword(auth, email, password1)
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
            <h1 className='font-bold text-6xl capitalize mb-3 text-shadow-md '>Sign Up</h1>
            <h1 className='font-extrabold capitalize text-base mb-4'>
                Hi there,welcome to AfriTech! 👋
            </h1>
            <form onSubmit={(e) => isSubmitting(e)} >
                <div id='field-section' className="mb-3">
                    <label className='font-bold capitalize block mb-[0.25rem]' for="email">Email : </label>
                    <input
                        id='email'
                        type="email"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        onClick={() => {setShowPassword1(showPassowrd1 => false), setShowPassword2(showPassowrd2 => false )} }
                        //   onBlur={handleBlur}
                        value={email}
                        placeholder='Enter your E-mail'
                        className={`rounded-lg p-[0.35rem] indent-2 w-full`}


                    />
                    <h5 className='text-red-700 text-xs font-semibold'>Unrecognised Email format</h5>

                </div>
                <div id='field-section'  className="mb-3">
                    <label className='font-bold capitalize block mb-[0.25rem]' for="password1">Password : </label>
                    <span className='flex flex-row items-center'>
                        <input
                            id='password1'
                            type={showPassowrd1 ? 'text' : 'password'}
                            name="password"
                            onChange={(e) => setPassowrd1(e.target.value)}
                            onBlur={() => setShowPassword1(showPassowrd1 => false)}
                            value={password1}
                            placeholder='Enter your password min 8 characters'
                            className={`rounded-lg p-[0.35rem] indent-2 w-full x`}
                            pattern='[a-z0-9]{8,}'
                            onClick={() => setShowPassword2(showPassowrd2 => false)}

                        />
                        
                        <button type='button' onClick={() => setShowPassword1(showPassowrd1 => !showPassowrd1)} className='bg-transparent border-none absolute right-10 z-10'>
                            <img width="18" height="18" src="https://img.icons8.com/ios/50/show-password.png" alt="show-password" />
                        </button>
                    </span>
                    <h5 className='text-red-700 text-xs font-semibold'>Digits or letters , min 8 characters</h5>
                </div>
                <div id='field-section' className="mb-3">
                    <label className='font-bold capitalize block mb-[0.25rem]' for="password2">Confirm Password : </label>
                    <span className='flex flex-row items-center'>
                        <input
                            id='password2'
                            type={showPassowrd2 ? 'text' : 'password'}
                            name="password"
                            onChange={(e) => setPassowrd2(e.target.value)}
                            onBlur={() => setShowPassword2(showPassowrd2 => false)}
                            value={password2}
                            placeholder='Re-enter your password min 8 characters' 
                            className={`rounded-lg p-[0.35rem] indent-2 w-full`}
                            pattern='[a-z0-9]{8,}'
                            onClick={() => setShowPassword1(showPassowrd1 => false)}
                            />
                        <button type='button' onClick={() => { setShowPassword2(showPassowrd2 => !showPassowrd2), setShowPassword1(showPassowrd1 => !showPassowrd1) }} className='bg-transparent absolute right-10 z-10'>
                            <img width="18" height="18" src="https://img.icons8.com/ios/50/show-password.png" alt="show-password" /></button>
                    </span>
                    <h5 className='text-red-700 text-xs font-semibold'>Digits or letters , min 8 characters</h5>

                </div>
                <div className="flex flex-row justify-between items-center">
                    <Link href={`/signin`} className='underline text-white' >Or Signin</Link>
                    <button
                        type="submit"
                        onClick={isSubmitting}
                        className='font-bold capitalize bg-blue-500 text-white capitalize px-[0.5rem] py-[0.35rem] rounded-lg '>
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Signin