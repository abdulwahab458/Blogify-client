import React from 'react'
import Search from './Search'
import { NavLink, useParams, useSearchParams } from 'react-router-dom'

const Sidemenu = () => {
  const [searchParams,setSearchParams] = useSearchParams()
  const handlefileter = (e) => {
    if (searchParams.get("sort") !== e.target.value) { 
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        sort: e.target.value,
      });
    }
  };
  
  const handleCategory = (category) => {
    if (searchParams.get("cat") !== category) { 
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        cat: category,
      });
    }
  };
  
  return (
    <div className='px-2 sm:px-4 h-max sticky top-8 bg-[#0C1844]/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-700/30'>
        <h1 className="mb-3 sm:mb-4 text-sm sm:text-base font-medium text-gray-200">Search</h1>
      <Search/>
      <h1 className="mt-6 sm:mt-8 mb-3 sm:mb-4 text-sm sm:text-base font-medium text-gray-200">Filter</h1>
      <div className="flex flex-col gap-2 sm:gap-3 text-sm sm:text-base">
      <label htmlFor="" className="flex items-center gap-2 cursor-pointer hover:text-blue-400 transition-colors">
          <input
            type="radio"
            name="sort"
            onChange={handlefileter}
            value="newest"
            className="appearance-none w-4 h-4 border-[1.5px] border-[#16C47F] cursor-pointer rounded-sm bg-white checked:bg-[#16C47F]"
          />
          <span className="text-gray-300">Newest</span>
        </label>
        <label htmlFor="" className="flex items-center gap-2 cursor-pointer hover:text-blue-400 transition-colors">
          <input
            type="radio"
            name="sort"
            onChange={handlefileter}
            value="popular"
            className="appearance-none w-4 h-4 border-[1.5px] border-[#16C47F] cursor-pointer rounded-sm bg-white checked:bg-[#16C47F]"
          />
          <span className="text-gray-300">Most Popular</span>
        </label>
        <label htmlFor="" className="flex items-center gap-2 cursor-pointer hover:text-blue-400 transition-colors">
          <input
            type="radio"
            name="sort"
            onChange={handlefileter}
            value="trending"
            className="appearance-none w-4 h-4 border-[1.5px] border-[#16C47F] cursor-pointer rounded-sm bg-white checked:bg-[#16C47F]"
          />
          <span className="text-gray-300">Trending</span>
        </label>
        <label htmlFor="" className="flex items-center gap-2 cursor-pointer hover:text-blue-400 transition-colors">
          <input
            type="radio"
            name="sort"
            value="oldest"
            className="appearance-none w-4 h-4 border-[1.5px] border-[#16C47F] cursor-pointer rounded-sm bg-white checked:bg-[#16C47F]"
          />
          <span className="text-gray-300">Oldest</span>
        </label>
      </div>
      <h1 className="mt-6 sm:mt-8 mb-3 sm:mb-4 text-sm sm:text-base font-medium text-gray-200">Categories</h1>
      <div className="flex flex-col gap-2 sm:gap-3 text-sm sm:text-base">
                  <span className="text-gray-300 underline cursor-pointer hover:text-blue-400 transition-colors" onClick={()=>handleCategory("general")}>All</span>
                  <span className="text-gray-300 underline cursor-pointer hover:text-blue-400 transition-colors" onClick={()=>handleCategory("web-design")}>
                    Web Design 
                  </span>
                  <span className="text-gray-300 underline cursor-pointer hover:text-blue-400 transition-colors" onClick={()=>handleCategory("development")}>
                    Development
                  </span>
                  <span className="text-gray-300 underline cursor-pointer hover:text-blue-400 transition-colors" onClick={()=>handleCategory("databases")}>
                    Databases
                  </span>
                  <span className="text-gray-300 underline cursor-pointer hover:text-blue-400 transition-colors" onClick={()=>handleCategory("seo")}>
                    Search Engines
                  </span>
                  <span className="text-gray-300 underline cursor-pointer hover:text-blue-400 transition-colors" onClick={()=>handleCategory("marketing")}>
                    Marketing
                  </span>
                </div>
    </div>
  )
}

export default Sidemenu
