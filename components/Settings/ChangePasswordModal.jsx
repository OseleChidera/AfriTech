import React from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { throwMessage } from '@/utils/utility';
import { auth } from '@/firebaseConfig';
import { redirect } from "next/navigation";
const ChangePasswordModal = ({ closeResetPasswordModal }) => {
    
    async function sendPasswordResetEmail(){
        const confirmationAlert = window.confirm("Are you really sure you want to reset your password?")
        if (confirmationAlert) {
            
            closeResetPasswordModal()
            try {
                await auth.signOut();
                // window.location.href = "/signin";
                localStorage.removeItem('afriTechUserID')
                throwMessage("logout successful")
                redirect("/signin");
            } catch (error) {
                console.error('Error during logout:', error.message);
            }
        }
        else{
            throwMessage('logout failed')
        }

    }
  return (
      <div id="imageModal" className="flex flex-col justify-center items-center svh-minHeight  w-full   bg-[#00537788] border py-4 px-5 border-1 border-red-800 gap-10 z-20 pointer-events-auto absolute" onClick={closeResetPasswordModal}>
          <div className="flex flex-col items-center gap-5 w-4/5 h-4/5 p-8 bg-white text-[#00537788] rounded-lg" onClick={(e) => e.stopPropagation()}>
              <h1 className='text-4xl font-extrabold text-center'>Are you sure you want to reset your password?</h1>
              <span className='text-xxl font-extrabold text-center'>A link to reset your password would be sent to the email linked to this account.</span>
              
              <div className="flex flex-row gap-8">
                  <button className='py-2 px-4 border border-[#00537788] rounded-md text-2xl font0bols destructiveAction' onClick={sendPasswordResetEmail}>Yes</button>
                  <button className='py-2 px-4 border border-[#00537788] rounded-md text-2xl font0bols ' onClick={closeResetPasswordModal}>No</button>
              </div>
          </div>
      </div >
  )
}

export default ChangePasswordModal




   


