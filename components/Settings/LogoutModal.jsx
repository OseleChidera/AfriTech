import React from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { throwMessage } from '@/utils/utility';
import { getAuth, signOut } from "firebase/auth";
const LogoutModal = ({ closeLogoutModal }) => {
    const auth = getAuth();
   async function logoutUser(){
        console.log("YES")
        
            const confirmationAlert = window.confirm("Are you really sure you want to logout?")
            if (confirmationAlert) {
               await signOut(auth)
                    .then(() => {
                        console.log("User signed out successfully.");
                        localStorage.removeItem('afriTechUserID')
                        closeLogoutModal()
                        throwMessage("logout successful")
                        window.location.href = "/signin";
                    })
                    .catch((error) => {
                        // An error happened.
                        console.error("Error signing out:", error);
                    });
                
                
            }
            else {
                throwMessage('logout aborted')
            }  

    }
  
  return (
      <div id="imageModal" className="flex flex-col justify-center items-center svh-minHeight  w-full   bg-[#00537788] border py-4 px-5 border-1 border-red-800 gap-10 z-20 pointer-events-auto absolute" onClick={closeLogoutModal}>
          <div className="flex flex-col items-center gap-5 w-4/5 h-4/5 p-8 bg-white text-[#00537788] rounded-lg" onClick={(e) => e.stopPropagation()}>
              <h1 className='text-4xl font-extrabold text-center'>Are you sure you want to logout?</h1>
              <div className="flex flex-row gap-8">
                  <button className='py-2 px-8 border border-[#00537788] rounded-md text-2xl fontbold destructiveAction' aria-label="Yes, logout" onClick={logoutUser}>Yes</button>
                  <button className='py-2 px-8 border border-[#00537788] rounded-md text-2xl fontbold ' aria-label="No, Abort logout" onClick={closeLogoutModal}>No</button>
              </div>
          </div>
      </div >
  )
}

export default LogoutModal




   


