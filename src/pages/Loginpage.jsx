import { SignIn } from '@clerk/clerk-react'
import React from 'react'

const Loginpage = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4 sm:p-6">
      <div className="w-full max-w-md">
        <SignIn signUpUrl="/register"/>
      </div>
    </div>
  )
}

export default Loginpage
