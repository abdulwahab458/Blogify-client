import React from 'react'
import { NavLink } from 'react-router-dom'
import Search from './Search'

const Maincategories = () => {
  return (
    <div>
      <div className="hidden md:flex bg-black rounded-3xl xl:rounded-full p-3 shadow-lg items-center justify-center gap-5">
        {/* links */}
        <div className="flex-1 flex items-center justify-between flex-wrap">
            <NavLink to="/posts"
            className="bg-[#32012F] text-white rounded-full px-4 py-2">
                All Posts
            </NavLink>
            <NavLink to="/posts?cat=web-design"
            className="hover:bg-[#61375e] hover:text-white rounded-full px-4 py-2">
                Web Design
            </NavLink>
            <NavLink to="/posts?cat=development"
            className="hover:bg-[#61375e] hover:text-white rounded-full px-4 py-2">
                Development
            </NavLink>
            <NavLink to="/posts?cat=database"
            className="hover:bg-[#61375e] hover:text-white rounded-full px-4 py-2">
                Database
            </NavLink>
            <NavLink to="/posts?cat=seo"
            className="hover:bg-[#61375e] hover:text-white rounded-full px-4 py-2">
                Searcg Engines
            </NavLink>
            <NavLink to="/posts?cat=marketing"
            className="hover:bg-[#61375e] hover:text-white rounded-full px-4 py-2">
                Web Design
            </NavLink>
        </div>
        <span className="text-xl font-medium">|</span>
        {/* search  */}
        <Search/>

      </div>
    </div>
  )
}

export default Maincategories
