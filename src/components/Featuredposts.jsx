import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import { NavLink } from 'react-router-dom'
import { format } from 'timeago.js'

const fetchPost = async()=>{
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts?featured=true&limit=4&sort=newest`);
  console.log(res.data)
  return res.data;
}


const Featuredposts = () => {
  const {isPending,error,data} = useQuery({
    queryKey:['featuredPosts'],
    queryFn:()=>fetchPost(),
  });
  if(isPending) return "loading...";
  if(error) return "unexpected error";
  const posts = data.posts;
  if(!posts||posts.length===0){
    return
  }

  return (
    <div className='mt-6 sm:mt-8 flex flex-col lg:flex-row gap-6 sm:gap-8'>
        {/* first  */}
        <div className="w-full lg:w-1/2 flex flex-col gap-3 sm:gap-4">
        {/* image */}
        {posts[0].img&&<img src={posts[0].img} alt="" 
        className='rounded-2xl sm:rounded-3xl object-cover h-[200px] sm:h-[250px] md:h-[300px]'
        />}
        {/* details */}
        <div className="flex items-center gap-3 sm:gap-4 text-sm sm:text-base">
        <h1 className="font-semibold">01.</h1>
        <NavLink className='text-[#900a87] hover:text-[#6f0368] transition-colors'>{posts[0].category}</NavLink>
        <span className='text-wheat'>{format(posts[0].createdAt)}</span>
        </div>
        {/* title */}
        <NavLink
          to={posts[0].slug}
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold lg:font-bold hover:text-[#900a87] transition-colors"
        >
          {posts[0].title} 
        </NavLink>
      </div>
        {/* others  */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4 sm:gap-6">
        {/* second */}
        {posts[1]&&<div className="lg:h-1/3 flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
        {posts[1].img && <img src={posts[1].img} alt="" 
              className="rounded-2xl sm:rounded-3xl object-cover w-full sm:w-[200px] h-[120px] sm:h-[150px]"
        />}
         {/* details and title */}
         <div className="w-full sm:w-2/3">
            {/* details */}
            <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm lg:text-base mb-2 sm:mb-4">
              <h1 className="font-semibold">02.</h1>
              <NavLink className="text-[#900a87] hover:text-[#6f0368] transition-colors">{posts[1].category}</NavLink>
              <span className="text-wheat text-xs sm:text-sm">{format(posts[1].createdAt)}</span>
            </div>
            {/* title */}
            <NavLink
              to={posts[1].slug}
              className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-medium hover:text-[#900a87] transition-colors"
            >
              {posts[1].title}
            </NavLink>
          </div>
        </div>}
        {/* three */}
        {posts[2]&&<div className="lg:h-1/3 flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
        {posts[2].img && <img src={posts[2].img} alt="" 
              className="rounded-2xl sm:rounded-3xl object-cover w-full sm:w-[200px] h-[120px] sm:h-[150px]"
        />}
         {/* details and title */}
         <div className="w-full sm:w-2/3">
            {/* details */}
            <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm lg:text-base mb-2 sm:mb-4">
              <h1 className="font-semibold">03.</h1>
              <NavLink className="text-[#900a87] hover:text-[#6f0368] transition-colors">{posts[2].category}</NavLink>
              <span className="text-wheat text-xs sm:text-sm">{format(posts[2].createdAt)}</span>
            </div>
            {/* title */}
            <NavLink
              to={posts[2].slug}
              className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-medium hover:text-[#900a87] transition-colors"
            >
              {posts[2].title}
            </NavLink>
          </div>
        </div>}
        {/* four */}
        {posts[3]&&<div className="lg:h-1/3 flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
        {posts[3].img && <img src={posts[3].img} alt="" 
              className="rounded-2xl sm:rounded-3xl object-cover w-full sm:w-[200px] h-[120px] sm:h-[150px]"
        />}
         {/* details and title */}
         <div className="w-full sm:w-2/3">
            {/* details */}
            <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm lg:text-base mb-2 sm:mb-4">
              <h1 className="font-semibold">04.</h1>
              <NavLink className="text-[#900a87] hover:text-[#6f0368] transition-colors">{posts[3].category}</NavLink>
              <span className="text-wheat text-xs sm:text-sm">{format(posts[3].createdAt)}</span>
            </div>
            {/* title */}
            <NavLink
              to={posts[3].slug}
              className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-medium hover:text-[#900a87] transition-colors"
            >
              {posts[3].title}
            </NavLink>
          </div>
        </div>}
        </div>
      </div>
  )
}

export default Featuredposts
