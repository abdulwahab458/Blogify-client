import React, { useState } from 'react'
import Postlist from '../components/Postlist'
import Sidemenu from '../components/Sidemenu';

const Postlistpage = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-4 sm:mt-6">
      <h1 className="mb-4 sm:mb-6 lg:mb-8 text-xl sm:text-2xl lg:text-3xl mt-2 sm:mt-4 lg:mt-5">Blogs</h1>
      
      {/* Mobile Filter Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="bg-blue-800 text-sm text-white px-4 py-2 rounded-2xl mb-4 md:hidden hover:bg-blue-700 transition-colors"
      >
        {open ? "Close Filters" : "Filter & Search"}
      </button>
      
      {/* Mobile Filter Menu */}
      <div className={`${open ? "block" : "hidden"} md:hidden mb-6`}>
        <Sidemenu/>
      </div>
      
      {/* Desktop Layout */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 xl:gap-12">
        <div className="flex-1">
          <Postlist/>
        </div>
        <div className="hidden md:block lg:w-80 xl:w-96">
          <Sidemenu/>
        </div>
      </div>
    </div>
  )
}

export default Postlistpage
