import React from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

const Search = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams,setSearchParams] = useSearchParams()

  const handlekeypress = (e)=>{
    if(e.key === "Enter"){
      const query = e.target.value;
      if(location.pathname === "/posts"){
        setSearchParams({...Object.fromEntries(searchParams),search:query})
      }else{
        navigate(`/posts?search=${query}`)
      }
    }
  }
  return (
    <div>
      <div className="bg-[#61375e] p-2 sm:p-3 rounded-full flex items-center gap-2 hover:bg-[#4a2a47] transition-colors">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        className='text-white flex-shrink-0'
        stroke="white"
      >
        <circle cx="10.5" cy="10.5" r="7.5" />
        <line x1="16.5" y1="16.5" x2="22" y2="22" />
      </svg>
      <input
        type="text"
        placeholder="Search a post..."
        className="bg-transparent text-white placeholder-gray-100 text-sm sm:text-base w-full outline-none"
        style={{ '::placeholder': { color: 'white' } }}
        onKeyDown={handlekeypress}
      />
    </div>
    </div>
  )
}

export default Search
