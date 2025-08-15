import { SignIn, SignUp } from '@clerk/clerk-react'
import React from 'react'

const Registerpage = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4 sm:p-6">
      <div className="w-full max-w-md">
        <SignUp signInUrl="/login" />
      </div>
    </div>
  )
}

export default Registerpage
