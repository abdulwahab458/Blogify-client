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
    <div className='px-4 h-max sticky top-8'>
        <h1 className="mb-4 text-sm font-medium">Search</h1>
      <Search/>
      <h1 className="mt-8 mb-4 text-sm font-medium">Filter</h1>
      <div className="flex flex-col gap-2 text-sm">
      <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            onChange={handlefileter}
            value="newest"
            className="appearance-none w-4 h-4 border-[1.5px] border-[#16C47F] cursor-pointer rounded-sm bg-white checked:bg-[#16C47F]"
          />
          Newest
        </label>
        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            onChange={handlefileter}
            value="popular"
            className="appearance-none w-4 h-4 border-[1.5px] border-[#16C47F] cursor-pointer rounded-sm bg-white checked:bg-[#16C47F]"
          />
          Most Popular
        </label>
        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            onChange={handlefileter}
            value="trending"
            className="appearance-none w-4 h-4 border-[1.5px] border-[#16C47F] cursor-pointer rounded-sm bg-white checked:bg-[#16C47F]"
          />
          Trending
        </label>
        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            value="oldest"
            className="appearance-none w-4 h-4 border-[1.5px] border-[#16C47F] cursor-pointer rounded-sm bg-white checked:bg-[#16C47F]"
          />
          Oldest
        </label>
      </div>
      <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
      <div className="flex flex-col gap-2 text-sm">
                  <span className="underline cursor-pointer" onClick={()=>handleCategory("general")}>All</span>
                  <span className="underline cursor-pointer" onClick={()=>handleCategory("web-design")}>
                    Web Design 
                  </span>
                  <span className="underline cursor-pointer" onClick={()=>handleCategory("development")}>
                    Development
                  </span>
                  <span className="underline cursor-pointer" onClick={()=>handleCategory("databases")}>
                    Databases
                  </span>
                  <span className="underline cursor-pointer" onClick={()=>handleCategory("seo")}>
                    Search Engines
                  </span>
                  <span className="underline cursor-pointer" onClick={()=>handleCategory("marketing")}>
                    Marketing
                  </span>
                </div>
    </div>
  )
}

export default Sidemenu
