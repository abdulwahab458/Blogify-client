import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { format } from 'timeago.js'

const Postlistitem = ({post}) => {
  const [isHovered, setIsHovered] = useState(false);

  // If post is undefined or null, return nothing
  if (!post) {
    return null;
  }

  return (
    <div 
      className='group relative bg-gradient-to-br bg-[#b3a3ce] hover:bg-white rounded-xl sm:rounded-2xl overflow-hidden transform transition-all duration-500 ease-out hover:-translate-y-1 sm:hover:-translate-y-2 mb-6 sm:mb-8 mx-2 sm:mx-4 md:mx-6 lg:mx-8'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        boxShadow: isHovered ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)' : '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
      }}
    >
      {/* Floating Category Badge */}
      <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10">
        <span className="px-2 sm:px-4 py-1 sm:py-2 bg-[#560651] text-white rounded-full text-xs sm:text-sm font-medium
          transform transition-all duration-300 hover:scale-110 hover:bg-blue-600">
          {post.category || 'Uncategorized'}
        </span>
      </div>

      {/* Image Section with Overlay */}
      {post.img && (
        <div className="relative w-full h-[200px] sm:h-[250px] md:h-[300px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-[1]" />
          <img 
            src={post.img} 
            alt={post.title || 'Post image'}
            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
          />
          {/* Floating Date Badge */}
          <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 z-[2] bg-white/90 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full">
            <span className="text-xs sm:text-sm text-gray-700">{format(post.createdAt)}</span>
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
        {/* Title with animated underline */}
        <NavLink 
          to={`/${post.slug || ''}`}
          className="block group/title"
        >
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2 relative inline-block">
            {post.title || 'Untitled Post'}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#6f0368] transition-all duration-300 group-hover/title:w-full"></span>
          </h2>
        </NavLink>

        {/* Author Section */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#a2649e] flex items-center justify-center">
            <span className="text-blue-500 font-semibold text-sm sm:text-base">
              {post.user?.username[0].toUpperCase() || 'A'}
            </span>
          </div>
          <div className="flex flex-col">
            <NavLink 
              to={`/posts?author=${post.user?.username || ''}`}
              className="text-xs sm:text-sm font-medium text-gray-700 hover:text-[#900a87] transition-colors"
            >
              {post.user?.username || 'Anonymous'}
            </NavLink>
            <span className="text-xs text-gray-500">Author</span>
          </div>
        </div>

        {/* Description with line clamp */}
        <p className="text-gray-600 line-clamp-3 text-sm sm:text-base leading-relaxed">
          {post.desc || 'No description available.'}
        </p>

        {/* Animated Read More Button */}
        <NavLink 
          to={`/${post.slug || ''}`}
          className="inline-flex items-center space-x-2 bg-[#6f0368] text-white px-4 sm:px-6 py-2 rounded-lg
            transform transition-all duration-300 hover:bg-[#5b3260] hover:scale-105 group/button"
        >
          <span className="text-sm sm:text-base">Read Article</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-3 w-3 sm:h-4 sm:w-4 transform transition-transform duration-300 group-hover/button:translate-x-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </NavLink>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 -mt-3 -mr-3 w-16 h-16 sm:w-24 sm:h-24 bg-blue-500/10 rounded-full blur-2xl transform transition-all duration-500 group-hover:scale-150 group-hover:opacity-50" />
      <div className="absolute bottom-0 left-0 -mb-3 -ml-3 w-16 h-16 sm:w-24 sm:h-24 bg-purple-500/10 rounded-full blur-2xl transform transition-all duration-500 group-hover:scale-150 group-hover:opacity-50" />
    </div>
  )
}

export default Postlistitem
