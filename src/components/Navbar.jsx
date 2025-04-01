import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, useAuth, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const {getToken} = useAuth()
    useEffect(() => {
      getToken().then(token=>console.log(token))
    }, [])
    
    return (
        <div className='w-full h-16 md:h-20 flex items-center justify-between'>
            {/* LOGO */}
            <NavLink to="/" className="mt-3">
                <img className='h-[150px] w-[150px]' src="/logo.png" alt="" w={32} h={32} />
            </NavLink>
            {/* mobile menu  */}
            <div className="md:hidden">
                {/* MOBILE BUTTON */}
                <div
                    className="cursor-pointer text-4xl"
                    onClick={() => setOpen((prev) => !prev)}
                >
                    {/* Change Hamburger Icon */}
                    {open ? "X" : "☰"}

                </div>
                <div
                    className={`w-full h-screen  flex flex-col items-center justify-center gap-8 font-medium text-lg absolute top-16 transition-all ease-in-out ${open ? "-right-0" : "-right-[100%]"
                        }`}
                >
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/">Trending</NavLink>
                    <NavLink to="/">Most Popular</NavLink>
                    <NavLink to="/">About</NavLink>
                    <NavLink to="/">
                        <button className='py-2 px-4 rounded-3xl bg-blue-800 text-white'>Login</button>
                    </NavLink>

                </div>
            </div>
            {/* desktop menu */}
            <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/">Trending</NavLink>
                <NavLink to="/">About</NavLink>
                <SignedOut>
                <NavLink to="/login">
                    <button className='py-2 px-4 rounded-3xl bg-[#61375e] text-white'>Login</button>
                </NavLink>
                    
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>

        </div>
    )
}

export default Navbar
