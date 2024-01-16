'use client'
export const dynamicParams = false;
import React, { useContext, useEffect, useState, CSSProperties } from 'react'
import MoonLoader from "react-spinners/ClipLoader";
import Image from 'next/image'
import Link from 'next/link'
import phone from '../../../../../public/images/samsung-galaxy-s21-ultra-5g-4.jpg'
// import phone from '../../public/images/photo1.jpeg'
import DeviceInfoSection from '@/components/Device Page/DeviceInfoSection'
import DeviceStoreInfoSection from '@/components/Device Page/DeviceStoreInfoSection'
import { useRouter } from 'next/router';
import { sethomePageNavIndex } from "@/redux/user";
import { useSelector, useDispatch } from "react-redux";
import { notFound } from 'next/navigation';
import { DataContext } from '@/utils/Context';
import { collection, addDoc, doc, setDoc, updateDoc, onSnapshot, getDoc, runTransaction } from "firebase/firestore";
import { database } from '@/firebaseConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setupAuthObserver } from "@/firebaseAuth";
import { fetchCurrentUserRealtimeData } from '../../../../../utils/utility'


const  page = ({ params }) => {
    const deviceID = params.id
    const [deviceData, setDeviceData] = useState({})
    const dispatch = useDispatch();
    const [deviceIndex, setDeviceIndex] = useState(0)
    const [isFinancedBtnClicked , setIsFinancedBtnClicked] = useState(false)
    const [user, setUser] = useState(null)
    const showArray = [<DeviceInfoSection deviceData={deviceData} itemID={params.id} addReview={addReview} user={user}/>, <DeviceStoreInfoSection retailerData={deviceData.retailerData}/>]
    console.log("deviceID ", deviceID)
    const [review, setReview] = useState('')
    const PRODUCTS_COLLECTION = 'Products';
    const { showProductImageModal } = useContext(DataContext)
    const dataCollectionReference = collection(database, 'Products');

    let [color, setColor] = useState("#ffffff");
    const [currentUserData, setCurrentUserData] = useState(undefined)
    // async function fetchDynamicData(itemId) {

    //     try {
    //         // Fetch data for the specific item using its ID
    //         const docRef = doc(dataCollectionReference, itemId);
    //         const docSnapshot = await getDoc(docRef);

    //         if (docSnapshot.exists()) {
    //             const data = docSnapshot.data();
    //             console.log("data ", data);

    //             // Assuming 'vendorsReference' contains the reference to the 'Retailers' collection
    //             const retailerDocRef = data.vendorsReference;

    //             // Fetch data from the 'Retailers' collection using the reference
    //             const retailerDocSnapshot = await getDoc(retailerDocRef);
    //             const retailerData = retailerDocSnapshot.data();

    //             // Combine the data and set it to state
    //             const mergedData = { id: docSnapshot.id, ...data, retailerData };
    //             setDeviceData(mergedData);
    //             console.log(mergedData);
    //         } else {
    //             // Handle the case where the item with the given ID does not exist
    //             console.error(`Item with ID ${itemId} not found.`);
    //         }
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     } 
    // }


    async function fetchDynamicData(itemId) {
        try {
            // Fetch data for the specific item using its ID
            const docRef = doc(dataCollectionReference, itemId);

            // Set up a real-time listener
            const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
                if (docSnapshot.exists()) {
                    const data = docSnapshot.data();
                    console.log("data ", data);

                    // Assuming 'vendorsReference' contains the reference to the 'Retailers' collection
                    const retailerDocRef = data.vendorsReference;

                    // Fetch data from the 'Retailers' collection using the reference
                    getDoc(retailerDocRef).then((retailerDocSnapshot) => {
                        const retailerData = retailerDocSnapshot.data();

                        // Combine the data and set it to state
                        const mergedData = { id: docSnapshot.id, ...data, retailerData };
                        setDeviceData(mergedData);
                        console.log(mergedData);
                    }).catch((error) => {
                        console.error('Error fetching retailer data:', error);
                    });
                } else {
                    // Handle the case where the item with the given ID does not exist
                    console.error(`Item with ID ${itemId} not found.`);
                }
            });

            // Return the unsubscribe function to stop listening when needed
            return unsubscribe;
        } catch (error) {
            console.error('Error setting up real-time listener:', error);
        }
    }
    async function getUserData(userID) {
        try {
            const userDocRef = doc(database, 'Users', userID);

            // Fetch initial data
            const initialSnapshot = await getDoc(userDocRef);
            const initialUserData = initialSnapshot.data();

            // Set initial data
            setCurrentUserData(initialUserData ? initialUserData.profilePicture || "" : "");

            // Set up real-time listener for changes
            const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
                const fetchedUserData = snapshot.data();

                console.log("user id from dynamic: ", fetchedUserData)
                setCurrentUserData(fetchedUserData);
            });

            // Cleanup the listener when the component unmounts or as needed
            return () => unsubscribe();
        } catch (error) {
            console.log('Error fetching data:', error, error.code, error.message);
        }
    }


    useEffect(() => {
        fetchDynamicData(deviceID)
        
    }, []);

   
    useEffect(() => {
        const authCallback = (user) => {
            if (user) {
                console.log('User is authenticated from HOME:', user);
                setUser(user.uid)
                getUserData(user.uid)
                // Perform actions for authenticated user
            } else {
                console.log('User is not authenticated from HOME.');
                // Perform actions for unauthenticated user
            }
        };

        // Set up the auth observer
        setupAuthObserver(authCallback);

        return () => {
            // Clean up the observer when the component is unmounted
        };
    }, []);
    function getCurrentDateTime() {
        const currentDate = new Date();

        const day = currentDate.getDate().toString().padStart(2, '0');
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
        const year = currentDate.getFullYear().toString();

        const hours = currentDate.getHours().toString().padStart(2, '0');
        const minutes = currentDate.getMinutes().toString().padStart(2, '0');
        const seconds = currentDate.getSeconds().toString().padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }

    function generateRandomUserId() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const userIdLength = 10;
        let reviewID = '';

        for (let i = 0; i < userIdLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            reviewID += characters.charAt(randomIndex);
        }

        return reviewID;
    }

    async function addReview(productId, newReview) {
        const productDocRef = doc(dataCollectionReference, productId); // Replace 'yourFirestoreCollectionReference' with your actual reference
        console.log(productId, newReview, deviceData)
        try {
            // Get the current data of the document
            const productDocSnapshot = await getDoc(productDocRef);
            const productData = productDocSnapshot.data();

            // Update the reviews array
            const updatedReviews = [...productData.reviews, { userId: user, reviewID: generateRandomUserId() , review: newReview, date: getCurrentDateTime() }];

            // Update the Firestore document with the new reviews array
            await updateDoc(productDocRef, { reviews: updatedReviews });

            console.log('Review added successfully!');
            toast.success(`Review added successfully`);
            setReview('')
        } catch (error) {
            console.error('Error adding review:', error);
        }
    }

    console.log(user , "user in dynamic page")
    console.log("data dynamic in if", deviceData) 
    function formatNumberWithCommas(value) {
        // Check if value is defined and not null
        if (value !== undefined && value !== null) {
            // Convert the number to a string
            let numberString = value.toString();

            // Use a regular expression to add commas
            numberString = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            return numberString;
        }

        // Return a default value or handle the case when value is undefined or null
        return "N/A";
    }


    function roundUpToNearestHundred(number) {
        return Math.ceil(number / 100) * 100;
    }

    function calculateDateAfter30Days() {
        // Get the current date
        const currentDate = new Date();

        // Calculate the date 30 days from now
        const futureDate = new Date();
        futureDate.setDate(currentDate.getDate() + 30);

        // Format the dates if needed
        const formattedCurrentDate = currentDate.toDateString();
        const formattedFutureDate = futureDate.toDateString();

        return {
            currentDate: formattedCurrentDate,
            futureDate: formattedFutureDate,
        };
    }

    async function updateProductData(productId) {
        setIsFinancedBtnClicked(true);
        const deviceDataObject = deviceData;

        try {
            // Get the reference to the product document
            const productDocRef = doc(database, 'Products', productId);

            // Start a transaction
            await runTransaction(database, async (transaction) => {
                // Get the current product data
                const productDocSnapshot = await transaction.get(productDocRef);
                const productData = productDocSnapshot.data();

                if (deviceDataObject.productQtyInStock !== 0) {
                    // Update the product quantity in stock
                    delete deviceDataObject.reviews;
                    delete deviceDataObject.productQtyInStock;
                    const updatedProductData = { ...productData, productQtyInStock: deviceDataObject.productQtyInStock - 1 };
                    // Update the product document
                    transaction.update(productDocRef, updatedProductData);
                } else {
                    toast.error(`Failed to add Item to Cart`);
                    setIsFinancedBtnClicked(false);
                    return; // Exit the transaction early if the quantity is zero
                }
            });

            // Get the reference to the other document (assuming its ID is stored in 'otherDocumentId')
            const currentUserRef = doc(database, 'Users', `${user}`);

            // Get the current data from the other document
            const currentUserDataSnapshot = await getDoc(currentUserRef);
            const currentUserData = currentUserDataSnapshot.data();

            // Modify the cartItems array
            const updatedCartItems = [...currentUserData.cartItems, deviceDataObject];

            // Update the cartItems array in the other document
            const updatedUserData = { ...currentUserData, cartItems: updatedCartItems };
            await updateDoc(currentUserRef, updatedUserData);

            toast.success(`Item Added to Cart`);
            setIsFinancedBtnClicked(false);

        } catch (error) {
            console.error('Error updating product data:', error);
            toast.error(`Failed to add Item to Cart ${error.message}`);
            setIsFinancedBtnClicked(false);
        }
    }




    return (
        <div id="product_description" className='svh-minHeight flex flex-col w- gap-5  bg-[#005377]  py-4 px-5 border border-red-800 text-white'>

            <div id="left-center" className='flex gap-2  items-center'>
                <div id="left" className='w-fit '>
                    <Image src={phone} alt='item-photo' width={140} className='rounded-md aspect-square lg:w-40 object-fill' />
                </div>
                <div id="center" className='text-sm'>
                    <span>
                        <h2 className='font-semibold text-md md:text-2xl lg:text-5xl mb-3 inline'>{deviceData?.name}</h2>
                    </span>
                    <div className='flex flex-col justify-between items-center md:flex-row border border-black'>
                        <div id="center-left" className='flex flex-col  md:mr-5 mb-4'>
                            <div className="flex gap-2  md:text-2xl ">
                                <span className='capitalize'>Price: </span>
                                <span className='font-bold'>₦{formatNumberWithCommas(deviceData?.price)}</span>
                            </div>
                                <div className="flex gap-2 md:text-2xl ">
                                    <span className='capitalize'>Price per/Month: </span>
                                    <span className='font-bold'>₦{formatNumberWithCommas(roundUpToNearestHundred(deviceData?.price / deviceData?.retailerData?.storeInstallmentPeriod))}</span>
                                </div>
                                <div className="flex gap-2 md:text-2xl ">
                                    <span className='capitalize'>Duration:</span>
                                    <span className='font-bold'>{deviceData?.retailerData?.storeInstallmentPeriod} Months</span>
                                </div>
                            <div className="flex gap-2 md:text-2xl ">
                                <span className='capitalize'>Quantity:</span>
                                <span className='font-bold'>{deviceData?.productQtyInStock} pcs in stock</span>
                            </div>
                        </div>
                        <Link href={`/home`} onClick={() => dispatch(sethomePageNavIndex(1))}>
                            <div className="flex justify-center items-center text-center rounded-full w-fit p-2 px-2 font-bold  text-sm border border-white  cursor-pointer home md:text-xl self-end relative" >
                                Home
                                <div className="w-fit px-[0.35rem] bg-white text-[#005377] absolute -top-2 -right-2 rounded-full">
                                    {currentUserData?.cartItems?.length}
                                </div>
                            </div>
                        </Link>
                    </div>

                </div>
            </div>
            <div className="flex flex-col gap-2 w-md  rounded-md h-[70vh]  ">
                <div className="flex h-fit  text-white overflow-hidden gap-2 relative">
                    <button className='flex-1 p-2 px-4 border border-white  rounded-tl-md rounded-bl-md details-btn-left relative z-10' onClick={() => setDeviceIndex(0)}>Device Details</button>
                    <button className='flex-1 p-2 px-4 border border-white rounded-tr-md rounded-br-md details-btn-right relative z-10' onClick={() => setDeviceIndex(1)}>Store Details</button>
                </div>
                <div id='inf0-section' className="flex-1 h-full bg-white  flex overflow-y-auto flex-col w-full hide-scrollbar rounded-md text-[#005377] p-2">
                    {
                        showArray[deviceIndex]
                    }
                </div>
               {
                    deviceData.productQtyInStock !== 0 && (
                        <div className="flex h-fit  text-white overflow-hidden gap-2 relative">
                            <button className={`flex items-center justify-center gap-4 flex-1 p-2 px-4 border border-white  rounded-md  details-btn-left relative z-10 ${isFinancedBtnClicked ? 'opacity-30' : ""}`} disabled={isFinancedBtnClicked} onClick={() => updateProductData(deviceID)}>
                                Finance Item
                                <MoonLoader
                                    color={color}
                                    loading={isFinancedBtnClicked}
                                    size={20}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                />
                            </button>
                        </div>
                    )
               }
            </div>
        </div>
    )
}
export default page



