import React from 'react'
import { data, NavLink, useParams } from 'react-router-dom'
import Postmenuaction from '../components/Postmenuaction'
import Search from '../components/Search'
import Comments from '../components/Comments'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { format } from 'timeago.js'

const fetchdata = async(slug)=>{
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
  console.log(res.data)
  return res.data;
}

const Singlepostpage = () => {
  const {slug} = useParams()
  const {isPending,error,data} = useQuery({
    queryKey:['post',slug],
    queryFn:()=>fetchdata(slug)
  });
  if(isPending) return "loading...";
  if(error) return "unexpected error";
  if(!data) return "Post not found"
  return (
    <div className='flex flex-col gap-6 sm:gap-8 mt-4 sm:mt-6'>
      {/* detail  */}
      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
        <div className="lg:w-3/5 flex flex-col gap-6 sm:gap-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold">
           {data.title}
          </h1>
          <div className="flex flex-wrap items-center gap-2 text-gray-400 text-xs sm:text-sm">
            <span>Written by</span>
            <NavLink className="text-[#900a87] hover:text-[#6f0368] transition-colors">{data.user.username}</NavLink>
            <span>on</span>
            <NavLink className="text-[#900a87] hover:text-[#6f0368] transition-colors">{data.category}</NavLink>
            <span>{format(data.createdAt)}</span>
          </div>
          <p className="text-gray-500 font-medium text-sm sm:text-base">
            {data.desc}
          </p>
        </div>
        {data.img&&<div className="lg:w-2/5">
          <img src={data.img} alt="" className='w-full h-auto rounded-2xl object-cover'/>
        </div>}
      </div>
      
      {/* content  */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 justify-between">
        {/* text   */}
        <div className="lg:text-lg flex flex-col gap-6 text-justify text-sm sm:text-base" dangerouslySetInnerHTML={{ __html: data.content }}></div>

        {/* menu  */}
        <div className="px-2 sm:px-4 h-max sticky top-8 bg-[#0C1844]/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-700/30">
          <h1 className="mb-3 sm:mb-4 text-sm sm:text-base font-medium text-gray-200">Author</h1>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 sm:gap-8">
              {data.user.img&&<img src={data.user.img} alt="" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"/>}
              <NavLink className="text-[#900a87] hover:text-[#6f0368] transition-colors text-sm sm:text-base">{data.user.username}</NavLink>
            </div>
          </div>
          
          {/* menu actions  */}
          <Postmenuaction post={data}/>
          
          {/* CATEGORIES  */}
          <h1 className="mt-6 sm:mt-8 mb-3 sm:mb-4 text-sm sm:text-base font-medium text-gray-200">Categories</h1>
          <div className="flex flex-col gap-2 text-sm sm:text-base">
            <NavLink className="text-gray-300 underline cursor-pointer hover:text-blue-400 transition-colors">All</NavLink>
            <NavLink className="text-gray-300 underline cursor-pointer hover:text-blue-400 transition-colors" to="/">
              Web Design
            </NavLink>
            <NavLink className="text-gray-300 underline cursor-pointer hover:text-blue-400 transition-colors" to="/">
              Development
            </NavLink>
            <NavLink className="text-gray-300 underline cursor-pointer hover:text-blue-400 transition-colors" to="/">
              Databases
            </NavLink>
            <NavLink className="text-gray-300 underline cursor-pointer hover:text-blue-400 transition-colors" to="/">
              Search Engines
            </NavLink>
            <NavLink className="text-gray-300 underline cursor-pointer hover:text-blue-400 transition-colors" to="/">
              Marketing
            </NavLink>
          </div>
          <h1 className="mt-6 sm:mt-8 mb-3 sm:mb-4 text-sm sm:text-base font-medium text-gray-200">Search</h1>
          <Search/>
        </div>
      </div>
      {/* <Comments postId={data._id}/> */}
    </div>
  )
}

export default Singlepostpage
