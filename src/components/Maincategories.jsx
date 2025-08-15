import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Search from './Search'

const Maincategories = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Desktop Categories */}
      <div className="hidden md:flex bg-black rounded-3xl xl:rounded-full p-3 shadow-lg items-center justify-center gap-5">
        {/* links */}
        <div className="flex-1 flex items-center justify-between flex-wrap gap-2">
            <NavLink to="/posts"
            className="bg-[#32012F] text-white rounded-full px-4 py-2 hover:bg-[#4a2a47] transition-colors">
                All Posts
            </NavLink>
            <NavLink to="/posts?cat=web-design"
            className="hover:bg-[#61375e] hover:text-white rounded-full px-4 py-2 transition-colors">
                Web Design
            </NavLink>
            <NavLink to="/posts?cat=development"
            className="hover:bg-[#61375e] hover:text-white rounded-full px-4 py-2 transition-colors">
                Development
            </NavLink>
            <NavLink to="/posts?cat=database"
            className="hover:bg-[#61375e] hover:text-white rounded-full px-4 py-2 transition-colors">
                Database
            </NavLink>
            <NavLink to="/posts?cat=seo"
            className="hover:bg-[#61375e] hover:text-white rounded-full px-4 py-2 transition-colors">
                Search Engines
            </NavLink>
            <NavLink to="/posts?cat=marketing"
            className="hover:bg-[#61375e] hover:text-white rounded-full px-4 py-2 transition-colors">
                Marketing
            </NavLink>
        </div>
        <span className="text-xl font-medium">|</span>
        {/* search  */}
        <Search/>
      </div>

      {/* Mobile Categories */}
      <div className="md:hidden">
        {/* Mobile Search */}
        <div className="mb-4">
          <Search/>
        </div>
        
        {/* Mobile Categories Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-black text-white rounded-2xl p-3 flex items-center justify-between hover:bg-gray-800 transition-colors"
        >
          <span className="font-medium">Categories</span>
          <span className="text-xl">{isOpen ? '−' : '+'}</span>
        </button>
        
        {/* Mobile Categories Dropdown */}
        {isOpen && (
          <div className="mt-2 bg-black rounded-2xl p-4 space-y-2">
            <NavLink 
              to="/posts"
              className="block bg-[#32012F] text-white rounded-full px-4 py-2 text-center hover:bg-[#4a2a47] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              All Posts
            </NavLink>
            <NavLink 
              to="/posts?cat=web-design"
              className="block hover:bg-[#61375e] hover:text-white rounded-full px-4 py-2 text-center transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Web Design
            </NavLink>
            <NavLink 
              to="/posts?cat=development"
              className="block hover:bg-[#61375e] hover:text-white rounded-full px-4 py-2 text-center transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Development
            </NavLink>
            <NavLink 
              to="/posts?cat=database"
              className="block hover:bg-[#61375e] hover:text-white rounded-full px-4 py-2 text-center transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Database
            </NavLink>
            <NavLink 
              to="/posts?cat=seo"
              className="block hover:bg-[#61375e] hover:text-white rounded-full px-4 py-2 text-center transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Search Engines
            </NavLink>
            <NavLink 
              to="/posts?cat=marketing"
              className="block hover:bg-[#61375e] hover:text-white rounded-full px-4 py-2 text-center transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Marketing
            </NavLink>
          </div>
        )}
      </div>
    </div>
  )
}

export default Maincategories
