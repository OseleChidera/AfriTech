import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { collection, addDoc, doc, setDoc, updateDoc, onSnapshot, getDoc } from "firebase/firestore";
import { database } from '@/firebase/firebaseConfig'
import { useSelector, useDispatch } from "react-redux";
import UserProfileSettingInputs from './UserProfileSettingInputs';


const UserProfileSetting = ({ setSettingIndex }) => {
    const userObject = useSelector((state) => state.user.userData);
    const storedUserData = localStorage.getItem('afriTechUserID');

    const data = storedUserData ? JSON.parse(storedUserData) : null

    const [formEntries, setFormEntries] = useState({
        Email: userObject.email.stringValue,
        Firstname: userObject.firstname.stringValue,
        Lastame: userObject.lastname.stringValue,
        Username: userObject.Username.stringValue,
        Phone_Number: userObject.Phone.stringValue,
        Home_Address: userObject.address.stringValue,
        BVN_Number: userObject.bvnnumber.stringValue,
        Nin_Number: userObject.ninnumber.integerValue,
        verified: userObject.agreeToTerms.booleanValue
    })


    async function handleInputChange(key, value) {
        // setSettingIndex(0)

        setFormEntries((prevEntries) => ({
            ...prevEntries,
            [key]: value,
        }));
        const docRef = doc(database, "Users", `${data.userID}`);
        console.log(docRef)
        try {
            console.log(docRef)
            await updateDoc(docRef, { [key]: value })
            console.log(formEntries)
            console.log('Document Update completed successfully')

        } catch (error) {
            console.log('Failed to updateDocument')
            console.log(error)
        }
    }
    async function ApiReq() {
        const docRef = doc(database, "Users", `${data.userID}`);
        console.log(docRef)
        try {
            console.log(docRef)
            await updateDoc(docRef, formEntries)
            await updateDoc(docRef, { [fieldName]: newValue })
            console.log(formEntries)
            console.log('Document Update completed successfully')

        } catch (error) {
            console.log('Failed to updateDocument')
            console.log(error)
        }



    }

    return (

        <div className='' >
            <div id="nav" className='flex flex-row justify-between mb-4'>
                <button onClick={() => { setSettingIndex(0) }} className='border border-black px-4 text-lg py-2 rounded-md capitalize text-[#005377] text-bold'>back</button>
                <button onClick={() => { setSettingIndex(0) }} className='border border-black px-4 text-lg py-2 rounded-md capitalize text-[#005377] text-bold'>save</button>
            </div>
            <main className=' max-w-full flex flex-col gap-5 mb-10'>
                {
                    Object.keys(formEntries).map((key, index) => {
                        const modifiedKey = key.replace(/_/g, ' ').toLowerCase();

                        return <UserProfileSettingInputs SettingKey={key} title={modifiedKey} value={formEntries[key]} index={index} handleInputChange={handleInputChange} />
                    })
                }
            </main>
            {/* <div id="bottom" className='border border-black'>
          <button onClick={() => ApiReq()} className='border border-black px-3 py-2 rounded-md capitalize text-[#005377] text-bold w-full'>save</button>
            </div> */}
        </div>
    )
}

export default UserProfileSetting