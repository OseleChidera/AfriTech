import Image from 'next/image'
import React, { useState, useEffect, useContext } from 'react'
import { collection, addDoc, doc, setDoc, updateDoc, onSnapshot, getDoc } from "firebase/firestore";
import { database } from '@/firebase/firebaseConfig'
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "@/redux/user";
import UserInfoUpdateComponent from './UserInfoUpdateComponent';
import arrowRight from "../../public/icons/arrow-right.svg"
import { DataContext } from '@/utils/Context';
import { ToastContainer, toast } from "react-toastify";
import { throwMessage } from "@/utils/utility";


const UserDetailsSetting = ({ setSettingIndex }) => {

    const { showProfilePictureUpdateModalFn, showChangeEmailModalFn } = useContext(DataContext)
    const userData = useSelector((state) => state.user.userData);

    const userIdFromLocalStorage = localStorage.getItem('afriTechUserID') ? JSON.parse(localStorage.getItem('afriTechUserID')) : null

    const [formEntries, setFormEntries] = useState({
        // Email: userData.email.stringValue,
        firstname: userData.firstname.stringValue,
        Lastame: userData.lastname.stringValue,
        Username: userData.Username.stringValue,
        Phone_Number: userData.Phone.stringValue,
        Home_Address: userData.address.stringValue,
        BVN_Number: userData.bvnnumber.stringValue,
        Nin_Number: userData.ninnumber.integerValue,
        verified: userData.agreeToTerms.booleanValue
    })


    async function handleInputChange(key, value) {
        setFormEntries((prevEntries) => ({
            ...prevEntries,
            [key]: value,
        }));
        const docRef = doc(database, "Users", `${userIdFromLocalStorage}`);
        console.log(docRef)
        try {
            console.log(docRef)
            await updateDoc(docRef, { [key]: value })
            console.log(formEntries)
            toast.success(`${key} value Update completed successfully`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });
            console.log('Document Update completed successfully')

        } catch (error) {
           toast.error(`${key} value failed to Update. Refresh and retry.`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });
            console.log('Failed to updateDocument')
            console.log(error)
        }
    }

    return (
        <div className='border-10 border-red-700' >

            <div id="nav" className='flex flex-row justify-between mb-4'>
                <button onClick={() =>  setSettingIndex(0) } className='border border-black px-4 text-lg py-2 rounded-md capitalize text-[#005377] text-bold'>back</button>
                <button onClick={() =>  setSettingIndex(0) } className='border border-black px-4 text-lg py-2 rounded-md capitalize text-[#005377] text-bold'>save</button>
            </div>
            <main className=' max-w-full flex flex-col gap-5 mb-10'>
                <div className="flex justify-between items-center w-[95%] mx-auto p-2 py-4 box-shadow rounded-md user-setting-item bank"
                    onClick={() => showChangeEmailModalFn()}
                >
                    <span>Change E-mail</span>
                    <Image src={arrowRight} alt='right arrow' width={25} height={25} />
                </div>
                {
                    Object.keys(formEntries).map((key, index) => {
                        const modifiedKey = key.replace(/_/g, ' ').toLowerCase();

                        return <UserInfoUpdateComponent SettingKey={key} title={modifiedKey} value={formEntries[key]} index={index} handleInputChange={handleInputChange} />
                    })
                }
                <div className="flex justify-between items-center w-[95%] mx-auto p-2 py-4 box-shadow rounded-md user-setting-item bank"
                    onClick={() => showProfilePictureUpdateModalFn()}
                >
                    <span> Change profile picture</span>
                    <Image src={arrowRight} alt='right arrow' width={25} height={25}/>
                </div>
    
            </main>
        </div>
    )
}

export default UserDetailsSetting