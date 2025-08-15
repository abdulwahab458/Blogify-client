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
        <div className='w-full h-16 md:h-20 flex items-center justify-between relative'>
            {/* LOGO */}
            <NavLink to="/" className="mt-3">
                <img className='h-[80px] w-[80px] sm:h-[100px] sm:w-[100px] md:h-[120px] md:w-[120px] lg:h-[150px] lg:w-[150px]' src="/logo.png" alt="Blogify Logo" />
            </NavLink>
            
            {/* mobile menu  */}
            <div className="md:hidden">
                {/* MOBILE BUTTON */}
                <button
                    className="cursor-pointer text-2xl sm:text-3xl p-2 hover:bg-gray-100/10 rounded-lg transition-colors"
                    onClick={() => setOpen((prev) => !prev)}
                    aria-label="Toggle mobile menu"
                >
                    {open ? "✕" : "☰"}
                </button>
                
                {/* Mobile Menu Overlay */}
                {open && (
                    <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setOpen(false)} />
                )}
                
                {/* Mobile Menu */}
                <div
                    className={`fixed top-16 left-0 right-0 h-screen bg-[#0C1844] z-50 transform transition-transform duration-300 ease-in-out ${
                        open ? 'translate-x-0' : 'translate-x-full'
                    }`}
                >
                    <div className="flex flex-col items-center justify-center gap-6 h-full font-medium text-lg">
                        <NavLink 
                            to="/" 
                            className="text-white hover:text-blue-400 transition-colors"
                            onClick={() => setOpen(false)}
                        >
                            Home
                        </NavLink>
                        <NavLink 
                            to="/posts" 
                            className="text-white hover:text-blue-400 transition-colors"
                            onClick={() => setOpen(false)}
                        >
                            All Posts
                        </NavLink>
                        <NavLink 
                            to="/" 
                            className="text-white hover:text-blue-400 transition-colors"
                            onClick={() => setOpen(false)}
                        >
                            Trending
                        </NavLink>
                        <NavLink 
                            to="/" 
                            className="text-white hover:text-blue-400 transition-colors"
                            onClick={() => setOpen(false)}
                        >
                            About
                        </NavLink>
                        <SignedOut>
                            <NavLink to="/login" onClick={() => setOpen(false)}>
                                <button className='py-3 px-6 rounded-3xl bg-[#61375e] text-white hover:bg-[#4a2a47] transition-colors'>
                                    Login
                                </button>
                            </NavLink>
                        </SignedOut>
                        <SignedIn>
                            <div onClick={() => setOpen(false)}>
                                <UserButton />
                            </div>
                        </SignedIn>
                    </div>
                </div>
            </div>
            
            {/* desktop menu */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8 xl:gap-12 font-medium">
                <NavLink to="/" className="text-white hover:text-blue-400 transition-colors">Home</NavLink>
                <NavLink to="/posts" className="text-white hover:text-blue-400 transition-colors">All Posts</NavLink>
                <NavLink to="/" className="text-white hover:text-blue-400 transition-colors">Trending</NavLink>
                <NavLink to="/" className="text-white hover:text-blue-400 transition-colors">About</NavLink>
                <SignedOut>
                    <NavLink to="/login">
                        <button className='py-2 px-4 lg:px-6 rounded-3xl bg-[#61375e] text-white hover:bg-[#4a2a47] transition-colors'>
                            Login
                        </button>
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
