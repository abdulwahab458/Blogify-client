import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { NavLink } from 'react-router-dom'
import Maincategories from '../components/Maincategories'
import Postlistpage from './Postlistpage'
import Featuredposts from '../components/Featuredposts'
import Postlist from '../components/Postlist'

const Homepage = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className=' mt-4 flex flex-col gap-4'>
        {/* BREADCRUMB */}
      {/* <div className="flex gap-4">
        <NavLink to="/">Home</NavLink>
        <span>•</span>
        <span className="text-blue-800">Blogs and Articles</span>
      </div> */}
      <div className="flex items-center justify-between">
      {/* INTRODUCTION  */}
          {/* titles */}
          <div className="">
          <h1 className="text-gray-100 text-3xl md:text-6xl lg:text-7xl font-extrabold text-center tracking-wide leading-tight drop-shadow-lg">
            Welcome to <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">Blogify</span>
          </h1>

          <p className="mt-6 text-lg md:text-2xl italic font-serif text-gray-300 text-center tracking-wide">
  "Words have power. Use them to <span className="text-blue-400 font-bold">inspire</span>,  
  <span className="text-pink-400 font-bold"> create</span>, and   
  <span className="text-purple-400 font-bold"> change the world</span>."
</p>

        </div>
        <NavLink 
          to="write" 
          className="hidden md:block relative group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Glowing background effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className="absolute inset-[-20px] bg-[#32012F] rounded-full blur-2xl opacity-20"></div>
            <div className="absolute inset-[-10px] bg-purple-500 rounded-full blur-xl opacity-10 animate-pulse-slow"></div>
          </div>

          {/* Rotating circle text */}
          <svg
            viewBox="0 0 200 200"
            width="200"
            height="200"
            className={`transition-all duration-1000 ease-out ${isHovered ? 'rotate-10 scale-105' : 'rotate-0 scale-100'}`}
          >
            <defs>
              <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fff" />
                <stop offset="50%" stopColor="#f0f0f0" />
                <stop offset="100%" stopColor="#fff" />
              </linearGradient>
            </defs>
            <path
              id="circlePath"
              fill="none"
              d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
              className="stroke-white/10"
              strokeWidth="1"
            />
            <text className="text-[14px] tracking-[0.2em]">
              <textPath href="#circlePath" startOffset="0%" className="fill-[url(#textGradient)]">
                Write your story • Share your idea •
              </textPath>
            </text>
          </svg>

          {/* Center button */}
          <button 
            className="cursor-pointer absolute top-0 left-0 right-0 bottom-0 m-auto w-20 h-20 rounded-full 
              bg-gradient-to-br from-[#32012F] to-[#4B0245] group-hover:from-[#4B0245] group-hover:to-[#32012F]
              flex items-center justify-center overflow-hidden transition-all duration-500"
          >
            {/* Button background effects */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-transparent to-purple-500/20 animate-shimmer"></div>
              <div className="absolute inset-0 bg-[#32012F] mix-blend-overlay"></div>
            </div>

            {/* Sparkles */}
            <div className="absolute inset-0">
              <span className="absolute h-1 w-1 bg-white rounded-full top-[20%] left-[20%] opacity-0 group-hover:animate-sparkle"></span>
              <span className="absolute h-1 w-1 bg-white rounded-full bottom-[20%] right-[20%] opacity-0 group-hover:animate-sparkle delay-100"></span>
              <span className="absolute h-1 w-1 bg-white rounded-full top-[50%] right-[20%] opacity-0 group-hover:animate-sparkle delay-200"></span>
            </div>

            {/* Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="40"
              height="40"
              className="relative z-10 transform transition-transform duration-500 group-hover:rotate-[45deg] group-hover:scale-110"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <line x1="6" y1="18" x2="18" y2="6" />
              <polyline points="9 6 18 6 18 15" />
            </svg>

            {/* Ripple effect */}
            <div className="absolute inset-0 group-hover:animate-ripple rounded-full border border-white/20"></div>
          </button>
        </NavLink>
      </div>
        {/* CATEGORIES */}
        <Maincategories/>
        {/* featured post  */}
        <Featuredposts/>
        {/* POST LIST */}
      <div className="">
        <h1 className="my-8 text-4xl text-gray-600">Recent Posts</h1>
        <Postlist/>
        
      </div>
    </div>
  )
}

export default Homepage
