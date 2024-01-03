import { current } from "@reduxjs/toolkit";
import React, { useContext, useState } from "react";
import { setDoc, doc } from "firebase/firestore";
import { database } from "@/firebaseConfig";
import 'react-toastify/dist/ReactToastify.css';
import { throwMessage } from '@/utils/utility';
import { DataContext } from "@/utils/Context";

const FeedbackForm = ({ setSettingIndex }) => {
  const {user} = useContext(DataContext)
  const [curentUserId, setCurrentUserId] = useState(user.uid)
  const [sentUserFeedack, setSentUserFeedack] = useState(false);
    const [userFeedack, setUserFeed] = useState('')

  async function sendFeedbackWithUserEmail(curentUserId){
    console.log(curentUserId)
    setSentUserFeedack(true)
    try {
      console.log('RUNNING TRY')
      const customDocRef = doc(database, 'UserFeedback', `${curentUserId}`);
      await setDoc(customDocRef, { Feedback: userFeedack });
      throwMessage('Feedback-recorded')
      setUserFeed('')
      setSentUserFeedack(false)
      setSettingIndex(0)
    } catch (error) {
      throwMessage(error.message)
    }
  }
  return (
    <div className="flex flex-col min-h-full justify-center items-center">
      
    {
        sentUserFeedack ?
        (<span>Feedback has been recorded thanks. We would get back to you as soon as possible via email</span>) 
        :
        (
            <div className="w-full flex flex-col justify-between  h-[100vh] border-2 border-red-800">
                          <textarea placeholder= "Enter your feedback here" 
                          name="userQuery" 
                          id="userQuery" 
                          cols="30" 
                          rows="10" 
                          className="border border-black p-2 h-[80%]" 
                          maxLength="1000"
                          value={userFeedack} onChange={(e)=> setUserFeed(e.target.value)}></textarea>
                <button
                disabled={sentUserFeedack}
                onClick={() => sendFeedbackWithUserEmail(curentUserId)}
                    type="submit"
                              className="font-bold  bg-[#005377] text-xl text-white capitalize px-4 py-[0.55rem] rounded-lg relative float-right">
                    Send
                </button>
            </div>
        )
    }
      </div>
  );
};

export default FeedbackForm;


