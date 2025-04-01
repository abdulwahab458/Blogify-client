import React, { useState } from 'react'
import Postlist from '../components/Postlist'
import Sidemenu from '../components/Sidemenu';

const Postlistpage = () => {
  const [open, setOpen] = useState(false);
  return (

      <div className="">
      <h1 className="mb-8 text-2xl mt-5">Blogs</h1>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="bg-blue-800 text-sm text-white px-4 py-2 rounded-2xl mb-4 md:hidden"
      >
        {open ? "Close" : "Filter or Search"}
      </button>
      <div className="flex flex-col-reverse gap-8 md:flex-row justify-between">
        <div className="">
          <Postlist/>
        </div>
        <div className={`${open ? "block" : "hidden"} md:block`}>
          <Sidemenu/>
        </div>
      </div>
    </div>
  )
}

export default Postlistpage
