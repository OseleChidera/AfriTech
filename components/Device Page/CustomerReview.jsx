import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import Image from 'next/image';
import deleteIcon from '../../public/icons/delete.svg'
import { onSnapshot, doc, getDoc, updateDoc } from 'firebase/firestore';
import { database, storage } from '@/firebaseConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CustomerReview = ({ reviewOBJ, user , id, data }) => {
    const [pfpUrl, setPfpUrl] = useState("")

    // async function getUserData() {
    //     try {
    //         const response = await axios.get(`https://firestore.googleapis.com/v1/projects/afritech-b3227/databases/(default)/documents/Users/${reviewOBJ.userId}`);
    //         const userData = response.data.fields;
    //         // console.log(userData); 
    //         if (pfpUrl !== "" && (pfpUrl !== userData.profilePicture.stringValue)) {
    //             return;
    //         }
    //         setPfpUrl(userData.profilePicture.stringValue);
    //     } catch (error) {
    //         console.log('Error fetching data:', error, error.code, error.message);
    //     }
    // }


    async function getUserData() {
        try {
            const userDocRef = doc(database, 'Users', reviewOBJ.userId);

            // Fetch initial data
            const initialSnapshot = await getDoc(userDocRef);
            const initialUserData = initialSnapshot.data();

            // Set initial data
            setPfpUrl(initialUserData ? initialUserData.profilePicture || "" : "");

            // Set up real-time listener for changes
            const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
                const updatedUserData = snapshot.data();

                // Check if updatedUserData is not undefined or if profilePicture is not defined
                if (!updatedUserData || (pfpUrl !== "" && pfpUrl !== updatedUserData.profilePicture)) {
                    return;
                }

                setPfpUrl(updatedUserData.profilePicture || "");
            });

            // Cleanup the listener when the component unmounts or as needed
            return () => unsubscribe();
        } catch (error) {
            console.log('Error fetching data:', error, error.code, error.message);
        }
    }


    


  
    async function deleteItemFromArray(productID, reviewItemID) {
        try {
            const docRef = doc(database, 'Products', 'YUYhY5bL6LOabW769k79');
            const documentData = await getDoc(docRef);

            if (documentData.exists()) {
                const reviewsArray = documentData.data().reviews;
                console.log(reviewsArray)

                // Filter out the review with the given reviewID
                const updatedReviews = reviewsArray.filter((review) => review.reviewID !== reviewItemID);
                console.log(updatedReviews)


                // Update the document with the modified reviews array
                await updateDoc(docRef, { reviews: updatedReviews });
                toast.success(`Review deleted successfully`);
                console.log('Review deleted successfully.');
            } else {
                console.error(`Product with ID ${productID} not found.`);
            }
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    }



    useEffect(()=>{
        console.log(user)
        getUserData()
    },[])

  return (
      <div className="flex items-center justify-between gap-2 p-1 rounded-sm border border-black relative">
                  <div id="Reviewer-Image-Div" className='border border-black w-[30px] h-[30px]'>
                      {pfpUrl !== "" ? (
                          <Image src={pfpUrl} alt='user-photo' width={100} height={100} className=' ' loading="lazy" />
                      ) : null}
                  </div>
                  <div className="flex flex-col border border-red-600 flex-1">
                      <span id='review' className='text-xs'>{reviewOBJ.review}</span>
                      <span className='text-[7px] text-[#005377]'>{reviewOBJ.date}</span>
                  </div>
                  {reviewOBJ.userId === user ? (
                      <div
                          id="deleteIcon-div"
                          className='border border-black w-[30px] h-[30px] relative right-0'
                          onClick={() => deleteItemFromArray(data.id, reviewOBJ.reviewID)}
                      >
                          <Image src={deleteIcon} alt='user-photo' width={100} height={100} className=' ' loading="lazy" />
                      </div>
                  ) : null}
              </div>

  )
}

export default CustomerReview