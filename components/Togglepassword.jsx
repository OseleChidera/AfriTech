import React from 'react'

const Togglepassword = ({ setShowPassword1, showPassowrd1 }) => {
  return (
      <button type='button' onClick={() => setShowPassword1((showPassowrd1) => !showPassowrd1)} className='bg-transparent  absolute right-2 z-10 border border-red-700' >
          <img width="18" height="18" src="https://img.icons8.com/ios/50/show-password.png" alt="show-password" />
      </button>
  )
}

export default Togglepassword